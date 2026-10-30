# WS5 log

## 2026-10-30
- Connected folders were missing at start; requested access to both projects, granted.
- Read CHARTER, COPY_RULES, diagnostic (section 3 and pages 6 to 10), requests/5.md (empty), DESIGN_SYSTEM.md, tokens.scss.
- Environment: same as WS1 notes. `npm run check` fails on the computer (macOS node_modules, missing rollup linux binary, no network). Type checks run from `$HOME/ws5/checkroot` (symlinks plus svelte-preprocess). Baseline: 33 errors, 1 in a WS5-area file (`subscribe-widget/subscribe/+server.ts`, WS6, `crypto` types). `npm run build` cannot run here.
- Benchmark subagent finished (Substack, beehiiv, Kit, Buttondown, Ghost, Litmus, Gmail sender rules, CAN-SPAM). Notes are in ws5-audit.md.
- Wrote ws5-audit.md and ws5-plan.md.

### Backend templates
- Originals copied to `ai-newsletter-translated/_deprecated/templates/pre-ws5/` (copies, the live files were rewritten in place).
- Rebuilt with a generator (`templates/_preview/build_templates.py`) so the layout is identical everywhere: nested presentation tables, 600px max, Outlook VML button, `color-scheme` meta plus `prefers-color-scheme` plus `[data-ogsc]` dark rules, hidden preheader with spacer, `lang`/`dir` from the subscriber language (RTL for ar, fa, ur, he and others), owner logo, brand color (text color picked by contrast), postal address, "Sent with AIBAN" link, built-in strings for several languages plus a `strings` override.
- Every value is escaped inside the template. This closes the code execution path in `GET /unsubscribe/:email` for these files (verified: the hostile samples do not execute).
- Every variable is read with a guard. This fixes the confirmation email that new subscribers never received (the new-user branch did not pass `origin`, the old template threw, the send was skipped).
- `bare.html` unchanged on purpose (needs pass 2 for image expressions).
- New: `newSubscriberOwner.html`, `ownerWeeklyReport.html` (STRATEGY.md asks for both).
- Preview harness: `templates/_preview/render.mjs` + `samples.mjs` (22 samples, including the exact contexts the backend passes today and hostile values). `node templates/_preview/render.mjs` passes 22/22 on the computer. Screenshots checked in light, dark, 375px, RTL.
- No TypeScript changed in the backend, so no deno check was needed for WS5.

### Frontend
- New `src/components/systems/widgets/Subscribe/SubscribeForm.svelte` (one form for the hosted page and the embed) and `subscribe.ts` (language detection, public endpoints, color contrast, postMessage).
- `/subscribe`: the 5-step wizard is replaced by the form. It now sends name and language (the old flow dropped both) to `POST {api}/public-subscribe`.
- `/subscribe-widget`: themeable (accent, theme, layout, logo, lang), own surface so it reads on any host page, reports height to the parent, hides site chrome via `body.aiban-embed` until WS1 skips it in the layout.
- New `src/routes/subscribe-widget/embed.js/+server.ts`: script-tag loader (about 2 KB, auto-resize, `aiban:subscribed` event). Created inside WS5's route folder; WS6 told in requests/6.md because of the `+server` rule.
- `/confirm-subscription`: one click, encoded params, restores `+` in addresses from old links, separate states for success, incomplete link, not found and server error with retry. The "accept the terms" checkbox is replaced by a consent line under the button.
- New `src/components/systems/widgets/EmbedCode/EmbedCode.svelte` for owners (link, script, iframe, options, live preview). Mount requested from WS4 and WS3.
- `src/lib/i18n/locales-subscribe/en.ts`: new sections, old keys kept. `subscribe-translations.ts`: `ts` deep-merge store, `setSubscribeLocale`, `fill`, `hasLocaleSection`.
- `MinimalSubscribe.svelte` is now a wrapper around the compact form.
- Moved to `_deprecated/` (unused after the change): `widgets/Subscribe/{Subscribe,WidgetSteps}.svelte`, `widgets/Subscribe/stages/*`, `steps/StepsTowardsSubscribe/**`, plus a copy of the old `MinimalSubscribe.svelte`. A partial build folder I created by mistake is in `_deprecated/docs/aiban/ws5-harness-partial-out/` (deleting is blocked; safe to delete).
- Component harness `docs/aiban/ws5-harness/` (compiles the components with the Svelte compiler alone, since vite cannot run here). Screenshots checked: empty and invalid submit (error after submit only), success, language picker, compact with a light brand color (dark text chosen), dark theme, embed code card, confirm success with a `+` address. Loader tested on a host page: iframe created, resized to the posted height, event fired.
- Type check (`$HOME/ws5/checkroot`): no errors or warnings in WS5 files. The only error in the WS5 area is the pre-existing `crypto` import in WS6's proxy.
- `/geo` only echoes Accept-Language, which the browser already gives us, so the form uses `navigator.languages` and an optional `?language=` param.

### Requests sent
- WS7 (requests/7.md): template engine pass 2 fix, confirmation context and link encoding, unsubscribe page context and RFC 8058 POST, public-config-info fields, `postalAddress` and two flags on Config, signed confirm token, .gitignore for preview output.
- WS8 (requests/8.md): List-Unsubscribe headers, welcome email sender, owner notification, weekly report, size budget.
- WS6 (requests/6.md): THE_PASS logged in plain text, proxy behavior, new embed route, getPublicConfig.
- WS4, WS3: mount EmbedCode; settings fields for mailing address and signature.
- WS1: skip header and language picker on /subscribe-widget.
- WS9: translate the new sections.

### Luis's answers (2026-10-30, later)
- No charge at signup; main domain aiban.news; signature engine wanted; AIBAN badge removable on paid plans; consent sentence kept.
- Built the signature engine: `widgets/EmailSignature/signature.ts` (data model, HTML builder, readers for the old 5-field shape) and `SignatureEditor.svelte` (WS1 primitives TextField, Textarea, Switch, Button). New `signature` strings in `locales-subscribe/en.ts`. Checked in the harness (empty, filled, centered layout in dark theme, click-to-edit focuses the right field, hiding a tag, 390px width).
- Templates: badge hidden only for `hidePoweredBy` plus a paid plan. Regenerated and committed; preview 22/22. Samples cover free plan (badge stays), paid plan (badge hidden) and a signature.
- Embed form: hides "Runs on AIBAN" when `/public-config-info` says `hidePoweredBy: true`.
- Updated the `bare.html` note in `templates/_preview/README.md` (WS8 request in requests/5.md).
- Requests: WS4 and WS3 (mount editor, badge setting, domain), WS2 (domain constants), WS6 (drop Tilopay step), WS7 (config fields, public-config-info flag, domain), WS8 (badge and signature rules), WS1 (record decisions).
- Type check: no errors or warnings in WS5 files.
