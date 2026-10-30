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
    loading?: boolean = false  blocks repeat clicks at once, keeps its width; the spinner appears
                               only after 350 ms and then stays at least 500 ms (no flash)
    loadingLabel?: string = 'Loading'   announced politely while busy ("Saving")
    disabled?: boolean = false rendered as aria-disabled: stays focusable so people can learn why
    disabledReason?: string    says why it is unavailable ("Add a source first"); read by screen
                               readers and shown as a tooltip
    roll?: boolean             text-roll hover; on by default for primary
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
    disabledReason?: string;
    roll?: boolean;
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
    disabledReason,
    roll,
    fullWidth = false,
    iconStart,
    iconEnd,
    children,
    onclick,
    class: className = '',
    ...rest
  }: Props = $props();

  // Pending UI: block repeats right away, but only show the spinner after SHOW_DELAY,
  // then keep it at least MIN_VISIBLE so fast responses never flash.
  const SHOW_DELAY = 350;
  const MIN_VISIBLE = 500;
  let showSpinner = $state(false);
  let shownAt = 0;
  $effect(() => {
    if (loading) {
      const timer = setTimeout(() => {
        showSpinner = true;
        shownAt = performance.now();
      }, SHOW_DELAY);
      return () => clearTimeout(timer);
    }
    if (showSpinner) {
      const left = Math.max(0, MIN_VISIBLE - (performance.now() - shownAt));
      const timer = setTimeout(() => (showSpinner = false), left);
      return () => clearTimeout(timer);
    }
  });

  const uid = $props.id();
  const reasonId = `${uid}-why`;
  const busy = $derived(loading || showSpinner);
  const inactive = $derived(disabled || busy);
  const rolls = $derived((roll ?? variant === 'primary') && size !== 'sm');
  const classes = $derived(
    `button button--${variant} button--${size}${fullWidth ? ' button--full' : ''}${showSpinner ? ' is-loading' : ''}${busy ? ' is-busy' : ''}${disabled ? ' is-disabled' : ''}${rolls ? ' button--roll' : ''} ${className}`
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
    {#if children}
      {#if rolls}
        <span class="button__label button__roll">
          <span class="button__roll-a">{@render children()}</span>
          <span class="button__roll-b" aria-hidden="true">{@render children()}</span>
        </span>
      {:else}
        <span class="button__label">{@render children()}</span>
      {/if}
    {/if}
    {#if iconEnd}<span class="button__icon" aria-hidden="true">{@render iconEnd()}</span>{/if}
  </span>
  {#if showSpinner}
    <span class="button__spinner"><Spinner size={size === 'lg' ? 'md' : 'sm'} label={loadingLabel} announce /></span>
  {/if}
  {#if disabled && disabledReason}
    <span id={reasonId} class="sr-only">{disabledReason}</span>
  {/if}
{/snippet}

{#if href !== undefined}
  <a
    class={classes}
    href={disabled ? undefined : href}
    role={disabled ? 'link' : undefined}
    aria-disabled={inactive ? 'true' : undefined}
    aria-busy={busy ? 'true' : undefined}
    aria-describedby={disabled && disabledReason ? reasonId : undefined}
    title={disabled && disabledReason ? disabledReason : undefined}
    tabindex={disabled ? 0 : undefined}
    onclick={handleClick}
    {...rest}
  >
    {@render content()}
  </a>
{:else}
  <!-- aria-disabled instead of disabled: still focusable, so keyboard and screen reader users
       can reach it and hear why. handleClick blocks activation (Enter, Space, form submit). -->
  <button
    class={classes}
    {type}
    aria-disabled={inactive ? 'true' : undefined}
    aria-busy={busy ? 'true' : undefined}
    aria-describedby={disabled && disabledReason ? reasonId : undefined}
    title={disabled && disabledReason ? disabledReason : undefined}
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
    border-radius: var(--radius-full);
    background: transparent;
    color: var(--text-1);
    font-family: var(--font-body);
    font-size: var(--_fs);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    letter-spacing: -0.01em;
    text-decoration: none;
    white-space: nowrap;
    cursor: pointer;
    user-select: none;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--dur-fast) var(--ease-out),
      border-color var(--dur-fast) var(--ease-out),
      color var(--dur-fast) var(--ease-out),
      box-shadow var(--dur-fast) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
  }

  /* State layer: content color over the fill (hover 8%, focus 10%, pressed 12%). */
  .button::before {
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
    .button:hover:not([aria-disabled='true'])::before {
      opacity: 0.08;
      transition-duration: var(--t-in);
    }
  }
  .button:focus-visible:not([aria-disabled='true'])::before {
    opacity: 0.1;
  }
  .button:active:not([aria-disabled='true'])::before {
    opacity: 0.12;
    transition-duration: 0ms;
  }
  .button--tertiary::before {
    display: none;
  }

  /* Pressed: scale lands instantly, eases back out. */
  .button:active:not([aria-disabled='true'], .button--tertiary) {
    transform: scale(0.97);
    transition-duration: 60ms;
  }

  /* Text roll on hover: the label slides up and its copy rolls in (copy is aria-hidden). */
  .button__roll {
    display: inline-grid;
    overflow: clip;
    overflow-clip-margin: 0.1em;
  }
  .button__roll > span {
    grid-area: 1 / 1;
    transition: translate var(--dur-slow) var(--ease-out);
  }
  .button__roll-b {
    translate: 0 110%;
  }
  @media (hover: hover) and (pointer: fine) {
    .button--roll:hover:not([aria-disabled='true']) .button__roll-a {
      translate: 0 -110%;
    }
    .button--roll:hover:not([aria-disabled='true']) .button__roll-b {
      translate: 0 0;
    }
  }

  /* The trailing icon nudges on hover. */
  .button__icon:last-child {
    transition: transform var(--dur-base) var(--ease-out);
  }
  @media (hover: hover) {
    .button:hover:not([aria-disabled='true']) .button__content > .button__icon:last-child:not(:first-child) {
      transform: translateX(3px);
    }
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
    --_h: calc(var(--control-h) + var(--space-3)); /* 56px */
    --_px: var(--space-6);
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
  }
  .button--primary:hover:not([aria-disabled='true']) {
    background: var(--accent-hover);
  }

  /* Secondary */
  .button--secondary {
    background: var(--surface-1);
    border-color: var(--border-2);
    color: var(--text-1);
  }
  .button--secondary:hover:not([aria-disabled='true']) {
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
  .button--tertiary:hover:not([aria-disabled='true']) {
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
  .button--danger:hover:not([aria-disabled='true']) {
    background: var(--danger-hover);
  }

  /* Ghost */
  .button--ghost {
    color: var(--text-2);
  }
  .button--ghost:hover:not([aria-disabled='true']) {
    background: var(--surface-2);
    color: var(--text-1);
  }

  .button--primary:active:not([aria-disabled='true']),
  .button--danger:active:not([aria-disabled='true']) {
    box-shadow: none;
  }
  .button--secondary:active:not([aria-disabled='true']),
  .button--ghost:active:not([aria-disabled='true']) {
    background: var(--surface-3);
  }

  .button:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }

  /* Busy: blocks repeats, keeps focus, no hover or press feedback. */
  .is-busy {
    cursor: progress;
  }

  /* Unavailable: readable label, muted container, no hover or press. Still focusable. */
  .is-disabled:not(.is-loading) {
    cursor: not-allowed;
    opacity: var(--disabled-opacity);
    box-shadow: none;
  }

  @media (forced-colors: active) {
    .button {
      border-color: ButtonText;
    }
    .button:focus-visible {
      outline: 2px solid CanvasText;
      outline-offset: 2px;
    }
    .is-disabled {
      color: GrayText;
      border-color: GrayText;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .button:active {
      transform: none;
    }
    .button__roll > span {
      transition: none;
    }
  }
</style>
