# WS10-E: UX, design system, dark mode, mobile, accessibility, motion, RTL

Run: 2026-10-30, about 09:10 to 09:50 UTC. Report only; no project file was edited except this one.
Method: source review of `src/` (the dev server and `vite build` cannot run here). "Live" means reachable by imports from a route file (683 of 759 source files). Scripts and raw output: `$HOME/ws10e/` in the computer VM (outside the project). Rendered checks in the cloud workspace with Playwright and Chromium: the WS5 harness (`docs/aiban/ws5-harness/harness-out.tgz`, built 08:37) and four backend email previews (`templates/_preview/out/*.html`), each at 1280 px and 375 px, light and dark. One CSS behaviour was confirmed in Chromium with a minimal page (see B1).

## Release blockers (fix before launch)

| # | Problem | Evidence | Fix | Owner |
|---|---|---|---|---|
| B1 | **Keyboard focus is invisible on about 45 elements across onboarding, sign-in, the public site, the blog and the tutorial.** `--focus-ring` is a box-shadow list (`0 0 0 2px var(--surface-0), 0 0 0 4px var(--accent)`), but these rules use it as a color: `outline: 2px solid var(--focus-ring, #...)` or `box-shadow: 0 0 0 3px var(--focus-ring, ...)`. Because the token is defined, the fallback never applies, the value is invalid at computed time, and the outline becomes `none`. These rules also beat the global `:focus-visible` rule in tokens.scss, so nothing shows. Checked in Chromium: computed `outline-style: none`, `box-shadow: none`. Fails WCAG 2.4.7. | Onboarding: `NewFlow/OnboardingShell.svelte:173,239,276` (every Continue, Skip, Back button and every input of the 9 steps), `NewFlow/Step01_Frequency.svelte:165,192`. Sign-in: `lib/ui/organisms/AuthForm.svelte:358,409,459,507,614`. Tutorial: `lib/tutorial/GuidedTour.svelte:280,341`, `HelpCard.svelte:264`, `GettingStartedChecklist.svelte:146`, `EmptyStateGuide.svelte:137`. Public site: `lib/ui/organisms/Header.svelte:461`, `LanguagePicker.svelte:264`, `Faq.svelte:168`, `HelpFaqs.svelte:193,318`, `HelpForm.svelte:259,308`, `Pricing.svelte:444`, `routes/{about:171,213; pricing:113; help:145; demo:158; careers:135; legal/+layout:117}`, `components/demo/VideoFacade.svelte:72`, `components/X/X.scss:15`. Blog: `components/articles/{BlogShell:124, BlogArticleCard:137, FeaturedArticlesGrid:193, TextArticlesGrid:170}`, `SearchBar.svelte:128`, `Pagination.svelte:82`, `NewsCard.svelte:118`, `ArticleModal.svelte:110`. Admin: `routes/admin/+page.svelte:446`. | Replace `outline: 2px solid var(--focus-ring, X)` with `outline: 2px solid var(--focus-color); outline-offset: 2px;` and `box-shadow: 0 0 0 3px var(--focus-ring, X)` with `box-shadow: var(--focus-ring);`. One sed across `src/` does it: `sed -i -E 's/outline: ?([0-9]px) solid var\(--focus-ring[^)]*\)/outline: \1 solid var(--focus-color)/; s/box-shadow: 0 0 0 [0-9]px var\(--focus-ring[^)]*\)\)?/box-shadow: var(--focus-ring)/'` then review the diff. Optionally WS1 adds a `--focus-outline` token so the mistake cannot recur. | WS10 may apply (breakage fix across owners); otherwise WS3 (onboarding, AuthForm, tutorial), WS2 (public, blog), WS1 (X.scss) |
| B2 | **The floating language picker covers the dashboard's mobile bottom bar.** `LanguagePicker` is mounted on every page by the root layout, `position: fixed; bottom: 12px; right: 12px; z-index: 900`. The bottom bar is `position: fixed; bottom: 0; z-index: var(--z-drawer)` (80). On a phone the pill sits on top of the "More" item, which holds Blog, Sources, Settings, Display settings, Help and Sign out. Also covers the bottom-right toast close button at 375 px. | `src/routes/+layout.svelte:31-33`, `src/lib/ui/organisms/LanguagePicker.svelte:184-188,269-273`, `src/lib/dashboard/MobileNav.svelte:87-94` | Do not mount `LanguagePicker` when `dashboardMode` is true (or under 768 px on `/dashboard`), and move the language choice into the "More" sheet and Settings. Simplest: in the root layout `{#if !embed && !$dashboardMode}<LanguagePicker />{/if}`. | WS1 (root layout) with WS4 (add language to More sheet) |
| B3 | **The page language and direction never change.** `app.html` hard-codes `<html lang="en">` and nothing sets `lang` or `dir` when the UI language changes. Screen readers read Spanish, German, Hindi and the other 34 UI locales with English pronunciation (WCAG 3.1.1). The UI ships Arabic (`ar`, `arz`, `apc`, `apd`), Persian (`pes`), Urdu (`ur`) and Punjabi Shahmukhi (`pnb`) locales, but the dashboard, onboarding and public pages always render left to right. Only the subscribe form (`SubscribeForm.svelte:85,254`) and the emails set `dir`. | `src/app.html:2`, `src/lib/ui/organisms/LanguagePicker.svelte:72-125` (setLanguage), `src/hooks.server.ts` (no `transformPageChunk`) | In `setLanguage` set `document.documentElement.lang = code` and `.dir = isRtl(code) ? 'rtl' : 'ltr'` (reuse `isRtl` from `widgets/Subscribe/subscribe.ts`, or move it to `$lib/i18n`). Add the same two attributes to the pre-paint script in `app.html` from `localStorage.lang`. Later, set them server side with `transformPageChunk` once the language is known on the server. | WS1 (app.html, LanguagePicker is WS2) with WS9 |

