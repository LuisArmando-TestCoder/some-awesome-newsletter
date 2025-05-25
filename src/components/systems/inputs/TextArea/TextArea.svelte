<script lang="ts">
  import { onMount } from 'svelte';

  export let value: string = "";
  export let label: string = "";
  export let placeholder: string = "";
  export let rows: number = 5; // Default number of rows
  export let disabled: boolean = false;
  export let onChange: (value: string) => void = () => {};

  // Internal state to allow direct binding with textarea
  let internalValue: string = "";

  // Sync prop `value` to `internalValue`
  $: internalValue = value ?? ""; // Ensure internalValue is always a string

  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    internalValue = target.value;
    value = internalValue; // Update the bound prop
    onChange(internalValue);
  }

  onMount(() => {
    internalValue = value ?? ""; // Initialize on mount
    // Ensure initial value from prop is reflected if onChange needs to be triggered
    // However, typically onChange is for user interactions, not initial programmatic setting.
    // If initial prop value needs to trigger parent's onChange, that's a different pattern.
  });

  // Create a unique ID for ARIA attributes
  const uniqueId = `textarea-${label.toLowerCase().replace(/\s+/g, '-')}-${Math.random().toString(36).substring(2, 9)}`;

</script>

<div class="textarea-input-field">
  {#if label}
    <label class="textarea-label" for={uniqueId}>
      {label}
    </label>
  {/if}
  <div class="textarea-wrapper">
    <textarea
      id={uniqueId}
      class="custom-textarea"
      bind:value={internalValue}
      on:input={handleInput}
      {placeholder}
      {rows}
      {disabled}
      aria-label={label || placeholder}
    ></textarea>
  </div>
</div>

<style lang="scss">
  .textarea-input-field {
    display: flex;
    flex-direction: column;
    gap: 0.25rem; 
    width: 100%;
  }

  .textarea-label {
    font-size: 0.85rem;
    color: var(--color-foreground-muted, #aaa);
    padding-left: 0.1rem;
    display: block; // Ensure label takes its own line if it has content
    margin-bottom: 0.25rem;
  }

  .textarea-wrapper {
    border: 1px solid var(--color-border, rgba(255, 255, 255, 0.3));
    border-radius: 8px;
    background: var(--color-input-background, rgba(255, 255, 255, 0.1));
    transition: border-color 0.3s ease;
    display: flex; // Ensures textarea fills wrapper

    &:focus-within {
      border-color: var(--color-accent, #007bff);
      box-shadow: 0 0 5px var(--color-accent-translucent, rgba(0, 123, 255, 0.5)); // Added focus shadow
    }
  }

  .custom-textarea {
    flex-grow: 1;
    width: 100%;
    padding: 0.75rem;
    font-size: 1rem;
    font-family: inherit;
    background: transparent;
    border: none;
    color: var(--color-foreground, #eee);
    resize: vertical;
    // min-height: calc(1.5em * var(rows) + 1.5rem); // Svelte doesn't support var() in calc like this for props
    min-height: 80px; // Default min-height, can be adjusted or made dynamic differently
    outline: none;
    box-sizing: border-box; // Ensure padding and border are included in width/height

    &::placeholder {
      color: var(--color-foreground-muted, #888);
      opacity: 1;
    }

    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      background-color: var(--color-disabled-background, rgba(200,200,200,0.1)); // Subtle disabled bg
    }
  }
</style>
