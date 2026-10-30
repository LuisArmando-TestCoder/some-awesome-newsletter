# WS10 QA (b): backend static checks, tests and templates

Date: 2026-10-30, 09:05 to 09:20 UTC. Backend: `ai-newsletter-translated`. Report only; no project file was changed.

Method: a copy of the backend without secrets (no `.env*`, `serviceAccountKey.json`, `typesensecloudserviceaccount.json`, `secrets/`, `.git_disabled`, `_aiban_backups`) was made in the computer shell's home (`~/ws10c`, outside the project). The QA tooling lives in `~/ws10c/_qa/` (shims, tsconfigs, a Node test runner for `tests/api`). That folder is outside the connected folders and goes away with the session. Nothing was started against Firestore, OpenAI or SMTP. The test runner replaces `fetch` with a function that throws, and stubs nodemailer, socket.io, cheerio and the other npm modules except express and zod.

WS7 activity: `ws7-push4.tgz` (09:05) landed during the run (`API/_lib/config.ts`, `API/v1/automations/automationsV1Router.ts`, `API/v1/automations/model.ts`, `API/v1/v1Router.ts`), plus `engine/scheduleAllNewsSources.ts` (comment change) and new `engine/mail/routes.ts` wired into `v1Router`. Every result below comes from a fresh copy taken at 09:13, after push4.

## Summary

| Check | Result |
|---|---|
| Type check (TS 5.9 strict, Deno-like options, real zod v3 types) | 22 errors in 222 files: 4 real `deno check` errors (WS7), 2 likely real depending on Deno's TS version (WS7), 16 shim noise |
| Relative imports from main.ts | 222 files, all resolve with exact case, no missing named exports |
| Engine tests `node tests/engine/_node_runner.mjs` | 51 passed, 0 failed (WS8 summary says 51; the 45 in the brief is out of date) |
| API tests `tests/api/*.test.ts` (new Node runner) | 164 passed, 0 failed, 0 files failed to load (all 164 `Deno.test` cases) |
| Templates `node templates/_preview/render.mjs` | 22/22 rendered, no `undefined`, `NaN`, `[object Object]` or `${` in the output |
| Same templates, single pass (the way the backend renders now) | 22/22, byte for byte the same as the two-pass output |

Nothing found stops the server from starting: `deno run` does not type check, and every import resolves. One item does fail the `deno task check` gate (B1).

## Blocking for the `deno task check` gate

### B1. Implicit `any` on `app` in four endpoint files (owner WS7)
- `API/newsSource/deleteNewsSourceEndpoint.ts:11`
- `API/newsSource/getNewsSourceEndpoint.ts:12`
- `API/newsletter/apiKeyEndpoint.ts:25`
- `API/newsletter/sendCustomContentEndpoint.ts:15`

All four have `export default (app) => {`. Under Deno's default `strict: true` this is TS7006 ("Parameter 'app' implicitly has an 'any' type"), so `deno check main.ts` and `deno task check` fail. The pattern is already in git HEAD (May 2026), so the check gate never passed. WS7 touched these files today (08:41 to 09:03).
Fix: `import type { Express } from "npm:express";` and `export default (app: Express) => {`, as the other endpoints do.
Reproduce: `deno task check`, or in `~/ws10c`: `node <fe>/node_modules/typescript/bin/tsc -p _qa/tsconfig.zod.json`.

### B2 (likely, depends on Deno's TypeScript version). `Uint8Array` vs `BufferSource`/`BodyInit` in `helper/imageProcessor.ts` (owner WS7, helper/**)
- `helper/imageProcessor.ts:120` `crypto.subtle.digest("SHA-256", buffer)` with `buffer: Uint8Array` (TS2345)
- `helper/imageProcessor.ts:154` `fetch(..., { body: imageBuffer })` (TS2322)