## High priority (fix in the first week)

| # | Problem | Evidence | Fix | Owner |
|---|---|---|---|---|
| H1 | Marketing header shows above the dashboard sidebar. On desktop there are two navigations; on a phone the marketing hamburger sits above the dashboard bottom bar. WS4's request is still open. | `src/lib/ui/organisms/Header.svelte:17-24,59` (hide list has no `/dashboard`), `docs/aiban/requests/2.md` WS4 item 1 | Hide the header when `$dashboardMode` is true (keep it during onboarding). | WS2 |
| H2 | Settings > Integrations is unreadable in dark mode. `Secrets.svelte` has 70 raw colors and 28 hard-coded font sizes; the section title is `#111` on the dark page (about 1.1:1), hints `#666`, `#888`, `#aaa`, cards `#fff`. | `src/components/systems/inputs/Secrets/Secrets.svelte:381-431` and on; mounted by `src/lib/dashboard/settings/IntegrationsTab.svelte:5,11` | Move to tokens (`--text-1/2/3`, `--surface-1`, `--border-1`, `--accent-soft`), or rebuild the tab with WS1 primitives. | WS1 (owner of systems/inputs), WS4 to rebuild the tab if preferred |
| H3 | Login code boxes are light only. `Code.svelte` defines its own `--otp-*` colors (`#ffffff` background, `#1e293b` text, `#e2e8f0` border). In dark mode the first screen after "Start free" shows white boxes on a dark card. | `src/components/systems/inputs/Code/Code.svelte:174-260` | Map `--otp-bg` to `--surface-1`, text to `--text-1`, border to `--border-2`, focus to `--focus-ring`. | WS1 |
| H4 | Three separate button systems, and the WS1 primitives are not used outside the dashboard. Live raw `<button>` vs `Button/SubmitButton/IconButton`: onboarding 26 vs 0, landing 15 vs 0, subscribe 9 vs 0, blog 7 vs 0, dashboard 12 vs 72. Local classes: `ob-btn--primary/secondary/tertiary`, landing `btn btn--primary`, `sf__button`, `confirm__button`, `help-form__button`, `btn-primary`/`primary-btn`/`secondary-btn` in Secrets, `copy-btn`, `download-button`. They mostly use the right tokens, so the look is close, but sizes, radius and disabled states differ, and every copy had the focus bug from B1. Diagnostic item g is only partly met. | Counts from `$HOME/ws10e/` scan; `OnboardingShell.svelte:261-290`, `routes/+page.svelte:147,161,336`, `widgets/Subscribe/SubscribeForm.svelte`, `routes/confirm-subscription/+page.svelte` | After launch, swap the local classes for `Button` (onboarding and landing first). Short term, make each local primary match `Button` primary (height `--control-h`, `--radius-md`, `--fw-semibold`, `--fs-sm`). | WS3, WS2, WS5 |
| H5 | Global stylesheets leak from the dashboard and sign-in into every page after a client-side visit. `routes/dashboard/+page.svelte` does `@use "../styles/everything.scss"`, which injects `:global(h1) { font-size: 2rem }`, `::-webkit-scrollbar { width: 5px; height: 0 }` (hides every horizontal scrollbar, including the subscriber table and embed code blocks), `html { scroll-behavior: smooth }` and a color transition on every `span` and `section`. `AuthForm.svelte:288`, `MenuHalf.svelte:94` and `HelpContextCard.svelte:18` pull `src/styles/global.scss` again. Pages can look different depending on which page you saw first. WS1 asked for this in requests/2,3,4. | `src/routes/dashboard/+page.svelte` style block, `src/routes/styles/global.scss:34-37,61-63,69-70`, `src/routes/styles/reset.scss:16-18` | Delete the `@use` lines; the root layout already imports tokens. If something depends on them, move that rule into the component. | WS4 (dashboard page), WS3 (AuthForm), WS2 (MenuHalf) |
| H6 | Signature: three implementations. Onboarding step 8 builds one (`NewFlow/Step05_EmailSignature.svelte`), Settings builds another (`lib/dashboard/settings/emailHtml.ts` buildSignature), and WS5's full editor that Luis chose (`widgets/EmailSignature/SignatureEditor.svelte`) is not mounted anywhere. Owners can get a different signature depending on where they edited it. | `grep EmailSignature/` finds no importer | Mount `SignatureEditor` in Settings > Sending and have onboarding write the same field shape. | WS4, WS3 |

