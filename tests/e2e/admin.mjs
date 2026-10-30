// Admin area: sign in as an admin (ADMIN_EMAILS on the backend), every admin page,
// a plan change that persists (then restored), and a non-admin kept out.
// Run: node tests/e2e/admin.mjs   (needs an existing customer; owner.mjs creates one)
import { readdirSync } from 'node:fs';
import { WEB, STATE, browser, check, assert, newPage, summary, signInWithCode } from './lib.mjs';

const ADMIN = process.env.E2E_ADMIN ?? 'admin@aiban.test';
const b = await browser();
const p = await newPage(b);

await check('admin signs in with a code', async () => {
	await signInWithCode(p, ADMIN, '/login');
});

for (const path of ['/admin', '/admin/customers', '/admin/newsletters', '/admin/activity', '/admin/admins']) {
	await check(`admin page ${path}`, async () => {
		p.errs.length = 0;
		p.bad.length = 0;
		await p.goto(WEB + path, { waitUntil: 'load' });
		await p.waitForTimeout(3500);
		const t = (await p.locator('main').innerText()).replace(/\s+/g, ' ');
		assert(!p.errs.length, `page error: ${p.errs[0]}`);
		assert(!p.bad.length, p.bad.join('; '));
		assert(!/could not load|something went wrong|not an admin/i.test(t), t.slice(0, 160));
		return t.slice(0, 70);
	});
}

await check('plan change on a customer persists (then restored)', async () => {
	await p.goto(WEB + '/admin/customers', { waitUntil: 'load' });
	await p.waitForTimeout(3500);
	const link = p.locator('a[href^="/admin/customers/"]').first();
	assert(await link.count(), 'no customers listed');
	await link.click();
	await p.waitForTimeout(3500);
	const sel = () => p.locator('select').filter({ has: p.locator('option[value="free"]') }).first();
	assert(await sel().count(), 'no plan selector');
	const cur = await sel().inputValue();
	const next = (await sel().locator('option').evaluateAll((o) => o.map((x) => x.value))).find((v) => v && v !== cur);
	const apply = async (value) => {
		await sel().selectOption(value);
		const save = p.getByRole('button', { name: /save|change plan|apply|update/i }).first();
		if (await save.count()) await save.click();
		await p.waitForTimeout(700);
		const ok = p.locator('dialog[open] button, [role=alertdialog] button').filter({ hasText: /confirm|change|yes|save/i });
		if (await ok.count()) await ok.first().click();
		await p.waitForTimeout(2000);
	};
	await apply(next);
	await p.reload({ waitUntil: 'load' });
	await p.waitForTimeout(3000);
	const after = await sel().inputValue();
	await apply(cur);
	assert(after === next, `plan did not persist: ${cur} -> ${next}, after reload ${after}`);
	return `${cur} -> ${next} -> ${cur}`;
});

await check('a signed-in owner who is not an admin is kept out', async () => {
	const owner = readdirSync(STATE).find((f) => f.endsWith('.json') && !f.startsWith(ADMIN));
	assert(owner, 'run owner.mjs first so an owner session exists');
	const q = await newPage(b, { storageState: `${STATE}/${owner}` });
	await q.goto(WEB + '/admin', { waitUntil: 'load' });
	await q.waitForTimeout(3500);
	const t = (await q.locator('body').innerText()).replace(/\s+/g, ' ');
	assert(/not an admin|for the AIBAN team/i.test(t), `owner saw: ${t.slice(0, 120)}`);
	await q.context().close();
});

await b.close();
process.exit(summary('admin') ? 0 : 1);
