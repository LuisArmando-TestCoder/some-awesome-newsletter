<script lang="ts">
  import { writable } from "svelte/store";
  import { onMount, onDestroy } from "svelte";
  import languages from "./languages.ts";
  import type { Language } from "../../../types.ts";

  // Initially no language is selected.
  let selectedLanguage: Language | null = null;
  // Create a writable store for the selected language.
  export const selectedLanguageStore = writable<Language | null>(
    selectedLanguage
  );

  // Callback to be invoked when a language is selected.
  export let onSelect: (selected: Language) => void = () => {};

  let open = false;
  let dropdownRef: HTMLElement;

  // Toggle the dropdown open/close.
  function toggleOpen() {
    open = !open;
  }

  // When a language is selected, update the local variable, store, close dropdown, and call onSelect.
  function selectLanguage(language: Language) {
    selectedLanguage = language;
    selectedLanguageStore.set(language);
    open = false;
    onSelect(language);
  }

  // Close the dropdown if a click happens outside the component.
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
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

<div class="dropdown" bind:this={dropdownRef}>
  <button
    type="button"
    class="dropdown-toggle"
    on:click={toggleOpen}
    aria-haspopup="listbox"
    aria-expanded={open}
  >
    {#if selectedLanguage}
      <span class="language-code" aria-hidden="true"
        >{selectedLanguage.code.toUpperCase()}</span
      >
      <span class="language-name">{selectedLanguage.name}</span>
    {:else}
      <span class="placeholder">Select a language</span>
    {/if}
    <svg
      class="arrow {open ? 'open' : ''}"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M7 10l5 5 5-5z" />
    </svg>
  </button>
  {#if open}
    <ul class="dropdown-menu" role="listbox" tabindex="-1">
      {#each languages as language (language.code)}
        <li
          class="dropdown-item"
          role="option"
          aria-selected={selectedLanguage &&
            selectedLanguage.code === language.code}
          tabindex="0"
          on:click={() => selectLanguage(language)}
          on:keydown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectLanguage(language);
            }
          }}
        >
          <span class="language-code">{language.code.toUpperCase()}</span>
          <span class="language-name">{language.name}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .dropdown {
    position: relative;
    display: inline-block;

    .dropdown-toggle {
      background: var(--color-background-very-opaque);
      backdrop-filter: blur(6px);
      border: 1px solid var(--color-background);
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-width: 220px;
      transition:
        background 0.3s ease,
        box-shadow 0.3s ease;
      text-align: left;
      /* Remove default button styles */
      border: none;
      outline: none;
    }

    .dropdown-toggle:focus {
      box-shadow: 0 0 0 3px var(--color-foreground);
    }

    .language-code {
      margin-right: 0.5rem;
      font-weight: bold;
    }

    .placeholder {
      color: var(--color-foreground);
    }

    .arrow {
      margin-left: auto;
      fill: var(--color-foreground);
      transition: transform 0.3s ease;
    }

    .arrow.open {
      transform: rotate(180deg);
    }

    .dropdown-menu {
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      background: var(--color-background-very-opaque);
      backdrop-filter: blur(6px);
      border: 1px solid var(--color-background);
      border-radius: 8px;
      padding: 0.5rem;
      max-height: 200px;
      overflow-y: auto;
      box-shadow: 0 0 10px -6.5px var(--color-background);
      animation: fadeSlide 0.3s ease-out;
      z-index: 100;
    }

    .dropdown-item {
      padding: 0.5rem 1rem;
      display: flex;
      align-items: center;
      cursor: pointer;
      transition: background 0.3s ease;

      &:hover,
      &:focus {
        background: var(--color-background-opaque);
        outline: none;
      }

      .language-code {
        margin-right: 0.5rem;
        font-weight: bold;
      }
    }
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
