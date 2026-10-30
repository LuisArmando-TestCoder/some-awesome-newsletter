<!-- WS4. One number with a label and an optional hint. -->
<script lang="ts">
  import Icon from "./Icon.svelte";
  export let label: string;
  export let value: string | number | null = null;
  export let hint: string | null = null;
  export let icon: string | null = null;
  export let loading = false;
</script>

<div class="stat">
  <p class="stat__label">{#if icon}<Icon name={icon} size={16} />{/if}{label}</p>
  {#if loading}
    <span class="stat__value stat__value--loading" aria-hidden="true"></span>
  {:else}
    <p class="stat__value">{value ?? "0"}</p>
  {/if}
  {#if hint}<p class="stat__hint">{hint}</p>{/if}
  <slot />
</div>

<style lang="scss">
  .stat {
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    padding: var(--space-4) var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    min-width: 0;
  }
  .stat__label {
    margin: 0;
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-size: var(--fs-sm);
    color: var(--text-2);
    font-weight: var(--fw-medium);
  }
  .stat__value {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    line-height: var(--lh-tight);
    font-variant-numeric: tabular-nums;
    overflow-wrap: anywhere;
  }
  .stat__value--loading { display: block; height: 1.6em; width: 50%; border-radius: var(--radius-sm); background: var(--surface-2); }
  .stat__hint { margin: 0; font-size: var(--fs-xs); color: var(--text-3); line-height: var(--lh-normal); }
</style>
