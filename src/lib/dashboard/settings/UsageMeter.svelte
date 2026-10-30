<!-- WS4. Usage against a plan limit. At the limit is "at your limit" (you cannot add more);
     only above the limit is "over your limit". Warning starts at 80 percent. -->
<script lang="ts">
  import type { Meter } from "$lib/api/usage";
  import { dt, formatNumber } from "../i18n";

  export let label: string;
  export let meter: Meter;
  export let id = `meter-${Math.random().toString(36).slice(2, 8)}`;

  $: over = !meter.unlimited && meter.used > meter.limit;
  $: at = !meter.unlimited && meter.used === meter.limit;
  $: near = !meter.unlimited && !at && !over && meter.nearLimit;
  $: tone = over ? "danger" : at ? "warning" : near ? "warning" : "ok";
  $: width = meter.unlimited ? 0 : Math.min(100, meter.percent);
  $: status = meter.unlimited
    ? $dt("dash.billing.meter.unlimited")
    : over
      ? $dt("dash.billing.meter.over", { count: formatNumber(meter.used - meter.limit) })
      : at
        ? $dt("dash.billing.meter.at")
        : near
          ? $dt("dash.billing.meter.near", { count: formatNumber(meter.remaining) })
          : $dt("dash.billing.meter.left", { count: formatNumber(meter.remaining) });
</script>

<div class="meter tone-{tone}">
  <div class="meter__head">
    <span class="meter__label" id="{id}-label">{label}</span>
    <span class="meter__value">
      {#if meter.unlimited}
        {$dt("dash.billing.meter.usedUnlimited", { used: formatNumber(meter.used) })}
      {:else}
        {$dt("dash.billing.meter.usedOf", { used: formatNumber(meter.used), limit: formatNumber(meter.limit) })}
      {/if}
    </span>
  </div>
  {#if !meter.unlimited}
    <div
      class="meter__track"
      role="meter"
      aria-labelledby="{id}-label"
      aria-valuemin={0}
      aria-valuemax={meter.limit}
      aria-valuenow={Math.min(meter.used, meter.limit)}
      aria-valuetext={$dt("dash.billing.meter.usedOf", { used: formatNumber(meter.used), limit: formatNumber(meter.limit) })}
    >
      <span class="meter__bar" style="width: {width}%"></span>
    </div>
  {/if}
  <p class="meter__status">{status}</p>
</div>

<style lang="scss">
  .meter { display: flex; flex-direction: column; gap: var(--space-2); min-width: 0; }
  .meter__head { display: flex; justify-content: space-between; gap: var(--space-2); flex-wrap: wrap; align-items: baseline; }
  .meter__label { font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); }
  .meter__value { font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; }
  .meter__track { height: 8px; border-radius: var(--radius-full); background: var(--surface-3); overflow: hidden; }
  .meter__bar { display: block; height: 100%; border-radius: inherit; background: var(--accent); transition: width var(--dur-slow) var(--ease-out); }
  .tone-warning .meter__bar { background: var(--warning); }
  .tone-danger .meter__bar { background: var(--danger); }
  .meter__status { margin: 0; font-size: var(--fs-xs); color: var(--text-3); }
  .tone-warning .meter__status { color: var(--text-1); font-weight: var(--fw-medium); }
  .tone-danger .meter__status { color: var(--danger); font-weight: var(--fw-medium); }
</style>
