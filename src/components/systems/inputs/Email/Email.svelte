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
    <p class="error-message" id={errorId}><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{visibleError}</span></p>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/centralized-styles.scss";
  @include centralized-styles.label-extras;

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
    translate: 0 -50%;
    min-width: var(--control-h-sm);
    min-height: var(--control-h-sm);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    background: transparent;
    border: none;
    border-radius: var(--radius-full);
    cursor: pointer;
    font-family: var(--font-body);
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled) {
        background: var(--surface-2);
        transition-duration: var(--t-in);
      }
    }

    &:active:not(:disabled) {
      background: var(--surface-3);
      transform: scale(0.94);
      transition-duration: 60ms;
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      cursor: not-allowed;
      opacity: var(--disabled-opacity);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .at-button:active {
      transform: none;
    }
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
