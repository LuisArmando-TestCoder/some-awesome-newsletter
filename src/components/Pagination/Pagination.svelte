<script lang="ts" generic="T">
    /**
     * Flexible, accessible, event‑driven pagination component.
     *
     * Props
     *  - items:        Local array of items to page (optional when using remote data)
     *  - pageSize:     Items per page (default 10)
     *  - total:        Total item count (remote pagination); defaults to items.length
     *  - initialPage:  Starting page (1‑based)
     *
     * Slots
     *  - default: receives { pageItems, currentPage, totalPages, setPage }
     *
     * Events
     *  - pagechange:   Fires whenever currentPage changes (detail: { page })
     */
    import { createEventDispatcher } from "svelte";

    export let items: T[] = [];
    export let pageSize: number = 10;
    export let total: number | null = null;
    export let initialPage: number = 1;

    if (pageSize <= 0) {
        throw new Error("pageSize must be greater than 0");
    }

    let currentPage: number = initialPage;
    const dispatch = createEventDispatcher<{ pagechange: { page: number } }>();

    /** Total pages (1‑based) — computed from local or remote total */
    $: effectiveTotal = total ?? items.length;
    $: totalPages = Math.max(1, Math.ceil(effectiveTotal / pageSize));

    /** Slice of items for current page (local mode) */
    $: pageItems = items.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize,
    );

    /** Ensure current page remains valid if totals shrink */
    $: if (currentPage > totalPages) setPage(totalPages);

    /** Imperative page setter with bounds‑checking + event */
    function setPage(p: number) {
        const next = Math.max(1, Math.min(p, totalPages));
        if (next !== currentPage) {
            currentPage = next;
            dispatch("pagechange", { page: currentPage });
        }
    }
</script>

<!-- default slot: expose helpers + data -->
<slot {pageItems} {currentPage} {totalPages} {setPage}></slot>

{#if totalPages > 1}
    <nav class="pagination" aria-label="Pagination Navigation">
        <button
            class="page-btn prev"
            on:click={() => setPage(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Previous Page"
        >
            ◀ Prev
        </button>

        {#if totalPages <= 7}
            {#each Array(totalPages) as _, i (i)}
                <button
                    class="page-btn num {currentPage === i + 1 ? 'active' : ''}"
                    on:click={() => setPage(i + 1)}
                    aria-current={currentPage === i + 1 ? "page" : undefined}
                >
                    {i + 1}
                </button>
            {/each}
        {:else}
            {#if currentPage > 3}
                <button class="page-btn num" on:click={() => setPage(1)}
                    >1</button
                >
                <span class="ellipsis" aria-hidden="true">…</span>
            {/if}

            {#each [currentPage - 1, currentPage, currentPage + 1] as p}
                {#if p >= 1 && p <= totalPages}
                    <button
                        class="page-btn num {currentPage === p ? 'active' : ''}"
                        on:click={() => setPage(p)}
                        aria-current={currentPage === p ? "page" : undefined}
                    >
                        {p}
                    </button>
                {/if}
            {/each}

            {#if currentPage < totalPages - 2}
                <span class="ellipsis" aria-hidden="true">…</span>
                <button
                    class="page-btn num"
                    on:click={() => setPage(totalPages)}>{totalPages}</button
                >
            {/if}
        {/if}

        <button
            class="page-btn next"
            on:click={() => setPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Next Page"
        >
            Next ►
        </button>
    </nav>
{/if}

<style lang="scss">
    .pagination {
        display: flex;
        gap: 0.5rem;
        justify-content: center;
        margin: 1.5rem 0;
    }

    .page-btn {
        background: none;
        border: 1px solid var(--color-background);
        padding: 0.4rem 0.8rem;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
        color: var(--color-background);

        &:hover:not(:disabled) {
            background: var(--color-background);
            color: var(--color-background-inversion, #fff);
        }

        &:disabled {
            opacity: 0.5;
            cursor: default;
        }

        &.active {
            background: var(--color-background);
            color: var(--color-background-inversion);
            font-weight: 600;
        }
    }

    .ellipsis {
        display: flex;
        align-items: center;
        padding: 0 0.4rem;
        user-select: none;
    }
</style>
