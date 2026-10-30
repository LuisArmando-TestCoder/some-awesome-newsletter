/**
 * Automations API (docs/aiban/AUTOMATIONS.md v1, section 7).
 * Endpoints are requested from WS7; until they are live each call falls back
 * to what exists today: one legacy "daily issue" automation per news source
 * (schedule = source.scheduleTime, enabled = source.active), toggles update
 * the source, and "run now" uses the existing send endpoints.
 */
import { newRequestId, request, seg, withFallback } from './client';
import { getCredentials } from './credentials';
import { ApiError } from './errors';
import { automationSchema, runRecordSchema } from './schemas';
import { on, type RunSummary } from './socket';
import { z } from 'zod';

export type TriggerType = 'schedule' | 'new_article' | 'new_subscriber' | 'list_imported' | 'manual' | 'milestone';
export type StepType =
	| 'fetch_candidates' | 'select_best' | 'extract_article' | 'rewrite_voice' | 'translate' | 'pick_image'
	| 'render_email' | 'send_email' | 'publish_blog' | 'publish_wordpress' | 'welcome_email' | 'confirm_email'
	| 'notify_owner' | 'report' | 'owner_report';
export type RecipeId = 'daily_issue' | 'weekly_digest' | 'new_post_alert' | 'welcome_new_subscriber' | 'import_contacts' | 'write_about_this' | 'owner_nudges' | 'owner_weekly_report';
export type RunStatus = 'queued' | 'running' | 'ok' | 'partial' | 'failed' | 'skipped';

export type Automation = {
	id: string;
	configuratorId: string;
	name: string;
	enabled: boolean;
	recipeId?: RecipeId;
	trigger: { type: TriggerType; params: Record<string, unknown> };
	steps: Array<{ type: StepType; params?: Record<string, unknown>; optional?: boolean }>;
	newsSourceIds?: string[];
	settings?: { dryRun?: boolean; maxItemsPerRun?: number; languages?: string[]; quietHours?: { startHour: number; endHour: number; tz: string } };
	createdAt?: string;
	updatedAt?: string;
	lastRunAt?: string;
	lastRunStatus?: 'ok' | 'partial' | 'failed' | 'skipped';
	lastRunId?: string;
	nextRunAt?: string;
	stats?: { runs: number; sent: number; failed: number; opens?: number; clicks?: number; costUsd: number };
	source: 'user' | 'recipe' | 'legacy';
	/** Legacy automations cannot be edited on the server; change the news source instead. */
	readOnly?: boolean;
};

export type Recipe = { id: RecipeId; trigger: Automation['trigger']; steps: Automation['steps']; defaults: Partial<Automation> };

export type RunRecord = {
	id: string;
	automationId: string;
	configuratorId?: string;
	trigger?: TriggerType;
	status: RunStatus;
	dryRun?: boolean;
	startedAt?: string;
	finishedAt?: string;
	durationMs?: number;
	steps?: Array<{ type: StepType; status: string; attempts?: number; error?: string }>;
	items?: Array<{ url: string; title?: string }>;
	counts?: { recipients: number; sent: number; failed: number; skippedDuplicate?: number; languages?: string[] };
	cost?: { usd: number };
	skipReason?: string;
	previewHtml?: string;
	error?: string;
};

/** Plain words for run states (AUTOMATIONS.md "Status words for the UI"). */
export const RUN_STATUS_LABEL: Record<RunStatus, string> = {
	queued: 'Waiting',
	running: 'Running',
	ok: 'Sent',
	partial: 'Sent with warnings',
	failed: 'Failed',
	skipped: 'Nothing new'
};

export const SKIP_REASON_LABEL: Record<string, string> = {
	duplicate_run: 'Already ran for this time slot',
	no_new_items: 'No new articles since the last issue',
	no_subscribers: 'No subscribers yet',
	plan_limit: 'Plan limit reached',
	disabled: 'Turned off',
	quiet_hours: 'Waiting for the end of quiet hours',
	source_inactive: 'The source is paused'
};

const DAILY_STEPS: Automation['steps'] = (
	['fetch_candidates', 'select_best', 'extract_article', 'rewrite_voice', 'translate', 'pick_image', 'render_email', 'send_email', 'publish_blog', 'publish_wordpress', 'report'] as StepType[]
).map((type) => ({ type }));

