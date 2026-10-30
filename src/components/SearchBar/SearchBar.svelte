<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PlainText from '../systems/inputs/PlainText/PlainText.svelte';

  export let value = '';
  export let placeholder = 'Search';
  /** Accessible name. Defaults to the placeholder text. */
  export let label = '';

  let focused = false;

  const dispatch = createEventDispatcher();

  function handleInput(newValue: string) {
    value = newValue;
    dispatch('search', { value });
  }

  function clear() {
    value = '';
    dispatch('search', { value });
  }
</script>

<div class="search-bar-wrap" role="search" aria-label={label || placeholder}>
  <div class="search-bar" class:focused>
    <svg class="search-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
    </svg>
    <PlainText
      {placeholder}
      bind:value
      onChange={handleInput}
      on:focus={() => { focused = true; }}
      on:blur={() => { focused = false; }}
    />
    {#if value}
      <button type="button" class="clear-btn" on:click={clear} aria-label="Clear search">
        <svg viewBox="0 0 18 18" aria-hidden="true" focusable="false">
          <line x1="4" y1="4" x2="14" y2="14" />
          <line x1="14" y1="4" x2="4" y2="14" />
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
.search-bar-wrap {
  display: flex;
  justify-content: center;
  margin: var(--space-4, 16px) auto;
  width: 100%;
}
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2, 8px);
  background: var(--surface-1, #fff);
  border: 1px solid var(--border-2, #ccc);
  border-radius: var(--radius-full, 999px);
  padding: 0 var(--space-3, 12px) 0 var(--space-4, 16px);
  min-width: 0;
  max-width: 30rem;
  width: 100%;
  transition: border-color var(--dur-fast, 120ms) var(--ease-out, ease-out),
    box-shadow var(--dur-fast, 120ms) var(--ease-out, ease-out);
}
.search-bar.focused {
  border-color: var(--accent, #2563eb);
  box-shadow: 0 0 0 3px var(--accent-soft, transparent);
}
.search-icon {
  width: 1.25rem;
  height: 1.25rem;
  flex-shrink: 0;
  fill: none;
  stroke: var(--text-3, #777);
  stroke-width: 2;
  stroke-linecap: round;
}
:global(.search-bar .text-input-wrapper) {
  width: 100%;
}
:global(.search-bar .input-label) {
  display: none;
}
:global(.search-bar input) {
  border: none;
  background: transparent;
  padding: var(--space-3, 12px) 0;
  font-size: var(--fs-md, 1rem);
  color: var(--text-1, #111);
}
:global(.search-bar input::placeholder) {
  color: var(--text-3, #777);
}
:global(.search-bar input:focus) {
  box-shadow: none;
  outline: none;
}
.clear-btn {
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  background: none;
  border: none;
  border-radius: var(--radius-full, 999px);
  cursor: pointer;
  color: var(--text-3, #777);
  transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);
}
.clear-btn svg {
  width: 1rem;
  height: 1rem;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
.clear-btn:hover {
  background: var(--surface-2, #f3f3f3);
  color: var(--text-1, #111);
}
.clear-btn:focus-visible {
  outline: 2px solid var(--focus-color, #2563eb);
  outline-offset: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .search-bar,
  .clear-btn {
    transition: none;
  }
}
</style>
