<script context="module" lang="ts">
  let searchSelectorCount = 0;
</script>

<script lang="ts">
  import { onMount, onDestroy, tick } from "svelte";
  import { writable } from "svelte/store";
  import fuzzysort from "fuzzysort";
  import { t } from "$lib/i18n/dashboard-translations";
  import { slide } from "svelte/transition";

  // Props
  export let items: any[] = [];
  export let valueFieldName: string = "id";
  export let displayFieldName: string = "name";
  export let defaultSelectedValue: any | null = null;
  export let label = "Select an option";
  export let onSelect: (selectedValue: any | null) => void = () => {};
  export let disabled: boolean = false;

  // Unique ids per instance so several selectors can share a page.
  const uid = `search-selector-${++searchSelectorCount}`;
  const labelId = `${uid}-label`;
  const listboxId = `${uid}-listbox`;
  const valueId = `${uid}-value`;
  const optionId = (index: number) => `${uid}-option-${index}`;
  $: activeDescendant =
    open && highlightedIndex >= 0 && highlightedIndex < items.length
      ? optionId(highlightedIndex)
      : undefined;

  // State
  let selectedItem: any | null = null;
  export const selectedItemStore = writable<any | null>(null);
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
    const initialItem = defaultSelectedValue
      ? findItemByValue(defaultSelectedValue)
      : null;
    if (initialItem) {
      selectedItem = initialItem;
      selectedItemStore.set(initialItem);
      lastValidHighlightedIndex = findIndexByValue(initialItem[valueFieldName]);
    } else {
      selectedItemStore.set(null);
      lastValidHighlightedIndex = 0;
    }

    if (typeof document !== "undefined") {
      document.addEventListener("click", handleClickOutside);
    }
    listItems = new Array(items.length).fill(null);
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('click', handleClickOutside);
    }
    clearTimeout(searchDebounceTimeout);
  });

  // Utility
  function findItemByValue(value: any): any | null {
    return items.find((item) => item[valueFieldName] === value) || null;
  }

  function findIndexByValue(value: any): number {
    return items.findIndex((item) => item[valueFieldName] === value);
  }

  // Event Handlers
  function toggleOpen() {
    open = !open;
    showInput = open; // Input visibility tied to dropdown state
    if (open) {
      typeahead = "";
      highlightedIndex = selectedItem
        ? findIndexByValue(selectedItem[valueFieldName])
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

  function selectOption(item: any) {
    selectedItem = item;
    selectedItemStore.set(item);
    lastValidHighlightedIndex = findIndexByValue(item[valueFieldName]);
    open = false;
    showInput = false;
    typeahead = "";
    highlightedIndex = -1;
    onSelect(item[valueFieldName]);
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
          highlightedIndex = (highlightedIndex + 1) % items.length;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "ArrowUp":
          event.preventDefault();
          highlightedIndex =
            (highlightedIndex - 1 + items.length) % items.length;
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
          highlightedIndex = items.length - 1;
          lastValidHighlightedIndex = highlightedIndex;
          focusAndScrollToHighlightedItem();
          return;

        case "Enter":
          if (highlightedIndex !== -1 && highlightedIndex < items.length) {
            event.preventDefault();
            selectOption(items[highlightedIndex]);
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
            : selectedItem
              ? findIndexByValue(selectedItem[valueFieldName])
              : 0;
        focusAndScrollToHighlightedItem();
        return;
      }

      const searchResults = fuzzysort.go(typeahead, items, {
        keys: [displayFieldName, valueFieldName],
        threshold: -10000,
        limit: 50,
      });

      if (searchResults.length > 0) {
        const bestMatch = searchResults[0].obj;
        const bestMatchIndex = items.findIndex(
          (l) => l[valueFieldName] === bestMatch[valueFieldName]
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
      placeholder={$t['customSelect.typeToSearch'] ?? "Type to search"}
      class="custom-select-input {open ? 'open' : ''}"
      role="combobox"
      aria-autocomplete="list"
      aria-haspopup="listbox"
      aria-expanded={open}
      aria-controls={open ? listboxId : undefined}
      aria-activedescendant={activeDescendant}
      aria-labelledby={label ? labelId : undefined}
      aria-label={label ? undefined : ($t['customSelect.typeToSearch'] ?? "Type to search")}
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
      {#if selectedItem}
        <span class="custom-select-name" id={valueId}>{selectedItem[displayFieldName]}</span>
      {:else}
        <span class="custom-select-placeholder" id={valueId}>{$t['customSelect.selectAnOption'] ?? "Select an option"}</span>
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
      aria-label={label ? undefined : "Options"}
      in:slide={{ duration: 200 }}
      out:slide={{ duration: 200 }}
    >
      {#each items as item, index (item[valueFieldName])}
        <li
          bind:this={listItems[index]}
          id={optionId(index)}
          class="custom-select-list-item"
          class:highlighted={highlightedIndex === index}
          class:selected={selectedItem && selectedItem[valueFieldName] === item[valueFieldName]}
          role="option"
          aria-selected={!!selectedItem && selectedItem[valueFieldName] === item[valueFieldName]}
          tabindex="-1"
          on:click={() => selectOption(item)}
          on:mouseenter={() => {
            highlightedIndex = index;
          }}
        >
          <span class="custom-select-name">{item[displayFieldName]}</span>
        </li>
      {:else}
        <li class="custom-select-empty" role="option" aria-disabled="true" aria-selected="false">
          {$t['customSelect.noOptionsAvailable'] ?? "No options available."}
        </li>
      {/each}
    </ul>
  {/if}
</div>

<style lang="scss">
  @use "../../../../lib/styles/custom-select-styles.scss";
</style>
