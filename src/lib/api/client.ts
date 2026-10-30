/**
 * Typed HTTP client for the AIBAN backend.
 *
 * - one base URL (config.ts), auth headers injected (credentials.ts)
 * - timeout per call, caller cancellation via AbortSignal
 * - retries with exponential backoff and jitter for idempotent calls only
 * - every failure becomes an ApiError with a user facing message
 * - optional zod validation of the response
 * - concurrent identical GETs are shared (no duplicated fetches)
 */
import type { ZodType } from 'zod';
import { DEFAULT_TIMEOUT_MS, getApiBaseUrl } from './config';
import { authHeaders, getCredentials, hasCredentials, setSessionToken } from './credentials';
import { ApiError, DEFAULT_MESSAGES, errorFromResponse } from './errors';

export type HttpMethod = 'GET' | 'HEAD' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type AuthMode = 'user' | 'none' | { bearer: string } | { headers: Record<string, string> };
export type Query = Record<string, string | number | boolean | null | undefined>;

export type RequestOptions<T> = {
	method?: HttpMethod;
	query?: Query;
	body?: unknown;
	/** 'user' (default) sends the owner's x-auth headers. */
	auth?: AuthMode;
	/** Fail with 'unauthorized' before calling when no credentials are stored. Default true for auth 'user'. */
	requireAuth?: boolean;
	timeoutMs?: number;
	/** Number of retries after the first attempt. Default 2 for GET/HEAD, 0 otherwise. */
	retries?: number;
	/** Mark a non-GET call as safe to retry (for example a PUT that replaces a document). */
	idempotent?: boolean;
	signal?: AbortSignal;
	schema?: ZodType<T>;
	/** 'json' (default), 'text', or 'response' to get the raw Response (no status check). */
	responseType?: 'json' | 'text' | 'response';
	headers?: Record<string, string>;
	/** Server side fetch (SvelteKit load `fetch`) and origin for base URL selection. */
	fetch?: typeof fetch;
	origin?: string;
	/** Absolute base URL override (used by server routes). */
	baseUrl?: string;
	/** User facing message used when the backend text is not presentable. */
	errorMessage?: string;
	/** Share concurrent identical GETs. Default true for GET. */
	dedupe?: boolean;
	/** Sent as Idempotency-Key (8 to 200 of A-Z a-z 0-9 . _ : -). Makes a POST safe to retry. */
	idempotencyKey?: string;
};

const inflight = new Map<string, Promise<unknown>>();

export function buildUrl(path: string, query?: Query, baseUrl?: string, origin?: string): string {
	const base = baseUrl ?? getApiBaseUrl(origin);
	const url = /^https?:\/\//.test(path) ? path : `${base}${path.startsWith('/') ? '' : '/'}${path}`;
	if (!query) return url;
	const params = new URLSearchParams();
	for (const [k, v] of Object.entries(query)) {
		if (v === undefined || v === null || v === '') continue;
		params.append(k, String(v));
	}
	const qs = params.toString();
	return qs ? `${url}${url.includes('?') ? '&' : '?'}${qs}` : url;
}

/** Encode one path segment (emails, ids). */
export const seg = (v: string | number) => encodeURIComponent(String(v));

function resolveAuthHeaders(auth: AuthMode | undefined): Record<string, string> {
	if (!auth || auth === 'user') return authHeaders();
	if (auth === 'none') return {};
	if ('bearer' in auth) return { Authorization: `Bearer ${auth.bearer}` };
	return auth.headers;
}

const sleep = (ms: number, signal?: AbortSignal) =>
	new Promise<void>((resolve, reject) => {
		const t = setTimeout(resolve, ms);
		signal?.addEventListener(
			'abort',
			() => {
				clearTimeout(t);
				reject(new DOMException('Aborted', 'AbortError'));
			},
			{ once: true }
		);
	});

export function backoffDelay(attempt: number, retryAfterSeconds?: number): number {
	if (retryAfterSeconds && retryAfterSeconds > 0) return Math.min(retryAfterSeconds * 1000, 30_000);
	const base = 400 * 2 ** attempt; // 400, 800, 1600 ...
	return Math.min(base + Math.random() * base * 0.5, 8_000);
}

