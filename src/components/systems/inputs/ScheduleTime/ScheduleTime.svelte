<script lang="ts">
  import { writable } from "svelte/store";

  // Props for the ScheduleTime input component.
  export let value: string = "";
  export let placeholder: string = 'e.g., "every Monday at 9 AM"';
  export let label: string = "Schedule Time";

  // Callback to be invoked when the input changes.
  export let onChange: (schedule: string, cron: string) => void = () => {};

  // Writable store holding the schedule and its corresponding cron expression.
  // Other components can subscribe to this store for updates.
  export const scheduleStore = writable({ schedule: value, cron: "" });

  // A naive conversion function from natural language to cron syntax for demonstration.
  function convertToCron(input: string): string {
    const lower = input.toLowerCase().trim();
    if (!lower) return "";
    if (lower.includes("every monday at 9 am")) return "0 9 * * 1";
    if (lower.includes("every day at midnight")) return "0 0 * * *";
    if (lower.includes("every friday at 5 pm")) return "0 17 * * 5";
    // Fallback: return a default cron expression.
    return "0 0 * * *";
  }

  // Reactive statement: recalc cron expression whenever `value` changes.
  $: cronExpression = convertToCron(value);
  // Reactive statement: update the store with the current natural language input and its cron conversion.
  $: scheduleStore.set({ schedule: value, cron: cronExpression });

  // Handle input events: update the value and call the onChange callback.
  function handleInput(event: Event) {
    const target = event.target as HTMLInputElement;
    value = target.value;
    onChange(value, cronExpression);
  }
</script>

<div class="schedule-input-wrapper">
  <label for="schedule-input" class="input-label">{value && cronExpression ? label || placeholder : label}</label>
  <input
    id="schedule-input"
    type="text"
    bind:value
    {placeholder}
    on:input={handleInput}
    class:valid={value && cronExpression !== ""}
    aria-label={label}
  />
  {#if value}
    <div class="cron-output">
      Cron Expression: <code style="background-color: var(--color-background);">{cronExpression}</code>
    </div>
  {/if}
  <div class="helper-text">
    Enter a natural language schedule (e.g., "every Monday at 9 AM") to generate
    a cron expression.
  </div>
</div>

<style lang="scss">
  .schedule-input-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    margin: 1rem 0;
  }

  .input-label {
    margin-bottom: 0.5rem;
    color: var(--color-foreground);
    font-size: 1rem;
  }

  input {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    color: var(--color-foreground);
    transition:
      border 0.3s ease,
      box-shadow 0.3s ease;
    outline: none;
  }

  input::placeholder {
    color: var(--color-foreground-opaque);
  }

  input:focus {
    border-color: var(--color-foreground);
    box-shadow: 0 0 10px -2px var(--color-foreground);
  }

  input.valid {
    border-color: green;
    box-shadow: 0 0 10px -2px green;
  }

  .cron-output {
    margin-top: 0.5rem;
    font-size: 0.9rem;
    color: var(--color-foreground);
  }

  .cron-output code {
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
  }

  .helper-text {
    margin-top: 0.25rem;
    font-size: 0.8rem;
    color: var(--color-foreground-opaque);
  }
</style>
