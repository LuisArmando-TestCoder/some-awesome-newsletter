#!/usr/bin/env node
// i18n check (WS9). English (en.ts) is the source of truth in every namespace.
// Reports per locale: missing keys, extra keys, placeholder mismatches, and
// (with --stale <dir>) keys whose English changed since the translation was written.
// Usage:
//   node --experimental-strip-types --no-warnings scripts/i18n-check.mjs [--ns locales-dashboard] [--locale es] [--json out.json] [--stale <old src/lib/i18n dir>] [--quiet]
// Sections listed in scripts/i18n-unused.json (no code uses them) are skipped.
// Exit code 1 when any locale has missing keys or placeholder mismatches
// (locales listed under fallbackOnly in scripts/i18n-unused.json are reported but do not fail).
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const flag = (name) => args.includes(name);
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const I18N = path.join(ROOT, 'src/lib/i18n');
const NAMESPACES = ['locales', 'locales-newflow', 'locales-dashboard', 'locales-billing-form', 'locales-subscribe'];
const onlyNs = opt('--ns');
const onlyLocale = opt('--locale');
const staleDir = opt('--stale');
const jsonOut = opt('--json');
const quiet = flag('--quiet');
const UNUSED_FILE = path.join(ROOT, 'scripts/i18n-unused.json');
const UNUSED = fs.existsSync(UNUSED_FILE) ? JSON.parse(fs.readFileSync(UNUSED_FILE, 'utf8')) : {};
const FALLBACK = UNUSED.fallbackOnly || {};
const isUnused = (ns, key) => (UNUSED[ns] || []).some((p) => key === p || key.startsWith(p + '.') || key.startsWith(p + '['));

// Values that are the same in every language (paths, URLs, codes, product names).
const NEUTRAL = /^(\s*|[\d\s.,:;%+\-()/]+|https?:\/\/\S+|\/\S*|[\w.+-]+@[\w.-]+|#[0-9a-f]{3,8}|AIBAN|Google|Gmail|WordPress|Stripe|CSV|HTML|URL|RSS|OK|Email|Logo)$/i;

export function flatten(obj, prefix = '', out = {}) {
  if (Array.isArray(obj)) obj.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out));
  else if (obj && typeof obj === 'object') for (const [k, v] of Object.entries(obj)) flatten(v, prefix ? `${prefix}.${k}` : k, out);
  else out[prefix] = obj;
  return out;
}

export function placeholders(s) {
  if (typeof s !== 'string') return [];
  const m = s.match(/\{\{\s*[\w.]+\s*\}\}|\{[\w.]+\}|%[sd]|\$\{[\w.]+\}/g) || [];
  return m.map((x) => x.replace(/\s+/g, '')).sort();
}

async function load(file) {
  if (!fs.existsSync(file)) return undefined;
  const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
  return mod.default;
}

const report = {};
let hardFail = 0;
for (const ns of NAMESPACES) {
  if (onlyNs && ns !== onlyNs) continue;
  const dir = path.join(I18N, ns);
  const en = flatten(await load(path.join(dir, 'en.ts')));
  const enKeys = Object.keys(en).filter((k) => !isUnused(ns, k));
  let enOld, oldDir;
  if (staleDir) { oldDir = path.join(staleDir, ns); const o = await load(path.join(oldDir, 'en.ts')); enOld = o && flatten(o); }
  const files = fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'en.ts' && f !== 'translations.ts');
  report[ns] = {};
  for (const f of files) {
    const code = f.replace(/\.ts$/, '');
    if (onlyLocale && code !== onlyLocale) continue;
    const loc = flatten(await load(path.join(dir, f)));
    const missing = enKeys.filter((k) => !(k in loc) || loc[k] === '' || loc[k] == null).filter((k) => !(typeof en[k] === 'string' && NEUTRAL.test(en[k])) || !(k in loc));
    const extra = Object.keys(loc).filter((k) => !(k in en));
    const mismatch = enKeys.filter((k) => k in loc && typeof loc[k] === 'string' && JSON.stringify(placeholders(loc[k])) !== JSON.stringify(placeholders(en[k])));
    let stale = [];
    if (enOld) {
      const old = await load(path.join(oldDir, f));
      const locOld = old ? flatten(old) : {};
      stale = enKeys.filter((k) => k in enOld && enOld[k] !== en[k] && k in loc && loc[k] === locOld[k]);
    }
    const covered = enKeys.length - missing.length;
    report[ns][code] = { total: enKeys.length, covered, pct: Math.round((covered / enKeys.length) * 1000) / 10, missing, extra, mismatch, stale };
    const fallbackOnly = (FALLBACK[ns] || []).includes(code);
    report[ns][code].fallbackOnly = fallbackOnly;
    if (mismatch.length || (missing.length && !fallbackOnly)) hardFail++;
  }
}

if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(report, null, 1));
for (const [ns, locs] of Object.entries(report)) {
  const rows = Object.entries(locs);
  const bad = rows.filter(([, r]) => !r.fallbackOnly && (r.missing.length || r.mismatch.length || r.extra.length || r.stale.length));
  const fb = rows.filter(([, r]) => r.fallbackOnly);
  console.log(`\n${ns}: ${rows.length} locales, ${bad.length} with issues${fb.length ? `, ${fb.length} fallback-only (English shows for missing keys): ${fb.map(([c]) => c).join(' ')}` : ''}`);
  for (const [code, r] of quiet ? bad : rows.filter(([, r]) => !r.fallbackOnly)) {
    console.log(`  ${code.padEnd(5)} ${String(r.pct).padStart(5)}%  missing ${r.missing.length}  extra ${r.extra.length}  placeholder ${r.mismatch.length}${staleDir ? `  stale ${r.stale.length}` : ''}`);
  }
}
console.log(hardFail ? `\n${hardFail} locale files have missing keys or placeholder mismatches.` : '\nAll locales complete.');
process.exit(hardFail ? 1 : 0);
