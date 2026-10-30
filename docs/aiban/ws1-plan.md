# WS1 plan

1. Tokens, fonts, theme (done in the first 30 minutes): `src/styles/tokens.scss`, `fonts.scss`, ThemeChanger, app.html.
2. STRATEGY.md (done, v1) and requests to other workstreams.
3. Primitive library in `src/lib/ui/components/` (new, Svelte 5 runes, token-only styles), built in parallel slices with disjoint files:
   - Slice A, actions and display: Button, IconButton, Badge, Card, Skeleton, EmptyState, StatTile, Progress, Stepper, Tooltip, Spinner.
   - Slice B, form controls: Field, TextField, Textarea, Select, Checkbox, Radio and RadioGroup, Switch, FileUpload. Old `lib/ui/components/{PlainText,EmailInput,Switch,Textarea}` keep their props and get the new look.
   - Slice C, overlays and menus: Dialog (modal), Drawer, Toast and toast store, Tabs, SettingsMenu (Display settings: theme, density, motion). `components/Modal` and `components/Notification` keep their APIs and gain a11y.
   - Slice D, legacy systems primitives in place: SubmitButton (variants, real loading, type), IconButton, ToggleCard (a11y, hidden content out of tab order), systems Switch (dispatches change, label, focus), PlainText/Email/Link/TextArea (persistent labels, hint styles, errors after submit), shared select and input SCSS on tokens, LoadingScreen, LoadingWheel, Container `show`.
   - Slice E, text chain: MarkdownText, Text, RevealText, RevealOnScroll, HTMLTextLettersClassWrapper render static text (no per-word animation, no {@html} of raw text, reactive to language changes, no scroll listener leaks). Same props.
4. Living style guide at `/test-styles` showing every primitive in both themes.
5. Global CSS cleanup: stop the 14 per-component copies of global CSS where the importing file is mine; request others to drop `@use` of global files.
6. Dependencies: list unused packages; removal needs `npm install` on the Mac (no network here), so it is prepared, not executed.
7. DESIGN_SYSTEM.md with props, do and don't for each primitive. Summary.
