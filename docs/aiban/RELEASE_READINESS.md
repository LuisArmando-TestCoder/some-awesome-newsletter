# AIBAN release readiness

Written by WS10 (integration QA). First version 2026-10-30 10:31 UTC. Updated 2026-10-30 at about 15:00 UTC after a second WS10 run. Full evidence is in `docs/aiban/ws10-qa/` (seven QA reports from the first run) and `docs/aiban/ws10-log.md` (every fix WS10 made, with file and reason).

## Verdict: not ready for public launch yet. Ready for staging today.

Since this morning the picture got much better. The real build now runs and passes, and five of the eight blocking issues are fixed.

What changed in the second run:
- The computer now has network access, so the real checks ran for the first time. `npm run build` and `npm run check` pass. `deno task check` failed with 24 type errors that the earlier stand-in check could not see. WS10 fixed them, and it now passes.
- Fixed: readers now get the subject line in their own language, the owner sees each send on Home and in the automation history, built-in automation cards switch on and run, public pages download about 90 KB of JavaScript instead of 1.86 MB (compressed), and GDPR export and deletion cover the new data.

Two things still stop a public launch:
1. Secrets have to be rotated. WS7 found that the old server let anyone without an account read files and run code. Treat every key and password that was on that server as exposed. Only you can do this.
2. The permanent sign-in code still works by default. For Google users that code is the Google account id, which other apps using Google sign-in also see. This needs a change to sign-in that WS10 did not make, because it cannot be tested here without a real Google sign-in and a mistake would lock everyone out.

Deploy to staging now. Rotate secrets, ship the sign-in change (blocking issue 2 below), run the five-minute checks at the end of this document on staging, then launch.

## Checks run in this session

All on clean Linux copies of both projects (no `.env`, no secrets), after every fix below.

| Check | Result |
|---|---|
| `npm run build` | passes |
| `npm run check` | 0 errors, 329 warnings (needs `SECRET_CLIENT_ID` and `SECRET_CLIENT_SECRET` set, as the build does) |
| `npm run test:unit` | 25 passed |
| `npm run i18n:check` | exit 0, every app language complete |
| `npm run copy:lint` and `copy:lint:code` | 0 findings |
| `vite preview` smoke test | `/`, `/pricing`, `/subscribe`, `/articles`, `/dashboard`, `/start`, `/confirm-subscription` answer 200 with server rendering |
| `deno task check` | 0 errors |
| `deno task test` | 194 passed, 0 failed |
| `deno test -A tests/engine` | 53 passed, 0 failed |
| `deno lint` | 1045 findings, style only, not part of any task |

Not run: a full click-through in a real browser after the second run's fixes, and anything against real Firestore, Google sign-in or a real mailbox.

## Scorecard

Scores are out of 10 and mean "ready to show paying customers".

| Area | Score | Why |
|---|---|---|
| Landing | 8 | Real landing page with a live sample issue and honest copy. Now loads about 93 KB of JavaScript (compressed) instead of 1.86 MB. |
| Onboarding | 7 | Nine clear steps with a preview before anything is sent. Step 4 copy still says the issue goes out later, but the first issue is sent right away. |
| Tutorial | 8 | Checklist, guided tour, help cards and empty states are mounted. The "first send" check now turns green, because the engine records each send. |
| Dashboard | 7 | Built-in automation cards work, sends show on Home with their own icons and text in all 36 languages. The marketing header still shows above the sidebar, and Settings > Integrations is unreadable in dark mode. |
| Automations | 7 | The engine is solid (locks, ledger, retries, dry runs, 53 tests). Built-ins can be switched and run, and history shows sends. Send now runs are filed under `manual_<source>`, so they do not show in a scheduled card's history. |
| Subscriber flow | 8 | Signup, widget, confirm and unsubscribe work and were checked in a browser in the first run. |
| Emails | 8 | Gmail-safe tables, dark mode, right to left. Issue subjects now follow the reader's language. The confirmation email subject is still English, and the invitation template file is missing (an English fallback is used). |
| Blog | 7 | Owner blog with search, article pages, SEO tags and JSON-LD. Blog URLs contain the owner's email. |
| i18n | 8 | All 36 app languages are complete in every part, the subscriber form in 101 languages. Each page now loads only its own language. Visitors who do not use English see English for a moment while their language loads. All translations are machine-written and unreviewed. |
| Backend API | 8 | Real type check passes, 194 tests pass. Auth, tenant isolation, signed links, rate limits, health checks and graceful shutdown are in. Never started end to end against Firestore in this session. |
| Engine | 8 | 53 tests pass. A dry run renders a Spanish issue with a Spanish subject and `lang="es"`, and Arabic with `dir="rtl"`. |
| Billing | n/a | Payments are off by your decision. Plans are changed by hand from `/admin`. Pricing cards link to email. |
| Security | 4 | Worst holes closed. Still open: secret rotation, the permanent sign-in code, a master password that reads every tenant, tokens in the dashboard URL, open CORS until `CORS_ORIGINS` is set. |
| Performance | 8 | Public pages about 90 KB of compressed JavaScript, dashboard about 370 KB (was 2.4 MB). The server bundle's 3.9 MB translation chunk is gone. |
| Accessibility | 6 | Labels, live regions, native dialogs, visible focus, `lang` and `dir` are right. Three button styles remain, and two legacy screens are light-only. |
| Copy | 8 | Lint and i18n checks are clean. Pricing cards list features the backend does not enforce, the weekly report recipe promises clicks it does not show yet, and the legal pages need a rewrite. |

