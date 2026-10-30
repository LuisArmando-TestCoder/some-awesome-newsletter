/**
 * Activity feed, newest first. GET /v1/activity (Page of { id, type, data,
 * createdAt }) mapped to ready-to-show items. Falls back to automation runs
 * when /v1 is not deployed. Live items arrive over the socket.
 */
import { request, withFallback } from './client';
import { listAutomations, listRuns, RUN_STATUS_LABEL, SKIP_REASON_LABEL, type RunRecord } from './automations';
import { on } from './socket';

export type ActivityType =
	| 'subscriber.added' | 'subscriber.confirmed' | 'subscriber.unsubscribed' | 'subscriber.deleted' | 'subscribers.imported'
	| 'issue.sent' | 'issue.failed'
	| 'news_source.added' | 'news_source.updated' | 'news_source.deleted'
	| 'automation.created' | 'automation.updated' | 'automation.deleted' | 'automation.toggled'
	| 'automation.run_requested' | 'automation.run_finished'
	| 'billing.plan_changed' | 'billing.payment_failed'
	| 'sender.tested' | 'account.export_requested' | 'account.deletion_requested' | 'milestone.reached';

export type RawActivity = { id: string; type: string; data: Record<string, unknown>; createdAt: string | null };

export type ActivityItem = {
	id: string;
	type: ActivityType | 'run' | (string & {});
	createdAt: string;
	title: string;
	detail?: string;
	status?: 'ok' | 'warning' | 'error' | 'info';
	refId?: string;
	data?: Record<string, unknown>;
};

export type ActivityPage = { items: ActivityItem[]; nextCursor: string | null };

const s = (v: unknown) => (typeof v === 'string' && v.trim() ? v.trim() : undefined);
const n = (v: unknown) => (typeof v === 'number' && Number.isFinite(v) ? v : undefined);
const plural = (k: number, one: string, many: string) => `${k} ${k === 1 ? one : many}`;

/** Plain-language title for each event (COPY_RULES: sentence case, no dashes). */
export function describeActivity(raw: RawActivity): ActivityItem {
	const d = raw.data ?? {};
	const title = s(d.title);
	const base = { id: raw.id, type: raw.type, createdAt: raw.createdAt ?? new Date(0).toISOString(), refId: s(d.refId), data: d };
	switch (raw.type) {
		case 'subscriber.added':
			return { ...base, title: 'New subscriber', status: 'ok' };
		case 'subscriber.confirmed':
			return { ...base, title: 'A subscriber confirmed their email', status: 'ok' };
		case 'subscriber.unsubscribed':
			return { ...base, title: 'A subscriber unsubscribed', status: 'info' };
		case 'subscriber.deleted':
			return { ...base, title: 'A subscriber was removed', status: 'info' };
		case 'subscribers.imported': {
			const count = n(d.count) ?? n(d.added);
			return { ...base, title: count !== undefined ? `${plural(count, 'contact', 'contacts')} imported` : 'Contacts imported', status: 'ok' };
		}
		case 'issue.sent': {
			const sent = n(d.sent) ?? n(d.recipients);
			return { ...base, title: title ? `Sent: ${title}` : 'Issue sent', detail: sent !== undefined ? plural(sent, 'email', 'emails') : undefined, status: 'ok' };
		}
		case 'issue.failed':
			return { ...base, title: title ? `Not sent: ${title}` : 'An issue could not be sent', detail: s(d.error), status: 'error' };
		case 'news_source.added':
			return { ...base, title: title ? `Source added: ${title}` : 'Source added', status: 'ok' };
		case 'news_source.updated':
			return { ...base, title: title ? `Source updated: ${title}` : 'Source updated', status: 'info' };
		case 'news_source.deleted':
			return { ...base, title: title ? `Source removed: ${title}` : 'Source removed', status: 'info' };
		case 'automation.created':
			return { ...base, title: title ? `Automation created: ${title}` : 'Automation created', status: 'ok' };
		case 'automation.updated':
			return { ...base, title: title ? `Automation changed: ${title}` : 'Automation changed', status: 'info' };
		case 'automation.deleted':
			return { ...base, title: title ? `Automation deleted: ${title}` : 'Automation deleted', status: 'info' };
		case 'automation.toggled':
			return { ...base, title: `${title ?? 'Automation'} turned ${d.enabled ? 'on' : 'off'}`, status: 'info' };
		case 'automation.run_requested':
			return { ...base, title: d.dryRun ? `Test run started${title ? `: ${title}` : ''}` : `Run started${title ? `: ${title}` : ''}`, status: 'info' };
		case 'automation.run_finished': {
			const st = s(d.status) as keyof typeof RUN_STATUS_LABEL | undefined;
			const label = st ? RUN_STATUS_LABEL[st] ?? st : 'Finished';
			return { ...base, title: title ? `${title}: ${label}` : label, detail: SKIP_REASON_LABEL[s(d.skipReason) ?? ''] ?? s(d.error), status: st === 'failed' ? 'error' : st === 'partial' ? 'warning' : 'ok' };
		}
		case 'sender.tested':
			return { ...base, title: d.ok === false ? 'Sender test found problems' : 'Test email sent', status: d.ok === false ? 'warning' : 'ok' };
		case 'milestone.reached':
			return { ...base, title: title ?? 'Milestone reached', status: 'ok' };
		case 'account.export_requested':
			return { ...base, title: 'Account data export requested', status: 'info' };
		case 'account.deletion_requested':
			return { ...base, title: 'Account deletion requested', status: 'warning' };
		case 'billing.plan_changed':
			return { ...base, title: 'Plan changed', status: 'info' };
		case 'billing.payment_failed':
			return { ...base, title: 'A payment failed', status: 'error' };
		default:
			return { ...base, title: title ?? raw.type.replace(/[._]/g, ' '), status: 'info' };
	}
}

