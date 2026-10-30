# AIBAN backend security review

Scope: `/home/claude/be` (Deno + Express + Socket.IO + Firestore REST + Tilopay) plus the SvelteKit server routes in `/home/claude/fe/src/routes` that talk to it. This was a read-only, static review. Nothing was executed against production. Secret files (`.env`, `serviceAccountKey.json`, `typesensecloudserviceaccount.json`, `secrets/`) were not available and were not opened. All paths below are relative to `/home/claude/be` unless they start with `fe/`.

Severity:
- **P0**: unauthenticated or trivially reachable. Leads to remote code execution, full secret disclosure, account takeover, cross-tenant data dump or free paid plans. Fix before the next deploy.
- **P1**: needs a (free) account or one extra step, or causes serious integrity, privacy or cost damage. Fix this sprint.
- **P2**: hardening, defence in depth and DoS.

---

## P0

### P0-1. Unauthenticated remote code execution via the template engine (double `eval`)
- `helper/functionTemplateFile.ts:78-81` evaluates every template **twice**: `functionTemplateContent(await functionTemplateContent(content, context), context)`. Each pass runs `new Function(... with (context) { return \`${safeContent}\` })` (`:104-113`). The first pass inserts the caller's data into the HTML. The second pass then treats that data as template source, so any `${...}` in user data runs as JavaScript in the server process. The process has `--allow-net --allow-read --allow-env` (Dockerfile CMD).
- Places where user data reaches the template:
  - `GET /unsubscribe/:email` (`API/newsletter/unsubscribeEndpoint.ts:26-32`). **No auth.** It renders `${email}` (`templates/unsubscription.html:74`) and returns the result in the HTTP response.
  - `POST /public-subscribe` (`API/newsletter/publicSubscriptionEndpoint.ts`). **No auth.** `name` becomes `userName` in `templates/confirmationEmail.html:90` (`db/newsletter/addNewsletterUser.ts:148,227`). `email` goes into `confirmationLink`.
  - `POST /auth/:email` (`API/auth/sendCodeToEmail.ts:124`). **No auth.** It renders `${email}` in `templates/authenticationCode.html:102`.
  - Newsletter send (`engine/generateEmailContent.ts:59`, `engine/emailSender.ts:133`). This renders scraped third-party article HTML, LLM output, `subscriber.name`, `config.emailSignature` and `article.lead`. Anyone who controls a scraped page, or any tenant, gets code execution at send time.
- Exploit (no account, no slash needed in the payload):
  1. `GET /all-configurations` (P0-4) returns a valid `configuratorId` and `newsSource.id`.
  2. `POST /public-subscribe {"configuratorId":X,"newsSourceId":Y,"name":"a","email":"${Deno.readTextFileSync(\"serviceAccountKey.json\")}@a.co"}`. The email passes the regex `^[^\s@]+@[^\s@]+\.[^\s@]+$`, and the user document is created.
  3. `GET /unsubscribe/<urlencoded same email>?configId=X&newsSourceId=Z`. The response HTML contains the GCP private key. `${JSON.stringify(Deno.env.toObject())}` dumps every secret in `.env`. `fetch(...)` gives outbound exfiltration and lateral movement.
- Fix:
  - Remove the second pass. Replace `new Function`/`with` with a real escaping template engine (Eta or Handlebars with auto-escape, or `@std/html` `escape()` on every interpolation).
  - Never evaluate data as code. Escape all user and scraped values as HTML.
  - Until that ships, hot-patch the code to call `functionTemplateContent` once and to reject any context value that contains `${`.
  - Drop `--allow-read` to `--allow-read=./templates,./docs` and `--allow-env` to an explicit list.

### P0-2. Account takeover through the Google sign-in path in `GET /auth/:email`
- `API/auth/verifyUserCode.ts:31-50` accepts `token_id` **and `client_id` from the query string**. It verifies the token against that attacker-chosen audience, then runs `put("authCodes", <email from URL path>, {code: userInfo.sub})` **without checking `payload.email === email` or `email_verified`**.
- Exploit: the attacker creates their own Google OAuth client and obtains an ID token for their own Google account. They call `GET /auth/victim@x.com?code=<their sub>&token_id=<their token>&client_id=<their client id>`. The victim's auth code is overwritten with the attacker's `sub`, and the attacker now authenticates as the victim with `x-auth-email: victim@x.com`, `x-auth-code: <sub>`. That gives full control of the victim's config, subscribers, API keys and billing actions.
- Second problem: the Google `sub` is used as a **permanent password**. It is a stable account identifier, not a secret. Every other app the user signed into with Google knows it. It never rotates, it is emailed in clear (`sendCodeToEmail.ts:61-67`) and it is logged (`:67`).
- Fix:
  - Pin the audience to `Deno.env.get("SECRET_CLIENT_ID")`.
  - Require `payload.email_verified && payload.email.toLowerCase() === email.toLowerCase()`.
  - Stop storing the `sub` as a credential. After either login path, issue a random server-side session token (32 bytes from CSPRNG, stored hashed, with expiry), or a signed JWT.
  - Apply the same audience pin in `db/configuration/postConfigDocument.ts:45-56`.

