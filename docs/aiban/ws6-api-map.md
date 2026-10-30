# WS6 API map: frontend to backend (HTTP + socket.io)

Scope: every request from `some-awesome-newsletter/src` to the Deno/Express backend `ai-newsletter-translated` (base URL from `store.apiURL()`: `http://localhost:8000` when the page origin is localhost, else `https://ai-newsletter-translated.onrender.com`). Read-only audit; no code was changed.

Legend for "Auth" column:
- **authMw(true)**: `authMiddleware(true)` in `db/auth/isAuthenticated.ts`. Needs `x-auth-email` + `x-auth-code`. Missing: `401 {error:"Missing authentication headers, need x-auth-email and either x-auth-code"}`. Wrong: `403 {error:"Invalid authentication"}`.
- **authMw(false)**: same but optional; never rejects.
- **multiAuth**: `multiAuthMiddleware` in `db/auth/multiAuth.ts`. Accepts, in order: (1) `body.pass` equal to Firestore `system/secret.the_pass` (THE_PASS; any `x-auth-email` is then trusted), (2) `x-auth-email` + `x-auth-code`, (3) `Authorization: Bearer <apiKey>` bcrypt-checked against `configurations/{req.params.configId}.apiKeys[].hash`. Fails: `401 {error:"Unauthorized"}`; bad pass: `403 {error:"Invalid password."}`.
- **none**: no verification.
- **owner check**: handler compares `x-auth-email` to `:configId` / body email.

## 0. How auth headers are really verified

`getAuthHeaders()` (`src/components/systems/requests/getAuthHeaders.ts`) sends: `Accept`, `Content-Type: application/json`, `x-auth-email` (localStorage `configuratorEmail`), `x-auth-code` (`authCode`), `x-auth-token-id` (`tokenId`), `x-auth-client-id` (`clientId`), `x-user-language` (`lang`), `given_name`, `picture` (or `config.logo`). Values are JSON-parsed from localStorage; a missing value becomes `null` and fetch serializes it as the string `"null"`.

Server side:
- Only `x-auth-email` + `x-auth-code` are ever verified, by `isAuthenticated(email, code)`: Firestore `authCodes/{email}.code === code`. Code is either the 6-digit emailed code or the Google `sub`.
- `x-auth-token-id` / `x-auth-client-id` are used only in `postConfigDocument` (on config creation): if both present and not `"null"`, Google ID token is verified and `payload.email === x-auth-email` is required, then `authCodes/{email}` is written with `{code: sub, tokenId, clientId}`.
- `x-user-language`, `given_name`, `picture` are never read by the backend (one commented-out read in `triggerNewsSourceSendEndpoint.ts:43`). They add header weight; `given_name` with characters outside ISO-8859-1 (CJK, emoji) makes the browser `fetch` throw before sending, breaking every authenticated call for that user.
- Login: `POST /auth/:email` emails a code. `GET /auth/:email?code=X[&token_id=T&client_id=C]` validates. With `token_id`+`client_id` the Google token is verified against the **caller-supplied** audience and `authCodes/{email}` is overwritten with `sub` **without checking `payload.email === :email`** (see Security S1).
- Session cookie `user` (httpOnly) is set by `GET /auth/:email` but nothing on the backend reads it.
- No global Express error handler. Errors thrown inside `asyncHandler` fall through to Express default: `500` **HTML** page (not JSON).

## 1. Auth

