# WS6 audit (frontend business logic, data layer, server routes)

Run: 2026-10-30, unattended. Detailed subreports written by WS6 subagents:
- `ws6-api-map.md`: every frontend request mapped to its backend route, auth, payloads, error shapes, socket events.
- `ws6-callers.md`: every importer of WS6 modules and the return contract each caller depends on.
- `ws6-security.md`: 18 security findings with severity and owner.

## Findings that shape the work

### Data layer
1. 35 request files each build their own fetch: base URL from a function stored inside the Svelte store, auth headers re-read from localStorage, no timeouts, no retries, no cancellation, four different failure contracts (return null, return false, throw, return the error string). Error text shown to users is raw backend text or "HTTP error! status: 500".
2. `getAuthHeaders` sends `given_name` and `picture` as headers. Nothing on the backend reads them, they are the string "null" for most users, and a name with characters outside Latin-1 (Japanese, Arabic, emoji) makes `fetch` throw before the request leaves the browser. Every authenticated call fails for those users.
3. Backend error bodies use `{error}` mostly, `{message}` on the newsletter and trigger routes, `{error, retryAfter}` on rate limits, `{success:false, error|details}` on billing, and Express HTML pages on crashes. The frontend reads the wrong key in several places.
4. Contract mismatches: `getPublicConfig` hits `/config` (returns the visitor's own config, not the requested one); `getUsersFromRawFileOrText` omits `newsSourceId` and parses an NDJSON stream as JSON; `/newsletter/users` ignores `limit` and `startAfter`; `src/lib/api/auth.ts` calls `/api/auth/*` routes that do not exist.
5. Dead code: `postSubscriber`, `searchNewsletterUser`, `getNewsSourcesFromConfiguration`, `submitPublicSubscription`, `getAllSubscribersFromConfigEndpoint` have no importers; the two `cronToNaturalLanguage.ts` copies are identical and unused; `src/lib/polar.ts` is unused and points at the Polar sandbox.

### State
6. `store.ts` writes every persisted key (including `authCode` and `tokenId`) to localStorage and to a 365-day JavaScript cookie on every store write, with no Secure flag. Cookies are sent with every request to the SvelteKit server.
7. `saveToConfig` PUTs the whole config on every call with no debounce; concurrent edits race (GET latest, merge, PUT). No save status for the UI.
8. Import cycles: `store.ts` <-> `updateConfiguration.ts`; `createNewsSource` -> `UserDataService` -> store; `getConfiguratorSession` <-> `createNewsSource`.
9. `oauth/+server.js` (WS3) calls `createInitialConfiguratorConfig`, which writes to the module-level store on the server, shared across all requests.
10. `useConfigurator` leaks a 1 s polling interval and a subscription per mounted toggle.

### Socket
11. Socket connects with `register {id, accessCode}` and never re-registers after a reconnect; ping every 5 minutes; no typed events; the backend stores the code before checking it (WS7).

### Server routes
12. `/api/portal?customerEmail=` opens the Polar billing portal for any email and creates customers. No UI uses it yet.
13. `/api/checkout` forwards customer id, external id and metadata from the query string.
14. Polar webhook signature is verified by the library, but both handlers are empty and there is no idempotency.
15. `/subscribe-widget/subscribe` logs THE_PASS and sends it to the backend; the "internal" branch checks the server's own origin, so every caller gets it on matching hosts; on other hosts it tries a payment link for every subscriber.
16. No `hooks.server.ts`: no security headers, no CSP, dashboard pages cacheable.
17. `help/+page.server.ts` returns a hard-coded mock user and invented usage numbers.

### Backend (not WS6, sent to WS7)
Critical: Google token audience chosen by the caller and email never matched (account takeover); `GET /config` and `GET /all-configurations` unauthenticated; request headers (auth codes) logged on every request; billing endpoints trust a bare `x-auth-email`; unsigned Tilopay webhooks. See `ws6-security.md`.

### Tooling
18. `npm run check` baseline: 210 errors across the app, 14 in WS6 files (missing `crypto` types, a bad import path, blog loaders before `svelte-kit sync`). The computer shell cannot run `vite build` (Linux binaries for rollup and esbuild are blocked by the npm policy there); builds run in the cloud workspace from a tarball.