### P0-3. Auth codes can be brute-forced and never expire. They are also the session token, logged on every request
- `helper/generateCode.ts:5`: a 6-digit code from `Math.random()`, which is not a CSPRNG.
- `GET /auth/:email` (`API/auth/verifyUserCode.ts`) has **no rate limit and no attempt counter**. The only limiter is on `POST` (`sendCodeToEmail.ts`), and it is in-memory and keyed by email.
- The code has no expiry and is not consumed on use. It is the long-lived bearer credential sent as `x-auth-code` on every API call.
- It is logged in plain text by:
  - the raw request logger, which records all headers (`main.ts:48-51`);
  - `authMiddleware`, which logs `code -> ${code}` on every authenticated call (`db/auth/isAuthenticated.ts:65`);
  - `sendCodeToEmail.ts:105` (`Auth code ${code} sent to ...`) and `:67`;
  - the URL itself in GET query strings (`?code=`), which lands in proxy and access logs.
- Exploit: 10^6 GETs to `/auth/victim@x.com?code=NNNNNN` take over the account, an expected 500k tries. Anyone with log access (the Render dashboard, a log drain, a support vendor) can also reuse any user's code indefinitely.
- Fix:
  - Generate codes with `crypto.getRandomValues`.
  - Store `{hash, expiresAt (10 min), attempts}` and allow at most 5 attempts, then invalidate.
  - Delete the code on success and issue a separate session token with an expiry and revocation.
  - Rate-limit verification per email and per IP.
  - Move the code to a POST body.
  - Remove every log line that prints codes, cookies or headers, and redact `authorization`, `cookie`, `x-auth-*` in a log middleware.

### P0-4. Unauthenticated dump of every tenant's secrets: `GET /all-configurations` and `GET /config`
- `API/configuration/getAllConfigurationsEndpoint.ts:6-33`: **no auth middleware.** The sanitiser removes only `openAiApiKey`, `email.auth`, `email.host` and a few news-source fields. It leaves in place:
  - `appPassword` (SMTP app passwords) and `emailMaskSender`;
  - `webhookPassword`, `webhookUsername` and `webhookGroups[].password` (WordPress credentials);
  - `webhookSharedSecret`;
  - `apiKeys[].hash`;
  - `tilopaySubscriptionId`;
  - `newsSources[].appPassword` and `newsSources[].emailMaskSender`;
  - every tenant's email (the `configuratorId`).
- `API/configuration/getConfigurationEndpoint.ts:11-52`: **no auth middleware.** It trusts the `x-auth-email` header, so `curl -H 'x-auth-email: victim@x.com' /config` returns the victim's config with the same leftover secrets. If no config exists, it **creates one for an arbitrary email** (`:24-28`), which lets anyone squat on an address.
- `fe/src/routes/subscribe-widget/subscribe/+server.ts:49-64` depends on this hole: it reads `webhookSharedSecret` from the unauthenticated `/config`.
- Fix:
  - Remove `/all-configurations` or put it behind an admin role.
  - Put `authMiddleware(true)` on `GET /config` and derive identity only from the verified session.
  - Replace "delete fields" with an **allow-list** response DTO.
  - Encrypt tenant credentials at rest (KMS) and never return them; return "is set: true/false" instead.
  - Move the widget's HMAC flow server-to-server through a dedicated endpoint that never returns the secret.

### P0-5. Free paid plans: unauthenticated, unsigned Tilopay webhooks
- `API/billing/billingRouter.ts:212-237` (`POST /api/webhook-success`) and `:265-280` (`/api/webhook-reactivate-subscription`):
  - no signature check, no IP allow-list, no server-side lookup of the order;
  - the plan name and interval come from the **query string** and the target email from the body or from `returnData`, which is just base64 JSON;
  - the comment calls `returnData` "signed/safe", but it is not.
  - Exploit: `curl -X POST 'https://api/api/webhook-success?name=master&type=annually' -d 'code=1&email=attacker@x.com'` sets `pricingPlan=master`, `vip=true`, and removes every plan limit enforced through `checkActionLimit`.