type LegacySource = { id: string; url?: string; scheduleTime?: string; active?: boolean; lead?: string };

/** Derive the legacy automations the backend runs today from config.newsSources. */
export function legacyAutomationsFromSources(sources: LegacySource[] | undefined, configuratorId = getCredentials().email): Automation[] {
	return (sources ?? [])
		.filter((s) => s && s.id)
		.map((s) => ({
			id: `legacy_${s.id}`,
			configuratorId,
			name: 'Daily issue from your source',
			enabled: s.active !== false,
			recipeId: 'daily_issue' as const,
			trigger: { type: 'schedule' as const, params: { cron: s.scheduleTime || '0 8 * * *', tz: 'UTC' } },
			steps: DAILY_STEPS,
			newsSourceIds: [s.id],
			source: 'legacy' as const
		}));
}

async function currentSources(): Promise<LegacySource[]> {
	try {
		const cfg = await request<{ newsSources?: LegacySource[] }>('/config');
		return cfg?.newsSources ?? [];
	} catch {
		return [];
	}
}

type Page<T> = { items: T[]; nextCursor?: string | null };
const itemsOf = <T>(p: Page<T> | T[] | null | undefined): T[] => (Array.isArray(p) ? p : (p?.items ?? []));
const isLegacy = (id: string) => id.startsWith('legacy_');

/** All automations, including read-only legacy ones derived from news sources. */
export async function listAutomations(configuratorId = getCredentials().email): Promise<Automation[]> {
	return withFallback(
		async () => itemsOf((await request('/v1/automations', { schema: z.object({ items: z.array(automationSchema) }).loose() })) as unknown as Page<Automation>),
		async () => legacyAutomationsFromSources(await currentSources(), configuratorId)
	);
}

export async function getAutomation(id: string): Promise<Automation> {
	return request<Automation>(`/v1/automations/${seg(id)}`);
}

export async function listRecipes(): Promise<Recipe[]> {
	return withFallback(
		async () => itemsOf(await request<Page<Recipe>>('/v1/automations/recipes')),
		() => []
	);
}

export type CreateAutomationInput = {
	recipeId?: RecipeId;
	name?: string;
	enabled?: boolean;
	trigger?: Automation['trigger'];
	steps?: Automation['steps'];
	newsSourceIds?: string[];
	settings?: Automation['settings'];
};

/** Create from a recipe ({ recipeId }) or from scratch (name, trigger, steps). */
export async function createAutomation(input: CreateAutomationInput, idempotencyKey = newRequestId('auto')): Promise<Automation> {
	return request<Automation>('/v1/automations', {
		method: 'POST',
		body: input,
		idempotencyKey,
		retries: 1,
		errorMessage: 'We could not create this automation. Try again.'
	});
}

export async function updateAutomation(id: string, patch: Partial<Pick<Automation, 'name' | 'enabled' | 'trigger' | 'steps' | 'newsSourceIds' | 'settings'>>): Promise<Automation> {
	if (isLegacy(id)) return updateLegacy(id, patch);
	return request<Automation>(`/v1/automations/${seg(id)}`, {
		method: 'PATCH',
		body: patch,
		errorMessage: 'We could not save this automation. Try again.'
	});
}

async function updateLegacy(id: string, patch: Partial<Automation>): Promise<Automation> {
	const nsId = id.slice('legacy_'.length);
	const body: Record<string, unknown> = {};
	if (typeof patch.enabled === 'boolean') body.active = patch.enabled;
	const cron = (patch.trigger?.params as { cron?: string } | undefined)?.cron;
	if (cron) body.scheduleTime = cron;
	const { updateNewsSourceOrThrow } = await import('../../components/systems/requests/updateNewsSource');
	const ns = await updateNewsSourceOrThrow(body, nsId);
	return legacyAutomationsFromSources([ns])[0];
}

/** Turn an automation on or off. Pair with optimisticToggle() from $lib/stores/optimistic. */
export async function toggleAutomation(id: string, enabled: boolean): Promise<Automation> {
	// Legacy automations are read-only on the server (409); their switch is the news source's `active`.
	if (isLegacy(id)) return updateLegacy(id, { enabled });
	return request<Automation>(`/v1/automations/${seg(id)}/toggle`, {
		method: 'POST',
		body: { enabled },
		idempotent: true,
		retries: 1,
		errorMessage: 'We could not change this automation. Try again.'
	});
}

