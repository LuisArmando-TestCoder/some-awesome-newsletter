#!/usr/bin/env node
// Copy linter (WS9). Flags COPY_RULES.md violations in user-facing text.
// Locale files: checks every string value. Hard rules (dashes, emojis) apply to every language;
// English-only rules (curly quotes, banned words and structures, Title Case) apply to en.ts.
// Code files (.svelte, .ts, .html) under the given dirs: checks string literals and markup text,
// skipping comments, imports, CSS blocks and class/attribute plumbing. Add `copy-lint-ignore` on a line to skip it.
// Usage:
//   node --experimental-strip-types --no-warnings scripts/copy-lint.mjs            # locales only
//   node --experimental-strip-types --no-warnings scripts/copy-lint.mjs --code src  # also scan code
//   add --hard to report only dashes and emojis, --json <file> for machine output
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : undefined; };
const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const I18N = path.join(ROOT, 'src/lib/i18n');
const NAMESPACES = ['locales', 'locales-newflow', 'locales-dashboard', 'locales-billing-form', 'locales-subscribe'];
const hardOnly = args.includes('--hard');
const UNUSED_FILE = path.join(ROOT, 'scripts/i18n-unused.json');
const UNUSED = fs.existsSync(UNUSED_FILE) ? JSON.parse(fs.readFileSync(UNUSED_FILE, 'utf8')) : {};
const isUnused = (ns, key) => (UNUSED[ns] || []).some((p) => key === p || key.startsWith(p + '.') || key.startsWith(p + '['));
// Known false positives (proper nouns, example text). Format "namespace/key".
const ALLOW = new Set(UNUSED.copyLintAllow || []);
const codeDirs = args.filter((a, i) => args[i - 1] === '--code');

