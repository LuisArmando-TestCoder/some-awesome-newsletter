# AIBAN automations: data model and execution contract

Owner: WS8. Status: v1.1 (2026-10-30, implemented in `engine/automations/`, 45 tests in `tests/engine/`). This refines charter section 5. WS7 persists these shapes and exposes CRUD, WS6 writes the request functions, WS4 and WS6 display them. Source of truth in code: `ai-newsletter-translated/engine/automations/types.ts`. If this doc and that file disagree, the file wins and WS8 fixes the doc.

Product name used in code: `Automation`. A preset that a user turns on with one switch is a `Recipe` in code; STRATEGY.md (WS1) names both "automation" in the UI.

## 1. Automation

```ts
type Automation = {
  id: string;                    // "auto_" + 16 hex chars, or "legacy_<newsSourceId>" for migrated sources
  configuratorId: string;        // tenant (the owner's config document id)
  name: string;                  // user-editable, sentence case, e.g. "Daily issue from your blog"
  enabled: boolean;
  recipeId?: RecipeId;           // set when created from a preset
  trigger: Trigger;
  steps: Step[];                 // run in order; see section 3
  newsSourceIds?: string[];      // sources this automation reads from (empty for subscriber triggers)
  settings?: {
    dryRun?: boolean;            // render and store the email, never send
    maxItemsPerRun?: number;     // digest size, default 1 (single article), max 5
    languages?: string[];        // restrict to these ISO 639-1 codes; empty = every subscriber language
    quietHours?: { startHour: number; endHour: number; tz: string }; // sends wait until the window ends
  };
  createdAt: string;             // ISO 8601
  updatedAt: string;
  lastRunAt?: string;
  lastRunStatus?: "ok" | "partial" | "failed" | "skipped";
  lastRunId?: string;
  nextRunAt?: string;            // computed by the scheduler for schedule triggers
  stats?: { runs: number; sent: number; failed: number; opens?: number; clicks?: number; costUsd: number };
  source: "user" | "recipe" | "legacy";  // "legacy" = derived at runtime from a NewsSource, not stored
};
// settings also has subjectMode?: "title" | "fixed". "title" (default for every automation, legacy
// included) uses the issue title, written in each reader's language; "fixed" uses newsletterSubject for
// every reader and applies only when the owner sets it on a stored automation (POST/PATCH settings).
```

Storage (WS7): Firestore collection `automations`, document id = `id`, field `configuratorId` indexed. Until WS7 ships CRUD, the executor derives one `legacy` automation per NewsSource from the config document (section 6), so nothing has to be written for current customers.

Ids you will see without a stored document:
- `legacy_<newsSourceId>`: the schedule a source already has (one per source).
- `manual_<newsSourceId>`: "Send now" and "Write about this" runs for a source (run history lives under this id).
- `builtin_<recipeId>`: recipes that are on by default (welcome, import, owner nudges, write about this, owner weekly report) while the tenant has not stored its own automation for that trigger.

## 2. Triggers

```ts
type Trigger =
  | { type: "schedule";       params: { cron: string; tz?: string } }          // tz default "UTC" (current behavior)
  | { type: "new_article";    params: { newsSourceId: string; checkEveryMinutes?: number } } // default 60, min 30
  | { type: "new_subscriber"; params: { newsSourceId?: string } }               // any source if omitted
  | { type: "list_imported";  params: { newsSourceId?: string } }
  | { type: "manual";         params: { mode: "send_now" | "write_about_url" | "write_about_text"; url?: string; text?: string } }
  | { type: "milestone";      params: { kind: MilestoneKind } };

type MilestoneKind =
  | "first_subscriber" | "subscribers_10" | "subscribers_100" | "first_send"
  | "bounce_spike"         // bounce rate above 5% on one run with at least 20 sends
  | "selector_failed"      // a source returned 0 links twice in a row
  | "run_failed";          // any automation run ended "failed"
```

