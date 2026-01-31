<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onMount } from 'svelte';
  import store from '../../../components/store';
  import logout from '../../../components/systems/requests/logout';
  import plansStore, { loadPlansContent, type PlansState } from '$lib/config/plans.config';
  import { t } from '$lib/i18n/translations';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  let state: PlansState;
  const unsub = plansStore.subscribe((v) => (state = v));

  export let links = writable<{ name: string; url: string }[]>([]);
  let isMobileMenuOpen = false;

  // --- Scroll Logic Variables ---
  let y = 0;
  let lastY = 0;
  let showNavbar = true;

  $: middleIndex = Math.floor($links.length / 2);
  $: leftLinks = $links.slice(0, middleIndex);
  $: rightLinks = $links.slice(middleIndex);

  // --- Reactive Scroll Handler ---
  $: {
    // Always show if at top or if mobile menu is open
    if (y <= 0 || isMobileMenuOpen) {
      showNavbar = true;
    } else {
      // Determine direction
      const direction = y > lastY ? 'down' : 'up';
      
      // Hide if scrolling down AND we have passed the header height (72px)
      if (direction === 'down' && y > 72) {
        showNavbar = false;
      } 
      // Show if scrolling up
      else if (direction === 'up') {
        showNavbar = true;
      }
    }
    // Update lastY for the next frame comparison
    lastY = y;
  }

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
</script>

<svelte:window bind:scrollY={y} />

