<script lang="ts">
  import { writable } from "svelte/store";
  import JsonViewer from "./JsonViewer.svelte";

  // The component accepts any JSON-like object.
  export let card: any;

  // Callback to be invoked when the card's selection state changes.
  export let onSelect: (updatedCard: any) => void = () => {};

  // Create a writable store for the card's state.
  export const cardStore = writable(card);

  // Toggle a 'selected' property on the card for visual feedback.
  function toggleCard() {
    if (card && typeof card === "object") {
      card.selected = !card.selected;
      cardStore.set(card);
      onSelect(card);
    }
  }
</script>

<button
  type="button"
  class="card {card.selected ? 'selected' : ''}"
  on:click={toggleCard}
  aria-pressed={card.selected}
>
  <h3>Object Viewer</h3>
  <!-- Render the passed JSON object recursively -->
  <JsonViewer data={card} />
</button>

<style lang="scss">
  .card {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 10px;
    padding: 1rem;
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
    transform: translateY(-3px);
    box-shadow: 0 0 10px -3px var(--color-background);
  }

  .card.selected {
    border-color: var(--color-foreground);
    box-shadow: 0 0 10px -2px var(--color-foreground);
    transform: scale(1.02);
  }

  .card h3 {
    margin: 0;
    font-size: 1.25rem;
    color: var(--color-foreground);
  }
</style>
