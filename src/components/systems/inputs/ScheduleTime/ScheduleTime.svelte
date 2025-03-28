<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount, tick } from "svelte"; // Import tick

  // Import the parser and sentence generator
  import {
    parseNaturalLanguageToCron,
    isCronString,
  } from "./naturalCronParser.ts";
  import type {
    CronParseResult,
  } from "./naturalCronParser.ts";
  import cronToSentence from "./cronToNatural.ts"; // Assuming default export

  // --- Props ---
  export let value: string = ""; // Initial value (NL or Cron)
  export let placeholder: string = 'e.g., "every Mon at 9 AM" or "0 9 * * 1"';
  export let label: string = "Schedule Time";
  export let onChange: (input: string, cron: string) => void = () => {}; // Sends current INPUT text and DERIVED cron

  // --- Internal Component State ---
  const internalInputValue = writable(""); // Bound to the input field
  let derivedCron: string = ""; // Cron derived from input OR the initial value if it was cron
  let derivedNatural: string = ""; // Natural sentence derived from derivedCron
  let displayError: string = ""; // Parsing error message
  let isInitialValueCron = false; // Was the *prop* value initially cron?
  let hasMounted = false; // Prevent reactive updates before mount

  // Store for the last valid PAIR (input that resulted in valid cron)
  export const scheduleStore = writable<{ schedule: string; cron: string }>({
    schedule: "",
    cron: "",
  });

  // --- Lifecycle: Initialization ---
  onMount(async () => {
    console.log("MOUNT: Initial prop value:", value);
    isInitialValueCron = isCronString(value);
    internalInputValue.set(value); // Set input field value

    if (isInitialValueCron) {
      // Initial value IS a cron string
      derivedCron = value;
      derivedNatural = generateNaturalSentence(value); // Generate description
      displayError = "";
      // Store: Natural description as 'schedule' for consistency? Or keep it blank? Let's store description.
      scheduleStore.set({ schedule: derivedNatural, cron: derivedCron });
      onChange(value, derivedCron); // Report initial cron input and itself as cron output
    } else {
      // Initial value is Natural Language (or empty)
      const result = parseNaturalLanguageToCron(value);
      handleParseResult(value, result, true); // isInitialCheck = true
    }

    await tick(); // Wait for DOM update
    hasMounted = true;
    console.log(
      "MOUNT: Complete. Initial Input:",
      $internalInputValue,
      " Derived Cron:",
      derivedCron,
      "Derived Natural:",
      derivedNatural
    );
  });

  // --- Helper to generate natural sentence from cron ---
  function generateNaturalSentence(cronStr: string): string {
    if (!cronStr) return "";
    try {
      return cronToSentence(cronStr);
    } catch (e: any) {
      console.error("Error generating natural sentence from cron:", cronStr, e);
      // Don't set displayError here, as the primary error is for NL parsing
      return "[Could not generate description]";
    }
  }

  // --- Helper to handle NL parsing results ---
  function handleParseResult(
    inputValue: string,
    result: CronParseResult,
    isInitialCheck = false
  ) {
    console.log(
      `PARSE_RESULT: Input='${inputValue}', Success=${result.success}, Initial=${isInitialCheck}`
    );
    if (result.success) {
      derivedCron = result.cron ?? "";
      displayError = "";
      derivedNatural = generateNaturalSentence(derivedCron); // Update natural description

      if (derivedCron || !inputValue) {
        // Valid cron or empty input
        scheduleStore.set({ schedule: inputValue, cron: derivedCron });
        if (!isInitialCheck) {
          // Avoid duplicate onChange from mount if initial was NL
          onChange(inputValue, derivedCron);
        }
      } else {
        // Success was true, but cron is empty for non-empty input (should not happen often)
        if (!isInitialCheck) onChange(inputValue, "");
      }
    } else {
      // Parsing failed
      derivedCron = ""; // Clear derived values
      derivedNatural = "";
      displayError = result.error ?? "Unknown parsing error.";
      if (!isInitialCheck) {
        // Don't call onChange for initial NL parse failure (handled in mount)
        onChange(inputValue, "");
      }
      // Do not update scheduleStore on error
    }
    console.log(
      `PARSE_RESULT: Output - Cron='${derivedCron}', Natural='${derivedNatural}', Error='${displayError}'`
    );
  }

  // --- Reactive Updates: Triggered by user typing ---
  $: {
    if (hasMounted) {
      const currentInput = $internalInputValue;
      console.log(`REACTIVE: Input changed to: '${currentInput}'`);

      // If the user types something that IS a cron string, treat it directly
      if (isCronString(currentInput)) {
        console.log("REACTIVE: Input is a cron string.");
        if (currentInput !== derivedCron) {
          // Avoid update if it's the same cron
          derivedCron = currentInput;
          derivedNatural = generateNaturalSentence(derivedCron);
          displayError = "";
          scheduleStore.set({ schedule: derivedNatural, cron: derivedCron }); // Store description + cron
          onChange(currentInput, derivedCron);
        }
      }
      // Only parse as NL if it's NOT the initial cron value AND not identical to current derivedCron
      // And also not identical to the last successful natural language input stored
      else if (!(isInitialValueCron && currentInput === value)) {
        console.log(
          "REACTIVE: Input is NOT initial cron, attempting NL parse."
        );
        // Prevent re-parsing if input hasn't changed meaningfully? Tricky. Let's parse.
        const result = parseNaturalLanguageToCron(currentInput);
        handleParseResult(currentInput, result); // isInitialCheck = false
      } else {
        console.log(
          "REACTIVE: Input matches initial cron value, skipping NL parse."
        );
        // Ensure state is correct if user typed back the initial cron
        if (derivedCron !== value) {
          // If state somehow diverged
          derivedCron = value;
          derivedNatural = generateNaturalSentence(value);
          displayError = "";
          scheduleStore.set({ schedule: derivedNatural, cron: derivedCron });
          onChange(value, value);
        }
      }
    }
  }
