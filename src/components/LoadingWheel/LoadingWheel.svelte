<script lang="ts">
  import { onMount } from 'svelte';

  // Optional: text announced to screen readers.
  export let label: string = 'Loading';

  let randomRotation = 0;

  onMount(() => {
    randomRotation = Math.floor(Math.random() * 360);
  });
</script>

<span class="loading-wheel-wrap" role="status">
  <svg
    class="loading-wheel"
    viewBox="0 0 100 100"
    style="--random-rotation: {randomRotation}deg"
    aria-hidden="true"
    focusable="false"
  >
    <circle class="track" cx="50" cy="50" r="40" fill="none" stroke-width="4"></circle>
    <circle class="path path-1" cx="50" cy="50" r="40" fill="none" stroke-width="4"></circle>
    <circle class="path path-2" cx="50" cy="50" r="30" fill="none" stroke-width="4"></circle>
    <circle class="path path-3" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
  </svg>
  <span class="sr-only">{label}</span>
</span>

<style>
  .loading-wheel-wrap {
    display: inline-flex;
  }

  .loading-wheel {
    width: 5rem;
    height: 5rem;
    animation: rotate 2s linear infinite;
    transform: rotate(var(--random-rotation));
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  .track {
    stroke: var(--border-1);
  }

  .path {
    stroke-linecap: round;
    stroke: var(--accent);
    animation-name: dash;
    animation-duration: 1.5s;
    animation-timing-function: var(--ease-in-out);
    animation-iteration-count: infinite;
  }

  .path-1 {
    animation-duration: 1.4s;
  }

  .path-2 {
    opacity: 0.6;
    animation-delay: 0.1s;
    animation-duration: 1.2s;
  }

  .path-3 {
    opacity: 0.35;
    animation-delay: 0.2s;
    animation-duration: 1s;
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 200;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -35px;
    }
    100% {
      stroke-dasharray: 89, 200;
      stroke-dashoffset: -124px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .loading-wheel,
    .path {
      animation: none;
    }

    .path {
      stroke-dasharray: 60, 200;
    }
  }
</style>
