<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import plansStore, {
      loadPlansContent,
      computeFeatures,
      setInterval,
      type Plan,
      type PlansState,
  } from "$lib/config/plans.config";
  import store from "../../../../../../store";
  import Switch from "$lib/ui/components/Switch.svelte";
  import { t } from "$lib/i18n/translations";

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  const currentPlan = writable<Plan | undefined>(undefined);
  let isProcessing = false;

  // Matches your provided structured config
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

  onMount(async () => {
      await loadPlansContent();
  });

  onDestroy(() => unsub());

  $: if ($store.config && state?.content) {
      const plan = state.content.plans.find((p) => p.id === $store.config.pricingPlan);
      currentPlan.set(plan);
      // Sync global interval if user is already on a yearly plan
      if ($store.config.billingInterval === "yearly" && state.interval !== "yearly") {
          setInterval("yearly");
      }
  }

  async function handleTilopayCheckout(plan: Plan, amount: number) {
      if (plan.id === "free" || $store.config?.pricingPlan === plan.id) return;

      isProcessing = true;
      try {
          const response = await fetch(
              `/api/checkout?products=${plan.id}&amount=${amount}&customerEmail=${$store.configuratorEmail}`
          );
          const { url, fields } = await response.json();

          const form = document.createElement("form");
          form.method = "POST";
          form.action = url;

          for (const [key, value] of Object.entries(fields)) {
              const input = document.createElement("input");
              input.type = "hidden";
              input.name = key;
              input.value = value as string;
              form.appendChild(input);
          }

          document.body.appendChild(form);
          form.submit();
      } catch (error) {
          console.error("Tilopay Error:", error);
          isProcessing = false;
      }
  }
</script>

