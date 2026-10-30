/**
 * Support / higher-limits request (HelpForm, WS2).
 * POST JSON with the HelpForm fields. Validated and rate limited here, then
 * forwarded to the backend POST /support, which stores it in supportRequests
 * for the admin team. On any failure the form keeps its email fallback.
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
		const d = parsed.data;
		// The backend contract (POST /support) needs `message`; the form's own fields travel as extras.
		const body = {
			kind: 'sales',
			subject: 'Higher limits request',
			name: d.name,
			email: d.email,
			message: `What they need: ${d.desiredLimits}\n\nHow they use AIBAN: ${d.useCase}`,
			page: '/help',
			company: d.company ?? '',
			expectedSpend: d.expectedSpend,
			urgency: d.urgency,
			contact: d.contact,
			payAsYouGo: d.payAsYouGo
		};
		await apiRequest('/support', { method: 'POST', auth: 'none', origin: url.origin, fetch, body, retries: 0 });
		return json({ success: true, message: 'Thanks. We will reply by email.' });
	} catch (e) {
		if (isApiError(e) && e.status === 429) {
			return jsonError(429, 'You already sent a few requests. We will reply by email.');
		}
		if (isApiError(e) && (e.status === 404 || e.status === 501)) {
			return jsonError(501, 'Sending from this form is not available yet. Use the email option instead.');
		}
		return jsonError(502, 'We could not send your request. Try again, or use the email option.');
	}
};