Who fires what:
- `schedule`: the in-process scheduler (`engine/automations/engine.ts`) ticks at the start of every minute and checks every automation's cron in its tz. Minutes missed while the event loop was blocked are caught up (up to 5). Minutes missed while the process was down are not replayed (same as before). The run key (section 5) stops double runs after a restart inside the same minute. A cron with an invalid time zone is skipped without affecting others.
- `new_article`: the scheduler starts a run every `checkEveryMinutes`. The run fetches candidates, drops those already in the ledger, and ends `skipped / no_new_items` (not stored, no LLM call) when nothing is new. Run key bucket: `poll:<minute>`.
- `new_subscriber`, `list_imported`: WS7 calls `emitAutomationEvent({ type, configuratorId, ... })` from the subscribe and import endpoints (export of `engine/automations/mod.ts`).
- `manual`: WS7 endpoint calls `runManual(...)`. Returns the run id at once; progress via run records and Socket.IO event `automation:run` (payload = RunRecord without `steps[].output`).
- `milestone`: emitted by the executor itself after runs and by WS7 on subscriber count changes. Milestones notify the owner only; they never email subscribers.

## 3. Steps

```ts
type StepType =
  | "fetch_candidates"   // RSS/Atom/sitemap first, then CSS selector, then AI selector repair
  | "select_best"        // pick N items for the ideal reader; skips anything already sent
  | "extract_article"    // readable text from the chosen URL (or the pasted text)
  | "rewrite_voice"      // rewrite in the owner's voice, COPY_RULES baked in, lint after
  | "translate"          // one version per subscriber language; keeps names, links, numbers; RTL aware
  | "pick_image"         // licensing-safe stock search, alt text in the target language
  | "render_email"       // WS5 template, placeholders unchanged
  | "send_email"         // throttled, List-Unsubscribe headers, per-recipient idempotency
  | "publish_blog"       // AIBAN public article page
  | "publish_wordpress"  // optional, retries, never blocks email
  | "welcome_email"      // new_subscriber chain
  | "confirm_email"      // list_imported chain (consent)
  | "notify_owner"       // email + dashboard activity item to the owner
  | "report"             // run stats summary (stats are written to the automation by the executor)
  | "owner_report";      // weekly email to the owner (templates/ownerWeeklyReport.html)

type Step = { type: StepType; params?: Record<string, unknown>; optional?: boolean; retry?: { attempts: number; backoffMs: number } };
```

`optional: true` means a failure marks the run `partial` and the chain continues (default for `pick_image`, `publish_blog`, `publish_wordpress`, `notify_owner`, `report`). A non-optional failure stops the chain and marks the run `failed`. A run that sent to some readers before failing ends `partial`, never `failed`.

Default retry: 3 attempts, backoff 2s, 8s, 32s with jitter. `send_email`, `welcome_email` and `publish_wordpress` are not retried as a whole: they retry per reader (3 tries, longer waits when the mail provider throttles) or per post. LLM calls also retry inside `helper/LLM.ts` across providers.

How the content steps work today:
- `rewrite_voice` records the voice inputs; the rewriting itself happens inside `translate`, one LLM call per language (voice, ideal reader, COPY_RULES and the language in one prompt). One article is chosen per run and shared by every language group.
- `pick_image` resolves each English image query once per run for all languages (Pexels if `PEXELS_API_KEY` is set, else Burst by Shopify), no LLM call. Placeholders without a photo are removed.
- `send_email` adds `List-Unsubscribe` (and `List-Unsubscribe-Post` once `MAIL_ONE_CLICK_UNSUBSCRIBE=1`), `List-Id` and `X-AIBAN-Run` headers. Throttle: `MAIL_SEND_CONCURRENCY` (5) and `MAIL_SEND_DELAY_MS` (1000) between batches; after 3 throttled batches the step stops and reports how many readers were left.
- `confirm_email` is delegated: the import endpoint (WS7) sends the double opt-in emails. The step records the count.
- `notify_owner` messages are rate limited to one per kind per automation per day (new subscriber notices are not limited).

## 4. Recipes (presets)

Each recipe is a template that becomes an Automation when the owner flips it on. Defaults come from what onboarding already stored on the config and news source (`scheduleTime`, `personality`, `community`, `lead`, `includeImages`, sender fields, webhook groups).

