<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore } from "../../../../../store";
  import LoadingScreen from "../../../../loading/LoadingScreen.svelte";

  export let canReveal = false;

  let isSending = false;
  let isSent = false;

  async function handleSend() {
    isSending = true;
    
    // Simulate sending delay
    setTimeout(() => {
      isSending = false;
      isSent = true;
    }, 2500);
  }

  function handleNext() {
    saveToStore({ stepsIndex: $store.stepsIndex + 1 });
  }
</script>

{#if isSending}
  <LoadingScreen messages={["Connecting to email provider...", "Authenticating...", "Sending article..."]} />
{/if}

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="impact-statement">
          Send Test Email
        </h1>
      </div>

      <div class="input-group" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <p class="subtitle">
          Send a test email to yourself to verify the configuration.
        </p>
        <div class="input-wrapper">
          <button class="send-btn" on:click={handleSend}>
            {isSent ? "Sent! Check your email" : "Send Now"}
          </button>
        </div>
      </div>

      {#if isSent}
        <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 300, easing: quadOut }}>
          <SubmitButton callback={handleNext} />
        </div>
      {/if}
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
    /* Transparent */
    padding: 1rem 0;
  }

  .send-btn {
    align-self: flex-start;
    padding: 0.8rem 2rem;
    background: #28a745;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover { background: #218838; }
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>