- `:240-255` (`/api/webhook-cancel-subscription`) downgrades any victim the same way.
- `API/billing/newsletterBillingRouter.ts:264-315` has the same pattern for per-newsletter subscriptions.
- No idempotency: the `order` value is not recorded or deduplicated. Replays and order-ID swaps are accepted, and the paid amount is never compared with the plan granted.
- Fix:
  - On every webhook, call Tilopay server-to-server with your credentials to fetch the transaction or subscription by `order`. Verify status, amount, currency and the plan ID you created, and the email from **your own** pending-order record. The record should be stored at `/subscribe` time and keyed by `orderNumber`, never taken from request data.
  - Also verify Tilopay's hash or signature field if your account exposes one.
  - Store processed order IDs and reject duplicates.
  - Put a long random secret in the webhook URL path as an extra gate.

### P0-6. Billing actions trust `x-auth-email` with no code
- `billingRouter.ts:82-85` (`/api/subscribe`) and `:167-206` (`/api/cancel-subscription`) read `x-auth-email` but never call `authMiddleware`.
- Exploit: `curl -X POST -H 'x-auth-email: victim@x.com' /api/cancel-subscription` calls Tilopay `deleteCoupon` on the victim's **real** recurring subscription and downgrades them.
- `newsletterBillingRouter.ts:212-256` (`/api/newsletter-cancel-subscription`) takes the email from the body, with no auth at all.
- Fix: add `authMiddleware(true)`, or the replacement session check, to all billing user actions and use only the verified identity. For newsletter readers, send a signed, expiring link by email.

### P0-7. Secrets written to logs in plain text
- `db/auth/getSystemConfig.ts:32-39` prints the Firestore `appPassword`, `APP_PASSWORD` from env, and the "final" value on **every** call. That is every email send and every auth code.
- `db/auth/getFallBackAuth.ts:164,168,173` run `console.log(ns, nsValue)`, `console.log("conf", conf, ...)` and `console.log(sys, sysValue)`. These print the whole news-source, tenant config and system config objects, including `openAiApiKey`, `appPassword`, `email.auth.pass`, `webhookPassword`, `webhookGroups[].password` and `the_pass`.
- `main.ts:48-51` logs all request headers: `x-auth-code`, `authorization: Bearer <api key>`, `cookie`.
- `isAuthenticated.ts:65` and `sendCodeToEmail.ts:54,62,67,105` log codes and full `authCodes` documents.
- `fe/src/routes/subscribe-widget/subscribe/+server.ts:24` logs `THE_PASS`.
- `fe/src/routes/oauth/+server.js:23,36,40` logs the Google OAuth code, the access and refresh tokens, and the ID token.
- Exploit: anyone with read access to Render or Vercel logs, a log drain or an error tracker collects every credential.
- Fix:
  - Delete these lines.
  - Add a redacting logger.
  - Purge the existing logs or shorten their retention.
  - Rotate everything listed in the rotation checklist below.

### P0-8. Path traversal in the docs router reads any file
- `API/docs/docsRouter.ts:9-11,24-40` runs `filePath = req.path.replace("/docs","docs")` and then `Deno.readTextFile(filePath)`. Express `req.path` does **not** normalise `..`.
- Exploit: `curl --path-as-is https://api/docs/../serviceAccountKey.json`, or `/docs/../.env`. The content is rendered through `marked` and returned as HTML.
- Whether this works through Render's edge depends on whether the edge normalises the path; test it. Locally, and with any pass-through proxy, it is a full key leak. The content is also fed into the double-eval template (P0-1).
- Fix: `const p = path.normalize(...)`, `resolve(DOCS_ROOT, p)`, and reject anything that does not start with `DOCS_ROOT + sep`. Better still, prebuild an allow-list map of doc slugs. Narrow `--allow-read`.

### P0-9. Hard-coded third-party credential in the repo
- `scripts/testWordPressPost.ts:15-17` contains a WordPress site URL, a username and an **Application Password** (29 characters) for a customer site. The value was not reproduced here.
- Fix: revoke that application password in WP Admin, move it to env, and purge it from git history (`git filter-repo` or BFG). Run `gitleaks detect` over the full history of both repos, because `.env.trash` and `sales_letters` are gitignored now but may have been committed before.

---

## P1

### P1-1. Cross-tenant access (IDOR). Authenticated as any account, or with the system pass
Pattern: these endpoints authenticate the caller but never check `configId === req.userEmail`.

