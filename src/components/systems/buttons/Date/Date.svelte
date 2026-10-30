<script lang="ts">
  import { writable } from "svelte/store";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props for the date input.
  export let value: string = "";
  export let placeholder: string = ""; // Note: some browsers may not show placeholder for type="date"
  export let label: string = "";

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};
  // Callback to be invoked when Enter is pressed.
  export let onEnter: (isValid: boolean) => void = () => {};

  // Create a writable store for the date input value.
  export const dateStore = writable(value);

  // Track validation state.
  let valid = true;

  // Unique ids so several date fields can share a page.
  const controlId = `date-input-${Math.random().toString(36).slice(2, 9)}`;
  const errorId = `${controlId}-error`;
  $: invalid = !valid && value !== "";

  // Checks if the string is a valid date.
  function isValidDate(str: string): boolean {
    if (str === "") return true;
    const timestamp = Date.parse(str);
    return !isNaN(timestamp);
  }

  // Validate date on input, update the store, and call the onChange callback.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value?.trim();

    // Consider an empty string as valid.
    valid = value === "" || isValidDate(value);

    dateStore.set(value);
    onChange(value);
  }

  // If Enter is pressed, call onEnter with the current validity state.
  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // Prevent default if needed (e.g., within a form)
      // event.preventDefault();
      onEnter(valid);
    }
  }
</script>

<div class="date-input-wrapper">
  {#if label}<label class="input-label" for={controlId}>{label}</label>{/if}
  <input
    id={controlId}
    type="date"
    bind:value
    {placeholder}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    aria-label={label ? undefined : placeholder || undefined}
    aria-invalid={invalid ? "true" : undefined}
    aria-describedby={invalid ? errorId : undefined}
    class:invalid
    class:filled={value !== ""}
  />
  <div class="error-region" aria-live="polite">
    {#if invalid}
      <p id={errorId} class="error-message">
        <svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
        <span>{$t['date.validDate']}</span>
      </p>
    {/if}
  </div>
</div>

<style lang="scss">
  .date-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
    font-family: var(--font-body);
  }

  .input-label {
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  input {
    box-sizing: border-box;
    width: 100%;
    min-height: var(--control-h);
    margin: 0;
    padding: 0 var(--control-pad-x);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    color: var(--text-2);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-variant-numeric: tabular-nums;
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &.filled,
    &:focus {
      background: var(--surface-0);
      color: var(--text-1);
    }

    &::-webkit-calendar-picker-indicator {
      cursor: pointer;
      opacity: 0.6;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
      &:hover::-webkit-calendar-picker-indicator {
        opacity: 1;
      }
    }

    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &.invalid,
    &.invalid:hover,
    &:user-invalid {
      border-color: var(--danger);
    }
  }

  .error-region:not(:has(.error-message)) {
    margin-top: calc(-1 * var(--space-2));
  }

  .error-message {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--danger);
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
    input:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .error-message {
      color: CanvasText;
    }
  }
</style>
