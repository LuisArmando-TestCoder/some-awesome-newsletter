<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { t } from '$lib/i18n/dashboard-translations';

  export let currentPage: number; // 0-indexed
  export let totalItems: number;
  export let pageSize: number;

  const dispatch = createEventDispatcher();

  $: totalPages = Math.ceil(totalItems / pageSize);

  function goToPage(page: number) {
    dispatch('pageChange', { page });
  }
</script>

{#if totalPages > 1}
  <div class="pagination">
    <button
      class="pagination-btn newer"
      on:click={() => goToPage(currentPage - 1)}
      disabled={currentPage === 0}
    >
      « {$t['pagination.newerEntries']}
    </button>
    <span>{$t['pagination.page']} {currentPage + 1} {$t['pagination.of']} {totalPages}</span>
    <button
      class="pagination-btn older"
      on:click={() => goToPage(currentPage + 1)}
      disabled={(currentPage + 1) >= totalPages}
    >
      {$t['pagination.olderEntries']} »
    </button>
  </div>
{/if}

<style>
.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  margin-top: 2.5rem;
}
.pagination-btn {
  background: none;
  border: none;
  color: var(--color-foreground);
  font-size: 1rem;
  padding: 0.5em 1.2em;
  border-radius: 999px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1);
  outline: none;
  min-width: 120px;
}
.pagination-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}
.pagination-btn:not(:disabled):hover {
  background: #f3f3f3;
  color: #0077cc;
  transform: translateY(-2px) scale(1.04);
  box-shadow: 0 2px 12px 0 rgba(0,119,204,0.07);
  transition: background 0.2s cubic-bezier(0.4,0,0.2,1), color 0.2s cubic-bezier(0.4,0,0.2,1), transform 0.3s cubic-bezier(0.4,0,0.2,1), box-shadow 0.3s cubic-bezier(0.4,0,0.2,1);
}
</style>