## Medium and low

- M1. Legacy H_Dashboard screens still render in one edge case: a signed-in owner whose `stepsIndex` is past setup but who has no source (for example after removing the last one) gets `MainSteps` slots 9 to 16 (`MainSteps.svelte:52-59`) with accordions, "Auto collapse is" (`SlotAutoCollapseToggle.svelte:81`), italics (`Dashboard.scss:5`, `Users.svelte:149`, `Reports.svelte:82`), 21 undefined variables and 22 raw colors. Fix: when there is no source, send the owner to onboarding step 1 or to Sources with the add form; then retire the legacy files as WS4 planned. Owner WS3 and WS4.
- M2. Stale copy in Settings > Sending: "While this is off, issues are sent from AIBAN's email address ... Turn this on to send from your own address." The switch was removed. `locales-dashboard/en.ts` key `dash.settings.sending.defaultExplain`, rendered at `lib/dashboard/settings/SendingTab.svelte:120`. Rewrite as a plain statement. Owner WS4, then WS9.
- M3. Public pages have no theme control (WS1 request in `requests/2.md` item 3, `<SettingsMenu compact />` in the header). Owner WS2.
- M4. `src/styles/legal.scss:116-121` switches to dark with `prefers-color-scheme` only, ignoring the chosen theme, and in dark theme it inverts (light page). It is not imported by any live file today; delete or fix before anyone imports it. Owner WS1.
- M5. Topic picker shown when an owner has no website (onboarding step 1) uses Facebook colors (`#1877f2`, `#e4e6eb`, `#ffffff`) and 14 px fonts. `selectors/Tags/TagNode.svelte:42-63`, `CollapsibleTagNode.svelte`, `Tags.svelte`. Move to tokens. Owner WS1.
- M6. `--text-3` on `--surface-3` is 4.28:1 in light and 3.91:1 in dark, and on dark `--surface-2` 4.46:1. Hints placed on raised or hover surfaces miss AA. Darken `--_ink-3` slightly or avoid `--text-3` on surface-2/3. Owner WS1.
- M7. Error text not linked to its field with `aria-describedby` (role=alert still announces it): Settings brand color `BrandTab.svelte:134`, Send panel content `subscribers/SendPanel.svelte:126`. Owner WS4.
- M8. `MenuHalfTrigger.svelte:10` is a clickable `div` around a checkbox used as a menu button (works by bubbling, wrong semantics), fixed at top right under 1024 px during onboarding, where the site header's own menu button also sits. Replace with a `button` with `aria-expanded`, or drop MenuHalf during onboarding. Owner WS2.
- M9. Under reduced motion, the global rule in `tokens.scss:248-279` targets `:root *`, so the `html { scroll-behavior: smooth }` from `routes/styles/global.scss:61-63` still applies. The pre-paint script in `app.html` applies theme and density but not `data-motion`, so a saved "Reduce motion" choice applies a moment late. Owner WS1.
- M10. Two Svelte transitions are not gated: `inputs/Personality/Personality.svelte:60` (legacy source form only) and `wrappers/InteractiveSlides/InteractiveSlides.svelte:53` (dev page only). Svelte transitions run through the Web Animations API, which the CSS reduced-motion rule does not stop. Low.
- M11. Old blog cards `FeaturedArticlesGrid.svelte:60-79` and `TextArticlesGrid.svelte:55-79` are `div role="button" tabindex="0"` with no key handler. Only the legacy `Newspaper.svelte` uses them. Low, retire with M1.
- M12. `/articles` and `/article` forward with a client-side `goto` after load (`routes/articles/+page.svelte:13-29`). Search engines see an empty page; a server redirect (301) in `+page.ts` or `+page.server.ts` would keep link value. Owner WS6.
- M13. Emails: the weekly owner report footer says "© 2026 Oriens Studio" (`ownerWeeklyReport.html`); confirm that is the intended legal name next to the AIBAN brand. At 375 px the three stat tiles are tight but fit. Owner WS5.
- M14. The embed options selects truncate at 375 px ("Match the visito", "Full (title, name"), `widgets/EmbedCode/EmbedCode.svelte`. Stack label above control on narrow screens. Owner WS5.

