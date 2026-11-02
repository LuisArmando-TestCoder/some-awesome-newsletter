// robots.txt, per host (WS15). AIBAN's site keeps its rules; an owner's blog domain allows
// everything and points to its own sitemap.
import type { RequestHandler } from '@sveltejs/kit';
import { isOwnHost } from '$lib/blog/hosts';
import { SITE_URL } from '$lib/content/seo';

const OWN = `# AIBAN robots policy. Owner: WS2.
User-agent: *
Allow: /
Disallow: /dashboard
Disallow: /admin
Disallow: /api/
Disallow: /login
Disallow: /signup
Disallow: /start
Disallow: /oauth
Disallow: /test-styles
Disallow: /test-checklist
Disallow: /test-showcase
Disallow: /tags-test

Sitemap: ${SITE_URL}/sitemap.xml
`;

export const GET: RequestHandler = ({ url }) => {
	const body = isOwnHost(url.hostname)
		? OWN
		: `User-agent: *\nAllow: /\n\nSitemap: https://${url.hostname}/sitemap.xml\n`;
	return new Response(body, { headers: { 'content-type': 'text/plain; charset=utf-8', 'cache-control': 'public, max-age=3600' } });
};
