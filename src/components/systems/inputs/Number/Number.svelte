<script lang="ts">
  import { writable } from "svelte/store";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props for the number input.
  export let value: string = "";
  export let placeholder: string = "";
  export let label: string = "";

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};
  // Callback to be invoked when Enter is pressed.
  export let onEnter: (isValid: boolean) => void = () => {};

  // Create a writable store for the number input value.
  export const numberStore = writable(value);

  // Track validation state.
  let valid = false;

  // Unique ids so several number fields can share a page.
  const controlId = `number-input-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${controlId}-error`;
  $: invalid = !valid && value !== "";

  // Checks if the string is a valid number.
  function isValidNumber(str: string): boolean {
    // Consider empty string as valid for now (optional)
    if (str === "") return true;
    // Check for a valid numeric pattern (supports optional minus and decimals)
    const regex = /^-?\d*(\.\d+)?$/;
    return regex.test(str) && !isNaN(parseFloat(str));
  }

  // Validate number on input, update the store, and call the onChange callback.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value.trim();

    // Ensure that only valid number characters are allowed.
    // If the value doesn't match our numeric regex, simply return early.
    const regex = /^-?\d*(\.\d+)?$/;
    if (!regex.test(value)) {
      // If invalid, reset the input to the previous valid value.
      target.value = value.slice(0, -1);
      return;
    }

    // Update validity flag.
    valid = value === "" || isValidNumber(value);

    // Update store and call the change callback.
    numberStore.set(value);
    onChange(value);
  }

  // If Enter is pressed, call onEnter with the current validity state.
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // Uncomment the following line to prevent default form submission if needed:
      // event.preventDefault();
      onEnter(valid);
    }
  }
</script>

<div class="number-input-wrapper">
  {#if label}<label class="input-label" for={controlId}>{label}</label>{/if}
  <input
    id={controlId}
    type="number"
    bind:value
    {placeholder}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    aria-label={label ? undefined : placeholder || undefined}
    aria-invalid={invalid ? "true" : undefined}
    aria-describedby={invalid ? errorId : undefined}
    class:invalid
  />
  {#if invalid}
    <p class="error-message" id={errorId}><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{$t['number.pleaseEnterAValidNumber']}</span></p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";

  .number-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    color: var(--text-1);
    text-align: center;
    font-variant-numeric: tabular-nums;
  }

  /* Mono micro states on top of the shared field styles (tokens only). */
  input {
    caret-color: var(--text-1);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  /* Empty sits on the quiet surface, filled and focused on paper. */
  input:not(:placeholder-shown),
  input:focus {
    background: var(--surface-0);
  }

  /* The shared hover applies on touch too; keep it to fine pointers. */
  @media (hover: none), (pointer: coarse) {
    input:hover:not(:disabled):not(:focus) {
      border-color: var(--border-2);
    }
  }

  input:focus {
    border-color: var(--text-1);
  }


  input:disabled {
    color: var(--text-2);
    opacity: var(--disabled-opacity);
  }

  input.invalid,
  input.invalid:focus,
  input:user-invalid {
    border-color: var(--danger);
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  input:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  input:-webkit-autofill:focus {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  input:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }

  .error-message {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  @media (forced-colors: active) {
    input {
      border-color: FieldText;
    }
    input:focus {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .error-message {
      color: CanvasText;
    }
  }
</style>
