<!-- WS4. Empty state: what this place is for, and the one thing to do next. -->
<script lang="ts">
  import Icon from "./Icon.svelte";
  export let icon = "sparkle";
  export let title: string;
  export let body: string | null = null;
  export let compact = false;
</script>

<div class="empty" class:compact role="status">
  <span class="empty__icon"><Icon name={icon} size={compact ? 20 : 28} /></span>
  <h3 class="empty__title">{title}</h3>
  {#if body}<p class="empty__body">{body}</p>{/if}
  {#if $$slots.default}<div class="empty__actions"><slot /></div>{/if}
</div>

<style lang="scss">
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: var(--space-2);
    padding: var(--space-8) var(--space-5);
    border: 1px dashed var(--border-2);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    &.compact { padding: var(--space-5) var(--space-4); }
  }
  .empty__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: var(--radius-full);
    background: var(--accent-soft);
    color: var(--accent);
    margin-bottom: var(--space-2);
    .compact & { width: 40px; height: 40px; }
  }
  .empty__title { margin: 0; font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); }
  .empty__body { margin: 0; max-width: 52ch; color: var(--text-2); font-size: var(--fs-sm); line-height: var(--lh-normal); }
  .empty__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; justify-content: center; margin-top: var(--space-3); }
</style>
