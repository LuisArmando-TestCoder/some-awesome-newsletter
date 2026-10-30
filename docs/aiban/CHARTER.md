# AIBAN overhaul charter (shared by all autonomous workstreams)

Location: `some-awesome-newsletter/docs/aiban/` (a copy lives in `ai-newsletter-translated/docs/aiban/`). Read this whole file, `COPY_RULES.md`, and `ux-diagnostic-howwell-2025-08.txt` before changing anything.

## 1. The two codebases
- Frontend: `some-awesome-newsletter` (SvelteKit 2, Svelte 5, Vite 7, SCSS, no payment provider, 37-language i18n in `src/lib/i18n`). Brand name: AIBAN (site aibanewsletter.club).
- Backend: `ai-newsletter-translated` (Deno + Express + Socket.IO, Firestore via REST, Typesense, OpenAI, Puppeteer/cheerio scraping, nodemailer/Gmail app password sending, cron scheduling, no payment provider, WordPress posting). Entry `main.ts`.
- Version control is disabled in both (`.git_disabled`). Pre-overhaul snapshots are in each folder's `_aiban_backups/`. Do not rename `.git_disabled`.
- Deleting files is blocked. To retire a file, `mv` it into `_deprecated/` inside the same project, keeping its relative path, and note it in your log.
- Never print, copy, commit or move secrets (`.env`, `serviceAccountKey.json`, `typesensecloudserviceaccount.json`, `secrets/`). Refer to them by env var name only.
- `generated_templates/` and `sales_letters/` are generated data. Read only.
- `deno` is not installed on the computer. Install it in the computer shell if the network allows (`curl -fsSL https://deno.land/install.sh | sh`), otherwise stage the backend into the cloud workspace for type checks and stage results back. Frontend: `npm run check` and `npm run build` work on the computer (Node 22).

## 2. Working product thesis (Workstream 1 refines it in STRATEGY.md; everyone else builds toward it)
AIBAN turns content a business already has (its website, blog, chosen news sites, or a text it pastes) into a recurring newsletter that is rewritten in the owner's voice and delivered to every subscriber in that subscriber's own language, sent from the owner's own email address, with signup widgets, an auto-generated blog, and analytics.

The value promise in one line: **one input, then it runs by itself.** The customer should only ever have to pull a few simple triggers. Each trigger fires a chain of valuable actions automatically.

Trigger -> action chain model (to formalize as product objects called "Automations" or "Recipes"; Workstream 1 decides the name):
- New article detected on a source -> pick the most relevant piece for the ideal reader -> rewrite in brand voice -> translate per subscriber language -> pick image -> email each language group -> publish to AIBAN blog and optionally WordPress -> report opens and clicks.
- Schedule tick (daily/weekly) -> same chain with a digest of the best items.
- New subscriber -> language detected (geo IP, browser) -> welcome email in their language -> add to segment -> notify owner.
- Contact list uploaded (CSV, Excel, pasted text) -> AI cleans and dedupes -> language guessed -> consent/confirmation email -> live subscribers.
- "Send now" or "Write about this" (owner pastes a URL or text) -> one-off issue through the same chain.
- Milestones (first 10 subscribers, first send, a bounce spike, failed selector) -> proactive nudge with a one-click fix.
Activation target: a new owner sends their first real issue to at least one real subscriber within 10 minutes of landing, with a live preview of the email before they commit.

Benchmarks you may study and borrow patterns from (do not copy branding or text): beehiiv, Substack, Kit (ConvertKit), Mailchimp, Buttondown, Ghost, Paragraph, rasa.io, Letterdrop, Feedly AI, Zapier and Make (trigger/action UX), Linear and Vercel (dashboard polish), Stripe and Loops (onboarding checklists), Duolingo/Notion (progressive tutorials).

## 3. File ownership (strict, prevents parallel workstreams from overwriting each other)
Only the owner edits a file. If you need a change in someone else's file, append a request to `docs/aiban/requests/<owner-ws-number>.md` (format: date, requesting WS, file, exact change, why) and work around it. Owners check their request file at the start and before they finish. New files you create inside your own area are yours.

