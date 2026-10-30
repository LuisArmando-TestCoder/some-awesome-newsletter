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
    <a class="btn-tertiary" href={secondaryHref}>{secondaryLabel} <span aria-hidden="true">&rarr;</span></a>
  {/if}

  {#if $$slots.default}
    <div class="empty-preview" aria-hidden="true" inert><slot /></div>
  {/if}
</div>

<style>
  /* Empty state that teaches one next action: an outlined icon, one sentence, one ink pill. */
  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 32rem;
    margin: 0 auto;
    padding: var(--space-8) var(--space-4);
    text-align: center;
    font-family: var(--font-body);
  }

  .empty-icon {
    display: grid;
    place-items: center;
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-1);
  }

  .empty-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: balance;
  }

  .empty-body {
    margin: var(--space-3) 0 0;
    max-width: 44ch;
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-2);
    text-wrap: pretty;
  }

  .empty-actions {
    margin-top: var(--space-6);
  }

  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-height: var(--control-h);
    padding: 0 var(--space-6);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    background: var(--accent);
    color: var(--accent-contrast);
    font-family: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    cursor: pointer;
    box-shadow: none;
    transition:
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .btn-primary:hover {
      background: var(--accent-hover);
      box-shadow: none;
      transition-duration: var(--t-in);
    }
  }

  .btn-primary:active {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  .btn-tertiary {
    display: inline-flex;
    align-items: center;
    gap: var(--space-1);
    min-height: var(--control-h);
    margin-top: var(--space-2);
    padding: 0 var(--space-2);
    border-radius: var(--radius-sm);
    color: var(--text-1);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: underline;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
  }

  .btn-tertiary span {
    display: inline-block;
    transition: transform var(--dur-base) var(--ease-out);
  }

  @media (hover: hover) and (pointer: fine) {
    .btn-tertiary:hover {
      text-decoration-color: currentColor;
    }
    .btn-tertiary:hover span {
      transform: translateX(3px);
    }
  }

  .btn-primary:focus-visible,
  .btn-tertiary:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /* A faded example of what will appear here. Inert, so it cannot be clicked or focused. */
  .empty-preview {
    width: 100%;
    margin-top: var(--space-7);
    opacity: 0.5;
    user-select: none;
    mask-image: linear-gradient(to bottom, currentColor 40%, transparent);
  }

  @media (prefers-reduced-motion: reduce) {
    .btn-primary,
    .btn-tertiary span {
      transition: none;
    }
    .btn-primary:active {
      transform: none;
    }
  }
</style>
