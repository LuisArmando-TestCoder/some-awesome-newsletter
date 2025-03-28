<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount } from "svelte"; // Import onMount

  // Props
  export let value: string = ""; // Natural language input OR initial cron to display
  export let placeholder: string = 'e.g., "every Monday at 9 AM"';
  export let label: string = "Schedule Time";
  export let onChange: (schedule: string, cron: string) => void = () => {};

  // --- Internal State ---
  // Use the prop 'value' ONLY for the INITIAL state.
  // Subsequent updates come from the input field via bind:value.
  const internalValue = writable(value);
  let cronExpression = ""; // Holds the generated cron string
  let parseError = ""; // Holds any parsing error message

  // Writable store holding the latest valid schedule and its cron expression.
  // Updated ONLY when conversion is successful.
  export const scheduleStore = writable({ schedule: "", cron: "" });

  // --- Natural Language to Cron Conversion ---

  // Helper maps
  const DAY_MAP_REV: { [key: string]: number } = {
    sun: 0,
    sunday: 0,
    mon: 1,
    monday: 1,
    tue: 2,
    tuesday: 2,
    wed: 3,
    wednesday: 3,
    thu: 4,
    thursday: 4,
    fri: 5,
    friday: 5,
    sat: 6,
    saturday: 6,
  };

  // CORRECTED MONTH_MAP_REV (Removed duplicate 'may')
  const MONTH_MAP_REV: { [key: string]: number } = {
    jan: 1,
    january: 1,
    feb: 2,
    february: 2,
    mar: 3,
    march: 3,
    apr: 4,
    april: 4,
    may: 5, // Only one entry for may
    jun: 6,
    june: 6,
    jul: 7,
    july: 7,
    aug: 8,
    august: 8,
    sep: 9,
    september: 9,
    oct: 10,
    october: 10,
    nov: 11,
    november: 11,
    dec: 12,
    december: 12,
  };

  // --- Main Conversion Function ---
  function convertToCron(inputStr: string): string {
    // Allow empty input without error
    if (!inputStr?.trim()) {
      parseError = "";
      return "";
    }

    // Basic check if it looks like a cron string already - treat as invalid for conversion
    if (
      /^(\*|(\d+|\d+-\d+|\*\/\d+))(,\s*(\d+|\d+-\d+|\*\/\d+))*$/.test(
        inputStr.split(" ")[0] ?? ""
      ) &&
      inputStr.split(/\s+/).length >= 5
    ) {
      parseError =
        "Input looks like a cron string, please use natural language.";
      return "";
    }

    const lowerInput = inputStr.toLowerCase().trim();
    let parts = ["*", "*", "*", "*", "*"]; // min, hour, dom, month, dow
    let foundTime = false;
    let foundDow = false;
    let foundDom = false;
    let foundMonth = false;

    try {
      // --- Time Parsing (Minute/Hour) ---
      let match = lowerInput.match(/midnight/);
      if (match) {
        parts[0] = "0";
        parts[1] = "0";
        foundTime = true;
      }

      match = lowerInput.match(/noon/);
      if (match) {
        parts[0] = "0";
        parts[1] = "12";
        foundTime = true;
      }

      match = lowerInput.match(/(\d{1,2}):(\d{2})\s*(am|pm)?/);
      if (match && !foundTime) {
        let hour = parseInt(match[1], 10);
        const minute = parseInt(match[2], 10);
        const ampm = match[3];

        if (
          isNaN(hour) ||
          hour < 0 ||
          hour > 23 ||
          isNaN(minute) ||
          minute < 0 ||
          minute > 59
        ) {
          throw new Error(`Invalid time format ${match[0]}`);
        }

        if (ampm === "pm" && hour < 12) hour += 12;
        else if (ampm === "am" && hour === 12) hour = 0;
        if (hour === 24) hour = 0;

        parts[0] = minute.toString();
        parts[1] = hour.toString();
        foundTime = true;
      }

      match = lowerInput.match(/(?:at|@)\s*(\d{1,2})\s*(am|pm|o'clock)?/);
      if (match && !foundTime) {
        let hour = parseInt(match[1], 10);
        const modifier = match[2];

        if (
          isNaN(hour) ||
          hour < 1 ||
          (hour > 12 && (!modifier || modifier === "o'clock"))
        ) {
          if (hour < 0 || hour > 23)
            throw new Error(`Invalid hour ${match[1]}`);
        } else if (hour < 1 || hour > 12) {
          throw new Error(`Invalid hour ${match[1]} for AM/PM`);
        }

        if (modifier === "pm" && hour < 12) hour += 12;
        else if (modifier === "am" && hour === 12) hour = 0;

        parts[0] = "0";
        parts[1] = hour.toString();
        foundTime = true;
      }

      match = lowerInput.match(/every\s+(\d+)\s+minutes?/);
      if (match) {
        const minStep = parseInt(match[1], 10);
        if (isNaN(minStep) || minStep < 1 || minStep > 59)
          throw new Error(`Invalid minute step ${match[1]}`);
        parts[0] = `*/${minStep}`;
        if (!foundTime && parts[1] === "*") parts[1] = "*";
        foundTime = true;
      } else if (lowerInput.includes("every minute")) {
        parts[0] = "*";
        if (!foundTime && parts[1] === "*") parts[1] = "*";
        foundTime = true;
      }

      match = lowerInput.match(/every\s+(\d+)\s+hours?/);
      if (match) {
        const hourStep = parseInt(match[1], 10);
        if (isNaN(hourStep) || hourStep < 1 || hourStep > 23)
          throw new Error(`Invalid hour step ${match[1]}`);
        parts[1] = `*/${hourStep}`;
        if (parts[0] === "*") parts[0] = "0";
        foundTime = true;
      } else if (lowerInput.includes("every hour")) {
        parts[1] = "*";
        if (parts[0] === "*") parts[0] = "0";
        foundTime = true;
      }

      if (
        foundTime &&
        parts[0] === "*" &&
        parts[1] !== "*" &&
        !parts[1].startsWith("*/") &&
        !lowerInput.includes("every minute") &&
        !lowerInput.match(/:\d{2}/)
      ) {
        parts[0] = "0";
      }

      // --- Day of Week (DOW) Parsing ---
      match = lowerInput.match(/every\s+(weekday|weekend)/);
      if (match) {
        parts[4] = match[1] === "weekday" ? "1-5" : "0,6";
        foundDow = true;
      }

      const daysFound: number[] = [];
      for (const dayName in DAY_MAP_REV) {
        // Use word boundaries for more accuracy
        const regex = new RegExp(`\\b${dayName}\\b`);
        if (regex.test(lowerInput)) {
          const dayNum = DAY_MAP_REV[dayName];
          if (!daysFound.includes(dayNum)) {
            daysFound.push(dayNum);
          }
        }
      }
      if (daysFound.length > 0) {
        parts[4] = daysFound.sort().join(",");
        foundDow = true;
      } else if (lowerInput.includes("every day")) {
        // No DOW constraint needed if 'every day' and no specific days found
      }

      // --- Day of Month (DOM) Parsing ---
      match = lowerInput.match(
        /(?:on|every)\s+(?:the\s*)?(\d+)(st|nd|rd|th)?\s+(?:day\s+)?(?:of|in)\s+(?:the\s*)?month/
      );
      if (match) {
        const dayNum = parseInt(match[2], 10);
        if (isNaN(dayNum) || dayNum < 1 || dayNum > 31)
          throw new Error(`Invalid day of month ${match[2]}`);
        parts[2] = dayNum.toString();
        foundDom = true;
      } else {
        match = lowerInput.match(
          /(?:on|every)\s+(?:the\s*)?(\d+)(st|nd|rd|th)?(?!\s*(?:am|pm|o'clock|minute|hour))/
        ); // Match "on the 15th" but avoid time parts
        if (match && !foundDow) {
          const dayNum = parseInt(match[2], 10);
          if (isNaN(dayNum) || dayNum < 1 || dayNum > 31)
            throw new Error(`Invalid day of month ${match[2]}`);
          parts[2] = dayNum.toString();
          foundDom = true;
        }
      }

      // --- Month Parsing ---
      const monthsFound: number[] = [];
      for (const monthName in MONTH_MAP_REV) {
        const regex = new RegExp(`\\b${monthName}\\b`);
        if (regex.test(lowerInput)) {
          const monthNum = MONTH_MAP_REV[monthName];
          if (!monthsFound.includes(monthNum)) {
            monthsFound.push(monthNum);
          }
        }
      }
      if (monthsFound.length > 0) {
        parts[3] = monthsFound.sort((a, b) => a - b).join(",");
        foundMonth = true;
      } else if (lowerInput.includes("every month")) {
        // No month constraint
      }

      // --- Validation & Final Output ---
      if (!foundTime && !foundDow && !foundDom && !foundMonth) {
        if (lowerInput === "every minute") return "* * * * *"; // Handle specific edge case
        throw new Error("Could not understand the schedule format.");
      }

      // Clear error only on successful parsing and generation
      parseError = "";
      return parts.join(" ");
    } catch (e: any) {
      console.error("Cron parsing error:", e.message);
      parseError = e.message || "Could not understand the schedule format.";
      return ""; // Return empty string on error
    }
  }

  // --- Lifecycle ---
  onMount(() => {
    // Initialize internalValue from the prop *once* on mount.
    internalValue.set(value);

    // Perform an initial conversion attempt based on the initial value.
    const initialCron = convertToCron(value);
    cronExpression = initialCron;
    if (initialCron) {
      scheduleStore.set({ schedule: value, cron: initialCron });
    }
    // Trigger onChange for initial state if needed by parent
    // onChange(value, initialCron); // Uncomment if parent needs initial state immediately
  });

  // --- Reactive Updates ---
  // This block reacts ONLY to changes in the internalValue store,
  // which is updated by bind:value from the user typing.
  $: {
    const currentInput = $internalValue; // Get current input value
    const newCron = convertToCron(currentInput); // Attempt conversion

    // Update cronExpression regardless of success/failure for display
    cronExpression = newCron;

    // Call onChange with the current text and the result (or empty string)
    onChange(currentInput, newCron);

    // Update the shared store only if conversion was successful
    if (newCron && !parseError) {
      scheduleStore.set({ schedule: currentInput, cron: newCron });
    } else if (!currentInput) {
      parseError = ""; // Clear error if input is cleared
      scheduleStore.set({ schedule: "", cron: "" }); // Clear store if input is empty
    } else if (currentInput && !newCron && !parseError) {
      // If input exists, conversion failed, but no specific error was thrown by convertToCron
      parseError = "Could not determine a schedule from the input.";
    }
  }

  // REMOVED: The problematic reactive block that synced internalValue back to the 'value' prop.
  // $: if (value !== $internalValue) {
  //   internalValue.set(value);
  // }
</script>

<template>
  <div class="schedule-input-wrapper">
    <label for="schedule-input" class="input-label">{label}</label>
    <div class="input-container">
      <input
        id="schedule-input"
        type="text"
        bind:value={$internalValue}
        {placeholder}
        class:error={parseError && $internalValue}
        aria-label={label}
        aria-invalid={!!parseError && !!$internalValue}
        aria-describedby={$internalValue && (cronExpression || parseError)
          ? "cron-output"
          : "helper-text"}
      />
    </div>
    {#if $internalValue}
      <div id="cron-output" class="output-feedback" class:error={!!parseError}>
        {#if cronExpression}
          Cron: <code class="cron-code">{cronExpression}</code>
        {:else if parseError}
          <span class="error-message">{parseError}</span>
        {/if}
      </div>
    {/if}
    <div id="helper-text" class="helper-text">
      Try: "every 5 minutes", "at 3:30 PM", "noon", "midnight", "every Monday at
      9am", "on the 15th of the month".
    </div>
  </div>
</template>

<style lang="scss">
  // Define some base variables, assuming they might come from a global scope
  :root {
    --color-foreground: #e0e0e0;
    --color-foreground-opaque: #e0e0e09a;
    --color-background: #333333dd; // Base background for contrast
    --color-background-input: #ffffff1a; // More transparent for glass effect
    --color-background-input-border: #ffffff33;
    --color-focus: #64aeff;
    --color-error: #ff6b6b;
    --color-code-bg: #0000004d;
  }

  .schedule-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px; // Adjust as needed
    margin: 1rem 0; // Center it for example
    font-family: sans-serif; // Basic font stack
  }

  .input-label {
    margin-bottom: 0.5rem;
    color: var(--color-foreground);
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
  }

  .input-container {
    position: relative; // For potential icons later
  }

  input {
    width: 100%;
    box-sizing: border-box; // Include padding and border in the element's total width and height
    background: var(--color-background-input);
    backdrop-filter: blur(8px); // The key glassmorphism effect
    -webkit-backdrop-filter: blur(8px); // For Safari
    border: 1px solid var(--color-background-input-border);
    border-radius: 8px;
    padding: 0.85rem 1rem;
    font-size: 1rem;
    color: var(--color-foreground);
    transition:
      border-color 0.3s ease,
      box-shadow 0.3s ease;
    outline: none;

    // Styling the frost/glass border effect slightly more
    box-shadow: 0 0 0 1px transparent; // Prepare for focus transition

    &::placeholder {
      color: var(--color-foreground-opaque);
      opacity: 0.8;
    }

    &:focus {
      border-color: var(--color-focus);
      box-shadow:
        0 0 0 1px var(--color-focus),
        0 2px 8px -2px #00000033; // Subtle glow and depth
    }

    &.error {
      border-color: var(--color-error);
      box-shadow: 0 0 0 1px var(--color-error);

      &:focus {
        box-shadow:
          0 0 0 1px var(--color-error),
          0 2px 8px -2px #00000033; // Keep depth on focus error
      }
    }
  }

  .output-feedback {
    margin-top: 0.75rem;
    font-size: 0.9rem;
    color: var(--color-foreground);
    min-height: 1.2em; // Reserve space to avoid layout shifts
    opacity: 0.9;

    &.error {
      color: var(--color-error);
    }
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

  .helper-text {
    margin-top: 0.4rem;
    font-size: 0.8rem;
    color: var(--color-foreground-opaque);
    line-height: 1.4;
  }
</style>