## 1. UX diagnostic (how well studio, August 2025), item by item

Status: fixed, partly, not fixed, cannot verify (needs a browser or user testing).

| Item | What it asked | Status | Evidence | Remaining work, owner |
|---|---|---|---|---|
| a | Real landing page; product explained before any flow; no disappearing intro | Fixed | `src/routes/+page.svelte:122-161`: static hero with eyebrow, h1, lead, website form, live sample issue; flow starts only on "Start free" (`/start`) | None |
| b | Navigation buttons only on process steps; skip intro | Fixed | No intro anymore. `components/systems/steps/Steps.svelte:33`: global arrows only after setup; each onboarding step has Back, Skip, Continue inside its card (`OnboardingShell.svelte:82-93`) | None |
| c | No per-word text animation on functional steps | Fixed | `texts/MarkdownText/MarkdownText.svelte` renders static text (fade of the whole block only); no SplitText, typewriter or word stagger in any live file; landing does not load `$lib/anim` | None |
| d | Do not flag a URL as invalid while typing; clear CTA; validate on submit | Fixed | Onboarding `NewFlow/Step06_NewsWebsite.svelte:67-84,128-155` (error only on submit, `aria-invalid`, `aria-describedby`, role=alert); landing `+page.svelte:51,131`; `inputs/Link` adds https on blur; dashboard `sources/AddSourceForm.svelte:95-109` | None |
| e, e.1 to e.4 | Same style for same kind of text; no italics in instructions; input text larger and darker than hint | Fixed | Onboarding: input `--fs-lg` `--text-1`, hint `--fs-xs` `--text-3`, placeholder `--fs-md` `--text-3` (`OnboardingShell.svelte:207-233`); dashboard `ui/Field.svelte:22-42`; WS1 `TextField`. No italic in live new screens | Legacy screens only (M1) |
| f | Highlight with weight, not color changes inside a sentence | Fixed | MarkdownText shows `**`, `==`, `*` as weight (`MarkdownText.svelte:168` `font-style: normal`); no colored inline emphasis or gradient text found in live files | None |
| g | Standard CTA hierarchy (primary, secondary, tertiary) everywhere | Partly | Hierarchy exists in every area, but as separate local styles (H4) | Converge on WS1 `Button`: WS3, WS2, WS5 |
| h | Show the active section; full, understandable menu words; test "new sources" | Fixed in code, user test not done | `lib/dashboard/NavLink.svelte:23`, `MobileNav.svelte:51,72` (`aria-current="page"` plus visual state); labels Home, Automations, Sources, Subscribers, Reports, Blog, Settings (`locales-dashboard/en.ts:461-479`) | Run 5 short user tests on "Sources" and "Automations" (Luis) |
| i | Dark mode control needs a text label | Fixed in dashboard | `lib/ui/molecules/SettingsMenu.svelte` "Display" with Theme, Density, Reduce motion, in `Sidebar.svelte:71` and `MobileNav.svelte:81` | Public pages have no control (M3, WS2) |
| j | Drop or regroup "auto collapse" | Fixed | Not in the new shell; only in legacy `SlotAutoCollapseToggle.svelte` (M1) | Retire legacy (WS4) |
| k | No accordions for configuration; use tabs or submenu | Fixed | `lib/dashboard/sections/Settings.svelte:1` five tabs; `Subscribers.svelte:37`, `Reports.svelte:43` tabs; sources open a detail page. Only remaining `details` are "How we find your articles" in `Step08_Generate.svelte:138` (appropriate) and legacy `BulkAddUserSection.svelte:137` | None |
| l | Only options with a clear purpose | Fixed | Auto collapse gone; Advanced on a source holds only link selector and raw schedule (`sources/SourceDetail.svelte:267-290`) | None |
| m | Consistent text types across the dashboard | Fixed in new shell | One `Field`, `Card`, `SectionHeader` set in `lib/dashboard/ui/`; new shell has 0 raw colors and 0 undefined tokens | Dashboard keeps its own Card, Field, Tabs, Skeleton, StatTile next to WS1's; merge later (WS4, WS1) |
| n | Image upload: size, ratio, format, weight, where it appears; consistent CTA | Fixed | `lib/dashboard/settings/LogoUpload.svelte` with `dash.settings.logo.spec*` strings (format, 2 MB, 200 px min, 44 px tall up to 220 wide, top of every issue and blog, what happens if empty) and type, size, width checks | None |
| o | Replace "Signature HTML"; show the signature in context | Partly | Settings: fields-based builder with an inbox preview (`SendingTab.svelte`, `emailHtml.ts`); onboarding step 8 inside a realistic email. "Signature HTML" text gone | Three implementations; WS5 editor not mounted (H6) |
| p | Consistent placeholder and value position; say the default for optional fields | Fixed | Label above, input below, hint below in all new forms; every optional hint says what happens if empty ("Leave it empty and ...", `locales-dashboard/en.ts:851-890,1062-1068`) | Stale "turn this on" copy (M2) |
| q | Section name style ("Add news sources" is a CTA); explain what a source is and why add more | Fixed | Section "Sources" with `SourcesIntro.svelte` (`dash.sources.intro.*` what, why, own settings, how it changes your newsletter) and a separate Add button | User test (Luis) |
| r | Main source details do not fit Config; reconsider granularity | Fixed | Each source is a card and opens `SourceDetail.svelte`; two-URL selector detail moved to Advanced | None |
| s | Plain terms ("Your ideal client" not "Buyer persona") and say why | Fixed | "Your ideal reader" with purpose in the hint (`en.ts:1064-1066`); no "buyer persona" in live code | None |
| t | Make per-source settings obvious; voice and frequency are not "advanced" | Fixed | Intro says each source has its own settings; voice and reader in "Basic" card, schedule in its own card; Advanced holds selector and cron only | None |
| u | Show dependent fields only when needed | Fixed | Sender email and app password are gone from onboarding and Settings; Settings shows only sender name and an explanation | M2 copy |
| v | Separate subscriber list from charts with tabs | Fixed | `sections/Subscribers.svelte` (list, add or import, signup form, send) and `sections/Reports.svelte` are separate sections with tabs | None |
| v.1 | No content movement caused by a neighbor | Fixed in code | Sections are pages, no accordions, `{#key}` swap (`DashboardShell.svelte`) | Check in a browser |
| w | Apply c to g to the subscriber flow | Fixed | `widgets/Subscribe/SubscribeForm.svelte`: `novalidate`, error after submit, `aria-invalid`, `aria-describedby`, role=alert, no italics, one primary button. Rendered in light and dark at 375 and 1280 px: clean, no overflow | Local button style (H4) |
| x | Blog hero says name, purpose, topic; owner control over look | Mostly fixed | `routes/blog/[holder]/+page.svelte:24-25,64-70` hero with eyebrow and newsletter name; Settings > Brand (logo, color, name) applies to the blog | No owner-written blog description field yet (WS4, WS7) |
| x.1 | Working search with suggestions, recent searches, a button, a results page | Fixed | `components/articles/BlogSearch.svelte:35-114` (suggestions with 250 ms debounce, recent searches, combobox), `routes/blog/[holder]/search/+page.svelte` | Check in a browser |
| y | Article hierarchy; articles on their own page, not a pop-up | Fixed | Featured plus latest in the blog page; SSR article page `routes/blog/[holder]/[id]/+page.svelte`; ArticleModal only in legacy Newspaper | None |
| y.1 | Pop-up unsuitable for long reading | Fixed | As above | None |
| z | Unclear difference between two article groups, two paginations | Fixed | One pagination `BlogPagination` (`routes/blog/[holder]/+page.svelte:120`) | None |
| General 1 | Landing page needed | Fixed | See a | None |
| General 2 | Navigation and structure explain the service | Partly | Clear IA in dashboard; landing explains trigger and steps. Double header on dashboard (H1) | WS2 |
| General 3 | User interviews and tests | Not fixed | No evidence of tests | Luis: 5 to 8 sessions with BNI owners on onboarding and Sources |
| General 4 | Color composition hurts legibility and accessibility | Mostly fixed | Broadsheet tokens, AA pairs checked (see M6 exceptions). Focus visibility broken in many places (B1) | B1, M6 |
| General 5 | Flows need clear logic (sources) | Fixed in code | Sources intro and per-source detail; Automations as sentences | User test |
| General 6 | Sidebar navigation instead of collapsible menus | Fixed | `lib/ui/organisms/Sidebar.svelte` plus mobile bottom bar | B2, H1 |

