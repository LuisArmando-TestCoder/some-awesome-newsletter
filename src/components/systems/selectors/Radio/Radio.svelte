<script lang="ts">
  import { writable } from "svelte/store";

  // Props for the custom radio button.
  export let label: string = "";
  export let value: string | number = "";

  // Callback to be invoked when this radio button is activated.
  export let onChange: (newValue: string | number) => void = () => {};

  // Create a writable store for the radio group selection.
  // When multiple radio buttons import this store, they share the same selected value.
  export const selectedRadioStore = writable<string | number | null>(null);

  // When this radio button is activated, update the store with its value and call onChange.
  function handleClick() {
    selectedRadioStore.set(value);
    onChange(value);
  }
</script>

<button
  type="button"
  class="glass-radio"
  on:click={handleClick}
  role="radio"
  tabindex="0"
  aria-checked={$selectedRadioStore === value}
  on:keydown={(event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleClick();
    }
  }}
>
  <span class="radio-button" aria-hidden="true">
    {#if $selectedRadioStore === value}
      <span class="radio-inner"></span>
    {/if}
  </span>
  {#if label}
    <span class="radio-label">{label}</span>
  {/if}
</button>

<style lang="scss">
  .glass-radio {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--space-6);
    padding: var(--space-1) var(--space-3) var(--space-1) var(--space-1);
    border: none;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-1);
    font-family: var(--font-body);
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
        transition-duration: var(--t-in);

        .radio-button {
          border-color: var(--text-2);
        }
      }
    }

    &:active {
      background: color-mix(in srgb, var(--text-1) var(--state-press), transparent);
      transition-duration: 0ms;

      .radio-button {
        transform: scale(0.9);
        transition-duration: 60ms;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    /* Selected: ink ring with a paper dot, plus the label goes medium. */
    &[aria-checked="true"] {
      .radio-button {
        background: var(--text-1);
        border-color: var(--text-1);
      }

      .radio-label {
        font-weight: var(--fw-medium);
      }
    }
  }

  .radio-button {
    display: flex;
    flex: none;
    justify-content: center;
    align-items: center;
    width: 1.25rem;
    height: 1.25rem;
    border: 1px solid var(--border-2);
    background: var(--surface-0);
    border-radius: var(--radius-full);
    transition:
      border-color var(--t-state) var(--ease-out),
      background-color var(--t-state) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .radio-inner {
    width: 0.5rem;
    height: 0.5rem;
    background: var(--surface-0);
    border-radius: var(--radius-full);
    animation: radioPulse var(--dur-base) var(--ease-out);
  }

  .radio-label {
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  @keyframes radioPulse {
    0% {
      transform: scale(0.5);
      opacity: 0;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .radio-button {
      border-color: CanvasText;
    }
    .glass-radio[aria-checked="true"] .radio-button {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;
    }
    .radio-inner {
      forced-color-adjust: none;
      background: HighlightText;
    }
    .glass-radio:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-radio:active .radio-button {
      transform: none;
    }
  }
</style>
