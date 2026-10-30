# WS6 map of the WS7 /v1 API (frontend contracts)

Source: backend at ai-newsletter-translated, read on 2026-10-30. Read only. Paths are backend paths.
Mount order (main.ts): requestContext, securityHeaders, corsPolicy, billingRouter (/api), newsletterBillingRouter (/api), bodyParsers, v1Router, docs, subscription, configuration, leads, newsSource, auth, geos, notFoundHandler, errorHandler.

## 0. Conventions

### Auth
- requireOwner: `Authorization: Bearer aiban_s_<token>` (or `x-auth-session: aiban_s_<token>`), else legacy `x-auth-email` + `x-auth-code` while LEGACY_CODE_AUTH is true (default true). Results cached 60 s in memory. Failure: 401 UNAUTHENTICATED. Legacy code failures: 10 per (email, ip) and 100 per ip per 15 min, then 429.
- tenantId = configuration doc id = owner email (case kept).
- requireTenantParam(param): after requireOwner; 403 FORBIDDEN unless req.params[param] equals tenantId (case insensitive).
- requireAdmin: owner email in ADMIN_EMAILS, else 404 NOT_FOUND (hidden).
- optionalOwner: anonymous allowed.
- CORS allowed request headers: Content-Type, Accept, Authorization, Idempotency-Key, X-Request-Id, x-auth-email, x-auth-code, x-auth-session, x-auth-token-id, x-auth-client-id. Exposed: X-Request-Id, Retry-After, RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset, Idempotent-Replayed. Credentials only when CORS_ORIGINS is set.
- Body size: 1 MB default; 10 MB for /config, /news-source, /newsletter/send-custom-content, /v1/subscribers/import, /v1/email/preview.

### Error envelope
/v1 paths (originalUrl starts with /v1/):
```ts
type V1Error = { error: { code: ErrorCode; message: string; details?: Record<string, unknown> }; requestId?: string };
```
Legacy paths:
```ts
type LegacyError = { error: string; code: ErrorCode; requestId?: string; details?: Record<string, unknown> };
```
```ts
type ErrorCode =
  | "BAD_REQUEST"              // 400
  | "VALIDATION_FAILED"        // 400, details: { in: "body"|"query"|"params"; fields: { path: string; message: string }[] }
  | "UNAUTHENTICATED"          // 401
  | "FORBIDDEN"                // 403
  | "NOT_FOUND"                // 404
  | "CONFLICT"                 // 409
  | "IDEMPOTENCY_IN_PROGRESS"  // 409
  | "IDEMPOTENCY_KEY_REUSED"   // 422
  | "PAYLOAD_TOO_LARGE"        // 413
  | "RATE_LIMITED"             // 429, details: { retryAfterSeconds }, header Retry-After
  | "PLAN_LIMIT_REACHED"       // 402, details: { limit; used; plan; resource; upgradeUrl? }
  | "INVALID_SIGNATURE"        // 401 (webhooks)
  | "UPSTREAM_FAILED"          // 502, details: { service }
  | "NOT_READY"                // 503 (Firestore circuit open)
  | "INTERNAL";                // 500
```
Unknown route: 404 NOT_FOUND in the matching shape. Every response has header X-Request-Id.

### Idempotency (API/_lib/idempotency.ts)
Optional everywhere it is mounted (no header: runs normally). Header `Idempotency-Key`, regex `^[A-Za-z0-9._:-]{8,200}$` (else 400). Scope is per tenant. Replay of same key + same body returns stored status and body with `Idempotent-Replayed: true`. Same key while running: 409 IDEMPOTENCY_IN_PROGRESS. Same key, different body: 422 IDEMPOTENCY_KEY_REUSED. 5xx responses are not stored. TTL 24 h.
Mounted on: POST /v1/automations, POST /v1/automations/run, POST /v1/automations/:id/run, POST /api/subscribe, POST /api/cancel-subscription.

### Pagination
Query `?limit=1..100` (default 25) `&cursor=<opaque base64url>`; response `type Page<T> = { items: T[]; nextCursor: string | null }`. Bad cursor: 400 BAD_REQUEST.

