# WS1 audit: design system primitives, styles, animation, deps

Date: 2026-10-30. Read-only audit of the WS1-owned frontend files. Line numbers refer to the files as they are today (after the WS1 token/ThemeChanger work logged in ws1-log.md).

Abbreviations in this doc:
- `STP/` = `src/components/systems/steps/StepsTowardsPublish/stages/`
- `sys/` = `src/components/systems/`
- `HD/` = `STP/H_Dashboard/`
- "Importers" were computed by resolving every relative and `$lib` import in `src/` to a real file (not by name matching), so same-named files (two PlainText, two Switch) are counted separately.

Headline facts
- Every component in scope uses legacy Svelte syntax (`export let`, `on:` directives, `<slot>`, `$:`). None uses runes (`$props`, `$state`). The only runes code in `src/components` is in `components/articles/*` (WS2).
- Almost every input/selector exports a per-instance writable store (`export const xStore = writable(...)`). These are readonly exports, not props; only `Code.authCode` is consumed from outside (`lib/ui/organisms/AuthForm.svelte:117`, `bind:authCode`). A rebuild must keep `authCode` readable via `bind:`.
- Callback-prop convention: `onChange`, `onEnter`, `onSelect`, `callback`. No component dispatches events. Two call sites rely on events that never fire (see Switch).

## 1. Inventory

Columns: path | kind | props (name: type = default) | syntax | importers.

### src/lib/ui/components, src/lib/ui/molecules

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| lib/ui/components/EmailInput.svelte | email text input, regex validation | value: string = ""; placeholder: string = "Enter your email..."; label: string = ""; onEnter: (isValid: boolean)=>void; onChange: (newValue: string)=>void. Readonly export: emailStore | legacy | 2: lib/ui/organisms/AuthForm.svelte (bind:value, placeholder, label, onEnter), lib/ui/organisms/HelpForm.svelte |
| lib/ui/components/PlainText.svelte | text input | value: string; placeholder: string; label: string; type: "text"\|"password"\|"email"\|"number"\|"tel"\|"url" = "text"; onChange. Readonly export: textStore | legacy | 1: lib/ui/organisms/Faq.svelte |
| lib/ui/components/Switch.svelte | on/off switch (div role=switch) | toggled: boolean = false; onChange: (newState: boolean)=>void. Readonly export: switchStore | legacy | 3: HD/Billing/Billing.svelte, HD/NewsSource/AddNewsSourceForm.svelte, lib/ui/organisms/Pricing.svelte (all pass toggled + onChange) |
| lib/ui/components/Textarea.svelte | autosizing textarea | value = ""; placeholder = "" | legacy | 1: lib/ui/organisms/HelpForm.svelte |
| lib/ui/molecules/HelpContextCard.svelte | plan/usage card | plan: any; usage: any | legacy | 1: routes/help/+page.svelte |
| lib/ui/molecules/Tabs.svelte | tab strip, named slot "item" | items: string[]; activeItem: string | legacy | 0 (dead) |

### sys/buttons

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| buttons/SubmitButton/SubmitButton.svelte | the app's main button (all CTAs) | disabled: boolean = false; loading: boolean = false (only toggles a class, no spinner); active: boolean = true; label: string = "Next"; callback: MouseEventHandler | legacy | 36. Call sites pass callback (36), label (18), disabled (9), loading (9). Files: sys/inputs/Personality, sys/inputs/Secrets, STP/D_Lead, STP/E_NewsSource, HD/H_Dashboard, HD/Config/Config, HD/Exports/Exports, HD/NewsSource/{Add,Update}NewsSourceForm, HD/NewsSource/PostExplanation, HD/Reports/UserAnalytics, HD/Users/{BulkAddUserSection,ManualAddUserForm,NewsSourceUserManagement}, STP/NewFlow/Step01..Step13 (all 13), sys/steps/StepsTowardsSubscribe/stages/{A_Welcome,B_Email,B_Name,C_Language,D_Subscribed}, sys/widgets/Subscribe/stages/{Confirmation,Email,Language,Name} |
| buttons/IconButton/IconButton.svelte | button with fetched SVG icon + text | disabled; loading; active = true; label: string = ""; src: string (required); callback | legacy | 4: HD/Config/toggles/EmailSignatureToggle, HD/Developer/DeveloperNewsSourceItem, HD/Users/NewsSourceUserManagement, HD/Users/UserCard (pass src, label, callback, disabled, loading) |
| buttons/ToggleCard/ToggleCard.svelte | accordion card (button header + slot) | cardTitle: string (required); canReveal = false (unused inside); isOpen = false; expanded = false; onChange: (isOpen: boolean)=>void (declared without default, called with `?.`) | legacy | 9: HD/AutoCollapseToggle, HD/Developer/{NewsSourceDeveloper,DeveloperNewsSourceItem}, HD/Exports/Exports, HD/NewsSource/{NewsSource,UpdateNewsSourceForm}, HD/Users/{BulkAddUserSection,ManualAddUserForm,NewsSourceUserManagement}. Call sites pass cardTitle, isOpen, onChange, canReveal, expanded |
| buttons/TransitionButton/TransitionButton.svelte | full-screen prev/next arrow | active: boolean; direction: -1\|1; callback | legacy (uses Svelte 5 `onclick` attribute) | 1: sys/steps/TransitionSteps/TransitionSteps.svelte |
| buttons/Date/Date.svelte | date input (misplaced in buttons/) | value; placeholder; label; onChange; onEnter. Readonly: dateStore | legacy | 1: sys/selectors/Card/JsonViewer.svelte (itself dead) => effectively dead |

