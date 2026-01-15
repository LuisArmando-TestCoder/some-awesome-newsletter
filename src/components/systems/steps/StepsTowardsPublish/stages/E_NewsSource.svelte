<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Link from "../../../inputs/Link/Link.svelte";
  import Country from "../../../inputs/Country/Country.svelte";
  import store, { saveToStore, stepsMapping } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import { processNewsSourceAction } from "./H_Dashboard/NewsSource/newsSourceActions";
  import createNewsSource from "../../../requests/createNewsSource";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { isValidURL } from "../../../inputs/Link/isValidLink";
  import LoadingScreen from "../../../loading/LoadingScreen.svelte";
  import { ping } from "../../../../Notification/notificationStore";
  import getConfiguratorSession from "../../../requests/getConfiguratorSession";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
  let isLoading = false;

  // Clean title helper
  $: cleanTitle = $t.newsSource.title.replace(/--/g, '').trim();

  async function handleAddNewsSource() {
    isLoading = true;
    const fields = {
      url: $store.newsSource,
      lead: $store.lead,
      personality: $store.personality,
      schedule: $store.schedule,
    };

    await processNewsSourceAction(
      fields,
      (f) => ({
        type: "website",
        url: f.url,
        community: "Newsletter Users",
        lead: f.lead,
        personality: f.personality,
      }),
      createNewsSource,
      console.error,
      "Failed to add news source. Please try again.",
      () => {
        saveToStore({ stepsIndex: stepsMapping["News Sources"] });
      }
    );
  }

  async function trigger(isValid: boolean) {
      if (isValid) {
        await handleAddNewsSource();
        ping("News Source Added", "we are about to send an article to your newsletter, review your email in a few minutes");
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
        await getConfiguratorSession();
      }
    }
</script>

{#if isLoading}
  <LoadingScreen messages={["Generating selectors...", "Analyzing content...", "Finalizing setup..."]} />
{/if}

<Centered>
  <div class="step-container" class:loading={isLoading}>
    
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: 800, easing: quadOut }}>
        <h1 class="main-title">
          {cleanTitle}
        </h1>
      </div>

      <p class="subtitle" in:fly={{ y: 20, duration: 800, delay: 150, easing: quadOut }}>
        {$t.newsSource.subtitle}
      </p>

      <div class="input-grid" in:fly={{ y: 20, duration: 800, delay: 300, easing: quadOut }}>
        
        <div class="link-wrapper">
          <Link
            placeholder={$t.newsSource.placeholder}
            value={$store.newsSource}
            onChange={(newsSource) => saveToStore({ newsSource })}
            onEnter={() => trigger(isValidURL($store.newsSource))}
          />
        </div>

        <div class="country-wrapper">
          <Country onSelect={(selection) => {
            if (selection) {
              saveToStore({ newsSource: selection.ns });
            }
          }} />
        </div>

      </div>

      <div class="submit-wrapper" in:fly={{ y: 10, duration: 800, delay: 450, easing: quadOut }}>
        <SubmitButton callback={() => trigger(isValidURL($store.newsSource))}/>
      </div>
    {/if}

  </div>
</Centered>

<style lang="scss">
  /* Modern CSS Variables */
  :global(:root) {
    --ns-primary: #111;
    --ns-accent: #f59e0b; /* Amber for news/alert feel */
    --ns-text-light: #6b7280;
  }

  .step-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: 700px;
    margin: 0 auto;
    padding: 1rem 0;
    transition: filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease;

    &.loading {
      opacity: 0.6;
      filter: blur(4px) grayscale(50%);
      transform: scale(0.98);
      pointer-events: none;
    }
  }

  /* Typography */
  .header-group {
    margin-bottom: 1rem;
    text-align: center;
  }

  .main-title {
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    line-height: 1.1;
    margin: 0;
    text-wrap: balance;
    
    /* Professional Gradient: Dark Grey to News-Alert color */
    background: linear-gradient(135deg, var(--ns-primary) 0%, #434343 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 1.1rem;
    line-height: 1.6;
    color: var(--ns-text-light);
    text-align: center;
    margin: 0 0 2.5rem 0;
    font-weight: 400;
    text-wrap: pretty;
  }

  /* Input Grid Layout */
  .input-grid {
    display: grid;
    /* Desktop: Link takes available space, Country takes auto width */
    grid-template-columns: 1fr auto; 
    align-items: end; /* Aligns them at the bottom so inputs line up */
    gap: 1rem;
    width: 100%;
    margin-bottom: 1.5rem;

    /* Mobile Breakpoint */
    @media (max-width: 600px) {
      grid-template-columns: 1fr; /* Stack vertically */
      gap: 1.5rem;
    }
  }

  .link-wrapper {
    width: 100%;
    /* Ensure the input component fills the grid cell */
    :global(.input-component-class) { width: 100%; } 
  }

  .country-wrapper {
    /* Ensures the country selector doesn't stretch weirdly */
    min-width: 140px; 
    display: flex;
    justify-content: flex-end; /* Align to right on desktop */
    
    @media (max-width: 600px) {
      justify-content: center; /* Center on mobile */
    }
  }

  /* Submit Area */
  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.05);
  }
</style>