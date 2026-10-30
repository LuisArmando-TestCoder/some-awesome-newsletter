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

  function toggle(id: string) {
    open = { ...open, [id]: !open[id] };
  }

  async function openFromHash() {
    if (typeof location === 'undefined') return;
    const id = decodeURIComponent(location.hash.slice(1));
    if (!id) return;
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

  onMount(() => {
    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  });
</script>

<div class="help-faqs">
  <div class="help-faqs__search" role="search">
    <label class="help-faqs__label" for="help-search">{searchLabel}</label>
    <div class="help-faqs__field">
      <svg class="help-faqs__search-icon" aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></svg>
      <input
        id="help-search"
        type="search"
        class="help-faqs__input"
        bind:value={query}
        placeholder={searchPlaceholder}
        autocomplete="off"
        aria-describedby="help-search-status"
      />
      {#if query}
        <button type="button" class="help-faqs__clear" on:click={() => (query = '')}>{clearLabel}</button>
      {/if}
    </div>
    <p id="help-search-status" class="help-faqs__status" role="status" aria-live="polite">
      {#if term}
        {matchCount ? resultsTemplate.replace('{count}', String(matchCount)) : noResultsText}
      {/if}
    </p>
  </div>

  {#if !term && allGroups.length > 1}
    <nav class="help-faqs__topics" aria-label={topicsLabel}>
      <ul>
        {#each allGroups as g (g.id)}
          <li><a href={`#topic-${g.id}`}>{g.title}</a></li>
        {/each}
      </ul>
    </nav>
  {/if}

  {#each filtered as group (group.id)}
    <section class="help-faqs__group" id={`topic-${group.id}`} aria-labelledby={group.title ? `topic-${group.id}-title` : undefined}>
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
                <span>{item.q}</span>
                <svg class="help-faqs__icon" aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 9l6 6 6-6" /></svg>
              </button>
            </h3>
            <div class="help-faqs__answer" id={`${item.id}-a`} role="region" aria-labelledby={`${item.id}-q`} hidden={!isOpen}>
              <p>{item.a}</p>
              <button type="button" class="help-faqs__copy" on:click={() => copyLink(item.id)}>
                {copiedId === item.id ? copiedLabel : copyLabel}
              </button>
            </div>
          </li>
        {/each}
      </ul>
    </section>
  {/each}
</div>

<style lang="scss">
  .help-faqs {
    display: flex;
    flex-direction: column;
    gap: var(--space-6, 32px);
    color: var(--text-1, #0f172a);
  }

  .help-faqs__search {
    display: flex;
    flex-direction: column;
    gap: var(--space-2, 8px);
  }

  .help-faqs__label {
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    color: var(--text-1, #0f172a);
  }

  .help-faqs__field {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
  }

  .help-faqs__search-icon {
    position: absolute;
    left: var(--space-4, 16px);
    color: var(--text-3, #64748b);
    pointer-events: none;
  }

  .help-faqs__input {
    flex: 1;
    min-height: 48px;
    padding: var(--space-3, 12px) var(--space-4, 16px) var(--space-3, 12px) var(--space-8, 48px);
    border: 1px solid var(--border-2, #cbd5e1);
    border-radius: var(--radius-md, 10px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #0f172a);
    font-size: var(--fs-md, 1rem);

    &::placeholder { color: var(--text-3, #64748b); }

    &:focus-visible {
      outline: 2px solid var(--focus-color, #6366f1);
      outline-offset: 1px;
    }
  }

  .help-faqs__clear,
  .help-faqs__copy {
    background: none;
    border: none;
    padding: var(--space-2, 8px);
    color: var(--text-link, #4338ca);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    cursor: pointer;
    border-radius: var(--radius-sm, 6px);
    &:hover { text-decoration: underline; }
  }

  .help-faqs__status {
    min-height: 1.5em;
    margin: 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #475569);
  }

  .help-faqs__topics ul {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2, 8px);
    list-style: none;
    margin: 0;
    padding: 0;

    a {
      display: inline-flex;
      align-items: center;
      min-height: 36px;
      padding: var(--space-1, 4px) var(--space-3, 12px);
      border: 1px solid var(--border-1, #e5e7eb);
      border-radius: var(--radius-full, 999px);
      background: var(--surface-1, #fff);
      color: var(--text-1, #0f172a);
      font-size: var(--fs-sm, 0.875rem);
      text-decoration: none;
      &:hover { background: var(--surface-2, #f1f5f9); }
    }
  }

  .help-faqs__group {
    scroll-margin-top: calc(var(--header-h, 72px) + var(--space-4, 16px));
  }

  .help-faqs__group-title {
    margin: 0 0 var(--space-3, 12px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-xl, 1.375rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
  }

  .help-faqs__list {
    list-style: none;
    margin: 0;
    padding: 0;
    border-top: 1px solid var(--border-1, #e5e7eb);
  }

  .help-faqs__item {
    border-bottom: 1px solid var(--border-1, #e5e7eb);
    scroll-margin-top: calc(var(--header-h, 72px) + var(--space-4, 16px));

    &:target .help-faqs__question { color: var(--text-link, #4338ca); }
  }

  .help-faqs__q {
    margin: 0;
    font-size: inherit;
    font-weight: inherit;
  }

  .help-faqs__question {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-4, 16px);
    padding: var(--space-4, 16px) var(--space-1, 4px);
    background: none;
    border: none;
    text-align: left;
    cursor: pointer;
    color: var(--text-1, #0f172a);
    font-family: inherit;
    font-size: var(--fs-md, 1rem);
    font-weight: var(--fw-semibold, 600);
    line-height: var(--lh-normal, 1.5);
    border-radius: var(--radius-sm, 6px);

    &:hover { color: var(--text-link, #4338ca); }
  }

  .help-faqs__icon {
    flex-shrink: 0;
    color: var(--text-3, #64748b);
    transition: transform var(--dur-base, 200ms) var(--ease-out, ease-out);
  }

  .help-faqs__item--open .help-faqs__icon { transform: rotate(180deg); }

  .help-faqs__answer {
    padding: 0 var(--space-1, 4px) var(--space-3, 12px);

    p {
      margin: 0 0 var(--space-2, 8px);
      color: var(--text-2, #475569);
      font-size: var(--fs-md, 1rem);
      line-height: var(--lh-normal, 1.6);
      max-width: 68ch;
    }
  }

  .help-faqs__copy { padding-left: 0; }

  button:focus-visible,
  a:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  @media (prefers-reduced-motion: reduce) {
    .help-faqs__icon { transition: none; }
  }
</style>
