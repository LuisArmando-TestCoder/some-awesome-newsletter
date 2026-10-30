<!-- WS4. Ranked list with a proportional bar behind each count. -->
<script lang="ts">
  import { formatNumber } from "../i18n";
  export let items: { id: string; label: string; sub?: string; count: number; title?: string }[] = [];
  /** Largest value for the bar scale; defaults to the first item. */
  export let max: number | null = null;
  export let showShare = false;
  export let total = 0;

  $: scale = max ?? Math.max(1, ...items.map((i) => i.count));
</script>

<ol class="bars">
  {#each items as item (item.id)}
    <li class="bars__row" title={item.title ?? null}>
      <div class="bars__text">
        <span class="bars__label">{item.label}</span>
        {#if item.sub}<span class="bars__sub">{item.sub}</span>{/if}
      </div>
      <span class="bars__value">
        {formatNumber(item.count)}{#if showShare && total > 0}<span class="bars__share"> ({Math.round((item.count / total) * 100)}%)</span>{/if}
      </span>
      <span class="bars__track" aria-hidden="true"><span class="bars__fill" style="width: {(item.count / scale) * 100}%"></span></span>
    </li>
  {/each}
</ol>

<style lang="scss">
  .bars { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
  .bars__row { display: grid; grid-template-columns: 1fr auto; gap: var(--space-1) var(--space-3); align-items: baseline; }
  .bars__text { min-width: 0; display: flex; flex-direction: column; }
  .bars__label { font-size: var(--fs-sm); color: var(--text-1); font-weight: var(--fw-medium); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bars__sub { font-size: var(--fs-xs); color: var(--text-3); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .bars__value { font-size: var(--fs-sm); color: var(--text-1); font-variant-numeric: tabular-nums; font-weight: var(--fw-semibold); }
  .bars__share { color: var(--text-3); font-weight: var(--fw-regular); }
  .bars__track { grid-column: 1 / -1; height: var(--space-2); background: var(--surface-2); border-radius: var(--radius-full); overflow: hidden; }
  .bars__fill { display: block; height: 100%; background: var(--accent); border-radius: var(--radius-full); }
</style>
