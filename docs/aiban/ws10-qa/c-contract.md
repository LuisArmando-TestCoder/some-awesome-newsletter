# WS10 QA, part C: frontend and backend contract

Date: 2026-10-30, 09:00 to 09:15 UTC. Read only. Static review of the code on Luis's Mac (frontend `some-awesome-newsletter`, backend `ai-newsletter-translated`). Nothing was run against a server.

Files still changing while this was written (treat findings on them as "verify again"):
- Backend, last 20 min: `API/newsSource/addNewsSourceEndpoint.ts` (09:03), `engine/automations/recipes.ts` (09:13), `engine/scheduleAllNewsSources.ts` (09:09), most of `API/_lib/*`, `API/v1/*`, `socket/socketAuth.ts`, `engine/emailSender.ts`, `helper/sendEmail.ts`, `types.ts`, `main.ts`, tests.
- Frontend, last 20 min: `src/lib/dashboard/data/automations.ts`, `AutomationCard.svelte`, `ScheduleEditor.svelte`, `data/schedule.ts`, `sources/*` (09:11 to 09:13), `src/components/systems/requests/createNewsSource.ts` (09:13), `src/lib/api/*` (08:53 to 08:58).

## 1. Breakages that fail a real user flow

### B1. Adding a source (onboarding step "How often", Sources "Add") can time out and leave the owner stuck
- Frontend: `src/components/systems/requests/createNewsSource.ts:55` (`timeoutMs: LLM_TIMEOUT_MS` = 120 s, POST, 0 retries). Caller `NewFlow/Step01_Frequency.svelte:54`.
- Backend: `API/newsSource/addNewsSourceEndpoint.ts:111` (LLM site scrape), `:132` (LLM selectors), `:177-186` subscribes the owner and then `await triggerNewsSource(...)`, which calls `engine/processSubscribersForNewsSource.ts` and waits for the whole run (`await done`: fetch, LLM translate, render, send). Only then answers 201. Server `requestTimeout` is also 120 s (`main.ts:83`).
- Repro: sign up, enter a site whose scrape plus first issue takes over 2 minutes (common with the LLM chain). The browser shows "We could not add this source", but the source was saved and an issue was sent. Onboarding did not store the id, so "Continue" posts again: on the free plan (1 source) the second call answers 403 plan limit and the owner cannot finish setup; on paid plans a duplicate source is created.
- Also: the first issue is sent even when the owner turned automatic sending off (the step creates the source first, then sets `active: false`), and Step 5 "Send now" then usually ends `skipped / no_new_items` while the UI says it was sent.
- Fix (WS7): answer 201 right after the write and start the first send in the background (`runManual` without awaiting `done`), or skip the first send when the body has `active: false`. Frontend (WS3/WS6) safety net: on timeout, reload `/config` and adopt a source with the same URL before retrying.

### B2. Built-in automations show a switch and a Run now button that always fail
- Backend: `engine/automations/recipes.ts:96-108` `builtInEventAutomations` adds `builtin_welcome_new_subscriber`, `builtin_import_contacts`, `builtin_write_about_this`, `builtin_owner_nudges`, `builtin_owner_weekly_report` to `listAutomations`; `API/v1/automations/automationsV1Router.ts:298` returns them in `GET /v1/automations`. But `loadOwned` (`:77-90`) only knows `legacy_*` ids and stored docs, so `POST /v1/automations/builtin_x/toggle`, `PATCH`, `DELETE`, `GET .../runs` answer 404.
- Frontend: `src/lib/dashboard/data/automations.ts:106` marks the list as live when any non-legacy item exists, `:130` calls `toggleAutomation(id)`; `AutomationCard.svelte:119` shows the switch, `:148` always shows Run now; `runAutomationNow` (`data/automations.ts:143`) throws "This automation has no source to run." (hard-coded English) because built-ins have no `newsSourceIds`.
- Repro: any owner with a source opens Automations. Five extra cards appear with English engine summaries as titles ("Alerts and tips for the owner"). Flip one: toast "could not change", switch reverts. Run now: error.
- Fix: WS7 treats `builtin_<recipeId>` in toggle/patch by creating a stored automation from the recipe (with the requested `enabled`), which the engine then uses instead of the built-in (it already skips built-ins covered by a stored automation). WS4 hides Run now when the trigger is not `schedule`/`new_article`/`manual` or there is no source, and uses `dash.recipe.<recipeId>.name` for titles instead of `automation.name`.

