<!-- WS4. Run status shown as a dot and a plain word. -->
<script lang="ts">
  export let status: "ok" | "partial" | "failed" | "skipped" | "running" | "queued" | "off" | "on" | "none" = "none";
  export let label: string;
  const tone: Record<string, string> = { ok: "success", on: "success", partial: "warning", failed: "danger", skipped: "neutral", running: "info", queued: "info", off: "neutral", none: "neutral" };
</script>

<span class="pill {tone[status] ?? 'neutral'}"><span class="dot" aria-hidden="true"></span>{label}</span>

<style lang="scss">
  .pill {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 1.5rem;
    padding: 0 var(--space-2);
    line-height: var(--lh-tight);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    background: var(--surface-2);
    color: var(--text-2);
    white-space: nowrap;
  }
  .dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--text-3); }
  .success { background: var(--success-soft); color: var(--text-1); .dot { background: var(--success); } }
  .warning { background: var(--warning-soft); color: var(--text-1); .dot { background: var(--warning); } }
  .danger { background: var(--danger-soft); color: var(--text-1); .dot { background: var(--danger); } }
  .info { background: var(--info-soft); color: var(--text-1); .dot { background: var(--info); } }
  /* Status reads from the word; the dot only supports it. Forced colors keep an outline. */
  @media (forced-colors: active) {
    .pill { border: 1px solid CanvasText; }
    .dot { forced-color-adjust: none; background: CanvasText; }
  }
</style>
