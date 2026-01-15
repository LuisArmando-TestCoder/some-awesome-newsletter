<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import plansStore, {
        loadPlansContent,
        computeFeatures,
        setInterval,
        type PlansState,
    } from "$lib/config/plans.config";
    import Switch from "$lib/ui/components/Switch.svelte";
    import { t } from "$lib/i18n/translations";

    $: $t;

    let state: PlansState;
    const unsub = plansStore.subscribe((v) => (state = v));

    // Refined config to ensure clean naming and data flow
    const PLANS_CONFIG = [
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

    onDestroy(() => unsub());

    onMount(async () => {
        await loadPlansContent();
    });
</script>

<section class="pricing">
    <div class="pricing__backdrop"></div>

    <div class="pricing__container">
        <header class="pricing__header">
            <span class="pricing__eyebrow">{$t.pricing.eyebrow || "Flexible Pricing"}</span>
            <h1 class="pricing__title">{$t.pricing.title}</h1>
            <p class="pricing__subtitle">
                {$t.mainPage.disclaimer || "Simple, transparent pricing. No surprise fees."}
            </p>
        </header>

        <div class="pricing__toggle-wrapper">
            <div class="pricing__toggle-container">
                <span class="pricing__toggle-text" class:pricing__toggle-text--active={state.interval === "monthly"}>
                    {$t.pricing.monthly}
                </span>
                <div class="pricing__switch">
                    <Switch
                        toggled={state.interval === "yearly"}
                        onChange={(toggled) => setInterval(toggled ? "yearly" : "monthly")}
                    />
                </div>
                <span class="pricing__toggle-text" class:pricing__toggle-text--active={state.interval === "yearly"}>
                    {$t.pricing.yearly}
                    <span class="pricing__discount-badge">Save 35%</span>
                </span>
            </div>
        </div>

        <div class="pricing__grid">
            {#if state?.content?.plans}
                {#each state.content.plans.filter((p) => p.id === "free") as plan}
                    <article class="pricing__card pricing__card--basic">
                        <div class="pricing__card-content">
                            <div class="pricing__card-header">
                                <h2 class="pricing__card-name">{plan.name}</h2>
                                <p class="pricing__card-tagline">
                                    {$t.plans.plans.find((p) => p.id === "free")?.tagline}
                                </p>
                            </div>

                            <div class="pricing__price-block">
                                <span class="pricing__currency">$</span>
                                <span class="pricing__amount">0</span>
                                <span class="pricing__period">/mo</span>
                            </div>

                            <div class="pricing__divider"></div>

                            <ul class="pricing__features">
                                {#each computeFeatures(state.content, plan.id) as feature}
                                    <li class="pricing__feature-item">
                                        <span class="check-icon">✓</span>
                                        {feature}
                                    </li>
                                {/each}
                            </ul>

                            <div class="pricing__footer">
                                <a href="/signup" class="pricing__button pricing__button--outline">
                                    {$t.header.getStarted}
                                </a>
                            </div>
                        </div>
                    </article>
                {/each}

                {#each PLANS_CONFIG as tier}
                    {@const planData = state.content.plans.find((p) => p.id === tier.id)}
                    {@const isFeatured = tier.id === "growth"}
                    {#if planData}
                        <article
                            class="pricing__card"
                            class:pricing__card--featured={isFeatured}
                        >
                            {#if isFeatured}
                                <div class="featured-glow"></div>
                                <div class="pricing__card-badge">
                                    {$t.pricing.mostPopular}
                                </div>
                            {/if}

                            <div class="pricing__card-content">
                                <div class="pricing__card-header">
                                    <h2 class="pricing__card-name" class:highlight-text={isFeatured}>
                                        {planData.name}
                                    </h2>
                                    <p class="pricing__card-tagline">
                                        {$t.plans.plans.find((p) => p.id === tier.id)?.tagline}
                                    </p>
                                </div>

                                <div class="pricing__price-block">
                                    <span class="pricing__currency">$</span>
                                    <span class="pricing__amount">
                                        {calculatePrice(tier.mo, state.interval)}
                                    </span>
                                    <div class="pricing__period-box">
                                        <span class="period-text">/{state.interval === "monthly" ? "mo" : "yr"}</span>
                                        {#if state.interval === "yearly"}
                                            <span class="period-billed">billed annually</span>
                                        {/if}
                                    </div>
                                </div>

                                <div class="pricing__divider"></div>

                                <ul class="pricing__features">
                                    {#each computeFeatures(state.content, tier.id) as feature}
                                        <li class="pricing__feature-item">
                                            <span class="check-icon filled">✓</span>
                                            {feature}
                                        </li>
                                    {/each}
                                </ul>

                                <div class="pricing__footer">
                                    <a
                                        href={`/api/checkout?products=${planData.productId}&interval=${state.interval}`}
                                        class="pricing__button"
                                        class:pricing__button--primary={isFeatured}
                                        class:pricing__button--dark={!isFeatured}
                                    >
                                        {$t.pricing.upgradeTo.replace("{planName}", planData.name)}
                                    </a>
                                </div>
                            </div>
                        </article>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    /* --- CSS Variables & Tokens --- */
    :root {
        --p-font-sans: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        --p-c-bg: #f8fafc;
        --p-c-surface: #ffffff;
        --p-c-primary: #4f46e5; /* Indigo 600 */
        --p-c-primary-dark: #4338ca; /* Indigo 700 */
        --p-c-text-main: #0f172a;
        --p-c-text-muted: #64748b;
        --p-c-border: #e2e8f0;
        
        --p-gradient-glow: linear-gradient(135deg, #4f46e5 0%, #ec4899 100%);
        --p-shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);
        --p-shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
        --p-shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
        
        --p-radius: 20px;
        --p-transition: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    }

    .pricing {
        position: relative;
        padding: 6rem 1.5rem;
        background-color: var(--p-c-bg);
        font-family: var(--p-font-sans);
        overflow: hidden;

        /* Ambient Background Mesh */
        &__backdrop {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 800px;
            background: radial-gradient(circle at 50% 0%, #e0e7ff 0%, transparent 60%);
            z-index: 0;
            opacity: 0.6;
            pointer-events: none;
        }

        &__container {
            position: relative;
            z-index: 1;
            max-width: 1280px;
            margin: 0 auto;
        }

        /* --- Header --- */
        &__header {
            text-align: center;
            margin-bottom: 4rem;
            max-width: 700px;
            margin-inline: auto;
        }

        &__eyebrow {
            display: inline-block;
            color: var(--p-c-primary);
            font-weight: 700;
            font-size: 0.875rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            margin-bottom: 1rem;
            background: #eef2ff;
            padding: 0.25rem 0.75rem;
            border-radius: 99px;
        }

        &__title {
            font-size: clamp(2.5rem, 5vw, 3.75rem);
            font-weight: 800;
            color: var(--p-c-text-main);
            letter-spacing: -0.03em;
            line-height: 1.1;
            margin-bottom: 1rem;
        }

        &__subtitle {
            color: var(--p-c-text-muted);
            font-size: 1.25rem;
            line-height: 1.6;
            max-width: 45ch;
            margin-inline: auto;
        }

        /* --- Toggle --- */
        &__toggle-wrapper {
            display: flex;
            justify-content: center;
            margin-bottom: 4rem;
        }

        &__toggle-container {
            display: flex;
            align-items: center;
            gap: 1.25rem;
            padding: 0.5rem 0.75rem;
            background: rgba(255,255,255,0.6);
            backdrop-filter: blur(8px);
            border: 1px solid var(--p-c-border);
            border-radius: 99px;
            box-shadow: var(--p-shadow-sm);
        }

        &__toggle-text {
            font-size: 0.95rem;
            font-weight: 500;
            color: var(--p-c-text-muted);
            transition: color 0.3s ease;
            cursor: pointer;
            padding: 0.25rem 0.5rem;

            &--active {
                color: var(--p-c-text-main);
                font-weight: 700;
            }
        }

        &__discount-badge {
            background: linear-gradient(90deg, #dcfce7, #bbf7d0);
            color: #15803d;
            padding: 0.2rem 0.6rem;
            border-radius: 99px;
            font-size: 0.7rem;
            font-weight: 700;
            margin-left: 0.5rem;
            vertical-align: middle;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        /* --- Grid --- */
        &__grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(290px, 1fr));
            gap: 2rem;
            align-items: stretch; /* Cards equal height */
        }

        /* --- Card Architecture --- */
        &__card {
            position: relative;
            background: var(--p-c-surface);
            border-radius: var(--p-radius);
            display: flex;
            flex-direction: column;
            transition: transform 0.4s var(--p-transition), box-shadow 0.4s var(--p-transition);
            box-shadow: var(--p-shadow-sm);
            border: 1px solid transparent; /* Placeholder for layout */
            
            &--basic {
                border-color: var(--p-c-border);
            }

            /* The Featured "Gradient Border" Trick */
            &--featured {
                box-shadow: var(--p-shadow-xl);
                z-index: 2;
                transform: scale(1.02); /* Slight scale up */
                
                /* Gradient border via background origin */
                background: 
                    linear-gradient(var(--p-c-surface), var(--p-c-surface)) padding-box,
                    var(--p-gradient-glow) border-box;
                border: 2px solid transparent;

                &:hover {
                    transform: scale(1.03) translateY(-5px);
                }
            }

            &:not(&--featured):hover {
                transform: translateY(-5px);
                box-shadow: var(--p-shadow-lg);
                border-color: #cbd5e1;
            }
        }

        &__card-content {
            padding: 2.5rem 2rem;
            height: 100%;
            display: flex;
            flex-direction: column;
        }

        /* Top Badge for Featured */
        &__card-badge {
            position: absolute;
            top: -14px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--p-c-primary);
            color: white;
            padding: 0.35rem 1rem;
            border-radius: 99px;
            font-size: 0.75rem;
            font-weight: 700;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            box-shadow: 0 4px 10px rgba(79, 70, 229, 0.4);
            z-index: 10;
        }

        /* Featured Glow Effect */
        .featured-glow {
            position: absolute;
            inset: 0;
            background: var(--p-gradient-glow);
            filter: blur(40px);
            opacity: 0.15;
            z-index: -1;
            border-radius: var(--p-radius);
            pointer-events: none;
        }

        /* --- Card Content --- */
        &__card-header {
            margin-bottom: 1.5rem;
        }

        &__card-name {
            font-size: 1.25rem;
            font-weight: 700;
            color: var(--p-c-text-main);
            margin-bottom: 0.5rem;

            &.highlight-text {
                color: var(--p-c-primary);
            }
        }

        &__card-tagline {
            font-size: 0.9rem;
            color: var(--p-c-text-muted);
            min-height: 2.5em; /* Alignment fix */
        }

        /* --- Price Block --- */
        &__price-block {
            display: flex;
            align-items: flex-start;
            margin-bottom: 2rem;
            line-height: 1;
        }

        &__currency {
            font-size: 1.5rem;
            font-weight: 600;
            color: var(--p-c-text-muted);
            margin-top: 8px;
            margin-right: 2px;
        }

        &__amount {
            font-size: 3.5rem;
            font-weight: 800;
            color: var(--p-c-text-main);
            letter-spacing: -0.04em;
        }

        &__period-box {
            display: flex;
            flex-direction: column;
            margin-left: 6px;
            margin-top: 12px;
        }
        
        .period-text {
            font-size: 1rem;
            font-weight: 500;
            color: var(--p-c-text-muted);
        }

        .period-billed {
            font-size: 0.7rem;
            color: #94a3b8;
            white-space: nowrap;
        }

        &__divider {
            height: 1px;
            background: var(--p-c-border);
            margin-bottom: 2rem;
            width: 100%;
        }

        /* --- Features List --- */
        &__features {
            list-style: none;
            padding: 0;
            margin: 0 0 2rem 0;
            flex-grow: 1; /* Pushes footer down */
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        &__feature-item {
            font-size: 0.95rem;
            color: #334155;
            display: flex;
            align-items: flex-start;
            line-height: 1.4;

            .check-icon {
                color: #cbd5e1;
                margin-right: 12px;
                font-weight: 900;
                flex-shrink: 0;
                
                &.filled {
                    color: var(--p-c-primary);
                }
            }
        }

        /* --- Buttons --- */
        &__footer {
            margin-top: auto;
        }

        &__button {
            display: block;
            width: 100%;
            text-align: center;
            padding: 1rem;
            border-radius: 12px;
            font-weight: 600;
            text-decoration: none;
            transition: all 0.2s ease;
            position: relative;
            overflow: hidden;

            &--primary {
                background: var(--p-c-primary);
                color: white;
                box-shadow: 0 4px 6px -1px rgba(79, 70, 229, 0.3);
                
                &:hover {
                    background: var(--p-c-primary-dark);
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(79, 70, 229, 0.4);
                }
            }

            &--dark {
                background: var(--p-c-text-main);
                color: white;
                
                &:hover {
                    background: black;
                    transform: translateY(-2px);
                    box-shadow: 0 10px 15px -3px rgba(0,0,0,0.2);
                }
            }

            &--outline {
                background: transparent;
                border: 2px solid var(--p-c-border);
                color: var(--p-c-text-main);
                
                &:hover {
                    border-color: var(--p-c-text-main);
                    background: white;
                }
            }
        }
    }

    /* --- Responsive --- */
    @media (max-width: 768px) {
        .pricing {
            padding: 4rem 1rem;
        }
        .pricing__grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin: 0 auto;
        }
        .pricing__card--featured {
            transform: none;
            order: -1; /* Show featured first on mobile */
            margin-bottom: 1rem;
        }
        .pricing__card--featured:hover {
            transform: none;
        }
    }
</style>