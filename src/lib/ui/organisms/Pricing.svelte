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

    // Billing providers are off (Luis, 2026-10-30). Nobody pays in the app: every account starts on
    // Free and the team changes plans by hand when an owner writes to support.
    $: askLine = (($t as any)?.pricing?.askMore ?? 'Every account starts on the Free plan. If you need more, write to us at {email} and we will change your plan.').replace('{email}', SUPPORT_EMAIL);

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

        <div class="pricing__toggle-wrapper">
            <div class="pricing__toggle" role="group" aria-label={$t?.pricing?.intervalLabel ?? 'Billing period'}>
                <button
                    type="button"
                    class="pricing__toggle-btn"
                    class:pricing__toggle-btn--active={state.interval === 'monthly'}
                    aria-pressed={state.interval === 'monthly'}
                    on:click={() => setInterval('monthly')}
                >
                    {$t?.pricing?.monthly ?? 'Monthly'}
                </button>
                <button
                    type="button"
                    class="pricing__toggle-btn"
                    class:pricing__toggle-btn--active={state.interval === 'yearly'}
                    aria-pressed={state.interval === 'yearly'}
                    on:click={() => setInterval('yearly')}
                >
                    {$t?.pricing?.yearly ?? 'Yearly'}
                    <span class="pricing__discount-badge">{$t?.pricing?.yearlySave ?? 'Save 35%'}</span>
                </button>
            </div>
        </div>


        <div class="pricing__grid">
            {#if state?.content?.plans}
                {#each state.content.plans.filter((p) => p.id === 'free') as plan}
                    <article class="pricing__card" aria-labelledby="plan-{plan.id}-name">
                        <div class="pricing__card-header">
                            <svelte:element this={`h${headingLevel + 1}`} id="plan-{plan.id}-name" class="pricing__card-name">{plan.name}</svelte:element>
                            <p class="pricing__card-tagline">
                                {$t?.plans?.plans?.find((p) => p.id === 'free')?.tagline ?? ''}
                            </p>
                        </div>

                        <p class="pricing__price-block">
                            <span class="pricing__amount">$0</span>
                            <span class="pricing__period">{$t?.pricing?.perMonthShort ?? '/mo'}</span>
                        </p>

                        <ul class="pricing__features" aria-label={$t?.pricing?.includes ?? 'Includes'}>
                            {#each computeFeatures(state.content, plan.id) as feature}
                                <li class="pricing__feature-item">
                                    <svg class="pricing__check" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                                    {feature}
                                </li>
                            {/each}
                        </ul>

                        <div class="pricing__footer">
                            <a href="/signup" class="pricing__button pricing__button--secondary">
                                {$t?.pricing?.freeCta ?? $t?.header?.getStarted ?? 'Start free'}
                            </a>
                        </div>
                    </article>
                {/each}

                {#each PLANS_CONFIG as tier}
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
                                    {$t?.pricing?.mostPopular ?? 'Most popular'}
                                </p>
                            {/if}

                            <div class="pricing__card-header">
                                <svelte:element this={`h${headingLevel + 1}`} id="plan-{tier.id}-name" class="pricing__card-name">{planData.name}</svelte:element>
                                <p class="pricing__card-tagline">
                                    {$t?.plans?.plans?.find((p) => p.id === tier.id)?.tagline ?? ''}
                                </p>
                            </div>

                            <p class="pricing__price-block">
                                <span class="pricing__amount">${calculatePrice(tier.mo, state.interval)}</span>
                                <span class="pricing__period">
                                    {state.interval === 'monthly' ? ($t?.pricing?.perMonthShort ?? '/mo') : ($t?.pricing?.perYearShort ?? '/yr')}
                                </span>
                                {#if state.interval === 'yearly'}
                                    <span class="pricing__billed">{$t?.pricing?.billedYearly ?? 'billed yearly'}</span>
                                {/if}
                            </p>

                            <ul class="pricing__features" aria-label={$t?.pricing?.includes ?? 'Includes'}>
                                {#each computeFeatures(state.content, tier.id) as feature}
                                    <li class="pricing__feature-item">
                                        <svg class="pricing__check" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                                        {feature}
                                    </li>
                                {/each}
                            </ul>

                            <div class="pricing__footer">
{#if isCurrent}
                                    <span class="pricing__button pricing__button--secondary" aria-disabled="true">
                                        {$t?.billing?.currentPlanButton ?? 'Your plan'}
                                    </span>
                                {:else}
                                    <a
                                        href={planChangeMailto($store?.configuratorEmail, `Plan request: ${planData.name}`)}
                                        class="pricing__button"
                                        class:pricing__button--primary={isFeatured}
                                        class:pricing__button--secondary={!isFeatured}
                                    >
                                        {(($t as any)?.pricing?.askFor ?? 'Ask for {planName}').replace('{planName}', planData.name)}
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
            <a href={planChangeMailto($store?.configuratorEmail)} class="pricing__ask-link">{($t as any)?.pricing?.askAction ?? 'Write to us'}</a>
        </p>
    </div>
</section>

<style lang="scss">
    .pricing {
        padding: var(--space-8, 64px) var(--space-4, 16px);
        color: var(--text-1, #0f172a);
        font-family: var(--font-body, inherit);
    }

    .pricing__container {
        max-width: var(--container-lg, 1200px);
        margin: 0 auto;
    }

    .pricing__header {
        text-align: center;
        max-width: 640px;
        margin: 0 auto var(--space-6, 32px);
    }

    .pricing__eyebrow {
        margin: 0 0 var(--space-2, 8px);
        font-size: var(--fs-sm, 0.875rem);
        font-weight: var(--fw-semibold, 600);
        color: var(--text-2, #475569);
    }

    .pricing__title {
        margin: 0 0 var(--space-3, 12px);
        font-family: var(--font-display, inherit);
        font-size: var(--fs-3xl, 2.25rem);
        font-weight: var(--fw-bold, 700);
        line-height: var(--lh-tight, 1.15);
    }

    .pricing__subtitle {
        margin: 0;
        color: var(--text-2, #475569);
        font-size: var(--fs-md, 1rem);
    }

    .pricing__toggle-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: var(--space-6, 32px);
    }

    .pricing__toggle {
        display: inline-flex;
        padding: var(--space-1, 4px);
        gap: var(--space-1, 4px);
        border: 1px solid var(--border-1, #e5e7eb);
        border-radius: var(--radius-full, 999px);
        background: var(--surface-2, #f1f5f9);
    }

    .pricing__toggle-btn {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2, 8px);
        min-height: 40px;
        padding: var(--space-2, 8px) var(--space-4, 16px);
        border: none;
        border-radius: var(--radius-full, 999px);
        background: transparent;
        color: var(--text-2, #475569);
        font: inherit;
        font-size: var(--fs-sm, 0.875rem);
        font-weight: var(--fw-semibold, 600);
        cursor: pointer;
        transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
            color var(--dur-fast, 120ms) var(--ease-out, ease-out);

        &:hover { color: var(--text-1, #0f172a); }

        &--active {
            background: var(--surface-1, #fff);
            color: var(--text-1, #0f172a);
            box-shadow: var(--shadow-1, 0 1px 2px rgba(0, 0, 0, 0.08));
        }
    }

    .pricing__discount-badge {
        padding: 0 var(--space-2, 8px);
        border-radius: var(--radius-full, 999px);
        background: var(--success-soft, #dcfce7);
        color: var(--text-1, #0f172a);
        font-size: var(--fs-xs, 0.75rem);
        font-weight: var(--fw-semibold, 600);
        line-height: 1.6;
    }

    .pricing__ask {
        max-width: 640px;
        margin: var(--space-6, 32px) auto 0;
        text-align: center;
        font-size: var(--fs-sm, 0.875rem);
        color: var(--text-2, #475569);
    }

    .pricing__ask-link {
        margin-left: var(--space-1, 4px);
        color: var(--accent, #4f46e5);
        font-weight: var(--fw-semibold, 600);
        text-decoration: underline;
        text-underline-offset: 2px;
    }


    .pricing__grid {
        display: grid;
        gap: var(--space-4, 16px);
        grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
        align-items: stretch;

        &[aria-busy='true'] { opacity: 0.7; }
    }

    .pricing__card {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-4, 16px);
        padding: var(--space-6, 32px) var(--space-5, 24px);
        border: 1px solid var(--border-1, #e5e7eb);
        border-radius: var(--radius-lg, 14px);
        background: var(--surface-1, #fff);
        box-shadow: var(--shadow-1, 0 1px 2px rgba(0, 0, 0, 0.06));

        &--featured {
            border: 2px solid var(--accent, #4f46e5);
            box-shadow: var(--shadow-2, 0 8px 24px rgba(0, 0, 0, 0.1));
        }
    }

    .pricing__card-badge {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -50%);
        margin: 0;
        padding: var(--space-1, 4px) var(--space-3, 12px);
        border-radius: var(--radius-full, 999px);
        background: var(--accent, #4f46e5);
        color: var(--accent-contrast, #fff);
        font-size: var(--fs-xs, 0.75rem);
        font-weight: var(--fw-semibold, 600);
        white-space: nowrap;
    }

    .pricing__card-name {
        margin: 0 0 var(--space-1, 4px);
        font-family: var(--font-display, inherit);
        font-size: var(--fs-xl, 1.25rem);
        font-weight: var(--fw-bold, 700);
    }

    .pricing__card-tagline {
        margin: 0;
        color: var(--text-2, #475569);
        font-size: var(--fs-sm, 0.875rem);
    }

    .pricing__price-block {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: var(--space-1, 4px);
        margin: 0;
        padding-bottom: var(--space-4, 16px);
        border-bottom: 1px solid var(--border-1, #e5e7eb);
    }

    .pricing__amount {
        font-family: var(--font-display, inherit);
        font-size: var(--fs-3xl, 2.25rem);
        font-weight: var(--fw-bold, 700);
        line-height: 1;
        font-variant-numeric: tabular-nums;
    }

    .pricing__period {
        color: var(--text-2, #475569);
        font-size: var(--fs-sm, 0.875rem);
    }

    .pricing__billed {
        flex-basis: 100%;
        color: var(--text-3, #64748b);
        font-size: var(--fs-xs, 0.75rem);
    }

    .pricing__features {
        list-style: none;
        margin: 0;
        padding: 0;
        display: flex;
        flex-direction: column;
        gap: var(--space-2, 8px);
        flex: 1;
    }

    .pricing__feature-item {
        display: flex;
        align-items: flex-start;
        gap: var(--space-2, 8px);
        font-size: var(--fs-sm, 0.875rem);
        color: var(--text-1, #0f172a);
        line-height: var(--lh-normal, 1.5);
    }

    .pricing__check {
        flex-shrink: 0;
        margin-top: 0.2em;
        color: var(--success, #15803d);
    }

    .pricing__button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        min-height: 44px;
        padding: var(--space-2, 8px) var(--space-4, 16px);
        border-radius: var(--radius-full, 999px);
        border: 1px solid transparent;
        font: inherit;
        font-size: var(--fs-sm, 0.875rem);
        font-weight: var(--fw-semibold, 600);
        text-decoration: none;
        cursor: pointer;
        transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

        &--primary {
            background: var(--accent, #4f46e5);
            color: var(--accent-contrast, #fff);
            &:hover:not(:disabled) { background: var(--accent-hover, #4338ca); }
        }

        &--secondary {
            background: var(--surface-1, #fff);
            color: var(--text-1, #0f172a);
            border-color: var(--border-2, #cbd5e1);
            &:hover:not(:disabled) { background: var(--surface-2, #f1f5f9); }
        }

        &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
        }
    }

    .pricing button:focus-visible,
    .pricing a:focus-visible {
        outline: 2px solid var(--focus-color, #6366f1);
        outline-offset: 2px;
    }

    @media (prefers-reduced-motion: reduce) {
        .pricing__toggle-btn,
        .pricing__button { transition: none; }
    }
</style>
