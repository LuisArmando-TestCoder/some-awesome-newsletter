<script lang="ts" module>
  let plainTextCount = 0;
</script>

<script lang="ts">
  import { writable } from "svelte/store";

  // Props for the plain text input.
  export let value: string = "";
  export let placeholder: string = "";
  /** Visible label. When empty, the placeholder becomes the accessible name. */
  export let label: string = "";
  export let type: "text" | "password" | "email" | "number" | "tel" | "url" = "text";
  export let id: string | undefined = undefined;
  /** Help text under the label. */
  export let hint: string = "";
  /** Message from the parent. Show it only after submit or blur. */
  export let error: string = "";

  // Callback to be invoked when the input changes.
  export let onChange: (newValue: string) => void = () => {};

  // Create a writable store for the plain text input value.
  export const textStore = writable(value);

  const autoId = `plain-text-${++plainTextCount}`;
  $: controlId = id ?? autoId;
  $: hintId = `${controlId}-hint`;
  $: errorId = `${controlId}-error`;
  $: describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ") || undefined;

  // Update the store as the user types, then call onChange.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    textStore.set(value);
    onChange(value);
  }
</script>

<div class="text-input-wrapper" class:text-input-wrapper--invalid={!!error}>
  {#if label}
    <label class="input-label" for={controlId}>{label}</label>
  {/if}
  {#if hint}
    <p id={hintId} class="input-hint">{hint}</p>
  {/if}
  <input
    autocomplete={type === "password" ? "current-password" : undefined}
    {...$$restProps}
    id={controlId}
    {type}
    {value}
    {placeholder}
    aria-label={label ? undefined : placeholder || undefined}
    aria-describedby={describedBy}
    aria-invalid={error ? true : undefined}
    on:input={handleInput}
    on:input
    on:change
    on:focus
    on:blur
    on:keydown
  />
  <div class="input-error-region" aria-live="polite">
    {#if error}
      <p id={errorId} class="input-error"><svg class="error-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg><span>{error}</span></p>
    {/if}
  </div>
</div>

<style lang="scss">
  .text-input-wrapper {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    width: 100%;
    font-family: var(--font-body);
  }

  .input-label {
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }

  .input-hint {
    margin: calc(-1 * var(--space-1)) 0 0;
    color: var(--text-3);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
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

  .text-input-wrapper--invalid input,
  .text-input-wrapper--invalid input:hover {
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

  .input-error-region:not(:has(.input-error)) {
    margin-top: calc(-1 * var(--space-2));
  }

  .input-error {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
  .input-error .error-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }
  @media (forced-colors: active) {
    .input-error {
      color: CanvasText;
    }
  }
</style>
