// WS15. Which host names are AIBAN's own site. Any other host that reaches the app is an
// owner's custom blog domain (blog.theircompany.com), routed to their blog by src/hooks.ts.
const OWN = ['aiban.news', 'aibanewsletter.club', 'vercel.app', 'onrender.com', 'localhost'];

export function isOwnHost(hostname: string): boolean {
	const h = (hostname || '').toLowerCase().replace(/\.$/, '');
	if (!h || h === '127.0.0.1' || h === '0.0.0.0' || h === '[::1]' || /^\d+\.\d+\.\d+\.\d+$/.test(h)) return true;
	return OWN.some((d) => h === d || h.endsWith(`.${d}`));
}

/** What a blog page needs to build its links and canonical URLs. */
export interface BlogRef {
	/** Public blog handle, used in API calls and subscribe links. */
	handle: string;
	/** Path prefix for blog links: "/blog/<handle>" on AIBAN's site, "" on the owner's domain. */
	base: string;
	/** Absolute origin for canonical and share links. */
	origin: string;
}

export interface PublicBlogSite {
	handle: string;
	domain: string | null;
	name: string;
	origin: string;
}
