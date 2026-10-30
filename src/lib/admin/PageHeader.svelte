<script lang="ts">
  import type { Snippet } from "svelte";
  let { title, description = "", actions }: { title: string; description?: string; actions?: Snippet } = $props();
</script>

<header class="ph">
  <div class="ph__text">
    <h1>{title}</h1>
    {#if description}<p>{description}</p>{/if}
  </div>
  {#if actions}<div class="ph__actions">{@render actions()}</div>{/if}
</header>

<style>
  .ph {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: var(--space-4, 16px);
    flex-wrap: wrap;
    margin-bottom: var(--space-6, 24px);
  }
  h1 {
    margin: 0;
    font-family: var(--font-display, inherit);
    font-size: var(--fs-2xl, 1.75rem);
    line-height: var(--lh-tight, 1.15);
    color: var(--text-1, inherit);
  }
  p {
    margin: var(--space-1, 4px) 0 0;
    color: var(--text-2, inherit);
    font-size: var(--fs-sm, 0.875rem);
    max-width: 60ch;
  }
  .ph__actions {
    display: flex;
    gap: var(--space-2, 8px);
    flex-wrap: wrap;
  }
</style>
