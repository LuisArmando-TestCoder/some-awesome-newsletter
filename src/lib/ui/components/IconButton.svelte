<!--
  IconButton: round button that shows only an icon. The label is its accessible name and its tooltip.
  Props:
    label: string                        required; used as aria-label and tooltip text
    icon?: Snippet                       the icon (inline SVG, aria-hidden is set by the wrapper)
    children?: Snippet                   alternative to icon
    variant?: 'ghost' | 'secondary' = 'ghost'
    size?: 'sm' | 'md' | 'lg' = 'md'
    type?: 'button' | 'submit' | 'reset' = 'button'
    disabled?: boolean = false           rendered as aria-disabled: stays focusable so people can learn why
    disabledReason?: string              why it is unavailable; read by screen readers and shown as the tooltip
    tooltip?: boolean = true             set false to hide the visual tooltip (label still applies)
    tooltipPlacement?: 'top' | 'bottom' = 'top'
    onclick?: (event: MouseEvent) => void
    ...rest                              spread onto the <button>; pass aria-pressed for toggles
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
    disabledReason?: string;
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
    disabledReason,
    tooltip = true,
    tooltipPlacement = 'top',
    onclick,
    class: className = '',
    ...rest
  }: Props = $props();

  const uid = $props.id();
  const reasonId = `${uid}-why`;

  // aria-disabled keeps the button reachable; activation (click, Enter, Space, submit) is blocked here.
  function handleClick(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
    if (disabled) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    onclick?.(event);
  }
</script>

{#snippet button()}
  <button
    {type}
    aria-label={label}
    aria-disabled={disabled ? 'true' : undefined}
    aria-describedby={disabled && disabledReason ? reasonId : undefined}
    class="icon-button icon-button--{variant} icon-button--{size} {className}"
    class:is-disabled={disabled}
    onclick={handleClick}
    {...rest}
  >
    <span class="icon-button__icon" aria-hidden="true">
      {#if icon}{@render icon()}{:else}{@render children?.()}{/if}
    </span>
    {#if disabled && disabledReason}<span id={reasonId} class="sr-only">{disabledReason}</span>{/if}
  </button>
{/snippet}

{#if tooltip && (!disabled || disabledReason)}
  <Tooltip text={disabled && disabledReason ? disabledReason : label} placement={tooltipPlacement}>
    {@render button()}
  </Tooltip>
{:else}
  {@render button()}
{/if}

<style>
  .icon-button {
    position: relative;
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
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-2);
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  /* State layer: hover 8%, focus 10%, pressed 12% of the content color. */
  .icon-button::before {
    content: '';
    position: absolute;
    inset: -1px;
    border-radius: inherit;
    background: currentColor;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .icon-button:hover:not([aria-disabled='true']) {
      color: var(--text-1);
      transition-duration: var(--t-in);
    }
    .icon-button:hover:not([aria-disabled='true'])::before {
      opacity: 0.08;
      transition-duration: var(--t-in);
    }
    .icon-button--secondary:hover:not([aria-disabled='true']) {
      border-color: var(--text-2);
    }
  }
  .icon-button:focus-visible:not([aria-disabled='true'])::before {
    opacity: 0.1;
  }
  .icon-button:active:not([aria-disabled='true'])::before {
    opacity: 0.12;
    transition-duration: 0ms;
  }
  .icon-button:active:not([aria-disabled='true']) {
    transform: scale(0.94);
    transition-duration: 60ms;
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

  .icon-button--secondary {
    background: var(--surface-0);
    border-color: var(--border-2);
    color: var(--text-1);
  }

  /* Toggle on: filled ink chip, never color alone (fill + contrast swap). */
  .icon-button:is([aria-pressed='true'], [aria-expanded='true'], [aria-current]:not([aria-current='false'])) {
    background: var(--text-1);
    border-color: var(--text-1);
    color: var(--surface-0);
  }

  .icon-button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  .icon-button.is-disabled {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
  }

  @media (forced-colors: active) {
    .icon-button {
      border-color: ButtonText;
    }
    .icon-button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .icon-button:is([aria-pressed='true'], [aria-expanded='true']) {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }
    .icon-button.is-disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .icon-button:active {
      transform: none;
    }
  }
</style>
