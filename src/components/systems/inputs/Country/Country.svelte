<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable } from "svelte/store";
  import fuzzysort from "fuzzysort";
  import { fade, slide } from "svelte/transition";

  // Assuming countries.js is in the same directory or adjust path
  import countries from "./countries.js";

  interface Country {
    code: string;
    name: string;
    flag: string | null;
  }

  // Props
  export let defaultCountryCode: string | null = null;
  export let label = "Country";
  export let onSelect: (selectedCode: string | null) => void = () => {};

  // State
  let selectedCountry: Country | null = null;
  export const selectedCountryStore = writable<Country | null>(null);
  let open = false;
  let showInput = false;
  let dropdownRef: HTMLElement;
  let inputRef: HTMLInputElement;
  let buttonRef: HTMLButtonElement;
  let listRef: HTMLUListElement;
  let listItems: Array<HTMLLIElement | null> = [];

  // Typeahead & Highlighting
  let typeahead = "";
  let searchDebounceTimeout: number;
  const SEARCH_DEBOUNCE_DELAY = 150;
  let highlightedIndex: number = -1;
  let lastValidHighlightedIndex: number = -1;

  // Lifecycle
  onMount(() => {
    const initialCountry = defaultCountryCode
      ? findCountryByCode(defaultCountryCode)
      : null;
    if (initialCountry) {
      selectedCountry = initialCountry;
      selectedCountryStore.set(initialCountry);
      lastValidHighlightedIndex = findIndexByCode(initialCountry.code);
      showInput = false;
    } else {
      selectedCountryStore.set(null);
      lastValidHighlightedIndex = 0;
      showInput = true;
    }

    document.addEventListener("click", handleClickOutside);
    listItems = new Array(countries.length).fill(null);
  });

  onDestroy(() => {
    document.removeEventListener("click", handleClickOutside);
    clearTimeout(searchDebounceTimeout);
  });

  // Utility
  function findCountryByCode(code: string): Country | null {
    return countries.find((country) => country.code === code) || null;
  }

  function findIndexByCode(code: string): number {
    return countries.findIndex((country) => country.code === code);
  }

  // Event Handlers
  function toggleOpen() {
    open = !open;
    if (open) {
      showInput = true;
      typeahead = "";
      highlightedIndex = selectedCountry
        ? findIndexByCode(selectedCountry.code)
        : lastValidHighlightedIndex !== -1
          ? lastValidHighlightedIndex
          : 0;
      tick().then(() => {
        inputRef?.focus();
        focusAndScrollToHighlightedItem();
      });
    } else {
      showInput = !selectedCountry;
      buttonRef?.focus();
    }
  }

  function selectCountry(country: Country) {
    selectedCountry = country;
    selectedCountryStore.set(country);
    lastValidHighlightedIndex = findIndexByCode(country.code);
    open = false;
    showInput = false;
    typeahead = "";
    highlightedIndex = -1;
    onSelect(country.code);
    buttonRef?.focus();
  }

  function handleClickOutside(event: MouseEvent) {
    if (open && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      open = false;
      typeahead = "";
      showInput = !selectedCountry;
      buttonRef?.focus();
    }
  }

  function focusAndScrollToHighlightedItem() {
    if (highlightedIndex >= 0 && highlightedIndex < listItems.length) {
      const targetItem = listItems[highlightedIndex];
      if (targetItem) {
        targetItem.scrollIntoView({ block: "nearest" });
      }
    }
  }

  async function handleKeydown(event: KeyboardEvent) {
    if (open) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          highlightedIndex = (highlightedIndex + 1) % countries.length;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "ArrowUp":
          event.preventDefault();
          highlightedIndex =
            (highlightedIndex - 1 + countries.length) % countries.length;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "Home":
          event.preventDefault();
          highlightedIndex = 0;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "End":
          event.preventDefault();
          highlightedIndex = countries.length - 1;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "Enter":
          if (highlightedIndex !== -1 && highlightedIndex < countries.length) {
            event.preventDefault();
            selectCountry(countries[highlightedIndex]);
          }
          return;

        case "Escape":
          event.preventDefault();
          open = false;
          typeahead = "";
          showInput = !selectedCountry;
          buttonRef?.focus();
          return;

        case "Tab":
          open = false;
          typeahead = "";
          showInput = !selectedCountry;
          return;
      }
    } else {
      if (["ArrowDown", "ArrowUp", "Enter"].includes(event.key)) {
        event.preventDefault();
        toggleOpen();
        return;
      }
    }
  }

  async function handleInput(event: Event) {
    typeahead = (event.target as HTMLInputElement).value;

    if (!open) {
      open = true;
      await tick();
    }

    clearTimeout(searchDebounceTimeout);
    searchDebounceTimeout = window.setTimeout(() => {
      if (typeahead === "") {
        highlightedIndex =
          lastValidHighlightedIndex !== -1
            ? lastValidHighlightedIndex
            : selectedCountry
              ? findIndexByCode(selectedCountry.code)
              : 0;
        focusAndScrollToHighlightedItem();
        return;
      }

      const searchResults = fuzzysort.go(typeahead, countries, {
        keys: ["name", "code"],
        threshold: -10000,
        limit: 50,
      });

      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].obj;
        const bestMatchIndex = countries.findIndex(
          (c) => c.code === bestMatch.code
        );

        if (bestMatchIndex !== -1) {
          highlightedIndex = bestMatchIndex;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
        }
      } else {
        highlightedIndex = lastValidHighlightedIndex;
        focusAndScrollToHighlightedItem();
      }
    }, SEARCH_DEBOUNCE_DELAY);
  }
