# WS4 plan: dashboard

Follows STRATEGY.md section 4 (IA), AUTOMATIONS.md section 7 (data), DESIGN_SYSTEM.md (tokens, primitives), COPY_RULES.md.

## Architecture
- `/dashboard` keeps WS3's onboarding (`MainSteps`) until the owner has a source and has passed the onboarding steps. Then it renders `src/lib/dashboard/DashboardShell.svelte`, which shows one section at a time. Sections are pages, not accordions.
- Section state: `src/lib/dashboard/nav.ts` (`activeSection`, `settingsTab`, `sectionTab`, `goTo()`), mirrored to `?section=&tab=` so links and reloads work, and kept in sync with the legacy `store.stepsIndex` so old menus still navigate.
- Navigation: `Sidebar.svelte` (desktop/tablet, grouped, `aria-current`, collapsible with labels), `MobileNav.svelte` (bottom bar: Home, Automations, Subscribers, Reports, More). `DisplayMenu.svelte` replaces the dark mode circle and "auto collapse" (uses WS1 theme-store; swap for WS1 SettingsMenu when it lands).
- UI kit adapter: `src/lib/dashboard/ui/*` (Button wraps WS1 Button; Card, Tabs, Field, Notice, EmptyState, Skeleton, StatTile, StatusPill, ToggleSwitch, ConfirmHost). Tokens only.
- Data: `src/lib/dashboard/data/` (`automations.ts` with contract paths and fallback to per-source schedules; `insights.ts` metrics, checklist and nudges derived from the store; `activity.ts`; `schedule.ts` cron helpers). All calls go through WS6's `$lib/api/client` with `withFallback`.

## Sections (STRATEGY.md labels)
1. Home: next issue (time, relative, Send now with confirm), 4 numbers (subscribers, languages, clicks 7 days, automations on), getting started checklist (until WS3's lands), up to 3 nudges with one-click fixes, activity feed, languages bar list.
2. Automations: one card per automation as a sentence, switch, last and next run, Run now (confirm), plain schedule editor (stores UTC cron, shows local time), recent runs; presets not yet available shown as "Coming soon".
3. Sources: what a source is and why add more; per-source voice, ideal reader and frequency as basic settings; selector under Advanced.
4. Subscribers: tabs List (search, language filter, pagination, per-source), Add or import (progress), Signup form (WS5 EmbedCode), Send (write about a link / send now).
5. Reports: tabs Overview, Clicks, Languages. Charts separate from lists.
6. Blog: archive, link to the public blog.
7. Settings: tabs Brand (logo with specs and where it appears, colors, title, subject), Sending email (sender name and address with defaults, conditional login fields, email signature with a realistic preview, mailing address), Plan and billing (plan, usage vs limits, upgrade via existing flow, no price changes), Developer (API key, webhooks, embed, export).

## Slices (parallel subagents, disjoint files)
- A: Subscribers + Reports (`sections/Subscribers.svelte`, `sections/Reports.svelte`, `dashboard/subscribers/**`, `dashboard/reports/**`, `HD/Users/**`, `HD/Reports/**`).
- B: Settings (`sections/Settings.svelte`, `dashboard/settings/**`, `HD/Config/**`, `HD/Billing/**`, `HD/Developer/**`, `HD/Exports/**`, `lib/ui/organisms/BillingForm.svelte`, `locales-billing-form/en.ts`).
- C: Sources + Blog (`sections/Sources.svelte`, `sections/Blog.svelte`, `dashboard/sources/**`, `dashboard/blog/**`, `HD/NewsSource/**`, `HD/Newspaper/**`).
- Lead (me): shell, nav, Home, Automations, data layer, layout, strings merge, review, docs.

## Verification
`npm run build` cannot run in this environment (no network for npm; node_modules has macOS binaries). Type and compile checks run with svelte-check through a shadow config (`$HOME/ws4/check.sh`, svelte-preprocess instead of vitePreprocess). WS10 or Luis runs `npm run check && npm run build` on the Mac.
