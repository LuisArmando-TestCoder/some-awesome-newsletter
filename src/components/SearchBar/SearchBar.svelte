<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import PlainText from '../systems/inputs/PlainText/PlainText.svelte';

  export let value = '';
  export let placeholder = 'Search...';

  let focused = false;
  let touched = false;

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

<div class="search-bar-wrap">
  <div class="search-bar" class:focused class:empty={touched && !value}>
    <svg class="search-icon" width="22" height="22" viewBox="0 0 22 22" fill="none">
      <circle  fill="white" cx="10" cy="10" r="8" stroke="#bbb" stroke-width="2"/>
      <line x1="16.2" y1="16.2" x2="21" y2="21" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
    </svg>
    <PlainText
      {placeholder}
      bind:value
      onChange={handleInput}
      on:focus={() => { focused = true; touched = true; }}
      on:blur={() => { focused = false; }}
    />
    {#if value}
      <button class="clear-btn" on:click={clear} aria-label="Clear search">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <line x1="4" y1="4" x2="14" y2="14" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
          <line x1="14" y1="4" x2="4" y2="14" stroke="#bbb" stroke-width="2" stroke-linecap="round"/>
        </svg>
      </button>
    {/if}
  </div>
</div>

<style>
.search-bar-wrap {
  display: flex;
  justify-content: center;
  margin: 1rem auto;
  z-index: 20;
}
.search-bar {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 2.5em;
  box-shadow: 0 2px 16px 0 rgba(0,0,0,0.07);
  padding: 0.2em 1.2em 0.2em 0.8em;
  min-width: 320px;
  max-width: 480px;
  width: 100%;
  transition: box-shadow 0.3s cubic-bezier(0.4,0,0.2,1), border 0.3s cubic-bezier(0.4,0,0.2,1);
  border: 2px solid transparent;
  position: relative;
}
.search-bar.focused {
  box-shadow: 0 4px 32px 0 rgba(0,0,0,0.13);
  border: 2px solid #0077cc;
}
.search-bar.empty {
  border: 2px solid #ffb3b3;
}
.search-icon {
  margin-right: 0.7em;
  flex-shrink: 0;
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
  padding: 0.7em 0;
  font-size: 1.08rem;
  color: #222;
}
:global(.search-bar input:focus) {
  box-shadow: none;
}
.clear-btn {
  background: none;
  border: none;
  outline: none;
  cursor: pointer;
  margin-left: 0.5em;
  padding: 0.2em;
  border-radius: 50%;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.clear-btn:hover {
  background: #f3f3f3;
}
</style>