## What WS10 fixed

Each fix is logged in `ws10-log.md`. Originals are in `_aiban_backups/ws10-pre-edit/` (first run) and `_aiban_backups/ws10-pre-edit/run2/` (second run) in each project.

Second run:

| Fix | Files | Owner area |
|---|---|---|
| Real `deno task check` failed with 24 errors: express has no built-in types, so every handler was untyped | backend `helper/asyncHandler.ts` (one type directive), `sendCustomContentEndpoint.ts`, `fetchFirestoreData.ts`, `functionTemplateFile.ts`, `deno.lock` | WS7 |
| Every reader got the owner's English subject. The subject is now the issue title, written in the reader's language. An owner can still pick one fixed subject (`settings.subjectMode: "fixed"`). | `engine/automations/recipes.ts`, `pipeline.ts`, `types.ts`, `API/v1/automations/model.ts`, new engine test | WS8 |
| The owner never saw a send. The engine now writes `issue.sent` and `automation.run_finished` after real runs and keeps `lastRunAt`, `lastRunStatus` and `lastRunId` (new `automationStatus` store for legacy automations). Dry runs, welcome emails and owner notices stay out of the feed. | `engine/automations/{pipeline,executor,store,engine,deps,defaultDeps}.ts`, tests | WS8 |
| Built-in automation cards answered 404 when switched or run. The first switch now stores an automation for that recipe, Run now works on it and is hidden when there is no source or nothing to send, and the recipes endpoint returns one shape. | backend `API/v1/automations/automationsV1Router.ts`, `model.ts`, tests; frontend `src/lib/dashboard/data/automations.ts`, `AutomationCard.svelte`, `src/lib/api/automations.ts` | WS7, WS4 |
| The dashboard did not know the new activity types | `src/lib/dashboard/data/activity.ts`, `sections/Home.svelte`, 31 new keys in `locales-dashboard/en.ts`, translated into all 36 languages | WS4, WS9 |
| Every page loaded every language of every screen (1.86 MB compressed on `/`) | new `src/lib/i18n/lazy.ts`, the five `*-translations.ts` files, `LanguagePicker.svelte`, `SubscribeForm.svelte`, `CodeFormatter.svelte` (highlight.js core only) | WS2 |
| GDPR export and deletion missed the new data | `db/gdpr/owner.ts`, `db/gdpr/subscriber.ts`, new test | WS7 |

Bundle sizes, sum of JavaScript each route loads (raw / compressed):

| Route | Before | After |
|---|---|---|
| `/` | 7404 / 1863 KB | 242 / 93 KB |
| `/pricing` | 7383 / 1856 KB | 221 / 86 KB |
| `/subscribe` and the widget | 7381 / 1855 KB | 244 / 90 KB |
| `/dashboard` | 9070 / 2400 KB | 1121 / 371 KB |

First run (still in place): visible keyboard focus in 28 files, deep English fallback for missing translations, `lang` and right-to-left `dir` on the page, language button no longer covers "More" on phones, the confirm page passes the signed token, Google sign-in no longer fails for names outside Latin-1, signed unsubscribe links in issues, schedules in the owner's time zone, adding a source no longer times out, reader self-deletion no longer errors, and type fixes in both projects.

## Blocking issues

