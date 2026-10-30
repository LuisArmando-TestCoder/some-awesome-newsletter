# WS5 plan

## Readings
- One form replaces both wizards: email (required), name (optional), newsletter language (preselected from the browser, changeable), one button. Same component on the hosted page and in the embed.
- The form posts straight to the existing public endpoint `POST {api}/public-subscribe`, which accepts name and language. The WS6 proxy stays in place for anything else that calls it.
- Paid newsletters: the proxy's Tilopay step runs for every subscriber on non-aiban.news origins. The new form does not start a payment. Listed under Decisions for Luis.
- Templates keep every variable their callers pass today. New slots (logo, brand color, postal address, preheader, language, strings) are optional and read through guards, so no caller breaks and no template throws on a missing variable.
- Values are escaped inside each template, which closes the pass-2 code execution path for these files without touching WS7's `functionTemplateFile.ts`. A request to WS7 asks for the real fix.

## Slices
1. Templates (lead): rebuild 9 templates, keep `bare.html` unchanged, add `newSubscriberOwner.html`, add `templates/_preview/` (Node renderer that copies the backend's evaluation logic, sample data, index page).
2. Frontend form (lead): `widgets/Subscribe/SubscribeForm.svelte`, `widgets/Subscribe/subscribe.ts` (helpers), `/subscribe` and `/subscribe-widget` pages, `MinimalSubscribe` as a thin wrapper.
3. Embed (lead): `/subscribe-widget/embed.js` loader (script variant, auto-resize), `widgets/EmbedCode/EmbedCode.svelte` for owners (link, iframe and script snippets, color and theme options, live preview). Mount requests to WS4 and WS3.
4. Confirm page (lead): one-click confirm, encoded params, clear states.
5. Strings: English source in `locales-subscribe/en.ts`, old keys kept, deep-merge fallback store so missing keys in other locales fall back to English.
6. Retire unused wizard files to `_deprecated/` (moves only).

Subagents: one web benchmark (done). Implementation stays with the lead because every slice touches the same small set of contracts and the computer shell is single-threaded; the files are small.
