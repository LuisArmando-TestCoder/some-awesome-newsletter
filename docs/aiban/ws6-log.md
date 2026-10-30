# WS6 log

## 2026-10-30
- 07:38 Connected folders were not attached at start; requested access to both project folders (granted).
- Read CHARTER, COPY_RULES, requests/6.md (empty), AUTOMATIONS.md (WS8 v1).
- Ran 3 subagents (API map, security review, caller inventory). Reports: ws6-api-map.md, ws6-security.md, ws6-callers.md.
- Sent Luis a push notification about the critical backend account takeover (WS7 scope).
- Tooling: the computer shell cannot install `@rollup/rollup-linux-arm64-gnu` (npm 403 by policy). For `svelte-check` I load a stub of that package from `$HOME/linuxdeps` (outside the project) through NODE_PATH; nothing in the project changed. Baseline: 210 errors app-wide, 14 in WS6 files.
- Cloud workspace cannot reach the npm registry either (proxy refuses registry.npmjs.org), so `vite build` cannot run in this session anywhere. `npm run build` must run on the Mac (WS10). A one-off tarball of the project was written to `.ws6-tmp/frontend.tgz` for staging; it can be deleted.
- Type checks run in a mirror at `$HOME/femirror` in the computer shell (outside the project) because `svelte-kit sync` needs to delete files in `.svelte-kit` and deletes are blocked in connected folders. The mirror has no `.env`, so `$env/static/private` names show as missing there (oauth route); not a real error.

### Files created
- `src/lib/api/{config,credentials,errors,client,schemas,socket,imports,automations,activity,usage,billing,events,preview,index}.ts`, `src/lib/api/server/identity.ts`
- `src/lib/stores/{saveStatus,optimistic,sessionLifecycle}.ts`, `src/lib/utils/sanitizeHtml.ts`
- `src/hooks.server.ts`, `src/routes/api/{csp-report,support}/+server.ts`
- `src/components/systems/requests/_internal.ts`
- Tests: `src/lib/api/__tests__/{loader,register}.mjs`, `api.test.mjs` (19 passing, `node --test`)
- Docs: `API_CONTRACT.md`, `ws6-audit.md`, `ws6-plan.md`, `ws6-api-map.md`, `ws6-callers.md`, `ws6-security.md`, `ws6-summary.md`

### Files changed
- All 29 request modules in `src/components/systems/requests/` re-implemented on the client. Same exported names, signatures and failure contracts (null / false / throw / string, as each caller expects). Fixes: `getPublicConfig` (public fields, new endpoint with fallback), `getUsersFromRawFileOrText` (newsSourceId, NDJSON), `getAuthHeaders` (no `given_name`/`picture`), `askForNewAuthCode` (sets `authCodeRequestError` on failure), `askIsAuthCodeValid` (sets `authError`), `logout` (keeps preferences, closes socket, accepts a click event), `createNewsSource` (default schedule `0 9 * * 1`, keeps `active:false`), store updates no longer re-PUT the whole config after news source edits.
- `src/components/store.ts`: no more auth cookies (old ones expired on first write), `subscribers`/`leads` not persisted, `apiURL` from `$lib/api/config`, `saveToConfig` debounced and coalesced with `saveStatus`, new `flushConfigSave`, import cycle with `updateConfiguration` removed.
- `useConfigurator.ts` (no polling interval, cleans up), `SocketClient.svelte` (thin mount over `$lib/api/socket`), `GlobalData.svelte`, `GlobalData/ticks.ts` (no nested onMount), `audioInteractions.ts` (no unhandled play rejections, respects reduced motion), `scroll.ts` (no throw), `helpers/cronToNaturalLanguage.ts` (re-export of the single copy), `lib/utils/checkPlanLimits.ts` (one limits table), `lib/config/runtime.ts` (app name "AIBAN" instead of "Platform of Platforms"; mock mode off unless forced).
- Server: `routes/api/portal` (POST, verified owner, no customer creation), `routes/api/checkout` (param allow-list, product allow-list env), `routes/api/webhook/polar` (signature, idempotency, forwarding), `routes/subscribe-widget/subscribe` (no THE_PASS, validation, rate limits, `/public-subscribe`, payment only for listed owners), `routes/help/+page.server.ts` (no mock data), `svelte.config.js` (CSP report-only).
- Originals of every rewritten file were copied to `$HOME/ws6orig` in the computer shell (outside the project) and are also in `_aiban_backups/`.

