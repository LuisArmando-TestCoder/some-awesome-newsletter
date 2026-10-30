/**
 * Contact import: parse a CSV, text or Excel file in the browser, send it in
 * chunks, read the NDJSON progress stream, and expose progress as a store the
 * UI can bind to.
 *
 * Backend: POST /news-source/any-user-data-base-file-to-standard-format/:configId
 * body { text, newsSourceId } -> NDJSON lines {type:"user",email} | {type:"error",message} | {type:"summary",addedCount}
 */
import { writable, type Readable } from 'svelte/store';
import { readNdjson, request, seg } from './client';
import { getCredentials } from './credentials';
import { ApiError, toUserMessage } from './errors';

export type ImportStatus = 'idle' | 'reading' | 'uploading' | 'done' | 'failed' | 'cancelled';
export type ImportProgress = {
	status: ImportStatus;
	fileName?: string;
	totalRows: number;
	processedRows: number;
	added: number;
	addedEmails: string[];
	errors: string[];
	/** 0..100 */
	percent: number;
	message?: string;
};

const initial: ImportProgress = { status: 'idle', totalRows: 0, processedRows: 0, added: 0, addedEmails: [], errors: [], percent: 0 };
const progress = writable<ImportProgress>({ ...initial });
export const importProgress: Readable<ImportProgress> = { subscribe: progress.subscribe };

let current: AbortController | null = null;

export function cancelImport() {
	current?.abort();
}

export function resetImport() {
	progress.set({ ...initial });
}

export const CHUNK_ROWS = 500;

/** Split CSV-like text into chunks of rows, repeating the header line. */
export function chunkLines(text: string, size = CHUNK_ROWS): { chunks: string[]; totalRows: number } {
	const lines = text.split(/\r?\n/).filter((l) => l.trim() !== '');
	if (lines.length === 0) return { chunks: [], totalRows: 0 };
	const [header, ...rows] = lines;
	if (rows.length === 0) return { chunks: [header], totalRows: 1 };
	const chunks: string[] = [];
	for (let i = 0; i < rows.length; i += size) chunks.push([header, ...rows.slice(i, i + size)].join('\n'));
	return { chunks, totalRows: rows.length };
}

function csvCell(v: unknown): string {
	const s = v instanceof Date ? v.toISOString() : String(v ?? '');
	return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

export async function fileToText(file: File): Promise<string> {
	if (/\.xlsx$/i.test(file.name)) {
		const { default: readXlsxFile } = await import('read-excel-file');
		const rows = await readXlsxFile(file);
		return rows.map((r) => r.map(csvCell).join(',')).join('\n');
	}
	return file.text();
}

export type ImportResult = { added: number; addedEmails: string[]; errors: string[]; cancelled: boolean };

/**
 * Import contacts into one news source. Resolves with totals; individual chunk
 * failures are collected in `errors` (user facing) and do not stop the import.
 */
export async function importContacts(input: {
	file?: File;
	text?: string;
	newsSourceId: string;
	configId?: string;
	onUserAdded?: (email: string) => void;
	onProgress?: (processed: number, total: number) => void;
}): Promise<ImportResult> {
	current?.abort();
	const controller = new AbortController();
	current = controller;
	const configId = input.configId || getCredentials().email;
	const update = (patch: Partial<ImportProgress>) =>
		progress.update((p) => {
			const next = { ...p, ...patch };
			next.percent = next.totalRows ? Math.min(100, Math.round((next.processedRows / next.totalRows) * 100)) : next.status === 'done' ? 100 : 0;
			return next;
		});

	progress.set({ ...initial, status: 'reading', fileName: input.file?.name });
	let text = input.text ?? '';
	try {
		if (input.file) text = await fileToText(input.file);
	} catch {
		update({ status: 'failed', message: 'We could not read this file. Save it as CSV or .xlsx and try again.' });
		return { added: 0, addedEmails: [], errors: ['file_unreadable'], cancelled: false };
	}
	const { chunks, totalRows } = chunkLines(text);
	if (chunks.length === 0) {
		update({ status: 'done', message: 'The file has no contacts.' });
		return { added: 0, addedEmails: [], errors: [], cancelled: false };
	}
	update({ status: 'uploading', totalRows });

	let added = 0;
	const addedEmails: string[] = [];
	const errors: string[] = [];
	for (let i = 0; i < chunks.length; i++) {
		if (controller.signal.aborted) break;
		let chunkAdded = 0;
		try {
			const res = await request<Response>(`/news-source/any-user-data-base-file-to-standard-format/${seg(configId)}`, {
				method: 'POST',
				body: { text: chunks[i], newsSourceId: input.newsSourceId },
				responseType: 'response',
				timeoutMs: 180_000,
				signal: controller.signal
			});
			if (!res.ok) {
				const body = await res.json().catch(() => null);
				const { errorFromResponse } = await import('./errors');
				throw errorFromResponse(res.status, body, res.headers);
			}
			await readNdjson(res, (line) => {
				const l = line as { type?: string; email?: string; message?: string; addedCount?: number };
				if (l.type === 'user' && l.email) {
					addedEmails.push(l.email);
					input.onUserAdded?.(l.email);
				} else if (l.type === 'summary') chunkAdded = Number(l.addedCount) || 0;
				else if (l.type === 'error' && l.message) errors.push(`Part ${i + 1}: ${l.message}`);
			});
		} catch (e) {
			if (controller.signal.aborted) break;
			errors.push(`Part ${i + 1}: ${toUserMessage(e)}`);
			if (e instanceof ApiError && (e.code === 'unauthorized' || e.code === 'plan_limit')) {
				update({ status: 'failed', errors: [...errors], message: e.userMessage });
				return { added, addedEmails, errors, cancelled: false };
			}
		}
		added += chunkAdded || 0;
		const processed = Math.min((i + 1) * CHUNK_ROWS, totalRows);
		input.onProgress?.(processed, totalRows);
		update({ processedRows: processed, added, addedEmails: [...addedEmails], errors: [...errors] });
	}

	const cancelled = controller.signal.aborted;
	if (current === controller) current = null;
	update({
		status: cancelled ? 'cancelled' : errors.length && !added ? 'failed' : 'done',
		message: cancelled
			? `Import stopped. ${added} contacts were added before you stopped it.`
			: `${added} contacts added.${errors.length ? ` ${errors.length} parts had problems.` : ''}`
	});
	return { added, addedEmails, errors, cancelled };
}
