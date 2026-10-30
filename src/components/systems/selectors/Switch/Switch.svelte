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

  // Create a writable store for the switch state.
  export const switchStore = writable<boolean>(toggled);

  const dispatch = createEventDispatcher<{ change: boolean }>();
  const fallbackId = `switch-${++switchCount}`;
  $: buttonId = id || fallbackId;
  $: labelId = `${buttonId}-label`;

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
    {disabled}
    on:click={toggle}
  >
    <span class="switch-track" aria-hidden="true">
      <span class="switch-knob"></span>
    </span>
  </button>
  {#if label}
    <label id={labelId} for={buttonId} class="switch-label">{label}</label>
  {/if}
</span>

<style lang="scss">
  .switch-field {
    display: inline-flex;
    align-items: center;
    gap: var(--space-3);

    &.disabled {
      opacity: 0.5;
    }
  }

  .switch {
    --track-w: 2.75rem;
    --track-h: 1.5rem;
    --knob: 1.125rem;
    --gap: 0.1875rem;

    display: inline-flex;
    align-items: center;
    padding: 0;
    border: none;
    background: transparent;
    border-radius: var(--radius-full);
    cursor: pointer;

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled {
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
      border-color var(--dur-base) var(--ease-out);
  }

  .switch-knob {
    position: absolute;
    top: 50%;
    left: var(--gap);
    width: var(--knob);
    height: var(--knob);
    background: var(--surface-1);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-1);
    transform: translateY(-50%);
    transition: transform var(--dur-base) var(--ease-out);
  }

  .switch.toggled {
    .switch-track {
      background: var(--accent);
      border-color: var(--accent);
    }

    .switch-knob {
      transform: translate(calc(var(--track-w) - var(--knob) - 2 * var(--gap) - 2px), -50%);
    }
  }

  .switch:not(:disabled):hover .switch-track {
    border-color: var(--text-2);
  }

  .switch.toggled:not(:disabled):hover .switch-track {
    background: var(--accent-hover);
    border-color: var(--accent-hover);
  }

  .switch-label {
    font-family: var(--font-body);
    font-size: var(--fs-md);
    color: var(--text-1);
    cursor: pointer;
  }

  .disabled .switch-label {
    cursor: not-allowed;
  }
</style>
