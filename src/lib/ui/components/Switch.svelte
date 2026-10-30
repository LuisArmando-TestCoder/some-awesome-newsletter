<script lang="ts" module>
  let switchCount = 0;
</script>

<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import { writable } from "svelte/store";

  // Prop: initial state of the switch (default: false)
  export let toggled: boolean = false;

  // Callback to be invoked when the switch state changes.
  export let onChange: (newState: boolean) => void = () => {};

  /** Visible text next to the switch. Also its accessible name. */
  export let label: string = "";
  /** Accessible name when there is no visible label, e.g. "Bill yearly". */
  export let ariaLabel: string = "";
  /** Smaller text under the label. */
  export let description: string = "";
  export let id: string | undefined = undefined;
  export let disabled: boolean = false;

  // Create a writable store for the switch state.
  export const switchStore = writable<boolean>(toggled);

  const dispatch = createEventDispatcher<{ change: boolean }>();
  const autoId = `switch-${++switchCount}`;
  $: controlId = id ?? autoId;
  $: descId = `${controlId}-desc`;

  // Toggle function updates both the local state and the store, then calls onChange.
  function toggle() {
    if (disabled) return;
    toggled = !toggled;
    switchStore.set(toggled);
    onChange(toggled);
    dispatch("change", toggled);
  }
</script>

<span class="switch" class:switch--disabled={disabled}>
  <button
    {...$$restProps}
    id={controlId}
    type="button"
    role="switch"
    class="switch__button"
    class:switch__button--on={toggled}
    aria-checked={toggled}
    aria-label={label ? undefined : ariaLabel || undefined}
    aria-describedby={description ? descId : undefined}
    {disabled}
    on:click={toggle}
  >
    <span class="switch__track" aria-hidden="true">
      <span class="switch__knob"></span>
    </span>
  </button>
  {#if label || description}
    <span class="switch__text">
      {#if label}<label class="switch__label" for={controlId}>{label}</label>{/if}
      {#if description}<span id={descId} class="switch__description">{description}</span>{/if}
    </span>
  {/if}
</span>

<style lang="scss">
  .switch {
    display: inline-flex;
    align-items: flex-start;
    gap: var(--space-3);
    font-family: var(--font-body);
  }

  .switch__button {
    display: inline-flex;
    flex: none;
    align-items: center;
    min-height: var(--space-5);
    margin: 0;
    padding: 0;
    background: transparent;
    border: 0;
    border-radius: var(--radius-full);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;

    &:focus-visible {
      outline: none;

      .switch__track {
        box-shadow: var(--focus-ring);
      }
    }

    &:disabled {
      cursor: not-allowed;
    }
  }

  .switch__track {
    position: relative;
    display: block;
    width: 2.75rem;
    height: var(--space-5);
    background: var(--surface-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      background-color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);
  }

  .switch__knob {
    position: absolute;
    top: 50%;
    left: 0.1875rem;
    width: 1.125rem;
    height: 1.125rem;
    background: var(--surface-1);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-1);
    transform: translateY(-50%);
    transition: transform var(--dur-base) var(--ease-out);
  }

  .switch__button:hover .switch__track {
    border-color: var(--text-3);
  }

  .switch__button--on {
    .switch__track,
    &:hover .switch__track {
      background: var(--accent);
      border-color: var(--accent);
    }

    .switch__knob {
      background: var(--accent-contrast);
      transform: translate(1.125rem, -50%);
    }
  }

  .switch__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    padding-top: 0.125rem;
  }

  .switch__label {
    color: var(--text-1);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    cursor: pointer;
  }

  .switch__description {
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
  }

  .switch--disabled {
    .switch__track,
    .switch__button--on .switch__track {
      background: var(--surface-2);
      border-color: var(--border-1);
    }

    .switch__button--on .switch__knob {
      background: var(--surface-1);
    }

    .switch__label,
    .switch__description {
      color: var(--text-3);
      cursor: not-allowed;
    }
  }
</style>