<section class="pricing">
  <div class="pricing__container">
      <header class="pricing__header">
          <span class="pricing__eyebrow">{$t.billing.title}</span>
          <h1 class="pricing__title">{$t.billing.currentPlanTitle}</h1>
          <p class="pricing__subtitle">
              {$store.config.pricingPlan === 'vipfree' ? $t.billing.vipPlanDescription : 'Manage your subscription and scaling preferences.'}
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
                  <span class="pricing__discount-badge">-35%</span>
              </span>
          </div>
      </div>

      <div class="pricing__grid" class:pricing__grid--loading={isProcessing}>
          {#if state?.content?.plans}
              {#each state.content.plans.filter((p) => p.id === "free") as plan}
                  <article class="pricing__card pricing__card--free" class:pricing__card--active={$store.config.pricingPlan === plan.id}>
                      <div class="pricing__card-header">
                          <h2 class="pricing__card-name">{plan.name}</h2>
                          <p class="pricing__card-tagline">{$t.plans.plans.find((p) => p.id === "free")?.tagline}</p>
                      </div>

                      <div class="pricing__price-block">
                          <span class="pricing__currency">$</span>
                          <span class="pricing__amount">0</span>
                          <span class="pricing__period">/mo</span>
                      </div>

                      <ul class="pricing__features">
                          {#each computeFeatures(state.content, plan.id) as feature}
                              <li class="pricing__feature-item">{feature}</li>
                          {/each}
                      </ul>

                      <button 
                          class="pricing__button pricing__button--outline" 
                          disabled={$store.config.pricingPlan === plan.id}
                      >
                          {$store.config.pricingPlan === plan.id ? $t.billing.currentPlanButton : "Get Started"}
                      </button>
                  </article>
              {/each}

              {#each PLANS_CONFIG as tier}
                  {@const planData = state.content.plans.find((p) => p.id === tier.id)}
                  {@const price = calculatePrice(tier.mo, state.interval)}
                  
                  {#if planData}
                      <article
                          class="pricing__card"
                          class:pricing__card--featured={tier.id === "growth"}
                          class:pricing__card--active={$store.config.pricingPlan === tier.id}
                      >
                          {#if tier.id === "growth"}
                              <div class="pricing__card-badge">{$t.pricing.mostPopular}</div>
                          {/if}

                          <div class="pricing__card-header">
                              <h2 class="pricing__card-name">{planData.name}</h2>
                              <p class="pricing__card-tagline">
                                  {$t.plans.plans.find((p) => p.id === tier.id)?.tagline}
                              </p>
                          </div>

                          <div class="pricing__price-block">
                              <span class="pricing__currency">$</span>
                              <span class="pricing__amount">{price}</span>
                              <span class="pricing__period">/{state.interval === "monthly" ? "mo" : "yr"}</span>
                          </div>

                          <ul class="pricing__features">
                              {#each computeFeatures(state.content, tier.id) as feature}
                                  <li class="pricing__feature-item">{feature}</li>
                              {/each}
                          </ul>

                          <button
                              on:click={() => handleTilopayCheckout(planData, price)}
                              class="pricing__button"
                              class:pricing__button--primary={tier.id === "growth"}
                              class:pricing__button--dark={tier.id !== "growth"}
                              disabled={$store.config.pricingPlan === tier.id || $store.config.pricingPlan === 'vipfree'}
                          >
                              {#if $store.config.pricingPlan === tier.id}
                                  {$t.billing.currentPlanButton}
                              {:else}
                                  {$t.pricing.upgradeTo.replace("{planName}", planData.name)}
                              {/if}
                          </button>
                      </article>
                  {/if}
              {/each}
          {/if}
      </div>
  </div>
</section>

<style lang="scss">
  /* Using your provided BEM styles exactly */
  .pricing {
      padding: 40px 20px;
      background-color: #ffffff;
      min-height: 100vh;
      font-family: "Inter", sans-serif;

      &__container { max-width: 1200px; margin: 0 auto; }
      &__header { text-align: center; margin-bottom: 48px; }
      &__eyebrow { color: #3b82f6; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.875rem; }
      &__title { font-size: 2.5rem; font-weight: 800; color: #111827; margin: 12px 0; }
      &__subtitle { color: #6b7280; font-size: 1.125rem; }

      &__toggle-wrapper { display: flex; justify-content: center; margin-bottom: 60px; }
      &__toggle-container { display: flex; align-items: center; gap: 16px; padding: 8px 16px; background: #f3f4f6; border-radius: 99px; }
      &__toggle-text { font-size: 0.875rem; font-weight: 500; color: #6b7280; transition: color 0.2s;
          &--active { color: #111827; font-weight: 700; }
      }
      &__discount-badge { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; margin-left: 4px; }

      &__grid { 
          display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: stretch;
          &--loading { opacity: 0.6; pointer-events: none; }
      }

      &__card {
          position: relative; padding: 40px 32px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 24px; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;
          &:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
          &--featured { border: 2px solid #3b82f6; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2); }
          &--free { background: #fafafa; }
          &--active { border-style: dashed; background: #f9fafb; }
      }

      &__card-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: #3b82f6; color: white; padding: 6px 16px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
      &__card-name { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 4px; }
      &__card-tagline { font-size: 0.875rem; color: #6b7280; margin-bottom: 24px; }
      &__price-block { display: flex; align-items: baseline; margin-bottom: 32px; }
      &__currency { font-size: 1.5rem; font-weight: 600; color: #111827; }
      &__amount { font-size: 3.5rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
      &__period { font-size: 1rem; color: #6b7280; margin-left: 4px; }
      &__features { list-style: none; padding: 0; margin: 0 0 40px 0; flex-grow: 1; }

      &__feature-item {
          font-size: 0.95rem; color: #4b5563; padding: 10px 0; display: flex; align-items: center; border-bottom: 1px solid #f3f4f6;
          &:last-child { border-bottom: none; }
          &::before { content: "✓"; color: #22c55e; margin-right: 12px; font-weight: 900; }
      }

      &__button {
          width: 100%; display: block; text-align: center; padding: 16px; border-radius: 12px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s;
          &--primary { background: #3b82f6; color: white; &:hover { background: #2563eb; } }
          &--dark { background: #111827; color: white; &:hover { background: #000000; } }
          &--outline { border: 2px solid #e5e7eb; color: #374151; background: white; &:hover { background: #f9fafb; } }
          &:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; border: none; }
      }
  }
</style>