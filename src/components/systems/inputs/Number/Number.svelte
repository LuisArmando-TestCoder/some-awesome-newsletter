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
  <label class="input-label" for="number-input">{label}</label>
  <input
    id="number-input"
    type="number"
    bind:value
    {placeholder}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    aria-label={label}
    class:invalid={!valid && value !== ""}
  />
  {#if !valid && value !== ""}
    <span class="error-message">{$t['number.pleaseEnterAValidNumber']}</span>
  {/if}
</div>

<style lang="scss">
  @import "../../../../lib/styles/centralized-styles.scss";

  .number-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    color: black;
    text-align: center;
  }

  input.invalid {
    border-color: var(--color-danger);
    box-shadow: 0 0 10px -2px var(--color-danger);
  }

  .error-message {
    color: var(--color-danger);
  }
</style>
