<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import Centered from "../../../../wrappers/Centered/Centered.svelte";
    import PlainText from "../../../../inputs/PlainText/PlainText.svelte";
    import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
    import store, { saveToStore } from "../../../../../store";
    import regenerateSelectors from "../../../../requests/regenerateSelectors";

  export let canReveal = false;
  
    let selector = $store.linkSelector || "";
    let isRegenerating = false;
  
    async function handleRegenerate() {
      if (!$store.newsSource) return;
      
      let currentNewsSource = $store.config.newsSources?.find(ns => ns.url === $store.newsSource);
      
      // If exact match fails, try finding by matching just the hostname or pathname if needed, 
      // but for now let's try to reload the store if not found, as it might be a sync issue.
      if (!currentNewsSource) {
        console.warn("News source not found in store, attempting to use the last added source if available.");
        if ($store.config.newsSources && $store.config.newsSources.length > 0) {
           // Fallback: If there's only one source, assume it's the one.
           // Or if the user just added one, it might be the last one.
           currentNewsSource = $store.config.newsSources[$store.config.newsSources.length - 1];
        }
      }

      if (!currentNewsSource?.id) {
        alert("News source not found. Please try creating it again.");
        return;
      }

      isRegenerating = true;
      try {
        const result = await regenerateSelectors($store.configuratorEmail, currentNewsSource.id);
        
        if (result && result.linkSelector) {
          selector = result.linkSelector;
          saveToStore({ linkSelector: selector });
        } else {
          alert("Failed to regenerate selector.");
        }
      } catch (e) {
        console.error(e);
        alert("An error occurred while regenerating selector.");
      } finally {
        isRegenerating = false;
      }
    }
  
    function handleNext() {
      saveToStore({
        linkSelector: selector,
        stepsIndex: $store.stepsIndex + 1
      });
    }
  </script>
  
  <Centered>
    <div class="step-container">
      {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="impact-statement">
          Content Selector
        </h1>
      </div>
  
        <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
          <p class="subtitle">
            We will use a selector like this to find articles. It should be populated automatically.
          </p>
          <div class="input-wrapper">
            <PlainText 
              value={selector}
              placeholder="Selector string..."
              disabled={true}
            />
            <button class="regen-btn" on:click={handleRegenerate}>
              {isRegenerating ? "Regenerating..." : "Regenerate Selector"}
            </button>
          </div>
        </div>
  
        <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
          <SubmitButton callback={handleNext} />
        </div>
      {/if}
    </div>
  </Centered>
  
  <style lang="scss">
    .step-container {
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 700px;
      margin: 0 auto;
      padding: 1rem 0;
      gap: 2rem;
    }
  
  .header-group { text-align: center; }

  .impact-statement {
    /* Responsive sizing: slightly larger/bolder than the previous subtitle */
    font-size: clamp(1.5rem, 5vw, 2rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    text-align: center; /* Default center */
    letter-spacing: -0.03em;
    text-wrap: balance;

    /* Infinite Shimmer Effect: 
       Creates a living, "forever" feel using a moving gradient background.
    */
    background: linear-gradient(
      120deg, 
      var(--c-primary, #2563eb) 0%, 
      var(--c-primary-light, #60a5fa) 50%, 
      var(--c-primary, #2563eb) 100%
    );
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    
    animation: shine 4s linear infinite;
  }

  @keyframes shine {
    to {
      background-position: 200% center;
    }
  }

  .input-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  
    .subtitle {
      font-size: 0.9rem;
      color: #666;
      margin: 0 0 0.5rem 0;
      font-style: italic;
    }
  
    .input-wrapper {
      padding: 1rem 0;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  
    .regen-btn {
      align-self: flex-start;
      padding: 0.5rem 1rem;
      background: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      color: #333;
      
      &:hover { background: #e9e9e9; }
    }
  
    .submit-wrapper {
      display: flex;
      justify-content: flex-end;
      padding-top: 1rem;
    }
  </style>