| Endpoint | File:line | Impact |
|---|---|---|
| `GET /newsletter/users/:configId/:newsSourceId` | `API/newsletter/getNewsletterUsersByNewsSourceEndpoint.ts:9-27` | Read any tenant's full subscriber records (names, bios, emails, languages, subscriptions). |
| `GET /segmented-subscribers/:configId` | `API/newsletter/getSegmentedSubscribersEndpoint.ts:12-68` | Read any tenant's subscriber emails per source. |
| `POST /users/:configId/:newsSourceId` | `API/newsletter/addNewsletterUserEndpoint.ts:11-58` | Add arbitrary people to anyone's list, which sends confirmation emails from that tenant's sender. The plan-limit bypass `req.body.email === configId` (`:38`) is also attacker-controlled. |
| `POST /configurations/:configId/secret` | `API/configuration/generateSecretEndpoint.ts:11-37` | Rotate any tenant's webhook secret and receive the new value, which breaks their integration and lets you forge their HMAC. |
| `POST /configurations/:configId/webhook` | `API/configuration/storeWebhookEndpoint.ts:9-38` | Repoint any tenant's `webhookUrl` to an attacker server. With the secret above you control their widget key flow. |
| `POST /news-source/any-user-data-base-file-to-standard-format/:configId` | `API/newsSource/getAnyUserDataBaseFileToStandardFormatEndpoint.ts:12-60` | Bulk-insert subscribers into any tenant, using the system LLM key. |
| `GET /leads/:configuratorId`, `GET /leads/:c/:ns/:u` | `API/leads/allLeadCountersFromOneConfiguratorIdEndpoint.ts:24-40`, `specificUserLeadsGetterEndpoint.ts:33-48` | Fail-open: authorises on `config.email.senderEmail`. If the config is not on the first page of `getAllConfigurationsDocuments()` (no page-token loop, `db/configuration/getAllConfigurationsDocuments.ts:18-40`) or has no `email`, access is allowed. |
| `GET /news-source/:configId/:newsSourceId` | `API/newsSource/getNewsSourceEndpoint.ts:10-75` | No auth. Leaks persona, schedule, sender email and SMTP host. |
| `GET /newsletter/search` | `API/newsletter/searchUsersEndpoint.ts:11-52` | Returns full `NewsletterUser` objects, including the user's subscriptions to **other** tenants. |
| `GET /confirm-subscription` | `API/newsletter/confirmSubscriptionEndpoint.ts:11-66` | No auth or token. Marks any email as opted in to any list, which defeats double opt-in (an anti-spam and GDPR issue). It also wipes `tilopaySubscriptionId` and `pricingPlan` on that entry. |
| `GET /unsubscribe/:email` | `API/newsletter/unsubscribeEndpoint.ts:8-33` | No token. Anyone can unsubscribe anyone (and see P0-1). |
| `POST /public-subscribe` | `API/newsletter/publicSubscriptionEndpoint.ts:16-92` | Overwrites the global `name`, `bio` and `language` of an existing reader (the document is keyed only by email). |

- The **system pass** in `db/auth/multiAuth.ts:36-46` checks `body.pass === system/secret.the_pass` (not constant-time), then sets `req.userEmail` from the **unauthenticated** `x-auth-email` header. Anyone holding `THE_PASS`, which the FE logs (P0-7), can act as any tenant on every `multiAuthMiddleware` route.
- `fe/src/routes/subscribe-widget/subscribe/+server.ts:33-45`: `url.origin` is the frontend's own origin, so the "internal" branch is **always** taken. The result is an open, unauthenticated proxy that applies `THE_PASS` to any `configuratorId` and `newsSourceId`.
- Fix:
  - Add a single `requireOwner(paramName)` middleware that compares the route's `configId` with the verified identity, and apply it to every `:configId` route.
  - An API key must resolve to *its* config, and the handler must use that config, not the URL's.
  - Replace `the_pass` with service-to-server auth: an HMAC-signed request with a timestamp, or an internal-only network route. Scope it to "add subscriber with double opt-in" only.
  - Make `/confirm-subscription` and `/unsubscribe` require an HMAC token generated when the email is sent.

