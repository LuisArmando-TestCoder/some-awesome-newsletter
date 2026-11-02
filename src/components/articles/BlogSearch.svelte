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
    type BlogRef,
  } from "./blog";

  interface Props {
    holder: string;
    /** Where links go (WS15): the owner's domain or /blog/<handle>. Defaults to /blog/<holder>. */
    ref?: BlogRef;
    newsSourceId?: string;
    lang?: string;
    /** Articles already on the page, used for instant suggestions. */
    localCards?: BlogCard[];
    value?: string;
    /** Focus the input on mount (search results page). */
    autofocus?: boolean;
  }

  let { holder, ref, newsSourceId = "", lang = "", localCards = [], value = $bindable(""), autofocus = false }: Props = $props();

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
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local to this derived computation, never rendered
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
    goto(searchPath(ref ?? holder, q, { ns: newsSourceId, lang }));
  }

  function choose(opt: Option) {
    if (opt.kind === "recent") {
      value = opt.term;
      submit(opt.term);
    } else {
      if (value.trim()) recent = saveRecent(holder, value.trim());
      open = false;
      goto(articlePath(ref ?? holder, opt.card.id));
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

  function onClear() {
    value = "";
    localHits = [];
    serverHits = [];
    activeIndex = -1;
    clearTimeout(debounce);
    ctrl?.abort();
    inputEl?.focus();
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
    {#if value}
      <button type="button" class="search__x" aria-label={$t.blog.search.clear ?? "Clear search"} onclick={onClear}>
        <svg viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 4l8 8M12 4l-8 8" /></svg>
      </button>
    {/if}
    <button class="btn btn--secondary search__button" type="submit">{$t.blog.search.button}</button>
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
    max-width: var(--container-sm);
  }

  /* One pill: icon, field, clear, then the ink search button inside it. */
  .search__field {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: calc(var(--control-h) + var(--space-2));
    padding: var(--space-1) var(--space-1) var(--space-1) var(--space-4);
    background: var(--surface-0);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    transition:
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus-within) {
        border-color: var(--text-2);
        transition-duration: var(--t-in);
      }
    }

    &:focus-within {
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }
  }

  .search__icon {
    width: 1.25rem;
    height: 1.25rem;
    flex-shrink: 0;
    fill: none;
    stroke: var(--text-3);
    stroke-width: 2;
    stroke-linecap: round;
  }

  input {
    flex: 1;
    min-width: 0;
    border: 0;
    background: transparent;
    padding: var(--space-2) 0;
    font: inherit;
    font-size: var(--fs-md);
    color: var(--text-1);

    &::placeholder {
      color: var(--text-3);
    }

    &:focus,
    &:focus-visible {
      outline: none;
    }

    /* Our own clear button replaces the browser's. */
    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }
  }

  .search__x {
    display: grid;
    place-items: center;
    flex-shrink: 0;
    width: 2rem;
    height: 2rem;
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-3);
    cursor: pointer;

    svg {
      width: 0.875rem;
      height: 0.875rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 1.75;
      stroke-linecap: round;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        color: var(--text-1);
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }

  /* The clear button stays 32px visually but gets a 44px hit area. */
  .search__x {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      inset: -6px;
    }
  }

  .search__button {
    flex-shrink: 0;
  }

  /* Suggestions float, so they get the only shadow on the page. */
  .search__panel {
    position: absolute;
    z-index: 30;
    top: calc(100% + var(--space-2));
    left: 0;
    right: 0;
    padding: var(--space-2);
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-3);
    text-align: left;

    &[hidden] {
      display: none;
    }
  }

  @supports (transition-behavior: allow-discrete) {
    .search__panel {
      transition:
        opacity var(--dur-base) var(--ease-out),
        translate var(--dur-base) var(--ease-out),
        display var(--dur-base) allow-discrete;

      @starting-style {
        opacity: 0;
        translate: 0 -4px;
      }
    }
  }

  .search__panel-title {
    margin: 0;
    padding: var(--space-2) var(--space-3) var(--space-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  li {
    position: relative;
    padding: var(--space-3) var(--space-3);
    border-radius: var(--radius-md);
    cursor: pointer;
    color: var(--text-1);
    font-size: var(--fs-sm);
    line-height: var(--lh-tight);
    box-shadow: none;
    transition: background-color var(--t-out) var(--ease-out);

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        background: var(--surface-2);
        box-shadow: none;
        transition-duration: var(--t-in);
      }
    }

    /* Keyboard-active option: fill plus a leading bar, not color alone. */
    &.active {
      background: var(--surface-2);
      box-shadow: inset 2px 0 0 var(--text-1);
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
    color: var(--text-2);
  }

  .search__clear {
    min-height: 1.5rem;
    margin: var(--space-1) var(--space-3) var(--space-2);
    padding: 0;
    border: 0;
    background: none;
    box-shadow: none;
    font: inherit;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text-link);
    text-decoration: underline;
    text-underline-offset: 0.2em;
    cursor: pointer;

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        box-shadow: none;
        text-decoration-thickness: 2px;
      }
    }
  }

  @media (forced-colors: active) {
    li.active {
      outline: 2px solid Highlight;
    }
  }

  @media (max-width: 480px) {
    .search__button {
      padding-inline: var(--space-4);
    }
  }
</style>
