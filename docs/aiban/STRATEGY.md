# AIBAN strategy

Owner: WS1. Version 1, 2026-10-30. Everyone builds toward this. If code and this file disagree, raise it in `requests/1.md`.

Evidence used: the code in both repos, backend `sales_letters/` and `generated_templates/` (read only), the UX diagnostic, and a benchmark of beehiiv, Kit, Mailchimp, Buttondown, Ghost, Substack, rasa.io, Zapier, Make, Loops, Stripe, Linear and Vercel (October 2026). Facts marked "today" describe the current code.

## 1. Who pays

The only acquisition channel in the data is peer outreach inside BNI. `sales_letters/` holds 1,436 AIBAN letters to BNI members, signed by a BNI member, offering the tool "free for BNI members" with a free trial. The recipients are:

| Group | Letters |
|---|---|
| Advertising and marketing (web design, digital marketing) | 647 |
| Computer and programming (IT, app and web developers) | 314 |
| Real estate | 141 |
| Legal and accounting | 115 |
| Retail | 59 |
| Training and coaching | 48 |

They are spread over many countries (US, India, UK, Italy, Germany, Canada, France, Australia, Japan, Mexico and others). `generated_templates/` is a different product's outreach and is not evidence about AIBAN customers.

**Primary customer:** the owner of a small service business (agency, freelancer, IT shop, realtor, lawyer, accountant, coach). Their sales come from referrals and relationships. They have a website, often a blog that nobody reads, and clients or prospects who speak more than one language. They have no time to write, and they are not marketers.

**Secondary customer:** marketing agencies and web designers who could run AIBAN for several clients. This is the largest group in the outreach data. It is an expansion path, not the first experience.

**Job to be done:** "Keep me in front of my clients and referral partners every week, in their language, sounding like me, without me writing anything."

What they pay for: being remembered, looking professional in every language, and not spending time. What they fear: something embarrassing going out under their name, spam complaints, and a tool that needs babysitting.

## 2. The value promise

One input, then it runs by itself. The owner gives AIBAN one thing (their website, or a site they trust), sees a real issue written in their voice and in their readers' languages, and turns it on. After that, AIBAN does the work and tells them what happened.

Two promises nobody else in the benchmark makes, so the product must show them early and often:
1. Each subscriber gets the issue in their own language, automatically. beehiiv, Kit and Ghost make you write separate versions.
2. The writing is done for you, in your voice, from content you already have.

## 3. Automations: the trigger to action model

**Name: Automations.** It is the word beehiiv, Mailchimp, Kit and Customer.io (renamed in July 2026) use, and the one non-technical owners expect. "Recipes" is being retired elsewhere and "Workflows" reads as technical. Inside the app, each automation is written as a sentence that starts with "When".

An automation has one trigger and a fixed chain of steps. Owners do not build chains. They turn a preset on, and adjust at most two or three plain settings. Data shape: CHARTER section 5, refined by WS8 in `AUTOMATIONS.md`.

### Preset catalog

Ids match WS8's `recipeId` values in `AUTOMATIONS.md` section 4. In code a preset is a `Recipe`; in the UI it is always an "automation".

| recipeId | Sentence shown to the owner | Trigger | Default | Exists today |
|---|---|---|---|---|
| `daily_issue` | When it is Monday at 9:00, send your readers the best new article from your sources, in their language. | schedule, from the onboarding answer | On after the first send | Yes (cron per source) |
| `weekly_digest` | Every Monday, send your readers the 3 best articles of the week, in their language. | schedule | Off | No |
| `new_post_alert` | When you publish a new article on your site, send it to your readers in their language. | new_article | Off. Offered after the first send when the source is the owner's own site | No. Needs the sent-article ledger (WS8) |
| `welcome_new_subscriber` | When someone subscribes, send them a welcome email in their language and tell you. | new_subscriber | On | Partly (confirmation only) |
| `import_contacts` | When you upload a contact list, clean it, guess each language and ask each contact to confirm. | list_imported | On (runs when used) | Partly (AI import, no confirmation email) |
| `write_about_this` | When you paste a link or text, write and send an issue about it. | manual | Always available as the "Write about this" button | Partly (`send-custom-content`) |
| `owner_nudges` | When something needs you (a failed send, a broken source, your first 10 subscribers), tell you with a one-click fix. | milestone | On | No |
| `owner_weekly_report` | Every Monday, email you what was sent, who joined and what readers clicked. | schedule | On | No. Requested from WS8 |

WordPress posting is a step inside `daily_issue` and runs only when WordPress is connected, so it is a setting on the automation, not a separate card.

Rules:
- Every preset works with zero configuration from onboarding answers. Settings are optional and each says its default.
- The schedule is shown in words in the owner's time zone ("Every Monday at 9:00"), never as cron, and stored in UTC.
- Each run is recorded with a plain status: Sent, Skipped (nothing new), Waiting, Failed. A failed run says why and offers "Try again".
- One article is chosen per run and shared by every language group. Today each language scrapes on its own, so groups can get different articles (WS8).

### Onboarding answers that feed the presets

