<script lang="ts">
  import { page } from '$app/stores';
  import { derived, writable } from 'svelte/store';
  import { onMount, afterUpdate } from 'svelte';
  import { gsap } from '../../anim/gsap.client';
  import store, { saveToStore, stepsMapping } from '../../../components/store';
  import logout from '../../../components/systems/requests/logout';
  import { ping } from '../../../components/Notification/notificationStore';
  import plansStore, {
    loadPlansContent,
    type Plan,
    type PlansState
  } from '$lib/config/plans.config';
  import { notification } from '../../../components/Notification/notificationStore';
  import { t } from '$lib/i18n/translations';
  import { globalLanguage } from '../../../components/store';

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  $: $t;

  onMount(async () => {
    await loadPlansContent();
  });

  export let links = writable<{ name: string; url: string }[]>([]);

  const currentPath = derived(page, ($page) => $page.url.pathname);

  // Underline animation logic
  let navListEl: HTMLUListElement | null = null;
  let linkEls: (HTMLAnchorElement | null)[] = [];
  let underlineLeft: number = 0;
  let underlineWidth: number = 0;
  let underlineEl: HTMLDivElement | null = null;

  function animateUnderline(left: number, width: number) {
    if (underlineEl) {
      gsap.to(underlineEl, {
        left,
        width,
        duration: 0.32,
        ease: 'power2.out'
      });
    }
  }

  function updateUnderline() {
    const activeIdx = $links.findIndex(l => $page.url.pathname === l.url);
    if (activeIdx !== -1 && linkEls[activeIdx] && navListEl) {
      const linkRect = linkEls[activeIdx]!.getBoundingClientRect();
      const navRect = navListEl.getBoundingClientRect();
      const left = linkRect.left - navRect.left;
      const width = linkRect.width;
      animateUnderline(left, width);
      underlineLeft = left;
      underlineWidth = width;
    } else {
      animateUnderline(0, 0);
    }
  }

  onMount(() => {
    updateUnderline();
    window.addEventListener('resize', updateUnderline);
    const underlineInterval = setInterval(updateUnderline, 100);
    return () => {
      window.removeEventListener('resize', updateUnderline);
      clearInterval(underlineInterval);
    };
  });

  $: $page.url.pathname, updateUnderline();
  $: updateUnderline();

  /**
   * Logic to determine the next upgrade tier for the quick-action button
   */
  function getNextTierLink(currentTier: string) {
    const cycle = state.interval || 'monthly';
    const tiers = ['free', 'starter', 'growth', 'pro', 'master'];
    const currentIndex = tiers.indexOf(currentTier);
    
    // If on master or unknown, go to customer portal
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
          <ul class="header__nav-list" bind:this={navListEl}>
            {#each $links as link, i}
              <li class="header__nav-item">
                <a
                  href={link.url}
                  class="header__nav-link { $page.url.pathname === link.url ? 'header__nav-link--active' : '' }"
                  aria-current={ $page.url.pathname === link.url ? 'page' : undefined }
                  bind:this={linkEls[i]}
                >{link.name}</a>
              </li>
            {/each}
            <div
              class="header__nav-underline"
              bind:this={underlineEl}
              aria-hidden="true"
            ></div>
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
                <a 
                  href={getNextTierLink($store?.config.pricingPlan)} 
                  class="tier tier-{$store?.config.pricingPlan}"
                  title="Click to Upgrade"
                >
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

  .header__sender-name {
    font-size: 0.85rem;
    opacity: 0.8;
    margin-right: 0.25rem;
  }

  .tier {
    background: #000;
    color: white;
    padding: .25rem .75rem;
    border-radius: 4px;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    cursor: pointer;
    transition: 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    display: inline-block;
    border: 1px solid rgba(255,255,255,0.1);

    &:hover {
      transform: translateY(-2px) scale(1.05);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      background: var(--c-primary);
      color: white;
    }

    /* Specific Tier Styling */
    &-free { background: #64748b; }
    &-starter { background: #3b82f6; }
    &-growth { background: #8b5cf6; }
    &-pro { background: #ec4899; }
    &-master { background: #f59e0b; }

    &-vipfree {
      background: linear-gradient(135deg, #2c3e50, #49687d);
      border: 1px solid #ffffff33;
      &:hover {
        background: linear-gradient(135deg, #1a252f, #2c3e50);
      }
    }
  }

  .header-wrapper {
    container-type: inline-size;
    transition: 1s;
    clip-path: inset(0 0 100% 0);
    &.show { clip-path: inset(0 0 0 0); }
  }

  .header {
    background: var(--color-background-inversion);
    padding: var(--space-md) 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
    position: relative;
    z-index: 1000;
  }

  .header__container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 var(--space-md);
    gap: var(--space-md);
  }

  .header__logo {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-weight: 800;
    font-size: 1.25rem;
    color: var(--c-text);
    text-decoration: none;
    img { filter: invert(0); }
  }

  .header__nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-lg);
    position: relative;
  }

  .header__nav-link {
    color: var(--c-text-light);
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    z-index: 1;
    font-size: 0.95rem;
    &:hover { color: var(--c-primary); }
    &--active { color: var(--c-primary); font-weight: 700; }
  }

  .header__nav-underline {
    position: absolute;
    bottom: -4px;
    height: 3px;
    background: var(--c-primary);
    border-radius: 2px;
    z-index: 0;
    pointer-events: none;
  }

  .header__actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .header__action {
    padding: 0.6rem 1.2rem;
    border-radius: 8px;
    text-decoration: none;
    font-weight: 700;
    font-size: 0.9rem;
    transition: 0.2s;
    &--primary {
      background-color: var(--c-primary);
      color: white;
      &:hover { filter: brightness(1.1); }
    }
    &--secondary {
      color: var(--c-text);
      border: 1px solid var(--c-border);
      &:hover { background: #f9fafb; }
    }
  }

  /* Responsive Constraints */
  @container (width < 600px) {
    .header__logo-text { display: none; }
    .header__nav-scroller { order: 3; width: 100%; }
  }
</style>