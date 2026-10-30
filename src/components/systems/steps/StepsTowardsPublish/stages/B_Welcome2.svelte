<script lang="ts">
  import { fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
  // Entrance motion is skipped for people who asked for less motion.
  const still =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced');
</script>

<Centered>
  {#if canReveal}
    <div class="tagline-wrapper" in:fly={{ y: 16, duration: still ? 0 : 800, easing: backOut }}>
      <h3 class="tagline">
        {$t.welcome.setItOnce}
      </h3>
    </div>
  {/if}
</Centered>

<style lang="scss">
  .tagline-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 var(--gutter);
  }

  .tagline {
    margin: 0;
    max-width: 24ch;
    font-family: var(--font-display);
    font-size: var(--fs-3xl);
    font-weight: var(--fw-medium);
    line-height: var(--lh-tight);
    letter-spacing: var(--tracking-tight);
    text-align: center;
    color: var(--text-2);
    text-wrap: balance;
  }
</style>
