<script lang="ts">
    import { fly } from 'svelte/transition';
    import { quadOut } from 'svelte/easing';
    import Centered from "../../../../wrappers/Centered/Centered.svelte";
    import PlainText from "../../../../inputs/PlainText/PlainText.svelte";
    import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
    import store, { saveToStore, topic } from "../../../../../store";
    import generateSelector from "../../../../requests/generateSelector";
    import stepsStore, { updateStepStore } from "./stepsStore";

  export let canReveal = false;

    // Initialize from global store if stepsStore is empty (bridging the gap)
    $: if (!$stepsStore.url && $store.newsSource) {
      updateStepStore({ 
        url: $store.newsSource,
        lead: $store.lead || $topic || "",
        personality: $store.personality,
        config: $store.config
      });
    }

    $: selector = $stepsStore.linkSelector || $store.linkSelector || "";

    let isRegenerating = false;

    async function handleRegenerate() {
      const url = $stepsStore.url || $store.newsSource; 
      
      if (!url) {
        alert("No news source URL found.");
        return;
      }

      isRegenerating = true;
      updateStepStore({ isRegeneratingSelector: true });

      try {
        const result = await generateSelector($store.configuratorEmail, {
          url: url,
          lead: $stepsStore.lead || $store.lead || $topic || "",
          personality: $stepsStore.personality || $store.personality,
          scheduleTime: $store.config.scheduleTime
        });
        
        if (result) {
          selector = result;
          // Save to stepsStore primarily
          updateStepStore({ linkSelector: selector });
          // Also save to global store for compatibility with other steps if needed
          saveToStore({ linkSelector: selector });
        } else {
          alert("Failed to regenerate selector.");
        }
      } catch (e) {
        console.error(e);
        alert("An error occurred while regenerating selector.");
      } finally {
        isRegenerating = false;
        updateStepStore({ isRegeneratingSelector: false });
      }
    }
  
    function handleNext() {
      // Ensure we save the selector to the store before proceeding
      updateStepStore({ linkSelector: selector });
      
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
            Think of every website as a <strong>library with a unique layout</strong>. 
            <br><br>
            This <strong>'Selector'</strong> is the specific map we created for this website. It tells our system exactly where to look to pick up the articles you want, while ignoring menu buttons and advertisements. 
            <br><br>
            <strong>We have populated this map for you automatically.</strong>
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
      line-height: 1.5;
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