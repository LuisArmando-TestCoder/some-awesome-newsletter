<script lang="ts">
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";

  // The component accepts any JSON-like object.
  export let label: string = "";
  export let selected = false;
  export let canReveal = false;
</script>

<div class="card {selected ? 'selected' : ''}">
  {#if label}
    <MarkdownText {canReveal}>## {label}</MarkdownText>
  {/if}
  <!-- Render the passed JSON object recursively -->
  <slot />
</div>

<style lang="scss">
  .card {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 10px;
    padding: 1rem 2rem;
    cursor: pointer;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
    box-shadow: 0 0 10px -6.5px var(--color-background);
    text-align: left;
    /* Reset default button styles */
    appearance: none;
    border: none;
    width: 100%;
  }

  .card:hover {
    box-shadow: 0 0 10px -3px var(--color-background);
  }

  .card.selected {
    border-color: var(--color-foreground);
    box-shadow: 0 0 10px -2px var(--color-foreground);
  }
</style>