| Frontend call (file:line) | Method + path | Headers | Body | FE uses | Backend handler | Auth | Success | Errors |
|---|---|---|---|---|---|---|---|---|
| `requests/askForNewAuthCode.ts:9` | POST `/auth/:email` | none | none | only `response.ok`; on ok sets `hasAuthCodeAskFailed: true` (inverted naming) | `API/auth/sendCodeToEmail.ts` | none (rate limit 5 per 10 min per email) | `200 {success:true,message:"Authentication code sent."}` | `400 {error}`, `429 {error, retryAfter}`, `500 {error:"Failed to format auth code."}` |
| `requests/askIsAuthCodeValid.ts:23` | GET `/auth/:email?code=&token_id=&client_id=` | none | none | `ok`; on fail reads `json.error` | `API/auth/verifyUserCode.ts` | validates code; Google path see S1 | `200 {success:true,message:"Authentication successful."}` + `user` cookie | `400 {error}`, `403 {error:"Invalid Google token."}`, `403 {error:"Invalid authentication code."}` |
| none | POST `/auth/legacy-proxy` | | | | `API/auth/legacyAuthProxy.ts` | | | **Not mounted** (authRouter does not register it; also references undefined `name`). Dead file. |
| `src/lib/api/auth.ts:23,44,67,88,105` | POST `/api/auth/google/start`, `/api/auth/magic-link`, `/api/auth/logout` (frontend origin) | | | | **none exist** (`src/routes/api` has only checkout, portal, webhook/polar); `lib/api/auth.ts` is imported by nothing | | | Dead / non-existent |

## 2. Config

| Frontend call | Method + path | Headers | Body | FE uses | Backend | Auth | Success | Errors |
|---|---|---|---|---|---|---|---|---|
| `requests/getConfiguratorSession.ts:16` (`getConfigFetchResponse`) | GET `/config` | getAuthHeaders | none | whole JSON saved as `store.config` | `API/configuration/getConfigurationEndpoint.ts` | **none**: config chosen by `x-auth-email` header only | `200` sanitized Config (removes `openAiApiKey`, `email.auth`, `email.host`, news source `openAiApiKey`, `email.auth.pass`). Still returns `apiKeys` hashes, `webhookSharedSecret`, `webhookUrl`, `subscribersIDs`, `tilopaySubscriptionId` | If doc missing, **creates a default config** for whatever email is in the header, then 200. Thrown errors: 500 HTML |
| `requests/getPublicConfig.ts:34` (used by `routes/subscribe/+page.svelte:48`, `widgets/Subscribe/stages/A_InitialParams.svelte:41`) | GET `/config?documentId=<configuratorId>` | `x-auth-email`/`x-auth-code` of the **visitor** | none | Config | same as above | none | | **Mismatch**: backend ignores `documentId`; returns the config of the visitor header email (or creates a config doc named `"undefined"`/`"null"` when visitor is anonymous). Should call `GET /public-config-info?configuratorId=&newsSourceId=` |
| `requests/createInitialConfiguratorConfig.ts:30` | POST `/config` | getAuthHeaders | `{newsletterSubject,newsletterTitle,senderName,emailSignature,pricingPlan:"free",vip:false}` | reads `{apiKey}` into `config.apiKeys` | `uploadConfigurationEndpoint.ts` | authMw(true) | `201 {apiKey, message}` | `403 {error:"Configuration already exists for this email"}`, `400 {error}`. In practice almost never reached since GET `/config` auto-creates |
| `requests/updateConfiguration.ts:23,56` | GET `/private-config?documentId=` | getAuthHeaders | | merged with patch | `privateConfigInfoEndpoint.ts` | authMw(true) (config from header, `documentId` ignored) | `200` **unsanitized** Config | `404 {error:"Configuration not found"}` |
| `requests/updateConfiguration.ts:35` | PUT `/config?documentId=` | getAuthHeaders | full merged Config | reads `json.config` | `updateConfigurationEndpoint.ts` | authMw(true) + owner | `200 {message, config}` | `400/403/404/500 {error}` |
| `inputs/Secrets/Secrets.svelte:119` | POST `/configurations/:configId/secret` | getAuthHeaders | none | reads `sharedSecret` (no `ok` check) | `generateSecretEndpoint.ts` | multiAuth, **no owner check** | `200 {sharedSecret}` | `404 {error}`, 401 |
| none | POST `/configurations/:configId/webhook` | | `{webhookUrl}` | | `storeWebhookEndpoint.ts` | multiAuth, no owner check | `200 {message}` | `400/404 {error}` |
| `requests/getNewsSourcesFromConfiguration.ts:8` (function unused) | GET `/configuration-news-sources?configId=` | getAuthHeaders | | array | `getAllConfigurationNewsSourcesEndpoint.ts` | authMw(false) (public) | `200 NewsSource[]` minus `subscribersIDs`, `openAiApiKey`, `email` | none (empty array) |
| none | GET `/public-config-info?configuratorId=&newsSourceId=` | | | | `publicConfigInfoEndpoint.ts` | none (read-only, fine) | `200 {newsletterTitle, senderName}` | `400/404/500 {error}` |
| none | GET `/all-configurations?limit=&offset=` | | | | `getAllConfigurationsEndpoint.ts` | **none** | `200 Config[]` of **every customer** (removes some fields, still includes emails, apiKeys hashes, webhook secrets, plan data) | 500 HTML |

