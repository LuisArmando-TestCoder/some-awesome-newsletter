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
    gap: var(--space-3) var(--space-4);
    flex-wrap: wrap;
    margin-bottom: var(--space-5);
    padding-bottom: var(--space-4);
    border-bottom: 1px solid var(--border-1);
  }
  .ph__text {
    min-width: 0;
  }
  h1 {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    overflow-wrap: anywhere;
  }
  p {
    margin: var(--space-1) 0 0;
    color: var(--text-2);
    font-size: var(--fs-sm);
    max-width: 60ch;
  }
  .ph__actions {
    display: flex;
    gap: var(--space-2);
    flex-wrap: wrap;
  }
</style>
