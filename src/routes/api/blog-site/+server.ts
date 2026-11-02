// WS15. Same-origin lookup of a public blog by handle (or legacy owner email) or by custom domain.
// Used by the domain router (src/hooks.ts) and the blog layout. Proxies the backend and caches
// answers in memory so every page view does not cost a backend call.
import { json, type RequestHandler } from '@sveltejs/kit';
import { apiBase, fetchWithTimeout } from '../../../components/articles/blog';

type Entry = { status: number; body: unknown; until: number };
const cache = new Map<string, Entry>();
const HIT_MS = 5 * 60_000;
const MISS_MS = 60_000;

export const GET: RequestHandler = async ({ url, fetch }) => {
	const holder = (url.searchParams.get('holder') ?? '').trim().slice(0, 320);
	const domain = (url.searchParams.get('domain') ?? '').trim().toLowerCase().slice(0, 253);
	if (!holder && !domain) return json({ error: 'Add holder or domain.' }, { status: 400 });
	const key = domain ? `d:${domain}` : `h:${holder.toLowerCase()}`;
	const hit = cache.get(key);
	if (hit && hit.until > Date.now()) return json(hit.body, { status: hit.status, headers: { 'cache-control': 'public, max-age=60' } });

	const qs = domain ? `domain=${encodeURIComponent(domain)}` : `holder=${encodeURIComponent(holder)}`;
	let status = 502;
	let body: unknown = { error: 'The blog service did not respond.' };
	try {
		const r = await fetchWithTimeout(fetch, `${apiBase(url.origin)}/public/blog-site?${qs}`, 8000);
		status = r.status === 200 ? 200 : r.status === 404 ? 404 : 502;
		body = status === 200 ? await r.json() : { error: status === 404 ? 'Blog not found.' : 'The blog service did not respond.' };
	} catch {
		/* 502 below, not cached for long */
	}
	if (status !== 502) cache.set(key, { status, body, until: Date.now() + (status === 200 ? HIT_MS : MISS_MS) });
	if (cache.size > 2000) cache.delete(cache.keys().next().value as string);
	return json(body, { status, headers: { 'cache-control': status === 200 ? 'public, max-age=60' : 'no-store' } });
};
