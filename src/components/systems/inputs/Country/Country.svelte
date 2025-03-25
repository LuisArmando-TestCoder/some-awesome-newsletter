<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { writable } from "svelte/store";
  import type { Country } from "../../../types.ts";
  import countries from "./countries.ts"; // Exports an array of country objects

  // Accept a default country code as a prop.
  export let defaultCountryCode: string | null = null;

  // Initially no country is selected.
  let selectedCountry: Country | null = null;
  export const selectedCountryStore = writable<Country | null>(selectedCountry);

  // onSelect now sends the country code (string) only.
  export let onSelect: (selectedCode: string) => void = () => {};

  let open = false;
  let dropdownRef: HTMLElement;

  // Helper function to find a country based on its code.
  function findCountryByCode(code: string): Country | null {
    return countries.find((country) => country.code === code) || null;
  }

  // When the component mounts, if a default code is provided, set the corresponding country.
  onMount(() => {
    if (defaultCountryCode) {
      const defaultCountry = findCountryByCode(defaultCountryCode);
      if (defaultCountry) {
        selectedCountry = defaultCountry;
        selectedCountryStore.set(defaultCountry);
      }
    }

    // Attach click handler for outside clicks
    document.addEventListener("click", handleClickOutside);
  });

  onDestroy(() => {
    // Cleanup outside click handler
    document.removeEventListener("click", handleClickOutside);
  });

  // Toggle dropdown open/close.
  function toggleOpen() {
    open = !open;
  }

  // When a country is selected, update state, store, close dropdown, and call onSelect with the code.
  function selectCountry(country: Country) {
    selectedCountry = country;
    selectedCountryStore.set(country);
    open = false;
    onSelect(country.code);
  }

  // Close dropdown if a click occurs outside the component.
  function handleClickOutside(event: MouseEvent) {
    if (dropdownRef && !dropdownRef.contains(event.target as Node)) {
      open = false;
    }
  }
</script>

<div class="dropdown" bind:this={dropdownRef}>
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
      {#each countries as country (country.code)}
        <li
          class="dropdown-item"
          role="option"
          aria-selected={selectedCountry &&
            selectedCountry.code === country.code}
          tabindex="0"
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
  .dropdown {
    position: relative;
    display: inline-block;

    .dropdown-toggle {
      /* Updated to use var(--color-background) */
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
      /* Updated to use var(--color-background) */
      background: var(--color-background);
      border: 1px solid var(--color-background);
      position: absolute;
      top: calc(100% + 0.5rem);
      left: 0;
      right: 0;
      border-radius: 8px;
      padding: 0rem;
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
