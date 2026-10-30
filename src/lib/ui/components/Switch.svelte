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
  /** Why the switch is unavailable. Read by screen readers and shown under the label. */
  export let disabledReason: string = "";

  // Create a writable store for the switch state.
  export const switchStore = writable<boolean>(toggled);

  const dispatch = createEventDispatcher<{ change: boolean }>();
  const autoId = `switch-${++switchCount}`;
  $: controlId = id ?? autoId;
  $: descId = `${controlId}-desc`;
  $: reasonId = `${controlId}-why`;
  $: describedBy =
    [description ? descId : "", disabled && disabledReason ? reasonId : ""].filter(Boolean).join(" ") ||
    undefined;

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
    aria-describedby={describedBy}
    aria-disabled={disabled ? "true" : undefined}
    on:click={toggle}
  >
    <span class="switch__track" aria-hidden="true">
      <span class="switch__knob">
        <svg class="switch__mark" viewBox="0 0 12 12" focusable="false">
          <path d="M2.75 6.25 5 8.5l4.25-5" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </span>
    </span>
  </button>
  {#if label || description || (disabled && disabledReason)}
    <span class="switch__text">
      {#if label}<label class="switch__label" for={controlId}>{label}</label>{/if}
      {#if description}<span id={descId} class="switch__description">{description}</span>{/if}
      {#if disabled && disabledReason}<span id={reasonId} class="switch__description">{disabledReason}</span>{/if}
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

  /* The button is the 44px-wide hit area; the track is drawn inside it. */
  .switch__button {
    --_w: 2.75rem;
    --_h: 1.625rem;
    --_knob: 1.25rem;
    --_gap: 0.1875rem;
    --_travel: calc(var(--_w) - var(--_knob) - 2 * var(--_gap) - 2px);
    --_stretch: 0.25rem;
    position: relative;
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
    touch-action: manipulation;

    &:focus-visible {
      outline: none;
      box-shadow: none;

      .switch__track {
        box-shadow: var(--focus-ring);
      }
    }

    &[aria-disabled='true'] {
      cursor: not-allowed;
    }
  }

  .switch__track {
    position: relative;
    display: block;
    width: var(--_w);
    height: var(--_h);
    background: var(--surface-3);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      background-color var(--dur-base) var(--ease-out),
      border-color var(--dur-base) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  .switch__knob {
    position: absolute;
    top: 50%;
    left: var(--_gap);
    display: grid;
    place-items: center;
    width: var(--_knob);
    height: var(--_knob);
    background: var(--surface-0);
    border-radius: var(--radius-full);
    box-shadow: var(--shadow-1), 0 0 0 0.5px var(--border-2);
    color: var(--text-1);
    transform: translate(0, -50%);
    transition:
      transform var(--dur-base) var(--ease-out),
      width var(--dur-fast) var(--ease-out),
      margin var(--dur-fast) var(--ease-out);
  }

  /* A check rides on the knob when on, so the state never rests on color alone. */
  .switch__mark {
    width: 0.75rem;
    height: 0.75rem;
    opacity: 0;
    transform: scale(0.6);
    transition:
      opacity var(--dur-fast) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .switch__button:not([aria-disabled='true']):hover .switch__track {
      border-color: var(--text-2);
      box-shadow: inset 0 0 0 100vmax color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
    }
    .switch__button--on:not([aria-disabled='true']):hover .switch__track {
      border-color: var(--text-1);
      box-shadow: none;
    }
  }

  /* Pressed: the knob stretches toward where it will travel. */
  .switch__button:not([aria-disabled='true']):active .switch__knob {
    width: calc(var(--_knob) + var(--_stretch));
    transition-duration: 60ms;
  }
  .switch__button--on:not([aria-disabled='true']):active .switch__knob {
    margin-left: calc(-1 * var(--_stretch));
  }

  .switch__button--on {
    .switch__track {
      background: var(--text-1);
      border-color: var(--text-1);
    }

    .switch__knob {
      transform: translate(var(--_travel), -50%);
    }

    .switch__mark {
      opacity: 1;
      transform: scale(1);
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
    .switch__track {
      opacity: var(--disabled-opacity);
    }

    .switch__label {
      color: var(--text-2);
      cursor: not-allowed;
    }
  }

  @media (forced-colors: active) {
    .switch__track {
      border-color: CanvasText;
    }
    .switch__knob {
      forced-color-adjust: none;
      background: CanvasText;
    }
    .switch__button--on .switch__track {
      forced-color-adjust: none;
      background: Highlight;
      border-color: Highlight;
    }
    .switch__button--on .switch__knob {
      background: HighlightText;
      color: Highlight;
    }
    .switch__button:focus-visible .switch__track {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .switch--disabled .switch__track {
      border-color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .switch__knob,
    .switch__mark {
      transition: none;
    }
    .switch__button:active .switch__knob {
      width: var(--_knob);
      margin-left: 0;
    }
  }
</style>
