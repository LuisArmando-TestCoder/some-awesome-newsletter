<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from '$lib/i18n/dashboard-translations';

  export let currentPage: number; // 0-indexed
  export let totalItems: number;
  export let pageSize: number;

  const dispatch = createEventDispatcher();

  $: totalPages = Math.ceil(totalItems / pageSize);

  function goToPage(page: number) {
    if (page < 0 || page >= totalPages) return;
    dispatch('pageChange', { page });
  }
</script>

{#if totalPages > 1}
  <nav class="pagination" aria-label="Pagination">
    <button
      type="button"
      class="pagination-btn newer"
      on:click={() => goToPage(currentPage - 1)}
      disabled={currentPage === 0}
    >
      <span aria-hidden="true">&larr;</span> {$t['pagination.newerEntries']}
    </button>
    <span class="pagination-status" aria-live="polite">
      {$t['pagination.page']} {currentPage + 1} {$t['pagination.of']} {totalPages}
    </span>
    <button
      type="button"
      class="pagination-btn older"
      on:click={() => goToPage(currentPage + 1)}
      disabled={currentPage + 1 >= totalPages}
    >
      {$t['pagination.olderEntries']} <span aria-hidden="true">&rarr;</span>
    </button>
  </nav>
{/if}

<style>
  .pagination {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-4, 16px);
    margin-top: var(--space-7, 48px);
  }

  .pagination-status {
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #444);
  }

  .pagination-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2, 8px);
    min-height: 2.5rem;
    padding: var(--space-2, 8px) var(--space-4, 16px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #111);
    border: 1px solid var(--border-2, #ccc);
    border-radius: var(--radius-full, 999px);
    font: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    cursor: pointer;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      border-color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }

  .pagination-btn:not(:disabled):hover {
    background: var(--surface-2, #f3f3f3);
    border-color: var(--accent, #2563eb);
  }

  .pagination-btn:focus-visible {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 2px;
  }

  .pagination-btn:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }

  @media (prefers-reduced-motion: reduce) {
    .pagination-btn {
      transition: none;
    }
  }
</style>
