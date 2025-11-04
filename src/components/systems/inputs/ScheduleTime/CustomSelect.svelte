<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { browser } from "$app/environment";
  import type { Writable } from "svelte/store";
  import fuzzysort from "fuzzysort";
  import { fade, slide } from "svelte/transition";
  import { t } from "$lib/i18n/dashboard-translations";

  interface Option {
    value: string;
    label: string;
  }

  // Props
  export let options: Option[] = [];
  export let store: Writable<string | null>;
  export let label = "Select an option";
  export let disabled: boolean = false;

  // State
  let selectedOption: Option | null = null;
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
    const initialOption = $store
      ? findOptionByValue($store)
      : null;
    if (initialOption) {
      selectedOption = initialOption;
      lastValidHighlightedIndex = findIndexByValue(initialOption.value);
    } else {
      lastValidHighlightedIndex = 0;
    }

    if (browser) {
      document.addEventListener("click", handleClickOutside);
    }
    listItems = new Array(options.length).fill(null);
  });

  onDestroy(() => {
    if (browser) {
      document.removeEventListener("click", handleClickOutside);
    }
    clearTimeout(searchDebounceTimeout);
  });

  // Utility
  function findOptionByValue(val: string): Option | null {
    return options.find((option) => option.value === val) || null;
  }

  function findIndexByValue(val: string): number {
    return options.findIndex((option) => option.value === val);
  }

  // Event Handlers
  function toggleOpen() {
    open = !open;
    showInput = open; // Input visibility tied to dropdown state
    if (open) {
      typeahead = "";
      highlightedIndex = selectedOption
        ? findIndexByValue(selectedOption.value)
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

  function selectOption(option: Option) {
    selectedOption = option;
    store.set(option.value);
    lastValidHighlightedIndex = findIndexByValue(option.value);
    open = false;
    showInput = false;
    typeahead = "";
    highlightedIndex = -1;
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
          highlightedIndex = (highlightedIndex + 1) % options.length;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "ArrowUp":
          event.preventDefault();
          highlightedIndex =
            (highlightedIndex - 1 + options.length) % options.length;
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
          highlightedIndex = options.length - 1;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "Enter":
          if (highlightedIndex !== -1 && highlightedIndex < options.length) {
            event.preventDefault();
            selectOption(options[highlightedIndex]);
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
            : selectedOption
              ? findIndexByValue(selectedOption.value)
              : 0;
        focusAndScrollToHighlightedItem();
        return;
      }

      const searchResults = fuzzysort.go(typeahead, options, {
        keys: ["label"],
        threshold: -10000,
        limit: 50,
      });

      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].obj;
        const bestMatchIndex = options.findIndex(
          (o) => o.value === bestMatch.value
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

  $: {
    if ($store) {
      selectedOption = findOptionByValue($store);
    }
  }
</script>

<div
  class="custom-select-wrapper"
  bind:this={dropdownRef}
  on:keydown={handleKeydown}
  role="combobox"
  aria-haspopup="listbox"
  aria-expanded={open}
  aria-owns={open ? "option-listbox" : undefined}
>
  {#if label}
    <span class="custom-select-label" id="option-select-label">
      {label}
    </span>
  {/if}

  <div class="custom-select-control">
    <input
      type="text"
      bind:this={inputRef}
      value={typeahead}
      on:input={handleInput}
      placeholder={$t['customSelect.typeToSearch']}
      class="custom-select-input {open ? 'open' : ''}"
      aria-autocomplete="list"
      aria-controls={open ? "option-listbox" : undefined}
      aria-labelledby="option-select-label"
      {disabled}
    />
    <button
      type="button"
      bind:this={buttonRef}
      on:click={toggleOpen}
      class="custom-select-button {!open ? 'visible' : ''}"
      aria-controls={open ? "option-listbox" : undefined}
      aria-labelledby="option-select-label {selectedOption ? 'selected-option-label' : ''}"
      {disabled}
    >
      {#if selectedOption}
        <span class="truncate">{selectedOption.label}</span>
      {:else}
        <span class="text-gray-500">{$t['customSelect.selectAnOption']}</span>
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
      id="option-listbox"
      class="custom-select-list"
      tabindex="-1"
      aria-labelledby="option-select-label"
      in:slide={{ duration: 200 }}
      out:slide={{ duration: 200 }}
    >
      {#each options as option, index (option.value)}
        <li
          bind:this={listItems[index]}
          id={`option-${option.value}`}
          class="custom-select-list-item"
          class:highlighted={highlightedIndex === index}
          class:selected={selectedOption?.value === option.value}
          role="option"
          aria-selected={selectedOption?.value === option.value}
          tabindex="-1"
          on:click={() => selectOption(option)}
          on:mouseenter={() => {
            highlightedIndex = index;
          }}
        >
          <span class="truncate">{option.label}</span>
        </li>
      {:else}
        <li class="px-4 py-2 text-sm text-gray-500" role="option" aria-disabled="true">
          {$t['customSelect.noOptionsAvailable']}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style>
  @import "../../../../lib/styles/custom-select-styles.scss";
</style>
