<script lang="ts">
  import { onMount } from 'svelte';
  import plansStore, { loadPlansContent, computeFeatures, type PlanId, setInterval } from '$lib/config/plans.config';
  import Switch from '$lib/ui/components/Switch.svelte';
  let state;
  const unsub = plansStore.subscribe(v => (state = v));

  onMount(async () => {
    await loadPlansContent(); // logs handled elsewhere
    console.log({ event: 'plans_page_load', mockMode: state?.mockMode, currentPlan: state?.currentPlan });
  });
</script>

<svelte:head>
  <title>Pricing • A I N L</title>
</svelte:head>

<div class="pricing">
  <div class="pricing__container">
    <div class="pricing__header">
      <p class="pricing__eyebrow">Pricing</p>
      <h1 class="pricing__title">Plans</h1>
      {#if state?.currentPlan}
        <span class="pricing__badge">Current Plan: {state.currentPlan}</span>
      {/if}
    </div>

  {#if state?.content?.billingIntervals}
    <div class="pricing__toggle">
      <span class="pricing__toggle-label">Monthly</span>
      <Switch toggled={state.interval === 'yearly'} onChange={(toggled) => setInterval(toggled ? 'yearly' : 'monthly')} />
      <span class="pricing__toggle-label">Yearly</span>
    </div>
  {/if}

    <div class="pricing__grid">
      {#if state?.content?.plans}
        {#each state.content.plans as plan}
          <section class="pricing__plan pricing__plan--{plan.id}" aria-labelledby="plan-name-{plan.id}">
            <div class="pricing__plan-head">
              <h2 id="plan-name-{plan.id}" class="pricing__plan-name">{plan.name}</h2>
              <p class="pricing__plan-desc">{plan.tagline}</p>
            </div>
            <div class="pricing__price">
              <span class="pricing__price-amount">${state.interval === 'monthly' ? plan.monthly : plan.yearly}</span>
              <span class="pricing__per">/{state.interval === 'monthly' ? 'mo' : 'yr'}</span>
            </div>
            <ul class="pricing__feature-list">
              {#if plan.id !== 'trial'}
                <h3 class="pricing__feature-heading">Everything in previous plan, plus:</h3>
              {/if}
              {#each computeFeatures(state.content, plan.id) as feature}
                <li class="pricing__feature">
                  <svg class="pricing__feature-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" /></svg>
                  <span class="pricing__feature-text">{feature}</span>
                </li>
              {/each}
            </ul>
            <button class="pricing__cta">{plan.ctaLabel}</button>
          </section>
        {/each}
      {/if}
    </div>

    <div class="pricing__contact">
      <p class="pricing__contact-text">{state?.content?.contact.text}</p>
      <a href={state?.content?.contact.href} class="pricing__contact-link">{state?.content?.contact.cta}</a>
    </div>

    {#if state?.mockMode}
      <div class="pricing__banner--mock">
        Mock Mode Enabled
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @use '../../styles/global.scss';

  /* Pricing: root scope */
  .pricing {
    box-sizing: border-box;
    font: inherit;
    color: var(--c-text);
    background-color: var(--c-bg);
  }

  /* Layout helpers (scoped) */
  .pricing, .pricing * { box-sizing: border-box; }
  .pricing__container { max-width: 72rem; margin-inline: auto; padding: var(--space-lg) var(--space-md); }
  .pricing__header { text-align: center; margin-bottom: var(--space-xl); }
  .pricing__eyebrow { font-size: 0.875rem; letter-spacing: 0.06em; text-transform: uppercase; opacity: 0.8; margin-bottom: var(--space-sm); }
  .pricing__title { font-size: clamp(1.75rem, 2.5vw, 2.5rem); font-weight: 700; margin: var(--space-xs) 0 var(--space-sm); }
  .pricing__subtitle { font-size: 1rem; opacity: 0.9; max-width: 60ch; margin: var(--space-sm) auto 0; }

  /* Billing toggle */
  .pricing__toggle {
    display: inline-flex; align-items: center; gap: var(--space-md); margin-top: var(--space-md);
  }
  .pricing__toggle-control {
    position: relative; width: 3rem; height: 1.5rem; border-radius: 999px;
    background-color: var(--c-secondary);
    cursor: pointer; flex-shrink: 0;
  }
  .pricing__toggle-handle {
    position: absolute; top: 2px; left: 2px; width: 1.25rem; height: 1.25rem; border-radius: 50%;
    background: currentColor; transition: transform 200ms ease;
  }
  .pricing__toggle--annual .pricing__toggle-handle { transform: translateX(1.5rem); }
  .pricing__toggle-label { font-size: 0.9375rem; }

  /* Plans grid */
  .pricing__grid {
    display: grid; gap: var(--space-lg);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 18rem), 1fr));
    padding: var(--space-lg) 0;
  }

  /* Plan card */
  .pricing__plan {
    position: relative; display: flex; flex-direction: column; align-items: stretch;
    border: 1px solid var(--c-border);
    border-radius: 1rem; padding: var(--space-lg); overflow: hidden;
    background: transparent;
  }
  .pricing__plan--popular {
    outline: 2px solid var(--c-primary);
    transform: translateY(-2px);
  }
  .pricing__ribbon {
    position: absolute; top: 0.75rem; right: -2.5rem; transform: rotate(35deg);
    padding: 0.25rem 2.75rem; font-size: 0.75rem; font-weight: 600;
    background-color: var(--c-primary);
    color: var(--c-white);
  }

  .pricing__plan-head { margin-bottom: var(--space-md); }
  .pricing__plan-name { font-size: 1.125rem; font-weight: 700; margin: 0 0 var(--space-xs); }
  .pricing__plan-desc { font-size: 0.9375rem; opacity: 0.9; margin: 0; }

  /* Price row */
  .pricing__price {
    display: flex; align-items: baseline; gap: var(--space-xs); margin: var(--space-sm) 0 var(--space-md);
  }
  .pricing__price-amount { font-size: 2.25rem; font-weight: 800; letter-spacing: -0.02em; }
  .pricing__per { font-size: 0.9375rem; opacity: 0.85; }

  /* Feature list */
  .pricing__feature-list { display: grid; gap: var(--space-sm); margin: 0 0 var(--space-lg); padding: 0; list-style: none; }
  .pricing__feature {
    display: grid; grid-template-columns: 1.25rem 1fr; gap: var(--space-sm); align-items: start;
  }
  .pricing__feature-icon {
    width: 1.1rem; height: 1.1rem; margin-top: 0.15rem; flex-shrink: 0;
    color: var(--c-primary);
  }
  .pricing__feature-text { font-size: 0.9375rem; }

  /* CTA */
  .pricing__cta {
    display: inline-flex; justify-content: center; align-items: center;
    gap: var(--space-sm); padding: var(--space-md) var(--space-lg); border-radius: var(--radius-md);
    font-weight: 700; text-align: center; text-decoration: none; cursor: pointer;
    border: 1px solid var(--c-primary);
  }
  .pricing__cta:focus-visible { outline: 2px solid var(--c-primary); outline-offset: 2px; }
  .pricing__plan--popular .pricing__cta { transform: translateZ(0); }

  .pricing__contact-text {
    margin-bottom: var(--space-sm);
  }

  .pricing__contact-link {
    color: var(--c-primary);
    text-decoration: underline;
    font-weight: 600;
  }

  /* Badge (tiny notes like “Save 20%”) */
  .pricing__badge {
    display: inline-block; padding: 0.25rem 1.5rem; border-radius: 999px; font-size: 0.75rem; font-weight: 600;
    background: var(--c-primary);
    color: var(--c-white);
  }

  /* Comparison table */
  .pricing__table { width: 100%; border-collapse: separate; border-spacing: 0; margin-top: 2rem; }
  .pricing__table thead .pricing__table-cell { font-weight: 700; }
  .pricing__table-row + .pricing__table-row .pricing__table-cell { border-top: 1px solid var(--c-border); }
  .pricing__table-cell { padding: var(--space-md); text-align: left; font-size: 0.9375rem; }
  .pricing__table .is-yes::before { content: "✓"; margin-right: var(--space-sm); }
  .pricing__table .is-no::before { content: "—"; margin-right: var(--space-sm); opacity: 0.5; }

  /* FAQ */
  .pricing__faq { margin-top: 2.5rem; }
  .pricing__faq-item { border-top: 1px solid var(--c-border); }
  .pricing__faq-item:last-child { border-bottom: 1px solid var(--c-border); }
  .pricing__faq-q { display: flex; justify-content: space-between; align-items: center; padding: var(--space-md) 0; font-weight: 600; cursor: pointer; }
  .pricing__faq-a { padding: 0 0 var(--space-md); font-size: 0.9375rem; display: none; }
  .pricing__faq-item--open .pricing__faq-a { display: block; }

  /* Disclaimers / legal */
  .pricing__disclaimer { margin-top: var(--space-md); font-size: 0.8125rem; opacity: 0.8; }

  /* States */
  .pricing__plan--disabled { opacity: 0.6; pointer-events: none; }
  .pricing__cta[aria-disabled="true"] { opacity: 0.6; pointer-events: none; }

  /* Responsive polish */
  @media (min-width: 48rem) {
    .pricing__header { margin-bottom: var(--space-xl); }
    .pricing__grid { padding: var(--space-xl) 0; gap: var(--space-lg); }
    .pricing__plan { padding: var(--space-xl); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pricing * { transition: none !important; animation: none !important; }
  }
</style>