### P1-2. Self-upgrade and mass assignment through `PUT /config` and `POST /config`
- `API/configuration/updateConfigurationEndpoint.ts:114-165` copies every key in the body into the stored config, including `pricingPlan`, `vip`, `billingInterval`, `tilopaySubscriptionId`, `apiKeys` and `configuratorId`.
- Exploit: `PUT /config {"pricingPlan":"master","vip":true}` unlocks every paid limit (`checkActionLimit` in `addNewsSourceEndpoint.ts`, `publicSubscriptionEndpoint.ts:64` and `addNewsletterUserEndpoint.ts:30`). Injecting `apiKeys:[{hash:<bcrypt of a known key>}]` plants a persistent backdoor key.
- `POST /config` (`uploadConfigurationEndpoint.ts:45`) spreads the body as well. Only `pricingPlan` is forced.
- The response at `updateConfigurationEndpoint.ts:195-198` echoes the full `finalConfig`, including secrets.
- Fix: validate the body against a zod allow-list of editable fields. Billing and key fields may only be written by the billing and API-key code paths.

### P1-3. Open mail relay and phishing from the platform sender
- `POST /news-source/send-email` (`API/newsSource/sendEmailEndpoint.ts:10-58`) takes `html`, `subject`, an unlimited `emails[]` array and a `config` object **from the body**, then sends through `getMailConfigPack(config)`. When the tenant supplies no custom SMTP credentials, this falls back to the system mailbox. `senderName` comes from the attacker's `config`.
- Exploit: sign up with any inbox, then send `{"emails":[...10k...], "config":{"senderName":"PayPal Security"}, "html":"<phish>"}`. The mail goes out from aiban.news's authenticated SMTP, which burns the domain's reputation.
- `POST /news-source/generate-newsletter` (`generateNewsletterEndpoint.ts`) also takes `config` from the body, and with it the system OpenAI key and system scrape budget.
- Fix:
  - Load the config server-side from the verified identity.
  - Restrict test sends to the account owner's own verified address, at most 3 recipients and a few per hour.
  - Never fall back to the system SMTP for tenant content.

### P1-4. SSRF: server-side fetch of user-supplied URLs with no network policy
- `helper/fetchScrape.ts:3-37` calls `fetch(url)` with redirects followed. It is reached from:
  - `POST /news-source/generate-newsletter` (`url` in the body; returns LLM-summarised content of the fetched page);
  - `POST /news-source/generate-selector/:configId`;
  - `addNewsSourceEndpoint.ts:47` (`fetch(newsSourceData.lead)`) and the scrape of `url` and `lead`;
  - `regenerateSelectorsEndpoint`, `getPersonalityOutOfContentEndpoint` and the cron scraper (`engine/scraper.ts`, `engine/scrapeAndTranslateArticle.ts`).
- Other user-controlled fetches:
  - `engine/generateEmailContent.ts:105` fetches every `<img src>` in scraped HTML;
  - `engine/fetchImageFromStockPhotoSiteSearch.ts:134`;
  - `helper/postToWordPress.ts:74,107,119,188` POSTs to the tenant-controlled `webhookGroups[].url` with Basic auth;
  - `fe/src/routes/subscribe-widget/subscribe/+server.ts:76` POSTs to the tenant-controlled `webhookUrl`.
- Exploit: `url=http://169.254.169.254/...`, `http://localhost:8000/...`, Render private-network hostnames, or a public URL that 302-redirects to one of these. The response comes back through the LLM summary or selector (a semi-blind read). The scraper also blocks on slow hosts.
- Fix:
  - Write one `safeFetch()` that allows only `http`/`https` on ports 80 and 443.
  - Resolve DNS and reject loopback, RFC1918, link-local (169.254/16, fe80::/10), ULA, CGNAT, `0.0.0.0` and metadata hosts, then **re-check on every redirect**, or use `redirect: "manual"` with at most 3 hops.
  - Add a timeout (10 s) and a maximum body size (5 MB).
  - Use it for every outbound fetch of user or scraped URLs.

### P1-5. Socket.IO: no authentication, any client can join any room and read tenant logs
- `socket/socketHandler.ts:23-27` calls `registerID(id, accessCode)` **before** `isAccessAllowed(id, accessCode)`. The check compares the value with itself, so it always passes.
- Room id = `configId` = the tenant's email, which is public through P0-4.
- What is broadcast to the room (`socket/socketLogger.ts:9-14`):
  - subscriber email lists (`engine/emailSender.ts:110`);
  - full grouped user objects (`engine/processSubscribersForNewsSource.ts:33`);
  - full article JSON (`emailSender.ts:111`);
  - WordPress target URLs (`emailSender.ts:169`).
- A new registration for the same id disconnects the real user (`socketHandler.ts:33-37`), which is a cheap denial of service.
- CORS on the socket server is `origin: "*"` (`main.ts:36-42`).
- Fix:
  - Authenticate in `io.use()` middleware with the session token and derive the room from the verified identity. Ignore the client-supplied `id`.
  - Restrict CORS to `https://aiban.news` and `https://www.aiban.news`.
  - Never emit PII or full objects; emit progress events only.

