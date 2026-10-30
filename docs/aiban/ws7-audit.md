# WS7 audit: backend API, data, auth, billing, security

Date: 2026-10-30. Scope: `ai-newsletter-translated` main.ts, API/**, db/**, socket/**, helper/** (WS7 part), types.ts, Dockerfile.
Method: static reading by three parallel reviewers, nothing tested against production. Detailed reports:
- `ws7-audit-security.md`: 9 P0, 8 P1, 6 P2, plus the secret rotation checklist.
- `ws7-audit-endpoints.md`: one row per endpoint (58 HTTP routes plus the socket `register` event), 12 P0, 18 P1, 15 P2.
- `ws7-audit-datamodel.md`: collections, read and write patterns, GDPR map, proposed collections.

## The ten things that matter most
1. Remote code execution without an account. `helper/functionTemplateFile.ts` evaluated each template twice, so `${...}` inside a subscriber name or email ran on the server and could read every secret. Fixed first (single pass), together with path traversal in `/docs`.
2. Account takeover. `GET /auth/:email` accepted a Google token from any OAuth client and never compared its email with the account email.
3. Weak credentials. Six-digit codes from `Math.random`, never expiring, no rate limit on the check, used as the permanent session token, and logged on every request.
4. Secret dumps without login. `GET /all-configurations` and `GET /config` returned SMTP app passwords, WordPress passwords and webhook secrets for any tenant.
5. Billing. Tilopay webhooks were unsigned (anyone could upgrade any account to Master), cancel endpoints trusted the `x-auth-email` header alone, and paid upgrades never saved (POST create on an existing doc returned 409, logged as success).
6. Cross-tenant access. `multiAuth` never bound the caller to `:configId`, so one owner could read or import another owner's subscribers and change their webhook URL. The system "pass" was stored on subscriber docs and returned to tenants.
7. Mass assignment. `PUT /config` wrote any field, including `pricingPlan`, `vip` and `apiKeys`.
8. Open mail relay. `POST /news-source/send-email` sent any HTML to any list through the system sender.
9. Socket.IO. `register` always succeeded, so anyone could join any tenant's log room.
10. Firestore cost and correctness. `fetchWithAuth` treats 404 as success (new subscribers are saved without an email field), unbounded collection scans on public endpoints, offset pagination on `/articles`, 1,000-doc silent truncation on subscriber lists, read-modify-write races on the config doc.

## Frontend and backend mismatches
- Polar (frontend) and Tilopay (backend) billing run side by side; Polar events never reach the backend plan.
- `getPublicConfig` sends `?documentId`, which the backend ignores.
- `/api/auth/google/start`, `/api/auth/magic-link`, `/api/auth/logout` are not served anywhere (callers are dead code).

## Not found
- No Stripe code in the backend (the `stripe` import map entry is unused).
- Typesense is not used at runtime (the client is never imported), though its key file was read at startup.
