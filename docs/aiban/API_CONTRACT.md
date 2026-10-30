# AIBAN API contract (frontend <-> backend)

Shared by WS6 (frontend data layer) and WS7 (backend API). WS7 owns the backend sections and may edit any part; WS6 keeps the "Frontend client" sections current.
- Exact /v1 request and response types, error codes and backend helpers: `ws6-v1-map.md` (generated from the code on 2026-10-30).
- Legacy endpoints, payloads and old mismatches: `ws6-api-map.md`.

## 1. Authentication (decision by Luis, 2026-10-30)
No cookies. Every request carries the credential in a header over HTTPS.
1. Sign in: `POST /auth/:email` emails a code. `GET /auth/:email?code=` (or `token_id` + `client_id` for Google) returns `{ success, method, sessionToken, sessionExpiresAt }`.
2. The frontend stores `sessionToken` in localStorage and sends `Authorization: Bearer aiban_s_<token>` on every request (`$lib/api/credentials.ts`).
3. During the migration it also sends `x-auth-email` (several legacy routes read the tenant from it) and `x-auth-code` (accepted while the backend has `LEGACY_CODE_AUTH=true`).
4. A 401 drops the stored token; the next call falls back to the code. Sign out calls `POST /v1/auth/logout` to revoke the token.
5. Socket.IO `register` sends `{ id, accessCode, token }`.
6. Admin routes (`/v1/admin/*`, `GET /all-configurations`) answer only emails in the backend `ADMIN_EMAILS` env var; others get 404.

When every client sends the session token, WS7 can set `LEGACY_CODE_AUTH=false`.

## 2. Frontend client (WS6)
All calls go through `src/lib/api/client.ts` (`request`, `api.*`, `withFallback`, `readNdjson`, `newRequestId`).
- Base URL: `PUBLIC_API_URL`, else `http://localhost:8000` on localhost, else `https://ai-newsletter-translated.onrender.com`.
- Timeouts: 20 s default, 120 s for LLM calls, 5 min for legacy "send now".
- Retries: GET/HEAD, calls marked idempotent, and any call with `idempotencyKey` (sent as `Idempotency-Key`) retry twice on network errors, timeouts, 502/503/504 and short 429s, with backoff and jitter, honouring `Retry-After`.
- Errors: every failure is an `ApiError { status, code, userMessage, detail, retryAfter }`. Both envelopes are read: `/v1` `{ error: { code, message, details }, requestId }` and legacy `{ error: "message", code }`. /v1 messages are shown as written; legacy text only for 4xx sentences. `PLAN_LIMIT_REACHED` maps to `plan_limit`, `RATE_LIMITED` to `rate_limited` with `details.retryAfterSeconds`.

## 3. Endpoints the frontend uses
| Area | Helper | Endpoint | Fallback when 404 |
|---|---|---|---|
| Automations | `$lib/api/automations` `listAutomations`, `getAutomation`, `listRecipes`, `createAutomation`, `updateAutomation` (PATCH), `toggleAutomation`, `deleteAutomation`, `listRuns`, `runNow`, `runAutomation`, `onRunUpdate` | `/v1/automations*` | legacy automations derived from news sources; run now via the legacy trigger and custom content endpoints |
| Activity | `$lib/api/activity` `getActivityPage`, `getActivity`, `describeActivity`, `onActivity` | `GET /v1/activity` | built from automation runs |
| Usage | `$lib/api/usage` `getUsage`; store `$lib/stores/planUsage` | `GET /v1/usage` | computed from the store |
| Onboarding | `$lib/api/onboarding` `loadOnboarding`, `patchOnboarding`, `markStepDone`; `$lib/api/events` `track()` marks `preview_seen` and `widget_installed` | `GET/PATCH /v1/onboarding` | null (UI keeps its local checklist) |
| Email preview | `$lib/api/preview` `renderEmailPreview` (template), `renderPreview` (generate from a site) | `POST /v1/email/preview`, `POST /news-source/generate-newsletter` | none |
| Contacts import | `$lib/api/imports` `importContacts`, `importProgress` | legacy `POST /news-source/any-user-data-base-file-to-standard-format/:configId` (NDJSON) | none |
| Admin | `$lib/api/admin` | `/v1/admin/*` (section 5) | none |
| Everything else | `src/components/systems/requests/*` (legacy names kept) | legacy routes, see `ws6-api-map.md` | |

Known backend issues found while mapping (WS7, see requests/7.md): run history ignores `limit` and always returns `nextCursor: null`; `owner_weekly_report` recipe fails creation; `POST /v1/automations/:id/run` without a source returns 502.

## 4. SvelteKit server routes (WS6)
Payments are off (decision by Luis, 2026-10-30) and the app has no payment provider code; `features.payments` (`$lib/config/features.ts`, env `PUBLIC_PAYMENTS_ENABLED`) is false.

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| POST | `/subscribe-widget/subscribe` | none, rate limited | `{ email, configuratorId, newsSourceId, name?, language?, countryOfResidence? }` | 201 `{ success, message }`; 400, 404, 429, 502 `{ error }` |
| POST | `/api/support` | none, rate limited | HelpForm fields | `{ success, message }`; 501 until backend `/support` exists |
| POST | `/api/csp-report` | none | CSP report | 204 |

## 5. Admin API (written by WS6 for Luis: `API/v1/admin/adminV1Router.ts`, `API/_lib/admins.ts`)
Admins = emails in `ADMIN_EMAILS` (server bootstrap, always admin, cannot be removed from the UI) plus the list in Firestore `platform/admins` (`{ admins: [{ email, addedAt, addedBy }], updatedAt, updatedBy }`). On first read the server copies `ADMIN_EMAILS` into that document. `requireAdmin()` checks both (30 s cache). Everyone else gets 404. All routes are limited to 120 requests per minute. Every change is written to the `adminAudit` collection.

| Method | Path | Auth | Request | Response |
|---|---|---|---|---|
| GET | `/v1/admin/me` | owner | | `{ email, isAdmin }` (never 404, used by the UI gate) |
| GET | `/v1/admin/overview` | admin | | `{ tenants, sources, activeSources, paidSources, withOwnSender, byPlan, generatedAt }` |
| GET | `/v1/admin/tenants` | admin | `?q=&plan=&paid=true|false&limit=1..500&offset=&fresh=1` | `{ items: AdminTenant[], total, offset, limit }` (30 s cache unless `fresh`) |
| GET | `/v1/admin/tenants/:id` | admin | | `AdminTenant & { subscribersBySource, totalSubscribers, limits, thisMonth: { emailsSent, aiRuns } }` |
| PATCH | `/v1/admin/tenants/:id` | admin | `{ pricingPlan?, vip?, adminNote? }` | `AdminTenant`; 409 on concurrent change |
| PATCH | `/v1/admin/tenants/:id/news-sources/:nsId` | admin | `{ isPaidNewsletter?, active?, isPublic? }` | `AdminTenant`; 404, 409 |
| GET | `/v1/admin/admins` | admin | | `{ items: { email, addedAt, addedBy, source: "env"|"database" }[] }` |
| POST | `/v1/admin/admins` | admin | `{ email }` | 201 `{ items }`; 400 bad email, 409 already admin |
| DELETE | `/v1/admin/admins/:email` | admin | | `{ items }`; 409 yourself, a server (env) admin, or concurrent change; 404 unknown |
| GET | `/v1/admin/audit` | admin | `?limit=1..100&cursor=&tenantId=` | `{ items: { id, at, actor, action, tenantId?, newsSourceId?, target?, changes? }[], nextCursor }` newest first |

`AdminTenant = { id, senderName, newsletterTitle, plan: { id, name }, vip, newsSources: { id, url, active, isPublic, isPaidNewsletter, scheduleTime?, newsletterTitle? }[], sourceCount, activeSourceCount, paidSourceCount, hasOwnSender, createdAt?, updatedAt?, adminNote? }`. Secrets are never returned.

Paid newsletter flag: `configurations/{id}.newsSources[].isPaidNewsletter`, edited from `/admin`, public through `GET /public-config-info`. Nothing charges while payments are off.

Frontend: `/admin` (overview), `/admin/customers` (+ `/admin/customers/:id`), `/admin/newsletters`, `/admin/admins`, `/admin/activity` (change log). Client: `$lib/api/admin.ts`, shared state `$lib/admin/state.ts`.

