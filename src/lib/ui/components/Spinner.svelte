<!--
  Spinner: small ring that shows work in progress. Inherits color from its parent (currentColor).
  Props:
    size?: 'sm' | 'md' | 'lg' = 'md'
    label?: string = 'Loading'   visually hidden text for screen readers
    announce?: boolean = false   true adds role="status" so the label is announced (use when standalone)
    ...rest                      spread onto the root <span>
  Usage:
    <Spinner announce label="Loading issues" />
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    size?: 'sm' | 'md' | 'lg';
    label?: string;
    announce?: boolean;
  }

  let { size = 'md', label = 'Loading', announce = false, class: className = '', ...rest }: Props = $props();
</script>

<span class="spinner spinner--{size} {className}" role={announce ? 'status' : undefined} {...rest}>
  <span class="spinner__ring" aria-hidden="true"></span>
  {#if label}<span class="sr-only">{label}</span>{/if}
</span>

<style>
  .spinner {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    vertical-align: middle;
    color: inherit;
  }

  .spinner__ring {
    display: block;
    width: var(--_size);
    height: var(--_size);
    border: var(--_stroke) solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: spinner-rotate 0.7s linear infinite;
  }

  .spinner--sm {
    --_size: 0.875rem;
    --_stroke: 2px;
  }
  .spinner--md {
    --_size: 1.25rem;
    --_stroke: 2px;
  }
  .spinner--lg {
    --_size: 2rem;
    --_stroke: 3px;
  }

  @keyframes spinner-rotate {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes spinner-pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.4;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .spinner__ring {
      border-right-color: currentColor;
      opacity: 0.6;
      animation: spinner-pulse 1.6s var(--ease-in-out) infinite !important;
      animation-iteration-count: infinite !important;
      animation-duration: 1.6s !important;
    }
  }

  :global(:root[data-motion='reduced']) .spinner__ring {
    border-right-color: currentColor;
    opacity: 0.6;
    animation: none !important;
  }
</style>
