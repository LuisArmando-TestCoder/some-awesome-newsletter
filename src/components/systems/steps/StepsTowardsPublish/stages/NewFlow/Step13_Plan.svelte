<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Centered from "../../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../../buttons/SubmitButton/SubmitButton.svelte";
  import store, { saveToStore, stepsMapping } from "../../../../../store";
  import { t } from "$lib/i18n/newflow-translations";

  export let canReveal = false;

  $: $t;

  let plan = $store.config?.pricingPlan || "free";
  $: limits = {
    free: $t.step13.limitDetails.free,
    starter: $t.step13.limitDetails.starter,
    growth: $t.step13.limitDetails.growth,
    pro: $t.step13.limitDetails.pro,
    master: $t.step13.limitDetails.master,
    vipfree: $t.step13.limitDetails.vipfree
  } as Record<string, string>;

  let usage = ""; // Populated reactively

  // Calculate usage based on store data
  $: if ($store.config) {
    const subscriberCount = $store.stats?.totalSubscribers || 0; // Assuming store has stats
    const limit = limits[plan] === "Unlimited" ? Infinity : parseInt(limits[plan] || "0", 10);
    
    if (limit === Infinity) {
      usage = `${subscriberCount} / Unlimited`;
    } else {
      const percent = Math.min(100, Math.round((subscriberCount / limit) * 100));
      usage = `${subscriberCount} / ${limit} users (${percent}%)`;
    }
  }

  function handleFinish() {
    saveToStore({ stepsIndex: $store.stepsIndex + 1 });
  }

  function handleChangePlan() {
    saveToStore({ stepsIndex: stepsMapping["Billing"] }); // Assuming -1 takes user to dashboard or plan change section
  }
</script>

<Centered>
  <div class="step-container">
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          {$t.step13.title}
        </h1>
      </div>

      <div class="info-card" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        <h3 class="impact-statement">{$t.step13.currentPlan} <span class="highlight">{plan.toUpperCase()}</span></h3>
        <p class="limits">{$t.step13.limits} {limits[plan] || $t.step13.unknown}</p>
        
        {#if plan !== "master" && plan !== "vipfree"}
          <div class="usage-container">
            <div class="usage-header">
              <span>{$t.step13.usage}</span>
              <span class="usage-value">{usage}</span>
            </div>
            <!-- Calculate width safely -->
            {#if $store.config}
               {@const limitVal = limits[plan] === "Unlimited" ? 1 : parseInt(limits[plan] || "1", 10)}
               {@const subCount = $store.stats?.totalSubscribers || 0}
               {@const widthVal = limitVal === 1 ? 0 : Math.min(100, (subCount / limitVal) * 100)}
               
               <div class="usage-bar">
                 <div class="bar-fill" style="width: {widthVal}%;"></div>
               </div>
            {/if}
          </div>
          
          <button class="change-plan-btn shimmer-btn" on:click={handleChangePlan}>
            {$t.step13.changePlan}
          </button>
        {/if}
      </div>

      <div class="dev-section" in:fly={{ y: 20, duration: 800, delay: 300, easing: quadOut }}>
        <p>{$t.step13.advancedFeatures}</p>
        <p class="small">{$t.step13.developerText}</p>
      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 450, easing: quadOut }}>
        <SubmitButton label={$t.step13.dashboardBtn} callback={handleFinish} />
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

  .usage-container {
    margin: 1.5rem 0;
    text-align: left;
  }

  .usage-header {
    display: flex;
    justify-content: space-between;
    font-size: 0.9rem;
    color: #555;
    margin-bottom: 0.5rem;
    font-weight: 500;
  }

  .usage-bar {
    height: 10px;
    background: #f0f0f0;
    border-radius: 5px;
    overflow: hidden;
    box-shadow: inset 0 1px 3px rgba(0,0,0,0.1);
    
    .bar-fill {
      height: 100%;
      background: linear-gradient(90deg, #4ade80 0%, #22c55e 100%);
      transition: width 0.5s ease-out;
    }
  }

  .change-plan-btn {
    padding: 0.8rem 2rem;
    background: #2563eb;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.2s;
    font-weight: 600;
    box-shadow: 0 4px 6px -1px rgba(37, 99, 235, 0.2);
    
    &:hover {
      background: #1d4ed8;
      transform: translateY(-1px);
      box-shadow: 0 6px 8px -1px rgba(37, 99, 235, 0.3);
    }
  }

  .shimmer-btn {
    position: relative;
    overflow: hidden;
  }
  
  .shimmer-btn::after {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 50%;
    height: 100%;
    background: linear-gradient(
      to right,
      rgba(255, 255, 255, 0) 0%,
      rgba(255, 255, 255, 0.3) 50%,
      rgba(255, 255, 255, 0) 100%
    );
    transform: skewX(-20deg);
    animation: shimmer-btn-anim 3s infinite;
  }

  @keyframes shimmer-btn-anim {
    0% { left: -100%; }
    20% { left: 200%; }
    100% { left: 200%; }
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