## 3. News sources

| Frontend call | Method + path | Body | FE uses | Backend | Auth | Success | Errors |
|---|---|---|---|---|---|---|---|
| `requests/createNewsSource.ts:61` | POST `/news-source/:configId` | `{type,personality,community,country,scheduleTime,url,lead,linkSelector?}` | `json.newsSource` (+ `.id`) | `addNewsSourceEndpoint.ts` | authMw(true) + owner | `201 {message, newsSource}` (runs `triggerNewsSource` before responding, slow) | `400/403/404/500 {error}`; plan limit `403 {error}` |
| `requests/updateNewsSource.ts:18` | PUT `/news-source/:configId/:newsSourceId` | partial NewsSource | `json.newsSource` | `updateNewsSourceEndpoint.ts` | authMw(true) + owner | `200 {message, newsSource}` | `400/403/404 {error}` |
| `requests/generatePersonality.ts:14` | PUT `/news-source/personality/:configId/:newsSourceId` | `{rawContent}` | `json.newsSource`, `errorData.error` | `getPersonalityOutOfContentEndpoint.ts` | authMw(true) + owner | `200 {message, newsSource, personality}` | `400/403/404/500 {error}` |
| `requests/regenerateSelectors.ts:7` | PUT `/news-source/regenerate-selectors/:configId/:newsSourceId` | `{newsSourceUrl?}` | `json.newsSource` | `regenerateSelectorsEndpoint.ts` | authMw(true) + owner | `200 {message, newsSource}` | `400/403/404 {error}` |
| `requests/generateSelector.ts:6` | POST `/news-source/generate-selector/:configId` | `{url,lead,personality,scheduleTime}` | `json.selector` | `generateSelectorEndpoint.ts` | authMw(true) + owner | `200 {message, selector, newsSource}` | `400/403/404 {error}`, `500 {error}` |
| `NewFlow/Step08_Generate.svelte:50` | POST `/news-source/generate-newsletter` | `{newsSource:{url,lead,personality,linkSelector,includeImages}, language, config}` | `data.html`, `data.error` | `generateNewsletterEndpoint.ts` | authMw(true) | `200 {message, html}` | `400 {error}`, `500 {error}` |
| `requests/triggerNewsSourceSend.ts:28` | POST `/news-source/:configId/:newsSourceId/trigger` | none | `ok`; on error `throw JSON.parse(body).message` | `triggerNewsSourceSendEndpoint.ts` | authMw(true) + owner, rate limited | `202 {message}` (but awaits whole send before replying) | **mixed**: `403 {error}`, `429 {error,retryAfter}` (rate limit) vs `429 {message}` (already processing), `404 {message}` vs `404 {error}`, `500 {message}`. FE reads only `.message`, so 403/rate-limit errors surface as `undefined` |
| `requests/sendEmail.ts:20` | POST `/news-source/send-email` | `{html,subject,config,emails[]}` | ok / `error`/`message` | `sendEmailEndpoint.ts` | authMw(true), **no recipient or config restriction** | `200 {message}` | `400/500 {error}` |
| `requests/getUsersFromRawFileOrText.ts:38,55` | POST `/news-source/any-user-data-base-file-to-standard-format/:configId` | `{text}` | `response.json()` | `getAnyUserDataBaseFileToStandardFormatEndpoint.ts` | authMw(true), **no owner check** | streamed NDJSON lines `{type:"user",email}`, `{type:"error",message}`, `{type:"summary",addedCount}` | **Mismatch**: FE omits required `newsSourceId` (always `400 {error:"Missing 'newsSourceId' field."}`) and parses as a single JSON (would fail on NDJSON) |
| `requests/uploadUserFileChunked.ts:85` | same as above | `{text, newsSourceId}` per 500-row chunk | reads NDJSON stream | same | same | matches | |
| none | GET `/news-source/:configId/:newsSourceId` | | | `getNewsSourceEndpoint.ts` | **none** | `200` NewsSource | `400/404 {error}` |
| none | DELETE `/news-source/:configId/:newsSourceId` | | | `deleteNewsSourceEndpoint.ts` | authMw(true) + owner | `200 {message}` | `400/403/404 {error}`. No UI delete exists |
| `H_Dashboard/Newspaper/Newspaper.svelte:61,231`, `routes/articles/+page.svelte:69,271` | GET `/articles/:email?page=&lang=&newsSourceId=&size=` | no headers | `data.articles[lang].{withImages,withoutImages,total}` | `articlesEndpoints.ts:347` | **none** (public archive by email) | `200 {articles:{[lang]:{withImages,withoutImages,total}}}`; quota errors degrade to `200 {articles:{}}` | `500 {error}` |
| `Newspaper.svelte:149`, `routes/articles/+page.svelte:152` | GET `/articles/:email?search=&newsSourceId=` | none | NDJSON stream reader | same | none | NDJSON `application/x-ndjson`, one slim article per line | |
| `routes/articles/+page.svelte:239`, `routes/article/+page.svelte:18` | GET `/article/:id` | none | article JSON | `articlesEndpoints.ts:437` | none | `200` Article | `404 {error}`, `503 {error}` |

