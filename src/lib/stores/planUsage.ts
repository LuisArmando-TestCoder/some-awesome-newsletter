/**
 * Live plan usage for the UI. `planUsage` recomputes from the store whenever
 * the config or subscribers change ("at limit" = used >= limit). Call
 * refreshPlanUsage() to replace the estimate with server numbers
 * (GET /v1/usage counts every subscriber, not only the loaded ones).
 */
import { derived, get, writable } from 'svelte/store';
import store from '../../components/store';
import { computeUsage, getUsage, type UsageWithMonth } from '$lib/api/usage';

const server = writable<UsageWithMonth | null>(null);

export const planUsage = derived([store, server], ([$s, $server]) => {
	const local = computeUsage($s.config, $s.subscribers);
	if (!$server) return local as UsageWithMonth;
	// Server totals win, but a source added a moment ago shows at once.
	return { ...$server, newsSources: local.newsSources.used > $server.newsSources.used ? local.newsSources : $server.newsSources } as UsageWithMonth;
});

export async function refreshPlanUsage(): Promise<void> {
	try {
		const snapshot = get(store);
		server.set(await getUsage(() => computeUsage(snapshot?.config, snapshot?.subscribers)));
	} catch {
		/* keep the local estimate */
	}
}
