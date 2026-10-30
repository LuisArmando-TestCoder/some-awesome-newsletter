# WS3 audit: onboarding flow, tutorial, auth

Date: 2026-10-30. Scope: every file WS3 owns (charter section 3) plus the backend endpoints those files call.

## How the flow works today
- `/dashboard` renders `MainSteps.svelte`, which passes 17 components to `Steps.svelte`. Slots 0 to 8 are onboarding. Slots 9 to 16 are dashboard tabs, and `stepsMapping` in `src/components/store.ts` (WS6) hard-codes `Profile: 9` and up. Any onboarding redesign must keep exactly 9 onboarding slots or the dashboard tabs shift.
- `MultiSlotComponent` mounts every slot at once and toggles CSS classes. `onMount` runs for all 17 components on page load, so any work tied to "this step is now visible" must react to `canReveal`, not `onMount`.
- Mounted order: Frequency, Language, Redirect, News website, Topic, Selector, Generate, Share, Plan. Step05 Signature, Step09 App password, Step10 Gmail and Step11 Send exist but are not mounted, so owners never set up a sender or signature during onboarding.

## Bugs and risks found
1. Duplicate news sources: Step06 calls `createNewsSource` and Step08 calls it again. Every new owner gets two sources, and the second can hit plan limits.
2. Premature sending: Step06 creates the source before the owner picks a schedule, and `createNewsSource` falls back to a random cron (any hour, any weekday). The automation can fire before the owner has seen a preview.
3. The first question is the schedule, before the owner has said what the newsletter is about. The website URL, which lets us infer most other answers, comes fourth.
4. The website input validates and rewrites while typing (`Link.svelte` prepends `https://` on each keystroke) and errors use `alert()`. Diagnostic item (d).
5. Instructions are italic (`.subtitle { font-style: italic }`), titles use gradient text and an infinite shimmer animation, `{@html}` subtitles use `<u>` per word. Diagnostic items (c), (e), (f), (g).
6. Back/Next are global arrow buttons (`TransitionSteps`) whose visibility depends on validators, not on the step. Diagnostic item (b).
7. No visible progress and no resumable state: `MainSteps` calls `resetStepsStore()` on mount, so a reload loses inferred values. The layout jumps to the dashboard as soon as one source exists, which strands an owner who reloads mid-flow.
8. Step11 "Send" is a fake 2.5 s timeout. Step08 only sends a test to the owner. Nothing in the flow sends a real issue to a subscriber.
9. Step12 share link is hard-coded to `https://aiban.news/subscribe` (the product domain is aibanewsletter.club) and copies with `alert()`.
10. Step13 shows plan limits that are hard-coded strings and duplicates the billing tab.
11. Copy: curly quotes in step02, "human sounding AI" claims, "Selector string", "Content Selector" jargon, Title Case buttons, emoji in step05 warning.
12. Hard-coded colors and px values in every step style (no tokens).
13. Auth: `signup/+page.svelte` sets login copy on language change (`copy.set($t.auth.login)`), so the signup page shows login text. Resend has no timer or limit, invalid-code state depends on global flags, label "Work Email" is hard-coded English, and the code is passed to `/dashboard` in the query string (cleaned there with `replaceState`).
14. `wrappers/InteractiveSlides/{Hey,How}.svelte` fail type checks and are unused.

## Backend facts that shape the redesign
- `POST /news-source/generate-selector/:configId` returns a selector without creating anything. Good for the first step.
- `POST /news-source/generate-newsletter` builds a full preview from url, lead, personality, selector, language and config without saving. This is the live preview.
- `POST /news-source/send-email` sends any HTML with the config passed in the body. `getFallBackAuth` uses the owner's `emailMaskSender` plus `appPassword` when both are present, otherwise the AIBAN system sender. This lets us run a real "test connection" with unsaved credentials and lets the first send work before Gmail is set up.
- `POST /news-source/:configId` creates a source and subscribes the owner automatically, so the owner is always subscriber number one.
- `POST /news-source/:configId/:id/trigger` sends the current issue to the source's subscribers. This is the real first send.
- `helper/getMailConfigPack.ts` calls `Deno.exit(1)` when the mail config is incomplete. One bad config can stop the whole server (request sent to WS8).
- There is no endpoint that verifies SMTP credentials without sending mail, and no server-side onboarding state (requests sent to WS7).

## Data collected per step and where it goes
| Data | Before | After (this redesign) |
|---|---|---|
| Website URL | Step06, creates a source | Step 1, stored in onboarding state, used for selector and preview, saved when the automation is turned on |
| Language | Step02, `config.dashboardLanguage` | Step 2, inferred from browser and `/geo`, sent as preview language and saved to `config.dashboardLanguage` |
| Ideal reader / topic | Step04, `config.community` | Step 2, inferred from the site name, saved to the source `community` and `lead` context |
| Link selector | Step07, visible text field | Hidden by default. Shown under "How we find your articles" on the preview step |
| Gmail address and app password | not collected | Step 4, `config.emailMaskSender` and `config.appPassword`, saved only after a test send succeeds |
| Email signature | not collected | Step 5, `config.emailSignature` |
| Schedule | Step01 first question | Step 6, together with the automation switch |
| First subscribers | Step12 CSV upload | Step 7, owner plus pasted addresses, sent with `addNewsletterUser` |