## 2. Design system consistency (live files only)

Counts by area. "Raw colors" are hex, rgb() or hsl() in component styles outside a `var()` fallback. "Fallback colors" are hex values only used as `var(--token, #hex)` fallbacks: harmless while tokens.scss loads, but they are wrong-theme colors and should go. "Font sizes" are `font-size` values that are not tokens. "Undefined" are `var(--x)` with no fallback where `--x` is defined nowhere in `src/`.

| Area | Files | Raw colors | Fallback colors | Non-token font sizes (of which px) | Ad hoc shadows | Undefined vars |
|---|---:|---:|---:|---:|---:|---:|
| Landing and public pages | 23 | 2 | 328 | 1 (0) | 13 | 1 |
| Onboarding, auth, tutorial | 29 | 8 | 171 | 1 (0) | 8 | 0 |
| Dashboard, new shell (`lib/dashboard`, `routes/dashboard`, Sidebar) | 52 | 0 | 2 | 0 | 1 | 0 |
| Dashboard, legacy `H_Dashboard` (edge case only, M1) | 20 | 22 | 57 | about 40 | 2 | 21 |
| Subscribe, confirm, widget | 5 | 0 | 0 | 0 | 0 | 0 |
| Blog | 18 | 0 | 126 | 1 (0) | 2 | 0 |
| Shared components (`systems/*`, `lib/ui`, Modal, etc.) | 64 | 118 | 13 | 41 (5) | 11 | 5 |
| Other (`components/common`, `X`, `ShaderToy`) | 9 | 12 | 0 | 4 (2) | 2 | 3 |

