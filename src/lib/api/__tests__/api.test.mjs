// Run: npm run test:unit  (node --test, no extra dependencies)
import { test, beforeEach } from 'node:test';
import assert from 'node:assert/strict';

const { request, withFallback, buildUrl, backoffDelay } = await import('$lib/api/client');
const { ApiError, errorFromResponse, DEFAULT_MESSAGES, toUserMessage } = await import('$lib/api/errors');
const { authHeaders, getCredentials } = await import('$lib/api/credentials');
const { chunkLines } = await import('$lib/api/imports');
const { meter, computeUsage } = await import('$lib/api/usage');
const { legacyAutomationsFromSources } = await import('$lib/api/automations');
const { sanitizeHtml, htmlToText } = await import('$lib/utils/sanitizeHtml');
const { optimisticToggle } = await import('$lib/stores/optimistic');
const { saveStatus } = await import('$lib/stores/saveStatus');
const { get } = await import('svelte/store');

const json = (status, body, headers = {}) =>
	new Response(body == null ? null : JSON.stringify(body), { status, headers: { 'content-type': 'application/json', ...headers } });

let calls = [];
function mockFetch(...responses) {
	calls = [];
	globalThis.fetch = async (url, init) => {
		calls.push({ url: String(url), init });
		const r = responses.length > 1 ? responses.shift() : responses[0];
		if (r instanceof Error) throw r;
		return typeof r === 'function' ? r(url, init) : r.clone();
	};
}

beforeEach(() => {
	localStorage.clear();
	localStorage.setItem('configuratorEmail', JSON.stringify('owner@example.com'));
	localStorage.setItem('authCode', JSON.stringify('123456'));
});

test('base URL is local for a localhost origin and query is encoded', () => {
	assert.equal(buildUrl('/x', { a: 'b c', skip: undefined, n: 2 }), 'http://localhost:8000/x?a=b+c&n=2');
});

test('auth headers come from storage and drop non Latin-1 values safely', () => {
	localStorage.setItem('dashboardLanguage', JSON.stringify('ja'));
	const h = authHeaders();
	assert.equal(h['x-auth-email'], 'owner@example.com');
	assert.equal(h['x-auth-code'], '123456');
	assert.equal(h['x-user-language'], 'ja');
	assert.equal('given_name' in h, false);
	assert.equal(getCredentials().email, 'owner@example.com');
});

test('request sends auth headers and parses JSON', async () => {
	mockFetch(json(200, { ok: 1 }));
	const data = await request('/config');
	assert.deepEqual(data, { ok: 1 });
	assert.equal(calls[0].init.headers['x-auth-email'], 'owner@example.com');
});

test('GET retries on 503 then succeeds', async () => {
	mockFetch(json(503, { error: 'busy' }), json(200, { ok: true }));
	const data = await request('/retry-me', { dedupe: false });
	assert.deepEqual(data, { ok: true });
	assert.equal(calls.length, 2);
});

test('POST is not retried', async () => {
	mockFetch(json(503, { error: 'busy' }));
	await assert.rejects(request('/p', { method: 'POST', body: {} }), (e) => e instanceof ApiError && e.status === 503);
	assert.equal(calls.length, 1);
});

test('network failure becomes a friendly ApiError', async () => {
	mockFetch(new TypeError('Failed to fetch'));
	await assert.rejects(request('/n', { retries: 0, dedupe: false }), (e) => e.code === 'network' && e.message === DEFAULT_MESSAGES.network);
});

test('timeout aborts and reports timeout', async () => {
	globalThis.fetch = (url, init) =>
		new Promise((_, reject) => init.signal.addEventListener('abort', () => reject(new DOMException('Aborted', 'AbortError'))));
	await assert.rejects(request('/slow', { timeoutMs: 20, retries: 0, dedupe: false }), (e) => e.code === 'timeout');
});

test('schema mismatch is invalid_response', async () => {
	const { z } = await import('zod');
	mockFetch(json(200, { nope: true }));
	await assert.rejects(request('/s', { schema: z.object({ id: z.string() }), dedupe: false }), (e) => e.code === 'invalid_response');
});

