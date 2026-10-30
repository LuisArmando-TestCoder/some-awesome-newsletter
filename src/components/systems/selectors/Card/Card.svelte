<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";
  import SVG from "../../../SVG/SVG.svelte";

  export let label: string = "";
  export let svg: string = "user-gear-solid";
  export let selected = false;
  export let canReveal = false;

  // 'collapsed' determines whether the card is in its compact state.
  export let collapsed = false;

  // Toggle collapse when the title button is clicked.
  function toggleCollapse() {
    collapsed = !collapsed;
    // When expanding, stagger the reveal of card-body children after a 500ms delay.
    if (!collapsed) {
      const cardBody = document.querySelector(".card-body");
      if (cardBody) {
        const children = Array.from(cardBody.children);
        children.forEach((child, index) => {
          child.classList.remove("visible");
          child.classList.add("hidden");
          setTimeout(
            () => {
              child.classList.remove("hidden");
              child.classList.add("visible");
            },
            500 + index * 100
          ); // 500ms delay + stagger for each child.
        });
      }
    }
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="card {selected ? 'selected' : ''} {collapsed
    ? 'collapsed'
    : 'expanded'}"
  on:click|stopPropagation={toggleCollapse}
  aria-expanded={!collapsed}
>
  <div class="card-title">
    <button
      type="button"
      class="card-title-button"
      aria-expanded={!collapsed}
      on:click|stopPropagation={toggleCollapse}
    >
      <span class="card-title-text {collapsed ? 'hidden' : 'visible'}">
        <MarkdownText {canReveal}>## {label}</MarkdownText>
      </span>
      <span class="card-title-icon {collapsed ? 'visible' : 'hidden'}">
        <SVG src="icons/{svg}.svg" />
      </span>
    </button>
  </div>
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div class="card-body" on:click|stopPropagation>
    <slot />
  </div>
</div>

<style lang="scss">
  .card {
    background: var(--surface-glass);
    backdrop-filter: blur(12px) saturate(1.2);
    -webkit-backdrop-filter: blur(12px) saturate(1.2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    padding: var(--space-4) var(--space-6);
    cursor: pointer;
    text-align: left;
    color: var(--text-1);
    max-height: 100%;
    position: sticky;
    top: 0;
    padding-bottom: 150px;
    margin-bottom: var(--space-5);
    -webkit-tap-highlight-color: transparent;
    /* Horizontal expansion: expanded state happens immediately, collapsed state waits. */
    &.expanded {
      overflow: auto;
      width: 100%;
      transition:
        transform var(--dur-slow) var(--ease-out),
        box-shadow var(--dur-slow) var(--ease-out),
        border-color var(--dur-slow) var(--ease-out),
        width var(--dur-slow) var(--ease-out) var(--dur-slow),
        height var(--dur-slow) var(--ease-out) var(--dur-slow),
        overflow 0s linear var(--dur-slow);
    }

    &.collapsed {
      padding: var(--space-4) var(--space-7);
      width: 150px;
      height: 150px;
      transition:
        transform var(--dur-base) var(--ease-out),
        box-shadow var(--dur-base) var(--ease-out),
        border-color var(--dur-base) var(--ease-out),
        width var(--dur-slow) var(--ease-out) var(--dur-slow),
        height var(--dur-slow) var(--ease-out) var(--dur-slow),
        padding var(--dur-slow) var(--ease-out) var(--dur-slow),
        overflow var(--dur-slow) var(--ease-out);
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .card:hover {
      border-color: var(--border-2);
      box-shadow: var(--shadow-2);
    }
  }

  .card:has(.card-title-button:active) {
    transform: scale(0.99);
  }

  /* Selected: ink edge plus a heavier ring, never a color alone. */
  .card.selected {
    border-color: var(--text-1);
    box-shadow: inset 0 0 0 1px var(--text-1);
  }

  .card:has(.card-title-button:focus-visible) {
    box-shadow: var(--focus-ring);
  }

  .card-title {
    margin-bottom: var(--space-4);
  }

  .card-title-button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    border-radius: var(--radius-md);
  }

  .card-title-text,
  .card-title-icon {
    transition:
      opacity var(--dur-slow) var(--ease-out) var(--dur-slow),
      width 0s linear var(--dur-slow);
    width: auto;
  }

  .card-title-text.hidden,
  .card-title-icon.hidden {
    transition:
      opacity var(--dur-slow) var(--ease-out) 0s,
      width 0s linear var(--dur-slow);
    opacity: 0;
    width: 0;
    height: 125px;

    :global(svg) {
      transition:
        width var(--dur-base) var(--ease-out) var(--dur-base),
        opacity var(--dur-base) var(--ease-out) 0s;
      width: 0%;
      opacity: 0;
    }
  }

  .card-title-text.visible,
  .card-title-icon.visible {
    transition: opacity var(--dur-reveal) var(--ease-out) var(--dur-slow);
    opacity: 1;

    :global(svg) {
      width: 100%;
      opacity: 1;
      transition:
        width var(--dur-reveal) var(--ease-out) 0s,
        opacity var(--dur-reveal) var(--ease-out) var(--dur-slow);
    }
  }

  /* The card-body container collapses vertically after a short delay when expanding. */
  .card.expanded .card-body {
    transition:
      max-height var(--dur-slow) var(--ease-out) var(--dur-slow),
      opacity var(--dur-slow) var(--ease-out) var(--dur-slow);
    max-height: 100vh;
    opacity: 1;
    overflow: auto;
  }

  .card.collapsed .card-body {
    overflow: hidden;
    transition:
      max-height var(--dur-slow) var(--ease-out) 0s,
      opacity var(--dur-slow) var(--ease-out) 0s;
    max-height: 0;
    opacity: 0;
  }

  @media (forced-colors: active) {
    .card {
      border-color: CanvasText;
    }
    .card.selected {
      border: 2px solid Highlight;
    }
    .card:has(.card-title-button:focus-visible) {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card:has(.card-title-button:active) {
      transform: none;
    }
  }
</style>