### Rate limit headers
rateLimit() middleware sets RateLimit-Limit, RateLimit-Remaining, RateLimit-Reset (seconds). In memory, per process.

## 1. Legacy auth endpoints

### POST /auth/:email (public)
- Limits: 5 per email and 20 per IP per 10 min (429).
- Body: none. Invalid email: 400 BAD_REQUEST "Enter a valid email address...".
- 200 `{ success: true; message: "Authentication code sent." }` (same answer for every address; Google accounts get a "use Google" email instead of a code). Code valid 15 min.

### GET /auth/:email (public)
- Query: `{ code?: string; token_id?: string; client_id?: string }` (Google: token_id + client_id; code is a fallback).
- Limits: 20 per (email, ip) and 60 per ip per 15 min; 5 wrong codes lock the OTP (429 RATE_LIMITED details.reason "too_many_attempts").
- 200:
```ts
type VerifyResponse = { success: true; message: "Authentication successful."; method: "otp" | "legacy-code" | "google"; sessionToken: string; sessionExpiresAt: string };
```
- Errors (legacy shape): 400 missing code or bad email; 403 FORBIDDEN wrong code (details.attemptsLeft), expired (details.reason "code_expired"), Google mismatch (details.reason "google_email_mismatch"), Google invalid with no code.
- Session TTL: SESSION_TTL_DAYS (default 30).
- Note: while LEGACY_CODE_AUTH is on, the emailed OTP also becomes the permanent x-auth-code.

## 2. /v1 routes

### Health (public)
- GET /healthz -> 200 `{ status: "ok"; startedAt: string }`
- GET /readyz -> 200|503 `{ status: "ready" | "not_ready"; checks: Record<string, boolean | string> }`

### Auth sessions
- POST /v1/auth/logout. Public (no requireOwner). Rate 60/min per IP. Revokes the presented session token if any. 204, no body.
- GET /v1/auth/session. requireOwner. 200 `{ email: string; method: "session" | "legacy-code"; expiresAt?: string }`.
- POST /v1/auth/sessions/revoke-all. requireOwner. Rate 5 per 15 min per IP. Deletes all sessions for the email and removes the legacy code and OTP. 200 `{ revoked: number }`.

### Usage
GET /v1/usage. requireOwner. Cache-Control no-store.
```ts
type Usage = {
  plan: { id: PlanId; name: string };
  period: { start: string; end: string };            // UTC month, end exclusive
  limits: { newsSources: number | null; subscribers: number | null }; // null = unlimited
  used: { newsSources: number; subscribers: number; sendsThisMonth: number; aiRunsThisMonth: number };
  percent: { newsSources: number | null; subscribers: number | null };
  nearLimit: string[];                                // keys of percent >= 80
  upgradeUrl: string;                                 // FRONTEND_URL + "/pricing"
};
type PlanId = "free" | "starter" | "growth" | "pro" | "master" | "vipfree";
```
Subscribers count is per (subscriber, source) pair.

### Activity
GET /v1/activity?limit&cursor&type. requireOwner.
- type: one event type or up to 10 comma separated, each `^[a-z_]{2,40}\.[a-z_]{2,40}$`.
- 200 `Page<ActivityItem>`, newest first, expired items filtered (a page can have fewer than limit items with nextCursor set).
```ts
type ActivityItem = { id: string; type: ActivityType | string; data: Record<string, unknown>; createdAt: string | null };
type ActivityType =
  | "subscriber.added" | "subscriber.confirmed" | "subscriber.unsubscribed" | "subscriber.deleted" | "subscribers.imported"
  | "issue.sent" | "issue.failed"
  | "news_source.added" | "news_source.updated" | "news_source.deleted"
  | "automation.created" | "automation.updated" | "automation.deleted" | "automation.toggled"
  | "automation.run_requested" | "automation.run_finished"
  | "billing.plan_changed" | "billing.payment_failed"
  | "sender.tested" | "account.export_requested" | "account.deletion_requested" | "milestone.reached";
```
data usually has `title?`, `refId?` plus event fields (automation.*: title, refId, recipeId|fields|enabled; run_requested: runId, mode, dryRun; sender.tested: ok, failed: CheckId[], sentTestEmail; subscriber.deleted: refId (hash), by).
Retention 180 days.

