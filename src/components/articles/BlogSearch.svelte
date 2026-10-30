<script lang="ts">
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import { t } from "../../lib/i18n/translations";
  import {
    apiBase,
    articlePath,
    clearRecent,
    readRecent,
    saveRecent,
    searchPath,
    streamSearch,
    type BlogCard,
  } from "./blog";

  interface Props {
    holder: string;
    newsSourceId?: string;
    lang?: string;
    /** Articles already on the page, used for instant suggestions. */
    localCards?: BlogCard[];
    value?: string;
    /** Focus the input on mount (search results page). */
    autofocus?: boolean;
  }

  let { holder, newsSourceId = "", lang = "", localCards = [], value = $bindable(""), autofocus = false }: Props = $props();

  const uid = `blog-search-${Math.random().toString(36).slice(2, 8)}`;
  const MAX_SUGGESTIONS = 6;

  let inputEl: HTMLInputElement | undefined = $state();
  let open = $state(false);
  let activeIndex = $state(-1);
  let recent = $state<string[]>([]);
  let localHits = $state<BlogCard[]>([]);
  let serverHits = $state<BlogCard[]>([]);
  let debounce: ReturnType<typeof setTimeout> | undefined;
  let ctrl: AbortController | null = null;

  type Option = { kind: "article"; card: BlogCard } | { kind: "recent"; term: string };

  const showRecent = $derived(value.trim().length === 0 && recent.length > 0);

  const options = $derived.by<Option[]>(() => {
    if (value.trim().length === 0) return recent.map((term) => ({ kind: "recent", term }) as Option);
    const seen = new Set<string>();
    const out: Option[] = [];
    for (const card of [...localHits, ...serverHits]) {
      if (!card.id || seen.has(card.id)) continue;
      seen.add(card.id);
      out.push({ kind: "article", card });
      if (out.length >= MAX_SUGGESTIONS) break;
    }
    return out;
  });

  const expanded = $derived(open && options.length > 0);

  onMount(() => {
    recent = readRecent(holder);
    if (autofocus) inputEl?.focus();
    return () => {
      clearTimeout(debounce);
      ctrl?.abort();
    };
  });

  function onInput(e: Event) {
    value = (e.currentTarget as HTMLInputElement).value;
    open = true;
    activeIndex = -1;
    clearTimeout(debounce);
    const q = value.trim();
    if (!q) {
      localHits = [];
      serverHits = [];
      ctrl?.abort();
      return;
    }
    debounce = setTimeout(() => suggest(q), 250);
  }

  async function suggest(q: string) {
    const lower = q.toLowerCase();
    localHits = localCards.filter((c) => c.title.toLowerCase().includes(lower)).slice(0, MAX_SUGGESTIONS);
    serverHits = [];
    if (q.length < 2) return;
    ctrl?.abort();
    const mine = new AbortController();
    ctrl = mine;
    try {
      await streamSearch(apiBase(), holder, q, { newsSourceId, lang, maxHits: MAX_SUGGESTIONS, signal: mine.signal }, (card) => {
        if (ctrl === mine && value.trim() === q) serverHits = [...serverHits, card];
      });
    } catch {
      /* Suggestions are optional: the full search page reports errors. */
    }
  }

  function submit(term = value) {
    const q = term.trim();
    if (!q) {
      inputEl?.focus();
      return;
    }
    recent = saveRecent(holder, q);
    open = false;
    ctrl?.abort();
    goto(searchPath(holder, q, { ns: newsSourceId, lang }));
  }

  function choose(opt: Option) {
    if (opt.kind === "recent") {
      value = opt.term;
      submit(opt.term);
    } else {
      if (value.trim()) recent = saveRecent(holder, value.trim());
      open = false;
      goto(articlePath(holder, opt.card.id));
    }
  }

  function onKeydown(e: KeyboardEvent) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      open = true;
      if (options.length) activeIndex = (activeIndex + 1) % options.length;
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (options.length) activeIndex = activeIndex <= 0 ? options.length - 1 : activeIndex - 1;
    } else if (e.key === "Escape") {
      if (open) {
        e.preventDefault();
        open = false;
        activeIndex = -1;
      }
    } else if (e.key === "Enter" && expanded && activeIndex >= 0) {
      e.preventDefault();
      choose(options[activeIndex]);
    }
  }

  function onClearRecent() {
    clearRecent(holder);
    recent = [];
    inputEl?.focus();
  }
</script>

<form
  class="search"
  role="search"
  onsubmit={(e) => {
    e.preventDefault();
    submit();
  }}
