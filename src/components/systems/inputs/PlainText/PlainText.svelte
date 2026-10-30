<script context="module" lang="ts">
  let plainTextCount = 0;
</script>

<script lang="ts">
  import { writable } from "svelte/store";
  import type { HTMLInputAttributes } from "svelte/elements";

  // Props for the plain text input.
  export let value: string = "";
  export let placeholder: string = "";
  export let label: string = "";
  export let type: "text" | "password" | "email" | "number" | "tel" | "url" | "date" = "text"; // Add type prop
  export let isTextarea: boolean = false;
  export let rows: number = 3;
  export let disabled: boolean = false;

  // Optional props
  export let hint: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let required: boolean = false;
  export let autocomplete: HTMLInputAttributes["autocomplete"] = undefined;
  export let id: string | undefined = undefined;

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the plain text input value.
  export const textStore = writable(value);

  const uid = `plain-text-${++plainTextCount}`;
  $: inputId = id || uid;
  $: hintId = `${inputId}-hint`;
  $: errorId = `${inputId}-error`;

  // Errors stay hidden while the person is typing and show again on blur or Enter.
  let editing = false;
  $: showError = !!error && !editing;
  $: describedBy = [hint ? hintId : "", showError ? errorId : ""].filter(Boolean).join(" ") || undefined;
  $: resolvedAutocomplete = autocomplete ?? (type === "password" ? "current-password" : undefined);
  // Without a visible label the placeholder names the field for assistive tech.
  $: accessibleName = label ? undefined : placeholder || undefined;

  // Update the store as the user types, then call onChange.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    editing = true;
    textStore.set(value);
    onChange(value);
  }

  function commit() {
    editing = false;
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter" && !isTextarea) commit();
  }
</script>

<div class="text-input-wrapper">
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
  {#if isTextarea}
    <textarea
      id={inputId}
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
      aria-invalid={showError ? "true" : undefined}
      class:invalid={showError}
      {rows}
      {disabled}
      {required}
    />
  {:else}
    <input
      id={inputId}
      {type}
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
      aria-invalid={showError ? "true" : undefined}
      class:invalid={showError}
      autocomplete={resolvedAutocomplete}
      {disabled}
      {required}
    />
  {/if}
  {#if showError}
    <p class="error-message" id={errorId}>{error}</p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";

  .text-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
</style>