const HARD = [
  ['dash', /[—–―]|\s--\s/],
  ['emoji', /\p{Extended_Pictographic}/u],
];
const BANNED = [
  'delve', 'dive into', 'tapestry', 'testament', 'vibrant', 'pivotal', 'crucial', 'landscape', 'showcase', 'underscore',
  'foster', 'garner', 'intricate', 'interplay', 'enhance', 'enhanced', 'enhances', 'seamless', 'seamlessly', 'robust', 'leverage',
  'unlock', 'unlocks', 'elevate', 'supercharge', 'game-changer', 'revolutionize', 'cutting-edge', 'groundbreaking', 'stunning',
  'breathtaking', 'nestled', 'boasts', 'serves as', 'stands as', "in today's", 'quietly', 'genuinely', 'honestly',
  "here's the kicker", 'the best part', 'the crazy thing', 'scary truth', "here's the truth", 'what nobody tells you',
  'point ai at', "let's dive in", "let's explore", 'without further ado', 'at its core', 'the real question is',
  'i hope this helps', 'certainly!', 'great question', 'highlights', 'highlighted', 'highlighting', 'effortless', 'effortlessly',
];
const bannedRe = new RegExp(`(^|[^\\w-])(${BANNED.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})(?![\\w-])`, 'i');
const EN_RULES = [
  ['curly-quote', /[“”‘’]/],
  ['banned-word', bannedRe],
  ['key-adjective', /\bkey (feature|benefit|point|insight|takeaway|metric|step|part|factor)s?\b/i],
  ['not-x-but-y', /\b(isn't|is not|aren't|not)\b[^.?!]{1,60}\b(it's|but rather|but)\b/i],
  ['tailing-negation', /,\s+no\s+[\w ]{2,25}[.!]?$/i],
  ['subjectless-fragment', /(^|[.!]\s+)No [\w ]{2,25} (needed|required)\./],
  ['ing-tail', /,\s+(ensuring|making sure|allowing|helping|enabling|empowering)\b/i],
  ['self-answered-question', /\?\s+[A-Z][^?]*[.!]$/],
  ['ellipsis-drama', /(\.\.\.|…)\s+[a-z]/],
  ['exclamation', /!\s*$/],
];
const PROPER = /^(AIBAN|Google|Gmail|WordPress|Stripe|Outlook|Apple|Mail|CSV|HTML|URL|RSS|API|AI|SMTP|ID|OK|I|Excel|Substack|Mailchimp|Pexels|Typesense|Firestore|PDF|JSON|QR|UTC|FAQ|SEO|iOS|Android|Chrome|Safari|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|January|February|March|April|May|June|July|August|September|October|November|December|English|Spanish|German|French|[A-Z]{2,})$/;
function titleCase(key, s) {
  if (!/(title|heading|cta|button|btn|label|tab|menu|link|action|submit|save|cancel|nav)/i.test(key)) return false;
  if (s.length > 70 || /[.!?:]\s|\{/.test(s.trim().slice(0, -1))) return false;
  const words = s.replace(/[^\p{L}\p{N}' -]/gu, ' ').split(/\s+/).filter(Boolean);
  if (words.length < 2) return false;
  const caps = words.slice(1).filter((w) => /^\p{Lu}/u.test(w) && !PROPER.test(w));
  return caps.length >= 1 && caps.length >= Math.ceil((words.length - 1) / 2);
}

function flatten(o, p = '', r = {}) {
  if (Array.isArray(o)) o.forEach((v, i) => flatten(v, `${p}[${i}]`, r));
  else if (o && typeof o === 'object') for (const [k, v] of Object.entries(o)) flatten(v, p ? `${p}.${k}` : k, r);
  else r[p] = o;
  return r;
}
function check(s, key, english) {
  const hits = [];
  if (typeof s !== 'string' || !s.trim()) return hits;
  if (/^(https?:|\/|#|[\w.+-]+@)/.test(s.trim()) && !/\s/.test(s.trim())) return hits;
  for (const [n, re] of HARD) if (re.test(s)) hits.push(n);
  if (english && !hardOnly) {
    for (const [n, re] of EN_RULES) if (re.test(s)) hits.push(n);
    if (titleCase(key, s)) hits.push('title-case');
  }
  return hits;
}

const findings = [];
for (const ns of NAMESPACES) {
  const dir = path.join(I18N, ns);
  for (const f of fs.readdirSync(dir).filter((f) => f.endsWith('.ts') && f !== 'translations.ts')) {
    const code = f.replace(/\.ts$/, '');
    const flat = flatten((await import(pathToFileURL(path.join(dir, f)).href)).default);
    for (const [k, v] of Object.entries(flat)) if (!isUnused(ns, k) && !ALLOW.has(`${ns}/${k}`)) for (const rule of check(v, k, code === 'en')) findings.push({ file: `src/lib/i18n/${ns}/${f}`, key: k, rule, text: String(v).slice(0, 140) });
  }
}

function* walk(d) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    if (['node_modules', '.svelte-kit', 'build', '_deprecated', '_aiban_backups', 'i18n', '__tests__', '.git_disabled', 'test-styles', 'tags-test', 'test-checklist'].includes(e.name)) continue;
    const p = path.join(d, e.name);
    if (e.isDirectory()) yield* walk(p);
    else if (/\.(svelte|ts|html|mjs|js)$/.test(e.name)) yield p;
  }
}
for (const cd of codeDirs) {
  for (const file of walk(path.resolve(ROOT, cd))) {
    const lines = fs.readFileSync(file, 'utf8').split('\n');
    let inStyle = false, inBlock = false;
    lines.forEach((line, i) => {
      if (/<style/.test(line)) inStyle = true;
      if (/<\/style>/.test(line)) { inStyle = false; return; }
      if (inStyle || line.includes('copy-lint-ignore')) return;
      if (inBlock) { if (/\*\/|-->/.test(line)) inBlock = false; return; }
      if (/^\s*(\/\*|<!--)/.test(line) && !/\*\/|-->/.test(line)) { inBlock = true; return; }
      const t = line.trim();
      if (/^(\/\/|\*|import |export \{|console\.)/.test(t)) return;
      const noComment = line.replace(/\/\/.*$/, '').replace(/<!--.*?-->/g, '').replace(/\/\*.*?\*\//g, '');
      for (const rule of check(noComment, '', false)) findings.push({ file: path.relative(ROOT, file), line: i + 1, rule, text: t.slice(0, 140) });
      if (!hardOnly) {
        const strings = [...noComment.matchAll(/(["'`])((?:(?!\1).){6,})\1|>([^<>{}]{6,})</g)].map((m) => m[2] ?? m[3]);
        for (const s of strings) if (/[a-z]{3,} [a-z]{2,}/i.test(s)) for (const rule of check(s, '', true).filter((r) => !['dash', 'emoji', 'exclamation'].includes(r))) findings.push({ file: path.relative(ROOT, file), line: i + 1, rule, text: s.slice(0, 140) });
      }
    });
  }
}

const jsonOut = opt('--json');
if (jsonOut) fs.writeFileSync(jsonOut, JSON.stringify(findings, null, 1));
const byRule = {};
for (const f of findings) byRule[f.rule] = (byRule[f.rule] || 0) + 1;
if (!args.includes('--summary')) for (const f of findings) console.log(`${f.file}${f.line ? ':' + f.line : ' ' + f.key}  [${f.rule}]  ${f.text}`);
console.log(`\n${findings.length} findings`, byRule);
process.exit(findings.some((f) => f.rule === 'dash' || f.rule === 'emoji') ? 1 : 0);
