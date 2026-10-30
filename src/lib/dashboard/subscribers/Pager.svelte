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
  .pager__page { font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; min-width: 8ch; text-align: center; }
  @media (max-width: 40rem) {
    .pager { flex-direction: column; align-items: stretch; }
    .pager__buttons { justify-content: space-between; }
    .pager__buttons :global(button) { min-height: 44px; }
  }
</style>