test('identical concurrent GETs share one fetch', async () => {
	mockFetch(() => json(200, { n: 1 }));
	const [a, b] = await Promise.all([request('/same'), request('/same')]);
	assert.deepEqual(a, b);
	assert.equal(calls.length, 1);
});

test('withFallback uses the fallback on 404 only', async () => {
	mockFetch(json(404, { error: 'Not found' }));
	assert.equal(await withFallback(() => request('/missing', { dedupe: false }), () => 'fallback'), 'fallback');
	mockFetch(json(500, { error: 'boom' }));
	await assert.rejects(withFallback(() => request('/broken', { retries: 0, dedupe: false }), () => 'fallback'));
});

test('error mapping: plan limit text is kept, server details are hidden', () => {
	const limit = errorFromResponse(403, { error: 'Plan limit reached for news sources. Upgrade to add more.' });
	assert.equal(limit.code, 'plan_limit');
	assert.match(limit.userMessage, /Plan limit/);
	const crash = errorFromResponse(500, '<html>TypeError: x is undefined</html>');
	assert.equal(crash.code, 'server');
	assert.equal(crash.userMessage, DEFAULT_MESSAGES.server);
	const rl = errorFromResponse(429, { error: 'Too many requests', retryAfter: 30 });
	assert.equal(rl.code, 'rate_limited');
	assert.equal(rl.retryAfter, 30);
	assert.equal(toUserMessage(new Error('raw')), DEFAULT_MESSAGES.server);
});

test('user messages follow the copy rules (no dashes, no banned words)', () => {
	const banned = /[\u2014\u2013]|\b(seamless|robust|leverage|unlock|delve|elevate|crucial|pivotal)\b/i;
	for (const m of Object.values(DEFAULT_MESSAGES)) assert.equal(banned.test(m), false, m);
});

test('backoff grows and honours Retry-After', () => {
	assert.ok(backoffDelay(0) < backoffDelay(3));
	assert.equal(backoffDelay(0, 5), 5000);
});

test('chunkLines repeats the header and counts rows', () => {
	const rows = ['email,name', ...Array.from({ length: 1001 }, (_, i) => `u${i}@x.com,U${i}`)].join('\n');
	const { chunks, totalRows } = chunkLines(rows, 500);
	assert.equal(totalRows, 1001);
	assert.equal(chunks.length, 3);
	assert.ok(chunks.every((c) => c.startsWith('email,name\n')));
});

test('usage meters', () => {
	assert.deepEqual(meter(1, 1).atLimit, true);
	assert.equal(meter(5, -1).unlimited, true);
	const u = computeUsage({ pricingPlan: 'free', newsSources: [{}] }, { a: [{ email: 'A@x.com' }], b: [{ email: 'a@x.com' }, { email: 'b@x.com' }] });
	assert.equal(u.subscribers.used, 2);
	assert.equal(u.newsSources.atLimit, true);
});

test('legacy automations derive from sources', () => {
	const list = legacyAutomationsFromSources([{ id: 'ns1', scheduleTime: '0 9 * * 1', active: false }], 'o@x.com');
	assert.equal(list[0].id, 'legacy_ns1');
	assert.equal(list[0].enabled, false);
	assert.equal(list[0].trigger.params.cron, '0 9 * * 1');
});

test('sanitizeHtml (server path) strips scripts, handlers and javascript URLs', () => {
	const out = sanitizeHtml('<p onclick="x()">Hi<script>alert(1)</script><a href="javascript:alert(1)">l</a><img src="https://a/b.png"></p>');
	assert.equal(/script|onclick|javascript:/i.test(out), false);
	assert.match(out, /https:\/\/a\/b\.png/);
	assert.equal(htmlToText('<p>Hello <b>you</b></p>'), 'Hello you');
});

test('optimisticToggle rolls back on failure', async () => {
	let value = false;
	const ok = await optimisticToggle('t1', true, (v) => (value = v), async () => {
		throw new ApiError({ status: 500, code: 'server', userMessage: 'x' });
	});
	assert.equal(ok, false);
	assert.equal(value, false);
});