| Question (plain wording) | Feeds | If skipped |
|---|---|---|
| What is your website? | First source, voice (`personality`), topic (`community`), logo and brand color guess, sender name guess | Required. It is the one input. |
| Which languages do your readers speak? | Preview languages; default subscriber language | Your website's language |
| How often should we send? | `scheduled_issue` schedule | Weekly, Monday 9:00 your time |
| Where should readers go when they click? | `lead` link | Your website |
| Who is your ideal reader? (one line) | select_best and rewrite prompts | Inferred from your website |
| (Not asked in onboarding) | sender settings | We send from AIBAN's address with your sender name, and replies go to you. Connecting your own address is a later step in Settings. |

Everything except the website is optional and pre-filled. Technical steps (CSS selector, cron, app password) never appear in onboarding. The selector is generated silently and fixed through the "Source needs attention" nudge if it breaks.

### Activation

- **Aha moment:** the owner sees their first issue, written from their own site, in their voice, in two languages side by side. Target: under 2 minutes after entering the website.
- **Activation event:** `first_issue_delivered`, the first issue delivered to at least one confirmed subscriber who is not the owner, within 7 days of signup. Stretch target: within 10 minutes of landing for owners who already have a contact. Until then, "Send me a test" counts as progress, not activation.
- **Early indicators:** time to first preview, and first test issue received by the owner.
- Measure time to activation ourselves. There is no public benchmark.

### North-star metric

**Weekly readers reached:** unique confirmed subscribers who received at least one issue in the last 7 days, across all customers. It grows only when owners stay active, add subscribers and keep automations on. Guard metrics: clicks per 100 delivered (quality), failed runs per week (reliability), unsubscribes per 100 delivered.

Today the backend records clicks but not deliveries, opens or bounces. A per-send log is required (WS7, WS8).

### Retention loops
1. Weekly report email to the owner, on by default: issues sent, new subscribers by language, top clicked links, what is scheduled next.
2. Proactive nudges with one-click fixes: source not found or selector broken, email login failing, nothing new to send for two weeks, bounce spike.
3. Milestones: first issue sent, first 10, 100 and 1,000 subscribers, first reader in a new language, 10 issues sent. Shown on Home and in the weekly report.
4. "Your next issue" preview on Home with "Send now" and "Skip this one".

### Expansion loops
1. Languages: every new subscriber language is a visible win ("Your issue now goes out in 4 languages").
2. Sources: add a second source (a news site the owner trusts) to fill weeks when their own site is quiet. Plan limits apply here.
3. Blog: every issue becomes a public article page with its own URL (SEO and sharing). Owner can brand it.
4. Widget: a signup form for the owner's website, with the language picked automatically.
5. Referrals: every issue footer and blog page carries a small "Sent with AIBAN" link; BNI members invite their chapter. Agencies can manage several clients (future).
6. Plan upgrades are prompted by real limits (sources, subscribers), never by hiding the core promise.

## 4. Information architecture

Left sidebar on desktop, bottom bar on mobile. The active item is always marked (diagnostic h). No accordions for settings (diagnostic k, v): settings use tabs or sub-pages. Sentence case everywhere.

| Nav label | Replaces | What is there |
|---|---|---|
| Home | Dashboard | Getting started checklist until activation, then: next issue preview, latest run, weekly numbers, nudges, milestones. "Write about this" button. |
| Automations | (new) | Preset cards with switch, sentence, last run, next run, history. |
| Sources | News sources | "Where your content comes from." Your website first, then other sites. Each says what it is used for. Ideal reader and voice live here as "Your ideal reader" and "Writing voice". |
| Subscribers | Users | Tabs: List, Add or import, Signup form (widget). |
| Reports | Reports | Tabs: Overview, Issues sent, Clicks, Languages. Charts separate from lists. |
| Blog | Newspaper | Your public archive, branding, link to view it. |
| Settings | Profile, Secrets/Developer, Billing | Tabs: Brand (logo, colors, name), Sending email (sender, login, email signature), Plan and billing, Integrations (WordPress, webhooks), Developer (API keys, export). |
| Display settings menu (user menu) | dark mode circle, "auto collapse" | Theme (Light, Dark, Match system), Density (Comfortable, Compact), Reduce motion. |
| Help | | Help center, contact, replay the tour. |

Renames that fix the diagnostic:
- "News sources" becomes **Sources**, explained as "Where your content comes from".
- "Buyer persona" becomes **Your ideal reader**.
- "Auto collapse" is removed. There are no collapsing settings panels.
- "Signature HTML" becomes **Email signature**, with a preview of a real email footer.
- "Users" becomes **Subscribers**. "Newspaper" becomes **Blog**. "Secrets" becomes **Developer** inside Settings. "Profile" becomes **Brand** and **Sending email**.
- "Advanced" is not used for voice or frequency (diagnostic t). Advanced holds only the CSS selector and raw schedule.

## 5. Implications per workstream

