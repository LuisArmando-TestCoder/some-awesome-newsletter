# Tutorial API (WS3)

Everything is exported from `$lib/tutorial` (`src/lib/tutorial/index.ts`). All storage access is wrapped in try/catch, so every piece works when localStorage is blocked; it only forgets progress. All components use design tokens, respect `prefers-reduced-motion` and work with the keyboard.

## Strings
- `ob`, `tt`, `at`: stores with the English onboarding, tutorial and auth strings from `src/lib/i18n/locales-newflow/en.ts`, merged with the active locale (English for keys WS9 has not translated yet).
- `fmt(template, vars)`: replaces `{name}` placeholders.
- Pass your own copy to `HelpCard`, `EmptyStateGuide` and tour steps (WS4 owns dashboard copy).

## Getting-started checklist
```svelte
<script>
  import { GettingStartedChecklist, checklist } from "$lib/tutorial";
</script>
{#if !$checklist.complete}<GettingStartedChecklist />{/if}
```
- Items (ids): `source`, `sender`, `subscriber`, `send`, `automation`, `widget`. Each is computed from real data in the app store: `config.newsSources`, `config.senderName`, `subscribers` (someone other than the owner), news source `lastSentAt`/`lastRunAt`/`firstSentAt`/`stats.sent` or the onboarding first send, a source with `active !== false`, and `leads` or the owner copying the signup link/embed code.
- `$checklist`: `{ items: { id, done, target }[], done, total, complete }`. `target` is a `stepsMapping` key.
- Props: `dismissible = true`, `showActions = true`, `onOpen(item)` to override navigation (default: `saveToStore({ stepsIndex: stepsMapping[item.target] })`), `headingLevel = 2`. Events: `open`, `hide`.
- `checklistHidden` store plus `setChecklistHidden(bool)`; put a "Show getting started" item in Help that calls `setChecklistHidden(false)`.
- `computeChecklist(storeValue, onboardingValue)` is pure, for tests or custom views.

## Guided tour (optional, skippable)
```svelte
<script>
  import { GuidedTour, offerTourOnce, startTour, resetTour, isOnboardingComplete } from "$lib/tutorial";
  const dashTour = { id: "dashboard-v1", steps: [
    { target: '[data-tour="nav-sources"]', title: "Sources", body: "Sites we check for new articles." },
    { target: '[data-tour="nav-automations"]', title: "Automations", body: "Turn on what should happen by itself." },
  ]};
  onMount(() => { if (isOnboardingComplete(email)) offerTourOnce(dashTour); });
</script>
<GuidedTour />  <!-- once, in the dashboard layout -->
<button on:click={() => { resetTour(dashTour.id); startTour(dashTour); }}>Replay the tour</button>
```
- `startTour(def): boolean`, `nextTourStep()`, `prevTourStep()`, `endTour("finished" | "skipped")`, `hasSeenTour(id)`, `markTourSeen(id)`, `resetTour(id)`, `offerTourOnce(def): boolean`, `availableSteps(def)`, `stepTargetExists(step)`.
- Stores: `activeTour` (`{ def, index } | null`), `lastTourEnd` (`{ id, reason } | null`).
- Steps whose target is not on the page are skipped. Esc skips, arrow keys move, focus returns to where it was. The card docks to the bottom on narrow screens.

## Contextual help card
```svelte
<HelpCard id="help-sources" title="Sources" what="Sites we check for new articles." why="Each new article can become your next issue." compact />
```
- Props: `title`, `what`, `why`, `id?` (enables close and remembers it), `actionLabel?`, `actionHref?`, `onAction?`, `compact = false` (a small "What is this?" disclosure). Events: `dismiss`, `action`.
- Helpers: `isHelpDismissed(id)`, `dismissHelp(id)`, `restoreHelp(id)`.

## Empty states
```svelte
<EmptyStateGuide title="You have no subscribers yet." body="Share your signup link or import a list." actionLabel="Import contacts" onAction={openImport} secondaryLabel="Copy signup link" secondaryHref="#share">
  <!-- optional ghost preview in the default slot -->
</EmptyStateGuide>
```
- Props: `title`, `body?`, `actionLabel?`, `actionHref?`, `onAction?`, `secondaryLabel?`, `secondaryHref?`, `headingLevel = 3`. Slots: `icon`, default (ghost preview, hidden from screen readers). Event: `action`.

## Onboarding state
- `onboarding` store (persisted per owner), `initOnboarding(email)`, `updateOnboarding(patch)`, `markOnboardingComplete()`, `isOnboardingComplete(email?)`, `getResumeIndex(email)` (slot 0 to 8 or null), `readSavedOnboarding(email)`, `ONBOARDING_STEP_COUNT` (9).
- `trackOnboardingEvent(name)`: records `onboarding_started`, `preview_shown`, `test_sent`, `first_issue_sent`, `sender_named`, `onboarding_completed` once with a timestamp and dispatches a `aiban:onboarding` window event (`detail: { name, at }`) that analytics can listen to.
- Landing page handoff: `/start?url=example.com` pre-fills the first onboarding field.

## Activation
- `activation` store: `{ activated, inWindow, windowEndsAt, interim, hasFirstSend, hasConfirmedReader }`. `computeActivation(store, onboarding, now?)` is the pure version. `ACTIVATION_WINDOW_DAYS = 7`.
- Definition (Luis, 2026-10-30): the first issue reaches at least one confirmed subscriber who is not the owner, within 7 days of signing up. `interim` stays true until the backend has a send log; the interim rule is "first send happened and a non-owner subscriber has `confirmedAt` (or `accepted`), both within 7 days".

## Inviting contacts
- Addresses an owner types in are invited, never subscribed directly: `POST /invitations/:configId/:newsSourceId` (requested from WS7). Invitations not accepted within 30 days are deleted. Invited addresses are never stored in the browser.
