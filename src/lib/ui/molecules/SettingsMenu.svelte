<script module lang="ts">
  export interface SettingsMenuLabels {
    trigger: string;
    title: string;
    theme: string;
    light: string;
    dark: string;
    system: string;
    density: string;
    comfortable: string;
    compact: string;
    motion: string;
    reduceMotion: string;
  }

  export const defaultSettingsMenuLabels: SettingsMenuLabels = {
    trigger: 'Display',
    title: 'Display settings',
    theme: 'Theme',
    light: 'Light',
    dark: 'Dark',
    system: 'Match system',
    density: 'Density',
    comfortable: 'Comfortable',
    compact: 'Compact',
    motion: 'Motion',
    reduceMotion: 'Reduce motion'
  };
</script>

<script lang="ts">
  import {
    themePreference,
    densityPreference,
    motionPreference,
    setThemePreference,
    setDensityPreference,
    setMotionPreference,
    type ThemePreference,
    type DensityPreference
  } from '../../../components/ThemeChanger/theme-store';

  interface Props {
    /** Icon only trigger. The full title becomes its accessible name. */
    compact?: boolean;
    placement?: 'top' | 'bottom';
    align?: 'start' | 'end';
    labels?: Partial<SettingsMenuLabels>;
    class?: string;
  }

  let {
    compact = false,
    placement = 'bottom',
    align = 'end',
    labels = {},
    class: className = ''
  }: Props = $props();

  const L = $derived({ ...defaultSettingsMenuLabels, ...labels });

  const uid = $props.id();
  const panelId = `display-${uid}-panel`;
  const titleId = `display-${uid}-title`;
  const themeId = `display-${uid}-theme`;
  const densityId = `display-${uid}-density`;
  const motionId = `display-${uid}-motion`;

  let open = $state(false);
  let root: HTMLDivElement | undefined = $state();
  let trigger: HTMLButtonElement | undefined = $state();
  let panel: HTMLDivElement | undefined = $state();

  const themeOptions = $derived<{ value: ThemePreference; label: string }[]>([
    { value: 'light', label: L.light },
    { value: 'dark', label: L.dark },
    { value: 'system', label: L.system }
  ]);
  const densityOptions = $derived<{ value: DensityPreference; label: string }[]>([
    { value: 'comfortable', label: L.comfortable },
    { value: 'compact', label: L.compact }
  ]);

  function toggle() {
    open = !open;
  }

  function close(returnFocus = true) {
    if (!open) return;
    open = false;
    if (returnFocus) trigger?.focus();
  }

  // Move focus into the panel when it opens.
  $effect(() => {
    if (!open || !panel) return;
    const first = panel.querySelector<HTMLInputElement>('input:checked') ?? panel.querySelector<HTMLInputElement>('input');
    first?.focus();
  });

  // Close on outside click.
  $effect(() => {
    if (!open) return;
    const onPointer = (event: PointerEvent) => {
      if (root && event.target instanceof Node && !root.contains(event.target)) close(false);
    };
    document.addEventListener('pointerdown', onPointer, true);
    return () => document.removeEventListener('pointerdown', onPointer, true);
  });

  function onKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      close();
    }
  }

  function onFocusOut(event: FocusEvent) {
    if (!open) return;
    const next = event.relatedTarget;
    if (next instanceof Node && root?.contains(next)) return;
    if (next === null) return; // focus went to the page body or a click is in progress
    close(false);
  }
</script>

<div
  bind:this={root}
  class="settings placement-{placement} align-{align} {className}"
  onkeydown={onKeydown}
  onfocusout={onFocusOut}
  role="presentation"
