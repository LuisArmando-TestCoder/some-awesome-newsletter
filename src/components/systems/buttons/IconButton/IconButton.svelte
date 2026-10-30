<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import Svg from "../../../SVG/SVG.svelte";

  export let disabled: boolean = false;
  export let loading: boolean = false;
  export let active: boolean = true;
  export let label: string = "";
  export let src: string;
  export let callback: MouseEventHandler<HTMLButtonElement> = () => {};
  // Optional: accessible name when it should differ from the visible label.
  export let ariaLabel: string | undefined = undefined;
  /** Why the button is unavailable. Read by screen readers and shown as a tooltip while disabled. */
  export let disabledReason: string | undefined = undefined;

  const reasonId = `icon-btn-${Math.random().toString(36).slice(2, 9)}-why`;

  $: isDisabled = disabled || !active;

  function handleClick(event: Parameters<MouseEventHandler<HTMLButtonElement>>[0]) {
    if (loading || isDisabled) {
      event.preventDefault();
      return;
    }
    callback?.(event);
  }
</script>

<button
  type="button"
  aria-disabled={isDisabled || loading ? "true" : undefined}
  aria-label={ariaLabel || label || undefined}
  aria-busy={loading ? "true" : undefined}
  aria-describedby={isDisabled && disabledReason ? reasonId : undefined}
  title={isDisabled && disabledReason ? disabledReason : undefined}
  class="icon-button {active ? 'active' : 'inactive'}"
  class:loading
  class:is-disabled={isDisabled}
  on:click={handleClick}
>
  <span class="icon" aria-hidden="true">
    <Svg {src} />
  </span>
  {#if label}
    <span class="label">{label}</span>
  {/if}
  {#if isDisabled && disabledReason}<span id={reasonId} class="sr-only">{disabledReason}</span>{/if}
</button>

<style lang="scss">
  .icon-button {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-4) 0 var(--space-1);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--control-h-sm);
      height: var(--control-h-sm);
      flex: none;
      border: 1px solid var(--border-1);
      border-radius: var(--radius-full);
      background: var(--surface-1);
      color: var(--text-1);
      // Legacy SVGs read --color-foreground for their fill.
      --color-foreground: var(--text-1);
      transition:
        background-color var(--t-out) var(--ease-out),
        border-color var(--t-out) var(--ease-out),
        transform var(--dur-base) var(--ease-out);

      :global(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    @media (hover: hover) and (pointer: fine) {
      &:not([aria-disabled="true"]):hover {
        background: var(--surface-2);
        transition-duration: var(--t-in);

        .icon {
          background: var(--text-1);
          border-color: var(--text-1);
          color: var(--surface-0);
          --color-foreground: var(--surface-0);
        }
      }
    }

    &:not([aria-disabled="true"]):active {
      background: var(--surface-3);
      transform: scale(0.97);
      transition-duration: 60ms;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &.is-disabled,
    &.inactive {
      cursor: not-allowed;
      opacity: var(--disabled-opacity);
    }

    &.loading {
      cursor: progress;

      .icon :global(svg) {
        animation: icon-button-spin 1s linear infinite;
      }
    }
  }

  @keyframes icon-button-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (forced-colors: active) {
    .icon-button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .icon-button .icon {
      border-color: CanvasText;
    }
    .icon-button.is-disabled {
      color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .icon-button.loading .icon :global(svg) {
      animation: none;
    }
    .icon-button:active {
      transform: none;
    }
  }
</style>