### sys/inputs

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| inputs/PlainText/PlainText.svelte | text input or textarea | value: string = ""; placeholder = ""; label = ""; type: "text"\|"password"\|"email"\|"number"\|"tel"\|"url"\|"date" = "text"; isTextarea = false; rows = 3; disabled = false; onChange. Readonly: textStore | legacy | 23. Call sites use bind:value (16), label (17), placeholder (17), type (6), onChange (5), disabled (4), value (4), isTextarea (1), rows (1), plus on:focus/on:blur (SearchBar, not forwarded, see bugs). Files: components/SearchBar, sys/inputs/Secrets, sys/selectors/Card/JsonViewer, HD/Config/toggles/{AppPassword,EmailCredentials,EmailMaskSender,InteractiveSignatureEditor,NewsletterSubject,NewsletterTitle,SenderName}Toggle, HD/Developer/DeveloperNewsSourceItem, HD/NewsSource/{PostExplanation,UpdateNewsSourceForm}, HD/Users/ManualAddUserForm, STP/NewFlow/{Step04_Topic,Step07_Selector,Step09_AppPassword}, StepsTowardsSubscribe/stages/{B_Email,B_Name}, widgets/Subscribe/stages/{B_UserDetails,Name}, routes/articles, routes/test-styles |
| inputs/Email/Email.svelte | email input with "@" helper button | value; placeholder = $t['email.enterYourEmail'] (evaluated once); label; onEnter; disabled; onChange (receives "" while invalid). Readonly: emailStore | legacy | 9: HD/Config/toggles/EmailCredentialsToggle, HD/NewsSource/{PostExplanation,UpdateNewsSourceForm}, HD/Users/ManualAddUserForm, STP/NewFlow/Step10_Gmail, StepsTowardsSubscribe/stages/B_Email, widgets/Subscribe/stages/{B_UserDetails,Email}, routes/test-styles |
| inputs/Link/Link.svelte | URL input, auto-prefixes https:// | value; placeholder = $t['link.enterYourUrl']; label; center: boolean = false; onChange; onEnter. Readonly: urlStore | legacy | 10: STP/D_Lead, STP/E_NewsSource, HD/Config/toggles/{EmailSignature,InteractiveSignatureEditor}Toggle, HD/NewsSource/{Add,Update}NewsSourceForm, STP/NewFlow/{Step03_Redirect,Step05_Signature,Step06_NewsWebsite}, routes/test-styles. Call sites: bind:value (8), placeholder (13), onChange (5), value (5), label (2), onEnter (2) |
| inputs/Number/Number.svelte | number input | value: string; placeholder; label; onChange; onEnter. Readonly: numberStore | legacy | 2: JsonViewer (dead), routes/test-styles => dead in product |
| inputs/TextArea/TextArea.svelte | textarea | value; label; placeholder; rows = 5; disabled; onChange | legacy | 1: HD/Users/NewsSourceUserManagement |
| inputs/Code/Code.svelte | OTP code (6 boxes desktop, single field mobile) | length = 6; onChange. Readonly: authCode (bound by AuthForm) | legacy | 1: lib/ui/organisms/AuthForm.svelte |
| inputs/Language/Language.svelte | searchable language combobox (fuzzysort) | defaultLanguageCode: string\|null; label = "Language"; onSelect: (code\|null)=>void; disabled; whitelist: string[]. Readonly: selectedLanguageStore | legacy | 8: HD/NewsSource/PostExplanation, HD/Newspaper/Newspaper, HD/Users/ManualAddUserForm, STP/NewFlow/Step02_Language, StepsTowardsSubscribe/stages/C_Language, widgets/Subscribe/stages/{B_UserDetails,Language}, routes/articles |
| inputs/Country/Country.svelte | searchable country + news source combobox | defaultCountryCode; label = "Country"; onSelect: (CountrySelection\|null)=>void; disabled; whitelist. Readonly: selectedCountryStore | legacy | 2: STP/E_NewsSource, HD/NewsSource/AddNewsSourceForm (onSelect only) |
| inputs/ScheduleTime/ScheduleTime.svelte | cron builder of 5 CustomSelects | store?: Writable<string>; value?: string; onChange?; exclude: ("minute"\|"hour"\|"dayOfMonth"\|"month"\|"dayOfWeek")[]; label? | legacy | 3: STP/NewFlow/Step01_Frequency, HD/NewsSource/UpdateNewsSourceForm, routes/test-styles |
| inputs/ScheduleTime/CustomSelect.svelte | searchable select bound to a store | options: Option[]; store: Writable<string\|null>; label = "Select an option"; disabled | legacy | 1: ScheduleTime |
| inputs/ScheduleTime/cronToNatural.ts, naturalCronParser.ts | helpers | n/a | ts | cronToNatural: routes/test-styles only; naturalCronParser: 0 (dead) |
| inputs/Image/Image.svelte | image drop zone + preview | selectedImage: string\|null; canReveal = true (hides whole uploader when false); onChange: (string\|null)=>void | legacy | 3: HD/Config/toggles/{Image,InteractiveSignatureEditor}Toggle, STP/NewFlow/Step05_Signature |
| inputs/FileInput/FileInput.svelte | file drop zone | selectedFilesStore: Writable<FileList\|null> (required); disabled; isSubmitting; accept = ""; id = random; label = $t[...]; dropZoneLabel = $t[...] | legacy | 1: HD/Users/BulkAddUserSection |
| inputs/ColorPicker/ColorPicker.svelte | brand color picker (svelte-awesome-color-picker + nearest-color) | selectedColor = $foregroundColor; onChange; canReveal (unused, block commented out). Readonly: selectedColorStore | legacy | 3: HD/Config/toggles/{EmailSignature,InteractiveSignatureEditor}Toggle, STP/NewFlow/Step05_Signature (all `bind:selectedColor`) |
| inputs/Personality/Personality.svelte | AI persona textarea + generate button | personality: string; newsSourceId: string; onChange; onSubmit; onError | legacy | 1: HD/NewsSource/UpdateNewsSourceForm |
| inputs/Secrets/Secrets.svelte (+ .scss) | webhook/API key manager (a full feature, not a primitive) | none | legacy | 1: HD/Config/toggles/SecretsToggle |

### sys/selectors

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| selectors/Switch/Switch.svelte | "goo" switch, div role=switch | toggled = false; onChange. Readonly: switchStore | legacy | 5: HD/AutoCollapseToggle, HD/SlotAutoCollapseToggle, HD/NewsSource/UpdateNewsSourceForm (bind:toggled + on:change), HD/Users/NewsSourceUserManagement, JsonViewer |
| selectors/SearchSelector/SearchSelector.svelte | generic searchable select | items: any[]; valueFieldName = "id"; displayFieldName = "name"; defaultSelectedValue; label = "Select an option"; onSelect; disabled. Readonly: selectedItemStore | legacy | 1: HD/Newspaper/Newspaper |
| selectors/Tags/CollapsibleTags.svelte + CollapsibleTagNode.svelte | single-select tree of tag buttons | tags: {name, children?}[]; selectedTags: Writable<string[]> / node, selectedTags, toggleTag | legacy (svelte:self) | 1: STP/NewFlow/Step06_NewsWebsite |
| selectors/Tags/Tags.svelte + TagNode.svelte | multi-select tag tree | same shape | legacy | 1: routes/tags-test only => dead in product |
| selectors/Card/Card.svelte | collapsible card | label; svg = "user-gear-solid"; selected; canReveal; collapsed | legacy | 1 import in HD/NewsSource/NewsSource.svelte:2 (`CardComponent`) but never rendered => dead |
| selectors/Card/JsonViewer.svelte | recursive JSON editor | data: any; canReveal | legacy | 0 outside itself => dead |
| selectors/Checkbox/Checkbox.svelte | div role=checkbox | checked; label; onChange. Readonly: checkboxStore | legacy | 0 => dead |
| selectors/Radio/Radio.svelte | button role=radio | selected (unused); label; value; name (unused); onChange. Readonly: selectedRadioStore | legacy | 0 => dead |