</script>

<template>
  <div class="schedule-input-wrapper">
    <label for="schedule-input" class="input-label">{label}</label>
    <div class="input-container">
      <input
        id="schedule-input"
        type="text"
        bind:value={$internalInputValue}
        {placeholder}
        class:error={displayError && $internalInputValue}
        aria-label={label}
        aria-invalid={!!displayError && !!$internalInputValue}
        aria-describedby="feedback-area"
      />
    </div>

    <!-- Feedback Area: Show Error OR Cron + Natural Description -->
    <div id="feedback-area" class="feedback-area">
      {#if displayError && $internalInputValue}
        <div class="output-feedback error">
          <span class="error-message">{displayError}</span>
        </div>
      {:else if derivedCron}
        <div class="output-feedback">
          <span class="cron-label">Cron:</span>
          <code class="cron-code">{derivedCron}</code>
        </div>
        {#if derivedNatural && derivedNatural !== "[Could not generate description]"}
          <div class="output-feedback natural-desc">
            {derivedNatural}
          </div>
        {/if}
      {:else if !$internalInputValue}
        <!-- Optionally show placeholder text or nothing when input is empty -->
        <div class="output-feedback placeholder-feedback"></div>
        <!-- Reserve space -->
      {/if}
    </div>

    <div id="helper-text" class="helper-text">
      Try: "every 5 minutes", "at 3:30 PM", "0 9 * * MON", "noon", "every Monday
      at 9am".
    </div>
  </div>
</template>

<style lang="scss">
  // --- Base Variables ---
  :root {
    --color-foreground-opaque: #e0e0e09a;
    --color-background-input: #ffffff1a;
    --color-background-input-border: #ffffff33;
    --color-error: #ff6b6b;
    --color-code-bg: #0000004d;
    --color-natural-desc: #b0c4de; // LightSteelBlue for description
  }

  // --- Wrapper ---
  .schedule-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0;
    font-family: sans-serif;
  }

  // --- Label ---
  .input-label {
    margin-bottom: 0.5rem;
    color: var(--color-foreground);
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
  }

  // --- Input Field ---
  .input-container {
    position: relative;
  }

  input {
    width: 100%;
    box-sizing: border-box;
    background: var(--color-background-input);
    backdrop-filter: blur(8px);
    -webkit-backdrop-filter: blur(8px);
    border: 1px solid var(--color-background-input-border);
    border-radius: 8px;
    padding: 0.85rem 1rem;
    font-size: 1rem;
    color: var(--color-foreground);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
    outline: none;
    box-shadow: 0 0 0 1px transparent;

    &::placeholder {
      color: var(--color-foreground-opaque);
      opacity: 0.8;
    }
    &:focus {
      border-color: var(--color-foreground);
      box-shadow:
        0 0 0 1px var(--color-foreground),
        0 2px 8px -2px #00000033;
    }
    &.error {
      border-color: var(--color-error);
      box-shadow: 0 0 0 1px var(--color-error);
      &:focus {
        box-shadow:
          0 0 0 1px var(--color-error),
          0 2px 8px -2px #00000033;
      }
    }
  }

  // --- Feedback Area ---
  .feedback-area {
    margin-top: 0.75rem;
    min-height: 2.6em; // Reserve space for potentially two lines (cron + natural)
    display: flex;
    flex-direction: column;
    gap: 0.3rem; // Space between cron line and natural line
  }

  .output-feedback {
    font-size: 0.9rem;
    color: var(--color-foreground);
    opacity: 0.95; // Slightly more prominent than helper text

    &.error {
      color: var(--color-error);
    }
    &.placeholder-feedback {
      opacity: 0; // Hide the placeholder feedback visually but keep space
    }
  }

  .cron-label {
    font-weight: 500;
    margin-right: 0.4em;
  }

  .cron-code {
    background-color: var(--color-code-bg);
    padding: 0.2em 0.5em;
    border-radius: 4px;
    font-family: monospace;
  }

  .error-message {
    font-style: italic;
  }

  .natural-desc {
    font-size: 0.85rem; // Slightly smaller
    color: var(--color-natural-desc);
    font-style: italic;
    line-height: 1.3;
  }

  // --- Helper Text ---
  .helper-text {
    margin-top: 0.6rem;
    font-size: 0.8rem;
    color: var(--color-foreground-opaque);
    line-height: 1.4;
  }
</style>