## 6. Socket.IO
Path `/socket-io`. Client emits `register { id, accessCode, token }` on every connect and `ping` every 4 minutes. Client listens to `log`, `resetPage`, `automation:run` (run summary), `activity` (`{ id, type, data, createdAt }`), `import:progress`.


---
<!-- Sections 7 to 9 below are maintained by WS7. -->

## 7. Backend conventions (WS7)

- **Auth.** Owner routes accept a session token (`Authorization: Bearer aiban_s_...` or `x-auth-session`) or, while `LEGACY_CODE_AUTH=true`, `x-auth-email` + `x-auth-code`. The tenant is always taken from the verified identity, never from a header. A `:configId` that is not the caller's answers 403 (404 on /v1 resources to avoid id probing).
- **Errors.** /v1 paths: `{ "error": { "code", "message", "details"? }, "requestId" }`. Legacy paths: `{ "error": "sentence", "code", "requestId", "details"?, "retryAfter"? }`. Codes: BAD_REQUEST, VALIDATION_FAILED (`details.fields[] = {path, message}`), UNAUTHENTICATED, FORBIDDEN, NOT_FOUND, CONFLICT, IDEMPOTENCY_IN_PROGRESS, IDEMPOTENCY_KEY_REUSED, PAYLOAD_TOO_LARGE, RATE_LIMITED (`Retry-After` header), PLAN_LIMIT_REACHED (402 on /v1, 403 on legacy routes; `details = {limit, used, plan, resource, upgradeUrl}`), INVALID_SIGNATURE, UPSTREAM_FAILED, NOT_READY, NOT_IMPLEMENTED, INTERNAL. 500s never include internal messages. WS6 asked for lowercase codes (`plan_limit`); the backend sends the uppercase names above, map them in the client.
- **Pagination.** /v1 lists take `?limit=1..100&cursor=` and return `{ items, nextCursor }`. Cursors are opaque.
- **Idempotency.** Sends, runs and billing actions accept `Idempotency-Key` (8 to 200 chars). Same key and body: stored response replayed with `Idempotent-Replayed: true`. Same key, other body: 422. Still running: 409.
- **Rate limits.** In memory per process. Responses carry `RateLimit-Limit`, `RateLimit-Remaining`, `RateLimit-Reset`.
- **Request ids.** Every response has `X-Request-Id`; send your own (8 to 64 safe chars) to correlate.
- **CORS.** Public paths (subscribe, confirm, unsubscribe, archive, lead redirect, geo, health, `/v1/public/*`, `/public-config/*`, `/support`, API-key `/users`) allow any origin without credentials. Other paths allow only `CORS_ORIGINS` once it is set.
- **Body limits.** 1 MB by default; 10 MB on `/config`, `/news-source/*`, `/newsletter/send-custom-content`, `/v1/email/preview`.
- **Health.** `GET /healthz` (liveness) and `GET /readyz` (503 until started, while the database circuit is open, or while shutting down).

## 8. Endpoint reference (WS7)

### 8.1 Auth, sessions and sockets
Error shapes: legacy paths `{ error: "<message>", code, requestId, details? }`; /v1 paths `{ error: { code, message, details? }, requestId }`.

#### POST /auth/:email (changed)
- Auth: none.
- Params: `email` (trimmed, EMAIL_RE, max 254 chars). Case kept (it is the authCodes / tenant document id).
- Body: none.
- Response 200: `{ success: true, message: "Authentication code sent." }`. Same response whether or not the address exists, and for Google accounts (they get a "sign in with Google" email; the stored sub is never emailed). Never contains the code.
- Side effects: authCodes/{email} gets `otp: { otpHash: sha256("<lowercased email>:<code>"), otpExpiresAt: now+15 min (timestamp), otpAttempts: 0 }`, `codeIssuedAt`, and the legacy `code` (only while LEGACY_CODE_AUTH is true). Mail is sent fire-and-forget; SMTP errors are logged, not returned.
- Errors: 400 BAD_REQUEST (invalid email); 429 RATE_LIMITED (5 per normalized email or 20 per IP per 10 min).

#### GET /auth/:email (changed)
- Auth: none.
- Query: `code` (6 digit OTP, or legacy code/Google sub), optional `token_id` (Google ID token) and `client_id` (ignored when GOOGLE_CLIENT_IDS/SECRET_CLIENT_ID are configured).
- Response 200: `{ success: true, message: "Authentication successful.", method: "otp"|"legacy-code"|"google", sessionToken: "aiban_s_...", sessionExpiresAt: ISO }` (method, sessionToken, sessionExpiresAt are new). The unsigned `user` cookie is no longer set.
- Google path: token audience must be a configured client id; `email_verified` must be true and token email must equal :email (case-insensitive), else 403. On success stores `googleLinkedAt` and (legacy mode) `code = sub`. An expired or unverifiable token falls back to checking `code` as a normal code.
- Code path: live OTP (not expired) is accepted once and then removed; while LEGACY_CODE_AUTH is on the permanent `code` field is also accepted. An unconsumed OTP that matches but is expired is refused even if equal to the legacy code.
- Errors: 400 BAD_REQUEST (invalid email, missing code); 403 FORBIDDEN (wrong code, `details.attemptsLeft`; expired code, `details.reason="code_expired"`; Google email mismatch, `details.reason="google_email_mismatch"`; invalid Google token with no code); 429 RATE_LIMITED (20 per email and IP pair or 60 per IP per 15 min; after 5 wrong codes further wrong guesses get `details.reason="too_many_attempts"` until a new code is requested, while the correct code keeps working so a stranger cannot lock the owner out).

#### POST /v1/auth/logout (new)
- Auth: optional; revokes the session token sent as `Authorization: Bearer aiban_s_...` or `x-auth-session`.
- Response: 204, no body (also when no token was sent).
- Errors: 429 RATE_LIMITED (60/min per IP).

#### GET /v1/auth/session (new)
- Auth: requireOwner (session or legacy email+code).
- Response 200: `{ email, method: "session"|"legacy-code", expiresAt? }` (expiresAt only for sessions).
- Errors: 401 UNAUTHENTICATED.

#### POST /v1/auth/sessions/revoke-all (new)
- Auth: requireOwner.
- Body: none.
- Response 200: `{ revoked: <number of sessions deleted> }` (up to 500 per call).
- Side effects: deletes sessions where email == caller email; removes authCodes/{email}.code and .otp (sets codeRevokedAt), so devices using x-auth-code are signed out. Next sign-in writes a new code.
- Errors: 401 UNAUTHENTICATED; 429 RATE_LIMITED (5 per 15 min per IP).

#### Middleware behaviour (changed)
- `authMiddleware(required)` (db/auth/isAuthenticated.ts): accepts session tokens or legacy email+code via `_lib/auth authenticate()`; sets `req.auth` and `req.userEmail`. 401 `UNAUTHENTICATED` "Sign in to continue." when no credentials; 403 `FORBIDDEN` "Your sign-in is no longer valid. Sign in again to continue." when wrong; 429 after 50 failures per IP per 15 min. `required=false` never sets userEmail from unverified headers.
- `multiAuthMiddleware(required)` (db/auth/multiAuth.ts):
  1. `body.pass`: constant-time compare with system/secret.the_pass (or INTERNAL_API_SECRET). Wrong: 403 `{error:"Invalid password.", code:"FORBIDDEN"}`. Right: `delete req.body.pass`, `req.systemCaller = true`, and when `:configId` exists `req.auth = {email: configId, tenantId: configId, method: "system"}`, `req.userEmail = configId`. x-auth-email is no longer trusted on this path.
  2. owner (session or email+code): sets req.auth/req.userEmail; if `:configId` is present and not the caller's tenant: 403 `{error:"This account cannot access that newsletter.", code:"FORBIDDEN"}`.
  3. `Authorization: Bearer <api key>` (non-session) bound to `:configId`: sets `req.auth = {email: configId, tenantId: configId, method: "api-key"}`, `req.apiKeyCaller = true`. Results cached 60 s.
  4. Otherwise (required) 401 `{error:"Sign in again or check your API key, then try again.", code:"UNAUTHENTICATED"}`.

#### Socket.IO (path /socket-io) (changed)
- Client -> server `register`: `{ token }` / `{ sessionToken }` (session token) or legacy `{ id: email, accessCode: code }` (accessCode may also be a session token). Room = verified tenant id; a different `id` is ignored.
- Server -> client: `registered { room, method }`; `error { code: UNAUTHENTICATED|RATE_LIMITED|INTERNAL, message }` (also mirrored as a `log` string for the current frontend); `log <string>`; `resetPage`; `automation:run <run without previewHtml and steps[].output>` (from WS8 engine onRunUpdate, to room run.configuratorId).
- Client -> server: `resetAck`, `ping` (only reset timers for registered sockets).
- Limits: 5 register attempts per socket per minute, 30 per IP per 5 minutes.
- Multiple tabs per account are allowed (a new registration no longer disconnects the other socket).

