# WS3 summary: onboarding, tutorial, auth

## What changed
- New setup flow inside `/dashboard`, 9 steps with a visible "Step X of 9" bar, one question per step, a "Why we ask" line, a note on what happens if you skip, and Back / Skip / Continue only inside the card:
  1. Website (Continue button, checked on submit, "I do not have a website" opens a topic picker). We find the article links and guess the ideal reader. Nothing is saved yet.
  2. Live preview of the first issue in an inbox view (sandboxed), written when the step opens. "Send me a test", "Write it again", and the article rule hidden under "How we find your articles".
  3. Readers: main language (from browser, then geo) and ideal reader, both pre-filled.
  4. How often: every day / week / month, day and hour, plus one switch for automatic sending. This is the only step that creates the news source, once.
  5. First send: the owner is already subscribed; addresses typed in get an invitation (never subscribed directly); "Send now" uses the real trigger, with the preview to the owner as fallback.
  6. Signup link and embed code with copy buttons.
  7. Sender name (optional) with an inbox preview. Onboarding never asks for email credentials; issues go out from the AIBAN address with this name.
  8. Email signature (optional) inside a realistic email preview.
  9. Summary, checklist, plan, Go to the dashboard.
- Progress persists per owner and resumes after reload.
- Fixed: duplicate news source, random schedule before preview, fake send, wrong share domain, signup page showing login copy, alerts, italics, gradient and shimmer text, tall steps cut off.
- Tutorial system in `src/lib/tutorial` (checklist from real data, optional guided tour, help cards, empty states, activation events), documented in `TUTORIAL_API.md`.
- `/start` entry route, pre-fills the website from the landing page.
- Google sign-in: no tokens in logs, `state` check against login CSRF, no crash on a cancelled consent screen.
- Auth: two-step email code flow with validation on submit, resend countdown and limit, change email, focus handling.

## What is left
- WS4 must mount the checklist, tour and help cards and add `data-tour` ids (requests/4.md).
- Backend: reply-to the owner on the AIBAN sender, stop returning `appPassword` to the browser, onboarding events storage, sent timestamps, `Deno.exit` fix, preview subject (requests 7 and 8).
- Logo and brand color are not inferred from the site yet (no backend endpoint); voice (`personality`) still comes from the existing default.
- WS9: translate the new `onboarding`, `tutorial`, `auth` keys (English shows until then).

## Risks
- Not run in a browser and `vite build` not run (native binaries). Type checks pass.
- `Step11_Send` falls back to emailing the preview when the trigger refuses; that copy has no per-subscriber unsubscribe link and goes only to the owner.
- Turning automatic sending off sets `active: false` right after creation, so the source is live for a moment (requests 6 and 7).
- Schedule hours are stored as local values in cron, as before. If the server runs in UTC, sends happen at a shifted hour (existing behavior).

## How to verify
1. On the Mac: `npm run check` and `npm run build`.
2. Sign up at `/start?url=yourcompany.com` with a new email. Expect the website pre-filled, the code screen with a 30 s resend timer.
3. Walk the 9 steps. Expect the preview within about a minute, one news source in Firestore after step 4, an email in the owner inbox after step 5.
4. Reload during step 6: you return to step 6, not to the Users tab.
5. In step 7, the sender name is saved to `config.senderName` and shows in the From line of the next test email.
6. Keyboard only: Tab through each step, Enter submits, focus lands on each step title. With reduced motion on, no slide animations.

## Decisions for Luis
1. Gmail app password: decided, removed from onboarding (2026-10-30). Still open: whether the Settings form (WS4) and the backend support should go too, which would make every owner send through AIBAN's address. That needs a verified AIBAN sending domain and reply-to the owner (requested from WS8).
2. Activation metric: decided. First issue delivered to a confirmed subscriber who is not the owner, within 7 days of signup. Measured with an interim rule until the backend send log exists.
3. Contacts typed in by hand: decided. Invite, then expire after 30 days. Waiting on the invitations endpoint (WS7), template (WS5) and expiry job (WS8). Until then the setup step stores nothing.
4. New, still open: today every subscriber added from the dashboard or the signup form is live immediately, with no confirmation. Decide whether existing subscribers need a one-time confirmation email once `confirmedAt` exists. This changes what current readers receive, so it was not done.
