<!-- WS4. One sidebar link. Real <a href> so it works with keyboard, middle click and screen readers. -->
<script lang="ts">
  import Icon from "$lib/dashboard/ui/Icon.svelte";
  import { goTo, type Section } from "$lib/dashboard/nav";
  export let section: Section;
  export let label: string;
  export let active = false;
  export let isCollapsed = false;

  function onClick(e: MouseEvent) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
    e.preventDefault();
    goTo(section.id);
  }
</script>

<li>
  <a
    href="/dashboard?section={section.id}"
    class="slink"
    class:active
    class:collapsed={isCollapsed}
    aria-current={active ? "page" : undefined}
    title={isCollapsed ? label : undefined}
    data-tour="nav-{section.id}"
    on:click={onClick}
  >
    <Icon name={section.icon} size={20} />
    <span class="slink__label" class:sr={isCollapsed}>{label}</span>
    <span class="slink__dot" aria-hidden="true"></span>
  </a>
</li>

<style lang="scss">
  /* Current item: semibold label, ink icon and a small dot. Never color alone; aria-current says it too. */
  .slink {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-2);
    text-decoration: none;
    font-size: var(--fs-sm);
    font-weight: var(--fw-regular);
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
    :global(.dash-icon) { flex-shrink: 0; transition: transform var(--t-out) var(--ease-out); }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &:active { background: var(--surface-3); transform: scale(0.98); transition-duration: 60ms; }
    &.active {
      color: var(--text-1);
      font-weight: var(--fw-semibold);
      background: var(--surface-2);
    }
    &.collapsed { justify-content: center; padding: 0; width: var(--control-h); min-height: var(--control-h); margin: 0 auto; }
  }
  @media (hover: hover) and (pointer: fine) {
    .slink:hover:not(.active) { background: var(--surface-2); color: var(--text-1); transition-duration: var(--t-in); }
    .slink:hover:not(.active) :global(.dash-icon) { transform: translateX(2px); }
  }
  .slink__label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .slink__dot {
    width: 6px;
    height: 6px;
    flex-shrink: 0;
    border-radius: var(--radius-full);
    background: currentColor;
    opacity: 0;
    transform: scale(0.4);
    transition: opacity var(--dur-base) var(--ease-out), transform var(--dur-base) var(--ease-out);
  }
  .active .slink__dot { opacity: 1; transform: none; }
  .collapsed .slink__dot { position: absolute; right: 6px; top: 6px; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @media (forced-colors: active) {
    .slink.active { forced-color-adjust: none; background: Highlight; color: HighlightText; }
    .slink__dot { background: CanvasText; }
  }
  @media (prefers-reduced-motion: reduce) {
    .slink:active { transform: none; }
  }
</style>
