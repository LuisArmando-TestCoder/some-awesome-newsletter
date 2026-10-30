/**
 * One error type for every backend call. `userMessage` is safe to show in a
 * toast or under a form (COPY_RULES: say what went wrong and what to do next,
 * never blame the user). `detail` keeps the raw backend text for logs.
 */
export type ApiErrorCode =
	| 'network'
	| 'timeout'
	| 'aborted'
	| 'unauthorized'
	| 'forbidden'
	| 'not_found'
	| 'conflict'
	| 'validation'
	| 'plan_limit'
	| 'rate_limited'
	| 'server'
	| 'invalid_response'
	| 'not_available';

export class ApiError extends Error {
	readonly status: number;
	readonly code: ApiErrorCode;
	readonly userMessage: string;
	readonly detail?: string;
	readonly retryAfter?: number;
	readonly body?: unknown;

	constructor(init: {
		status: number;
		code: ApiErrorCode;
		userMessage: string;
		detail?: string;
		retryAfter?: number;
		body?: unknown;
	}) {
		// `message` is what legacy callers display (they read e.message), so it is the user message.
		super(init.userMessage);
		this.name = 'ApiError';
		this.status = init.status;
		this.code = init.code;
		this.userMessage = init.userMessage;
		this.detail = init.detail;
		this.retryAfter = init.retryAfter;
		this.body = init.body;
	}
}

export function isApiError(e: unknown): e is ApiError {
	return e instanceof ApiError;
}

/** Default messages per failure kind. Sentence case, no dashes, plain words. */
export const DEFAULT_MESSAGES: Record<ApiErrorCode, string> = {
	network: 'We could not reach AIBAN. Check your connection and try again.',
	timeout: 'This is taking longer than expected. Try again in a minute.',
	aborted: 'The request was cancelled.',
	unauthorized: 'Your session has ended. Sign in again to continue.',
	forbidden: 'Your account does not have access to this. Sign in again or contact support.',
	not_found: 'We could not find what you asked for. Refresh the page and try again.',
	conflict: 'This changed somewhere else. Refresh the page to see the latest version.',
	validation: 'Some details are missing or not valid. Check the form and try again.',
	plan_limit: 'You have reached the limit of your plan. To get more, write to us at info@aiban.news and we will change your plan.',
	rate_limited: 'Too many attempts in a short time. Wait a moment and try again.',
	server: 'Something went wrong on our side. Try again in a few minutes.',
	invalid_response: 'We got an unexpected answer from the server. Try again in a few minutes.',
	not_available: 'This feature is not available yet.'
};

/** /v1 error codes (backend API/_lib/errors.ts) mapped to ours. */
const V1_CODES: Record<string, ApiErrorCode> = {
	BAD_REQUEST: 'validation',
	VALIDATION_FAILED: 'validation',
	UNAUTHENTICATED: 'unauthorized',
	FORBIDDEN: 'forbidden',
	NOT_FOUND: 'not_found',
	CONFLICT: 'conflict',
	IDEMPOTENCY_IN_PROGRESS: 'conflict',
	IDEMPOTENCY_KEY_REUSED: 'conflict',
	PAYLOAD_TOO_LARGE: 'validation',
	RATE_LIMITED: 'rate_limited',
	PLAN_LIMIT_REACHED: 'plan_limit',
	UPSTREAM_FAILED: 'server',
	NOT_READY: 'server',
	INTERNAL: 'server'
};

function backendCode(body: unknown): string | undefined {
	if (!body || typeof body !== 'object') return undefined;
	const b = body as Record<string, any>;
	if (typeof b.code === 'string') return b.code;
	if (b.error && typeof b.error === 'object' && typeof b.error.code === 'string') return b.error.code;
	return undefined;
}

function codeForStatus(status: number, text: string): ApiErrorCode {
	if (status === 401) return 'unauthorized';
	if (status === 402) return 'plan_limit';
	if (status === 403) return /limit|plan|upgrade/i.test(text) ? 'plan_limit' : 'forbidden';
	if (status === 404) return 'not_found';
	if (status === 408) return 'timeout';
	if (status === 409) return 'conflict';
	if (status === 400 || status === 422) return 'validation';
	if (status === 429) return /limit|plan|upgrade/i.test(text) && !/too many|wait/i.test(text) ? 'plan_limit' : 'rate_limited';
	return 'server';
}

/**
 * Backend messages that are already written for humans can be shown as is.
 * Anything that looks like a stack trace, HTML or a technical dump is replaced.
 */
function isPresentable(text: string): boolean {
	if (!text || text.length > 220) return false;
	if (/<[a-z!/]/i.test(text)) return false;
	if (/(Error:|TypeError|ReferenceError|stack|undefined|null|Firestore|ECONN|ENOTFOUND|at \w+ \()/.test(text)) return false;
	return true;
}

function extractText(body: unknown): string {
	if (typeof body === 'string') return body.trim();
	if (body && typeof body === 'object') {
		const b = body as Record<string, unknown>;
		for (const key of ['error', 'message', 'details', 'detail']) {
			const v = b[key];
			if (typeof v === 'string' && v.trim()) return v.trim();
			if (v && typeof v === 'object' && typeof (v as any).message === 'string') return (v as any).message;
		}
	}
	return '';
}

/** Build an ApiError from an HTTP response body (already parsed if JSON). */
export function errorFromResponse(status: number, body: unknown, headers?: Headers, fallback?: string): ApiError {
	const text = extractText(body);
	const code = V1_CODES[backendCode(body) ?? ''] ?? codeForStatus(status, text);
	const retryHeader = headers?.get('retry-after');
	const b = body && typeof body === 'object' ? (body as any) : null;
	const retryBody = b ? Number(b.retryAfter ?? b.error?.details?.retryAfterSeconds ?? b.details?.retryAfterSeconds) : NaN;
	const retryAfter = Number.isFinite(retryBody) ? retryBody : retryHeader ? Number(retryHeader) || undefined : undefined;
	// Plan limit, validation and conflict messages from the backend are specific and useful.
	// /v1 messages are written for users (WS7 follows COPY_RULES); legacy ones only for some codes.
	const isV1 = Boolean(b?.error && typeof b.error === 'object');
	const useBackendText = isPresentable(text) && (isV1 ? code !== 'server' : ['plan_limit', 'validation', 'conflict', 'rate_limited', 'not_found', 'forbidden'].includes(code));
	return new ApiError({
		status,
		code,
		userMessage: useBackendText ? text : fallback ?? DEFAULT_MESSAGES[code],
		detail: text || undefined,
		retryAfter,
		body
	});
}

/** Message to show for any thrown value. */
export function toUserMessage(e: unknown, fallback = DEFAULT_MESSAGES.server): string {
	if (isApiError(e)) return e.userMessage;
	if (e instanceof DOMException && e.name === 'AbortError') return DEFAULT_MESSAGES.aborted;
	return fallback;
}
