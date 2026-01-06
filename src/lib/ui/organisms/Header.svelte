<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import store, { saveToStore, stepsMapping } from '../../../components/store';
  import logout from '../../../components/systems/requests/logout';
  import { ping } from '../../../components/Notification/notificationStore';
  import plansStore, { loadPlansContent, type PlansState } from '$lib/config/plans.config';
  import { t } from '$lib/i18n/translations';

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  export let links = writable<{ name: string; url: string }[]>([]);

  $: middleIndex = Math.floor($links.length / 2);
  $: leftLinks = $links.slice(0, middleIndex);
  $: rightLinks = $links.slice(middleIndex);

  onMount(async () => {
    await loadPlansContent();
    return () => unsub();
  });

  function getNextTierLink(currentTier: string) {
    const cycle = state.interval || 'monthly';
    const tiers = ['free', 'starter', 'growth', 'pro', 'master'];
    const currentIndex = tiers.indexOf(currentTier);
    if (currentIndex === -1 || currentIndex === tiers.length - 1) {
      return `/api/portal?customerEmail=${$store.configuratorEmail}`;
    }
    const nextTier = tiers[currentIndex + 1];
    const nextProduct = state?.content?.plans.find(p => p.id === nextTier);
    return `/api/checkout?products=${nextProduct?.productId}&interval=${cycle}`;
  }
</script>

<div class="header-wrapper" class:show={$store.header}>
  <header class="header">
    <div class="header__container">
      <a href="/" class="header__logo" aria-label="Homepage">
        <img src="/logo/logo-inverted.png" width="50" alt="logo">
        <span class="header__logo-text">A I B A N</span>
      </a>
      
      <div class="header__nav-scroller">
        <nav class="header__nav" aria-label="Primary">
          <ul class="header__nav-list">
            
            {#each leftLinks as link}
              <li class="header__nav-item">
                <a
                  href={link.url}
                  class="header__nav-link"
                  class:header__nav-link--active={$page.url.pathname === link.url}
                >{link.name}</a>
              </li>
            {/each}

            <li class="header__nav-item">
                <a
                  href="/pricing"
                  class="header__nav-link header__nav-link--pill"
                  class:header__nav-link--active={$page.url.pathname === '/pricing'}
                >{$t?.header?.pricing || 'Pricing'}</a>
            </li>

            {#each rightLinks as link}
              <li class="header__nav-item">
                <a
                  href={link.url}
                  class="header__nav-link"
                  class:header__nav-link--active={$page.url.pathname === link.url}
                >{link.name}</a>
              </li>
            {/each}
          </ul>
        </nav>
      </div>

      <div class="header__actions">
        <div class="desktop-only">
          {#if $t}
            {#if $store.isAuthCodeValid && !$page.url.pathname.includes("dashboard")}
              <a href="/dashboard" class="header__action header__action--primary">{$t.header.goToWorkspace}</a>
            {:else if $store.isAuthCodeValid && $page.url.pathname.includes("dashboard")}
              <span class="header__sender-name">{$store?.config.senderName}:</span>
              {#if $store?.config.pricingPlan === 'vipfree'}
                <button on:click={() => {
                      saveToStore({ stepsIndex: stepsMapping["Billing"] });
                      ping("Billing", $t.header.inBilling);
                }} class="tier tier-vipfree">{$t.header.vip}</button>
              {:else if $store?.config.pricingPlan}
                <a href={getNextTierLink($store?.config.pricingPlan)} class="tier tier-{$store?.config.pricingPlan}">
                  {$t.header.plan.replace('{planName}', $store?.config.pricingPlan.toUpperCase())}
                </a>
              {/if}
            {:else}
              <a on:click={() => logout(false)} href="/login" class="header__action header__action--secondary">{$t.header.logIn}</a>
              <a on:click={() => logout(false)} href="/signup" class="header__action header__action--primary">{$t.header.getStarted}</a>
            {/if}
          {/if}
        </div>
      </div>
    </div>
  </header>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  .header-wrapper {
    container-type: inline-size;
    transition: 1s;
    clip-path: inset(0 0 100% 0);
    &.show { clip-path: inset(0 0 0 0); }
  }

  .header {
    background: var(--color-background-inversion);
    padding: var(--space-md) 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    position: relative;
    z-index: 1000;

    &__container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 var(--space-md);
    }

    &__logo {
      display: flex;
      align-items: center;
      gap: var(--space-sm);
      color: var(--c-text);
      text-decoration: none;
      font-weight: 800;
      font-size: 1.25rem;
      cursor: pointer;
    }

    &__nav-list {
      display: flex;
      gap: var(--space-lg);
      align-items: center;
      list-style: none;
    }

    &__nav-link {
      color: var(--c-text-light);
      font-weight: 500;
      text-decoration: none;
      font-size: 0.95rem;
      padding: 0.5rem 1rem;
      border-radius: 99px;
      border: 0.5pt solid transparent;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      
      &--active { 
        color: var(--c-primary); 
        font-weight: 700;
        border-color: rgba(255, 255, 255, 0.5);
        background: rgba(255, 255, 255, 0.03);
        box-shadow: 0 0 15px -3px var(--c-primary);
      }

      &:hover:not(.header__nav-link--active) {
        color: var(--c-primary);
        background: rgba(255, 255, 255, 0.05);
      }

      &--pill {
        background: #000;
        color: #fff;
        padding: 0.5rem 1.25rem;
        border: 1px solid rgba(255, 255, 255, 0.1);
        cursor: pointer;

        &:hover {
          background: #1a1a1a;
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        &.header__nav-link--active {
          background: var(--c-primary);
          color: #fff !important;
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
        }
      }
    }

    &__action {
      padding: 0.6rem 1.2rem;
      border-radius: 8px;
      font-weight: 700;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
      &--primary { 
        background: var(--c-primary); 
        color: white; 
        &:hover { filter: brightness(1.1); }
      }
      &--secondary { 
        border: 1px solid var(--c-border); 
        color: var(--c-text); 
        &:hover { background: rgba(255,255,255,0.05); }
      }
    }
  }

  .tier {
    padding: .25rem .75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    color: white;
    text-decoration: none;
    cursor: pointer;
    border: none;
    transition: transform 0.2s;

    &:hover {
        transform: scale(1.05);
    }
    
    &-free { background: #64748b; }
    &-starter { background: #3b82f6; }
    &-growth { background: #8b5cf6; }
    &-pro { background: #ec4899; }
    &-master { background: #f59e0b; }
    &-vipfree { background: linear-gradient(to right, #2c3e50, #4ca1af); }
  }
</style>