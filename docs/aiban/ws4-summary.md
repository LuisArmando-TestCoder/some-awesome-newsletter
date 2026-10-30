# WS4 summary: dashboard

## What changed
- The dashboard is now its own shell (`src/lib/dashboard/DashboardShell.svelte`) instead of steps 9 to 16 of the onboarding slider. Onboarding still runs first; the shell appears once the owner has a source.
- Navigation follows STRATEGY.md: Home, Automations, Sources, Subscribers, Reports, Blog, Settings. The active item is marked (`aria-current`), links are real links, `?section=&tab=` survives reloads. Phones get a bottom bar (Home, Automations, Subscribers, Reports, More). The dark mode circle and "auto collapse" are gone; WS1's labeled Display settings menu sits in the sidebar footer.
- No accordions. Settings, Subscribers and Reports use tabs; a source opens its own detail view.
- Home: next issue with Send now, four real numbers, WS3's getting started checklist, up to three nudges with a one-click fix, activity feed, languages.
- Automations: one card per automation written as a sentence, on/off switch, last and next run, Run now with confirmation, plain schedule editor (local time in, UTC cron stored), recent runs when the backend records them, upcoming presets marked "Coming soon".
- Every screen has loading, empty, error and success states. No `alert()` or `confirm()` in WS4 screens.
- Bugs fixed: endless loader when config fails, duplicate source creation, false "plan exceeded" banners, invisible validation errors, fake success on failed unsubscribe, billing cancel that always failed, Reports stuck on "Loading", missing translation keys, pagination and share link in the blog list, unescaped signature HTML.
- About 500 English strings under `dash.*` in `locales-dashboard/en.ts`, written to COPY_RULES.md.

## What is left
- Backend pieces (requested in `requests/7.md`): automations CRUD and run history, activity endpoint, subscriber dates (growth chart), opens tracking, per-issue results, counts and pagination above 1000 subscribers per source, delete source. (Reply-to the owner shipped in WS8's engine; copy updated.)
- WS3 asks that typing addresses in Subscribers use the invitation flow (`POST /invitations/...`) and that Home use `activation` from `$lib/tutorial`. Not done in this run: the manual add still uses `POST /users/...`.
- When those land, the "Coming soon" presets need a "Turn on" button (create from recipe). Data calls already go through WS6 helpers, so most of it lights up without UI changes.
- `MainSteps` (WS3) still imports the old H_Dashboard screens; once WS3 drops them, retire `Users.svelte`, `NewsSourceUserManagement.svelte`, `Reports.svelte`, `NewsSource.svelte`, `SlotAutoCollapseToggle.svelte`, `Newspaper.svelte`.
- Non-English locales show English for new keys until WS9 translates.

## Risks
- Not seen in a browser. `npm run build` and the dev server could not run here (node_modules has macOS binaries and npm is blocked). svelte-check passed through a shadow config, which compiles every Svelte file and SCSS block.
- Onboarding writes schedules in local time while the backend and dashboard read UTC (`requests/3.md`). Until WS3 fixes it, owners far from UTC see a shifted time in Automations.
- Auth check treats a network blip as logged out (`requests/6.md`).

## How to verify
1. On the Mac: `npm run check && npm run build`, then `npm run dev`.
2. Sign in with an account that has a source. You should land on Home; try each nav item, reload on `?section=settings&tab=billing`.
3. Automations: flip a switch (toast, source `active` changes), edit the schedule, reopen it (same values), Run now (confirmation first).
4. Subscribers: search, filter by language, page through, export CSV, remove someone with the network off (they stay, error shown).
5. Phone width (375 px): bottom bar, More sheet, tables as cards, tour points at the bar.
6. Sign in with a new account: onboarding shows, not the shell.

## Decisions for Luis
Resolved on 2026-10-30 (Luis, live):
1. Security: most secure. Billing endpoints are gone; owner routes checked; open redirect in click tracking closed with signed links; admin notes hidden from owners; socket code checks rate limited per IP; internal docs no longer served.
2. App password: removed. AIBAN never asks for, stores, returns or uses an owner's email password. Issues go out from AIBAN's address under the owner's name; replies go to the owner's account email.
3. Billing providers: all removed (Tilopay, Polar, Stripe). Plans stay: each account keeps its saved plan, new accounts are free, plans are changed by hand (PATCH /v1/admin/tenants/:id). Owners see "Write to us" instead of checkout.
4. Monthly schedules: each source stores its own time zone; the schedule runs at that local time all year, any day 1 to 31 (months without the day are skipped).

Still open, needs you:
1. Run `deno run --allow-net --allow-read --allow-env scripts/scrubOwnerAppPasswords.ts` (dry run, prints counts), then add `--apply` to delete the app passwords still stored in Firestore. Saving a config or source also removes them, but accounts that never save keep them until you run this.
2. Set `LINK_SIGNING_SECRET` (at least 16 characters) on the production host if it is not set. Without it, every click in an issue shows the "This link goes to..." page instead of redirecting straight away.
3. `@polar-sh/*` packages are still in `package.json` (nothing imports them). Remove them with `npm uninstall @polar-sh/sdk @polar-sh/sveltekit` on your Mac.
4. Legal terms still mention billing in advance and a billing department.
