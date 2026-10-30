# WS7 plan

Order follows risk: stop the bleeding, then build a shared API layer, then harden each area on top of it, then new endpoints, tests and docs.

## 0. Hotfixes (done first, directly on the computer)
- Single-pass template rendering (RCE), `/docs` path traversal.

## 1. Shared API layer (`API/_lib/**`, new)
config (zod env validation, fails fast in production), logger (JSON, redacts secrets, masks emails), request ids + access log, security headers, CORS allowlist (public paths stay open for the widget), per-route body limits, error envelope `{error:{code,message,details}}` for /v1 (legacy routes keep `{error:"..."}` plus `code` and `requestId`), zod `validate()`, rate limiter, cursor pagination, idempotency keys, Firestore REST client with masks/preconditions/count/increment, activity feed writer, owner auth (session tokens + legacy code), health and readiness.

## 2. Hardening slices (parallel, disjoint files)
- A. Auth + sockets: crypto codes with expiry and attempt limits, verify rate limit, Google token audience and email match, session tokens returned on login (legacy code still accepted behind `LEGACY_CODE_AUTH`), no secrets in logs, socket auth on register and per-tenant rooms, typed events, `automation:run` forwarding.
- B. Billing: Tilopay webhooks require `TILOPAY_WEBHOOK_TOKEN`, plan from a server-side order record, idempotent event log, fixed plan write; owner-only billing actions; Polar webhook (Standard Webhooks signature) and internal relay; server-side plan limits with helpful errors.
- C. Configuration, news sources, leads: auth on `/config`, public projection without secrets, allow-listed writable fields, admin-only `/all-configurations`, tenant checks, send-email limited to the owner's own address, SSRF guard on user URLs, leads without full scans.
- D. Subscribers: tenant binding in `multiAuth`, field allow-lists, 404 handling, signed confirm and unsubscribe links (legacy unsigned accepted behind `LEGACY_UNSIGNED_LINKS`), one-click unsubscribe (RFC 8058), double opt-in correctness, paginated lists, GDPR export and delete for owners and subscribers, automation event hooks.
- E. New /v1 endpoints: automations CRUD/toggle/run-now/runs (via WS8 `engine/automations/mod.ts` when present), activity feed, onboarding checklist, usage vs plan, email preview, sender connection test.

## 3. Tests and docs
`tests/api/**` (deno test, mocked Firestore), `docs/aiban/API_CONTRACT.md`, refreshed `docs/**`, ws7-summary.md with Decisions for Luis.

## Constraints
- deno cannot be installed (network blocked on the computer and in the cloud workspace). Type checks run with `tsc` against shims, and tests run under bun with a Deno shim. Both are recorded as a risk; run `deno task check` and `deno task test` once deno is available.
- Backward compatible for the current frontend; new behaviour behind env flags where it would break callers.
