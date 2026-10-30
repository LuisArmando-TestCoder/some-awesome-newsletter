/** Public entry of the AIBAN frontend API layer. See docs/aiban/API_CONTRACT.md. */
export { api, request, seg, buildUrl, withFallback, readNdjson, type RequestOptions } from './client';
export { ApiError, isApiError, toUserMessage, DEFAULT_MESSAGES, type ApiErrorCode } from './errors';
export { getApiBaseUrl } from './config';
export { getCredentials, hasCredentials, authHeaders } from './credentials';
export * as automations from './automations';
export * as activity from './activity';
export * as usage from './usage';
export * as imports from './imports';
export * as preview from './preview';
// billing helpers retired 2026-10-30 (billing providers off; see _deprecated/src/lib/api/billing.ts)
export * as events from './events';
export * as onboarding from './onboarding';
export { connectSocket, disconnectSocket, on as onSocket, socketStatus } from './socket';
