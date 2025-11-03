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

  // Get the current path as a derived store for easier use in markup
  const currentPath = derived(page, ($page) => $page.url.pathname);

  // For underline animation
  let navListEl: HTMLUListElement | null = null;
  let linkEls: (HTMLAnchorElement | null)[] = [];
  let underlineLeft: number = 0;
  let underlineWidth: number = 0;
  let underlineEl: HTMLDivElement | null = null;

  // Animate underline with GSAP
  function animateUnderline(left: number, width: number) {
    if (underlineEl) {
      gsap.to(underlineEl, {
        left,
        width,
        duration: 0.32,
        ease: 'cubic-bezier(0.7,0,0.3,1)'
      });
    }
  }

  function updateUnderline() {
    const activeIdx = $links.findIndex(l => $page.url.pathname === l.url);
    if (
      activeIdx !== -1 &&
      linkEls[activeIdx] &&
      typeof linkEls[activeIdx]?.getBoundingClientRect === 'function' &&
      navListEl &&
      typeof navListEl.getBoundingClientRect === 'function'
    ) {
      const linkRect = linkEls[activeIdx]!.getBoundingClientRect();
      const navRect = navListEl.getBoundingClientRect();
      const left = linkRect.left - navRect.left;
      const width = linkRect.width;
      animateUnderline(left, width);
      underlineLeft = left;
      underlineWidth = width;
    } else {
      animateUnderline(0, 0);
      underlineLeft = 0;
      underlineWidth = 0;
    }
  }

  // Update underline on mount and after every update
  onMount(() => {
    updateUnderline();
    window.addEventListener('resize', updateUnderline);

    // Polling interval to ensure underline stays in sync
    const underlineInterval = setInterval(updateUnderline, 100);

    return () => {
      window.removeEventListener('resize', updateUnderline);
      clearInterval(underlineInterval);
    };
  });

  $: $page.url.pathname, updateUnderline();
  $: updateUnderline();
  $: $store.header;
</script>

