<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import Email from "../../../../inputs/Email/Email.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore } from "../../../../../store";

  export let canReveal = false;

  let emailSender = $store.config?.emailMaskSender || "";

  function handleNext() {
    saveToStore({
      config: { ...$store.config, emailMaskSender: emailSender },
      stepsIndex: $store.stepsIndex + 1
    });
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          Gmail Address (Optional)
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <h3 class="impact-statement">
          Gmail Email Address
        </h3>
        <p class="subtitle">
          If you want to send from a specific Gmail address
        </p>
        <div class="input-wrapper">
          <Email 
            value={emailSender}
            placeholder="your-email@gmail.com"
            onChange={(val) => emailSender = val}
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

  .main-title {
    font-size: clamp(1.5rem, 4vw, 2.5rem);
    font-weight: 800;
    line-height: 1.2;
    margin: 0;
    text-wrap: balance;
    background: linear-gradient(135deg, #1a1a1a 0%, #4a5568 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

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

  .subtitle {
    font-size: 0.9rem;
    color: #666;
    margin: 0 0 0.5rem 0;
    font-style: italic;
  }

  .input-wrapper {
    /* Transparent */
    padding: 1rem 0;
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>
