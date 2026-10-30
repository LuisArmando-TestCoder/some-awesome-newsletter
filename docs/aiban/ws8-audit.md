# WS8 audit: content engine and scheduling (before the overhaul)

Scope: `engine/**`, `prompts/**`, the WS8 helpers, `scripts/**`. Snapshot: `_aiban_backups/backend-2026-10-30-pre-overhaul.tgz`; the replaced files are kept in `_deprecated/engine/` and `_deprecated/helper/`.

## Critical
1. Remote code execution through templates. `helper/functionTemplateFile.ts` evaluated each email template twice with `new Function`. The second pass ran over scraped article text, LLM output and the owner's signature, and the rewrite prompt told the model to write `${await fetchImageFromStockPhotoSiteSearch(...)}` so that pass could fetch images. Any `${...}` in a scraped page or a prompt injection ran as server JavaScript with access to env secrets. (WS7 has since made the helper single pass; the engine no longer depends on it.)
2. One owner could stop the server for everyone. `helper/getMailConfigPack.ts` called `Deno.exit(1)` when an owner had not finished SMTP settings.
3. Privacy: `helper/sendEmail.ts` blind-copied every email to `info@aiban.news`.

## High
4. Duplicate and inconsistent sends. Each language group ran its own scrape and its own "most interesting" LLM pick, so Spanish and English readers got different stories, and nothing recorded what was sent: the same article could go out again the next day. A subscriber in two language groups got two emails.
5. Scheduling: one `CronJob` per source plus a 60 s Firestore poll per source (N reads per minute), one global serial queue (one slow tenant blocked all others), an in-memory 55 minute rate limit as the only duplicate guard (lost on restart), and no catch-up for minutes missed while the event loop was busy.
6. All LLM calls went through one global serial queue with provider order GitHub Models, Gemini API, OpenAI, then a Selenium script that drives the Gemini consumer web site in headless Chrome. No timeouts, no cost accounting, no JSON validation (index answers parsed with `parseInt`).
7. Scraping: `fetch` without timeout or size cap; article text was `$("body").text()` (navigation, cookie banners and footers went to the LLM); RSS was only used when the source URL itself was a feed; no sitemap fallback; a broken selector failed silently forever.
8. The selection prompt asked for "punk", "subversive", "drive clicks" picks instead of relevance to the owner's ideal reader. The rewrite prompt repeated itself in capitals, asked to bold "every meaningful word", and its em dash stripping was the only copy rule enforced in code.
9. Images: up to 5 LLM calls per image per language to pick a stock photo, plus an HTTP HEAD per image per subscriber.
10. Email: no List-Unsubscribe headers (Gmail and Yahoo bulk sender rules), unencoded emails in unsubscribe and tracking URLs, every SMTP error swallowed the same way (no bounce handling, no throttle handling), subject identical every day.
11. WordPress: no retries; one failure was logged and forgotten.

## Medium
12. `scrapeAndTranslateArticle` waited 5 minutes inside an HTTP request when the model returned nothing (onboarding preview hung).
13. Logs printed whole articles and full subscriber email lists.
14. `processCustomContentForSubscribers` ran all language groups in parallel through the serial LLM queue with no error report to the owner.

## Benchmarks used (patterns only)
rasa.io and Feedly AI (relevance ranking against a reader profile, dedupe across issues), Morning Brew (one-line "why it matters" opener, scannable sections, one takeaway), beehiiv AI tools (preview before send, per-issue subject), Zapier and Make (trigger, ordered steps, run history with per-step status, retries, replay, idempotency keys).
