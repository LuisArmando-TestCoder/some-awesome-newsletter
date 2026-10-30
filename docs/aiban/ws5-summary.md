# WS5 summary: subscriber experience and emails

## What changed
- **Signup works and keeps what the reader typed.** `/subscribe` is one short form: email, optional first name, and the issue language picked from the browser with a "Change" link. It posts to the backend's public endpoint, which stores name and language. The old wizard dropped both, and on aibanewsletter.club it went through a proxy that failed without a webhook or sent free subscribers to a payment page.
- **Embeddable form.** `/subscribe-widget` takes `accent`, `theme`, `layout`, `logo`, `lang`, `language`. A script-tag loader at `/subscribe-widget/embed.js` resizes the iframe and fires `aiban:subscribed`. Owners get `EmbedCode.svelte` with the link, both snippets, options and a live preview (WS4/WS3 asked to mount it).
- **Confirm page.** One click, works with `+` addresses, clear result for every case.
- **All emails rebuilt.** Table layout for Gmail, Outlook and Apple Mail, dark mode, preheader, owner logo and color, RTL, postal address slot, unsubscribe link, "Sent with AIBAN". New owner emails: new subscriber, weekly report.
- **Two production bugs fixed from the template side.** New subscribers never got a confirmation email (template threw on a missing variable). `GET /unsubscribe/<anything with ${...}>` ran code on the server (values are now escaped in every template).
- Previews: `node templates/_preview/render.mjs` in the backend, then open `templates/_preview/out/index.html`.

## How to verify
1. Backend: `node templates/_preview/render.mjs` prints `22/22 rendered`. Open the index, try "Phone width", switch your OS to dark mode.
2. Frontend on the Mac: `npm run check` and `npm run build` (they cannot run in the computer shell). Then:
   - `/subscribe?configuratorId=<owner email>&newsSourceId=<id>`: submit empty, then a bad address, then a real one you own. Check the subscriber in Firestore has `language` and `name`, and that the confirmation email arrives (needs the backend running this version of the templates).
   - Open the confirmation link, select Confirm subscription.
   - `/subscribe-widget?configuratorId=...&newsSourceId=...&layout=compact&accent=c2410c&theme=dark`.
   - Paste the script snippet from `EmbedCode` into any HTML page and load it.
3. Send a real issue to yourself only. Check Gmail web, Gmail iOS, Outlook desktop, Apple Mail.

## What is left
- Translations of the new strings (WS9). Until then non-English visitors see the new form in English.
- Backend work requested from WS7/WS8: fix the template engine itself, pass `origin`, `config`, `language` to the confirmation email and encode its link, unsubscribe by POST plus List-Unsubscribe headers (needed for Gmail and Yahoo bulk rules), send the welcome email, owner notification and weekly report, return logo and brand color from `/public-config-info`, add `postalAddress` to settings.
- WS1 to skip the site header in `/subscribe-widget` (a CSS fallback hides it now).

## Risks
- Templates rely on `functionTemplateFile` keeping `with (context)` and the `context` parameter name. If WS7 replaces the engine, re-run the preview harness.
- The new form calls `/public-subscribe` directly. That endpoint has no rate limit or captcha; the form adds a honeypot and a minimum submit time only.
- Built-in email strings outside English were written by WS5 and not reviewed by a native speaker.
- Not tested in real mail clients from here (no sending). The layout follows the usual Litmus patterns.

## Decisions (answered by Luis on 2026-10-30)
1. **No payment at signup** for now. The new form never starts a payment; WS6 asked to remove the Tilopay step from the old proxy.
2. **Main domain is https://aiban.news.** Templates, links and the embed already use it. WS2, WS3, WS7 and WS1 asked to switch the places that still say aibanewsletter.club.
3. **Email signature: full editor.** Built `src/components/systems/widgets/EmailSignature/` (`SignatureEditor.svelte`, `signature.ts`): live preview that is the real email HTML, click any part to edit it, tags to show or hide each part (name, job title, company, phone, email, website, address, photo, logo, social links, button, legal note), five layouts, accent color, font, size, photo shape. Output is table-based inline HTML. WS4 (Settings) and WS3 (onboarding) asked to mount it.
4. **"Sent with AIBAN"** is removable on paid plans only. Templates hide it when `config.hidePoweredBy` is true and the plan is paid. The embed hides "Runs on AIBAN" when `/public-config-info` returns `hidePoweredBy: true` (WS7 asked). WS4 asked for the setting.
5. **Consent sentence instead of the terms checkbox** stays. Check with a lawyer for any market that requires a checkbox.

## Still open for Luis
- Safe to delete: `some-awesome-newsletter/_deprecated/docs/aiban/ws5-harness-partial-out/`, and `docs/aiban/ws5-harness/harness-out.tgz` when you no longer need screenshots.
- Photo and logo in the signature are links for now. An upload button needs file storage (WS7), then the editor can take files directly.
