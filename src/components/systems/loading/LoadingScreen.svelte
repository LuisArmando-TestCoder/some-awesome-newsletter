<script lang="ts">
  import { onMount } from 'svelte';

  export let messages: string[] = [];

  let currentMessageIndex = 0;

  onMount(() => {
    const interval = setInterval(() => {
      currentMessageIndex = (currentMessageIndex + 1) % messages.length;
    }, 2000);

    return () => clearInterval(interval);
  });
</script>

<div class="loading-screen">
  <div class="loading-spinner"></div>
  <div class="loading-text">
    {#each messages as message, i}
      <span class:visible={i === currentMessageIndex}>{message}</span>
    {/each}
  </div>
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }

  .loading-spinner {
    border: 4px solid #f3f3f3;
    border-top: 4px solid #3498db;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }

  .loading-text {
    margin-top: 20px;
    color: white;
    font-size: 1.2em;
    position: relative;
    height: 2em;
  }

  .loading-text span {
    position: absolute;
    opacity: 0;
    transition: opacity 0.5s;
  }

  .loading-text span.visible {
    opacity: 1;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
