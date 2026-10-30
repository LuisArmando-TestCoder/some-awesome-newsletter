<!-- WS4. Read-only plan list. Billing providers are off (Luis, 2026-10-30): no checkout, no
     payment form, no cancel. Each account keeps the plan saved on its config, new accounts start
     on Free, and the team changes plans by hand when an owner writes to support. Limits unchanged. -->
<script lang="ts">
    import { onMount } from "svelte";
    import plansStore, { loadPlansContent, computeFeatures, planChangeMailto, SUPPORT_EMAIL, type PlanId } from "$lib/config/plans.config";
    import store, { globalLanguage } from "../../../../../../store";
    import Button from "$lib/dashboard/ui/Button.svelte";
    import Icon from "$lib/dashboard/ui/Icon.svelte";
    import { dt } from "$lib/dashboard/i18n";

    // Passed by the step host (MultiSlotComponent); this view is always shown.
    export const canReveal: boolean = true;

    // Monthly prices in USD, shown for reference only. Same numbers as before; do not change here.
    const PLAN_ORDER: { id: PlanId; mo: number }[] = [
        { id: "free", mo: 0 },
        { id: "starter", mo: 17 },
        { id: "growth", mo: 35 },
        { id: "pro", mo: 80 },
        { id: "master", mo: 150 },
    ];

    $: if ($globalLanguage) loadPlansContent();
    $: state = $plansStore;
    $: current = $store.config?.pricingPlan || "free";
    $: mailto = planChangeMailto($store.configuratorEmail);

    onMount(() => {
        loadPlansContent();
    });
</script>

<div class="plans">
    <header class="plans__head">
        <h2 class="plans__title">{$dt("dash.billing.plansTitle")}</h2>
        <p class="plans__sub">{$dt("dash.billing.plansSub")}</p>
    </header>

    {#if state?.content?.plans}
        <div class="plans__grid">
            {#each PLAN_ORDER as tier (tier.id)}
                {@const planData = state.content.plans.find((p) => p.id === tier.id)}
                {@const isCurrent = current === tier.id}
                {#if planData}
                    <article class="plan" class:current={isCurrent}>
                        {#if isCurrent}<span class="plan__badge">{$dt("dash.billing.currentBadge")}</span>{/if}
                        <h3 class="plan__name">{planData.name}</h3>
                        <p class="plan__price">
                            <span class="plan__amount">${tier.mo}</span>
                            <span class="plan__period">{$dt("dash.billing.perMonth")}</span>
                        </p>
                        <ul class="plan__features">
                            {#each computeFeatures(state.content, tier.id) as feature, itemIndex (itemIndex)}
                                <li><Icon name="check" size={16} />{feature}</li>
                            {/each}
                        </ul>
                    </article>
                {/if}
            {/each}
        </div>
    {/if}

    <div class="ask">
        <p class="ask__text">{$dt("dash.billing.ask", { email: SUPPORT_EMAIL })}</p>
        <Button variant="secondary" icon="mail" href={mailto}>{$dt("dash.billing.askAction")}</Button>
    </div>
</div>

<style lang="scss">
    .plans { display: flex; flex-direction: column; gap: var(--space-4); }
    .plans__head { display: flex; flex-direction: column; gap: var(--space-1); }
    .plans__title { margin: 0; font-family: var(--font-body); font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--text-1); }
    .plans__sub { margin: 0; font-size: var(--fs-sm); color: var(--text-2); max-width: 60ch; }
    .plans__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(14rem, 1fr)); gap: var(--space-4); }
    .plan {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: var(--space-3);
        padding: var(--space-5);
        background: var(--surface-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-1);
        &.current { background: var(--accent-soft); border-color: var(--accent); }
    }
    .plan__badge {
        align-self: flex-start;
        padding: var(--space-1) var(--space-2);
        border-radius: var(--radius-full);
        background: var(--accent);
        color: var(--accent-contrast);
        font-size: var(--fs-xs);
        font-weight: var(--fw-semibold);
    }
    .plan__name { margin: 0; font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); }
    .plan__price { margin: 0; display: flex; align-items: baseline; gap: var(--space-1); }
    .plan__amount { font-family: var(--font-display); font-size: var(--fs-2xl); font-weight: var(--fw-bold); color: var(--text-1); font-variant-numeric: tabular-nums; }
    .plan__period { font-size: var(--fs-sm); color: var(--text-2); }
    .plan__features {
        list-style: none;
        margin: 0;
        padding: 0;
        display: grid;
        gap: var(--space-2);
        flex: 1;
        li { display: flex; gap: var(--space-2); align-items: flex-start; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
        li :global(svg) { flex: 0 0 auto; color: var(--success); margin-top: 2px; }
    }
    .ask {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: var(--space-3);
        flex-wrap: wrap;
        padding: var(--space-4) var(--space-5);
        background: var(--surface-2);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-lg);
    }
    .ask__text { margin: 0; font-size: var(--fs-sm); color: var(--text-1); max-width: 60ch; }
</style>
