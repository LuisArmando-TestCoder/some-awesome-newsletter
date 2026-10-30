<!-- WS4. Clicks per day as CSS bars. Screen readers get a table with the same numbers. -->
<script lang="ts">
  import type { DayCount } from "./data";
  import { dt, formatNumber } from "../i18n";

  export let days: DayCount[] = [];

  const fmtShort = (d: Date) => {
    try { return new Intl.DateTimeFormat(undefined, { day: "numeric", month: "short" }).format(d); } catch { return d.toDateString(); }
  };
  const fmtLong = (d: Date) => {
    try { return new Intl.DateTimeFormat(undefined, { weekday: "long", day: "numeric", month: "long" }).format(d); } catch { return d.toDateString(); }
  };

  $: max = Math.max(0, ...days.map((d) => d.count));
  // Round the top of the scale up to a friendly number.
  $: top = max <= 5 ? Math.max(1, max) : Math.ceil(max / 5) * 5;
  $: total = days.reduce((n, d) => n + d.count, 0);
</script>

<figure class="chart">
  <figcaption class="sr-only">{$dt("dash.reports.chart.caption", { total: formatNumber(total) })}</figcaption>
  <p class="chart__unit" aria-hidden="true">{$dt("dash.reports.chart.clicks")}</p>
  <div class="chart__plot" role="img" aria-label={$dt("dash.reports.chart.caption", { total: formatNumber(total) })}>
    <div class="chart__axis">
      <span>{formatNumber(top)}</span>
      <span>{formatNumber(Math.round(top / 2))}</span>
      <span>0</span>
    </div>
    <div class="chart__area">
      <div class="chart__grid"><span></span><span></span><span></span></div>
      <div class="chart__bars">
        {#each days as d (d.key)}
          <div class="chart__col" title="{fmtLong(d.date)}: {formatNumber(d.count)}">
            <div class="chart__bar" class:zero={d.count === 0} class:peak={d.count > 0 && d.count === max} style="height: {top ? (d.count / top) * 100 : 0}%">
              {#if d.count > 0}<span class="chart__tip">{formatNumber(d.count)}</span>{/if}
            </div>
          </div>
        {/each}
      </div>
      <div class="chart__labels" aria-hidden="true">
        {#each days as d, i (d.key)}
          <span class="chart__label">{i % 7 === 0 || i === days.length - 1 ? fmtShort(d.date) : ""}</span>
        {/each}
      </div>
    </div>
  </div>
  <table class="sr-only">
    <caption>{$dt("dash.reports.chart.tableCaption")}</caption>
    <thead><tr><th scope="col">{$dt("dash.reports.chart.day")}</th><th scope="col">{$dt("dash.reports.chart.clicks")}</th></tr></thead>
    <tbody>
      {#each days as d (d.key)}<tr><td>{fmtLong(d.date)}</td><td>{d.count}</td></tr>{/each}
    </tbody>
  </table>
</figure>

<style lang="scss">
  .chart { margin: 0; }
  .chart__unit { margin: 0 0 var(--space-2); font-size: var(--fs-xs); color: var(--text-3); }
  .chart__plot { display: grid; grid-template-columns: auto minmax(0, 1fr); gap: var(--space-2); }
  .chart__axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 12rem;
    min-width: 1.5rem;
    font-size: var(--fs-xs);
    color: var(--text-3);
    text-align: right;
    font-variant-numeric: tabular-nums;
    span { line-height: 1; transform: translateY(-50%); }
    span:first-child { transform: none; }
    span:last-child { transform: translateY(0); }
  }
  .chart__area { position: relative; min-width: 0; }
  .chart__grid {
    position: absolute;
    inset: 0 0 auto 0;
    height: 12rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    pointer-events: none;
    span { border-top: 1px dashed var(--border-1); }
    span:last-child { border-top: 1px solid var(--border-2); }
  }
  .chart__bars { position: relative; display: flex; align-items: flex-end; gap: 2px; height: 12rem; }
  .chart__col { flex: 1 1 0; height: 100%; display: flex; align-items: flex-end; min-width: 0; }
  .chart__bar {
    position: relative;
    width: 100%;
    background: var(--text-3);
    border-radius: 3px 3px 0 0;
    min-height: 2px;
    transform-origin: bottom;
    transition: background-color var(--t-out) var(--ease-out);
    &.peak { background: var(--text-1); }
    &.zero { background: var(--border-1); }
  }
  /* Exact value above the bar on hover, so the chart is readable without the axis. */
  .chart__tip {
    position: absolute;
    bottom: calc(100% + 4px);
    left: 50%;
    padding: 2px var(--space-2);
    border-radius: var(--radius-sm);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
    opacity: 0;
    transform: translate(-50%, 4px);
    pointer-events: none;
    transition: opacity var(--t-out) var(--ease-out), transform var(--t-out) var(--ease-out);
    z-index: 1;
  }
  @media (hover: hover) and (pointer: fine) {
    .chart__col:hover .chart__bar:not(.zero) { background: var(--text-1); transition-duration: var(--t-in); }
    .chart__col:hover .chart__tip { opacity: 1; transform: translate(-50%, 0); transition-duration: var(--t-in); }
  }
  .chart__labels { display: flex; gap: 2px; margin-top: var(--space-2); }
  .chart__label { flex: 1 1 0; min-width: 0; font-size: var(--fs-xs); color: var(--text-3); white-space: nowrap; overflow: visible; font-variant-numeric: tabular-nums; }
  @media (forced-colors: active) {
    .chart__bar { background: CanvasText; }
    .chart__bar.zero { background: GrayText; }
  }
</style>
