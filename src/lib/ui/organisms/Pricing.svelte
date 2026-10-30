<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import plansStore, {
        loadPlansContent,
        computeFeatures,
        setInterval,
        type PlansState,
        type PlanId,
        planChangeMailto,
        SUPPORT_EMAIL,
    } from "$lib/config/plans.config";
    import { t } from "$lib/i18n/translations";
    import store from "../../../components/store";

    /** Show the eyebrow, title and subtitle. Pages with their own heading pass false. */
    export let showHeader = true;
    /** Heading level of the section title. Plan names use the next level. */
    export let headingLevel: 1 | 2 = 2;

    let state: PlansState;
    const unsub = plansStore.subscribe((v) => (state = v));

    const PLANS_CONFIG: { id: PlanId; mo: number }[] = [
        { id: "starter", mo: 17 },
        { id: "growth", mo: 35 },
        { id: "pro", mo: 80 },
        { id: "master", mo: 150 },
    ];

    const ANNUAL_DISCOUNT = 0.35;

    function calculatePrice(monthlyPrice: number, interval: string) {
        if (interval === "monthly") return monthlyPrice;
        return Math.floor(monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT));
    }

    /** Characters of the longer of a plan's two prices, "$" included: the width the amount keeps
        whichever period is selected, so switching it shifts nothing. */
    function priceChars(monthlyPrice: number) {
        const longest = Math.max(
            String(calculatePrice(monthlyPrice, "monthly")).length,
            String(calculatePrice(monthlyPrice, "yearly")).length,
        );
        return longest + 1;
    }

    $: yearly = state?.interval === "yearly";

    // Billing providers are off (Luis, 2026-10-30). Nobody pays in the app: every account starts on
    // Free and the team changes plans by hand when an owner writes to support.
    $: askLine = ($t?.pricing?.askMore ?? 'Every account starts on the Free plan. If you need more, write to us at {email} and we will change your plan.').replace('{email}', SUPPORT_EMAIL);

    onDestroy(() => unsub());

    onMount(async () => {
        await loadPlansContent();
    });
</script>

