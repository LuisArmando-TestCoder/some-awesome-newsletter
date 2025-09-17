<script lang="ts">
  import { writable } from "svelte/store";

  // Props for the plain text input.
  export let value: string = "";
  export let placeholder: string = "";
  export let label: string = "";
  export let type: "text" | "password" | "email" | "number" | "tel" | "url" = "text"; // Add type prop
  export let isTextarea: boolean = false;
  export let rows: number = 3;
  export let disabled: boolean = false;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the plain text input value.
  export const textStore = writable(value);

  // Update the store as the user types, then call onChange.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    textStore.set(value);
    onChange(value);
  }
</script>

<div class="text-input-wrapper">
  <label class="input-label">{value ? label || placeholder : label}</label>
  {#if isTextarea}
    <textarea
      bind:value
      {placeholder}
      on:input={handleInput}
      aria-label={label}
      {rows}
      {disabled}
    />
  {:else}
    <input
      {type}
      bind:value
      {placeholder}
      on:input={handleInput}
      aria-label={label}
      autocomplete={type === 'password' ? 'current-password' : undefined}
      {disabled}
    />
  {/if}
</div>

<style lang="scss">
  @import "../../../../lib/styles/centralized-styles.scss";

  .text-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
