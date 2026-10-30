# WS13: everything works end to end

Date: 2026-10-30

## What was asked

Prove that every mechanism, newsletter, trigger, button and piece of business logic works, from the browser through the API. Fix whatever does not. The specific reports were:

- "Preview my newsletter" does nothing.
- The language should follow the browser.

## How it was tested

Everything ran in an isolated copy:

- the SvelteKit app;
- the Deno backend;
- a Firestore emulator;
- a fake inbox that catches every email.

Production got read-only checks only, with nothing written and no email sent.

The suite is now saved in the repo as `tests/e2e/` (see its README) and can be rerun at any time. It refuses to run against anything that is not on localhost.

Final results:

| Suite | Result |
| --- | --- |
| `tests/e2e/public.mjs` | 22/22 |
| `tests/e2e/owner.mjs` | 15/15 (sign up to a sent issue on the public blog, about 7 minutes) |
| `tests/e2e/admin.mjs` | 8/8 |
| Backend `deno task test` | 254/254 |
| Backend `deno task check` | clean |
| Frontend `svelte-check` | 0 errors, 0 warnings |
| Frontend unit tests | 25/25 |
| Frontend `vite build` | builds |
| Copy lint (strings and code) | 0 findings |

## Why "Preview my newsletter" did nothing

Production runs an older backend. On `ai-newsletter-translated.onrender.com`, these routes all answer 404:

- `/v1/public/preview-issue`
- `/healthz`
- `/readyz`
- every other `/v1` route

The old auth routes still work. On the live site the button had nothing to call.

In this work, the landing page shows a real sample issue. It is written by AI from the newest article on the visitor's site, in the visitor's language, with English, Spanish and German as tabs. A progress state shows while it is written, and a retry and the sample layout are offered if the site cannot be read. It works locally in about 20 seconds, or instantly when cached. **It reaches users only after the backend is deployed.**

## Language follows the browser

- On first visit the site uses `navigator.languages`, matched to the 36 supported languages, with aliases (`iw` → `he`, `in` → `id`, `fil` → `tl` and others).
- The `<html lang>` and `dir` attributes are set before first paint.
- A choice made in the language picker is remembered and wins over the browser from then on. A detected language is never saved as if the visitor had chosen it.
- Tested with es-CR, de-DE, fr-FR, pt-BR and en-GB.

## Bugs found and fixed

### Backend

1. **Sends hung forever at "publish to blog".** Digit-led field names were sent with literal backticks in the URL, and the request never returned. Because only one run per automation is allowed at a time, every later send for that newsletter was blocked too.
   - Backticks are now percent-encoded.
   - Every Firestore call has a 30 second timeout.
   - Writes use a real PATCH.
2. **Writing an issue sometimes came back empty.** The model spent its whole token budget thinking. Thinking is now off for every call, both writing and JSON.
3. **New issues did not show on the public blog for up to 2 hours.** The blog's article cache was never cleared when an issue was published. Publishing and account deletion now clear that author's cached lists.
4. **API keys page answered 500 for new accounts.** It now returns an empty list.
5. **Conflict detection.** Only a real `FAILED_PRECONDITION` is treated as "changed elsewhere" (409). Other 400s now show their real reason.
6. **Unsubscribe and confirm pages** use the new mono palette.

### Frontend

7. **The help form never reached the team.** The site sent fields the backend does not accept, so every request failed with "We could not send your request". The form is now mapped to the backend contract and stored for the admin team. Too many requests now gets a clear message.
8. **"Send the next issue" said "sent" when it was only queued.** It now follows the run live and ends with "Sent to N subscribers", "Nothing was sent" with the reason, or the failure.
9. **"Write and send" showed a generic error.** It now shows the real reason, for example the 7-day limit per source.
10. **Adding a subscriber said they "now get issues"** when they still had to confirm by email. The message now matches the real status: pending, already subscribed, or added.
11. **Onboarding "Save and continue" failed on retry** with a plan-limit error, because it created the source twice. The existing source is now reused.
12. **The schedule summary read like a cron line** ("at minute 0, at hour 9"). It now reads "Every Monday at 09:00, your time (America/Costa_Rica)."
13. **Dozens of live-update connections opened at once** and tripped the server's rate limit ("Wait 282 seconds"). One connection is now shared.
14. **Hidden legacy dashboard screens were reachable** by keyboard and screen readers. They are now inert and hidden.
15. **API keys and webhook signature:**
    - the account id was not encoded in the URL;
    - there were no error messages and no busy state;
    - Copy gave no feedback.

    All four are fixed.
16. New English text was translated into all 35 other languages.

## For production (not done here)

1. **Deploy the backend.** Nothing in this list reaches users until it is deployed. This includes the preview, the hang fix, the blog cache fix and the empty-writing fix.
2. Set `MAIL_ONE_CLICK_UNSUBSCRIBE=1` (tested locally: Gmail and Yahoo one-click unsubscribe works).
3. The OpenAI and Gemini fallback keys in the backend `.env` are invalid. OpenRouter is the only working AI provider, so if it fails there is no fallback.
4. After sign-in, the URL still carries the code (`x-auth-code`). This is a known release blocker, and the legacy auth flags are still on.

## Known small things left as they are

- `/blog` with no newsletter in the address shows a "no newsletter here" notice. This is intended, and the page is noindex.
- The development server reports a CSP `unsafe-eval` notice. This is from Vite in dev only.
- The issue emails keep the pine brand color by default. This is intentional, and owners can change it.
