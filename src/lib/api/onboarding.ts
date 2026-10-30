/**
 * Getting-started checklist state from the server (GET/PATCH /v1/onboarding).
 * The backend derives most steps; `preview_seen` and `widget_installed` are
 * only known to the browser, so mark them with markStepDone().
 */
import { writable, type Readable } from 'svelte/store';
import { request, withFallback } from './client';

export type StepId = 'source_added' | 'voice_set' | 'preview_seen' | 'sender_connected' | 'first_subscriber' | 'first_send' | 'automation_on' | 'widget_installed';
export type OnboardingStep = { id: StepId; done: boolean; doneAt?: string; source: 'derived' | 'manual' };
export type OnboardingState = { steps: OnboardingStep[]; completed: boolean; dismissed: boolean; nextStepId: StepId | null; activated: boolean };

const state = writable<OnboardingState | null>(null);
/** Last known checklist (null until loaded or when the endpoint is not live). */
export const onboarding: Readable<OnboardingState | null> = { subscribe: state.subscribe };

export async function loadOnboarding(): Promise<OnboardingState | null> {
	const s = await withFallback<OnboardingState | null>(() => request<OnboardingState>('/v1/onboarding', { dedupe: true }), () => null, true).catch(() => null);
	state.set(s);
	return s;
}

export async function patchOnboarding(patch: { done?: StepId[]; undone?: StepId[]; dismissed?: boolean }): Promise<OnboardingState | null> {
	const s = await withFallback<OnboardingState | null>(
		() => request<OnboardingState>('/v1/onboarding', { method: 'PATCH', body: patch, idempotent: true, retries: 1 }),
		() => null
	);
	if (s) state.set(s);
	return s;
}

export const markStepDone = (id: StepId) => patchOnboarding({ done: [id] }).catch(() => null);
export const dismissChecklist = () => patchOnboarding({ dismissed: true });
