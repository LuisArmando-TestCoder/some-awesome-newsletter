<script lang="ts">
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import store from "../../../../store";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
</script>

<Centered>
  {#if canReveal}
    <div class="welcome-wrapper" in:fly={{ y: 30, duration: 1000, easing: cubicOut }}>
      <h2 class="welcome-title">
        {$t.welcome.title}
      </h2>
      <div class="decorator"></div>
    </div>
  {/if}
</Centered>

<style lang="scss">
  .welcome-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    padding: 0 1rem;
    max-width: 900px;
  }

  .welcome-title {
    /* Responsive Fluid Typography: Scales smoothly between 2.5rem and 4.5rem */
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 800;
    line-height: 1.1;
    letter-spacing: -0.04em;
    margin: 0 0 1.5rem 0;
    
    /* Modern Text Balancing (prevents "orphan" words) */
    text-wrap: balance;
    
    /* Premium Gradient Text */
    color: #111; /* Fallback */
    background: linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;

    /* Subtle text shadow for depth without "fuzziness" */
    filter: drop-shadow(0 2px 4px rgba(0,0,0,0.05));
  }

  .decorator {
    width: 80px;
    height: 4px;
    background: linear-gradient(90deg, var(--c-primary, #007aff), transparent);
    border-radius: 2px;
    opacity: 0.8;
  }
</style>