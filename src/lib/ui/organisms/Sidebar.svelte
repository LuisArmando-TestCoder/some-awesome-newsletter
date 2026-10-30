<!-- WS4. Dashboard sidebar (desktop and tablet). Plain full-word labels, the
     active section is always marked, keyboard friendly. Mobile uses
     $lib/dashboard/MobileNav.svelte (bottom bar). Old version: _deprecated/. -->
<script lang="ts">
  import { collapsed } from "$lib/stores/sidebar.store";
  import store from "../../../components/store";
  import logout from "../../../components/systems/requests/logout";
  import SideLink from "$lib/dashboard/NavLink.svelte";
  import Icon from "$lib/dashboard/ui/Icon.svelte";
  import SettingsMenu from "$lib/ui/molecules/SettingsMenu.svelte";
  import { replayTour, showChecklist } from "$lib/dashboard/tour";
  import { SECTIONS, activeSection, goTo } from "$lib/dashboard/nav";
  import { dt } from "$lib/dashboard/i18n";

  const main = SECTIONS.filter((s) => s.group === "main");
  const audience = SECTIONS.filter((s) => s.group === "audience");
  const account = SECTIONS.filter((s) => s.group === "account");
  $: name = $store?.config?.senderName || $store?.given_name || $store?.configuratorEmail || "";

  function initials(n: string): string {
    const parts = String(n || "").trim().split(/[\s@.]+/).filter(Boolean);
    if (!parts.length) return "";
    return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : "")).toUpperCase();
  }
</script>

