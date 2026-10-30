# WS10-A: frontend static QA (svelte-check, build stand-in, dead code, page checks)

Run: 2026-10-30, 08:48 to 09:05 UTC. Report only; no project file was edited.
Snapshot used for the final numbers: `src/` as of 08:59 UTC. Other workstreams were still writing files during the run (about 30 files under `src/` changed in the 15 minutes before 08:59, including `src/components/store.ts`, `src/lib/api/*`, `src/lib/ui/organisms/Pricing.svelte`, the new `src/routes/admin/`, and the removal of `src/routes/api/checkout`, `api/portal`, `api/webhook/polar`). Results below may drift once those land.

Scratch left in the project: `_ws10_tmp/` (contains `fe.tgz` node_modules snapshot, `fe-src.tgz` src snapshot, `svelte-check.txt` raw output). Move it to `_deprecated/` when done. A first attempt left a truncated `_ws10_tmp/fe.tgz` that was then overwritten; nothing else was written.

## Summary

| Check | Result |
|---|---|
| svelte-check | 3 errors, 329 warnings, 53 files with problems. None of the 3 errors is in a file changed today. |
| Build stand-in (esbuild + project svelte/compiler + project sass) | 0 failures. 34 client entries and 44 server entries bundle clean. No unresolved import, no missing named export, no Svelte compile error, no SCSS error (all 240 `.svelte` files and all 177 `<style lang="scss">` blocks and standalone `.scss` files compile). |
| Missing import targets | 0 (only `./$types`, which SvelteKit generates). |
| Unimported modules | 53 files nothing imports, plus 20 more reached only from those. |
| Unlinked routes | 7 (all expected: dev test pages, CSP report endpoint, sitemap, an unused proxy). |
| package.json | Identical to the `_aiban_backups/frontend-2026-10-30-pre-overhaul.tgz` snapshot (package.json and package-lock.json both unchanged). Every package imported in `src` is installed. |
| Biggest performance problem | Every page loads all translation files for every language: about 4.6 MB minified, about 940 KB gzip of JS on every public page. |

Nothing found here would make `npm run build` fail, with two conditions (see "Blocking risks").

## 1. svelte-check

Method: shadow project at `$HOME/ws10a/fe` in the computer VM (symlinks to `src`, `static`, `node_modules`, `tsconfig.json`; `svelte.config.js` with `svelte-preprocess`; a stub `@rollup/rollup-linux-arm64-gnu` on `NODE_PATH` so `svelte-kit sync` can load vite; a `.env` holding only variable names with dummy values so `$env/static/private` types are generated). Run twice (08:52 and 08:59); same 3 errors both times.

`COMPLETED 1228 FILES 3 ERRORS 329 WARNINGS 53 FILES_WITH_PROBLEMS`

### Errors

| File:line | Message | Changed today | Suggested fix |
|---|---|---|---|
| `src/components/common/CopyUrlWithQR.svelte:3:24` | Could not find a declaration file for module 'qrcode' (implicit any). | No | Add `src/types/qrcode.d.ts` with `declare module 'qrcode';` (no network to install `@types/qrcode`). |
| `src/components/systems/wrappers/InteractiveSlides/Hey.svelte:2:34` | An import path can only end with a '.ts' extension when 'allowImportingTsExtensions' is enabled. (`import { andthisthing } from "./store.ts"`) | No | Change to `"./store"`. File is only used by the dev page `/test-checklist`. |
| `src/components/systems/wrappers/InteractiveSlides/How.svelte:2:40` | Same as above. | No | Same fix. |

These are type errors only. Vite builds them fine; they make `npm run check` exit 1.

### Warnings by kind

| Kind | Count |
|---|---:|
| css_unused_selector | 260 |
| a11y_click_events_have_key_events | 15 |
| export_let_unused | 12 |
| a11y_no_static_element_interactions | 11 |
| a11y_missing_attribute | 6 |
| component_name_lowercase | 5 |
| element_invalid_self_closing_tag | 3 |
| a11y_no_noninteractive_tabindex | 3 |
| a11y_label_has_associated_control | 3 |
| a11y_role_supports_aria_props_implicit | 1 |
| a11y_no_noninteractive_element_interactions | 1 |
| CSS lint (empty rulesets, missing standard `appearance`) | about 9 |

