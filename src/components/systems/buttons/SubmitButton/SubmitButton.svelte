<script context="module" lang="ts">
  // Shared default so we can tell whether a call site passed its own callback.
  const noop = () => {};
</script>

<script lang="ts">
  import { onDestroy } from "svelte";
  import type { MouseEventHandler } from "svelte/elements";

  // Legacy props (keep names and defaults)
  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let active: boolean = true;
  export let label: string = "Next";
  export let callback: MouseEventHandler<HTMLButtonElement> = noop;

  // Optional props
  export let variant: "primary" | "secondary" | "tertiary" | "danger" = "primary";
  /**
   * Native button type. When omitted, a button without a callback acts as a form
   * submit button (legacy behavior used by forms), otherwise it is type="button".
   */
  export let type: "button" | "submit" | undefined = undefined;
  export let fullWidth: boolean = false;
  export let align: "end" | "start" | "none" = "end";
  export let ariaLabel: string | undefined = undefined;
  /** Why the button is unavailable. Read by screen readers and shown as a tooltip while disabled. */
  export let disabledReason: string | undefined = undefined;

  const reasonId = `submit-${Math.random().toString(36).slice(2, 9)}-why`;

  // Pending UI: block repeats at once, show the spinner only after 350 ms, keep it at least 500 ms.
  const SHOW_DELAY = 350;
  const MIN_VISIBLE = 500;
  let showSpinner = false;
  let shownAt = 0;
  let spinTimer: ReturnType<typeof setTimeout> | undefined;
  $: syncSpinner(loading);
  function syncSpinner(isLoading: boolean) {
    clearTimeout(spinTimer);
    if (isLoading) {
      spinTimer = setTimeout(() => {
        showSpinner = true;
        shownAt = performance.now();
      }, SHOW_DELAY);
    } else if (showSpinner) {
      spinTimer = setTimeout(
        () => (showSpinner = false),
        Math.max(0, MIN_VISIBLE - (performance.now() - shownAt))
      );
    }
  }
  onDestroy(() => clearTimeout(spinTimer));

  $: resolvedType = type ?? (callback === noop ? "submit" : "button");
  $: isDisabled = disabled || !active;

  function handleClick(event: Parameters<MouseEventHandler<HTMLButtonElement>>[0]) {
    if (loading || isDisabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    callback?.(event);
  }
</script>

<!-- aria-disabled instead of disabled: it stays focusable so people can learn why; handleClick blocks it. -->
<button
  type={resolvedType}
  aria-busy={loading ? "true" : undefined}
  aria-disabled={loading || isDisabled ? "true" : undefined}
  aria-label={ariaLabel || undefined}
  aria-describedby={isDisabled && disabledReason ? reasonId : undefined}
  title={isDisabled && disabledReason ? disabledReason : undefined}
  class="submit-button variant-{variant} align-{align} {active ? 'active' : 'inactive'}"
  class:loading
  class:is-disabled={isDisabled}
  class:is-spinning={showSpinner}
  class:full-width={fullWidth}
  on:click={handleClick}
>
  <span class="label">{label}</span>
  {#if showSpinner}
    <span class="spinner-wrap" aria-hidden="true"><span class="spinner"></span></span>
  {/if}
  {#if isDisabled && disabledReason}<span id={reasonId} class="sr-only">{disabledReason}</span>{/if}
</button>

<style lang="scss">
  .submit-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-5);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    letter-spacing: -0.01em;
    line-height: var(--lh-tight);
    text-align: center;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    /* State layer: hover 8%, focus 10%, pressed 12% of the content color. */
    &::before {
      content: "";
      position: absolute;
      inset: -1px;
      border-radius: inherit;
      background: currentColor;
      opacity: 0;
      pointer-events: none;
      transition: opacity var(--t-out) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      &:not([aria-disabled="true"]):hover::before {
        opacity: 0.08;
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible:not([aria-disabled="true"])::before {
      opacity: 0.1;
    }

    &:not([aria-disabled="true"]):active {
      transform: scale(0.97);
      transition-duration: 60ms;

      &::before {
        opacity: 0.12;
        transition-duration: 0ms;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &.align-end {
      margin: var(--space-4) 0;
      margin-left: auto;
    }

    &.align-start {
      margin: var(--space-4) 0;
      margin-right: auto;
    }

    &.align-none {
      margin: 0;
    }

    &.full-width {
      display: flex;
      width: 100%;
      margin-left: 0;
      margin-right: 0;
    }

    /* Primary: the one solid ink pill per view. */
    &.variant-primary {
      background: var(--accent);
      color: var(--accent-contrast);

      @media (hover: hover) and (pointer: fine) {
        &:not([aria-disabled="true"]):hover {
          background: var(--accent-hover);
        }
      }
    }

    &.variant-secondary {
      background: var(--surface-0);
      color: var(--text-1);
      border-color: var(--border-2);

      @media (hover: hover) and (pointer: fine) {
        &:not([aria-disabled="true"]):hover {
          border-color: var(--text-2);
        }
      }
    }

    &.variant-tertiary {
      background: transparent;
      color: var(--text-link);
      padding: 0 var(--space-2);
      text-decoration: underline;
      text-decoration-thickness: 1px;
      text-decoration-color: transparent;
      text-underline-offset: 0.2em;

      &::before {
        display: none;
      }

      @media (hover: hover) and (pointer: fine) {
        &:not([aria-disabled="true"]):hover {
          text-decoration-color: currentColor;
        }
      }
    }

    &.variant-danger {
      background: var(--danger);
      color: var(--accent-contrast);

      @media (hover: hover) and (pointer: fine) {
        &:not([aria-disabled="true"]):hover {
          background: var(--danger-hover);
        }
      }
    }

    /* Unavailable: muted but readable, still focusable. */
    &.is-disabled,
    &.inactive {
      cursor: not-allowed;
      opacity: var(--disabled-opacity);
      box-shadow: none;
    }

    /* Busy: keeps its width; the spinner sits over the hidden label after 350 ms. */
    &.loading {
      cursor: progress;
    }

    &.is-spinning .label {
      visibility: hidden;
    }
  }

  .spinner-wrap {
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }

  .spinner {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: submit-button-spin 0.7s linear infinite;
  }

  @keyframes submit-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (forced-colors: active) {
    .submit-button {
      border-color: ButtonText;
    }
    .submit-button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .submit-button.is-disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .submit-button:active {
      transform: none;
    }
    .spinner {
      animation: none;
      border-right-color: currentColor;
      opacity: 0.6;
    }
  }
</style>
