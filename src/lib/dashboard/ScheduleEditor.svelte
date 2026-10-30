<!-- WS4. Plain schedule editor: how often, day, time and time zone.
     Stores the cron in the chosen time zone plus `scheduleTimezone` (IANA), so
     every day of the month works and nothing shifts across midnight.
     Sources saved before time zones existed have a UTC cron: it is converted
     to the owner's zone when the editor opens. -->
<script lang="ts">
  import Field from "./ui/Field.svelte";
  import Button from "./ui/Button.svelte";
  import { dt } from "./i18n";
  import { parseCron, nextRun, wallClock, browserTimeZone, isValidTimeZone, formatDateTime } from "./data/schedule";

  export let cron: string = "0 9 * * 1";
  /** Stored zone of `cron`. Empty means the cron is UTC (older sources). */
  export let timezone: string | null | undefined = null;
  export let saving = false;
  export let onsave: (cron: string, timezone: string) => void;
  export let oncancel: () => void;

  const uid = Math.random().toString(36).slice(2, 8);
  type Freq = "daily" | "weekdays" | "weekly" | "monthly";

  const storedTz = isValidTimeZone(timezone) ? timezone : "UTC";
  let tz = isValidTimeZone(timezone) ? timezone : browserTimeZone();

  // Read the stored cron as wall-clock values in `tz`.
  let freq: Freq = "weekly";
  let dow = 1;
  let dom = 1;
  let time = "09:00";
  const p = parseCron(cron);
  if (p) {
    const h = [...p.hours][0] ?? 9;
    const m = [...p.minutes][0] ?? 0;
    if (storedTz === tz) {
      time = `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
      if (!p.domStar) { freq = "monthly"; dom = [...p.dom][0] ?? 1; }
      else if (p.dowStar) freq = "daily";
      else if (p.dow.size === 5 && [1, 2, 3, 4, 5].every((d) => p.dow.has(d))) freq = "weekdays";
      else { freq = "weekly"; dow = [...p.dow][0] ?? 1; }
    } else {
      // Older UTC schedule: use its next run to read the same moment in the owner's zone.
      const n = nextRun(cron, new Date(), storedTz);
      const w = n ? wallClock(n, tz) : null;
      if (w) {
        time = `${String(w.h).padStart(2, "0")}:${String(w.mi).padStart(2, "0")}`;
        if (!p.domStar) { freq = "monthly"; dom = w.d; }
        else if (p.dowStar) freq = "daily";
        else if (p.dow.size === 5) freq = "weekdays";
        else { freq = "weekly"; dow = w.dow; }
      }
    }
  }

  let zones: string[] = [];
  try {
    zones = (Intl as unknown as { supportedValuesOf?: (k: string) => string[] }).supportedValuesOf?.("timeZone") ?? [];
  } catch {
    zones = [];
  }
  if (!zones.includes(tz)) zones = [tz, ...zones];
  if (!zones.includes("UTC")) zones = [...zones, "UTC"];

  const days = [1, 2, 3, 4, 5, 6, 0];
  function dayName(d: number) {
    const base = new Date(Date.UTC(2024, 0, 7 + d)); // 2024-01-07 is a Sunday
    try { return new Intl.DateTimeFormat(undefined, { weekday: "long", timeZone: "UTC" }).format(base); } catch { return String(d); }
  }

  function build(): string {
    const [hh, mm] = time.split(":").map((x) => parseInt(x, 10));
    const h = Math.min(23, Math.max(0, hh || 0));
    const m = Math.min(59, Math.max(0, mm || 0));
    if (freq === "daily") return `${m} ${h} * * *`;
    if (freq === "weekdays") return `${m} ${h} * * 1-5`;
    if (freq === "monthly") return `${m} ${h} ${dom} * *`;
    return `${m} ${h} * * ${dow}`;
  }

  // Arguments list the values the preview depends on, so Svelte recomputes it when any changes.
  function previewFor(_f: Freq, _d: number, _dm: number, _t: string, zone: string) {
    return nextRun(build(), new Date(), zone);
  }
  $: preview = previewFor(freq, dow, dom, time, tz);
</script>

<form class="sched" on:submit|preventDefault={() => onsave(build(), tz)}>
  <Field id="freq-{uid}" label={$dt("dash.automations.field.frequency")}>
    <select id="freq-{uid}" bind:value={freq}>
      <option value="daily">{$dt("dash.automations.freq.daily")}</option>
      <option value="weekdays">{$dt("dash.automations.freq.weekdays")}</option>
      <option value="weekly">{$dt("dash.automations.freq.weekly")}</option>
      <option value="monthly">{$dt("dash.automations.freq.monthly")}</option>
    </select>
  </Field>
  {#if freq === "weekly"}
    <Field id="dow-{uid}" label={$dt("dash.automations.field.day")}>
      <select id="dow-{uid}" bind:value={dow}>
        {#each days as d (d)}<option value={d}>{dayName(d)}</option>{/each}
      </select>
    </Field>
  {:else if freq === "monthly"}
    <Field id="dom-{uid}" label={$dt("dash.automations.field.dayOfMonth")} hint={dom > 28 ? $dt("dash.automations.field.dayOfMonthHint") : null}>
      <select id="dom-{uid}" bind:value={dom}>
        {#each Array.from({ length: 31 }, (_, i) => i + 1) as d (d)}<option value={d}>{d}</option>{/each}
      </select>
    </Field>
  {/if}
  <Field id="time-{uid}" label={$dt("dash.automations.field.time")}>
    <input id="time-{uid}" type="time" bind:value={time} required />
  </Field>
  <Field id="tz-{uid}" label={$dt("dash.automations.field.timezone")} hint={$dt("dash.automations.field.timezoneHint")}>
    <select id="tz-{uid}" bind:value={tz}>
      {#each zones as z (z)}<option value={z}>{z.replace(/_/g, " ")}</option>{/each}
    </select>
  </Field>
  <p class="sched__next" aria-live="polite">
    {#if preview}{$dt("dash.automations.field.nextPreview", { when: formatDateTime(preview, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) })}{/if}
  </p>
  <div class="sched__actions">
    <Button variant="secondary" onclick={oncancel}>{$dt("dash.common.cancel")}</Button>
    <Button variant="primary" type="submit" loading={saving}>{$dt("dash.common.save")}</Button>
  </div>
</form>

<style lang="scss">
  .sched { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: var(--space-3); align-items: start; }
  .sched__next { grid-column: 1 / -1; margin: 0; font-size: var(--fs-sm); color: var(--text-2); &:empty { display: none; } }
  .sched__actions { grid-column: 1 / -1; display: flex; justify-content: flex-end; gap: var(--space-2); flex-wrap: wrap; }
</style>
