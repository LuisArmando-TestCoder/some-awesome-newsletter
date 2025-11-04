<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
    import { isValidURL } from "./isValidLink";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props for the URL input.
  export let value: string = "";
  export let placeholder: string = $t['link.enterYourUrl'];
  export let label: string = "";
  export let center: boolean = false;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};
  export let onEnter: (isValid: boolean) => void = () => {};

  // Create a writable store for the URL input value.
  export const urlStore = writable(value);

  // Track validation state.
  let valid = false;

  // Validate URL on input, update the store, and call the onChange callback.
  function handleInput(event: Event | null, newValue?: string) {
    const target = event?.target as HTMLInputElement;
    value = target?.value?.trim?.() || (newValue as string);

    // If not empty and doesn't start with http:// or https://, prepend "https://"
    if (value?.trim() === "https:/") {
      value = "https://";
    }
    if (value !== "" && !/^https?:\/\//i.test(value)) {
      value = "https://" + (value || "");
    }

    // Consider an empty string as valid.
    valid = value === "" || isValidURL(value);

    if (target) target.value = value; // Update the input's displayed value

    urlStore.set(value);

    onChange(value);
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
    urlStore.set(value);
    handleInput(null, value);
  });
</script>

<div class="url-input-wrapper">
  <label class="input-label">{value ? label || placeholder : label}</label>
  <input
    type="url"
    bind:value
    {placeholder}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    aria-label={label}
    class:invalid={!valid && value !== ""}
    class:center
  />
  {#if !valid && value !== ""}
    <span class="error-message">{$t['link.pleaseEnterAValidUrl']}</span>
  {/if}
</div>

<style lang="scss">
  @import "../../../../lib/styles/centralized-styles.scss";

  .url-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  input {
    &.center {
      text-align: center;
    }
  }
</style>
