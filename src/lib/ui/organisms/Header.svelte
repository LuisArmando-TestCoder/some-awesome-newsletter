<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import store from '../../../components/store';
  import logout from '../../../components/systems/requests/logout';
  import plansStore, { loadPlansContent, type PlansState } from '$lib/config/plans.config';
  import { t } from '$lib/i18n/translations';
  import { fade, fly } from 'svelte/transition';

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  export let links = writable<{ name: string; url: string }[]>([]);
  let isMobileMenuOpen = false;

  $: middleIndex = Math.floor($links.length / 2);
  $: leftLinks = $links.slice(0, middleIndex);
  $: rightLinks = $links.slice(middleIndex);

  onMount(async () => {
    await loadPlansContent();
    return () => unsub();
  });

  const toggleMenu = () => {
    isMobileMenuOpen = !isMobileMenuOpen;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = isMobileMenuOpen ? 'hidden' : 'auto';
    }
  };

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
      <a href="/" class="header__logo" aria-label="AIBAN Home">
        <img src="/logo/logo.png" width="40" alt="logo">
        <span class="header__logo-text">A I B A N</span>
      </a>
      
      <nav class="header__nav desktop-only">
        <ul class="header__nav-list">
          {#each leftLinks as link}
            <li>
              <a href={link.url} class="header__nav-link" class:active={$page.url.pathname === link.url}>{link.name}</a>
            </li>
          {/each}

          <li>
            <a href="/pricing" class="header__nav-link header__nav-link--pill" class:active={$page.url.pathname === '/pricing'}>
              {$t?.header?.pricing || 'Pricing'}
            </a>
          </li>

          {#each rightLinks as link}
            <li>
              <a href={link.url} class="header__nav-link" class:active={$page.url.pathname === link.url}>{link.name}</a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="header__actions">
        <div class="desktop-only">
          {#if $t}
            {#if $store.isAuthCodeValid}
              <a href="/dashboard" class="header__btn--black">{$t.header.goToWorkspace}</a>
            {:else}
              <a on:click={() => logout(false)} href="/login" class="header__btn--outline">{$t.header.logIn}</a>
              <a on:click={() => logout(false)} href="/signup" class="header__btn--black">{$t.header.getStarted}</a>
            {/if}
          {/if}
        </div>

        <button class="header__hamburger mobile-only" on:click={toggleMenu} class:is-active={isMobileMenuOpen}>
          <span></span><span></span><span></span>
        </button>
      </div>
    </div>
  </header>
</div>

{#if isMobileMenuOpen}
  <div class="mobile-menu" transition:fade={{ duration: 150 }}>
    <nav class="mobile-menu__nav" transition:fly={{ x: 300, duration: 400 }}>
      
      <div class="mobile-menu__section">
        <p class="section-label">Architecture</p>
        <ul class="nav-list">
          {#each $links as link}
            <li><a href={link.url} on:click={toggleMenu}>{link.name}</a></li>
          {/each}
          <li><a href="/pricing" class="nav-pill" on:click={toggleMenu}>Pricing</a></li>
        </ul>
      </div>

      <div class="mobile-menu__section">
        <p class="section-label">Account Access</p>
        <div class="auth-grid">
          {#if $store.isAuthCodeValid}
             <a href="/dashboard" class="mobile-btn-black" on:click={toggleMenu}>Workspace</a>
          {:else}
             <a href="/login" class="mobile-btn-outline" on:click={toggleMenu}>Log In</a>
             <a href="/signup" class="mobile-btn-black" on:click={toggleMenu}>Sign Up</a>
          {/if}
        </div>
      </div>

      <div class="mobile-menu__section">
        <p class="section-label">Engineering Lead</p>
        <div class="creator-box">
          <p class="creator-name">Luis Murillo Baltodano</p>
          <p class="creator-bio">
            Senior Creative Engineer specializing in <strong>Scene-Preset</strong> and 
            <strong>Atomic Design</strong> to automate founder leverage.
          </p>
          <a href="https://github.com/LuisArmando-TestCoder" target="_blank" class="creator-link">GitHub Ecosystem →</a>
        </div>
      </div>

      <div class="mobile-menu__footer">
        <div class="system-status">
          <span class="status-dot"></span> Nodes: 2026-v1 Active
        </div>
        <div class="legal-links">
          <a href="/privacy" on:click={toggleMenu}>Privacy Policy</a>
          <a href="/terms" on:click={toggleMenu}>Terms</a>
        </div>
        <div class="footer-bottom">
          <p>© AIBAN LABS COSTA RICA</p>
          {#if $store.isAuthCodeValid}
            <button class="logout-link" on:click={() => { logout(false); toggleMenu(); }}>Disconnect</button>
          {/if}
        </div>
      </div>
    </nav>
    <div class="mobile-menu__backdrop" on:click={toggleMenu}></div>
  </div>
{/if}

<style lang="scss">
  .desktop-only { @media (max-width: 1024px) { display: none !important; } }
  .mobile-only { @media (min-width: 1025px) { display: none !important; } }

  .header-wrapper {
    position: sticky; top: 0; z-index: 1000; transition: 1s;
    clip-path: inset(0 0 100% 0);
    &.show { clip-path: inset(0 0 0 0); }
  }

  .header {
    background: #fff; padding: 1.25rem 0; border-bottom: 2px solid #000;
    &__container { display: flex; justify-content: space-between; align-items: center; max-width: 1300px; margin: 0 auto; padding: 0 2rem; }
    &__logo { display: flex; align-items: center; gap: 12px; color: #000; text-decoration: none; font-weight: 900; letter-spacing: 2px; }
    &__nav-list { display: flex; gap: 2.5rem; list-style: none; align-items: center; }
    &__nav-link { 
      color: #666; text-decoration: none; font-size: 0.8rem; font-weight: 700; text-transform: uppercase;
      &.active { color: #000; box-shadow: 0 0 4px -1px #000; }
      &--pill { background: #000; color: #fff !important; padding: 0.6rem 1.5rem; border-radius: 4px; }
    }
    &__actions { display: flex; gap: 1rem; align-items: center; }
    &__btn--black { background: #000; color: #fff; padding: 0.7rem 1.8rem; border-radius: 4px; font-weight: 800; font-size: 0.8rem; text-decoration: none; margin-left: 0.5rem;}
    &__btn--outline { border: 2px solid #000; color: #000; padding: 0.6rem 1.8rem; border-radius: 4px; font-weight: 800; font-size: 0.8rem; text-decoration: none; }
    
    &__hamburger {
      background: none; border: none; display: flex; flex-direction: column; gap: 7px;
      span { width: 30px; height: 3px; background: #000; transition: 0.3s; }
      &.is-active {
        span:nth-child(1) { transform: translateY(10px) rotate(45deg); }
        span:nth-child(2) { opacity: 0; }
        span:nth-child(3) { transform: translateY(-10px) rotate(-45deg); }
      }
    }
  }

  .mobile-menu {
    position: fixed; inset: 0; z-index: 2000; display: flex; justify-content: flex-end;
    &__nav {
      position: relative; width: 100%; max-width: 440px; height: 100%; background: #fff; 
      border-left: 3px solid #000; padding: 80px 40px 40px; display: flex; flex-direction: column; overflow-y: auto;
    }
    .section-label { font-size: 0.75rem; font-weight: 900; text-transform: uppercase; color: #999; margin-bottom: 20px; border-bottom: 1px solid #eee; }
    .nav-list { list-style: none; display: flex; flex-direction: column; gap: 20px; margin-bottom: 40px;
      a { color: #000; text-decoration: none; font-size: 2.5rem; font-weight: 900; letter-spacing: -1px; }
      .nav-pill { background: #000; color: #fff; padding: 15px 25px; font-size: 1.2rem; display: inline-block; border-radius: 4px; }
    }
    
    .auth-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 40px; 
      a { text-align: center; padding: 15px; border-radius: 4px; font-weight: 800; text-decoration: none; font-size: 0.9rem; text-transform: uppercase; }
      .mobile-btn-black { background: #000; color: #fff; grid-column: span 1; }
      .mobile-btn-outline { border: 2px solid #000; color: #000; }
    }

    .creator-box { background: #f9f9f9; padding: 30px; border-left: 4px solid #000; margin-bottom: 40px;
      .creator-name { font-weight: 900; font-size: 1.2rem; }
      .creator-bio { font-size: 0.95rem; line-height: 1.5; color: #444; margin: 10px 0 20px; }
      .creator-link { color: #000; font-weight: 800; text-decoration: underline; font-size: 0.85rem; }
    }

    &__footer { margin-top: auto;
      .system-status { display: flex; align-items: center; gap: 10px; font-size: 0.8rem; font-weight: 800; margin-bottom: 20px;
        .status-dot { width: 10px; height: 10px; background: #000; border-radius: 50%; animation: pulse 1.5s infinite; }
      }
      .legal-links { display: flex; gap: 20px; margin-bottom: 20px; a { color: #000; font-size: 0.85rem; text-decoration: none; font-weight: 600; } }
      .footer-bottom { display: flex; justify-content: space-between; font-size: 0.7rem; color: #bbb; font-weight: 700;
        .logout-link { background: none; border: none; color: #ff0000; cursor: pointer; padding: 0; }
      }
    }
  }

  @keyframes pulse { 0% { opacity: 1; } 50% { opacity: 0.3; } 100% { opacity: 1; } }
</style>