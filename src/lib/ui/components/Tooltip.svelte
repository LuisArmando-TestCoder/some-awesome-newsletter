<!--
  Tooltip: short hint shown on hover and keyboard focus. Hides on Escape. Text only, no links or buttons inside.
  Props:
    text: string                       the hint (short, plain sentence case)
    placement?: 'top' | 'bottom' = 'top'
    children?: Snippet<[{ describedBy: string }]>
                                       the trigger; set aria-describedby={describedBy} on the focusable element
    ...rest                            spread onto the wrapper <span>
  Usage:
    <Tooltip text="Opens in a new tab">
      {#snippet children({ describedBy })}
        <a href="/help" target="_blank" aria-describedby={describedBy}>Help</a>
      {/snippet}
    </Tooltip>
  Note: if the trigger has no visible text (icon only), give it aria-label instead and skip describedBy,
  or use IconButton, which does this for you.
-->
<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, 'children'> {
    text: string;
    placement?: 'top' | 'bottom';
    children?: Snippet<[{ describedBy: string }]>;
  }

  let { text, placement = 'top', children, class: className = '', ...rest }: Props = $props();

  const id = $props.id();
  const tipId = `tooltip-${id}`;

  let wrapper: HTMLSpanElement | undefined = $state();
  let dismissed = $state(false);

  $effect(() => {
    const el = wrapper;
    if (!el) return;

    const reset = () => (dismissed = false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== 'Escape' || dismissed) return;
      const active = document.activeElement;
      if (el.matches(':hover') || (active && el.contains(active))) dismissed = true;
    };

    el.addEventListener('mouseenter', reset);
    el.addEventListener('mouseleave', reset);
    el.addEventListener('focusin', reset);
    el.addEventListener('focusout', reset);
    document.addEventListener('keydown', onKey);

    return () => {
      el.removeEventListener('mouseenter', reset);
      el.removeEventListener('mouseleave', reset);
      el.removeEventListener('focusin', reset);
      el.removeEventListener('focusout', reset);
      document.removeEventListener('keydown', onKey);
    };
  });
</script>

<span
  bind:this={wrapper}
  class="tooltip tooltip--{placement} {className}"
  class:is-dismissed={dismissed}
  {...rest}
>
  {@render children?.({ describedBy: tipId })}
  <span id={tipId} role="tooltip" class="tooltip__bubble">{text}</span>
</span>

<style>
  .tooltip {
    position: relative;
    display: inline-flex;
    vertical-align: middle;
  }

  .tooltip__bubble {
    position: absolute;
    left: 50%;
    z-index: var(--z-tooltip);
    width: max-content;
    max-width: 16rem;
    padding: var(--space-1) var(--space-3);
    border-radius: var(--radius-md);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    box-shadow: var(--shadow-2);
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    line-height: var(--lh-snug);
    text-align: center;
    white-space: normal;
    opacity: 0;
    visibility: hidden;
    pointer-events: none;
    transform: translate(-50%, var(--_from, 0));
    transition:
      opacity var(--t-out) var(--ease-out),
      transform var(--t-out) var(--ease-out),
      visibility 0s linear var(--t-out);
  }

  /* Invisible bridge so the pointer can move onto the bubble without it closing (WCAG 1.4.13). */
  .tooltip__bubble::before {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    height: var(--space-2);
  }

  .tooltip--top .tooltip__bubble {
    bottom: calc(100% + var(--space-2));
    --_from: 0.25rem;
  }
  .tooltip--top .tooltip__bubble::before {
    top: 100%;
  }

  .tooltip--bottom .tooltip__bubble {
    top: calc(100% + var(--space-2));
    --_from: -0.25rem;
  }
  .tooltip--bottom .tooltip__bubble::before {
    bottom: 100%;
  }

  /* Pointer: a short intent delay so passing over does not flash it. Keyboard: at once. */
  @media (hover: hover) and (pointer: fine) {
    .tooltip:hover .tooltip__bubble {
      opacity: 1;
      visibility: visible;
      pointer-events: auto;
      transform: translate(-50%, 0);
      transition:
        opacity var(--t-in) var(--ease-out) 300ms,
        transform var(--t-in) var(--ease-out) 300ms,
        visibility 0s linear 300ms;
    }
  }
  .tooltip:has(:focus-visible) .tooltip__bubble {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
    transform: translate(-50%, 0);
    transition:
      opacity var(--t-in) var(--ease-out),
      transform var(--t-in) var(--ease-out),
      visibility 0s;
  }

  .tooltip.is-dismissed .tooltip__bubble {
    opacity: 0;
    visibility: hidden;
  }

  @media (forced-colors: active) {
    .tooltip__bubble {
      border: 1px solid CanvasText;
    }
  }
</style>