### P1-6. Anyone can open another customer's Polar portal
- `fe/src/routes/api/portal/+server.ts:9-33`: `CustomerPortal` resolves the customer from the **query string** `customerEmail` (creating one if missing). Any visitor can open another customer's Polar portal (invoices, payment methods, cancel).
- The Polar webhook (`fe/src/routes/api/webhook/polar/+server.ts`) does verify signatures through the SDK, but its handlers are empty TODOs. If they get implemented, use the same verified-order rules as P0-5.
- Fix: derive the customer from the server-side session, or remove the Polar routes if Tilopay is the only processor.

### P1-7. Cost and quota abuse of system API keys
- `getFallBackAuth` falls back to the **system** `openAiApiKey` (and the `OPENAI_API_KEY` env) whenever the tenant has none. These endpoints spend it with no per-account budget:
  - `generate-newsletter`
  - `generate-selector`
  - `any-user-data-base-file-to-standard-format` (100 MB of text into an LLM)
  - `regenerate-selectors`
  - `personality`
- `GET /articles/:email` (`API/newsSource/articlesEndpoints.ts:236-247,312-323`) is unauthenticated. It loads the whole corpus with Firestore **offset** pagination, which costs O(n^2) reads, and the cache is keyed by attacker-chosen `newsSourceId`, so random IDs bust it. A few requests exhaust the Firestore quota and trip the global circuit breaker (`helper/firestoreCircuitBreaker.ts`), which takes down auth and the whole app.
- `maxHits`, `size` and `page` are not capped.
- Fix:
  - Add per-account and per-IP rate limits and a monthly LLM budget, and require the paid plan for system-key usage.
  - Switch to cursor pagination (`startAfter`) with a hard cap, and validate `newsSourceId` against existing sources before querying.
  - Cap `size` at 50 or fewer.

### P1-8. Container and runtime hygiene that makes the bugs above worse
- `Dockerfile` runs `COPY . .` with **no `.dockerignore`**, so `.env`, `serviceAccountKey.json`, `typesensecloudserviceaccount.json` and `secrets/` are baked into the image layers when they are present in the build context.
- It also runs `rm -f deno.lock`, which drops lockfile integrity, and uses `FROM denoland/deno:latest`, which is not pinned.
- `--allow-read` and `--allow-env` are unrestricted.
- `main.ts:1` and `helper/sendEmail.ts` import the **unversioned** `https://deno.land/x/dotenv/load.ts`, a supply-chain risk.
- `helper/getAccessToken.ts:7-13` reads `./serviceAccountKey.json` from the working directory on every call. The file is readable by any file-read bug (P0-1, P0-8), and the token is requested with `devstorage.full_control` and never cached.
- Fix:
  - Add a `.dockerignore` (`.env*`, `*.json` keys, `secrets/`, `.git`, `scripts/`, `sales_letters`).
  - Keep the lockfile and use `deno cache --frozen`.
  - Pin the base image digest.
  - Load the service account from a platform secret (an env var holding the JSON, or Workload Identity) rather than the repo directory.
  - Cache the access token until about 5 minutes before expiry.
  - Narrow the scopes: `datastore` plus `devstorage.read_write` on the one bucket.

---

## P2

### P2-1. CORS `*` on Express
`main.ts:55` (`app.use(cors())`). Auth uses custom headers kept in JS storage, so this is not directly CSRF-exploitable today. But several **state-changing GETs** need no auth: `/confirm-subscription`, `/unsubscribe/:email`, `/lead-counter` (which writes to Firestore and is an open redirect, `API/leads/addLeadCountEndpoint.ts:114`), and `/config` (which creates a document). Fix: an origin allow-list, POST plus a token for state changes, and redirect only to URLs that were recorded in the sent article.

### P2-2. Unsigned JSON `user` cookie
`helper/requireUser.ts:18-31` trusts `JSON.parse(cookie.user)` with no signature. It is currently unused (no route imports it), but `verifyUserCode.ts:61` and the dead `legacyAuthProxy.ts` still set the cookie. If anyone ever wires `requireUser` in, `Cookie: user={"email":"victim@x.com","sub":"x"}` becomes full impersonation. Fix: delete it, or replace it with a signed and encrypted session (e.g. `iron-session`, or a JWT verified with a server secret).

