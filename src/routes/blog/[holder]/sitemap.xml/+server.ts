// One blog's sitemap (WS15): the blog home and every article, with each article's language
// versions as hreflang alternates. Served at /blog/<handle>/sitemap.xml on AIBAN's site and at
// /sitemap.xml on the owner's own domain.
import { error, type RequestHandler } from '@sveltejs/kit';
import { isOwnHost, type PublicBlogSite } from '$lib/blog/hosts';
import { SITE_URL } from '$lib/content/seo';
import { apiBase, creationToIso, fetchWithTimeout } from '../../../../components/articles/blog';

const PAGE = 50;
const MAX_URLS = 2000;

type Card = { id?: string; creation?: string; language?: string; groupId?: string };
type Bucket = { withImages?: Card[]; withoutImages?: Card[]; totalWithImages?: number; totalWithoutImages?: number };

export const GET: RequestHandler = async ({ params, url, fetch }) => {
	const site = await fetch(`/api/blog-site?holder=${encodeURIComponent(params.holder ?? '')}`)
		.then((r) => (r.ok ? (r.json() as Promise<PublicBlogSite>) : null))
		.catch(() => null);
	if (!site) error(404, 'Blog not found');
	const own = isOwnHost(url.hostname);
	const origin = own ? `${SITE_URL}/blog/${site.handle}` : `https://${url.hostname}`;
	const api = apiBase(url.origin);

	const articles: Array<{ id: string; lastmod: string }> = [];
	const seen = new Set<string>();
	let langs: string[] = [];
	try {
		const r = await fetchWithTimeout(fetch, `${api}/articles/${encodeURIComponent(site.handle)}/languages`, 8000);
		if (r.ok) langs = (((await r.json()) as { languages?: Array<{ code: string }> }).languages ?? []).map((l) => l.code);
	} catch {
		/* empty sitemap below */
	}
	outer: for (const lang of langs) {
		for (let page = 1; page <= 40; page++) {
			let bucket: Bucket | undefined;
			try {
				const r = await fetchWithTimeout(
					fetch,
					`${api}/articles/${encodeURIComponent(site.handle)}?lang=${encodeURIComponent(lang)}&size=${PAGE}&page=${page}`,
					8000
				);
				if (!r.ok) break;
				bucket = ((await r.json()) as { articles?: Record<string, Bucket> }).articles?.[lang];
			} catch {
				break;
			}
			const cards = [...(bucket?.withImages ?? []), ...(bucket?.withoutImages ?? [])];
			for (const c of cards) {
				if (!c.id || seen.has(c.id)) continue;
				seen.add(c.id);
				articles.push({ id: c.id, lastmod: creationToIso(c.creation ?? '') });
				if (articles.length >= MAX_URLS) break outer;
			}
			const more = (bucket?.withImages?.length ?? 0) >= PAGE || (bucket?.withoutImages?.length ?? 0) >= PAGE;
			if (!more) break;
		}
	}

	const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
	const lines = [
		`  <url><loc>${esc(own ? origin : `${origin}/`)}</loc><changefreq>weekly</changefreq></url>`,
		...articles.map(
			(a) => `  <url><loc>${esc(`${origin}/${encodeURIComponent(a.id)}`)}</loc>${a.lastmod ? `<lastmod>${a.lastmod.slice(0, 10)}</lastmod>` : ''}</url>`
		)
	];
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${lines.join('\n')}\n</urlset>\n`;
	return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
};
