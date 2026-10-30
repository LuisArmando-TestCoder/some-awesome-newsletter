<!--
  IconButton: square button that shows only an icon. The label is its accessible name and its tooltip.
  Props:
    label: string                        required; used as aria-label and tooltip text
    icon?: Snippet                       the icon (inline SVG, aria-hidden is set by the wrapper)
    children?: Snippet                   alternative to icon
    variant?: 'ghost' | 'secondary' = 'ghost'
    size?: 'sm' | 'md' | 'lg' = 'md'
    type?: 'button' | 'submit' | 'reset' = 'button'
    disabled?: boolean = false
    tooltip?: boolean = true             set false to hide the visual tooltip (label still applies)
    tooltipPlacement?: 'top' | 'bottom' = 'top'
    onclick?: (event: MouseEvent) => void
    ...rest                              spread onto the <button>
  Usage:
    <IconButton label="Close panel" onclick={close}>
      {#snippet icon()}<svg viewBox="0 0 24 24">...</svg>{/snippet}
    </IconButton>
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLButtonAttributes } from 'svelte/elements';
  import Tooltip from './Tooltip.svelte';

  interface Props extends Omit<HTMLButtonAttributes, 'children' | 'type'> {
    label: string;
    icon?: Snippet;
    children?: Snippet;
    variant?: 'ghost' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    tooltip?: boolean;
    tooltipPlacement?: 'top' | 'bottom';
  }

  let {
    label,
    icon,
    children,
    variant = 'ghost',
    size = 'md',
    type = 'button',
    disabled = false,
    tooltip = true,
    tooltipPlacement = 'top',
    class: className = '',
    ...rest
  }: Props = $props();
</script>

{#snippet button()}
  <button
    {type}
    {disabled}
    aria-label={label}
    class="icon-button icon-button--{variant} icon-button--{size} {className}"
    {...rest}
  >
    <span class="icon-button__icon" aria-hidden="true">
      {#if icon}{@render icon()}{:else}{@render children?.()}{/if}
    </span>
  </button>
{/snippet}

{#if tooltip && !disabled}
  <Tooltip text={label} placement={tooltipPlacement}>
    {#snippet children()}{@render button()}{/snippet}
  </Tooltip>
{:else}
  {@render button()}
{/if}

<style>
  .icon-button {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    width: var(--_box);
    height: var(--_box);
    min-width: 2.25rem;
    min-height: 2.25rem;
    padding: 0;
    border: 1px solid transparent;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out);
  }

  .icon-button--sm {
    --_box: 2.25rem;
    --_icon: 1rem;
  }
  .icon-button--md {
    --_box: var(--control-h);
    --_icon: 1.25rem;
  }
  .icon-button--lg {
    --_box: 3rem;
    --_icon: 1.5rem;
  }

  .icon-button__icon {
    display: inline-flex;
    width: var(--_icon);
    height: var(--_icon);
  }
  .icon-button__icon :global(svg) {
    width: 100%;
    height: 100%;
  }

  .icon-button--ghost:hover:not(:disabled) {
    background: var(--surface-2);
    color: var(--text-1);
  }

  .icon-button--secondary {
    background: var(--surface-1);
    border-color: var(--border-2);
    color: var(--text-1);
  }
  .icon-button--secondary:hover:not(:disabled) {
    background: var(--surface-2);
  }

  .icon-button:active:not(:disabled) {
    background: var(--surface-3);
  }

  .icon-button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .icon-button:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
</style>
