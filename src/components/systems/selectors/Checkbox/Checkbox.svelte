<script lang="ts">
  import { writable } from "svelte/store";

  // Props for the custom checkbox component.
  export let checked: boolean = false;
  export let label: string = "";

  // Callback to be invoked when the checkbox state changes.
  export let onChange: (newValue: boolean) => void = () => {};

  // Create a writable store for the checkbox state.
  // Other components can subscribe to this store for updates.
  export const checkboxStore = writable<boolean>(checked);

  // Toggle the checkbox state, update the store, and call onChange.
  function toggle() {
    checked = !checked;
    checkboxStore.set(checked);
    onChange(checked);
  }

  // Allow toggling via keyboard (Enter or Space).
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggle();
    }
  }
</script>

<div
  class="glass-checkbox"
  role="checkbox"
  tabindex="0"
  aria-checked={checked}
  on:click={toggle}
  on:keydown={handleKeyDown}
>
  <span class="checkbox-box" aria-hidden="true">
    {#if checked}
      <!-- Custom checkmark SVG appears when checked -->
      <svg class="checkmark" viewBox="0 0 24 24" focusable="false">
        <path d="M20 6L9 17l-5-5" />
      </svg>
    {/if}
  </span>
  {#if label}
    <span class="checkbox-label">{label}</span>
  {/if}
</div>

<style lang="scss">
  .glass-checkbox {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--space-6);
    padding: var(--space-1) var(--space-3) var(--space-1) var(--space-1);
    border-radius: var(--radius-full);
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

        .checkbox-box {
          border-color: var(--text-2);
        }
      }
    }

    &:active {
      background: color-mix(in srgb, var(--text-1) var(--state-press), transparent);
      transition-duration: 0ms;

      .checkbox-box {
        transform: scale(0.9);
        transition-duration: 60ms;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    .checkbox-box {
      display: flex;
      flex: none;
      justify-content: center;
      align-items: center;
      width: 1.25rem;
      height: 1.25rem;
      background: var(--surface-0);
      border: 1px solid var(--border-2);
      border-radius: var(--radius-sm);
      transition:
        background-color var(--t-state) var(--ease-out),
        border-color var(--t-state) var(--ease-out),
        transform var(--dur-base) var(--ease-out);

      .checkmark {
        width: 0.875rem;
        height: 0.875rem;
        stroke: var(--surface-0);
        stroke-width: 3;
        stroke-linecap: round;
        stroke-linejoin: round;
        fill: none;
        opacity: 0;
        animation: fadeIn var(--dur-base) var(--ease-out) forwards;
      }
    }

    /* Checked: ink fill plus a check mark, never color alone. */
    &[aria-checked="true"] .checkbox-box {
      background: var(--text-1);
      border-color: var(--text-1);
    }

    .checkbox-label {
      font-size: var(--fs-md);
      line-height: var(--lh-snug);
      color: var(--text-1);
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: scale(0.5);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (forced-colors: active) {
    .glass-checkbox .checkbox-box {
      border-color: CanvasText;
    }
    .glass-checkbox[aria-checked="true"] .checkbox-box {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;
    }
    .glass-checkbox .checkbox-box .checkmark {
      stroke: HighlightText;
    }
    .glass-checkbox:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .glass-checkbox:active .checkbox-box {
      transform: none;
    }
    .glass-checkbox .checkbox-box .checkmark {
      animation: none;
      opacity: 1;
    }
  }
</style>
