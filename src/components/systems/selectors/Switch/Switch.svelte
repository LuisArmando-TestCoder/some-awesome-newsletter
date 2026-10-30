<script context="module" lang="ts">
  let switchCount = 0;
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  // Prop: initial state of the switch (default: false)
  export let toggled: boolean = false;
  // Callback to be invoked when the switch state changes.
  export let onChange: (newState: boolean) => void = () => {};

  // Optional props
  /** Visible label rendered next to the switch. */
  export let label: string = "";
  /** Accessible name when there is no visible label. */
  export let ariaLabel: string = "";
  export let disabled: boolean = false;
  export let id: string | undefined = undefined;
  /** Why the switch is unavailable. Read by screen readers and shown next to the label. */
  export let disabledReason: string = "";

  // Create a writable store for the switch state.
  export const switchStore = writable<boolean>(toggled);

  const dispatch = createEventDispatcher<{ change: boolean }>();
  const fallbackId = `switch-${++switchCount}`;
  $: buttonId = id || fallbackId;
  $: labelId = `${buttonId}-label`;
  $: reasonId = `${buttonId}-why`;

  // Keep the store in sync when the parent changes the prop.
  $: switchStore.set(toggled);

  // Toggle function updates both the local state and the store, then notifies listeners.
  function toggle() {
    if (disabled) return;
    toggled = !toggled;
    switchStore.set(toggled);
    onChange(toggled);
    dispatch("change", toggled);
  }
</script>

<span class="switch-field" class:disabled>
  <button
    id={buttonId}
    type="button"
    role="switch"
    class="switch"
    class:toggled
    aria-checked={toggled}
    aria-labelledby={label ? labelId : undefined}
    aria-label={!label && ariaLabel ? ariaLabel : undefined}
    aria-disabled={disabled ? "true" : undefined}
    aria-describedby={disabled && disabledReason ? reasonId : undefined}
    title={disabled && disabledReason ? disabledReason : undefined}
    on:click={toggle}
  >
    <span class="switch-track" aria-hidden="true">
      <span class="switch-knob">
        <svg class="switch-mark" viewBox="0 0 12 12" focusable="false">
          <path d="M2.75 6.25 5 8.5l4.25-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>
  </button>
  {#if label}
    <label id={labelId} for={buttonId} class="switch-label">{label}</label>
  {/if}
  {#if disabled && disabledReason}<span id={reasonId} class="sr-only">{disabledReason}</span>{/if}
</span>

<style lang="scss">
  .switch-field {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);
  }

  .switch {
    --track-w: 2.75rem;
    --track-h: 1.625rem;
    --knob: 1.25rem;
    --gap: 0.1875rem;
    --stretch: 0.25rem;

    display: inline-flex;
    align-items: center;
    min-height: var(--space-5);
    padding: 0;
    border: none;
    background: transparent;
    border-radius: var(--radius-full);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;

    &:focus-visible {
      outline: none;
      box-shadow: none;

      .switch-track {
        box-shadow: var(--focus-ring);
      }
    }

    &[aria-disabled="true"] {
      cursor: not-allowed;
    }
  }

  .switch-track {
    position: relative;
    display: block;
    width: var(--track-w);
    height: var(--track-h);
    background: var(--surface-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      background-color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  .switch-knob {
    position: absolute;
    top: 50%;
    left: var(--gap);
    display: grid;
    place-items: center;
    width: var(--knob);
    height: var(--knob);
    background: var(--surface-0);
    color: var(--text-1);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-1), 0 0 0 0.5px var(--border-2);
    transform: translateY(-50%);
    transition:
      transform var(--dur-base) var(--ease-out),
      width var(--dur-fast) var(--ease-out),
      margin var(--dur-fast) var(--ease-out);
  }

  /* A check rides on the knob when on, so the state never rests on color alone. */
  .switch-mark {
    width: 0.75rem;
    height: 0.75rem;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--dur-fast) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .switch.toggled {
    .switch-track {
      background: var(--text-1);
      border-color: var(--text-1);
    }

    .switch-knob {
      transform: translate(calc(var(--track-w) - var(--knob) - 2 * var(--gap) - 2px), -50%);
    }

    .switch-mark {
      opacity: 1;
      transform: scale(1);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .switch:not([aria-disabled="true"]):hover .switch-track {
      border-color: var(--text-2);
      box-shadow: inset 0 0 0 100vmax color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
    }

    .switch.toggled:not([aria-disabled="true"]):hover .switch-track {
      border-color: var(--text-1);
      box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-1) 16%, transparent);
    }
  }

  /* Pressed: the knob stretches toward where it will travel. */
  .switch:not([aria-disabled="true"]):active .switch-knob {
    width: calc(var(--knob) + var(--stretch));
    transition-duration: 60ms;
  }
  .switch.toggled:not([aria-disabled="true"]):active .switch-knob {
    margin-left: calc(-1 * var(--stretch));
  }

  .switch-label {
    font-family: var(--font-body);
    font-size: var(--fs-md);
    color: var(--text-1);
    cursor: pointer;
  }

  .disabled {
    .switch-track {
      opacity: var(--disabled-opacity);
    }

    .switch-label {
      color: var(--text-2);
      cursor: not-allowed;
    }
  }

  @media (forced-colors: active) {
    .switch-track {
      border-color: CanvasText;
    }
    .switch-knob {
      forced-color-adjust: none;
      background: CanvasText;
    }
    .switch.toggled .switch-track {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;
    }
    .switch.toggled .switch-knob {
      background: HighlightText;
      color: Highlight;
    }
    .switch:focus-visible .switch-track {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .switch-knob,
    .switch-mark {
      transition: none;
    }
    .switch:active .switch-knob {
      width: var(--knob);
      margin-left: 0;
    }
  }
</style>
