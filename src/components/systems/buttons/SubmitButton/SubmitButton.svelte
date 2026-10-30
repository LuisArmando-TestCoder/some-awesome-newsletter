<script context="module" lang="ts">
  // Shared default so we can tell whether a call site passed its own callback.
  const noop = () => {};
</script>

<script lang="ts">
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

<button
  type={resolvedType}
  disabled={isDisabled}
  aria-busy={loading ? "true" : undefined}
  aria-disabled={loading ? "true" : undefined}
  aria-label={ariaLabel || undefined}
  class="submit-button variant-{variant} align-{align} {active ? 'active' : 'inactive'}"
  class:loading
  class:full-width={fullWidth}
  on:click={handleClick}
>
  {#if loading}
    <span class="spinner" aria-hidden="true"></span>
  {/if}
  <span class="label">{label}</span>
</button>

<style lang="scss">
  .submit-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--control-pad-x);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    text-align: center;
    cursor: pointer;
    user-select: none;
    white-space: nowrap;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

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

    &.variant-primary {
      background: var(--accent);
      color: var(--accent-contrast);
      box-shadow: var(--shadow-1);

      &:not(:disabled):not(.loading):hover {
        background: var(--accent-hover);
      }
    }

    &.variant-secondary {
      background: var(--surface-1);
      color: var(--text-1);
      border-color: var(--border-2);

      &:not(:disabled):not(.loading):hover {
        background: var(--surface-2);
      }
    }

    &.variant-tertiary {
      background: transparent;
      color: var(--text-link);
      padding: 0 var(--space-2);

      &:not(:disabled):not(.loading):hover {
        text-decoration: underline;
        text-underline-offset: 0.2em;
      }
    }

    &.variant-danger {
      background: var(--danger);
      color: var(--text-inverse);

      &:not(:disabled):not(.loading):hover {
        background: var(--danger-hover);
      }
    }

    &:disabled,
    &.inactive {
      cursor: not-allowed;
      opacity: 0.5;
      box-shadow: none;
    }

    &.loading {
      cursor: progress;
    }
  }

  .spinner {
    width: 1em;
    height: 1em;
    flex: none;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: submit-button-spin 0.8s linear infinite;
  }

  @keyframes submit-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner {
      animation: none;
      border-right-color: currentColor;
      opacity: 0.6;
    }
  }
</style>
