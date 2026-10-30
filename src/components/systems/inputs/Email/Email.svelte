<script context="module" lang="ts">
  let emailCount = 0;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import type { HTMLInputAttributes } from "svelte/elements";
  import { t } from "$lib/i18n/dashboard-translations";

  // Props for the email input.
  export let value: string = "";
  export let placeholder: string = $t['email.enterYourEmail'];
  export let label: string = "";
  export let onEnter: (isValid: boolean) => void = () => {};
  export let disabled: boolean = false;

  // Optional props
  export let hint: string | undefined = undefined;
  /** Error from the parent. Shown instead of the built-in format message. */
  export let error: string | undefined = undefined;
  export let required: boolean = false;
  export let autocomplete: HTMLInputAttributes["autocomplete"] = "email";
  export let id: string | undefined = undefined;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the email input value.
  export const emailStore = writable(value);

  const uid = `email-${++emailCount}`;
  $: inputId = id || uid;
  $: hintId = `${inputId}-hint`;
  $: errorId = `${inputId}-error`;

  let inputEl: HTMLInputElement;

  // Track validation state.
  let valid = false;
  // Errors only show after blur or Enter, never while typing.
  let touched = false;
  let editing = false;

  $: formatError = !valid && !!value ? $t['email.pleaseEnterAValidEmail'] : "";
  $: visibleError = editing ? "" : error || (touched ? formatError : "");
  $: describedBy = [hint ? hintId : "", visibleError ? errorId : ""].filter(Boolean).join(" ") || undefined;
  $: accessibleName = label ? undefined : placeholder || undefined;

  // Validate email format on input, update the store, and call onChange.
  function handleInput(event: Event | null, newValue?: string) {
    const target = event?.target as HTMLInputElement | undefined;
    value = target ? (target.value ?? "").trim() : (newValue ?? "");
    if (target) editing = true;
    valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    emailStore.set(value);

    // Call onChange with empty string if invalid or empty, otherwise with the value
    onChange(valid ? value : "");
  }

  function commit() {
    editing = false;
    touched = true;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      commit();
      onEnter(valid);
    }
  }

  function addAt() {
    value = (value ?? "") + "@";
    inputEl?.focus();
  }

  onMount(() => {
    // Initialize the store with the initial value.
    emailStore.set(value);
    handleInput(null, value);
  });
</script>

<div class="email-input-wrapper">
  {#if label}
    <label class="input-label" for={inputId}>
      {label}
      {#if required}<span class="required-mark" aria-hidden="true">*</span>{/if}
    </label>
  {:else if value && placeholder}
    <span class="input-label" aria-hidden="true">{placeholder}</span>
  {/if}
  {#if hint}
    <p class="input-hint" id={hintId}>{hint}</p>
  {/if}
  <div class="input-container">
    <input
      bind:this={inputEl}
      id={inputId}
      type="email"
      inputmode="email"
      bind:value
      {placeholder}
      on:input={handleInput}
      on:input
      on:focus
      on:blur={commit}
      on:blur
      on:keydown={handleKeyDown}
      on:keydown
      aria-label={accessibleName}
      aria-describedby={describedBy}
      aria-invalid={visibleError ? "true" : undefined}
      class:invalid={!!visibleError}
      {autocomplete}
      {disabled}
      {required}
    />
    <button class="at-button" type="button" aria-label={$t['email.addAt'] ?? "Insert the @ sign"} {disabled} on:click={addAt}>@</button>
  </div>
  {#if visibleError}
    <p class="error-message" id={errorId}>{visibleError}</p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";

  .email-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
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
    padding-right: calc(var(--control-h) + var(--space-1));
    padding-left: calc(var(--control-h) + var(--space-1));
  }

  .at-button {
    position: absolute;
    right: var(--space-1);
    top: 50%;
    transform: translateY(-50%);
    min-width: var(--control-h-sm);
    min-height: var(--control-h-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    color: var(--text-link);
    transition: background-color var(--dur-fast) var(--ease-out);

    &:hover:not(:disabled) {
      background: var(--accent-soft);
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
</style>
