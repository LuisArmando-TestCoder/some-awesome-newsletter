# WS10 QA, area G: copy (English source strings)

Date: 2026-10-30. Auditor: WS10 copy QA subagent. Read-only audit; no project file was changed except this report.
WS9 (i18n and copy) was running during the audit, so locale numbers are a snapshot. Rules: `docs/aiban/COPY_RULES.md`.

Method: WS9's `scripts/copy-lint.mjs --code src` (read-only run), plus an independent Python scan of every `en.ts`, every `.svelte` under src/routes, src/lib, src/components (text nodes, placeholder, aria-label, title, alt, label), `src/lib/content`, `src/lib/tutorial`, `static/content/*.json`, backend `templates/**`, `prompts/**`, `API/**`. Comments, `<style>` blocks and log lines were excluded. `scripts/i18n-check.mjs` for missing keys. Every finding below was checked by hand. "Reachable?" was checked by grepping imports and key references.

Important context for weighting: large parts of `locales/en.ts` are dead. `mainContent`, `publishToWebsite`, `imageInput`, `confirmSubscription`, `articles`, `authForm`, `welcome`, `lead`, `newsSource`, `header`, `fileInput` have no reference in src (mainPage.disclaimer and mainPage.skipToMainContent are the only live mainPage keys). `locales-newflow` step01 to step13 are unreferenced. `static/content/*.json` is not loaded by any code but is publicly served. The legacy H_Dashboard panels (Config, NewsSource, Users, Reports, Billing, Exports, Newspaper, Developer) are still mounted by `MainSteps.svelte:79-86` after onboarding, so their legacy dashboard keys are reachable.

## 1. Hard constraints

### 1a. Dashes (English scope, live or public)
| # | Where | Text | Reachable? |
|---|---|---|---|
| 1 | FE/src/components/systems/inputs/Secrets/Secrets.svelte:108 | `return url \|\| "—"` (empty URL shown as em dash) | Live (Settings > Integrations) |
| 2 | FE/static/content/help-limits.json:29 | "within 1–2 business days" (en dash) | Public static file, not loaded by code |
| 3 | FE/src/routes/test-styles/+page.svelte:204 | "Double hyphens -- stay as typed" | Test page (should not ship) |
| 4-7 | FE/src/lib/i18n/locales/en.ts:1328, 1337, 1348, 1349 | publishToWebsite.urlHint, passwordHint, statusDraft, statusPublish (em dashes) | Dead keys |
| 8-15 | FE/src/lib/i18n/locales-dashboard/en.ts:178, 179, 186, 188, 190, 428, 430, 435 | Strings wrapped in "--...--" (markdown.* and newsSource.*Desc). MarkdownText no longer treats "--" as markup, so readers see literal double hyphens | 428/430/435 live in legacy UpdateNewsSourceForm; 178-190 unreferenced |

English total: 15 (1 live in new UI, 3 live in legacy UI, 11 dead/test/static). Backend: 0 in templates and prompts. 4 em dashes in backend debug logs (API/newsSource/articlesEndpoints.ts:265, 270, 345, 547), not user-facing.
Non-English (checked for dashes and emojis only): locales 75 dashes (all in dead publishToWebsite and mainContent.personas), locales-dashboard 76 dashes, all live: webhook.baseUrlHint (25 locales), webhook.postStatusDraft (26), webhook.postStatusPublish (22), webhook.appPasswordHint (3). The English source was fixed; translations are stale.

### 1b. Emojis and pictographs
Live in Secrets.svelte (Settings > Integrations): :189 "★" with title="System Default", :193 "→ Publish" / "→ Draft", :204 "✕" delete button without aria-label, :213 "★ ... (System Default)", :242 "↕", :275 "✅", :307 "⚠️", :326 "✅". That is 9 in one live component.
Other: locales/en.ts:1341 "Users → Your Profile" (dead key); FE/src/components/systems/inputs/Language/languages.ts:79 flag "🏳️" for Esperanto (data, shown in a picker).
Non-English: locales-dashboard credentials.goGoogle "↗" in 26 locales (English fixed by WS9); locales-newflow step05.warning "⚠️" in 23 locales (dead key).
English total: 12 (9 live).

