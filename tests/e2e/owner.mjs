// A brand-new owner, start to finish: sign up with a code, onboarding with a real AI
// preview, every dashboard section, settings, API keys, double opt-in subscriber,
// "Send the next issue" followed live over the socket, public blog, logout and login.
// Run: node tests/e2e/owner.mjs   (E2E_OWNER=you@aiban.test to reuse an account)
import { WEB, browser, check, assert, newPage, summary, inbox, clearInbox, waitForMail, signInWithCode, statePath, skipTour, notices } from './lib.mjs';

const OWNER = process.env.E2E_OWNER ?? `owner${Date.now() % 1_000_000}@aiban.test`;
const SITE = process.env.E2E_SITE ?? 'deno.com/blog';
const READER = `reader${Date.now() % 1_000_000}@aiban.test`;
const b = await browser();
let p = await newPage(b);
console.log(`owner ${OWNER}, site ${SITE}`);

await check('sign up with an emailed code', async () => {
	await signInWithCode(p, OWNER, '/signup');
	return p.url().replace(WEB, '').split('?')[0];
});

await check('onboarding reaches the dashboard', async () => {
	const head = async () => (await p.locator('main h1').first().innerText().catch(() => '')).trim();
	await p.waitForSelector('main h1', { timeout: 60_000 });
	const seen = [];
	for (let i = 0; i < 14; i++) {
		await p.waitForTimeout(1500);
		const h = await head();
		seen.push(h);
		if (process.env.E2E_VERBOSE) console.log(`      step ${i}: ${h}`);
		await p.screenshot({ path: `./test-results/e2e/onboarding-${i}.png` }).catch(() => {});
		if (!h || /hello|good (morning|afternoon|evening)/i.test(h) || (i > 1 && !/step \d+ of \d+/i.test(await p.locator("main").innerText()))) break; // left onboarding
		if (/website/i.test(h)) {
			await p.getByLabel(/website address/i).fill(SITE);
			await p.getByRole('button', { name: /^continue$/i }).click();
		} else if (/^here is your first issue/i.test(h)) {
			await p.locator('iframe').first().waitFor({ timeout: 150_000 });
			await p.getByRole('button', { name: /looks good/i }).click();
		} else {
			for (const inp of await p.locator('main input[type=text]:visible, main input[type=email]:visible, main textarea:visible').all()) {
				if (await inp.inputValue().catch(() => 'x')) continue;
				const label = (await inp.evaluate((e) => e.labels?.[0]?.innerText || e.getAttribute('aria-label') || e.placeholder || '')).toLowerCase();
				if (/search|type to/.test(label)) continue;
				await inp.fill(/email|address|contacts/.test(label) ? 'reader.es@aiban.test' : /name|sender/.test(label) ? 'Test Notes' : 'Owners of small software teams').catch(() => {});
			}
			// Step actions in priority order; the header also has an "Open dashboard" link, so it is never used.
			const order = [/^(continue|looks good, continue|save and continue|save signature|next)$/i, /^skip.*$/i, /^(finish|done|go to the dashboard|go to my dashboard)$/i];
			let btn = null;
			for (const name of order) {
				const c = p.locator('main').getByRole('button', { name }).or(p.locator('main').getByRole('link', { name })).first();
				if (await c.count()) { btn = c; break; }
			}
			if (!btn) break;
			if (process.env.E2E_VERBOSE) console.log(`        click "${(await btn.innerText()).trim()}"`);
			await btn.click();
		}
		await p.waitForFunction((prev) => (document.querySelector('main h1')?.textContent || '').trim() !== prev, seen.at(-1), { timeout: 120_000 }).catch(() => {});
	}
	await p.context().storageState({ path: statePath(OWNER) });
	assert(!p.errs.length, `page error: ${p.errs[0]}`);
	assert(!p.bad.length, p.bad.join('; '));
	return seen.filter(Boolean).join(' > ').slice(0, 260);
});

const signed = () => newPage(b, { storageState: statePath(OWNER) });
const sections = ['home', 'automations', 'sources', 'subscribers', 'reports', 'blog', 'settings'];
for (const s of sections) {
	await check(`dashboard section ${s}`, async () => {
		const q = await signed();
		await q.goto(`${WEB}/dashboard?section=${s}`, { waitUntil: 'load' });
		await q.waitForTimeout(3500);
		await skipTour(q);
		const t = (await q.locator('main').innerText()).replace(/\s+/g, ' ');
		assert(!/\/login/.test(q.url()), 'sent to the login page: the session was not accepted');
		assert(!/step \d+ of \d+/i.test(t), 'still showing onboarding instead of the dashboard');
		assert(!q.errs.length, `page error: ${q.errs[0]}`);
		assert(!q.bad.length, q.bad.join('; '));
		await q.context().close();
		return t.slice(0, 80);
	});
}

await check('settings: brand change is saved and survives reload', async () => {
	const q = await signed();
	await q.goto(`${WEB}/dashboard?section=settings&tab=brand`, { waitUntil: 'load' });
	await q.waitForTimeout(3500);
	await skipTour(q);
	const v = await q.locator('#set-title').inputValue();
	const next = `${v || 'Test'} weekly`.slice(0, 80);
	await q.locator('#set-title').fill(next);
	await q.getByRole('button', { name: /^save/i }).last().click();
	await q.waitForTimeout(2500);
	await q.reload({ waitUntil: 'load' });
	await q.waitForTimeout(3500);
	assert((await q.locator('#set-title').inputValue()) === next, 'title not saved');
	await q.context().close();
});

