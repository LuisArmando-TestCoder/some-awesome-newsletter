/**
 * Product events (STRATEGY.md "Activation"): onboarding_started,
 * preview_shown, test_sent, first_issue_delivered, plus any milestone.
 * Kept locally per owner (first time seen), so checklists can read "has this
 * happened?". Events the server cannot see itself are reported as onboarding
 * steps (PATCH /v1/onboarding): preview_shown -> preview_seen,
 * widget_copied -> widget_installed. Never throws.
 */
import { markStepDone, type StepId } from './onboarding';
import { getCredentials } from './credentials';

export type ProductEvent = 'onboarding_started' | 'preview_shown' | 'test_sent' | 'first_issue_delivered' | 'first_subscriber_added' | 'automation_enabled' | 'widget_copied' | 'import_completed' | (string & {});

const KEY = 'aiban.events';
type LocalLog = Record<string, Partial<Record<string, string>>>; // owner -> event -> first ISO time

function readLog(): LocalLog {
	try {
		return JSON.parse(localStorage.getItem(KEY) || '{}');
	} catch {
		return {};
	}
}

/** First time this owner did `event` (ISO string), from the local log. */
export function firstSeen(event: ProductEvent, owner = getCredentials().email || 'anonymous'): string | undefined {
	if (typeof localStorage === 'undefined') return undefined;
	return readLog()[owner]?.[event];
}

export function track(event: ProductEvent, props: Record<string, unknown> = {}): void {
	if (typeof window === 'undefined') return;
	const owner = getCredentials().email || 'anonymous';
	const at = new Date().toISOString();
	try {
		const log = readLog();
		log[owner] = log[owner] ?? {};
		if (!log[owner]![event]) log[owner]![event] = at;
		localStorage.setItem(KEY, JSON.stringify(log));
	} catch {
		/* storage full or blocked */
	}
	if (owner === 'anonymous') return;
	const step = SERVER_STEPS[event];
	if (step) void markStepDone(step);
	void props;
}

const SERVER_STEPS: Partial<Record<string, StepId>> = {
	preview_shown: 'preview_seen',
	widget_copied: 'widget_installed'
};
