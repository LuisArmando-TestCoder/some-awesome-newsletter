# WS8 plan

1. Contract first: `AUTOMATIONS.md` (model, triggers, steps, recipes, runs, idempotency). Done.
2. Central LLM client `helper/LLM.ts` (env model config, timeouts, retries, provider fallback, JSON schema output, cost scopes, cache, concurrency). `callGPT4` becomes a wrapper. Done.
3. Prompts on COPY_RULES (subagent, `prompts/**`). Done.
4. Content stages in `engine/content/`: candidates (feed, advertised feed, selector, common feeds, sitemap, self-healing), readable extraction, writing per language, lint, images, RTL. Done.
5. Engine in `engine/automations/`: types, cron, store (memory + Firestore), queue, executor, pipeline steps, recipes, engine (scheduler, events, manual runs, milestones), real deps. Done.
6. Migrate entry points without changing signatures (`scheduleAllNewsSources`, `processSubscribersForNewsSource`, `processCustomContentForSubscribers`, `scrapeAndTranslateArticle`, `translateArticle`, `scrapeSource`, `generateEmailContent`, `sendEmails`). Done.
7. Tests with fixtures and a mocked LLM (`tests/engine/`). Done, 45 tests.
8. Independent review by a subagent, then fixes. Done (15 findings, 14 fixed, 1 documented).
9. Requests to WS2, WS3, WS4, WS5, WS7. Done.
Left for a later pass: `deno check` and `deno test` on a machine with deno, owner weekly report numbers that need WS7 data (new subscribers, clicks), persisted healed selectors, signed unsubscribe links.
