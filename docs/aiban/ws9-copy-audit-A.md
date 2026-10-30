# WS9 copy audit, agent A

Scope: backend templates, prompts, LLM prompt strings in engine and helper/LLM.ts, API error messages; frontend static files and src/app.html; email language coverage.

## Changes

| File:line | Old | New | Rule |
|---|---|---|---|
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:30 | "Missing or invalid required parameters: configId, newsSourceId, or non-empty content." | "Choose a news source and add the content you want to send, then try again." | developer-facing error |
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:38 | "Unauthorized access to this configuration" | "You can only send from your own newsletter. Sign in with the account that owns it." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:48 | `Failed to fetch configuration ${configId}` | "We could not load your newsletter settings. Reload the page and try again." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:54 | `Configuration ${configId} not found.` | "We could not find your newsletter settings. Reload the page and try again." | developer-facing error |
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:64 | `News source not found with ID: ${newsSourceId}` | "We could not find that news source. Reload the page and try again." | developer-facing error |
| ai-newsletter-translated/API/newsletter/sendCustomContentEndpoint.ts:83 | `Please wait approximately ${formattedTimeLeft} before sending custom content for this news source again.` | `You can send to this news source again in about ${formattedTimeLeft}.` | plain words, front-load |
| ai-newsletter-translated/API/newsletter/unsubscribeEndpoint.ts:98 (x3) | "Missing required query parameters: configId and newsSourceId." | "This unsubscribe link is incomplete. Use the link at the bottom of the most recent issue." | developer-facing error |
| ai-newsletter-translated/API/newsletter/unsubscribeEndpoint.ts:107 (x2) | "This unsubscribe link is not valid." | "This unsubscribe link is not valid. Use the link at the bottom of the most recent issue." | error without next action |
| ai-newsletter-translated/API/newsSource/getNewsSourceEndpoint.ts:24 | "Missing required parameters: configId and newsSourceId." | "Choose a news source and try again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getNewsSourceEndpoint.ts:39 | `Configuration ${configId} not found.` | "We could not find your newsletter settings. Reload the page and try again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getNewsSourceEndpoint.ts:47 | "No news sources found for this configuration." | "This newsletter has no news sources yet. Add one in Sources." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getNewsSourceEndpoint.ts:56 | "News source not found." | "We could not find that news source. It may have been deleted." | error without next action |
| ai-newsletter-translated/API/newsSource/deleteNewsSourceEndpoint.ts:21 | "Missing required parameters: configId and newsSourceId." | "Choose a news source and try again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/deleteNewsSourceEndpoint.ts:36 | `Configuration ${configId} not found.` | "We could not find your newsletter settings. Reload the page and try again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/deleteNewsSourceEndpoint.ts:47 | "Unauthorized access" | "You can only delete your own news sources." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsSource/deleteNewsSourceEndpoint.ts:54 | "No news sources found in the configuration." | "This newsletter has no news sources to delete." | developer-facing error |
| ai-newsletter-translated/API/newsSource/deleteNewsSourceEndpoint.ts:65 | "News source not found in the configuration." | "We could not find that news source. It may have been deleted already." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:117 | "Missing required parameters: configId and newsSourceId." | "Choose a news source and try again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:136 | "Unauthorized access" | "You can only change your own news sources." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:142 | "No news sources found for this configuration." | "This newsletter has no news sources yet. Add one in Sources." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:148 | "News source not found." | "We could not find that news source. It may have been deleted." | error without next action |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:165 | `Error generating personality: ${error.message}` | "We could not work out a writing style from this content. Try again, or add more text." | raw exception shown to user |
| ai-newsletter-translated/API/newsSource/getPersonalityOutOfContentEndpoint.ts:181 | `Failed to update news source: ${error.message}` | "We could not save the writing style. Try again in a few minutes." | raw exception shown to user |
| ai-newsletter-translated/API/newsletter/apiKeyEndpoint.ts:35 (x3) | { error: "Unauthorized" } | { error: "You can only manage API keys for your own account. Sign in with that account and try again." } | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsSource/articlesEndpoints.ts:522 | "An internal server error occurred." | "We could not load the articles. Try again in a few minutes." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsSource/articlesEndpoints.ts:555 | "Article temporarily unavailable. Please try again shortly." | "This article cannot load right now. Try again in a few minutes." | plain words |
| ai-newsletter-translated/API/newsSource/getAnyUserDataBaseFileToStandardFormatEndpoint.ts:28 | "Missing 'text' field." | "The file part is empty. Choose the file again and retry the import." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getAnyUserDataBaseFileToStandardFormatEndpoint.ts:31 | "Missing 'newsSourceId' field." | "Choose the news source these subscribers belong to, then try the import again." | developer-facing error |
| ai-newsletter-translated/API/newsSource/getAnyUserDataBaseFileToStandardFormatEndpoint.ts:57 | message: `Formatting failed: ${msg}` | message: "We could not read the subscribers in this part of the file. Check that it lists email addresses, then try again." | raw exception shown to user |
| ai-newsletter-translated/API/docs/docsRouter.ts:18 (x4) | "File not found" | "This documentation page was not found. Check the address or go back to the documentation home." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/v1/automations/automationsV1Router.ts:384 | "Something went wrong while saving. Try again." | "We could not save this automation. Try again in a few minutes." | vague error: say what happened and what to do next |
| ai-newsletter-translated/API/newsSource/addNewsSourceEndpoint.ts:99 | message: "Required" | message: "Add this field." | subjectless fragment |
| some-awesome-newsletter/static/content/auth.json:4 | "Log in to our Newsletter Orchestrator" | "Log in to AIBAN" | old product name |
| some-awesome-newsletter/static/content/auth.json:5 | "Connect to continue where you left off." | "Sign in to continue where you left off." | plain words |
| some-awesome-newsletter/static/content/auth.json:9 (x2) | "Continue with Email" | "Continue with email" | sentence case |
| some-awesome-newsletter/static/content/auth.json:11 | "Sign Up" | "Sign up" | sentence case |
| some-awesome-newsletter/static/content/auth.json:22 | "Log In" | "Log in" | sentence case |
| some-awesome-newsletter/static/content/auth.json:16 | "No credit card required." | "You do not need a credit card." | subjectless fragment |
| some-awesome-newsletter/static/content/help-limits.json:19 | "We unlock larger quotas immediately after approval. | "We raise your quotas right after approval. | banned word (unlock) |
| some-awesome-newsletter/static/content/help-limits.json:29 | within 1–2 business days | within 1 to 2 business days | en dash |
| some-awesome-newsletter/static/content/help-limits.json:11 | (e.g., 100k API calls/day) | (for example, 100k API calls a day) | plain words |
| some-awesome-newsletter/static/content/plans.json:19 (x2) | "Current Plan" | "Current plan" | sentence case |
| some-awesome-newsletter/static/content/plans.json:34 (x2) | "Automatic newspaper" | "Automatic newsletter" | old name (newspaper) |
| some-awesome-newsletter/static/content/plans.json:83 | "Need more capabilities for your business?" | "Tell us what your business needs and we will change your plan for you." | rhetorical question |
| some-awesome-newsletter/static/content/plans.json:84 | "Contact Us" | "Contact us" | sentence case |
| some-awesome-newsletter/src/app.html:28 | <div style="display: contents">%sveltekit.body%</div> | <noscript><p style="margin: 0; padding: 16px; font-family: system-ui, sans-serif;">AIBAN needs JavaScript to run. Turn it on in your browser settings, then relo | added noscript message (none existed) |
| ai-newsletter-translated/templates/_preview/build_templates.py:243 (CONFIRM_S.en.preheader) | One click to start receiving {title}. | Confirm with one click to start receiving {title}. | subjectless fragment |
| ai-newsletter-translated/templates/_preview/build_templates.py:460 (authenticationCode) | Questions? Write to info@aiban.news. | If you have questions, write to info@aiban.news. | self-answered question / fragment |

