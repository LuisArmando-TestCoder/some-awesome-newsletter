import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createRequire } from 'node:module';
const P = new URL('../../..', import.meta.url).pathname.replace(/\/$/, '');
const require = createRequire(P + '/package.json');
const { compile } = require('svelte/compiler');
const sass = require('sass');
const ts = require('typescript');
// Output goes outside the project (generated files, about 4 MB). Override with HARNESS_OUT.
const HERE = new URL('.', import.meta.url).pathname;
const OUT = process.env.HARNESS_OUT || join(tmpdir(), 'aiban-ws5-harness');
mkdirSync(OUT, { recursive: true });
process.chdir(OUT);
mkdirSync('out/lib', { recursive: true });
// cp -R instead of fs.cpSync: the native copy fails on some mounted folders.
for (const [from, to] of [['svelte/src', 'svelte'], ['clsx/dist', 'clsx']]) {
  execSync(`rm -rf out/${to} 2>/dev/null; mkdir -p out/${to} && cp -R "${P}/node_modules/${from}/." out/${to}/`);
}
const tsjs = (src) => ts.transpileModule(src, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 } }).outputText;
const fix = (code) => code
  .replace(/from ['"]\$lib\/i18n\/subscribe-translations['"]/g, "from './i18n.js'")
  .replace(/from ['"]\.\/subscribe['"]/g, "from './subscribe.js'")
  .replace(/from ['"]\.\.\/Subscribe\/subscribe['"]/g, "from './subscribe.js'")
  .replace(/from ['"]\.\.\/\.\.\/\.\.\/store['"]/g, "from './store.js'")
  .replace(/from ['"]\.\.\/\.\.\/inputs\/Language\/languages['"]/g, "from './languages.js'")
  .replace(/from ['"]\.\.\/\.\.\/components\/systems\/widgets\/Subscribe\/subscribe['"]/g, "from './subscribe.js'")
  .replace(/from ['"]\$app\/stores['"]/g, "from './app-stores.js'")
  .replace(/from ['"]\$lib\/ui\/components\/(\w+)\.svelte['"]/g, "from './$1.js'")
  .replace(/from ['"]\.\/(\w+)\.svelte['"]/g, "from './$1.js'")
  .replace(/from ['"]\.\/signature['"]/g, "from './signature.js'");
const W = P + '/src/components/systems/widgets';
writeFileSync('out/lib/subscribe.js', fix(tsjs(readFileSync(W + '/Subscribe/subscribe.ts', 'utf8'))));
writeFileSync('out/lib/languages.js', tsjs(readFileSync(P + '/src/components/systems/inputs/Language/languages.ts', 'utf8')));
writeFileSync('out/lib/en.js', tsjs(readFileSync(P + '/src/lib/i18n/locales-subscribe/en.ts', 'utf8')));
writeFileSync('out/lib/es.js', tsjs(readFileSync(P + '/src/lib/i18n/locales-subscribe/es.ts', 'utf8')));
writeFileSync('out/lib/store.js', "import { writable } from 'svelte/store'; export default writable({ apiURL: () => 'https://api.mock' });");
writeFileSync('out/lib/app-stores.js', "import { readable } from 'svelte/store'; export const page = readable({ url: new URL(location.href) });");
const i18n = tsjs(readFileSync(P + '/src/lib/i18n/subscribe-translations.ts', 'utf8')).replace(/from ['"]\.\/locales-subscribe\/translations['"]/, "from './translations.js'");
writeFileSync('out/lib/i18n.js', i18n);
writeFileSync('out/lib/translations.js', "import en from './en.js'; import es from './es.js'; export default { en, es };");
function comp(file, out) {
  let src = readFileSync(file, 'utf8');
  src = src.replace(/<style lang="scss">([\s\S]*?)<\/style>/, (m, css) => '<style>' + sass.compileString(css).css + '</style>');
  const r = compile(src, { filename: file, generate: 'client', css: 'injected', dev: false });
  for (const w of r.warnings) console.log('WARN', out, w.code, w.message.split('\n')[0]);
  writeFileSync('out/lib/' + out, fix(r.js.code));
}
comp(W + '/Subscribe/SubscribeForm.svelte', 'SubscribeForm.js');
comp(W + '/EmbedCode/EmbedCode.svelte', 'EmbedCode.js');
comp(P + '/src/routes/confirm-subscription/+page.svelte', 'Confirm.js');
writeFileSync('out/lib/signature.js', tsjs(readFileSync(W + '/EmailSignature/signature.ts', 'utf8')));
for (const name of ['TextField', 'Textarea', 'Switch', 'Button', 'Field', 'Spinner']) comp(P + '/src/lib/ui/components/' + name + '.svelte', name + '.js');
comp(W + '/EmailSignature/SignatureEditor.svelte', 'SignatureEditor.js');
writeFileSync('out/esm-env-stub.js', 'export const BROWSER = true; export const DEV = false; export const NODE = false;');
writeFileSync('out/tokens.css', sass.compile(P + '/src/styles/tokens.scss').css);
writeFileSync('out/index.html', readFileSync(join(HERE, 'index.template.html'), 'utf8'));
console.log('built ' + join(OUT, 'out', 'index.html'));