Worst live files:
1. `components/systems/inputs/Secrets/Secrets.svelte`: 70 raw colors, 28 font sizes, 14 raw buttons (H2).
2. `components/systems/inputs/Code/Code.svelte`: 11 raw colors, 4 ad hoc shadows (H3).
3. `components/systems/selectors/Tags/TagNode.svelte` (13), `CollapsibleTagNode.svelte` (12), `Tags.svelte` (9): raw colors and px fonts (M5).
4. `H_Dashboard/NewsSource/UpdateNewsSourceForm.svelte`: 10 raw colors, 3 undefined (`--color-background`, `--color-x-gradient`, `--color-x-gradient-inversion`).
5. `components/common/CodeFormatter.svelte` (8) and `CopyUrlWithQR.svelte` (4 raw, 3 undefined `--color-background*`, plus `alert()` at line 40). CopyUrlWithQR is live in Settings > Developer.
6. `H_Dashboard/Users/Users.scss` and `Reports/Reports.scss`: undefined `--color-background-opaque(-inversion)`, `--shadow-soft`, `--shadow-extra-soft`, `--radius-tiny`, `--font-size-s`.
7. `components/systems/selectors/Card/Card.svelte`: undefined `--color-background`, `--color-x-gradient-opaque`, 3 ad hoc shadows, 500 ms staggered reveal (legacy only).
8. `components/systems/stats/LeadStat.svelte`: undefined `--radius-l`, `--color-background-opaque-inversion`.

