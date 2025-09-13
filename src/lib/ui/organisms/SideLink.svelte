<script lang="ts">
  import store, { stepsMapping } from "../../../components/store";
  import type { SideLinkType, StepsKey } from "../../../components/types";

  export let link: SideLinkType;
  let isOpen = false;

  const hasChildren = link.children && link.children.length > 0;

  function toggle() {
    if (hasChildren) {
      isOpen = !isOpen;
    }
  }
</script>

<li class="sidebar__nav-item {isOpen ? 'is-open' : ''}">
  <div class="link-container" on:click={toggle}>
    <a
      href={link.url}
      on:click={() => link.callback?.()}
      class:has-children={hasChildren}
      class="sidebar__nav-link"
      class:underline={
        $store.stepsIndex === stepsMapping[link.name as StepsKey]
      }
      >{link.name}</a
    >
    {#if hasChildren}
      <span
        class="toggle-icon">{isOpen ? "-" : "+"}</span
      >
    {/if}
  </div>
  {#if hasChildren}
    <ul class="sidebar__nav-list--nested {isOpen ? 'is-open' : ''}">
      {#each [...(link.children ?? [])] as childLink}
        <svelte:self link={childLink} />
      {/each}
    </ul>
  {/if}
</li>

<style lang="scss">
  .sidebar__nav-item {
    margin-bottom: var(--space-md);
    height: 25px;
    transition: 0.5s;
    interpolate-size: allow-keywords;

    &.is-open {
      height: auto;
    }
  }

  .link-container {
    display: flex;
    align-items: center;
    cursor: pointer;
    position: relative;

    &:hover .sidebar__nav-link.has-children {
      transform: translateX(15px);
    }

    &:hover .sidebar__nav-link.has-children::before {
      opacity: 1;
      transform: translateX(5px);
    }
  }

  .sidebar__nav-link {
    color: var(--c-text);
    text-decoration: none;
    font-weight: 600;
    flex-grow: 1;
    transition: transform 0.3s ease;

    &.underline {
      text-decoration: underline;
    }

    &.has-children::before {
      content: ">>";
      position: absolute;
      left: -25px;
      opacity: 0;
      transition:
        opacity 0.3s ease,
        transform 0.3s ease;
    }

    &:not(.has-children):hover {
      text-decoration: underline;
    }
  }

  .toggle-icon {
    margin-left: auto;
    padding: 0 var(--space-md);
  }

  .sidebar__nav-list--nested {
    list-style: none;
    padding-left: var(--space-md);
    margin-top: var(--space-sm);
    height: 0;
    overflow: hidden;
    transition:
      height 0.3s ease,
      opacity 0.3s ease;
    opacity: 0;
    interpolate-size: allow-keywords;

    &.is-open {
      height: auto;
      opacity: 1;
    }
  }
</style>
