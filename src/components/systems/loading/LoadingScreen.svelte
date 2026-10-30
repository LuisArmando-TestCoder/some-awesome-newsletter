<script lang="ts">
  import { onMount } from 'svelte';

  export let messages: string[] = [];
  // Optional: text announced when there are no messages.
  export let label: string = 'Loading';

  let currentMessageIndex = 0;

  onMount(() => {
    if (messages.length > 1) {
      const interval = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      }, 2000);

      return () => clearInterval(interval);
    }
  });

  $: currentMessage = messages[currentMessageIndex] ?? '';
</script>

<div class="loading-screen">
  <div class="mark" aria-hidden="true">
    <span class="ring"></span>
    <span class="dot dot-1"></span>
    <span class="dot dot-2"></span>
    <span class="dot dot-3"></span>
  </div>

  {#if messages.length > 0}
    <div class="loading-text" aria-hidden="true">
      {#each messages as message, i}
        <span class:visible={i === currentMessageIndex}>{message}</span>
      {/each}
    </div>
  {/if}
  <p class="sr-only" role="status" aria-live="polite" aria-atomic="true">{currentMessage || label}</p>
</div>

<style>
  .loading-screen {
    position: fixed;
    inset: 0;
    z-index: var(--z-modal);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: var(--space-5);
    padding: var(--space-5);
    background:
      radial-gradient(circle at 50% 42%, var(--accent-soft) 0%, transparent 55%),
      var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .mark {
    position: relative;
    width: 5rem;
    height: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-2);
  }

  .ring {
    position: absolute;
    inset: 0;
    border: 2px solid var(--border-1);
    border-top-color: var(--accent);
    border-radius: var(--radius-full);
    animation: spin 1.1s linear infinite;
  }

  .dot {
    width: 0.5rem;
    height: 0.5rem;
    border-radius: var(--radius-full);
    background: var(--accent);
    animation: pulse 1.2s var(--ease-in-out) infinite;
  }

  .dot-2 {
    animation-delay: 0.15s;
  }

  .dot-3 {
    animation-delay: 0.3s;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 0.3;
      transform: scale(0.8);
    }
    50% {
      opacity: 1;
      transform: scale(1);
    }
  }

  .loading-text {
    min-height: calc(var(--fs-lg) * var(--lh-normal));
    max-width: var(--measure);
    display: grid;
    place-items: center;
    text-align: center;
    font-size: var(--fs-lg);
    line-height: var(--lh-normal);
    color: var(--text-1);
  }

  .loading-text span {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    transition: opacity var(--dur-slow) var(--ease-in-out);
  }

  .loading-text span.visible {
    opacity: 1;
  }

  @media (prefers-reduced-motion: reduce) {
    .ring,
    .dot {
      animation: none;
    }

    .dot {
      opacity: 0.7;
    }
  }

  :global(:root[data-motion='reduced']) .ring,
  :global(:root[data-motion='reduced']) .dot {
    animation: none;
  }
</style>
