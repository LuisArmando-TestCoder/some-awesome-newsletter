<script lang="ts">
  import { writable, derived, get } from "svelte/store";
  import type { Writable } from "svelte/store";
  import CustomSelect from "./CustomSelect.svelte";
  import { onMount } from "svelte";

  export let store: Writable<string> | undefined = undefined;
  export let value: string = "0 0 * * *";
  export let onChange: ((value: string) => void) | undefined = undefined;
  export let exclude: Array<"minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek"> = [];
  export let label: string | undefined = undefined;

  const minuteStore = writable("0");
  const hourStore = writable("0");
  const dayOfMonthStore = writable("*");
  const monthStore = writable("*");
  const dayOfWeekStore = writable("*");

  let isParsing = false;

  function parseCron(cron: string) {
    if (!cron || typeof cron !== 'string') return;
    isParsing = true;
    const parts = cron.split(" ");
    if (parts.length === 5) {
      minuteStore.set(parts[0]);
      hourStore.set(parts[1]);
      dayOfMonthStore.set(parts[2]);
      monthStore.set(parts[3]);
      dayOfWeekStore.set(parts[4]);
    }
    setTimeout(() => isParsing = false, 0);
  }

  onMount(() => {
    if (store) {
      parseCron(get(store));
      store.subscribe(v => {
        if (v !== get(cronStore)) {
          parseCron(v);
        }
      });
    } else {
      parseCron(value);
    }
  });

  dayOfMonthStore.subscribe(v => {
    if (!isParsing && v !== '*') {
      dayOfWeekStore.set('*');
    }
  });

  dayOfWeekStore.subscribe(v => {
    if (!isParsing && v !== '*') {
      dayOfMonthStore.set('*');
    }
  });

  const cronStore = derived(
    [minuteStore, hourStore, dayOfMonthStore, monthStore, dayOfWeekStore],
    ([$minute, $hour, $dayOfMonth, $month, $dayOfWeek]) => {
      let cronParts = [$minute, $hour, $dayOfMonth, $month, $dayOfWeek];
      return cronParts.join(" ");
    }
  );

  cronStore.subscribe((v) => {
    if (!isParsing) {
      if (store) {
        store.set(v);
      }
      if (onChange) {
        onChange(v);
      }
    }
  });

  $: if (!store && value !== get(cronStore)) {
    parseCron(value);
  }

  const minutes = [
    { value: "*", label: "Every Minute" },
    ...Array.from({ length: 60 }, (_, i) => ({
      value: i.toString(),
      label: i.toString().padStart(2, "0"),
    })),
  ];
  const hours = [
    { value: "*", label: "Every Hour" },
    ...Array.from({ length: 24 }, (_, i) => ({
      value: i.toString(),
      label: i.toString().padStart(2, "0"),
    })),
  ];
  const daysOfMonth = [
    { value: "*", label: "Every Day" },
    { value: "*/2", label: "Every Other Day" },
    ...Array.from({ length: 31 }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    })),
  ];
  const months = [
    { value: "*", label: "Every Month" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];
  const daysOfWeek = [
    { value: "*", label: "Every Day" },
    { value: "1-5", label: "Weekdays" },
    { value: "0,6", label: "Weekends" },
    { value: "0", label: "Sunday" },
    { value: "1", label: "Monday" },
    { value: "2", label: "Tuesday" },
    { value: "3", label: "Wednesday" },
    { value: "4", label: "Thursday" },
    { value: "5", label: "Friday" },
    { value: "6", label: "Saturday" },
  ];
</script>

{#if label}
  <label>{label}</label>
{/if}
<div class="cron-builder">
  {#if !exclude.includes("minute")}
    <CustomSelect label="Minute" options={minutes} store={minuteStore} />
  {/if}
  {#if !exclude.includes("hour")}
    <CustomSelect label="Hour" options={hours} store={hourStore} />
  {/if}
  {#if !exclude.includes("dayOfMonth")}
    <CustomSelect label="Day of Month" options={daysOfMonth} store={dayOfMonthStore} />
  {/if}
  {#if !exclude.includes("month")}
    <CustomSelect label="Month" options={months} store={monthStore} />
  {/if}
  {#if !exclude.includes("dayOfWeek")}
    <CustomSelect label="Day of Week" options={daysOfWeek} store={dayOfWeekStore} />
  {/if}
</div>

<style>
  .cron-builder {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>
