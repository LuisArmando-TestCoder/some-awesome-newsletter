# WS10-D: end-to-end journey trace (owner, subscriber, returning owner)

Date: 2026-10-30, 08:50 to 09:15 UTC. Method: code-path trace of both repos (no browser, no live backend: deno and the Vite dev server cannot run in this VM). One live check: a scratch script (`$HOME/ws10d/dryrun.mjs`, outside the project) drove the real automation engine with the WS8 fakes and the REAL `templates/*.html` for one Spanish and one Arabic subscriber. Nothing here was sent to a real address.

Note: WS3 and WS4 were editing the schedule time zone code while this trace ran (Step01_Frequency.svelte, schedule.ts, createNewsSource.ts, data/automations.ts changed at 09:12 to 09:13 UTC). Findings below reflect the files as of 09:15 UTC.

## Verdicts

| Journey | Verdict |
|---|---|
| A. New owner: landing to first send | Works with caveats. Two high risks (sign-in that depends on legacy codes, and source creation that waits for a full send). |
| B. Subscriber: signup to issue in their language | Works with caveats. Issue body, `lang` and `dir` are right; subject line, confirm token and the owner's view of the run are broken. |
| C. Returning owner | Works with caveats. Voice, sources, import, schedule, Run now work; reports and run history do not show sends; plan upgrade is a mailto by design. |
| 10-minute activation | Possible only on the happy path, and only if the owner presses Send again after an invitee accepts. Nothing in the UI tells them to. |

## Engine dry run (real templates, fake LLM, fake mail)

