<script lang="ts">
  import { onMount } from "svelte";
  import { isMobileMenuOpen } from "$lib/stores/mobile-menu.store";
  import store, { saveToStore, stepsMapping } from "../store";
  import logout from "../systems/requests/logout";
  import SideLink from "../../lib/ui/organisms/SideLink.svelte";
  import type { SideLinkType, StepsKey } from "../types";
  import { t } from "$lib/i18n/dashboard-translations";

  function step(stepName: StepsKey) {
    return () => {
      saveToStore({ stepsIndex: stepsMapping[stepName] });
      isMobileMenuOpen.set(false);
    };
  }

  function getLink(name: StepsKey, label?: string): SideLinkType {
    return { name: label ?? name, callback: step(name) };
  }

  export let links: SideLinkType[] = [
    { name: $t['menuHalf.dashboard'], children: [getLink("Profile", $t['menuHalf.profile']), getLink("News Sources", $t['menuHalf.newsSources']), getLink("Users", $t['menuHalf.users']), getLink("Reports", $t['menuHalf.reports'])] },
    getLink("Secrets/Developer", $t['menuHalf.secretsDeveloper']), getLink("Newspaper", $t['menuHalf.newspaper']), getLink("Billing", $t['menuHalf.billing']),
  ];

  function getInitials(name: string): string {
    if (!name) return "";
    const parts = name.trim().split(/\s+/);
    if (parts.length === 1) return parts[0][0]?.toUpperCase() ?? "";
    return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  }

  onMount(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") isMobileMenuOpen.set(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
    };
  });
</script>

<aside
  class="sidebar"
  class:collapsed={!$isMobileMenuOpen}
  aria-label="Primary Navigation"
  style={$store.stepsIndex > 4 ? '' : 'display: none;'}
>
  <nav id="sidebar-nav" class="sidebar__nav" aria-label="Sections">
    <ul class="sidebar__nav-list">
      {#each links as link}
        <SideLink isCollapsed={!$isMobileMenuOpen} {link} />
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
  @use "../../styles/global.scss";

  .sidebar {
    --sidebar-expanded-w: var(--sidebar-expanded-w, 280px);
    --sidebar-collapsed-w: var(--sidebar-collapsed-w, 80px);

    background: #fff6;
    backdrop-filter: blur(6px);
    padding: var(--space-md);
    box-shadow: 0 0 5px -2px #fff;
    transition: width 0.3s ease, left 0.3s ease, box-shadow 0.2s ease;
    width: var(--sidebar-expanded-w);
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    height: 100dvh;
    z-index: 1000;

    &.collapsed {
      width: 0;
      padding: var(--space-md) 0;
      overflow: hidden;
    }
  }

  .sidebar__nav { flex-grow: 1; overflow-y: auto; overflow-x: hidden; }
  .sidebar__nav-list { list-style: none; padding: 0; margin: 0; }

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
  }

  .sidebar__profile-initials {
    display: none;
  }

  .sidebar__profile-info { overflow: hidden; }
  .sidebar__profile-name, .sidebar__profile-logout { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar__profile-name { font-weight: 600; margin: 0; }
  .sidebar__profile-logout { font-size: 0.9rem; color: var(--c-text-light); cursor: pointer; &:hover { text-decoration: underline; } }

  @media (min-width: 1024px) {
    .sidebar {
      display: none;
    }
  }
</style>