<aside class="sidebar" class:collapsed={$collapsed} aria-label={$dt("dash.nav.label")}>
  <div class="sidebar__top">
    <a class="sidebar__brand" href="/dashboard?section=home" on:click|preventDefault={() => goTo("home")}>
      <span class="sidebar__logo" aria-hidden="true">A</span>
      <span class="sidebar__brand-name">AIBAN</span>
    </a>
    <button
      type="button"
      class="sidebar__toggle"
      on:click={() => collapsed.update((v) => !v)}
      aria-expanded={!$collapsed}
      aria-label={$collapsed ? $dt("dash.nav.expand") : $dt("dash.nav.collapse")}
      title={$collapsed ? $dt("dash.nav.expand") : $dt("dash.nav.collapse")}
    >
      <Icon name="menu" size={18} />
    </button>
  </div>

  <nav class="sidebar__nav" aria-label={$dt("dash.nav.label")}>
    <ul class="sidebar__list">
      {#each main as s (s.id)}
        <SideLink section={s} label={$dt(s.labelKey)} active={$activeSection === s.id} isCollapsed={$collapsed} />
      {/each}
    </ul>
    <p class="sidebar__group" class:sr={$collapsed}>{$dt("dash.nav.group.audience")}</p>
    <ul class="sidebar__list">
      {#each audience as s (s.id)}
        <SideLink section={s} label={$dt(s.labelKey)} active={$activeSection === s.id} isCollapsed={$collapsed} />
      {/each}
    </ul>
    <p class="sidebar__group" class:sr={$collapsed}>{$dt("dash.nav.group.account")}</p>
    <ul class="sidebar__list">
      {#each account as s (s.id)}
        <SideLink section={s} label={$dt(s.labelKey)} active={$activeSection === s.id} isCollapsed={$collapsed} />
      {/each}
    </ul>
  </nav>

  <div class="sidebar__footer">
    <ul class="sidebar__help" class:collapsed={$collapsed}>
      <li><a href="/help" title={$collapsed ? $dt("dash.nav.help") : undefined}><Icon name="info" size={18} /><span class:sr={$collapsed}>{$dt("dash.nav.help")}</span></a></li>
      <li><button type="button" on:click={() => replayTour($dt)} title={$collapsed ? $dt("dash.nav.replayTour") : undefined}><Icon name="play" size={18} /><span class:sr={$collapsed}>{$dt("dash.nav.replayTour")}</span></button></li>
      <li><button type="button" on:click={showChecklist} title={$collapsed ? $dt("dash.check.show") : undefined}><Icon name="check" size={18} /><span class:sr={$collapsed}>{$dt("dash.check.show")}</span></button></li>
    </ul>
    <SettingsMenu compact={$collapsed} placement="top" align="start" labels={{ trigger: $dt("dash.display.trigger"), title: $dt("dash.display.title"), theme: $dt("dash.display.theme"), light: $dt("dash.display.light"), dark: $dt("dash.display.dark"), system: $dt("dash.display.system"), density: $dt("dash.display.density"), comfortable: $dt("dash.display.comfortable"), compact: $dt("dash.display.compact"), motion: $dt("dash.display.motionLegend"), reduceMotion: $dt("dash.display.motion") }} />
    {#if $store.isAuthCodeValid}
      <div class="sidebar__profile">
        <span class="sidebar__avatar" aria-hidden="true">
          {#if $store?.picture}
            <img src={$store.picture} alt="" referrerpolicy="no-referrer" on:error={(e) => ((e.currentTarget as HTMLElement).style.display = "none")} />
          {/if}
          <span>{initials(name)}</span>
        </span>
        {#if !$collapsed}
          <div class="sidebar__who">
            <p class="sidebar__name" title={name}>{name}</p>
            <button type="button" class="sidebar__signout" on:click={() => logout()}>{$dt("dash.nav.signOut")}</button>
          </div>
        {:else}
          <button type="button" class="sidebar__signout-icon" aria-label={$dt("dash.nav.signOut")} title={$dt("dash.nav.signOut")} on:click={() => logout()}>
            <Icon name="logout" size={18} />
          </button>
        {/if}
      </div>
    {/if}
  </div>
</aside>

<style lang="scss">
  .sidebar {
    position: sticky;
    top: 0;
    height: 100dvh;
    width: var(--sidebar-w, 264px);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-3);
    background: var(--surface-1);
    border-right: 1px solid var(--border-1);
    transition: width var(--dur-base) var(--ease-out);
    z-index: var(--z-drawer, 40);
    overflow: hidden;
    &.collapsed { width: var(--sidebar-collapsed-w, 72px); }
  }
  .sidebar__top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); padding: 0 var(--space-1) var(--space-3); }
  .collapsed .sidebar__top { flex-direction: column; }
  .sidebar__brand { display: flex; align-items: center; gap: var(--space-2); text-decoration: none; color: var(--text-1); border-radius: var(--radius-md);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); } }
  .sidebar__logo {
    display: grid; place-items: center; width: 32px; height: 32px; border-radius: var(--radius-md);
    background: var(--accent); color: var(--accent-contrast); font-family: var(--font-display); font-weight: var(--fw-bold);
  }
  .sidebar__brand-name { font-family: var(--font-display); font-weight: var(--fw-semibold); font-size: var(--fs-md); letter-spacing: var(--tracking-caps, 0.04em); }
  .collapsed .sidebar__brand-name { display: none; }
  .sidebar__toggle {
    display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: var(--radius-md);
    background: transparent; color: var(--text-2); cursor: pointer;
    &:hover { background: var(--surface-2); color: var(--text-1); }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .sidebar__nav { flex: 1; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: var(--space-1); }
  .sidebar__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .sidebar__group {
    margin: var(--space-4) 0 var(--space-1);
    padding: 0 var(--space-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
    text-transform: uppercase;
    letter-spacing: var(--tracking-caps, 0.06em);
    &.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  }
  .sidebar__help { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; width: 100%;
    a, button { display: flex; align-items: center; gap: var(--space-3); width: 100%; min-height: 36px; padding: 0 var(--space-3); border: 0; border-radius: var(--radius-md);
      background: none; color: var(--text-2); font: inherit; font-size: var(--fs-sm); text-decoration: none; cursor: pointer; text-align: left;
      &:hover { background: var(--surface-2); color: var(--text-1); }
      &:focus-visible { outline: none; box-shadow: var(--focus-ring); } }
    &.collapsed a, &.collapsed button { justify-content: center; padding: 0; } }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .sidebar__footer { border-top: 1px solid var(--border-1); padding-top: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2); }
  .collapsed .sidebar__footer { align-items: center; }
  .sidebar__profile { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-1); }
  .collapsed .sidebar__profile { flex-direction: column; }
  .sidebar__avatar {
    position: relative; display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--radius-full);
    background: var(--accent-soft); color: var(--accent); font-size: var(--fs-xs); font-weight: var(--fw-semibold); overflow: hidden; flex-shrink: 0;
    img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  }
  .sidebar__who { min-width: 0; }
  .sidebar__name { margin: 0; font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar__signout {
    background: none; border: 0; padding: 0; font: inherit; font-size: var(--fs-xs); color: var(--text-link); cursor: pointer;
    &:hover { text-decoration: underline; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
  }
  .sidebar__signout-icon {
    display: grid; place-items: center; width: 36px; height: 36px; border: 0; border-radius: var(--radius-md); background: transparent; color: var(--text-2); cursor: pointer;
    &:hover { background: var(--surface-2); }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  @media (max-width: 767px) { .sidebar { display: none; } }
</style>
