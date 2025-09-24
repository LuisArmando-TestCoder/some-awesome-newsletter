<script>
  import { onMount } from 'svelte';

  let randomRotation = 0;

  onMount(() => {
    randomRotation = Math.floor(Math.random() * 360);
  });
</script>

<svg class="loading-wheel" viewBox="0 0 100 100" style="--random-rotation: {randomRotation}deg">
  <circle class="path path-1" cx="50" cy="50" r="40" fill="none" stroke-width="4"></circle>
  <circle class="path path-2" cx="50" cy="50" r="30" fill="none" stroke-width="4"></circle>
  <circle class="path path-3" cx="50" cy="50" r="20" fill="none" stroke-width="4"></circle>
</svg>

<style>
  .loading-wheel {
    width: 80px;
    height: 80px;
    animation: rotate 2s linear infinite;
    transform: rotate(var(--random-rotation));
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  .path {
    stroke-linecap: round;
    stroke: #3498db;
    animation-name: dash;
    animation-duration: 1.5s;
    animation-timing-function: ease-in-out;
    animation-iteration-count: infinite;
  }

  .path-1 {
    stroke: #3498db;
    animation-timing-function: cubic-bezier(0.35, 0, 0.65, 1);
    animation-duration: 1.4s;
  }

  .path-2 {
    stroke: #e74c3c;
    animation-delay: 0.1s;
    animation-timing-function: cubic-bezier(0.5, 0.15, 0.5, 0.85);
    animation-duration: 1.2s;
  }

  .path-3 {
    stroke: #f1c40f;
    animation-delay: 0.2s;
    animation-timing-function: cubic-bezier(0.65, 0, 0.35, 1);
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
</style>
