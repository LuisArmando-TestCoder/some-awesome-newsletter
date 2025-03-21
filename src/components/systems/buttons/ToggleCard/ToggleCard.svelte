<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";

  export let cardTitle: string;
  export let canReveal = false;

  let isOpen = false;
  let contentEl: HTMLDivElement;

  function toggle() {
    isOpen = !isOpen;
    if (contentEl) {
      // If opening, set height to the scrollHeight so it animates from 0 to content height.
      if (isOpen) {
        // Set to explicit height so the transition can occur.
        contentEl.style.height = contentEl.scrollHeight + "px";
      } else {
        // When closing, revert height to 0.
        contentEl.style.height = "0";
      }
    }
  }

  // After the transition ends and if open, reset the height to auto.
  function handleTransitionEnd() {
    if (isOpen && contentEl) {
      contentEl.style.height = "auto";
    }
  }
</script>

<div class="card">
  <button class="card-header" on:click={toggle} aria-expanded={isOpen} type="button">
    <MarkdownText {canReveal}>{cardTitle}</MarkdownText>
    <span class="arrow {isOpen ? 'open' : ''}"></span>
  </button>
  <div
    class="content-wrapper"
    bind:this={contentEl}
    on:transitionend={handleTransitionEnd}
  >
    <div class="content">
      <slot></slot>
    </div>
  </div>
</div>

<style lang="scss">
  .card {
    border-radius: 4px;
    border: 0 solid;
    margin: 1rem 0;
    overflow: hidden;
    box-shadow: 0 0 10px -9px var(--color-background);
  }
  .card-header {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border: 0 solid;
    padding: 0.5rem 1rem;
    background: transparent;
    cursor: pointer;
    user-select: none;
  }
  .arrow {
    display: inline-block;
    width: 1rem;
    height: 1rem;
    /* CSS generated arrow using borders */
    border-right: 2px solid #333;
    border-bottom: 2px solid #333;
    transform: rotate(45deg);
    transition: transform 0.3s ease;
  }
  .arrow.open {
    transform: rotate(225deg);
  }
  .content-wrapper {
    overflow: auto;
    height: 0;
    transition: height 0.3s ease;
  }
  .content {
    padding: 0.5rem 1rem;
  }
</style>
