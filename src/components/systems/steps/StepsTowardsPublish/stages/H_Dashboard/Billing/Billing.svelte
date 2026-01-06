<script lang="ts">
  import { onMount } from "svelte";
  import { writable } from "svelte/store";
  import plansStore, {
    loadPlansContent,
    type Plan,
    type PlansState,
  } from "$lib/config/plans.config";
  import store from "../../../../../../store";
  import { t } from "$lib/i18n/dashboard-translations";
  import Switch from "$lib/ui/components/Switch.svelte";

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  const currentPlan = writable<Plan | undefined>(undefined);

  // Track billing cycle for the 35% discount UI toggle
  let billingCycle: "monthly" | "yearly" = "monthly";
  const ANNUAL_DISCOUNT = 0.35;

  onMount(async () => {
    await loadPlansContent();
  });

  $: {
    if ($store.config && state?.content) {
      const plan = state.content.plans.find(
        (p) => p.id === $store.config.pricingPlan,
      );
      currentPlan.set(plan);
      // Auto-set toggle if user is already on a yearly plan
      if ($store.config.billingInterval === "yearly") billingCycle = "yearly";
    }
  }

  function getPrice(plan: Plan, cycle: "monthly" | "yearly") {
    if (plan.id === "free") return 0;
    if (cycle === "monthly") return plan.monthly;
    // Apply 35% discount: (Monthly * 12) * 0.65
    return Math.floor(plan.monthly * 12 * (1 - ANNUAL_DISCOUNT));
  }
</script>