TypeScript 5.7 and later type `Uint8Array` as `Uint8Array<ArrayBufferLike>`, and the DOM/Deno lib types do not accept that. Deno releases that ship TS 5.7 or later (Deno 2.2 and later) report the same error. The Dockerfile uses `denoland/deno:latest`, so expect it. The file has been like this since May.
Fix: type the parameters as `Uint8Array<ArrayBuffer>`, or pass `buffer as BufferSource` and `imageBuffer as BodyInit`.

## Non-blocking findings

1. **Engine has no `deleteAutomation` export** (WS7 caller, WS8 engine). `API/v1/automations/automationsV1Router.ts:116` calls `engineFn("deleteAutomation")`, but `engine/automations/mod.ts` does not export it. `engineFn` returns null, so the call does nothing and logs nothing. The Firestore document is deleted, but the running engine keeps the automation in its tenant cache until the next refresh (`AUTOMATION_REFRESH_MS`, 60 s by default). A schedule deleted right before its minute can still fire once. Fix: export `deleteAutomation(id, tenantId)` from `mod.ts` that drops the automation from the cache (or forces `refreshTenant`), or have the router call `getEngine().registerTenant(tenantId)` after the delete.
2. **Dynamic `npm:nodemailer@6.9.13`** (WS7). `API/v1/sender/senderV1Router.ts:40-43` runs `import(NODEMAILER)` with a variable. Deno cannot see that during `deno cache main.ts` (Dockerfile), and `deno.lock` has no `nodemailer@6.9.13` (only `^6.9.13`/`*` -> 6.10.1). The first sender test after a deploy downloads a second nodemailer copy at runtime, or fails if the registry cannot be reached. Fix: use the import-map name `"nodemailer"` or `"npm:nodemailer@^6.9.13"` so it reuses the locked 6.10.1.
3. **`templates/invitation.html` does not exist** (WS5/WS7). `API/v1/invitations/invitationsService.ts:160` checks for it and falls back to a built-in HTML body, so this works. Note it only so nobody assumes WS5 shipped a branded invitation.
4. **The preview harness still evaluates twice** (WS5). `templates/_preview/render.mjs:52-55` says "Same two-pass behavior as the backend", but since the RCE fix the backend evaluates once (`helper/functionTemplateFile.ts`, `engine/render/renderTemplate.ts`). Output is identical today, but the harness no longer matches production. Fix: render once and update the comment.
5. **API key hashes in logs** (WS7, low). `API/newsletter/apiKeyEndpoint.ts:63-86` logs the encoded hash, the decoded hash and every stored bcrypt hash on delete. These are not secrets, but they are verifier material and add noise. Fix: drop those `log` lines or log counts only.
6. **Unpinned runtime and specifiers** (WS7). The Dockerfile uses `denoland/deno:latest`, so the TS version, and with it the check result (B2), drifts. `main.ts` imports `npm:express`, `npm:socket.io` and `https://deno.land/x/dotenv/load.ts` without versions. `deno.lock` pins them (express 4.18.2, socket.io 4.8.3, dotenv v3.2.2 by redirect), so runtime is stable. Fix: pin `denoland/deno:2.x.y` and use the import-map names.
7. **Engine started outside production only through `scheduleAllNewsSources`**. `startAutomations` (exported from `engine/automations/mod.ts`) is never called. Intended (main.ts starts the engine only when `cfg.isProduction`), but it is dead code.
8. **Left-over TODOs** (all already in git HEAD, none added today): `API/newsletter/sendCustomContentEndpoint.ts:87,111` (the manual-send timestamp is written before the send, and is not rolled back when the send fails), `helper/functionTemplateFile.ts:113`, `helper/scheduleTasks.ts:34`.

## 1. Type check details

Setup (`~/ws10c/_qa/`):
- `shim.d.ts` / `shim-nozod.d.ts`: typed `Deno` namespace (env, exit, readTextFile(Sync), stat, errors, args, addSignalListener, test), `ImportMeta.main`, untyped `npm:*`, `node:*`, `https://*`, `jsr:*` and import-map names.
- `express-shim.d.ts`: loose `Request`/`Response`/`NextFunction`/`Express`/`Router` (deno.lock has no `@types/express`, so Deno has no express types either), `node:http`, `NodeJS.Timeout`.
- `tsconfig.zod.json`: `strict`, `isolatedModules`, `useUnknownInCatchVariables: false` (Deno defaults), `allowImportingTsExtensions`, roots `main.ts` and every `tests/api/*.ts`. `npm:zod@3.22.4` maps to the frontend's `zod/v3` types (zod 4.1.12 ships the v3 API), so every zod schema is fully type checked.

