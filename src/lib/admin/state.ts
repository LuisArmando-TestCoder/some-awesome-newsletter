/**
 * Shared admin data so the admin pages do not refetch on every navigation.
 * `access` gates the whole /admin area; `tenants` and `overview` are loaded once
 * and refreshed after edits or with refreshAll(true).
 */
import { get, writable } from 'svelte/store';
import { getMe, getOverview, isNotAdmin, listTenants, type AdminMe, type AdminOverview, type AdminTenant } from '$lib/api/admin';
import { hasCredentials } from '$lib/api/credentials';
import { isApiError, toUserMessage } from '$lib/api/errors';

export type AccessState =
	| { phase: 'checking' }
	| { phase: 'signed_out' }
	| { phase: 'not_admin'; email: string }
	| { phase: 'error'; message: string }
	| { phase: 'ok'; me: AdminMe };

export const access = writable<AccessState>({ phase: 'checking' });
export const overview = writable<AdminOverview | null>(null);
export const tenants = writable<AdminTenant[]>([]);
export const tenantsLoading = writable(false);
export const tenantsError = writable('');
let loadedAt = 0;

export async function checkAccess(): Promise<void> {
	if (!hasCredentials()) return access.set({ phase: 'signed_out' });
	access.set({ phase: 'checking' });
	try {
		const me = await getMe();
		access.set(me.isAdmin ? { phase: 'ok', me } : { phase: 'not_admin', email: me.email });
	} catch (e) {
		if (isApiError(e) && e.code === 'unauthorized') access.set({ phase: 'signed_out' });
		else if (isNotAdmin(e)) access.set({ phase: 'not_admin', email: '' });
		else access.set({ phase: 'error', message: toUserMessage(e) });
	}
}

/** Loads overview and every tenant (the list is filtered in the browser). */
export async function refreshAll(fresh = false): Promise<void> {
	if (!fresh && get(tenants).length && Date.now() - loadedAt < 60_000) return;
	tenantsLoading.set(true);
	tenantsError.set('');
	try {
		const [o, list] = await Promise.all([getOverview(), listTenants({ limit: 500, fresh })]);
		overview.set(o);
		tenants.set(list.items);
		loadedAt = Date.now();
	} catch (e) {
		tenantsError.set(toUserMessage(e));
	} finally {
		tenantsLoading.set(false);
	}
}

/** Replace one tenant after an edit, and refresh totals in the background. */
export function upsertTenant(t: AdminTenant): void {
	tenants.update((list) => (list.some((x) => x.id === t.id) ? list.map((x) => (x.id === t.id ? { ...x, ...t } : x)) : [...list, t]));
	getOverview()
		.then((o) => overview.set(o))
		.catch(() => {});
}
