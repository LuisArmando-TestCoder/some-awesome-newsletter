<script context="module" lang="ts">
  let textAreaCount = 0;
</script>

<script lang="ts">
  import type { HTMLTextareaAttributes } from "svelte/elements";

  export let value: string = "";
  export let label: string = "";
  export let placeholder: string = "";
  export let rows: number = 5; // Default number of rows
  export let disabled: boolean = false;
  export let onChange: (value: string) => void = () => {};

  // Optional props
  export let hint: string | undefined = undefined;
  export let error: string | undefined = undefined;
  export let required: boolean = false;
  export let autocomplete: HTMLTextareaAttributes["autocomplete"] = undefined;
  export let id: string | undefined = undefined;

  // Internal state to allow direct binding with textarea
  let internalValue: string = "";

  // Sync prop `value` to `internalValue`
  $: internalValue = value ?? ""; // Ensure internalValue is always a string

  // Unique per instance and stable between server and client renders.
  const uniqueId = `textarea-${++textAreaCount}`;
  $: fieldId = id || uniqueId;
  $: hintId = `${fieldId}-hint`;
  $: errorId = `${fieldId}-error`;

  // Errors stay hidden while the person is typing and show again on blur.
  let editing = false;
  $: showError = !!error && !editing;
  $: describedBy = [hint ? hintId : "", showError ? errorId : ""].filter(Boolean).join(" ") || undefined;

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    internalValue = target.value;
    value = internalValue; // Update the bound prop
    editing = true;
    onChange(internalValue);
  }

  function commit() {
    editing = false;
  }
</script>

<div class="textarea-input-field">
  {#if label}
    <label class="textarea-label" for={fieldId}>
      {label}
      {#if required}<span class="required-mark" aria-hidden="true">*</span>{/if}
    </label>
  {/if}
  {#if hint}
    <p class="textarea-hint" id={hintId}>{hint}</p>
  {/if}
  <div class="textarea-wrapper" class:invalid={showError} class:disabled class:filled={!!internalValue}>
    <textarea
      id={fieldId}
      class="custom-textarea"
      bind:value={internalValue}
      on:input={handleInput}
      on:input
      on:focus
      on:blur={commit}
      on:blur
      on:keydown
      {placeholder}
      {rows}
      {disabled}
      {required}
      {autocomplete}
      aria-label={label ? undefined : placeholder || undefined}
      aria-describedby={describedBy}
      aria-invalid={showError ? "true" : undefined}
    ></textarea>
  </div>
  {#if showError}
    <p class="textarea-error" id={errorId}><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{error}</span></p>
  {/if}
</div>

<style lang="scss">
  .textarea-input-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    width: 100%;
  }

  .textarea-label {
    display: block;
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .required-mark {
    margin-left: var(--space-1);
    color: var(--text-2);
  }

  .textarea-hint {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .textarea-error {
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

  /* Field shell: thin edge, soft radius, ink focus. Empty on the quiet surface, filled on paper. */
  .textarea-wrapper {
    display: flex; // Ensures textarea fills wrapper
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &.filled,
    &:focus-within {
      background: var(--surface-0);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.disabled):not(:focus-within) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-within {
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &.invalid,
    &.invalid:hover,
    &:has(.custom-textarea:user-invalid) {
      border-color: var(--danger);
    }

    &.disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      opacity: var(--disabled-opacity);
    }
  }

  .custom-textarea {
    field-sizing: content;
    flex-grow: 1;
    width: 100%;
    min-height: 5rem;
    padding: var(--space-3) var(--control-pad-x);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-1);
    caret-color: var(--text-1);
    background: transparent;
    border: none;
    border-radius: var(--radius-md);
    resize: vertical;
    box-sizing: border-box; // Ensure padding and border are included in width/height

    // The wrapper draws the focus ring.
    &:focus,
    &:focus-visible {
      outline: none;
    }

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:disabled {
      color: var(--text-2);
      cursor: not-allowed;
    }
  }

  @media (forced-colors: active) {
    .textarea-wrapper {
      border-color: FieldText;
    }
    .textarea-wrapper:focus-within {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    .textarea-error {
      color: CanvasText;
    }
  }
</style>