| # | Issue | Where | How to reproduce | Suggested fix | Owner |
|---|---|---|---|---|---|
| 1 | Secrets exposed by the old server | production env, Firestore `system/secret` | n/a | Rotate in the order in "Decisions for Luis" item 1, then ask customers to revoke WordPress and webhook passwords. | Luis |
| 2 | The permanent sign-in code still works by default. For Google users that code is the Google account id. | backend `API/_lib/config.ts:105` (`LEGACY_CODE_AUTH` default true), frontend `routes/oauth/+server.js`, `routes/dashboard/+layout.svelte:76-97` | On staging, send `x-auth-email` and `x-auth-code: <your Google id>` to `/private-config` with your own account: it answers 200 | Make `/oauth` hand over only a short-lived session token (in the URL fragment, not the query), stop `dashboard/+layout.svelte` reading codes from the URL, test sign-in with Google and with an email code on staging, then set `LEGACY_CODE_AUTH=false`. | WS3, WS6, then Luis |
| 3 | Run the build on the Mac once | both projects | `npm run check && npm run build`, `deno task check && deno task test` | They pass on Linux with clean installs. Run them once on the Mac (and in your deploy pipeline) to confirm. If `npm run check` shows 4 errors, `SECRET_CLIENT_ID` and `SECRET_CLIENT_SECRET` are missing from the environment. | Luis |

## Non-blocking issues

Fix these soon after launch. File and line for the older items are in the matching report in `ws10-qa/`.

Security and privacy (`f-security.md`):
- `THE_PASS` / `INTERNAL_API_SECRET` act as a master password for every tenant (`db/auth/multiAuth.ts:86-100`). Rotating them closes the leak. Removing the branch closes the risk.
- The dashboard "remove subscriber" call uses no auth, and the backend unsubscribes JSON callers without a check (`requests/unsubscribeUserToConfigNewsSource.ts:16`, `unsubscribeEndpoint.ts:110-125`).
- Scraped article HTML goes into `innerHTML` without cleaning in `FeaturedArticlesGrid.svelte`, `TextArticlesGrid.svelte` and `ArticleModal.svelte`.
- Private newsletters' articles are public through `/articles/:email`, and `/public/blogs` lists owner emails.
- Rate limits live in memory per process, and the widget proxy shares one IP for every customer.
- The CSP is report-only. The inline theme script in `app.html` needs a nonce before it is enforced.
- The backup archives in `_aiban_backups/` contain the real `.env` and service account files. Keep them off any shared drive and out of git.
- GDPR gaps left after the fix: finding a reader's unaccepted invitations across accounts needs a Firestore index on `invitations.email` (without it that step is reported as "manual"); `idempotencyKeys` and owner nudge locks have no account field, so they are skipped and expire on their own within 24 hours and 30 days. Owners still have no export or delete button in Settings.

Product and integration (`c-contract.md`, `d-journeys.md`):
- Send now runs are stored under `manual_<sourceId>`, so a scheduled card's history does not show them. A built-in's history does not carry over once it becomes a stored automation.
- The confirmation email subject is English for every reader (`confirmationMailer.ts:51`).
- The `owner_weekly_report` recipe text promises "who joined and what readers clicked", but the report always shows 0 new subscribers and 0 clicks.
- Step 4 of onboarding promises a send "at your scheduled time", but the first issue goes out right away. The owner gets about five emails in the first five minutes.
- The owner's own self-subscription triggers a welcome email and a "new subscriber" notice about themselves (`subscribeService.ts:76`).
- The scheduler starts only if the first config read at boot succeeds (`main.ts:96-110`).
- Old sources with no `active` field look on in the dashboard but never send.
- Socket events `activity` and `import:progress` are listened for but never sent.
- `templates/invitation.html` is missing. Invitations use a built-in English body.
- Deleting an automation can still fire it once within 60 seconds.
- Owner emails (new subscriber, weekly report) and the unsubscribe page exist in English only.
- Reports has no activity view yet (Home does).
- Visitors whose language is not English see English for a moment while their language file loads. Billing form strings now have no screen that reads them.

