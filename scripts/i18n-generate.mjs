#!/usr/bin/env node
// Regenerates every non-English locale file from the English source files with an LLM.
//
// English (src/lib/i18n/<namespace>/en.ts) is the only source of truth. For each
// namespace and each target language the script:
//   1. flattens en.ts into text items keyed by JSON pointer ("/auth/login/title"),
//   2. skips items already translated from the same English text (cache),
//   3. sends the rest in chunks: a JSON object of {pointer: English}, with a prompt
//      that explains the product, the screen family, the language and why,
//   4. checks the answer is the same JSON object (same keys, string values, same
//      {placeholders}) and appends it as one line to i18n-cache/<namespace>/<locale>.jsonl,
//   5. rebuilds src/lib/i18n/<namespace>/<locale>.ts with exactly the shape of en.ts.
// The LLM only ever produces values. Keys, order, nesting, arrays, numbers and
// non-text values (URLs, paths, codes) come from en.ts.
//
// The cache is append-only, so a run can stop at any time and the next run continues.
// When an English value changes, only that item is sent again.
//
// Usage (from the project root, on a machine with network):
//   node --env-file=.env --experimental-strip-types --no-warnings scripts/i18n-generate.mjs [options]
//   npm run i18n:generate -- [options]       (reads the key from the shell environment)
//
// Options:
//   --ns a,b            namespaces (default: all five)
//   --locales es,fr     target languages (default: every <code>.ts already in the namespace folder)
//   --add xx,yy         also create these new languages
//   --chunk-size 40     max items per request
//   --chunk-chars 5000  max English characters per request
//   --concurrency 4     languages processed in parallel
//   --retries 3         attempts per chunk before it is split in half
//   --force             translate everything again (ignores the cache; still appends)
//   --dry-run           show what would be sent and the first prompt; no calls, no writes
//   --build-only        only rebuild the .ts files from the cache
//   --no-build          only fill the cache
//
// Provider (environment):
//   I18N_LLM_PROVIDER   deepseek (default, DeepSeek V4 Flash) | openai | gemini | openrouter | anthropic | custom | echo
//                       echo returns the English text unchanged: a free end-to-end test.
//   I18N_LLM_API_KEY    falls back to DEEPSEEK_API_KEY (or OPENAI_API_KEY, GEMINI_API_KEY, ... for other providers)
//   I18N_LLM_MODEL      default per provider (deepseek: deepseek-flash, the current id of DeepSeek V4 Flash;
//                       the older id deepseek-v4-flash is still accepted by DeepSeek)
//   I18N_LLM_THINKING   1 turns DeepSeek thinking mode on (off by default: faster and cheaper)
//   I18N_LLM_BASE_URL   any OpenAI-compatible /chat/completions base URL (required for custom)
//   I18N_LLM_JSON_MODE  1 (default) sends response_format json_object; set 0 if the provider rejects it

