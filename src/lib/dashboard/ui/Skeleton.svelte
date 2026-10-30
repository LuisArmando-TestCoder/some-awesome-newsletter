<!-- WS4. Loading placeholder shaped like the content it replaces. -->
<script lang="ts">
  export let lines = 3;
  export let height: string | null = null;
  export let label = "Loading";
</script>

<div class="skel" role="status" aria-live="polite" aria-busy="true">
  <span class="sr-only">{label}</span>
  {#if height}
    <div class="skel__block" style="height: {height}"></div>
  {:else}
    {#each Array(lines) as _, i (i)}
      <div class="skel__line" style="width: {i === lines - 1 ? 60 : 100}%"></div>
    {/each}
  {/if}
</div>

<style lang="scss">
  .skel { display: flex; flex-direction: column; gap: var(--space-2); }
  .skel__line, .skel__block {
    border-radius: var(--radius-sm);
    background-color: var(--surface-2);
    background-image: linear-gradient(90deg, var(--surface-2) 0%, var(--surface-3) 50%, var(--surface-2) 100%);
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: shimmer 1.4s var(--ease-in-out) infinite;
  }
  .skel__line { height: 0.9em; }
  .skel__block { border-radius: var(--radius-md); }
  @keyframes shimmer { from { background-position: 100% 0; } to { background-position: -100% 0; } }
  @media (prefers-reduced-motion: reduce) { .skel__line, .skel__block { animation: none !important; background-image: none; } }
  :global(:root[data-motion="reduced"]) .skel__line, :global(:root[data-motion="reduced"]) .skel__block { animation: none !important; background-image: none; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
