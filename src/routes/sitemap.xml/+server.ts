// sitemap.xml for public marketing routes. Owner: WS2 (created for SEO scope; WS6 notified).
// Owner blogs live under /blog/<owner>; they are not listed here because there is no
// public endpoint that lists owners. See docs/aiban/requests/7.md.
import { PUBLIC_ROUTES, canonical } from '$lib/content/seo';

export const prerender = true;

export function GET() {
	const today = new Date().toISOString().slice(0, 10);
	const urls = PUBLIC_ROUTES.map(
		(path) =>
			`  <url><loc>${canonical(path)}</loc><lastmod>${today}</lastmod><changefreq>${
				path === '/' ? 'weekly' : 'monthly'
			}</changefreq><priority>${path === '/' ? '1.0' : '0.6'}</priority></url>`
	).join('\n');
	const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
	return new Response(body, {
		headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'max-age=3600' }
	});
}
