// WS15. Owner blogs on their own domain: https://blog.theircompany.com/<article> is served by
// /blog/<handle>/<article>. Requests on AIBAN's own hosts are not touched.
import type { Reroute } from '@sveltejs/kit';
import { isOwnHost } from '$lib/blog/hosts';

const cache = new Map<string, { handle: string | null; until: number }>();

async function handleFor(host: string, f: typeof fetch): Promise<string | null> {
	const hit = cache.get(host);
	if (hit && hit.until > Date.now()) return hit.handle;
	let handle: string | null = null;
	let ok = false;
	try {
		const r = await f(`/api/blog-site?domain=${encodeURIComponent(host)}`);
		ok = r.status === 200 || r.status === 404;
		if (r.status === 200) handle = ((await r.json()) as { handle?: string }).handle ?? null;
	} catch {
		/* treated as unknown for a short while */
	}
	cache.set(host, { handle, until: Date.now() + (handle ? 5 * 60_000 : ok ? 60_000 : 5_000) });
	return handle;
}

/** Path on the owner's domain -> app route. Exported for tests. */
export function blogRoute(path: string, handle: string): string | undefined {
	if (path === '/' || path === '') return `/blog/${handle}`;
	if (path === '/sitemap.xml') return `/blog/${handle}/sitemap.xml`;
	if (path === '/search' || path === '/search/') return `/blog/${handle}/search`;
	const seg = path.replace(/^\/+|\/+$/g, '');
	if (seg && !seg.includes('/')) return `/blog/${handle}/${seg}`;
	return undefined;
}

const PASS = ['/_app/', '/api/', '/blog/', '/subscribe', '/confirm-subscription'];

export const reroute: Reroute = async ({ url, fetch }) => {
	if (isOwnHost(url.hostname)) return;
	const path = url.pathname;
	if (path === '/robots.txt' || PASS.some((p) => path.startsWith(p))) return;
	const handle = await handleFor(url.hostname.toLowerCase(), fetch);
	if (!handle) return '/blog/__unknown-domain__';
	return blogRoute(path, handle);
};
