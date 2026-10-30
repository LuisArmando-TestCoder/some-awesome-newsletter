# WS6 summary (frontend business logic, data layer, server routes)

## What changed
- One typed API client (`src/lib/api/`): single base URL (`PUBLIC_API_URL` or host default), auth headers, timeouts, retries with backoff for idempotent calls, cancellation, shared concurrent GETs, zod checks, and one `ApiError` with messages written to the copy rules. Documented in `API_CONTRACT.md`.
- The 29 request modules are thin wrappers over it. Exported names and return contracts are unchanged, so UI code keeps working. Bugs fixed on the way: non-Latin names broke every request, the public config call returned the wrong account, the contact import dropped the source id and misread the stream.
- State: no auth values in cookies any more, big lists no longer stored in localStorage, autosave with debounce and a `saveStatus` store for "Saving... / All changes saved / Not saved", optimistic toggles with rollback, sign out keeps language and display preferences.
- Live connection: one typed Socket.IO client that re-registers after reconnects, cleans up on sign out, and exposes `automation:run`, `activity` and a status store.
- New helpers for the product: automations, run now, activity feed, usage against plan, contact import progress, preview rendering in a sandboxed iframe, product events, billing portal and plan checkout. Each falls back to today's endpoints when the new one is not live.
- Server: security headers and error handling in `hooks.server.ts`, CSP in report-only mode, billing portal locked to the signed-in owner, checkout parameters restricted, Polar webhook idempotent and forwarded, subscribe proxy without the master password, help page without fake data.
- Tests: 19 unit tests for the client, errors, imports, usage, automations, sanitizer and stores (`node --test`, no new dependency).

## What is left
- Backend endpoints listed in `API_CONTRACT.md` section 4 (WS7). Until then the fallbacks run.
- UI owners need to wrap `{@html}` sinks with `sanitizeHtml()` and switch the onboarding preview to the sandboxed iframe (requests sent to WS2, WS3, WS4).
- Pricing page must call `startSubscription()` (WS2).
- Enforce the CSP after a week of clean reports: in `svelte.config.js` move `reportOnly` to `directives`.
- Add the `test:unit` script (WS1).

## Risks
- `npm run build` could not run in this session (npm registry blocked, Linux binaries missing). Type checks pass for every WS6 file. Run `npm run check && npm run build` on the Mac before deploying.
- `saveToConfig` now waits 600 ms before saving. A tab closed within that window loses the last edit; call `flushConfigSave()` before navigation where it matters.
- `/api/portal` GET now answers 405. Nothing in the UI used it.
- The subscribe proxy no longer creates payment links unless `PAID_NEWSLETTER_CONFIGURATORS` lists the owner.

## How to verify
1. `npm run check` (no errors in `src/lib/api`, `src/lib/stores`, `src/components/systems/requests`, `src/routes/api`, `src/hooks.server.ts`).
2. `node --experimental-strip-types --import ./src/lib/api/__tests__/register.mjs --test src/lib/api/__tests__/api.test.mjs` (19 pass).
3. Manual: sign in with email code, edit a setting (status line shows Saving, then saved), add a source, import a CSV, send now, sign out (language stays), subscribe through the widget.
4. `curl -I https://<site>/` shows `X-Frame-Options: DENY`, `Content-Security-Policy-Report-Only`; `/subscribe-widget` shows `frame-ancestors *`.

## Update after Luis's decisions (2026-10-30, second session)
- Sign-in uses a session token sent as `Authorization: Bearer` on every request (no cookie), issued by the backend at sign in and revoked on sign out.
- Payments are off: no checkout, portal or charge at signup. `features.payments` (`$lib/config/features.ts`) brings them back later.
- The paid newsletter switch is stored in the database on each news source (`isPaidNewsletter`) and edited from the new admin page.
- New admin dashboard at `/admin` for the AIBAN team: totals, every customer with plan and newsletters, search and filters, and a side panel to change plan, VIP and notes, and to switch each newsletter between paid, active and public. Backend: `/v1/admin/*` (needs `ADMIN_EMAILS`).
- The data helpers now use the backend /v1 API (automations, activity, usage, onboarding, email preview) with fallbacks.

Admin area (third pass): admins are stored in the database (`platform/admins`), seeded from `ADMIN_EMAILS=oriens@aiban.news`, and managed from `/admin/admins`. The admin UI has Overview, Customers, Customer detail, Newsletters, Admins and Change log, with every change recorded.

How to verify: sign in at `/login` with oriens@aiban.news, open `/admin`. Another account sees "This area is for the AIBAN team".

## Decisions for Luis
1. Critical backend fixes (WS7) from the first run. Most are now handled by WS7's new auth code; confirm with WS7, then rotate Gmail app passwords, webhook shared secrets, API keys and `THE_PASS`.
2. Add `ADMIN_EMAILS=oriens@aiban.news` to the production backend environment (Render). The local `.env` already has it.
3. The admin backend file was written by WS6 in WS7's folder on your request. WS7 should review it and add it to its tests.
4. The temporary `.ws6-tmp/` archive was deleted (approved by Luis).
