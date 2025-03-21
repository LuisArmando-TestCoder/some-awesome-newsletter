<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";
  import SVG from "../../../SVG/SVG.svelte";

  export let label: string = "";
  export let selected = false;
  export let canReveal = false;

  // 'collapsed' determines whether the card is in its compact state.
  let collapsed = false;

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

<div
  class="card {selected ? 'selected' : ''} {collapsed
    ? 'collapsed'
    : 'expanded'}"
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
        <SVG src="icons/user-gear-solid.svg" />
      </span>
    </button>
  </div>
  <div class="card-body" on:click|stopPropagation>
    <slot />
  </div>
</div>

<style lang="scss">
  .card {
    background: var(--color-x-gradient-opaque);
    backdrop-filter: blur(6px);
    border-radius: 10px;
    padding: 1rem 2rem;
    cursor: pointer;
    text-align: left;
    box-shadow: 0 0 10px -6.5px var(--color-background);
    overflow: hidden;
    /* Horizontal expansion: expanded state happens immediately, collapsed state waits 0.5s */
    &.expanded {
      border: 1px solid var(--color-background-opaque);
      width: 100%;
      transition:
        transform 0.6s ease,
        box-shadow 0.6s ease,
        border-color 0.6s ease,
        width 0.4s ease 0.3s,
        height 0.4s ease 0.3s;
    }

    &.collapsed {
      padding: 1rem 3rem;
      border: 1px solid var(--color-background);
      width: 150px; /* Adjust as needed */
      height: 150px; /* Square ratio */
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease,
        border-color 0.3s ease,
        width 0.4s ease 0.5s,
        height 0.4s ease 0.5s,
        padding 0.4s ease 0.5s;
    }
  }

  .card:hover {
    box-shadow: 0 0 10px -3px var(--color-background);
  }

  .card.selected {
    border-color: var(--color-foreground);
    box-shadow: 0 0 10px -2px var(--color-foreground);
  }

  .card-title {
    margin-bottom: 1rem;
  }

  .card-title-button {
    all: unset;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .card-title-text,
  .card-title-icon {
    transition:
      opacity 0.4s ease 0.5s,
      width 0s ease 0.4s;
    width: auto;
  }

  .card-title-text.hidden,
  .card-title-icon.hidden {
    transition:
      opacity 0.4s ease 0s,
      width 0s ease 0.4s;
    opacity: 0;
    width: 0;

    :global(svg) {
      transition:
        width 0.3s ease 0.3s,
        opacity 0.3s ease 0s;
      width: 0%;
      opacity: 0;
    }
  }

  .card-title-text.visible,
  .card-title-icon.visible {
    transition: opacity 1s ease 1s;
    opacity: 1;

    :global(svg) {
      width: 100%;
      opacity: 1;
      transition:
        width 1s ease 0s,
        opacity 1s ease 1s;
    }
  }

  /* The card-body container collapses vertically with a 500ms delay when expanding */
  .card.expanded .card-body {
    transition:
      max-height 0.4s ease 0.5s,
      opacity 0.4s ease 0.5s;
    max-height: 1000px; /* Adjust based on expected content height */
    opacity: 1;
  }

  .card.collapsed .card-body {
    transition:
      max-height 0.4s ease 0s,
      opacity 0.4s ease 0s;
    max-height: 0;
    opacity: 0;
  }

  /* Each child inside card-body will also transition its opacity and vertical position */
  .card-body > * {
    opacity: 0;
    transform: translateY(10px);
    transition:
      opacity 0.4s ease,
      transform 0.4s ease;
  }
  .card-body > *.visible {
    opacity: 1;
    transform: translateY(0);
  }
</style>
