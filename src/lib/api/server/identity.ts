/**
 * Server-only helpers for SvelteKit endpoints (+server.ts). Never import from
 * client code.
 */
import { json } from '@sveltejs/kit';
import { request, seg } from '../client';

export type VerifiedOwner = { email: string };

/**
 * Check the caller's x-auth-email / x-auth-code against the backend.
 * Returns the verified email, or null.
 */
export async function verifyOwner(req: Request, origin: string, fetchFn: typeof fetch = fetch): Promise<VerifiedOwner | null> {
	const authorization = (req.headers.get('authorization') ?? '').trim();
	if (authorization.startsWith('Bearer aiban_s_') && authorization.length < 600) {
		try {
			const s = await request<{ email?: string }>('/v1/auth/session', {
				auth: { headers: { Authorization: authorization } },
				origin,
				fetch: fetchFn,
				retries: 1,
				dedupe: false,
				timeoutMs: 10_000
			});
			if (s?.email) return { email: s.email.toLowerCase() };
		} catch {
			/* fall through to the legacy code */
		}
	}
	const email = (req.headers.get('x-auth-email') ?? '').trim().toLowerCase();
	const code = (req.headers.get('x-auth-code') ?? '').trim();
	if (!email || !code || email.length > 254 || code.length > 4096) return null;
	try {
		await request(`/auth/${seg(email)}`, { auth: 'none', query: { code }, origin, fetch: fetchFn, retries: 1, dedupe: false, timeoutMs: 10_000 });
		return { email };
	} catch {
		return null;
	}
}

export const jsonError = (status: number, error: string, extra: Record<string, unknown> = {}) =>
	json({ error, ...extra }, { status, headers: { 'cache-control': 'no-store' } });

/** Fixed-window per-key rate limiter (in memory, per server instance). */
export function createRateLimiter(limit: number, windowMs: number) {
	const hits = new Map<string, { count: number; resetAt: number }>();
	return (key: string): { ok: boolean; retryAfter: number } => {
		const now = Date.now();
		if (hits.size > 10_000) for (const [k, v] of hits) if (v.resetAt < now) hits.delete(k);
		const entry = hits.get(key);
		if (!entry || entry.resetAt < now) {
			hits.set(key, { count: 1, resetAt: now + windowMs });
			return { ok: true, retryAfter: 0 };
		}
		entry.count++;
		return { ok: entry.count <= limit, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
	};
}

/** Remembers ids already processed (webhook idempotency inside one instance). */
export function createSeenSet(max = 5000) {
	const seen = new Map<string, number>();
	return {
		has: (id: string) => seen.has(id),
		add: (id: string) => {
			seen.set(id, Date.now());
			if (seen.size > max) seen.delete(seen.keys().next().value as string);
		}
	};
}
