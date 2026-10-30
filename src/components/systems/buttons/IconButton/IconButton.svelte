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
  disabled={isDisabled}
  aria-label={ariaLabel || label || undefined}
  aria-busy={loading ? "true" : undefined}
  class="icon-button {active ? 'active' : 'inactive'}"
  class:loading
  on:click={handleClick}
>
  <span class="icon" aria-hidden="true">
    <Svg {src} />
  </span>
  {#if label}
    <span class="label">{label}</span>
  {/if}
</button>

<style lang="scss">
  .icon-button {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-3) 0 var(--space-1);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    cursor: pointer;
    user-select: none;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out);

    .icon {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: var(--control-h-sm);
      height: var(--control-h-sm);
      flex: none;
      border-radius: var(--radius-full);
      background: var(--accent-soft);
      color: var(--accent);
      // Legacy SVGs read --color-foreground for their fill.
      --color-foreground: var(--accent);
      transition: background-color var(--dur-fast) var(--ease-out);

      :global(svg) {
        width: 1.25rem;
        height: 1.25rem;
      }
    }

    &:not(:disabled):hover {
      background: var(--surface-2);

      .icon {
        background: var(--accent);
        color: var(--accent-contrast);
        --color-foreground: var(--accent-contrast);
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled,
    &.inactive {
      cursor: not-allowed;
      opacity: 0.5;
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

  @media (prefers-reduced-motion: reduce) {
    .icon-button.loading .icon :global(svg) {
      animation: none;
    }
  }
</style>