| WS | Name | Owns |
|---|---|---|
| 1 | Strategy + design system | `docs/aiban/STRATEGY.md`, `docs/aiban/DESIGN_SYSTEM.md`, frontend `src/styles/**`, `src/routes/styles/**`, `src/lib/styles/**`, `src/lib/anim/**`, `src/lib/ui/components/**`, `src/lib/ui/molecules/**`, `src/components/ThemeChanger/**`, `src/components/systems/{buttons,inputs,selectors,texts,loading,stats}/**`, `src/components/{Modal,LoadingWheel,Notification,SVG,Container,SoftTitle,SmoothScrollWrapper}/**`, `src/routes/+layout.svelte`, `src/app.html`, `package.json` (frontend deps), `static/fonts/**` |
| 2 | Landing, marketing, blog | `src/routes/+page.svelte`, `src/routes/{about,pricing,careers,legal,help,demo,articles,article}/**`, new `src/routes/blog/**` or `src/routes/a/**` article pages, `src/components/{demo,articles,NewsCard,ArticleModal,ArticleCardSkeleton,SearchBar,Pagination,Header,MenuHalf,ShaderToy,X}/**`, `src/lib/ui/organisms/{Header,Faq,HelpFaqs,HelpForm,Pricing,LanguagePicker}.svelte`, `src/components/faq.ts`, `src/lib/content/**`, `src/lib/i18n/locales/en.ts` and `translations.ts` |
| 3 | Onboarding + tutorial | `src/components/systems/steps/StepsTowardsPublish/{StepsTowardsPublish,MainSteps}.svelte`, `.../stages/{A_Welcome1,B_Welcome2,C_Welcome3,D_Lead,E_NewsSource}.svelte`, `.../stages/NewFlow/**`, `src/components/systems/steps/{Steps.svelte,TransitionSteps/**}`, `src/components/systems/wrappers/**`, `src/routes/{signup,login,oauth,test-checklist}/**`, `src/lib/ui/organisms/AuthForm.svelte`, new `src/lib/tutorial/**` (guided tour, checklist, contextual help engine), `src/lib/i18n/locales-newflow/en.ts`, `newflow-translations.ts` |
| 4 | Dashboard | `src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/**`, `src/routes/dashboard/**`, `src/lib/ui/organisms/{Sidebar,SideLink,BillingForm}.svelte`, new `src/lib/dashboard/**` (automations UI, explainers, empty states, activity feed), `src/lib/i18n/locales-dashboard/en.ts`, `locales-billing-form/en.ts`, `dashboard-translations.ts`, `billing-form-translations.ts` |
| 5 | Subscriber experience + emails | `src/routes/{subscribe,subscribe-widget,confirm-subscription}/**`, `src/components/systems/steps/StepsTowardsSubscribe/**`, `src/components/systems/widgets/**`, `src/lib/i18n/locales-subscribe/**` (English source), `subscribe-translations.ts`, backend `templates/**` (all HTML emails) |
| 6 | Frontend business logic | `src/components/systems/requests/**`, `src/components/systems/useConfigurator.ts`, `src/components/systems/helpers/**`, `src/components/GlobalData/**`, `src/components/SocketClient.svelte`, `src/components/{types.ts,scroll.ts,audioInteractions.ts,cronToNaturalLanguage.ts}`, `src/lib/{api,config,stores,utils}/**`, `src/lib/index.ts`, `src/routes/api/**`, `src/routes/**/+page.server.*` and `+server.*` and `+page.ts` (except WS3's auth routes), `src/hooks*.ts`, `svelte.config.js`, `vite.config.ts`, `tsconfig.json`, `.eslintrc.cjs` |
| 7 | Backend API, data, auth, billing, security | backend `main.ts`, `API/**`, `db/**`, `socket/**`, `types.ts`, `helper/**` except the engine helpers listed for WS8, `deno.json`, `Dockerfile`, `docs/**` except `docs/aiban/**`, `.gitignore`, new `tests/api/**` |
| 8 | Backend content engine + automations | `engine/**`, `prompts/**`, `scripts/**`, `walkRead.ts`, `helper/{LLM,callChatGPT4,fetchScrape,simplifyDOMForLookUp,getAntiAntiScrapeFetchOptionsBrowserHeaders,postToWordPress,scheduleTasks,cronInterval,rateLimiter,sendEmail,getMailConfigPack,getSmtpConfig,typesense-client}.ts`, new `engine/automations/**`, new `tests/engine/**` |
| 9 | i18n propagation + copy audit (starts later) | all non-English locale files, cross-app copy audit; may edit English strings anywhere for copy-rule violations only |
| 10 | Integration QA + release readiness (starts later) | may fix build/type/runtime breakages anywhere after logging them; owns `docs/aiban/RELEASE_READINESS.md` |

Files not named above: `src/components/store.ts` belongs to WS6. `src/routes/{test-styles,tags-test}/**` belong to WS1 (turn test-styles into the living style guide). Onboarding currently runs inside `/dashboard` through `MainSteps.svelte`; WS3 owns that flow and may add a dedicated `src/routes/start/**` entry route that the landing page CTAs (WS2) point to. For any other unlisted file, append a request to `requests/10.md` and leave it alone.

Shared contracts that cross WS boundaries:
- API contract between frontend (WS6) and backend (WS7/WS8): record every endpoint you add or change in `docs/aiban/API_CONTRACT.md` (method, path, auth, request, response, errors). Keep existing endpoints backward compatible; add new ones rather than silently changing shapes.
- Automations data model: WS8 defines it in `docs/aiban/AUTOMATIONS.md` early (first hour), WS7 exposes CRUD endpoints, WS6 writes the request functions, WS4 builds the UI. Until the doc exists, WS4/WS6 code against the draft shape in section 5 below.

## 4. Design token contract (WS1 sets the values; everyone else uses only these names)
WS1 writes `src/styles/tokens.scss` (imported once globally) in its first 30 minutes. Until it lands, use these variable names with sensible fallbacks, e.g. `var(--surface-1, #fff)`. No raw hex colors, px font sizes, or ad hoc shadows in component styles.
- Surfaces: `--surface-0` (page), `--surface-1` (card), `--surface-2` (raised/hover), `--surface-inverse`
- Text: `--text-1` (primary), `--text-2` (secondary), `--text-3` (hint/placeholder), `--text-inverse`, `--text-link`
- Brand/state: `--accent`, `--accent-hover`, `--accent-contrast`, `--accent-soft`, `--success`, `--warning`, `--danger`, `--info` (each with a `-soft` variant)
- Lines: `--border-1`, `--border-2`, `--focus-ring`
- Type: `--font-display`, `--font-body`, `--font-mono`; sizes `--fs-xs, --fs-sm, --fs-md, --fs-lg, --fs-xl, --fs-2xl, --fs-3xl, --fs-4xl` (fluid clamp); `--lh-tight, --lh-normal`; weights `--fw-regular, --fw-medium, --fw-semibold, --fw-bold`
- Space: `--space-1` 4px through `--space-10` (4, 8, 12, 16, 24, 32, 48, 64, 96, 128). The old `--space-xs..xxl` names stay as aliases.
- Radius: `--radius-sm, --radius-md, --radius-lg, --radius-xl, --radius-full`
- Elevation: `--shadow-1, --shadow-2, --shadow-3`
- Motion: `--ease-out, --ease-in-out, --dur-fast (120ms), --dur-base (200ms), --dur-slow (320ms)`. Respect `prefers-reduced-motion`.
- Layout: `--container-sm/md/lg`, `--header-h`, `--sidebar-w`
- Themes via `[data-theme="dark"]` on `<html>` plus `prefers-color-scheme` default. Existing `--c-*` names stay as aliases mapped to the new tokens so nothing breaks.

UI hierarchy rules from the UX diagnostic: one primary, one secondary and one tertiary (text link) button style used everywhere; input text larger and darker than placeholder/hint; instructions never in italics; highlight words with weight, not with color changes inside a sentence; no per-word text animations on functional steps; animation only when it carries meaning; show the active section in navigation; settings like theme and density grouped in one small settings menu with labels.

## 5. Draft Automation shape (WS8 may refine in AUTOMATIONS.md)
```ts
type Automation = {
  id: string; configuratorId: string; name: string; enabled: boolean;
  trigger: { type: 'schedule' | 'new_article' | 'new_subscriber' | 'list_imported' | 'manual' | 'milestone'; params: Record<string, unknown> };
  steps: Array<{ type: 'select_best' | 'rewrite_voice' | 'translate' | 'pick_image' | 'send_email' | 'publish_blog' | 'publish_wordpress' | 'welcome_email' | 'notify_owner' | 'report'; params?: Record<string, unknown> }>;
  newsSourceIds?: string[]; lastRunAt?: string; lastRunStatus?: 'ok' | 'partial' | 'failed'; stats?: { runs: number; sent: number; opens?: number; clicks?: number };
}
```
Presets ship as templates the user turns on with one switch ("Recipes"), with sensible defaults derived from what onboarding already collected.

## 6. How every workstream operates
1. Read the charter, copy rules, diagnostic, STRATEGY.md and DESIGN_SYSTEM.md if they exist, and your request file.
2. Investigate first: use subagents in parallel for (a) a full audit of every file you own (bugs, dead code, a11y, perf, security, copy), (b) benchmarking 3 to 5 products listed above on the same surface, (c) mapping data flow across the frontend/backend boundary for your area. Write findings to `docs/aiban/ws<N>-audit.md`.
3. Plan in `docs/aiban/ws<N>-plan.md`, then implement. Edit files in place with small, targeted read-modify-write edits made immediately before writing (other workstreams are editing nearby files). Never rewrite a file from memory of an earlier read.
4. Keep the app runnable. After each meaningful batch run `npm run check` (frontend) or a deno type check (backend) and fix what you broke. Do not leave the build red when you finish.
5. Log everything in `docs/aiban/ws<N>-log.md`: files changed, files created, files moved to `_deprecated/`, decisions, open questions for the owner, and requests sent to other workstreams.
6. Finish with `docs/aiban/ws<N>-summary.md`: what changed, what is left, risks, and how to verify. Keep it short and follow the copy rules.
7. Decisions that cannot be undone and could reasonably go either way (deleting user data, changing database schema destructively, changing pricing, switching email providers, rotating keys) are not made autonomously: prepare them and write them under "Decisions for Luis" in your summary.
