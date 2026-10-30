<script module lang="ts">
  export interface TabItem {
    id: string;
    label: string;
    badge?: string | number;
    disabled?: boolean;
  }
</script>

<script lang="ts">
  import type { Snippet } from 'svelte';

  interface Props {
    tabs?: TabItem[];
    /** Id of the selected tab. */
    active?: string;
    onchange?: (id: string) => void;
    variant?: 'underline' | 'pill';
    /** Accessible name of the tab list. */
    label?: string;
    /** Content of the selected panel. Receives the active id. */
    panel?: Snippet<[string]>;
    /** Custom tab content. Receives the tab. Replaces the old "item" slot. */
    item?: Snippet<[TabItem]>;
    /** Legacy: plain string tabs. Each string is both id and label. */
    items?: string[];
    /** Legacy: selected string when using items. */
    activeItem?: string;
    class?: string;
  }

  let {
    tabs,
    active = $bindable(),
    onchange,
    variant = 'underline',
    label,
    panel,
    item,
    items,
    activeItem = $bindable(),
    class: className = ''
  }: Props = $props();

  const uid = $props.id();

  const list = $derived<TabItem[]>(tabs ?? (items ?? []).map((i) => ({ id: i, label: i })));
  const enabled = $derived(list.filter((t) => !t.disabled));
  const current = $derived.by(() => {
    const wanted = active ?? activeItem;
    if (wanted !== undefined && list.some((t) => t.id === wanted)) return wanted;
    return enabled[0]?.id ?? '';
  });

  let buttons: Record<string, HTMLButtonElement | undefined> = $state({});

  const safe = (id: string) => id.replace(/[^a-zA-Z0-9_-]/g, '_');
  const tabId = (id: string) => `tabs-${uid}-tab-${safe(id)}`;
  const panelId = `tabs-${uid}-panel`;

  function select(id: string, focus = false) {
    const target = list.find((t) => t.id === id);
    if (!target || target.disabled) return;
    const changed = id !== current;
    active = id;
    if (items) activeItem = id;
    const el = buttons[id];
    if (el) {
      if (focus) el.focus();
      el.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    }
    if (changed) onchange?.(id);
  }

  function onKeydown(event: KeyboardEvent) {
    if (!enabled.length) return;
    const index = enabled.findIndex((t) => t.id === current);
    let next = -1;
    switch (event.key) {
      case 'ArrowRight':
        next = (index + 1) % enabled.length;
        break;
      case 'ArrowLeft':
        next = (index - 1 + enabled.length) % enabled.length;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = enabled.length - 1;
        break;
      default:
        return;
    }
    event.preventDefault();
    select(enabled[next].id, true);
  }
</script>

<div class="tabs variant-{variant} {className}">
  <div class="scroller">
    <div class="tablist" role="tablist" aria-label={label} aria-orientation="horizontal" tabindex="-1" onkeydown={onKeydown}>
      {#each list as tab (tab.id)}
        {@const selected = tab.id === current}
        <button
          bind:this={buttons[tab.id]}
          type="button"
          role="tab"
          id={tabId(tab.id)}
          class="tab"
          aria-selected={selected}
          aria-controls={panel ? panelId : undefined}
          aria-disabled={tab.disabled || undefined}
          tabindex={selected ? 0 : -1}
          onclick={() => select(tab.id)}
        >
          {#if item}
            {@render item(tab)}
          {:else}
            <span class="label" data-text={tab.label}>{tab.label}</span>
            {#if tab.badge !== undefined && tab.badge !== ''}
              <span class="badge">{tab.badge}</span>
            {/if}
          {/if}
        </button>
      {/each}
    </div>
  </div>

  {#if panel && current}
    <div class="panel" role="tabpanel" id={panelId} aria-labelledby={tabId(current)} tabindex="0">
      {@render panel(current)}
    </div>
  {/if}
</div>

<style>
  .tabs {
    width: 100%;
    min-width: 0;
  }

  .scroller {
    overflow-x: auto;
    overflow-y: hidden;
    scrollbar-width: thin;
    -webkit-overflow-scrolling: touch;
  }

  .tablist {
    display: flex;
    gap: var(--space-1);
    min-width: max-content;
  }

  .tablist:focus {
    outline: none;
  }

  .tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-4);
    border: 0;
    background: transparent;
    color: var(--text-2);
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    white-space: nowrap;
    cursor: pointer;
    transition:
      color var(--dur-fast) var(--ease-out),
      background-color var(--dur-fast) var(--ease-out);
  }

  .tab:hover:not([aria-disabled='true']) {
    color: var(--text-1);
  }

  .tab[aria-selected='true'] {
    color: var(--text-1);
    font-weight: var(--fw-semibold);
  }

  .tab[aria-disabled='true'] {
    color: var(--text-3);
    cursor: not-allowed;
  }

  .tab:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sm);
  }

  /* Reserve the semibold width so selecting a tab never shifts the row. */
  .label {
    display: inline-grid;
  }

  .label::after {
    content: attr(data-text);
    height: 0;
    overflow: hidden;
    visibility: hidden;
    font-weight: var(--fw-semibold);
    user-select: none;
    pointer-events: none;
  }

  .badge {
    display: inline-grid;
    place-items: center;
    min-width: 1.5em;
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    background: var(--surface-2);
    color: var(--text-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    line-height: 1.6;
    font-variant-numeric: tabular-nums;
  }

  .tab[aria-selected='true'] .badge {
    background: var(--accent-soft);
    color: var(--accent);
  }

  /* Underline */
  .variant-underline .tablist {
    border-bottom: 1px solid var(--border-1);
  }

  .variant-underline .tab::after {
    content: '';
    position: absolute;
    inset-inline: var(--space-2);
    bottom: -1px;
    height: 2px;
    border-radius: var(--radius-full);
    background: transparent;
    transition: background-color var(--dur-fast) var(--ease-out);
  }

  .variant-underline .tab[aria-selected='true']::after {
    background: var(--accent);
  }

  .variant-underline .tab:hover:not([aria-selected='true']):not([aria-disabled='true'])::after {
    background: var(--border-2);
  }

  /* Pill */
  .variant-pill .scroller {
    border-radius: var(--radius-full);
  }

  .variant-pill .tablist {
    display: inline-flex;
    min-width: 0;
    padding: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--surface-2);
    border: 1px solid var(--border-1);
  }

  .variant-pill .tab {
    min-height: var(--control-h-sm);
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
  }

  .variant-pill .tab[aria-selected='true'] {
    background: var(--surface-1);
    box-shadow: var(--shadow-1);
  }

  .variant-pill .tab:focus-visible {
    border-radius: var(--radius-full);
    box-shadow: var(--focus-ring);
  }

  .panel {
    padding-top: var(--space-5);
  }

  .panel:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
    border-radius: var(--radius-sm);
  }

  @media (prefers-reduced-motion: reduce) {
    .tab,
    .tab::after {
      transition: none;
    }
  }
</style>
