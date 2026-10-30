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
  /* Empty, end-of-list and error states: centred, plain, with one next action. */
  .notice {
    max-width: var(--container-sm);
    margin: var(--space-8) auto;
    padding: var(--space-8) var(--space-6);
    text-align: center;
    background: var(--surface-0);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-2xl);
  }

  .notice--error {
    border-color: var(--danger);
  }

  .notice--error .notice__title::before {
    content: "!";
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 auto var(--space-4);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-bold);
    color: var(--danger);
    border: 1.5px solid currentColor;
    border-radius: var(--radius-full);
  }

  .notice__title {
    margin: 0 0 var(--space-3);
    font-family: var(--font-display);
    font-size: var(--fs-2xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: balance;
  }

  .notice__body {
    margin: 0 auto;
    max-width: 48ch;
    color: var(--text-2);
    line-height: var(--lh-normal);
  }

  .notice__actions {
    margin-top: var(--space-6);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    gap: var(--space-3);
  }

  @media (max-width: 30rem) {
    .notice {
      padding: var(--space-7) var(--space-4);
    }
  }
</style>
