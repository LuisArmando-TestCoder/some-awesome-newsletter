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
    <div class="benefit-wrapper" in:fly={{ y: 16, duration: still ? 0 : 900, delay: still ? 0 : 200, easing: cubicOut }}>
      <h3 class="impact-statement">
        {$t.welcome.useItForever}
      </h3>
    </div>
  {/if}
</Centered>

<style lang="scss">
  .benefit-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 0 var(--gutter);
  }

  /* The payoff line: ink and weight, no color or shimmer. */
  .impact-statement {
    margin: 0;
    max-width: 22ch;
    font-family: var(--font-display);
    font-size: var(--step-chapter);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    text-align: center;
    color: var(--text-1);
    text-wrap: balance;
  }
</style>
