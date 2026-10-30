<!-- WS4. Inline message. tone: info | success | warning | danger. Announced to screen readers. -->
<script lang="ts">
  import Icon from "./Icon.svelte";
  export let tone: "info" | "success" | "warning" | "danger" = "info";
  export let title: string | null = null;
  const icons = { info: "info", success: "check", warning: "alert", danger: "alert" };
</script>

<div class="notice {tone}" role={tone === "danger" ? "alert" : "status"}>
  <span class="notice__icon"><Icon name={icons[tone]} size={18} /></span>
  <div class="notice__body">
    {#if title}<p class="notice__title">{title}</p>{/if}
    <div class="notice__text"><slot /></div>
  </div>
  {#if $$slots.actions}<div class="notice__actions"><slot name="actions" /></div>{/if}
</div>

<style lang="scss">
  .notice {
    display: flex;
    gap: var(--space-3);
    align-items: flex-start;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-lg);
    border: 1px solid var(--border-1);
    background: var(--surface-0);
    color: var(--text-1);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    flex-wrap: wrap;
  }
  .info { background: var(--info-soft); border-color: var(--info); .notice__icon { color: var(--info); } }
  .success { background: var(--success-soft); border-color: var(--success); .notice__icon { color: var(--success); } }
  .warning { background: var(--warning-soft); border-color: var(--warning); .notice__icon { color: var(--warning); } }
  .danger { background: var(--danger-soft); border-color: var(--danger); .notice__icon { color: var(--danger); } }
  .notice__icon { padding-top: 2px; }
  .notice__body { flex: 1 1 220px; min-width: 0; }
  .notice__title { margin: 0 0 var(--space-1); font-weight: var(--fw-semibold); }
  .notice__text :global(p) { margin: 0; }
  .notice__actions { display: flex; gap: var(--space-2); align-items: center; flex-wrap: wrap; }
  @media (forced-colors: active) {
    .notice { border-color: CanvasText; }
  }
</style>