## 4. Subscribers / newsletter users

| Frontend call | Method + path | Headers | Body | FE uses | Backend | Auth | Success | Errors |
|---|---|---|---|---|---|---|---|---|
| `requests/addNewsletterUserEndpoint.ts:36` (from createNewsSource, postSubscriber) | POST `/users/:configId/:newsSourceId` | getAuthHeaders or `Bearer apiKey` | NewsletterUser `{email,name,bio,language,countryOfResidence,newsSourcesConfigTuples}` | `json.message`, compared to `"User added successfully."` | `addNewsletterUserEndpoint.ts` | multiAuth, **no owner check** for header auth | `201 {message:"User added successfully."}` | `403 {error}` (plan limit); FE reads `errorResponse.message` so the plan-limit text is lost |
| `routes/subscribe-widget/subscribe/+server.ts:35` (SvelteKit server, aiban.news/localhost origin) | POST `/users/:configuratorId/:newsSourceId` | `x-auth-email: configuratorId` | `{email,name,pass:THE_PASS}` | proxies JSON + status | same | multiAuth via THE_PASS | 201 | `pass` is not stripped and `addNewsletterUser` saves `...userDataToSave`, so THE_PASS is very likely persisted into the `newsletterUsers` doc |
| `subscribe-widget/subscribe/+server.ts:49` | GET `/config` | `x-auth-email: configuratorId` (no code) | (sends a body on GET) | reads `webhookUrl`, `webhookSharedSecret` | getConfigurationEndpoint | none | | Works only because GET `/config` is unauthenticated; leaks the secret to anyone |
| `subscribe-widget/subscribe/+server.ts:98` | POST `/users/:configuratorId/:newsSourceId` | `Bearer apiKey` from client webhook | `{email,name}` | | same | multiAuth Bearer | 201 | `errorData.error` |
| `subscribe-widget/subscribe/+server.ts:118` | POST `/api/newsletter-subscribe` | none | `{email,configuratorId,newsSourceId,planId:"newsletter",interval:"monthly"}` | `billingData.url` -> `paymentUrl` | `billing/newsletterBillingRouter.ts` | **none** | `200 {success:true,url}` | `400 {error}` / `400 {success:false,details}` / `500 {success:false,error}` |
| `requests/subscribeNewsletterUser.ts:10` | POST `/subscribe` | getAuthHeaders | `{configId,newsSourceId,email}` | `ok` | `subscribeEndpoint.ts` | authMw(true) + `x-auth-email === body.email` | `200 {message, scheduledTimeCronJob}` | `400/403 {error}` |
| `requests/getAllSubscribersFromConfigEndpoint.ts:34` (only referenced in a comment) | GET `/config-subscribers/:configId` | getAuthHeaders | | `Record<newsSourceId, NewsletterUser[]>` | `getAllSubscribersFromConfigEndpoint.ts` | authMw(true) + owner | `200 {[nsId]: User[]}` | `403/404/500 {error}` |
| `requests/getNewsletterUsersByNewsSource.ts:40` | GET `/newsletter/users/:configId/:newsSourceId?limit=&startAfter=` | getAuthHeaders | | `User[]` | `getNewsletterUsersByNewsSourceEndpoint.ts` (router at `/newsletter/users`) | multiAuth, **no owner check** | `200 User[]` (`limit`/`startAfter` ignored) | `400 {message}`, `500 {message}` (FE reads `.error`) |
| `requests/searchNewsletterUser.ts:30` (function unused) | GET `/newsletter/search?email=` or `?name=` | getAuthHeaders | | `User[]` | `searchUsersEndpoint.ts` | multiAuth (config = `x-auth-email`) | `200 User[]` | `400/500 {message}` |
| `requests/sendCustomContent.ts:34` | POST `/newsletter/send-custom-content` | getAuthHeaders | `{configId,newsSourceId,content}` | ok / 202 | `sendCustomContentEndpoint.ts` | authMw(true) + owner | `202 {message}` | mixed: `400/403/404 {error}`, `404/429/500 {message}` |
| `requests/submitPublicSubscription.ts:34` (function unused) and `widgets/Subscribe/stages/C_ConfirmAndSubscribe.svelte:87` (default endpoint `/public-subscribe`) | POST `/public-subscribe` | Content-Type only | `{configuratorId,newsSourceId,email,name,language,countryOfResidence,bio}` | `errorData.message` | `publicSubscriptionEndpoint.ts` | none (intended) | `200 {success:true,message}` | `400/403/404/500 {error}`; FE reads `.message`, so all errors show the status text |
| `requests/unsubscribeUserToConfigNewsSource.ts:52` | GET `/unsubscribe/:email?configId=&newsSourceId=` | Accept | | ok | `unsubscribeEndpoint.ts` | **none**, mutating via GET, no signed token | `200` HTML page | `400 {error}` |
| `routes/confirm-subscription/+page.svelte:30` | GET `/confirm-subscription?configId=&newsSourceId=&userEmail=` | none | | `data.message` / `data.error` | `confirmSubscriptionEndpoint.ts` | **none**, mutating via GET | `200 {message}` | `400/404/500 {error}` |
| none | GET `/users/:email` | | | | `getSubscriberEndpoint.ts` | authMw + self | User | `403 {error}` |
| none | PUT `/subscriber/:email` | | | | `updateSubscriberInfoEndpoint.ts` | authMw + self | `200 {message}` | `403 {error}` |
| none | DELETE `/delete-user/:email` | | | | `deleteSubscriberEndpoint.ts` | authMw + self | `200` HTML | `403 {error}` |
| none | GET `/segmented-subscribers/:configId` | | | | `getSegmentedSubscribersEndpoint.ts` | multiAuth, no owner check | `200` grouped users | `404/500 {error}` |
| `inputs/Secrets/Secrets.svelte:133` | GET `/apikeys/:configId` | getAuthHeaders | | `apiKeys` | `apiKeyEndpoint.ts:98` | authMw + owner | `200 {apiKeys:[{hash,createdAt}]}` | `403 {error}` |
| `Secrets.svelte:141` | POST `/apikeys/:configId` | getAuthHeaders | none | `apiKey` | `apiKeyEndpoint.ts:27` | authMw + owner | `201 {apiKey,message}` | `403 {error}` |
| `Secrets.svelte:149` | DELETE `/apikeys/:configId/:hash` | getAuthHeaders | | ignored | `apiKeyEndpoint.ts:58` | authMw + owner | `200 {message}` | `403/404 {error}` |
| `H_Dashboard/NewsSource/PostExplanation.svelte:94` | code sample string shown to users | | | | POST `/users/:configId/:newsSourceId` with Bearer | | | Sample reads `result.message` on error; backend sends `{error}` |

