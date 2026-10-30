<!-- WS4. Mobile navigation: a bottom bar with the four most used sections and
     "More" for the rest, display settings and sign out. Under 768px only. -->
<script lang="ts">
  import { tick } from "svelte";
  import Icon from "./ui/Icon.svelte";
  import SettingsMenu from "$lib/ui/molecules/SettingsMenu.svelte";
  import { replayTour } from "./tour";
  import { SECTIONS, activeSection, goTo, type SectionId } from "./nav";
  import { dt } from "./i18n";
  import logout from "../../components/systems/requests/logout";

  const PRIMARY: SectionId[] = ["home", "automations", "subscribers", "reports"];
  const primary = SECTIONS.filter((s) => PRIMARY.includes(s.id));
  const rest = SECTIONS.filter((s) => !PRIMARY.includes(s.id));
  $: moreActive = rest.some((s) => s.id === $activeSection);
  let open = false;
  let sheet: HTMLDivElement;
  let moreBtn: HTMLButtonElement;

  async function openMore() {
    open = true;
    await tick();
    sheet?.querySelector<HTMLElement>("a,button")?.focus();
  }
  function close() {
    open = false;
    moreBtn?.focus();
  }
  function onKey(e: KeyboardEvent) {
    if (!open) return;
    if (e.key === "Escape") return close();
    if (e.key !== "Tab" || !sheet) return;
    // Keep focus inside the sheet while it is open.
    const items = [...sheet.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,[tabindex]:not([tabindex="-1"])')].filter((el) => el.offsetParent !== null);
    if (!items.length) return;
    const first = items[0], last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }
  function go(e: MouseEvent, id: SectionId) {
    e.preventDefault();
    open = false;
    goTo(id);
  }
</script>

<svelte:window on:keydown={onKey} />

<nav class="mnav" aria-label={$dt("dash.nav.label")}>
  {#each primary as s (s.id)}
    <a href="/dashboard?section={s.id}" class="mnav__item" data-tour="m-nav-{s.id}" class:active={$activeSection === s.id} aria-current={$activeSection === s.id ? "page" : undefined} on:click={(e) => go(e, s.id)}>
      <Icon name={s.icon} size={22} />
      <span>{$dt(s.labelKey)}</span>
    </a>
  {/each}
  <button type="button" class="mnav__item" data-tour="m-nav-more" class:active={moreActive || open} aria-expanded={open} aria-haspopup="dialog" bind:this={moreBtn} on:click={openMore}>
    <Icon name="menu" size={22} />
    <span>{$dt("dash.nav.more")}</span>
  </button>
</nav>

{#if open}
  <div class="mnav__scrim" on:click={close} aria-hidden="true"></div>
  <div class="mnav__sheet" role="dialog" aria-modal="true" aria-label={$dt("dash.nav.more")} bind:this={sheet}>
    <div class="mnav__sheet-head">
      <p>{$dt("dash.nav.more")}</p>
      <button type="button" class="mnav__close" aria-label={$dt("dash.nav.closeMenu")} on:click={close}><Icon name="close" size={20} /></button>
    </div>
    <ul>
      {#each rest as s (s.id)}
        <li>
          <a href="/dashboard?section={s.id}" class:active={$activeSection === s.id} aria-current={$activeSection === s.id ? "page" : undefined} on:click={(e) => go(e, s.id)}>
            <Icon name={s.icon} size={20} /> {$dt(s.labelKey)}
          </a>
        </li>
      {/each}
    </ul>
    <div class="mnav__sheet-foot">
      <a href="/help"><Icon name="info" size={20} /> {$dt("dash.nav.help")}</a>
      <button type="button" class="mnav__signout" on:click={() => { open = false; replayTour($dt); }}><Icon name="play" size={18} /> {$dt("dash.nav.replayTour")}</button>
      <SettingsMenu placement="top" align="start" labels={{ trigger: $dt("dash.display.trigger"), title: $dt("dash.display.title"), theme: $dt("dash.display.theme"), light: $dt("dash.display.light"), dark: $dt("dash.display.dark"), system: $dt("dash.display.system"), density: $dt("dash.display.density"), comfortable: $dt("dash.display.comfortable"), compact: $dt("dash.display.compact"), motion: $dt("dash.display.motionLegend"), reduceMotion: $dt("dash.display.motion") }} />
      <button type="button" class="mnav__signout" on:click={() => logout()}><Icon name="logout" size={18} /> {$dt("dash.nav.signOut")}</button>
    </div>
  </div>
{/if}

<style lang="scss">
  /* Bottom bar in the thumb zone. Current item: ink icon, semibold label and a dot above the icon. */
  .mnav { display: none; }
  @media (max-width: 767px) {
    .mnav {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: var(--z-drawer);
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      padding: var(--space-1) max(var(--space-2), env(safe-area-inset-left)) calc(var(--space-1) + env(safe-area-inset-bottom)) max(var(--space-2), env(safe-area-inset-right));
      background: var(--surface-glass);
      -webkit-backdrop-filter: saturate(1.8) blur(20px);
      backdrop-filter: saturate(1.8) blur(20px);
      border-top: 1px solid var(--border-1);
    }
  }
  .mnav__item {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 2px;
    min-height: 3.5rem;
    padding: var(--space-2) var(--space-1) var(--space-1);
    background: none;
    border: 0;
    border-radius: var(--radius-md);
    color: var(--text-3);
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    text-decoration: none;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition: color var(--t-out) var(--ease-out), transform var(--t-out) var(--ease-out);
    span { max-width: 100%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    &::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 50%;
      width: 4px;
      height: 4px;
      margin-left: -2px;
      border-radius: var(--radius-full);
      background: currentColor;
      opacity: 0;
      transition: opacity var(--dur-base) var(--ease-out);
    }
    &.active { color: var(--text-1); font-weight: var(--fw-semibold); }
    &[aria-current="page"]::before { opacity: 1; }
    &:active { transform: scale(0.94); transition-duration: 60ms; }
    &:focus-visible { outline: none; box-shadow: inset 0 0 0 2px var(--focus-color); }
  }
  .mnav__scrim {
    position: fixed;
    inset: 0;
    background: var(--surface-overlay);
    z-index: var(--z-modal);
    animation: mnav-fade var(--dur-base) var(--ease-out);
  }
  .mnav__sheet {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: calc(var(--z-modal) + 1);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-bottom: 0;
    border-radius: var(--radius-xl) var(--radius-xl) 0 0;
    padding: var(--space-3) var(--gutter) calc(var(--space-4) + env(safe-area-inset-bottom));
    box-shadow: var(--shadow-3);
    max-height: 80dvh;
    overflow-y: auto;
    overscroll-behavior: contain;
    animation: mnav-rise var(--dur-slow) var(--ease-out);
    &::before {
      content: "";
      display: block;
      width: 36px;
      height: 4px;
      margin: 0 auto var(--space-3);
      border-radius: var(--radius-full);
      background: var(--border-1);
    }
    ul { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
    a {
      display: flex; align-items: center; gap: var(--space-3); min-height: 3rem; padding: 0 var(--space-3);
      border-radius: var(--radius-md); color: var(--text-1); text-decoration: none; font-size: var(--fs-md);
      transition: background-color var(--t-out) var(--ease-out);
      &:active { background: var(--surface-3); transition-duration: 60ms; }
      &.active { background: var(--surface-2); font-weight: var(--fw-semibold); }
      &.active::after { content: ""; width: 6px; height: 6px; margin-left: auto; border-radius: var(--radius-full); background: currentColor; }
      &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    }
  }
  .mnav__sheet-head {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-2);
    p { margin: 0; font-family: var(--font-display); font-size: var(--fs-lg); font-weight: var(--fw-semibold); letter-spacing: var(--tracking-tight); color: var(--text-1); }
  }
  .mnav__close {
    display: grid; place-items: center; width: var(--control-h); height: var(--control-h); border: 0; background: var(--surface-2); color: var(--text-1); border-radius: var(--radius-full); cursor: pointer;
    &:active { transform: scale(0.94); transition-duration: 60ms; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .mnav__sheet-foot { border-top: 1px solid var(--border-1); margin-top: var(--space-3); padding-top: var(--space-3); display: flex; flex-direction: column; gap: 2px; }
  .mnav__signout {
    display: flex; align-items: center; gap: var(--space-3); min-height: var(--control-h); padding: 0 var(--space-3); border: 0; background: none; color: var(--text-1);
    font: inherit; font-size: var(--fs-sm); cursor: pointer; border-radius: var(--radius-md); text-align: left;
    &:active { background: var(--surface-3); transition-duration: 60ms; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  @keyframes mnav-fade { from { opacity: 0; } }
  @keyframes mnav-rise { from { transform: translateY(24px); opacity: 0; } }
  @media (forced-colors: active) {
    .mnav { border-top-color: CanvasText; }
    .mnav__item[aria-current="page"] { forced-color-adjust: none; color: Highlight; }
  }
  @media (prefers-reduced-motion: reduce) {
    .mnav__item:active, .mnav__close:active { transform: none; }
    .mnav__sheet, .mnav__scrim { animation: none; }
  }
</style>
