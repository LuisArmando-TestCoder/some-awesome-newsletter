# WS1 summary: strategy and design system

## What changed
- **Strategy.** `STRATEGY.md` sets the customer (owners of small service businesses reached through BNI), the job to be done, the name "Automations", 8 preset automations tied to WS8's recipe ids, onboarding inputs and defaults, activation (first issue to a real subscriber within 7 days), the north star (weekly readers reached), retention and expansion loops, and the information architecture with plain labels: Home, Automations, Sources, Subscribers, Reports, Blog, Settings. Each of WS2 to WS9 has a list of concrete next steps.
- **Tokens and theme.** `src/styles/tokens.scss` holds every name in charter section 4 in light and dark, plus density and reduced motion. Old `--c-*`, `--space-*` and `--color-*` names still work. Theme follows the operating system until the person picks one, with no flash on load.
- **Visual direction "Broadsheet".** Warm paper, ink text, one pine green accent, Lora headlines and Inter for the interface. Both fonts are self-hosted and split so extended scripts load only when needed. The Jost face that pointed at a Poppins file is fixed.
- **Primitives.** 23 new components in `$lib/ui/components` and 2 in `$lib/ui/molecules`, plus about 25 existing components rebuilt with their props kept. They meet WCAG 2.2 AA in structure: real controls, labels, focus rings, live regions and native dialogs.
- **Diagnostic fixes in WS1 files.** Text no longer animates word by word. A labeled Display menu (theme, density, reduce motion) replaces the dark-mode circle and "auto collapse". Upload fields state format, size, ratio and where the image appears. Errors show after submit. Hints are smaller and lighter than input text, and nothing is italic.
- **Bugs fixed.** The "include images" and "public" switches did not save. The loading screen was transparent. Radios in a group did not unselect each other. Toasts were not announced. Modal had no focus handling. Link inputs added https:// while you typed. The text chain leaked scroll listeners. The animation helpers threw if used. Two TypeScript errors in cronToNatural.ts.
- **Docs.** `DESIGN_SYSTEM.md` gives the props, do and don't for each primitive. `/test-styles` shows them all live.

## What is left
- Other workstreams still need to apply the requests in `requests/2,3,4,5,9,10.md`: swap in SettingsMenu and the new primitives, remove `@use` of global stylesheets in 14 files, drop the accordions, fix ArticleModal's double overlay, rename labels in every locale.
- Unused dependencies: run `bash scripts/ws1-remove-unused-deps.sh` on the Mac. The manual equivalent is:
  `npm uninstall @smui/button @smui/card @smui/checkbox @smui/dialog @smui/form-field @smui/icon-button @smui/radio @smui/select @smui/snackbar @smui/textfield @smui/top-app-bar svelte-material-ui smui aos three leaflet hls.js felte svelte-forms-lib svelte-calendar tailwindcss autoprefixer postcss canvas-preset scene-preset victor express express-validator nodemailer jsonwebtoken dotenv node-fetch gapi-script @types/highlight.js && npm uninstall --save-prod @sveltejs/adapter-auto && npm install -D @sveltejs/adapter-auto@^6`
  WS6 also asked for `isomorphic-dompurify`.
- Secrets.svelte, Image, FileInput, ColorPicker, Code, Personality and the Tags tree (`systems/inputs` and `selectors`) still hold hard-coded colors. They are next in line to move onto tokens or the new FileUpload.

## Risks
- `npm run build` and the official `npm run check` could not run here (macOS node_modules in a Linux shell, no network). The type check used a svelte-preprocess harness and found 0 errors in WS1 files. A real build on the Mac is still required.
- Nothing was checked in a browser. Check `/test-styles`, the dashboard and the subscribe pages in both themes.
- Colors change app-wide through the aliases. Screens that mixed legacy variables in unusual ways may look different. The dashboard no longer tints itself with the customer's brand color.
- SubmitButton without a callback now submits its form, and with a callback it does not. This removed a double save in the news source forms.

## How to verify
1. On the Mac: `npm run check` and `npm run build` in `some-awesome-newsletter`.
2. Open `/test-styles`. Switch the theme, density and reduce motion in the Display menu. Tab through every control and look for a visible focus ring. Open the dialog and drawer, press Escape, and confirm focus returns.
3. In the dashboard, flip "include images" on a news source and reload: it should stay saved.
4. Set the OS to dark mode with no saved choice: the app should load dark without a flash.

## Decisions for Luis
Answered on 2026-10-30:
1. Free plan: translation and voice stay on free (recorded in STRATEGY.md section 7). Limits and prices unchanged.
2. Polar: stays until Luis tells WS6.
3. Sending domain: Luis is verifying it.
4. Unused packages: on the Mac, run `bash scripts/ws1-remove-unused-deps.sh` (preview first with `--dry-run`). It backs up package.json and package-lock.json to `_aiban_backups/deps-<time>/`, re-checks that nothing imports each package, uninstalls them, removes the duplicate adapter-auto, adds `isomorphic-dompurify` for WS6, then runs `npm run check` and `npm run build` and prints the undo command if the build fails.
