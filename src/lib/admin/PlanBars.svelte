<script lang="ts">
  /** Horizontal bars: customers per plan. Text carries the numbers; bars are decoration. */
  import { PLAN_OPTIONS } from "$lib/api/admin";
  import { num } from "./format";

  let { byPlan }: { byPlan: Record<string, number> } = $props();
  const total = $derived(Object.values(byPlan).reduce((a, b) => a + b, 0) || 1);
  const rows = $derived(
    PLAN_OPTIONS.map((p) => ({ id: p.value, label: p.label, count: byPlan[p.value] ?? 0 })).filter((r) => r.count > 0 || r.id === "free")
  );
</script>

<ul class="bars" aria-label={`Customers by plan, ${num(total)} in total`}>
  {#each rows as r (r.id)}
    <li>
      <a class="bars__row" href={`/admin/customers?plan=${r.id}`}>
        <span class="bars__label">{r.label}</span>
        <span class="bars__track" aria-hidden="true"><span class="bars__fill" style={`width: ${Math.max(2, (r.count / total) * 100)}%`}></span></span>
        <span class="bars__value">{num(r.count)}<span class="bars__share"> {Math.round((r.count / total) * 100)}%</span></span>
      </a>
    </li>
  {/each}
</ul>

<style>
  .bars {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 2px;
  }
  .bars__row {
    display: grid;
    grid-template-columns: minmax(6rem, 9rem) minmax(0, 1fr) minmax(5rem, auto);
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--text-1);
    text-decoration: none;
    font-size: var(--fs-sm);
    transition: background-color var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .bars__row:hover {
      background: var(--surface-2);
      transition-duration: var(--t-in);
    }
    .bars__row:hover .bars__fill {
      background: var(--text-1);
    }
  }
  .bars__row:active {
    background: var(--surface-3);
    transition-duration: 60ms;
  }
  .bars__row:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .bars__track {
    height: 6px;
    border-radius: var(--radius-full);
    background: var(--surface-2);
    overflow: hidden;
  }
  .bars__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--text-2);
    transition: background-color var(--t-out) var(--ease-out);
  }
  .bars__value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    white-space: nowrap;
  }
  .bars__share {
    color: var(--text-3);
    font-weight: var(--fw-regular);
  }
  @media (forced-colors: active) {
    .bars__fill {
      background: CanvasText;
    }
  }
</style>
