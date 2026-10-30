/**
 * Where the signed-in owner's credentials live, read in one place.
 *
 * Today the backend authenticates with `x-auth-email` + `x-auth-code`
 * (see docs/aiban/API_CONTRACT.md). The values are persisted by store.ts in
 * localStorage as JSON strings under `configuratorEmail` and `authCode`.
 * Everything here is SSR safe: on the server it returns empty credentials.
 */
export type Credentials = {
	email: string;
	code: string;
	/** Session token issued by GET /auth/:email ("aiban_s_..."), sent as a Bearer header on every request. */
	sessionToken?: string;
	tokenId?: string;
	clientId?: string;
	language?: string;
};

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

function readJson(key: string): unknown {
	if (!isBrowser()) return null;
	try {
		const raw = localStorage.getItem(key);
		if (raw == null || raw === '') return null;
		try {
			return JSON.parse(raw);
		} catch {
			return raw;
		}
	} catch {
		return null;
	}
}

function asString(v: unknown): string {
	return typeof v === 'string' ? v.trim() : '';
}

export function getCredentials(): Credentials {
	return {
		email: asString(readJson('configuratorEmail')),
		code: asString(readJson('authCode')),
		sessionToken: validSessionToken(),
		tokenId: asString(readJson('tokenId')) || undefined,
		clientId: asString(readJson('clientId')) || undefined,
		language:
			asString(readJson('dashboardLanguage')) || asString(readJson('globalLanguage')) || asString(readJson('lang')) || undefined
	};
}

export function hasCredentials(c: Credentials = getCredentials()): boolean {
	return Boolean(c.sessionToken || (c.email && c.code));
}

/* ----------------------------------------------------------------------------
 * Session token (decision by Luis, 2026-10-30): no cookie. The token travels as
 * "Authorization: Bearer <token>" on every request over HTTPS. Stored in
 * localStorage under SESSION_KEY; cleared on sign out or when the API answers 401.
 * -------------------------------------------------------------------------- */
export const SESSION_KEY = 'sessionToken';
export const SESSION_EXPIRES_KEY = 'sessionExpiresAt';

function validSessionToken(): string | undefined {
	const token = asString(readJson(SESSION_KEY));
	if (!token) return undefined;
	const exp = Date.parse(asString(readJson(SESSION_EXPIRES_KEY)));
	if (Number.isFinite(exp) && exp <= Date.now()) return undefined;
	return token;
}

export function setSessionToken(token: string | undefined, expiresAt?: string): void {
	if (!isBrowser()) return;
	try {
		if (token) {
			localStorage.setItem(SESSION_KEY, JSON.stringify(token));
			if (expiresAt) localStorage.setItem(SESSION_EXPIRES_KEY, JSON.stringify(expiresAt));
		} else {
			localStorage.removeItem(SESSION_KEY);
			localStorage.removeItem(SESSION_EXPIRES_KEY);
		}
	} catch {
		/* storage blocked: the legacy code headers still work */
	}
}

/** Header values must be ISO-8859-1 for fetch(); anything else would throw before sending. */
function headerSafe(value: string): string {
	// eslint-disable-next-line no-control-regex
	return /^[\x00-\xFF]*$/.test(value) ? value : encodeURIComponent(value);
}

/** Auth headers for the backend. Only the headers the backend reads. */
export function authHeaders(c: Credentials = getCredentials()): Record<string, string> {
	const h: Record<string, string> = {};
	if (c.sessionToken) h['Authorization'] = `Bearer ${headerSafe(c.sessionToken)}`;
	// x-auth-email stays: several legacy routes still read the tenant from it.
	if (c.email) h['x-auth-email'] = headerSafe(c.email);
	if (c.code) h['x-auth-code'] = headerSafe(c.code);
	if (c.tokenId) h['x-auth-token-id'] = headerSafe(c.tokenId);
	if (c.clientId) h['x-auth-client-id'] = headerSafe(c.clientId);
	if (c.language) h['x-user-language'] = headerSafe(c.language);
	return h;
}
