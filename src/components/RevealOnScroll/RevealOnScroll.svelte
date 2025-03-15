<script lang="ts">
  import { onMount, onDestroy } from 'svelte';

  // Define the wrapper element with proper typing
  let wrapper: HTMLDivElement | undefined;
  // Track reveal state
  let isRevealed = false;
  // Store the scroll handler for cleanup
  let scrollHandler: () => void;

  const seconds = (s: number) => new Promise((resolve) => setTimeout(resolve, s * 1000));

  scrollHandler = async () => {
    if (wrapper) {
      const rect = wrapper.getBoundingClientRect();
      // Calculate visible height of the element
      const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
      // Reveal when at least 1% of the element is visible
      const havingRevealed = visibleHeight > 0 && visibleHeight / rect.height >= 0.5;

      if (!isRevealed && havingRevealed) {
        window.removeEventListener('scroll', scrollHandler);
        await seconds(0.5);
        isRevealed = havingRevealed;
      }
    }
  };

  // Add scroll event listener
  window.addEventListener('scroll', async () => {
    await scrollHandler();
  });
  // Check initially in case the element is already in view
  onMount(() => {
    setTimeout(async () => {
      await scrollHandler();
    }, 1000);
  });

  onDestroy(() => {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
    }
  });
</script>

<div class="reveal-on-scroll" class:revealed={isRevealed} bind:this={wrapper}>
  <slot></slot>
</div>

<style lang="scss">
  @use 'RevealOnScroll.scss';
</style>
