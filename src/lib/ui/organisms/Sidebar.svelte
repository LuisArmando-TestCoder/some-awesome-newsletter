<!-- some-awesome-newsletter/src/lib/ui/organisms/Sidebar.svelte -->
<script lang="ts">
  import { onMount } from "svelte";
  import { collapsed } from "$lib/stores/sidebar.store";
  import store, { saveToStore, stepsMapping } from "../../../components/store";
  import logout from "../../../components/systems/requests/logout";
  import SideLink from "./SideLink.svelte";
  import type { SideLinkType, StepsKey } from "../../../components/types";
  import { t } from "$lib/i18n/dashboard-translations";

  let isMobile = false;

  /** class tokens used for “opposite shapes” */
  $: shapeA = (!isMobile && $collapsed) || (isMobile && !$collapsed);
  $: shapeB = (!isMobile && !$collapsed) || (isMobile && $collapsed);

  function step(stepName: StepsKey) {
    return () => {
      saveToStore({ stepsIndex: stepsMapping[stepName] });
      // Collapse on mobile after navigation (class toggle only)
      if (isMobile) collapsed.set(true);
    };
  }

  function getLink(name: StepsKey, label?: string): SideLinkType {
    return { name: label ?? name, callback: step(name) };
  }

  $: links = [
    {
      name: $t["menuHalf.dashboard"],
      children: [
        getLink("Profile", $t["menuHalf.profile"]),
        getLink("News Sources", $t["menuHalf.newsSources"]),
        getLink("Users", $t["menuHalf.users"]),
        getLink("Reports", $t["menuHalf.reports"]),
      ],
    },
    getLink("Secrets/Developer", $t["menuHalf.secretsDeveloper"]),
    // getLink("Newspaper", $t["menuHalf.newspaper"]),
    getLink("Billing", $t["menuHalf.billing"]),
  ];

  function getInitials(name: string): string {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  onMount(() => {
    const mq = window.matchMedia("(max-width: 1024px)");

    const handle = (e: MediaQueryList | MediaQueryListEvent) => {
      isMobile = e.matches;
      // Default state: collapsed on mobile, expanded on desktop (class toggles)
      collapsed.set(isMobile);
      document.body.classList.toggle("mobile-layout", isMobile);
    };

    handle(mq);
    mq.addEventListener("change", handle);

    const onKey = (ev: KeyboardEvent) => {
      // Escape closes overlay on mobile (class only)
      if (isMobile && ev.key === "Escape") collapsed.set(true);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      mq.removeEventListener("change", handle);
      window.removeEventListener("keydown", onKey);
      document.body.classList.remove("mobile-layout");
    };
  });

  // Body helper class only, for overlay scroll-lock styling
  $: {
    if (typeof window !== "undefined") {
      document.body.classList.toggle("sidebar-open", isMobile && !$collapsed);
    }
  }
</script>

<aside
  class="sidebar"
  class:collapsed={$collapsed}
  class:mobile={isMobile}
  class:desktop={!isMobile}
  class:shape-a={shapeA}
  class:shape-b={shapeB}
  aria-label="Primary Navigation"
  style={$store.stepsIndex > 4 ? '' : 'display: none;'}
>
  <button
    class="sidebar__toggle"
    on:click={() => !isMobile && collapsed.update((n) => !n)}
    aria-expanded={!isMobile && !$collapsed}
    aria-controls="sidebar-nav"
  >
    <svg class="sidebar__toggle-icon" width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path class="sidebar__toggle-icon-path"
        d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18264 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"
      />
    </svg>
  </button>

  <nav id="sidebar-nav" class="sidebar__nav" aria-label="Sections">
    <ul class="sidebar__nav-list">
      {#each links as link}
        <!-- SideLink handles icon/initials & class toggles -->
        <SideLink isCollapsed={$collapsed} {link} />
      {/each}
    </ul>
  </nav>

  {#if $store.isAuthCodeValid}
    <div class="sidebar__profile">
      <img
        src={$store?.picture || ""}
        alt="User avatar"
        class="sidebar__profile-avatar outlined"
        on:error={(e) => ((e.currentTarget as HTMLElement).style.display = 'none')}
      />
      <div class="sidebar__profile-initials outlined">
        {getInitials($store?.config.senderName || $store?.given_name)}
      </div>
      <div class="sidebar__profile-info">
        <p class="sidebar__profile-name">{$store?.config.senderName || $store?.given_name}</p>
        <a on:click={() => logout()} class="sidebar__profile-logout">{$t['menuHalf.logOut']}</a>
      </div>
    </div>
  {/if}
</aside>

<style lang="scss">
  @use "../../../styles/global.scss";

  /* ===== Tokens & helpers (class-driven only) ===== */

  .outlined {
    border: 2px solid var(--c-primary);
    background: transparent;
  }

  /* shape-a vs shape-b are “opposite” between mobile/desktop + collapsed/expanded */
  .sidebar.shape-a .outlined { border-radius: 10px; /* circle/pill */ }
  .sidebar.shape-b .outlined { border-radius: 10px;   /* rounded-rect */ }

  /* ===== Sidebar frame ===== */

  .sidebar {
    --sidebar-expanded-w: var(--sidebar-expanded-w, 280px);
    --sidebar-collapsed-w: var(--sidebar-collapsed-w, 80px);

    background: #fff6;
    backdrop-filter: blur(6px);
    padding: var(--space-md);
    box-shadow: 0 0 5px -2px #fff;
    transition: width 0.3s ease, left 0.3s ease, box-shadow 0.2s ease;
    width: var(--sidebar-expanded-w); /* desktop default expanded */
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 1000;

    &.collapsed { width: var(--sidebar-collapsed-w); }

    /* ⬇️ NEW mobile behavior: anchored at left:0, width-only transitions */
    &.mobile {
      --h: 72px;
      position: fixed;
      top: var(--h);
      left: 0;              /* always 0; never negative */
      height: calc(100dvh - var(--h));       /* better on mobile; browser falls back to 100vh */
      z-index: 1000;
      /* baseline: when class .mobile is present, we default to collapsed rail */
      width: var(--sidebar-collapsed-w);
      transition: width 0.3s ease, box-shadow 0.2s ease;

      @media (max-width: 480px) {
        --h: 116.59px;
      }
    }

    /* collapsed rail: visible, tappable */
    &.mobile.collapsed {
      width: var(--sidebar-collapsed-w);
      box-shadow: none;
    }

    /* expanded sheet: take the screen by width change only */
    &.mobile:not(.collapsed) {
      width: 100vw;
      box-shadow: 0 10px 40px rgba(0,0,0,.25);
    }
  }

  /* ===== Toggle button ===== */

  .sidebar__toggle {
    background: transparent;
    border: 0;
    display: grid;
    place-items: center;
    margin: 0 0 var(--space-md) auto;
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    transition: transform 0.3s ease, background 0.2s ease;

    .sidebar:not(.collapsed) & { transform: rotate(180deg); }

    &:hover { background: rgba(0, 0, 0, 0.05); }
  }

  .sidebar.mobile .sidebar__toggle {
    display: none;
  }

  .sidebar__toggle-icon { display: block; }
  .sidebar__toggle-icon-path { vector-effect: non-scaling-stroke; }

  /* ===== Nav ===== */

  .sidebar__nav { flex-grow: 1; overflow-y: auto; overflow-x: hidden; display: flex; justify-content: center; }
  .sidebar__nav-list { list-style: none; padding: 0; margin: 0; }
  .sidebar__nav-item { /* host class for each SideLink row */ }

  /* ===== Profile ===== */

  .sidebar__profile {
    margin-top: auto;
    padding-top: var(--space-md);
    border-top: 1px solid var(--c-border);
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .sidebar__profile-avatar {
    width: 40px; height: 40px; object-fit: cover; flex-shrink: 0; display: block;
    object-position: center;
    /* Hide avatar if collapsed OR if the image failed (inline on:error sets display:none) */
    .sidebar.collapsed & { display: none !important; }
  }

  .sidebar__profile-initials {
    display: none;
    width: 40px; height: 40px;
    color: var(--c-primary);
    font-weight: 600;
    display: none; place-items: center; text-transform: uppercase;
    .sidebar.collapsed & { display: grid; }
  }

  .sidebar__profile-info { overflow: hidden; .sidebar.collapsed & { display: none; } }
  .sidebar__profile-name, .sidebar__profile-logout { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar__profile-name { font-weight: 600; margin: 0; }
  .sidebar__profile-logout { font-size: 0.9rem; color: var(--c-text-light); cursor: pointer; &:hover { text-decoration: underline; } }

  /* ===== Mobile overlay behavior (pure class + media query alignment) ===== */

  @media (max-width: 1024px) {
    :global(body.mobile-layout .dashboard-layout) { display: block; }
    .sidebar {
      display: none;
    }
  }
</style>