### B3. Google sign-in can crash for owners whose Google name is outside Latin-1
- Frontend: `src/routes/oauth/+server.js:55-66` builds headers including `given_name` and `picture` and passes them to `getConfigFetchResponse` (`requests/getConfiguratorSession.ts:14`, `auth: { headers }` sends them as-is). Node fetch refuses non ByteString header values (for example a Chinese, Arabic, Hindi or Polish name), the call throws, and the route has no try/catch, so `/oauth` answers 500.
- The backend never reads these two headers. The rest of this server-side block is also a no-op on a first Google sign-in: `x-auth-code` is the Google `sub`, which the backend only stores during `GET /auth/:email?token_id=` (`API/v1/auth/authService.ts:223-227`), so `GET /config` answers 401 and `POST /config` 401. The dashboard recovers through `askIsAuthCodeValid`.
- Fix (WS3, owner of `/oauth`): drop `given_name`/`picture` from the headers (or the whole server-side config call), wrap it in try/catch.

### B4. Unsubscribe and confirmation links stop working the day `LEGACY_UNSIGNED_LINKS` is turned off
Works today only because the flag defaults to true (`API/_lib/config.ts:123`).
- Issue emails: `engine/automations/pipeline.ts:264` (`links()`), `engine/generateEmailContent.ts:64`, `engine/emailSender.ts:251` build `/unsubscribe/<email>?newsSourceId&configId` with no `token`. `API/_lib/linkTokens.ts:127` `buildUnsubscribeUrl` exists but is unused. With the flag off every unsubscribe link answers 400 "This unsubscribe link has no signature". Owner: WS8.
- Confirmation page: the email link carries `token` (`linkTokens.ts:116`), but `src/routes/confirm-subscription/+page.svelte:41` and `components/systems/widgets/Subscribe/subscribe.ts:186-189` send only `configId, newsSourceId, userEmail`. With the flag off every confirmation fails (400, shown as "invalid"). A 403 bad token maps to "server error". Owner: WS5.
- Dashboard "remove subscriber": `requests/unsubscribeUserToConfigNewsSource.ts:16` calls `GET /unsubscribe/:email` with `auth: "none"` and `Accept: application/json`. Backend (`API/newsletter/unsubscribeEndpoint.ts:110-125`) unsubscribes JSON callers without owner auth when the link check passes. With the flag off it answers 400 and the owner cannot remove anyone. Today it also means anyone can unsubscribe any address with a JSON request. Fix: WS6 sends `auth: "user"` (the backend then treats it as owner) or moves to `DELETE /v1/subscribers/:email`; WS7 should require owner auth or a token for the JSON shortcut.
- Do not turn the flag off before these three are fixed.

## 2. Frontend HTTP calls (task 1)
Auth "user" = `Authorization: Bearer aiban_s_<token>` (when stored) + `x-auth-email` + `x-auth-code` + optional `x-auth-token-id`, `x-auth-client-id`, `x-user-language` (`src/lib/api/credentials.ts:94`). Base URL from `src/lib/api/config.ts`.

