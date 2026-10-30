/** Receives CSP violation reports (report-only policy in svelte.config.js) and logs a short line. */
import type { RequestHandler } from './$types';
import { createRateLimiter } from '$lib/api/server/identity';

const limiter = createRateLimiter(30, 60_000);

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
	let ip = 'unknown';
	try {
		ip = getClientAddress();
	} catch {}
	if (!limiter(ip).ok) return new Response(null, { status: 204 });
	try {
		const text = (await request.text()).slice(0, 4000);
		const body = JSON.parse(text);
		const r = body['csp-report'] ?? body?.[0]?.body ?? body;
		console.warn('[csp]', r?.['violated-directive'] ?? r?.effectiveDirective, r?.['blocked-uri'] ?? r?.blockedURL, r?.['document-uri'] ?? r?.documentURL);
	} catch {
		/* ignore malformed reports */
	}
	return new Response(null, { status: 204 });
};