## 5. Leads

| Frontend call | Method + path | FE uses | Backend | Auth | Success | Errors |
|---|---|---|---|---|---|---|
| `requests/getLeadsForConfigurator.ts:6` | GET `/leads/:configuratorId` (getAuthHeaders) | whole object or null | `leads/allLeadCountersFromOneConfiguratorIdEndpoint.ts` | authMw(true); owner check only compares `config.email.senderEmail` and loads **all configurations** per request | `200 {[configuratorId]: leadsObj}` | `400/403 {error}` |
| `StepsTowardsSubscribe/stages/D_Subscribed.svelte:25` (navigation) | GET `/lead-counter?leadUrl=&configuratorId=&newsSourceId=&newsletterUserId=` | browser redirect | `leads/addLeadCountEndpoint.ts` | **none**, mutating GET, **open redirect** to any `leadUrl` | `302` to leadUrl | `400/500 {error}` |
| none | GET `/leads/:configuratorId/:newsSourceId/:newsletterUserId` | | `specificUserLeadsGetterEndpoint.ts` | authMw + owner | `200` leads | `400/403/404 {error}` |

## 6. Billing (mounted under `/api`, before global `express.json`, each route has its own parser)

| Frontend call | Method + path | Headers / body | FE uses | Backend | Auth | Success | Errors |
|---|---|---|---|---|---|---|---|
| `H_Dashboard/Billing/Billing.svelte:111` | POST `/api/subscribe` | `x-auth-email` only; `{planId,interval,user_id,currency,...billingInfo}` | `result.success && result.url`, `result.details?.message \|\| result.error` | `billing/billingRouter.ts:82` | **only presence of `x-auth-email`** (no code check) | `200 {success:true,url}` | `401 {error}`, `400 {error}` (bad plan), `400 {success:false,details}`, `500 {success:false,error}` |
| `src/lib/ui/organisms/Pricing.svelte:43` | POST `/api/subscribe` | no auth header; `{planName,amount,userId,currency}` | `result.data.payment_url` | same | | | **Mismatch**: no `x-auth-email` (always 401), sends `planName` not `planId`, reads `data.payment_url` instead of `url`. Never works |
| `Billing.svelte:148` | POST `/api/cancel-subscription` | `x-auth-email` only | `result.success`, `result.error` | `billingRouter.ts:167` | **only presence of `x-auth-email`**: anyone can cancel anyone's plan | `200 {success,message}` | `400/401/500 {error}` |
| none (Tilopay) | POST `/api/webhook-success`, `/api/webhook-cancel-subscription`, `/api/webhook-rejected`, `/api/webhook-reactivate-subscription` | urlencoded | | billingRouter | **none, no signature**: `code=1` + base64 `returnData` upgrades any email to any plan (`master` also sets `vip`) | `200 "OK"` text | |
| none (redirects) | GET `/api/payment-success`, `/api/payment-cancel` | | | billingRouter | none | 302 to `https://aiban.news/dashboard?...` | |
| none | POST `/api/newsletter-cancel-subscription` | `{email,configuratorId,newsSourceId}` | | newsletterBillingRouter | **none** | `200 {success,message}` | `400/404/500 {error}` |
| none (Tilopay) | POST `/api/newsletter-webhook-success`, `/api/newsletter-webhook-cancel`; GET `/api/newsletter-payment-success` | | | newsletterBillingRouter | none, unsigned | `200 "OK"` / 302 | |
| `src/routes/api/checkout`, `portal`, `webhook/polar` | SvelteKit Polar routes, not backend | | | | | | Parallel billing stack (Polar sandbox in `src/lib/polar.ts`) alongside Tilopay backend |

