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
  {#if error}
    <p id={errorId} class="input-error">{error}</p>
  {/if}
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
    font-family: var(--font-body);
    font-size: var(--fs-md);
    line-height: var(--lh-snug);
    transition:
      border-color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:hover {
      border-color: var(--text-3);
    }

    &:focus-visible {
      outline: none;
      border-color: var(--accent);
      box-shadow: var(--focus-ring);
    }

    &:disabled {
      background: var(--surface-2);
      border-color: var(--border-1);
      color: var(--text-3);
      cursor: not-allowed;
    }
  }

  .text-input-wrapper--invalid input,
  .text-input-wrapper--invalid input:hover {
    border-color: var(--danger);
  }

  .input-error {
    margin: 0;
    color: var(--danger);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
  }
</style>