| recipeId | Trigger | Chain | Defaults |
|---|---|---|---|
| `daily_issue` | schedule, cron from the source `scheduleTime` or `0 8 * * *` | fetch_candidates, select_best, extract_article, rewrite_voice, translate, pick_image, render_email, send_email, publish_blog, publish_wordpress, report | images from `includeImages`; WordPress only if a webhook group has credentials |
| `weekly_digest` | schedule `0 8 * * 1` | same, `maxItemsPerRun: 3` | off by default |
| `new_post_alert` | new_article, every 60 min | same as daily_issue, 1 item | off by default; recommended when the source is the owner's own blog |
| `welcome_new_subscriber` | new_subscriber | welcome_email, notify_owner | on by default |
| `import_contacts` | list_imported | confirm_email, notify_owner | on by default; never sends a newsletter to imported contacts before they confirm |
| `write_about_this` | manual write_about_url / write_about_text | extract_article, rewrite_voice, translate, pick_image, render_email, send_email, publish_blog | used by "Send now" |
| `owner_nudges` | milestone (all kinds) | notify_owner | on by default |
| `owner_weekly_report` | schedule `0 9 * * 1` in the owner's tz (`config.timezone` when WS7 adds it, else UTC) | owner_report | on by default once the tenant has a source; reports real numbers only (issues sent, readers by language, next scheduled issues). New subscribers and clicks are left out until the engine can read them. |

User-facing names and one-line descriptions for these recipes are written by WS4 with the copy rules. Suggested names: "Daily issue from your source", "Weekly digest", "Email when you publish", "Welcome new subscribers", "Confirm imported contacts", "Write about a link", "Tips and alerts for you".

## 5. Runs, idempotency and dedupe

```ts
type RunRecord = {
  id: string;                    // "run_" + 16 hex
  automationId: string; configuratorId: string;
  trigger: Trigger["type"]; triggerKey: string;  // see below
  status: "queued" | "running" | "ok" | "partial" | "failed" | "skipped";
  dryRun: boolean;
  startedAt: string; finishedAt?: string; durationMs?: number;
  steps: Array<{ type: StepType; status: "pending" | "running" | "ok" | "failed" | "skipped"; attempts: number;
                 startedAt?: string; finishedAt?: string; error?: string; output?: Record<string, unknown> }>;
  items: Array<{ url: string; contentHash: string; title?: string }>;  // what this run sent
  counts: { recipients: number; sent: number; failed: number; skippedDuplicate: number; languages: string[] };
  cost: { llmCalls: number; inputTokens: number; outputTokens: number; usd: number; cachedCalls: number };
  skipReason?: "duplicate_run" | "no_new_items" | "no_subscribers" | "plan_limit" | "disabled" | "quiet_hours" | "source_inactive";
  previewHtml?: string;          // dry runs only, first language, max 200 KB
  error?: string;                // short, user-safe, no secrets
};
```

Storage: Firestore `automationRuns/{runId}`, plus `automationLocks/{triggerKey}` and `automationLedger/{configuratorId}__{sourceKey}__{contentHash}`.

Rules:
1. Run key. `triggerKey = sha256(automationId + trigger.type + bucket)`. Bucket: the scheduled minute in local wall time (`<tz> YYYY-MM-DDTHH:MM`, or the UTC minute for UTC) for schedule, `poll:<minute>` for new_article, `sub:<email>:<source>:<pending|confirmed>` for new_subscriber, the import id for list_imported, and the client `requestId` (or the run id) for manual. The executor creates `automationLocks/run_{triggerKey}` create-only; if it exists the run is `skipped / duplicate_run` and not stored. This replaced the in-memory 55-minute rate limit and survives restarts. On the DST fall-back day the repeated local hour has the same key, so it runs once. On the spring-forward day a time that does not exist locally does not run.
2. Stale keys. If the lock's run is still `running` more than 2 hours after it started and never reached a send step (the process died), a new trigger with the same key takes it over. If the store cannot be reached, the run ends `failed` instead of risking a double send.
3. Article ledger. Before selection, candidates whose canonical URL hash is in the ledger for that source are dropped; after extraction, items whose content hash (sha256 of normalized readable text, first 20 000 chars) is in the ledger are dropped too (same story at a new URL). A run with only known items ends `skipped / no_new_items`. Ledger entries are written right after the first successful send of a run, so a crash, restart or rate-limit stop later in the send loop can never cause a full resend (readers not reached yet in that run miss that issue; this is the deliberate trade-off).
4. Recipient idempotency. Within a run, each reader is sent at most once (`sha256(runId + email)` in run state); a reader who appears in two language groups gets one email. Across runs the ledger stops repeats.
5. Concurrency. Content chains on the same source never overlap (schedule, send now and new-article polls share one queue slot per `tenant + source`), other automations run one at a time per automation id. At most 2 concurrent runs per tenant and 4 globally (`AUTOMATION_MAX_PER_TENANT`, `AUTOMATION_MAX_GLOBAL`). Extra runs wait; they are never dropped.
6. Quiet hours. A schedule tick inside quiet hours waits in memory until the window ends, then re-reads the automation (if it was turned off meanwhile, nothing is sent). A restart during the wait drops that run. New-article polls simply do not run during quiet hours.
7. Cost. Every LLM call through `helper/LLM.ts` reports tokens and estimated USD; the executor adds them to `run.cost` and to `automation.stats.costUsd`.
7b. Daily mailbox budget. Each mailbox has a rolling 24 hour limit (engine/mail/budget.ts; 450 for gmail.com, 1,800 otherwise, 5% reserved for transactional mail). When `send_email` reaches it, the readers not reached yet are stored in `mailDeferred` (one document per run, language and 2,500 readers) and the run ends with `counts.deferred`. Every 10 minutes the engine resumes units whose wait is over with the chain `render_email, send_email, report`, the same issue and subject, minus readers who unsubscribed meanwhile. A unit is retried at most 5 times. The owner gets the `send_deferred` notice (once a day). Provider throttling (SMTP 421 or Gmail API rate limits) holds readers back for 30 minutes the same way.
8. Dry run. `dryRun: true` (per run or per automation) runs every step up to `render_email`, stores `previewHtml`, and marks send and publish steps `skipped`. No ledger entries are written. The env flag `AUTOMATION_FORCE_DRY_RUN=1` (or `APP_ENV=test`) forces dry runs for the whole process (staging, local testing).
9. Milestones. `run_failed` after any failed run, `selector_failed` after two runs in a row found no articles, `bounce_spike` when more than 5% of at least 20 sends failed, `first_send` once per tenant for stored automations only (legacy and "send now" runs belong to tenants that may have sent for years, so WS7 should emit `first_send` itself when it knows it is the first). `first_subscriber`, `subscribers_10`, `subscribers_100` need a subscriber count and are emitted by WS7.

