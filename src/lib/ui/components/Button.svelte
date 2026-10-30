<!--
  Button: the single button style set for AIBAN. Use one primary action per view.
  Props:
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost' = 'primary'
      primary   solid accent, the main action
      secondary outlined surface, the alternative action
      tertiary  text link look, low emphasis (still at least 24px tall)
      danger    solid danger, destructive actions only
      ghost     transparent, for toolbars and dense rows
    size?: 'sm' | 'md' | 'lg' = 'md'
    type?: 'button' | 'submit' | 'reset' = 'button'
    href?: string              renders an <a> with the same look
    loading?: boolean = false  shows a spinner, sets aria-busy, ignores clicks, keeps its width
    loadingLabel?: string = 'Loading'   screen reader text for the spinner
    disabled?: boolean = false
    fullWidth?: boolean = false
    iconStart?: Snippet
    iconEnd?: Snippet
    children?: Snippet         the label
    onclick?: (event: MouseEvent) => void
    ...rest                    spread onto the <button> or <a>
  Usage:
    <Button onclick={save} loading={saving}>Save changes</Button>
    <Button variant="tertiary" href="/settings">Open settings</Button>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
  import Spinner from './Spinner.svelte';

  type Shared = Omit<HTMLButtonAttributes & HTMLAnchorAttributes, 'type' | 'href' | 'children' | 'onclick' | 'disabled'>;

  interface Props extends Shared {
    variant?: 'primary' | 'secondary' | 'tertiary' | 'danger' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    href?: string;
    loading?: boolean;
    loadingLabel?: string;
    disabled?: boolean;
    fullWidth?: boolean;
    iconStart?: Snippet;
    iconEnd?: Snippet;
    children?: Snippet;
    onclick?: (event: MouseEvent) => void;
  }

  let {
    variant = 'primary',
    size = 'md',
    type = 'button',
    href,
    loading = false,
    loadingLabel = 'Loading',
    disabled = false,
    fullWidth = false,
    iconStart,
    iconEnd,
    children,
    onclick,
    class: className = '',
    ...rest
  }: Props = $props();

  const inactive = $derived(disabled || loading);
  const classes = $derived(
    `button button--${variant} button--${size}${fullWidth ? ' button--full' : ''}${loading ? ' is-loading' : ''} ${className}`
  );

  function handleClick(event: MouseEvent) {
    if (inactive) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onclick?.(event);
  }
</script>

{#snippet content()}
  <span class="button__content">
    {#if iconStart}<span class="button__icon" aria-hidden="true">{@render iconStart()}</span>{/if}
    {#if children}<span class="button__label">{@render children()}</span>{/if}
    {#if iconEnd}<span class="button__icon" aria-hidden="true">{@render iconEnd()}</span>{/if}
  </span>
  {#if loading}
    <span class="button__spinner"><Spinner size={size === 'lg' ? 'md' : 'sm'} label={loadingLabel} /></span>
  {/if}
{/snippet}

{#if href !== undefined}
  <a
    class={classes}
    href={disabled ? undefined : href}
    role={disabled ? 'link' : undefined}
    aria-disabled={inactive ? 'true' : undefined}
    aria-busy={loading ? 'true' : undefined}
    onclick={handleClick}
    {...rest}
  >
    {@render content()}
  </a>
{:else}
  <button
    class={classes}
    {type}
    disabled={disabled}
    aria-disabled={loading ? 'true' : undefined}
    aria-busy={loading ? 'true' : undefined}
    onclick={handleClick}
    {...rest}
  >
    {@render content()}
  </button>
{/if}

<style>
  .button {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
    height: var(--_h);
    min-height: var(--_h);
    padding: 0 var(--_px);
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--_fs);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-tight);
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out);
  }

  .button--sm {
    --_h: var(--control-h-sm);
    --_px: var(--space-3);
    --_fs: var(--fs-sm);
  }
  .button--md {
    --_h: var(--control-h);
    --_px: var(--control-pad-x);
    --_fs: var(--fs-sm);
  }
  .button--lg {
    --_h: calc(var(--control-h) + var(--space-2));
    --_px: var(--space-5);
    --_fs: var(--fs-md);
  }

  .button--full {
    display: flex;
    width: 100%;
  }

  .button__content {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .button__label {
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .button__icon {
    display: inline-flex;
    flex-shrink: 0;
    width: 1.125em;
    height: 1.125em;
  }
  .button__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  /* Loading keeps the label in place (no width change) and shows the spinner on top. */
  .is-loading {
    cursor: progress;
  }
  .is-loading .button__content {
    visibility: hidden;
  }
  .button__spinner {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  /* Primary */
  .button--primary {
    background: var(--accent);
    color: var(--accent-contrast);
    box-shadow: var(--shadow-1);
  }
  .button--primary:hover:not(:disabled, [aria-disabled='true']) {
    background: var(--accent-hover);
  }

  /* Secondary */
  .button--secondary {
    background: var(--surface-1);
    border-color: var(--border-2);
    color: var(--text-1);
  }
  .button--secondary:hover:not(:disabled, [aria-disabled='true']) {
    background: var(--surface-2);
  }

  /* Tertiary: reads as a text link */
  .button--tertiary {
    height: auto;
    min-height: 1.5rem;
    padding: 0 var(--space-1);
    color: var(--text-link);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
    text-decoration-color: transparent;
  }
  .button--tertiary:hover:not(:disabled, [aria-disabled='true']) {
    text-decoration-color: currentColor;
  }
  a.button--tertiary {
    text-decoration-color: currentColor;
  }
  a.button--tertiary:hover:not([aria-disabled='true']) {
    text-decoration-thickness: 2px;
  }

  /* Danger */
  .button--danger {
    background: var(--danger);
    color: var(--accent-contrast);
    box-shadow: var(--shadow-1);
  }
  .button--danger:hover:not(:disabled, [aria-disabled='true']) {
    background: var(--danger-hover);
  }

  /* Ghost */
  .button--ghost {
    color: var(--text-2);
  }
  .button--ghost:hover:not(:disabled, [aria-disabled='true']) {
    background: var(--surface-2);
    color: var(--text-1);
  }

  .button--primary:active:not(:disabled, [aria-disabled='true']),
  .button--danger:active:not(:disabled, [aria-disabled='true']) {
    box-shadow: none;
  }
  .button--secondary:active:not(:disabled, [aria-disabled='true']),
  .button--ghost:active:not(:disabled, [aria-disabled='true']) {
    background: var(--surface-3);
  }

  .button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .button:disabled:not(.is-loading),
  a.button[aria-disabled='true']:not(.is-loading) {
    cursor: not-allowed;
    opacity: 0.5;
    box-shadow: none;
  }
</style>
