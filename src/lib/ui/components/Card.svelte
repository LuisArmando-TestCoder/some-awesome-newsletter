<!--
  Card: bordered surface that groups related content.
  Props:
    as?: 'div' | 'section' | 'article' | 'li' = 'div'
    padding?: 'none' | 'sm' | 'md' | 'lg' = 'md'
    interactive?: boolean = false   hover raise; only applies when href or onclick is set
    href?: string                   makes the card a link (the title becomes the link, its hit area covers the card)
    onclick?: (event: MouseEvent) => void   makes the card a button (same pattern as href)
    title?: string                  heading text
    headingLevel?: 2 | 3 | 4 | 5 | 6 = 3
    description?: string            one short line under the title
    header?: Snippet                replaces the default title block
    footer?: Snippet                actions or meta, separated by a divider
    children?: Snippet              body
    ...rest                         spread onto the root element
  Usage:
    <Card title="Weekly digest" description="Sent every Monday" href="/issues/42" interactive>
      <p>Open rate 48%</p>
    </Card>
  Note: with href or onclick, keep other buttons and links out of the body (they sit under the link area).
  Footer content stays clickable, so put secondary actions there.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLElement>, 'title' | 'onclick'> {
    as?: 'div' | 'section' | 'article' | 'li';
    padding?: 'none' | 'sm' | 'md' | 'lg';
    interactive?: boolean;
    href?: string;
    onclick?: (event: MouseEvent) => void;
    title?: string;
    headingLevel?: 2 | 3 | 4 | 5 | 6;
    description?: string;
    header?: Snippet;
    footer?: Snippet;
    children?: Snippet;
  }

  let {
    as = 'div',
    padding = 'md',
    interactive = false,
    href,
    onclick,
    title,
    headingLevel = 3,
    description,
    header,
    footer,
    children,
    class: className = '',
    ...rest
  }: Props = $props();

  const actionable = $derived(href !== undefined || onclick !== undefined);
  const raised = $derived(interactive && actionable);
</script>

<svelte:element
  this={as}
  class="card card--pad-{padding} {className}"
  class:card--actionable={actionable}
  class:card--raised={raised}
  {...rest}
>
  {#if header}
    <div class="card__header">{@render header()}</div>
  {:else if title || description}
    <div class="card__header">
      {#if title}
        <svelte:element this={`h${headingLevel}`} class="card__title">
          {#if href !== undefined}
            <a class="card__action" {href}>{title}</a>
          {:else if onclick}
            <button type="button" class="card__action" {onclick}>{title}</button>
          {:else}
            {title}
          {/if}
        </svelte:element>
      {/if}
      {#if description}<p class="card__description">{description}</p>{/if}
    </div>
  {/if}

  {#if children}
    {#if actionable && !title}
      {#if href !== undefined}
        <a class="card__body card__action card__action--block" {href}>{@render children()}</a>
      {:else}
        <button type="button" class="card__body card__action card__action--block" {onclick}>
          {@render children()}
        </button>
      {/if}
    {:else}
      <div class="card__body">{@render children()}</div>
    {/if}
  {/if}

  {#if footer}
    <div class="card__footer">{@render footer()}</div>
  {/if}
</svelte:element>

<style>
  .card {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    min-width: 0;
    border: 1px solid var(--border-1);
    border-radius: var(--radius-xl);
    background: var(--surface-0);
    color: var(--text-1);
    transition:
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out),
      border-color var(--t-out) var(--ease-out);
  }

  .card--pad-none {
    padding: 0;
  }
  .card--pad-sm {
    padding: var(--space-3);
  }
  .card--pad-md {
    padding: var(--card-pad);
  }
  .card--pad-lg {
    padding: var(--space-6);
  }

  .card__header {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .card__title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-snug);
    color: var(--text-1);
  }

  .card__description {
    margin: 0;
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .card__body {
    min-width: 0;
    font-size: var(--fs-md);
    line-height: var(--lh-normal);
    color: var(--text-2);
  }

  .card__footer {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2);
    margin-top: auto;
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-1);
  }

  /* Actionable: one real link or button whose hit area stretches over the whole card. */
  .card__action {
    color: inherit;
    font: inherit;
    text-align: inherit;
    text-decoration: none;
    background: none;
    border: 0;
    padding: 0;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
  }
  .card__action::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
  }
  .card__action--block {
    display: block;
    width: 100%;
  }
  .card__action:focus-visible {
    outline: none;
    box-shadow: none;
  }
  .card:has(.card__action:focus-visible) {
    box-shadow: var(--focus-ring);
  }
  .card__title .card__action {
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-decoration-color: transparent;
    text-underline-offset: 0.2em;
    transition: text-decoration-color var(--t-out) var(--ease-out);
  }
  .card__footer {
    position: relative;
    z-index: 1;
  }

  .card--actionable {
    cursor: pointer;
  }

  @media (hover: hover) and (pointer: fine) {
    .card--actionable:hover {
      border-color: var(--border-2);
      transition-duration: var(--t-in);
    }
    .card--actionable:hover .card__title .card__action {
      text-decoration-color: currentColor;
    }
    .card--raised:hover {
      transform: translateY(-2px);
      box-shadow: var(--shadow-2);
    }
  }
  .card:has(.card__action:active) {
    transform: scale(0.99);
    box-shadow: none;
    transition-duration: 60ms;
  }

  @media (forced-colors: active) {
    .card {
      border-color: CanvasText;
    }
    .card:has(.card__action:focus-visible) {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .card--raised:hover,
    .card:has(.card__action:active) {
      transform: none;
    }
  }
</style>
