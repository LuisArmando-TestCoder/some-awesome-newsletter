<script lang="ts">
  import { writable, derived, get } from "svelte/store";
  import type { Writable } from "svelte/store";
  import CustomSelect from "./CustomSelect.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  import { onMount } from "svelte";

  export let store: Writable<string> | undefined = undefined;
  export let value: string | undefined = undefined;
  export let onChange: ((value: string) => void) | undefined = undefined;
  export let exclude: Array<"minute" | "hour" | "dayOfMonth" | "month" | "dayOfWeek"> = [];
  export let label: string | undefined = undefined;

  const minuteStore = writable("0");
  const hourStore = writable("0");
  const dayOfMonthStore = writable("*");
  const monthStore = writable("*");
  const dayOfWeekStore = writable("*");

  let isParsing = false;
  let isMounted = false;

  function parseCron(cron: string | undefined) {
    if (!cron || typeof cron !== 'string') return;
    isParsing = true;
    const parts = cron?.split(" ");
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
    } else if (value) {
      parseCron(value);
    }
    isMounted = true;
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
    if (!isParsing && isMounted) {
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

  $: minutes = [
    { value: "*", label: $t['scheduleTime.everyMinute'] ?? "Every Minute" },
    ...Array.from({ length: 60 }, (_, i) => ({
      value: i.toString(),
      label: i.toString().padStart(2, "0"),
    })),
  ];
  $: hours = [
    { value: "*", label: $t['scheduleTime.everyHour'] ?? "Every Hour" },
    ...Array.from({ length: 24 }, (_, i) => ({
      value: i.toString(),
      label: i.toString().padStart(2, "0"),
    })),
  ];
  $: daysOfMonth = [
    { value: "*", label: $t['scheduleTime.everyDay'] ?? "Every day" },
    { value: "*/2", label: $t['scheduleTime.everyOtherDay'] ?? "Every Other Day" },
    ...Array.from({ length: 31 }, (_, i) => ({
      value: (i + 1).toString(),
      label: (i + 1).toString(),
    })),
  ];
  $: months = [
    { value: "*", label: $t['scheduleTime.everyMonth'] ?? "Every Month" },
    { value: "1", label: $t['cron.january'] ?? "January" },
    { value: "2", label: $t['cron.february'] ?? "February" },
    { value: "3", label: $t['cron.march'] ?? "March" },
    { value: "4", label: $t['cron.april'] ?? "April" },
    { value: "5", label: $t['cron.may'] ?? "May" },
    { value: "6", label: $t['cron.june'] ?? "June" },
    { value: "7", label: $t['cron.july'] ?? "July" },
    { value: "8", label: $t['cron.august'] ?? "August" },
    { value: "9", label: $t['cron.september'] ?? "September" },
    { value: "10", label: $t['cron.october'] ?? "October" },
    { value: "11", label: $t['cron.november'] ?? "November" },
    { value: "12", label: $t['cron.december'] ?? "December" },
  ];
  $: daysOfWeek = [
    { value: "*", label: $t['scheduleTime.everyDay'] ?? "Every day" },
    { value: "1-5", label: $t['scheduleTime.weekdays'] ?? "Weekdays" },
    { value: "0,6", label: $t['scheduleTime.weekends'] ?? "Weekends" },
    { value: "0", label: $t['cron.sunday'] ?? "Sunday" },
    { value: "1", label: $t['cron.monday'] ?? "Monday" },
    { value: "2", label: $t['cron.tuesday'] ?? "Tuesday" },
    { value: "3", label: $t['cron.wednesday'] ?? "Wednesday" },
    { value: "4", label: $t['cron.thursday'] ?? "Thursday" },
    { value: "5", label: $t['cron.friday'] ?? "Friday" },
    { value: "6", label: $t['cron.saturday'] ?? "Saturday" },
  ];
</script>

{#if label}
  <label>{label}</label>
{/if}
<div class="cron-builder">
  {#if !exclude.includes("month")}
    <CustomSelect label={$t['scheduleTime.month'] ?? "Month"} options={months} store={monthStore} />
  {/if}
  {#if !exclude.includes("dayOfMonth")}
    <CustomSelect label={$t['scheduleTime.dayOfMonth'] ?? "Day of the month"} options={daysOfMonth} store={dayOfMonthStore} />
  {/if}
  {#if !exclude.includes("dayOfWeek")}
    <CustomSelect label={$t['scheduleTime.dayOfWeek'] ?? "Day of the week"} options={daysOfWeek} store={dayOfWeekStore} />
  {/if}
  {#if !exclude.includes("hour")}
    <CustomSelect label={$t['scheduleTime.hour'] ?? "Hour"} options={hours} store={hourStore} />
  {/if}
  {#if !exclude.includes("minute")}
    <CustomSelect label={$t['scheduleTime.minute'] ?? "Minute"} options={minutes} store={minuteStore} />
  {/if}
</div>

<style>
  .cron-builder {
    display: flex;
    gap: 1rem;
    align-items: center;
  }
</style>
