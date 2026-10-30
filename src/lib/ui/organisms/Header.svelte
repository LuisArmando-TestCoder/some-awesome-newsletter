<script lang="ts">
  import { page } from '$app/stores';
  import { writable } from 'svelte/store';
  import { onDestroy, tick } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import store from '../../../components/store';
  import logout from '../../../components/systems/requests/logout';
  import { t } from '$lib/i18n/translations';

  type NavLink = { name: string; url: string };

  /** Optional override. When empty, the default marketing navigation is used. */
  export let links = writable<NavLink[]>([]);

  // Public reader pages (blog, articles, subscribe flows) render their own chrome.
  const READER_ROUTES = [
    '/blog',
    '/articles',
    '/article',
    '/subscribe',
    '/subscribe-widget',
    '/confirm-subscription'
  ];

  const MENU_ID = 'site-mobile-menu';
  const MENU_TITLE_ID = 'site-mobile-menu-title';

  let isMobileMenuOpen = false;
  let toggleButton: HTMLButtonElement;
  let drawer: HTMLElement;
  let previousBodyOverflow = '';
  const reduceMotion =
    typeof window !== 'undefined' &&
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Scroll state
  let y = 0;
  let lastY = 0;
  let showNavbar = true;
  let focusInside = false;

  $: tx = $t ?? {};
  $: nav = tx.nav ?? {};
  $: header = tx.header ?? {};

  $: defaultLinks = [
    { name: nav.howItWorks ?? 'How it works', url: '/#how-it-works' },
    { name: nav.pricing ?? 'Pricing', url: '/pricing' },
    { name: nav.help ?? 'Help', url: '/help' },
    { name: nav.about ?? 'About', url: '/about' }
  ] as NavLink[];

  $: navItems = $links && $links.length ? $links : defaultLinks;

  $: pathname = $page.url.pathname;
  $: hash = $page.url.hash;
  $: isHidden = READER_ROUTES.some((r) => pathname === r || pathname.startsWith(r + '/'));
  $: isLoggedIn = Boolean($store?.isAuthCodeValid);

  function isActive(url: string, currentPath: string, currentHash: string): boolean {
    if (url.startsWith('/#')) return currentPath === '/' && currentHash === url.slice(1);
    if (url === '/') return currentPath === '/';
    return currentPath === url || currentPath.startsWith(url + '/');
  }

  // Hide on scroll down, show on scroll up. Never hide while the menu is open
  // or while keyboard focus is inside the header.
  $: {
    if (y <= 0 || isMobileMenuOpen || focusInside) {
      showNavbar = true;
    } else if (y > lastY && y > 72) {
      showNavbar = false;
    } else if (y < lastY) {
      showNavbar = true;
    }
    lastY = y;
  }

  async function openMenu() {
    if (isMobileMenuOpen) return;
    isMobileMenuOpen = true;
    if (typeof document !== 'undefined') {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    await tick();
    const first = drawer?.querySelector<HTMLElement>('a, button');
    first?.focus();
  }

  function closeMenu(restoreFocus = true) {
    if (!isMobileMenuOpen) return;
    isMobileMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = previousBodyOverflow;
    }
    if (restoreFocus) toggleButton?.focus();
  }

  function toggleMenu() {
    if (isMobileMenuOpen) closeMenu();
    else openMenu();
  }

  function onDrawerKeydown(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeMenu();
      return;
    }
    if (event.key !== 'Tab' || !drawer) return;
    const focusables = Array.from(
      drawer.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')
    );
    if (!focusables.length) return;
    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  // Close the drawer whenever the route changes.
  let lastPath = '';
  $: if (pathname !== lastPath) {
    if (lastPath && isMobileMenuOpen) closeMenu(false);
    lastPath = pathname;
  }

  function onFocusIn() {
    focusInside = true;
  }
  function onFocusOut(event: FocusEvent) {
    const next = event.relatedTarget as Node | null;
    const wrapper = event.currentTarget as HTMLElement;
    focusInside = Boolean(next && wrapper.contains(next));
  }

  // The landing uses the white and black "mono" theme; the header follows it there.
  $: isMono = $page.url.pathname === '/';

  onDestroy(() => {
    if (isMobileMenuOpen && typeof document !== 'undefined') {
      document.body.style.overflow = previousBodyOverflow;
    }
  });