### 8.2 Billing and plan limits
Payment processors are off (decision by Luis, 2026-10-30). All provider routes and code were removed; billing endpoints other than the two plan reads below answer 404.

- `GET /v1/billing/plan` (owner) and `GET /v1/billing/plans` (public) stay, served by `API/v1/plans/plansV1Router.ts`. Luis changes plans with `PATCH /v1/admin/tenants/:id` (section 5).
- Plan limits are enforced on the server (`API/_lib/plans.ts`): adding a source or a subscriber over the limit answers `PLAN_LIMIT_REACHED` with `details = { limit, used, plan, resource, upgradeUrl }` (402 on /v1, 403 on legacy routes).

### 8.3 Configuration, news sources, leads, geo
Auth terms: **owner** = `requireOwner()` (session token `Authorization: Bearer aiban_s_...` / `x-auth-session`, or legacy `x-auth-email` + `x-auth-code` while LEGACY_CODE_AUTH is on). **tenant match** = the path id must equal the caller (case-insensitive), else 403 FORBIDDEN. Legacy error shape for all routes below: `{ error: "<message>", code, requestId, details? }`.

Secret masking (ownerConfig): `appPassword`, `openAiApiKey`, `webhookSharedSecret`, `webhookPassword`, `email.auth.pass`, `webhookGroups[].password`, `newsSources[].appPassword|openAiApiKey|email.auth.pass` come back as `"********"` when set (`""`/missing when not). `apiKeys` becomes `[{createdAt}]` (no hashes). Leftover fields from retired payment providers (`helper/retiredPaymentFields.ts`) are never returned. New fields: `configuratorId` (doc id), `secretsSet {appPassword, openAiApiKey, emailAuthPass, webhookSharedSecret, webhookPassword}`. Any string of 8+ `*` sent back means "keep the stored value".

#### Configuration

| Method + path | Auth | Request | Response | Errors | New/changed |
|---|---|---|---|---|---|
| GET `/config` | optional owner | `?documentId=` optional; legacy `x-auth-email` used as the id when there is no documentId and no valid auth | Owner (own id or no documentId): ownerConfig of own config, default config created on first call. Otherwise publicConfig `{newsletterTitle, senderName, brandColor?, logo?, facebookLink?, instagramLink?, newsSources:[{id, newsletterTitle?, community?, isPublic?, isPaidNewsletter?, active?, language?, languages?}]}` (sources with isPublic false omitted); `Cache-Control: public, max-age=60` | 400 BAD_REQUEST (no id), 401 UNAUTHENTICATED (credentials sent but invalid and no documentId), 404 NOT_FOUND (public lookup of a missing config; nothing is created) | changed: auth, projection, `documentId` honoured, no doc creation for anonymous callers |
| PUT `/config` | owner | `?documentId` optional (must match caller). Body: config object (typically /private-config merged with edits) | `{message, config: ownerConfig, ignored?: ["newsSources"]}` | 400 (empty body / unsafe webhook URL), 401, 403 (documentId of another tenant), 404, 409 CONFLICT (concurrent write, updateTime precondition), 413 | changed: drops pricingPlan, billingInterval, vip, apiKeys, leftover payment provider fields, planUpdatedAt, configuratorId, deletionRequestedAt, webhookSharedSecret, secretsSet; masked/missing secrets keep stored values; `newsSources` accepted only when ids equal the stored set (url, type, linkSelector, id, subscribersIDs, lastManualSendTimestamp stay as stored); changed webhookUrl / webhookGroups[].url pass the SSRF check (https only in production); writes only changed top-level keys |
| POST `/config` | owner | body: initial settings | 201 `{apiKey, message}` | 401, 403 CONFLICT code (already exists), 413 | changed: same allow-list; pricingPlan forced "free", newsSources [], webhookUrl/webhookGroups ignored |
| GET `/private-config` | owner | `?documentId` optional (must match) | ownerConfig (masked) | 401, 403, 404 | changed: was raw config with secrets |
| GET `/all-configurations` | admin (ADMIN_EMAILS) | `?limit` (default 50, max 200) `&offset` (max 5000) | ownerConfig[] | 404 for non-admins | changed: was public, unpaginated |
| GET `/configuration-news-sources` | owner + tenant match | `?configId` optional | NewsSource[] masked | 401, 403 | changed: was optional auth, any tenant |
| POST `/configurations/:configId/secret` | owner + tenant match | none | `{sharedSecret}` | 401, 403, 404, 429 (10/h) | changed: tenant check, masked patch of one field |
| POST `/configurations/:configId/webhook` | owner + tenant match | `{webhookUrl}` | `{message}` | 400 (missing / unsafe URL: private IP, non-https in production, credentials, port), 401, 403, 404, 429 (20/h) | changed |
| GET `/public-config-info` | none (120/min/IP) | `?configuratorId` required, `&newsSourceId` optional | `{newsletterTitle, senderName, description, logo?, brandColor?}` plus with newsSourceId `{language?, languages?, isPaidNewsletter}`; empty strings instead of "Newsletter"/"Sender"; source title/sender fall back to the config's | 400, 404 | changed (WS2 7.md, WS5) |

#### News sources

