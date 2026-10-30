<script lang="ts">
  import store, { stepsMapping } from "../../../components/store";
  import type { SideLinkType, StepsKey } from "../../../components/types";

  export let link: SideLinkType;
  export let isCollapsed: boolean;
  let isOpen = false;

  const hasChildren = link.children && link.children.length > 0;

  function toggle() {
    if (hasChildren) {
      isOpen = !isOpen;
    }
  }

  $: isActive =
    $store.stepsIndex === stepsMapping[(link.key ?? link.name) as StepsKey];

  function activate() {
    link.callback?.();
    toggle();
  }

  function getInitials(name: string): string {
    if (!name) return "";
    const names = name?.split(" ");
    if (names.length === 1) return names[0].charAt(0).toUpperCase();
    return (
      names[0].charAt(0) + names[names.length - 1].charAt(0)
    ).toUpperCase();
  }
</script>

<li
  class="sidebar__nav-item"
  class:is-collapsed={isCollapsed}
  class:is-open={isOpen}
>
  <div class="link-container">
    {#if link.url}
      <a
        href={link.url}
        class:has-children={hasChildren}
        class="sidebar__nav-link"
        class:underline={isActive}
        on:click={activate}
      >
        <span class="link-initials" class:dashed-border={hasChildren}
          >{getInitials(link.name)}</span
        >
        <span class="link-name">{link.name}</span>
      </a>
    {:else}
      <button
        type="button"
        aria-expanded={hasChildren ? isOpen : undefined}
        class:has-children={hasChildren}
        class="sidebar__nav-link"
        class:underline={isActive}
        on:click={activate}
      >
        <span class="link-initials" class:dashed-border={hasChildren}
          >{getInitials(link.name)}</span
        >
        <span class="link-name">{link.name}</span>
      </button>
    {/if}
    {#if hasChildren}
      <button
        type="button"
        class="toggle-icon"
        aria-expanded={isOpen}
        aria-label={link.name}
        on:click={toggle}>{isOpen ? "-" : "+"}</button
      >
    {/if}
  </div>
  {#if hasChildren}
    <ul
      class="sidebar__nav-list--nested"
      class:collapsed={isCollapsed}
      class:is-open={isOpen}
    >
      {#each [...(link.children ?? [])] as childLink (childLink.name)}
        <svelte:self link={childLink} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  .link-container {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    cursor: pointer;
    min-height: var(--control-h);
    padding: 0 var(--space-2);
    border-radius: var(--radius-md);
    transition: background-color var(--t-out) var(--ease-out);
    &:active { background-color: var(--surface-3); transition-duration: 60ms; }
  }
  @media (hover: hover) and (pointer: fine) {
    .link-container:hover { background-color: var(--surface-2); transition-duration: var(--t-in); }
    .sidebar__nav-item.is-collapsed .link-container:hover { background-color: transparent; }
  }

  .sidebar__nav-item.is-collapsed .link-container { padding: 0; }

  .is-collapsed .sidebar__nav-link { gap: 0; }

  .sidebar__nav-link {
    background: none;
    border: 0;
    padding: 0;
    min-height: var(--control-h);
    font: inherit;
    font-size: var(--fs-sm);
    text-align: start;
    cursor: pointer;
    color: var(--text-2);
    text-decoration: none;
    font-weight: var(--fw-medium);
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    white-space: nowrap;
    overflow: hidden;
    border-radius: var(--radius-sm);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &.underline { color: var(--text-1); font-weight: var(--fw-semibold); }
  }

  .link-initials {
    width: 1.875rem;
    height: 1.875rem;
    border-radius: var(--radius-full);
    background: transparent;
    border: 1px solid var(--border-2);
    color: var(--text-1);
    display: grid;
    place-items: center;
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    flex-shrink: 0;
    &.dashed-border { border-style: dashed; }
  }

  /* Current step: filled mark plus semibold label, not color alone. */
  .sidebar__nav-link.underline .link-initials {
    background: var(--surface-inverse);
    color: var(--text-inverse);
    border-color: var(--surface-inverse);
  }

  .link-name,
  .toggle-icon {
    opacity: 0;
    width: 0;
    transition: opacity var(--dur-base) var(--ease-out);

    :global(.sidebar:not(.collapsed)) & {
      opacity: 1;
      width: auto;
    }
  }

  .toggle-icon {
    display: grid;
    place-items: center;
    min-width: var(--control-h-sm);
    min-height: var(--control-h-sm);
    margin-left: auto;
    background: none;
    border: 0;
    border-radius: var(--radius-full);
    padding: 0;
    font: inherit;
    color: var(--text-2);
    cursor: pointer;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }

  .sidebar__nav-list--nested {
    list-style: none;
    margin: 0;
    padding-left: calc(var(--space-3) + 1.875rem);
    max-height: 0;
    overflow: hidden;
    transition:
      max-height var(--dur-slow) var(--ease-out),
      opacity var(--dur-base) var(--ease-out);
    opacity: 0;

    &.collapsed { padding-left: 0; }

    &.is-open {
      max-height: 1000px; /* open height cap for the transition */
      opacity: 1;
    }
  }

  @media (forced-colors: active) {
    .sidebar__nav-link.underline .link-initials { forced-color-adjust: none; background: Highlight; color: HighlightText; border-color: Highlight; }
  }
</style>
