# WS11 summary: playbook restyle of every page + micro states (2026-10-30)

Luis asked for every page to follow the Award-Grade Web Playbook 2026 skills, then for the micro-states skill on every interactive element.

## What changed
- Site-wide "Mono" direction in `src/styles/tokens.scss` (white, ink, one family at display scale, ink pill as the only filled action, designed dark theme). Broadsheet (Lora, pine) retired. See DESIGN_SYSTEM.md.
- `src/styles/states.scss`: global micro-states layer (state-layer tokens, hover only on fine pointers, pressed, focus, selected, expanded chevrons, read-only, :user-invalid, dragging, forced colors, reduced motion).
- Button primitive: pill, state layer, press .97, text roll on primary, spinner after 350 ms kept 500 ms, aria-disabled + `disabledReason`. Same pattern in IconButton, Switch, ToggleSwitch, SubmitButton and the legacy controls.
- Header: condenses, hides on scroll down, "Menu" label, full-screen typographic mobile menu, hidden inside the owner dashboard. New `SiteFooter` (full / finale-less / compact). New `+error.svelte` (404 and 5xx).
- Every public page restyled (about, careers, demo, help, pricing, legal with sticky "On this page", 404), auth with a single one-time-code input, subscribe and confirm flows, blog reader, onboarding wizard and tutorial, owner dashboard (narrative line, KPI row, container queries, SaveBar states, bulk select) and admin (environment cue, sticky tables, export states).

## Behaviour changes to know
- Disabled buttons and switches stay focusable (aria-disabled); activation is blocked in JS.
- Sign-in code is one input instead of six boxes (same submit logic).
- Subscribers list: bulk select with "Export selected" and "Remove selected" (confirmation, uses the existing unsubscribe call per row).
- Pricing: Free plan button goes to /start.
- Admin top bar shows Production / Staging / Local from the hostname.

## Checks
`vite build` passes, `svelte-check` 0 errors 0 warnings, 25 unit tests pass, copy lint 0 findings. Screenshots of 16 routes at 1440 and 390, light and dark, no horizontal overflow. Built on a copy in the cloud; run `npm run check && npm run build` once on the Mac.

## Open
- `src/lib/styles/custom-select-styles.scss` and `centralized-styles.scss` still carry old hover and focus rules (overridden per component).
- `src/styles/global.scss` (Meyer reset) is still pulled in by MenuHalf and HelpContextCard.
- Admin strings are hard-coded English, as before.