export async function deleteAutomation(id: string): Promise<void> {
	if (isLegacy(id)) {
		throw new ApiError({ status: 409, code: 'conflict', userMessage: 'To stop this automation, pause or remove its news source.' });
	}
	await request(`/v1/automations/${seg(id)}`, { method: 'DELETE', errorMessage: 'We could not delete this automation. Try again.' });
}

/** Run history, newest first. The backend returns one page today (see ws6-v1-map.md). */
export async function listRuns(id: string, opts: { limit?: number; cursor?: string; preview?: boolean } = {}): Promise<RunRecord[]> {
	return withFallback(
		async () =>
			itemsOf(
				(await request(`/v1/automations/${seg(id)}/runs`, {
					query: { limit: opts.limit ?? 20, cursor: opts.cursor, preview: opts.preview ? 1 : undefined },
					schema: z.object({ items: z.array(runRecordSchema) }).loose()
				})) as unknown as Page<RunRecord>
			),
		() => []
	);
}

export type RunNowInput = {
	newsSourceId: string;
	mode: 'send_now' | 'write_about_url' | 'write_about_text';
	url?: string;
	text?: string;
	dryRun?: boolean;
	/** Same id twice = same run (idempotent). Generated when omitted. */
	requestId?: string;
};

export type RunAccepted = { runId: string | null; automationId?: string; status?: 'queued' };

/**
 * One-off run ("Send now", "Write about this"). Returns { runId } from
 * POST /v1/automations/run; progress arrives on the socket (onRunUpdate).
 * Falls back to the legacy send endpoints when /v1 is not deployed.
 */
export async function runNow(input: RunNowInput): Promise<RunAccepted> {
	const configuratorId = getCredentials().email;
	const requestId = input.requestId ?? newRequestId('run');
	const body: Record<string, unknown> = { newsSourceId: input.newsSourceId, mode: input.mode, requestId };
	if (input.url) body.url = input.url;
	if (input.text) body.text = input.text;
	if (input.dryRun) body.dryRun = true;
	return withFallback<RunAccepted>(
		() =>
			request<RunAccepted>('/v1/automations/run', {
				method: 'POST',
				body,
				idempotencyKey: requestId,
				retries: 1,
				errorMessage: 'We could not start this run. Try again in a minute.'
			}),
		async () => {
			if (input.dryRun) throw new ApiError({ status: 501, code: 'not_available', userMessage: 'Test runs are not available yet. Use the preview instead.' });
			if (input.mode === 'send_now') {
				await request(`/news-source/${seg(configuratorId)}/${seg(input.newsSourceId)}/trigger`, {
					method: 'POST',
					timeoutMs: 5 * 60_000,
					errorMessage: 'We could not send this newsletter. Try again in a few minutes.'
				});
				return { runId: null };
			}
			const content = input.mode === 'write_about_text' ? input.text : input.url;
			if (!content?.trim()) throw new ApiError({ status: 400, code: 'validation', userMessage: 'Paste a link or some text first.' });
			await request('/newsletter/send-custom-content', {
				method: 'POST',
				body: { configId: configuratorId, newsSourceId: input.newsSourceId, content },
				timeoutMs: 120_000,
				errorMessage: 'We could not send this issue. Try again in a few minutes.'
			});
			return { runId: null };
		}
	);
}

/** Run one saved automation now (also works for legacy ones). */
export async function runAutomation(id: string, opts: { dryRun?: boolean; url?: string; text?: string; requestId?: string } = {}): Promise<RunAccepted> {
	const requestId = opts.requestId ?? newRequestId('run');
	const body: Record<string, unknown> = { requestId };
	if (opts.dryRun) body.dryRun = true;
	if (opts.url) body.url = opts.url;
	if (opts.text) body.text = opts.text;
	return request<RunAccepted>(`/v1/automations/${seg(id)}/run`, {
		method: 'POST',
		body,
		idempotencyKey: requestId,
		retries: 1,
		errorMessage: 'We could not start this run. Try again in a minute.'
	});
}

/** Live run updates (Socket.IO `automation:run`). Returns an unsubscribe function. */
export function onRunUpdate(listener: (run: RunSummary) => void): () => void {
	return on('automation:run', listener);
}