### Moved to `_deprecated/`
- `src/lib/polar.ts` (unused, Polar sandbox), `src/lib/api/auth.ts` (called routes that do not exist), `src/lib/stores/session.ts` (only used by auth.ts), `src/components/GlobalData/localSessionFallbackFetch.ts` (unused), `src/components/systems/helpers/cronToNaturalLanguage.ts` (identical duplicate; replaced by a re-export).

### Decisions taken (reversible)
- No server-side auth guard on `/dashboard`: the session lives in the browser (localStorage) and onboarding runs inside `/dashboard` for signed-out visitors. The guard belongs after WS7 issues an HttpOnly session cookie. Dashboard responses are `no-store` and `noindex`.
- CSP ships report-only; frame-ancestors, object-src and base-uri are enforced.
- `tsconfig.json` not tightened further: it is already `strict`, and 200+ errors app-wide belong to other workstreams.
- vitest not added (npm blocked); tests use `node --test` with a small loader instead.

### Requests sent
- WS1 (test script, DOMPurify), WS2 (pricing fix helper, sanitize sinks, support endpoint), WS3 (oauth tokens in logs and URL, state param, sandboxed preview), WS4 (new helpers, save status, sanitize sinks, portal), WS5 (proxy and public config), WS7 (critical auth issues, endpoints, error shape, socket).

