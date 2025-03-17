<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount, onDestroy } from "svelte";

  // Props for the color picker.
  export let selectedColor: string = "#03a9f4";
  export let onChange: (newColor: string) => void = () => {};

  // Export a writable store for the selected color.
  export const selectedColorStore = writable(selectedColor);

  let open = false;
  let pickerRef: HTMLElement;

  // A default palette for selection.
  const palette: string[] = [
    "#03a9f4",
    "#00bcd4",
    "#ff5722",
    "#4caf50",
    "#9c27b0",
    "#f44336",
    "#ffc107",
    "#2196f3",
    "#e91e63",
    "#673ab7",
  ];

  // Toggle dropdown open/close.
  function togglePicker() {
    open = !open;
  }

  // Handle selecting a color: update the selected value, update the store, close dropdown, and call onChange.
  function selectColor(color: string) {
    selectedColor = color;
    selectedColorStore.set(color);
    open = false;
    onChange(color);
  }

  // Close dropdown if a click occurs outside the component.
  function handleClickOutside(event: MouseEvent) {
    if (pickerRef && !pickerRef.contains(event.target as Node)) {
      open = false;
    }
  }

  onMount(() => {
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });
</script>

<div class="color-picker" bind:this={pickerRef}>
  <!-- The toggle button for the color picker -->
  <button
    type="button"
    class="color-preview"
    on:click={togglePicker}
    aria-haspopup="listbox"
    aria-expanded={open}
    style="background: {selectedColor};"
  >
    <span class="color-label">{selectedColor}</span>
  </button>

  {#if open}
    <!-- Dropdown list rendered as a listbox -->
    <ul class="color-dropdown" role="listbox" tabindex="-1">
      {#each palette as color}
        <li
          role="option"
          tabindex="0"
          class="color-swatch"
          style="background: {color};"
          aria-selected={color === selectedColor}
          on:click={() => selectColor(color)}
          on:keydown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              selectColor(color);
            }
          }}
        >
          {#if color === selectedColor}
            <svg class="checkmark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20 6L9 17l-5-5z" />
            </svg>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .color-picker {
    position: relative;
    width: 200px;
  }

  .color-preview {
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 8px;
    padding: 0.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition:
      box-shadow 0.3s ease,
      border 0.3s ease;
    text-align: center;
    /* Remove default button styles */
    border: none;
    outline: none;
  }

  .color-preview:focus {
    box-shadow: 0 0 0 3px var(--color-foreground);
  }

  .color-label {
    color: var(--color-foreground-inversion);
    font-weight: bold;
    text-shadow: 0 0 5px var(--color-background);
  }

  .color-dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    left: 0;
    right: 0;
    background: var(--color-background-very-opaque);
    backdrop-filter: blur(6px);
    border: 1px solid var(--color-background);
    border-radius: 8px;
    padding: 0.5rem;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(30px, 1fr));
    gap: 0.5rem;
    z-index: 10;
    animation: fadeSlide 0.3s ease-out;
  }

  .color-swatch {
    width: 30px;
    height: 30px;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
  }

  .color-swatch:hover,
  .color-swatch:focus {
    transform: scale(1.1);
    box-shadow: 0 0 10px -4px var(--color-foreground-opaque);
    outline: none;
  }

  .checkmark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 16px;
    height: 16px;
    fill: var(--color-foreground-inversion);
  }

  @keyframes fadeSlide {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