Design and accessibility (`e-ux-design.md`):
- The marketing header shows above the dashboard sidebar (`Header.svelte:17-24`).
- Settings > Integrations (`Secrets.svelte`, 70 raw colors) and the login code boxes (`Code.svelte`) are light-only.
- Onboarding, landing, subscribe and blog still use their own buttons instead of the shared Button component.
- `@use everything.scss` in `routes/dashboard/+page.svelte`, `AuthForm.svelte` and `MenuHalf.svelte` leaks global styles into every page after a visit.
- WS5's signature editor, the one you chose, is not mounted. Two older editors are.
- Right-to-left layout was not checked in a browser in Arabic, Persian or Urdu.

Code health (`a-frontend-static.md`, `b-backend-static.md`):
- About 30 unused packages. Run `bash scripts/ws1-remove-unused-deps.sh` on the Mac (it backs up first).
- 53 modules nothing imports, some new helpers not wired in yet (`lib/api/onboarding.ts`, `lib/api/events.ts`, `stores/planUsage.ts`).
- `senderV1Router.ts:40-43` imports nodemailer by a version that is not in `deno.lock`. `denoland/deno:latest` in the Dockerfile is unpinned. Pin it (this session used Deno 2.9.8).
- 329 svelte-check warnings (260 unused CSS selectors, about 40 accessibility hints) and 1045 `deno lint` findings.

## Decisions for Luis

Collected from every workstream summary. Decisions you already made today are at the end.

Open:
1. Rotate secrets now (WS7), in this order: the Firebase service account (`serviceAccountKey.json`, store the new one as `FIREBASE_SERVICE_ACCOUNT_JSON`) and `typesensecloudserviceaccount.json`; `TYPESENSE_ADMIN_API_KEY`, `TYPESENSE_SEARCH_ONLY_API_KEY`, `OPENAI_API_KEY`, `OPENROUTER_API_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`, `GITHUB_CLASSIC_TOKEN`, `PEXELS_API_KEY`, `SECRET_CLIENT_SECRET` / `GOOGLE_OAUTH_CLIENT_SECRET`; the system mailbox (`APP_PASSWORD`, `EMAIL_AUTH_PASS`, `EMAIL_PASSWORD`, `SMTP_PASS`) and the `system/secret` document (`appPassword`, `openAiApiKey`, `the_pass`, `email.auth.pass`); `THE_PASS` and `INTERNAL_API_SECRET`; `TILOPAY_*`, `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`; the WordPress password hard-coded in `scripts/testWordPressPost.ts`; every `authCodes` code and existing `sessions`. Purge or shorten Render and Vercel log retention.
2. Customer notification (WS7). Owner Gmail app passwords, WordPress passwords and webhook secrets were returned by public endpoints. Decide whether this is a breach you must report, and at least ask those customers to revoke them.
3. Delete stored app passwords (WS4, WS7). Run `scripts/scrubOwnerAppPasswords.ts` as a dry run, then with `--apply`.
4. One domain (WS5, WS8, WS9). You chose `https://aiban.news`, but `SITE_URL`, canonical tags, `robots.txt`, `seo.ts` and the engine's default still say aibanewsletter.club. Set `FRONTEND_URL=https://aiban.news` on the backend and switch the SEO files.
5. LLM provider order and cost (WS8). Default is GitHub Models, then Gemini, then OpenAI. GitHub Models' free tier is for prototypes. `LLM_PROVIDER_ORDER=openai,gemini` with `LLM_OPENAI_MODEL=gpt-4.1-mini` costs about a fifth of `gpt-4.1` (about 0.03 USD per language per issue at list price with `gpt-4.1`; estimate).
6. Email provider (WS8). Issues go out from AIBAN's address through one mailbox. Gmail caps that at roughly 500 to 2,000 messages a day. Moving to a sending service (SES, Postmark, Resend) changes one function (`createTransport`). `MAIL_SETUP.md` has the SPF, DKIM and DMARC records.
7. Plans (WS2, WS9). Plan data disagrees in three places (`en.ts`, `static/content/plans.json`, `PLAN_DEFINITIONS`). Pricing cards list features the backend does not enforce, and "35% off yearly", the Free plan limits and "1 to 2 business days" were never confirmed. Pick one source of truth and confirm each number.
8. Legal pages (WS2, WS4, WS9). The privacy policy is dated 2023, terms describe billing in advance and model training, the cookie table lists cookies the code does not set, and the cookie page contact changed to `info@aiban.news`. They need a legal rewrite. The consent sentence that replaced the terms checkbox needs a lawyer's view for each market.
9. Existing subscribers (WS3). Everyone added before today is live with no confirmation. Decide whether they get a one-time confirmation email.
10. Blog URLs contain the owner's email (WS2). A slug per owner needs a small data change.
11. When to turn off the migration switches (WS7). `LEGACY_CODE_AUTH=false` after blocking issue 2 ships. `LEGACY_UNSIGNED_LINKS=false` about 30 days after this deploy.
12. GDPR purge schedule (WS7). `db/gdpr/runPendingDeletions.ts` deletes accounts 14 days after the request. It is a dry run unless you pass `--execute`. Decide who runs it and how often.
13. Translations (WS9, WS10). English is now the only source. `npm run i18n:generate` (new `scripts/i18n-generate.mjs`) regenerates every other language from the English files with an LLM, in chunks, and can resume. Run it once with your key (dry run first) to replace the current files. Every translation is written by a model. Have native speakers review your top markets, and the weakest ones (wuu, apd, bho, pnb, jv, pcm, am) before large sends.
14. Subject lines (new). Issues now use the issue title, in the reader's language, as the subject. If you prefer one fixed subject for a newsletter, set it per automation. The old "Daily News" default is now only a fallback for an empty title.
15. Small cleanups. Careers says there are no open roles. The API playground uses a real celebrity name as its example. Unused public files `static/content/{plans,help-limits,auth}.json` could move to `_deprecated/`. Scratch folders safe to delete: `some-awesome-newsletter/_deprecated/_ws10_tmp/`, `_deprecated/docs/aiban/ws5-harness-partial-out/`, `_deprecated/ws2-buildcheck/`.

