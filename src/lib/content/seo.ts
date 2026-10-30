// SEO helpers for public pages. Owner: WS2.
export const SITE_URL = 'https://aibanewsletter.club';
export const SITE_NAME = 'AIBAN';
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo/logo_large.png`;

/** Absolute canonical URL for a path such as "/pricing". */
export function canonical(path = '/'): string {
	const clean = path.startsWith('/') ? path : `/${path}`;
	return `${SITE_URL}${clean === '/' ? '/' : clean.replace(/\/+$/, '')}`;
}

/**
 * Serializes a JSON-LD object into a script tag for use with {@html}.
 * "<" is escaped so the payload can never close the script element.
 */
export function jsonLd(data: unknown): string {
	const json = JSON.stringify(data).replace(/</g, '\\u003c');
	return `<script type="application/ld+json">${json}</` + `script>`;
}

export const organizationLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: SITE_NAME,
	url: `${SITE_URL}/`,
	logo: DEFAULT_OG_IMAGE,
	email: 'info@aiban.news'
};

/** Public, indexable marketing routes. Used by sitemap.xml. */
export const PUBLIC_ROUTES = [
	'/',
	'/pricing',
	'/demo',
	'/help',
	'/about',
	'/careers',
	'/legal/privacy',
	'/legal/terms',
	'/legal/cookies'
];