## 7. Misc

| Frontend call | Method + path | Backend | Auth | Response |
|---|---|---|---|---|
| `requests/getGeoIpLanguage.ts:11` | GET `/geo` | `geos/geosRouter.ts` | none | `{language}` from `Accept-Language` (not IP based) |
| none | GET `/docs/*`, `/PRIVACY_POLICY`, `/LICENSE`, `/README` | `docs/docsRouter.ts` | none | HTML or `404 "File not found"` text |
| `routes/oauth/+server.js:13` | Google userinfo, not backend | | | |
| `SVG.svelte:30`, `GlobalData/localSessionFallbackFetch.ts:88` | generic fetch utilities (fallback fetch has no callers) | | | |

## 8. Socket.io

Server: `main.ts` creates `SocketIOServer(server, {path:"/socket-io", cors:{origin:"*"}})`; handlers in `socket/socketHandler.ts`, registry `socket/socketIdRegistry.ts`, emitter `socket/socketLogger.ts`.
Client: `src/components/SocketClient.svelte` connects `io(apiURL(), {path:"/socket-io"})` once `isAuthCodeValid && configuratorEmail && authCode`. Only `Step08_Generate.svelte` and others consume `latestMessage` store.

| Event | Direction | Payload | Notes |
|---|---|---|---|
| `register` | client -> server | `{id: configuratorEmail, accessCode: authCode}` | Server calls `registerID(id, accessCode)` **before** `isAccessAllowed(id, accessCode)`, so the check always passes. Never compared to Firestore `authCodes`. Anyone can join any email's room, read its logs and kick the real session (single socket per id) |
| `log` | server -> client | `string` | Emitted by `socketLogger.log(msg, roomId)` to room `id`; also "Access denied", "Session replaced due to new connection.", "Disconnected due to inactivity." FE puts it in `latestMessage` |
| `resetPage` | server -> client | none | After 15 min without `ping`/`resetAck`. FE replies `resetAck` but does not reset anything |
| `resetAck` | client -> server | none | Clears 10 s disconnect timer |
| `ping` | client -> server | none | Every 5 min; resets inactivity timer. Name collides with socket.io reserved heartbeat naming in some versions; works in v4 but better renamed |
| `connect` / `disconnect` | built-in | | |

