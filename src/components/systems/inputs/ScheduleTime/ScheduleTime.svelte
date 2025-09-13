<script lang="ts">
  import { onMount } from "svelte";
  import cronToSentence from "./cronToNatural";

  // --- Props ---
  export let value: string = "daily"; // Initial value can be 'daily', 'weekly', 'monthly' or a cron string
  export let label: string = "Schedule Frequency";
  export let onChange: (schedule: string) => void = () => {};

  // --- Internal State ---
  let selectedFrequency: "daily" | "weekly" | "monthly" = "daily";
  let naturalSentence: string = "";

  // When the dropdown selection changes
  function handleSelectionChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    value = target.value as "daily" | "weekly" | "monthly";
    console.log("[ScheduleTime.svelte] New value selected:", value);
    onChange(value); // Notify parent of the change
  }

  // When the 'value' prop changes from the parent
  $: {
    if (value === "daily" || value === "weekly" || value === "monthly") {
      selectedFrequency = value;
    } else {
      const parts = value.split(" ");
      if (parts.length === 5) {
        if (parts[2] === "*" && parts[3] === "*" && parts[4] === "*") {
          selectedFrequency = "daily";
        } else if (parts[2] === "*" && parts[4] !== "*") {
          selectedFrequency = "weekly";
        } else if (parts[2] !== "*" && parts[4] === "*") {
          selectedFrequency = "monthly";
        } else {
          selectedFrequency = "daily"; // Fallback
        }
      } else {
        selectedFrequency = "daily"; // Fallback
      }
    }
    updateNaturalSentence(value);
  }

  function updateNaturalSentence(scheduleOrCron: string) {
    if (scheduleOrCron === "daily") {
      naturalSentence = "Runs once every day at a set time.";
    } else if (scheduleOrCron === "weekly") {
      naturalSentence = "Runs once every week on a set day and time.";
    } else if (scheduleOrCron === "monthly") {
      naturalSentence = "Runs once every month on a set day and time.";
    } else {
      try {
        // If it's a cron string, convert it to a sentence.
        naturalSentence = cronToSentence(scheduleOrCron);
      } catch (e) {
        // If parsing fails, just show the raw cron string.
        naturalSentence = `Custom schedule: ${scheduleOrCron}`;
      }
    }
  }
</script>

<template>
  <div class="schedule-select-wrapper">
    <label class="input-label" for="schedule-select">{label}</label>
    <div class="select-container">
      <select
        id="schedule-select"
        bind:value={selectedFrequency}
        on:change={handleSelectionChange}
      >
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
      </select>
    </div>

    <div class="feedback-area">
      {#if naturalSentence}
        <div class="output-feedback natural-desc">
          {naturalSentence}
        </div>
      {/if}
    </div>
  </div>
</template>

<style lang="scss">
  :root {
    --color-foreground-opaque: #e0e0e09a;
    --color-background-input: #ffffff1a;
    --color-background-input-border: #ffffff33;
    --color-natural-desc: #b0c4de;
  }

  .schedule-select-wrapper {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin: 1rem 0;
    font-family: sans-serif;
  }

  .input-label {
    margin-bottom: 0.5rem;
    color: var(--color-foreground);
    font-size: 0.9rem;
    font-weight: 500;
    opacity: 0.9;
  }

  .select-container {
    position: relative;
    width: 100%;
  }

  select {
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
    -webkit-appearance: none;
    appearance: none;
    background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%23ffffff%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
    background-repeat: no-repeat;
    background-position: right 1rem center;
    background-size: 0.65em auto;
    cursor: pointer;
  }

  select:focus {
    border-color: var(--color-foreground);
    box-shadow: 0 0 0 1px var(--color-foreground);
    outline: none;
  }

  .feedback-area {
    margin-top: 0.75rem;
    min-height: 1.5em;
  }

  .output-feedback.natural-desc {
    font-size: 0.85rem;
    color: var(--color-natural-desc);
    font-style: italic;
  }
</style>