Already decided today (for the record): no payment at signup and payment providers removed (plans changed by hand in `/admin`); owners never give AIBAN an email password and issues go out from AIBAN's address with the owner's name and reply-to; "Send from my own Gmail" removed; main domain aiban.news; full signature editor; "Sent with AIBAN" removable on paid plans; translation and voice stay on the Free plan; activation metric is the first issue delivered to a confirmed subscriber who is not the owner, within 7 days; hand-typed contacts get an invitation that expires after 30 days; each source keeps its own time zone; admins are stored in `platform/admins`, seeded from `ADMIN_EMAILS`.

## Deploy checklist

Do this on staging first, then production.

1. On the Mac, frontend: `npm ci && npm run check && npm run build`. Optional before that: `bash scripts/ws1-remove-unused-deps.sh --dry-run`, then without `--dry-run`.
2. On the Mac, backend: `deno task check && deno task test` and `deno test -A tests/engine`. Commit the updated `deno.lock` (it now includes `@types/express`).
3. Rotate secrets (decision 1) and put the new values in the host's environment, not in files.
4. Backend environment (full list in backend `docs/configuration/environment.md`):
   - `APP_ENV=production` (staging: `staging`)
   - `LINK_SIGNING_SECRET` (32+ random characters; the server refuses to start in production without it)
   - `FIREBASE_SERVICE_ACCOUNT_JSON` or `FIREBASE_SERVICE_ACCOUNT_BASE64`
   - `CORS_ORIGINS=https://aiban.news,https://www.aiban.news`
   - `PUBLIC_API_URL`, `FRONTEND_URL=https://aiban.news`
   - `GOOGLE_CLIENT_IDS`, `ADMIN_EMAILS=oriens@aiban.news`, `INTERNAL_API_SECRET`
   - provider keys: `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`, `PEXELS_API_KEY` (optional), `LLM_*`
   - system mailbox: `APP_PASSWORD` or the `EMAIL_*` values
   - leave `LEGACY_CODE_AUTH` and `LEGACY_UNSIGNED_LINKS` unset (true) for now
   - leave `MAIL_AUDIT_BCC` unset unless you want an audit inbox
5. Frontend environment: `PUBLIC_API_URL`, `SECRET_CLIENT_ID`, `SECRET_CLIENT_SECRET` (needed at build time).
6. Firestore, in this order (all additive; nothing is migrated or deleted):
   1. Composite indexes: `automationRuns` (automationId ASC, startedAt DESC, `__name__` DESC); `deliveries` (newsSourceId ASC, sentAt DESC, `__name__` DESC); optional `newsletterUsers` (newsSourcesConfigTuples array-contains, language ASC); optional collection group index on `invitations.email` (lets reader deletion find invitations in every account).
   2. TTL policies: `idempotencyKeys.expiresAt`, `sessions.expiresAt`, `configurations/*/activity.expiresAt`, `configurations/*/events.expiresAt`, `configurations/*/invitations.ttlAt`, `automationLocks.expiresAt`.
   3. New collections (`automations`, `automationRuns`, `automationRunIndex`, `automationLocks`, `automationLedger`, `automationStatus`, `platform/admins`) are created on first write.
   4. After the deploy: `scripts/scrubOwnerAppPasswords.ts` dry run, then `--apply`.
