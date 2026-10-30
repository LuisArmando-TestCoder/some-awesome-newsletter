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
            <label class="faq__search-label" for={`${idPrefix}-search`}>{$t?.helpCenter?.faqFilterLabel ?? 'Filter questions'}</label>
            <input
                id={`${idPrefix}-search`}
                class="faq__search-input"
                type="search"
                bind:value={query}
                autocomplete="off"
                on:keydown={(e) => {
                    if (e.key === 'Escape' && query) {
                        e.preventDefault();
                        query = '';
                    }
                }}
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
                            <span class="faq__text">{item.q}</span>
                            <span class="faq__icon" aria-hidden="true">
                                <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                            </span>
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
        <p class="faq__empty" role="status">{$t?.helpCenter?.faqNoMatch ?? 'No questions match your filter.'}</p>
    {/if}
</section>

<style lang="scss">
    /* The parent decides width and side padding (landing chapter, pricing page column). */
    .faq {
        width: 100%;
        margin: 0 auto;
        color: var(--text-1);
        font-family: var(--font-body);
    }

    .faq__title {
        margin: 0 auto var(--space-7);
        max-width: 18ch;
        font-family: var(--font-display);
        font-size: var(--step-chapter);
        font-weight: var(--fw-semibold);
        line-height: var(--lh-display);
        letter-spacing: var(--tracking-display);
        text-align: center;
    }

    .faq__search {
        display: flex;
        flex-direction: column;
        gap: var(--space-2);
        margin-bottom: var(--space-5);
    }

    .faq__search-label {
        font-size: var(--fs-sm);
        font-weight: var(--fw-semibold);
        color: var(--text-1);
    }

    .faq__search-input {
        min-height: var(--control-h);
        padding: 0 var(--space-5);
        border: 1px solid var(--border-2);
        border-radius: var(--radius-full);
        background: var(--surface-0);
        color: var(--text-1);
        font-size: var(--fs-md);
        transition: border-color var(--t-out) var(--ease-out);

        &:focus-visible {
            outline: none;
            border-color: var(--text-1);
            box-shadow: var(--focus-ring);
        }
    }
    @media (hover: hover) and (pointer: fine) {
        .faq__search-input:hover:not(:focus-visible) {
            border-color: var(--text-2);
        }
    }

    .faq__list {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--border-1);
    }

    .faq__item {
        border-bottom: 1px solid var(--border-1);
    }

    .faq__q {
        margin: 0;
        font-size: inherit;
        font-weight: inherit;
        letter-spacing: 0;
    }

    /* Row: bleeds a little into the gutter so the hover layer frames the text. */
    .faq__button {
        width: calc(100% + 2 * var(--space-3));
        margin-inline: calc(-1 * var(--space-3));
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-4);
        min-height: 3.5rem;
        padding: var(--space-5) var(--space-3);
        border: 0;
        border-radius: var(--radius-md);
        background: transparent;
        color: var(--text-1);
        text-align: left;
        font-family: var(--font-body);
        font-size: var(--fs-lg);
        font-weight: var(--fw-medium);
        line-height: var(--lh-snug);
        letter-spacing: -0.01em;
        cursor: pointer;
        transition:
            background-color var(--t-out) var(--ease-out),
            transform var(--t-out) var(--ease-out);

        &:active {
            background: color-mix(in srgb, currentColor var(--state-press), transparent);
            transform: scale(0.995);
            transition-duration: 0ms;
        }

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    }
    .faq__text {
        min-width: 0;
    }

    .faq__icon {
        flex: none;
        display: grid;
        place-items: center;
        width: 2rem;
        height: 2rem;
        border: 1px solid var(--border-2);
        border-radius: var(--radius-full);
        color: var(--text-2);
        transition:
            border-color var(--t-out) var(--ease-out),
            color var(--t-out) var(--ease-out);

        .chevron {
            transition: transform var(--dur-slow) var(--ease-out);
        }
    }
    .faq__item--open .faq__icon {
        border-color: var(--text-1);
        color: var(--text-1);

        .chevron {
            transform: rotate(180deg);
        }
    }

    @media (hover: hover) and (pointer: fine) {
        .faq__button:hover {
            background: color-mix(in srgb, currentColor var(--state-hover), transparent);
            transition-duration: var(--t-in);
        }
        .faq__button:hover .faq__icon {
            border-color: var(--text-1);
            color: var(--text-1);
        }
    }

    .faq__a {
        padding: 0 var(--space-8) var(--space-5) 0;
        animation: faq-in var(--dur-base) var(--ease-out);

        p {
            margin: 0;
            max-width: 62ch;
            color: var(--text-2);
            font-size: var(--fs-md);
            line-height: var(--lh-normal);
        }
    }
    @keyframes faq-in {
        from {
            opacity: 0;
            transform: translateY(-4px);
        }
    }

    .faq__empty {
        color: var(--text-2);
        text-align: center;
    }

    @media (prefers-reduced-motion: reduce) {
        .faq__a {
            animation: none;
        }
        .faq__button:active {
            transform: none;
        }
    }
    :global(:root[data-motion='reduced']) .faq__a {
        animation: none;
    }
    :global(:root[data-motion='reduced']) .faq__button:active {
        transform: none;
    }

    @media (max-width: 30rem) {
        .faq__a {
            padding-right: 0;
        }
    }
</style>
