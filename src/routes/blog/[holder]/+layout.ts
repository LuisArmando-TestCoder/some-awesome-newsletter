// WS15. Resolves the blog once for every page under /blog/<holder> (and the owner's own domain,
// which src/hooks.ts reroutes here). Sends readers to the one address Google should index:
//   - an email or an old handle in the URL -> the current handle (301)
//   - a blog with a live custom domain, opened on AIBAN's site -> the same page on that domain (301)
import { error, redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import { isOwnHost, type PublicBlogSite } from '$lib/blog/hosts';
import { blogRef } from '../../../components/articles/blog';

export const load: LayoutLoad = async ({ params, url, fetch }) => {
	const holder = params.holder;
	let site: PublicBlogSite | null = null;
	let status = 0;
	try {
		const r = await fetch(`/api/blog-site?holder=${encodeURIComponent(holder)}`);
		status = r.status;
		if (r.ok) site = (await r.json()) as PublicBlogSite;
	} catch {
		status = 502;
	}
	if (!site) {
		if (status === 404 || holder === '__unknown-domain__') error(404, 'Blog not found');
		// Backend unreachable: keep serving with the holder as is, so the pages can show their own error state.
		site = { handle: holder, domain: null, name: '', origin: '' };
	}

	const own = isOwnHost(url.hostname);
	// Path inside the blog: "" for the home page, "/<article>", "/search", ...
	const prefix = `/blog/${holder}`;
	const decoded = decodeURIComponent(url.pathname);
	const rest = own && decoded.startsWith(prefix) ? decoded.slice(prefix.length) : own ? '' : url.pathname.replace(/\/$/, '');

	if (own && site.domain) redirect(301, `https://${site.domain}${rest || '/'}${url.search}`);
	if (own && holder !== site.handle) redirect(301, `/blog/${encodeURIComponent(site.handle)}${rest}${url.search}`);

	return { site, ref: blogRef(site, url), holder: site.handle };
};
