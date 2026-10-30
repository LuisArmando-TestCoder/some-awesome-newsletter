# WS3 plan

Goal: a new owner sends a first real issue to at least one real subscriber within 10 minutes, after seeing a live preview.

## Constraints that decide the shape
- Keep 9 onboarding slots (indices 0 to 8) so `stepsMapping` (WS6) and the dashboard tabs keep their indices.
- Steps mount all at once, so visible-only work reacts to `canReveal`.
- No new backend endpoints are required for the first version. Better endpoints are requested from WS7.

## New order (slot: file, question)
0. `Step06_NewsWebsite`: "What is your website?" URL field plus Continue. Validate on submit. "I do not have a website" opens the topic picker. On submit we find the article links (generate-selector) and infer the ideal reader from the site name. Nothing is saved to the backend yet.
1. `Step02_Language`: "Who reads your newsletter?" Language (prefilled from browser and geo) and ideal reader (prefilled). Step04 Topic is merged here.
2. `Step08_Generate`: live preview inside an email frame, generated when the step opens. Actions: send a test to myself, regenerate, "How we find your articles" disclosure (selector, from Step07).
3. `Step10_Gmail`: "Send from your own Gmail address" (optional). Guided app password steps with links to Google, test connection that sends a real test mail with the unsaved credentials, human error messages. Skip keeps the AIBAN sender. Step09 merged here.
4. `Step05_EmailSignature` (new file): "Email signature" (optional) with name, role, website and a realistic email preview. Saves `config.emailSignature`.
5. `Step01_Frequency`: "When should it go out?" Schedule plus one switch for the default recipe ("New articles every week"). Creates the news source once, with the chosen schedule and `active` from the switch.
6. `Step11_Send`: "Send your first issue" Owner is already subscribed. Optional pasted addresses. "Send now" calls the trigger endpoint. Success screen.
7. `Step12_Share`: signup link and embed code (correct domain), copy with inline confirmation.
8. `Step13_Plan`: "You are set up" summary, getting-started checklist preview, plan line, Go to dashboard. Marks onboarding complete.

## Shared pieces
- `NewFlow/OnboardingShell.svelte`: progress ("Step 3 of 9" plus bar), one question, why text, what happens if skipped, Back (tertiary), Skip (secondary, optional steps only), primary CTA. Keyboard: Enter submits, focus moves to the heading on step change. Reduced motion respected.
- `NewFlow/onboardingState.ts`: persisted onboarding state (localStorage per owner email, try/catch), resume index, completion flag.
- `NewFlow/onboardingCopy.ts`: derived store that merges English keys under `onboarding` with the active locale so new keys work before WS9 translates them.
- `Steps.svelte`: hide the global arrow buttons during onboarding.
- `MainSteps.svelte`: new order and validators, restore state instead of reset, resume after the layout jumps to the dashboard.

## Tutorial system (`src/lib/tutorial/**`)
- `checklist.ts`: items computed from real state (source added, sender verified, first subscriber, first send, automation on, widget installed) plus local evidence for things the backend does not record yet. Dismiss and progress stored per owner.
- `GettingStartedChecklist.svelte`, `HelpCard.svelte`, `GuidedTour.svelte` (optional, skippable, keyboard and reduced-motion aware, targets `data-tour` attributes), `EmptyStateGuide.svelte`.
- `docs/aiban/TUTORIAL_API.md` for WS4.

## Auth
- AuthForm: clear two-step email then code flow, validation on submit, resend countdown (30 s, max 3 then help text), change email link, inline errors, correct copy per mode. Fix signup copy bug.

## Out of scope / requested
- WS7: `POST /email/verify-smtp` (verify without sending), server-side onboarding state and `firstSentAt` on news sources.
- WS8: replace `Deno.exit(1)` in `getMailConfigPack`.
- WS4: mount the checklist and tour, add `data-tour` attributes, call `resumeOnboardingIfNeeded` from the layout.
- WS6: `createNewsSource` should not pick a random schedule silently.
