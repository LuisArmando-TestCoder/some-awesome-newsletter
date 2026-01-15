<script lang="ts">
  import { fly } from 'svelte/transition';
  import { backOut } from 'svelte/easing';
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
</script>

<Centered>
  {#if canReveal}
    <div class="tagline-wrapper" in:fly={{ y: 20, duration: 800, easing: backOut }}>
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
    padding: 0 1rem;
  }

  .tagline {
    /* Responsive font size */
    font-size: clamp(1.25rem, 4vw, 1.75rem);
    
    /* Modern, clean aesthetic */
    font-weight: 500;
    line-height: 1.4;
    text-align: center;
    color: var(--c-text-light, #64748b); /* Slate-500 equivalent */
    margin: 0;
    
    /* Layout control */
    max-width: 600px;
    text-wrap: balance; /* Prevents uneven line lengths */
    letter-spacing: -0.02em;

    /* Subtle shimmer/gradient for depth (optional, depends on background) */
    background: linear-gradient(180deg, rgba(30, 41, 59, 0.9) 0%, rgba(30, 41, 59, 0.7) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    /* Fallback color if gradient fails */
    @supports not (background-clip: text) {
      -webkit-text-fill-color: initial;
      color: #475569;
    }
  }
</style>