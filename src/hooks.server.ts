/**
 * Server hooks: security headers on every response and no caching for
 * private pages. The content security policy itself is configured in
 * svelte.config.js (kit.csp, report-only for now) so SvelteKit can add nonces.
 */
import type { Handle, HandleServerError } from '@sveltejs/kit';

const PRIVATE_PREFIXES = ['/admin', '/dashboard', '/oauth', '/api', '/login', '/signup', '/start'];
const EMBEDDABLE_PREFIXES = ['/subscribe-widget', '/subscribe'];

export const handle: Handle = async ({ event, resolve }) => {
	const response = await resolve(event);
	const path = event.url.pathname;
	const h = response.headers;

	const set = (name: string, value: string) => {
		if (!h.has(name)) {
			try {
				h.set(name, value);
			} catch {
				/* immutable headers (for example a proxied fetch response) */
			}
		}
	};

	set('X-Content-Type-Options', 'nosniff');
	set('Referrer-Policy', 'strict-origin-when-cross-origin');
	set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
	set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
	if (event.url.protocol === 'https:') set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

	const embeddable = EMBEDDABLE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
	if (embeddable) {
		// Owners embed the signup form on their own sites.
		set('Content-Security-Policy', "frame-ancestors *; object-src 'none'; base-uri 'self'");
	} else {
		set('X-Frame-Options', 'DENY');
		set('Content-Security-Policy', "frame-ancestors 'none'; object-src 'none'; base-uri 'self'");
	}

	if (PRIVATE_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`))) {
		set('Cache-Control', 'no-store');
		set('X-Robots-Tag', 'noindex, nofollow');
	}
	return response;
};

/** Never leak stack traces or backend details to the browser. */
export const handleError: HandleServerError = ({ error, event, status }) => {
	const id = Math.random().toString(36).slice(2, 10);
	if (status !== 404) console.error(`[server-error ${id}] ${event.request.method} ${event.url.pathname}`, error);
	return {
		message: status === 404 ? 'We could not find this page.' : `Something went wrong on our side. Try again in a few minutes. (Reference ${id})`
	};
};
