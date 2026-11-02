// Sitemap index (WS15): AIBAN's pages plus one sitemap per public blog that lives on AIBAN's
// site. Blogs on their owner's own domain are listed in that domain's /sitemap.xml instead.
// On an owner's domain this path is rerouted to their blog sitemap (src/hooks.ts).
import type { RequestHandler } from '@sveltejs/kit';
import { SITE_URL } from '$lib/content/seo';
import { apiBase, fetchWithTimeout } from '../../components/articles/blog';

type Blog = { holder: string; domain?: string | null; lastArticleAt: string | null };

export const GET: RequestHandler = async ({ url, fetch }) => {
	let blogs: Blog[] = [];
	try {
		const r = await fetchWithTimeout(fetch, `${apiBase(url.origin)}/public/blogs`, 8000);
		if (r.ok) blogs = ((await r.json()) as Blog[]).filter((b) => b && /^[a-z0-9-]{3,40}$/.test(b.holder) && !b.domain);
	} catch {
		/* the index still lists AIBAN's pages */
	}
	const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
	const entries = [
		`  <sitemap><loc>${SITE_URL}/sitemap-pages.xml</loc></sitemap>`,
		...blogs.map(
			(b) =>
				`  <sitemap><loc>${esc(`${SITE_URL}/blog/${b.holder}/sitemap.xml`)}</loc>${b.lastArticleAt ? `<lastmod>${esc(b.lastArticleAt)}</lastmod>` : ''}</sitemap>`
		)
	].join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${entries}\n</sitemapindex>\n`;
	return new Response(body, { headers: { 'content-type': 'application/xml; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
};
