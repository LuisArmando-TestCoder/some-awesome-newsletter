<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import type { Country } from "../../../types.ts";
  import countries from "./countries.ts"; // Exports an array of country objects

  export let defaultCountryCode: string | null = null;
  export let label = "";

  let selectedCountry: Country | null = null;
  export const selectedCountryStore = writable<Country | null>(selectedCountry);

  // onSelect now sends the country code (string) only.
  export let onSelect: (selectedCode: string) => void = () => {};

  let open = false;
  let dropdownRef: HTMLElement;

  // Typeahead variables.
  let typeahead = "";
  let typeaheadTimeout: number;
  let highlightedIndex: number = -1;
  let listItems: HTMLElement[] = [];

  // Helper function to find a country based on its code.
  function findCountryByCode(code: string): Country | null {
    return countries.find((country) => country.code === code) || null;
  }

  onMount(() => {
    if (defaultCountryCode) {
      const defaultCountry = findCountryByCode(defaultCountryCode);
      if (defaultCountry) {
        selectedCountry = defaultCountry;
        selectedCountryStore.set(defaultCountry);
      }
    }
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
  });

  function toggleOpen() {
    open = !open;
  }

  function selectCountry(country: Country) {
    selectedCountry = country;
    selectedCountryStore.set(country);
    open = false;
    onSelect(country.code);
    // Reset typeahead and highlight.
    typeahead = "";
    highlightedIndex = -1;
  }

  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      open = false;
    }
  }

  // Updated typeahead handler: matches if the country name contains the typed string.
  function handleTypeaheadKeydown(event: KeyboardEvent) {
    // Handle backspace for erasing characters.
    if (event.key === "Backspace") {
      typeahead = typeahead.slice(0, -1);
      event.preventDefault();
    }
    // Append visible characters.
    else if (event.key.length === 1 && /\S/.test(event.key)) {
      typeahead += event.key;
      event.preventDefault();
    } else {
      return; // Ignore other keys.
    }

    // Reset the typeahead string after 1 second of inactivity.
    clearTimeout(typeaheadTimeout);
    typeaheadTimeout = setTimeout(() => {
      typeahead = "";
    }, 1000);

    // Open the dropdown if it isn't already open.
    if (!open) {
      open = true;
    }

    const lowerType = typeahead.toLowerCase();
    // Find countries whose names include the typeahead string.
    const matches = countries.filter((country) =>
      country.name.toLowerCase().includes(lowerType)
    );

    if (matches.length > 0) {
      if (matches.length === 1) {
        // Automatically select if there's only one match.
        selectCountry(matches[0]);
      } else {
        // Highlight the first matching country.
        highlightedIndex = countries.findIndex((country) =>
          country.name.toLowerCase().includes(lowerType)
        );
        if (listItems[highlightedIndex]) {
          listItems[highlightedIndex].focus();
        }
      }
    }
  }
</script>

<div
  class="dropdown"
  bind:this={dropdownRef}
  tabindex="0"
  on:keydown={handleTypeaheadKeydown}
>
  <span class="label">{label}</span>

  <button
    type="button"
    class="dropdown-toggle"
    on:click={toggleOpen}
    aria-haspopup="listbox"
    aria-expanded={open}
  >
    {#if selectedCountry}
      <span class="country-code">{selectedCountry.code}</span>
      <span class="country-name">{selectedCountry.name}</span>
    {:else}
      <span class="placeholder">Select a country</span>
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
      {#each countries as country, index (country.code)}
        <li
          class="dropdown-item {highlightedIndex === index
            ? 'highlighted'
            : ''}"
          role="option"
          aria-selected={selectedCountry &&
            selectedCountry.code === country.code}
          tabindex="0"
          bind:this={listItems[index]}
          on:click={() => selectCountry(country)}
          on:keydown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              selectCountry(country);
            }
          }}
        >
          <span class="country-flag" aria-hidden="true">{country.flag}</span>
          <span class="country-name">{country.name}</span>
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  .label {
    display: block;
    margin-bottom: 0.5rem;
  }

  .dropdown {
    position: relative;
    display: inline-block;
    z-index: 1;

    .dropdown-toggle {
      background: var(--color-background);
      color: var(--color-foreground);
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
      outline: none;
    }

    .dropdown-toggle:focus {
      box-shadow: 0 0 0 3px var(--color-foreground);
    }

    .country-flag {
      margin-right: 0.5rem;
    }

    .country-code {
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
      background: var(--color-background);
      border: 1px solid var(--color-background);
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      border-radius: 8px;
      padding: 0;
      max-height: 300px;
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
      background: var(--color-x-gradient-inversion);

      &:hover,
      &:focus {
        background: var(--color-x-gradient);
        color: var(--color-background);
        outline: none;
      }

      &.highlighted {
        background: var(--color-x-gradient);
        color: var(--color-background);
      }

      .country-flag {
        margin-right: 0.5rem;
      }

      .country-code {
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