### 1c. Curly quotes
English UI: 0. Backend: API/geos/ipLookupTable.ts:52 (a code comment, not user-facing). Pass.

### 1d. Title Case
My heuristic over all en.ts values (WS9's linter only checks keys whose name looks like a label, so it misses about 40): 179 raw hits; after removing country/language names, plan names and person names, about 95 real Title Case strings. Split:
- Dead keys: about 55 (mainContent, publishToWebsite, step01-13, confirmSubscription, authForm, articles, fileInput).
- Live (legacy dashboard panels or shared components): about 40. Examples: locales-dashboard/en.ts:21 "Newer Entries", :24 "Older Entries", :38 "Choose File", :39 "or Drop File Here", :45 "Select Image", :65 "Generate Personality", :162 "Manage Subscription", :176 "App Password (16 letters)", :216 "Subscribers per Source", :219 "Lead Clicks per News Source", :239 "Most Popular", :247 "Sync Error", :248 "Last Synced", :250 "Delete Source", :256 "Profile Picture", :259-263 "API Key", "Show Key", "Hide Key", "Copy Key", "Regenerate Key", :381 "Send Custom Message to Subscribers of {source}", :414 "News Source Added", :419 "Basic Settings", :420 "Advanced Generation Settings", :423 "News Source URL", :427 "Include Images in Newsletter", :429 "Publicly Visible in Widget", :431 "Sender Email Address (Optional)", :433 "Email App Password (Optional)", :434 "Required if Sender Email is provided"; locales/en.ts:435 "API Access" (pricing card, live).
- Hard-coded in .svelte (live): LeadStat.svelte:15 "Total Leads", :19 "Total Clicks"; Secrets.svelte:285 "+ Add Publish Destination", :290 'Click "+ Add Publish Destination"', :189/:213 "System Default"; HelpContextCard.svelte:7 "Current Plan" (unreferenced component); AddNewsSourceForm.svelte:137 "Paid Newsletter"; MenuHalf.svelte:58 aria-label "Primary Navigation"; Personality.svelte:86 aria-label "Personality Description"; ScheduleTime.svelte:144 "Day of Month", :147 "Day of Week"; CopyUrlWithQR.svelte:94 alt "Subscription QR Code"; components/Header/Header.svelte:34 "News Sources", :64 "Log Out" (only used by /test-checklist).
- static/content/auth.json: "Continue with Email", "Sign Up", "Log In" (file unused; live auth copy is in locales/en.ts and is fixed).
The new dash.* namespace, onboarding, tutorial, subscribe flow, blog and landing keys have 0 Title Case hits.

### 1e. Invented facts and unverifiable claims
| Where | Claim | Status |
|---|---|---|
| locales/en.ts:186-195 | Logos "InnovateCorp", "QuantumLeap", "Synergy Inc."... and "Trusted by 10,000+ teams worldwide" | Dead key (mainContent), still shipped in the bundle and copied into 36 locale files. Delete. |
| locales/en.ts:288-300 | Testimonials "Alex Chen, Head of Growth, Global Tech Inc.", "Samantha Jones, Founder, The Content Corner", metrics block | Dead key. Delete. |
| locales/en.ts:173 | "Beta Launch: ... 35% off" | Dead. 35% matches backend prices (17x12=204 vs 132), so it is real. |
| locales/en.ts:409, 422, 435, 448 | Plan features "Email support", "Basic translation", "Custom branding", "Advanced analytics", "Priority processing", "White-glove support", "Custom webhooks" | LIVE on the pricing cards. None of these is a plan-gated feature in helper/checkActionLimit.ts (limits are only newsSources and users). "Basic translation" also contradicts "every reader gets every language". Treat as invented until product confirms. |
| locales/en.ts:37, 68, 87, 126 (landing hero, chain step, sender section, FAQ) and about.lead | "sends it from your own email address", "Readers see your name, and their replies arrive in your inbox" | LIVE. Overclaim: the default is AIBAN's address with your sender name (dash.settings.sending.defaultExplain, newflow senderName.previewBody "It is sent from the AIBAN sending address"). Own address needs an app password. Needs a qualifier. |
| static/content/plans.json | Plans "Monthly $17 / Yearly $108 ($9/mo)", "Unlimited users" | Contradicts the real plans (Starter/Growth/Pro/Master). File is unused but public at /content/plans.json. Delete. |
| static/content/help-limits.json:29, :19 | "reviewed within 1-2 business days", "We unlock larger quotas immediately after approval", "volume discounts at scale" | Unused but public. Unverified SLA and pricing claims. Delete. |
| locales-newflow/en.ts:272 | "we delete invitations nobody accepts after 30 days" | Live onboarding. Linked tokens expire in 30 days (API/_lib/linkTokens.ts), but deletion of the invitation was not verified. Check with backend owner. |
| locales-dashboard/en.ts:632 | new_post_alert "within the hour" | Live, marked "Coming soon". Promise with no implementation yet. |
| test-styles/+page.svelte:192 | "It goes to 1,250 subscribers in 4 languages." | Test page only. |
Landing, onboarding, dashboard numbers otherwise come from real limits (free plan 1 source, 100 subscribers; logo 2 MB, 200 px; import size) and match the backend.

## 2. Banned words (word boundary, case-insensitive, hand-checked)
English UI hits: 5 real.
- locales/en.ts:177 "Effortlessly" (dead), :226 "Seamless" (dead), :292 "game-changer" (dead), :310 "Revolutionize" (dead).
- static/content/help-limits.json:19 "unlock" (public static file).
"key": 14 hits, all nouns (API key). Allowed by the rule, but "API Key"/"Show Key" are Title Case (see 1d).
"highlight": only CSS classes and highlight.js. "landscape": only in /tags-test data (a test route that should not ship).
Templates, prompts, API messages, new dash.*, onboarding, tutorial, subscribe, blog, landing: 0 hits.
Backend `prompts/_shared/copyRules.ts` carries the full banned list, hard constraints, and banned structures (COPY_RULES_PROMPT). It is injected into every prompt that writes customer-facing text: rewriteVoice.ts (used by translatedArticleContentPrompt.ts and engine/content/write.ts), getWritersPersonalityPrompt.ts, scraperWebsiteInfo.ts, engine/automations/defaultDeps.ts (welcome translation). Output also passes cleanCopy (dash, emoji, quote stripping) and engine/content/lint.ts. Selection-only prompts (scraperMostInteresting, scraperLinkSelector, contacts parsing) do not need it. helper/callChatGPT4.ts has no rules but is only used by scripts/test_pipeline.ts and scripts/generateBniWelcomeEmails.ts; if the BNI script still sends real welcome emails, it bypasses the rules. Verdict: the LLM side carries the rules. Pass.

## 3. Banned structures (sample review)
Landing (`landing.*`): clean. One borderline triplet in the chain "cleans the list, removes duplicates and guesses each contact's language" (real steps, acceptable). No rhetorical Q+A in body copy; FAQ questions are real questions.
Pricing page (live): locales/en.ts:502 pricing.contactText "Need higher limits or a custom setup?" and :469 plans.contact.text "Need a custom solution?" are hook questions answered by a "Contact us" button (rule 1). Plan taglines :395 "Test the technology", :420 "The perfect balance", :446 "Unlimited scalability" are filler slogans (rule 8 and 14 territory).
Dead landing (mainContent): "The Future of Newsletters is Here" (rule 7), "Ready to Revolutionize Your Newsletter?" (rule 1), :211 "..., ensuring every newsletter sounds like..." (rule 11), welcome "Set it once... / ...use it forever." (rule 3). All dead.
Onboarding (newflow onboarding.*): clean. Questions are genuine form prompts. Every optional step has a skipNote that states the default. Good.
Dashboard (dash.*): mostly clean. Findings:
- locales-dashboard/en.ts:1135 "More readers in more languages means more people who remember you when they need what you do." Aphorism (rule 8).
- :512 dash.home.desc "What is going out next, how your last issues did, and what needs you." Subjectless fragment and forced triplet (rules 6, 13).
- :1137 dash.help.settings.what "How your issues look, who they come from, your plan and the tools for developers." Subjectless fragment (13).
- :585 "These are on the way." Mild upbeat filler.
- Legacy keys: :425 "**Note:** The lead URL is optional, but it's highly recommended. It helps our AI..." (rule 10, inline bold label); :179 "Email signatures instil brand trust", :190 "Indicating who the email is from helps establish trust" (rule 8); :186 "Keep it concise, clear, and curiosity-driven" (rule 6 triplet); :165 billing.vipMessageText "please don't hesitate to reach out" (filler); :304 credentials.intro "<strong>completely optional</strong>" (mechanical bold).
Emails: clean. Short, front-loaded, no banned structures. unsubscription "Unsubscribed by mistake?" is a heading question followed by the action, acceptable. ownerWeeklyReport.html:68 preheader "{n} issues sent, {n} new subscribers." has no singular form ("1 issues sent").
Tutorial: clean. Checklist items are short; tour bodies are noun phrases (acceptable for tooltips).

## 4. Errors, empty states, optional fields, image uploads
New UI (dash.*, onboarding, subscribe, blog): errors say what went wrong and what to do next. Empty states explain what will appear and offer an action. Optional fields state the default (voice, reader, lead page, logo, subject, brand color, postal address, signature, sender name). Logo upload states format, size, min width, display size and where it appears (dash.settings.logo.spec*). Signature photo/logo hints state format, size and display size. Pass.
Gaps:
- Legacy UI errors with no next action (all live through MainSteps legacy panels): locales-dashboard/en.ts:63 "An unknown error occurred during generation.", :205 "An unknown error occurred.", :206 "Failed to subscribe", :215 "Error loading analytics data", :387 "Failed to send custom content for {source}. Check console for details." (asks owners to open the browser console), :389, :392-395 "Failed to ...", :41 "Unsupported file type" (no allowed formats; Image.svelte has no size or ratio hint).
- newflow step08.errors "Generation failed: " / "Failed to send email: " + raw error text (dead step keys, but the pattern exists).
- Backend legacy error strings that can reach the UI raw: API/newsSource/getPersonalityOutOfContentEndpoint.ts:165 `Error generating personality: ${error.message}`, `Failed to update news source: ${error.message}`, "Unauthorized", "Missing required parameters: configId and newsSourceId.", `News source not found with ID: ${newsSourceId}`. The new UI passes `{reason}` into dash.automations.runFailed and dash.subs.remove.failed, so these leak into good copy. API/_lib/errors.ts (v1 envelope) messages are good.
- Consistency problem (user trust): dash.subs.import.doneBody (:751) "They get your next issue in their own language" and dash.subs.add.subtitle (:716) "They start getting issues ... with the next send", but recipe import_contacts (:638) says AIBAN "asks each contact to confirm before they get issues". One of these is wrong. Confirm the real behavior and align.
- Subscriber-facing hard-coded English: routes/subscribe/+page.svelte:17 and subscribe-widget/+page.svelte:64 `<title>Subscribe</title>` (190 subscribe locales exist); templates/subscriptionNotification.html has no i18n dictionary, so every subscriber added by hand gets it in English.
- Help page form (live, src/lib/ui/organisms/HelpForm.svelte:124-209): 18 hard-coded English strings, not translatable.

## 5. Jargon flagged by the UX diagnostic
- "Signature HTML": 0 visible. Pass (now "Email signature").
- "Buyer persona": 0 visible. Persona appears only in dead mainContent and legacy credentials.intro. Pass.
- "Auto collapse": 1 live hard-coded string, SlotAutoCollapseToggle.svelte:81 "Auto collapse is on/off" (legacy NewsSource panel via MainSteps).
- "News source(s)": 47 English values. New UI says "source" and "Where your content comes from". Still visible in: pricing cards (locales/en.ts plans featuresBase "5 news sources", live), billing "news sources" (locales/en.ts:956 billing.newsSources and dashboard :237), newflow onboarding.schedule.errors.limit "Your plan does not allow another news source." (live onboarding), and about 30 legacy dashboard strings (menuHalf.newsSources, newsSource.*, analytics.*). Backend error messages also say "news source".
- Other jargon still visible: "users" for subscribers on pricing cards ("Up to 100k users"), "selector"/"CSS selector" (acceptable inside Advanced), "lead URL" (legacy :425), "configuratorId" / "newsSourceId" (Developer tab, acceptable for developers), "funnel" (newflow step12/13, dead).

## 6. Missing translations (i18n-check snapshot, WS9 still running)
| Family | Locales | Complete | Missing keys (min / max / total) | Placeholder mismatches |
|---|---|---|---|---|
| locales | 36 | 16 | 0 / 381 / 7,620 | 0 |
| locales-newflow | 36 | 14 | 0 / 181 / 3,982 | 0 |
| locales-dashboard | 36 | 12 | 0 / 722 / 17,028 | 72 (23 locales) |
| locales-billing-form | 36 | 14 | 0 / 9 / 198 | 0 |
| locales-subscribe | 190 | 48 | 0 / 138 / 19,587 | 0 |
Fallback behavior:
- Dashboard (`$dt`, src/lib/dashboard/i18n.ts): current locale, then English, then the raw key. Safe.
- Onboarding and tutorial (`ob`, `tt`, `at` in src/lib/tutorial/copy.ts): deep merge with English. Safe.
- App, newflow, subscribe, billing stores (LanguagePicker.svelte:94-119): `{...en, ...locale}` is a SHALLOW merge. When a locale has a top-level object with only part of its keys, the missing nested keys become undefined. Confirmed case: German (and every 70.9% locale) has `pricing` with 17 keys missing, so on /pricing `p.pageLead` and `pageMetaDescription` render empty and the title falls back to hard-coded English. The same applies to any nested object in locales-subscribe (form, success, errors, confirm, embed, signature). Fix: use the deep merge from tutorial/copy.ts in LanguagePicker. This is a code bug, not copy; report to WS9 or the owner of LanguagePicker.
- 72 placeholder mismatches in locales-dashboard can render "{count}" or drop a value. WS9 tooling rejects these on apply, so they should clear when WS9 finishes.

## 7. Twenty worst live hits, with suggested rewrites
1. locales/en.ts:37, 68, 87, 126 own-address claim. Rewrite FAQ: "Issues go out with your name. Add an app password for your Gmail, Outlook, Yahoo or iCloud address and they come from your own address, so replies reach your inbox." Chain step title: "It sends the issue with your name".
2. locales/en.ts:409/422/435/448 invented plan features. Replace with real limits only: "5 sources", "Up to 100,000 subscribers". Remove "Basic translation", "White-glove support", "Priority processing" unless product confirms.
3. locales/en.ts:395/420/446 taglines. "Test the technology" -> "For trying AIBAN with one site"; "The perfect balance" -> "For teams with several sites"; "Unlimited scalability" -> "For agencies with many client sites".
4. LanguagePicker.svelte:94-119 shallow merge leaves /pricing lead and meta description empty in 20 locales. Deep merge.
5. Secrets.svelte:275, 307, 326 emojis. Drop "✅"/"⚠️" and use the Notice component's success/warning style; text "Saved." / "Copy this key now. We will not show it again."
6. Secrets.svelte:285/290 "+ Add Publish Destination". -> "Add a website" and "You have not added a website yet. Select Add a website to publish each issue as a post."
7. Secrets.svelte:189/213 "★ ... (System Default)". -> "Default website" as a text badge.
8. Secrets.svelte:108 "—" for missing URL. -> "No address yet".
9. Secrets.svelte:204 "✕" button with no label. -> visible "Delete" or aria-label "Delete {name}".
10. locales/en.ts:502 "Need higher limits or a custom setup?" -> "For higher limits or a custom setup, write to us." with the button "Contact us".
11. locales-dashboard/en.ts:387 "Failed to send custom content for {source}. Check console for details." -> "We could not send this issue from {source}. Try again in a few minutes. If it keeps failing, write to support."
12. locales-dashboard/en.ts:205/63 "An unknown error occurred." -> "Something went wrong on our side. Try again in a moment."
13. locales-dashboard/en.ts:206 "Failed to subscribe" -> "We could not add this person. Check the email address and try again."
14. locales-dashboard/en.ts:41 "Unsupported file type" -> "Choose a PNG, JPG or WebP image." plus a hint with size and shape.
15. locales-dashboard/en.ts:716/751 vs :638 confirmation contradiction. If confirmation is required: "They get issues after they confirm from the email we send them."
16. locales-newflow/en.ts onboarding.schedule.errors.limit "another news source" -> "Your plan includes {limit} sources and you are using all of them. Open Billing to choose a bigger plan."
17. locales-dashboard/en.ts:1135 aphorism -> "Readers who get issues in their own language are more likely to read and click."
18. locales-dashboard/en.ts:428/430/435 literal "--...--" -> remove the hyphens; :430 "When this is on, this source is listed in your signup widget. When it is off, people can only join from a direct link."
19. LeadStat.svelte:15/19 "Total Leads" / "Total Clicks" hard-coded -> i18n keys "Clicks to your site" / "All clicks".
20. SlotAutoCollapseToggle.svelte:81 "Auto collapse is on/off" -> "Sections close after you save: on/off", or remove with the legacy panel.
Also urgent cleanup (not live but risky): delete mainContent (fake logos, "Trusted by 10,000+ teams", fake testimonials), static/content/plans.json, help-limits.json, auth.json, and the /test-styles and /tags-test routes before production.

## 8. Scores (out of 10)
| Area | Score | Why |
|---|---|---|
| Landing | 8 | Clear, concrete, front-loaded, no banned words. Loses points for the own-address overclaim, and the live pricing cards (invented features, slogans, "users", hook question). Dead mainContent with fake social proof should be deleted. |
| Onboarding | 8.5 | New flow is exemplary: why/skip notes, real defaults, good errors. Loses points for "news source" in one error, an unverified 30-day deletion claim, and legacy panels still reachable after step 8 with old copy. |
| Tutorial | 9 | Checklist, tour and help cards are short, plain and consistent. Minor fragments in tour bodies are fine for tooltips. |
| Dashboard | 7 | dash.* is 8.5 to 9 quality. Legacy panels still reachable through MainSteps pull it down: about 40 Title Case strings, vague "Failed to..." errors, "Check console", literal "--", 9 emojis in Secrets.svelte, "Auto collapse", "news source". |
| Subscriber flow | 8 | Subscribe, confirm and embed copy is clear with good errors and consent text. Hard-coded English page title, the English-only "you were added" email, the shallow-merge fallback bug, and 19,587 missing subscribe keys pull it down. |
| Emails | 8.5 | All templates clean: no dashes, emojis or banned words; clear purpose lines. Owner emails are English only; subscriber dictionaries cover 7 languages (16 for the newsletter footer) and fall back to English; "1 issues sent" plural. |
| Blog | 9 | Excellent empty, end-of-list, error and search states. Nothing to fix beyond translation coverage. |
