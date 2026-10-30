# WS7 log (backend API, data, auth, billing, security)

## 2026-10-30

### Environment
- Folders were not connected at the start of the run; requested access to both repos once and it was granted.
- deno cannot be installed: the computer shell has no network, and the cloud workspace gets 403 from deno.land and npm for the deno package. Type checks run with `tsc` over shims (`npm:*`, `https://*` modules typed as `any`, real zod types); tests are written for `deno test` and run under bun with a Deno shim. Remaining tsc errors (8) are shim artifacts or in WS8 engine files.
- Work was done on a copy in the cloud workspace and installed with a checked transfer: each file is written only if the computer copy still matches the version WS7 last saw, otherwise it is reported as a conflict and skipped. Backups of every replaced file: `ai-newsletter-translated/_aiban_backups/ws7-pre-edit/`. Transfer bundles: `_aiban_backups/ws7-transfer/` (gitignored).
- Secrets were never read, printed, copied or moved. Only env var names were listed.

### Timeline
- 07:40 Read charter, copy rules, requests/7.md. Three read-only reviews in parallel (endpoints, security, data model). Reports: ws7-audit-*.md.
- 07:58 Hotfix on the computer: `helper/functionTemplateFile.ts` renders once (it evaluated templates twice, so `${...}` in a subscriber name or email ran as server code); `/docs` path traversal blocked. Luis notified (push).
- 08:00 to 08:20 Shared API layer `API/_lib/**`, new `main.ts`, `.gitignore`, `.dockerignore`, `Dockerfile`, `deno.json` tasks, service account from env (`helper/serviceAccount.ts`), lazy Typesense key file.
- 08:20 to 08:40 Five implementation slices in parallel with disjoint files: auth and sockets, billing, configuration and sources, subscribers and GDPR, new product endpoints.
- 08:40 Integration review. Fixed: API key and custom-content routes trusted the raw `x-auth-email` header after a session token (cross-tenant takeover); brute force of the permanent code on `requireOwner` routes (failure limit per email and IP, per IP); strangers could lock an owner out with wrong codes (lock now only blocks wrong guesses; limits are per email and IP); Docker cache step ran as root.
- 08:41 First install on the computer (149 files).
- 08:45 to 09:00 Two more slices for requests from WS2, WS3, WS4, WS5, WS6, WS8 (compatibility paths, invitations, events, support, delivery log, milestones, bounces, engine hooks).
- 08:52 Another workstream (WS4, applying Luis's decision that payment processors are off) moved `API/billing/**` and `API/v1/billing/**` to `_deprecated/` and added `API/v1/plans/plansV1Router.ts` and `API/v1/admin/adminV1Router.ts` (WS6). WS7 kept those changes.
- 08:58 A repeated transfer re-created five billing files that had just been parked. They were moved to `_deprecated/_ws7_reapply_dup/` right away. Cause: the upload reused a cached bundle; every later transfer used a new file name.
- 09:00 Three-way merge of WS7's work with the files other workstreams changed on the computer (main.ts, config.ts, configProjection.ts, update endpoints). Tests updated for "owner app passwords are not supported".
- 09:05 Mounted WS8 mail routes, fixed engine `listRuns` call (limit was ignored), engine-only recipes (`owner_weekly_report`), run-now without a source answers 400 instead of 502.

### Files
Changed: main.ts, types.ts, deno.json, Dockerfile, .gitignore, API/auth/**, API/configuration/**, API/newsSource/**, API/newsletter/**, API/leads/**, API/geos/**, API/docs/docsRouter.ts, db/**, socket/**, helper/{functionTemplateFile,getAccessToken,generateCode,verifyGoogleIdToken,requireUser,checkActionLimit}.ts, docs/_index.md.
Created: .dockerignore, API/_lib/** (config, logger, errors, requestContext, security, bodyParsers, validate, rateLimit, pagination, idempotency, firestore, auth, crypto, activity, plans, engineBridge, linkTokens), API/v1/{health,auth,subscribers,privacy,automations,activity,onboarding,usage,email,sender,events,support,invitations,public}/**, API/compat/**, db/gdpr/**, db/newsletter/{subscriberStore,subscribeService,milestones,markBounced,confirmationMailer}.ts, db/configuration/updateNewsSourceField.ts, helper/{serviceAccount,ssrfGuard,configProjection}.ts, socket/{socketAuth,events}.ts, tests/api/** (20 files, 164 tests), docs/configuration/environment.md, docs/v1/_index.md.
Moved to `_deprecated/`: API/auth/legacyAuthProxy.ts (dead code). Billing files were parked by WS4.

### Decisions taken autonomously
- Legacy endpoints keep their response shapes; new endpoints live under /v1 with the error envelope; un-versioned aliases for paths the frontend already calls.
- Security fixes that would break current callers are behind flags that default to the old behaviour: `LEGACY_CODE_AUTH`, `LEGACY_UNSIGNED_LINKS`, and CORS stays open (without credentials) until `CORS_ORIGINS` is set.
- Production refuses to start without `LINK_SIGNING_SECRET`.
- Owner account deletion only marks the account; the purge script (`db/gdpr/runPendingDeletions.ts`) is dry-run by default and was never run.
- Single-pass templates for every file, including `bare.html` (WS8 confirmed it no longer needs a second pass).

### Requests sent
- requests/6.md, 8.md, 5.md, 3.md, 4.md, 10.md (2026-10-30, from WS7).