## Email language coverage (item 3)

- New file `ai-newsletter-translated/templates/_preview/strings_i18n.py`: built-in strings for 26 languages that were missing (ru tr id vi jv tl sw fa ur pnb hi bho mr bn gu kn ta te zh yue ja ko th am ha pcm). Each covers the issue footer (where it was missing), confirmation email, welcome email, unsubscribe page and deleted-data page. Placeholders identical to English. No dashes, emojis or exclamation marks. Per-table `thisNewsletter` keeps the grammatical case each sentence needs (for example ru "эту рассылку" vs "этой рассылки").
- Already present from WS5 and left unchanged: es pt fr it de ar (all tables), nl fa ur zh ja ko ru tr hi (footer).
- Aliases (the engine passes the app's raw code through `normalizeLang`, which keeps `jp`, `pes`, `arz`...): jp to ja, pes and prs to fa, arz apc apd to ar (Modern Standard Arabic is the written register for email), wuu and cmn to zh, fil to tl, in to id. Resolved in the template prelude (so `lang`/`dir` follow) and in the browser script of the two web pages.
- build_templates.py changes (code, not copy): imports the module; prelude resolves aliases; merge loop fills gaps with `setdefault` (existing entries win); a check asserts every language has the same keys and placeholders as English and no dashes, curly quotes, exclamation marks, backticks, dollar signs or backslashes; page script now uses the alias map and the full RTL list (was only ar, fa, ur, he, so Punjabi Shahmukhi pages would have rendered left to right) and splits on `-` and `_`.
- RTL: pnb, ur, fa, ar and aliases are in the existing RTL list. Verified `dir="rtl"` for pes, arz, apc, pnb.
- Regenerated: `python3 templates/_preview/build_templates.py templates` then `node templates/_preview/render.mjs`: 22/22 rendered, no failures. Spot render for jp, pes, arz, apc, wuu, pnb, pcm, yue, am, ha, ru, tl, fil-PH, pt-BR, xx: correct language and direction, unknown code falls back to English.
- README `templates/_preview/README.md` "Built-in translations" line updated to describe the new coverage and how to add a language.
- Request filed in `some-awesome-newsletter/docs/aiban/requests/8.md`: add the new codes to `WELCOME_BUILT_IN` in engine/automations/pipeline.ts so welcome emails use the built-in strings instead of an LLM translation.

## Checked, no change needed

- prompts/** and LLM prompt strings in engine/** and helper/LLM.ts: no dashes, curly quotes, emojis or banned words outside the rule list itself. Every prompt that writes customer or subscriber text appends COPY_RULES_PROMPT (write.ts, translate path, rewriteVoice, translatedArticleContentPrompt, defaultDeps translateHtml). copy-lint hits in prompts/_shared/copyRules.ts are the banned-word list and the examples of what not to write. engine/emailSender.ts emoji hits are log lines.
- API/**: WS7 already rewrote most messages to say what happened and what to do. main.ts has no user-facing strings. Dash hits in articlesEndpoints.ts are debug logs.
- Kept "Unsubscribed by mistake?" + "Subscribe again" on the unsubscribe page: it is a real question to the reader followed by a link, not a self-answered hook.
- static/robots.txt, static/google*.html: nothing user-facing.

## Flags for Luis

1. `static/content/plans.json`, `help-limits.json` and `auth.json` are served publicly at /content/*.json but nothing in src reads them. plans.json describes old plans (Free, Monthly $17, Yearly $9/$108, "Custom app password", product IDs for in-app checkout) that do not match Starter, Growth, Pro, Master. I fixed casing and wording only and did not touch prices or features. Suggest retiring all three to `_deprecated/` if nothing external uses them.
2. `help-limits.json` states "pay-as-you-go", "volume discounts at scale" and "reviewed within 1 to 2 business days". I could not verify any of these in the product. Left as is (only the dash and "unlock" changed).
3. welcome.html falls back to the English words "our newsletter" for the title when the caller passes no title, in every language. The engine always passes one today, so it is low risk.
4. robots.txt and src/lib/content/seo.ts use https://aibanewsletter.club while the API, emails and request 8.md say https://aiban.news. Pick one canonical domain.
5. Translations for jv (krama), bho, pnb, pcm and am were written without a native reviewer. They follow the same short sentences as English; a native check before a large send in those languages is worth it.
