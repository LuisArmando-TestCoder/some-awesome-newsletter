<!-- WS4. Pagination row: "Showing 1 to 25 of 1,240" plus previous and next. -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import Button from "../ui/Button.svelte";
  import { dt, formatNumber } from "../i18n";

  export let page = 1;
  export let pageSize = 25;
  export let total = 0;
  /** Accessible name for the navigation landmark. */
  export let label = "Pages";

  const dispatch = createEventDispatcher<{ change: number }>();

  $: pages = Math.max(1, Math.ceil(total / pageSize));
  $: from = total === 0 ? 0 : (page - 1) * pageSize + 1;
  $: to = Math.min(total, page * pageSize);

  // Page numbers to show: first, last, and the current page with one neighbour each side.
  $: numbers = pageList(page, pages);
  function pageList(cur: number, n: number): (number | "gap")[] {
    if (n <= 7) return Array.from({ length: n }, (_, i) => i + 1);
    const out: (number | "gap")[] = [1];
    const lo = Math.max(2, cur - 1);
    const hi = Math.min(n - 1, cur + 1);
    if (lo > 2) out.push("gap");
    for (let i = lo; i <= hi; i++) out.push(i);
    if (hi < n - 1) out.push("gap");
    out.push(n);
    return out;
  }

  function go(p: number) {
    const next = Math.min(pages, Math.max(1, p));
    if (next !== page) dispatch("change", next);
  }
</script>

<nav class="pager" aria-label={label}>
  <p class="pager__count" aria-live="polite">
    {$dt("dash.subs.pager.showing", { from: formatNumber(from), to: formatNumber(to), total: formatNumber(total) })}
  </p>
  {#if pages > 1}
    <div class="pager__buttons">
      <Button size="sm" variant="secondary" disabled={page <= 1} onclick={() => go(page - 1)}>{$dt("dash.subs.pager.prev")}</Button>
      <ul class="pager__nums">
        {#each numbers as n, i (n === "gap" ? `gap-${i}` : n)}
          {#if n === "gap"}
            <li class="pager__gap" aria-hidden="true">&hellip;</li>
          {:else}
            <li>
              <button
                type="button"
                class="pager__num"
                aria-current={n === page ? "page" : undefined}
                aria-label={$dt("dash.subs.pager.page", { page: formatNumber(n), pages: formatNumber(pages) })}
                on:click={() => go(n)}
              >{formatNumber(n)}</button>
            </li>
          {/if}
        {/each}
      </ul>
      <span class="pager__page">{$dt("dash.subs.pager.page", { page: formatNumber(page), pages: formatNumber(pages) })}</span>
      <Button size="sm" variant="secondary" disabled={page >= pages} onclick={() => go(page + 1)}>{$dt("dash.subs.pager.next")}</Button>
    </div>
  {/if}
</nav>

<style lang="scss">
  .pager {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding-top: var(--space-3);
  }
  .pager__count { margin: 0; font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; }
  .pager__buttons { display: flex; align-items: center; gap: var(--space-2); }
  .pager__nums { list-style: none; display: flex; align-items: center; gap: 2px; margin: 0; padding: 0; }
  .pager__num {
    display: grid;
    place-items: center;
    min-width: var(--control-h-sm);
    height: var(--control-h-sm);
    padding: 0 var(--space-2);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-variant-numeric: tabular-nums;
    cursor: pointer;
    transition: background-color var(--t-out) var(--ease-out), color var(--t-out) var(--ease-out), transform var(--t-out) var(--ease-out);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &:active { transform: scale(0.94); transition-duration: 60ms; }
    /* Current page: ink outline and semibold number, plus aria-current. */
    &[aria-current="page"] { border-color: var(--text-1); color: var(--text-1); font-weight: var(--fw-semibold); }
  }
  @media (hover: hover) and (pointer: fine) {
    .pager__num:not([aria-current="page"]):hover { background: var(--surface-2); color: var(--text-1); transition-duration: var(--t-in); }
  }
  .pager__gap { min-width: 1.5rem; text-align: center; color: var(--text-3); }
  .pager__page { display: none; font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; min-width: 8ch; text-align: center; }
  @media (forced-colors: active) {
    .pager__num[aria-current="page"] { forced-color-adjust: none; background: Highlight; color: HighlightText; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pager__num:active { transform: none; }
  }
  @media (max-width: 40rem) {
    .pager { flex-direction: column; align-items: stretch; }
    .pager__buttons { justify-content: space-between; }
    .pager__buttons :global(button) { min-height: 44px; }
    .pager__nums { display: none; }
    .pager__page { display: inline; }
  }
</style>