function shouldRetry(err: ApiError): boolean {
	return err.code === 'network' || err.code === 'timeout' || err.status === 502 || err.status === 503 || err.status === 504 || (err.code === 'rate_limited' && !!err.retryAfter && err.retryAfter <= 10);
}

async function parseBody(res: Response): Promise<unknown> {
	const text = await res.text();
	if (!text) return null;
	const type = res.headers.get('content-type') ?? '';
	if (type.includes('json') || /^[\[{"]/.test(text.trim())) {
		try {
			return JSON.parse(text);
		} catch {
			return text;
		}
	}
	return text;
}

async function attempt<T>(url: string, init: RequestInit, opts: RequestOptions<T>): Promise<T> {
	const controller = new AbortController();
	const timeoutMs = opts.timeoutMs ?? DEFAULT_TIMEOUT_MS;
	let timedOut = false;
	const timer = setTimeout(() => {
		timedOut = true;
		controller.abort();
	}, timeoutMs);
	const onAbort = () => controller.abort();
	opts.signal?.addEventListener('abort', onAbort, { once: true });

	const f = opts.fetch ?? fetch;
	let res: Response;
	try {
		res = await f(url, { ...init, signal: controller.signal });
	} catch (e) {
		clearTimeout(timer);
		opts.signal?.removeEventListener('abort', onAbort);
		if (timedOut) throw new ApiError({ status: 0, code: 'timeout', userMessage: DEFAULT_MESSAGES.timeout });
		if (opts.signal?.aborted) throw new ApiError({ status: 0, code: 'aborted', userMessage: DEFAULT_MESSAGES.aborted });
		throw new ApiError({ status: 0, code: 'network', userMessage: DEFAULT_MESSAGES.network, detail: String((e as Error)?.message ?? e) });
	}
	clearTimeout(timer);
	opts.signal?.removeEventListener('abort', onAbort);

	if (opts.responseType === 'response') return res as unknown as T;

	if (!res.ok) {
		const body = await parseBody(res).catch(() => null);
		throw errorFromResponse(res.status, body, res.headers, opts.errorMessage);
	}

	if (opts.responseType === 'text') return (await res.text()) as unknown as T;

	const data = res.status === 204 ? null : await parseBody(res);
	if (opts.schema) {
		const parsed = opts.schema.safeParse(data);
		if (!parsed.success) {
			throw new ApiError({
				status: res.status,
				code: 'invalid_response',
				userMessage: opts.errorMessage ?? DEFAULT_MESSAGES.invalid_response,
				detail: parsed.error.message.slice(0, 500),
				body: data
			});
		}
		return parsed.data;
	}
	return data as T;
}

/** Call the backend. Throws ApiError on any failure. */
export async function request<T = unknown>(path: string, opts: RequestOptions<T> = {}): Promise<T> {
	const method = opts.method ?? 'GET';
	const auth = opts.auth ?? 'user';
	if (auth === 'user' && (opts.requireAuth ?? false) && !hasCredentials(getCredentials())) {
		throw new ApiError({ status: 401, code: 'unauthorized', userMessage: DEFAULT_MESSAGES.unauthorized });
	}
	const url = buildUrl(path, opts.query, opts.baseUrl, opts.origin);
	const headers: Record<string, string> = {
		Accept: 'application/json',
		...resolveAuthHeaders(auth),
		...(opts.headers ?? {})
	};
	if (opts.idempotencyKey) headers['Idempotency-Key'] = opts.idempotencyKey;
	let body: BodyInit | undefined;
	if (opts.body !== undefined && method !== 'GET' && method !== 'HEAD') {
		if (typeof opts.body === 'string' || opts.body instanceof FormData || opts.body instanceof Blob) {
			body = opts.body as BodyInit;
		} else {
			body = JSON.stringify(opts.body);
			headers['Content-Type'] = 'application/json';
		}
	}
	const init: RequestInit = { method, headers, body };
	const idempotent = method === 'GET' || method === 'HEAD' || !!opts.idempotent || !!opts.idempotencyKey;
	const retries = opts.retries ?? (idempotent ? 2 : 0);

	const run = async (): Promise<T> => {
		for (let i = 0; ; i++) {
			try {
				return await attempt<T>(url, init, opts);
			} catch (e) {
				const err = e as ApiError;
				// An expired or revoked session: drop it so the next call can fall back to the code.
				if (err instanceof ApiError && err.status === 401 && typeof headers['Authorization'] === 'string' && headers['Authorization'].startsWith('Bearer aiban_s_')) {
					setSessionToken(undefined);
				}
				if (!(err instanceof ApiError) || i >= retries || !idempotent || !shouldRetry(err)) throw err;
				await sleep(backoffDelay(i, err.retryAfter), opts.signal);
			}
		}
	};

	const dedupe = (opts.dedupe ?? method === 'GET') && !opts.signal && opts.responseType !== 'response';
	if (!dedupe) return run();
	const key = `${method} ${url} ${headers['x-auth-email'] ?? ''} ${headers['Authorization'] ?? ''}`;
	const existing = inflight.get(key);
	if (existing) return existing as Promise<T>;
	const p = run().finally(() => inflight.delete(key));
	inflight.set(key, p);
	return p;
}

export const api = {
	get: <T = unknown>(path: string, opts: Omit<RequestOptions<T>, 'method' | 'body'> = {}) => request<T>(path, { ...opts, method: 'GET' }),
	post: <T = unknown>(path: string, body?: unknown, opts: Omit<RequestOptions<T>, 'method' | 'body'> = {}) =>
		request<T>(path, { ...opts, method: 'POST', body }),
	put: <T = unknown>(path: string, body?: unknown, opts: Omit<RequestOptions<T>, 'method' | 'body'> = {}) =>
		request<T>(path, { ...opts, method: 'PUT', body }),
	patch: <T = unknown>(path: string, body?: unknown, opts: Omit<RequestOptions<T>, 'method' | 'body'> = {}) =>
		request<T>(path, { ...opts, method: 'PATCH', body }),
	delete: <T = unknown>(path: string, opts: Omit<RequestOptions<T>, 'method'> = {}) => request<T>(path, { ...opts, method: 'DELETE' })
};

/**
 * Read an NDJSON stream (one JSON object per line). Used by the contact import
 * endpoint. Calls onLine for each parsed object; ignores blank or broken lines.
 */
export async function readNdjson(res: Response, onLine: (value: unknown) => void): Promise<void> {
	if (!res.body) {
		const text = await res.text();
		for (const line of text.split('\n')) parseLine(line, onLine);
		return;
	}
	const reader = res.body.getReader();
	const decoder = new TextDecoder();
	let buffer = '';
	for (;;) {
		const { done, value } = await reader.read();
		if (done) break;
		buffer += decoder.decode(value, { stream: true });
		const lines = buffer.split('\n');
		buffer = lines.pop() ?? '';
		for (const line of lines) parseLine(line, onLine);
	}
	buffer += decoder.decode();
	parseLine(buffer, onLine);
}

function parseLine(line: string, onLine: (value: unknown) => void) {
	const t = line.trim();
	if (!t) return;
	try {
		onLine(JSON.parse(t));
	} catch {
		/* partial or non JSON line */
	}
}

/**
 * Wrap a call that may hit an endpoint which is not deployed yet. Returns
 * `fallback()` on 404 or 501 (and on network errors when `offlineFallback`).
 */
export async function withFallback<T>(call: () => Promise<T>, fallback: () => T | Promise<T>, offlineFallback = false): Promise<T> {
	try {
		return await call();
	} catch (e) {
		if (e instanceof ApiError && (e.status === 404 || e.status === 501 || e.code === 'not_available' || (offlineFallback && e.code === 'network'))) {
			return fallback();
		}
		throw e;
	}
}

/** A fresh idempotency key / request id. */
export function newRequestId(prefix = 'req'): string {
	try {
		return `${prefix}_${crypto.randomUUID()}`;
	} catch {
		return `${prefix}_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 12)}`;
	}
}
