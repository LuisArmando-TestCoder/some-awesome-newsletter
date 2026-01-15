<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;

  // Helper function to clean the markdown dashes from the title if they exist in translation
  $: cleanTitle = $t.lead.title.replace(/--/g, '').trim();
</script>

<Centered>
  <div class="lead-container">
    
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          {cleanTitle}
        </h1>
        <div class="underline"></div>
      </div>

      <p class="recommendation-text" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        {$t.lead.recommendation}
      </p>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 300, easing: quadOut }}>
        <h3 class="question-label">
          {$t.lead.question}
        </h3>
        
        <div class="input-wrapper">
          <Link
            placeholder={$t.lead.placeholder}
            value={$store.lead}
            onChange={(lead) => saveToStore({ lead })}
            onEnter={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}
          />
        </div>
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 450, easing: quadOut }}>
        <SubmitButton callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}/>
      </div>
    {/if}

  </div>
</Centered>

<style lang="scss">
  /* Global Modern Variables */
  :global(:root) {
    --lead-primary: #1a1a1a;
    --lead-secondary: #666;
    --lead-accent: #007aff; /* Adjust to your brand color */
    --ease-elastic: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }

  .lead-container {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    width: 100%;
    max-width: 600px; /* Optimal reading width */
    margin: 0 auto;
    padding: 1rem 0;
  }

  /* Typography & Titles */
  .header-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    text-align: center;
  }

  .main-title {
    font-size: clamp(2rem, 5vw, 3rem); /* Responsive typography */
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    letter-spacing: -0.03em;
    text-wrap: balance; /* Modern CSS: balances text lines automatically */
    
    /* Gradient Text Effect */
    background: linear-gradient(135deg, var(--lead-primary) 0%, #434343 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  /* Decorative underline */
  .underline {
    width: 60px;
    height: 4px;
    background: var(--lead-accent);
    border-radius: 2px;
  }

  /* Body Text */
  .recommendation-text {
    font-size: 1.125rem;
    line-height: 1.6;
    color: var(--lead-secondary);
    text-align: center;
    margin: 0;
    font-weight: 400;
    text-wrap: pretty; /* Prevents orphans/widows */
  }

  /* Input Section */
  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 1rem;
  }

  .question-label {
    font-size: 0.85rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    font-weight: 700;
    color: var(--lead-secondary);
    margin: 0;
    margin-left: 4px; /* Align slightly with input field curvature */
  }

  .input-wrapper {
    /* Wraps the Link component to ensure it sits nicely */
    transition: transform 0.2s ease;
    &:focus-within {
      transform: translateY(-2px);
    }
  }

  /* Button Area */
  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.5rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.05); /* Subtle separation */
  }
</style>