## 9. Flags

### Mismatches
1. `getPublicConfig` -> GET `/config?documentId=` ignores `documentId`; use `/public-config-info`.
2. `getUsersFromRawFileOrText` omits `newsSourceId` and expects JSON; backend requires it and streams NDJSON.
3. `Pricing.svelte` -> `/api/subscribe` wrong body keys (`planName`), no `x-auth-email`, reads `data.payment_url` (backend returns `url`).
4. Error key drift: FE reads `.message` where backend sends `.error` (addNewsletterUser plan limit, public-subscribe, triggerNewsSourceSend 403/429, PostExplanation sample) and `.error` where backend sends `.message` (getNewsletterUsersByNewsSource, searchNewsletterUser).
5. `getNewsletterUsersByNewsSource` sends `limit`/`startAfter`; backend ignores them (no pagination).
6. `triggerNewsSourceSend` documented as async 202 but backend awaits the full send.
7. `askForNewAuthCode` sets `hasAuthCodeAskFailed: true` on success.
8. `src/lib/api/auth.ts` targets `/api/auth/*` routes that do not exist anywhere.

### Backend endpoints with no frontend caller
`POST /auth/legacy-proxy` (not even mounted), `GET /all-configurations`, `GET /public-config-info`, `POST /configurations/:configId/webhook`, `GET /news-source/:configId/:newsSourceId`, `DELETE /news-source/:configId/:newsSourceId`, `GET /users/:email`, `PUT /subscriber/:email`, `DELETE /delete-user/:email`, `GET /segmented-subscribers/:configId` (external API), `GET /leads/:c/:ns/:u`, `POST /api/newsletter-cancel-subscription`, all `/api/*webhook*` and `/api/*payment-*` (Tilopay external). Frontend request helpers with no caller: `getAllSubscribersFromConfigEndpoint`, `getNewsSourcesFromConfiguration`, `postSubscriber`, `searchNewsletterUser`, `submitPublicSubscription`.

