# WS7 summary: backend API, data, auth, billing, security

Date: 2026-10-30. Details: `ws7-audit.md` (findings), `ws7-plan.md`, `ws7-log.md`, `API_CONTRACT.md` sections 7 to 9.

## What changed
- **Closed the critical holes found in the audit.** Templates render once, so text from subscribers or scraped pages can no longer run as server code. `/docs` can no longer read files outside the docs folder. Google sign in checks the audience and that the token email matches the account. Codes come from a secure random source, expire after 15 minutes when used as one-time codes, and are rate limited per email and network. `GET /config` and `/all-configurations` no longer return passwords or webhook secrets (admin only for the full list). Tenant ids always come from the verified identity, so one owner cannot read or change another owner's subscribers, keys, webhooks or sends. `PUT /config` cannot change plan, VIP or API key fields. The test-send endpoint only mails the owner. Sockets authenticate on `register` and join only the owner's own room.
- **One shared API layer (`API/_lib/`).** Config validated with zod at startup, JSON logs that redact secrets and mask emails, request ids, security headers, CORS allowlist, per-route body limits (1 MB default, 10 MB for config and imports), one error handler, cursor pagination, idempotency keys, rate limits, a Firestore client with update masks and preconditions, session tokens, signed links, plan limits.
- **Production basics.** `/healthz` and `/readyz`, graceful shutdown on SIGTERM, service account from env (`FIREBASE_SERVICE_ACCOUNT_JSON`), `.dockerignore` keeps secrets out of the image, the container runs as an unprivileged user and keeps `deno.lock`.
- **Subscribers.** Only email, name, bio, language and country are stored from requests. New subscribers get their `email` field again (a 404 handling bug skipped it). Signed confirm and unsubscribe links, one-click unsubscribe (RFC 8058), a confirm page that scanners cannot trigger, `confirmedAt` and `subscribedAt`, honeypot and rate limits on the public form, no silent cap at 1,000 readers, COUNT queries for plan limits.
- **GDPR.** Owner export and delete request (with cancel), reader export and erasure by signed link, a purge script that is dry-run by default.
- **New endpoints for the product.** Automations (CRUD, toggle, run now, run history, recipes) on top of the WS8 engine, activity feed, onboarding checklist and events, usage against plan limits, email preview, sender check, invitations (invite, then expire), delivery log, support form, public config, sitemap list. Un-versioned aliases serve the paths the current frontend already calls.
- **Billing.** Payment processors are off (Luis). WS4 parked the routers; WS7's hardened versions (token-checked webhooks, server-side orders, one-time event log, signed Polar webhooks) are in `_deprecated/` for when payments return. Plan limits stay enforced on the server with an upgrade link in the error.
- **Tests.** 164 tests in `tests/api/` (no network, Firestore mocked).

## What is left
- Run `deno task check` and `deno task test` on a machine with deno. Neither could run in this session (no network for deno); a TypeScript check with shims and a bun runner were used instead.
- WS6: send `token` from the confirm page, move dashboard unsubscribe to `DELETE /v1/subscribers/:email`, remove the widget's `/config` secret branch. Then flip `LEGACY_UNSIGNED_LINKS` and `LEGACY_CODE_AUTH` to false.
- WS8: signed unsubscribe links in issues, bounce and send-stamp calls, delivery log writes, usage counters (requests/8.md).
- Live preview for the landing page answers 501 until WS8 has a preview that works without an account.
- Rate limits are in memory per process; use Redis or similar before running more than one instance.
- Existing subscriber docs are not backfilled with `email`; nothing was migrated.

## Risks
- Behaviour changes callers can notice: anonymous `GET /config` returns public fields only; secrets come back masked; billing routes answer 404; `/news-source/send-email` only mails the owner; the 6th wrong code within the window is refused.
- Production will not start without `LINK_SIGNING_SECRET`.
- Until `CORS_ORIGINS` is set, private endpoints still answer any origin (without cookies), as before.
- The backend was never started in this session. Express and Socket.IO wiring was checked by reading and by tests of handlers, not end to end.

## How to verify
1. `deno task check` and `deno task test` in `ai-newsletter-translated`.
2. Local run with `APP_ENV=development`: `curl localhost:8000/healthz` and `/readyz`; `curl -i localhost:8000/docs/../serviceAccountKey.json` answers 404; `GET /config` without headers returns no `appPassword`.
3. Sign in on the dashboard: the response of `GET /auth/:email` contains `sessionToken`; the dashboard keeps working with it.
4. Subscribe through the widget, open the confirmation link, then unsubscribe from the email footer.

## Decisions for Luis
1. **Rotate every secret now.** The template bug and the `/docs` traversal were reachable without an account in production, so treat the environment and working folder as exposed. In this order:
   - `serviceAccountKey.json` (GCP key: delete it in IAM, create a new one, store it as `FIREBASE_SERVICE_ACCOUNT_JSON`, check audit logs), `typesensecloudserviceaccount.json`.
   - `TYPESENSE_ADMIN_API_KEY`, `TYPESENSE_SEARCH_ONLY_API_KEY`, `OPENAI_API_KEY`, `GEMINI_API_KEY`, `GITHUB_TOKEN`, `GITHUB_CLASSIC_TOKEN`, `SECRET_CLIENT_SECRET`.
   - `APP_PASSWORD` (it was printed in logs on every send) and the Firestore `system/secret` document values (`appPassword`, `openAiApiKey`, `the_pass`, `email.auth.pass`); frontend `THE_PASS`.
   - `TILOPAY_API_KEY`, `TILOPAY_API_USER`, `TILOPAY_PASSWORD`, `POLAR_ACCESS_TOKEN`, `POLAR_WEBHOOK_SECRET`.
   - The WordPress application password hard-coded in `scripts/testWordPressPost.ts` (revoke it on that site).
   - Every `authCodes` document (they were logged with each request) and every tenant API key: delete them after the frontend sends session tokens, so everyone signs in again.
   - Purge or shorten retention of Render and Vercel logs.
   - Check `.env.trash` for old live values.
2. **Customer notification.** Tenant Gmail app passwords, WordPress passwords and webhook secrets were returned by unauthenticated endpoints. Decide whether this is a breach you must notify; at least ask those customers to revoke them.
3. **Set before deploying:** `LINK_SIGNING_SECRET` (32+ random characters), `CORS_ORIGINS=https://aiban.news,https://www.aiban.news`, `GOOGLE_CLIENT_IDS`, `ADMIN_EMAILS`, `PUBLIC_API_URL`. Full list: `docs/configuration/environment.md` in the backend.
4. **When to turn off the migration switches:** `LEGACY_CODE_AUTH=false` after the frontend with session tokens is live; `LEGACY_UNSIGNED_LINKS=false` about 30 days after signed links ship in emails.
5. **GDPR purge:** `db/gdpr/runPendingDeletions.ts` deletes accounts that asked for deletion 14 days ago. It is dry-run unless `--execute`, and refuses production without an extra flag. Decide who runs it and how often.
6. **Firestore setup:** indexes and TTL policies listed in requests/10.md.
7. **Payments:** when they return, restore the routers from `_deprecated/API/billing/**`, set `TILOPAY_WEBHOOK_TOKEN` and add `?token=` to every webhook URL in the Tilopay console.
8. **Domain:** links default to `https://aiban.news` (`FRONTEND_URL`). WS8 defaults owner links to aibanewsletter.club; pick one.