### Onboarding
GET /v1/onboarding. requireOwner. no-store. 30 s server cache per tenant.
PATCH /v1/onboarding. requireOwner. Body (strict, at least one field):
```ts
type OnboardingPatch = { done?: StepId[]; undone?: StepId[]; dismissed?: boolean };
```
Both return:
```ts
type StepId = "source_added" | "voice_set" | "preview_seen" | "sender_connected" | "first_subscriber" | "first_send" | "automation_on" | "widget_installed";
type OnboardingStep = { id: StepId; done: boolean; doneAt?: string; source: "derived" | "manual" };
type OnboardingState = { steps: OnboardingStep[]; completed: boolean; dismissed: boolean; nextStepId: StepId | null; activated: boolean };
```
Manual only: preview_seen, widget_installed (frontend must PATCH done for these). activated = first_send && first_subscriber.

### Email preview
POST /v1/email/preview. requireOwner. Rate 60/min per tenant. 10 MB parser, but content over 200 KB -> 413 PAYLOAD_TOO_LARGE. Nothing sent or stored.
```ts
type PreviewBody = {           // .strict()
  newsSourceId?: string;       // 1..128; default first source; unknown -> 404
  subject?: string;            // max 1000
  title?: string;              // max 1000, replaces first <h1>
  html?: string;               // sanitized
  text?: string;               // used when html empty
  language?: string;           // ^[A-Za-z]{2,3}([-_][A-Za-z0-9]{2,8})?$, default "en"
};
type PreviewResponse = { html: string; subject: string; warnings: string[]; sample: boolean };
```
Unsubscribe link renders as "#". warnings cover postal address, sender name, own sender, subject over 80 chars, images without alt.