>
  <label class="sr-only" for={`${uid}-input`}>{$t.blog.search.label}</label>
  <div class="search__field">
    <svg class="search__icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
    <input
      bind:this={inputEl}
      id={`${uid}-input`}
      type="search"
      autocomplete="off"
      enterkeyhint="search"
      role="combobox"
      aria-autocomplete="list"
      aria-expanded={expanded}
      aria-controls={`${uid}-list`}
      aria-activedescendant={expanded && activeIndex >= 0 ? `${uid}-opt-${activeIndex}` : undefined}
      placeholder={$t.blog.search.placeholder}
      bind:value
      oninput={onInput}
      onfocus={() => (open = true)}
      onblur={() => setTimeout(() => (open = false), 120)}
      onkeydown={onKeydown}
    />
    <button class="btn btn--primary search__button" type="submit">{$t.blog.search.button}</button>
  </div>

  <div class="search__panel" hidden={!expanded}>
    <p class="search__panel-title" id={`${uid}-title`}>
      {showRecent ? $t.blog.search.recent : $t.blog.search.suggestions}
    </p>
    <ul id={`${uid}-list`} role="listbox" aria-labelledby={`${uid}-title`}>
      {#each options as opt, i (opt.kind === "recent" ? `r-${opt.term}` : opt.card.id)}
        <!-- Keyboard selection is handled on the combobox input (arrow keys + Enter). -->
        <!-- svelte-ignore a11y_click_events_have_key_events -->
        <li
          id={`${uid}-opt-${i}`}
          role="option"
          aria-selected={i === activeIndex}
          class:active={i === activeIndex}
          onmousedown={(e) => e.preventDefault()}
          onclick={() => choose(opt)}
        >
          {#if opt.kind === "recent"}
            <span class="opt__recent">{opt.term}</span>
          {:else}
            <span class="opt__title">{opt.card.title}</span>
          {/if}
        </li>
      {/each}
    </ul>
    {#if showRecent}
      <button type="button" class="search__clear" onmousedown={(e) => e.preventDefault()} onclick={onClearRecent}>
        {$t.blog.search.clearRecent}
      </button>
    {/if}
  </div>
</form>

<style lang="scss">
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .search {
    position: relative;
    width: 100%;
    max-width: var(--container-sm, 640px);
  }

  .search__field {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    padding: var(--space-1, 4px) var(--space-1, 4px) var(--space-1, 4px) var(--space-4, 16px);
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-2, #ccc);
    border-radius: var(--radius-full, 999px);
    transition: border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
      box-shadow var(--dur-fast, 120ms) var(--ease-out, ease-out);

    &:focus-within {
      border-color: var(--accent, #2563eb);
      box-shadow: 0 0 0 3px var(--accent-soft, transparent);
    }
  }

  .search__icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    fill: none;
    stroke: var(--text-3, #777);
    stroke-width: 2;
    stroke-linecap: round;
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    padding: var(--space-2, 8px) 0;
    font: inherit;
    font-size: var(--fs-md, 1rem);
    color: var(--text-1, #111);

    &::placeholder {
      color: var(--text-3, #777);
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }

    &::-webkit-search-cancel-button {
      cursor: pointer;
    }
  }

  .search__button {
    flex-shrink: 0;
  }

  .search__panel {
    position: absolute;
    z-index: 30;
    top: calc(100% + var(--space-2, 8px));
    left: 0;
    right: 0;
    padding: var(--space-2, 8px);
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-1, #e5e5e5);
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-3, none);
    text-align: left;

    &[hidden] {
      display: none;
    }
  }

  .search__panel-title {
    margin: 0;
    padding: var(--space-2, 8px) var(--space-3, 12px) var(--space-1, 4px);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-3, #777);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-md, 8px);
    cursor: pointer;
    color: var(--text-1, #111);
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-tight, 1.3);

    &:hover,
    &.active {
      background: var(--surface-2, #f3f3f3);
    }
  }

  .opt__title {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
  }

  .opt__recent {
    color: var(--text-2, #444);
  }

  .search__clear {
    margin: var(--space-1, 4px) var(--space-3, 12px) var(--space-2, 8px);
    padding: 0;
    border: 0;
    background: none;
    font: inherit;
    font-size: var(--fs-xs, 0.75rem);
    color: var(--text-link, #2563eb);
    text-decoration: underline;
    cursor: pointer;
  }

  @media (max-width: 480px) {
    .search__button {
      padding-inline: var(--space-4, 16px);
    }
  }
</style>
