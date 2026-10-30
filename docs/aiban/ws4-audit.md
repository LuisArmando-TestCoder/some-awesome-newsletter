# WS4 audit: dashboard

Date: 2026-10-30. Read-only audit of every WS4 file plus a benchmark pass (beehiiv, Kit, Mailchimp, Buttondown, Ghost, Substack, Zapier, Make, Linear, Vercel, Loops, Stripe). Paths are relative to `src/`. `HD` = `components/systems/steps/StepsTowardsPublish/stages/H_Dashboard`.

## Structure today
- The dashboard is not a page. It is steps 9 to 16 of the onboarding slider (`MainSteps.svelte`, owned by WS3), selected by `store.stepsIndex`. The sidebar sets `stepsIndex`.
- Navigation: the main items sit inside a collapsed "Dashboard" accordion group. The sidebar is `display:none` at 1024px and below, so mobile has no dashboard navigation of its own. Sidebar links are `<li>`/`<div>` with click handlers and `<a>` without `href`: keyboard users cannot use it. No active state that a screen reader can read.
- Settings use nested accordions with an "Auto collapse is on/off" switch (diagnostic j, k, l). Subscribers and charts share one scrolling page (v).
- Background is a hotlinked Pexels photo.

## Bugs (fix owner in brackets)
- Layout: if loading the config fails, the loading screen never goes away. [WS4, fixed]
- Missing English keys render "undefined": `labels.emailAddress`, `labels.chooseFile`, `errors.noNewsSources`, `labels.connectionDetails`, `descriptions.connection`, `labels.linkDetection`, `descriptions.detection`, `labels.autoDetect`. [WS4]
- Add and update source forms submit twice (button default `type=submit` plus form `on:submit`), so two sources can be created. [WS4, HD/NewsSource]
- Plan limit check uses `current < limit` and is not reactive, so a free owner at exactly 1 source sees "Plan limit exceeded" in three places. [WS4 views; `lib/utils/checkPlanLimits.ts` is WS6]
- `ManualAddUserForm` clears every validation error the moment it is set. [WS4]
- `UserDataService` removes a subscriber locally and reports success even when the unsubscribe call failed. [WS4]
- Send now and send custom message go to every subscriber with no confirmation. [WS4]
- Subscribers and Reports show "Loading" forever when the subscriber map is empty. [WS4]
- Billing cancel sends `x-auth-email: store.user.email`, which is never set, so cancel always fails. [WS4]
- Backend `/api/subscribe` and `/api/cancel-subscription` trust the `x-auth-email` header with no auth: anyone can cancel any subscription. [WS7, security, requested]
- Newspaper: pagination highlight never moves (mutated Map), search is not URL-encoded, share link misses the source id. [WS4]
- `markdown.apiPlayground` shows literal `{newsSource.url}`; `markdown.exportNewsSources` shows escaped HTML. [WS4]
- `DeveloperNewsSourceItem` subscribes to `latestMessage` without unsubscribing. [WS4]
- Signature toggle (dead code) inserts social URLs into HTML unescaped. [WS4, retired]

## Data available (from the data-flow map)
- Subscriber growth over time: none (no subscribe dates returned).
- Opens: not tracked. Clicks: yes, per subscriber and source with timestamps (`/leads/:configuratorId`).
- Send history: none. Proxies: article `creation` dates, `lastManualSendTimestamp`.
- Next scheduled send: computable on the client from each source's `scheduleTime` cron (UTC).
- Activity log, usage vs limits, automations: no endpoints yet (WS7/WS8 contract in AUTOMATIONS.md).
- Backend caps subscribers per source at 1000 (`getNewsletterUsersByNewsSource` default limit). Counts and search are wrong above that. [WS7]

## Performance (50k subscribers)
- Every `saveToStore` serializes the full subscriber map into localStorage and cookies (WS6 file). Over quota at about 7 MB, writes fail silently.
- Users screen filters and reverses full lists on every store change and every keystroke (no debounce).
- All subscribers load on every boot; no server pagination or counts endpoint.

## Accessibility
Clickable non-interactive elements in the sidebar, unlabeled toggle, logout `<a>` without href, hover-only tooltip in Exports, inputs with empty labels, `<label>` not tied to `<select>`, no `aria-live` on feedback, `alert()`/`confirm()` everywhere, charts with no text alternative.

## Copy
Title Case nearly everywhere, em dashes in four webhook strings, italic instructions (`sub-italic`), jargon ("News Sources", "Lead", "Link Selector", "Personality", "Secrets/Developer", "Auto collapse", "HMAC"), optional fields without defaults, logo upload with no specs, "Check console for details" shown to users, limit errors that always say "Free plan".

## Dead code
`HD/H_Dashboard.svelte`, `HD/Users/UserActions.svelte`, most of `HD/Config/toggles/*` except `EmailCredentialsToggle`, `AutoCollapseToggle` and `SlotAutoCollapseToggle` (duplicates), `UserDataService.loadInitialData`.

## Benchmark takeaways used in the plan
- Home first; content and audience as separate nav groups; settings at the bottom with billing and developer inside it.
- Automations as sentences ("When X, AIBAN does Y") with a switch in the header, last run with a status dot, next run, Run now, history, and a gallery of presets as the empty state.
- Subscribers: debounced search, filter chips (language, source), pagination with total count, import as a background job with progress, export.
- Billing as usage meters (used of limit) with the upgrade action next to the meter.
- Empty state = one-line explanation + one action. Skeletons, not spinners. Errors say what happened and what to do, keep input.
- Mobile: bottom bar with 4 items plus More; tables become stacked cards; 44px tap targets.
