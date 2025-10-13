<script lang="ts">
  import { quintOut } from 'svelte/easing';
  import { fade, fly } from 'svelte/transition';
  import { notification } from './notificationStore';

  let timeoutId: number;

  function handleMouseEnter() {
    clearTimeout(timeoutId);
  }

  function handleMouseLeave() {
    if ($notification) {
      const duration = ($notification.title.length + $notification.message.length) * 50;
      timeoutId = setTimeout(() => {
        notification.set(null);
      }, duration);
    }
  }

  notification.subscribe(value => {
    if (value) {
      const duration = (value.title.length + value.message.length) * 50;
      timeoutId = setTimeout(() => {
        notification.set(null);
      }, duration);
    }
  });
</script>

{#if $notification}
  <div
    class="notification-container"
    in:fly={{ y: -20, duration: 500, easing: quintOut }}
    out:fade={{ duration: 1000 }}
    on:mouseenter={handleMouseEnter}
    on:mouseleave={handleMouseLeave}
  >
    <div class="notification-content">
      <h3>{$notification.title}</h3>
      <p>{$notification.message}</p>
    </div>
  </div>
{/if}

<style>
  .notification-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    border-radius: 12px;
    overflow: hidden;
    transition: opacity 0.5s ease-in-out;
  }

  .notification-content {
    background: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 16px;
    color: #333;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  h3 {
    margin: 0 0 8px 0;
    font-size: 1.2em;
    font-weight: bold;
  }

  p {
    margin: 0;
    font-size: 1em;
  }
</style>