### Subscribers
All requireOwner, tenant from auth.
- GET /v1/subscribers?newsSourceId&status&limit&cursor -> `Page<SubscriberItem>`. status: "accepted" | "pending". Unknown newsSourceId -> 404. Iterates sources in order.
- GET /v1/subscribers/count?newsSourceId -> `{ count: number; byNewsSource: Record<string, number> }`
- GET /v1/subscribers/:email -> `SubscriberDetail` (404 if not this tenant's)
- GET /v1/subscribers/:email/export -> `{ exportedAt: string; subscriber: SubscriberDetail; linkClicks: { newsSourceId: string; at: string; url: unknown }[] }` with Content-Disposition attachment.
- DELETE /v1/subscribers/:email?newsSourceId -> with newsSourceId `{ status: "unsubscribed" | "not_subscribed"; newsSourceId: string }`; without `{ status: "removed"; recordDeleted: boolean; linkClicksRemoved: number }`.
```ts
type Tuple = { configId: string; newsSourceId: string };
type SubscriberView = {
  email: string; name: string; language: string; bio?: string; countryOfResidence?: string; createdAt?: string;
  status: "accepted" | "pending"; confirmedAt?: string; newsSourcesConfigTuples: Tuple[];
};
type SubscriberItem = SubscriberView & { newsSourceId: string };
type SubscriberDetail = {
  email: string; name: string; language: string; bio?: string; countryOfResidence?: string; createdAt?: string;
  sources: { newsSourceId: string; status: "accepted" | "pending" | "unsubscribed"; subscribedAt?: string; confirmedAt?: string; unsubscribedAt?: string; pricingPlan?: string }[];
};
```
Note: no POST /v1/subscribers/import route exists (only a body parser prefix). Imports still go through POST /news-source/any-user-data-base-file-to-standard-format/:configId.

### Automations (requireOwner on all)
Rate limit `automations-run`: 10 per hour per tenant, shared by both run endpoints.

| Method | Path | Idempotency | Body / query | Success |
|---|---|---|---|---|
| GET | /v1/automations | no | none | 200 `{ items: Automation[]; nextCursor: null }` (legacy first, then by createdAt) |
| GET | /v1/automations/recipes | no | none | 200 `{ items: Recipe[] }` |
| POST | /v1/automations | optional | CreateBody | 201 Automation |
| POST | /v1/automations/run | optional | OneOffBody | 202 RunAccepted |
| GET | /v1/automations/:id | no | none | 200 Automation |
| PATCH | /v1/automations/:id | no | PatchBody | 200 Automation |
| DELETE | /v1/automations/:id | no | none | 200 `{ id: string; deleted: true }` |
| POST | /v1/automations/:id/toggle | no | `{ enabled: boolean }` strict | 200 Automation |
| POST | /v1/automations/:id/run | optional | RunBody | 202 RunAccepted |
| GET | /v1/automations/:id/runs | no | `?limit&cursor&preview=0|1|true|false` | 200 `Page<Run>` |

:id regex `^[A-Za-z0-9_\-.:@]+$`, max 160. Not owned -> 404. Legacy ids (`legacy_<newsSourceId>`) are readOnly: PATCH, DELETE, toggle -> 409 CONFLICT (edit the source schedule instead). Run on legacy is allowed. Max 100 stored automations (409). Sources referenced must belong to tenant (400 with details.newsSourceIds). PATCH uses optimistic concurrency: 409 "This automation changed while you were editing it".

```ts
type TriggerType = "schedule" | "new_article" | "new_subscriber" | "list_imported" | "manual" | "milestone";
type StepType = "fetch_candidates" | "select_best" | "extract_article" | "rewrite_voice" | "translate" | "pick_image"
  | "render_email" | "send_email" | "publish_blog" | "publish_wordpress" | "welcome_email" | "confirm_email" | "notify_owner" | "report";
type Milestone = "first_subscriber" | "subscribers_10" | "subscribers_100" | "first_send" | "bounce_spike" | "selector_failed" | "run_failed";
type ManualMode = "send_now" | "write_about_url" | "write_about_text";
type RecipeId = "daily_issue" | "weekly_digest" | "new_post_alert" | "welcome_new_subscriber" | "import_contacts" | "write_about_this" | "owner_nudges";

type Trigger =   // every params object is .strict()
  | { type: "schedule"; params: { cron: string /* 5 fields */; tz?: string /* IANA */ } }
  | { type: "new_article"; params: { newsSourceId: string; checkEveryMinutes?: number /* 30..1440 */ } }
  | { type: "new_subscriber"; params?: { newsSourceId?: string } }   // defaults {}
  | { type: "list_imported"; params?: { newsSourceId?: string } }
  | { type: "manual"; params: { mode: ManualMode; url?: string; text?: string /* <=50000 */ } }
  | { type: "milestone"; params: { kind: Milestone } };

type Step = {   // strict
  type: StepType;
  params?: Record<string, unknown>;    // JSON <= 10 KB
  optional?: boolean;
  retry?: { attempts: number /* 1..5 */; backoffMs: number /* 0..600000 */ };
};
type Settings = {   // strict: subjectMode (engine field) is NOT accepted here
  dryRun?: boolean;
  maxItemsPerRun?: number;            // 1..5
  languages?: string[];               // ^[a-z]{2,3}$, max 50
  quietHours?: { startHour: number; endHour: number; tz: string };
};

type CreateBody = {   // strict; without recipeId, name + trigger + steps are required
  recipeId?: RecipeId; name?: string /* 1..120 */; enabled?: boolean; trigger?: Trigger;
  steps?: Step[] /* 1..20 */; newsSourceIds?: string[] /* max 50 */; settings?: Settings;
};
type PatchBody = Partial<Omit<CreateBody, "recipeId">>;   // strict, at least one key

type Automation = {
  id: string; configuratorId: string; name: string; enabled: boolean; recipeId?: RecipeId;
  trigger: Trigger; steps: Step[]; newsSourceIds?: string[]; settings?: Settings;
  createdAt?: string; updatedAt?: string; lastRunAt?: string; lastRunStatus?: string; lastRunId?: string; nextRunAt?: string;
  stats?: { runs: number; sent: number; failed: number; costUsd: number; opens?: number; clicks?: number };
  source: "user" | "recipe" | "legacy";
  readOnly?: boolean;   // true for legacy
};
type Recipe = {
  id: RecipeId; name: string; description: string; trigger: Trigger; steps: Step[];
  defaults: { enabled: boolean; newsSourceIds: string[]; settings: Settings; recommended?: boolean };
};

type RunBody = { dryRun?: boolean; url?: string; text?: string; requestId?: string /* 8..200 */ };   // strict, not url and text together
type OneOffBody = {   // strict
  newsSourceId: string; mode: ManualMode; url?: string; text?: string; dryRun?: boolean; requestId?: string;
};   // write_about_url needs url, write_about_text needs text; unknown source -> 404
type RunAccepted = { runId: string; automationId: string; status: "queued" };   // one-off automationId = "legacy_<newsSourceId>"

type RunStatus = "queued" | "running" | "ok" | "partial" | "failed" | "skipped";
type SkipReason = "duplicate_run" | "no_new_items" | "no_subscribers" | "plan_limit" | "disabled" | "quiet_hours" | "source_inactive" | "config_missing";
type Run = {   // publicRun(): no expiresAt, no steps[].output, manual.text replaced by hasText
  id: string; automationId: string; configuratorId: string; trigger: TriggerType; triggerKey: string;
  status: RunStatus; dryRun: boolean; startedAt: string; finishedAt?: string; durationMs?: number;
  steps: { type: StepType; status: "pending" | "running" | "ok" | "failed" | "skipped"; attempts: number; startedAt?: string; finishedAt?: string; error?: string }[];
  items: { url: string; contentHash: string; title?: string }[];
  counts: { recipients: number; sent: number; failed: number; skippedDuplicate: number; languages: string[] };
  cost: { llmCalls: number; inputTokens: number; outputTokens: number; usd: number; cachedCalls: number };
  skipReason?: SkipReason; error?: string; warnings?: string[];
  previewHtml?: string;   // only with ?preview=1
  manual?: { mode: ManualMode; newsSourceId: string | null; url: string | null; requestId: string | null; requestedBy: string; hasText: boolean };
};
```
Engine notes (engine/automations is installed, so the engine path is used):
- listRuns: API calls `engine.listRuns(automationId, { limit, cursor, preview, configuratorId })` but the engine signature is `listRuns(automationId, limit?: number)`. The object becomes NaN in Math.min/max, so the limit is not applied as intended, and nextCursor is always null (engine returns an array). Treat runs as one page.
- engine.runManual requires newsSourceId; POST /v1/automations/:id/run on an automation with no newsSourceIds passes undefined. Engine errors map to 502 UPSTREAM_FAILED.
- Engine RecipeId also includes "owner_weekly_report"; GET recipes may return it, but POST with that recipeId fails validation.
- Engine has no deleteAutomation export (delete only removes the Firestore doc).

### Sender test
POST /v1/sender/test. requireOwner. Rate 5 per 10 min per tenant. Body strict `{ sendTo?: "me" }`.
200 `{ ok: boolean; checks: { id: "config_present" | "smtp_connect" | "auth" | "test_email_sent"; ok: boolean; message: string }[] }`.

### Billing (v1)
- GET /v1/billing/plan. requireOwner. 200 `{ plan: PlanId; planName: string; interval: "monthly" | "yearly"; provider: "tilopay" | "polar" | string | null; cancelAtPeriodEnd: boolean; planUpdatedAt: string | null; limits: { newsSources: number; subscribers: number }; upgradeUrl: string }` (limits use -1 for unlimited).
- GET /v1/billing/plans. Public, 120/min per IP, Cache 300 s. 200 `{ currency; intervals; plans: { id; name; tagline; monthly; yearly; limits: { newsSources; subscribers }; features: string[] }[] }` (internalOnly plans hidden).
- POST /v1/webhooks/polar. Polar Standard Webhooks signature (POLAR_WEBHOOK_SECRET), raw body. 401 INVALID_SIGNATURE.
- POST /v1/internal/billing/polar-event. x-internal-signature = base64url HMAC-SHA256(INTERNAL_API_SECRET, body). Body `{ webhookId?; type; data }`.

### Privacy
- GET /v1/privacy/export. requireOwner. 5/h per tenant. JSON attachment.
- POST /v1/privacy/delete-account. requireOwner. 5/h. Body `{ confirm: "DELETE" }`. 202 `{ status: "scheduled"; deletionRequestedAt: string; purgeAfter: string; message: string }`.
- POST /v1/privacy/cancel-deletion. requireOwner. 200 `{ status: "active"; message: string }`.
- GET /v1/public/privacy/subscriber?token. Public, 10 per 10 min per IP. 403 for bad token.
- POST /v1/public/privacy/subscriber/delete body `{ token }`. Public. 200 `{ status: "deleted"; message: string }`.

## 3. Legacy routes now guarded
requireOwner + requireTenantParam("configId" unless noted):
- POST /configurations/:configId/secret (10/h), POST /configurations/:configId/webhook (20/h)
- GET /leads/:configuratorId, GET /leads/:configuratorId/:newsSourceId/:newsletterUserId (param configuratorId)
- PUT /news-source/:configId/:newsSourceId, GET and DELETE same path, POST /news-source/:configId/:newsSourceId/trigger
- PUT /news-source/personality/:configId/:newsSourceId, POST /news-source/:configId (20/h), PUT /news-source/regenerate-selectors/:configId/:newsSourceId (30/h), POST /news-source/generate-selector/:configId (30/h), POST /news-source/any-user-data-base-file-to-standard-format/:configId (400/h)

requireOwner only (tenant from auth): POST /config, PUT /config, GET /configuration-news-sources, GET /private-config, POST /news-source/send-email (10/h), POST /news-source/generate-newsletter (20/h), DELETE /delete-user/:email, GET /users/:email, PUT /subscriber/:email, POST /subscribe, GET /config-subscribers/:configId (requireOwner, tenant checked in handler).

authMiddleware(true) (same credentials, legacy 401/403 shape): POST /newsletter/send-custom-content, POST|GET /apikeys/:configId, DELETE /apikeys/:configId/:apiKeyHash.
lazyMultiAuth(true) (owner, API key Bearer, or body.pass system caller; :configId must match): POST /users/:configId/:newsSourceId, GET /newsletter/users/:configId/:newsSourceId, GET /newsletter/search, GET /segmented-subscribers/:configId.

Public: POST /public-subscribe, GET /confirm-subscription (30 per 10 min), GET|POST /unsubscribe/:email, GET /articles/:email, GET /articles/:email/languages, GET /article/:id, GET /lead-counter, GET /geo, /docs.

## 4. Config endpoints
- GET /config still works unauthenticated, via optionalOwner:
  - valid owner and no ?documentId (or own id): ownerConfig (secrets masked), creates the default config on first use.
  - anonymous with ?documentId (or x-auth-email header and no credentials): publicConfig (branding, public sources), Cache 60 s, 404 if missing.
  - credentials sent but invalid and no ?documentId: 401.
- GET /public-config-info?configuratorId&newsSourceId. Public, 120/min, Cache 300 s.
```ts
type PublicConfigInfo = {
  newsletterTitle: string; senderName: string; description: string;   // "" when unset
  logo?: string; brandColor?: string;
  language?: string; languages?: string[]; isPaidNewsletter?: boolean; // only with newsSourceId
};
```
  400 without configuratorId, 404 when owner or source is missing.
- Admin: GET /all-configurations?limit(1..200, default 50)&offset(0..5000) is the only requireAdmin endpoint. Returns ownerConfig[] (no pagination envelope). No other admin endpoints exist.

## 5. Socket.IO (path /socket-io)
Client emits: `register` `{ token?; sessionToken?; id?; accessCode? }` (session token preferred; legacy id + accessCode), `resetAck`, `ping`.
Server emits: `registered` `{ room: string; method: string }`, `error` `{ code: "UNAUTHENTICATED" | "RATE_LIMITED" | "BAD_REQUEST" | "INTERNAL"; message: string }`, `log` (string), `resetPage`, `automation:run` (Run without step outputs or previewHtml, only to the owner room).
Register limits: 5 per socket per minute, 30 per IP per 5 min. Idle disconnect after 15 min (log line then disconnect).

## 6. Billing mounts and flags
- main.ts mounts billingRouter(app) and newsletterBillingRouter(app) at /api before body parsers; v1Router includes billingV1Router. No feature flag turns any of them off: they are always mounted.
- Owner Tilopay (/api): POST /api/subscribe (requireOwner, idempotent "billing-subscribe", body `{ planId: "starter"|"growth"|"pro"|"master"; interval?: "monthly"|"yearly"|"annually"; firstName?; lastName?; phone?; address?; city?; country?; zip? }` passthrough, 200 `{ success: true; url: string; orderNumber: string }`), POST /api/cancel-subscription (requireOwner, idempotent, 200 `{ success: true; message }`, 400 when Polar managed or no subscription), webhooks /api/webhook-success|webhook-cancel-subscription|webhook-rejected|webhook-reactivate-subscription?token=, GET /api/payment-success and /api/payment-cancel (redirect to /dashboard?payment_success=true or payment_cancelled=true).
- Reader Tilopay (/api): POST /api/newsletter-subscribe (widget server, x-internal-signature), POST /api/newsletter-cancel-subscription (signed manage link or internal signature), webhooks /api/newsletter-webhook-success|newsletter-webhook-cancel?token=, GET /api/newsletter-payment-success (redirect to /confirm-subscription).
- Polar (/v1): see section 2.
- Env that gates behaviour (not mounting): TILOPAY_API_KEY, TILOPAY_API_USER, TILOPAY_PASSWORD (checkout fails 502 without them), TILOPAY_WEBHOOK_TOKEN (webhooks fail closed without it), POLAR_WEBHOOK_SECRET, POLAR_PRODUCT_PLAN_MAP, INTERNAL_API_SECRET. Other flags: LEGACY_CODE_AUTH (default true), LEGACY_UNSIGNED_LINKS (default true), ADMIN_EMAILS, SESSION_TTL_DAYS (30), CORS_ORIGINS, FRONTEND_URL.

## 7. Helper signatures

API/_lib/firestore.ts
```ts
type Doc<T = Record<string, any>> = T & { id: string; _updateTime?: string };
getDoc<T>(path: string): Promise<Doc<T> | null>
createDoc(collectionPath: string, id: string, data: Record<string, unknown>): Promise<boolean>   // false if exists
type PatchOptions = { mask?: string[]; exists?: boolean; updateTime?: string };
patchDoc(path: string, data: Record<string, unknown>, opts?: PatchOptions): Promise<void>       // merge; creates unless exists:true
deleteDoc(path: string): Promise<boolean>                                                       // false if missing
type ListOptions = { pageSize?: number /* 1..300, default 25 */; pageToken?: string | null; orderBy?: string };
listDocs<T>(collectionPath: string, opts?: ListOptions): Promise<{ docs: Doc<T>[]; nextPageToken: string | null }>
listAll<T>(collectionPath: string, maxDocs?: number /* 10000 */): Promise<Doc<T>[]>
runQuery<T>(parentPath: string /* "" = root */, structuredQuery: Record<string, unknown>): Promise<Doc<T>[]>
countQuery(parentPath: string, structuredQuery: Record<string, unknown>): Promise<number>
incrementFields(path: string, increments: Record<string, number>, set?: Record<string, unknown>): Promise<void>
where(field: string, op: "EQUAL"|"LESS_THAN"|"LESS_THAN_OR_EQUAL"|"GREATER_THAN"|"GREATER_THAN_OR_EQUAL"|"ARRAY_CONTAINS"|"IN", value: unknown)
and(...filters: any[])
resourceName(path: string): string; encodeValue(v: unknown): any; class FirestoreError(status, message)
```
Dates written as Date come back as ISO strings.

API/_lib/plans.ts
```ts
type PlanId = "free" | "starter" | "growth" | "pro" | "master" | "vipfree";
type LimitedResource = "newsSources" | "users";
planOf(config: { pricingPlan?: string } | null | undefined): PlanId          // unknown -> "free"
planInfo(plan: PlanId): { id: PlanId; name: string; limits: Record<LimitedResource, number> }
limitFor(plan: PlanId, resource: LimitedResource): number                     // -1 unlimited
upgradeUrl(): string
assertWithinLimit(config, resource: LimitedResource, wouldBe: number): void  // throws 402 PLAN_LIMIT_REACHED
countSubscribersForSource(configId: string, newsSourceId: string): Promise<number>
countSubscribers(configId: string, newsSourceIds: string[]): Promise<number>
```

API/v1/automations/shared.ts
```ts
type TenantConfig = Partial<Config> & Record<string, any>;
loadTenantConfig(tenantId: string): Promise<TenantConfig>      // {} when missing
newsSourcesOf(config): NewsSource[]
isActiveSource(ns: NewsSource): boolean                       // ns.active === true
hostOf(url?: string | null): string
sourceLabel(ns?: NewsSource): string
randomHex(chars: number): string
ownerSender(config, ns?): { user?; pass?; senderEmail?; senderName?; host? }   // server only
hasOwnSender(config): boolean
monthPeriod(now?: Date): { key: "YYYY-MM"; start: string; end: string }
```

API/_lib/validate.ts
```ts
validate(schemas: { body?: Schemaish; query?: Schemaish; params?: Schemaish })   // sets req.valid.{params,query,body}
route(fn: (req, res, next) => unknown)                                           // async wrapper
parseOrThrow<T>(schema, value, where: "body" | "query" | "params"): T
formatIssues(error): { path: string; message: string }[]
EMAIL_RE; normalizeEmail(email: string): string
```

API/_lib/rateLimit.ts
```ts
type RateLimitOptions = { name: string; limit: number; windowMs: number; key?: (req) => string | null | undefined };  // null skips
rateLimit(opts: RateLimitOptions)    // middleware, fixed window, in memory, per process
hit(name: string, key: string, limit: number, windowMs: number, now?: number): { remaining: number; resetAt: number }  // throws RATE_LIMITED
clientIp(req): string
```

API/_lib/auth.ts
```ts
type AuthInfo = { email: string; tenantId: string; method: "session" | "legacy-code" };
requireOwner(); optionalOwner(); requireTenantParam(param = "configId"); requireAdmin(); authOf(req): AuthInfo
authenticate(req): Promise<AuthInfo | null>; createSession(email, meta?): Promise<{ token; expiresAt }>; revokeSession(token): Promise<void>
sessionTokenFrom(req): string | undefined; sameTenant(a, b): boolean; isAdmin(info): boolean; SESSION_PREFIX = "aiban_s_"
```

db/configuration/getAllConfigurationsDocuments.ts: `default (limit?: number, offset?: number): Promise<Config[]>`. Uses listDocs("configurations") with pageSize up to 300, follows nextPageToken until start + take docs (cap MAX_CONFIG_DOCS = 5000), adds `configuratorId` = doc id, strips id and _updateTime, then slices [offset, offset + limit]. Ordered by document id.

## 8. Gaps worth knowing for WS6
1. Runs pagination via engine is effectively broken (limit object passed as number, nextCursor always null).
2. Settings.subjectMode exists in the engine but /v1 rejects it (strict schema).
3. Recipe "owner_weekly_report" can come from the engine list but cannot be created.
4. No /v1/subscribers/import, no /v1 news source endpoints, no /v1 config endpoint: keep legacy calls for those.
5. POST /v1/auth/logout does not require auth; it is safe to call with any token.
6. GET /v1/automations has no real pagination (nextCursor always null, max 100 stored plus legacy).
