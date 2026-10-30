/**
 * Optimistic update with rollback. Apply the change to the UI at once, run
 * the server call, and restore the previous value if it fails.
 *
 *   await optimistic({
 *     apply: () => setEnabled(id, true),
 *     rollback: () => setEnabled(id, false),
 *     commit: () => toggleAutomation(id, true),
 *     onError: (msg) => toast(msg)
 *   });
 */
import { toUserMessage } from '$lib/api/errors';

export async function optimistic<T>(opts: {
	apply: () => void;
	rollback: () => void;
	commit: () => Promise<T>;
	onError?: (message: string, error: unknown) => void;
	errorMessage?: string;
}): Promise<{ ok: true; value: T } | { ok: false; message: string }> {
	opts.apply();
	try {
		const value = await opts.commit();
		return { ok: true, value };
	} catch (e) {
		opts.rollback();
		const message = toUserMessage(e, opts.errorMessage ?? 'We could not save that change. Try again.');
		opts.onError?.(message, e);
		return { ok: false, message };
	}
}

/**
 * Serialize toggles on the same key: the last click wins and earlier pending
 * calls do not roll back a newer state.
 */
const versions = new Map<string, number>();
export async function optimisticToggle(
	key: string,
	next: boolean,
	set: (value: boolean) => void,
	commit: (value: boolean) => Promise<unknown>,
	onError?: (message: string) => void
): Promise<boolean> {
	const version = (versions.get(key) ?? 0) + 1;
	versions.set(key, version);
	set(next);
	try {
		await commit(next);
		return true;
	} catch (e) {
		if (versions.get(key) === version) {
			set(!next);
			onError?.(toUserMessage(e, 'We could not save that change. Try again.'));
		}
		return false;
	}
}