### P2-3. API key verification is expensive and unbound
`db/auth/multiAuth.ts:8-27` runs a bcrypt compare against **every** stored key on each request, and the `configId` comes from the URL. Unauthenticated callers can burn CPU (N x bcrypt-10 per request). The `/newsletter/search` route has no `:configId`, so the API-key path reads `configurations/undefined`. Fix: use key format `ak_<id>_<secret>`, look up by id, run one constant-time SHA-256 or HMAC compare (bcrypt is unnecessary for 128-bit random keys), and rate-limit.

### P2-4. Body size and other denial-of-service vectors
- `main.ts:58`: `express.json({limit: '100mb'})` applies globally. That allows 100 MB JSON on every route, including unauthenticated ones, and base64 logos decoded by imagescript (`helper/imageProcessor.ts:40-85`, a decompression-bomb risk). Use 1 MB by default and add route-specific limits: logo at most 2 MB with pixel-dimension checks, CSV import at most 5 MB.
- `helper/rateLimiter.ts:188-191` and the article caches (`articlesEndpoints.ts`) are unbounded in-memory `Map`s keyed by attacker input, so memory grows without limit. Use an LRU with a maximum size.
- `app.set('trust proxy', true)` (`main.ts:53`) makes `req.ip` spoofable through `X-Forwarded-For`. Set it to the exact hop count (`1`) before any IP-based limiter is added.
- `helper/getMailConfigPack.ts:20-23` calls `Deno.exit(1)` on incomplete config. Today `getFallBackAuth` throws first, but a later refactor would make it a one-request process kill. Throw instead.
- `helper/LLM.ts:103` is a `while(true)` Selenium poll with no deadline. Add a timeout.
- `sendEmailEndpoint` and `send-custom-content` fan out with `Promise.all` and no concurrency cap.

### P2-5. Injection surfaces checked
- **Firestore**: `db/query.ts` builds `structuredQuery` as JSON with a fixed `fieldPath`, and document IDs are `encodeURIComponent`-ed (`helper/firestore/firestoreUrlGetters.ts:39`). No query injection was found. One gap: IDs equal to `.` or `..` become dot-segments after URL normalisation. Reject IDs matching `^\.{1,2}$`, containing `/`, or longer than 1500 bytes.
- **Typesense**: `helper/typesense-client.ts` builds a client with the **admin** key, but no backend route builds `filter_by` or `q` from user input (only scripts use it). If it gets wired in, use the search-only key or scoped keys with an embedded `filter_by: configId:=X`, and escape values with backticks.
- **HTML in emails**: all templates interpolate unescaped user data (`subscriber.name`, `userName`, `origin`, `email`, `emailSignature`, `article.lead`, scraped `content`). Even after P0-1 is fixed, escape everything, and sanitise allowed rich HTML (signature, article body) with an allow-list sanitiser (e.g. `sanitize-html`). `sendRejectionNotifications.ts:37` builds `<li>${user.email}</li>` unescaped.
- **Stored XSS risk in the frontend**: articles saved from scraped HTML are served by the public `/article/:id`. Make sure the FE sanitises before `{@html}`.

### P2-6. Smaller auth issues
- Emails are not normalised (case or whitespace), so `Victim@x.com` and `victim@x.com` are different accounts and configs.
- `authMiddleware` accepts the literal string `"null"` checks inconsistently.
- `legacyAuthProxy.ts` is dead code that references an undefined `name`. Delete it.
- The OAuth `x-auth-*` headers end up in a query string (`fe/src/routes/oauth/+server.js:70`, `toQuery(authHeaders)`), which leaks the `sub` "password" into browser history and referrers.

---

## Secret rotation checklist

Rotate in this order: (1) the GCP key, (2) secrets readable by code execution or file reads, (3) secrets that were logged, (4) tenant secrets. Treat **everything in the process environment and working directory as compromised** if P0-1 or P0-8 was ever reachable in production. Both were reachable without credentials.