| # | Caller (frontend) | Method, path | Auth | Body or query | Expected response (zod) | Backend route | Status |
|---|---|---|---|---|---|---|---|
| 1 | askForNewAuthCode.ts | POST /auth/:email | none | | any | auth/sendCodeToEmail.ts:24 | OK |
| 2 | askIsAuthCodeValid.ts, api/server/identity.ts:408 | GET /auth/:email | none | code, token_id, client_id | `{sessionToken, sessionExpiresAt}` | auth/verifyUserCode.ts:49 | OK |
| 3 | logout.ts | POST /v1/auth/logout | user | | any | v1/auth/authV1Router.ts:57 | OK |
| 4 | api/server/identity.ts:391 | GET /v1/auth/session | Bearer | | `{email}` | authV1Router.ts:58 | OK |
| 5 | createInitialConfiguratorConfig.ts | POST /config | headers | defaults | `{apiKey?}` | configuration/uploadConfigurationEndpoint.ts | OK (pricingPlan/vip stripped server side) |
| 6 | getConfiguratorSession.ts, automations.ts:215, createNewsSource.ts | GET /config | user | | config | getConfigurationEndpoint.ts (optionalOwner) | OK |
| 7 | getPublicConfig.ts | GET /public-config/:id, fallback GET /config with only x-auth-email | none | | loose | compat/miscCompat.ts:171 | OK |
| 8 | updateConfiguration.ts | GET /private-config?documentId, PUT /config?documentId | user | full merged config | `{message, config}` | privateConfigInfoEndpoint.ts, updateConfigurationEndpoint.ts:106 | OK; `newsSources` accepted only with same ids; locked fields `url, type, linkSelector, ...` ignored silently |
| 9 | getNewsSourcesFromConfiguration.ts | GET /configuration-news-sources?configId | user | | array | getAllConfigurationNewsSourcesEndpoint.ts | OK |
| 10 | createNewsSource.ts | POST /news-source/:configId | user | NewsSource fields | `newsSourceEnvelope` | addNewsSourceEndpoint.ts:71 | B1 (timeout). zod `linkSelector`, `url`, `lead` etc. are `string().optional()`: a `null` would throw after the source was saved |
| 11 | updateNewsSource.ts, automations.ts updateLegacy | PUT /news-source/:c/:ns | user | partial | `newsSourceEnvelope` | updateNewsSourceEndpoint.ts:70 | OK |
| 12 | generatePersonality.ts | PUT /news-source/personality/:c/:ns | user | `{rawContent}` | envelope | getPersonalityOutOfContentEndpoint.ts:109 | OK |
| 13 | regenerateSelectors.ts | PUT /news-source/regenerate-selectors/:c/:ns | user | `{newsSourceUrl?}` | envelope | regenerateSelectorsEndpoint.ts:21 | OK |
| 14 | generateSelector.ts, onboardingApi.ts:56 | POST /news-source/generate-selector/:c | user | `{url, lead, personality, scheduleTime}` | `{selector}` | generateSelectorEndpoint.ts:20 | OK |
| 15 | onboardingApi.ts:25, api/preview.ts renderPreview | POST /news-source/generate-newsletter | user | `{newsSource:{url,lead,personality,linkSelector,includeImages}, language, config}` | `{html, subject}` | generateNewsletterEndpoint.ts:42 | OK. Backend 400s if `personality` is empty; onboarding defaults it, `renderPreview` does not |
| 16 | onboardingApi.ts:46, requests/sendEmail.ts | POST /news-source/send-email | user | `{html, subject, config, emails}` | any | sendEmailEndpoint.ts:49 | OK; only the owner's own address is allowed (callers send only the owner) |
| 17 | triggerNewsSourceSend.ts, onboardingApi.ts:69, automations.ts:356 fallback | POST /news-source/:c/:ns/trigger | user | | any | triggerNewsSourceSendEndpoint.ts:138 | Works; 200 `{status:"skipped"}` is treated as success by all three callers |
| 18 | api/imports.ts:116 | POST /news-source/any-user-data-base-file-to-standard-format/:c | user | `{text, newsSourceId}` | NDJSON | getAnyUserDataBaseFileToStandardFormatEndpoint.ts | OK |
| 19 | addNewsletterUserEndpoint.ts, postSubscriber.ts, createNewsSource.ts | POST /users/:c/:ns | user or API key Bearer | NewsletterUser | `{message}` | addNewsletterUserEndpoint.ts:35 (multiAuth) | OK; createNewsSource duplicates the owner subscribe the backend already did (errors swallowed) |
| 20 | subscribeNewsletterUser.ts | POST /subscribe | user | `{configId, newsSourceId, email}` | any | subscribeEndpoint.ts:26 | OK (email must be the caller) |
| 21 | getAllSubscribersFromConfigEndpoint.ts | GET /config-subscribers/:c | user | | `subscribersByNewsSourceSchema` | getAllSubscribersFromConfigEndpoint.ts:43 | OK; one subscriber with `name: null` or no email makes the whole call return `{}` |
| 22 | getNewsletterUsersByNewsSource.ts, UserDataService.ts:37 | GET /newsletter/users/:c/:ns | user | limit, startAfter | array | getNewsletterUsersByNewsSourceEndpoint.ts:34 | OK; backend now paginates (`X-Next-Start-After` header) but the client slices locally and never reads the header |
| 23 | searchNewsletterUser.ts | GET /newsletter/search?email or name | user | | array | searchUsersEndpoint.ts:28 | OK |
| 24 | sendCustomContent.ts, automations.ts:365 fallback | POST /newsletter/send-custom-content | user | `{configId, newsSourceId, content}` | any | sendCustomContentEndpoint.ts:16 | OK |
| 25 | unsubscribeUserToConfigNewsSource.ts | GET /unsubscribe/:email?configId&newsSourceId | none | | text | unsubscribeEndpoint.ts:161 | B4 |
| 26 | getLeadsForConfigurator.ts | GET /leads/:c | user | | `{[c]: leads}` | allLeadCountersFromOneConfiguratorIdEndpoint.ts | OK (callers unwrap `[configId]`) |
| 27 | getGeoIpLanguage.ts | GET /geo | none | | `{language}` | geos/geosRouter.ts:11 | OK |
| 28 | submitPublicSubscription.ts (unused), subscribe.ts:157, routes/subscribe-widget/subscribe/+server.ts (unused proxy) | POST /public-subscribe | none | `{configuratorId, newsSourceId, email, name, language, countryOfResidence}` | `{success, message, status}` | publicSubscriptionEndpoint.ts:50 | OK. If the SvelteKit proxy is ever used, every visitor shares the server IP and the 10 per 10 min IP limit |
| 29 | subscribe.ts:132, blog.ts:213 | GET /public-config-info | none | configuratorId, newsSourceId? | loose | publicConfigInfoEndpoint.ts:32 | OK |
| 30 | subscribe.ts:189 | GET /confirm-subscription | none | configId, newsSourceId, userEmail (no token) | status code only | confirmSubscriptionEndpoint.ts:54 | B4 |
| 31 | blog.ts:240/275, Newspaper.svelte, BlogArticles.svelte, routes/blog/** | GET /articles/:email (and NDJSON search) | none | page, size, lang, newsSourceId, search | | articlesEndpoints.ts:430 | OK. `/articles/:email/languages` exists but the blog still makes a size=1 request |
| 32 | routes/blog/[holder]/[id], routes/article | GET /article/:id | none | | | articlesEndpoints.ts:531 | OK |
| 33 | Secrets.svelte:119 | POST /configurations/:c/secret | user (raw fetch) | | `{sharedSecret}` | generateSecretEndpoint.ts | OK; configId not URL encoded |
| 34 | Secrets.svelte:133/141/149 | GET, POST /apikeys/:c, DELETE /apikeys/:c/:hash | user (raw fetch) | | `{apiKeys}`, `{apiKey}` | apiKeyEndpoint.ts | OK; no `res.ok` checks |
| 35 | onboardingApi.ts:86 | POST /invitations/:c/:ns | user | `{emails, language, expiresInDays:30}` | `{invited, failed}` | v1/invitations/invitationsRouter.ts:48 | OK. Backend needs a 2-letter lowercase language; the app's own codes such as `jp`, `pes` would pass or fail inconsistently; 400 shows every address as failed |
| 36 | api/automations.ts | /v1/automations* (GET list, GET :id, GET recipes, POST, PATCH :id, POST :id/toggle, DELETE :id, GET :id/runs, POST run, POST :id/run) | user | see section 4 | `{items: automationSchema[]}`, `{items: runRecordSchema[]}` | automationsV1Router.ts:298-494 | Paths and methods match. B2. Recipes shape mismatch (section 4) |
| 37 | api/activity.ts | GET /v1/activity | user | limit, cursor, type (comma list) | `{items:[{id,type,data,createdAt}], nextCursor}` | activityV1Router.ts:78 | OK |
| 38 | api/usage.ts | GET /v1/usage | user | | ServerUsage | usageV1Router.ts:74 | OK |
| 39 | api/onboarding.ts | GET, PATCH /v1/onboarding | user | `{done, undone, dismissed}` | OnboardingState | onboardingV1Router.ts:132/138 | OK (step ids identical) but no UI imports these helpers |
| 40 | api/preview.ts | POST /v1/email/preview | user | | EmailPreview | emailV1Router.ts:126 | OK, not used by any screen |
| 41 | api/admin.ts | /v1/admin/overview, tenants, tenants/:id (GET, PATCH), tenants/:id/news-sources/:nsId (PATCH) | user, requireAuth | | | adminV1Router.ts:150-224 | OK |
| 42 | routes/api/support/+server.ts | POST {api}/support | none | `{kind:"higher_limits", ...}` | | v1/support/supportRouter.ts:91 | OK; API_CONTRACT still says 501 |
| 43 | HelpForm.svelte | POST /api/support (SvelteKit) | none | | | routes/api/support | OK |
| 44 | PostExplanation.svelte | code sample only: POST /users/:c/:ns with API key | | | | | Sample hard-codes onrender URL and does not encode the email |

## 3. Backend routes with no frontend caller
`/v1/subscribers*`, `/v1/privacy/*` and `/v1/public/privacy/*`, `/v1/sender/test`, `/v1/mail/*` (Gmail connect, status), `/v1/billing/plan(s)`, `/v1/auth/sessions/revoke-all`, `/newsletter/counts/:configId`, `/newsletter/deliveries/:configId`, `DELETE /news-source/:c/:ns` (dashboard still has no "Remove source"), `GET /invitations/:c`, `/events`, `/onboarding/events` (client `trackOnboardingEvent` and `track()` stay local), `/public/preview-issue`, `/public/blogs`, `/articles/:email/languages`, `/segmented-subscribers/:c`, `/users/:email`, `PUT /subscriber/:email`, `DELETE /delete-user/:email`, `/lead-counter` (email links), `/configurations/:c/webhook`, `/all-configurations` (admin only now), `/auth/verify`, compat `/automations*`, `/activity`, `/usage`, `/healthz`, `/readyz`.
None breaks a flow. Several were requested by WS2, WS3, WS4 and now exist: they need wiring (activation, sitemap, landing preview, counts above 1000, delete source, privacy export and delete).

## 4. Automations shape across WS4, WS6, WS7, WS8 (task 4)
| Item | WS8 engine (`engine/automations/types.ts`, `recipes.ts`) | WS7 API (`API/v1/automations/model.ts`) | WS6 (`src/lib/api/automations.ts`) | WS4 (`src/lib/dashboard/data/automations.ts`) | Note |
|---|---|---|---|---|---|
| Trigger types | 6 | same 6 | same 6 | same 6 | OK |
| Step types | 15 incl. `owner_report` | 15 | 14, no `owner_report` | string | Type only |
| Recipe ids | 8 incl. `owner_weekly_report` | 8 | 7, no `owner_weekly_report` | 8 | Type only |
| Milestone kinds | 9 incl. `send_deferred`, `mailbox_disconnected` | 7 | none | none | API rejects PATCH/POST with the two new kinds; AUTOMATIONS.md lists 7 |
| Skip reasons | adds `config_missing` | | no label | | Run history shows no reason text |
| Run counts | adds `deferred` | | not typed | not typed | Deferred sends invisible in UI |
| Legacy `enabled` | `active === true && scheduleTime` | `isActiveSource` | `active !== false` | `active !== false` | A source with no `active` field looks on in the dashboard but never runs |
| Legacy `tz` | `"UTC"` (`recipes.ts:75`, being edited) | `"UTC"` (`model.ts:260`) | `"UTC"` | `ns.scheduleTimezone` (new, 09:12) | See L1 |
| Recipes response | `listRecipes` returns `[{ newsSourceId, recipes: RecipeDef[] }]` (RecipeDef has `enabledByDefault`, `summary`, `settings`, no `defaults`) | returns it as `{items}` unchanged | expects `{items: {id, trigger, steps, defaults}[]}` | not used | `POST /v1/automations {recipeId:"owner_weekly_report"}` searches the grouped list for `id` and answers 404 (`automationsV1Router.ts:331`). This is the "owner_weekly_report fails creation" bug |
| List | `{items, nextCursor:null}` | | reads `items` | | OK |
| Runs | engine caps `listRuns` at 50 (`engine.ts:363`) | asks for 200 and pages by offset | limit, cursor | limit | Pages past 50 never appear |
| Manual runs | stored under `manual_<newsSourceId>` (`engine.ts:325`) | records activity with `legacy_<nsId>` and returns `automationId: legacy_<nsId>` | | | Run history of the source schedule never shows Send now runs |
| Delete | no `deleteAutomation` export | `notifyEngineDeleted` is a no-op | | | Engine keeps the deleted automation until its 60 s refresh |
| Run of a stored automation | `runManual` always builds a `manual_*` automation from the source | `POST /v1/automations/:id/run` passes only `newsSourceId` | | | Settings of the stored automation (maxItemsPerRun, languages, quiet hours) are ignored on Run now |
| Socket `automation:run` | `onRunUpdate` | forwarded to room `configuratorId` (`socket/socketHandler.ts:33`) without previewHtml and step outputs | `RunSummary` | | OK |
| Socket `activity` | | never emitted | listened | | Live activity never arrives (feed reloads on page load only) |

## 5. Email templates (task 5)
All 12 templates read every variable through `__get(name, default)` and the engine renders in one pass (`helper/functionTemplateFile.ts` is single pass now, `engine/render/renderTemplate.ts`). No template can render `undefined` or throw for a missing variable.

| Template | Renderer | Passed | Missing optional values and effect |
|---|---|---|---|
| newsletterEmail.html | `engine/automations/pipeline.ts:283`, `engine/generateEmailContent.ts:61`, `API/v1/email/emailV1Router.ts` | article, unsubscribeLink, subscriber, leadLink, configuratorId, newsSourceId, configuratorName, content, config, newsSource, emailSignature, language, preheader (pipeline only) | unsubscribe link has no token (B4) |
| bare.html | pipeline.ts:239, emailSender.ts:161 | content (+ unused extras) | none |
| confirmationEmail.html | `db/newsletter/confirmationMailer.ts:68` | userName, confirmationLink (signed), origin, config, language | none |
| welcome.html | pipeline.ts:556 | config, language, first_name, company_name, company_logo_url, unsubscribe_url, unsubscribeLink, senderEmail, newsletterTitle | `latestUrl` (link to latest issue hidden) |
| newSubscriberOwner.html | pipeline.ts:634 | config, subscriberEmail, subscriberName, subscriberLanguage, confirmed, dashboardUrl, newsletterTitle | `totalSubscribers` |
| ownerWeeklyReport.html | pipeline.ts:674 | config, periodLabel, issuesSent, subscribersByLanguage, nextScheduled, dashboardUrl, settingsUrl | `newSubscribers`, `clicks` default to 0 and are printed as "0 New subscribers" and "0" clicks every week, `topLinks` hidden. Misleading numbers; WS8 doc says they are "left out". Fix: WS5 hides the tiles when the value is absent, or WS8 passes real values |
| authenticationCode.html | `API/v1/auth/authService.ts:95` | email, code | none |
| rejectionNotification.html | `engine/sendRejectionNotifications.ts:46` | userList | dashboardUrl |
| unsubscription.html | `API/newsletter/unsubscribeEndpoint.ts:75` | email, configId, newsSourceId, newsletterTitle | resubscribeLink, language |
| deletedUser.html | `API/newsletter/deleteSubscriberEndpoint.ts:20` | email | language |
| documentation.html | `API/docs/docsRouter.ts:72` | htmlContent | none |
| subscriptionNotification.html | nobody | | unused template |
| invitation.html | `API/v1/invitations/invitationsService.ts:167` expects it | | file does not exist; the built-in fallback body is used (not WS5 design, not translated by WS9) |

Links in owner emails: `engine/automations/pipeline.ts:632` and `engine/mail/gmail.ts:63` default `FRONTEND_URL` to `https://aibanewsletter.club`; `API/_lib/config.ts:117` defaults to `https://aiban.news`. Set `FRONTEND_URL` on Render or align the defaults (WS8).

## 6. Socket.IO (task 6)
| Event | Client (`src/lib/api/socket.ts`) | Server (`socket/*`) | Status |
|---|---|---|---|
| register | emits `{id, accessCode, token}` on every connect | accepts token, sessionToken, or id plus accessCode (`socketAuth.ts:33-37`); room = verified tenant id | OK. A revoked token is not retried with the code, so the socket stays silent until reload |
| ping, resetAck | emits | handled | OK |
| log, resetPage | listens | emits | OK |
| automation:run | listens | emits | OK |
| registered, error | not listened | emits | Harmless; client cannot show "not connected" after a failed register |
| activity, import:progress | listens | never emitted | Documented in API_CONTRACT section 6 but missing on the server |
Client connects only when `authCode` is stored (`SocketClient.svelte:16`, `connectSocket` needs `accessCode`); a session-only sign in would never connect.

## 7. Lesser mismatches
- L1. Time zones are mid-change. WS4 (09:12) now writes `scheduleTimezone` with a local-time cron and shows next runs in that zone; WS7 stores and validates `scheduleTimezone`; `engine/scheduleAllNewsSources.ts` comment says the engine reads it (`recipes.ts sourceTz`), but `engine/automations/recipes.ts:75` and `API/v1/automations/model.ts:260` still use `tz: "UTC"`. Until the engine uses it, an owner in Costa Rica who picks 8:00 gets the issue at 2:00 local. Verify once WS7/WS8 finish.
- L2. `src/lib/dashboard/data/activity.ts:223` maps `r.type === "send"` and `"subscriber"`, but /v1 types are `issue.sent`, `subscriber.added`; every live item gets kind `other` (wrong icon).
- L3. Activity, usage and onboarding helpers exist in `$lib/api` but `loadOnboarding`, `patchOnboarding`, `track`, `renderEmailPreview`, `listRecipes`, `createAutomation`, `onActivity`, `onRunUpdate` are not imported by any screen. The tutorial checklist and activation stay client side.
- L4. Session auth: when a stored session is rejected, `API/_lib/auth.ts:146` returns null without trying `x-auth-code`; the client drops the token on 401 but does not retry, so one request fails visibly before the code takes over.
- L5. `src/lib/api/automations.ts` `toggleAutomation` for legacy ids calls `PUT /news-source`, while `src/lib/dashboard/data/automations.ts:126` uses `saveToConfig` (whole config PUT) for the same thing. Two write paths for one switch; both work.
- L6. Secrets.svelte uses raw `fetch` without `res.ok` checks, so a 401 shows nothing.
- L7. `getPublicConfig` fallback calls `GET /config` with only `x-auth-email`; backend returns the public projection, fine, but it is cached 60 s by the browser.

## 8. API_CONTRACT.md vs code
- Section 3 "Known backend issues": `nextCursor` and `limit` are now handled (`automationsV1Router.ts:236-252`); `POST /v1/automations/:id/run` without a source now answers 400 instead of 502; the `owner_weekly_report` bug remains (root cause in section 4).
- Section 4: `/api/support` no longer 501, backend `/support` exists.
- Section 6: `activity` and `import:progress` are not emitted.
- Not documented: `/v1/mail/*` (MAIL_SETUP.md section 3, requested in requests/7.md), `/invitations`, `/public/*`, `/v1/subscribers*`, `/v1/privacy/*`, `/v1/sender/test`, `/newsletter/counts`, `/newsletter/deliveries`, `DELETE /news-source`, `scheduleTimezone` on news sources, `X-Next-Start-After` paging on `/newsletter/users`.
- AUTOMATIONS.md section 7 still documents un-versioned `/automations*` returning arrays; the frontend uses `/v1/*` returning `{items}`. Milestone list lacks the two new kinds; recipes shape differs from code.
