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
  on:click={() => link.callback?.()}
  class="sidebar__nav-item"
  class:is-collapsed={isCollapsed}
  class:is-open={isOpen}
>
  <div class="link-container" on:click={toggle}>
    <a
      href={link.url}
      class:has-children={hasChildren}
      class="sidebar__nav-link"
      class:underline={$store.stepsIndex ===
        stepsMapping[(link.key ?? link.name) as StepsKey]}
    >
      <span class="link-initials" class:dashed-border={hasChildren}
        >{getInitials(link.name)}</span
      >
      <span class="link-name">{link.name}</span>
    </a>
    {#if hasChildren}
      <span class="toggle-icon">{isOpen ? "-" : "+"}</span>
    {/if}
  </div>
  {#if hasChildren}
    <ul
      class="sidebar__nav-list--nested"
      class:collapsed={isCollapsed}
      class:is-open={isOpen}
    >
      {#each [...(link.children ?? [])] as childLink}
        <svelte:self link={childLink} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  .link-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    padding: var(--space-sm);
    border-radius: var(--radius-sm);
    transition: background-color 0.3s ease;

    &:hover {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }

  .sidebar__nav-item {
    transition: height 0.3s ease;

    &.is-collapsed {
      .link-container {
        padding: var(--space-sm) 0;

        &:hover {
          background-color: transparent;
        }
      }
    }
  }

  .is-collapsed {
    .sidebar__nav-link {
      gap: 0;
      transition-delay: 0.5s;
    }
  }

  .sidebar__nav-link {
    color: var(--c-text);
    text-decoration: none;
    font-weight: 600;
    flex-grow: 1;
    display: flex;
    align-items: center;
    gap: var(--space-md);
    white-space: nowrap;
    overflow: hidden;
    transition-delay: 0.5s;

    &.underline {
      font-weight: 900;
    }
  }

  .link-initials {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: transparent;
    border: 2px solid var(--c-primary);
    color: var(--c-primary);
    display: grid;
    place-items: center;
    font-size: 0.9rem;
    flex-shrink: 0;
    box-sizing: border-box;

    &.dashed-border {
      border-style: dashed;
    }
  }

  .sidebar__nav-link.underline .link-initials {
    background: black;
    color: white;
    border-color: black;
  }

  .link-name,
  .toggle-icon {
    opacity: 0;
    width: 0;
    transition:
      opacity 0.3s ease,
      width 0.3s ease;

    :global(.sidebar:not(.collapsed)) & {
      opacity: 1;
      width: auto;
    }
  }

  .toggle-icon {
    margin-left: auto;
  }

  .sidebar__nav-list--nested {
    list-style: none;
    padding-left: calc(var(--space-md) + 30px);
    max-height: 0;
    overflow: hidden;
    transition:
      max-height 0.3s ease,
      opacity 0.3s ease;
    opacity: 0;

    &.collapsed {
      padding-left: 0;
    }

    &.is-open {
      max-height: 1000px; /* Arbitrary large value */
      opacity: 1;
    }
  }
</style>
