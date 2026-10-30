<!-- WS4. Labeled on/off switch (role="switch"). The label is always visible text. -->
<script lang="ts">
  import { onDestroy } from "svelte";
  export let checked = false;
  export let label: string;
  export let hideLabel = false;
  export let disabled = false;
  export let busy = false;
  export let onchange: ((value: boolean) => void) | null = null;
  /** Why the switch is unavailable. Read by screen readers and shown as a tooltip while disabled. */
  export let disabledReason: string | null = null;

  const reasonId = `tsw-${Math.random().toString(36).slice(2, 9)}-why`;

  // Busy: block repeats at once, show the spinner only after 350 ms, then keep it 500 ms (no flash).
  const SHOW_DELAY = 350;
  const MIN_VISIBLE = 500;
  let showSpinner = false;
  let shownAt = 0;
  let timer: ReturnType<typeof setTimeout> | undefined;
  $: syncSpinner(busy);
  function syncSpinner(isBusy: boolean) {
    clearTimeout(timer);
    if (isBusy) {
      timer = setTimeout(() => {
        showSpinner = true;
        shownAt = performance.now();
      }, SHOW_DELAY);
    } else if (showSpinner) {
      timer = setTimeout(() => (showSpinner = false), Math.max(0, MIN_VISIBLE - (performance.now() - shownAt)));
    }
  }
  onDestroy(() => clearTimeout(timer));

  function toggle() {
    if (disabled || busy) return;
    checked = !checked;
    onchange?.(checked);
  }
</script>

<button
  type="button"
  role="switch"
  aria-checked={checked}
  aria-label={hideLabel ? label : undefined}
  aria-busy={busy || undefined}
  aria-disabled={disabled ? "true" : undefined}
  aria-describedby={disabled && disabledReason ? reasonId : undefined}
  title={disabled && disabledReason ? disabledReason : undefined}
  class="tsw"
  class:on={checked}
  class:is-disabled={disabled}
  class:is-spinning={showSpinner}
  on:click={toggle}
>
  <span class="tsw__track" aria-hidden="true">
    <span class="tsw__thumb">
      <svg class="tsw__mark" viewBox="0 0 12 12" focusable="false"><path d="M2.75 6.25 5 8.5l4.25-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" /></svg>
      <span class="tsw__spin"></span>
    </span>
  </span>
  {#if !hideLabel}<span class="tsw__label">{label}</span>{/if}
  {#if disabled && disabledReason}<span id={reasonId} class="sr-only">{disabledReason}</span>{/if}
</button>

<style lang="scss">
  .tsw {
    --_knob: 18px;
    --_stretch: 4px;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    background: none;
    border: 0;
    padding: var(--space-1);
    margin: calc(var(--space-1) * -1);
    font: inherit;
    font-size: var(--fs-sm);
    color: var(--text-1);
    cursor: pointer;
    border-radius: var(--radius-full);
    min-height: 32px;
    -webkit-tap-highlight-color: transparent;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &.is-disabled { cursor: not-allowed; }
    &.is-disabled .tsw__track { opacity: var(--disabled-opacity); }
    &.is-disabled .tsw__label { color: var(--text-2); }
    &[aria-busy="true"] { cursor: progress; }
  }
  .tsw__track {
    position: relative;
    width: 40px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--surface-3);
    box-shadow: inset 0 0 0 1px var(--border-2);
    transition:
      background-color var(--dur-base) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
    flex-shrink: 0;
  }
  .tsw__thumb {
    position: absolute;
    top: 3px;
    left: 3px;
    display: grid;
    place-items: center;
    width: var(--_knob);
    height: var(--_knob);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    box-shadow: var(--shadow-1), 0 0 0 0.5px var(--border-2);
    transition:
      transform var(--dur-base) var(--ease-out),
      width var(--dur-fast) var(--ease-out),
      margin var(--dur-fast) var(--ease-out);
  }
  .tsw__mark {
    grid-area: 1 / 1;
    width: 11px;
    height: 11px;
    opacity: 0;
    transform: scale(0.6);
    transition: opacity var(--dur-fast) var(--ease-out), transform var(--dur-base) var(--ease-out);
  }
  .tsw__spin {
    grid-area: 1 / 1;
    width: 10px;
    height: 10px;
    border: 1.5px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    opacity: 0;
  }

  @media (hover: hover) and (pointer: fine) {
    .tsw:not(.is-disabled):not([aria-busy="true"]):hover .tsw__track {
      box-shadow: inset 0 0 0 1px var(--text-2), inset 0 0 0 100vmax color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
    }
    .on:not(.is-disabled):not([aria-busy="true"]):hover .tsw__track { box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-1) 16%, transparent); }
  }

  /* Pressed: the thumb stretches toward where it will travel. */
  .tsw:not(.is-disabled):not([aria-busy="true"]):active .tsw__thumb { width: calc(var(--_knob) + var(--_stretch)); transition-duration: 60ms; }
  .on:not(.is-disabled):not([aria-busy="true"]):active .tsw__thumb { margin-left: calc(-1 * var(--_stretch)); }

  /* On: ink track, thumb at the end with a check (never color alone). */
  .on .tsw__track { background: var(--text-1); box-shadow: none; }
  .on .tsw__thumb { transform: translateX(16px); }
  .on .tsw__mark { opacity: 1; transform: scale(1); }

  /* Busy: a small spinner replaces the check after 350 ms. */
  .is-spinning .tsw__mark { opacity: 0; }
  .is-spinning .tsw__spin { opacity: 1; animation: tsw-rotate 0.7s linear infinite; }
  @keyframes tsw-rotate { to { transform: rotate(360deg); } }

  @media (forced-colors: active) {
    .tsw__track { border: 1px solid CanvasText; }
    .tsw__thumb { forced-color-adjust: none; background: CanvasText; }
    .on .tsw__track { forced-color-adjust: none; background: Highlight; }
    .on .tsw__thumb { background: HighlightText; color: Highlight; }
    .tsw:focus-visible { outline: 2px solid CanvasText; outline-offset: 2px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .tsw__thumb, .tsw__mark { transition: none; }
    .tsw:active .tsw__thumb { width: var(--_knob); margin-left: 0; }
    .is-spinning .tsw__spin { animation: none; border-right-color: currentColor; opacity: 0.6; }
  }
</style>
