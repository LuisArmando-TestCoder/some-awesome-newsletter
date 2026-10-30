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

<ul class="bars">
  {#each rows as r (r.id)}
    <li>
      <a class="bars__row" href={`/admin/customers?plan=${r.id}`}>
        <span class="bars__label">{r.label}</span>
        <span class="bars__track" aria-hidden="true"><span class="bars__fill" style={`width: ${Math.max(2, (r.count / total) * 100)}%`}></span></span>
        <span class="bars__value">{num(r.count)}</span>
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
    gap: var(--space-2, 8px);
  }
  .bars__row {
    display: grid;
    grid-template-columns: minmax(7rem, 10rem) 1fr 3.5rem;
    align-items: center;
    gap: var(--space-3, 12px);
    padding: var(--space-1, 4px) var(--space-2, 8px);
    border-radius: var(--radius-sm, 4px);
    color: var(--text-1, inherit);
    text-decoration: none;
    font-size: var(--fs-sm, 0.875rem);
  }
  .bars__row:hover {
    background: var(--surface-2, transparent);
  }
  .bars__row:focus-visible {
    outline: 2px solid var(--focus-ring, currentColor);
  }
  .bars__track {
    height: 8px;
    border-radius: var(--radius-full, 999px);
    background: var(--surface-2, transparent);
    overflow: hidden;
  }
  .bars__fill {
    display: block;
    height: 100%;
    border-radius: inherit;
    background: var(--accent, currentColor);
  }
  .bars__value {
    text-align: right;
    font-variant-numeric: tabular-nums;
    color: var(--text-2, inherit);
  }
</style>
