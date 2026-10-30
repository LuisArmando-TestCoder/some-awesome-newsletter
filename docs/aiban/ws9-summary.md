# WS9 summary: i18n propagation and copy audit

## What changed
- **All 36 non-English app locales are complete** in every namespace, translated from the current English (two passes, the second after the copy audit changed about 325 English strings). Placeholders match English everywhere, and no locale file has a dash or emoji.
- **Subscriber signup form:** fully translated in 101 of 190 locales (the 36 app locales plus 65 more, for example nl, pl, sv, uk, el, hu, ja, fa, ms, ml, yo, zu). The other 89 are rarely used or historic languages (Avestan, Volapük, Pali and so on). They show English for the new form strings, because the subscribe store merges English underneath.
- **Subscriber emails** have built-in strings in 26 more languages, plus aliases for the app's regional codes. Templates were regenerated and the preview harness renders 22 of 22. The unsubscribe and deleted-data pages now go right to left for every RTL language.
- **English copy audit across the app:** about 280 English strings fixed (Title Case, vague errors, developer text shown to users, old product names, "newspaper", "..." drama, self-answered questions, copy that still described sending from the owner's own address or paying in the app). About 100 hardcoded strings moved into i18n and wired up. Automation cards now use one full sentence per recipe instead of fragments glued with a hardcoded comma, which read badly in most languages. Backend API errors now say what went wrong and what to do next.
- **Checks you can run** (no network or extra dependencies needed): `npm run i18n:check`, `npm run copy:lint`, `npm run copy:lint:code`. Configuration is in `scripts/i18n-unused.json`.
- **Data problems fixed in existing translations:** sw had about 125 strings in Portuguese, pnb had 332 dashboard strings in the wrong script (Gurmukhi), tr had translated the plan names, and ta/te wrote "Google" in local script.

## Coverage per locale, before and after (percent of used keys)
Every app locale went from these numbers to 100 in all five namespaces: main 73.4, onboarding 35.4 (this figure includes the old step keys), dashboard 37 to 39, billing form 66.7, subscribe 7.4. es started at 73.9 in main. jp has no subscribe file; the app maps it to English there, and the 190-locale subscribe set has its own `ja` (now complete). Detail per locale is in `ws9-log.md` and from `node --experimental-strip-types --no-warnings scripts/i18n-check.mjs`.

## How to verify
1. `npm run i18n:check` exits 0. `npm run copy:lint` and `npm run copy:lint:code` print 0 findings.
2. On the Mac: `npm run check && npm run build`. The type check run here through a shadow project shows the same 23 errors as before WS9, none in files WS9 touched.
3. Switch the language picker to ar, pes or ur: the page turns right to left and the dashboard, onboarding and signup form are in that language. Try de and ja on the Automations section: each card reads as one sentence.
4. Backend: `node templates/_preview/render.mjs` prints 22/22.

## What is left
- **Native review.** Every translation was written by a model, not reviewed by a native speaker. The weakest are the varieties with little settled UI vocabulary: wuu (mostly standard Chinese with Wu words swapped in), apd, bho, pnb, jv, pcm, am, and the smaller subscribe-only languages. Review before sending large campaigns in these languages.
- **Owner requests:** retire unused English sections (requests/2.md, 3.md), translate `cronToNaturalLanguage` output (3.md), stop English activity titles in `src/lib/api` (6.md), and add the new languages to `WELCOME_BUILT_IN` (8.md; until then, welcome emails in those languages go through LLM translation).
- **RTL layout:** strings are right; the layout itself was not checked in a browser. Translators flagged values like `{email}` or `{host}` at the start of a sentence that may need `<bdi>`, `${price}` built in code (use `Intl.NumberFormat`), and glued fragments (`pagination.page` plus `of`, `naturalCronParser.*`).
- **Language codes:** the app uses `jp` for Japanese and keeps both `pes` and `fa`. Switching to standard codes (`ja`, `fa`) needs a small migration of the saved `lang` value.
- The 89 fallback-only subscribe locales still have only their old keys.

## Decisions for Luis
1. **Sending from the owner's own address.** Help, FAQ and landing now say owners never give AIBAN an email password. The dashboard still has the "send from my own address" app-password flow, and its strings, translated as written, describe it. Keep the feature (then the help text needs one exception sentence) or retire it.
2. **In-app payment.** `dash.billing.pay`, the `checkout*` keys, `switchBody`, `cancelBody` and the whole billing form namespace still describe paying in the app. No rendered screen uses them now. Delete or rewrite them once you decide whether checkout comes back.
3. **Numbers nobody could verify:** "35% off" yearly, the Free plan limits (1 source, 100 subscribers), the plan feature lists in `plans.featuresDelta`, and "pay-as-you-go", "volume discounts" and "1 to 2 business days" in `static/content/help-limits.json`. They were left as they were. Confirm or remove them.
4. **Legal pages.** The privacy policy (dated 2023) and terms text still describe billing in advance and model training, and the cookie table lists cookies the code does not set. They need a legal rewrite. Their page chrome is translated; their body text is English only.
5. **Canonical domain.** Copy, emails and the API use aiban.news, while `SITE_URL`, canonical tags, `robots.txt` and `seo.ts` use aibanewsletter.club.
6. **Unused public files.** `static/content/{plans,help-limits,auth}.json` are served publicly, but nothing reads them, and `plans.json` lists old prices. WS9 suggests moving them to `_deprecated/`. Not done, because external links could point at them.
7. **Test data.** The API playground uses a real celebrity name ("Robert Downey Jr.") as its example. Replace it with a made-up name.