</script>

<svelte:head>
  <script src="https://cdn.tailwindcss.com"></script>
</svelte:head>

<div
  class="relative font-sans z-10"
  bind:this={dropdownRef}
  on:keydown={handleKeydown}
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded={open}
  aria-owns={open ? "country-listbox" : undefined}
>
  {#if label}
    <span class="block mb-2 text-sm font-medium text-gray-700" id="country-select-label">
      {label}
    </span>
  {/if}

  {#if showInput}
    <input
      type="text"
      bind:this={inputRef}
      value={typeahead}
      on:input={handleInput}
      placeholder="Type to search country..."
      class="w-full max-w-xs px-4 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out"
      aria-autocomplete="list"
      aria-controls={open ? "country-listbox" : undefined}
      aria-labelledby="country-select-label"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    />
  {:else}
    <button
      type="button"
      bind:this={buttonRef}
      on:click={toggleOpen}
      class="w-full max-w-xs px-4 py-2 text-sm bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 ease-in-out flex items-center justify-between"
      aria-controls={open ? "country-listbox" : undefined}
      aria-labelledby="country-select-label {selectedCountry ? 'selected-country-label' : ''}"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      {#if selectedCountry}
        <span class="flex items-center gap-2 truncate">
          {#if selectedCountry.flag}
            <span class="text-lg" aria-hidden="true">{selectedCountry.flag}</span>
          {/if}
          <span class="truncate">{selectedCountry.name}</span>
          <span class="text-gray-500 text-xs">({selectedCountry.code})</span>
        </span>
      {:else}
        <span class="text-gray-500">Select a country</span>
      {/if}
      <svg
        class="w-4 h-4 transform transition-transform duration-200 {open ? 'rotate-180' : ''}"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>
  {/if}

  {#if selectedCountry && !showInput}
    <div
      class="mt-2 text-sm text-gray-700 flex items-center gap-2"
      in:fade={{ duration: 200 }}
      out:fade={{ duration: 200 }}
    >
      Selected:
      {#if selectedCountry.flag}
        <span class="text-lg" aria-hidden="true">{selectedCountry.flag}</span>
      {/if}
      <span>{selectedCountry.name} ({selectedCountry.code})</span>
    </div>
  {/if}

  {#if open}
    <ul
      bind:this={listRef}
      role="listbox"
      id="country-listbox"
      class="absolute w-full max-w-xs mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto z-20"
      tabindex="-1"
      aria-labelledby="country-select-label"
      in:slide={{ duration: 200 }}
      out:slide={{ duration: 200 }}
    >
      {#each countries as country, index (country.code)}
        <li
          bind:this={listItems[index]}
          id={`country-option-${country.code}`}
          class="px-4 py-2 text-sm flex items-center gap-2 cursor-pointer transition-colors duration-150 ease-in-out {highlightedIndex === index ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}"
          class:selected={selectedCountry?.code === country.code}
          role="option"
          aria-selected={selectedCountry?.code === country.code}
          tabindex="-1"
          on:click={() => selectCountry(country)}
          on:mouseenter={() => {
            highlightedIndex = index;
          }}
        >
          {#if country.flag}
            <span class="text-lg" aria-hidden="true">{country.flag}</span>
          {/if}
          <span class="truncate">{country.name}</span>
          <span class="{highlightedIndex === index ? 'text-white' : 'text-gray-500'} text-xs">
            ({country.code})
          </span>
        </li>
      {:else}
        <li class="px-4 py-2 text-sm text-gray-500" role="option" aria-disabled="true">
          No countries available.
        </li>
      {/each}
    </ul>
  {/if}
</div>