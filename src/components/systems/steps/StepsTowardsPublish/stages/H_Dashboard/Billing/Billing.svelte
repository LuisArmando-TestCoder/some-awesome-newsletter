<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import plansStore, {
		loadPlansContent,
		type Plan,
		type PlansState
	} from '$lib/config/plans.config';
	import store from '../../../../../../store';

	let state: PlansState;
	const unsub = plansStore.subscribe((v) => (state = v));

	const currentPlan = writable<Plan | undefined>(undefined);

	onMount(async () => {
		await loadPlansContent();
	});

  async function handlePortal() {
    const response = await fetch(`/api/portal?customerEmail=${$store.config.configuratorId}`);
    const { url } = await response.json();
    window.location.href = url;
  }

	$: {
		if ($store.config && state?.content) {
			const plan = state.content.plans.find((p) => p.id === $store.config.pricingPlan);
			currentPlan.set(plan);
		}
	}
</script>

<div class="billing-dashboard">
  <h1 class="billing-header">Billing & Subscriptions</h1>

  <!-- Current Plan Section -->
  <div class="billing-section current-plan">
    <h2 class="section-title">Current Plan</h2>
    <div class="card">
      {#if $store.config.pricingPlan === 'vipfree'}
        <div class="plan-details">
          <h3 class="current-plan-name">VIP</h3>
          <p class="current-plan-price">Exclusive access for our most valued members.</p>
        </div>
      {:else if $currentPlan}
        <div class="plan-details">
          <h3 class="current-plan-name">{$currentPlan.name}</h3>
          <p class="current-plan-price">${$currentPlan.monthly} per month</p>
        </div>
        <a href={`/api/portal?customerEmail=${$store.config.configuratorId}`} class="manage-plan-button">Manage Subscription</a>
      {:else}
        <p>Loading your plan details...</p>
      {/if}
    </div>
  </div>

  <!-- Upgrade Plan Section -->
  {#if $store.config.pricingPlan === 'vipfree'}
    <div class="billing-section vip-message">
      <h2 class="section-title">A Message for our VIPs</h2>
      <div class="card">
        <p>
          As a VIP member, you have unrestricted access to all features. We're thrilled to have you
          with us and appreciate your support. If you have any questions or feedback, please don't
          hesitate to reach out to our CEO <a href="mailto:oriens@aiexecutions.com">oriens@aiexecutions.com</a>.
        </p>
      </div>
    </div>
  {:else}
    <div class="billing-section upgrade-plan">
      <h2 class="section-title">Upgrade Your Plan</h2>
      <div class="plan-options">
        {#if state?.content?.plans}
          {#each state.content.plans.filter((p) => !p.internalOnly) as plan}
            <div class="plan-option-card" class:selected={$currentPlan?.id === plan.id}>
              <h3 class="plan-option-title">{plan.name}</h3>
              <p class="plan-option-price">${plan.monthly}/month</p>
              {#if plan.id === 'yearly'}
                <span class="plan-option-equivalent"><i><sup>(equivalent to ${plan.yearly} yearly)</sup></i></span>
              {/if}
              <ul class="plan-option-features">
                {#each plan.featuresBase as feature}
                  <li>{feature}</li>
                {/each}
                {#each plan.featuresDelta as feature}
                  <li>{feature}</li>
                {/each}
              </ul>
              {#if $currentPlan?.id === plan.id}
                <button class="upgrade-button current-plan-button" disabled>This is your current plan</button>
              {:else if $currentPlan && plan.tier < $currentPlan.tier}
                <a href={`/api/checkout?products=${plan.productId}`} class="upgrade-button">Downgrade to {plan.name}</a>
              {:else}
                <a href={`/api/checkout?products=${plan.productId}`} class="upgrade-button">Upgrade to {plan.name}</a>
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
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 20px;
    background-color: #f0f2f5;
    color: #333;
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
    margin-bottom: 15px;
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

  /* Current Plan Styles */
  .current-plan-name {
    font-size: 1.2rem;
    font-weight: 600;
    margin: 0 0 5px 0;
  }
  .current-plan-price {
    font-size: 1rem;
    color: #555;
    margin: 0 0 10px 0;
  }
  .plan-renewal-date {
    font-size: 0.9rem;
    color: #777;
    margin: 0;
  }
  .cancel-plan-button {
    background-color: #e53e3e;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .cancel-plan-button:hover {
    background-color: #c53030;
  }
  .manage-plan-button {
    background-color: #3ee570;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .manage-plan-button:hover {
    background-color: #4caf50;
  }

  /* Upgrade Plan Styles */
  .plan-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  .plan-option-card {
    background-color: #fff;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    border: 1px solid #e2e8f0;
    transition: all 0.3s ease;
  }

  .plan-option-card.selected {
    background-color: #000;
    color: #fff;

    * {
      color: white;
    }

    button {
      background: transparent;
    }
  }
  .plan-option-title {
    font-size: 1.2rem;
    font-weight: 600;
  }
  .plan-option-price {
    font-size: 1.1rem;
    color: #007bff;
    margin: 10px 0;
  }

  .plan-option-equivalent {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  .plan-option-features {
    list-style: none;
    padding: 0;
    margin: 15px 0;
    font-size: 0.9rem;
    color: #555;
  }
  .plan-option-features li {
    margin-bottom: 8px;
    position: relative;
    padding-left: 20px;
  }
  .plan-option-features li::before {
    content: '✔';
    color: #28a745;
    position: absolute;
    left: 0;
  }
  .upgrade-button {
    width: 100%;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 12px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.3s;
  }
  .upgrade-button:hover {
    background-color: #0056b3;
  }

  .current-plan-button {
    background-color: transparent;
    color: #fff;
    border: 2px dashed #fff;
  }

  /* Payment Method Styles */
  .card-info {
    font-size: 1rem;
    font-weight: 500;
    margin: 0 0 5px 0;
  }
  .card-expiry {
    font-size: 0.9rem;
    color: #777;
    margin: 0;
  }
  .update-payment-button {
    background-color: #6c757d;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px 15px;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .update-payment-button:hover {
    background-color: #5a6268;
  }

  /* Billing History Styles */
  .history-table {
    width: 100%;
    border-collapse: collapse;
  }
  .history-table th, .history-table td {
    padding: 12px 15px;
    text-align: left;
    border-bottom: 1px solid #e2e8f0;
  }
  .history-table th {
    font-size: 0.9rem;
    font-weight: 600;
    color: #4a5568;
  }
  .history-table td {
    font-size: 0.95rem;
  }
  .invoice-link {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
  }
  .invoice-link:hover {
    text-decoration: underline;
  }

  .vip-message .card p a {
    color: #007bff;
    text-decoration: none;
    font-weight: 500;
  }

  .vip-message .card p a:hover {
    text-decoration: underline;
  }
</style>