Remaining 22 errors:

| File:line | Code | Owner | Verdict |
|---|---|---|---|
| API/newsSource/deleteNewsSourceEndpoint.ts:11 | TS7006 `app` | WS7 | Real (B1) |
| API/newsSource/getNewsSourceEndpoint.ts:12 | TS7006 `app` | WS7 | Real (B1) |
| API/newsletter/apiKeyEndpoint.ts:25 | TS7006 `app` | WS7 | Real (B1) |
| API/newsletter/sendCustomContentEndpoint.ts:15 | TS7006 `app` | WS7 | Real (B1) |
| helper/imageProcessor.ts:120, 154 | TS2345 / TS2322 Uint8Array | WS7 | Likely real (B2) |
| helper/imageProcessor.ts:85, 198 | TS2694 / TS7006 imagescript | WS7 | Shim (URL module untyped here; Deno has its types) |
| main.ts:39 | TS7006 req/res/next | WS7 | Shim (loose `app.use` type) |
| socket/socketHandler.ts:18,46,50,94; socket/socketLogger.ts:5,7 | TS2709 Socket/Server | WS7 | Shim (socket.io untyped here; Deno gets its bundled types) |
| engine/generateEmailContent.ts:86; helper/simplifyDOMForLookUp.ts:53 | TS7006 cheerio `.each` | WS8 / WS7 | Shim (cheerio untyped here) |
| helper/LLM.ts:144 | TS2347 `AsyncLocalStorage<T>` | WS8 | Shim (`node:async_hooks` untyped here) |

Before real zod types were used, about 25 more TS7006 errors in zod `.refine/.transform` callbacks showed up. They all went away with `zod/v3` types, so the zod usage type checks.
Run without the Deno catch default (`useUnknownInCatchVariables: true`), four `error.message` uses would also fail (`API/newsletter/sendCustomContentEndpoint.ts:119`, `helper/firestore/fetchFirestoreData.ts:19`, `helper/functionTemplateFile.ts:94,130`). Deno's default is `false`, so they are not reported.
`tests/api/*.ts` adds no errors.

## 2. Import graph integrity

- 222 project files are reachable from `main.ts` (static imports). Every relative specifier resolves to an existing file, checked segment by segment with exact case (Docker on Linux is case sensitive). There is no TS2305/TS2614 (missing export) anywhere.
- Dynamic imports checked by hand: `engineBridge.ts` loads `engine/automations/mod.ts` (exists; it is also imported statically through `engine/scheduleAllNewsSources.ts`, so `deno cache` covers it). Engine names the API asks for: `emitAutomationEvent`, `listAutomations`, `saveAutomation`, `runManual`, `listRuns`, `listRecipes`, `getEngine`, `onRunUpdate` are exported. **`deleteAutomation` is not** (finding 1).
- `scripts/*.ts`, `walkRead.ts` and `tests/**`: all relative imports resolve.
- Nothing live imports `_deprecated/`. Billing (Tilopay/Polar) and `legacyAuthProxy` moved there; the live code has no references to them except `/v1/billing/plan(s)`, which `plansV1Router.ts` serves as `API_CONTRACT.md` 8.2 describes.
- Every template the code names exists except `templates/invitation.html` (finding 3).
- `deno.lock` covers every static remote import (dotenv by redirect, std@0.208.0 base64, imagescript 1.3.0, djwt) and every npm package (express 4.18.2, socket.io 4.8.3, zod 3.22.4, bcryptjs 3.0.3, marked 17.0.3, cheerio 1.2.0, nodemailer 6.10.1).
- Dockerfile permissions (`--allow-net --allow-env --allow-read --allow-sys`) are enough. Nothing in the graph writes files, spawns processes or uses FFI.

