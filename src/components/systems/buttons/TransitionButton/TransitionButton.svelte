<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  // Define whether the button is active or inactive
  export let active: boolean;
  export let direction: -1 | 1;
  export let callback: MouseEventHandler<HTMLButtonElement>;
  // Optional accessible name. Defaults to "Next step" or "Previous step".
  export let label: string = "";

  $: accessibleName = label || (direction < 0 ? "Previous step" : "Next step");
</script>

<div class="transition-button {direction < 0 ? 'previous' : 'next'}">
  <button
    type="button"
    class:active
    class:inactive={!active}
    disabled={!active}
    aria-hidden={active ? undefined : "true"}
    tabindex={active ? undefined : -1}
    aria-label={accessibleName}
    title={accessibleName}
    on:click={(event) => active && callback?.(event)}
  >
    <span class="arrow" aria-hidden="true">
      <svg width="24" height="24" viewBox="0 0 24 24" focusable="false">
        <path d="M12 16l-6-6h12z" />
      </svg>
    </span>
  </button>
</div>

<style lang="scss">
  .transition-button {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100vh;
    display: grid;
    place-items: center;
    justify-content: center;
    pointer-events: none;

    @media (max-width: 1024px) {
      &.previous button {
        top: var(--space-5);
        transform: rotate(180deg);
      }

      &.next button {
        bottom: var(--space-5);
        transform: rotate(0deg);
      }
    }

    @media (min-width: 1025px) {
      &.previous button {
        left: var(--space-5);
        transform: rotate(90deg);
      }

      &.next button {
        right: var(--space-5);
        transform: rotate(-90deg);
      }
    }
  }

  button {
    position: absolute;
    min-height: var(--control-h);
    padding: var(--space-2) var(--space-8);
    background: var(--surface-glass);
    backdrop-filter: blur(12px) saturate(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-2);
    color: var(--text-2);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      opacity var(--dur-base) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      scale var(--dur-base) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--surface-0);
        border-color: var(--border-2);
        color: var(--text-1);
        transition-duration: var(--t-in);
      }
    }

    /* scale (not transform) so the rotation set per side is kept. */
    &:active {
      scale: 0.96;
      transition-duration: 60ms;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &.active {
      pointer-events: all;
      opacity: 1;
    }

    &.inactive {
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
    }

    .arrow {
      display: flex;
      justify-content: center;
      align-items: center;

      svg {
        width: 1.5rem;
        height: 1.5rem;

        path {
          fill: currentColor;
          animation: arrow-pulse 2s var(--ease-in-out) infinite;
        }
      }
    }
  }

  @media (forced-colors: active) {
    button {
      border-color: ButtonText;
    }
    button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @keyframes arrow-pulse {
    0% {
      transform: translateY(-5px);
      opacity: 0;
    }
    15% {
      transform: translateY(-5px);
      opacity: 1;
    }
    75% {
      transform: translateY(2.5px);
      opacity: 1;
    }
    100% {
      transform: translateY(2.5px);
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    button .arrow svg path {
      animation: none;
    }
    button:active {
      scale: 1;
    }
  }

  :global(:root[data-motion='reduced']) button .arrow svg path {
    animation: none;
  }
</style>
