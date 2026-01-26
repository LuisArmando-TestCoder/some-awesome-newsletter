<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore } from "../../../../../store";

  export let canReveal = false;

  let plan = $store.config?.pricingPlan || "free";
  let limits: Record<string, string> = {
    free: "100 users limit",
    starter: "5 sources, 100k users",
    growth: "17 sources, 250k users",
    pro: "25 sources, 500k users",
    master: "50 sources, unlimited users",
    vipfree: "VIP Free"
  };

  let usage = "10 / 100 users (10%)"; // Mock usage

  function handleFinish() {
    saveToStore({ stepsIndex: $store.stepsIndex + 1 });
  }

  function handleChangePlan() {
    alert("Redirecting to billing...");
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          Plan & Limits
        </h1>
      </div>

      <div class="info-card" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <h3 class="impact-statement">Current Plan: <span class="highlight">{plan.toUpperCase()}</span></h3>
        <p class="limits">Limits: {limits[plan] || "Unknown"}</p>
        
        {#if plan !== "master"}
          <div class="usage-bar">
            <div class="bar-fill" style="width: 10%;"></div>
          </div>
          <p class="usage-text">Usage: {usage}</p>
          
          <button class="change-plan-btn" on:click={handleChangePlan}>
            Change Plan
          </button>
        {/if}
      </div>

      <div class="dev-section" in:fly={{ y: 20, duration: 800, delay: 300, easing: quadOut }}>
        <p>Need more advanced features?</p>
        <p class="small">Check out our developer section to integrate this newsletter subscription funnel on your server, a blog of all your generated articles, and subscribing users from your codebase with our API Key.</p>
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 450, easing: quadOut }}>
        <SubmitButton label="Go to Dashboard" callback={handleFinish} />
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

  .info-card {
    /* Transparent or very light if wanted, sticking to consistent no-bg style or keeping card for info? 
       User said "no white bg in the surrounding card". 
       So I'll remove the white bg from info-card as well or make it minimal.
    */
    /* background: white; */
    padding: 2rem;
    /* border-radius: 12px; */
    /* box-shadow: 0 4px 12px rgba(0,0,0,0.1); */
    text-align: center;
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

  .limits {
    color: #666;
    margin-bottom: 1.5rem;
  }

  .usage-bar {
    height: 8px;
    background: #eee;
    border-radius: 4px;
    margin: 1rem 0;
    overflow: hidden;
    
    .bar-fill {
      height: 100%;
      background: #28a745;
    }
  }

  .usage-text {
    font-size: 0.9rem;
    color: #666;
    margin-bottom: 1.5rem;
  }

  .change-plan-btn {
    padding: 0.8rem 2rem;
    background: #007aff;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    
    &:hover {
      background: #0062cc;
    }
  }

  .dev-section {
    text-align: center;
    color: #666;
    /* background: #f9f9f9; */
    padding: 1.5rem;
    /* border-radius: 8px; */
    /* border: 1px dashed #ccc; */

    p { margin: 0.5rem 0; }
    .small { font-size: 0.9rem; }
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
  }
</style>
