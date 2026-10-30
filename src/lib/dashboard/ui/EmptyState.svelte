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
    border-radius: var(--radius-xl);
    background: var(--surface-1);
    &.compact { padding: var(--space-5) var(--space-4); }
  }
  .empty__icon {
    display: grid;
    place-items: center;
    width: 52px;
    height: 52px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border-1);
    background: var(--surface-0);
    color: var(--text-1);
    margin-bottom: var(--space-2);
    .compact & { width: 40px; height: 40px; }
  }
  .empty__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    .compact & { font-size: var(--fs-md); }
  }
  .empty__body { margin: 0; max-width: 52ch; color: var(--text-2); font-size: var(--fs-sm); line-height: var(--lh-normal); }
  .empty__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; justify-content: center; margin-top: var(--space-3); }
</style>
