# WS8 log (backend content engine + automations)

## 2026-10-30
- Start. Linked folders were not mounted in this run; requested access to the two project folders once, granted.
- deno could not be installed: deno.land, npm and pypi are blocked from both the computer shell and the cloud workspace. Type checks run with TypeScript 5.9 (`some-awesome-newsletter/node_modules/typescript`) against the engine files, with a small shim for `npm:` and `Deno`; tests are written for `deno test` and also run under Node 22 type stripping through `tests/engine/_node_runner.mjs`. Full `deno check main.ts` is still owed (see summary).
- Read CHARTER.md, COPY_RULES.md, requests/8.md (empty). STRATEGY.md not written yet.
- Wrote AUTOMATIONS.md v1.
- Request to WS7 (requests/7.md): single-pass template eval (RCE), getMailConfigPack callers, automations CRUD, event hooks, socket events, Firestore collections, bcc removal.

## Prompt review (subagent)
New files:
- prompts/_shared/copyRules.ts: COPY_RULES_PROMPT, BANNED_WORDS, CONTEXT_DEPENDENT_WORDS (key, landscape, highlight: warn only, a string match cannot tell the sense), BANNED_CHARACTERS, findBannedWords(text), DATA_IS_NOT_INSTRUCTIONS, wrapData(text, label?) (neutralizes a closing data tag inside the content), stripDashes, stripEmojis (keeps the copyright, registered and trademark signs), straightenQuotes, cleanCopy.
- prompts/_shared/rewriteVoice.ts: buildRewriteSystemPrompt({ senderName, personality, idealReader, language, includeImages, newsletterTitle, mode? }) plus buildImageRules(language, includeImages). mode "digest" is an optional extra for the engine.
- prompts/_shared/sanitizeOutput.ts: sanitizeNewsletterHtml(html, includeImages) and countImagePlaceholders(html).
- prompts/_shared/contacts.ts: shared contact list prompt, JSON schema, normalizeContacts (validates codes and emails, dedupes by email).

Rewritten (default export signatures unchanged):
- translatedArticleContentPrompt.ts: uses complete() with the system prompt from buildRewriteSystemPrompt and the article in <data>. Images are now `<img data-aiban-image-query="..." alt="...">` with no src. The old `${await fetchImageFromStockPhotoSiteSearch(...)}` instruction is gone, and the output sanitizer turns any `${` and backticks into HTML entities. getTopics was removed (it was only used inside the old prompt). Source text is capped at 30000 characters.
- scraperMostInterestingArticlePromptIndex.ts: picks for relevance to the ideal reader, with completeJSON {index, reason}. New export selectBestArticles(...).
- getWritersPersonalityPrompt.ts: describes observable style traits (sentence length, person, formality, quoted recurring phrases, what the writer avoids), written in the sample's language, with no flattering adjectives.
- scraperWebsiteInfo.ts: completeJSON with a fixed schema (the 6 ScrapedWebsiteInfo fields plus targetAudience, mainTopic, websiteLanguage). Title and subject are in sentence case. Code-level cleanup removes dashes, emojis and curly quotes and validates the country code. Script and style tags are dropped before the text goes to the model, and the input is capped at 12000 characters.
- scraperLinkSelectorPrompt.ts: system/data split, defensive parsing of the selector, and no cache when retrying after failed attempts.
- scraperClosestDescriptionToSearchPromptIndex.ts: completeJSON {index}. When only one option is left there is no LLM call. If the model picks an excluded index, the first available index is returned (it used to return -1).
- processUserChunkIntoJSON.ts / processUserDatabaseIntoJSON.ts: completeJSON with a {users: [...]} schema, normalization and email dedupe. The database file no longer calls getFallBackAuth (its result was unused). Both return [] on failure, and the chunk file still throws when no key is configured.

Judgment calls: the openAiApiKey checks stay in place to keep existing behavior, even though the new client chooses the provider. A model-written reason in selectBestArticles is English, under 25 words. The fallback in selectBestArticles is [0..count-1], as the spec says.
Engine follow-ups (not my files): engine/generateEmailContent.ts currently removes every <img> without an http src, so the new placeholders are dropped until the engine resolves data-aiban-image-query to a stock photo URL before that check.

## 2026-10-30 (implementation)
Workflow: the backend source (no secrets) was staged to the cloud workspace as a tarball, edited and tested there (TypeScript 5.9 strict check, Node 22 tests), then shipped back as `_aiban_backups/ws8-transfer/bundle{1,2,3}.tgz` and extracted in place (`tar --overwrite`, nothing deleted). Tests also pass on the computer: `node tests/engine/_node_runner.mjs`.

Files created:
- `helper/LLM.ts` (rewritten as the central client; the Selenium Gemini code moved to `engine/llm/geminiWebFallback.ts`, off unless `LLM_ENABLE_WEB_FALLBACK=1`).
- `engine/automations/{types,cron,hash,store,firestoreStore,queue,logger,deps,pipeline,executor,recipes,engine,defaultDeps,mod}.ts`
- `engine/content/{candidates,extract,lint,images,language,write,resolveImages}.ts`, `engine/render/renderTemplate.ts`
- `tests/engine/*` (45 tests, fixtures, a Node runner for machines without deno)

Files changed: `helper/{callChatGPT4,fetchScrape,getMailConfigPack,sendEmail}.ts`, `engine/{scheduleAllNewsSources,processSubscribersForNewsSource,processCustomContentForSubscribers,scrapeAndTranslateArticle,translate,scraper,generateEmailContent,emailSender,sendRejectionNotifications}.ts`, `engine/selector/{selectorRetries,populateMissingSelectors}.ts` (one-line fixes).

