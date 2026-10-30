<script lang="ts">
  import type { Snippet } from "svelte";

  interface Props {
    title: string;
    body?: string;
    tone?: "neutral" | "error";
    headingLevel?: 1 | 2;
    children?: Snippet;
  }

  let { title, body = "", tone = "neutral", headingLevel = 2, children }: Props = $props();
</script>

<div class="notice notice--{tone}" role={tone === "error" ? "alert" : undefined}>
  <svelte:element this={`h${headingLevel}`} class="notice__title">{title}</svelte:element>
  {#if body}<p class="notice__body">{body}</p>{/if}
  {#if children}<div class="notice__actions">{@render children()}</div>{/if}
</div>

<style lang="scss">
  .notice {
    max-width: var(--container-sm, 640px);
    margin: var(--space-7, 48px) auto;
    padding: var(--space-7, 48px) var(--space-6, 32px);
    text-align: center;
    background: var(--surface-1, #fff);
    border: 1px dashed var(--border-2, #ccc);
    border-radius: var(--radius-xl, 24px);
  }

  .notice--error {
    border-style: solid;
    border-color: var(--danger, #b91c1c);
    background: var(--danger-soft, var(--surface-1, #fff));
  }

  .notice__title {
    margin: 0 0 var(--space-2, 8px);
    font-family: var(--font-display, inherit);
    font-size: var(--fs-xl, 1.375rem);
    font-weight: var(--fw-bold, 700);
    line-height: var(--lh-tight, 1.2);
    color: var(--text-1, #111);
  }

  .notice__body {
    margin: 0 auto;
    max-width: 48ch;
    color: var(--text-2, #444);
    line-height: var(--lh-normal, 1.55);
  }

  .notice__actions {
    margin-top: var(--space-5, 24px);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-3, 12px);
  }
</style>