Files with the most warnings: `H_Dashboard/Reports/Reports.svelte` (61), `H_Dashboard/Users/Users.svelte` (58), `H_Dashboard/Users/UserCard.svelte` (44), `inputs/ColorPicker/ColorPicker.svelte` (21), `components/Header/Header.svelte` (18), `NewsSource/UpdateNewsSourceForm.svelte` (10), `inputs/Number/Number.svelte` (10). Full list: `_ws10_tmp/svelte-check.txt`.

## 2. Build stand-in

The real `vite build` cannot run here (macOS-only native rollup/esbuild binaries, no npm access). Stand-in, run in the cloud workspace on Linux x64:

- esbuild 0.28 JS API, one build per target with every route file as an entry.
  - Client (platform browser, ESM, code splitting, minified): every `+page.svelte`, `+layout.svelte`, `+page.ts/js`, `+layout.ts/js`, plus client hooks if present. 34 entries.
  - Server (platform node): the above plus `+page.server.*`, `+layout.server.*`, `+server.*`, `src/hooks.server.ts`. 44 entries. Run twice: once with node builtins and npm packages external (packages that ship Svelte source are bundled), once with everything bundled so named exports from npm packages are checked too.
- `.svelte` files: preprocessed with the project's `svelte` 5.38.0 (`svelte.preprocess`), styles with the project's pure-JS `sass` 1.93.2 (load paths: the file's folder and `node_modules`; `$lib/` and `~` importers). The project config uses plain `vitePreprocess()` with no `additionalData`, so nothing is prepended. Then `svelte.compile` with `generate: 'client'` or `'server'`. `.svelte.ts/.svelte.js` modules go through `compileModule`.
- `.ts` uses `verbatimModuleSyntax` and `isolatedModules` like `.svelte-kit/tsconfig.json`, so a type imported without `import type` would show up as a missing export.
- Stubs: `$app/environment`, `$app/navigation`, `$app/stores`, `$app/state`, `$app/paths`, `$app/forms`, `$app/server`, `$service-worker`; `$env/dynamic/*` as Proxy; `$env/static/*` export exactly the variable names found in the Mac's `.env` (names only). `?raw`, `?url`, `?inline` handled; absolute `/…` asset paths resolved into `static/`.

Result: 0 errors, 0 warnings for client, server, and server-bundle-all.

Also checked separately: all 240 `.svelte` files compile; all 177 scss blocks and every standalone `.scss` file compile with no undefined variable or mixin and no bad `@use` path.

### Client bundle size per route (minified, eager JS, layout plus page plus shared chunks)

| Route | Eager JS min KB | gzip KB |
|---|---:|---:|
| / | 4699 | 948 |
| /pricing | 4663 | 939 |
| /articles | 4646 | 935 |
| /blog/[holder]/[id] | 4665 | 942 |
| /subscribe | 4659 | 939 |
| /subscribe-widget | 4660 | 939 |
| /legal/terms | 4644 | 933 |
| /dashboard | 6864 | 1567 |

CSS is injected into JS in this stand-in, so the figures include component CSS. Vite would split CSS out and tree-shake a bit differently, so read these as approximate (within about 10 to 20 percent), but the proportions hold.

Per-entry sizes (each entry plus its shared chunks, without the root layout):

| Entry | Eager KB | Lazy KB (dynamic imports) |
|---|---:|---:|
| /dashboard/+page.svelte | 6733 | 79 |
| /+layout.svelte | 4637 | 42 |
| /login, /signup | 4539 | 1 |
| /dashboard/+layout.svelte | 2537 | 80 |
| /help | 2466 | 0 |
| / | 2247 | 42 |
| /blog/*, /pricing, /article(s), /demo, /about, /careers | 2170 to 2221 | 0 to 10 |
| /test-checklist | 1724 | 42 |
| /start | 521 | 0 |
| /subscribe, /subscribe-widget, /confirm-subscription | 399 to 410 | 10 |
| /admin, /test-styles | 207 | 0 |
| /legal/* | 70 to 72 | 0 |

Total client output: about 7.9 MB minified.

### Heaviest dependencies in the client output

| Source | KB in output |
|---|---:|
| `src/lib/i18n/locales` (37 languages, landing copy) | 1800 |
| `src/lib/i18n/locales-dashboard` | 1606 |
| `src/lib/i18n/locales-newflow` | 452 |
| `src/lib/i18n/locales-subscribe` | 140 |
| highlight.js (full build, all languages) | 1056 |
| zod | 271 |
| chart.js (`chart.js/auto`) | 192 |
| svelte runtime | 67 |
| `src/lib/i18n/locales-billing-form` | 36 |
| read-excel-file | 31 |
| qrcode | 23 |
| engine.io-client + socket.io-client | 31 |

Why every page is 4.6 MB: `src/lib/ui/organisms/LanguagePicker.svelte` (lines 7 to 12, in the root layout) imports `dashboard-translations`, `translations`, `newflow-translations`, `subscribe-translations`, `billing-form-translations` and `locales-dashboard/translations`. Each of those statically imports every language. So the landing page, the blog, the legal pages and the embeddable subscribe widget all download every string of every language for every part of the app.

highlight.js: `src/components/common/CodeFormatter.svelte:2` does `import hljs from 'highlight.js'` (all 190+ languages, about 1 MB) and lands in the dashboard bundle. Use `highlight.js/lib/core` and register the 2 or 3 languages needed (html, javascript, json).

## 3. Dead code

### Routes nothing links to

| Route | Note |
|---|---|
| `/api/csp-report` | Expected: only referenced from `svelte.config.js` CSP `report-uri`. |
| `/sitemap.xml` | Expected: referenced from `static/robots.txt`. |
| `/subscribe-widget/subscribe` (`+server.ts`) | Not called by anything. Its header says the widget and the hosted page use it, but `SubscribeForm` calls `${apiBase()}/public-subscribe` on the backend directly (`src/components/systems/widgets/Subscribe/subscribe.ts:157`). So the WS6 validation and rate limits in this proxy are bypassed. Either point `subscribe.ts` at `/subscribe-widget/subscribe` or move the proxy to `_deprecated`. |
| `/tags-test`, `/test-checklist`, `/test-styles` | Dev pages. `/test-styles` says it is noindex; the other two have no robots meta (the hook sets `X-Robots-Tag` only on private prefixes). Consider removing them from production builds. |

`/subscribe-widget/embed.js` is linked (template string in `EmbedCode.svelte` and `Step12_Share.svelte`). `/admin` is new (08:57) and only reached by typing the URL; `hooks.server.ts` lists it as private.

Removed during this run: `src/routes/api/checkout`, `api/portal`, `api/webhook/polar`. No file in `src` references them any more. `@polar-sh/sdk` and `@polar-sh/sveltekit` are now unused.

### Modules nothing imports (53)

Components: `src/components/ArticleModal/ArticleModal.svelte`, `NewsCard/NewsCard.svelte`, `ShaderToy/ChosenShader/ChosenShader.svelte`, `SmoothScrollWrapper/SmoothScrollWrapper.svelte`, `SoftTitle/SoftTitle.svelte`, `systems/inputs/ColorPicker/ColorPicker.svelte`, `systems/inputs/FileInput/FileInput.svelte`, `systems/inputs/Image/Image.svelte`, `systems/selectors/Checkbox/Checkbox.svelte`, `systems/selectors/Radio/Radio.svelte`, `systems/steps/StepsTowardsPublish/stages/A_Welcome1.svelte`, `B_Welcome2.svelte`, `C_Welcome3.svelte`, `D_Lead.svelte`, `E_NewsSource.svelte`, `H_Dashboard/H_Dashboard.svelte`, `H_Dashboard/Users/UserActions.svelte`, `systems/texts/HTMLTextLettersClassWrapper/HTMLTextLettersClassWrapper.svelte`, `systems/texts/RevealOnScroll/RevealOnScroll.svelte`, `systems/texts/Text/Text.svelte`, `systems/widgets/EmailSignature/SignatureEditor.svelte`, `systems/widgets/Subscribe/MinimalSubscribe.svelte`, `src/lib/ui/components/EmailInput.svelte`, `src/lib/ui/components/PlainText.svelte`, `src/lib/ui/molecules/HelpContextCard.svelte`.

Scripts: `src/components/GlobalData/ticks.ts`, `src/components/data/faq.ts`, `src/components/scroll.ts`, `src/components/systems/helpers/cronToNaturalLanguage.ts` (WS6 turned it into a re-export; nothing imports it), `systems/inputs/ScheduleTime/cronToNatural.ts`, `systems/inputs/ScheduleTime/naturalCronParser.ts`, `systems/requests/getAllSubscribersFromConfigEndpoint.ts`, `getNewsSourcesFromConfiguration.ts`, `getNewsletterUsersByNewsSource.ts`, `getPublicConfig.ts`, `postSubscriber.ts`, `searchNewsletterUser.ts`, `sendEmail.ts`, `submitPublicSubscription.ts`, `src/components/systems/useConfigurator.ts`, `src/lib/anim/useScrollSection.ts`, `src/lib/anim/useSmoothPage.ts`, `src/lib/api/index.ts` (barrel), `src/lib/config/help.config.ts`, `src/lib/content/auth.ts`, `src/lib/index.ts` (SvelteKit default barrel), `src/lib/stores/optimistic.ts`, `src/lib/stores/planUsage.ts` (changed 08:45 to 08:59; may be wired up soon).

Styles: `src/components/MenuHalf/MenuHalf.scss`, `src/components/common/CodeFormatter.scss`, `systems/inputs/Secrets/Secrets.scss`, `systems/texts/HTMLTextLettersClassWrapper/HTMLTextLettersClassWrapper.scss`, `src/styles/legal.scss`.

Reached only from the unused files above (20): `LoadingWheel/LoadingWheel.svelte`, `Modal/Modal.svelte`, `ShaderToy/ShaderToy.svelte`, `ShaderToy/T.shader.js`, `SmoothScrollWrapper/store.ts`, `components/audioInteractions.ts`, `systems/buttons/Date/Date.svelte`, `systems/helpers/camelCaseToCapitalized.ts`, `systems/inputs/ColorPicker/getColorSuggestions.ts`, `systems/inputs/Number/Number.svelte`, `systems/selectors/Card/JsonViewer.svelte`, `texts/RevealOnScroll/RevealOnScroll.scss`, `texts/RevealText/RevealText.scss`, `texts/RevealText/RevealText.svelte`, `widgets/EmailSignature/signature.ts`, `wrappers/Centered/Centered.svelte`, `src/lib/anim/gsap.client.ts`, `src/lib/api/events.ts`, `src/lib/api/onboarding.ts`, `src/lib/api/preview.ts`.

Some of these are new WS work not wired in yet (for example `lib/api/onboarding.ts`, `lib/api/events.ts`, `lib/anim/*`, `stores/planUsage.ts`); check with the owning workstream before moving them.

### Imports of files that do not exist

None. (Relative, `$lib`, `.js`-to-`.ts` and scss partial resolution checked for every file in `src`.)

### Dependencies in package.json that nothing in src imports

`@polar-sh/sdk`, `@polar-sh/sveltekit`, all `@smui/*`, `smui`, `svelte-material-ui`, `aos`, `canvas-preset`, `scene-preset`, `dotenv`, `express`, `express-validator`, `felte`, `svelte-forms-lib`, `svelte-calendar`, `gapi-script`, `hls.js`, `jsonwebtoken`, `leaflet`, `node-fetch`, `nodemailer`, `quill`, `three`, `victor`, `tailwindcss`, `postcss`, `autoprefixer`, `@types/highlight.js`. `gsap` is imported only by unused files. `@sveltejs/adapter-auto` is listed twice (`dependencies` ^4.0.0 and `devDependencies` ^6.0.0; 6.0.2 is installed). `@types/quill` is a devDependency for an unused package. Also `svelte.config.js` CSP still allows `https://cdn.quilljs.com` in `style-src`.

## 4. Static "Lighthouse-style" checks

`src/app.html`: `<html lang="en">` set (static; it does not follow the chosen UI language). Viewport meta set. `theme-color` for light and dark. Fonts: `Inter-Regular.core.woff` and `Lora-Variable.core.woff` preloaded with `crossorigin`; both exist in `static/fonts/aiban/` and match the `@font-face` URLs in `src/styles/fonts.scss`; `font-display: swap` is set. Fonts are WOFF, not WOFF2 (about 30 percent larger). No Google Fonts request found in `src`.

App.html has an inline theme script. With `csp.mode: 'auto'` SvelteKit does not hash scripts in `app.html`, so once the CSP moves from report-only to enforced this script will be blocked (and today it produces a report on every page). Add `nonce="%sveltekit.nonce%"` to that `<script>`.

| Route | `<title>` | meta description | Images | Heavy libs eager |
|---|---|---|---|---|
| `/` | Yes (`L.seo.title`) plus og tags | Yes | `+page.svelte:347` has alt, width, height, loading | none; but 4.6 MB of translations |
| `/pricing` | Yes | Yes (falls back to `''` if the key is missing; en has it) | none | none; translations as above |
| `/articles` | No (noindex redirect page, only robots meta) | No | none | none |
| `/blog/[holder]/[id]` | Yes, plus og article tags; not-found and error titles | Yes (`data.article.description`) | none in page source | none |
| `/article` (legacy) | Only after the article loads client side | No | none | none |
| `/subscribe` | "Subscribe" (generic, English only) | No (noindex) | `SubscribeForm.svelte:285` missing width | none |
| `/subscribe-widget` | "Subscribe" | No (noindex) | `SubscribeForm.svelte:285` missing width | none; but 939 KB gzip for an embedded form |
| `/dashboard` | "AIBAN dashboard" | No (private, noindex by hook) | see below | highlight.js 1055 KB, zod 271 KB, chart.js 192 KB, qrcode 23 KB |

Dashboard images missing attributes: `src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Newspaper/Newspaper.svelte:181` (no alt, no width, no height), `src/lib/dashboard/settings/LogoUpload.svelte:103`, `src/components/articles/FeaturedArticlesGrid.svelte:61,71,80`, `src/components/common/CopyUrlWithQR.svelte:92`, `src/lib/ui/organisms/Sidebar.svelte:76`, `src/components/MenuHalf/MenuHalf.svelte:71` (no width/height), `src/lib/dashboard/settings/BrandTab.svelte:52` (no width). Root layout: `src/lib/ui/organisms/Header.svelte:164` has alt and size, no `loading`.

None of three.js, gsap, chart.js, leaflet, quill or hls.js is loaded on a public page.

## 5. package.json and installed packages

- `package.json` and `package-lock.json` are byte-identical to the copies in `_aiban_backups/frontend-2026-10-30-pre-overhaul.tgz`. No dependency was added today (so `zod`, used by the new API layer, was already a dependency).
- Every package imported from `src` is installed: `@sveltejs/kit` 2.27.3, `chart.js` 4.5.0, `fuzzysort` 3.1.0, `google-auth-library` 10.3.0, `gsap` 3.13.0, `highlight.js` 11.11.1, `nearest-color` 0.4.4, `qrcode` 1.5.4, `read-excel-file` 6.0.3, `socket.io-client` 4.8.1, `svelte` 5.38.0, `svelte-awesome-color-picker` 3.1.4, `zod` 4.1.12 (and `@polar-sh/*` 0.35.4 / 0.4.9, no longer imported).

## Blocking risks for the real `npm run build`

1. `$env/static/private`: `src/routes/oauth/+server.js` and `src/routes/oauth/oauthState.server.js` import `SECRET_CLIENT_ID` and `SECRET_CLIENT_SECRET`. The build fails if those variables are not set in the build environment (CI or hosting). They are in the Mac's `.env`. Either make sure the host sets them at build time or switch to `$env/dynamic/private`.
2. The stand-in cannot reproduce Vite/Rollup specifics (manualChunks, adapter output, `vite-plugin-svelte` HMR/inspector). The real build still has to run on the Mac.

## Non-blocking, ranked

1. Translation payload on every page (about 940 KB gzip on public pages, 1.5 MB on the dashboard). Fix: load one locale at a time with dynamic `import()` per language in each `*-translations.ts`, and stop importing dashboard, newflow and billing translations from `LanguagePicker.svelte` in the root layout.
2. highlight.js full build in the dashboard (about 1 MB). Use `highlight.js/lib/core` plus registered languages.
3. `subscribe-widget/subscribe` proxy is never called, so its validation and rate limits do nothing.
4. App.html inline script needs `%sveltekit.nonce%` before the CSP is enforced.
5. svelte-check: 3 type errors (qrcode types, two `.ts` import suffixes).
6. Image attributes on dashboard images; `Newspaper.svelte:181` has no alt.
7. 73 unused or dead-only modules and about 30 unused dependencies.
8. `lang="en"` is fixed in `app.html`; set it from the chosen language in `hooks.server.ts` with `transformPageChunk`.
