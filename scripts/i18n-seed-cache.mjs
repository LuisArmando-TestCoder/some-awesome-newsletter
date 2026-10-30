#!/usr/bin/env node
// Seeds i18n-cache/ from the locale files that already exist, so that
// scripts/i18n-generate.mjs only translates strings that are new or missing.
//
// Why: the generator's cache is the record of "this English text was already
// translated". Locale files that were generated on another machine (or before the
// cache existed) have no cache, and the generator would translate everything again.
//
// For every namespace, locale and text item of en.ts: when the locale file has a
// value at the same place and it differs from the English text, that value is
// recorded as the translation of the CURRENT English text. Items the locale file
// does not have (or still has in English) are left out, so the generator sends them.
//
// Caveat: if an English string was reworded after the locale was generated, the
// old translation is kept. Run the generator with --force for a namespace when its
// English text changed a lot.
//
// Usage: node --experimental-strip-types --no-warnings scripts/i18n-seed-cache.mjs [--ns locales,locales-dashboard]
import { readdir, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const I18N = path.join(ROOT, 'src/lib/i18n');
const CACHE = path.join(ROOT, 'i18n-cache');
const ALL = ['locales', 'locales-newflow', 'locales-dashboard', 'locales-billing-form', 'locales-subscribe'];
const argv = process.argv.slice(2);
const nsArg = argv.includes('--ns') ? argv[argv.indexOf('--ns') + 1].split(',') : ALL;

// Same rules as i18n-generate.mjs (keep in sync).
const NON_TEXT_KEYS = new Set(['href', 'logo', 'url', 'src', 'icon', 'code', 'id', 'slug', 'email', 'image', 'path', 'route', 'link']);
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const esc = (k) => String(k).replace(/~/g, '~0').replace(/\//g, '~1');
const pointer = (parts) => '/' + parts.map(esc).join('/');
// Text that must stay as written in every locale: the sample issue of the dashboard
// showcase is already written in three languages on purpose, and sample sites and
// emails are identifiers.
const NEVER_TRANSLATE = [/^\/showcase\/examples\/\d+\/(issue\/langs\/|site$|people\/|business$)/];

function isNonText(parts, value) {
  if (NEVER_TRANSLATE.some((re) => re.test(pointer(parts)))) return true;
  const last = String(parts[parts.length - 1]);
  if (!value.trim()) return true;
  if (!/\p{L}/u.test(value)) return true;
  const t = value.trim();
  if (/^(https?:\/\/|mailto:|data:)/.test(t)) return true;
  if (/^(\/|\.\/|#)\S*$/.test(t) && /(href|url|link|path|route|docs|community|learnMore|src|logo|icon|image)$/i.test(last)) return true;
  if (NON_TEXT_KEYS.has(last) && !/\s/.test(t) && t === t.toLowerCase()) return true;
  return false;
}
const at = (obj, parts) => parts.reduce((o, k) => (o == null ? undefined : o[k]), obj);
const load = async (file) => (await import(pathToFileURL(file).href + `?t=${Date.now()}`)).default;

let seeded = 0;
let skipped = 0;
for (const ns of nsArg) {
  const dir = path.join(I18N, ns);
  const en = await load(path.join(dir, 'en.ts'));
  const items = [];
  (function walk(v, parts) {
    if (typeof v === 'string') {
      if (!isNonText(parts, v)) items.push({ parts, en: v });
      return;
    }
    if (v && typeof v === 'object') for (const [k, x] of Array.isArray(v) ? v.map((x, i) => [i, x]) : Object.entries(v)) walk(x, [...parts, k]);
  })(en, []);
  const codes = (await readdir(dir)).filter((f) => /^[a-z]{2,3}\.ts$/.test(f) && f !== 'en.ts').map((f) => f.slice(0, -3));
  await mkdir(path.join(CACHE, ns), { recursive: true });
  for (const code of codes) {
    const file = path.join(CACHE, ns, `${code}.jsonl`);
    if (existsSync(file)) {
      skipped++;
      continue; // never overwrite a real cache
    }
    const loc = await load(path.join(dir, `${code}.ts`));
    const out = {};
    for (const it of items) {
      const v = at(loc, it.parts);
      if (typeof v === 'string' && v.trim() && v !== it.en) out[pointer(it.parts)] = { src: sha(it.en), v };
    }
    await writeFile(file, JSON.stringify({ at: new Date().toISOString(), provider: 'seed', model: 'existing-locale-file', chunk: '1/1', items: out }) + '\n');
    seeded += Object.keys(out).length;
  }
}
console.log(`Seeded ${seeded} existing translations. ${skipped} caches already existed and were left alone.`);
