<!-- WS4. Surface card with optional heading row. -->
<script lang="ts">
  export let title: string | null = null;
  export let subtitle: string | null = null;
  export let as: "section" | "article" | "div" = "section";
  export let pad = true;
  export let tone: "default" | "accent" | "warning" | "danger" = "default";
  const id = `card-${Math.random().toString(36).slice(2, 9)}`;
</script>

<svelte:element this={as} class="dcard tone-{tone}" class:pad aria-labelledby={title ? id : undefined}>
  {#if title || $$slots.actions}
    <header class="dcard__head">
      <div>
        {#if title}<h2 class="dcard__title" {id}>{title}</h2>{/if}
        {#if subtitle}<p class="dcard__sub">{subtitle}</p>{/if}
      </div>
      {#if $$slots.actions}<div class="dcard__actions"><slot name="actions" /></div>{/if}
    </header>
  {/if}
  <slot />
</svelte:element>

<style lang="scss">
  .dcard {
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-1);
    min-width: 0;
    &.pad { padding: var(--card-pad, var(--space-5)); }
    &.tone-accent { border-color: var(--accent); background: var(--accent-soft); }
    &.tone-warning { border-color: var(--warning); background: var(--warning-soft); }
    &.tone-danger { border-color: var(--danger); background: var(--danger-soft); }
  }
  .dcard__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
    flex-wrap: wrap;
  }
  .dcard__title {
    margin: 0;
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    line-height: var(--lh-tight);
  }
  .dcard__sub { margin: var(--space-1) 0 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .dcard__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; }
</style>
