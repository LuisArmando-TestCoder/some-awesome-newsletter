<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
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
    <div class="welcome-wrapper" in:fly={{ y: 24, duration: still ? 0 : 900, easing: cubicOut }}>
      <h2 class="welcome-title">
        {$t.welcome.title}
      </h2>
      <div class="decorator" aria-hidden="true"></div>
    </div>
  {/if}
</Centered>

<style lang="scss">
  /* Cold open: one line at hero scale, ink on paper, a short rule under it. */
  .welcome-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 var(--gutter);
    max-width: var(--container-lg);
  }

  .welcome-title {
    margin: 0 0 var(--space-6);
    font-family: var(--font-display);
    font-size: var(--step-display);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
  }

  .decorator {
    width: 3rem;
    height: 2px;
    background: var(--text-1);
    border-radius: var(--radius-full);
  }
</style>
