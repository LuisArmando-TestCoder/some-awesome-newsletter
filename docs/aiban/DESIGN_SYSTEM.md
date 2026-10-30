# AIBAN design system

Owner: WS1. Status: tokens, fonts, theme and the primitive library are live. Live examples: `/test-styles` (noindex).

## How to use it
- Tokens live in `src/styles/tokens.scss`. The root layout imports it once, so every page has them. Do not `@use` it again in components.
- In component styles use only `var(--token)`. No raw hex colors, px font sizes or ad hoc shadows.
- Old names (`--c-*`, `--space-xs..xxl`, `--color-*`, `--font-title`, `--radius-s`, `--shadow-sm`...) still work. They are aliases. New code uses the new names.
- Theme: `data-theme="light|dark"` on `<html>`. With no saved choice the theme follows the operating system. `data-density="compact"` and `data-motion="reduced"` come from the Display settings menu.

## Direction: "Mono" (since 2026-10-30, WS11)
Award-Grade Web Playbook 2026, applied site-wide. White page, near-black ink (#1d1d1f), greys for structure, a designed dark theme (#0a0a0b page, not an inversion). One family (SF Pro on Apple, self-hosted Inter elsewhere) used at extreme display scale next to quiet captions. `--accent` is the primary CTA fill (ink pill) and nothing else is filled with it. Links are ink with an underline. Focus is blue (`--focus-color`). Depth comes from thin borders; shadows only for things that float. The old "Broadsheet" (Lora + pine) is retired; Lora files stay in `static/fonts` but nothing references them.

New tokens: `--step-hero`, `--step-display`, `--step-chapter`, `--tracking-display`, `--lh-display`, `--section-pad`, `--gutter`, `--container-xl`, `--surface-glass`, `--text-muted-large`, `--radius-2xl`, `--dur-reveal`, `--stagger`, `--ease-spring`, `--header-h-condensed`, `--measure-legal`. Page furniture classes: `.page-hero`, `.page-eyebrow`, `.page-title`, `.page-lede`, `.rise`, `.rise-2`, `.rise-3`.

### Micro states (src/styles/states.scss)
Every interactive element follows three axes: interaction (hover, focus-visible, pressed, dragged), selection (checked, mixed, selected, expanded, current) and availability (disabled, read-only, busy, success, invalid). Priority: invalid > busy > disabled > pressed > focus > selected > hover. Tokens: `--state-hover` 8%, `--state-focus` 10%, `--state-press` 12%, `--state-drag` 16%, `--disabled-opacity`, `--t-in` 120ms, `--t-out` 200ms, `--t-state` 180ms. `states.scss` gives zero-specificity defaults; components draw their own and must be at least as good. Rules: hover only inside `(hover: hover) and (pointer: fine)`; pressed lands in 60 ms (`scale(.97)`); never color alone for selected or error; prefer `aria-disabled` plus a `disabledReason` over `disabled`; spinners appear after 350 ms and stay 500 ms; success is announced with `role="status"`; errors show only after blur or submit, with border, icon and text; forced-colors and reduced-motion fallbacks everywhere.

### Shared chrome
`Header` (combo nav, condenses after 40px, hides on scroll down after 150px, "Menu" label, full-screen typographic mobile menu, hidden inside the owner dashboard), `SiteFooter` (variants `full`, `finale-less`, `compact`; chosen in `src/routes/+layout.svelte`), `src/routes/+error.svelte` (404 and 5xx).

## Tokens
| Group | Names | Notes |
|---|---|---|
| Surfaces | `--surface-0` page, `--surface-1` card, `--surface-2` hover/raised, `--surface-3`, `--surface-inverse`, `--surface-overlay` | |
| Text | `--text-1`, `--text-2`, `--text-3` (hints, placeholders, still 5:1), `--text-inverse`, `--text-link` | Input value uses `--text-1` at `--fs-md`. Hints use `--text-3` at `--fs-sm`. |
| Brand and state | `--accent`, `--accent-hover`, `--accent-contrast`, `--accent-soft`, `--success`, `--warning`, `--danger`, `--danger-hover`, `--info`, each with `-soft` | `--brand-sky` is the old logo blue, for illustration only. |
| Lines | `--border-1` decorative, `--border-2` input edges (3:1), `--focus-ring` (box-shadow), `--focus-color` | |
| Type | `--font-display` Lora, `--font-body` Inter, `--font-mono`; `--fs-xs` to `--fs-4xl` (fluid); `--lh-tight`, `--lh-snug`, `--lh-normal`; `--fw-regular/medium/semibold/bold`; `--tracking-tight`, `--tracking-caps`, `--measure` | |
| Space | `--space-1` 4px to `--space-10` 128px (4, 8, 12, 16, 24, 32, 48, 64, 96, 128) | |
| Radius | `--radius-sm` 6, `--radius-md` 10, `--radius-lg` 16, `--radius-xl` 24, `--radius-full` | |
| Elevation | `--shadow-1`, `--shadow-2`, `--shadow-3` | |
| Motion | `--ease-out`, `--ease-in-out`, `--dur-fast` 120ms, `--dur-base` 200ms, `--dur-slow` 320ms | Become 0 with reduced motion. |
| Controls | `--control-h` (44px, 36px compact), `--control-h-sm`, `--control-pad-x`, `--row-pad-y`, `--card-pad` | Density aware. |
| Layout | `--container-sm/md/lg`, `--header-h`, `--sidebar-w`, `--sidebar-collapsed-w`, `--z-header/drawer/modal/toast/tooltip` | |

All text pairs meet WCAG 2.2 AA (4.5:1) in both themes. Checked pairs: text-1, text-2, text-3 and accent on surface-0 and surface-1; accent-contrast on accent; each state color on white and on the dark page.

## Fonts
Self-hosted in `static/fonts/aiban/` (OFL). Each face has a core Latin file and an extended file (Latin Ext, Greek, Cyrillic, Vietnamese) that loads only when needed. Arabic, Hebrew, CJK, Thai and Devanagari fall back to system fonts through the token stacks. The `Jost` face that pointed at a Poppins file is fixed.

## Primitives

Status: stable (v1, 2026-10-30). WS4 and others can switch from local copies. Import new primitives from `$lib/ui/components` (barrel `index.ts`). They use Svelte 5 runes, take `class`, and spread other attributes onto their main element. All visible strings come from props, so pass translated text.

### Actions
| Component | Key props | Do | Don't |
|---|---|---|---|
| `Button` | `variant` primary, secondary, tertiary, danger, ghost (primary); `size` sm, md, lg; `type` (button); `href` (renders a link); `loading`, `loadingLabel`; `disabled`; `fullWidth`; `iconStart`, `iconEnd`, `children` snippets; `onclick` | One primary per view. Secondary for the alternative. Tertiary for low-stakes links like "Skip this one". Danger only for destructive actions. | Two primaries side by side. Color-only meaning. |
| `IconButton` | `label` (required, becomes aria-label and tooltip); `icon` or `children`; `variant` ghost, secondary; `size`; `tooltip` (true) | Toolbars and row actions. | Icon buttons for the main action of a page. |
| `Spinner` | `size`; `label` ("Loading", hidden); `announce` (adds role=status) | Inside buttons and small areas. | A spinner for whole pages; use Skeleton. |
| Legacy `SubmitButton` | `label`, `callback`, `disabled`, `loading`, `active` plus new `variant`, `type`, `fullWidth`, `align` (end), `ariaLabel` | Existing screens. New code uses `Button`. | `active={false}` to hide a button; it is now a real disabled state. |

`SubmitButton` type rule: with a `callback` it is `type="button"`, without one it submits its form. Pass `type` to override.

### Form controls
| Component | Key props | Notes |
|---|---|---|
| `Field` | `label`, `hint`, `error`, `required`, `optional`, `hideLabel`; children snippet gets `{id, describedBy, invalid}` | Wrap any custom control so it gets a label, hint and error. |
| `TextField` | `value` (bindable), `label`, `type`, `placeholder`, `hint`, `error`, `required`, `optional`, `prefix`, `suffix`, `size` | Password fields get a Show/Hide button. |
| `Textarea` | `value`, `label`, `hint`, `error`, `rows` (4), `placeholder` | Autosizes. |
| `Select` | `value` (bindable), `label`, `options` `{value, label, disabled?}[]`, `placeholder`, `hint`, `error` | Native select, styled. Use for up to about 15 options; use the Language combobox for long lists. |
| `Checkbox` | `checked`, `indeterminate` (bindable), `label`, `labelContent` snippet, `description`, `error` | Whole row is the target. |
| `RadioGroup`, `Radio` | `value` (bindable), `legend`, `options` `{value, label, description?}[]`, `orientation`, `hint`, `error`, `onchange` | Use for 2 to 5 visible choices. |
| `Switch` | `toggled`, `onChange` (legacy API kept), `label`, `ariaLabel`, `description`, `disabled`; dispatches `change` | Instant on/off settings, like turning an automation on. Always give a `label` or `ariaLabel`. |
| `FileUpload` | `label`, `accept`, `maxSizeMb`, `minWidth`, `minHeight`, `requirements`, `usage`, `files` (bindable), `previewUrl`, `onfiles`, `onremove` | Always fill `requirements` (format, size, ratio) and `usage` (where it appears). It checks type, size and pixel size itself. |

Rules: value text is `--fs-md` in `--text-1`; hints and placeholders are `--fs-sm` or `--text-3`. Pass `error` only after the person submits or leaves the field. Mark `optional` instead of writing "(optional)", and say the default in the hint ("If you skip this, we send every Monday at 9:00").

Legacy inputs in `src/components/systems/inputs/` (PlainText, Email, Link, TextArea, Language, Country, ScheduleTime) keep their props and stores, and gained `hint`, `error`, `required`, `autocomplete`, `id`, persistent labels and unique ids. `Link` adds https:// when the field loses focus, not while typing.

### Display
| Component | Key props | Notes |
|---|---|---|
| `Card` | `as`, `padding` none, sm, md, lg; `title`, `headingLevel`, `description`; `href` or `onclick` (whole card clickable); `header`, `footer`, `children` | With `href`, keep other links in the footer only. |
| `Badge` | `tone` neutral, accent, success, warning, danger, info; `dot` | The text must say the status. |
| `StatTile` | `label`, `value` (pre-formatted), `hint`, `delta` `{value, direction, good?}`, `loading`, `href` | Delta value without a sign; the arrow carries direction. |
| `Progress` | `value`, `max`, `label`, `hideLabel`, `tone`, `showValue`, `valueText` | |
| `Stepper` | `steps` `{label, description?}[]`, `current` (0-based), `orientation`, `onselect` | Completed steps are clickable only with `onselect`. |
| `Skeleton` | `width`, `height`, `radius`, `lines` | Hidden from screen readers; set aria-busy on the region. |
| `EmptyState` | `title`, `description`, `icon`, `actions` snippets, `compact` | Say what will appear here and the next step. |
| `Tooltip` | `text`, `placement`; children snippet gets `{describedBy}` | Put `aria-describedby={describedBy}` on the trigger. Never put links inside. |

### Overlays, navigation, feedback
| Component | Key props | Notes |
|---|---|---|
| `Dialog` | `open` (bindable), `title`, `description`, `size`, `dismissible`, `onclose`, `footer` snippet | Native `<dialog>`: focus trap, Escape, focus return. Always a real title. |
| `Drawer` | Dialog props plus `side` right, left, bottom | Run details, filters, long forms. |
| `Tabs` (molecules) | `tabs` `{id, label, badge?, disabled?}[]`, `active` (bindable), `variant` underline, pill, `label`, `panel` snippet | Replaces accordions for settings (diagnostic k, v). Arrow keys move between tabs. |
| `toast` + `Toaster` | `toast.success(message)`, `toast.error(...)`, `toast.info`, `toast.warning`, `toast.show({title, message, tone, duration, action})` | The root layout mounts one Toaster. Errors are announced assertively. Legacy `ping()` forwards here. |
| `Modal` (components/Modal) | `showModal` store, `onChange`, plus `title`, `labelledBy` | Legacy API on a native dialog. Don't add your own overlay or close button inside. |
| `SettingsMenu` (molecules) | `compact`, `placement`, `align`, `labels` | "Display" menu: Theme (Light, Dark, Match system), Density, Reduce motion. Replaces the dark-mode circle and "auto collapse". |
| `ThemeChanger` | `visible` | Mounted once by the root layout; applies the saved preferences to `<html>`. |

### Text
`MarkdownText` renders its slot statically and updates when the text changes (language switch). Supported: `## `, `### `, `**bold**`, `==strong==` and `*emphasis*` (both shown as weight, never color or italics). `--x--` is plain text now. No per-word animation anywhere; `canReveal` only fades the whole block in.

### Motion
Use `--dur-fast` or `--dur-base` with `--ease-out` for state changes (hover, open, close). Never animate text word by word. Landing page scroll effects use `src/lib/anim` actions, which switch themselves off under reduced motion.

## Rules from the UX diagnostic
- One primary, one secondary and one tertiary (text link) button style, everywhere.
- Input text is larger and darker than hint and placeholder text. Instructions are never italic.
- Emphasize words with weight, never with a color change inside a sentence.
- No per-word animations on functional screens. Animate only to show a change.
- Navigation always shows where you are.
- Theme, density and motion live in one labeled Display settings menu.
