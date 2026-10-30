# WS9 copy audit, agent B1

Scope: frontend public routes (landing, start, auth, pricing, blog, help, legal, about, careers, demo, articles, subscribe, subscribe-widget, confirm-subscription), marketing/blog/widget components, `src/lib/ui/organisms/**`, `src/lib/content/**`, `locales/en.ts`, `locales-subscribe/en.ts`.
Type check baseline: 23 errors.

## Changes
| File | Line/key | Old | New | Rule |
|---|---|---|---|---|
| locales/en.ts | auth.login.title | Log in to our Newsletter Orchestrator | Log in to AIBAN | old product name |
| locales/en.ts | landing.faq[cancel].a, faq[5].a, helpCenter billing.cancel.a | Yes. You can cancel your subscription at any time from your dashboard. | Yes. Write to info@aiban.news at any time and we will cancel your paid plan or move you back to the free plan. | contradicts product (no in-app billing; plans changed by hand) |
| locales/en.ts | plans.plans[*].featuresBase | "N news sources", "Up to N users" | "N sources", "Up to N subscribers" | jargon ("news sources"), wrong noun (these are subscribers) |
| locales/en.ts | plans.plans[free].tagline | Test the technology | Try AIBAN with one source | vague |
| locales/en.ts | plans.plans[growth].tagline | The perfect balance | For established newsletters | hype |
| locales/en.ts | plans.plans[master].tagline | Unlimited scalability | For large audiences | hype / overclaim (plan has 50 sources) |
| locales/en.ts | plans.plans[pro].featuresDelta[0] | API Access | API access | sentence case |
| locales/en.ts | article.errorFetching | Error fetching article. | We could not load this article. Reload the page in a minute to try again. | vague error |
| locales/en.ts | article.goBack, confirmSubscription.goBack | Go Back | Go back | sentence case |
| locales/en.ts | pricing.currentPlan | Current Plan: | Current plan: | sentence case |
| locales/en.ts | pricing.pageLead | ...You can pay monthly or yearly and cancel from your dashboard. | ...When you need more sources or more subscribers, write to us and we will move you to a paid plan, billed monthly or yearly. | contradicts product (no in-app billing) |
| locales/en.ts | pricing.pageMetaDescription | ...then pay monthly or yearly when you need more. | ...then move to a monthly or yearly plan when you need more. | consistency with manual plan changes |
| locales/en.ts | confirmSubscription.confirm | Confirm Subscription | Confirm subscription | sentence case |
| locales/en.ts | confirmSubscription.invalidLink | Invalid confirmation link. | This confirmation link is incomplete. Open the latest email we sent you and use the link in it. | vague error |
| locales/en.ts | articles.subtitle | Explore our curated collection of articles and news. | Articles AIBAN has written for the newsletters it sends. | filler/hype |
| locales/en.ts | articles.producedIn | We've produced news in all these languages | Languages these articles are available in | "news" for newsletter content, vague |
| locales/en.ts | articles.rightsReserved | All Rights Reserved. | All rights reserved. | sentence case |
| locales/en.ts | articles.errorFetching | Error fetching articles. | We could not load the articles. Reload the page in a minute to try again. | vague error |
| locales/en.ts | about.metaDescription, about.lead | ...from the owner's email address | ...under the owner's name | contradicts product (sent from AIBAN's verified address) |
| locales/en.ts | demoPage.steps[4] | Send from your address / Add your sender email address and name so issues arrive from you. | Add your sender name and signature / Add the name and email signature readers will see. AIBAN sends each issue from its verified address under your name, and replies go to your inbox. | contradicts product |
| locales/en.ts | helpCenter getting-started.change-settings.a | ...sender details, subscribers and billing can all be changed later in your dashboard. | You can change sources, schedule, sender details and subscribers later in your dashboard. To change your plan, write to info@aiban.news. | contradicts product (billing not in dashboard) |
| locales/en.ts | helpCenter.metaDescription, groups[sending].title | sending from your address / Sending from your address | sending under your name / Sending under your name | contradicts product |
| locales/en.ts | helpCenter billing.monthly-yearly.a | (appended) | ...Write to info@aiban.news to choose a plan. | tells user the next action under manual billing |
| locales/en.ts | authForm.emailValidation | Please enter a valid email. | Enter an email address such as name@example.com. | error says what to do |
| locales/en.ts | authForm.failedToSendCode | Failed to send code. Please try again. | We could not send the code. Check the email address and try again in a minute. | vague error |
| locales/en.ts | authForm.codeSent | Code sent to your email | We sent a code to your email. | subjectless fragment |
| locales/en.ts | authForm.invalidCode | Invalid code provided | That code is not correct. Check the latest email we sent you, or resend the code. | vague error |
| locales/en.ts | authForm.appName | AI Newsletter | AIBAN | old product name |
| locales/en.ts | welcome.setItOnce / welcome.useItForever | Set it once... / ...use it forever. | Set it up once. / It keeps running after that. | elliptical drama |
| locales/en.ts | lead.question | Do you have a website? (optional) | Do you have a website? (optional, you can add it later) | optional field without skip hint |
| locales/en.ts | subscribe.welcome.title | Welcome to the Newsletter. | Welcome to the newsletter. | sentence case |
| locales/en.ts | fileInput.chooseFile | Choose File | Choose file | sentence case |
| locales/en.ts | billing.manageSubscription | Manage Subscription | Manage subscription | sentence case |
| locales/en.ts | billing.vipPlanDescription | Unlimited access courtesy of AI Newsletter. | Unlimited access courtesy of AIBAN. | old product name |
| locales/en.ts | billing.mostPopular | Most Popular | Most popular | sentence case |
| locales/en.ts | helpCenter.limitsBody | Tell us the limits you need. When you submit, your email app opens with the request filled in so you can send it to us. | Tell us the limits you need and we will reply by email. If the request cannot be sent from this page, your email app opens with it filled in so you can send it to us. | contradicted the form (it posts to /api/support first, email app is only the fallback) |
| lib/ui/organisms/HelpForm.svelte | labels, options, errors, success | hardcoded English | wired to `help.form.*` (content.form) with English fallbacks | i18n bypass |
| lib/ui/organisms/HelpForm.svelte | success block | showed "Request ready to send / Your email app opened..." even when the server accepted the request | server case shows "Request sent / We received your request..."; email fallback keeps the old text | copy contradicted what happened |
| lib/ui/organisms/Faq.svelte | filter label, empty text | hardcoded | `helpCenter.faqFilterLabel`, `helpCenter.faqNoMatch` | i18n bypass |
| routes/legal/+layout.svelte | nav labels, aria-label | hardcoded | `legal.{privacy,terms,cookies}.title`, `legal.navLabel` | i18n bypass |
| routes/legal/{privacy,terms,cookies}/+page.svelte | meta title, description, h1, "Last updated:" | hardcoded | `legal.<page>.{metaTitle,metaDescription,title}`, `legal.lastUpdated` (body prose left hardcoded, see flags) | i18n bypass |
| routes/about/+page.svelte | screen-reader "(opens in a new tab)" x2 | hardcoded | `about.newTab` | i18n bypass |
| routes/subscribe/+page.svelte, routes/subscribe-widget/+page.svelte | `<title>` | Subscribe (hardcoded) | `$ts.page.title` | i18n bypass |
| routes/+page.svelte | footer logo aria-label | AIBAN home (hardcoded) | `nav.home` | i18n bypass |
| routes/signup/+page.svelte, routes/login/+page.svelte | `<title>` | Sign up / Log in (hardcoded) | `auth.signup.pageTitle`, `auth.login.pageTitle` | i18n bypass |
| lib/ui/organisms/LanguagePicker.svelte | menu and trigger aria-labels | Choose a language / Language: {name} (hardcoded) | `nav.chooseLanguage`, `nav.currentLanguage` | i18n bypass |
| lib/ui/organisms/Pricing.svelte (keys only) | pricing.askMore, askFor, askAction | used by Pricing.svelte but missing from en.ts (English lived only in the `??` fallback) | added to `pricing` with the same English | i18n bypass |
| components/common/CopyUrlWithQR.svelte | alert, QR alt | Clipboard API not available. / Subscription QR Code | Your browser blocked copying. Select the link and copy it by hand. / QR code for your signup link | developer text shown to users; title case (dashboard namespace, so left hardcoded, see flags) |
| components/MenuHalf/MenuHalf.svelte | aria-label, avatar alt | Primary Navigation / User avatar | Primary navigation / Your avatar | sentence case |
| components/Header/Header.svelte (only used by /test-checklist) | menu items | Config / News Sources / Log Out | Settings / Sources / Log out | sentence case, jargon |

Checked with no change needed: `locales-subscribe/en.ts` (clean apart from the new key), routes confirm-subscription, start, blog/**, articles, article, demo, careers, help page shell, `src/components/articles/**`, `demo/**`, `SearchBar`, `Pagination`, `NewsCard`, `ArticleModal` (both unused), `widgets/**` (honeypot label "Website" is hidden on purpose), `StepsTowardsSubscribe` (empty folder), `lib/content/**` (sample issue text is per-language data, left as is), AuthForm (reads WS3's auth copy already). Copy linter on all scoped code dirs: no findings. Remaining linter hits in en.ts are plan names and "GitHub" (proper nouns).

Type check: 23 errors before and after, warnings unchanged (329).

## New keys
| Namespace | Key | English |
|---|---|---|
| locales | auth.login.pageTitle | Log in |
| locales | auth.signup.pageTitle | Sign up |
| locales | help.form.nameLabel | Name |
| locales | help.form.emailLabel | Email |
| locales | help.form.companyLabel | Company |
| locales | help.form.optional | (optional) |
| locales | help.form.limitsLabel | Limits you need |
| locales | help.form.useCaseLabel | How you use AIBAN |
| locales | help.form.spendLabel | Expected monthly spend |
| locales | help.form.spend.lt500 | Less than $500 |
| locales | help.form.spend.500_2k | $500 to $2,000 |
| locales | help.form.spend.2k_10k | $2,000 to $10,000 |
| locales | help.form.spend.gt10k | More than $10,000 |
| locales | help.form.spend.unknown | I do not know yet |
| locales | help.form.urgencyLabel | Urgency |
| locales | help.form.urgency.low / normal / high | Low / Normal / High |
| locales | help.form.replyLabel | How should we reply? |
| locales | help.form.reply.email / call | By email / By phone call |
| locales | help.form.payAsYouGo | I am interested in paying as I go |
| locales | help.form.sending | Sending... |
| locales | help.form.sentTitle | Request sent |
| locales | help.form.sentBody | We received your request and will answer at the email address you gave. |
| locales | help.form.retryBefore | If your email app did not open, |
| locales | help.form.retryLink | open the request again |
| locales | help.form.retryAfter | or write to |
| locales | help.form.errors.name | Enter your name (at least 2 characters). |
| locales | help.form.errors.email | Enter an email address we can reply to, like name@example.com. |
| locales | help.form.errors.company | Enter at least 2 characters, or leave this empty. |
| locales | help.form.errors.desiredLimits | Describe the limits you need in at least 10 characters. |
| locales | help.form.errors.useCase | Describe your use in at least 20 characters. |
| locales | pricing.askMore | Every account starts on the Free plan. If you need more, write to us at {email} and we will change your plan. |
| locales | pricing.askFor | Ask for {planName} |
| locales | pricing.askAction | Write to us |
| locales | about.newTab | (opens in a new tab) |
| locales | legal.navLabel | Legal documents |
| locales | legal.lastUpdated | Last updated: {date} |
| locales | legal.privacy.title / metaTitle / metaDescription | Privacy policy / Privacy policy \| AIBAN / How AIBAN collects, uses and protects your data, and how to exercise your data rights. |
| locales | legal.terms.title / metaTitle / metaDescription | Terms of service / Terms of service \| AIBAN / The terms that apply when you create an account and use AIBAN. |
| locales | legal.cookies.title / metaTitle / metaDescription | Cookie policy / Cookie policy \| AIBAN / Which cookies AIBAN uses, what they do, how long they last and how you can control them. |
| locales | helpCenter.faqFilterLabel | Filter questions |
| locales | helpCenter.faqNoMatch | No questions match your filter. |
| locales | nav.chooseLanguage | Choose a language |
| locales | nav.currentLanguage | Language: {name} |
| locales-subscribe | page.title | Subscribe |

`legal` is a new top-level section (no existing section fit legal page chrome). Every wired component keeps an English `??` fallback, so the other locales work until translated. Changed English values (see table above) also need re-translation in the other locales, mainly: the three "cancel" answers, pricing.pageLead, about.lead/metaDescription, demoPage.steps[4], helpCenter change-settings / monthly-yearly / limitsBody / sending group title, authForm errors, plans features and taglines.

## Flags for Luis
1. Landing sample issue (`src/lib/content/landingSample.ts`, `buildSample`): the preview's From line shows `Brand <hello@yoursite.com>`, which says issues come from the owner's own domain. The backend sends from AIBAN's address with the owner's name (test fixture uses `news@aiban.news`). I did not change it because I could not confirm the production sending address. Suggest `fromAddress` = the real AIBAN sending address and a display name like "{brand}".
2. Privacy policy body (`routes/legal/privacy`, hardcoded prose, last updated "October 24, 2023"): mentions billing details, "Process payments for your subscription plan", "AI news feeds", "Improve our machine learning models (anonymized data only)", "industry-standard encryption" and "secure hashing algorithms". Payments are off and the other claims are unverified. Needs a legal rewrite; left as is.
3. Terms of service body: "Providing accurate billing information", "Subscription fees are billed in advance", "fail to keep an active payment method", "Our AI news engine produces automated summaries and analysis". Outdated with manual plan changes; left as is.
4. Cookie policy table: lists `session_id`, `x-auth-token`, Google Analytics `_ga`/`_gid` ("User behavior tracking"), `lang`, `theme` with expiries. I could not verify that these cookies exist: the frontend code has no Google Analytics tag and only reads or clears cookies (components/store.ts, lib/stores/sessionLifecycle.ts); I found nothing that sets these names. Left as is; table headers and rows are also hardcoded English.
5. Plan features in `plans.plans[*].featuresDelta`: "Email support", "Basic translation", "Custom branding", "Advanced analytics", "API access", "Priority processing", "White-glove support", "Custom webhooks". Not verified against the product (every plan translates; "Basic translation" implies lower quality on Starter). Left as is.
6. Unused `pricing.processing` ("Opening checkout...") and `pricing.checkoutError` remain in en.ts; checkout is off. Harmless, can be removed later.
7. Canonical URLs on pricing, help and legal pages and `SITE_URL` in `lib/content/seo.ts` point to `https://aibanewsletter.club`, while copy and emails use `aiban.news`. Not copy; confirm which domain is canonical.
8. Dashboard-namespace strings in `CopyUrlWithQR.svelte` (alert text, QR alt) are still hardcoded English; adding keys needs `locales-dashboard/en.ts`, which is outside B1's edit list.
9. `routes/subscribe-widget/subscribe/+server.ts` returns English error messages from the server (copy is fine). They cannot follow the reader's language without passing a language code; the in-app form maps status codes to translated text, so only third-party callers of this endpoint see the English.