await check('settings: API key create and revoke', async () => {
	const q = await signed();
	await q.goto(`${WEB}/dashboard?section=settings&tab=integrations`, { waitUntil: 'load' });
	await q.waitForTimeout(3500);
	await skipTour(q);
	const count = () => q.locator('.api-key-table tbody button').filter({ hasText: /revoke/i }).count();
	const before = await count();
	await q.getByRole('button', { name: /create a new key/i }).click();
	await q.locator('.new-api-key-code').waitFor({ timeout: 15_000 });
	await q.waitForTimeout(800);
	assert((await count()) === before + 1, 'new key not listed');
	await q.locator('.api-key-table tbody tr').last().getByRole('button', { name: /revoke/i }).click();
	await q.locator('.api-key-table tbody tr').last().getByRole('button', { name: /confirm/i }).click();
	await q.waitForTimeout(1500);
	assert((await count()) === before, 'key not revoked');
	await q.context().close();
});

await check('subscriber added from the dashboard gets a double opt-in email and can confirm', async () => {
	await clearInbox();
	const q = await signed();
	await q.goto(`${WEB}/dashboard?section=subscribers`, { waitUntil: 'load' });
	await q.waitForTimeout(3500);
	await skipTour(q);
	await q.getByRole('tab', { name: /add or import/i }).click();
	await q.waitForTimeout(600);
	await q.getByLabel('Email address').fill(READER);
	await q.getByLabel('Name').fill('Test Reader');
	await q.getByRole('button', { name: /add subscriber/i }).click();
	const m = await waitForMail(READER, /confirm/i, 30_000);
	const link = [...String(m.html ?? '').matchAll(/href="([^"]+)"/g)].map((x) => x[1].replace(/&amp;|&#38;/g, '&')).find((l) => /confirm/i.test(l));
	assert(link, 'no confirm link in the email');
	await q.goto(link, { waitUntil: 'load' });
	await q.waitForTimeout(3000);
	const btn = q.getByRole('button', { name: /confirm subscription/i });
	if (await btn.count()) {
		await btn.first().click();
		await q.waitForTimeout(2500);
	}
	const t = (await q.locator('main').innerText()).replace(/\s+/g, ' ');
	assert(/subscribed|confirmed/i.test(t), `confirm page said: ${t.slice(0, 120)}`);
	await q.context().close();
	return `"${m.subject}"`;
});

await check('"Send the next issue" reports the real outcome', async () => {
	await clearInbox();
	const q = await signed();
	await q.goto(`${WEB}/dashboard?section=subscribers&tab=send`, { waitUntil: 'load' });
	// The confirmed reader above is the audience for this issue.
	await q.waitForTimeout(3500);
	await skipTour(q);
	await q.getByRole('button', { name: /send the next issue/i }).first().click();
	await q.waitForTimeout(800);
	const confirm = q.locator('dialog[open] button, [role=dialog] button').filter({ hasText: /send/i });
	if (await confirm.count()) await confirm.first().click();
	let last = '';
	const t0 = Date.now();
	while (Date.now() - t0 < 240_000) {
		last = await notices(q);
		if (/Sent to|Nothing was sent|could not|failed/i.test(last)) break;
		await q.waitForTimeout(3000);
	}
	assert(/Sent to|Nothing was sent/i.test(last), `final message: ${last}`);
	const mails = (await inbox()).map((m) => `${m.to} "${m.subject}"`);
	await q.context().close();
	return `${Math.round((Date.now() - t0) / 1000)}s, ${last.slice(0, 80)}; mail: ${mails.join(', ').slice(0, 160)}`;
});

await check('public blog and article', async () => {
	const q = await newPage(b);
	await q.goto(`${WEB}/blog/${encodeURIComponent(OWNER)}`, { waitUntil: 'load' });
	await q.waitForTimeout(3000);
	const links = q.locator(`a[href^="/blog/${encodeURIComponent(OWNER)}/"]`).filter({ hasNotText: /search/i });
	const n = await links.count();
	assert(n > 0, 'no articles on the blog (the send step publishes them)');
	await q.goto(WEB + (await links.first().getAttribute('href')), { waitUntil: 'load' });
	await q.waitForTimeout(2500);
	assert(!q.errs.length, q.errs[0]);
	await q.context().close();
	return `${n} article links`;
});

await check('log out, dashboard is closed, log back in', async () => {
	const q = await signed();
	await q.goto(`${WEB}/dashboard`, { waitUntil: 'load' });
	await q.waitForTimeout(3500);
	await skipTour(q);
	let out = q.getByRole('button', { name: /log out|sign out/i });
	if (!(await out.count())) out = q.getByRole('menuitem', { name: /log out|sign out/i });
	await out.first().click();
	await q.waitForTimeout(2000);
	await q.goto(`${WEB}/dashboard`, { waitUntil: 'load' });
	await q.waitForTimeout(2500);
	assert(/login/.test(q.url()), `still in the dashboard after logout: ${q.url()}`);
	await signInWithCode(q, OWNER, '/login');
	await q.context().close();
});

await b.close();
process.exit(summary('owner') ? 0 : 1);
