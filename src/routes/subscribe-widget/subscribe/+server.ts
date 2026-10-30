/**
 * Public subscribe proxy used by the subscribe widget and the hosted
 * subscribe page.
 *
 * POST { email, configuratorId, newsSourceId, name?, language?, countryOfResidence? }
 * -> backend POST /public-subscribe (validates the target, sends the
 *    confirmation email). Answers { success, message } or { error }.
 *
 * Changes from the previous version (see docs/aiban/ws6-log.md):
 * - THE_PASS is no longer logged or sent. It let any visitor add any address
 *   to any list without confirmation.
 * - Input is validated and rate limited per IP and per email.
 * - The paid newsletter payment link step is removed (2026-10-30, billing
 *   providers are off). PAID_NEWSLETTER_CONFIGURATORS is no longer read.
 */
import { json } from '@sveltejs/kit';
import { z } from 'zod';
import type { RequestHandler } from './$types';
import { request as apiRequest } from '$lib/api/client';
import { isApiError } from '$lib/api/errors';
import { createRateLimiter, jsonError } from '$lib/api/server/identity';

const perIp = createRateLimiter(20, 10 * 60_000);
const perEmail = createRateLimiter(5, 10 * 60_000);

const Body = z.object({
	email: z.string().trim().toLowerCase().email().max(254),
	configuratorId: z.string().trim().min(3).max(254),
	newsSourceId: z.string().trim().min(1).max(128),
	name: z.string().trim().max(120).optional(),
	language: z.string().trim().max(12).optional(),
	countryOfResidence: z.string().trim().max(3).optional()
});

export const POST: RequestHandler = async ({ request, url, fetch, getClientAddress }) => {
	let ip = 'unknown';
	try {
		ip = getClientAddress();
	} catch {}
	const ipCheck = perIp(ip);
	if (!ipCheck.ok) return jsonError(429, 'Too many attempts in a short time. Wait a moment and try again.', { retryAfter: ipCheck.retryAfter });

	let parsed: z.infer<typeof Body>;
	try {
		const result = Body.safeParse(await request.json());
		if (!result.success) {
			const emailIssue = result.error.issues.some((i) => i.path[0] === 'email');
			return jsonError(400, emailIssue ? 'Enter a valid email address, like name@example.com.' : 'This signup link is incomplete. Ask the newsletter owner for a new link.');
		}
		parsed = result.data;
	} catch {
		return jsonError(400, 'This signup link is incomplete. Ask the newsletter owner for a new link.');
	}

	const emailCheck = perEmail(`${parsed.email}|${parsed.configuratorId}`);
	if (!emailCheck.ok) return jsonError(429, 'You already asked to subscribe. Check your inbox for the confirmation email.', { retryAfter: emailCheck.retryAfter });

	let data: Record<string, unknown>;
	try {
		data = await apiRequest<Record<string, unknown>>('/public-subscribe', {
			method: 'POST',
			auth: 'none',
			origin: url.origin,
			fetch,
			body: {
				configuratorId: parsed.configuratorId,
				newsSourceId: parsed.newsSourceId,
				email: parsed.email,
				name: parsed.name || parsed.email.split('@')[0],
				language: parsed.language,
				countryOfResidence: parsed.countryOfResidence
			},
			errorMessage: 'We could not subscribe you right now. Try again in a few minutes.'
		});
	} catch (e) {
		if (isApiError(e)) {
			const status = e.status >= 400 && e.status < 600 ? e.status : 502;
			const message = e.code === 'not_found' ? 'This newsletter is not accepting signups at this address. Ask the owner for a new link.' : e.userMessage;
			return jsonError(status, message);
		}
		return jsonError(502, 'We could not subscribe you right now. Try again in a few minutes.');
	}

	// The paid newsletter payment link step was removed on 2026-10-30 (billing providers are off).

	return json({ success: true, ...data }, { status: 201 });
};