export function runToActivity(run: Pick<RunRecord, 'id' | 'status' | 'startedAt' | 'finishedAt' | 'counts' | 'skipReason' | 'error' | 'automationId'>, automationName?: string): ActivityItem {
	const label = RUN_STATUS_LABEL[run.status as keyof typeof RUN_STATUS_LABEL] ?? run.status;
	const sent = run.counts?.sent;
	const detail =
		run.status === 'skipped' ? SKIP_REASON_LABEL[run.skipReason ?? ''] : run.status === 'failed' ? run.error : typeof sent === 'number' ? plural(sent, 'email', 'emails') + ' sent' : undefined;
	return {
		id: `run:${run.id}`,
		type: 'run',
		createdAt: run.finishedAt ?? run.startedAt ?? new Date().toISOString(),
		title: automationName ? `${automationName}: ${label}` : label,
		detail,
		status: run.status === 'failed' ? 'error' : run.status === 'partial' ? 'warning' : run.status === 'ok' ? 'ok' : 'info',
		refId: run.automationId
	};
}

async function fromRuns(limit: number): Promise<ActivityPage> {
	const automations = await listAutomations().catch(() => []);
	const lists = await Promise.all(automations.slice(0, 10).map(async (a) => (await listRuns(a.id, { limit: 10 }).catch(() => [])).map((r) => runToActivity(r, a.name))));
	return { items: lists.flat().sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, limit), nextCursor: null };
}

/** One page of activity. Pass `cursor` from the previous page to load more. */
export async function getActivityPage(opts: { limit?: number; cursor?: string; types?: ActivityType[] } = {}): Promise<ActivityPage> {
	const limit = Math.min(100, opts.limit ?? 30);
	return withFallback(
		async () => {
			const page = await request<{ items: RawActivity[]; nextCursor: string | null }>('/v1/activity', {
				query: { limit, cursor: opts.cursor, type: opts.types?.slice(0, 10).join(',') }
			});
			return { items: (page.items ?? []).map(describeActivity), nextCursor: page.nextCursor ?? null };
		},
		() => fromRuns(limit)
	);
}

/** Items only (first page). Kept for simple callers. */
export async function getActivity(opts: { limit?: number; cursor?: string; types?: ActivityType[] } = {}): Promise<ActivityItem[]> {
	return (await getActivityPage(opts)).items;
}

/** Live items: socket `activity` events and finished runs. Returns an unsubscribe function. */
export function onActivity(listener: (item: ActivityItem) => void): () => void {
	const offA = on('activity', (item) => {
		const raw = item as unknown as RawActivity;
		listener(raw && typeof raw.type === 'string' && raw.data ? describeActivity(raw) : ({ title: String(item.type), ...item } as ActivityItem));
	});
	const offR = on('automation:run', (run) => {
		if (run.status === 'queued' || run.status === 'running') return;
		listener(runToActivity(run as RunRecord));
	});
	return () => {
		offA();
		offR();
	};
}