<div class="header-wrapper" class:show={$store.header}>
  <header class="header">
    <div class="header__container">
      <a href="/" class="header__logo" aria-label="Homepage">
        <img src="/logo/logo-inverted.png" width="50" alt="logo">
        <span class="header__logo-text">A I N L</span>
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
              style="left: {underlineLeft}px; width: {underlineWidth}px;"
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
            {$store?.config.senderName}:
              {#if $store?.config.pricingPlan === 'vipfree'}
                <button on:click={() => {
                      saveToStore({ stepsIndex: stepsMapping["Billing"] });
                      ping("Billing", $t.header.inBilling);
                }} class="tier tier-vipfree">{$t.header.vip}</button>
              {:else if $store?.config.pricingPlan}
                <a href={
                  $store?.config.pricingPlan === 'free' ? `/api/checkout?products=${state?.content?.plans.find(p => p.id === 'monthly')?.productId}` :
                  $store?.config.pricingPlan === 'monthly' ? `/api/checkout?products=${state?.content?.plans.find(p => p.id === 'yearly')?.productId}` :
                  `/api/portal?customerEmail=${$store.configuratorEmail}`
                } class="tier tier-{$store?.config.pricingPlan}">
                  {$t.header.plan.replace('{planName}', $store?.config.pricingPlan)}
                </a>
              {/if}
            {:else}
              <a on:click={() => {
                logout(false);
              }} href="/login" class="header__action header__action--secondary">{$t.header.logIn}</a>
              <a on:click={() => {
                logout(false);
              }} href="/signup" class="header__action header__action--primary">{$t.header.getStarted}</a>
            {/if}
          {/if}
        </div>
        <div class="mobile-only">
        </div>
      </div>
    </div>
  </header>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  .tier {
    background: #000;
    color: white;
    padding: .25rem .5rem;
    border-radius: 3px;
    box-shadow: 0 0 10px -5px #000;
    cursor: pointer;
    transition: .5s;
    transform: scale(1);
    display: inline-block;
    margin-left: 0rem;
    border: 0;

    &:hover {
      transition: .15s transform, .5s padding, .3s margin-left, .75s box-shadow;
      transform: scale(1.1);
      text-decoration: underline;
      padding: .25rem 1rem;
      margin-left: 1rem;
      box-shadow: 0 0 5px -2.5px #000;
      cursor: pointer;
    }

    &-free {

    }

    &-vipfree {
      padding: .25rem 1rem;
      background: linear-gradient(to right, #2c3e50, #49687d);
      color: #fff;
      cursor: default;
      font-weight: 600;

      &:hover {
        padding: .25rem 1.5rem;
        text-decoration: none;
      }
    }
    
    &--monthly {

    }

    &--yearly {

    }

  }

  .header-wrapper {
    container-type: inline-size;
    transition: 1s;
    clip-path: inset(0 0 100% 0);

    &.show {
      clip-path: inset(0 0 0 0);
    }
  }

  .header {
    background: var(--color-background-inversion);
    padding: var(--space-md) 0;
    border-bottom: 1px solid #0000000f;
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

  .mobile-only {
    display: none;
  }

  @media (max-width: 1023px) {
    .desktop-only {
      display: none;
    }
    .mobile-only {
      display: block;
    }
  }

  .header__logo {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-weight: 700;
    font-size: 1.25rem;
    color: var(--c-text);
    text-decoration: none;
    transition: all var(--transition-fast);

    &:hover {
      text-decoration: none;
    }

    svg {
      color: var(--c-primary);
      flex-shrink: 0;
    }
  }

  .header__nav-scroller {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none; /* Firefox */
    &::-webkit-scrollbar {
      display: none; /* Safari and Chrome */
    }
  }

  .header__nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-lg);
  }

  .header__nav-link {
    color: var(--c-text-light);
    font-weight: 500;
    text-decoration: none;
    white-space: nowrap;
    position: relative;
    z-index: 1;

    &:hover {
      color: var(--c-primary);
    }

    &--active,
    &[aria-current="page"] {
      color: var(--c-primary);
      font-weight: 700;
    }
  }

  .header__nav-underline {
    position: absolute;
    bottom: 0;
    height: 2.5px;
    background: var(--c-primary);
    border-radius: 2px;
    /* No CSS transition, GSAP handles animation */
    z-index: 0;
    pointer-events: none;
    transition: 1s;
    transition-timing-function: cubic-bezier(0.59,-0.18, 0, 1);
  }

  .header__nav-list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    gap: var(--space-lg);
    position: relative;
  }

  .header__actions {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
  }

  .header__action {
    padding: var(--space-sm) var(--space-md);
    border-radius: var(--radius-md);
    text-decoration: none;
    font-weight: 600;
    transition: all var(--transition-fast);
    white-space: nowrap;

    &--primary {
      background-color: var(--c-primary);
      color: var(--c-white);
      border: 1px solid var(--c-primary);
      &:hover {
        background-color: var(--c-white);
        color: var(--c-primary);
      }
    }

    &--secondary {
      background-color: var(--c-bg);
      color: var(--c-primary);
      border: 1px solid var(--c-border);
      &:hover {
        border-color: var(--c-primary);
      }
    }
  }

  /* Shape C: Expanded (Default) */
  @container (width >= 961px) {
    .header__nav-scroller {
      overflow-x: visible;
    }
  }

  /* Shape B: Condensed */
  @container (481px < width < 961px) {
    .header__container {
      gap: var(--space-sm);
    }
    .header__logo-text {
      font-size: 1rem;
    }
  }

  @container (width < 520px) {
    .header__action--secondary {
      display: none;
    }
  }

  /* Shape A: Compact */
  @container (width <= 480px) {
    .header__container {
      flex-wrap: wrap;
      gap: var(--space-sm);
    }
    .header__logo-text {
      display: none;
    }
    .header__nav-scroller {
      order: 3;
      width: 100%;
    }
    .header__actions {
      margin-left: auto;
    }
    .header__action--secondary {
      display: none;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .header__logo,
    .header__action {
      transition: none;
    }
  }
</style>