## 6. Migration of current schedules

Current customers keep their schedules unchanged:
- `scheduleAllNewsSources(config, configuratorId, baseUrl)` keeps its signature (main.ts still calls it in production). It registers the tenant; the engine derives one `legacy_<newsSourceId>` automation per source with trigger `schedule`, `cron = newsSource.scheduleTime`, tz UTC, recipe `daily_issue`, default subject mode (`title`, the issue title in each reader's language). Their lastRunAt, lastRunStatus and lastRunId come from `automationStatus/{automationId}`, which the engine writes after each real run.
- The scheduler re-reads the config every `AUTOMATION_REFRESH_MS` (60 s) per tenant, in parallel batches of 5 (one config read and one automations query per tenant instead of one poll per source), so schedule edits, deactivation and deletion take effect as before. Tenants created after boot are picked up when WS7 calls `getEngine().registerTenant(id)` on signup (requested), or at the next restart (same as before).
- `processSubscribersForNewsSource` (trigger endpoint) and `processCustomContentForSubscribers` (send custom content) now run through the engine as manual runs; the first returns the RunRecord so the endpoint can answer `skipped / no_new_items`.
- Plan limits are checked at run time with `checkActionLimit("newsSources", ...)`, as before.
- When WS7 persists stored automations, a stored automation with the same `newsSourceIds` and a schedule trigger replaces the legacy one, so a source never runs twice.

## 7. What the UI can rely on (WS4, WS6)

- List: `GET /automations?configuratorId=` returns `Automation[]` including legacy ones (with `source: "legacy"`, editable only through the news source settings until migrated).
- Recipes: `GET /automations/recipes` returns `{ id, trigger, steps, defaults }[]` computed for the tenant.
- Runs: `GET /automations/:id/runs?limit=20` returns `RunRecord[]` newest first, without `previewHtml` unless `?preview=1`.
- Manual: `POST /automations/run` body `{ configuratorId, newsSourceId, mode, url?, text?, dryRun?, requestId }` returns `{ runId }`.
- Live progress: Socket.IO event `automation:run` with the RunRecord summary on each step change.
Exact paths, auth and errors are WS7's call and go in API_CONTRACT.md; requested in `requests/7.md`.

Engine exports for WS7 (`engine/automations/mod.ts`): `getEngine()`, `listAutomations`, `listRecipes`, `saveAutomation`, `listRuns`, `getRun`, `runManual`, `emitAutomationEvent`, `onRunUpdate`.

Status words for the UI: queued "Waiting", running "Running", ok "Sent", partial "Sent with warnings", failed "Failed", skipped "Nothing new" (or the skip reason in plain words).
