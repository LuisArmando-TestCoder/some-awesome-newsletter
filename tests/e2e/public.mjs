// Public site: every page renders, browser language detection, the language picker,
// the landing live preview (real AI call), 404, help form.
// Run: node tests/e2e/public.mjs
import { WEB, browser, check, assert, newPage, summary } from './lib.mjs';

const b = await browser();

const routes = ['/', '/about', '/pricing', '/help', '/careers', '/legal/privacy', '/legal/terms', '/legal/cookies', '/login', '/signup', '/start', '/subscribe', '/demo'];
for (const r of routes) {
	await check(`page ${r}`, async () => {
		const p = await newPage(b);
		const res = await p.goto(WEB + r, { waitUntil: 'load' });
		await p.waitForTimeout(1000);
		const h = (await p.locator('h1').first().innerText().catch(() => '')).trim();
		assert(res.status() < 400, `status ${res.status()}`);
		assert(!p.errs.length, `page error: ${p.errs[0]}`);
		assert(h, 'no h1');
		await p.context().close();
		return `"${h.slice(0, 50)}"`;
	});
}

await check('404 page', async () => {
	const p = await newPage(b);
	const res = await p.goto(WEB + '/no-such-page', { waitUntil: 'load' });
	assert(res.status() === 404, `status ${res.status()}`);
	await p.context().close();
});

for (const [locale, want] of [['es-CR', 'es'], ['de-DE', 'de'], ['fr-FR', 'fr'], ['pt-BR', 'pt'], ['en-GB', 'en']]) {
	await check(`language follows the browser (${locale})`, async () => {
		const p = await newPage(b, { locale });
		await p.goto(WEB + '/', { waitUntil: 'load' });
		await p.waitForTimeout(2500);
		const lang = await p.evaluate(() => document.documentElement.lang);
		assert(lang.startsWith(want), `html lang=${lang}`);
		const h = (await p.locator('h1').first().innerText()).trim();
		await p.context().close();
		return `${lang}: "${h.slice(0, 50)}"`;
	});
}

await check('language picker choice wins over the browser and persists', async () => {
	const p = await newPage(b, { locale: 'es-CR' });
	await p.goto(WEB + '/', { waitUntil: 'load' });
	await p.waitForTimeout(2000);
	await p.locator('button[aria-haspopup=menu]').first().click();
	await p.getByRole('menuitemradio').filter({ hasText: /English/ }).first().click();
	await p.waitForTimeout(1200);
	await p.reload({ waitUntil: 'load' });
	await p.waitForTimeout(2000);
	const lang = await p.evaluate(() => document.documentElement.lang);
	assert(lang.startsWith('en'), `after reload lang=${lang}`);
	await p.context().close();
});

await check('landing: "Preview my newsletter" writes a real sample issue', async () => {
	const p = await newPage(b);
	await p.goto(WEB + '/', { waitUntil: 'load' });
	await p.waitForTimeout(1200);
	await p.locator('form.site-form input').first().fill(process.env.E2E_PREVIEW_SITE ?? 'deno.com');
	await p.locator('form.site-form button[type=submit]').click();
	await p.waitForTimeout(1200);
	const inView = await p.locator('.open__device').first().evaluate((el) => {
		const r = el.getBoundingClientRect();
		return r.top < innerHeight && r.bottom > 0;
	});
	assert(inView, 'the preview did not scroll into view');
	const frame = p.locator('.open__device iframe').first();
	await frame.waitFor({ timeout: 150_000 });
	const body = await frame.contentFrame().locator('body').innerText();
	assert(body.length > 200, 'the sample issue is nearly empty');
	assert(!p.errs.length, p.errs[0]);
	await p.screenshot({ path: './test-results/e2e/live-preview.png' });
	await p.context().close();
	return `${body.length} chars`;
});

await check('help form is accepted by the backend', async () => {
	const p = await newPage(b);
	await p.goto(WEB + '/help', { waitUntil: 'load' });
	await p.waitForTimeout(1200);
	await p.locator('#help-name').fill('Help Tester');
	await p.locator('#help-email').fill('helper@aiban.test');
	await p.locator('#help-desiredLimits').fill('About 5,000 subscribers and 4 sources.');
	await p.locator('#help-useCase').fill('Testing the help form from the end-to-end run. Please ignore this message.');
	const resp = p.waitForResponse((r) => r.url().includes('/api/support'), { timeout: 30_000 });
	await p.locator('form button[type=submit]').last().click();
	const status = (await resp).status();
	assert(status === 200 || status === 429, `status ${status}`);
	await p.context().close();
	return status === 429 ? 'rate limited (ran more than 5 times this hour)' : 'stored';
});

await b.close();
process.exit(summary('public') ? 0 : 1);
