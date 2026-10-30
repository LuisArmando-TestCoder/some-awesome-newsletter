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
  /* Mono app shell: quiet surface, hairline edge, nothing filled except the current item's dot. */
  .sidebar {
    position: sticky;
    top: 0;
    height: 100dvh;
    width: var(--sidebar-w);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    padding: var(--space-4) var(--space-3) var(--space-3);
    background: var(--surface-1);
    border-right: 1px solid var(--border-1);
    transition: width var(--dur-slow) var(--ease-out);
    z-index: var(--z-drawer);
    overflow: hidden;
    &.collapsed { width: var(--sidebar-collapsed-w); }
  }
  .sidebar__top { display: flex; align-items: center; justify-content: space-between; gap: var(--space-2); min-height: var(--control-h); padding: 0 var(--space-1) var(--space-3); }
  .collapsed .sidebar__top { flex-direction: column; padding-inline: 0; }
  .sidebar__brand {
    display: flex; align-items: center; gap: var(--space-2); min-height: var(--control-h-sm); padding-inline: var(--space-1);
    text-decoration: none; color: var(--text-1); border-radius: var(--radius-sm);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .sidebar__logo {
    display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border-radius: var(--radius-sm);
    background: var(--surface-inverse); color: var(--text-inverse);
    font-family: var(--font-display); font-size: var(--fs-sm); font-weight: var(--fw-bold); letter-spacing: var(--tracking-tight);
  }
  .sidebar__brand-name { font-family: var(--font-display); font-weight: var(--fw-semibold); font-size: var(--fs-md); letter-spacing: var(--tracking-tight); }
  .collapsed .sidebar__brand-name { display: none; }
  .sidebar__toggle {
    display: grid; place-items: center; width: var(--control-h-sm); height: var(--control-h-sm); border: 0; border-radius: var(--radius-full);
    background: transparent; color: var(--text-2); cursor: pointer;
    transition: background-color var(--t-out) var(--ease-out), color var(--t-out) var(--ease-out), transform var(--t-out) var(--ease-out);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &:active { transform: scale(0.94); transition-duration: 60ms; }
  }
  .sidebar__nav { flex: 1; overflow-y: auto; overflow-x: hidden; display: flex; flex-direction: column; gap: var(--space-1); scrollbar-width: thin; }
  .sidebar__list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .sidebar__group {
    margin: var(--space-5) 0 var(--space-1);
    padding: 0 var(--space-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text-3);
    letter-spacing: 0;
    &.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  }
  .sidebar__help {
    list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; width: 100%;
    a, button {
      display: flex; align-items: center; gap: var(--space-3); width: 100%; min-height: var(--control-h-sm); padding: 0 var(--space-3);
      border: 0; border-radius: var(--radius-md); background: none; color: var(--text-2);
      font: inherit; font-size: var(--fs-sm); text-decoration: none; cursor: pointer; text-align: left;
      transition: background-color var(--t-out) var(--ease-out), color var(--t-out) var(--ease-out);
      &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
      &:active { background: var(--surface-3); transition-duration: 60ms; }
    }
    &.collapsed a, &.collapsed button { justify-content: center; padding: 0; width: var(--control-h); margin-inline: auto; }
  }
  @media (hover: hover) and (pointer: fine) {
    .sidebar__toggle:hover,
    .sidebar__help a:hover,
    .sidebar__help button:hover,
    .sidebar__signout-icon:hover { background: var(--surface-2); color: var(--text-1); transition-duration: var(--t-in); }
    .sidebar__signout:hover { text-decoration-thickness: 2px; }
  }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  .sidebar__footer { border-top: 1px solid var(--border-1); padding-top: var(--space-3); display: flex; flex-direction: column; gap: var(--space-2); }
  .collapsed .sidebar__footer { align-items: center; }
  .sidebar__profile { display: flex; align-items: center; gap: var(--space-3); padding: var(--space-1); }
  .collapsed .sidebar__profile { flex-direction: column; }
  .sidebar__avatar {
    position: relative; display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: var(--radius-full);
    background: var(--surface-2); color: var(--text-2); border: 1px solid var(--border-1);
    font-size: var(--fs-xs); font-weight: var(--fw-semibold); overflow: hidden; flex-shrink: 0;
    img { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; }
  }
  .sidebar__who { min-width: 0; }
  .sidebar__name { margin: 0; font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sidebar__signout {
    min-height: 1.5rem; background: none; border: 0; padding: 0; font: inherit; font-size: var(--fs-xs); color: var(--text-2); cursor: pointer;
    text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); }
  }
  .sidebar__signout-icon {
    display: grid; place-items: center; width: var(--control-h); height: var(--control-h); border: 0; border-radius: var(--radius-full); background: transparent; color: var(--text-2); cursor: pointer;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  @media (forced-colors: active) {
    .sidebar { border-right-color: CanvasText; }
  }
  @media (max-width: 767px) { .sidebar { display: none; } }
</style>
