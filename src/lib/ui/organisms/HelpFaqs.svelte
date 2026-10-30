<script lang="ts">
  import { onMount, tick } from 'svelte';

  type HelpItem = { id: string; q: string; a: string };
  type HelpGroup = { id: string; title: string; items: HelpItem[] };

  /** Grouped questions. Each item id is used as its anchor (#id). */
  export let groups: HelpGroup[] = [];
  /** Flat list kept for backward compatibility; shown as one untitled group. */
  export let faqs: { id?: string; q: string; a: string }[] = [];

  export let searchLabel = 'Search the help center';
  export let searchPlaceholder = '';
  export let clearLabel = 'Clear search';
  export let resultsTemplate = '{count} answers match your search.';
  export let noResultsText = 'No answers match your search.';
  export let topicsLabel = 'Topics';
  export let copyLabel = 'Copy link';
  export let copiedLabel = 'Link copied';

  let query = '';
  let open: Record<string, boolean> = {};
  let copiedId = '';
  let input: HTMLInputElement;
  /** Topic whose section is in the reading zone; marked aria-current in the topic list. */
  let activeTopic = '';
  let io: IntersectionObserver | null = null;

  $: allGroups = groups.length
    ? groups
    : faqs.length
      ? [{ id: 'questions', title: '', items: faqs.map((f, i) => ({ id: f.id ?? `q-${i}`, q: f.q, a: f.a })) }]
      : [];

  $: term = query.trim().toLowerCase();
  $: filtered = allGroups
    .map((g) => ({
      ...g,
      items: term
        ? g.items.filter((i) => i.q.toLowerCase().includes(term) || i.a.toLowerCase().includes(term))
        : g.items
    }))
    .filter((g) => g.items.length);
  $: matchCount = filtered.reduce((n, g) => n + g.items.length, 0);
  $: showTopics = !term && allGroups.length > 1;

  function toggle(id: string) {
    open = { ...open, [id]: !open[id] };
  }

  function clear() {
    query = '';
    input?.focus();
  }

  function onSearchKeydown(event: KeyboardEvent) {
    // Esc empties the field first; a second Esc does nothing here.
    if (event.key === 'Escape' && query) {
      event.preventDefault();
      query = '';
    }
  }

  async function openFromHash() {
    if (typeof location === 'undefined') return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
    if (id.startsWith('topic-')) {
      activeTopic = id.slice(6);
      return;
    }
    const exists = allGroups.some((g) => g.items.some((i) => i.id === id));
    if (!exists) return;
    query = '';
    open = { ...open, [id]: true };
    await tick();
    document.getElementById(id)?.scrollIntoView({ block: 'start' });
  }

  async function copyLink(id: string) {
    const url = `${location.origin}${location.pathname}#${id}`;
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      history.replaceState(history.state, '', `#${id}`);
    }
    copiedId = id;
    setTimeout(() => (copiedId = copiedId === id ? '' : copiedId), 2000);
  }

  /** Watches a topic section so the topic list can mark where the reader is. */
  function watchTopic(node: HTMLElement) {
    if (typeof IntersectionObserver === 'undefined') return {};
    io ??= new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) activeTopic = (entry.target as HTMLElement).dataset.topic ?? '';
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );
    io.observe(node);
    return {
      destroy() {
        io?.unobserve(node);
      }
    };
  }

  onMount(() => {
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => {
      window.removeEventListener('hashchange', openFromHash);
      io?.disconnect();
      io = null;
    };
  });
</script>