Undefined tokens in live files (all legacy names WS1 did not alias): `--color-background` (7 uses), `--color-background-opaque-inversion` (5), `--color-background-opaque`, `--shadow-soft`, `--shadow-extra-soft`, `--radius-tiny`, `--radius-l`, `--font-size-s` (2 each), `--color-background-inversion`, `--color-background-secondary`, `--color-background-inversion-opaque`, `--color-x-gradient`, `--color-x-gradient-inversion`, `--color-x-gradient-opaque` (1 each). Quick fix: WS1 adds aliases in tokens.scss (`--color-background: var(--surface-0)`, `--color-background-opaque: var(--surface-2)`, `--radius-l: var(--radius-lg)`, `--radius-tiny: var(--radius-sm)`, `--shadow-soft: var(--shadow-1)`, `--shadow-extra-soft: var(--shadow-1)`, `--font-size-s: var(--fs-sm)`, and so on).

Buttons: see H4. Italics in instructions: none in new screens; 7 in legacy H_Dashboard (M1). Per-word text animation: none.

## 3. Dark mode

- Tokens: complete. `tokens.scss:193-237` defines the dark palette for `:root[data-theme='dark']` and for `prefers-color-scheme: dark` when no theme is set. `ThemeChanger` always writes the resolved theme, and `app.html:11-18` applies a saved theme before first paint. Status bar `theme-color` metas for both schemes.
- Rendered: subscribe form, confirm page, embed card and four emails look right in dark at both widths (screenshots in the cloud workspace, not in the project).
- Hard-coded light colors in live components: `Secrets.svelte` (H2), `Code.svelte` (H3), Tags picker (M5), `CodeFormatter.svelte`, `CopyUrlWithQR.svelte:138-180` (`#333` on `#eee`), legacy `UpdateNewsSourceForm.svelte:359-384`, `Newspaper.svelte:404` (`color: white`). `src/lib/ui/organisms/SideLink.svelte:134-136` (`black`/`white`) is not rendered (Sidebar uses `NavLink`).
- `legal.scss` dark rule is wrong but unused (M4). Embedded SignatureEditor has its own dark rule.

## 4. Mobile, 375 px

- No live rule sets a width, min-width or grid column above 360 px outside a media query.
- Harness pages and emails: `scrollWidth == clientWidth` at 375 px in every case (no horizontal scroll).
- Dashboard: bottom bar with Home, Automations, Subscribers, Reports, More (`MobileNav.svelte`), shell bottom padding leaves room for it (`DashboardShell.svelte` media rule). More sheet traps focus, closes on Escape and returns focus.
- Tables as cards: `subscribers/SubscriberList.svelte:292-302` turns rows into labelled blocks under 40rem; `reports/ClicksChart.svelte:45` has a screen-reader table; `legal/cookies` table sits in a wrapper; the Secrets table in Settings > Integrations has no small-screen layout (check it).
- Problems: B2 (language pill over the bottom bar), H1 (marketing header above the dashboard), M8 (MenuHalf trigger and header menu share the top right corner during onboarding), M14 (embed selects truncate), H5 (hidden horizontal scrollbars after visiting the dashboard).

## 5. Keyboard and screen reader

