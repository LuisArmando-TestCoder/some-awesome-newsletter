<!-- WS4. Accessible tabs (WAI-ARIA tabs pattern, arrow keys move focus).
     Panels stay in place; nothing above or beside them moves when you switch. -->
<script lang="ts">
  import { createEventDispatcher } from "svelte";
  export let tabs: { id: string; label: string; badge?: string | number | null }[] = [];
  export let active: string;
  export let label = "Sections";
  const dispatch = createEventDispatcher<{ change: string }>();
  const uid = Math.random().toString(36).slice(2, 8);
  let buttons: HTMLButtonElement[] = [];

  function select(id: string) {
    if (id === active) return;
    active = id;
    dispatch("change", id);
  }

  function onKey(e: KeyboardEvent, i: number) {
    let next = -1;
    if (e.key === "ArrowRight") next = (i + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (i - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    if (next < 0) return;
    e.preventDefault();
    buttons[next]?.focus();
    select(tabs[next].id);
  }
</script>

<div class="dtabs">
  <div class="dtabs__list" role="tablist" aria-label={label}>
    {#each tabs as tab, i (tab.id)}
      <button
        bind:this={buttons[i]}
        type="button"
        role="tab"
        id="tab-{uid}-{tab.id}"
        aria-selected={active === tab.id}
        aria-controls="panel-{uid}"
        tabindex={active === tab.id ? 0 : -1}
        class="dtabs__tab"
        class:active={active === tab.id}
        on:click={() => select(tab.id)}
        on:keydown={(e) => onKey(e, i)}
      >
        {tab.label}
        {#if tab.badge !== undefined && tab.badge !== null && tab.badge !== ""}<span class="dtabs__badge">{tab.badge}</span>{/if}
      </button>
    {/each}
  </div>
  <div class="dtabs__panel" role="tabpanel" id="panel-{uid}" aria-labelledby="tab-{uid}-{active}" tabindex="-1">
    <slot />
  </div>
</div>

<style lang="scss">
  .dtabs__list {
    display: flex;
    gap: var(--space-1);
    border-bottom: 1px solid var(--border-1);
    overflow-x: auto;
    scrollbar-width: none;
    margin-bottom: var(--space-5);
    &::-webkit-scrollbar { display: none; }
  }
  .dtabs__tab {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h);
    padding: 0 var(--space-3);
    background: transparent;
    border: 0;
    border-radius: var(--radius-md) var(--radius-md) 0 0;
    color: var(--text-2);
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    cursor: pointer;
    white-space: nowrap;
    -webkit-tap-highlight-color: transparent;
    transition:
      color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out);

    /* Indicator bar: grows in under the selected tab (the non-color cue, with the weight). */
    &::after {
      content: "";
      position: absolute;
      left: var(--space-2);
      right: var(--space-2);
      bottom: -1px;
      height: 2px;
      border-radius: 2px;
      background: var(--text-1);
      transform: scaleX(0);
      transition: transform var(--dur-base) var(--ease-out);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.active) {
        color: var(--text-1);
        background: color-mix(in srgb, var(--text-1) var(--state-hover), transparent);
        transition-duration: var(--t-in);
      }
    }
    &:active:not(.active) { background: color-mix(in srgb, var(--text-1) var(--state-press), transparent); transition-duration: 0ms; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
    &.active {
      color: var(--text-1);
      font-weight: var(--fw-semibold);
      &::after { transform: scaleX(1); }
    }
  }
  .dtabs__badge {
    font-size: var(--fs-xs);
    background: var(--surface-2);
    color: var(--text-2);
    border-radius: var(--radius-full);
    padding: 0 var(--space-2);
    font-variant-numeric: tabular-nums;
    .active & { background: var(--text-1); color: var(--surface-0); }
  }
  .dtabs__panel:focus { outline: none; }
  .dtabs__panel:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-md); }

  @media (forced-colors: active) {
    .dtabs__tab.active { forced-color-adjust: none; color: Highlight; }
    .dtabs__tab::after { background: Highlight; }
    .dtabs__tab:focus-visible { outline: 2px solid CanvasText; outline-offset: -2px; }
  }
  @media (prefers-reduced-motion: reduce) {
    .dtabs__tab::after { transition: none; }
  }
</style>