<section class="pricing" aria-labelledby={showHeader ? 'pricing-title' : undefined} aria-label={showHeader ? undefined : ($t?.pricing?.eyebrow ?? 'Pricing')}>
    <div class="pricing__container">
        {#if showHeader}
            <header class="pricing__header">
                <p class="pricing__eyebrow">{$t?.pricing?.eyebrow ?? 'Pricing'}</p>
                <svelte:element this={`h${headingLevel}`} id="pricing-title" class="pricing__title">
                    {$t?.pricing?.title ?? 'Plans and pricing'}
                </svelte:element>
                <p class="pricing__subtitle">
                    {$t?.mainPage?.disclaimer ?? ''}
                </p>
            </header>
        {/if}

        <!-- Billing period: a real radio group (arrow keys move the choice), with a sliding thumb. -->
        <div class="pricing__toggle-wrapper">
            <div
                class="pricing__toggle"
                class:pricing__toggle--yearly={yearly}
                role="radiogroup"
                aria-label={$t?.pricing?.intervalLabel ?? 'Billing period'}
            >
                <span class="pricing__thumb" aria-hidden="true"></span>
                <label class="pricing__opt">
                    <input
                        class="pricing__radio"
                        type="radio"
                        name="pricing-interval"
                        value="monthly"
                        checked={!yearly}
                        on:change={() => setInterval('monthly')}
                    />
                    <span class="pricing__opt-face">{$t?.pricing?.monthly ?? 'Monthly'}</span>
                </label>
                <label class="pricing__opt">
                    <input
                        class="pricing__radio"
                        type="radio"
                        name="pricing-interval"
                        value="yearly"
                        checked={yearly}
                        on:change={() => setInterval('yearly')}
                    />
                    <span class="pricing__opt-face">
                        {$t?.pricing?.yearly ?? 'Yearly'}
                        <span class="pricing__discount-badge">{$t?.pricing?.yearlySave ?? 'Save 35%'}</span>
                    </span>
                </label>
            </div>
        </div>

        <div class="pricing__grid">
            {#if state?.content?.plans}
                {#each state.content.plans.filter((p) => p.id === 'free') as plan (plan.id)}
                    <article class="pricing__card" aria-labelledby="plan-{plan.id}-name">
                        <div class="pricing__card-header">
                            <svelte:element this={`h${headingLevel + 1}`} id="plan-{plan.id}-name" class="pricing__card-name">{plan.name}</svelte:element>
                            <p class="pricing__card-tagline">
                                {$t?.plans?.plans?.find((p) => p.id === 'free')?.tagline ?? ''}
                            </p>
                        </div>

                        <p class="pricing__price-block" style:--price-ch={2}>
                            <span class="pricing__amount">$0</span>
                            <span class="pricing__period">{$t?.pricing?.perMonthShort ?? '/mo'}</span>
                            <span class="pricing__billed pricing__billed--hidden" aria-hidden="true">&nbsp;</span>
                        </p>

                        <ul class="pricing__features" aria-label={$t?.pricing?.includes ?? 'Includes'}>
                            {#each computeFeatures(state.content, plan.id) as feature, itemIndex (itemIndex)}
                                <li class="pricing__feature-item">
                                    <svg class="pricing__check" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                                    <span>{feature}</span>
                                </li>
                            {/each}
                        </ul>

                        <div class="pricing__footer">
                            <a href="/start" class="pricing__button pricing__button--secondary" data-cta="pricing-free">
                                {$t?.pricing?.freeCta ?? $t?.header?.getStarted ?? 'Start free'}
                            </a>
                        </div>
                    </article>
                {/each}

                {#each PLANS_CONFIG as tier (tier.id)}
                    {@const planData = state.content.plans.find((p) => p.id === tier.id)}
                    {@const isFeatured = tier.id === 'growth'}
                    {#if planData}
                        {@const isCurrent = $store?.config?.pricingPlan === planData.id}
                        <article
                            class="pricing__card"
                            class:pricing__card--featured={isFeatured}
                            aria-labelledby="plan-{tier.id}-name"
                            aria-describedby={isFeatured ? `plan-${tier.id}-badge` : undefined}
                        >
                            {#if isFeatured}
                                <p class="pricing__card-badge" id="plan-{tier.id}-badge">
                                    <span class="pricing__badge-dot" aria-hidden="true"></span>
                                    {$t?.pricing?.mostPopular ?? 'Most popular'}
                                </p>
                            {/if}

                            <div class="pricing__card-header">
                                <svelte:element this={`h${headingLevel + 1}`} id="plan-{tier.id}-name" class="pricing__card-name">{planData.name}</svelte:element>
                                <p class="pricing__card-tagline">
                                    {$t?.plans?.plans?.find((p) => p.id === tier.id)?.tagline ?? ''}
                                </p>
                            </div>

                            <!-- Width reserved for the longer of the two prices, so the toggle moves nothing. -->
                            <p class="pricing__price-block" style:--price-ch={priceChars(tier.mo)}>
                                <span class="pricing__amount">${calculatePrice(tier.mo, state.interval)}</span>
                                <span class="pricing__period">
                                    {yearly ? ($t?.pricing?.perYearShort ?? '/yr') : ($t?.pricing?.perMonthShort ?? '/mo')}
                                </span>
                                <span class="pricing__billed" class:pricing__billed--hidden={!yearly} aria-hidden={yearly ? undefined : 'true'}>
                                    {$t?.pricing?.billedYearly ?? 'billed yearly'}
                                </span>
                            </p>

                            <ul class="pricing__features" aria-label={$t?.pricing?.includes ?? 'Includes'}>
                                {#each computeFeatures(state.content, tier.id) as feature, itemIndex (itemIndex)}
                                    <li class="pricing__feature-item">
                                        <svg class="pricing__check" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                                        <span>{feature}</span>
                                    </li>
                                {/each}
                            </ul>

                            <div class="pricing__footer">
                                {#if isCurrent}
                                    <span class="pricing__button pricing__button--current" aria-disabled="true">
                                        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                                        {$t?.billing?.currentPlanButton ?? 'Your plan'}
                                    </span>
                                {:else}
                                    <a
                                        href={planChangeMailto($store?.configuratorEmail, `Plan request: ${planData.name}`)}
                                        class="pricing__button"
                                        class:pricing__button--primary={isFeatured}
                                        class:pricing__button--secondary={!isFeatured}
                                    >
                                        {($t?.pricing?.askFor ?? 'Ask for {planName}').replace('{planName}', planData.name)}
                                    </a>
                                {/if}
                            </div>
                        </article>
                    {/if}
                {/each}
            {/if}
        </div>

        <p class="pricing__ask">
            {askLine}
            <a href={planChangeMailto($store?.configuratorEmail)} class="pricing__ask-link">{$t?.pricing?.askAction ?? 'Write to us'} <span class="pricing__ask-arrow" aria-hidden="true">&#8250;</span></a>
        </p>
    </div>
</section>

<style lang="scss">
    /* Calm by design: no scroll effects near money. The parent provides side padding. */
    .pricing {
        color: var(--text-1);
        font-family: var(--font-body);
    }

    .pricing__container {
        container-type: inline-size;
        width: 100%;
        max-width: var(--container-xl);
        margin: 0 auto;
    }

    .pricing__header {
        max-width: 40rem;
        margin: 0 auto var(--space-7);
        text-align: center;
    }
    .pricing__eyebrow {
        margin: 0 0 var(--space-3);
        font-size: var(--fs-sm);
        font-weight: var(--fw-semibold);
        color: var(--text-3);
    }
    .pricing__title {
        margin: 0 0 var(--space-4);
        font-family: var(--font-display);
        font-size: var(--step-chapter);
        font-weight: var(--fw-semibold);
        line-height: var(--lh-display);
        letter-spacing: var(--tracking-display);
    }
    .pricing__subtitle {
        margin: 0;
        color: var(--text-2);
        font-size: var(--fs-md);
    }

    /* ---------- Billing toggle ---------- */
    .pricing__toggle-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: var(--space-8);
    }

    .pricing__toggle {
        position: relative;
        display: inline-grid;
        grid-template-columns: 1fr 1fr; /* equal halves, sized by the wider label */
        max-width: 100%;
        padding: var(--space-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-full);
        background: var(--surface-2);
    }

    .pricing__thumb {
        position: absolute;
        top: var(--space-1);
        bottom: var(--space-1);
        left: var(--space-1);
        width: calc(50% - var(--space-1));
        border-radius: var(--radius-full);
        background: var(--surface-0);
        box-shadow: var(--shadow-1), 0 0 0 1px var(--border-1);
        transition: transform var(--dur-slow) var(--ease-out);
    }
    .pricing__toggle--yearly .pricing__thumb {
        transform: translateX(100%);
    }

    .pricing__opt {
        position: relative;
        z-index: 1;
        display: flex;
        min-width: 0;
    }

    .pricing__radio {
        position: absolute;
        width: 1px;
        height: 1px;
        margin: 0;
        opacity: 0;
        pointer-events: none;
    }

    .pricing__opt-face {
        display: inline-flex;
        flex: 1;
        flex-wrap: wrap; /* a long translation wraps inside its half instead of widening the page */
        align-items: center;
        justify-content: center;
        gap: var(--space-1) var(--space-2);
        min-height: 2.75rem;
        padding: var(--space-1) var(--space-4);
        border-radius: var(--radius-full);
        color: var(--text-2);
        font-size: var(--fs-sm);
        font-weight: var(--fw-semibold);
        text-align: center;
        cursor: pointer;
        user-select: none;
        transition:
            color var(--t-state) var(--ease-out),
            background-color var(--t-out) var(--ease-out),
            transform var(--t-out) var(--ease-out);
    }
    .pricing__radio:checked + .pricing__opt-face {
        color: var(--text-1);
    }
    .pricing__radio:focus-visible + .pricing__opt-face {
        box-shadow: var(--focus-ring);
    }
    @media (hover: hover) and (pointer: fine) {
        .pricing__radio:not(:checked) + .pricing__opt-face:hover {
            color: var(--text-1);
            background: color-mix(in srgb, currentColor var(--state-hover), transparent);
            transition-duration: var(--t-in);
        }
    }
    .pricing__opt:active .pricing__radio:not(:checked) + .pricing__opt-face {
        background: color-mix(in srgb, currentColor var(--state-press), transparent);
        transform: scale(0.97);
        transition-duration: 0ms;
    }

    .pricing__discount-badge {
        padding: 0 var(--space-2);
        border: 1px solid var(--border-2);
        border-radius: var(--radius-full);
        color: var(--text-1);
        font-size: var(--fs-xs);
        font-weight: var(--fw-semibold);
        line-height: 1.6;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
    }

    /* ---------- Plans ---------- */
    .pricing__grid {
        display: grid;
        gap: var(--space-4);
        grid-template-columns: minmax(0, 1fr);
        align-items: stretch;
    }
    @container (min-width: 36rem) {
        .pricing__grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }
    @container (min-width: 52rem) {
        .pricing__grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    .pricing__card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-5);
        min-width: 0;
        padding: var(--space-6) var(--space-5);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-xl);
        background: var(--surface-0);
        overflow-wrap: anywhere;
    }

    /* Recommended: ink edge, a soft float, and a written label (never color alone). */
    .pricing__card--featured {
        border-color: var(--text-1);
        box-shadow: 0 0 0 1px var(--text-1), var(--shadow-2);
    }

    .pricing__card-badge {
        position: absolute;
        top: 0;
        left: var(--space-5);
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        margin: 0;
        padding: var(--space-1) var(--space-3);
        border: 1px solid var(--text-1);
        border-radius: var(--radius-full);
        background: var(--surface-0);
        color: var(--text-1);
        font-size: var(--fs-xs);
        font-weight: var(--fw-semibold);
        white-space: nowrap;
        transform: translateY(-50%);
    }
    .pricing__badge-dot {
        width: 0.375rem;
        height: 0.375rem;
        border-radius: var(--radius-full);
        background: currentColor;
    }

    @container (min-width: 66rem) {
        .pricing__grid {
            grid-template-columns: repeat(5, minmax(0, 1fr));
            gap: var(--space-3);
            padding-top: var(--space-4);
        }
        .pricing__card {
            padding: var(--space-6) var(--space-4) var(--space-5);
        }
        .pricing__card-badge {
            left: var(--space-4);
        }
        .pricing__card--featured {
            translate: 0 calc(-1 * var(--space-4));
        }
        .pricing__amount {
            font-size: var(--fs-2xl);
        }
    }

    .pricing__card-name {
        margin: 0 0 var(--space-1);
        font-family: var(--font-display);
        font-size: var(--fs-xl);
        font-weight: var(--fw-semibold);
        letter-spacing: var(--tracking-tight);
    }

    .pricing__card-tagline {
        margin: 0;
        min-height: calc(2 * var(--lh-normal) * 1em);
        color: var(--text-2);
        font-size: var(--fs-sm);
        line-height: var(--lh-normal);
    }

    .pricing__price-block {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        column-gap: var(--space-1);
        margin: 0;
        padding-bottom: var(--space-5);
        border-bottom: 1px solid var(--border-1);
    }

    .pricing__amount {
        display: inline-block;
        min-inline-size: calc(var(--price-ch, 4) * 1ch);
        font-family: var(--font-display);
        font-size: var(--fs-3xl);
        font-weight: var(--fw-semibold);
        line-height: 1;
        letter-spacing: var(--tracking-tight);
        font-variant-numeric: tabular-nums;
    }

    .pricing__period {
        min-inline-size: 2.5ch;
        color: var(--text-2);
        font-size: var(--fs-sm);
    }

    .pricing__billed {
        flex-basis: 100%;
        margin-top: var(--space-2);
        color: var(--text-3);
        font-size: var(--fs-xs);
    }
    .pricing__billed--hidden {
        visibility: hidden;
    }

    .pricing__features {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        flex: 1;
    }

    .pricing__feature-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2);
        font-size: var(--fs-sm);
        color: var(--text-1);
        line-height: var(--lh-snug);
    }

    .pricing__check {
        flex-shrink: 0;
        margin-top: 0.1em;
        color: var(--text-1);
    }

    /* ---------- Plan actions ---------- */
    .pricing__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: var(--space-2);
        width: 100%;
        min-height: var(--control-h);
        padding: var(--space-2) var(--space-4);
        border: 1px solid transparent;
        border-radius: var(--radius-full);
        font: inherit;
        font-size: var(--fs-sm);
        font-weight: var(--fw-medium);
        text-align: center;
        text-decoration: none;
        cursor: pointer;
        transition:
            background-color var(--t-out) var(--ease-out),
            border-color var(--t-out) var(--ease-out),
            transform var(--t-out) var(--ease-out);

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
    }
    .pricing__button--primary {
        background: var(--accent);
        color: var(--accent-contrast);
    }
    .pricing__button--secondary {
        background: var(--surface-0);
        color: var(--text-1);
        border-color: var(--border-2);
    }
    .pricing__button--current {
        background: var(--surface-2);
        color: var(--text-2);
        cursor: default;
    }
    @media (hover: hover) and (pointer: fine) {
        .pricing__button--primary:hover {
            background: var(--accent-hover);
            transition-duration: var(--t-in);
        }
        .pricing__button--secondary:hover {
            background: color-mix(in srgb, var(--text-1) var(--state-hover), var(--surface-0));
            border-color: var(--text-1);
            transition-duration: var(--t-in);
        }
    }
    .pricing__button--primary:active,
    .pricing__button--secondary:active {
        transform: scale(0.97);
        transition-duration: 60ms;
    }
    .pricing__button--secondary:active {
        background: color-mix(in srgb, var(--text-1) var(--state-press), var(--surface-0));
    }

    .pricing__ask {
        max-width: 44rem;
        margin: var(--space-7) auto 0;
        text-align: center;
        font-size: var(--fs-sm);
        line-height: var(--lh-normal);
        color: var(--text-2);
    }

    .pricing__ask-link {
        display: inline-flex;
        align-items: center;
        gap: var(--space-1);
        min-height: 1.5rem;
        margin-left: var(--space-1);
        color: var(--text-1);
        font-weight: var(--fw-semibold);
        text-decoration: underline;
        text-decoration-thickness: 1px;
        text-underline-offset: 0.2em;
        border-radius: var(--radius-sm);

        &:focus-visible {
            outline: none;
            box-shadow: var(--focus-ring);
        }
        &:active {
            opacity: 0.7;
        }
    }
    .pricing__ask-arrow {
        display: inline-block;
        transition: transform var(--t-out) var(--ease-out);
    }
    @media (hover: hover) and (pointer: fine) {
        .pricing__ask-link:hover {
            text-decoration-thickness: 2px;
        }
        .pricing__ask-link:hover .pricing__ask-arrow {
            transform: translateX(3px);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .pricing__button--primary:active,
        .pricing__button--secondary:active,
        .pricing__opt:active .pricing__radio:not(:checked) + .pricing__opt-face {
            transform: none;
        }
    }
    :global(:root[data-motion='reduced']) .pricing__button:active,
    :global(:root[data-motion='reduced']) .pricing__opt:active .pricing__opt-face {
        transform: none;
    }

    @media (forced-colors: active) {
        .pricing__thumb {
            forced-color-adjust: none;
            background: Highlight;
        }
        .pricing__radio:checked + .pricing__opt-face {
            forced-color-adjust: none;
            color: HighlightText;
        }
        .pricing__card--featured {
            border-width: 3px;
        }
    }
</style>
