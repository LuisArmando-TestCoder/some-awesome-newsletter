/**
 * Support / higher-limits request (HelpForm, WS2).
 * POST JSON with the HelpForm fields. Validated and rate limited here, then
 * forwarded to the backend POST /support (requested from WS7), which emails
 * the team. Until that endpoint exists this answers 501 and the form keeps
 * its email fallback.
 */
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { request as apiRequest } from '$lib/api/client';
import { isApiError } from '$lib/api/errors';
import { createRateLimiter, jsonError } from '$lib/api/server/identity';

const limiter = createRateLimiter(5, 60 * 60_000);

const Body = z.object({
	name: z.string().trim().min(2).max(120),
	email: z.string().trim().email().max(254),
	company: z.string().trim().max(160).optional(),
	desiredLimits: z.string().trim().min(10).max(2000),
	useCase: z.string().trim().min(20).max(4000),
	expectedSpend: z.enum(['lt500', '500_2k', '2k_10k', 'gt10k', 'unknown']),
	urgency: z.enum(['low', 'normal', 'high']),
	contact: z.enum(['email', 'call']),
	payAsYouGo: z.boolean()
});

export const POST: RequestHandler = async ({ request, url, fetch, getClientAddress }) => {
	let ip = 'unknown';
	try {
		ip = getClientAddress();
	} catch {
		// Some adapters cannot report the client address: keep "unknown".
	}
	const rl = limiter(ip);
	if (!rl.ok) return jsonError(429, 'You already sent a few requests. We will reply by email.', { retryAfter: rl.retryAfter });

	const parsed = Body.safeParse(await request.json().catch(() => null));
	if (!parsed.success) return jsonError(400, 'Some details are missing. Check the form and try again.');

	try {
		await apiRequest('/support', { method: 'POST', auth: 'none', origin: url.origin, fetch, body: { kind: 'higher_limits', ...parsed.data }, retries: 0 });
		return json({ success: true, message: 'Thanks. We will reply by email.' });
	} catch (e) {
		if (isApiError(e) && (e.status === 404 || e.status === 501)) {
			return jsonError(501, 'Sending from this form is not available yet. Use the email option instead.');
		}
		return jsonError(502, 'We could not send your request. Try again, or use the email option.');
	}
};