### Unauthenticated or weakly authenticated mutating endpoints (security)
- S1 `GET /auth/:email?code=x&token_id=T&client_id=C`: any valid Google ID token (any audience, since client chooses `client_id`) overwrites `authCodes/{email}` for an arbitrary email, then authenticates. Account takeover.
- S2 `GET /config`: no auth; reads any config by header and creates configs for arbitrary emails; leaks `webhookSharedSecret`, apiKey hashes, `subscribersIDs`.
- S3 `GET /all-configurations`: no auth; dumps every customer config.
- S4 `POST /api/cancel-subscription`, `POST /api/subscribe`: trust bare `x-auth-email`.
- S5 Tilopay webhooks `/api/webhook-*`, `/api/newsletter-webhook-*`: unsigned; free plan upgrades.
- S6 `POST /api/newsletter-cancel-subscription`, `POST /api/newsletter-subscribe`: no auth.
- S7 multiAuth routes lack owner checks: `POST /users/:configId/:nsId`, `GET /newsletter/users/:configId/:nsId`, `POST /configurations/:configId/secret`, `POST /configurations/:configId/webhook`, `GET /segmented-subscribers/:configId`. Also authMw route `POST /news-source/any-user-data-base-file-to-standard-format/:configId` has no owner check.
- S8 `POST /news-source/send-email`: any logged-in user sends arbitrary HTML to arbitrary recipients, with a client-supplied `config` feeding `getMailConfigPack`.
- S9 Mutating GETs without signed tokens: `/unsubscribe/:email`, `/confirm-subscription`, `/lead-counter` (also open redirect).
- S10 Socket `register` always accepted (see section 8).
- S11 THE_PASS is sent from the SvelteKit server in request bodies and likely stored in newsletter user docs.
- S12 `main.ts` raw request logger logs all headers, including `x-auth-code` and Bearer API keys, on every request.

### Error shape inventory (backend)
- Dominant: `{error: string}` with 400/401/403/404/429/500.
- Also `{message: string}` for errors in `getNewsletterUsersByNewsSourceEndpoint`, `searchUsersEndpoint`, `sendCustomContentEndpoint` (404/429/500), `triggerNewsSourceSendEndpoint` (404/429/500).
- `{error, retryAfter}` for rate limits (`/auth/:email`, trigger).
- Billing: `{success:false, error}` or `{success:false, details}`.
- Plain text: `"OK"` (webhooks), `"File not found"` (docs).
- HTML: unhandled exceptions (Express default 500 page), `/unsubscribe` and `/delete-user` success pages.
- Streams: NDJSON lines `{type:"error", message}` inside a 200 response for the user import endpoint.

## 10. Existing automation / activity / usage / preview / onboarding endpoints

None. Grep of `API/`, `engine/`, `helper/`, `db/` for automation, activity, usage, preview, onboarding finds only incidental strings: `generateNewsletterEndpoint.ts` uses `"preview-config-id"`/`"preview@example.com"` placeholders (so `POST /news-source/generate-newsletter` is the de facto preview endpoint), and comments in `triggerNewsSourceSendEndpoint.ts`, `rateLimiter.ts`, `scheduleTasks.ts`, `getSmtpConfig.ts`. Plan limits live in `helper/checkActionLimit.ts` (`PLAN_CONFIG.plans[].limits {newsSources, users}`) and are enforced in add news source, add user, public subscribe, and trigger; there is no endpoint exposing current usage vs limits. Scheduling is cron in-process (`engine/scheduleAllNewsSources.ts`, only when `APP_ENV=production`); no endpoint lists scheduled runs or history. Socket `log` messages are the only activity feed and are not persisted.
