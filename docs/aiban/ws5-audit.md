# WS5 audit: subscriber experience and emails

Run: 2026-10-30. Files read in full: every file WS5 owns, plus the backend call sites that fill each template.

## Frontend: subscribe flow
1. `/subscribe` is a 5-step wizard (welcome, name, email, language, done). It asks for the name first and makes it required. Each step has its own page, and the welcome step only shows "You have been invited by {configuratorId}", which is the owner's raw email address.
2. The language the subscriber picks is never sent. `C_Language.svelte` posts only `email`, `configuratorId`, `newsSourceId` to `/subscribe-widget/subscribe`, and that proxy sets `name` to the email's local part. Every subscriber from this page gets the default language and loses the name they typed.
3. The proxy `/subscribe-widget/subscribe/+server.ts` (WS6 file) only takes the internal path when the origin contains `aiban.news` or `localhost`. On `aibanewsletter.club` it takes the webhook path, which fails with "Webhook is not configured" for every owner without a webhook, and when it succeeds it calls `/api/newsletter-subscribe`, which creates a Tilopay payment link for every subscriber, including free newsletters. It also logs the request body, which contains `THE_PASS`, in plain text.
4. The backend already has a public endpoint, `POST /public-subscribe`, that accepts `{configuratorId, newsSourceId, email, name, language, bio}`, checks that the config and news source exist and applies the plan limit. The frontend never used it.
5. `subscribe-translations.ts` is `writable(translations.en)`. Strings change only if the global LanguagePicker runs. The picker merges locales shallowly, so any new nested key missing from a locale becomes `undefined`.
6. Copy breaks COPY_RULES: Title Case ("Get Ready for **Exclusive Insights** Landing in Your Inbox Soon"), markdown asterisks rendered literally inside `<h2>`, invented promises ("exclusive insights"), "Finishing up..." shown forever when there is no lead URL.
7. Validation shows "Please enter a valid email." while the person is still typing (diagnostic item d). The next button only appears after the input is valid, so keyboard and screen reader users get no clear CTA.
8. No `<form>`, no labels tied to inputs, no `autocomplete="email"`, no live region for errors or success.
9. `getPublicConfig` calls the authenticated `/config` endpoint with the visitor's (empty) auth headers, so logo and title never load for a real subscriber. The public endpoint `/public-config-info` returns only `newsletterTitle` and `senderName`.

## Frontend: widget
1. `/subscribe-widget` renders the full site header, the floating language picker and a WebGL shader inside the iframe. It is 4 steps (email, name, language, confirm) with hard-coded English strings.
2. No script embed, no auto-resize, no theming (accent color, logo, dark mode), no RTL. `Subscribe.svelte` (stepped widget) and its stages `A_InitialParams`, `B_UserDetails`, `C_ConfirmAndSubscribe` are not imported anywhere.
3. Nothing in the dashboard shows the owner an embed snippet. Only the share link exists (`CopyUrlWithQR`, `Step12_Share`).

## Frontend: confirm page
1. Builds the API URL without `encodeURIComponent`. An address with `+` (common for Gmail aliases) arrives as a space and the backend answers "User not found".
2. Requires ticking "I accept the terms and conditions and privacy policy" (AIBAN's terms, not the sender's) before confirming. Shows the backend's English message as the result.
3. Uses `$t.confirmSubscription` from WS2's translations file and `color: blue` for links.

## Backend templates
Template engine: `helper/functionTemplateFile.ts` evaluates each file as a JavaScript template literal inside `with (context)`, and does it twice (the output of pass 1 is evaluated again). Consequences:
- A variable a template uses but the caller does not pass throws `ReferenceError`, and the function returns `null`, so the email is silently not sent.
- Any `${...}` that reaches the output through a value is executed in pass 2.

Findings:
1. **Critical, remote code execution.** `GET /unsubscribe/:email` renders `unsubscription.html` with the raw path parameter. A request to `/unsubscribe/${Deno.exit()}` executes that code in pass 2. Same for `deletedUser.html` (authenticated) and any value in any template. It is also reflected XSS.
2. **Confirmation emails for new subscribers are never sent.** In `db/newsletter/addNewsletterUser.ts`, the new-user branch calls `confirmationEmail.html` without `origin`. The template uses `${origin}`, throws, returns `null`, and `if (content)` skips the send. The person stays `accepted: false` forever and the owner later gets a "rejection" notice for them.
3. `bare.html` must stay `${content}`: LLM content contains `${await fetchImageFromStockPhotoSiteSearch(...)}` expressions that pass 2 resolves. It is the only template that depends on pass 2.
4. `welcome.html` and `subscriptionNotification.html` are not used by any code path. The charter's "new subscriber -> welcome email" chain has no sender yet (WS8).
5. Layout: 7 of 10 templates use `<style>` blocks with classes (Gmail strips some, Outlook ignores most), `div` layout, gradients, `box-shadow`, no dark-mode handling, no `lang`/`dir`, `© 2025` hard-coded, "Σx Team" sign-off, "The Team".
6. `newsletterEmail.html` is a fragment (no `<html>`), fixed `width="600"` (overflows on phones), italic source line, English-only footer inside an issue written in the subscriber's language, no preheader, no brand slots, no postal address, signature disabled with `&& ''`.
7. No `List-Unsubscribe` / `List-Unsubscribe-Post` headers (WS8 `sendEmail`). Unsubscribe is a `GET` that changes state, so mail scanners that prefetch links can unsubscribe people.
8. `documentation.html` loads CSS from cdnjs and breaks on any doc that contains `${`.

## Benchmark notes (Substack, beehiiv, Kit, Buttondown, Ghost, Litmus)
- Ask for email only; name and other fields optional. Consent is one line under the button with a privacy link and "unsubscribe anytime".
- Success state names the sender, what to look for in the inbox, when it arrives, and a spam-folder tip.
- Bot protection without friction: offscreen honeypot, minimum time to submit.
- Embeds ship as an iframe and a script tag. Good ones auto-resize with `postMessage` from a `ResizeObserver`, accept `theme`, `accent`, `logo`, `lang` params and have a `title` on the iframe.
- Double opt-in email: one button, short body, fallback plain link, "ignore this if you did not ask".
- Email HTML: nested `role="presentation"` tables, 600px max, 16px body, VML button for Outlook, `color-scheme` meta plus `prefers-color-scheme` plus `[data-ogsc]`, hidden preheader with spacer, `dir` on `<html>` and wrapper for RTL, `alt` on every image.
- Gmail and Yahoo bulk sender rules (enforced since 2024, rejections since Nov 2025): `List-Unsubscribe` with `List-Unsubscribe-Post: List-Unsubscribe=One-Click`, honor within 48 hours. CAN-SPAM: postal address in the footer.
