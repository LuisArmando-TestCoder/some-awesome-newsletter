<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import { getComplementaryColor, hslToHex } from "./getColorSuggestions";
  // Import the color picker library
  import ColorPicker from "svelte-awesome-color-picker"; // Removed A11yVariant as it's not used
  import nearestColor from "nearest-color"; // Import the library
  // Standard colors are accessed via nearestColor.STANDARD_COLORS
  import {
    complementaryColor,
    foregroundColor,
  } from "../../../ThemeChanger/theme-store";

  // Props & Stores
  export let selectedColor: string = $foregroundColor;
  export let onChange: (newColor: string) => void = () => {};
  // Passed by step hosts (MultiSlotComponent); the reveal text that used it is disabled.
  export const canReveal: boolean = false;
  export const selectedColorStore = writable(selectedColor);

  // Initialize nearestColor using the standard colors map
  const getColorNameFunc = nearestColor.from(nearestColor.STANDARD_COLORS);

  let open = false;
  let pickerRef: HTMLElement;

  // Reactive color name
  $: colorName = getColorNameFunc(selectedColor)?.name || "Unknown";

  // Toggle the palette dropdown open/close
  function togglePicker() {
    open = !open;
  }

  // Close the picker if click occurs outside the component
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

  // -----------------------------
  // Drag & Input for Color Wheel Functionality
  // -----------------------------
  let dragStartX = 0;
  let dragStartY = 0;
  let potentialDragging = false;
  let isDragging = false;
  let wasDragging = false;

  function handleMouseDown(event: MouseEvent) {
    dragStartX = event.clientX;
    dragStartY = event.clientY;
    potentialDragging = true;
    isDragging = false;
    wasDragging = false;
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  }

  function handleMouseMove(event: MouseEvent) {
    if (!potentialDragging) return;
    // Start drag if movement exceeds threshold
    if (
      !isDragging &&
      Math.hypot(event.clientX - dragStartX, event.clientY - dragStartY) > 5
    ) {
      isDragging = true;
      wasDragging = true;
    }
    if (isDragging) {
      updateColorFromDrag(event);
    }
  }

  function handleMouseUp() {
    potentialDragging = false;
    if (isDragging) {
      isDragging = false;
    }
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  }

  function updateColorFromDrag(event: MouseEvent) {
    const dx = event.clientX - dragStartX;
    const dy = event.clientY - dragStartY;
    const angle = Math.atan2(dy, dx) * (180 / Math.PI);
    let hue = angle < 0 ? angle + 360 : angle;
    const hex = hslToHex(hue, 100, 50);
    selectedColor = hex;
    selectedColorStore.set(hex);
    onChange(hex);
  }

  // (The original handleInputChange is now not needed since the library handles input.)
  function handleClick() {
    if (!wasDragging) {
      togglePicker();
    }
  }

  function setStoreColor() {
    foregroundColor.set(selectedColor);
    complementaryColor.set(getComplementaryColor(selectedColor));
  }
</script>

<div class="color-picker" bind:this={pickerRef}>
  <!-- Replacing the text input with svelte-awesome-color-picker.
       We attach on:mousedown and on:click to keep the drag functionality.
       The on:input event updates the selectedColor state and triggers onChange. -->
  <!-- Pointer-only drag enhancement; the inner picker stays keyboard-operable. -->
  <div
    class="picker-wrapper"
    role="presentation"
    on:mousedown={handleMouseDown}
    on:click={handleClick}
  >
    <ColorPicker
      bind:hex={selectedColor}
      position="responsive"
    on:input={(e) => {
      selectedColor = e.detail.hex || $foregroundColor;
      selectedColorStore.set(selectedColor);
      if (!isDragging) {
        onChange(selectedColor);
        setStoreColor();
      }
    }}
    />
    <span class="color-name" aria-live="polite">({colorName})</span>
  </div>

  <!-- <MarkdownText {canReveal}>
    ==Related colors== for different types of color ==palettes==.
  </MarkdownText> -->

  <!-- AI-Powered Smart Suggestions Panel -->
  <!-- <section class="suggestion-panel" aria-label="Smart Color Suggestions">
    <ul class="suggestion-list">
      {#each suggestions as suggestion, index (suggestion.candidate + "-" + index)}
        <li class="suggestion-item">
          <button
            class="suggestion-btn"
            on:click={() => selectColor(suggestion.candidate)}
            on:keydown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                selectColor(suggestion.candidate);
                setStoreColor();
              }
            }}
          >
            <div
              class="suggestion-swatch"
              style="background: {suggestion.candidate};"
            >
              <span
                class="suggestion-scheme"
                style="color: {getContrastColor(suggestion.candidate)};"
              >
                {suggestion.scheme}
                {suggestion.candidate}
              </span>
            </div>
          </button>
        </li>
      {/each}
    </ul>
  </section> -->
</div>

<style lang="scss">
  .color-picker {
    position: relative;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    flex-wrap: wrap;
    z-index: 1;
  }

  .picker-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem; /* Adjust gap as needed */
  }

  .color-name {
    font-size: 0.9em;
    color: var(--color-foreground-muted); /* Use a muted color */
    margin-left: 5px; /* Space between picker and name */
  }
</style>