<div class="billing-dashboard">
  <h1 class="billing-header">{$t["billing.title"]}</h1>

  <div class="billing-section current-plan">
    <h2 class="section-title">{$t["billing.currentPlanTitle"]}</h2>
    <div class="card">
      {#if $store.config.pricingPlan === "vipfree"}
        <div class="plan-details">
          <h3 class="current-plan-name">{$t["billing.vipPlanName"]}</h3>
          <p class="current-plan-price">{$t["billing.vipPlanDescription"]}</p>
        </div>
      {:else if $currentPlan}
        <div class="plan-details">
          <h3 class="current-plan-name">{$currentPlan.name}</h3>
          <p class="current-plan-price">
            ${billingCycle === "monthly"
              ? $currentPlan.monthly
              : getPrice($currentPlan, "yearly")}
            {$t["billing.per"]}
            {billingCycle === "monthly"
              ? $t["billing.month"]
              : $t["billing.year"]}
          </p>
        </div>
        <a
          href={`/api/portal?customerEmail=${$store.configuratorEmail}`}
          class="manage-plan-button">{$t["billing.manageSubscription"]}</a
        >
      {:else}
        <p>{$t["billing.loadingPlan"]}</p>
      {/if}
    </div>
  </div>

  {#if $store.config.pricingPlan === "vipfree"}
    <div class="billing-section vip-message">
      <h2 class="section-title">{$t["billing.vipMessageTitle"]}</h2>
      <div class="card">
        <p>
          {$t["billing.vipMessageText"]}
          <a href="mailto:oriens@aiban.news">oriens@aiban.news</a>.
        </p>
      </div>
    </div>
  {:else}
    <div class="billing-section upgrade-plan">
      <div class="section-header-flex">
        <h2 class="section-title">{$t["billing.upgradePlanTitle"]}</h2>

        <div class="cycle-toggle">
          <span class:active={billingCycle === "monthly"}
            >{$t["billing.monthly"]}</span
          >
          <Switch
            toggled={billingCycle === "yearly"}
            onChange={(v) => (billingCycle = v ? "yearly" : "monthly")}
          />
          <span class:active={billingCycle === "yearly"}>
            {$t["billing.yearly"]}
            <span class="discount-badge">-35%</span>
          </span>
        </div>
      </div>

      <div class="plan-options">
        {#if state?.content?.plans}
          {#each state.content.plans.filter((p) => !p.internalOnly) as plan}
            <div
              class="plan-option-card"
              class:selected={$currentPlan?.id === plan.id}
              class:featured={plan.id === "growth"}
            >
              {#if plan.id === "growth"}
                <div class="popular-tag">{$t["billing.mostPopular"]}</div>
              {/if}

              <h3 class="plan-option-title">{plan.name}</h3>
              <div class="price-container">
                <span class="plan-option-price"
                  >${getPrice(plan, billingCycle)}</span
                >
                <span class="plan-option-interval"
                  >/{billingCycle === "monthly" ? "mo" : "yr"}</span
                >
              </div>

              {#if billingCycle === "yearly" && plan.id !== "free"}
                <span class="savings-note">{$t["billing.youSave"]} 35%</span>
              {/if}

              <ul class="plan-option-features">
                <li class="limit-highlighter">
                  <strong
                    >{plan.id === "free"
                      ? "100"
                      : plan.id === "starter"
                        ? "100,000"
                        : plan.id === "growth"
                          ? "250,000"
                          : plan.id === "pro"
                            ? "500,000"
                            : "Unlimited"}</strong
                  >
                  {$t["billing.users"]}
                </li>

                <li class="limit-highlighter">
                  <strong
                    >{plan.id === "free"
                      ? "1"
                      : plan.id === "starter"
                        ? "5"
                        : plan.id === "growth"
                          ? "17"
                          : plan.id === "pro"
                            ? "25"
                            : "50"}</strong
                  >
                  {$t["billing.newsSources"]}
                </li>

                {#each plan.featuresBase as feature}
                  {#if !["users", "newsSources"].includes(feature.toLowerCase())}
                    <li>
                      {($t as Record<string, string>)[feature] || feature}
                    </li>
                  {/if}
                {/each}
              </ul>

              {#if $currentPlan?.id === plan.id}
                <button class="upgrade-button current-plan-button" disabled
                  >{$t["billing.currentPlanButton"]}</button
                >
              {:else}
                <a
                  href={`/api/checkout?products=${plan.productId}&interval=${billingCycle}`}
                  class="upgrade-button"
                >
                  {$currentPlan && plan.tier < $currentPlan.tier
                    ? $t["billing.downgradeTo"]
                    : $t["billing.upgradeTo"]}
                  {plan.name}
                </a>
              {/if}
            </div>
          {/each}
        {/if}
      </div>
    </div>
  {/if}
</div>

<style>
  .billing-dashboard {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
      Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
    padding: 20px;
    background-color: #f0f2f5;
    color: #333;
  }

  .section-header-flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 15px;
  }

  .cycle-toggle {
    display: flex;
    align-items: center;
    gap: 10px;
    font-weight: 600;
    font-size: 0.9rem;
    background: white;
    padding: 8px 15px;
    border-radius: 50px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  }

  .cycle-toggle .active {
    color: #007bff;
  }

  .discount-badge {
    background: #28a745;
    color: white;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.7rem;
  }

  .billing-header {
    font-size: 1.8rem;
    font-weight: 600;
    margin-bottom: 30px;
    color: #1a202c;
  }

  .billing-section {
    margin-bottom: 40px;
  }

  .section-title {
    font-size: 1.3rem;
    font-weight: 500;
    margin: 0;
    color: #4a5568;
  }

  .card {
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    padding: 25px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
  }

  .plan-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }

  .plan-option-card {
    background-color: #fff;
    border-radius: 12px;
    padding: 25px;
    position: relative;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    display: flex;
    flex-direction: column;
    transition: transform 0.2s;
  }

  .plan-option-card.featured {
    border: 2px solid #007bff;
    transform: scale(1.03);
  }

  .popular-tag {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    background: #007bff;
    color: white;
    padding: 4px 12px;
    border-radius: 20px;
    font-size: 0.75rem;
    font-weight: 700;
  }

  .plan-option-card.selected {
    background-color: #1a202c;
    color: #fff;
  }

  .plan-option-card.selected * {
    color: #fff !important;
  }

  .price-container {
    margin: 10px 0;
  }

  .plan-option-price {
    font-size: 2rem;
    font-weight: 800;
    color: #1a202c;
  }

  .plan-option-interval {
    font-size: 1rem;
    color: #718096;
  }

  .savings-note {
    color: #28a745;
    font-size: 0.85rem;
    font-weight: 600;
    margin-bottom: 15px;
  }

  .limit-highlighter {
    color: #007bff;
    font-weight: 500;
  }

  .plan-option-features {
    list-style: none;
    padding: 0;
    margin: 20px 0;
    font-size: 0.9rem;
    flex-grow: 1;
  }

  .plan-option-features li {
    margin-bottom: 10px;
    padding-left: 25px;
    position: relative;
  }

  .plan-option-features li::before {
    content: "✔";
    color: #28a745;
    position: absolute;
    left: 0;
  }

  .upgrade-button {
    width: 100%;
    background-color: #007bff;
    color: #fff;
    text-align: center;
    text-decoration: none;
    border-radius: 6px;
    padding: 12px;
    font-weight: 600;
    transition: background 0.2s;
  }

  .upgrade-button:hover {
    background-color: #0056b3;
  }

  .current-plan-button {
    background-color: transparent;
    border: 2px dashed #4a5568;
    color: #4a5568;
  }

  .manage-plan-button {
    background-color: #28a745;
    color: #fff;
    padding: 10px 20px;
    border-radius: 6px;
    text-decoration: none;
    font-weight: 600;
  }

  @media (max-width: 600px) {
    .section-header-flex {
      flex-direction: column;
      align-items: flex-start;
    }
  }
</style>