<div class="header-wrapper" class:hidden-nav={!showNavbar}>
  <header class="header">
    <div class="header__glass-pane"></div>
    <div class="header__container">
      <a href="/" class="header__logo" aria-label="AIBAN Home">
        <div class="logo-icon">
            <img src="/logo/logo.png" width="32" height="32" alt="logo">
        </div>
        <span class="header__logo-text">AIBAN</span>
      </a>
      
      <nav class="header__nav desktop-only">
        <ul class="header__nav-list">
          {#each leftLinks as link}
            <li>
              <a href={link.url} class="nav-link" class:active={$page.url.pathname === link.url}>
                {link.name}
              </a>
            </li>
          {/each}

          <li>
            <a href="/pricing" class="nav-link special-link" class:active={$page.url.pathname === '/pricing'}>
              {$t?.header?.inBilling || 'Pricing'}
            </a>
          </li>

          {#each rightLinks as link}
            <li>
              <a href={link.url} class="nav-link" class:active={$page.url.pathname === link.url}>
                {link.name}
              </a>
            </li>
          {/each}
        </ul>
      </nav>

      <div class="header__actions">
        <div class="desktop-only action-group">
          {#if $t}
            {#if $store.isAuthCodeValid}
              <a href="/dashboard" class="btn btn--primary">
                <span>{$t.header.goToWorkspace}</span>
              </a>
            {:else}
              <a on:click={() => logout(false)} href="/login" class="nav-link login-link">{$t.header.logIn}</a>
              <a on:click={() => logout(false)} href="/signup" class="btn btn--black">
                <span>{$t.header.getStarted}</span>
              </a>
            {/if}
          {/if}
        </div>

        <button 
            class="header__hamburger mobile-only" 
            on:click={toggleMenu} 
            class:is-active={isMobileMenuOpen}
            aria-label="Toggle menu"
        >
          <span class="bar top"></span>
          <span class="bar middle"></span>
          <span class="bar bottom"></span>
        </button>
      </div>
    </div>
  </header>
</div>

{#if isMobileMenuOpen}
  <div class="mobile-menu-overlay" transition:fade={{ duration: 200 }}>
    <div class="mobile-backdrop" on:click={toggleMenu}></div>
    
    <nav class="mobile-drawer" transition:fly={{ x: 100, duration: 400, opacity: 1, easing: cubicOut }}>
      <div class="drawer-header">
        <span class="drawer-title">Menu</span>
        <button class="close-btn" on:click={toggleMenu}>&times;</button>
      </div>

      <div class="drawer-content">
        <div class="drawer-section">
          <p class="section-label">Architecture</p>
          <ul class="drawer-nav-list">
            {#each $links as link}
              <li>
                  <a href={link.url} class="drawer-link" on:click={toggleMenu}>
                    {link.name}
                    <span class="arrow">&rarr;</span>
                  </a>
              </li>
            {/each}
            <li>
                <a href="/pricing" class="drawer-link highlight" on:click={toggleMenu}>
                    {$t.header.inBilling || 'Pricing'}
                    <span class="arrow">&rarr;</span>
                </a>
            </li>
          </ul>
        </div>

        <div class="drawer-section">
          <p class="section-label">Access</p>
          <div class="auth-grid">
            {#if $store.isAuthCodeValid}
               <a href="/dashboard" class="mobile-btn primary" on:click={toggleMenu}>Launch Workspace</a>
            {:else}
               <a href="/login" class="mobile-btn outline" on:click={toggleMenu}>Log In</a>
               <a href="/signup" class="mobile-btn primary" on:click={toggleMenu}>Sign Up</a>
            {/if}
          </div>
        </div>

        <div class="drawer-section">
          <div class="creator-card">
            <div class="card-header">
                <div class="status-indicator"></div>
                <span class="role-badge">Engineering Lead</span>
            </div>
            <p class="creator-name">Luis Murillo Baltodano</p>
            <p class="creator-bio">
              Senior Creative Engineer specializing in <span class="highlight">Scene-Preset</span> and 
              <span class="highlight">Atomic Design</span> automation.
            </p>
            <a href="https://github.com/LuisArmando-TestCoder" target="_blank" class="creator-link">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                GitHub Ecosystem
            </a>
          </div>
        </div>
      </div>

      <div class="drawer-footer">
        <div class="legal-row">
          <a href="/legal/privacy" on:click={toggleMenu}>Privacy</a>
          <span class="dot">·</span>
          <a href="/legal/terms" on:click={toggleMenu}>Terms</a>
        </div>
        <div class="status-row">
            <div class="server-status">
                <span class="pulse-dot"></span> 2026-v1 Active
            </div>
            {#if $store.isAuthCodeValid}
                <button class="logout-text" on:click={() => { logout(false); toggleMenu(); }}>Sign out</button>
            {/if}
        </div>
      </div>
    </nav>
  </div>
{/if}

<style lang="scss">
  /* --- Utility / Reset --- */
  .desktop-only { @media (max-width: 1024px) { display: none !important; } }
  .mobile-only { @media (min-width: 1025px) { display: none !important; } }

  :root {
      --h-height: 72px;
      --h-bg: rgba(255, 255, 255, 0.5);
      --h-blur: blur(12px);
      --h-border: 1px solid rgba(0,0,0,0.05);
      --h-text: #0f172a;
      --h-primary: #000;
  }

  /* --- Sticky Header Wrapper --- */
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    /* Smooth transform animation */
    transition: transform 0.75s cubic-bezier(0.16, 1, 0.3, 1);
    
    /* Default state: Visible (0) */
    transform: translateY(0);

    /* Hidden state: Moved up by 100% of its height */
    &.hidden-nav { 
        transform: translateY(-100%); 
    }
  }

  /* --- Main Header --- */
  .header {
    position: relative;
    height: var(--h-height);
    display: flex;
    align-items: center;

    &__glass-pane {
        position: absolute;
        inset: 0;
        background: var(--h-bg);
        backdrop-filter: var(--h-blur);
        -webkit-backdrop-filter: var(--h-blur);
        border-bottom: var(--h-border);
        z-index: 1;
    }

    &__container {
        position: relative;
        z-index: 2;
        width: 100%;
        max-width: 1300px;
        margin: 0 auto;
        padding: 0 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    /* Logo */
    &__logo {
        display: flex;
        align-items: center;
        gap: 12px;
        text-decoration: none;
        color: var(--h-text);
        
        .logo-icon {
            display: flex;
            filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));
            transition: transform 0.3s ease;
        }

        &-text {
            font-weight: 800;
            font-size: 1.1rem;
            letter-spacing: -0.02em;
        }

        &:hover .logo-icon { transform: scale(1.05); }
    }

    /* Desktop Navigation */
    &__nav-list {
        display: flex;
        gap: 2rem;
        list-style: none;
        padding: 0;
        margin: 0;
        align-items: center;
    }

    .nav-link {
        font-size: 0.9rem;
        font-weight: 500;
        color: #64748b;
        text-decoration: none;
        padding: 0.5rem 0.75rem;
        border-radius: 8px;
        transition: all 0.2s ease;

        &:hover {
            color: var(--h-text);
            background: rgba(0,0,0,0.04);
        }

        &.active {
            color: var(--h-text);
            font-weight: 600;
            background: rgba(0,0,0,0.06);
        }

        &.special-link {
            color: var(--h-primary);
            font-weight: 600;
        }
    }

    /* Desktop Actions */
    .header__actions {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    .action-group {
        display: flex;
        align-items: center;
        gap: 1rem;
    }

    /* Buttons */
    .btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        padding: 0.6rem 1.25rem;
        border-radius: 99px;
        font-weight: 600;
        font-size: 0.9rem;
        text-decoration: none;
        transition: all 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        
        &--black {
            background: #0f172a;
            color: #fff;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
            
            &:hover {
                background: #000;
                transform: translateY(-1px);
                box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05);
            }
        }
        
        &--primary {
            background: #4f46e5;
            color: white;
            box-shadow: 0 4px 10px rgba(79, 70, 229, 0.3);
            
            &:hover {
                background: #4338ca;
                transform: translateY(-1px);
            }
        }
    }

    /* Hamburger Menu */
    &__hamburger {
        background: none;
        border: none;
        width: 40px;
        height: 40px;
        position: relative;
        cursor: pointer;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 6px;
        z-index: 2005; /* Above menu */

        .bar {
            width: 22px;
            height: 2px;
            background: var(--h-text);
            border-radius: 2px;
            transition: all 0.3s ease;
        }

        &.is-active {
            .top { transform: translateY(8px) rotate(45deg); }
            .middle { opacity: 0; transform: translateX(10px); }
            .bottom { transform: translateY(-8px) rotate(-45deg); }
        }
    }
  }

  /* --- Mobile Drawer (Premium) --- */
  .mobile-menu-overlay {
    position: fixed;
    inset: 0;
    z-index: 2000;
    display: flex;
    justify-content: flex-end;
  }

  .mobile-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(4px);
  }

  .mobile-drawer {
    position: relative;
    width: 100%;
    max-width: 400px;
    height: 100%;
    background: #fff;
    box-shadow: -10px 0 30px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    z-index: 2002;
  }

  .drawer-header {
    padding: 1.5rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #f1f5f9;

    .drawer-title {
        font-weight: 700;
        font-size: 1.1rem;
        color: #0f172a;
    }

    .close-btn {
        background: none;
        border: none;
        font-size: 2rem;
        line-height: 1;
        color: #94a3b8;
        cursor: pointer;
    }
  }

  .drawer-content {
    padding: 2rem;
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
  }

  .section-label {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: #94a3b8;
    margin-bottom: 1rem;
  }

  /* Drawer Navigation */
  .drawer-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;

    .drawer-link {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-radius: 12px;
        background: #f8fafc;
        color: #1e293b;
        text-decoration: none;
        font-weight: 600;
        font-size: 1.1rem;
        transition: all 0.2s ease;

        .arrow { color: #cbd5e1; transition: transform 0.2s; }

        &:hover, &:active {
            background: #f1f5f9;
            transform: translateX(4px);
            .arrow { color: #4f46e5; transform: translateX(4px); }
        }

        &.highlight {
            background: #eef2ff;
            color: #4f46e5;
        }
    }
  }

  /* Mobile Auth Buttons */
  .auth-grid {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    
    .mobile-btn {
        text-align: center;
        padding: 1rem;
        border-radius: 12px;
        font-weight: 600;
        font-size: 1rem;
        text-decoration: none;
        transition: transform 0.2s;
        
        &.primary {
            background: #0f172a;
            color: white;
            box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1);
        }
        &.outline {
            border: 2px solid #e2e8f0;
            color: #1e293b;
        }

        &:active { transform: scale(0.98); }
    }
  }

  /* Creator Card */
  .creator-card {
    background: #1e293b; /* Dark Slate */
    border-radius: 16px;
    padding: 1.5rem;
    color: white;
    box-shadow: 0 10px 25px -5px rgba(0,0,0,0.2);
    position: relative;
    overflow: hidden;

    /* Subtle gradient accent */
    &::before {
        content: '';
        position: absolute;
        top: -50px;
        right: -50px;
        width: 100px;
        height: 100px;
        background: radial-gradient(circle, #4f46e5 0%, transparent 70%);
        opacity: 0.5;
    }

    .card-header {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 1rem;
        
        .status-indicator {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            box-shadow: 0 0 8px #22c55e;
        }

        .role-badge {
            font-size: 0.7rem;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            background: rgba(255,255,255,0.1);
            padding: 2px 8px;
            border-radius: 4px;
            color: #cbd5e1;
        }
    }

    .creator-name {
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
    }

    .creator-bio {
        font-size: 0.85rem;
        color: #94a3b8;
        line-height: 1.6;
        margin-bottom: 1.5rem;

        .highlight { color: #fff; font-weight: 500; }
    }

    .creator-link {
        display: inline-flex;
        align-items: center;
        gap: 8px;
        font-size: 0.85rem;
        font-weight: 600;
        color: #fff;
        text-decoration: none;
        padding-top: 1rem;
        border-top: 1px solid rgba(255,255,255,0.1);
        width: 100%;
        transition: color 0.2s;

        &:hover { color: #818cf8; }
    }
  }

  /* Drawer Footer */
  .drawer-footer {
    margin-top: auto;
    padding: 1.5rem 2rem;
    background: #f8fafc;
    border-top: 1px solid #f1f5f9;

    .legal-row {
        margin-bottom: 1rem;
        font-size: 0.85rem;
        color: #64748b;
        a { color: inherit; text-decoration: none; }
        .dot { margin: 0 8px; }
    }

    .status-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.75rem;
        font-weight: 600;
        color: #94a3b8;

        .server-status {
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .pulse-dot {
            width: 8px;
            height: 8px;
            background: #22c55e;
            border-radius: 50%;
            animation: pulse 2s infinite;
        }

        .logout-text {
            background: none;
            border: none;
            color: #ef4444;
            font-weight: 600;
            cursor: pointer;
            padding: 0;
            font-size: inherit;
        }
    }
  }

  @keyframes pulse {
    0% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0.4); }
    70% { box-shadow: 0 0 0 6px rgba(34, 197, 94, 0); }
    100% { box-shadow: 0 0 0 0 rgba(34, 197, 94, 0); }
  }
</style>