## 2026-10-30 (second session, after Luis's decisions)
Luis decided: paid flag lives in the database; a platform admin dashboard for him; payment processors off for now (kept for later); sessions via a bare token header on every request, no cookie.
- Found WS7's /v1 API and session tokens. Mapped it with a subagent (`ws6-v1-map.md`).
- Auth: `credentials.ts` stores `sessionToken`/`sessionExpiresAt` and sends `Authorization: Bearer` (plus `x-auth-email`, `x-auth-code` during migration); client drops the token on 401; `askIsAuthCodeValid` stores the token and takes a third `onError` callback (WS4 request 6); `logout()` revokes the token on real sign out; socket `register` sends the token; server `verifyOwner` accepts the Bearer token via `GET /v1/auth/session`.
- Errors: /v1 envelope and codes mapped (`PLAN_LIMIT_REACHED`, `RATE_LIMITED` with retryAfterSeconds, etc.). `idempotencyKey` option sends `Idempotency-Key` and makes POSTs retryable.
- Helpers moved to /v1: automations (PATCH, toggle, runs page, runAutomation, recipes), activity (`getActivityPage`, `describeActivity`), usage (`/v1/usage`), onboarding (new `$lib/api/onboarding.ts`; `track()` now marks `preview_seen`/`widget_installed` instead of calling a missing `/events`), email preview (`renderEmailPreview`).
- New: `$lib/stores/planUsage.ts`, `$lib/config/features.ts` (`payments: false`), `getNewsletterUsersByNewsSourceOrThrow`, Config and NewsSource type fields (WS4 request 1).
- Payments: found billing helpers and Polar routes already parked in `_deprecated/` and the proxy's payment step removed (done by another session); kept that and added the `features.payments` switch.
- Admin dashboard: frontend `src/routes/admin/+page.svelte` (+ `+page.ts`, CSR only), `src/lib/api/admin.ts`; backend `API/v1/admin/adminV1Router.ts` + one line in `API/v1/v1Router.ts` (outside WS6 ownership, done on Luis's direct request; WS7 and WS10 told). `/admin` is `no-store` and `noindex` in hooks.
- Checks: no type errors in WS6 files (the admin page was also checked without its style block, since CSS preprocessing needs esbuild); `deno lint` clean for the new backend file; 24 unit tests pass.
- Requests: 7.md (admin router notice, unmount billing, legacy auth, /v1 bugs), 2.md and 4.md (hide payment buttons), 10.md (new route).

## 2026-10-30 (third pass, Luis: admins in the database, full admin UI)
- Neither .env had ADMIN_EMAILS or any email. Luis chose `oriens@aiban.news`; appended `ADMIN_EMAILS=oriens@aiban.news` to the backend `.env` (no other line touched).
- Note: a grep for admin-related env names also matched `TYPESENSE_ADMIN_API_KEY` and printed its value in this session's shell output. The value is marked terminated in the file; Luis was told. Nothing was copied anywhere.
- Backend: new `API/_lib/admins.ts` (Firestore `platform/admins`, env bootstrap seeded on first read, env admins cannot be removed, no self removal, updateTime guard, 30 s cache); `requireAdmin()` in `_lib/auth.ts` checks env or database; `adminV1Router.ts` adds `/me`, admins CRUD, audit log, and writes `adminAudit` entries on every change. `deno lint` clean apart from WS7's pre-existing `require-await` in `authenticate`.
- Frontend admin UI: `src/routes/admin/+layout.svelte` (full-screen shell: access gate via `/v1/admin/me`, sidebar, phone bottom bar, top bar with refresh, display settings, sign out, "Payments off" pill), pages Overview, Customers (search, plan and status filters in the URL, sorting, paging, CSV export), Customer detail (usage meters, plan change with confirmation, VIP, notes, newsletter switches with pause confirmation, change history, blog and signup links), Newsletters (all newsletters with inline switches, filters, CSV), Admins (add, remove with confirmation, server admins marked), Change log (paged, filter). Shared: `src/lib/admin/{state,format}.ts`, `PageHeader`, `ConfirmDialog`, `PlanBars`. Root layout hides the marketing header under `/admin` (WS1 told).
- Checks: mirror type check now skips style preprocessing (esbuild cannot run in this shell); 0 errors in WS6 and admin files; 25 unit tests pass.

## 2026-10-30 (fourth pass, Luis: remove Polar and Tilopay completely)
Deleted (with Luis's approval to delete in both folders):
- Frontend: `_deprecated/src/lib/polar.ts`, `_deprecated/src/lib/api/billing.ts`, `_deprecated/src/routes/api/{portal,checkout,webhook}`, `_deprecated/src/lib/ui/organisms/Pricing.before-ws2.svelte` (old Tilopay checkout), `_deprecated/_empty_dirs/routes-api-webhook/polar`, `node_modules/{@polar-sh,standardwebhooks,fast-sha256,@stablelib/base64}`, stale build output `.svelte-kit/output` and the old route types.
- Backend: `_deprecated/API/billing/**`, `_deprecated/API/v1/billing/**`, `_deprecated/tests/api/billing_{tilopay,polar}.test.ts`, the same in `_deprecated/_ws7_reapply_dup/`, empty `API/billing/`.
Changed:
- `package.json` and `package-lock.json`: removed `@polar-sh/sdk`, `@polar-sh/sveltekit` and the 5 packages only they used (lock diff: deletions only).
- `.env` (both): removed every `POLAR_*` and `TILOPAY_*` line (values not printed).
- Frontend: `types.ts` (no `tilopaySubscriptionId`), `features.ts` comment, 37 dashboard locales (unused `dash.billing.payNote` key that named Tilopay), `scripts/copy-lint.mjs`, `scripts/i18n-check.mjs`, `scripts/ws1-remove-unused-deps.sh` (folder check no longer depends on Polar).
- Backend: `types.ts`, `db/newsletter/subscriberStore.ts`, `db/gdpr/{owner,subscriber,types}.ts`, `db/newsletter/confirmationMailer.ts`, `helper/configProjection.ts`, `API/v1/admin/adminV1Router.ts` (no `billingProvider` write), `API/_lib/config.ts`, `API/v1/plans/plansV1Router.ts` and `API/compat/miscCompat.ts` comments, tests (`compat_misc`, `config_endpoints`, `gdpr_erasure`, `subscribers_endpoints`).
- Live docs: both CHARTER copies, STRATEGY, API_CONTRACT, backend `docs/v1/_index.md`, `docs/configuration/environment.md`.
Added:
- `helper/retiredPaymentFields.ts`: the only remaining place that names the old provider fields. Firestore may still hold `tilopaySubscriptionId`, `polarCustomerId`, `polarSubscriptionId`, `billingProvider`; this list keeps them out of API responses, exports and templates.
- `db/maintenance/scrubRetiredPaymentFields.ts`: removes those fields from Firestore (dry run by default, `--apply` to write). After it runs, delete `retiredPaymentFields.ts` and its 4 imports.
Left as they are (history, not code): work logs, audits and request files under `docs/aiban/`, `_aiban_backups/` snapshots, `.git_disabled/`. Unrelated matches: "Polaris" (a company in `sales_letters`/`generated_templates`), "polarization"/"Bipolar" tags, Italian "popolare".
Checks: frontend type check unchanged (no new errors), 25 unit tests pass, `deno lint` clean on every edited backend file.