import { readFile, writeFile, appendFile, mkdir, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const I18N = path.join(ROOT, 'src/lib/i18n');
const CACHE = path.join(ROOT, 'i18n-cache');

// ---------------------------------------------------------------- configuration

const NAMESPACES = {
  'locales':
    'Public website and shared app chrome: landing page, pricing, sign in and sign up, help, FAQ, blog, legal page titles, header and footer. Readers are website owners deciding whether to use AIBAN.',
  'locales-newflow':
    'Onboarding: the steps a new owner follows to connect a website, set the voice and schedule, preview the first issue, send a test and turn on sending.',
  'locales-dashboard':
    'Owner dashboard: home, automations, sources, subscribers, reports, blog, settings, the tutorial checklist, guided tour and help cards, toasts and errors.',
  'locales-billing-form':
    'The plan and billing form, including the country list. Country names must be the usual name of that country in the target language.',
  'locales-subscribe':
    'The public subscribe form, the embeddable widget, the confirmation page and the embed code card. Newsletter readers see most of these strings, not owners, so keep them short and friendly.',
};

// Names and notes per language code. Codes not listed use Intl.DisplayNames.
const LANGS = {
  jp: ['Japanese', 'Use polite desu/masu style.'],
  zh: ['Chinese (Simplified, Mainland China)', 'Use simplified characters.'],
  yue: ['Cantonese (written Cantonese, Hong Kong)', 'Use traditional characters and written Cantonese.'],
  wuu: ['Wu Chinese (Shanghainese)', 'Use simplified characters and Wu vocabulary where natural.'],
  pes: ['Persian (Iran)', 'Right-to-left script. Use the Persian alphabet.'],
  ur: ['Urdu', 'Right-to-left Nastaliq/Perso-Arabic script.'],
  pnb: ['Western Punjabi', 'Write in Shahmukhi (Perso-Arabic) script, never Gurmukhi.'],
  ar: ['Arabic (Modern Standard Arabic)', ''],
  arz: ['Egyptian Arabic', 'Arabic script, Egyptian colloquial wording.'],
  apc: ['Levantine Arabic', 'Arabic script, Levantine colloquial wording.'],
  apd: ['Sudanese Arabic', 'Arabic script, Sudanese colloquial wording.'],
  pcm: ['Nigerian Pidgin', ''],
  bho: ['Bhojpuri', 'Devanagari script.'],
  jv: ['Javanese', 'Latin script, ngoko-krama mix suitable for software.'],
  tl: ['Tagalog (Filipino)', ''],
  de: ['German', 'Address the user formally with "Sie".'],
  fr: ['French', 'Address the user with "vous".'],
  es: ['Spanish (neutral, for Latin America and Spain)', 'Address the user with "tú".'],
  pt: ['Portuguese (Brazil)', 'Address the user with "você".'],
  it: ['Italian', 'Address the user with "tu".'],
  ru: ['Russian', 'Address the user with "вы" (lowercase).'],
  tr: ['Turkish', 'Address the user with "siz".'],
  ko: ['Korean', 'Use polite 합니다/해요 style consistently.'],
  sw: ['Swahili', ''],
  ha: ['Hausa', ''],
  am: ['Amharic', 'Ethiopic script.'],
};

const KEEP_LATIN = ['AIBAN', 'Google', 'Gmail', 'WordPress', 'GitHub', 'OpenAI', 'Gemini', 'Firebase', 'HTML', 'CSV', 'API', 'URL', 'RSS', 'SMTP', 'SPF', 'DKIM', 'DMARC', 'QR', 'Free', 'Starter', 'Growth', 'Pro', 'Master'];

const NON_TEXT_KEYS = new Set(['href', 'logo', 'url', 'src', 'icon', 'code', 'id', 'slug', 'email', 'image', 'path', 'route', 'link']);

// ---------------------------------------------------------------- arguments

const argv = process.argv.slice(2);
const flag = (name) => argv.includes(`--${name}`);
const opt = (name, def) => {
  const i = argv.indexOf(`--${name}`);
  return i >= 0 && argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : def;
};
const list = (v) => (v ? String(v).split(',').map((s) => s.trim()).filter(Boolean) : null);

const OPTS = {
  ns: list(opt('ns')) ?? Object.keys(NAMESPACES),
  locales: list(opt('locales')),
  add: list(opt('add')) ?? [],
  chunkSize: Number(opt('chunk-size', 40)),
  chunkChars: Number(opt('chunk-chars', 5000)),
  concurrency: Number(opt('concurrency', 4)),
  retries: Number(opt('retries', 3)),
  force: flag('force'),
  dryRun: flag('dry-run'),
  buildOnly: flag('build-only'),
  build: !flag('no-build'),
};
for (const n of OPTS.ns) if (!NAMESPACES[n]) die(`Unknown namespace "${n}". Known: ${Object.keys(NAMESPACES).join(', ')}`);

// ---------------------------------------------------------------- helpers

function die(msg) {
  console.error(msg);
  process.exit(1);
}
const sha = (s) => createHash('sha256').update(s).digest('hex').slice(0, 16);
const esc = (k) => String(k).replace(/~/g, '~0').replace(/\//g, '~1');
const pointer = (parts) => '/' + parts.map(esc).join('/');
const placeholders = (s) => (String(s).match(/\{[^{}\s]+\}/g) ?? []).sort().join('|');

function langName(code) {
  if (LANGS[code]) return LANGS[code][0];
  try {
    const n = new Intl.DisplayNames(['en'], { type: 'language' }).of(code);
    if (n && n !== code) return n;
  } catch {
    // Intl.DisplayNames is missing or rejects the code: fall back to the code.
  }
  return code;
}
const langNote = (code) => (LANGS[code] ? LANGS[code][1] : '');

async function loadUnused() {
  try {
    return JSON.parse(await readFile(path.join(ROOT, 'scripts/i18n-unused.json'), 'utf8'));
  } catch {
    return {};
  }
}

async function loadEnglish(ns) {
  const file = path.join(I18N, ns, 'en.ts');
  const mod = await import(pathToFileURL(file).href + `?t=${Date.now()}`);
  return mod.default;
}

function isNonText(parts, value) {
  const last = String(parts[parts.length - 1]);
  if (!value.trim()) return true;
  if (!/\p{L}/u.test(value)) return true; // numbers, symbols only
  const t = value.trim();
  if (/^(https?:\/\/|mailto:|data:)/.test(t)) return true; // URLs
  if (/^(\/|\.\/|#)\S*$/.test(t) && /(href|url|link|path|route|docs|community|learnMore|src|logo|icon|image)$/i.test(last)) return true; // app paths
  if (NON_TEXT_KEYS.has(last) && !/\s/.test(t) && t === t.toLowerCase()) return true; // ids, slugs, codes
  return false;
}

/** Text items of en.ts in document order: { id, parts, en }. */
function flatten(en, unusedTop) {
  const out = [];
  (function walk(v, parts) {
    if (typeof v === 'string') {
      if (!isNonText(parts, v)) out.push({ id: pointer(parts), parts, en: v });
      return;
    }
    if (v && typeof v === 'object') {
      const entries = Array.isArray(v) ? v.map((x, i) => [i, x]) : Object.entries(v);
      for (const [k, x] of entries) {
        if (parts.length === 0 && unusedTop.has(String(k))) continue;
        walk(x, [...parts, k]);
      }
    }
  })(en, []);
  return out;
}

/** Folds the append-only cache: later lines win. Returns Map id -> { src, v }. */
async function readCache(ns, code) {
  const file = path.join(CACHE, ns, `${code}.jsonl`);
  const map = new Map();
  if (!existsSync(file)) return map;
  for (const line of (await readFile(file, 'utf8')).split('\n')) {
    if (!line.trim()) continue;
    try {
      const rec = JSON.parse(line);
      for (const [id, it] of Object.entries(rec.items ?? {})) map.set(id, it);
    } catch {
      // a half-written last line from an interrupted run: ignore it
    }
  }
  return map;
}

async function appendCache(ns, code, record) {
  const dir = path.join(CACHE, ns);
  await mkdir(dir, { recursive: true });
  await appendFile(path.join(dir, `${code}.jsonl`), JSON.stringify(record) + '\n');
}

function chunk(items) {
  const chunks = [];
  let cur = [];
  let chars = 0;
  for (const it of items) {
    if (cur.length && (cur.length >= OPTS.chunkSize || chars + it.en.length > OPTS.chunkChars)) {
      chunks.push(cur);
      cur = [];
      chars = 0;
    }
    cur.push(it);
    chars += it.en.length;
  }
  if (cur.length) chunks.push(cur);
  return chunks;
}

// ---------------------------------------------------------------- prompt

function systemPrompt(ns, code) {
  const note = langNote(code);
  return [
    'You translate the user interface of AIBAN (aiban.news), a SaaS that turns a website into an AI newsletter and sends each issue to every reader in their own language.',
    `This batch belongs to: ${NAMESPACES[ns]}`,
    `Target language: ${langName(code)} (app code "${code}"). ${note}`.trim(),
    '',
    'Why you are asked: English is the only source text. Every other language file is regenerated from English by a script, a chunk at a time, and your answer is merged back by key automatically. It must therefore be machine-exact.',
    '',
    'Input: one JSON object. Each key is a JSON pointer showing where the text sits in the English file (use it and the neighbouring keys as context). Each value is the English text.',
    'Output (json): the same JSON object with the same keys, in the same order, with nothing added, removed or renamed. Replace each value with its translation. Reply with the JSON object only: no explanation, no code fences.',
    '',
    'Rules:',
    '- Keep every placeholder in braces exactly as written, for example {name}, {count}, {email}. Never translate or reorder the text inside the braces.',
    '- Keep HTML tags, markdown, URLs, email addresses, line breaks (\\n) and leading or trailing spaces.',
    `- Keep these names unchanged, in Latin letters: ${KEEP_LATIN.join(', ')}.`,
    '- Keys ending in "one" and "other" are plural forms of the same message. Translate each correctly for its count.',
    '- Write the way a native speaker writes good software copy: plain, warm, direct, consistent terms across the file. Use sentence case. No em dashes or en dashes (use a comma, a period or parentheses). No emojis. Keep button labels and menu items about as short as the English.',
    '- If the English is odd or looks broken, translate it as it is. Do not fix it and do not comment.',
    '- If a value is a proper noun or already not English, keep it.',
  ].join('\n');
}

// ---------------------------------------------------------------- LLM

const PROVIDERS = {
  deepseek: { base: 'https://api.deepseek.com', model: 'deepseek-flash', key: 'DEEPSEEK_API_KEY' },
  openai: { base: 'https://api.openai.com/v1', model: 'gpt-4.1-mini', key: 'OPENAI_API_KEY' },
  gemini: { base: 'https://generativelanguage.googleapis.com/v1beta/openai', model: 'gemini-2.5-flash', key: 'GEMINI_API_KEY' },
  openrouter: { base: 'https://openrouter.ai/api/v1', model: 'openai/gpt-4.1-mini', key: 'OPENROUTER_API_KEY' },
  anthropic: { base: 'https://api.anthropic.com/v1', model: 'claude-sonnet-4-5', key: 'ANTHROPIC_API_KEY' },
  custom: { base: '', model: '', key: '' },
  echo: { base: '', model: 'echo', key: '' },
};
const PROVIDER = process.env.I18N_LLM_PROVIDER || 'deepseek';
if (!PROVIDERS[PROVIDER]) die(`Unknown I18N_LLM_PROVIDER "${PROVIDER}".`);
const P = PROVIDERS[PROVIDER];
const BASE = (process.env.I18N_LLM_BASE_URL || P.base).replace(/\/$/, '');
const MODEL = process.env.I18N_LLM_MODEL || P.model;
const API_KEY = process.env.I18N_LLM_API_KEY || (P.key ? process.env[P.key] : '');
const JSON_MODE = process.env.I18N_LLM_JSON_MODE !== '0';

async function callLLM(system, user) {
  if (PROVIDER === 'echo') return user;
  const body = {
    model: MODEL,
    temperature: 0.2,
    messages: [
      { role: 'system', content: system },
      { role: 'user', content: user },
    ],
  };
  if (JSON_MODE) body.response_format = { type: 'json_object' };
  if (PROVIDER === 'deepseek') {
    // Thinking is on by default for DeepSeek V4 and ignores temperature; a translation does not need it.
    body.thinking = { type: process.env.I18N_LLM_THINKING === '1' ? 'enabled' : 'disabled' };
    body.max_tokens = 16000;
  }
  for (let attempt = 1; ; attempt++) {
    const res = await fetch(`${BASE}/chat/completions`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', authorization: `Bearer ${API_KEY}` },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      const data = await res.json();
      return data?.choices?.[0]?.message?.content ?? '';
    }
    const text = await res.text().catch(() => '');
    if ((res.status === 429 || res.status >= 500) && attempt < 6) {
      const wait = Math.min(60_000, 2_000 * 2 ** (attempt - 1));
      console.warn(`  ${res.status} from provider, waiting ${wait / 1000}s`);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    throw new Error(`Provider answered ${res.status}: ${text.slice(0, 300)}`);
  }
}

function parseAnswer(raw) {
  let s = String(raw).trim();
  s = s.replace(/^```(?:json)?\s*/i, '').replace(/\s*```$/, '');
  const a = s.indexOf('{');
  const b = s.lastIndexOf('}');
  if (a < 0 || b < a) throw new Error('no JSON object in the answer');
  return JSON.parse(s.slice(a, b + 1));
}

function cleanDashes(en, v) {
  if (/[–—]/.test(en)) return v;
  return v.replace(/\s*[–—]\s*/g, ', ');
}

/** Validates an answer against the chunk. Returns { id: value } or throws. */
function validate(items, answer) {
  if (!answer || typeof answer !== 'object' || Array.isArray(answer)) throw new Error('answer is not a JSON object');
  const want = new Set(items.map((i) => i.id));
  const got = Object.keys(answer);
  const missing = [...want].filter((k) => !(k in answer));
  const extra = got.filter((k) => !want.has(k));
  if (missing.length || extra.length) throw new Error(`keys differ (missing ${missing.length}, extra ${extra.length})`);
  const out = {};
  for (const it of items) {
    const v = answer[it.id];
    if (typeof v !== 'string') throw new Error(`${it.id}: value is not a string`);
    if (!v.trim()) throw new Error(`${it.id}: empty value`);
    if (placeholders(v) !== placeholders(it.en)) throw new Error(`${it.id}: placeholders differ`);
    out[it.id] = cleanDashes(it.en, v);
  }
  return out;
}

async function translateChunk(ns, code, items, depth = 0) {
  const system = systemPrompt(ns, code);
  const user = JSON.stringify(Object.fromEntries(items.map((i) => [i.id, i.en])), null, 2);
  let lastErr;
  for (let attempt = 1; attempt <= OPTS.retries; attempt++) {
    try {
      return validate(items, parseAnswer(await callLLM(system, user)));
    } catch (e) {
      lastErr = e;
      if (/^Provider answered (401|403|404)/.test(e.message)) throw e;
    }
  }
  if (items.length > 1) {
    const mid = Math.ceil(items.length / 2);
    console.warn(`  ${ns}/${code}: chunk of ${items.length} failed (${lastErr.message}), splitting`);
    return {
      ...(await translateChunk(ns, code, items.slice(0, mid), depth + 1)),
      ...(await translateChunk(ns, code, items.slice(mid), depth + 1)),
    };
  }
  console.warn(`  ${ns}/${code}: ${items[0].id} left in English (${lastErr.message})`);
  return {};
}

// ---------------------------------------------------------------- build

function rebuild(en, cache, unusedTop) {
  let missing = 0;
  const out = (function walk(v, parts) {
    if (typeof v === 'string') {
      if (isNonText(parts, v)) return v;
      const hit = cache.get(pointer(parts));
      if (hit && hit.src === sha(v)) return hit.v;
      missing++;
      return v;
    }
    if (Array.isArray(v)) return v.map((x, i) => walk(x, [...parts, i]));
    if (v && typeof v === 'object') {
      const o = {};
      for (const [k, x] of Object.entries(v)) {
        if (parts.length === 0 && unusedTop.has(k)) continue;
        o[k] = walk(x, [...parts, k]);
      }
      return o;
    }
    return v;
  })(en, []);
  return { out, missing };
}

async function writeLocale(ns, code, obj) {
  const header =
    `// ${code} (${langName(code)}) strings for ${ns}. GENERATED from en.ts by scripts/i18n-generate.mjs.\n` +
    `// Do not edit by hand: change en.ts and run npm run i18n:generate. Missing items fall back to English.\n`;
  await writeFile(path.join(I18N, ns, `${code}.ts`), header + 'export default ' + JSON.stringify(obj, null, 2) + ';\n');
}

// ---------------------------------------------------------------- main

async function targetLocales(ns) {
  if (OPTS.locales) return [...new Set([...OPTS.locales, ...OPTS.add])];
  const files = await readdir(path.join(I18N, ns));
  const codes = files.filter((f) => /^[a-z]{2,3}\.ts$/.test(f) && f !== 'en.ts').map((f) => f.slice(0, -3));
  return [...new Set([...codes, ...OPTS.add])].sort();
}

async function pool(tasks, n) {
  const results = [];
  let i = 0;
  await Promise.all(
    Array.from({ length: Math.max(1, n) }, async () => {
      while (i < tasks.length) {
        const t = tasks[i++];
        results.push(await t());
      }
    }),
  );
  return results;
}

async function main() {
  if (!OPTS.dryRun && !OPTS.buildOnly && PROVIDER !== 'echo' && !API_KEY) {
    die(`No API key. Set I18N_LLM_API_KEY or ${P.key || 'I18N_LLM_API_KEY'} (provider "${PROVIDER}").`);
  }
  if (PROVIDER === 'custom' && !BASE) die('I18N_LLM_BASE_URL is required for the custom provider.');
  const unused = await loadUnused();
  const summary = [];
  let shownPrompt = false;

  for (const ns of OPTS.ns) {
    const en = await loadEnglish(ns);
    const unusedTop = new Set(unused[ns] ?? []);
    const items = flatten(en, unusedTop);
    const codes = await targetLocales(ns);
    console.log(`${ns}: ${items.length} text items, ${codes.length} languages`);

    await pool(
      codes.map((code) => async () => {
        const cache = OPTS.force ? new Map() : await readCache(ns, code);
        const pending = items.filter((it) => cache.get(it.id)?.src !== sha(it.en));
        const chunks = chunk(pending);
        if (OPTS.dryRun) {
          summary.push({ ns, code, pending: pending.length, chunks: chunks.length });
          if (!shownPrompt && chunks.length) {
            shownPrompt = true;
            console.log('\n--- first system prompt ---\n' + systemPrompt(ns, code));
            console.log('\n--- first user message (truncated) ---\n' + JSON.stringify(Object.fromEntries(chunks[0].slice(0, 5).map((i) => [i.id, i.en])), null, 2) + '\n');
          }
          return;
        }
        if (!OPTS.buildOnly) {
          for (let c = 0; c < chunks.length; c++) {
            const values = await translateChunk(ns, code, chunks[c]);
            const record = {
              at: new Date().toISOString(),
              provider: PROVIDER,
              model: MODEL,
              chunk: `${c + 1}/${chunks.length}`,
              items: Object.fromEntries(
                chunks[c].filter((it) => it.id in values).map((it) => [it.id, { src: sha(it.en), v: values[it.id] }]),
              ),
            };
            if (Object.keys(record.items).length) {
              await appendCache(ns, code, record);
              for (const [id, it] of Object.entries(record.items)) cache.set(id, it);
            }
            console.log(`  ${ns}/${code}: chunk ${c + 1}/${chunks.length} (${chunks[c].length} items)`);
          }
        }
        if (OPTS.build) {
          const { out, missing } = rebuild(en, cache, unusedTop);
          await writeLocale(ns, code, out);
          summary.push({ ns, code, sent: OPTS.buildOnly ? 0 : pending.length, englishFallback: missing });
        }
      }),
      OPTS.concurrency,
    );
  }

  if (OPTS.dryRun) {
    const total = summary.reduce((a, s) => a + s.pending, 0);
    const reqs = summary.reduce((a, s) => a + s.chunks, 0);
    console.log(`Dry run: ${total} items to translate in ${reqs} requests across ${summary.length} files. Nothing was sent or written.`);
    return;
  }
  const left = summary.filter((s) => s.englishFallback);
  console.log(`Done: ${summary.length} files written.` + (left.length ? ` ${left.length} still have English items; run again to retry them.` : ''));
  for (const s of left) console.log(`  ${s.ns}/${s.code}: ${s.englishFallback} items in English`);
}

main().catch((e) => die(e.stack || String(e)));
