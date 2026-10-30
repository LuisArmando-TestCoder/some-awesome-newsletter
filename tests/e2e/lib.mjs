// Shared helpers for the AIBAN end-to-end run.
// Local stack only: vite dev (4300) + Deno backend (8000) + Firestore emulator (8085) + test inbox (2525/2580).
// See tests/e2e/README.md. Nothing here talks to production.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

export const WEB = process.env.E2E_WEB ?? 'http://localhost:4300';
export const API = process.env.E2E_API ?? 'http://localhost:8000';
export const INBOX = process.env.E2E_INBOX ?? 'http://127.0.0.1:2580/messages';
export const SHOTS = process.env.E2E_SHOTS ?? './test-results/e2e';
export const STATE = process.env.E2E_STATE ?? './test-results/e2e/state';
mkdirSync(SHOTS, { recursive: true });
mkdirSync(STATE, { recursive: true });

for (const u of [WEB, API]) {
	const host = new URL(u).hostname;
	if (!['localhost', '127.0.0.1'].includes(host)) throw new Error(`Refusing to run against ${u}: the e2e suite writes data and sends mail. Point it at a local stack.`);
}

export async function inbox() {
	return (await fetch(INBOX)).json();
}
export async function clearInbox() {
	await fetch(INBOX, { method: 'DELETE' });
}
/** Waits for a message to `to` whose subject matches `re`. */
export async function waitForMail(to, re = /./, timeoutMs = 60_000) {
	const end = Date.now() + timeoutMs;
	while (Date.now() < end) {
		const all = await inbox();
		const m = all.filter((x) => String(x.to).toLowerCase().includes(to.toLowerCase()) && re.test(String(x.subject))).pop();
		if (m) return m;
		await new Promise((r) => setTimeout(r, 1000));
	}
	throw new Error(`No email to ${to} matching ${re} within ${timeoutMs} ms`);
}

export const results = [];
export async function check(name, fn) {
	const t0 = Date.now();
	try {
		const note = await fn();
		results.push({ name, ok: true, ms: Date.now() - t0, note: note ?? '' });
		console.log(`PASS  ${name}${note ? `  (${note})` : ''}`);
	} catch (e) {
		results.push({ name, ok: false, ms: Date.now() - t0, note: String(e?.message ?? e).split('\n')[0].slice(0, 300) });
		console.log(`FAIL  ${name}\n      ${String(e?.message ?? e).split('\n').slice(0, 3).join('\n      ')}`);
	}
}
export function summary(label) {
	const ok = results.filter((r) => r.ok).length;
	console.log(`\n${label}: ${ok}/${results.length} passed`);
	return ok === results.length;
}

export async function browser() {
	return chromium.launch();
}
export function assert(cond, msg) {
	if (!cond) throw new Error(msg);
}

/** New page that records page errors and backend responses with status >= 500. */
export async function newPage(b, opts = {}) {
	const ctx = await b.newContext({ locale: 'en-US', viewport: { width: 1280, height: 900 }, ...opts });
	const p = await ctx.newPage();
	p.errs = [];
	p.bad = [];
	p.on('pageerror', (e) => p.errs.push(e.message));
	p.on('response', (r) => {
		if (r.url().startsWith(API) && r.status() >= 500) p.bad.push(`${r.status()} ${r.request().method()} ${r.url().slice(API.length, API.length + 80)}`);
	});
	return p;
}
export const statePath = (email) => `${STATE}/${email}.json`;

export async function skipTour(p) {
	const s = p.getByRole('button', { name: /skip tour/i });
	if (await s.count()) {
		await s.click();
		await p.waitForTimeout(300);
	}
}
export async function notices(p, scope = 'main') {
	return (await p.locator(`${scope} [role=status], ${scope} [role=alert]`).allInnerTexts())
		.map((s) => s.trim().replace(/\s+/g, ' '))
		.filter(Boolean)
		.join(' || ')
		.slice(0, 300);
}

/** Signs in with the emailed 6-digit code on /login or /signup. Leaves the page on /dashboard. */
export async function signInWithCode(p, email, path = '/login') {
	await clearInbox();
	await p.goto(WEB + path, { waitUntil: 'load' });
	await p.waitForTimeout(1200);
	await p.locator('input[type=email]').first().fill(email);
	await p.locator('form button[type=submit]').first().click();
	const m = await waitForMail(email, /./, 30_000);
	const code = (String(m.subject).match(/\b\d{6}\b/) ?? String(m.text ?? '').match(/\b\d{6}\b/))?.[0];
	assert(code, 'no 6-digit code in the sign-in email');
	const ci = p.locator('input[autocomplete=one-time-code], input[inputmode=numeric]');
	await ci.first().waitFor({ timeout: 15_000 });
	if ((await ci.count()) === 1) await ci.fill(code);
	else for (let i = 0; i < 6; i++) await ci.nth(i).fill(code[i]);
	await p.waitForURL(/dashboard/, { timeout: 30_000 });
	await p.context().storageState({ path: statePath(email) });
	return code;
}