### WS2 Landing, marketing, blog
- Hero states the job in one sentence and shows a real two-language issue preview. Primary CTA "Try it with your website" goes to WS3's `/start` with the URL field on the landing page itself.
- Audience copy speaks to service businesses (agencies, consultants, realtors, lawyers, accountants, coaches). Use their situation, not invented testimonials or numbers.
- Pricing page shows plans from `src/lib/config/plans.config.ts` only. Fix the broken checkout call (it posts the wrong shape, see WS6). Translation and voice are the differentiators to name.
- Blog articles get real pages (no pop-ups, diagnostic y), a hero with blog name and topic (x), a working search with a button (x.1), and clear hierarchy (featured, then latest).
- Use DESIGN_SYSTEM.md: Lora headlines, Inter UI, 68ch reading column.

### WS3 Onboarding and tutorial
- New order: website, then preview (aha), then languages and frequency (pre-filled), then "Send me a test", then add first subscriber or import, then turn on. Plan choice last.
- Remove the CSS selector step and cron picker from onboarding. Stop calling `createNewsSource` twice (today Step08 likely creates a duplicate).
- Validate only on Continue (diagnostic d). Instructions in plain, non-italic text; hints smaller and lighter than input text (e).
- No per-word animations. Use the WS1 primitives.
- Getting-started checklist (5 items: website, preview, test send, first subscriber, turn on) persists on Home until activation. Contextual help engine explains each section the first time it opens; "Replay the tour" in Help.
- Track `onboarding_started`, `preview_shown`, `test_sent`, `first_issue_delivered` with timestamps.

### WS4 Dashboard
- Implement the IA in section 4: sidebar labels, active state, mobile bottom bar, Settings tabs. Remove `AutoCollapseToggle` and `SlotAutoCollapseToggle` usages and the accordion pattern.
- Mount `$lib/ui/molecules/SettingsMenu.svelte` (WS1) in the sidebar footer or user menu.
- Build Home (checklist, next issue, nudges, milestones, numbers) and Automations (preset cards, switch, history timeline, Try again) in `src/lib/dashboard/**`.
- Every optional field states its default. Every image upload uses the WS1 FileUpload with format, size, ratio and where it appears.
- Fix: "include images" and "public" switches in `UpdateNewsSourceForm` never save (wrong event). Log out link needs an href or a button.

### WS5 Subscriber experience and emails
- Send the chosen language with the subscription (today `/subscribe` drops it). Detect language from the browser, then `/geo`, and let the reader change it.
- Welcome email in the reader's language after confirmation. Notify the owner of new subscribers (respecting a setting).
- Emails: owner's brand color and logo, readable in dark mail clients, footer with unsubscribe and a small "Sent with AIBAN" link.
- New template: the weekly owner report.

### WS6 Frontend business logic
- Request functions for Automations CRUD, run history, owner report settings and milestones once WS7 publishes them in `API_CONTRACT.md`.
- No payment provider (decision by Luis, 2026-10-30): pricing shows plans and "Write to us"; admins change plans by hand.
- Emit the activation events listed under WS3.

### WS7 Backend API, data, billing, security
- Per-send log (issue id, source, language, subscriber count, status, error) and delivery counters; this powers the north star, Reports and run history.
- Schedule new or re-enabled sources without a server restart. `getMailConfigPack` must never `Deno.exit` for one customer's bad config.
- Endpoints: automations CRUD and runs, owner report settings, milestones feed, onboarding events. Keep old endpoints working.

### WS8 Content engine and automations
- Define `AUTOMATIONS.md` using the preset ids above.
- Pick one article per run and translate it for every language group (today each group scrapes separately).
- Record sent article URLs per source to avoid repeats and to power the `new_article` trigger.
- Weekly owner report job and milestone detection. Prompts must follow COPY_RULES (no em dashes, no banned words) in every language.

### WS9 and WS10
- WS9: use the renames in section 4 in every locale. "Automations", "Sources", "Subscribers", "Your ideal reader", "Email signature".
- WS10: `npm run build` cannot run in the Linux shell (macOS node_modules, no network). Run it on the Mac.

## 6. Decisions recorded

Relayed by WS3 and WS5 in `requests/1.md` as Luis's decisions on 2026-10-30. WS1 did not hear them directly.
- Activation is the first issue delivered to a confirmed subscriber who is not the owner, within 7 days of signup.
- The Gmail app password is not part of onboarding. The default sender is AIBAN's address with the owner's sender name.
- Contacts typed in by hand get a personal invitation and are deleted after 30 days if they do not accept.
- The main domain is https://aiban.news (the charter and some code still say aibanewsletter.club).
- Subscribers do not pay at signup for now.
- "Sent with AIBAN" can be removed on paid plans only.
- The email signature is a full editor (WS5 `SignatureEditor`).

## 7. Decisions from Luis (2026-10-30, direct)
1. **Free plan.** Translation and voice rewriting stay available on the free plan, so the first preview is never locked. Limits stay at 1 source and 100 subscribers. Prices do not change.
2. **Payment processor.** Decided: none for now. All payment provider code was removed on 2026-10-30; a provider is added from scratch later.
3. **Sending domain.** Luis is verifying the AIBAN sending domain (SPF, DKIM, DMARC) so the default AIBAN sender can launch.
4. **Unused packages.** Removed by running `scripts/ws1-remove-unused-deps.sh` on the Mac.
