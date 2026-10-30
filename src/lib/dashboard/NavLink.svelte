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
  </a>
</li>

<style lang="scss">
  .slink {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 40px;
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-2);
    text-decoration: none;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    transition: background-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out);
    &:hover { background: var(--surface-2); color: var(--text-1); }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &.active {
      background: var(--accent-soft);
      color: var(--text-1);
      font-weight: var(--fw-semibold);
      &::before { content: ""; position: absolute; left: -12px; top: 8px; bottom: 8px; width: 3px; border-radius: 0 3px 3px 0; background: var(--accent); }
      :global(.dash-icon) { color: var(--accent); }
    }
    &.collapsed { justify-content: center; padding: 0; width: 44px; margin: 0 auto; }
  }
  .slink__label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