test('saveStatus transitions', () => {
	saveStatus.markDirty();
	assert.equal(get(saveStatus).state, 'dirty');
	saveStatus.markSaving();
	assert.equal(get(saveStatus).label, 'Saving...');
	saveStatus.markError('Not saved');
	assert.equal(get(saveStatus).state, 'error');
});

test('session token is sent as a Bearer header and dropped on 401', async () => {
	const { setSessionToken } = await import('$lib/api/credentials');
	setSessionToken('aiban_s_abc12345', new Date(Date.now() + 3600_000).toISOString());
	assert.equal(authHeaders()['Authorization'], 'Bearer aiban_s_abc12345');
	assert.equal(authHeaders()['x-auth-email'], 'owner@example.com');
	mockFetch(json(401, { error: { code: 'UNAUTHENTICATED', message: 'Your session has ended. Sign in again to continue.' } }));
	await assert.rejects(request('/v1/usage', { dedupe: false }), (e) => e.code === 'unauthorized');
	assert.equal(authHeaders()['Authorization'], undefined);
});

test('expired session token is ignored', async () => {
	const { setSessionToken } = await import('$lib/api/credentials');
	setSessionToken('aiban_s_old00000', new Date(Date.now() - 1000).toISOString());
	assert.equal(authHeaders()['Authorization'], undefined);
});

test('v1 error envelope: code and message are used', () => {
	const e = errorFromResponse(402, { error: { code: 'PLAN_LIMIT_REACHED', message: 'Your Free plan includes 1 news sources. Upgrade your plan or remove one to add more.', details: { limit: 1 } } });
	assert.equal(e.code, 'plan_limit');
	assert.match(e.userMessage, /Free plan/);
	const r = errorFromResponse(429, { error: { code: 'RATE_LIMITED', message: 'Too many requests. Wait 30 seconds and try again.', details: { retryAfterSeconds: 30 } } });
	assert.equal(r.retryAfter, 30);
	const v = errorFromResponse(400, { error: { code: 'VALIDATION_FAILED', message: 'Some fields are missing or have the wrong format. Fix them and try again.' } });
	assert.equal(v.code, 'validation');
});

test('Idempotency-Key header is sent and makes POST retryable', async () => {
	mockFetch(json(503, {}), json(202, { runId: 'run_1' }));
	const r = await request('/v1/automations/run', { method: 'POST', body: {}, idempotencyKey: 'run_abcdefgh' });
	assert.equal(r.runId, 'run_1');
	assert.equal(calls.length, 2);
	assert.equal(calls[0].init.headers['Idempotency-Key'], 'run_abcdefgh');
});

test('activity items get plain titles', async () => {
	const { describeActivity } = await import('$lib/api/activity');
	assert.equal(describeActivity({ id: '1', type: 'automation.toggled', data: { title: 'Daily issue', enabled: false }, createdAt: null }).title, 'Daily issue turned off');
	assert.equal(describeActivity({ id: '2', type: 'subscribers.imported', data: { count: 1 }, createdAt: null }).title, '1 contact imported');
});

test('admin change log sentences and CSV export', async () => {
	const { describeAudit, toCsv } = await import('$lib/admin/format');
	assert.equal(describeAudit({ id: '1', at: '', actor: 'a@x.com', action: 'admin.added', target: 'b@x.com' }), 'Gave admin access to b@x.com');
	assert.equal(
		describeAudit({ id: '2', at: '', actor: 'a', action: 'news_source.updated', tenantId: 't', newsSourceId: 'n1', changes: { isPaidNewsletter: { from: false, to: true } } }, () => 'Daily'),
		'Changed newsletter Daily: paid off to on'
	);
	assert.equal(describeAudit({ id: '3', at: '', actor: 'a', action: 'tenant.updated', changes: { pricingPlan: { from: 'free', to: 'pro' } } }), 'Changed customer: plan free to pro');
	assert.equal(toCsv(['a', 'b'], [['=cmd', 'x,y']]), "a,b\n'=cmd,\"x,y\"");
});