- Spanish subscriber, `send_now`, `dryRun: true`: status `ok`, steps fetch_candidates to render_email ok, send skipped (dry run). Preview HTML has `<html lang="es" dir="ltr">`, Spanish body, and Spanish footer ("Recibes este correo porque te suscribiste a Example weekly. Cancelar suscripción. Enviado con AIBAN"). No English chrome left.
- Arabic subscriber (real send to the fake transport): `<html lang="ar" dir="rtl">`. Pass.
- Subject for both: `Your Example update` (the owner's fixed English subject). See B1.
- `List-Unsubscribe` header present, but its URL and the footer link carry no signed token. See B3.
- Owner self-subscribe event: the owner gets a welcome email to their own newsletter and a "New subscriber" notice about themselves. See A7.

## Journey A: new owner

Path traced:
1. `/` `src/routes/+page.svelte`: site form `onPreview` builds a static sample (`IssuePreview`, `landingSample.buildSample`). Copy says it is a sample with placeholder text, which is honest. CTA `onStart` calls `logout(false)`, stores `aiban.pendingWebsite`, goes to `/start?url=https://host`.
2. `/start` `src/routes/start/+page.svelte`: stores `aiban.onboarding.prefillUrl`, `location.replace('/signup')` (or `/dashboard` with credentials).
3. `/signup` to `AuthForm.svelte`: `POST /auth/:email` sends a code; `onCode` calls `askIsAuthCodeValid` (`GET /auth/:email?code=`), which stores `sessionToken`; then `location.href = /dashboard?x-auth-email=..&x-auth-code=..`.
4. `/dashboard` `+layout.svelte` onMount: reads code from the query, `logout(false)`, saves email and code, calls `askIsAuthCodeValid` again, then `bootstrap()` (GET config, create it if missing, subscribers, leads).
5. `+page.svelte` shows `MainSteps.svelte` (9 NewFlow slots) until `stepsIndex >= Profile` and a source exists.
6. Slot 0 `Step06_NewsWebsite`: `takePrefillUrl()`, `POST /news-source/generate-selector/:id` (LLM). Nothing saved.
7. Slot 1 `Step08_Generate`: `POST /news-source/generate-newsletter` (old engine path `scrapeAndTranslateArticle` + `generateEmailContent`), sandboxed inbox preview, "Send me a test" `POST /news-source/send-email`.
8. Slot 2 `Step02_Language`: language and ideal reader into the store only.
9. Slot 3 `Step01_Frequency`: `createNewsSource` `POST /news-source/:id`. Backend `addNewsSourceEndpoint.ts` saves, subscribes the owner (auto confirmed), then AWAITS `triggerNewsSource` (a full engine send) before answering.
10. Slot 4 `Step11_Send`: `POST /invitations/:id/:ns` (exists, compat router), then `POST /news-source/:id/:ns/trigger` (engine path, 202 at once).
11. Slot 5 `Step12_Share`: link `${origin}/subscribe?configuratorId&newsSourceId&lead`, embed snippet matches `embed.js` attributes.
12. Slots 6 and 7: `saveToConfig({ senderName })`, `saveToConfig({ emailSignature })` (PUT /config, 600 ms debounce).
13. Slot 8 `Step13_Plan`: `markOnboardingComplete()`, `stepsIndex = Profile`, layout switches to `DashboardShell`, Home with checklist.
14. Automations: `AutomationCard` switch calls `setAutomationEnabled` (legacy: PUT /config with `newsSources[].active`). Signup link: Subscribers > Signup form (`EmbedCode`) and Settings > Developer.

Breaks:

| # | Where | What the user sees | Suggested fix | WS |
|---|---|---|---|---|
| A1 | `src/routes/dashboard/+layout.svelte:96` (`logout(false)`) with `AuthForm.svelte:160` | Works today only because `LEGACY_CODE_AUTH` defaults to true (`API/_lib/config.ts:122`). Every dashboard load wipes the stored session token, then re-verifies the 6-digit code, which `verifySignInCode` already consumed (`authService.ts:180`); it passes through the permanent legacy `code` field. The day `LEGACY_CODE_AUTH=false` is set (API_CONTRACT section 1 plans it), every sign-in ends on `/login?message-from-developer=now+you+need+to+login+again...`. Each load also issues a new server session that is never revoked, and the code travels in the URL. | In the layout, if a valid `sessionToken` exists, skip `logout(false)` and the code check (call `GET /v1/auth/session`). AuthForm should redirect to `/dashboard` with no code in the URL. Do not turn off legacy codes before this ships. | WS6 (layout), WS3 (AuthForm) |
| A2 | backend `API/newsSource/addNewsSourceEndpoint.ts:177-195` | "Save and continue" on the schedule step waits for a full send (scrape, LLM, render, SMTP). Frontend timeout is 120 s (`LLM_TIMEOUT_MS`), server `requestTimeout` is 120 s. On a slow site the owner sees "could not create", but the source exists. Retrying creates a second source, which the Free plan (1 source) refuses with the limit error. After a reload `$onboarding.newsSourceId` is empty, so Step 4 triggers `/news-source/x//trigger` and Step 5 shows a signup link with an empty `newsSourceId`. | Run the first send in the background (do not await; the engine records the run). Return 201 right after saving. In `Step01_Frequency`, on error re-read `/config` and adopt a source with the same URL before offering retry. | WS7 (endpoint), WS3 (step) |
| A3 | same, plus `Step01_Frequency.svelte:72` | Turning "automatic sending" off does not stop the first send: the source is created active, the first issue goes out during creation, then `active:false` is written. | Pass `active: automationOn` in the create body (the endpoint keeps `false`), and skip the creation send when inactive. | WS3, WS7 |
| A4 | `locales-newflow/en.ts:269` and `:276-277` | Step 4 copy says "If you skip, the first issue goes out at your scheduled time" and "Your first issue is on its way". The first issue already went to the owner at step 3, and the engine run started at step 4 may end "skipped" (ledger) while the UI still shows success. Owner inbox in the first 5 minutes: test email, issue at creation, issue from Send now, welcome email, "New subscriber" notice. | Make step 4 explicit: the owner copy already went out at step 3; Send now is for invited readers. Listen to `automation:run` (WS6 socket) and show the real result (sent N, or the skip reason from `SKIP_MESSAGES`). | WS3 |
| A5 | `Step02_Language.svelte:50`, backend `addNewsSourceEndpoint.ts:183` | The readers' language chosen in step 3 is only kept in the store (saved later with the next PUT /config as `dashboardLanguage`). It never reaches the source; the owner self-subscribes with `language: "en"`, so a Spanish-speaking owner gets their own issues in English. | Send `language` with the create body and use it for the owner self-subscribe (backend: use the source language or `config.dashboardLanguage`). | WS3, WS7 |
| A6 | `Step01_Frequency.svelte:59`, `createNewsSource.ts` | `personality` is `$store.personality || ""`, which the request drops, so new sources have no voice. The preview used "Warm, clear and helpful" (`onboardingApi.ts:30`), real issues use the engine default. Promise "sounding like you" is not met. | Call the existing `getPersonalityOutOfContent` endpoint in slot 0 or 1 and save the result on the source. | WS3 (WS8 for the prompt) |
| A7 | backend `db/newsletter/subscribeService.ts:76` (emit for the owner) | Owner gets "Welcome" to their own newsletter plus "New subscriber: owner@..." right after setup. Verified with the engine. | Do not emit `new_subscriber` when `isOwner`. | WS7 |
| A8 | `Step10_SenderName.svelte:42`, `Step05_EmailSignature.svelte:54` | When PUT /config fails, `saveToConfig` resolves `null`, the step stores the value locally and moves on. The owner thinks the sender name or signature is saved. | Show the error (`saveStatus` already holds it) and stay on the step. | WS3 |
| A9 | `Step08_Generate.svelte:51` and `generateNewsletterEndpoint.ts:71` | Preview runs before the language step, in the browser language only, and the backend ignores the ideal reader (`community: "General"`). STRATEGY's aha ("two languages side by side") is not shown. Preview uses the old engine path, so it can differ from the real issue. | Add a second-language toggle that calls the same endpoint (or `POST /v1/email/preview`), pass `community`. Longer term, preview through the engine dry run. | WS3, WS7 |
| A10 | `src/lib/tutorial/onboardingState.ts:51` | `aiban.pendingWebsite` is never removed, so a later onboarding (new account in the same browser) is pre-filled with an old site. | Remove it in `takePrefillUrl`. | WS3 |
| A11 | Schedule time zone (in progress at 09:15) | Frontend now sends `scheduleTimezone` and the API stores it, but `engine/automations/recipes.ts:75` still builds legacy automations with `tz: "UTC"` (the comment in `scheduleAllNewsSources.ts` mentions a `sourceTz` that does not exist). Until the engine reads it, a Costa Rica owner who picks Monday 9:00 gets the issue at 3:00. | `legacyAutomation`: `tz: isValidTz(source.scheduleTimezone) ? source.scheduleTimezone : "UTC"`; same in `recipesFor`. Add a test. | WS8 |
| A12 | `main.ts:96-110` | The scheduler starts only from `scheduleAllNewsSources` at boot, per existing config. If `getAllConfigurationsDocuments` fails at boot (logged as a warning), the engine never starts and no scheduled issue goes out until a restart. | Always call `getEngine(baseUrl).start()` (or `startAutomations(configs)`) in production, even with zero configs. | WS7 |

## Journey B: subscriber

Path traced:
1. `/subscribe?configuratorId&newsSourceId` (`+page.ts`, `+page.svelte`) and `/subscribe-widget` both render `SubscribeForm.svelte`, which calls `subscribeToNewsletter` (`widgets/Subscribe/subscribe.ts:142`): direct `POST {api}/public-subscribe` with name fallback (email local part) and `baseCode(language)`.
2. Backend `publicSubscriptionEndpoint.ts` to `subscribeService.subscribe`: config and source check, plan limit, `addToSource` (pending), `sendConfirmationEmail` (`confirmationMailer.ts`) with `templates/confirmationEmail.html` in the reader's language and a signed `buildConfirmUrl` link to `/confirm-subscription?configId&newsSourceId&userEmail&token`.
3. `/confirm-subscription` page calls `confirmSubscription()` (`GET {api}/confirm-subscription`), backend `confirmHandler` checks the link, `confirmSource`, emits `new_subscriber`.
4. Engine welcome automation (`pipeline.ts:547`): welcome email in the reader's language (built in or translated once).
5. Scheduled or Run now issue: engine groups recipients by language, one rewrite per language, `wrapDirection`, `templates/newsletterEmail.html` with `language`. Verified in the dry run.
6. Unsubscribe: footer link and `List-Unsubscribe` go to backend `GET /unsubscribe/:email?newsSourceId&configId`, which shows a one-button page (safe against link scanners), POST unsubscribes.
7. Owner view: Subscribers list (`lib/dashboard/subscribers`), Home activity (`GET /v1/activity`), Automations card.

Breaks:

| # | Where | What the user sees | Suggested fix | WS |
|---|---|---|---|---|
| B1 | `engine/automations/recipes.ts:78` (`subjectMode: "fixed"`) with `createInitialConfiguratorConfig.ts:26` (`newsletterSubject: "Daily News"`) | Every subscriber of every new owner gets the subject "Daily News" in English, even when the body is Spanish or Arabic (verified: subject "Your Example update" for es and ar). The confirmation email subject is also English: `confirmationMailer.ts:51` "Confirm your subscription to ...". The subject is the first thing a reader sees. | For legacy automations use `subjectMode: "title"` (the translated issue title) unless the owner set a custom subject; stop seeding "Daily News". Localize `confirmationSubject` with the same table the template uses. | WS8, WS6, WS5 |
| B2 | `src/routes/confirm-subscription/+page.svelte:22-41`, `widgets/Subscribe/subscribe.ts:186-189` | The page reads `configId`, `newsSourceId`, `userEmail` but drops `token`. Works today only because `LEGACY_UNSIGNED_LINKS` defaults to true; anyone can confirm any address. When legacy links are turned off, every confirmation fails with "This confirmation link is incomplete". | Read `token` from the URL and pass it through to `GET /confirm-subscription`. | WS5 |
| B3 | `engine/automations/pipeline.ts:261-269` (`links()`) | Issue footer and `List-Unsubscribe` URLs have no signed token, unlike `buildUnsubscribeUrl` in `API/_lib/linkTokens.ts`. Same dependency on `LEGACY_UNSIGNED_LINKS`: turning it off breaks every unsubscribe link in sent issues, a Gmail and Yahoo bulk-sender problem. | Build the link with `buildUnsubscribeUrl` (per subscriber, token cached per run). | WS8 |
| B4 | `API/newsletter/unsubscribeEndpoint.ts:125`, `API/v1/public/publicRouter.ts:123-150` | Unsubscribe and invitation-accept pages are English only, whatever the reader's language. | Pass the subscriber's language and use a small string table (WS5 already has one in the templates). | WS7, WS5 |
| B5 | `lib/dashboard/data/automations.ts:149`, `:85-95`; no `issue.sent` writer in backend | The owner cannot see the run. The default automation is always the frontend-built legacy item: no `lastRunAt`, and `loadRuns` returns nothing for legacy items. Nothing writes `issue.sent` or `automation.run_finished` to the activity feed (only `activityCompat.ts` reads them), so Home and `/v1/onboarding` `first_send` never show a send. | Engine: `recordActivity(configId, "issue.sent", { counts, languages })` when a run finishes. Frontend: use the backend's `legacy_<id>` item (it carries `lastRunAt`, `lastRunStatus`) and call `listRuns` for it. | WS8, WS4 |
| B6 | `lib/dashboard/subscribers/SubscriberList.svelte` | Pending (unconfirmed) and confirmed subscribers look the same. An owner sees "3 subscribers" while only 1 will receive the issue. | Show a "Waiting for confirmation" pill and a resend action. | WS4 |
| B7 | `API/newsletter/publicSubscriptionEndpoint.ts:34` vs form | Backend requires `name`; the form fills the email local part, so the welcome email says "Welcome, ana.perez!" when the reader skipped the name. | Make `name` optional in the backend; templates already handle empty first names. | WS7 |

What works: language stored on the subscriber (two-letter, validated), confirmation template in the reader's language with RTL, welcome email in the reader's language, issue body, `lang` and `dir` correct (dry run), unsubscribe two-step page.

## Journey C: returning owner

| Step | Path | Result |
|---|---|---|
| Edit voice | Sources > source detail `SourceDetail.svelte:87` `updateNewsSource({ personality, community, lead })` | Works. |
| Add a source | `AddSourceForm.svelte` `POST /news-source/:id` | Same blocking first send as A2. Free plan allows 1 source, so a Free owner always gets the limit error; the only path is a mailto. |
| Import CSV | `AddImport.svelte` to `lib/api/imports.importContacts` to `POST /news-source/any-user-data-base-file-to-standard-format/:id` (NDJSON) | Works. Each contact is added as pending and gets a confirmation email. Caveats: per-contact failures (plan limit, bad address) are dropped silently on the server (`getAnyUserDataBaseFileToStandardFormatEndpoint.ts:76-83`), so "N added" has no reasons; language defaults to `en` when the LLM does not guess; confirmation emails for a big list bypass the daily send budget. |
| View reports | `sections/Reports.svelte`, `reports/data.ts` | Clicks only (from `leads`). No "Issues sent" tab and no per-issue results (see B5). STRATEGY lists Issues sent as a Reports tab. |
| Change schedule | `AutomationCard` > `ScheduleEditor` > `saveLegacySchedule` (PUT /config) | Works on the frontend; engine still reads UTC (A11). |
| Run now | Home "Send now" and card "Run now" > `runNow()` > `POST /v1/automations/run` (fallback `/trigger`) | Works. Toast "run started"; the result (sent or skipped) is not shown unless the socket event is wired. |
| Turn automation on or off | `setAutomationEnabled` (legacy: PUT /config) | Works. Caveat: frontend treats `active !== false` as on, engine treats only `active === true` as on (`recipes.ts:74`). Old sources with no `active` field show On but never send. Fix: one rule in both places. WS8 or WS4. |
| Upgrade plan | Settings > Plan and billing `BillingTab.svelte:36`, `Pricing.svelte:170` | mailto to support only. Payments are off by Luis's decision (Tilopay code and Polar routes parked, `features.payments=false`). Copy is consistent. Not a self-serve upgrade. |
| Sign out and back in | `logout()` revokes `/v1/auth/logout`, redirects `/`; sign in repeats journey A steps 3 and 4 | Works while legacy codes are on (A1). |

## 10-minute activation check

Charter target: a new owner sends a real issue to one real subscriber within 10 minutes, with a live preview first.

Happy-path timeline from the code: website + selector (LLM, up to 2 min), preview (scrape + LLM, about 1 min), language, schedule (creation waits for a full send, 1 to 2 min, first issue goes to the owner), invite a contact, invitation email, contact accepts (`/v1/public/invitations/accept`, auto-confirmed), then a second Send now from the dashboard. Feasible in about 8 to 10 minutes only if:
- the contact opens the invitation and accepts within minutes,
- the owner presses Send now again after the acceptance. Step 4 sends at the same moment it invites, so the invitee is never in that send. Nothing tells the owner to send again, and there is no notice when the invitee accepts (the owner gets a "New subscriber" email, but not a "send now" prompt),
- the source has a second unsent article (the ledger skips the one sent to the owner at step 3; a site with one article gives "nothing new"),
- source creation does not time out (A2).

Blockers, in order: A2 (blocking creation), Step 4 order (send happens before anyone accepts), A1 (sign-in depends on legacy codes), A4 (UI says sent when it may be skipped), B5 (owner cannot see the send). Suggested change for WS3: after invitations, show "Waiting for N invitations" with a live count (`GET /invitations/:id`, socket `activity`), and enable "Send to them now" when the first one accepts; the engine should allow one resend of the latest article to recipients who did not get it (ledger per recipient for the first issue).

## Release checklist items found on the way
- Backend refuses to boot in production without `LINK_SIGNING_SECRET` (`API/_lib/config.ts:131`). Set it on Render before deploy.
- Keep `LEGACY_CODE_AUTH` and `LEGACY_UNSIGNED_LINKS` on until A1, B2 and B3 ship.
- `FRONTEND_URL` default differs: backend config `https://aiban.news`, engine owner emails `https://aibanewsletter.club` (`pipeline.ts:632, 672`), `Step12_Share.svelte:15` SSR fallback `aibanewsletter.club`. Set `FRONTEND_URL` explicitly.
