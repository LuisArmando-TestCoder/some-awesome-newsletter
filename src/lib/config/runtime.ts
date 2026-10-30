/**
 * Public, client-safe runtime settings. Values can be overridden with
 * PUBLIC_* environment variables (read through $env/dynamic/public).
 */
import { env } from '$env/dynamic/public';

const read = (key: `PUBLIC_${string}`, fallback: string) => {
	try {
		return (env[key] ?? '').trim() || fallback;
	} catch {
		return fallback; // prerendering has no dynamic env
	}
};

export const runtime = {
	appName: read('PUBLIC_APP_NAME', 'AIBAN'),
	legal: {
		termsUrl: read('PUBLIC_TERMS_URL', '/legal/terms'),
		privacyUrl: read('PUBLIC_PRIVACY_URL', '/legal/privacy'),
		cookiesUrl: read('PUBLIC_COOKIES_URL', '/legal/cookies')
	},
	/** Mock auth is off unless PUBLIC_AUTH_FORCE_MOCK=true (Google sign-in runs through /login). */
	isMockMode: read('PUBLIC_AUTH_FORCE_MOCK', '').toLowerCase() === 'true'
};