Moved to `_deprecated/` (originals of every file above, same relative path): `engine/processUserGroup.ts` and `engine/processUserGroupWithCustomArticle.ts` (no longer used) plus copies of the replaced files.

Decisions taken:
- One article per run for all languages (was one pick per language). Matches STRATEGY.md.
- Ledger: an article is never sent twice from the same source. "Send now" twice the same day usually ends `no_new_items`.
- Legacy automations keep the fixed subject; new automations use the issue title.
- `first_send` milestone only for stored automations (existing tenants would get a false "first issue" mail).
- Owner nudges at most once per kind per automation per day.
- Quiet hours wait in memory (a restart in the window drops that run). Documented.
- bcc to info@aiban.news removed; `MAIL_AUDIT_BCC` restores it on purpose.
- LLM default provider order kept (github, gemini, openai) so cost does not change; see Decisions for Luis.

Review (subagent, read only) found 15 issues; fixed: same-source overlap (queue slot per tenant + source), ledger written after the first send, bad time zone stopping all schedules, quiet hours (zoned minutes, no poll pile-up, re-check enabled), stale run keys after a crash (takeover rule), double opt-in welcome key, fetch timeout covering the body, SSRF (public http(s) only, every redirect hop checked), slow nextRun (formatter cache, hour jumps, never-matching crons rejected on save), repeated first_send, run index for quiet polls, welcome translation token check and failure caching, DST fall-back double run, sequential tenant refresh, executeRun throwing. Documented, not fixed: a time that does not exist on the spring-forward day does not run.

Answers to requests/8.md: WS3 update 4 (replyTo to the owner) done in `engine/replyTo.ts`; WS2 groupId done; WS5 1 to 7 done on the engine side (headers, welcome, owner notice, preheader, weekly report); WS1 owner_weekly_report done (UTC until WS7 adds `config.timezone`); WS3 1 done, 2 and 3 need WS7 (asked); WS4 includeImages honored, import behavior answered in requests/4.md.

Requests sent: requests/7.md (two batches), 5.md, 2.md, 3.md, 4.md.

## 2026-10-30 (Luis's decisions applied)
- LLM: `helper/LLM.ts` has an `openrouter` provider (OpenAI-compatible, `https://openrouter.ai/api/v1/chat/completions`, model `LLM_OPENROUTER_MODEL` default `~deepseek/deepseek-flash-latest`, `HTTP-Referer` and `X-Title` headers, `response_format: json_object` for JSON calls, `usage.include` so the real cost is recorded, `reasoning.exclude` so no thinking text lands in issues). Default order is now `openrouter,github,gemini,openai`; a provider without a key is skipped. `OPENROUTER_API_KEY` and `LLM_OPENROUTER_MODEL` were added to the backend `.env` (Luis supplied the key in chat). New test in `tests/engine/llm.test.ts` (47 tests pass). No live call: openrouter.ai is blocked from both shells.
- Gemini website driver removed: provider and `LLM_ENABLE_WEB_FALLBACK` gone from `helper/LLM.ts`; `engine/llm/geminiWebFallback.ts` moved to `_deprecated/engine/llm/`; `scripts/generate_sales_letters.ts` rewritten to call `complete()` (original in `_deprecated/scripts/`). `deno.lock` still lists selenium-webdriver (WS7 file, harmless; the next `deno cache` drops it).

## 2026-10-30 (mail, decided by Luis: everything recommended now, paid service later)
- Daily send budget: `engine/mail/budget.ts` (rolling 24 h, hourly buckets in `mailBudgets`, limits by mailbox type, 5% transactional reserve). `send_email` checks it per batch and stores the rest in `mailDeferred`; `engine.resumeDeferred()` sends them later with the same issue (`RESUME_CHAIN`). Provider throttling is held back the same way instead of counted as failed. New milestones `send_deferred`, `mailbox_disconnected`.
- Send from my own Gmail: `engine/mail/{crypto,mime,gmail,routes}.ts`. OAuth with `openid email gmail.send` only, signed expiring state, refresh token AES-GCM encrypted in `mailConnections`, Gmail API transport with token refresh, header-injection-safe MIME, revocation falls back to the AIBAN address and nudges the owner. `defaultDeps.createTransport` picks Gmail, then app password, then the AIBAN address.
- `MAIL_TOKEN_KEY` generated on Luis's computer and added to the backend `.env` (value never printed).
- Guide for Luis: `docs/aiban/MAIL_SETUP.md` (Google OAuth client and verification, SPF, DKIM, DMARC, Render env).
- Requests: WS7 (mount routes, env, collections), WS4 (settings card), WS6 (request functions).
- Tests: 51 pass (`tests/engine/mail.test.ts` added).

## 2026-10-30 (Luis: no Google Cloud OAuth)
- "Send from my own Gmail" removed: `engine/mail/{gmail,crypto,mime}.ts` and the old `routes.ts` moved to `_deprecated/engine/mail/`; `defaultDeps` no longer checks Gmail connections; milestone `mailbox_disconnected` and KV bucket `mailConnections` removed. WS7 had already mounted `registerMailRoutes`, so `engine/mail/routes.ts` was rewritten to serve only `GET /v1/mail/status` (no broken import).
- `MAIL_TOKEN_KEY` removed from the backend `.env` (no longer used).
- `MAIL_SETUP.md` rewritten with SPF, DKIM and DMARC values for GoDaddy and Squarespace. Requests to WS7, WS4 and WS6 updated. 49 tests pass.
