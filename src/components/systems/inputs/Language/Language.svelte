<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable } from "svelte/store";
  import fuzzysort from "fuzzysort";
  import { fade, slide } from "svelte/transition";
  import { t } from "$lib/i18n/dashboard-translations";

  // Assuming languages.ts is in the same directory
  import languagesData from "./languages";

  interface Language {
    code: string;
    name: string;
    flag: string | null;
  }

  // Props
  export let defaultLanguageCode: string | null = null;
  export let label = "Language";
  export let onSelect: (selectedCode: string | null) => void = () => {};
  export let disabled: boolean = false;
  export let whitelist: string[] = [];

  // State
  let selectedLanguage: Language | null = null;
  export const selectedLanguageStore = writable<Language | null>(null);
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
  let languages: Language[] = [];
  $: languages =
    whitelist.length > 0
      ? languagesData.filter((lang) => whitelist.includes(lang.code))
      : languagesData;

  onMount(() => {
    const initialLanguage = defaultLanguageCode
      ? findLanguageByCode(defaultLanguageCode)
      : null;
    if (initialLanguage) {
      selectedLanguage = initialLanguage;
      selectedLanguageStore.set(initialLanguage);
      lastValidHighlightedIndex = findIndexByCode(initialLanguage.code);
    } else {
      selectedLanguageStore.set(null);
      lastValidHighlightedIndex = 0;
    }

    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
    }
    listItems = new Array(languages.length).fill(null);
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
    clearTimeout(searchDebounceTimeout);
  });

  // Utility
  function findLanguageByCode(code: string): Language | null {
    return languages.find((language) => language.code === code) || null;
  }

  function findIndexByCode(code: string): number {
    return languages.findIndex((language) => language.code === code);
  }

  // Event Handlers
  function toggleOpen() {
    open = !open;
    showInput = open; // Input visibility tied to dropdown state
    if (open) {
      typeahead = "";
      highlightedIndex = selectedLanguage
        ? findIndexByCode(selectedLanguage.code)
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

  function selectLanguage(language: Language) {
    selectedLanguage = language;
    selectedLanguageStore.set(language);
    lastValidHighlightedIndex = findIndexByCode(language.code);
    open = false;
    showInput = false;
    typeahead = "";
    highlightedIndex = -1;
    onSelect(language.code);
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
          highlightedIndex = (highlightedIndex + 1) % languages.length;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "ArrowUp":
          event.preventDefault();
          highlightedIndex =
            (highlightedIndex - 1 + languages.length) % languages.length;
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
          highlightedIndex = languages.length - 1;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "Enter":
          if (highlightedIndex !== -1 && highlightedIndex < languages.length) {
            event.preventDefault();
            selectLanguage(languages[highlightedIndex]);
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
            : selectedLanguage
              ? findIndexByCode(selectedLanguage.code)
              : 0;
        focusAndScrollToHighlightedItem();
        return;
      }

      const searchResults = fuzzysort.go(typeahead, languages, {
        keys: ["name", "code"],
        threshold: -10000,
        limit: 50,
      });

      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].obj;
        const bestMatchIndex = languages.findIndex(
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

<div
  class="custom-select-wrapper"
  bind:this={dropdownRef}
  on:keydown={handleKeydown}
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded={open}
  aria-owns={open ? "language-listbox" : undefined}
>
  {#if label}
    <span class="custom-select-label" id="language-select-label">
      {label}
    </span>
  {/if}

  <div class="custom-select-control">
    <input
      type="text"
      bind:this={inputRef}
      value={typeahead}
      on:input={handleInput}
      placeholder={$t['language.typeToSearch']}
      class="custom-select-input {open ? 'open' : ''}"
      aria-autocomplete="list"
      aria-controls={open ? "language-listbox" : undefined}
      aria-labelledby="language-select-label"
      {disabled}
    />
    <button
      type="button"
      bind:this={buttonRef}
      on:click={toggleOpen}
      class="custom-select-button {!open ? 'visible' : ''}"
      aria-controls={open ? "language-listbox" : undefined}
      aria-labelledby="language-select-label {selectedLanguage ? 'selected-language-label' : ''}"
      {disabled}
    >
      {#if selectedLanguage}
        <span class="flex items-center gap-2 truncate">
          {#if selectedLanguage.flag}
            <span class="text-lg" aria-hidden="true">{selectedLanguage.flag}</span>
          {/if}
          <span class="truncate">{selectedLanguage.name}</span>
          <span class="text-gray-500 text-xs">({selectedLanguage.code})</span>
        </span>
      {:else}
        <span class="text-gray-500">{$t['language.selectALanguage']}</span>
      {/if}
      <svg
        class="custom-select-arrow w-4 h-4 transform transition-transform duration-200 {open ? 'rotate-180' : ''}"
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
      id="language-listbox"
      class="custom-select-list"
      tabindex="-1"
      aria-labelledby="language-select-label"
      in:slide={{ duration: 200 }}
      out:slide={{ duration: 200 }}
    >
      {#each languages as language, index (language.code)}
        <li
          bind:this={listItems[index]}
          id={`language-option-${language.code}`}
          class="custom-select-list-item"
          class:highlighted={highlightedIndex === index}
          class:selected={selectedLanguage?.code === language.code}
          role="option"
          aria-selected={selectedLanguage?.code === language.code}
          tabindex="-1"
          on:click={() => selectLanguage(language)}
          on:mouseenter={() => {
            highlightedIndex = index;
          }}
        >
          {#if language.flag}
            <span class="text-lg" aria-hidden="true">{language.flag}</span>
          {/if}
          <span class="truncate">{language.name}</span>
          <span class="{highlightedIndex === index ? 'text-white' : 'text-gray-500'} text-xs">
            ({language.code})
          </span>
        </li>
      {:else}
        <li class="px-4 py-2 text-sm text-gray-500" role="option" aria-disabled="true">
          {$t['language.noLanguagesAvailable']}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  @import "../../../../lib/styles/custom-select-styles.scss";
</style>
