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
  margin: var(--space-4) auto;
  width: 100%;
}
/* One pill: icon, field, clear. Ink edge and focus ring while typing. */
.search-bar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: calc(var(--control-h) + var(--space-1));
  background: var(--surface-0);
  border: 1px solid var(--border-2);
  border-radius: var(--radius-full);
  padding: 0 var(--space-2) 0 var(--space-4);
  min-width: 0;
  max-width: 30rem;
  width: 100%;
  transition:
    border-color var(--t-out) var(--ease-out),
    box-shadow var(--t-out) var(--ease-out);
}
@media (hover: hover) and (pointer: fine) {
  .search-bar:hover:not(:focus-within) {
    border-color: var(--text-2);
    transition-duration: var(--t-in);
  }
}
.search-bar.focused,
.search-bar:focus-within {
  border-color: var(--text-1);
  box-shadow: var(--focus-ring);
}
.search-icon {
  width: 1.125rem;
  height: 1.125rem;
  flex-shrink: 0;
  fill: none;
  stroke: var(--text-3);
  stroke-width: 2;
  stroke-linecap: round;
}
:global(.search-bar .text-input-wrapper) {
  width: 100%;
  margin: 0;
}
:global(.search-bar .input-label) {
  display: none;
}
:global(.search-bar input) {
  width: 100%;
  border: none;
  background: transparent;
  padding: var(--space-3) 0;
  font-size: var(--fs-md);
  color: var(--text-1);
}
:global(.search-bar input::placeholder) {
  color: var(--text-3);
}
:global(.search-bar input:focus),
:global(.search-bar input:focus-visible) {
  box-shadow: none;
  outline: none;
}
.clear-btn {
  position: relative;
  display: grid;
  place-items: center;
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
  padding: 0;
  background: none;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  color: var(--text-3);
  transition:
    background-color var(--t-out) var(--ease-out),
    color var(--t-out) var(--ease-out);
}
/* 44px hit area around the 32px visual. */
.clear-btn::after {
  content: '';
  position: absolute;
  inset: -6px;
}
.clear-btn svg {
  width: 0.875rem;
  height: 0.875rem;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
}
@media (hover: hover) and (pointer: fine) {
  .clear-btn:hover {
    background: var(--surface-2);
    color: var(--text-1);
    transition-duration: var(--t-in);
  }
}
.clear-btn:active {
  transform: scale(0.94);
}
.clear-btn:focus-visible {
  outline: none;
  box-shadow: var(--focus-ring);
}
@media (prefers-reduced-motion: reduce) {
  .search-bar,
  .clear-btn {
    transition: none;
  }
  .clear-btn:active {
    transform: none;
  }
}
</style>
