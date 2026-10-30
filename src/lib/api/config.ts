/**
 * Single source of truth for the backend base URL.
 *
 * Order: PUBLIC_API_URL env var, then a host based default (localhost uses the
 * local Deno server, everything else the production API). Works on the server
 * and in the browser.
 */
import { env } from '$env/dynamic/public';

export const PRODUCTION_API_URL = 'https://ai-newsletter-translated.onrender.com';
export const LOCAL_API_URL = 'http://localhost:8000';

function isLocalOrigin(origin: string | undefined | null): boolean {
	if (!origin) return false;
	return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?/i.test(origin);
}

/** Base URL of the AIBAN backend, without a trailing slash. */
export function getApiBaseUrl(origin?: string): string {
	const configured = (env.PUBLIC_API_URL ?? '').trim();
	if (configured) return configured.replace(/\/+$/, '');
	const current = typeof window !== 'undefined' ? window.location.origin : origin;
	return isLocalOrigin(current) ? LOCAL_API_URL : PRODUCTION_API_URL;
}

/** Default request timeout in ms. Long running calls pass their own. */
export const DEFAULT_TIMEOUT_MS = 20_000;
/** Timeout for LLM backed calls (selector generation, personality, preview). */
export const LLM_TIMEOUT_MS = 120_000;
