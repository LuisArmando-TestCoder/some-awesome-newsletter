<!-- src/components/systems/inputs/PersonalityField.svelte -->
<script lang="ts">
  import { slide } from "svelte/transition";
  import { generatePersonality } from "../../requests/generatePersonality"; // Change back to .ts
  import { latestMessage } from "../../../store"; // Change back to .ts
  import { writable } from "svelte/store";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { errorMessage } from "$lib/api/errors";

  // --- Props ---
  export let personality: string = "";
  export let newsSourceId: string;
  export let onChange: (value: string) => void = () => {};
  export let onSubmit: () => void = () => {};
  export let onError: (message: string) => void = () => {};

  // --- State ---
  let isGenerating = writable(false);
  let generationError = writable<string | null>(null);
  let currentContent: string = ""; // Initialize as empty string
  const placeholderText = $t['personality.placeholder'];

  // --- Reactivity ---
  // Ensure currentContent reflects the prop, defaulting null/undefined to empty string
  $: currentContent = personality ?? "";

  // --- Functions ---
  function handleInput(event: Event) {
    const target = event.target as HTMLTextAreaElement;
    currentContent = target.value;
    onChange(currentContent);
  }

  async function handleGeneratePersonality() {
    isGenerating.set(true);
    generationError.set(null);
    latestMessage.set($t['personality.generating']);

    try {
      const result = await generatePersonality(currentContent, newsSourceId);
      onChange(result.personality); // Update parent, which updates prop, which updates textarea
      latestMessage.set($t['personality.success']);
    } catch (error) {
      const message =
        errorMessage(error) || $t['personality.error'];
      generationError.set(message);
      onError(message);
      latestMessage.set("");
    } finally {
      isGenerating.set(false);
    }

    onSubmit();
  }
  const textareaId = `personality-${Math.random().toString(36).slice(2, 9)}`;
</script>

<div class="personality-field">
  <!-- Loading Indicator -->
  {#if $isGenerating}
    <div class="status-message loading" role="status" transition:slide|local>
      <span class="status-spinner" aria-hidden="true"></span>
      <span>{$latestMessage || $t['personality.generatingShort']}</span>
    </div>
  {/if}

  <!-- Error Indicator -->
  {#if $generationError}
    <div class="status-message error" role="alert" transition:slide|local>
      <svg class="status-icon" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><circle cx="8" cy="8" r="7" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4.25M8 11.25v.25" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" /></svg>
      <span>{$t['personality.errorPrefix']} {$generationError}</span>
    </div>
  {/if}

  <!-- Label (only visible when textarea has content) -->
  {#if currentContent}
    <label class="textarea-label" for={textareaId}>
      {placeholderText}
    </label>
  {/if}

  <!-- Textarea Container (Optional - could be removed if no border needed) -->
  <div class="textarea-wrapper" class:filled={!!currentContent} class:busy={$isGenerating} aria-busy={$isGenerating ? "true" : undefined}>
    <textarea
      id={textareaId}
      class="personality-textarea"
      bind:value={currentContent}
      on:input={handleInput}
      placeholder={!currentContent ? placeholderText : ""}
      aria-label={$t['personality.ariaLabel'] ?? "Brand personality description"}
      rows="5"
      disabled={$isGenerating}
    ></textarea>
  </div>

  <!-- Generate Button -->
  <div class="generate-button-container">
    <SubmitButton
      label={$t['personality.generatePersonality']}
      callback={handleGeneratePersonality}
      disabled={$isGenerating}
    />
  </div>
</div>

<style lang="scss">
  .personality-field {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    font-family: var(--font-body);
  }

  .textarea-label {
    display: block;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  /* Field shell: thin edge, soft radius, ink focus. Empty on the quiet surface, filled on paper. */
  .textarea-wrapper {
    display: flex;
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    &.filled,
    &:focus-within {
      background: var(--surface-0);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.busy):not(:focus-within) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-within {
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }

    /* Busy: the text stays readable while a draft is written. */
    &.busy {
      background: var(--surface-2);
      border-color: var(--border-1);
      cursor: progress;
    }
  }

  .personality-textarea {
    flex-grow: 1;
    width: 100%;
    min-height: 5rem;
    padding: var(--space-3) var(--control-pad-x);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    font-family: inherit;
    background: transparent;
    border: none;
    color: var(--text-1);
    caret-color: var(--text-1);
    resize: vertical;
    outline: none;

    &::placeholder {
      color: var(--text-3);
      opacity: 1;
    }

    &:disabled {
      color: var(--text-2);
      cursor: progress;
    }
  }

  .generate-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: var(--space-2);
  }

  .status-message {
    display: flex;
    align-items: flex-start;
    gap: var(--space-2);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-md);
    font-size: var(--fs-sm);
    line-height: var(--lh-snug);
    margin-bottom: var(--space-2);

    &.loading {
      background-color: var(--surface-1);
      color: var(--text-1);
      border: 1px solid var(--border-1);
    }

    &.error {
      background-color: var(--danger-soft);
      color: var(--danger);
      border: 1px solid var(--danger);
      font-weight: var(--fw-medium);
    }
  }

  .status-icon {
    flex: none;
    width: 1em;
    height: 1em;
    margin-top: 0.15em;
  }

  .status-spinner {
    flex: none;
    width: 0.875rem;
    height: 0.875rem;
    margin-top: 0.15em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: personality-spin 0.7s linear infinite;
  }

  @keyframes personality-spin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .status-spinner {
      animation: none;
      border-right-color: currentColor;
      opacity: 0.6;
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
    .status-message {
      border-color: CanvasText;
    }
  }
</style>
