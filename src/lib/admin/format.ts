/** Formatting and wording for the admin dashboard (COPY_RULES: plain, sentence case, no dashes). */
import type { AdminAuditEntry } from '$lib/api/admin';

const numberFmt = new Intl.NumberFormat();
const dateFmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });
const dateTimeFmt = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' });
const relFmt = typeof Intl.RelativeTimeFormat === 'function' ? new Intl.RelativeTimeFormat(undefined, { numeric: 'auto' }) : null;

export const num = (n: number | null | undefined) => (n === null || n === undefined ? '0' : numberFmt.format(n));
export const plural = (n: number, one: string, many: string) => `${num(n)} ${n === 1 ? one : many}`;
export const limitText = (n: number | null | undefined) => (n === null || n === undefined ? 'No limit' : numberFmt.format(n));

function parse(iso?: string | null): Date | null {
	if (!iso) return null;
	const d = new Date(iso);
	return Number.isNaN(d.getTime()) ? null : d;
}

export const fmtDate = (iso?: string | null) => {
	const d = parse(iso);
	return d ? dateFmt.format(d) : 'Not recorded';
};
export const fmtDateTime = (iso?: string | null) => {
	const d = parse(iso);
	return d ? dateTimeFmt.format(d) : 'Not recorded';
};

/** "3 hours ago", "yesterday". Falls back to the date. */
export function fromNow(iso?: string | null): string {
	const d = parse(iso);
	if (!d) return 'Not recorded';
	if (!relFmt) return dateFmt.format(d);
	const sec = Math.round((d.getTime() - Date.now()) / 1000);
	const abs = Math.abs(sec);
	if (abs < 60) return 'just now';
	if (abs < 3600) return relFmt.format(Math.round(sec / 60), 'minute');
	if (abs < 86400) return relFmt.format(Math.round(sec / 3600), 'hour');
	if (abs < 86400 * 30) return relFmt.format(Math.round(sec / 86400), 'day');
	return dateFmt.format(d);
}

export function hostOf(url?: string): string {
	if (!url) return '';
	try {
		return new URL(url).hostname.replace(/^www\./, '');
	} catch {
		return url;
	}
}

const FIELD_LABELS: Record<string, string> = {
	pricingPlan: 'plan',
	vip: 'VIP',
	adminNote: 'notes',
	isPaidNewsletter: 'paid',
	active: 'active',
	isPublic: 'public'
};

function valueText(field: string, v: unknown): string {
	if (typeof v === 'boolean') return v ? 'on' : 'off';
	if (field === 'adminNote') return v ? 'updated' : 'cleared';
	if (v === null || v === undefined || v === '') return 'empty';
	return String(v);
}

/** One sentence describing an audit entry. */
export function describeAudit(e: AdminAuditEntry, sourceName?: (tenantId: string, nsId: string) => string | undefined): string {
	switch (e.action) {
		case 'admin.added':
			return `Gave admin access to ${e.target ?? 'someone'}`;
		case 'admin.removed':
			return `Removed admin access from ${e.target ?? 'someone'}`;
		case 'tenant.updated':
		case 'news_source.updated': {
			const parts = Object.entries(e.changes ?? {}).map(([k, c]) =>
				k === 'adminNote' ? `notes ${valueText(k, c.to)}` : `${FIELD_LABELS[k] ?? k} ${valueText(k, c.from)} to ${valueText(k, c.to)}`
			);
			const what =
				e.action === 'news_source.updated'
					? `newsletter ${(e.tenantId && e.newsSourceId && sourceName?.(e.tenantId, e.newsSourceId)) || e.newsSourceId || ''}`.trim()
					: 'customer';
			return parts.length ? `Changed ${what}: ${parts.join(', ')}` : `Saved ${what} with no changes`;
		}
		default:
			return e.action;
	}
}

/** CSV text from rows. Values are quoted when needed; formulas are neutralised. */
export function toCsv(header: string[], rows: Array<Array<string | number | boolean | null | undefined>>): string {
	const cell = (v: unknown) => {
		let s = v === null || v === undefined ? '' : String(v);
		if (/^[=+\-@]/.test(s)) s = `'${s}`;
		return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
	};
	return [header, ...rows].map((r) => r.map(cell).join(',')).join('\n');
}

export function downloadText(filename: string, text: string, type = 'text/csv;charset=utf-8') {
	const blob = new Blob([text], { type });
	const url = URL.createObjectURL(blob);
	const a = document.createElement('a');
	a.href = url;
	a.download = filename;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}
