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
      aria-disabled={currentPage === 0 ? 'true' : undefined}
    >
      <span aria-hidden="true">&larr;</span> {$t['pagination.newerEntries']}
    </button>
    <span class="pagination-status" aria-live="polite">
      {$t['pagination.page']} <strong aria-current="page">{currentPage + 1}</strong> {$t['pagination.of']} {totalPages}
    </span>
    <button
      type="button"
      class="pagination-btn older"
      on:click={() => goToPage(currentPage + 1)}
      aria-disabled={currentPage + 1 >= totalPages ? 'true' : undefined}
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
    justify-content: space-between;
    gap: var(--space-4);
    margin-top: var(--space-8);
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);
  }

  /* Current page: semibold ink number, the rest quiet. */
  .pagination-status {
    font-size: var(--fs-sm);
    color: var(--text-3);
    font-variant-numeric: tabular-nums;
  }

  .pagination-status strong {
    color: var(--text-1);
    font-weight: var(--fw-semibold);
  }

  .pagination-btn {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-5);
    background: var(--surface-0);
    color: var(--text-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  .pagination-btn span {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .pagination-btn:not([aria-disabled='true']):hover {
      background: var(--surface-2);
      box-shadow: none;
      transition-duration: var(--t-in);
    }
    .newer:not([aria-disabled='true']):hover span {
      transform: translateX(-3px);
    }
    .older:not([aria-disabled='true']):hover span {
      transform: translateX(3px);
    }
  }

  .pagination-btn:not([aria-disabled='true']):active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  .pagination-btn:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .pagination-btn[aria-disabled='true'] {
    color: var(--text-3);
    border-color: var(--border-1);
    cursor: not-allowed;
  }

  @media (max-width: 30rem) {
    .pagination {
      justify-content: center;
    }
    .pagination-status {
      order: -1;
      flex-basis: 100%;
      text-align: center;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .pagination-btn,
    .pagination-btn span {
      transition: none;
      transform: none !important;
    }
  }
</style>