</script>

<svelte:window bind:scrollY={y} />

{#if !isHidden}
  <div
    class="header-wrapper"
    class:mono={isMono}
    class:hidden-nav={!showNavbar}
    on:focusin={onFocusIn}
    on:focusout={onFocusOut}
  >
    <header class="header">
      <div class="header__container">
        <a href="/" class="header__logo" aria-label={nav.home ?? 'AIBAN home'}>
          <img src="/logo/logo.png" width="32" height="32" alt="" />
          <span class="header__logo-text">AIBAN</span>
        </a>

        <nav class="header__nav desktop-only" aria-label={nav.mainLabel ?? 'Main'}>
          <ul class="header__nav-list">
            {#each navItems as link (link.url)}
              {@const active = isActive(link.url, pathname, hash)}
              <li>
                <a
                  href={link.url}
                  class="nav-link"
                  class:active
                  aria-current={active ? 'page' : undefined}
                >
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>

        <div class="header__actions">
          <div class="desktop-only action-group">
            {#if isLoggedIn}
              <a href="/dashboard" class="btn btn--primary">
                {header.goToWorkspace ?? 'Open dashboard'}
              </a>
            {:else}
              <a on:click={() => logout(false)} href="/login" class="btn btn--tertiary">
                {header.logIn ?? 'Log in'}
              </a>
              <a on:click={() => logout(false)} href="/start" class="btn btn--primary">
                {header.getStarted ?? 'Start free'}
              </a>
            {/if}
          </div>

          <button
            bind:this={toggleButton}
            type="button"
            class="header__hamburger mobile-only"
            class:is-active={isMobileMenuOpen}
            on:click={toggleMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls={isMobileMenuOpen ? MENU_ID : undefined}
            aria-label={isMobileMenuOpen ? (nav.closeMenu ?? 'Close menu') : (nav.openMenu ?? 'Open menu')}
          >
            <span class="bar top" aria-hidden="true"></span>
            <span class="bar middle" aria-hidden="true"></span>
            <span class="bar bottom" aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </header>
  </div>

  {#if isMobileMenuOpen}
    <div class="mobile-menu-overlay" class:mono={isMono} transition:fade={{ duration: reduceMotion ? 0 : 160 }}>
      <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
      <div class="mobile-backdrop" on:click={() => closeMenu()}></div>

      <div
        bind:this={drawer}
        id={MENU_ID}
        class="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby={MENU_TITLE_ID}
        tabindex="-1"
        on:keydown={onDrawerKeydown}
        transition:fly={{ x: 80, duration: reduceMotion ? 0 : 240, opacity: 1, easing: cubicOut }}
      >
        <div class="drawer-header">
          <h2 id={MENU_TITLE_ID} class="drawer-title">{nav.menu ?? 'Menu'}</h2>
          <button
            type="button"
            class="close-btn"
            on:click={() => closeMenu()}
            aria-label={nav.closeMenu ?? 'Close menu'}
          >
            <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <nav class="drawer-content" aria-label={nav.mainLabel ?? 'Main'}>
          <ul class="drawer-nav-list">
            {#each navItems as link (link.url)}
              {@const active = isActive(link.url, pathname, hash)}
              <li>
                <a
                  href={link.url}
                  class="drawer-link"
                  class:active
                  aria-current={active ? 'page' : undefined}
                  on:click={() => closeMenu(false)}
                >
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </nav>

        <div class="auth-grid">
          {#if isLoggedIn}
            <a href="/dashboard" class="btn btn--primary btn--block" on:click={() => closeMenu(false)}>
              {header.goToWorkspace ?? 'Open dashboard'}
            </a>
          {:else}
            <a
              href="/start"
              class="btn btn--primary btn--block"
              on:click={() => { logout(false); closeMenu(false); }}
            >
              {header.getStarted ?? 'Start free'}
            </a>
            <a
              href="/login"
              class="btn btn--secondary btn--block"
              on:click={() => { logout(false); closeMenu(false); }}
            >
              {header.logIn ?? 'Log in'}
            </a>
          {/if}
        </div>

        <div class="drawer-footer">
          <nav aria-label={nav.legalLabel ?? 'Legal'}>
            <ul class="legal-row">
              <li><a href="/legal/privacy" on:click={() => closeMenu(false)}>{nav.privacy ?? 'Privacy'}</a></li>
              <li><a href="/legal/terms" on:click={() => closeMenu(false)}>{nav.terms ?? 'Terms'}</a></li>
              <li><a href="/legal/cookies" on:click={() => closeMenu(false)}>{nav.cookies ?? 'Cookies'}</a></li>
            </ul>
          </nav>
          {#if isLoggedIn}
            <button type="button" class="logout-text" on:click={() => { closeMenu(false); logout(); }}>
              {nav.signOut ?? 'Sign out'}
            </button>
          {/if}
        </div>
      </div>
    </div>
  {/if}
{/if}

<style lang="scss">
  @use '../../content/landing/mono.scss' as mono;

  .header-wrapper.mono,
  .mobile-menu-overlay.mono {
    @include mono.mono-theme;
    background: transparent;
    font-family: var(--font-body);
    :global(a), :global(button) { font-family: inherit; }
  }
  .header-wrapper.mono .header {
    background: color-mix(in srgb, #ffffff 80%, transparent);
    backdrop-filter: saturate(180%) blur(20px);
    -webkit-backdrop-filter: saturate(180%) blur(20px);
  }
  .desktop-only {
    @media (max-width: 1024px) { display: none !important; }
  }
  .mobile-only {
    @media (min-width: 1025px) { display: none !important; }
  }

  .header-wrapper,
  .mobile-menu-overlay {
    font-family: var(--font-body, system-ui, sans-serif);
  }
  .header-wrapper {
    position: sticky;
    top: 0;
    z-index: 1000;
    transform: translateY(0);
    transition: transform var(--dur-slow, 320ms) var(--ease-out, cubic-bezier(0.16, 1, 0.3, 1));

    &.hidden-nav { transform: translateY(-100%); }
  }

  .header {
    height: var(--header-h, 72px);
    display: flex;
    align-items: center;
    background: color-mix(in srgb, var(--surface-0, #fff) 85%, transparent);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-1, #e5e7eb);

    &__container {
      width: 100%;
      max-width: var(--container-lg, 1200px);
      margin: 0 auto;
      padding: 0 var(--space-5, 24px);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: var(--space-5, 24px);
    }

    &__logo {
      display: flex;
      align-items: center;
      gap: var(--space-3, 12px);
      text-decoration: none;
      color: var(--text-1, #0f172a);
      border-radius: var(--radius-sm, 6px);

      img { display: block; }
    }

    &__logo-text {
      font-family: var(--font-display, inherit);
      font-weight: var(--fw-bold, 700);
      font-size: var(--fs-lg, 1.125rem);
      letter-spacing: -0.01em;
    }

    &__nav-list {
      display: flex;
      gap: var(--space-2, 8px);
      list-style: none;
      padding: 0;
      margin: 0;
      align-items: center;
    }

    &__actions,
    .action-group {
      display: flex;
      align-items: center;
      gap: var(--space-3, 12px);
    }
  }

  .nav-link {
    position: relative;
    display: inline-block;
    font-size: var(--fs-sm, 0.9375rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text-2, #475569);
    text-decoration: none;
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-sm, 6px);
    transition: color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &::after {
      content: '';
      position: absolute;
      left: var(--space-3, 12px);
      right: var(--space-3, 12px);
      bottom: 2px;
      height: 2px;
      border-radius: var(--radius-full, 999px);
      background: var(--accent, #4f46e5);
      transform: scaleX(0);
      transition: transform var(--dur-base, 200ms) var(--ease-out, ease-out);
    }

    &:hover {
      color: var(--text-1, #0f172a);
      background: var(--surface-2, #f1f5f9);
    }

    &.active {
      color: var(--text-1, #0f172a);
      font-weight: var(--fw-semibold, 600);
      &::after { transform: scaleX(1); }
    }
  }

  /* Buttons: one primary, one secondary, one tertiary */
  .btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 40px;
    padding: var(--space-2, 8px) var(--space-4, 16px);
    border-radius: var(--radius-full, 999px);
    font-weight: var(--fw-semibold, 600);
    font-size: var(--fs-sm, 0.9375rem);
    text-decoration: none;
    border: 1px solid transparent;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &--primary {
      background: var(--accent, #4f46e5);
      color: var(--accent-contrast, #fff);
      &:hover { background: var(--accent-hover, #4338ca); }
    }

    &--secondary {
      background: var(--surface-1, #fff);
      color: var(--text-1, #0f172a);
      border-color: var(--border-2, #cbd5e1);
      &:hover { background: var(--surface-2, #f1f5f9); }
    }

    &--tertiary {
      background: transparent;
      color: var(--text-1, #0f172a);
      padding-inline: var(--space-2, 8px);
      &:hover { color: var(--text-link, #4338ca); text-decoration: underline; }
    }

    &--block { width: 100%; min-height: 48px; font-size: var(--fs-md, 1rem); }
  }

  a:focus-visible,
  button:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  .header__hamburger {
    background: none;
    border: none;
    width: 44px;
    height: 44px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 6px;
    border-radius: var(--radius-sm, 6px);
    color: var(--text-1, #0f172a);

    .bar {
      width: 22px;
      height: 2px;
      background: currentColor;
      border-radius: var(--radius-full, 999px);
      transition: transform var(--dur-base, 200ms) var(--ease-out, ease-out),
        opacity var(--dur-base, 200ms) var(--ease-out, ease-out);
    }

    &.is-active {
      .top { transform: translateY(8px) rotate(45deg); }
      .middle { opacity: 0; }
      .bottom { transform: translateY(-8px) rotate(-45deg); }
    }
  }

  /* Mobile drawer */
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
    background: color-mix(in srgb, var(--surface-inverse, #0f172a) 40%, transparent);
  }

  .mobile-drawer {
    position: relative;
    width: min(100%, 400px);
    height: 100%;
    background: var(--surface-1, #fff);
    color: var(--text-1, #0f172a);
    box-shadow: var(--shadow-3, 0 10px 30px rgba(0, 0, 0, 0.15));
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 24px);
    overflow-y: auto;
    overscroll-behavior: contain;
    outline: none;
  }

  .drawer-header {
    padding: var(--space-4, 16px) var(--space-5, 24px);
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--border-1, #e5e7eb);
  }

  .drawer-title {
    margin: 0;
    font-family: var(--font-display, inherit);
    font-weight: var(--fw-bold, 700);
    font-size: var(--fs-lg, 1.125rem);
  }

  .close-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    background: none;
    border: none;
    border-radius: var(--radius-sm, 6px);
    color: var(--text-2, #475569);
    cursor: pointer;
    &:hover { background: var(--surface-2, #f1f5f9); color: var(--text-1, #0f172a); }
  }

  .drawer-content { padding: 0 var(--space-5, 24px); }

  .drawer-nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
  }

  .drawer-link {
    display: flex;
    align-items: center;
    min-height: 48px;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-radius: var(--radius-md, 10px);
    border-left: 3px solid transparent;
    color: var(--text-1, #0f172a);
    text-decoration: none;
    font-weight: var(--fw-medium, 500);
    font-size: var(--fs-lg, 1.125rem);
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:hover { background: var(--surface-2, #f1f5f9); }

    &.active {
      font-weight: var(--fw-semibold, 600);
      background: var(--accent-soft, #eef2ff);
      border-left-color: var(--accent, #4f46e5);
    }
  }

  .auth-grid {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: 0 var(--space-5, 24px);
  }

  .drawer-footer {
    margin-top: auto;
    padding: var(--space-4, 16px) var(--space-5, 24px);
    border-top: 1px solid var(--border-1, #e5e7eb);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3, 12px);
    font-size: var(--fs-sm, 0.875rem);
  }

  .legal-row {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-4, 16px);
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      color: var(--text-2, #475569);
      text-decoration: none;
      &:hover { color: var(--text-1, #0f172a); text-decoration: underline; }
    }
  }

  .logout-text {
    background: none;
    border: none;
    color: var(--danger, #b91c1c);
    font-weight: var(--fw-semibold, 600);
    cursor: pointer;
    padding: var(--space-2, 8px);
    font-size: inherit;
    border-radius: var(--radius-sm, 6px);
  }

  @media (prefers-reduced-motion: reduce) {
    .header-wrapper,
    .nav-link,
    .nav-link::after,
    .btn,
    .header__hamburger .bar,
    .drawer-link {
      transition: none;
    }
  }
</style>