| Method + path | Auth | Request | Response | Errors | New/changed |
|---|---|---|---|---|---|
| POST `/news-source/send-email` | owner, 10/h per tenant | `{html, subject?, emails[]}` (`config` ignored) | `{message:"Emails sent successfully"}` | 400 (missing fields, >5 recipients, sender not set: "Email sending is not set up yet. Add your sender email in Settings, then try again."), 401, 403 (any recipient other than the owner's sign-in email), 429, 502 UPSTREAM_FAILED | changed |
| POST `/news-source/generate-newsletter` | owner, 20/h per tenant | unchanged | `{message, html}` | 400 (missing fields, unsafe URL), 401, 429, 502 | changed: secrets and keys from the stored config; only branding fields from body.config |
| POST `/news-source/generate-selector/:configId` | owner + tenant, 30/h | `{url, ...}` | unchanged | 400 (unsafe URL), 401, 403, 404, 429, 502 | changed |
| PUT `/news-source/regenerate-selectors/:configId/:newsSourceId` | owner + tenant, 30/h | `{newsSourceUrl?}` | `{message, newsSource}` masked | 400, 401, 403, 404, 409, 429 | changed |
| POST `/news-source/:configId` | owner + tenant, 20/h | news source fields (allow-list) | 201 `{message, newsSource}` masked | 400 (unsafe url), 401, 403 FORBIDDEN, **403 PLAN_LIMIT_REACHED** `details {limit, used, plan, resource, upgradeUrl}`, 404, 409 | changed: first send runs best effort (failure no longer turns the 201 into a 500) |
| PUT `/news-source/:configId/:newsSourceId` | owner + tenant | fields to change | `{message, newsSource}` masked | 400 (invalid scheduleTime, unsafe url/lead), 401, 403, 404, 409 | changed |
| GET `/news-source/:configId/:newsSourceId` | owner + tenant | | unchanged minus `email.host` | 401, 403, 404 | changed: was public |
| DELETE `/news-source/:configId/:newsSourceId`, PUT `/news-source/personality/:configId/:newsSourceId`, POST `/news-source/:configId/:newsSourceId/trigger` | owner + tenant | unchanged | unchanged | +401/403 from middleware | changed: session tokens accepted, tenant check |
| POST `/news-source/any-user-data-base-file-to-standard-format/:configId` | owner + tenant, 400 chunks/h | `{text (max 500k chars), newsSourceId}` | NDJSON unchanged | 404 (unknown source), 413 | changed: tenant check (was any tenant) |
| GET `/articles/:email` | none, 120/min/IP | `size` 1..50 (default 20), `page` 1..1000, `maxHits` 1..100, `newsSourceId` `[A-Za-z0-9_-]`, `lang` | each lang: `{withImages, withoutImages, total, totalWithImages, totalWithoutImages}`, lists sorted newest first (creation) before slicing | 400 (bad params), 429 | changed |
| GET `/articles/:email/languages` | none, 120/min/IP | `?newsSourceId` optional | `{languages:[{code,total}]}` sorted by total desc | 400, 429 | **new** |
| GET `/article/:id` | none, 120/min/IP | | unchanged | 404 for malformed ids | changed: bounded cache |

#### Leads and geo

| Method + path | Auth | Request | Response | Errors | New/changed |
|---|---|---|---|---|---|
| GET `/lead-counter` | none | `configuratorId, newsSourceId, newsletterUserId, leadUrl` | 302 to leadUrl | 400 when leadUrl is not http(s) (no redirect) | changed: stored only when owner + source exist; max 5,000 clicks per source; per-IP 60/min recording limit (still redirects); write masked to the source key with precondition |
| GET `/leads/:configuratorId` | owner + tenant | | `{[configuratorId]: leads}` unchanged | 401, 403 | changed: no configurations scan |
| GET `/leads/:configuratorId/:newsSourceId/:newsletterUserId` | owner + tenant | | `{[iso]: url}` | 401, 403, 404 | changed |
| GET `/geo` | none | Accept-Language | `{language}` (2-3 letter code, default "en") | | changed: validated |

### 8.4 Subscribers, double opt-in, unsubscribe, GDPR
Legacy error shape (all non-/v1 routes below): `{ error: string, message: string, code, requestId, details? }` (`message` duplicates `error` because the widget and dashboard read different keys).
/v1 error shape: `{ error: { code, message, details? }, requestId }`.

Subscriber views returned to owners never contain `pass`, other tenants' `subscriptions`, tuples or billing ids:
`SubscriberView = { email, name, language, bio?, countryOfResidence?, createdAt?, status: "accepted"|"pending", confirmedAt?, newsSourcesConfigTuples: (this tenant only) }`.

#### Changed legacy endpoints

| Method, path | Auth | Request | Response | Errors |
|---|---|---|---|---|
| POST `/users/:configId/:newsSourceId` (changed) | multiAuth: owner of :configId (code, session, API key) or system caller bound to :configId | body `{email, name?, bio?, language?, countryOfResidence?}`; every other field (`pass`, `subscriptions`, `newsSourcesConfigTuples`, ...) is ignored | 201 new / 200 already on the list: `{ message: "User added successfully.", status, alreadySubscribed, confirmationEmailSent, warning?, warningCode? }` (`warning` when SMTP failed: subscriber is stored as pending) | 400 VALIDATION_FAILED (`details.fields`), 401, 403 FORBIDDEN (other tenant), 403 PLAN_LIMIT_REACHED (`details.limit/used/plan/upgradeUrl`), 404 NOT_FOUND (newsletter or source), 429 (system caller: 200 adds/hour per newsletter) |
| POST `/public-subscribe` (changed) | none; 10 requests / 10 min per IP; 200 / hour per newsletter | body `{configuratorId, newsSourceId, email, name, language?, bio?, countryOfResidence?, website?}`; name max 100, bio max 500, language 2 letters, country 2 letters; `website` non-empty = honeypot (answered as success, nothing stored) | 200 `{ success: true, status, message }` | 400 VALIDATION_FAILED, 403 PLAN_LIMIT_REACHED, 404, 429 |
| POST `/subscribe` (changed) | requireOwner (session or legacy code); body email must be the caller | body `{email, configId, newsSourceId}` | 200 `{ message: "User subscribed successfully." }` (confirmed directly: the caller proved the email) | 400, 401, 403, 404 (subscriber, newsletter or source), 403 PLAN_LIMIT_REACHED |
| GET `/users/:email` (changed) | requireOwner, self only | | 200 own record `{email,name,bio,language,countryOfResidence?,newsSourcesConfigTuples,subscriptions,welcomeEmailSent?}` or `null` (no `pass`) | 401, 403 |
| PUT `/subscriber/:email` (changed) | requireOwner, self only | body `{name?, bio?, language?, countryOfResidence?}` (others ignored) | 200 `{ message: "Subscriber info updated successfully." }` | 400, 401, 403, 404 |
| DELETE `/delete-user/:email` (changed) | requireOwner, self only | | 200 HTML (deletedUser template). Now erases across all tenants, auth code and lead clicks | 401, 403 |
| GET `/config-subscribers/:configId` (changed) | requireOwner + tenant | | 200 `{ [newsSourceId]: SubscriberView[] }`; header `X-Truncated: true` when the 20,000 total cap is hit | 401, 403, 404 |
| GET `/newsletter/users/:configId/:newsSourceId?limit&startAfter` (changed) | multiAuth + tenant | `limit` 1..500 (clamped), `startAfter` = last email of previous page | 200 `SubscriberView[]`; header `X-Next-Start-After` when more pages exist; without `limit` all up to 20,000 with `X-Truncated: true` when cut | 400, 401, 403 |
| GET `/segmented-subscribers/:configId` (changed) | multiAuth + tenant | | 200 `{ [configId]: { [newsSourceId]: email[] } }`, `X-Truncated` | 401, 403, 404 |
| GET `/newsletter/search?email=\|name=` (changed) | multiAuth (owner) | `email` exact (case-insensitive) or `name` contains (case-insensitive, also matches email), caller's tenant only, max 50 results | 200 `SubscriberView[]` | 400, 401 |
| GET `/confirm-subscription?configId&newsSourceId&userEmail&token` (changed) | none; 30 / 10 min per IP | `token` (purpose confirm, 30 days). Without token: accepted only while `LEGACY_UNSIGNED_LINKS` is on (counted in logs) | 200 `{ status: "confirmed" \| "already_confirmed", message }`; entry is merged (pricingPlan and billing ids kept) | 400 missing fields or unsigned link with legacy off, 403 bad/expired/wrong-purpose token, 404 nothing pending for that source |
| GET `/unsubscribe/:email?configId&newsSourceId&token` (changed) | none; 60 / 10 min per IP | `token` (purpose unsubscribe, never expires); unsigned only while legacy flag on | Browser (Accept without application/json): 200 HTML page with one "Unsubscribe" button that POSTs to the same URL. API callers (Accept includes application/json, e.g. the dashboard) or a signed-in owner of :configId: unsubscribes at once and returns the unsubscription HTML (old behaviour) | 400 (HTML or JSON) missing params / unsigned link, 403 bad token |
| POST `/unsubscribe/:email?configId&newsSourceId&token` (new) | none; RFC 8058 one-click, no redirect | form body optional; `List-Unsubscribe=One-Click` | 200 `{status:"unsubscribed"}` for one-click or JSON callers, else unsubscription HTML. Idempotent: unknown or already removed readers also get 200 | 400, 403 |

Unsubscribe now removes the tuple AND keeps `subscriptions[cfg][ns]` as a consent record (`accepted:false, unsubscribedAt`), so a re-subscribe needs a new confirmation.

#### New /v1 endpoints (register `API/v1/subscribers/subscribersV1Router.ts` and `API/v1/privacy/privacyV1Router.ts`)

| Method, path | Auth | Request | Response | Errors |
|---|---|---|---|---|
| GET `/v1/subscribers` | requireOwner (tenant = req.auth.tenantId) | query `newsSourceId?`, `status? accepted\|pending`, `limit 1..100 (25)`, `cursor?` | 200 `Page<SubscriberView & {newsSourceId}>` = `{items, nextCursor}`; walks every source of the tenant | 400 VALIDATION_FAILED / bad cursor, 401, 404 unknown source |
| GET `/v1/subscribers/count` | requireOwner | query `newsSourceId?` | 200 `{ count, byNewsSource: {id: n} }` (COUNT aggregation) | 401, 404 |
| GET `/v1/subscribers/:email` | requireOwner | | 200 `{email,name,language,bio?,countryOfResidence?,createdAt?, sources:[{newsSourceId, status: accepted\|pending\|unsubscribed, subscribedAt?, confirmedAt?, unsubscribedAt?, pricingPlan?}]}` | 401, 404 (not this tenant's) |
| GET `/v1/subscribers/:email/export` | requireOwner | | 200 attachment `{exportedAt, subscriber (as above), linkClicks:[{newsSourceId, at, url}]}` (this tenant only) | 401, 404 |
| DELETE `/v1/subscribers/:email?newsSourceId=` | requireOwner | with `newsSourceId`: unsubscribe from that source (consent record kept) | 200 `{status:"unsubscribed"\|"not_subscribed", newsSourceId}` | 401, 404 |
| DELETE `/v1/subscribers/:email` | requireOwner | | 200 `{status:"removed", recordDeleted, linkClicksRemoved}`. Removes this tenant's tuples, subscriptions entry, configIds and lead clicks; deletes the reader doc only when no other tenant remains | 401, 404 |
| GET `/v1/privacy/export` | requireOwner; 5/hour per tenant | | 200 attachment `{exportedAt, account (secrets masked as "set", apiKeys -> [{createdAt}]), audience[], leads, articles[], activity[], automations[], signIn:{hasSignInCode}, manifest[]}` | 401, 429 |
| POST `/v1/privacy/delete-account` | requireOwner; 5/hour | body `{ confirm: "DELETE" }` | 202 `{status:"scheduled", deletionRequestedAt, purgeAfter, message}`; sets `configurations/{id}.deletionRequestedAt/By`, records activity. Nothing is purged now | 400 VALIDATION_FAILED, 401, 404 |
| POST `/v1/privacy/cancel-deletion` | requireOwner | | 200 `{status:"active", message}` | 401, 404 |
| GET `/v1/public/privacy/subscriber?token=` | none; 10 / 10 min per IP; token purpose `privacy` (7 days) | | 200 `{exportedAt, profile, memberships:[{newsletter (display name), newsSourceId, status, subscribedAt?, confirmedAt?, unsubscribedAt?, plan?}], linkClicks[], manifest[]}` (owner emails are never shown) | 400, 403 invalid token, 429 |
| POST `/v1/public/privacy/subscriber/delete` | none; same limits | body `{ token }` | 200 `{status:"deleted", message}`: erases newsletterUsers doc, authCodes and sessions (unless the email is also an owner), lead clicks in every tenant | 400, 403, 429 |

#### Link helpers (API/_lib/linkTokens.ts)

`signLinkToken({email, configId?, newsSourceId?, purpose, expiresInDays?}) -> Promise<string|null>`, `verifyLinkToken(token, {email, configId?, newsSourceId?, purpose}) -> Promise<boolean>`, `readLinkToken(token, purpose)`, `buildConfirmUrl`, `buildUnsubscribeUrl`, `buildManageUrl` (frontend `/subscriptions/manage?token=`, page not built yet), `buildPrivacyExportUrl`, `listUnsubscribeHeaders` (`List-Unsubscribe` + `List-Unsubscribe-Post`). No secret: sign returns null, verify returns false, links are built without `token`.

#### Admin script

`db/gdpr/runPendingDeletions.ts`: dry run by default; `--execute` deletes accounts whose `deletionRequestedAt` is older than `--grace-days` (14). Refuses `--execute` when `APP_ENV=production` unless `--i-know-this-is-production`. Skips accounts with an active paid plan unless `--ignore-billing`.

### 8.5 Product endpoints (automations, activity, onboarding, usage, preview, sender test)
All endpoints are new. Auth for every endpoint: `requireOwner()` (session token `Authorization: Bearer aiban_s_...` or `x-auth-session`, or legacy `x-auth-email` + `x-auth-code`). The tenant is `req.auth.tenantId`. Errors use the /v1 envelope `{ error: { code, message, details? }, requestId }`. Common errors on every endpoint: 401 `UNAUTHENTICATED`, 400 `VALIDATION_FAILED` (details.fields = [{path, message}]), 500 `INTERNAL`, 503 `NOT_READY` (database busy). Lists use `Page<T> = { items, nextCursor }` with `?limit=1..100` (default 25) and an opaque `cursor`.

Registration (lead): add to `API/v1/v1Router.ts` MODULES:
```ts
import automationsV1Router from "./automations/automationsV1Router.ts";
import activityV1Router from "./activity/activityV1Router.ts";
import onboardingV1Router from "./onboarding/onboardingV1Router.ts";
import usageV1Router from "./usage/usageV1Router.ts";
import emailV1Router from "./email/emailV1Router.ts";
import senderV1Router from "./sender/senderV1Router.ts";
```
Order inside automationsV1Router already puts `/v1/automations/recipes` and `POST /v1/automations/run` before the `/:id` routes.

#### Types

`Automation` and `RunRecord` follow docs/aiban/AUTOMATIONS.md. Additive field on Automation: `readOnly: true` for legacy items. Legacy items (`id = "legacy_<newsSourceId>"`, `source: "legacy"`) are derived per active source and are not stored; they have no createdAt/updatedAt.

Run records returned by the API never contain `steps[].output`, and contain `previewHtml` only with `?preview=1`. Queued fallback records carry `manual: { mode, newsSourceId, url, requestId, requestedBy, hasText }` (the pasted text itself is not returned).

#### Automations

##### GET /v1/automations
Response 200 `{ items: Automation[], nextCursor: null }`. Legacy items first, then stored ones by createdAt. Legacy items come from engine `listAutomations(tenant)` when installed, else one per active news source from the config, skipping sources already covered by a stored automation with a schedule trigger.

##### GET /v1/automations/recipes
Response 200 `{ items: Recipe[] }` where `Recipe = { id, name, description, trigger, steps, defaults: { enabled, newsSourceIds, settings, recommended? } }`. Engine `listRecipes(tenant)` when installed, else the 7 recipes of AUTOMATIONS.md section 4 computed from the config (cron from the first active source `scheduleTime`, else `0 8 * * *`; `pick_image` unless `includeImages === false`; `publish_wordpress` only with WordPress credentials).

##### POST /v1/automations
Header `Idempotency-Key` optional (scope `automations-create`).
Body (strict), either `{ recipeId, name?, enabled?, trigger?, steps?, newsSourceIds?, settings? }` or `{ name, trigger, steps, enabled?, newsSourceIds?, settings? }`.
- `trigger`: `{type:"schedule", params:{cron (5 fields), tz?}}` | `{type:"new_article", params:{newsSourceId, checkEveryMinutes? 30..1440}}` | `{type:"new_subscriber"|"list_imported", params:{newsSourceId?}}` | `{type:"manual", params:{mode, url?, text?}}` | `{type:"milestone", params:{kind}}`.
- `steps`: 1..20 of `{type: StepType, params? (<=10 KB), optional?, retry?:{attempts 1..5, backoffMs 0..600000}}`.
- `settings`: `{dryRun?, maxItemsPerRun? 1..5, languages? ["en",...], quietHours?:{startHour,endHour,tz}}`.
Response 201 Automation (id `auto_` + 16 hex, `source` "recipe" or "user").
Errors: 400 `BAD_REQUEST` when a newsSourceId is not the caller's (details.newsSourceIds) or the recipe needs a source and there is none; 409 `CONFLICT` at 100 stored automations; 409/422 idempotency codes.

##### GET /v1/automations/:id
200 Automation. 404 `NOT_FOUND` when missing or owned by another tenant (also for `legacy_<id>` of a source the caller does not have).

##### PATCH /v1/automations/:id
Body (strict, at least one): `name, enabled, trigger, steps, newsSourceIds, settings`. Each given field replaces the stored one (settings is replaced as a whole). 200 Automation.
Errors: 404; 409 `CONFLICT` for legacy ids ("This schedule comes from your source settings. To change or stop it, open the source in Sources and edit its schedule there.") or when the doc changed concurrently; 400 for foreign source ids.

##### DELETE /v1/automations/:id
200 `{ id, deleted: true }`. 404; 409 for legacy ids (same message as above).

##### POST /v1/automations/:id/toggle
Body `{ enabled: boolean }`. 200 Automation. 404; 409 for legacy ids.

##### POST /v1/automations/:id/run
Rate limit 10 per hour per tenant, shared with POST /v1/automations/run (429 `RATE_LIMITED`, Retry-After). Header `Idempotency-Key` optional (scope `automations-run`).
Body (strict): `{ dryRun?, url? (http/https), text? (<=50000 chars), requestId? (8..200 of [A-Za-z0-9._:-]) }`, not both url and text. Mode: url -> write_about_url, text -> write_about_text, else send_now. Works for legacy ids and for disabled automations (manual run).
Response 202 `{ runId, automationId, status: "queued" }`.
Engine installed: calls `runManual({configuratorId, automationId, newsSourceId, mode, url, text, dryRun, requestId, requestedBy})` and expects `{runId}`; a throw or missing runId -> 502 `UPSTREAM_FAILED`. Engine missing: creates `automationRuns/{runId}` with status `queued` (see storage below). With a requestId the fallback run id is deterministic, so a retry returns the same runId and queues nothing new.
Errors: 404, 400, 429, 502.

##### POST /v1/automations/run
"Send now / Write about this". Same limiter and idempotency scope.
Body (strict): `{ newsSourceId, mode: "send_now"|"write_about_url"|"write_about_text", url? (required for write_about_url), text? (required for write_about_text), dryRun?, requestId? }`.
Response 202 `{ runId, automationId: "legacy_<newsSourceId>", status: "queued" }`. 404 when the source is not the caller's.

##### GET /v1/automations/:id/runs?limit&cursor&preview=1
Page<RunRecord>, newest first. Engine `listRuns(automationId, {limit, cursor, preview, configuratorId})` when installed (array or `{items, nextCursor}` accepted; items of other tenants are dropped). Fallback: runQuery on `automationRuns` where automationId == id order by startedAt desc, __name__ desc. Needs composite index `automationRuns (automationId ASC, startedAt DESC, __name__ DESC)`. 404 when the automation is not the caller's.

##### Storage written by this slice
- `automations/{id}`: the Automation object (`configuratorId` = tenant, ISO strings for createdAt/updatedAt, `stats` zeros). After each save the engine's `saveAutomation(automation)` is called if exported (notification; errors ignored). After delete, `deleteAutomation(id, tenant)` if exported.
- `automationRuns/{runId}` (fallback only): `{ id, automationId, configuratorId, trigger:"manual", triggerKey: sha256(automationId+"manual"+(requestId||runId)), status:"queued", dryRun, startedAt (ISO string), manual:{mode,newsSourceId,url,text,requestId,requestedBy}, steps:[], items:[], counts:{...0}, cost:{...0}, expiresAt (timestamp, +90 days) }`. WS8's executor picks up queued runs. `startedAt` must stay an ISO string (not a timestamp) so the order and cursor work.

#### Activity

##### GET /v1/activity?limit&cursor&type=
`type`: one event type or up to 10 comma separated (`issue.sent,subscriber.added`).
Response 200 Page<`{ id, type, data, createdAt (ISO|null) }`>, newest first, expired items (expiresAt passed) dropped. Without type: listDocs by name. With type: runQuery on `configurations/{tenant}` activity where type == / IN, ordered by name (single-field index on type is enough).
Errors: 400 for a bad type or cursor.

#### Onboarding

##### GET /v1/onboarding
Response 200:
```
{ steps: [{ id, done, doneAt?, source: "derived"|"manual" }], completed, dismissed, nextStepId: string|null, activated }
```
Step order: source_added, voice_set, preview_seen, sender_connected, first_subscriber, first_send, automation_on, widget_installed.
- sender_connected: owner email + app password on the config or any source.
- source_added: at least one news source. voice_set: any source has `personality`.
- first_subscriber: COUNT per source, stopping at the first source with one.
- first_send: any source `lastManualSendTimestamp`, else an `issue.sent` activity exists.
- automation_on: a stored automation with enabled == true.
- preview_seen, widget_installed: manual only.
Derived steps can also be ticked by hand (then `source: "manual"` until derived). `activated` (additive) = first_send and first_subscriber done. Cached 30 s per tenant in memory.
Storage: `configurations/{tenant}/meta/onboarding` `{ manualDone: {[id]: ISO}, derivedDoneAt: {[id]: ISO}, dismissed, updatedAt }`. derivedDoneAt records the first time a derived step was seen done (for time to activation).

##### PATCH /v1/onboarding
Body (strict, at least one): `{ done?: StepId[], undone?: StepId[], dismissed?: boolean }`. Response 200 same shape as GET (fresh). 400 for unknown step ids.

#### Usage

##### GET /v1/usage
Response 200:
```
{ plan: {id, name}, period: {start, end},            // calendar month UTC, end exclusive
  limits: {newsSources, subscribers},                // null = unlimited
  used: {newsSources, subscribers, sendsThisMonth, aiRunsThisMonth},
  percent: {newsSources, subscribers},               // integer, null when unlimited
  nearLimit: ("newsSources"|"subscribers")[],         // percent >= 80
  upgradeUrl }
```
Counter contract (for WS8 and the send code): `configurations/{tenant}/usage/{YYYY-MM}` (UTC month) with integer fields `emailsSent` and `aiRuns`, written with
`incrementFields(path, { emailsSent: n, aiRuns: 1 }, { updatedAt: new Date() })` once per send chunk or run (not per email). The reader also accepts `sends` and `articlesGenerated` as fallbacks. Missing doc = 0.

#### Email preview

##### POST /v1/email/preview
Rate limit 60 per minute per tenant.
Body (strict): `{ newsSourceId?, subject?, title?, html?, text?, language? }`. html, text, subject and title together at most 200 KB (413 `PAYLOAD_TOO_LARGE`).
Renders `templates/newsletterEmail.html` once (helper/functionTemplateFile.ts) with the tenant branding (logo, brandColor, newsletterTitle, sender name, postal address, email signature when showEmailSignature, hidePoweredBy). `html` is cleaned first (script, iframe, object, embed, base, meta, link, on* attributes, javascript:/vbscript:/data:text/html URLs, CSS expressions); `text` is escaped into paragraphs; without either, sample content is used. `title` becomes the issue headline (`<h1>`). The unsubscribe link is `#`.
Response 200 `{ html, subject, warnings: string[], sample: boolean }`. Warnings: missing postal address, missing sender name, own email not connected, subject over 80 characters, images without alt text.
Errors: 404 when newsSourceId is not the caller's, 413, 429.

#### Sender test

##### POST /v1/sender/test
Rate limit 5 per 10 minutes per tenant.
Body (strict): `{ sendTo?: "me" }`.
Response 200 `{ ok, checks: [{ id: "config_present"|"smtp_connect"|"auth"|"test_email_sent", ok, message }] }`. Checks stop at the first failure; `test_email_sent` only with `sendTo: "me"`, and the email goes only to `req.auth.email`. Credentials: config first, then the first source with its own email + app password (no system fallback). SMTP host from helper/getSmtpConfig.ts (MX lookup), else `email.host` on port 587. Passwords and raw server errors are never returned. Records activity `sender.tested` `{ok, failed, sentTestEmail}`.
Errors: 400 (any other sendTo), 429.

### 8.6 Compatibility paths the frontend calls, events, support, invitations, public
All routes are registered by `API/compat/compatRouter.ts` (default export `(app) => void`).
Legacy (un-versioned) paths answer errors as `{ error: "sentence", code, requestId, details? }`.
On legacy paths a 429 also carries `retryAfter` (seconds) in the body and a `Retry-After` header.
`/v1/...` aliases answer errors as `{ error: { code, message, details }, requestId }`.
Owner auth = `requireOwner()` (session bearer token, or legacy x-auth-email + x-auth-code).
All endpoints below are NEW (no existing path or response changed).

#### Automations (aliases of /v1/automations, same handlers)

The compat routes run the exact /v1 handler chains (validation, ownership, idempotency, run rate limit 10/hour/tenant). The frontend may send whole Automation objects: only `recipeId, name, enabled, trigger, steps, newsSourceIds, settings` (create) or `name, enabled, trigger, steps, newsSourceIds, settings` (update) are forwarded; other fields are dropped. `configuratorId` (query or body) is optional; when present it must be the caller (else 403 FORBIDDEN).

| Method | Path | Request | Response | Errors |
|---|---|---|---|---|
| GET | `/automations?configuratorId=` | | `Automation[]` (stored + legacy_*), plain array | 401, 403 |
| GET | `/automations/recipes` | | `Recipe[]` | 401 |
| POST | `/automations` | Automation fields (no id) or `{recipeId}` | 201 `Automation` | 400 VALIDATION_FAILED / BAD_REQUEST (source not in account), 403, 409 CONFLICT (100 per account) |
| PUT | `/automations/:id` | partial Automation | `Automation` | 400, 404 NOT_FOUND, 409 CONFLICT (legacy_* read only, or concurrent change) |
| PATCH | `/automations/:id` | partial, e.g. `{enabled:false}` | `Automation` | same as PUT |
| DELETE | `/automations/:id` | | 204 | 404, 409 (legacy_*) |
| GET | `/automations/:id/runs?limit=&preview=1` | limit 1..100 (larger is clamped) | `RunRecord[]` newest first; `previewHtml` only with preview=1 | 404 |
| POST | `/automations/run` | `{configuratorId?, newsSourceId, mode: send_now\|write_about_url\|write_about_text, url?, text?, dryRun?, requestId?}` | 202 `{runId, automationId, status:"queued"}`; same requestId gives the same runId | 400, 403, 404 (source), 429 RATE_LIMITED, 502 UPSTREAM_FAILED (engine) |

#### Activity

GET `/activity?configuratorId=&limit=&before=` (owner). limit 1..100 (default 25). `before` = activity id or ISO 8601 time: returns items strictly older.
Response: `ActivityItem[]` newest first, each item:
`{ id, type, createdAt, title, detail?, status?, meta (raw data), at (= createdAt), kind: "click"|"send"|"subscribe"|"run"|"source"|"other", text (= title + ". " + detail) }`.
Errors: 400 BAD_REQUEST (bad `before` or limit), 401, 403 (foreign configuratorId).

#### Usage

GET `/usage` (owner) -> every `/v1/usage` field, with these legacy fields on top:
`{ plan: "<plan id>", planName, planInfo: {id, name}, newsSources: {used, limit}, subscribers: {used, limit}, period, limits, used, percent, nearLimit, upgradeUrl }`. `limit: -1` = unlimited. Note: `plan` is the id string here (in /v1/usage it is `{id, name}`, now in `planInfo`).

#### Public config

GET `/public-config/:configuratorId` (public, 120/min per IP, Cache-Control public 60 s)
-> `{ newsletterTitle, senderName, logo, brandColor, facebookLink?, instagramLink?, newsSources: [{ id, newsletterTitle?, community?, active, isPublic, isPaidNewsletter?, language?, languages?, lead? }], hidePoweredBy }`.
Sources with `isPublic: false` are left out. `hidePoweredBy` = config flag AND paid plan (starter, growth, pro, master, vipfree, or vip). No plan, emails, keys or secrets. 404 NOT_FOUND when missing.

#### Events

| Method | Path | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/events` (+ `/v1/events`) | owner | `{event: ^[a-z0-9_.:-]{1,64}$, at?, props?, path?}` | 204 | 400, 401, 429 (120/hour/tenant) |
| POST | `/onboarding/events` (+ `/v1/...`) | owner | `{name: onboarding_started\|preview_shown\|test_sent\|first_issue_sent\|sender_named\|onboarding_completed, at?}` | 204 | 400, 401, 429 (shares the 120/hour budget) |
| GET | `/onboarding/events` (+ `/v1/...`) | owner | | `{events: {[name]: ISO}, onboardingCompletedAt: ISO\|null}` | 401 |

Storage: `configurations/{tenant}/events/{id}` `{event, clientAt, props (<= 2 KB, else {truncated:true}), path (no query string), createdAt, expiresAt (+90 d)}`.
Onboarding: `configurations/{tenant}/meta/onboarding` fields `events.<name>` (first time only, never overwritten) and `onboardingCompletedAt` (same doc as /v1/onboarding; its fields are kept). `at` is accepted when within one year back and one day ahead, else server time.

#### Billing relay
Removed with the payment processors (404).

#### Support

POST `/support` (+ `/v1/support`), public, optional owner session. Body `{kind?, name?, email, message (5..5000), subject?, page?, plan?, website? (honeypot), ...up to 10 extra short string fields}` -> 204.
Limits: 5/hour per IP, 20/day per email. Stored at `supportRequests/{id}` with `createdAt`, salted `ipHash`, `tenantId` when signed in, `status:"new"`. A filled honeypot answers 204 and stores nothing. No email is sent.
Errors: 400 VALIDATION_FAILED, 429 RATE_LIMITED.

#### Auth

POST `/auth/verify` (public) body `{email, code}` (also accepts `tokenId`, `clientId` for Google) -> exactly the GET `/auth/:email?code=` result: 200 `{success, message, method, sessionToken, sessionExpiresAt}`. Same limits and lockout. Errors: 400 (missing code, bad email), 403 FORBIDDEN (wrong or expired code), 429.
The lead must register compatRouter before authRouter (POST /auth/:email would catch /auth/verify).

#### Subscriber counts

GET `/newsletter/counts/:configId` (owner, :configId must be the caller) -> `{ [newsSourceId]: { total, byLanguage: { [lang]: n } } }`.
Languages: from config/news sources (`languages`, `newsletterLanguages`, `language`), else `["en","es"]`, at most 6. `byLanguage` is `{}` for sources with no subscribers, and for all sources when the composite index (newsSourcesConfigTuples ARRAY_CONTAINS + language ASC) is missing. Errors: 401, 403, 404.

#### Invitations

| Method | Path | Auth | Request | Response | Errors |
|---|---|---|---|---|---|
| POST | `/invitations/:configId/:newsSourceId` (+ `/v1/...`) | owner + tenant | `{emails: string[] 1..200, language: ISO 639-1, expiresInDays?: 1..30 (default 30)}` | `{invited: string[], failed: string[], alreadyAccepted: string[], warning?}` | 400, 401, 403, 404 (source), 429 (500 per day per tenant; whole batch refused, message says how many are left) |
| GET | `/invitations/:configId?newsSourceId=` (+ `/v1/...`) | owner + tenant | | `Invitation[]` pending and not expired, newest first | 401, 403 |
| GET | `/v1/public/invitations/accept?token=` | public (60/hour/IP) | | HTML page with an "Accept the invitation" button (no writes); JSON `{status, newsletterTitle, expiresAt}` with `Accept: application/json` | 400 (bad token), 404, 410 (expired) |
| POST | `/v1/public/invitations/accept?token=` | public | | JSON `{status: "accepted"\|"already_accepted", newsletterTitle}`, or an HTML page for form posts | 400, 404, 410, 402 PLAN_LIMIT_REACHED |

- Emails are trimmed, lowercased and deduplicated. Invalid addresses go to `failed`; addresses whose email could not be sent also go to `failed` (still stored, `emailStatus:"failed"`).
- When email sending is not set up (getMailConfigPack throws), invitations are stored with `emailStatus:"not_sent"`, the addresses are in `invited`, and `warning` says so.
- Storage: `configurations/{tenant}/invitations/{sha256(email + newsSourceId)[0..24]}` `{email, newsSourceId, language, status, emailStatus, createdAt, expiresAt, ttlAt (Timestamp), invitedBy, sentAt, acceptedAt?}`. Not subscribers, not counted against the plan. Re-inviting a pending address refreshes it.
- Accept link: `{PUBLIC_API_URL}/v1/public/invitations/accept?token=` (signed, purpose "manage", same expiry). Accepting calls `subscribe()` with autoConfirm (sets `confirmedAt`), counts against the plan at that moment, marks the invitation accepted and records `subscriber.confirmed` (`via: "invitation"`). Sending records `subscribers.invited`.

#### Public (WS2 landing)

| Method | Path | Request | Response | Errors |
|---|---|---|---|---|
| POST | `/public/preview-issue` (+ `/v1/public/...`) | `{url}` | 501 `{error:"Live previews are not available yet.", code:"NOT_IMPLEMENTED"}` after the URL passes the SSRF check | 400 (URL not public), 429 (5/hour/IP) |
| GET | `/public/blogs` (+ `/v1/public/...`) | | `[{holder: encodeURIComponent(ownerEmail), lastArticleAt: ISO}]` newest first; cached 10 min | 429 (60/min/IP) |

`/public/blogs` lists only owners with at least one source marked `isPublic: true`, reads at most 300 holders, and uses the holder document's update time as `lastArticleAt`.

### 8.7 Changes requested by other workstreams (sends, milestones, bounces, delivery log, config fields)
Error bodies on these legacy paths: `{ error, code, requestId }` from the global handler unless noted.

#### POST /news-source/:configId/:newsSourceId/trigger (changed)
- Auth: owner of :configId (requireOwner + requireTenantParam).
- Request: header `Idempotency-Key` (optional) or body `{ requestId? }`, passed to the engine as `requestId` (max 200 chars).
- Engine available (`runManual` exported by engine/automations/mod.ts):
  `202 { ok: true, message, runId }` right away. Engine call: `runManual({ configuratorId, newsSourceId, mode: "send_now", requestId })`. Progress on the socket (`automation:run`).
- No engine (legacy inline run):
  - `202 { ok: true, message, runId? }` when the run sent mail (runId when the engine returned a RunRecord).
  - `200 { ok: true, status: "skipped", reason, message }` when `processSubscribersForNewsSource` returns a RunRecord with `status: "skipped"`. reason = `run.skipReason` (`no_new_items`, `no_subscribers`, `plan_limit`, `source_inactive`, `duplicate_run`, `disabled`, `quiet_hours`, `config_missing`, else `unknown`); message is one plain sentence per reason.
- Errors (legacy shapes kept): 401/403 auth, 403 `{ error }` plan has fewer sources than stored, 404 `{ message }` config or source missing, 429 `{ error, retryAfter }` more than 3 triggers per 5 min per source, 429 `{ message }` already sending (legacy path), 500 `{ message }` (no internal error text any more).
- Side effects (legacy path): `lastManualSendTimestamp`, and when mail went out `lastSentAt` and `firstSentAt` (if missing) on the source. On the engine path WS8 sets those (see helpers below).

#### POST /newsletter/send-custom-content (changed, internal)
- Same request/response. `lastManualSendTimestamp` is written with a narrow source write instead of a whole-config rewrite; after the background send resolves with mail sent, `lastSentAt`/`firstSentAt` are set. 500 message no longer includes the raw error.

#### POST /news-source/:configId (changed)
- `country` optional, stored as `""` when absent and not found by the site scan.
- `active: false` at creation is kept (default stays `true`).
- After the save: engine `getEngine().registerTenant(configId, config)` fire-and-forget.

#### PUT /news-source/:configId/:newsSourceId (changed)
- Ignores `firstSentAt`, `lastSentAt`, `lastRunAt`, `hasAppPassword`, `secretsSet` in the body. After the save: registerTenant fire-and-forget.

#### POST /news-source/generate-newsletter (changed)
- `200 { message, html, subject }`. subject = `article.title` from scrapeAndTranslateArticle, `""` when missing.

#### POST /config and GET /config (changed)
- After a config is created (POST, and GET's create-default path): registerTenant fire-and-forget.
- POST runs the same field checks as PUT (below) and answers 400 on a bad value.

#### PUT /config (changed)
- Accepts and stores: `brandColor` (string up to 64, CSS color characters only), `emailSignatureFields` (object, up to 50 KB JSON), `postalAddress` (string up to 500, trimmed), `showEmailSignature` (boolean; "true"/"false" coerced), `hidePoweredBy` (boolean, stored as sent), `timezone` (IANA, checked with Intl.DateTimeFormat; "" clears). `null` clears any of them.
- 400 `{ error }` with a plain sentence when one is invalid; nothing is written.
- Ignored in the body: `hasAppPassword`, `secretsSet` (response-only), per source `hasAppPassword`, `secretsSet`, `firstSentAt`, `lastSentAt`, `lastRunAt` (stored values kept).

#### Owner config projection (GET /config owner view, /private-config, PUT /config response, news source responses) (changed)
- Adds `hasAppPassword: boolean` at top level and on every news source. Secret values keep coming back as `"********"` when set (unchanged), `secretsSet` unchanged.

#### GET /public-config-info (changed)
- Adds `hidePoweredBy: true` only when the stored flag is true AND the plan is paid (starter, growth, pro, master, vipfree, vip). Absent means false. The plan is never returned.

#### Subscriber list projections (changed)
- Every `SubscriberView` (GET /newsletter/users, /all-subscribers, /v1/subscribers, GDPR export) has `subscribedAt: string | null`: subscription entry `subscribedAt`, else the doc `createdAt`, else null (the Firestore createTime is not exposed by API/_lib/firestore.ts).
- New entries store `subscribedAt` (already done by WS7). `confirmedAt` is set on confirm and on signups that need no confirmation (owner/autoConfirm). Never backfilled.

#### GET /newsletter/deliveries/:configId (new)
- Auth: owner of :configId.
- Query: `newsSourceId?` (string), `limit?` 1..100 (default 25), `cursor?` (opaque, from `nextCursor`).
- 200 `{ items: [{ id, newsSourceId, subscriberEmail, sentAt (ISO|null), status, runId? }], nextCursor: string | null }`, newest first (sentAt DESC, id DESC). `Cache-Control: private, no-store`.
- Errors: 400 bad limit/cursor, 401, 403 other tenant.
- Data (WS8 writes it; this API never does): `configurations/{tenantId}/deliveries/{id}`
  - `id` = first 24 hex chars of `sha256("${runId}:${subscriberEmail.trim().toLowerCase()}")`. Helper: `deliveryId(runId, email)` in API/newsletter/deliveriesEndpoint.ts (use createDoc so a retried send does not duplicate).
  - fields: `newsSourceId: string`, `subscriberEmail: string`, `sentAt: Date` (write a Date so it is a timestampValue; do not mix with strings), `status: "sent" | "failed" | "bounced"`, optional `runId`, `language`, `error` (short, no SMTP credentials).
  - Index: composite (newsSourceId ASC, sentAt DESC, __name__ DESC) on `deliveries` (collection scope). Optional TTL on a field `expiresAt` if retention is wanted.

#### POST /unsubscribe/:email (confirmed, no change)
- RFC 8058 one-click works: body `List-Unsubscribe=One-Click` (urlencoded), `?configId&newsSourceId&token`, no auth, answers `200 { status: "unsubscribed" }` with no redirect. Token param name is `token`. Change in F2: a missing or broken `templates/unsubscription.html` no longer turns a completed unsubscribe into an error (falls back to the inline page).

#### Helpers for WS8 (db)
- `updateNewsSourceField(configId, newsSourceId, field, value)` in db/configuration/updateNewsSourceField.ts. field: `"linkSelector" | "lastSentAt" | "firstSentAt" | "lastRunAt"`. Time fields accept Date, ISO string or ms, stored as ISO strings. `null` deletes the field. Read + patch of `newsSources` masked to that field with an updateTime precondition, 3 attempts on conflict, then throws FirestoreError 409. Returns `"updated" | "unchanged" | "not_found"`. Throws TypeError for another field or a bad value.
- `markNewsSourceSent(configId, newsSourceId, at?)` same file: one write setting lastSentAt and firstSentAt when missing; never throws.
- `markSubscriberBounced(email, configId, newsSourceId, reason)` in db/newsletter/markBounced.ts: sets `subscriptions[configId][newsSourceId].bounced = true`, `bouncedAt` (ISO), `bounceReason` (max 300 chars). Returns `"marked" | "already_bounced" | "not_found" | "failed"`, never throws. The send path skips bounced readers for that config and source.
- `checkSubscriberMilestones(tenantId, newsSourceIds, {newsSourceId?})` in db/newsletter/milestones.ts (called by the API, WS8 does not need it). Emits `{ type: "milestone", configuratorId, kind: "first_subscriber" | "subscribers_10" | "subscribers_100", detail: { count, threshold, newsSourceId? } }` once per tenant; record in `configurations/{tenant}/meta/milestones` `{ [kind]: ISO }`; activity `milestone.reached`.

### 8.8 Mailbox (WS8, mounted by WS7)
`/v1/mail/*` routes from `engine/mail/routes.ts` are registered in `API/v1/v1Router.ts` and use the same owner auth. Shapes: `docs/aiban/MAIL_SETUP.md` section 3.

## 9. Un-versioned paths the frontend calls (WS7, 2026-10-30)

All of them exist now. Un-versioned paths below are thin aliases over the /v1 handlers (same auth, same storage); they return the shapes in the table above and the legacy error body `{ error, code, requestId, retryAfter? }`.

| Requested | Served at | Notes |
|---|---|---|
| `GET /public-config/:configuratorId` | same | public fields only, plus `hidePoweredBy` (flag and paid plan) |
| `GET /automations?configuratorId=` | same, and `GET /v1/automations` | plain array; `configuratorId` must be the caller |
| `GET /automations/recipes` | same, and `/v1/automations/recipes` | |
| `POST /automations`, `PUT`/`PATCH /automations/:id`, `DELETE /automations/:id` | same, and /v1 | `legacy_*` ids answer 409 for edits (change the source schedule instead); DELETE answers 204 |
| `GET /automations/:id/runs?limit=&preview=1` | same, and /v1 (paginated) | newest first |
| `POST /automations/run` | same, and `/v1/automations/run` | 202 `{ runId }`, idempotent on `requestId` |
| `GET /activity?limit=&before=` | same, and `/v1/activity` (paginated) | items carry both the WS6 and WS4 field sets |
| `GET /usage` | same, and `/v1/usage` | `plan` is the plan id; -1 means unlimited |
| `POST /events` | same | 204 |
| `POST /support` | same | 204, stored only |
| `POST /auth/verify` | same | same response as `GET /auth/:email?code=` |

Sign-in responses now include `sessionToken` (send it as `Authorization: Bearer aiban_s_...`). The legacy `x-auth-email` + `x-auth-code` pair keeps working while `LEGACY_CODE_AUTH` is on.
