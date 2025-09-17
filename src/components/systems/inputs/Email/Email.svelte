<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Props for the email input.
  export let value: string = "";
  export let placeholder: string = "Enter your email...";
  export let label: string = "";
  export let onEnter: (isValid: boolean) => void = () => {};
  export let disabled: boolean = false;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the email input value.
  export const emailStore = writable(value);

  // Track validation state.
  let valid = false;

  // Validate email format on input, update the store, and call onChange.
  function handleInput(event: Event | null, newValue?: string) {
    const target = event?.target as HTMLInputElement;
    value = target?.value?.trim?.() || (newValue as string);
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    emailStore.set(value);

    // Call onChange with empty string if invalid or empty, otherwise with the value
    onChange(valid ? value : "");
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      // If you want to prevent the default form submission (if inside a <form>), uncomment:
      // event.preventDefault();
      onEnter(valid);
    }
  }

  onMount(() => {
    // Initialize the store with the initial value.
    emailStore.set(value);
    handleInput(null, value);
  });
</script>

<div class="email-input-wrapper">
  <label class="input-label"
    >{value ? label || placeholder : label}</label
  >
  <div class="input-container">
    <input
      type="email"
      bind:value
      {placeholder}
      on:input={handleInput}
      on:keydown={handleKeyDown}
      aria-label={label}
      class:invalid={!valid && value !== ""}
      {disabled}
    />
    <button class="at-button" on:click={() => (value += "@")}>@</button>
  </div>
  {#if !valid && value !== ""}
    <span class="error-message">Please enter a valid email.</span>
  {/if}
</div>

<style lang="scss">
  @import "../../../../lib/styles/centralized-styles.scss";

  .email-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 0.5rem;
  }

  .input-container {
    display: flex;
    align-items: center;
    width: 100%;
    position: relative;
  }

  input {
    text-align: center;
    width: 100%;
  }

  .at-button {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.2rem;
    color: var(--color-primary);
  }

  input::placeholder {
    color: var(--color-background);
  }
</style>
