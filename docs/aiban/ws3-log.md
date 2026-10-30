# WS3 log

## 2026-10-30
- 07:37 Run started. Requested access to both connected folders (granted). Read CHARTER, COPY_RULES, UX diagnostic, requests/3.md (empty). STRATEGY.md, DESIGN_SYSTEM.md, AUTOMATIONS.md and src/styles/tokens.scss do not exist yet, so tokens are used with fallbacks.
- Benchmark subagent (beehiiv, Kit, Mailchimp, Loops, Stripe, Linear, Notion, Duolingo) finished. Patterns adopted: URL first, infer then confirm, live preview, true step count, guided app password with test, checklist from real state, optional tour offered once, resumable steps, one-sentence empty states.
- Build tooling: npm registry is blocked from both the computer shell and the cloud workspace, and node_modules on disk are macOS binaries, so `npm run check`/`npm run build` cannot run as is from here. Workaround for type checks: a mirror in the computer shell's home (`~/check/proj`, outside the project) with a JS-only preprocessor and a stub for the rollup native module. Baseline: 40 type errors, none caused by WS3 work. `vite build` cannot run here (esbuild/rollup native binaries are darwin only).
- Wrote ws3-audit.md and ws3-plan.md.
- Created `_ws3_tmp/` (scratch tarball for staging). Safe to remove.
- Read STRATEGY.md, DESIGN_SYSTEM.md, AUTOMATIONS.md once they appeared, and tokens.scss (token names match the charter). Reordered the flow to match STRATEGY section 5: website, preview, readers, schedule, first send, then the optional steps.
- Decision: STRATEGY says the Gmail app password never appears in onboarding; the WS3 brief asks for a guided Gmail step. Kept the step but moved it after the first send, made it optional with "Skip this step", and the AIBAN sender is the default. Listed under Decisions for Luis.
- Decision: kept 9 onboarding slots so `stepsMapping` (WS6) and every dashboard tab index stay valid.
- Decision: the checklist uses the six items from the WS3 brief (source, sender, first subscriber, first send, automation, widget) rather than STRATEGY's five; preview and test send are tracked as events instead.
- Decision: replaced the cron picker with Every day / Every week / Every month plus day and hour (STRATEGY: no cron in onboarding). Times are stored as before (local values in the cron string); STRATEGY wants UTC storage, which needs a backend change (WS8).

### Files changed
- `src/components/systems/steps/StepsTowardsPublish/MainSteps.svelte`: new order and validators, onboarding state init, resume after the layout jump.
- `src/components/systems/steps/Steps.svelte`: global arrow buttons hidden during onboarding; debug log removed.
- `src/components/systems/wrappers/MultiSlotComponent/MultiSlotComponent.scss`: the active slot scrolls (tall steps were cut off), `100dvh`, reduced motion.
- NewFlow rewritten: `Step06_NewsWebsite` (slot 0), `Step08_Generate` (1), `Step02_Language` (2), `Step01_Frequency` (3), `Step11_Send` (4), `Step12_Share` (5), `Step10_Gmail` (6), `Step13_Plan` (8).
- `src/lib/i18n/locales-newflow/en.ts`: new `onboarding`, `tutorial`, `auth` blocks; old step keys kept for WS9; curly quotes and emoji removed from old keys.
- Subagent (auth slice), reviewed: `src/lib/ui/organisms/AuthForm.svelte` (two-step code flow, validation on submit, 30 s resend countdown, max 3 resends, change email, focus management), `src/routes/signup/+page.svelte` (signup showed login copy), `src/routes/login/+page.svelte`.

### Files created
- NewFlow: `OnboardingShell.svelte` (progress, question, why, skip note, Back/Skip/primary), `EmailFrame.svelte` (inbox view in a sandboxed iframe), `Step05_EmailSignature.svelte` (7), `infer.ts`, `nav.ts`, `onboardingApi.ts`, `schedule.ts`.
- `src/lib/tutorial/`: `copy.ts`, `onboardingState.ts`, `checklist.ts`, `GettingStartedChecklist.svelte`, `index.ts`; by subagent (reviewed): `tour.ts`, `GuidedTour.svelte`, `HelpCard.svelte`, `EmptyStateGuide.svelte`.
- `src/routes/start/+page.svelte`.
- `docs/aiban/TUTORIAL_API.md`.

### Moved to _deprecated/
- `src/components/systems/steps/StepsTowardsPublish/stages/NewFlow/{Step03_Redirect,Step04_Topic,Step05_Signature,Step07_Selector,Step09_AppPassword}.svelte` (no longer imported anywhere).
- `src/components/systems/steps/Steps.svelte.new` (empty file created by mistake).

### Requests sent
- requests/4.md (mount checklist, tour, help cards; data-tour ids; layout resume; signature editor), 7.md (verify-smtp endpoint, onboarding events, sent timestamps, active at creation), 8.md (`Deno.exit(1)` in getMailConfigPack, preview subject, trigger skipped status), 6.md (no random schedule, pass `active`), 2.md (`/start?url=`, auth copy case).

### Checks
- svelte-check on the mirror: 0 errors and 0 warnings in WS3 files (project total 39 errors, all in other workstreams' files). Copy grep: no dashes, curly quotes or banned words in WS3 strings.
- Not run: `vite build` and a browser walk-through (native esbuild/rollup binaries are macOS only and npm is blocked here).

## 2026-10-30, follow-up from Luis
- Luis: the Gmail app password is too sensitive to keep. Removed it from onboarding. Slot 6 is now `Step10_SenderName.svelte` (sender name only, inbox preview, saves `config.senderName`). `Step10_Gmail.svelte` moved to `_deprecated/`. `testSender` removed from `onboardingApi.ts`. The `onboarding.sender` strings were replaced by `onboarding.senderName`. The checklist item `sender` now checks `config.senderName`. Old `step09`/`step10` keys stay in en.ts until WS9 drops them.
- Requests: 4.md (do not promote the app password form in Settings; fragment handoff), 7.md (verify-smtp withdrawn; stop returning `appPassword` to the browser, encrypt at rest), 8.md (reply-to the owner when the AIBAN sender is used).
- WS6 request 1 (oauth): token, credential and profile logs removed; `state` cookie added (`src/routes/oauth/oauthState.server.js`, used by the login and signup actions); access token sent in a header to Google; `createInitialConfiguratorConfig(headers, url.origin)`. Cancelled or expired consent goes to `/login?oauth=cancelled|expired` instead of throwing. The query-string handoff stays until WS4 reads the fragment.
- svelte-check: 0 errors in WS3 files.

## 2026-10-30, Luis decisions
- Activation: first issue delivered to a confirmed non-owner subscriber within 7 days of signup. Added `src/lib/tutorial/activation.ts` (`activation` store, interim rule until the backend send log exists) and exported it from `index.ts`.
- Contacts typed in by hand: invite, then expire. The send step no longer calls `POST /users/...` (which subscribed people at once, with no confirmation: my earlier copy said they would confirm by email, which was wrong). It calls `inviteContacts` (`POST /invitations/...`, requested from WS7). While that endpoint is missing, the step stores nothing and tells the owner to send the signup link. Invited addresses are no longer kept in localStorage. Copy updated.
- Requests: 1.md (STRATEGY updates), 4.md (activation store, invitation flow in Subscribers), 5.md (invitation email template), 7.md (invitations endpoint, `confirmedAt`, send log), 8.md (30-day expiry job, send log).