7. Cron cutover to the automation engine. There is no separate cron to switch. The old per-source cron jobs are gone, and the engine scheduler starts inside the backend when `APP_ENV=production`. Each existing source becomes a `legacy_<sourceId>` automation with the same cron, read in the source's time zone (UTC when none is stored). Steps:
   1. Run exactly one backend instance. Two instances would each run the scheduler (locks stop double sends, but every tick runs twice).
   2. On staging, start with `AUTOMATION_FORCE_DRY_RUN=1` and check run previews before real sends.
   3. Make sure nothing else still calls `scripts/run_cron.ts` or an external scheduler hitting the trigger endpoint, or issues would go out twice.
   4. After the first production tick, open `/admin` and one owner's Automations page and check `nextRunAt` and `lastRunAt` values.
8. Smoke test with the five-minute checks below.
9. Rollback. Pre-overhaul snapshots are `_aiban_backups/frontend-2026-10-30-pre-overhaul.tgz` and `_aiban_backups/backend-2026-10-30-pre-overhaul.tgz`. Per-workstream originals are in each project's `_aiban_backups/ws*-pre-edit/` (WS10's second run in `ws10-pre-edit/run2/`). To roll back, deploy both old snapshots together (the old frontend does not use session tokens). The new Firestore collections are additive and can stay. Rotated secrets stay rotated: put the new values into the old deploy's environment. Two things do not roll back: app passwords deleted by the scrub script, and emails already sent with signed links (the old backend ignores the `token` parameter, so those links keep working).

## Five-minute checks for each headline change

Run these on staging after the deploy.

| Change | How to check |
|---|---|
| Landing page | Open `/`, type `acme.com`, press "Preview my newsletter". A sample issue with the name appears, and the language tabs switch with the arrow keys. Typing `abc` shows the error only after you press the button. |
| Page weight | Open `/` with the network tab open: JavaScript is about 90 KB compressed. Switch the language picker to German: one German file loads and the text changes. |
| Sign-in and onboarding | Open `/start?url=yourcompany.com` in a private window with a new email. The code screen shows a resend timer. Walk the nine steps with the Tab key only: the focus ring is visible on every button. Step 4 answers within seconds, and one source appears in Firestore. |
| Live preview before sending | In step 2 the issue preview appears within about a minute, and "Send me a test" delivers it to the owner inbox. |
| Dashboard | Sign in with an account that has a source. Home, Automations, Sources, Subscribers, Reports, Blog and Settings each load. Open a Settings tab and reload: you stay on that tab. At 375 px wide the bottom bar shows, and the language button sits above it. |
| Built-in automations | On Automations, switch a built-in card on: it stays on, and reloading keeps it on. Run now is hidden on an account with no source. |
| Automations engine | Run now on the scheduled automation (confirm first). The run appears in its history and on Home as "AIBAN sent ...". Run it again: the answer is "nothing new". A source in `America/Costa_Rica` set to 9:00 shows a next run at 15:00 UTC. |
| Subscriber in another language | Open `/subscribe?configuratorId=<owner>&newsSourceId=<id>` with the browser in Spanish. Subscribe with an address you own and confirm from the email. Send now from the dashboard: the body and the subject are Spanish, with `lang="es"` in the source. |
| Unsubscribe | In that issue, the footer link and the `List-Unsubscribe` header both contain `token=`. Clicking it unsubscribes the reader. |
| Right to left | Switch the language picker to Arabic: `<html lang="ar" dir="rtl">`, and the text runs right to left. |
| Security | `curl -i <api>/docs/../serviceAccountKey.json` answers 404. `GET <api>/config` without headers has no `appPassword`. `curl -I https://<site>/` shows `X-Frame-Options: DENY`. `/admin` with a non-admin account is refused. |
| GDPR | Request a reader privacy link, export, then delete: the delete answers 200. For a test owner, request export: it lists automations, runs, invitations and deliveries. |
| Copy and translations | `npm run i18n:check` exits 0, and `npm run copy:lint` and `npm run copy:lint:code` report 0 findings. |
