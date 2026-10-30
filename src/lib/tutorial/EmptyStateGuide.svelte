<script lang="ts">
  import { createEventDispatcher } from "svelte";

  /** One sentence that says what is missing. */
  export let title: string;
  /** Optional one sentence that says what happens once the user acts. */
  export let body: string | undefined = undefined;
  export let actionLabel: string | undefined = undefined;
  export let actionHref: string | undefined = undefined;
  export let onAction: (() => void) | undefined = undefined;
  export let secondaryLabel: string | undefined = undefined;
  export let secondaryHref: string | undefined = undefined;
  /** Heading level for the title, so the empty state fits the page outline. */
  export let headingLevel: 2 | 3 | 4 = 3;

  const dispatch = createEventDispatcher<{ action: void }>();

  function runAction() {
    onAction?.();
    dispatch("action");
  }
</script>

<div class="empty-state">
  {#if $$slots.icon}
    <div class="empty-icon" aria-hidden="true"><slot name="icon" /></div>
  {/if}

  <svelte:element this={`h${headingLevel}`} class="empty-title">{title}</svelte:element>
  {#if body}
    <p class="empty-body">{body}</p>
  {/if}

  {#if actionLabel && (actionHref || onAction)}
    <div class="empty-actions">
      {#if actionHref}
        <a class="btn-primary" href={actionHref} on:click={() => dispatch("action")}>{actionLabel}</a>
      {:else}
        <button type="button" class="btn-primary" on:click={runAction}>{actionLabel}</button>
      {/if}
    </div>
  {/if}

  {#if secondaryLabel && secondaryHref}
    <a class="btn-tertiary" href={secondaryHref}>{secondaryLabel}</a>
  {/if}

  {#if $$slots.default}
    <div class="empty-preview" aria-hidden="true"><slot /></div>
  {/if}
</div>

<style>
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 32rem;
    margin: 0 auto;
    padding: var(--space-7, 48px) var(--space-4, 16px);
    text-align: center;
    font-family: var(--font-body, inherit);
  }

  .empty-icon {
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    margin-bottom: var(--space-4, 16px);
    border-radius: var(--radius-lg, 12px);
    background: var(--accent-soft, #eef2ff);
    color: var(--accent, #4f46e5);
  }

  .empty-title {
    margin: 0;
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-semibold, 600);
    line-height: var(--lh-tight, 1.3);
    color: var(--text-1, #111827);
  }

  .empty-body {
    margin: var(--space-2, 8px) 0 0;
    font-size: var(--fs-sm, 0.875rem);
    line-height: var(--lh-normal, 1.55);
    color: var(--text-2, #374151);
  }

  .empty-actions {
    margin-top: var(--space-5, 24px);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: 44px;
    padding: 0 var(--space-5, 24px);
    border: 1px solid transparent;
    border-radius: var(--radius-md, 8px);
    background: var(--accent, #4f46e5);
    color: var(--accent-contrast, #fff);
    font-family: inherit;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-semibold, 600);
    text-decoration: none;
    cursor: pointer;
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }

  .btn-primary:hover {
    background: var(--accent-hover, #4338ca);
  }

  .btn-tertiary {
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    margin-top: var(--space-2, 8px);
    padding: 0 var(--space-2, 8px);
    border-radius: var(--radius-sm, 4px);
    color: var(--text-link, #4f46e5);
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    text-decoration: none;
  }

  .btn-tertiary:hover {
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .btn-primary:focus-visible,
  .btn-tertiary:focus-visible {
    outline: 2px solid var(--focus-color, #6366f1);
    outline-offset: 2px;
  }

  .empty-preview {
    width: 100%;
    margin-top: var(--space-6, 32px);
    opacity: 0.6;
    pointer-events: none;
    user-select: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-primary {
      transition: none;
    }
  }
</style>