| Secret (env var / file) | Why rotate |
|---|---|
| `serviceAccountKey.json` / `GOOGLE_APPLICATION_CREDENTIALS` | Readable through template RCE (P0-1) and docs traversal (P0-8). Baked into the Docker image (no `.dockerignore`). Has `datastore` + `devstorage.full_control` scope, i.e. the full Firestore DB and Storage. Delete the key in GCP IAM, create a new one, review audit logs for unknown usage. |
| `typesensecloudserviceaccount.json` | Same file-read exposure, same image baking. |
| `TYPESENSE_ADMIN_API_KEY` | In process env, so exposed through P0-1. Admin key gives full index write and delete. |
| `TYPESENSE_SEARCH_ONLY_API_KEY` | In process env (P0-1). Also confirm it is not an unscoped key. |
| `OPENAI_API_KEY` | In env (P0-1). Also logged by `getFallBackAuth.ts:164-173` when it resolves through the system config. Abusable for cost. |
| `GEMINI_API_KEY` | In env (P0-1). |
| `APP_PASSWORD` | **Printed in plain text** by `db/auth/getSystemConfig.ts:33,39` on every email send. It is the system SMTP app password. Revoke it at the mail provider. |
| Firestore `system/secret` document: `appPassword`, `openAiApiKey`, `the_pass`, `email.auth.pass` | Printed by `getSystemConfig.ts:32` and `getFallBackAuth.ts:173`. `the_pass` is the multi-tenant impersonation key (P1-1). |
| `THE_PASS` (frontend env) | Logged by `fe/src/routes/subscribe-widget/subscribe/+server.ts:24` and used by an open proxy. Replace the mechanism, not only the value. |
| `TILOPAY_API_KEY`, `TILOPAY_API_USER`, `TILOPAY_PASSWORD` | In env (P0-1). They give full merchant API access, including `deleteCoupon` and payments. |
| `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET` | In frontend env. Rotate if the FE host shares exposure, and in any case if the backend `.env` holds the same values (the env names list shows it does). Whoever holds the webhook secret can forge billing events. |
| `SECRET_CLIENT_SECRET` (and review `SECRET_CLIENT_ID`) | In env (P0-1). The FE OAuth route logs Google access, refresh and ID tokens (`fe/src/routes/oauth/+server.js:36,40`). Rotate the client secret and revoke refresh tokens. |
| `GITHUB_TOKEN`, `GITHUB_CLASSIC_TOKEN` | In env (P0-1). A classic token is usually broad-scope (repo, possibly org). Revoke both and replace them with a fine-grained token if still needed. |
| `REDIRECT_URL`, `WEBHOOK_URL` | Not secrets in themselves. Rotate if either embeds a token or path secret. |
| `FIREBASE_STORAGE_BUCKET`, `TYPESENSE_NODES`, `APP_ENV` | Not secrets. No rotation needed. |
| `.env.trash` | Gitignored, but check it and git history for old live values and rotate whatever is found. |
| WordPress application password in `scripts/testWordPressPost.ts:17` | Hard-coded customer CMS credential in source. Revoke it in that site's WP Admin and purge it from git history. |
| All `authCodes` documents (every user's `x-auth-code`, including Google `sub` values) | Logged on every request (`main.ts:49`, `isAuthenticated.ts:65`) and brute-forceable. Delete the whole collection after shipping the new session scheme, so every user signs in again. |
| All tenant API keys (`configurations/*.apiKeys`) | Bearer keys are logged in the `authorization` header by `main.ts:49`. Hashes are exposed by `/all-configurations`. Revoke them all and ask tenants to regenerate. |
| Tenant credentials in `configurations/*` (and `newsSources[]`): `appPassword`, `emailMaskSender`, `openAiApiKey`, `webhookPassword`, `webhookGroups[].password`, `webhookSharedSecret`, `email.auth.pass` | Returned unauthenticated by `/all-configurations` and `GET /config` (P0-4) and logged by `getFallBackAuth.ts:164-168`. **Notify affected customers.** Their Gmail app passwords and WordPress passwords should be considered leaked, which may be a breach-notification event. Regenerate `webhookSharedSecret` for every tenant. |
| Render, Vercel and other log storage and drains | They contain the above in clear text. Purge or shorten retention after rotation. |

---

## Suggested order of work
1. Same day:
   - Hot-patch `functionTemplateFile` to a single pass with HTML escaping.
   - Add auth to `/all-configurations` (or delete it) and to `GET /config`.
   - Disable the Tilopay webhook routes until they verify orders server-side.
   - Add auth to `/api/cancel-subscription`, `/api/subscribe` and `/api/newsletter-cancel-subscription`.
   - Pin the Google audience and check the token email.
   - Remove the secret log lines.
   - Fix the docs traversal.
   - Add a `.dockerignore`.
   - Rotate per the checklist.
2. Within the week:
   - Ship the new session model: random token, expiry, attempt limits, codes consumed on use.
   - Add a `requireOwner` middleware across every `:configId` route.
   - Add allow-list DTOs for config reads and writes.
   - Replace `the_pass`.
   - Authenticate Socket.IO.
   - Add `safeFetch` for SSRF.
3. Next sprint: the P2 items, plus the LLM and Firestore quota budgets.
