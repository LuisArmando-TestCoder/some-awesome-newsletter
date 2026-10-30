# WS8 summary: content engine and automations

## What changed
- Automations engine (`engine/automations/`). Triggers (schedule, new article, new subscriber, list imported, send now, write about this, milestones) start a chain of steps with stored run records, per-step retries, partial-failure handling, per-tenant and per-source concurrency limits, cost per run and dry runs that render a preview without sending. Contract: `AUTOMATIONS.md` v1.1.
- Current customers keep their schedules. `scheduleAllNewsSources` keeps its signature; each source becomes a `legacy_<id>` schedule with the same cron (UTC) and the same fixed subject.
- No more duplicate sends. A run key lock stops double runs after restarts. An article ledger (URL hash and content hash) stops the same story going out twice from a source. A reader in two language groups gets one email. Every language gets the same story.
- Scraping reads RSS/Atom feeds, advertised feeds, the stored selector, common feed paths and sitemaps, in that order. When a selector breaks, the LLM finds a new one for the run. Fetches have timeouts and size caps, and private network addresses are refused (SSRF). Article text comes from `<article>`/`<main>`, without navigation, cookie banners and footers.
- Writing: one LLM call per language rewrites in the owner's voice for the ideal reader with COPY_RULES in the system prompt. A code lint then strips dashes, emojis, curly quotes and template syntax and flags banned words. Right-to-left languages get `dir="rtl"`.
- Images come from licensed stock photos (Pexels with `PEXELS_API_KEY`, else Burst), one lookup per query per run, with alt text in the reader's language. There are no LLM calls for images.
- Email: WS5 templates render in one pass (no code execution from content). Every email gets `List-Unsubscribe` and `List-Id`. Sending is throttled and stops cleanly when the provider throttles. Permanent failures go to a bounce hook. Owners get a welcome-sent notice, failure nudges (at most once a day) and a weekly report.
- Blog posts get `groupId`, `createdAt`, `title` and `sourceUrl`. WordPress posts retry 3 times and never block email.
- `helper/LLM.ts`: model config from env, timeouts, retries, provider fallback, JSON schema output with one repair attempt, token and cost accounting per run, a cache for identical calls, and a concurrency limit (the global one-at-a-time queue is gone).
- Fixed outages and leaks: `Deno.exit(1)` on incomplete SMTP config is now a thrown error, and the bcc of every email to info@aiban.news is gone.

## How to verify
- Tests (no network, no LLM, no email): `node tests/engine/_node_runner.mjs` (49 pass). With deno: `deno test -A tests/engine`.
- Type check: `deno check main.ts` (not run, deno could not be installed here; the engine passes TypeScript 5.9 strict with npm modules shimmed).
- Safe live check: start locally with `APP_ENV=development AUTOMATION_FORCE_DRY_RUN=1`. Then call `getEngine().runManual({ configuratorId, newsSourceId, mode: "send_now", dryRun: true })`. The run's `previewHtml` holds the email. Nothing is sent, published or written to the ledger.

## What is left
- `deno check main.ts` and `deno test` on a machine with deno.
- WS7: automations endpoints, event hooks (`emitAutomationEvent`), `registerTenant` on signup, trigger endpoint statuses, signed unsubscribe tokens and one-click POST, bounce persistence, `config.timezone`. All are in `requests/7.md`.
- The weekly report leaves out new subscribers and clicks until the engine can read them.
- Quiet-hours waits live in memory. A restart during the window drops that run.

## Risks
- Behavior change customers may notice: clicking "send now" twice no longer resends the same article (the answer is "nothing new"). Spanish and English readers now get the same story.
- Sending still goes through each owner's Gmail or SMTP app password. Gmail caps sending at about 500 to 2,000 messages a day, and the engine only reports when the cap is hit.
- New Firestore collections: `automations`, `automationRuns`, `automationRunIndex`, `automationLocks`, `automationLedger`. `automationLocks` grows by one document per run. A TTL policy on `expiresAt` keeps it small.
- The engine runs in one process. Two backend instances would each run the scheduler. The locks prevent double sends, but every tick is done twice.

## Decisions for Luis
1. Decided (Luis, 2026-10-30): the LLM is DeepSeek Flash through OpenRouter (`~deepseek/deepseek-flash-latest`). `helper/LLM.ts` uses OpenRouter first whenever `OPENROUTER_API_KEY` is set. The key is in the backend `.env` on Luis's computer, and the Render service needs the same variable. GitHub Models, Gemini API and OpenAI stay as fallbacks only if their keys are set. Each run records the real cost that OpenRouter reports. This was not tested live, because neither machine here can reach openrouter.ai. A mocked test covers the request shape.
2. Decided: the Gemini website driver (Selenium) is removed completely. It was dropped from `helper/LLM.ts`, the engine copy moved to `_deprecated/engine/llm/`, and `scripts/generate_sales_letters.ts` now uses `helper/LLM.ts` instead of a browser.
3. The bcc copy of every email to info@aiban.news was removed. Set `MAIL_AUDIT_BCC` only if you want an audit inbox, and check privacy terms first.
4. Decided: sending stays on the AIBAN mailbox (no Google Cloud OAuth; "send from my own Gmail" was built and then dropped, code in `_deprecated/engine/mail/`), and a paid service comes later. Built: a daily send budget per mailbox that holds readers over the limit and sends them the same issue when it resets. Luis adds SPF, DKIM and DMARC: values for GoDaddy and Squarespace in `MAIL_SETUP.md`.
5. Domain for owner links: owner emails link to `FRONTEND_URL` (default `https://aibanewsletter.club`), while WS5 templates use aiban.news. Pick one.
6. Optional free key: `PEXELS_API_KEY` for better stock photos.