>
  <button
    bind:this={trigger}
    type="button"
    class="trigger"
    class:compact
    aria-expanded={open}
    aria-controls={panelId}
    aria-label={compact ? L.title : undefined}
    onclick={toggle}
  >
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M4 7h10M18 7h2M4 17h4M12 17h8" />
      <circle cx="16" cy="7" r="2" />
      <circle cx="10" cy="17" r="2" />
    </svg>
    {#if !compact}
      <span>{L.trigger}</span>
      <svg class="chevron" viewBox="0 0 16 16" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 6.25 8 10.25l4-4" />
      </svg>
    {/if}
  </button>

  <div bind:this={panel} id={panelId} class="panel" role="dialog" aria-labelledby={titleId} hidden={!open}>
    <h2 id={titleId} class="title">{L.title}</h2>

    <div class="group">
      <span id={themeId} class="group-label">{L.theme}</span>
      <div class="segmented cols-3" role="radiogroup" aria-labelledby={themeId}>
        {#each themeOptions as opt (opt.value)}
          <label class="option">
            <input
              type="radio"
              name="{uid}-theme"
              value={opt.value}
              checked={$themePreference === opt.value}
              onchange={() => setThemePreference(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="group">
      <span id={densityId} class="group-label">{L.density}</span>
      <div class="segmented cols-2" role="radiogroup" aria-labelledby={densityId}>
        {#each densityOptions as opt (opt.value)}
          <label class="option">
            <input
              type="radio"
              name="{uid}-density"
              value={opt.value}
              checked={$densityPreference === opt.value}
              onchange={() => setDensityPreference(opt.value)}
            />
            <span>{opt.label}</span>
          </label>
        {/each}
      </div>
    </div>

    <div class="group">
      <span id={motionId} class="group-label">{L.motion}</span>
      <label class="switch-row">
        <span>{L.reduceMotion}</span>
        <input
          type="checkbox"
          role="switch"
          class="switch"
          aria-describedby={motionId}
          checked={$motionPreference === 'reduced'}
          onchange={(e) => setMotionPreference(e.currentTarget.checked ? 'reduced' : 'system')}
        />
      </label>
    </div>
  </div>
</div>

<style>
  .settings {
    position: relative;
    display: inline-block;
  }

  .trigger {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .trigger.compact {
    justify-content: center;
    width: var(--control-h-sm);
    padding: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    .trigger:hover {
      background: var(--surface-2);
      border-color: var(--text-2);
      transition-duration: var(--t-in);
    }
  }

  .trigger:active {
    background: var(--surface-3);
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  /* Expanded: the trigger reads as held down and the chevron turns over. */
  .trigger[aria-expanded='true'] {
    background: var(--surface-2);
    border-color: var(--text-1);
  }

  .trigger:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .icon {
    width: 1.125rem;
    height: 1.125rem;
    flex: none;
  }

  .chevron {
    width: 0.875rem;
    height: 0.875rem;
    flex: none;
    margin-inline-start: calc(-1 * var(--space-1));
    color: var(--text-2);
    transition: transform var(--dur-slow) var(--ease-out);
  }

  .trigger[aria-expanded='true'] .chevron {
    transform: rotate(180deg);
  }

  .panel {
    position: absolute;
    z-index: var(--z-drawer);
    width: min(19rem, calc(100vw - 2 * var(--space-4)));
    padding: var(--space-4);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    background: var(--surface-0);
    color: var(--text-1);
    box-shadow: var(--shadow-3);
    font-family: var(--font-body);
    opacity: 1;
    transform: none;
    transition:
      opacity var(--dur-base) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @starting-style {
    .panel {
      opacity: 0;
      transform: var(--panel-from);
    }
  }

  .panel[hidden] {
    display: none;
  }

  .placement-bottom .panel {
    top: calc(100% + var(--space-2));
    --panel-from: translateY(-0.5rem);
    transform-origin: top right;
  }

  .placement-top .panel {
    bottom: calc(100% + var(--space-2));
    --panel-from: translateY(0.5rem);
  }

  .align-end .panel {
    right: 0;
  }

  .align-start .panel {
    left: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .panel,
    .chevron {
      transition: none;
    }
    .trigger:active,
    .option:active {
      transform: none;
    }
  }

  .title {
    margin: 0 0 var(--space-3);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .group + .group {
    margin-top: var(--space-4);
  }

  .group-label {
    display: block;
    margin-bottom: var(--space-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text-3);
  }

  .segmented {
    display: grid;
    gap: var(--space-1);
    padding: var(--space-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    background: var(--surface-2);
  }

  .cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .option {
    position: relative;
    display: grid;
    place-items: center;
    min-height: var(--control-h-sm);
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    text-align: center;
    line-height: var(--lh-snug);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .option input {
    position: absolute;
    inset: 0;
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  @media (hover: hover) and (pointer: fine) {
    .option:hover:not(:has(input:checked)) {
      color: var(--text-1);
      background: color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
      transition-duration: var(--t-in);
    }
  }

  .option:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  /* Selected: raised paper chip and semibold label, never color alone. */
  .option:has(input:checked) {
    background: var(--surface-0);
    color: var(--text-1);
    font-weight: var(--fw-semibold);
    box-shadow: var(--shadow-1), 0 0 0 1px var(--border-1);
  }

  .option:has(input:focus-visible) {
    box-shadow: var(--focus-ring);
  }

  .switch-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    min-height: var(--control-h-sm);
    font-size: var(--fs-sm);
    color: var(--text-1);
    cursor: pointer;
  }

  .switch {
    appearance: none;
    position: relative;
    flex: none;
    width: 2.75rem;
    height: 1.625rem;
    margin: 0;
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-3);
    cursor: pointer;
    transition:
      background-color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  .switch::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0.1875rem;
    width: 1.25rem;
    height: 1.25rem;
    border-radius: var(--radius-full);
    background: var(--surface-0);
    box-shadow: var(--shadow-1), 0 0 0 0.5px var(--border-2);
    transform: translateY(-50%);
    transition:
      transform var(--dur-base) var(--ease-out),
      width var(--dur-fast) var(--ease-out),
      left var(--dur-fast) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .switch-row:hover .switch:not(:checked) {
      border-color: var(--text-2);
    }
  }

  /* Pressed: the knob stretches toward where it will travel. */
  .switch-row:active .switch::before {
    width: 1.5rem;
    transition-duration: 60ms;
  }
  .switch-row:active .switch:checked::before {
    left: -0.0625rem;
  }

  /* On: ink track; the knob moves to the end (position is the non-color cue). */
  .switch:checked {
    background: var(--text-1);
    border-color: var(--text-1);
  }

  .switch:checked::before {
    transform: translate(1.125rem, -50%);
  }

  .switch:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (forced-colors: active) {
    .trigger:focus-visible,
    .switch:focus-visible,
    .option:has(input:focus-visible) {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .option:has(input:checked) {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }
    .switch {
      border-color: CanvasText;
    }
    .switch::before {
      forced-color-adjust: none;
      background: CanvasText;
    }
    .switch:checked {
      forced-color-adjust: none;
      background: Highlight;
    }
    .switch:checked::before {
      background: HighlightText;
    }
  }
</style>
