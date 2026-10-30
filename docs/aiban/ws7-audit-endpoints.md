# AIBAN backend: endpoint audit

Scope: `/home/claude/be` (Deno + Express 4.18 + Socket.IO, Firestore REST). Frontend callers: `/home/claude/fe/src`. Read-only review, 2026-10-30.

Legend:
- **Auth**: `auth` = `authMiddleware(true)` (x-auth-email + x-auth-code checked against `authCodes/{email}`), `auth?` = `authMiddleware(false)`, `multi` = `multiAuthMiddleware` (body `pass` = system secret, OR email+code, OR `Bearer` API key bound to `:configId`), `hdr` = trusts `x-auth-email` header with no code check, `none` = public.
- **Tenant**: `Y` means `:configId` / tenant id is compared to the authenticated email. `N` means it is not. `self` means the endpoint only uses the header email. `n/a` means there is no tenant id.
- **RL**: rate limit. Only 2 routes have one, and it is in memory and per instance.
- **FS**: the Firestore access pattern. `R`/`W` = document read/write, `Q` = runQuery, `L` = collection list.

## 1. Endpoint table

| # | Method + path | File | Auth | Tenant | Input validation | Errors / status | RL | Firestore pattern | FE caller → fields read |
|---|---|---|---|---|---|---|---|---|---|
| 1 | POST `/auth/:email` | API/auth/sendCodeToEmail.ts:25 | none | n/a | none (`:email` is not validated as an email) | 400, 429, 200; send errors swallowed | 5/10 min per raw email string (case variants bypass) | R authCodes, W authCodes (PATCH with no mask, overwrites) | requests/askForNewAuthCode.ts → `ok` only |
| 2 | GET `/auth/:email?code&token_id&client_id` | API/auth/verifyUserCode.ts:19 | none | n/a | presence only | 400, 403, 200 + unused `user` cookie | **none** (OTP brute force possible) | (Google path: W authCodes) + R authCodes | requests/askIsAuthCodeValid.ts → `ok`, `error` |
| 3 | POST `/api/subscribe` | API/billing/billingRouter.ts:82 | hdr | self (spoofable) | plan key lookup | 401, 400, 500 with `error.message` | none | R configurations | H_Dashboard/Billing/Billing.svelte:111, lib/ui/organisms/Pricing.svelte:43 → `success`, `url`, `details.message`, `error` |
| 4 | POST `/api/cancel-subscription` | billingRouter.ts:167 | hdr | self (spoofable) | none | 401, 400, 500 | none | R + (broken) create configurations | Billing.svelte:148 → `success`, `error` |
| 5 | POST `/api/webhook-success?name&type` | billingRouter.ts:212 | none (no signature) | n/a | none; `name` used as plan id | always 200 | none | R + POST-create configurations (409, so a silent no-op) | Tilopay |
| 6 | POST `/api/webhook-cancel-subscription` | billingRouter.ts:240 | none | n/a | none | 200 | none | same as #5 | Tilopay |
| 7 | POST `/api/webhook-rejected` | billingRouter.ts:258 | none | n/a | none | 200 | none | none | Tilopay |
| 8 | POST `/api/webhook-reactivate-subscription` | billingRouter.ts:265 | none | n/a | none | 200 (errors swallowed by `catch(e){}`) | none | same as #5 | Tilopay |
| 9 | GET `/api/payment-success`, `/api/payment-cancel` | billingRouter.ts:285,289 | none | n/a | n/a | 302 | none | none | Tilopay redirect |
| 10 | POST `/api/newsletter-subscribe` | API/billing/newsletterBillingRouter.ts:110 | none | N | presence | 400, 500 with `error.message` | none | none (Tilopay call, $0.00) | routes/subscribe-widget/subscribe/+server.ts:118 → `success`, `url` |
| 11 | POST `/api/newsletter-cancel-subscription` | newsletterBillingRouter.ts:212 | **none** | N | presence | 400, 404, 500 | none | R newsletterUsers, PATCH subscriptions | none |
| 12 | POST `/api/newsletter-webhook-success` | newsletterBillingRouter.ts:264 | none (no signature) | n/a | none | 200 | none | R + PATCH newsletterUsers | Tilopay |
| 13 | POST `/api/newsletter-webhook-cancel` | newsletterBillingRouter.ts:294 | none | n/a | none | 200 | none | R + PATCH newsletterUsers | Tilopay |
| 14 | GET `/api/newsletter-payment-success` | newsletterBillingRouter.ts:320 | none | n/a | none; query echoed into the redirect | 302 | none | none | Tilopay redirect |
| 15 | ANY `/docs*`, `/README`, `/LICENSE`, `/PRIVACY_POLICY` | API/docs/docsRouter.ts:6 | none | n/a | **none; path traversal** | 404 or 500 (unhandled throw) | none | none (`Deno.readTextFile`) | none |
| 16 | POST `/config` | API/configuration/uploadConfigurationEndpoint.ts:22 | auth | self | none; `req.body` spread into the config | 403 (exists), 201 | none | R + POST-create configurations | requests/createInitialConfiguratorConfig.ts → `apiKey` |
| 17 | GET `/config` (`?documentId` ignored) | API/configuration/getConfigurationEndpoint.ts:11 | **none** (uses the header email) | spoofable | none | 200; **creates a default config for any header value** | none | R configurations (+ POST-create) | getConfiguratorSession.ts:16 → whole config stored; getPublicConfig.ts:34 → whole config; subscribe-widget/+server.ts:49 → `webhookUrl`, `webhookSharedSecret` |
| 18 | PUT `/config` (`?documentId` ignored) | API/configuration/updateConfigurationEndpoint.ts:15 | auth | self (check at :59 is tautological) | non-empty object only; **mass assignment** | 404, 400, 500, 200 `{message, config}` (returns secrets) | none | R + PATCH all keys (`newsSources` replaced wholesale) | requests/updateConfiguration.ts:35 → `config` |
| 19 | GET `/all-configurations?limit&offset` | API/configuration/getAllConfigurationsEndpoint.ts:6 | **none** | n/a | Number() | 200; 500 if any config has no `email` (`delete config.email.auth`) | none | **L entire collection** (offset sliced client side) | none |
| 20 | GET `/configuration-news-sources?configId` | API/configuration/getAllConfigurationNewsSourcesEndpoint.ts:8 | auth? | N | none (defaults to `defaultConfig`) | 200 `[]` | none | R configurations | requests/getNewsSourcesFromConfiguration.ts → array of news sources |
| 21 | GET `/public-config-info` | API/configuration/publicConfigInfoEndpoint.ts:8 | none | n/a (public) | type checks | 400, 404, 500 | none | R configurations | none |
| 22 | GET `/private-config` | API/configuration/privateConfigInfoEndpoint.ts:6 | auth | self | none | 404, 200 **raw config incl. secrets** | none | R configurations | requests/updateConfiguration.ts:23 → whole object merged and PUT back |
| 23 | POST `/configurations/:configId/secret` | API/configuration/generateSecretEndpoint.ts:11 | multi | **N** | none | 404, 200 `{sharedSecret}` | none | R + PATCH full config (`put`) | inputs/Secrets/Secrets.svelte:119 → `sharedSecret` |
| 24 | POST `/configurations/:configId/webhook` | API/configuration/storeWebhookEndpoint.ts:9 | multi | **N** | string check only (no URL/host allow-list) | 400, 404, 200 | none | R + PATCH full config | none |
| 25 | GET `/lead-counter?configuratorId&newsSourceId&newsletterUserId&leadUrl` | API/leads/addLeadCountEndpoint.ts:32 | none | n/a | presence | 400, 500, **302 to any `leadUrl` (open redirect)** | none | R + PATCH whole `leads/{cfg}` doc with no mask (read-modify-write race, unbounded doc) | engine/generateEmailContent.ts:57 (email links), StepsTowardsSubscribe/stages/D_Subscribed.svelte:25 |
| 26 | GET `/leads/:configuratorId` | API/leads/allLeadCountersFromOneConfiguratorIdEndpoint.ts:13 | auth | **weak** (compares `email.senderEmail`; allows when the config is not found) | none | 400, 403, 200 | none | **L entire configurations collection per call** + R leads | requests/getLeadsForConfigurator.ts → whole object keyed by configuratorId |
| 27 | GET `/leads/:cfg/:ns/:user` | API/leads/specificUserLeadsGetterEndpoint.ts:22 | auth | weak (same as #26) | none | 400, 403, 404, 200 | none | L entire configurations + R leads | none |
| 28 | POST `/news-source/any-user-data-base-file-to-standard-format/:configId` | API/newsSource/getAnyUserDataBaseFileToStandardFormatEndpoint.ts:12 | auth | **N** | `text`, `newsSourceId` presence; no size cap (100 MB body) | 400; NDJSON stream with `{type:user|summary|error}` | none | **N+1**: per row, `addNewsletterUser` does about 2 R config + 2 R user + 1-2 PATCH + R system + 1 SMTP send, sequentially | requests/uploadUserFileChunked.ts → NDJSON `type`, `email`, `addedCount`, `message`; requests/getUsersFromRawFileOrText.ts (sends no `newsSourceId`, so always 400, and parses NDJSON as JSON) |
| 29 | PUT `/news-source/personality/:configId/:newsSourceId` | API/newsSource/getPersonalityOutOfContentEndpoint.ts:109 | auth | Y (after reading the config) | none on the body (mass assignment into the news source) | 400, 403, 404, 500 with message | none | R + PATCH newsSources; LLM call | requests/generatePersonality.ts → `newsSource` (incl. secrets) |
| 30 | PUT `/news-source/regenerate-selectors/:configId/:newsSourceId` | API/newsSource/regenerateSelectorsEndpoint.ts:47 | auth | Y (after the read) | URL parse | 400, 403, 404, unhandled 500 | none | R + PATCH newsSources; LLM + scrape | requests/regenerateSelectors.ts → `newsSource` |
| 31 | POST `/news-source/generate-selector/:configId` | API/newsSource/generateSelectorEndpoint.ts:21 | auth | Y | `url` presence | 400, 403, 404, 500 with message | none | R configurations; LLM + scrape (SSRF) | requests/generateSelector.ts → `selector` |
| 32 | POST `/news-source/generate-newsletter` | API/newsSource/generateNewsletterEndpoint.ts:10 | auth | n/a (**`config` taken from the body**) | presence | 400, 500 | **none** | none; scrape + LLM on the system key | NewFlow/Step08_Generate.svelte:50 → `html`, `error` |
| 33 | POST `/news-source/send-email` | API/newsSource/sendEmailEndpoint.ts:10 | auth | n/a | `emails` is a non-empty array; **no cap, no recipient check** | 400, 500 with message | **none** | R system config; N SMTP sends | requests/sendEmail.ts → `ok`, `error` |
| 34 | POST `/news-source/:configId` | API/newsSource/addNewsSourceEndpoint.ts:211 | auth | Y | type/url/scheduleTime presence, URL parse | 400, 403, 404, 500, 201 | none (but triggers a full send synchronously) | R config, `put` config, PATCH config, `addNewsletterUser`, R config, full `triggerNewsSource` (Q subscribers + LLM + SMTP) in the request | requests/createNewsSource.ts → `newsSource`, `newsSource.id`, `error` |
| 35 | GET `/news-source/:configId/:newsSourceId` | API/newsSource/getNewsSourceEndpoint.ts:10 | none | n/a | presence | 404, 200 (personality, email host/sender) | none | R configurations | none |
| 36 | PUT `/news-source/:configId/:newsSourceId` | API/newsSource/updateNewsSourceEndpoint.ts:19 | auth | Y (after the read) | blocks only `id`, `type`, `subscribersIDs`; an invalid `scheduleTime` is saved as `""` | 400, 403, 404, 200 | none | R + PATCH newsSources | requests/updateNewsSource.ts → `newsSource` |
| 37 | DELETE `/news-source/:configId/:newsSourceId` | API/newsSource/deleteNewsSourceEndpoint.ts:12 | auth | Y (but 403 if the config has no `email`) | presence | 403, 404, 200 | none | R + PATCH newsSources | none found in FE |
| 38 | POST `/news-source/:configId/:newsSourceId/trigger` | API/newsSource/triggerNewsSourceSendEndpoint.ts:36 | auth | Y | presence | 400, 403, 404, 429, 500 with message, 202 (only after the whole send finishes) | 3/5 min per source + in-process `Set` | R config, Q all subscribers, PATCH full config | requests/triggerNewsSourceSend.ts → `ok`, `message` |
| 39 | GET `/articles/:email?search&newsSourceId&lang&size&page&maxHits` | API/newsSource/articlesEndpoints.ts:346 | none (public archive) | n/a | `size` and `maxHits` not clamped | 200 (degrades to `{articles:{}}`), 500 | none | **loads the entire corpus with offset pagination (Firestore bills skipped docs: about N²/200 reads per miss)**; unbounded in-memory cache | routes/articles/+page.svelte:69,152,271, H_Dashboard/Newspaper/Newspaper.svelte:61,149,231 → `articles[lang].withImages/withoutImages/total`; NDJSON `id,title,imageUrl,excerpt,language,newsSourceId,creation` |
| 40 | GET `/article/:id` | articlesEndpoints.ts:436 | none | n/a | none | 503, 404, 200 | none | R articles (cached 4 h) | routes/articles/+page.svelte:239, routes/article/+page.svelte:18 → `title`, `content`, `language`, `creation` |
| 41 | POST `/subscribe` | API/newsletter/subscribeEndpoint.ts:7 | auth | self (body email = header email); no check that cfg/ns exist | presence | 400, 403, 500 (user not found becomes a thrown error) | none | R + PATCH newsletterUsers | requests/subscribeNewsletterUser.ts → `ok` |
| 42 | GET `/unsubscribe/:email?configId&newsSourceId` | API/newsletter/unsubscribeEndpoint.ts:8 | **none, no signed token** | n/a | email regex | 400, 500 (user missing), 200 HTML | none | R + PATCH newsletterUsers | email footer link; requests/unsubscribeUserToConfigNewsSource.ts (dashboard) → `ok` |
| 43 | GET `/users/:email` | API/newsletter/getSubscriberEndpoint.ts:7 | auth | self | none | 403, 200 | none | R newsletterUsers | none |
| 44 | POST `/users/:configId/:newsSourceId` | API/newsletter/addNewsletterUserEndpoint.ts:11 | multi | **N for email+code and `pass`**; Y for Bearer | `validateUser` (email, lang); **body persisted verbatim (incl. `pass`, `subscriptions`)** | 403 (plan), 201, 500 | none | R config, Q up to 1000 subscribers just to count, then `addNewsletterUser` (about 6 ops + SMTP) | requests/addNewsletterUserEndpoint.ts → `message`; subscribe-widget/+server.ts:35,98 (sends `pass: THE_PASS`); PostExplanation.svelte snippet (Bearer) |
| 45 | DELETE `/delete-user/:email` | API/newsletter/deleteSubscriberEndpoint.ts:8 | auth | self | email regex | 403, 200 HTML | none | DELETE newsletterUsers (leaves subscription state in other docs) | none |
| 46 | PUT `/subscriber/:email` | API/newsletter/updateSubscriberInfoEndpoint.ts:7 | auth | self | email/lang only; **can write `subscriptions` (paid plan / accepted)** | 403, 200 | none | PATCH newsletterUsers | none |
| 47 | GET `/config-subscribers/:configId` | API/newsletter/getAllSubscribersFromConfigEndpoint.ts:15 | auth | Y | none | 403, 404, 500, 200 `{[nsId]: NewsletterUser[]}` (full docs incl. `pass`, `subscriptions`) | none | R config + **N+1: one Q per news source, each up to 1000 docs; anything past 1000 is silently truncated** | requests/getAllSubscribersFromConfigEndpoint.ts → `Record<nsId, NewsletterUser[]>` |
| 48 | POST `/public-subscribe` | API/newsletter/publicSubscriptionEndpoint.ts:16 | none | n/a | email/lang; **`name` and `bio` free text (template injection)** | 400, 404, 403, 500 | **none, no captcha** | R config, Q up to 1000 subscribers to count, `addNewsletterUser` (about 6 ops + SMTP) | requests/submitPublicSubscription.ts → `ok`; widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte:87 → `message` |
| 49 | POST `/newsletter/send-custom-content` | API/newsletter/sendCustomContentEndpoint.ts:15 | auth | Y | content is a non-empty string (no size cap) | 400, 403, 404, 429, 500, 202 | per-source cron interval (timestamp written before the send) | R + PATCH full config; background fan-out | requests/sendCustomContent.ts → `ok`, `message` |
| 50 | POST `/apikeys/:configId` | API/newsletter/apiKeyEndpoint.ts:27 | auth | Y | none | 403, 201 `{apiKey}` | none | R + PATCH full config (lost-update race) | inputs/Secrets/Secrets.svelte:141 → `apiKey` |
| 51 | DELETE `/apikeys/:configId/:apiKeyHash` | apiKeyEndpoint.ts:58 | auth | Y | none | 200 even when not found | none | R + PATCH full config | Secrets.svelte:149 |
| 52 | GET `/apikeys/:configId` | apiKeyEndpoint.ts:98 | auth | Y | none | 200 `{apiKeys:[{hash,createdAt}]}` | none | R configurations | Secrets.svelte:133 → `apiKeys` |
| 53 | GET `/segmented-subscribers/:configId` | API/newsletter/getSegmentedSubscribersEndpoint.ts:12 | multi | **N for email+code and `pass`** | none | 404, 500, 200 `{[cfg]:{[ns]:email[]}}` | none | R config + N+1 Q per news source | none |
| 54 | GET `/confirm-subscription?configId&newsSourceId&userEmail` | API/newsletter/confirmSubscriptionEndpoint.ts:11 | **none, no token** | n/a | presence; cfg/ns existence not checked | 400, 404, 500, 200 | none | R + PATCH subscriptions (overwrites the entry and drops `pricingPlan` / `tilopaySubscriptionId`) | routes/confirm-subscription/+page.svelte:30 → `message`, `error` |
| 55 | GET `/newsletter/users/:configId/:newsSourceId` | API/newsletter/getNewsletterUsersByNewsSourceEndpoint.ts:9 | multi | **N for email+code and `pass`** | `limit` / `startAfter` sent by FE are **ignored** | 400, 500, 200 full user docs | none | Q up to 1000 (silent truncation) | requests/getNewsletterUsersByNewsSource.ts → `NewsletterUser[]` |
| 56 | GET `/newsletter/search?email|name` | API/newsletter/searchUsersEndpoint.ts:11 | multi | self (header email; the Bearer path has no `:configId`, so it returns 500) | presence | 400, 500, 200 | none | Q newsletterUsers by `email` field (**field is never written for users created since the 404 change; see P1-6**) or exact `name`, no limit, filtered in memory | requests/searchNewsletterUser.ts → `NewsletterUser[]` |
| 57 | GET `/geo` | API/geos/geosRouter.ts:4 | none | n/a | n/a | 200 `{language}` | none | none | requests/getGeoIpLanguage.ts → `language` |
| 58 | WS `/socket-io` event `register {id, accessCode}` | socket/socketHandler.ts:23 | **none** (`registerID` runs before `isAccessAllowed`, so access is always allowed) | N | none | emits `log` | none | none | dashboard log stream |
| - | POST `/auth/legacy-proxy` | API/auth/legacyAuthProxy.ts | not registered (dead code; references an undefined `name`) | | | | | | none |

## 2. Findings

### P0: security, data leak, money

**P0-1. Unauthenticated remote code execution through double template evaluation.**
- Where: `helper/functionTemplateFile.ts:78-81`.
- Failure: the template is rendered with `new Function` (a `` `...` `` literal evaluated inside `with(context)`), and then **the output is rendered again**. Any user data in pass 1 that contains `${...}` runs as JS on pass 2.
- Unauthenticated triggers:
  - `POST /auth/%24%7BDeno.env.toObject()%7D@x.io` → `sendCodeToEmail.ts:102` → `authenticationCode.html:102 ${email}`.
  - `POST /public-subscribe` with `name:"${...}"` → `addNewsletterUser.ts:148/227` → `confirmationEmail.html:90`.
  - Scraped article HTML or LLM output → `engine/generateEmailContent.ts:59`.
  - Doc files → `docsRouter.ts:52`.
- Impact: the process runs with `--allow-net --allow-env --allow-read` (Dockerfile). That exposes every env secret (Firestore service account, Tilopay, OpenAI, SMTP) and the full database.
- Fix: render once, HTML-escape every interpolated value, and replace `new Function` with a real escaping template engine (e.g. eta or handlebars with auto-escape).

**P0-2. Account takeover through Google ID tokens from any client.**
- Where: `API/auth/verifyUserCode.ts:31-50` and `helper/verifyGoogleIdToken.ts:10-13`.
- Failure: `client_id` (the audience) comes from the request, and `payload.email` is never compared with `:email`. An attacker mints an ID token for their own Google account with any OAuth client and calls `GET /auth/victim@x.com?code=x&token_id=T&client_id=<attacker aud>`. The server writes `authCodes/victim = attacker sub`, and the attacker is now authenticated as the victim on every endpoint.
- Fix: pin the audience to the server's own `GOOGLE_CLIENT_ID`, and require `payload.email_verified && payload.email.toLowerCase() === email.toLowerCase()`.

**P0-3. The auth credential is a static, non-secret value.**
- Where:
  - `authCodes.code` is either a 6-digit `Math.random` OTP (`helper/generateCode.ts:5`) that **never expires** and has no verify rate limit (`verifyUserCode.ts`), or the Google `sub` (`db/configuration/postConfigDocument.ts:56`, `fe/src/routes/oauth/+server.js:53`).
  - `isAuthenticated.ts:37` compares it as a bearer token on every request.
- Failure:
  - About 10^6 guesses brute-force any email-code account.
  - The Google `sub` is the same for every OAuth client and is not secret, so any third-party app the victim has signed into can log in as them.
  - `POST /auth/:email` overwrites the code, so anyone can repeatedly log any user out.
- Fix:
  - Issue short-lived, hashed, single-use OTPs (10 min, 5 attempts).
  - After verification, issue an opaque session token: random 256 bits, stored hashed, with expiry and rotation, sent as an httpOnly cookie or `Authorization` header.
  - Never use `sub` as a credential.

**P0-4. Plan and limit bypass through mass assignment on `PUT /config`.**
- Where: `updateConfigurationEndpoint.ts:114-165`.
- Failure: any top-level key from the body is written, including `pricingPlan`, `vip`, `apiKeys`, `webhookSharedSecret` and `tilopaySubscriptionId`. `newsSources` replaces the array with no `checkActionLimit`. The FE already sends the full merged config (`fe/.../updateConfiguration.ts:30`), so `{pricingPlan:"vipfree"}` gives unlimited usage for free.
- Fix: use an allow-list schema (zod) of user-editable fields. Billing fields are writable only by verified webhooks. News sources go only through the `/news-source` routes.

**P0-5. Public secret disclosure across tenants.**
- `GET /config` (`getConfigurationEndpoint.ts:11-47`) has no auth and uses whatever `x-auth-email` is sent. It strips only `openAiApiKey`, `email.auth`, `email.host` and `ns.email.auth.pass`. It leaks:
  - top-level `appPassword` / `emailMaskSender` (SMTP credentials)
  - `webhookSharedSecret`, `webhookPassword`, `webhookGroups[].password`
  - `newsSources[].appPassword`, `apiKeys[].hash`, `tilopaySubscriptionId`
- `GET /all-configurations` (`getAllConfigurationsEndpoint.ts:6-33`) leaks the same for **every tenant**, plus every tenant's email.
- `GET /configuration-news-sources` (`getAllConfigurationNewsSourcesEndpoint.ts:22-25`) leaks `newsSources[].appPassword` / `emailMaskSender`.
- The FE subscribe widget depends on the `GET /config` leak to read `webhookSharedSecret` (`subscribe-widget/subscribe/+server.ts:49-64`).
- Fix:
  - Require `auth` on `/config` and return a DTO built from an allow-list.
  - Delete `/all-configurations`, or make it admin-only and paginated.
  - Move the widget's webhook signing to the backend.

**P0-6. Arbitrary file read through docs path traversal.**
- Where: `API/docs/docsRouter.ts:9-11`.
- Failure: Express 4 does not normalize `req.path`, so `GET /docs/../../../../proc/self/environ` (sent with curl `--path-as-is`) gives `Deno.readTextFile("docs/../../../../proc/self/environ")` and returns the env secrets as HTML. Any file under `--allow-read` can be read the same way. Combined with P0-1, a file containing `${` also executes.
- Fix: resolve the path and check that it stays under the absolute `docs/` root, or serve a static allow-list.

**P0-7. Cross-tenant subscriber PII dump and list injection.**
- `multiAuthMiddleware` never binds email+code or `pass` callers to `:configId` (`db/auth/multiAuth.ts:37-53`). Any signed-up user can therefore:
  - read any tenant's full subscriber list: `GET /newsletter/users/:cfg/:ns` (`getNewsletterUsersByNewsSourceEndpoint.ts:9`) and `GET /segmented-subscribers/:cfg` (`getSegmentedSubscribersEndpoint.ts:12`)
  - add any email to any tenant (which sends confirmation mail from that tenant's SMTP): `POST /users/:cfg/:ns` (`addNewsletterUserEndpoint.ts:11`)
  - overwrite another tenant's webhook URL (send their subscriber webhooks to an attacker / SSRF) and rotate their secret: `POST /configurations/:cfg/webhook` and `/secret` (`storeWebhookEndpoint.ts:9`, `generateSecretEndpoint.ts:11`)
- `POST /news-source/any-user-data-base-file-to-standard-format/:configId` uses `authMiddleware` but has no `configId === email` check (`getAnyUserDataBaseFileToStandardFormatEndpoint.ts:12-17`).
- Fix: in `multiAuth`, set `req.tenantId` from the verified identity. For email+code, require `params.configId === email`. Restrict `pass` to an explicit allow-list of routes, and bind `req.tenantId = params.configId` only there.

**P0-8. System secret persisted into user records and returned to tenants.**
- Where: `addNewsletterUserEndpoint.ts:57` passes `req.body` straight to `addNewsletterUser`. The widget sends `{email, name, pass: THE_PASS}` (`fe/src/routes/subscribe-widget/subscribe/+server.ts:18-22`), so `pass` is stored on every widget-created `newsletterUsers` doc.
- Failure: those docs come back in full from `/config-subscribers` and `/newsletter/users`, so any tenant can read the system secret. The system secret then authenticates `multiAuth` for every tenant.
- Fix: whitelist user fields (email, name, bio, language, countryOfResidence), strip `pass` in the middleware, rotate `system/secret.the_pass` now, and project the response fields.

**P0-9. Open mail relay.**
- Where: `POST /news-source/send-email` (`sendEmailEndpoint.ts:14-39`).
- Failure: any account (self-signup) can send arbitrary HTML and subject to an unbounded `emails[]` through the system SMTP identity. `config` is client-supplied, and no rate limit applies. This enables phishing and spam from the aiban domain, which burns the domain's reputation.
- Fix: limit recipients to the caller's own email (test send), load the config server-side, and add per-user quotas.

**P0-10. Unauthenticated billing actions.**
- `POST /api/newsletter-cancel-subscription` (`newsletterBillingRouter.ts:212-250`) takes `email` from the body with no auth. Anyone can cancel any reader's real Tilopay subscription.
- `POST /api/cancel-subscription` and `/api/subscribe` (`billingRouter.ts:84,169`) trust the `x-auth-email` header with no code check. (The cancel is currently a no-op only because of P1-1.)
- All Tilopay webhooks (`billingRouter.ts:212-280`, `newsletterBillingRouter.ts:264-315`) have no signature or shared-secret check and accept `returnData` (base64, unsigned) plus `?name=` (any plan id, e.g. `vipfree`). `POST /api/newsletter-webhook-success` works today; the SaaS one will work once P1-1 is fixed.
- Fix:
  - Put `authMiddleware` on the user-action routes.
  - Verify webhooks: HMAC or Tilopay's hash, plus a server-side order lookup that confirms amount, plan and email. Map the plan from a stored `orderNumber`, never from a query string.

**P0-11. Unauthenticated Socket.IO room hijack.**
- Where: `socket/socketIdRegistry.ts:4-10` and `socketHandler.ts:25-27`. `registerID(id, accessCode)` runs before the check, so `register({id:"victim@x.com"})` always succeeds.
- Failure: the attacker receives the victim's server log stream (per-tenant logs from `socket/socketLogger.ts`, which include URLs, selectors and subscriber emails) and disconnects the victim's session.
- Fix: authenticate the socket handshake with the session token, and set `id` from the verified identity.

**P0-12. Credentials written to logs.**
- `main.ts:49` logs every request's headers (`x-auth-code`, `Authorization: Bearer <apiKey>`).
- `isAuthenticated.ts:65` logs the code.
- `sendCodeToEmail.ts:62,67,105` log the codes.
- `getSystemConfig.ts:31-39` logs the SMTP `appPassword`.
- `getFallBackAuth.ts:164,168,173` log full config objects with secrets.
- `db/put.ts:52-56` logs the full Firestore response.
- `triggerNewsSource.ts:15-16` logs the whole config JSON.
- FE `subscribe-widget/+server.ts:24` logs `THE_PASS`.
- Fix: remove these logs, add a redacting logger, and rotate the affected secrets.

### P1: correctness

**P1-1. Paid SaaS upgrades never persist.**
- Where: `billingRouter.ts:72` calls `postConfigDocument`, which POSTs to `configurations?documentId=` (Firestore create, `postConfigDocument.ts:38,75`). The doc already exists, so the call returns 409, and `fetchWithAuth` returns 409 without throwing (`helper/fetchWithAuth.ts:25`).
- Failure: the plan, `vip` and `tilopaySubscriptionId` are never written. Customers pay and stay on free, and cancellation can never find a subscription id.
- Fix: PATCH with an `updateMask` of `pricingPlan, billingInterval, vip, tilopaySubscriptionId`, and check `response.ok`.

**P1-2. `fetchWithAuth` returns 404/409 as success, so callers' 404 branches are dead code.**
- `addNewsletterUser.ts:55-77` always sets `userExists = true`, so the create path, the `welcomeEmailSent` path and the stored `email` field never run. That breaks `/newsletter/search?email=` (P1-6) and makes every add a read-merge-PATCH.
- `addLeadCountEndpoint.ts:53-69` and the leads getters have the same dead branches.
- Fix: return a typed `{status, json}` and branch on `status === 404` everywhere.

**P1-3. Leads authorization is wrong.**
- Where: `allLeadCountersFromOneConfiguratorIdEndpoint.ts:27-41` and `specificUserLeadsGetterEndpoint.ts:36-50`.
- Failure:
  - They list the whole configurations collection without following `nextPageToken`. When the config is not found on the first page, or `email` is missing, access is **allowed**.
  - They compare `email.senderEmail` instead of the doc id, so owners who change their sender address get a 403.
  - Each call costs reads proportional to the number of tenants.
- Fix: `if (configuratorId !== req.userEmail) return 403`, then do a single `R leads/{id}`.

**P1-4. Crons are scheduled only at boot, and only for the first page of configs.**
- Where: `main.ts` uses `getAllConfigurationsDocuments()` without pagination. Nothing calls `scheduleNewsSource` from `POST /news-source/:configId`, from config creation, or when a source is reactivated (polling stops on inactive: `engine/scheduleAllNewsSources.ts:211-215`).
- Failure: new tenants and new sources get no newsletters until the server restarts.
- Fix: run a central scheduler that loads due sources from Firestore (a `nextRunAt` field) every minute, or call `scheduleNewsSource` from the add/update/activate endpoints.

**P1-5. Firestore quota burn.**
- Each active source polls `getConfigDocument` every 60 s (`scheduleAllNewsSources.ts:166`), which is about 1,440 reads per source per day. 35 sources exceed the 50k free reads per day; this matches the circuit-breaker and 429 handling in the code.
- `/articles` offset pagination costs about N²/200 reads per cache miss (2,000 articles ≈ 21k reads; `articlesEndpoints.ts:236-244,312-324`).
- `/public-subscribe` and `POST /users` read up to 1,000 subscriber docs just to count them (`publicSubscriptionEndpoint.ts:60`, `addNewsletterUserEndpoint.ts:26`).
- `/config-subscribers` and `/segmented-subscribers` run an N+1 query per news source.
- Fix:
  - Poll on a version field or listen for changes, or remove polling (see P1-4).
  - Use cursor pagination (`startAfter`) with `orderBy creation desc`, and page in Firestore instead of loading the whole corpus.
  - Count with `runAggregationQuery COUNT`, or keep a `subscriberCount` counter per source.
  - Use a single query with `IN` over source ids, paginated.

**P1-6. Subscriber search is broken.**
- `getNewsletterUserByEmail.ts:10` queries field `email`, which is not stored (P1-2), and `.newsSourcesConfigTuples.some` throws when the field is missing.
- Name search is exact-match only and unbounded (`getNewsletterUsersByName.ts:10`).
- Fix: look up the doc id directly (`GET newsletterUsers/{email}`) and check the tuple. For names, store `nameLower` and use a prefix range query with a limit.

**P1-7. Subscriber lists are silently truncated at 1,000.**
- Where: `getNewsletterUsersByNewsSource.ts:11`. The endpoint ignores the FE's `limit` and `startAfter` (`getNewsletterUsersByNewsSourceEndpoint.ts:23`).
- Failure: the dashboard and `/config-subscribers` show at most 1,000 per source, and the plan-limit count stops at 1,000.
- Fix: pass `limit` / `startAfter` through and return `{users, nextCursor}`.

**P1-8. Double opt-in and unsubscribe can be forged.**
- `/confirm-subscription` (`confirmSubscriptionEndpoint.ts:11-53`) and `/unsubscribe/:email` (`unsubscribeEndpoint.ts:8-24`) take an email with no signed token.
- Failure: anyone can subscribe or confirm a victim to any list (GDPR / CAN-SPAM exposure, spam complaints), or unsubscribe any reader. Confirm also overwrites `pricingPlan` and `tilopaySubscriptionId` for paid subscriptions.
- Fix: HMAC-signed tokens `(email, cfg, ns, action, exp)` in the links. Merge into the existing entry instead of replacing it. Support RFC 8058 one-click unsubscribe via POST.

**P1-9. Paid newsletters are not enforced.**
- `isPaidNewsletter` and `subscriptions[cfg][ns].pricingPlan` are never read by the engine (grep shows no use in `engine/`).
- `PUT /subscriber/:email` lets a reader write their own `subscriptions` (`updateSubscriberInfoEndpoint.ts:23-30`).
- Fix: allow-list subscriber fields, and gate sends on the paid status inside `processUserGroup*`.

**P1-10. Lead tracking.**
- `/lead-counter` is an open redirect (`addLeadCountEndpoint.ts:114`).
- It rewrites the whole doc with PATCH and no mask (`:101-107`), so concurrent clicks lose writes.
- The single `leads/{cfg}` doc grows without bound. At 1 MiB, writes fail with an error, and every tracked link in that tenant's newsletters then breaks. Anyone can force this by spamming the endpoint.
- Subscriber emails appear in the URL query (`generateEmailContent.ts:57`), and `leadUrl` is not URL-encoded.
- Fix: append to a `leads/{cfg}/clicks` subcollection (auto-id docs) or use `FieldValue` increments. Redirect only to URLs present in the sent newsletter (signed `leadUrl`). Use an opaque subscriber id.

**P1-11. `GET /config` writes data.**
- Where: `getConfigurationEndpoint.ts:24-28`.
- Failure: a request with no or a fake header creates a config doc. FE `getPublicConfig` sends `x-auth-email: undefined`, which creates `configurations/undefined` or serves `defaultConfig`. The FE `/subscribe` page and `A_InitialParams.svelte:41` read the *visitor's* config instead of the newsletter's, because `?documentId` is ignored.
- Fix: make GET read-only. Have the public pages use `/public-config-info`, extended with the logo, colors and title they need.

**P1-12. Synchronous long jobs inside HTTP requests.**
- `POST /news-source/:configId` runs a full `triggerNewsSource` (scrape + LLM + email all subscribers) before responding (`addNewsSourceEndpoint.ts:184`).
- `/trigger` returns 202 only after the whole send completes (`triggerNewsSourceSendEndpoint.ts:140-150`).
- Failure: Render's 100 s proxy timeout produces client errors and duplicate retries.
- Fix: enqueue the job, return 202 with a `jobId`, and stream progress on the authenticated socket.

**P1-13. `authMiddleware(false)` sets `req.userEmail` even when the code is invalid.**
- Where: `isAuthenticated.ts:76-83`.
- Failure: any future optional-auth route would trust a spoofed email.
- Fix: set `req.userEmail` only when `valid` is true.

**P1-14. LLM cost and SSRF exposure.**
- `generate-newsletter` (system OpenAI key, client-supplied `config`, no RL), `generate-selector`, `personality` and `add news source` (`fetch(lead)` at `addNewsSourceEndpoint.ts:47`) fetch arbitrary URLs from the server, including internal and metadata addresses.
- Fix: per-tenant LLM quotas tied to the plan, a URL allow-list (http/https, public IPs only, resolved before fetch), and the config loaded server-side.

**P1-15. `getMailConfigPack` can stop the server.**
- Where: `helper/getMailConfigPack.ts:22` calls `Deno.exit(1)` on an incomplete email config, which kills the server for every tenant.
- Fix: throw instead.

**P1-16. `/all-configurations` crashes on a single bad config.**
- Where: `getAllConfigurationsEndpoint.ts:17`. Any config without `email` throws a TypeError, so the endpoint returns 500 for everyone (in addition to P0-5).

**P1-17. Invalid `scheduleTime` is saved silently.**
- Where: `updateNewsSourceEndpoint.ts:86-99`. An invalid value becomes `cron=""`, and the source silently stops sending. The 400 is missing.

**P1-18. Lost updates and an unsafe merge.**
- `apikeys`, `secret`, `webhook`, `send-custom-content` and `triggerNewsSource` all do a read, modify the full config, then PATCH every key (`put` / `updateConfigDocument` with a mask of all keys). Concurrent dashboard edits overwrite each other; for example, a trigger's `lastManualSendTimestamp` write reverts a just-saved PUT.
- Fix: PATCH only the changed field paths, and use a Firestore `currentDocument.updateTime` precondition.

### P2: quality

- **P2-1. No global error handler.** asyncHandler errors reach Express's default handler. Under Deno `NODE_ENV` is unset, so responses include HTML stack traces. Many routes also echo `error.message` (`sendEmailEndpoint.ts:49`, `triggerNewsSourceSendEndpoint.ts:158`, `billingRouter.ts:160`). Add a final `(err, req, res, next)` that returns `{error:{code,message}}` with a request id.
- **P2-2. Inconsistent response shapes.** Errors come back as `error`, `message` or `details` (FE parses all three), and successes are a bare array, `{newsSource}` or `{config}`. Standardize on `{data}` / `{error:{code,message}}`.
- **P2-3. No input schema anywhere.** Add zod per route; `zod` is already in deno.json and unused.
- **P2-4. Global body limit.** `express.json({limit:'100mb'})` applies globally (`main.ts:58`). Set 100 kB by default and raise it only on the import route.
- **P2-5. CORS.** `cors()` and Socket.IO allow every origin (`main.ts:39,55`). Restrict to `https://aiban.news` and `www`, plus localhost in dev.
- **P2-6. Codes in URLs.** The auth code travels in the query string (`GET /auth/:email?code=`), where it is logged by proxies. Use POST.
- **P2-7. Dead code.** `legacyAuthProxy.ts` (unregistered, references an undefined `name`), `helper/requireUser.ts` (unused), the `user` cookie set by `verifyUserCode` (never read), the `getNewsletterUsersBatch` import, and FE `getUsersFromRawFileOrText.ts` (always 400: it omits `newsSourceId` and parses NDJSON as JSON).
- **P2-8. Duplicated code.** `getTilopayToken` and the plan tables are duplicated across the two billing routers, and they differ from FE `plans.config.ts` and `helper/checkActionLimit.ts` `PLAN_CONFIG`. Use a single source of truth.
- **P2-9. Hard-coded URLs.** `BASE_URL` and `FRONTEND_URL` are hard-coded (`billingRouter.ts:11-12`, `generateNewsletterEndpoint.ts:86`, confirmation links in `addNewsletterUser.ts:147`). Move them to env.
- **P2-10. Rate limiter.** The limiter is in memory, so it resets on deploy and is per instance. Its key is the raw email (case variants bypass it). Add IP-based limits and normalize email case.
- **P2-11. Unbounded caches.** The `/articles` caches have no size bound or LRU (`articlesEndpoints.ts:38-42`).
- **P2-12. Minor public leaks.** `GET /news-source/:cfg/:ns` is public and leaks the personality prompt and SMTP host/sender. `/public-subscribe` 404s let anyone enumerate tenants.
- **P2-13. Shape mismatch.** FE `createInitialConfiguratorConfig.ts` stores the plaintext `apiKey` into `config.apiKeys` (backend shape `{hash,createdAt}[]`).
- **P2-14. Lockfile deleted.** The Dockerfile runs `rm -f deno.lock`, so builds are not reproducible; `https://deno.land/x/dotenv/load.ts` is unpinned (`main.ts:1`).
- **P2-15. Doubtful cancel API.** Cancellation calls Tilopay `deleteCoupon` (`billingRouter.ts:181`). Check that this really is the subscription-cancel API.

## 3. Frontend calls the backend does not serve, or serves differently

| FE call | FE file | Status |
|---|---|---|
| POST `/api/auth/google/start`, `/api/auth/google/start?mode=signup` | fe/src/lib/api/auth.ts:23,67 | Served by neither backend nor SvelteKit (no `fe/src/routes/api/auth/**`). The module is imported nowhere, so it is dead code. Real Google login uses the SvelteKit `routes/login/+page.server.js` → `routes/oauth/+server.js`. |
| POST `/api/auth/magic-link`, `?mode=signup` | fe/src/lib/api/auth.ts:44,88 | Not served anywhere; dead code. Email login uses backend `POST/GET /auth/:email`. |
| POST `/api/auth/logout` | fe/src/lib/api/auth.ts:105 | Not served anywhere. Logout is client-only (`requests/logout.ts` clears localStorage); no server-side session revocation exists. |
| GET `/config?documentId=<configuratorId>` | requests/getPublicConfig.ts:34 | Route exists but **ignores `documentId`**. It returns or creates the caller's own config (P1-11). |
| GET `/private-config?documentId=`, PUT `/config?documentId=` | requests/updateConfiguration.ts:21-22 | `documentId` is ignored (harmless; it uses the header). |
| GET `/newsletter/users/:cfg/:ns?limit&startAfter` | requests/getNewsletterUsersByNewsSource.ts:39 | `limit` and `startAfter` are ignored (P1-7). |
| POST `/news-source/any-user-data-base-file-to-standard-format/:cfg` without `newsSourceId` | requests/getUsersFromRawFileOrText.ts:38,55 | Always 400; the response is NDJSON, but the FE calls `.json()`. |
| POST `/subscribe-widget/subscribe` | widgets/Subscribe/stages/Confirmation.svelte:19, StepsTowardsSubscribe/stages/C_Language.svelte:26 | SvelteKit route (`fe/src/routes/subscribe-widget/subscribe/+server.ts`) that proxies to backend `POST /users/...` with `pass: THE_PASS`. `url.origin.includes("aiban.news")` is always true in production, so this is an **unauthenticated, unthrottled proxy that adds any email to any tenant** (feeds P0-7 and P0-8). |
| POST `/api/checkout`, `/api/portal`, `/api/webhook/polar` | fe/src/routes/api/** | SvelteKit-only Polar (sandbox) billing, parallel to the backend Tilopay billing. Two billing systems; Polar does not update the backend `pricingPlan`. |
| Backend routes with no FE caller | | `/all-configurations`, `/segmented-subscribers`, `/public-config-info`, GET `/news-source/:cfg/:ns`, GET `/users/:email`, PUT `/subscriber/:email`, DELETE `/delete-user/:email`, POST `/configurations/:cfg/webhook`, GET `/leads/:cfg/:ns/:user`, DELETE `/news-source/:cfg/:ns`, `/api/newsletter-cancel-subscription`. These are candidates for removal or for gating. |
