# WS10 QA, part F: security review

Date: 2026-10-30, about 09:10 UTC. Read-only review of the code on disk. No secret values were opened; only variable and file names.
Frontend: `some-awesome-newsletter`. Backend: `ai-newsletter-translated`.

WS7 was still working while this ran. Files changed in the last 20 minutes (results there may move): backend `main.ts`, `types.ts`, `deno.json`, `.dockerignore`, `db/gdpr/*`, `db/newsletter/{confirmationMailer,subscribeService,markBounced,getUsersGroupedByLanguageFromSubscribers}.ts`, `db/auth/getFallBackAuth.ts`, `db/configuration/updateNewsSourceField.ts`, `scripts/scrubOwnerAppPasswords.ts`, `docs/**`; frontend `src/components/systems/requests/{askIsAuthCodeValid,logout,updateConfiguration,getNewsletterUsersByNewsSource}.ts` and several dashboard components. Re-check findings 2, 3, 5 and 9 after WS7 finishes.

## Summary

| # | Severity | Release blocking | Finding | Owner |
|---|---|---|---|---|
| 1 | High | Yes | Legacy permanent credential still accepted by default (`LEGACY_CODE_AUTH` defaults to true). For Google users it is the Google `sub`, a stable id that every other app the user signs into with Google also sees. Email users have a permanent 6 digit code | WS7 + WS3 + WS6 |
| 2 | High | Yes | `/oauth` still puts the ID token, Google `sub`, email and client id in the `/dashboard` query string (server access logs, browser history) | WS3 |
| 3 | High | Yes | Unsubscribe links built by the engine carry no signature. With `LEGACY_UNSIGNED_LINKS` on (default) anyone can unsubscribe any reader; with it off, every unsubscribe link and the RFC 8058 one-click break | WS8 (+WS7 env) |
| 4 | High | Yes (rotation) | `THE_PASS` (Firestore `system/secret.the_pass`) and `INTERNAL_API_SECRET` still work as a master key for every tenant on 4 routes, including reading any tenant's full subscriber list. THE_PASS was logged by the old frontend proxy | WS7 |
| 5 | Medium | Before EU launch | GDPR erasure misses several collections (top-level `automations`, `automationRunIndex`, `automationLocks`, `mailConnections`, `mailDeferred`, `mailBudgets`, `configurations/{id}/invitations`, `configurations/{id}/deliveries`, `supportRequests`, `idempotencyKeys`). Subscriber self-service has no way to get a privacy link. No owner UI for export or delete | WS7 + WS8 + WS4 |
| 6 | Medium | No | Dashboard accepts `x-auth-email` / `x-auth-code` from any link (session fixation into an attacker's account) | WS4/WS3 |
| 7 | Medium | No | Stored XSS path: scraped/LLM article HTML goes into detached `div.innerHTML` in `FeaturedArticlesGrid`, `TextArticlesGrid`, `ArticleModal` (shown on the authenticated dashboard). The session token is in localStorage | WS2 (components) + WS8 (sanitize at store) |
| 8 | Medium | No | Gmail connect callback binds the Google account to the tenant in `state` only; an attacker can send a victim their own consent link and get the victim's Gmail sending into the attacker's tenant | WS8 |
| 9 | Medium | No | Open redirect at backend `/lead-counter?leadUrl=` (any https URL) and forgeable click records | WS7 |
| 10 | Medium | No | CORS falls back to reflecting any origin (without credentials) when `CORS_ORIGINS` is unset; same for Socket.IO. Google audience is unpinned when `GOOGLE_CLIENT_IDS`/`SECRET_CLIENT_ID` are unset. Neither is enforced at boot in production | WS7 |
| 11 | Medium | No | Articles of a private newsletter are readable by anyone through `/articles/:email` and `/article/:id` (no `isPublic` check). `/public/blogs` lists owner emails | WS7 / product |
| 12 | Medium | No | All rate limits are in memory per process: lost on restart, not shared between instances. The SvelteKit widget proxy reaches backend `/public-subscribe` from one server IP, so 10 signups in 10 minutes across all customers block the proxy path | WS7 + WS6 |
| 13 | Low | No | Backup archives with real secrets inside the project folders (`_aiban_backups/backend-2026-10-30-pre-overhaul.tgz` holds `.env`, `serviceAccountKey.json`, `typesensecloudserviceaccount.json`, `secrets/`; frontend `_aiban_backups/frontend-2026-10-30-pre-overhaul.tgz` holds `.env`). `_aiban_backups/` is not in either `.gitignore` | Luis / WS7 |
| 14 | Low | No | Blind SSRF: image HEAD checks (`engine/automations/defaultDeps.ts:57`, `engine/generateEmailContent.ts:106`) fetch URLs from scraped content without the SSRF guard. WordPress posting checks the URL only at save time and follows redirects | WS8 |
| 15 | Low | No | PII in logs: subscriber emails in `engine/emailSender.ts:109,111,253,255`, API key hashes in `API/newsletter/apiKeyEndpoint.ts:63-86`; subscriber emails in browser console in `H_Dashboard/Users/UserDataService.ts` and `UserActions.svelte` | WS8, WS7, WS4 |
| 16 | Low | No | Frontend CSP is report-only; enforced header only carries `frame-ancestors`, `object-src`, `base-uri`. `connect-src` includes `localhost:8000` in production | WS6 |

What is fixed since the WS6 review: Google sign-in account takeover, public `/config` and `/all-configurations`, app password returned to the browser, `/api/subscribe` and `/api/cancel-subscription` (removed with billing), socket room hijack, header logging, code logging, Polar portal, THE_PASS in the widget proxy, template double evaluation (RCE), SSRF in scraping, security headers on both servers.

## 1. Secrets in the client bundle

Status: OK.
- `$env/static/private` is imported only in `src/routes/oauth/+server.js:5` and `src/routes/oauth/oauthState.server.js:6` (both server only). No `$env/dynamic/private` in `src` (one mock in `src/lib/api/__tests__/loader.mjs`).
- No `PRIVATE_`, `SECRET_`, `THE_PASS`, Polar, Stripe, Google API key or private key patterns in client code or `static/`. `static/google1fbcc0cba7cf3e99.html` is a Search Console verification file (public by design).
- `.svelte-kit/output/client` has no matches for `client_secret`, `THE_PASS`, `SECRET_CLIENT_SECRET`, `POLAR_ACCESS_TOKEN`.
- Frontend `.gitignore` covers `.env` and `.env.*`. Temporary archives `.ws6-tmp/frontend.tgz`, `_ws10_tmp/*.tgz`, `_ws3_tmp/fe.tgz` contain no `.env` (checked by name). They should still be deleted before any deploy that uploads the folder.
- Backend: no hard-coded secret values found in source (pattern scan over `*.ts`, `*.js`, `*.json`, `*.html` outside backups and secret files). `serviceAccountKey.json`, `typesensecloudserviceaccount.json`, `secrets/` are in `.gitignore` and `.dockerignore`. `db/projectId.ts:26` still reads `typesensecloudserviceaccount.json` from disk as a fallback; `helper/serviceAccount.ts:56` falls back to `./serviceAccountKey.json`. Fine for local dev; in production use `FIREBASE_SERVICE_ACCOUNT_JSON` and `TYPESENSE_SERVICE_ACCOUNT_JSON`.
- Backup archives with real secrets: see finding 13.

## 2. Headers, CSP, CORS, cookies

Frontend `src/hooks.server.ts`:
- Sets `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, `COOP same-origin-allow-popups`, HSTS (https only), `X-Frame-Options: DENY` plus `Content-Security-Policy: frame-ancestors 'none'; object-src 'none'; base-uri 'self'` everywhere except `/subscribe-widget` and `/subscribe`, which get `frame-ancestors *` and no XFO (correct for embedding).
- `Cache-Control: no-store` and `X-Robots-Tag: noindex` on `/admin`, `/dashboard`, `/oauth`, `/api`, `/login`, `/signup`, `/start`.
- `handleError` hides stack traces.
- Full CSP (`svelte.config.js:13-39`) is `reportOnly`. Reports go to `/api/csp-report`. Not enforced yet (finding 16). Prerendered pages get the CSP as a meta tag, where `frame-ancestors` has no effect; the hook covers dynamic responses only.

Backend `API/_lib/security.ts`:
- `nosniff`, `Referrer-Policy`, `X-Frame-Options DENY`, COOP, CORP cross-origin, `Permissions-Policy`, strict CSP for HTML pages (`default-src 'none'`, `form-action 'self'`, `frame-ancestors 'none'`), HSTS in production, `x-powered-by` off.
- CORS: public prefixes get `*` without credentials; others only the `CORS_ORIGINS` allowlist with credentials. When `CORS_ORIGINS` is unset, any origin is reflected without credentials and a warning is logged (`main.ts:73`). Because auth is a header token, not a cookie, the practical risk is low, but set `CORS_ORIGINS` in production and consider failing boot without it (finding 10).
- Socket.IO uses the same allowlist (`socketCorsOrigin`), open when `CORS_ORIGINS` is unset.
- `trust proxy` is pinned to `TRUST_PROXY_HOPS` (default 1), so `req.ip` cannot be spoofed beyond one hop.

Cookies: no auth cookies (decision: Bearer header). Only the OAuth `state` cookie (`oauthState.server.js:15`). Legacy key cookies are expired on load (`store.ts:317-319`, `sessionLifecycle.ts:39-40`).

## 3. Auth guards per route

Middleware: `requireOwner` (session token or legacy email + code), `requireTenantParam`, `requireAdmin` (404 for non-admins), `multiAuth` (system pass, owner, or API key bound to `:configId`).

Public (by design): `GET /healthz`, `/readyz`, `/geo`, `/docs/*` (traversal blocked, `docs/aiban` hidden), `/PRIVACY_POLICY`, `/LICENSE`, `/README`, `POST /auth/:email`, `GET /auth/:email`, `POST /auth/verify`, `POST /v1/auth/logout`, `GET /public-config-info`, `GET /public-config/:id`, `GET /config` (public projection only when not signed in), `POST /public-subscribe`, `GET /confirm-subscription`, `GET|POST /unsubscribe/:email`, `GET /articles/:email`, `GET /articles/:email/languages`, `GET /article/:id`, `GET /lead-counter`, `GET /v1/billing/plans`, `GET|POST /v1/public/invitations/accept` (token), `POST /public/preview-issue` (501), `GET /public/blogs`, `POST /support`, `GET /v1/public/privacy/subscriber` (token), `POST /v1/public/privacy/subscriber/delete` (token), `GET /v1/mail/gmail/callback` (signed state).

Owner (requireOwner, tenant from the session): all `/v1/*` owner routes (automations, activity, usage, onboarding, email preview, sender test, subscribers, privacy export/delete, mail status/connect/disconnect, auth session), compat `/automations*`, `/activity`, `/usage`, `/events`, `/onboarding/events`, `/invitations/*`, `GET /private-config`, `PUT|POST /config`, `/configuration-news-sources`, `/configurations/:configId/{secret,webhook}`, `/leads/:configuratorId*`, every `/news-source/*` route, `/newsletter/deliveries/:configId`, `/newsletter/counts/:configId`, `/config-subscribers/:configId`, `/users/:email`, `/subscriber/:email`, `/delete-user/:email`, `/subscribe`, `/apikeys/*`, `/newsletter/send-custom-content`.

Multi (owner, API key or system pass): `POST /users/:configId/:newsSourceId`, `GET /newsletter/users/:configId/:newsSourceId`, `GET /newsletter/search`, `GET /segmented-subscribers/:configId`.

Admin: `/v1/admin/*`, `GET /all-configurations`.

No route was found that reads or writes tenant data without auth, apart from the system pass (finding 4) and the article endpoints (finding 11).

Previously reported critical bugs:
- Google sign-in accepting any account for any email: FIXED. `API/v1/auth/authService.ts:229-250` requires a verified token whose `email` equals `:email` (`googleEmailMatches`, `helper/verifyGoogleIdToken.ts:96-100`), audience pinned when `GOOGLE_CLIENT_IDS` or `SECRET_CLIENT_ID` is set (`googleAudience`, line 54). Residual: when neither is set the caller's `client_id` is trusted (finding 10).
- `/config` and `/all-configurations` public: FIXED. `getConfigurationEndpoint.ts:51-80` returns the owner projection only to the authenticated owner, otherwise `publicConfig` (branding and public sources). `getAllConfigurationsEndpoint.ts:20-22` uses `requireAdmin()`.
- `/api/subscribe` and `/api/cancel-subscription` trusting `x-auth-email`: FIXED by removal. `API/billing/` is empty and no route matches (billing providers removed 2026-10-30). Frontend payment routes are in `_deprecated/`.
- Config endpoint returning the Gmail app password: FIXED. `helper/configProjection.ts` `withoutOwnerSenderSecrets` drops `appPassword`, `emailMaskSender`, `email.auth` on read and write; `hasAppPassword` boolean only. Old values stay at rest until the next save or until `scripts/scrubOwnerAppPasswords.ts` runs (new file, run it before launch).
- Frontend `/admin`: the page is `ssr = false` and renders nothing private itself; all data comes from `/v1/admin/*` behind `requireAdmin()` with a 120/min limit. Guarded on the server. A non-admin sees the "not_admin" state.

## 4. Tenant isolation

- `requireTenantParam` on every `:configId` / `:configuratorId` route; handlers then use `authOf(req).tenantId`, not the URL.
- Subscriber routes by email (`/users/:email`, `/subscriber/:email`, `/delete-user/:email`, `/subscribe`) only allow the caller's own address. `/v1/subscribers/:email` checks `belongsToTenant`.
- Body `configId` routes (`/newsletter/send-custom-content`, `/apikeys/:configId`) compare with the verified tenant.
- `GET /configuration-news-sources?configId=` defaults to the caller; checked by the handler.
- Socket.IO `register` (`socket/socketAuth.ts:42-75`): authenticates first, room is always the verified tenant; a different `id` is ignored and logged. Rate limited per socket and per IP. Run updates are stripped of `previewHtml` and step outputs. FIXED.
- Exception: system pass (finding 4).

## 5. Webhooks

- Polar and Tilopay: all webhook receivers are removed (backend `API/billing/` and `API/v1/billing/` are empty; frontend `/api/webhook/polar` is in `_deprecated/`). Nothing to verify now. When payments return (`features.payments`), require: signature check (Standard Webhooks for Polar), a 5 minute timestamp window, idempotency by `webhook-id` stored with TTL, plan mapped from `product_id` only.
- Env names still read: `TILOPAY_API_KEY`, `TILOPAY_API_USER`, `TILOPAY_PASSWORD` (somewhere in backend). Remove from Render if unused, and rotate (see list).

## 6. Unsubscribe

- `API/_lib/linkTokens.ts`: HMAC-SHA256 signed tokens over `{email, configId, newsSourceId, purpose, expiry}`, constant-time compare, purpose bound. Good. Production boot requires `LINK_SIGNING_SECRET` (`config.ts:113`).
- `API/newsletter/unsubscribeEndpoint.ts`: GET shows a one-button page (scanner safe), POST unsubscribes, RFC 8058 body `List-Unsubscribe=One-Click` supported. Good.
- Problem (finding 3): the links actually put in emails are built without a token: `engine/automations/pipeline.ts:264`, `engine/emailSender.ts:251`, `engine/generateEmailContent.ts:64`. `buildUnsubscribeUrl` in `linkTokens.ts` is not used by any sender. So:
  - with `LEGACY_UNSIGNED_LINKS` true (default): anyone who knows an address, owner id and source id can unsubscribe it. Safe repro on staging: `curl -X POST -H 'Accept: application/json' 'https://<staging-api>/unsubscribe/test-reader@example.com?configId=<your test owner>&newsSourceId=<your source>'` returns `{"status":"unsubscribed"}` without a token.
  - with it false: every unsubscribe link in sent issues returns 400.
  - `List-Unsubscribe-Post` is only added when `MAIL_ONE_CLICK_UNSUBSCRIBE=1`; Gmail and Yahoo require one-click for bulk senders.
  - Fix (WS8): use `buildUnsubscribeUrl` (or `signLinkToken`) in all three builders, then set `MAIL_ONE_CLICK_UNSUBSCRIBE=1`; after old issues age out (or right away for a new launch) set `LEGACY_UNSIGNED_LINKS=false`.
- Confirm links are signed (`confirmationMailer.ts:57` uses `buildConfirmUrl`), but unsigned ones are also accepted while the legacy flag is on.
- Reading another subscriber: owner routes only see their own tenant; the privacy export needs a `privacy` token. No leak found.

## 7. GDPR

Wired:
- Owner: `GET /v1/privacy/export`, `POST /v1/privacy/delete-account` (marks for deletion, 14 day grace), `POST /v1/privacy/cancel-deletion`, all `requireOwner` and rate limited. Actual purge is the manual script `db/gdpr/runPendingDeletions.ts` (refuses production without an explicit flag).
- Subscriber: owner side `GET /v1/subscribers/:email/export`, `DELETE /v1/subscribers/:email`. Self-service `GET /v1/public/privacy/subscriber?token=` and `POST .../delete` (signed token).

Gaps (finding 5):
- `db/gdpr/owner.ts:18-19` purges `configurations/{id}/{activity, automations, automationRuns, usage, meta, subscribers, searchOutbox, newsSources}` and top-level `automationRuns`, `automationLedger` by `configuratorId`. Not covered: top-level `automations/{id}` (WS8 store, `engine/automations/firestoreStore.ts:20`), `automationRunIndex`, `automationLocks`, `mailConnections/{tenant}` (encrypted Gmail refresh token; also revoke it at Google), `mailDeferred` (held-back deliveries with reader emails), `mailBudgets`, `configurations/{id}/invitations`, `configurations/{id}/deliveries` (per-reader send log), `supportRequests` (by email), `idempotencyKeys`. Firestore does not delete subcollections with the parent, so unlisted subcollections stay orphaned.
- Export misses the same plus `deliveries`, `invitations`, `usage`, onboarding `meta`.
- `db/gdpr/subscriber.ts` covers `newsletterUsers`, `authCodes`, `sessions`, `leads`. Missing: `configurations/*/deliveries`, `configurations/*/invitations`, `mailDeferred`, `supportRequests`.
- Nothing issues a `privacy` token: `buildPrivacyExportUrl` and `buildManageUrl` have no callers, so the subscriber self-service routes cannot be reached. The `/subscriptions/manage` page does not exist.
- No frontend calls `/v1/privacy/*`, so owners cannot export or delete from the UI.

## 8. Injection

- Templates: `helper/functionTemplateFile.ts:92` evaluates the trusted file once (double pass removed, RCE from `${...}` in content FIXED). `engine/render/renderTemplate.ts:65` also evaluates only template files, with values neutralized. `new Function` + `with` remain but only on files from `templates/`. Keep it that way: never pass DB or LLM text as the template argument.
- `{@html}` in the frontend without `sanitizeHtml`: `SVG.svelte:50` (local icons), `CodeFormatter.svelte:27` (highlight.js, escaped), `SignatureEditor.svelte:128` (built with `escapeHtml`; owner data only; check that `href` values reject `javascript:` and that `accent` is a validated color), JSON-LD in `+page.svelte:115-117` and `blog/[holder]/[id]/+page.svelte:80` (escapes `<`, safe). Newspaper uses `sanitizeHtml` for title and content.
- Detached `innerHTML` sinks still open (finding 7): `src/components/articles/FeaturedArticlesGrid.svelte:21,29,38`, `TextArticlesGrid.svelte:20,29`, `ArticleModal/ArticleModal.svelte:26`. `<img src=x onerror=...>` runs even in a div that is never attached. These render scraped/LLM article HTML on the dashboard. Fix: `sanitizeHtml()` first, or `new DOMParser().parseFromString(html, 'text/html')` (inert) for text and image extraction; `noH1` should return sanitized HTML. Backend does not sanitize article HTML before storing (only `API/v1/email/sanitizeHtml.ts` for previews).
- SSRF: `helper/ssrfGuard.ts` (scheme, credentials, ports, blocked hostnames, DNS A/AAAA against private, loopback, link-local, CGNAT, metadata, IPv6 ULA and mapped ranges) and `helper/fetchScrape.ts` (re-checks every redirect hop, timeouts, size caps). Used on news source add/update, selectors, preview, webhook URL, WordPress destinations. Residual: DNS rebinding between check and fetch (documented), image HEAD checks and WordPress fetches (finding 14).
- Rate limits on public endpoints: `/public-subscribe` 10 per IP per 10 min + 200 per tenant per hour + honeypot; `POST /auth/:email` 5 per email and 20 per IP per 10 min; code verify 20 per (email, IP) and 60 per IP per 15 min, OTP locked after 5 wrong tries; legacy code failures 10 per (email, IP), 100 per IP; confirm 30/10 min; unsubscribe 60/10 min; public privacy 10/10 min; support 20 per email per day; preview 5/h; articles limited. All in memory (finding 12).

## 9. Logging

- Backend structured logger redacts credential-like keys and uses `hashId` for emails. Header logging and code logging are gone.
- Remaining PII: `engine/emailSender.ts:109,111,253,255` log subscriber addresses (legacy send path, also error objects that may include SMTP replies). `API/newsletter/apiKeyEndpoint.ts:63-86` logs API key hashes. `engine/automations/*` and `socket/socketLogger.ts` `log(msg, room)` also go to stdout.
- Frontend: `UserDataService.ts:145-274` and `UserActions.svelte:41,61` log subscriber emails in the browser console. `AuthForm.svelte:55` logs mode only.
- `oauth/+server.js` no longer logs tokens.

## Detail for the release-blocking items

### 1. Legacy permanent credential (High)
- Where: `API/_lib/config.ts:105` (`legacyCodeAuth: e.LEGACY_CODE_AUTH ?? true`), `API/_lib/auth.ts:152-163`, `API/v1/auth/authService.ts:186-191` (legacy code accepted on `GET /auth/:email`, before the OTP lock), `:240-243` (Google `sub` stored as `code`), `:149` (OTP also stored as the permanent `code`).
- Risk: anyone who knows an owner's Google `sub` (any third-party app that uses Google sign-in sees it) and email can call every owner route with `x-auth-email` + `x-auth-code`, or trade it for a session at `GET /auth/:email?code=<sub>`. For email users the last 6 digit code never expires; guessing is limited per IP only (about 20 tries per IP per 15 min), so a large botnet can still try.
- Safe repro (staging, your own account): sign in with Google once, then `curl -H 'x-auth-email: <you>' -H 'x-auth-code: <your sub>' https://<staging-api>/private-config` returns your config. Your `sub` is the `sub` claim of any Google ID token for you.
- Blocker reason: the frontend still depends on it. `src/routes/oauth/+server.js:50-60` sends `sub` as `x-auth-code`; the dashboard and socket (`src/lib/api/socket.ts:57`) still send `accessCode`.
- Fix: `/oauth` exchanges the Google ID token with the backend (`GET /auth/:email?token_id=` or `POST /auth/verify`) for a session token on the server and passes only that to the dashboard (in the URL fragment, then replaceState). Socket `register` sends `token` only. Then set `LEGACY_CODE_AUTH=false` on Render and stop writing `code` to `authCodes`. Owners: WS3 (oauth), WS6 (socket, credentials), WS7 (env, cleanup).

### 2. Credentials in the `/dashboard` URL (High)
- Where: `src/routes/oauth/+server.js:52-79` builds `?x-auth-token-id=...&x-auth-client-id=...&x-auth-code=<sub>&x-auth-email=...&given_name=...&picture=...`.
- Risk: the hosting provider's access log and the browser history keep a working permanent credential (see 1). `replaceState` runs after the request line is already logged.
- Fix: as in 1; put a short-lived session token in the fragment, never the `sub` or ID token. WS3.

### 3. Unsigned unsubscribe links (High)
See section 6. WS8 owns the link builders; WS7 sets `MAIL_ONE_CLICK_UNSUBSCRIBE=1` and later `LEGACY_UNSIGNED_LINKS=false`.

### 4. System pass master key (High, rotation)
- Where: `db/auth/multiAuth.ts:86-100` accepts `body.pass` equal to `INTERNAL_API_SECRET` or Firestore `system/secret.the_pass`, then acts as any `:configId`. Routes: `POST /users/:configId/:newsSourceId`, `GET /newsletter/users/:configId/:newsSourceId`, `GET /segmented-subscribers/:configId` (whole subscriber list), and `GET /newsletter/search` (no tenant without `:configId`, so it fails closed there).
- Note: `GET` routes read `req.body.pass`; Express parses a JSON body on GET, so a GET with a body works.
- Nothing in the current frontend sends `pass` (`src/routes/subscribe-widget/subscribe/+server.ts` uses `/public-subscribe`). THE_PASS was logged by the old proxy, so treat it as leaked.
- Fix: remove step 1 from `multiAuth.ts` (nothing needs it now), delete `system/secret.the_pass`, and remove `THE_PASS` from the frontend env. If a server-to-server path is needed later, use `INTERNAL_API_SECRET` in a header, scoped to one route. WS7.

## Secrets Luis must rotate before launch (names only)
- `THE_PASS` (frontend env) and Firestore `system/secret.the_pass` (delete it)
- `INTERNAL_API_SECRET` (if set)
- Every owner Gmail/SMTP app password stored in `configurations` and `newsSources` (exposed by the old public `/config`); ask owners to revoke them in Google, then run `scripts/scrubOwnerAppPasswords.ts`
- `webhookSharedSecret`, `webhookPassword`, `webhookGroups[].password` for every tenant (exposed by old `/config`); and each tenant's API keys (`apiKeys`, hashes were exposed)
- All `authCodes` (legacy codes and stored Google `sub` values) and existing `sessions`: clear `authCodes.code` after the cutover in finding 1
- AIBAN system mailbox: `EMAIL_AUTH_PASS` / `EMAIL_PASSWORD` / `SMTP_PASS` / `APP_PASSWORD` and the SMTP passwords in `system/secret`
- `SECRET_CLIENT_SECRET` (Google OAuth, frontend) and `GOOGLE_OAUTH_CLIENT_SECRET` (Gmail send)
- `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`, `TILOPAY_API_KEY`, `TILOPAY_API_USER`, `TILOPAY_PASSWORD` (or remove them while payments are off)
- `OPENAI_API_KEY`, `OPENROUTER_API_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`, `PEXELS_API_KEY`, `TYPESENSE_ADMIN_API_KEY`, and API keys stored in `system/secret`
- Firebase service account (`serviceAccountKey.json` / `FIREBASE_SERVICE_ACCOUNT_JSON`) and Typesense service account (`typesensecloudserviceaccount.json` / `TYPESENSE_SERVICE_ACCOUNT_JSON`), plus whatever is in `secrets/`: copies exist in backup archives inside the project folder (finding 13)
- New, must be set and kept private: `LINK_SIGNING_SECRET`, `MAIL_TOKEN_KEY`, `ADMIN_EMAILS`, `CORS_ORIGINS`, `GOOGLE_CLIENT_IDS`

## Env settings for production (checklist)
`APP_ENV=production`, `LINK_SIGNING_SECRET` (32+ chars), `CORS_ORIGINS=https://aiban.news,https://www.aiban.news,https://aibanewsletter.club`, `GOOGLE_CLIENT_IDS=<web client id>`, `ADMIN_EMAILS=<Luis>`, `MAIL_ONE_CLICK_UNSUBSCRIBE=1` (after fix 3), `LEGACY_CODE_AUTH=false` (after fix 1), `LEGACY_UNSIGNED_LINKS=false` (after fix 3), `TRUST_PROXY_HOPS=1`, single instance until rate limits move to a shared store.
