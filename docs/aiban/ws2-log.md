# WS2 log

## 2026-10-30 run 1
- 07:36 Connected folders were not mounted at start; requested access to both project folders again, granted.
- 07:40 Read CHARTER.md, COPY_RULES.md, diagnostic, requests/2.md (empty). STRATEGY.md, DESIGN_SYSTEM.md, tokens.scss absent.
- Decision: interpret the diagnostic's intro-animation finding as "the root route must be a real landing page"; the animation itself is in WS3's onboarding.
- Decision: CTA target `/signup` until WS3 ships `/start`.

## Blog slice (2026-10-30)
Created
- `src/components/articles/blog.ts`: SSR-safe helpers (API calls with timeout, NDJSON streaming search with URL-encoded query, card shape, plain text and excerpt, M/D/YYYY to ISO, URL builders, recent searches in localStorage wrapped in try/catch, max 5).
- `src/components/articles/{BlogShell,BlogArticleCard,BlogSearch,BlogPagination,LanguageTabs,SubscribeCta,BlogNotice}.svelte` (Svelte 5 runes, tokens only).
- `src/routes/blog/+page.svelte` (no owner in the URL: explains the link is incomplete).
- `src/routes/blog/[holder]/+page.ts` + `+page.svelte`: blog home.
- `src/routes/blog/[holder]/search/+page.ts` + `+page.svelte`: search results.
- `src/routes/blog/[holder]/[id]/+page.ts` + `+page.svelte`: article page with SEO tags and JSON-LD.
- en.ts: new top-level `"blog"` key (inserted before `"mainPage"`). Old `articles`/`article` keys kept.

Changed
- `src/routes/articles/+page.svelte`: now a forwarding page (`?holder` to `/blog/<holder>`, `?article` to the article page, `?search` to the results page).
- `src/routes/article/+page.svelte`: fetches the article, forwards to `/blog/<author>/<id>`, renders the article in place if the author is missing.
- `SearchBar`, `Pagination`: tokens, focus-visible, `role="search"`, nav landmark, aria-live page status, type="button". Public API unchanged (dashboard uses them). Removed the red border on an empty focused search.
- `ArticleCardSkeleton`: tokens, aria-hidden, reduced motion.
- `NewsCard`: tokens instead of hex/shadows, "Read more" sentence case, focus ring, reduced motion.
- `ArticleModal`: console logs removed, tokens, labelled close button, dialog role. No longer used by the blog.
- `FeaturedArticlesGrid`, `TextArticlesGrid` (still used by the dashboard Newspaper): keyboard support (role=button, Enter/Space), focus ring, tokens.

Moved
- old `src/routes/articles/+page.svelte` to `_deprecated/src/routes/articles/+page.svelte`
- old `src/routes/article/+page.svelte` to `_deprecated/src/routes/article/+page.svelte`

Decisions
- URL scheme: `/blog/<encodeURIComponent(email)>?ns=&lang=&page=`, `/blog/<email>/search?q=&ns=&lang=`, `/blog/<email>/<id>?ns=`. Legacy `newsSourceId` is also read as `ns`.
- Diagnostic z: the two lists (with and without images) are merged into one "Latest articles" grid sorted by date, with one pagination. Text-only cards are explained in one line when present. One featured article (newest with an image) on page 1.
- Pagination: "Older articles" shows when either list on the current page is full, because the API only returns the combined total. Can show one empty last page; that page says so and links back.
- Default language: the one with the most articles; tabs only when there is more than one.
- Hero: newsletterTitle only when `ns` is in the URL, else "Articles from <senderName>" or the part before "@" (the full email is never shown). senderName comes from public-config-info using `ns` or the newest article's newsSourceId. The backend fallbacks "Newsletter"/"Sender" are ignored.
- Subscribe CTA links to `/subscribe?configuratorId=<email>&newsSourceId=<ns or newest article's source>`.
- The article page shows "not found" when the article's author is not the blog owner in the URL.
- "Read more in other languages" links to the blog filtered by language (no translation link exists).
- SSR payload: the blog loader makes a size=1 request for languages, then one request for the active language only, and maps articles to slim cards, so the HTML does not carry every language's full content.
- JSON-LD is built from data and `<` is escaped; article HTML is rendered as before with `{@html}` (owner-generated content), no new injection points.

Checks
- `npm run build` and `npx svelte-kit sync` cannot run on this computer (rollup linux binary missing, no network). Type check ran from `$HOME/ws2check` (symlinks + svelte-preprocess + a local stub for the rollup native module, outside the project): 33 errors total, 0 in blog-slice files. Errors are in other areas (Header.svelte, LanguagePicker.svelte, Pricing.svelte, dashboard, login/signup/oauth, api/portal, subscribe-widget, etc.).

Requests filed: `requests/6.md` (new +page.ts loaders), `requests/7.md` (public-config-info without newsSourceId + description, sorted lists + split totals, languages endpoint), `requests/8.md` (groupId + ISO date on saved articles), `requests/10.md` (run the build on the Mac, smoke test list).

