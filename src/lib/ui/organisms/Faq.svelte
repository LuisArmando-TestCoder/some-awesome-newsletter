<script lang="ts">
    import { faqs as defaultFaqs, faqSlug, type FaqItem } from '../../../components/faq';
    import { t } from '$lib/i18n/translations';

    /** Items to show. When omitted, the `faq` list from the active locale is used. */
    export let items: FaqItem[] | null = null;
    /** Section heading. Pass an empty string to hide it. */
    export let title = 'Frequently asked questions';
    /** Heading level of the section title (questions use the next level). */
    export let headingLevel: 2 | 3 = 2;
    /** Shows a filter box above the list. */
    export let searchable = false;
    /** Prefix for element ids, so several instances can live on one page. */
    export let idPrefix = 'faq';

    let query = '';
    let open: Record<string, boolean> = {};

    $: list = (items ?? $defaultFaqs ?? []).map((item, i) => ({
        ...item,
        key: item.id || faqSlug(item.q) || `item-${i}`
    }));

    $: term = query.trim().toLowerCase();
    $: visible = term
        ? list.filter((f) => f.q.toLowerCase().includes(term) || f.a.toLowerCase().includes(term))
        : list;

    function toggle(key: string) {
        open = { ...open, [key]: !open[key] };
    }
</script>

<section id={idPrefix} class="faq" aria-labelledby={title ? `${idPrefix}-title` : undefined}>
    {#if title}
        <svelte:element this={`h${headingLevel}`} id={`${idPrefix}-title`} class="faq__title">
            {title}
        </svelte:element>
    {/if}

    {#if searchable}
        <div class="faq__search">
            <label class="faq__search-label" for={`${idPrefix}-search`}>{($t as any)?.helpCenter?.faqFilterLabel ?? 'Filter questions'}</label>
            <input
                id={`${idPrefix}-search`}
                class="faq__search-input"
                type="search"
                bind:value={query}
                autocomplete="off"
            />
        </div>
    {/if}

    {#if visible.length}
        <ul class="faq__list">
            {#each visible as item (item.key)}
                {@const isOpen = !!open[item.key]}
                <li class="faq__item" class:faq__item--open={isOpen}>
                    <svelte:element this={`h${headingLevel + 1}`} class="faq__q">
                        <button
                            type="button"
                            class="faq__button"
                            id={`${idPrefix}-q-${item.key}`}
                            aria-expanded={isOpen}
                            aria-controls={`${idPrefix}-a-${item.key}`}
                            on:click={() => toggle(item.key)}
                        >
                            <span>{item.q}</span>
                            <svg class="faq__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6" /></svg>
                        </button>
                    </svelte:element>
                    <div
                        class="faq__a"
                        id={`${idPrefix}-a-${item.key}`}
                        role="region"
                        aria-labelledby={`${idPrefix}-q-${item.key}`}
                        hidden={!isOpen}
                    >
                        <p>{item.a}</p>
                    </div>
                </li>
            {/each}
        </ul>
    {:else}
        <p class="faq__empty" role="status">{($t as any)?.helpCenter?.faqNoMatch ?? 'No questions match your filter.'}</p>
    {/if}
</section>

<style lang="scss">
    .faq {
        width: 100%;
        max-width: var(--container-md, 880px);
        margin: 0 auto;
        padding: var(--space-8, 64px) var(--space-4, 16px);
        color: var(--text-1, #0f172a);
        font-family: var(--font-body, inherit);
    }

    .faq__title {
        margin: 0 0 var(--space-6, 32px);
        font-family: var(--font-display, inherit);
        font-size: var(--fs-2xl, 2rem);
        font-weight: var(--fw-bold, 700);
        line-height: var(--lh-tight, 1.2);
        text-align: center;
    }

    .faq__search {
        display: flex;
        flex-direction: column;
        gap: var(--space-2, 8px);
        margin-bottom: var(--space-5, 24px);
    }

    .faq__search-label {
        font-size: var(--fs-sm, 0.875rem);
        font-weight: var(--fw-medium, 500);
        color: var(--text-2, #475569);
    }

    .faq__search-input {
        min-height: 44px;
        padding: var(--space-2, 8px) var(--space-4, 16px);
        border: 1px solid var(--border-2, #cbd5e1);
        border-radius: var(--radius-md, 10px);
        background: var(--surface-1, #fff);
        color: var(--text-1, #0f172a);
        font-size: var(--fs-md, 1rem);
    }

    .faq__list {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--border-1, #e5e7eb);
    }

    .faq__item {
        border-bottom: 1px solid var(--border-1, #e5e7eb);
    }

    .faq__q {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
    }

    .faq__button {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4, 16px);
        padding: var(--space-4, 16px) var(--space-1, 4px);
        background: none;
        border: none;
        text-align: left;
        cursor: pointer;
        color: var(--text-1, #0f172a);
        font-family: inherit;
        font-size: var(--fs-md, 1rem);
        font-weight: var(--fw-semibold, 600);
        line-height: var(--lh-normal, 1.5);
        border-radius: var(--radius-sm, 6px);

        &:hover { color: var(--text-link, #4338ca); }

        &:focus-visible {
            outline: 2px solid var(--focus-color, #6366f1);
            outline-offset: 2px;
        }
    }

    .faq__icon {
        flex-shrink: 0;
        color: var(--text-3, #64748b);
        transition: transform var(--dur-base, 200ms) var(--ease-out, ease-out);
    }

    .faq__item--open .faq__icon { transform: rotate(180deg); }

    .faq__a {
        padding: 0 var(--space-1, 4px) var(--space-4, 16px);

        p {
            margin: 0;
            color: var(--text-2, #475569);
            font-size: var(--fs-md, 1rem);
            line-height: var(--lh-normal, 1.6);
            max-width: 68ch;
        }
    }

    .faq__empty {
        color: var(--text-2, #475569);
        text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
        .faq__icon { transition: none; }
    }
</style>
