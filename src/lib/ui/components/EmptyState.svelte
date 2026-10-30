<!--
  EmptyState: shown when a list or view has nothing yet. Say what goes here and the next step.
  Props:
    title: string                  for example "No issues yet"
    description?: string           one or two plain sentences
    icon?: Snippet                 decorative illustration or icon (hidden from screen readers)
    actions?: Snippet              usually one primary Button and one tertiary link
    compact?: boolean = false      less padding, for use inside cards and panels
    headingLevel?: 2 | 3 | 4 = 2
    ...rest                        spread onto the root <div>
  Usage:
    <EmptyState title="No issues yet" description="Your first issue appears here after you send it.">
      {#snippet actions()}<Button href="/issues/new">Write an issue</Button>{/snippet}
    </EmptyState>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
    title: string;
    description?: string;
    icon?: Snippet;
    actions?: Snippet;
    compact?: boolean;
    headingLevel?: 2 | 3 | 4;
  }

  let {
    title,
    description,
    icon,
    actions,
    compact = false,
    headingLevel = 2,
    class: className = '',
    ...rest
  }: Props = $props();
</script>

<div class="empty {className}" class:empty--compact={compact} {...rest}>
  {#if icon}
    <div class="empty__icon" aria-hidden="true">{@render icon()}</div>
  {/if}
  <svelte:element this={`h${headingLevel}`} class="empty__title">{title}</svelte:element>
  {#if description}<p class="empty__description">{description}</p>{/if}
  {#if actions}
    <div class="empty__actions">{@render actions()}</div>
  {/if}
</div>

<style>
  .empty {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3);
    max-width: 32rem;
    margin-inline: auto;
    padding: var(--space-8) var(--space-5);
    text-align: center;
    color: var(--text-2);
  }

  .empty--compact {
    padding: var(--space-5) var(--space-4);
    gap: var(--space-2);
  }

  .empty__icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 3.5rem;
    height: 3.5rem;
    margin-bottom: var(--space-2);
    border-radius: var(--radius-full);
    background: var(--surface-2);
    color: var(--text-3);
  }
  .empty__icon :global(svg) {
    width: 1.75rem;
    height: 1.75rem;
  }
  .empty--compact .empty__icon {
    width: 2.75rem;
    height: 2.75rem;
  }

  .empty__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }
  .empty--compact .empty__title {
    font-size: var(--fs-lg);
  }

  .empty__description {
    margin: 0;
    max-width: var(--measure);
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
  }
  .empty--compact .empty__description {
    font-size: var(--fs-sm);
  }

  .empty__actions {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--space-3);
    margin-top: var(--space-2);
  }
</style>