- Visible focus: broken in about 45 rules (B1). The WS1 primitives, the dashboard shell, the landing page and the subscribe form use `box-shadow: var(--focus-ring)` correctly (60 uses).
- Skip links: landing (`+page.svelte:120`), blog (`BlogShell.svelte:16`), dashboard (`routes/dashboard/+layout.svelte:114`, target `main#dashboard-main`). Missing on pricing, help, about, legal, demo, careers, login, signup, subscribe. Add one skip link in the root layout and give every page a `main` id, then drop the per-page copies. Owner WS1.
- `aria-current="page"`: site header (`Header.svelte:177,258`), dashboard sidebar and bottom bar. Good.
- Clickable non-buttons in live code: `MenuHalfTrigger.svelte:10` (M8), `Header.svelte:224` backdrop (fine, the drawer has a close button and Escape), legacy Card and blog grids (M11). Listbox `li` items in Language, Country, CustomSelect and SearchSelector have roles and are driven from the input with `aria-activedescendant`.
- Focus traps: WS1 `Dialog`, `Drawer` and `Modal` are native `<dialog>` (trap, Escape, focus return). Header drawer (`Header.svelte:90-125`) and More sheet (`MobileNav.svelte:20-38`) trap focus by hand. GuidedTour is `role="dialog" aria-modal="false"` with Escape (`GuidedTour.svelte:162,212`), which is acceptable for a non-blocking tour.
- Form labels: every live input has a label, `aria-label` or a wrapping label, except the post status select in `Secrets.svelte:258`. Error linking: onboarding, subscribe and AddSourceForm link errors with `aria-describedby`; gaps in M7.
- Live regions: one Toaster (singleton guard, `Toaster.svelte:1-4,25-33`), polite `role=status` plus assertive `role=alert` for errors (`:131-136`), pauses on hover and focus. Subscribe success uses `aria-live="polite"`. Onboarding moves focus to each step title.
- Page language: B3.

## 6. Reduced motion

- Global: `tokens.scss:248-279` sets durations to 0 and stops CSS animations and transitions under `prefers-reduced-motion` or `data-motion="reduced"`. This covers every CSS animation, including the 14 infinite spinners and skeletons.
- JS: `$lib/anim/gsap.client.ts:15-16` and `useScrollSection.ts:29` check both signals; Toaster and Header transitions check them; `LoadingScreen` interval is gated; GuidedTour uses rAF only for positioning.
- Gaps: M9 (`html` smooth scroll stays; saved preference applies after hydration), M10 (two ungated Svelte transitions, legacy or dev only).

## 7. Right to left

- App UI: not supported (B3). No `dir` anywhere except the subscribe form. Physical properties are few (live: dashboard 46, shared 52, landing 23, onboarding 15, blog 7, subscribe 1) and most layouts are flex or grid, so setting `dir="rtl"` would mostly mirror correctly; the 15 onboarding and 46 dashboard `left/right` rules (for example `OnboardingShell.svelte:202` `margin-left: auto`, `MobileNav.svelte`, `SubscriberList.svelte`, `TextField.svelte`, `Checkbox.svelte`) should move to `margin-inline-start`, `inset-inline` and `text-align: start`. Owners: WS3, WS4, WS1.
- Subscribe widget: `SubscribeForm.svelte:85,254` sets `dir` from the UI language using `RTL_LANGS` (16 codes). The harness `lang=ar` query did not switch the form in this build, so the RTL render could not be checked here; check `/subscribe-widget?lang=ar` on the Mac.
- Emails: all 11 templates set `<html lang dir>` and repeat `dir` and `align` on cells (`newsletterEmail.html:55,114-131`). The Arabic newsletter preview renders right to left correctly in light and dark at 375 and 1280 px.

## Scores (out of 10)

| Area | Score | Reason |
|---|---:|---|
| Landing | 7 | Real landing with live preview, clear CTA, skip link and correct focus on the page itself; header and language picker focus broken, no theme control, separate button styles. |
| Onboarding | 6 | Strong flow (one question per step, why we ask, skip outcome, validation on submit), but no visible keyboard focus on any button or input and the no-website topic picker is off-brand. |
| Tutorial | 7 | Checklist from real data, optional tour, help cards, empty states; focus styles broken on all four components. |
| Dashboard | 7 | Clean token use, clear IA, tabs, active nav, mobile bar, tables as cards; language pill covers "More" on phones, double header, Integrations unreadable in dark mode. |
| Subscriber flow | 8 | Short form, errors after submit, linked errors, live success, dark mode and 375 px verified; local button style and truncated embed selects. |
| Emails | 8 | Table layout, dark mode, RTL, preheader, unsubscribe; verified at both widths and themes; only small branding and sample-language questions. |
| Blog | 7 | Owner hero, search with suggestions and results page, one pagination, SSR articles; focus invisible on cards, search and pagination, legacy redirects are client side. |
| Accessibility | 4 | Good structure (labels, live regions, native dialogs, aria-current, reduced motion), but visible focus fails across most non-dashboard screens, page language never changes, and RTL locales render left to right. |
