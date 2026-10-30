<script context="module" lang="ts">
  let countrySelectCount = 0;
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable } from "svelte/store";
  import fuzzysort from "fuzzysort";
  import { fade, slide } from "svelte/transition";
  import { t } from "$lib/i18n/dashboard-translations";

  import countriesData from "./countries";
  import newsSourcesData from "./newssources";

  interface Country {
    code: string;
    name: string;
    flag: string | null;
  }

  interface CountrySelection {
    code: string;
    ns: string;
  }

  // Props
  export let defaultCountryCode: string | null = null;
  export let label = "Country";
  export let onSelect: (selection: CountrySelection | null) => void = () => {};
  export let disabled: boolean = false;
  export let whitelist: string[] = [];

  // Unique ids per instance so several pickers can share a page.
  const uid = `country-select-${++countrySelectCount}`;
  const labelId = `${uid}-label`;
  const listboxId = `${uid}-listbox`;
  const valueId = `${uid}-value`;
  const optionId = (code: string) => `${uid}-option-${code}`;
  $: activeDescendant =
    open && highlightedIndex >= 0 && highlightedIndex < countries.length
      ? optionId(countries[highlightedIndex].code)
      : undefined;

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
  let countries: Country[] = [];
  $: countries =
    whitelist.length > 0
      ? countriesData.filter((country) => whitelist.includes(country.code))
      : countriesData;

  onMount(() => {
    const initialCountry = defaultCountryCode
      ? findCountryByCode(defaultCountryCode)
      : null;
    if (initialCountry) {
      selectedCountry = initialCountry;
      selectedCountryStore.set(initialCountry);
      lastValidHighlightedIndex = findIndexByCode(initialCountry.code);
    } else {
      selectedCountryStore.set(null);
      lastValidHighlightedIndex = 0;
    }

    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
    }
    listItems = new Array(countries.length).fill(null);
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
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
    showInput = open; // Input visibility tied to dropdown state
    if (open) {
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
    const newsSource = newsSourcesData[country.code as keyof typeof newsSourcesData];
    onSelect({ code: country.code, ns: newsSource });
    buttonRef?.focus();
  }

  function handleClickOutside(event: MouseEvent) {
    if (open && dropdownRef && !dropdownRef.contains(event.target as Node)) {
      open = false;
      showInput = false;
      typeahead = "";
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
          showInput = false;
          typeahead = "";
          buttonRef?.focus();
          return;

        case "Tab":
          open = false;
          showInput = false;
          typeahead = "";
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
    typeahead = (event.target as HTMLInputElement).value.toLowerCase();

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
          (l) => l.code === bestMatch.code
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

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="custom-select-wrapper"
  bind:this={dropdownRef}
  on:keydown={handleKeydown}
>
  {#if label}
    <span class="custom-select-label" id={labelId}>
      {label}
    </span>
  {/if}

  <div class="custom-select-control">
    <input
      type="text"
      bind:this={inputRef}
      value={typeahead}
      on:input={handleInput}
      placeholder={$t['country.typeToSearch']}
      class="custom-select-input {open ? 'open' : ''}"
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      aria-activedescendant={activeDescendant}
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : $t['country.typeToSearch']}
      tabindex={open ? undefined : -1}
      autocomplete="off"
      {disabled}
    />
    <button
      type="button"
      bind:this={buttonRef}
      on:click={toggleOpen}
      class="custom-select-button {!open ? 'visible' : ''}"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      aria-labelledby={label ? `${labelId} ${valueId}` : valueId}
      tabindex={open ? -1 : undefined}
      {disabled}
    >
      {#if selectedCountry}
        <span class="custom-select-value" id={valueId}>
          {#if selectedCountry.flag}
            <span class="custom-select-flag" aria-hidden="true">{selectedCountry.flag}</span>
          {/if}
          <span class="custom-select-name">{selectedCountry.name}</span>
          <span class="custom-select-code">({selectedCountry.code})</span>
        </span>
      {:else}
        <span class="custom-select-placeholder" id={valueId}>{$t['country.selectACountry']}</span>
      {/if}
      <svg
        class="custom-select-arrow"
        class:open
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M7 10l5 5 5-5z" />
      </svg>
    </button>
  </div>

  {#if open}
    <ul
      bind:this={listRef}
      role="listbox"
      id={listboxId}
      class="custom-select-list"
      tabindex="-1"
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : $t['country.selectACountry']}
      in:slide={{ duration: 200 }}
      out:slide={{ duration: 200 }}
    >
      {#each countries as country, index (country.code)}
        <li
          bind:this={listItems[index]}
          id={optionId(country.code)}
          class="custom-select-list-item"
          class:highlighted={highlightedIndex === index}
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
            <span class="custom-select-flag" aria-hidden="true">{country.flag}</span>
          {/if}
          <span class="custom-select-name">{country.name}</span>
          <span class="custom-select-code">({country.code})</span>
        </li>
      {:else}
        <li class="custom-select-empty" role="option" aria-disabled="true" aria-selected="false">
          {$t['country.noCountriesAvailable']}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/custom-select-styles.scss";
</style>
