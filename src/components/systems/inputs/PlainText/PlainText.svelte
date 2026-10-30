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
    ></textarea>
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
    <p class="error-message" id={errorId}><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{error}</span></p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";
  @include centralized-styles.label-extras;
  @include centralized-styles.textarea-control;

  .text-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
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

  /* Mono micro states on top of the shared field styles (tokens only). */
  textarea {
    caret-color: var(--text-1);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);
  }

  /* Empty sits on the quiet surface, filled and focused on paper. */
  textarea:not(:placeholder-shown),
  textarea:focus {
    background: var(--surface-0);
  }

  /* The shared hover applies on touch too; keep it to fine pointers. */
  @media (hover: none), (pointer: coarse) {
    textarea:hover:not(:disabled):not(:focus) {
      border-color: var(--border-2);
    }
  }

  textarea:focus {
    border-color: var(--text-1);
  }


  textarea:disabled {
    color: var(--text-2);
    opacity: var(--disabled-opacity);
  }

  textarea.invalid,
  textarea.invalid:focus,
  textarea:user-invalid {
    border-color: var(--danger);
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  textarea:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  textarea:-webkit-autofill:focus {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  textarea:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }


  @media (forced-colors: active) {
    textarea {
      border-color: FieldText;
    }
    textarea:focus {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
  }
</style>
