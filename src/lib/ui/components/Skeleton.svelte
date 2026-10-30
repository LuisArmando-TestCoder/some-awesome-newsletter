<!--
  Skeleton: placeholder block shown while content loads. Hidden from assistive tech;
  pair it with a status message (for example Spinner announce, or aria-busy on the region).
  Props:
    width?: string = '100%'      any CSS length
    height?: string = '1em'      any CSS length (per line when lines is set)
    radius?: 'sm' | 'md' | 'full' = 'sm'
    lines?: number               renders n text lines, the last one shorter
    ...rest                      spread onto the root element
  Usage:
    <Skeleton lines={3} />
    <Skeleton width="3rem" height="3rem" radius="full" />
-->
<script lang="ts">
  import type { HTMLAttributes } from 'svelte/elements';

  interface Props extends HTMLAttributes<HTMLSpanElement> {
    width?: string;
    height?: string;
    radius?: 'sm' | 'md' | 'full';
    lines?: number;
  }

  let {
    width = '100%',
    height = '1em',
    radius = 'sm',
    lines,
    class: className = '',
    style = '',
    ...rest
  }: Props = $props();

  const count = $derived(lines && lines > 0 ? Math.floor(lines) : 0);
</script>

{#if count > 0}
  <span
    class="skeleton-lines {className}"
    style="width: {width}; {style}"
    aria-hidden="true"
    {...rest}
  >
    {#each Array.from({ length: count }, (_, i) => i) as i (i)}
      <span
        class="skeleton skeleton--{radius}"
        style="height: {height}; width: {i === count - 1 && count > 1 ? '60%' : '100%'};"
      ></span>
    {/each}
  </span>
{:else}
  <span
    class="skeleton skeleton--{radius} {className}"
    style="width: {width}; height: {height}; {style}"
    aria-hidden="true"
    {...rest}
  ></span>
{/if}

<style>
  .skeleton-lines {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    max-width: 100%;
  }

  .skeleton {
    display: block;
    max-width: 100%;
    background-color: var(--surface-2);
    background-image: linear-gradient(
      90deg,
      var(--surface-2) 0%,
      var(--surface-3) 50%,
      var(--surface-2) 100%
    );
    background-size: 200% 100%;
    background-repeat: no-repeat;
    animation: skeleton-shimmer 1.4s var(--ease-in-out) infinite;
  }

  .skeleton--sm {
    border-radius: var(--radius-sm);
  }
  .skeleton--md {
    border-radius: var(--radius-md);
  }
  .skeleton--full {
    border-radius: var(--radius-full);
  }

  @keyframes skeleton-shimmer {
    from {
      background-position: 100% 0;
    }
    to {
      background-position: -100% 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .skeleton {
      animation: none !important;
      background-image: none;
    }
  }

  :global(:root[data-motion='reduced']) .skeleton {
    animation: none !important;
    background-image: none;
  }
</style>