## 3. Tests

- Engine: `node tests/engine/_node_runner.mjs` gives **51 passed, 0 failed**.
- API: there was no Node runner for `tests/api`, so `~/ws10c/_qa/` adds one:
  - `register.mjs`: `Deno` shim (test, env, exit throws, readTextFile, stat, errors.NotFound), and a global `fetch` that throws.
  - `hooks.mjs`: Node module hooks that transpile `.ts` with TypeScript `transpileModule`. Plain type stripping cannot be used: the code imports types without `import type` (for example `import { Request } from "npm:express"`), and Node's type stripping would turn those into runtime imports. The hooks map `npm:express` to express 4.21.2 and `npm:zod@3.22.4` to `zod/v3` from the frontend's `node_modules`, and stub every other `npm:`/`https:` module with a proxy that throws when called.
  - Command: `FE_NM=<frontend>/node_modules FIRESTORE_PROJECT_ID=test-project APP_ENV=test node --import ./_qa/register.mjs _qa/run-api.mjs tests/api`
  - Result: **164 passed, 0 failed, 0 ignored, 0 files failed to load**. No stub was called and no network call was attempted (checked in the log). It also passed before push4 (164/164).
  - WS7 can copy this runner into `tests/api/_node_runner.mjs` if it wants a no-deno path like WS8's.

## 4. Lint-level checks

- `Deno.exit`: in the server path only `main.ts:69` (invalid config at startup), `main.ts:126,132` (graceful shutdown) and `main.ts:150` (startup failure), all intended. `db/gdpr/runPendingDeletions.ts:91` runs only under `import.meta.main` (CLI). `scripts/*` are CLIs. The old `Deno.exit(1)` in `helper/getMailConfigPack.ts` is gone (comment at line 22).
- Logs of tokens, passwords or headers: none print a secret. `db/auth/getFallBackAuth.ts:159,275` logs booleans only. `helper/getSmtpConfig.ts:124` is CLI-only and prints host/port settings. `helper/getAccessToken.ts:101` is commented out. API key hashes: finding 5. No code logs `req.headers`, `req.body` or `authorization`.
- `eval` / `new Function` / `with(`: exactly two runtime renderers, `helper/functionTemplateFile.ts:115-120` and `engine/render/renderTemplate.ts:65`, plus the preview harness. Both evaluate the trusted template file **once**. Every caller passes a fixed path under `templates/`, and no template text comes from Firestore, the LLM or the request. Context values are data, and WS5 templates escape them (`__esc`, `__url`, `__html`). The `unsubscription.rce-attempt` sample renders inert. No `eval(` anywhere.
- TODO/FIXME: none added today (finding 8 lists the old ones).
- Routes registered twice: none. 105 distinct method+path routes in the main.ts graph (including the new `/v1/mail/*`). Possible shadowing checked: `/v1/automations/recipes` comes before `/:id`, `/v1/subscribers/count` before `/:email`, compat `POST /auth/verify` before `POST /auth/:email` (comment in `main.ts`), and the `/news-source/*` literal paths before `/news-source/:configId`. `GET /:configId/:newsSourceId` is mounted under `/newsletter/users`.
- Unused exports: about 250 exported names have no importer outside their own file. Nearly all are types or constants also used inside the file. Leftovers worth deleting someday: `engine/automations/mod.ts startAutomations`, `db/projectId.ts getTypesenseServiceAccount` (Typesense), `engine/emailSender.ts sendEmails`, `helper/firestore/firestoreUrlGetters.ts firestoreNewsletterUsersUrl`. None is harmful.

## 5. Templates

- `node templates/_preview/render.mjs` (in the copy): **22/22 rendered**. The output has no `undefined`, `NaN`, `[object Object]` or leftover `${`.
- The same 22 samples rendered single pass (the backend's real behavior) give byte-identical output.
