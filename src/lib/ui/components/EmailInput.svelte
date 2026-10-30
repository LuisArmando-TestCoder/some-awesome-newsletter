<script lang="ts" module>
  let emailInputCount = 0;
</script>

<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";

  // Props for the email input.
  export let value: string = "";
  export let placeholder: string = "Enter your email...";
  /** Visible label. When empty, the placeholder becomes the accessible name. */
  export let label: string = "";
  export let onEnter: (isValid: boolean) => void = () => {};
  export let id: string | undefined = undefined;
  /** Shown after Enter or after leaving the field, when the address is not valid. */
  export let errorMessage: string = "Enter a valid email address, like name@example.com.";

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the email input value.
  export const emailStore = writable(value);

  const autoId = `email-input-${++emailInputCount}`;
  $: controlId = id ?? autoId;
  $: errorId = `${controlId}-error`;

  // Track validation state. The message waits until Enter or blur.
  let valid = false;
  let touched = false;
  $: showError = touched && !valid && value !== "";

  function check(v: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  // Validate email format on input, update the store, and call onChange.
  function handleInput(event: Event | null, newValue?: string) {
    const target = event?.target as HTMLInputElement;
    value = target?.value?.trim?.() || (newValue as string) || "";
    valid = check(value);
    // Never raise an error while typing. A fixed address clears it right away.
    if (valid) touched = false;
    emailStore.set(value);

    // Call onChange with empty string if invalid or empty, otherwise with the value
    onChange(valid ? value : "");
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      touched = true;
      onEnter(valid);
    }
  }

  function handleBlur() {
    touched = true;
  }

  onMount(() => {
    // Initialize the store with the initial value.
    emailStore.set(value);
    handleInput(null, value);
  });
</script>

<div class="email-input-wrapper" class:email-input-wrapper--invalid={showError}>
  {#if label}
    <label class="input-label" for={controlId}>{label}</label>
  {/if}
  <input
    autocomplete="email"
    {...$$restProps}
    id={controlId}
    type="email"
    inputmode="email"
    bind:value
    {placeholder}
    aria-label={label ? undefined : placeholder || undefined}
    aria-invalid={showError ? true : undefined}
    aria-describedby={showError ? errorId : undefined}
    on:input={handleInput}
    on:keydown={handleKeyDown}
    on:blur={handleBlur}
    on:focus
    on:blur
  />
  <div class="error-region" aria-live="polite">
    {#if showError}
      <p id={errorId} class="error-message"><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{errorMessage}</span></p>
    {/if}
  </div>
</div>

<style lang="scss">
  .email-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: var(--space-2);
    margin-bottom: var(--space-4);
    font-family: var(--font-body);
  }

  .input-label {
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }


  /* Field: thin edge, soft radius, ink focus. Empty sits on the quiet surface, filled on paper. */
  input {
    box-sizing: border-box;
    width: 100%;
    min-height: var(--control-h);
    margin: 0;
    padding: 0 var(--control-pad-x);
    background: var(--surface-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    color: var(--text-1);
    caret-color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:not(:placeholder-shown),
    &:focus {
      background: var(--surface-0);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:disabled, [readonly], :focus) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    &[readonly] {
      background: var(--surface-2);
      border-color: transparent;
      cursor: text;
    }

    &:disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      color: var(--text-2);
      opacity: var(--disabled-opacity);
      cursor: not-allowed;
    }

    /* Invalid wins over hover and focus: the parent error, or the browser's after-blur check. */
    &[aria-invalid='true'],
    &:user-invalid {
      border-color: var(--danger);
    }
  }

  /* Browser autofill: keep our ink and a calm tint instead of the default yellow or blue. */
  input:-webkit-autofill {
    -webkit-text-fill-color: var(--text-1);
    caret-color: var(--text-1);
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
    transition: background-color 600000s 0s;
  }
  input:-webkit-autofill:focus-visible {
    box-shadow: var(--focus-ring), inset 0 0 0 100vmax var(--surface-2);
  }
  input:autofill {
    box-shadow: inset 0 0 0 100vmax var(--surface-2);
  }

  .email-input-wrapper--invalid input,
  .email-input-wrapper--invalid input:hover {
    border-color: var(--danger);
  }

  @media (forced-colors: active) {
    input {
      border-color: FieldText;
    }
    input:focus-visible {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
    input[aria-invalid='true'] {
      border-style: dashed;
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
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
  .error-message .error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }
  @media (forced-colors: active) {
    .error-message {
      color: CanvasText;
    }
  }
</style>
