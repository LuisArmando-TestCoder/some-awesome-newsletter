<script lang="ts">
  import { notification } from './notificationStore';
  import type { Notification } from './notificationStore';

  let timeoutId: number;
  let displayNotification: Notification | null = null;

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

  notification.subscribe((value) => {
    if (value) {
      displayNotification = value;
      const duration = (value.title.length + value.message.length) * 50;
      timeoutId = setTimeout(() => {
        notification.set(null);
      }, duration);
    }
  });

  function handleTransitionEnd() {
    if (!$notification) {
      displayNotification = null;
    }
  }
</script>

<div
  class="notification-wrapper"
  class:visible={$notification}
  on:mouseenter={handleMouseEnter}
  on:mouseleave={handleMouseLeave}
  on:transitionend={handleTransitionEnd}
>
  <div class="notification-container">
    {#if displayNotification}
      <div class="notification-content">
        <h3>{displayNotification.title}</h3>
        <p>{displayNotification.message}</p>
      </div>
    {/if}
  </div>
</div>

<style>
  .notification-wrapper {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 9999;
    transition:
      opacity 0.5s ease-in-out,
      transform 0.5s ease-in-out;
    opacity: 0;
    pointer-events: none;
    transform: translateY(-20px);
  }

  .notification-wrapper.visible {
    opacity: 1;
    pointer-events: auto;
    transform: translateY(0);
  }

  .notification-container {
    border-radius: 12px;
    overflow: hidden;
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
