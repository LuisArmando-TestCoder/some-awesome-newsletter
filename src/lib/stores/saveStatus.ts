/**
 * Visible save state for autosaved settings. Bind in the UI:
 *   {#if $saveStatus.state === 'saving'}Saving...{/if}
 * `label` is ready to show (sentence case, copy rules).
 */
import { derived, writable } from 'svelte/store';

export type SaveState = 'idle' | 'dirty' | 'saving' | 'saved' | 'error';
export type SaveStatusValue = {
	state: SaveState;
	/** Ready-to-show text for a small status line. Empty when idle. */
	label: string;
	/** User facing error message when state is 'error'. */
	error?: string;
	lastSavedAt?: number;
	/** Call to retry the last failed save. */
	retry?: () => void;
};

const LABELS: Record<SaveState, string> = {
	idle: '',
	dirty: 'Unsaved changes',
	saving: 'Saving...',
	saved: 'All changes saved',
	error: 'Not saved'
};

function createSaveStatus() {
	const { subscribe, set, update } = writable<SaveStatusValue>({ state: 'idle', label: '' });
	let savedTimer: ReturnType<typeof setTimeout> | null = null;
	return {
		subscribe,
		markDirty: () => update((s) => (s.state === 'saving' ? s : { ...s, state: 'dirty', label: LABELS.dirty, error: undefined })),
		markSaving: () => set({ state: 'saving', label: LABELS.saving }),
		markSaved: () => {
			const now = Date.now();
			set({ state: 'saved', label: LABELS.saved, lastSavedAt: now });
			if (savedTimer) clearTimeout(savedTimer);
			// Fade back to idle so the indicator does not stay forever.
			savedTimer = setTimeout(() => update((s) => (s.state === 'saved' ? { ...s, state: 'idle', label: '' } : s)), 4000);
		},
		markError: (error: string, retry?: () => void) => set({ state: 'error', label: LABELS.error, error, retry }),
		reset: () => set({ state: 'idle', label: '' })
	};
}

export const saveStatus = createSaveStatus();

/** True while there is something not yet saved (for beforeunload guards). */
export const hasUnsavedChanges = derived(saveStatus, (s) => s.state === 'dirty' || s.state === 'saving' || s.state === 'error');
