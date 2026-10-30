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
  // Entrance motion is skipped for people who asked for less motion.
  const still =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced');
  const d = (ms: number) => (still ? 0 : ms);
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
  <div class="step-container" class:loading={isLoading} aria-busy={isLoading} inert={isLoading}>
    
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: d(800), easing: quadOut }}>
        <h1 class="main-title">
          {cleanTitle}
        </h1>
      </div>

      <p class="subtitle" in:fly={{ y: 20, duration: d(800), delay: d(150), easing: quadOut }}>
        {$t.newsSource.subtitle}
      </p>

      <div class="input-grid" in:fly={{ y: 20, duration: d(800), delay: d(300), easing: quadOut }}>
        
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

      <div class="submit-wrapper" in:fly={{ y: 10, duration: d(800), delay: d(450), easing: quadOut }}>
        <SubmitButton callback={() => trigger(isValidURL($store.newsSource))}/>
      </div>
    {/if}

  </div>
</Centered>

<style lang="scss">
  .step-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    max-width: var(--container-md);
    margin: 0 auto;
    padding: var(--space-4) var(--gutter);
    transition: opacity var(--dur-slow) var(--ease-out);

    /* Busy: dimmed and inert while the source is created (inert blocks input, not CSS). */
    &.loading {
      opacity: 0.5;
    }
  }

  .header-group {
    margin-bottom: var(--space-5);
    text-align: center;
  }

  .main-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-4xl);
    font-weight: var(--fw-semibold);
    line-height: var(--lh-display);
    letter-spacing: var(--tracking-display);
    color: var(--text-1);
    text-wrap: balance;
  }

  .subtitle {
    margin: 0 auto var(--space-7);
    max-width: 52ch;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
    text-align: center;
    text-wrap: pretty;
  }

  .input-grid {
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: end;
    gap: var(--space-4);
    width: 100%;
    margin-bottom: var(--space-5);

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
      gap: var(--space-5);
    }
  }

  .link-wrapper {
    width: 100%;
    :global(.input-component-class) {
      width: 100%;
    }
  }

  .country-wrapper {
    min-width: 140px;
    display: flex;
    justify-content: flex-end;

    @media (max-width: 600px) {
      justify-content: center;
    }
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);
  }

  @media (max-width: 40rem) {
    .submit-wrapper {
      position: sticky;
      bottom: 0;
      margin-inline: calc(-1 * var(--gutter));
      padding: var(--space-3) var(--gutter) calc(var(--space-3) + env(safe-area-inset-bottom));
      background: var(--surface-glass);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);

      > :global(*) {
        flex: 1;
      }
    }
  }
</style>