### sys/texts

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| texts/TextTypes/TextTypes.svelte (+ .scss) | typographic span by type | type: TextType (14 variants) | legacy | 14: sys/buttons/ToggleCard, sys/stats/LeadStat, sys/texts/Text, HD/{AutoCollapseToggle,SlotAutoCollapseToggle}, HD/Developer/NewsSourceDeveloper, HD/Exports/Exports, HD/NewsSource/{AddNewsSourceForm,NewsSource}, HD/Reports/UserAnalytics, HD/Users/{BulkAddUserSection,ManualAddUserForm,NewsSourceUserManagement,Users} |
| texts/MarkdownText/MarkdownText.svelte | parses slot text (##, ###, **, ==, *, --) into Text segments | canReveal = false | legacy | 17: components/common/CopyUrlWithQR (imported, not rendered), sys/inputs/ColorPicker (commented out), sys/selectors/Card, sys/selectors/Card/JsonViewer, HD/Config/toggles/{AppPassword,EmailMaskSender,EmailSignature,Image,NewsletterSubject,NewsletterTitle,SenderName}Toggle, HD/NewsSource/UpdateNewsSourceForm, widgets/Subscribe/stages/{Confirmation,Email,Language,Name}, lib/ui/organisms/AuthForm |
| texts/Text/Text.svelte | TextTypes + RevealText | text = ""; type: TextType = "paragraph"; block = false; canReveal = false | legacy | 1: MarkdownText |
| texts/RevealText/RevealText.svelte (+ empty .scss) | RevealOnScroll + HTMLTextLettersClassWrapper | text: string; canReveal = false | legacy | 1: Text |
| texts/RevealOnScroll/RevealOnScroll.svelte (+ .scss) | adds .revealed when 50% visible | canReveal = true | legacy | 1: RevealText |
| texts/HTMLTextLettersClassWrapper/... | splits text into per-word spans with staggered delays, renders with {@html} | HTMLText: string. `export const transitionSpeed = .5` (readonly, not a prop) | legacy | 1: RevealText |

### sys/loading, sys/stats

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| loading/LoadingScreen.svelte | full-screen loader with rotating messages | messages: string[] = [] | legacy | 4: STP/E_NewsSource, STP/NewFlow/{Step08_Generate,Step11_Send}, routes/dashboard/+layout.svelte |
| stats/Stat.svelte | Chart.js bar chart | dataCallback: () => StatDataItem[] (required); HEXColor = "#03a9f4"; xText = "Category"; yText = "Total" | legacy | 1: HD/Reports/UserAnalytics (2 instances) |
| stats/LeadStat.svelte | two KPI tiles | leadData: Record<string, Record<string,string>> | legacy | 1 import in HD/Reports/UserAnalytics |

### src/components/{Modal,...}, ThemeChanger, anim

| Path | Kind | Props | Syntax | Importers |
|---|---|---|---|---|
| Modal/Modal.svelte | modal dialog | showModal: Writable<boolean> (required); onChange: (boolean)=>void | legacy | 2: components/ArticleModal, routes/articles/+page.svelte |
| Notification/Notification.svelte + notificationStore.ts | global toast; `ping(title, message)` | none (store-driven) | legacy | component: routes/dashboard/+layout.svelte; store: 6 dashboard/onboarding files (E_NewsSource, Step08_Generate, ManualAddUserForm, BulkAddUserSection, Update/AddNewsSourceForm) |
| LoadingWheel/LoadingWheel.svelte | 3-ring spinner | none | legacy | 1: components/NewsCard |
| SVG/SVG.svelte (+ .scss) | fetches an SVG URL and injects with {@html} | src = "" | legacy | 3: components/Header (only used by /test-checklist), IconButton, Card |
| Container/Container.svelte | white panel that slides away when mobile menu open | none (call site passes `show`, ignored) | legacy | 1: HD/Newspaper/Newspaper.svelte:354 |
| SoftTitle/SoftTitle.svelte | CRT glitch title over a Pexels video | scaleSpeed, videoURL, direction, offset, pushToRead, z, text = "Σxecutions" | legacy | 0 => dead |
| SmoothScrollWrapper/SmoothScrollWrapper.svelte + store.ts | rAF inertia scroller | ease = 0.08; axis: 'y'\|'x'; clamp | legacy | 0 => dead |
| ThemeChanger/ThemeChanger.svelte + theme-store.ts | applies data-theme/density/motion; optional labeled toggle | visible: boolean = false | legacy | 5: routes/+layout (visible=false), components/Header (visible=true, lines 40 and 66), routes/{article,subscribe,subscribe-widget}/+page (visible=false). theme-store also imported by ColorPicker, getColorSuggestions, getConfiguratorSession, selectors/Switch |
| lib/anim/gsap.client.ts | lazy GSAP plugin loader + ScrollSmoother singleton | n/a | ts | 2: lib/anim/useSmoothPage.ts, routes/+page.svelte (getSmoother, refreshAll) |
| lib/anim/useSmoothPage.ts | Svelte action creating ScrollSmoother | (node, options) | ts | imported by routes/+page.svelte:3, never applied (no `use:`) |
| lib/anim/useScrollSection.ts | Svelte action creating ScrollTrigger | (node, options) | ts | imported by routes/+page.svelte:4 and routes/demo/+page.svelte:4, never applied |

### Stylesheets

| File | Imported by |
|---|---|
| src/styles/tokens.scss (@use fonts.scss) | routes/+layout.svelte:2 (once, global) |
| src/styles/global.scss (@use reset.scss) | @use'd inside the `<style>` of 8 components: MenuHalf, HelpContextCard, AuthForm, HelpFaqs, HelpForm, Sidebar, routes/+page, routes/help. Its @font-face blocks and globals are compiled into each of those component CSS bundles (8 copies). |
| src/styles/legal.scss | 0 (dead) |
| src/routes/styles/everything.scss (reset + global + empty standard.scss) | @use'd inside 6 page styles: article, dashboard, demo, subscribe, subscribe-widget, test-checklist (6 copies of the same global CSS) |
| src/lib/styles/centralized-styles.scss | Email, Link, Number, PlainText (styles bare `input`, not `textarea`) |
| src/lib/styles/custom-select-styles.scss | Country, Language, CustomSelect, SearchSelector (11 hex colors) |

## 2. Findings per component

Legend: BUG, A11Y, HARD (hard-coded colors/px), ANIM (per-word/letter), DEP, DEAD, COPY.

### Text animation chain (highest impact)
- ANIM: `sys/texts/HTMLTextLettersClassWrapper/HTMLTextLettersClassWrapper.svelte:25-35` splits every leaf text node into one `<span class="wrapper-letter">` per word with `transitionDelay = log((i+1)(j+1)) * 0.5s`. `RevealOnScroll.scss:5-24` animates each span (opacity 0, translateY 20px, 2 to 2.5s). Chain: MarkdownText -> Text -> RevealText -> RevealOnScroll + HTMLTextLettersClassWrapper. Every MarkdownText (17 importing files, listed above) animates word by word, including dashboard settings toggles (HD/Config/toggles/*), the subscriber widget (widgets/Subscribe/stages/*) and AuthForm. The UX rules forbid this on functional steps.
- BUG: HTMLTextLettersClassWrapper.svelte:14 wraps the work in `setTimeout(..., 1000)`: text is blank for 1s on every render and every prop change.
- BUG/security: HTMLTextLettersClassWrapper.svelte:49 renders with `{@html}` after building HTML from `innerText` of `<span>${text}</span>`; the input is interpolated as HTML at line 15, so any `<`/`&` in translated or user text is parsed as markup.
- BUG: MarkdownText.svelte:101-110 reads the slot's `textContent` only in `onMount`. Content that changes later (language switch, `$t[...]` loading late, store updates) is never re-rendered.
- BUG: MarkdownText.svelte:16 treats `--x--` as italic markup, so text containing a double hyphen is mangled; `*...*` produces italics (`TextTypes.scss:16-28,48-86`), and the UX rules say no italics for instructions.
- A11Y: MarkdownText.svelte:153-155 sets `user-select: none` on all body copy (users cannot copy help text). Hidden duplicate of the slot stays in DOM with display:none (fine for SR) but each word becomes its own inline-block span, which breaks screen reader phrasing in some readers.
- BUG: RevealOnScroll.svelte:55-67 subscribes to the global store without unsubscribing and attaches a scroll listener to every scrollable element in the document (`document.querySelectorAll("*")`) per instance, never removed. With 19 MarkdownText uses this leaks listeners on every dashboard tab switch. If `canReveal` stays false, text stays at opacity 0 forever (invisible copy).
- No reduced-motion handling in these files; only the new global rule in tokens.scss:263-272 neutralizes it.
- HARD: TextTypes.scss:3-8 px units (16 to 30px), colors use legacy `--color-background`/`--color-foreground` (paragraph text = `--color-background`, highlight = `--color-foreground` = accent: "highlight with color inside a sentence", which the UX rules forbid).
- ToggleCard.svelte:27-30 splits `cardTitle` on spaces: first word in paragraph style, rest in accent "highlight". Titles like "example.com ⟫ lead.com" (HD/NewsSource/NewsSource.svelte:100) get split arbitrarily. Not animated, but the same color-highlight problem.
- Outside WS1 (FYI): `components/demo/LetterByLetter.svelte:16` splits into letters (WS2).

### Buttons
- SubmitButton.svelte: BUG `loading` only adds a class, no spinner, no `aria-busy`, button stays clickable (no `disabled` while loading). `active=false` uses `pointer-events: none` (still focusable and keyboard-activatable). No `type` attribute (defaults to submit inside forms). Hover changes padding (layout shift, 18-22). A11Y: no `:focus-visible` style. HARD: `font-size: 18px` (34), `border-radius: 30px`, `margin: 1rem 0; margin-left: auto` baked into the primitive (37-38). Default label "Next" is hard-coded English (8). This is the only button style; there is no secondary/tertiary variant, which the charter requires.
- IconButton.svelte: same issues; `font-size: 18px` (35); icon fetched over network per instance through SVG.svelte; label optional, so icon-only usage has no accessible name.
- ToggleCard.svelte: BUG `.content-wrapper` animates `height: 0 -> auto` (89-96), which does not transition (it snaps). A closed card is only `height: 0`, so its inputs stay in the tab order and keyboard users tab into hidden fields. HARD: `#fffa` background (44), `#333` arrow (80-81) overriding the token-based border declared two lines earlier (75-76). Dark mode: white translucent card on dark surface.
- TransitionButton.svelte: A11Y no accessible name (arrow SVG only); inactive state `opacity: 0; pointer-events: none` but still focusable; infinite pulse animation (106) without reduced-motion. HARD: 24px, 25px offsets.
- Date.svelte: misplaced in buttons/; hard-coded `id="date-input"` (53) duplicates if two instances; DEAD in product.

### Inputs
- Shared pattern (PlainText, Email, Link, lib EmailInput, lib PlainText): A11Y `<label class="input-label">` has no `for` and the input has no `id` (PlainText.svelte:29, Email.svelte:49, Link.svelte:62, EmailInput.svelte:47). The visible label text is `value ? label || placeholder : label`, so when `label` is empty (most call sites) the label is empty until the user types, then shows the placeholder: a floating-label effect that leaves no persistent label. `aria-label={label}` is set to "" in those cases, so fields have no accessible name except the placeholder.
- Email.svelte: BUG the "@" helper button (63) has no `type="button"` (submits an enclosing form) and no accessible name. `onChange` is called with "" while the address is invalid (30), so parents cannot tell "empty" from "half-typed". Error shows while typing (65) which COPY_RULES forbids. Placeholder color is `--color-background` (105) = ink color, so placeholder looks like real text (UX diagnostic complaint). `placeholder` default from `$t` (8) is evaluated once and will not update on language change (same in Link.svelte:9, FileInput.svelte:19-21).
- Link.svelte: BUG typing any character prepends "https://" immediately (32-34) and rewrites the DOM value (39), which moves the caret and makes paste/edit awkward; error shown while typing (73).
- Number.svelte: `color: black` (89) breaks dark mode; `type=number` plus a regex that rejects "-" and "1." mid-typing (37-41); hard-coded `id="number-input"` (65). DEAD in product.
- PlainText.svelte: `isTextarea` branch gets no styles, because centralized-styles.scss only styles `input`. `on:focus`/`on:blur` passed by components/SearchBar/SearchBar.svelte:35-36 are not forwarded (no `on:focus` on the input), so SearchBar's focused state never changes. `autocomplete` is forced to "current-password" for every password field (wrong for "new password" or app passwords).
- TextArea.svelte: fallbacks `#aaa`, `#eee`, `rgba(255,255,255,.1)` (66-109) designed for a dark background; `min-height: 80px`. Uses `--color-accent` which is not a token.
- lib/ui/components/EmailInput.svelte: duplicate of sys Email without the @ button; hard-coded English error "Please enter a valid email." (60); `red` (97-104); `#0004` border.
- lib/ui/components/PlainText.svelte: text color `--color-background` on background `--color-background-inversion` (52-57); duplicate of sys PlainText.
- lib/ui/components/Textarea.svelte: no label support at all, no aria-label; `font-size: 16px` (43).
- Code.svelte: good structure (inputmode numeric, one-time-code on mobile), but desktop boxes use `autocomplete="off"` (161) so iOS/Android/desktop password managers cannot autofill the code; `:root` tokens with 9 hex colors declared inside a component style (175+); `outline: none` x2. Missing English key `code.enterAuthCode` in locales-dashboard/en.ts (falls back to hard-coded English).
- Language.svelte, Country.svelte, CustomSelect.svelte, SearchSelector.svelte (four copies of the same combobox, about 300 lines each): A11Y hard-coded element ids (`language-listbox`, `country-listbox`, `option-listbox`, `custom-listbox`, `*-select-label`). ScheduleTime renders up to 5 CustomSelects on one screen (ScheduleTime.svelte:141-155), so all 5 share `id="option-listbox"` and `id="option-select-label"`: every select is labelled by the first one. `aria-labelledby` references `selected-*-label` ids that do not exist (e.g. SearchSelector.svelte:257). No `aria-activedescendant`, so the highlighted option is not announced. Role combobox sits on the wrapper div instead of the input. Tailwind classes (`text-gray-500`, `w-4 h-4`, `rotate-180`, `px-4 py-2`, SearchSelector.svelte:261-268,307) do nothing because Tailwind is not configured (no postcss/tailwind config, not in vite.config.ts). COPY: hard-coded English "Type to search...", "Select an option", "No options available." (SearchSelector.svelte:244,265,308); default labels "Country", "Language". `defaultSelectedValue`/`defaultLanguageCode` are read only on mount.
- ScheduleTime.svelte: COPY hard-coded English Title Case labels "Month", "Day of Month", "Day of Week", "Hour", "Minute" (142-154) and weekday/month names (around 100-133), not translated. `store.subscribe` (39) never unsubscribed. The visible `<label>` (137) is not associated with anything. cronToNatural.ts has English sentences ("Every minute", "At midnight", 303-327).
- Image.svelte: A11Y the drop zone div has `on:click` with no role/key handler (131-138), duplicated by the inner button (157). Preview `alt="Preview"`. `canReveal=false` hides the whole uploader (128). COPY: does not state format, max size, min size, aspect ratio or where the image appears, which COPY_RULES requires for every upload. HARD: 13 hex, 4 rgba.
- FileInput.svelte: `console.log` of user files (32, 89). Visible text "Choose File" / "or Drop File Here" (Title Case, en.ts). 15 hex colors.
- ColorPicker.svelte: wrapper div with `on:mousedown`/`on:click` and no role (168); nearest-color name displayed in parentheses in English CSS color names (e.g. "(steelblue)") regardless of UI language; large commented-out suggestion panel (185-215+); default comes from legacy brand store.
- Personality.svelte: label without `for` (74); `aria-label="Personality Description"` hard-coded English Title Case (86). 6 hex + 8 rgba.
- Secrets.svelte (500 lines + 193 lines scss, 92 hex colors total): a feature screen living in the primitives folder. COPY: renders an em dash "—" as the empty value (108) and hard-coded "Updated this session" (195); delete button is "✕" with no accessible name (204). Uses localStorage key for session markers.

### Selectors
- selectors/Switch/Switch.svelte: BUG HD/NewsSource/UpdateNewsSourceForm.svelte:234-235 and :247-248 use `on:change={() => handleUpdate()}` but Switch never dispatches `change`; the "include images" and "public" toggles do not auto-save (the `bind:toggled` value changes, the save never runs). A11Y no accessible name (no aria-label/labelledby prop at all), `outline: none` with an empty `&:focus {}` (109-112) = no visible focus. Renders glyphs "○"/"ı" as content. BUG invalid/duplicate SVG: every instance renders `<filter id="goo">` twice (75 and 87, the second outside any `<svg>`), so N switches create 2N elements with the same id. Uses `getContrastColor` on the legacy brand color store (44-46). HARD: px sizes, 50x24.
- lib/ui/components/Switch.svelte: A11Y hard-coded `aria-label="Toggle Period"` (34) on every instance, including AddNewsSourceForm and Billing where it is not a period toggle; declares `:root { --sw-* }` with hex colors from inside a component (56-70), including Tailwind indigo `#4f46e5`, which is not the brand accent.
- Two different Switch components exist (sys and lib) with the same props (toggled, onChange). Merge into one.
- Checkbox.svelte (dead): div role=checkbox; Radio.svelte (dead): BUG each instance owns its own `selectedRadioStore` (15), so radios in a group never unselect each other; `selected` and `name` props unused.
- SearchSelector.svelte: see combobox notes above.
- CollapsibleTags.svelte:8-15: single select (returns [] or [tag]) although named "Tags"; parent nodes cannot be selected. Arrow glyphs "▲/▼" read aloud. HARD: Facebook blue `#1877f2` and 12 other hex colors, 14px/10px fonts (CollapsibleTagNode.svelte:61-102). Tags.svelte/TagNode.svelte same palette, dead in product.
- Card.svelte (dead): BUG `document.querySelector(".card-body")` (18) targets the first card on the page, not this one; outer div is a click target with svelte-ignore a11y comments (37-43).
- JsonViewer.svelte (dead): BUG imports the `Date` component as `Date` (2), shadowing the global, so `val instanceof Date` (16) tests against a Svelte component.

### Feedback, overlays, misc
- Modal.svelte: A11Y no `role="dialog"`, no `aria-modal`, no labelled title, no focus trap or focus return, no Escape handling, backdrop div is clickable without key handler (41), close button "×" has no accessible name (43). Fixed `height: 80vh` (92). HARD: `background: white` (88), `#333`/`#000` (112-117), gradient rgba backdrop.
- Notification.svelte: A11Y no `role="status"`/`aria-live`, so screen readers never hear success/error toasts; no close button. BUG a new notification does not clear the previous timeout (21-28), so it can disappear early; subscription never unsubscribed; display time is 50ms per character (24), e.g. 1.5s for a 30-character toast. No variant (success/error/info). HARD: `#333` text on 20% white glass (81-86): unreadable on dark surfaces.
- LoadingScreen.svelte: BUG `background-color: linear-gradient(...)` (47) is invalid, so the overlay is transparent; `color: white` text over whatever is behind. A11Y no `role="status"`/`aria-live`/`aria-busy`; rotating messages swap every 2s regardless of length. Six infinite clip-path animations, no reduced-motion fallback. HARD: 11 hex colors in the gradient.
- LoadingWheel.svelte: `#3498db`, `#e74c3c`, `#f1c40f` (33-55), no `role="status"`/label.
- SVG.svelte: injects fetched markup with `{@html}` (50) from a URL that may come from localStorage (`localStorage.getItem(src)`, 22); cached forever under `local-${src}` with no versioning (40); `console.log` (28); visible English error text "No source provided for the SVG." / fetch errors (48); `src` changes after mount are ignored. Prefer inline SVG components or `<img>`.
- Container.svelte: ignores the `show` prop passed by Newspaper.svelte:354; `background: white`, `height: 80vh`.
- ThemeChanger.svelte: OK after WS1 rewrite. Notes: visible label is hard-coded English "Dark theme"/"Light theme" (155); with `aria-pressed` the button reads as "Dark theme, pressed", which is ambiguous; the comment points to `$lib/ui/molecules/SettingsMenu.svelte` (8) which does not exist yet. Mounted by root layout plus 3 pages (article, subscribe, subscribe-widget) that are already under the root layout, so 2 instances run on those pages. app.html pre-paint script applies theme and density but not `data-motion` (13-18).
- SoftTitle.svelte (dead): hot-links a Pexels video URL (6-7).
- SmoothScrollWrapper.svelte (dead): em dashes in comments only.
- HelpContextCard.svelte: COPY Title Case "Current Plan" (7); "API Calls", "Projects" usage lines hard-coded English and not related to AIBAN's plan model.
- Tabs.svelte (dead): `#ccc`, `#e0e0e0`, `16px/17px`, hover animates `font-size` and `flex` (layout shift); no `role="tablist"`/`aria-selected`.
- LeadStat.svelte: COPY Title Case "Total Leads", "Total Clicks" (15,19), not translated; `--radius-l` is not a token name (35).
- Stat.svelte: `chart.js/auto` plus `Chart.register(...registerables)` (35) is redundant; `${HEXColor}44` (58, 176) breaks for non 6-digit colors; canvas has no aria-label or text fallback; 4 `console.log/warn` (43,133,151,171). UserAnalytics passes `complementaryColor` (legacy brand store) as HEXColor.

### lib/anim
- gsap.client.ts: `console.log` at import time (3-6) and on every call (37, 58, 79): this runs on the landing page in production. `loadClientPlugins` downloads ScrollTrigger, ScrollSmoother and SplitText together (20-34); SplitText is never used. routes/+page.svelte:32 calls `refreshAll` on every window resize, which triggers that download even though no smoother is created. Spanish comments.
- useSmoothPage.ts / useScrollSection.ts: written as Svelte actions but call `onMount` inside the action body (useSmoothPage.ts:30, useScrollSection.ts:22). Lifecycle functions cannot run inside an action; if anyone applies them with `use:` they throw. Both ignore the in-app "Reduce motion" setting (`data-motion="reduced"`), they only check the OS media query. Imported, never applied.

### Global styles, layout, app.html, package.json
- src/styles/global.scss and src/routes/styles/everything.scss are pulled in with `@use` inside component `<style>` blocks (8 and 6 places), duplicating @font-face rules and resets in many CSS chunks, and adding legacy font families: League Spartan, Jost (4 weights), Poppins, Spartan Black, Kiona (60 to 156 KB TTF each, routes/styles/global.scss:3-20, styles/global.scss:5-35). These compete with the new Lora/Inter WOFF fonts in tokens/fonts.scss. Move globals into the single tokens import and remove per-component `@use` of global files.
- routes/styles/reset.scss:1 `* { box-sizing }` is scoped when compiled in a page `<style>`; the `:global(...)` rules leak globally from 6 pages.
- `outline: none` in 15 WS1 files (Date, Switch x2, Checkbox, Radio, Code, ColorPicker, FileInput, Image, Personality, Secrets, TextArea, EmailInput, lib PlainText, centralized-styles.scss:20) overrides the global `:focus-visible` outline in tokens.scss:274-277; several of them provide no replacement focus style.
- routes/+layout.svelte: fine. `export let data` unused. Header comes from `$lib/ui/organisms/Header.svelte`, which has no theme control.
- app.html: `<html lang="en">` is static while the UI is multilingual; nothing updates `lang` when the language changes (WS6/WS9 may own the store, but the attribute should be set from the root layout).
- package.json: `"name": "A I B A N"` is not a valid npm package name (spaces, capitals). `@sveltejs/adapter-auto` appears in both dependencies (^4) and devDependencies (^6). `"push": "git add -A && git commit -m 'update' && git push"` commits everything, including any untracked secret file. `svelte-preprocess` and `@types/highlight.js` (highlight.js ships its own types) are unnecessary; svelte.config.js uses vitePreprocess.
- Hard-coded color counts (hex/rgba) in WS1 files: Secrets.svelte 69/1, Secrets.scss 23/1, FileInput 15, Image 13/4, CollapsibleTagNode 12, TagNode 13, LoadingScreen 11/3, custom-select-styles.scss 11/4, Code 9/2, Tags 9, Personality 6/8, lib Switch 6/6, Tabs 6, JsonViewer 5, TextArea 4/4, LoadingWheel 4, ToggleCard 3, Modal 2/4, centralized-styles 2/3, Stat 1/3, Notification 1/3. No component outside ThemeChanger.scss uses the charter token names (`--surface-*`, `--text-*`, `--fs-*`, `--space-*`) yet; they use legacy `--color-*` aliases.
- px font sizes: SubmitButton 18px, IconButton 18px, lib Textarea 16px, Tabs 16/17px, Tags/TagNode/CollapsibleTagNode 14/10/16px, SVG.scss 1, TextTypes.scss --unit-1..6 16 to 30px.
- No WS1 component has `prefers-reduced-motion` handling of its own; the global rule in tokens.scss:263-272 is the only guard.

## 3. Dependency usage (src/ only)

| Package | Used by | Verdict |
|---|---|---|
| @polar-sh/sdk | routes/api/portal/+server.ts | keep (server route) |
| @polar-sh/sveltekit | routes/api/{checkout,portal,webhook/polar}/+server.ts | keep |
| @smui/button, card, checkbox, dialog, form-field, icon-button, radio, select, snackbar, textfield, top-app-bar | unused (0 imports, no SMUI CSS) | remove all 11 |
| svelte-material-ui | unused | remove |
| smui | unused | remove |
| @sveltejs/adapter-auto (dependency ^4) | svelte.config.js uses the devDependency ^6 | remove from dependencies |
| @types/highlight.js | unused (types ship with highlight.js 11) | remove |
| aos | unused | remove |
| autoprefixer, postcss | unused (no postcss config) | remove |
| canvas-preset | unused | remove |
| chart.js | sys/stats/Stat.svelte | keep (lazy-load in Reports) |
| dotenv | unused | remove (SvelteKit uses $env) |
| express | unused | remove (server package in a frontend) |
| express-validator | unused | remove |
| felte | unused | remove |
| fuzzysort | Country, Language, CustomSelect, SearchSelector | keep (or native filtering once comboboxes merge) |
| gapi-script | unused | remove |
| google-auth-library | routes/login/+page.server.js, routes/oauth/+server.js, routes/signup/+page.server.js | keep (server-only use is legitimate in +server/+page.server) |
| gsap | lib/anim/gsap.client.ts, lib/anim/useScrollSection.ts (landing only) | keep only if landing animations stay; drop SplitText/ScrollSmoother loading |
| highlight.js | components/common/CodeFormatter.svelte | keep |
| hls.js | unused | remove |
| jsonwebtoken | unused | remove |
| leaflet | unused | remove |
| nearest-color | sys/inputs/ColorPicker | optional (only shows an English color name) |
| node-fetch | unused | remove |
| nodemailer | unused | remove |
| qrcode | components/common/CopyUrlWithQR.svelte | keep |
| quill | HD/Config/toggles/{EmailSignature,InteractiveSignatureEditor}Toggle, STP/NewFlow/Step05_Signature | keep (also loads a CDN stylesheet via https: import) |
| read-excel-file | sys/requests/uploadUserFileChunked.ts | keep |
| scene-preset | unused | remove |
| socket.io-client | components/SocketClient.svelte, components/store.ts | keep |
| svelte-awesome-color-picker | sys/inputs/ColorPicker | keep |
| svelte-calendar | unused | remove |
| svelte-forms-lib | unused | remove |
| tailwindcss | unused (no config, no @tailwind directives); Tailwind class names in 4 combobox files are dead | remove and strip the dead classes |
| three | unused | remove |
| victor | unused | remove |
| zod | lib/ui/organisms/{AuthForm,HelpForm}.svelte | keep |
| devDeps: svelte-preprocess | unused (vitePreprocess) | remove |

Total: 35 of 49 runtime dependencies are unused (14 used). Server-only packages (express, express-validator, nodemailer, jsonwebtoken, dotenv, node-fetch) are not imported anywhere in src.

## 4. Dark-mode toggle, "auto collapse", sidebar labels

Dark mode
- The only visible theme toggle is `<ThemeChanger visible={true} />` in `src/components/Header/Header.svelte:40` and `:66`. That Header is imported only by `src/routes/test-checklist/+page.svelte`. The root layout uses `$lib/ui/organisms/Header.svelte`, which has no theme control, and `src/lib/ui/organisms/Sidebar.svelte` has none either. Result: in the dashboard today there is no visible dark-mode control; the theme follows the OS (ThemeChanger mounted invisibly at routes/+layout.svelte:20).
- `SettingsMenu.svelte` (theme + density + motion, referenced in ThemeChanger.svelte:8) does not exist yet. Recommended home: a labeled "Display" item at the bottom of Sidebar.svelte (WS4 owns Sidebar; WS1 supplies the molecule).

Auto collapse
- Not in the Sidebar. It is a per-panel accordion option rendered by two WS4 components:
  - `HD/AutoCollapseToggle.svelte:30-44`: italic text "Auto collapse is" + "on"/"off" (hard-coded English, lines 32-36) next to an unlabeled `sys/selectors/Switch` (39-44). Used by `HD/Config/Config.svelte:46`, `HD/Config/toggles/VisualToggle.svelte:11`, `HD/Config/toggles/InformationToggle.svelte:12`.
  - `HD/SlotAutoCollapseToggle.svelte:78-93`: same UI (text at 81-85, Switch at 88-93). Used by `HD/NewsSource/NewsSource.svelte:78` and `HD/Developer/NewsSourceDeveloper.svelte:80`.
  - A persisted `autoCollapse: true` field exists in `src/components/store.ts:32,67`, but these components keep their own local `autoCollapse` prop instead.
- The UX diagnostic and COPY_RULES call "auto collapse" unclear. Suggestion: remove the per-panel switch, default to one-open-at-a-time, and if kept, move it into the Display settings menu as "Keep only one section open".

Sidebar (`src/lib/ui/organisms/Sidebar.svelte`)
- Labels (lines 29-41, English values from `src/lib/i18n/locales-dashboard/en.ts:12-20`): group "Dashboard" containing "Profile", "News Sources", "Users", "Reports"; then "Secrets/Developer", "Newspaper", "Billing"; footer link "Log Out" (130).
- Issues to pass to WS4: Title Case labels ("News Sources", "Log Out"); jargon ("Secrets/Developer", "Newspaper"); `aria-label="Primary Navigation"` Title Case (92); the collapse toggle button (95-106) is icon-only with no `aria-label`; "Log Out" is an `<a>` without `href` (130), so it is not keyboard reachable; avatar `alt="User avatar"` hard-coded English.

## 5. Prioritized fixes

P0 (broken behavior, accessibility blockers, things the UX diagnostic calls out)
1. Replace the MarkdownText -> Text -> RevealText -> HTMLTextLettersClassWrapper chain with a static, reactive renderer (same `canReveal` prop accepted and ignored, same `##`, `###`, `**`, `==` syntax; drop `--` and `*` italics). Removes per-word animation from 17 files, the 1s blank delay, the `{@html}` injection, the leaked scroll listeners and `user-select: none`.
2. One Switch primitive (keep `toggled`, `onChange`, add `label`/`aria-label`, `disabled`, and dispatch `change` for the two `on:change` call sites in UpdateNewsSourceForm.svelte:235,248, so include-images and public toggles save again). Replace both sys and lib Switch with it; remove the duplicate `goo` filters and the "Toggle Period" label.
3. Inputs (PlainText, Email, Link, TextArea, EmailInput, lib PlainText): real `<label for>` with generated ids, persistent visible label, placeholder in `--text-3`, input text in `--text-1`, errors only after blur/submit, `type="button"` + aria-label on the "@" button, keep every current prop name (value, placeholder, label, type, isTextarea, rows, disabled, center, onChange, onEnter) and the readonly store exports. Forward focus/blur events (SearchBar).
4. Combobox: one accessible combobox (input role=combobox, aria-activedescendant, unique ids) behind the four existing APIs (Language, Country, CustomSelect, SearchSelector props unchanged). Fixes the 5 duplicated ids in ScheduleTime.
5. Button system: SubmitButton becomes the Button primitive with `variant` primary/secondary/tertiary (default primary), real `loading` (spinner, aria-busy, disabled), `type` prop (default "button"), focus-visible ring, no layout shift, no baked-in margins. Keep `label`, `callback`, `disabled`, `loading`, `active`.
6. Modal: role=dialog, aria-modal, focus trap and return, Escape, labelled close button, tokens. Notification: role=status/aria-live, minimum 5s plus reading-time duration, clear previous timeout, close button, success/error variants. LoadingScreen: fix invalid background, role=status, reduced motion.
7. Visible Display settings (theme, density, reduced motion) in the dashboard: build `$lib/ui/molecules/SettingsMenu.svelte` and request WS4 to mount it in Sidebar.
8. Remove `outline: none` without replacement from the 15 files listed; rely on the global `:focus-visible` token.

P1 (design-system consistency, performance)
9. Convert all WS1 components to token names (`--surface-*`, `--text-*`, `--border-*`, `--fs-*`, `--space-*`, `--radius-*`); remove the ~280 hard-coded hex/rgba values (Secrets, FileInput, Image, Tags, Code, custom-select-styles first) and px font sizes.
10. Stop `@use`-ing src/styles/global.scss and routes/styles/everything.scss inside component/page styles; drop the legacy TTF @font-face blocks (League Spartan, Jost, Poppins, Spartan Black, Kiona) once headings use `--font-display`.
11. Remove the 35 unused dependencies (section 3), fix package name, delete the `push` script, remove adapter-auto duplicate.
12. ToggleCard: single-color title (weight for emphasis), animate with `grid-template-rows` or `<details>`, make closed content inert, tokens. TextTypes: map variants to token sizes, no italic variants for instructions, highlight via weight.
13. lib/anim: remove console logs, do not preload SplitText/ScrollSmoother, honor `data-motion="reduced"`, fix the `onMount`-inside-action pattern or delete the unused actions; remove `refreshAll` on resize in routes/+page.svelte (WS2 file, send request).
14. Image upload: state format, size limits, aspect ratio and where it appears; keyboard-accessible drop zone. FileInput: remove `console.log` of user files.
15. Translate the hard-coded English strings in WS1 files (ScheduleTime labels and weekday/month names, SearchSelector/Country/Language defaults and empty states, LeadStat, HelpContextCard, Personality aria-label, Secrets "Updated this session", ThemeChanger labels, EmailInput error) and add the missing `code.enterAuthCode` key. Fix Title Case keys used by WS1 components in locales-dashboard/en.ts ("Choose File", "or Drop File Here", "Select Image", "Generate Personality", "Create New Access Key", "Revoke Access", "Post Status", "App Password", "Author Name", "Login Username", "Where to Publish", "Publish to Your Website", "Your Website URL", "Save Publish Settings", "Key Generated Successfully", "Developer Required", "Key Snapshot", "Active Connections", "Security Signature") and the em dashes in `webhook.appPasswordHint`, `webhook.baseUrlHint`, `webhook.postStatusDraft`, `webhook.postStatusPublish` and Secrets.svelte:108 (coordinate with WS4/WS9, who own en.ts).
16. SVG.svelte: replace runtime fetch + `{@html}` + localStorage cache with an inline icon set.
17. Code.svelte: `autocomplete="one-time-code"` on the first desktop box; move its `:root` tokens to tokens.scss.
18. app.html / root layout: set `<html lang>` from the active language; apply `data-motion` pre-paint.

P2 (cleanup)
19. Delete dead files after confirming: lib/ui/molecules/Tabs.svelte, selectors/Checkbox, selectors/Radio, selectors/Card/Card.svelte (and the unused `CardComponent` import in NewsSource.svelte:2), selectors/Card/JsonViewer.svelte, buttons/Date, inputs/Number (keep only if test-styles needs it), inputs/ScheduleTime/naturalCronParser.ts, selectors/Tags/{Tags,TagNode}.svelte (only tags-test), SoftTitle, SmoothScrollWrapper (+store.ts), src/styles/legal.scss, routes/styles/standard.scss (empty), texts/RevealText/RevealText.scss (empty), plus the whole reveal chain after P0-1.
20. Move Secrets.svelte (feature) out of the primitives folder (to WS4's dashboard area) and Date out of buttons/.
21. Rebuild routes/test-styles as the living style guide (all primitives, both themes, density, states); delete routes/tags-test and its 139 KB allTags.ts fixture.
22. Container.svelte: accept `show` or remove the prop at the call site; tokens instead of `white`.
23. Migrate primitives to runes (`$props`, `$bindable`) only after the API above is frozen; keep the same prop names, keep `bind:value`, `bind:toggled`, `bind:selectedColor`, `bind:authCode` working.