<div class="help-faqs">
  <div class="help-faqs__search" role="search">
    <label class="help-faqs__label" for="help-search">{searchLabel}</label>
    <div class="help-faqs__field" class:help-faqs__field--filled={!!query}>
      <svg class="help-faqs__search-icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input
        bind:this={input}
        id="help-search"
        type="search"
        class="help-faqs__input"
        bind:value={query}
        on:keydown={onSearchKeydown}
        placeholder={searchPlaceholder}
        autocomplete="off"
        spellcheck="false"
        enterkeyhint="search"
        aria-describedby="help-search-status"
      />
      {#if query}
        <button type="button" class="help-faqs__clear" on:click={clear} aria-label={clearLabel}>
          <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
      {/if}
    </div>
    <p id="help-search-status" class="help-faqs__status" role="status" aria-live="polite">
      {#if term}
        {matchCount ? resultsTemplate.replace('{count}', String(matchCount)) : noResultsText}
      {/if}
    </p>
  </div>

  <div class="help-faqs__layout" class:help-faqs__layout--single={!showTopics}>
    {#if showTopics}
      <nav class="help-faqs__topics" aria-label={topicsLabel}>
        <p class="help-faqs__topics-title" aria-hidden="true">{topicsLabel}</p>
        <ul>
          {#each allGroups as g (g.id)}
            <li>
              <a
                href={`#topic-${g.id}`}
                class="help-faqs__topic"
                aria-current={activeTopic === g.id ? 'location' : undefined}
                on:click={() => (activeTopic = g.id)}
              >{g.title}</a>
            </li>
          {/each}
        </ul>
      </nav>
    {/if}

    <div class="help-faqs__groups">
      {#each filtered as group (group.id)}
        <section
          class="help-faqs__group"
          id={`topic-${group.id}`}
          data-topic={group.id}
          aria-labelledby={group.title ? `topic-${group.id}-title` : undefined}
          use:watchTopic
        >
          {#if group.title}
            <h2 class="help-faqs__group-title" id={`topic-${group.id}-title`}>{group.title}</h2>
          {/if}
          <ul class="help-faqs__list">
            {#each group.items as item (item.id)}
              {@const isOpen = !!term || !!open[item.id]}
              <li class="help-faqs__item" id={item.id} class:help-faqs__item--open={isOpen}>
                <h3 class="help-faqs__q">
                  <button
                    type="button"
                    class="help-faqs__question"
                    id={`${item.id}-q`}
                    aria-expanded={isOpen}
                    aria-controls={`${item.id}-a`}
                    on:click={() => toggle(item.id)}
                  >
                    <span class="help-faqs__question-text">{item.q}</span>
                    <span class="help-faqs__icon" aria-hidden="true">
                      <svg class="chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6" /></svg>
                    </span>
                  </button>
                </h3>
                <div class="help-faqs__answer" id={`${item.id}-a`} role="region" aria-labelledby={`${item.id}-q`} hidden={!isOpen}>
                  <p>{item.a}</p>
                  <button
                    type="button"
                    class="help-faqs__copy"
                    class:help-faqs__copy--done={copiedId === item.id}
                    on:click={() => copyLink(item.id)}
                  >
                    {#if copiedId === item.id}
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                      {copiedLabel}
                    {:else}
                      <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" /><path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" /></svg>
                      {copyLabel}
                    {/if}
                  </button>
                </div>
              </li>
            {/each}
          </ul>
        </section>
      {/each}
    </div>
  </div>

  <!-- Announces the copy result without moving focus. -->
  <p class="sr-only" role="status" aria-live="polite">{copiedId ? copiedLabel : ''}</p>
</div>

<style lang="scss">
  .help-faqs {
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    color: var(--text-1);
  }

  /* ---------- Search: one large pill field ---------- */
  .help-faqs__search {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    max-width: 44rem;
  }

  .help-faqs__label {
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .help-faqs__field {
    position: relative;
    display: flex;
    align-items: center;
  }

  .help-faqs__search-icon {
    position: absolute;
    left: var(--space-5);
    color: var(--text-3);
    pointer-events: none;
    transition: color var(--t-state) var(--ease-out);
  }
  .help-faqs__field:focus-within .help-faqs__search-icon,
  .help-faqs__field--filled .help-faqs__search-icon {
    color: var(--text-1);
  }

  .help-faqs__input {
    flex: 1;
    min-width: 0;
    min-height: 3.5rem;
    padding: 0 3.5rem 0 3.25rem;
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-1);
    font-size: var(--fs-lg);
    letter-spacing: -0.01em;
    appearance: none;
    transition:
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out);

    &::placeholder {
      color: var(--text-3);
      font-size: var(--fs-md);
    }
    &::-webkit-search-cancel-button,
    &::-webkit-search-decoration {
      -webkit-appearance: none;
      appearance: none;
    }
    &:focus-visible {
      outline: none;
      border-color: var(--text-1);
      box-shadow: var(--focus-ring);
    }
  }
  @media (hover: hover) and (pointer: fine) {
    .help-faqs__input:hover:not(:focus-visible) {
      border-color: var(--text-2);
      background: var(--surface-1);
      transition-duration: var(--t-in);
    }
  }

  .help-faqs__clear {
    position: absolute;
    right: var(--space-2);
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    padding: 0;
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }

  .help-faqs__status {
    min-height: 1.5em;
    margin: 0;
    padding-left: var(--space-5);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }

  /* ---------- Layout: topics rail (4) next to the answers (8) ---------- */
  .help-faqs__layout {
    display: grid;
    gap: var(--space-7);
  }
  @media (min-width: 64rem) {
    .help-faqs__layout {
      grid-template-columns: 4fr 8fr;
      gap: var(--space-8);
      align-items: start;
    }
    .help-faqs__layout--single {
      grid-template-columns: minmax(0, 1fr);
    }
    .help-faqs__topics {
      position: sticky;
      top: calc(var(--header-h) + var(--space-6));
    }
  }

  .help-faqs__topics-title {
    margin: 0 0 var(--space-3);
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-3);
  }

  .help-faqs__topics ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2);
  }
  @media (min-width: 64rem) {
    .help-faqs__topics ul {
      flex-direction: column;
      gap: 0;
      border-left: 1px solid var(--border-1);
    }
  }

  /* Topic chips on phones, a quiet rail with a current marker on desktop. */
  .help-faqs__topic {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 2.75rem;
    padding: 0 var(--space-4);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    background: var(--surface-0);
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);

    &[aria-current='location'] {
      border-color: var(--text-1);
      color: var(--text-1);
      font-weight: var(--fw-semibold);
    }
  }
  @media (min-width: 64rem) {
    .help-faqs__topic {
      display: flex;
      min-height: 2.5rem;
      margin-left: -1px;
      padding: 0 var(--space-4);
      border: 0;
      border-left: 2px solid transparent;
      border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
      background: transparent;
      font-size: var(--fs-md);

      &[aria-current='location'] {
        border-left-color: var(--text-1);
      }
    }
  }

  /* ---------- Groups and accordion rows ---------- */
  .help-faqs__groups {
    display: grid;
    gap: var(--space-8);
    min-width: 0;
  }

  .help-faqs__group {
    scroll-margin-top: calc(var(--header-h) + var(--space-5));
  }

  .help-faqs__group-title {
    margin: 0 0 var(--space-4);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
  }

  .help-faqs__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border-1);
  }

  .help-faqs__item {
    position: relative;
    border-bottom: 1px solid var(--border-1);
    scroll-margin-top: calc(var(--header-h) + var(--space-5));

    /* Arrived from a shared link: a short ink bar marks the answer. */
    &:target::before {
      content: '';
      position: absolute;
      inset-block: var(--space-3);
      left: calc(-1 * var(--space-3));
      width: 2px;
      border-radius: var(--radius-full);
      background: var(--text-1);
    }
  }

  .help-faqs__q {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
    letter-spacing: 0;
  }

  .help-faqs__question {
    width: calc(100% + 2 * var(--space-3));
    margin-inline: calc(-1 * var(--space-3));
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4);
    min-height: 3.5rem;
    padding: var(--space-4) var(--space-3);
    border: 0;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    text-align: left;
    font-family: var(--font-body);
    font-size: var(--fs-lg);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    letter-spacing: -0.01em;
    cursor: pointer;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }
  .help-faqs__question-text {
    min-width: 0;
  }

  .help-faqs__icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    color: var(--text-2);
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);

    .chevron {
      transition: transform var(--dur-slow) var(--ease-out);
    }
  }
  .help-faqs__question[aria-expanded='true'] .help-faqs__icon {
    border-color: var(--text-1);
    color: var(--text-1);
    .chevron {
      transform: rotate(180deg);
    }
  }

  .help-faqs__answer {
    padding: 0 0 var(--space-5);
    animation: help-faqs-in var(--dur-base) var(--ease-out);

    p {
      margin: 0 0 var(--space-3);
      max-width: 62ch;
      color: var(--text-2);
      font-size: var(--fs-md);
      line-height: var(--lh-normal);
    }
  }
  @keyframes help-faqs-in {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
  }

  .help-faqs__copy {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 2.75rem;
    margin-left: calc(-1 * var(--space-3));
    padding: 0 var(--space-3);
    border: 0;
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out);
  }
  .help-faqs__copy--done {
    color: var(--success);
    font-weight: var(--fw-semibold);
  }

  /* ---------- Shared states ---------- */
  @media (hover: hover) and (pointer: fine) {
    .help-faqs__question:hover,
    .help-faqs__copy:hover,
    .help-faqs__clear:hover {
      background: color-mix(in srgb, currentColor var(--state-hover), transparent);
      transition-duration: var(--t-in);
    }
    .help-faqs__copy:hover,
    .help-faqs__clear:hover {
      color: var(--text-1);
    }
    .help-faqs__question:hover .help-faqs__icon {
      border-color: var(--text-2);
      color: var(--text-1);
    }
    .help-faqs__topic:hover:not([aria-current='location']) {
      color: var(--text-1);
      border-color: var(--border-2);
      transition-duration: var(--t-in);
    }
  }
  @media (hover: hover) and (pointer: fine) and (min-width: 64rem) {
    .help-faqs__topic:hover:not([aria-current='location']) {
      border-left-color: var(--border-2);
      background: color-mix(in srgb, currentColor var(--state-hover), transparent);
    }
  }

  .help-faqs__question:active,
  .help-faqs__copy:active,
  .help-faqs__clear:active,
  .help-faqs__topic:active {
    background: color-mix(in srgb, currentColor var(--state-press), transparent);
    transition-duration: 0ms;
  }
  .help-faqs__copy:active,
  .help-faqs__clear:active,
  .help-faqs__topic:active {
    transform: scale(0.97);
  }
  .help-faqs__question:active {
    transform: scale(0.995);
  }

  .help-faqs__question:focus-visible,
  .help-faqs__copy:focus-visible,
  .help-faqs__clear:focus-visible,
  .help-faqs__topic:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  @media (prefers-reduced-motion: reduce) {
    .help-faqs__answer {
      animation: none;
    }
    .help-faqs__question:active,
    .help-faqs__copy:active,
    .help-faqs__clear:active,
    .help-faqs__topic:active {
      transform: none;
    }
  }
  :global(:root[data-motion='reduced']) .help-faqs__answer {
    animation: none;
  }
  :global(:root[data-motion='reduced']) :is(.help-faqs__question, .help-faqs__copy, .help-faqs__clear, .help-faqs__topic):active {
    transform: none;
  }

  @media (forced-colors: active) {
    .help-faqs__topic[aria-current='location'] {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }
    .help-faqs__item:target::before {
      background: Highlight;
    }
  }
</style>
