<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import PlainText from "../../../../inputs/PlainText/PlainText.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore, topic as topicStore } from "../../../../../store";
  import stepsStore, { updateStepStore } from "./stepsStore";
  import { t } from "$lib/i18n/newflow-translations";

  export let canReveal = false;

  $: $t;

  let topic = "";
  $: if ($topicStore && !topic) {
    const parts = $topicStore.split(" / ");
    topic = parts.length > 1 ? parts.slice(1).join(" / ") : $topicStore;
  }

  function handleNext() {
    updateStepStore({ topic });
    topicStore.set(topic);
    saveToStore({
      stepsIndex: $store.stepsIndex + 1,
      config: {
        ...$store.config,
        community: topic
      }
    });
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="impact-statement">
          {$t.step04.title}
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <p class="subtitle">
          {$t.step04.subtitle}
        </p>
        <div class="input-wrapper">
          <PlainText 
            value={topic}
            placeholder={$t.step04.placeholder}
            onChange={(val) => {
              topic = val;
              updateStepStore({ topic: val });
            }}
          />
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
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>