## Header and pages slice (2026-10-30)

Changed
- `src/lib/ui/organisms/Header.svelte`: rewritten. Default nav (How it works `/#how-it-works`, Pricing, Help, About) with active underline and `aria-current="page"` (hash links active only on `/` with a matching hash). Logged out: "Log in" (tertiary) and "Start free" (primary, `/signup`), both keep `logout(false)`. Logged in: "Open dashboard". Renders nothing on `/blog`, `/articles`, `/article`, `/subscribe`, `/subscribe-widget`, `/confirm-subscription` (and their subpaths). Mobile drawer is a real dialog (role, aria-modal, labelled title, Escape, focus moved in and back to the toggle, Tab trapped, previous body overflow restored, closes on route change). Hamburger has aria-expanded/aria-controls and a changing label. Hide-on-scroll stays but never hides while focus is inside the header or the drawer is open. Tokens only, reduced motion respected. `links` prop kept (empty store means defaults). Removed the plans store subscription the header never used.
- `LanguagePicker.svelte`: logic kept. Trigger labelled "Language: <name>", aria-expanded/controls, Escape, arrow keys, outside click closes, focus returns to trigger. Flag emojis removed (copy rules, and flags are countries). Compact pill, safe-area offset, z-index lowered under the header drawer. Cast added on `t2.set` so the English fallback type checks.
- `Faq.svelte`: accessible accordion (button + aria-expanded/controls + region). Props `items`, `title`, `headingLevel`, `searchable`, `idPrefix`; with no props it shows the locale `faq` list as before. No JSON-LD.
- `HelpFaqs.svelte`: now the grouped help center list: search with live result count, topic chips, anchor per question (opens on `#id` and on hashchange), copy link. Old flat `faqs` prop still works.
- `HelpForm.svelte`: same zod schema. `user` may be null; the mock user is not used to prefill. On valid submit it opens a prefilled email to info@aiban.news (before it only did `console.log`, so requests went nowhere) and shows a status with a fallback link. Native labelled inputs, errors with next action after submit, tokens.
- `Pricing.svelte`: fetch/Tilopay logic and prices unchanged. Switch replaced by a two-button segmented control (aria-pressed, group label). Badge is text tied to the card via aria-describedby. `alert()` replaced by an inline `role="alert"` message. New props `showHeader`, `headingLevel` (default h2, so the landing no longer gets a second h1). Fixed the `PlanId` type error.
- `src/components/faq.ts`: invented list removed; now a derived store of the locale `faq` plus `faqSlug`.
- `src/components/X/*`: aria-label prop, focus-visible ring, reduced motion. Behavior unchanged.
- `src/components/Header/Header.svelte` (test-checklist only): fixed the `bind:isChecked` type error by reading the mobile menu store.
- Routes rewritten with `<svelte:head>` (title, description, canonical, og, twitter): `/about`, `/careers`, `/help`, `/demo`, `/pricing`, `/legal/{privacy,terms,cookies}`.
- New: `src/routes/legal/+layout.svelte` (shared legal styles + legal doc nav), `src/components/demo/VideoFacade.svelte` (click-to-play youtube-nocookie embed).
- `en.ts`: new keys `nav`, `about`, `careers`, `demoPage`, `helpCenter`; new subkeys in `pricing`; English values updated in `header`, `pricing`, `help`, `faq`. Checked that `mainContent`, `articles`, `publishToWebsite` still exist.

Moved to `_deprecated/`
- `src/components/demo/{HeroBanner,LetterByLetter,VideoBanner,CTAButton}.svelte`, `src/routes/demo/VideoBanner.svelte` (letter by letter animation retired).
- Copies of the previous versions (not moves): `_deprecated/src/routes/{about,careers,demo}/+page.svelte`, `_deprecated/src/routes/legal/*/+page.svelte`, `_deprecated/src/lib/ui/organisms/Pricing.before-ws2.svelte`.

Removed because it was invented or unverifiable
- `faq.ts`: 14-day Pro trial, SOC 2 Type II, 24/7 support, phone and Slack support, API and webhooks for any tool.
- Careers: three open roles (AI Systems Engineer, Automation Architect, Growth & Leverage Lead), values list, "world's most advanced" claim. The page now says there are no open roles.
- About: "job-trapped founders", "The AIBAN Method" (Go and Python, days), "Engagement AI flagship IRP system", VFX Trigger card. Kept: founder name, background, GitHub, the three real repos, info@aiban.news.
- Header drawer: creator card ("Engineering Lead", "GitHub Ecosystem"), "Architecture"/"Access" labels, "2026-v1 Active" status dot.
- Help: the plan/usage card was mock data from the server load, so it is no longer shown; "Mock Mode Enabled" banner removed.
- `help` copy: "We unlock larger quotas immediately after approval", "flat-rate or pay-as-you-go".

Decisions
- Demo video: the YouTube id `zPOFU2QY_HA` already embedded in HeroBanner is kept, loaded only on click.
- Help center answers only describe things visible in the code (source URL, schedule, personality, sender email/name/signature, app password, manual and file import, widget with language choice, webhook to WordPress/REST, blog pages, monthly/yearly with 35% off, cancel from dashboard, free plan 1 source and 100 subscribers).
- Legal: wording cleaned only (sentence case headings, "Last updated", inline bold labels, "premium tiers" to "paid plans", "enhance" to "improve", "Online Sections" to "website", http to https links). Cookie contact `legal@aiban.com` changed to `info@aiban.news`, the address used everywhere else, treated as a typo.
- Drawer "Sign out" now calls `logout()` with redirect; before it cleared storage but left the page looking signed in.
- Header still renders on `/dashboard*` as before (unchanged as instructed).

Decisions for Luis
- Plans data disagrees in three places: `en.ts` `plans` (Starter/Growth/Pro/Master, used by Pricing), `static/content/plans.json` (Free/Monthly/Yearly with real Polar product ids) and `PLAN_DEFINITIONS`. Terms of service name Starter/Growth/Pro/Master. Pick one; nothing was changed.
- Careers: if any of the removed roles were real, add them back with real details.
- Privacy policy date is October 24, 2023, older than the terms (January 6, 2026). Please review.

Checks
- svelte-check from `$HOME/ws2check`: 0 errors in this slice's files (30 errors app-wide in other areas). Only unused CSS warnings from the shared page styles.
- `npm run build` cannot run on this computer (rollup linux arm64 binary missing, npm registry and CDNs blocked from both shells). Needs a run on the Mac (WS10).

Requests filed: `requests/6.md`, `requests/9.md`, `requests/10.md`.

## Landing slice (lead)
- Read STRATEGY.md and DESIGN_SYSTEM.md (landed during the run). Followed: Lora headlines, Inter UI, pine accent, 68ch measure, Automations wording, service-business audience.
- Created `src/lib/content/seo.ts` (canonical, jsonLd with "<" escaping, Organization data, public route list), `src/lib/content/landingSample.ts` (URL normalizer, sample issue in en/es/de, `PENDING_SITE_KEY`), `src/lib/content/landing/IssuePreview.svelte` (email mock with accessible language tabs).
- Rewrote `src/routes/+page.svelte` (old version kept at `_deprecated/src/routes/+page.svelte`). Sections: hero with website field and live sample preview, "One input, then it runs by itself" trigger and steps (id `how-it-works`), languages, sender, signup form and blog, use cases, pricing (existing organism, `showHeader={false}`), FAQ with FAQPage JSON-LD, final CTA, footer. No GSAP, no shaders, no entrance animation. Validation runs on submit only.
- en.ts: added top-level `landing` key. `mainContent` is no longer used by the landing; kept for WS9 (it still contains the invented copy in other locales, unused). Fixed sentence case in `auth` strings per WS3's request (Continue with email, Sign up, Log in).
- CTA target: WS3 shipped `/start`; landing goes to `/start?url=<encoded>`, also writes `localStorage["aiban.pendingWebsite"]`. Header, about and demo "Start free" now go to `/start`.
- Created `src/routes/sitemap.xml/+server.ts` (prerendered) and rewrote `static/robots.txt`. Both are outside the WS2 table but inside the WS2 SEO scope; notice in requests/6.md.
- Requests sent: 3.md (prefill, superseded by /start), 6.md (notice), 7.md (public preview endpoint, public blog list for sitemap), 10.md (build on the Mac, smoke test, scratch archive).
- Verification: svelte-check from `$HOME/ws2check` reports 0 errors and 0 warnings in landing files, 0 errors in all WS2 files (31 errors elsewhere). `npm run build` could not run: the Linux shell has macOS rollup binaries, and the cloud workspace could not resolve registry.npmjs.org this run. Scratch archive left at `_deprecated/ws2-buildcheck/fe.tgz` (delete is blocked).
- Copy check: grep for em/en dashes and banned words over all WS2 files and the WS2 keys in en.ts: no hits.

## Requests from requests/2.md handled (end of run 1)
- WS3 1: landing, header, about and demo CTAs go to `/start` (landing adds `?url=`). WS3 2: auth strings fixed to sentence case.
- WS6 3: HelpForm posts to `/api/support` first; on 501, any other failure or a network error it keeps the email fallback. Button shows "Sending..." while waiting.
- WS6 4: Pricing uses `startSubscription(planId, interval)` and redirects to the returned URL. Signed-out visitors go to `/start?plan=<id>&interval=<monthly|yearly>` first (WS3 may read these). Errors show `userMessage`.
- WS6 5: every `{@html}` with article content or titles in the blog article page, the `/article` fallback page, both article grids and ArticleModal is wrapped in `sanitizeHtml()`.
- WS6 6: noted, no change needed.
- Fixed a type error in `LanguagePicker.svelte` caused by locale shape drift (casts to the English shape for t3, tSubscribe, tBillingForm, as t2 already had).
- Final svelte-check: 29 errors in the app, 0 in WS2 files.
