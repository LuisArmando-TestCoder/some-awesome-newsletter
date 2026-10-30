<script lang="ts">
  import { fly } from 'svelte/transition';
  import { quadOut } from 'svelte/easing';
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
  // Entrance motion is skipped for people who asked for less motion.
  const still =
    typeof window !== 'undefined' &&
    (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches || document.documentElement.dataset.motion === 'reduced');
  const d = (ms: number) => (still ? 0 : ms);

  // Helper function to clean the markdown dashes from the title if they exist in translation
  $: cleanTitle = $t.lead.title.replace(/--/g, '').trim();
</script>

<Centered>
  <div class="lead-container">
    
    {#if canReveal}
      <div class="header-group" in:fly={{ y: 20, duration: d(800), easing: quadOut }}>
        <h1 class="main-title">
          {cleanTitle}
        </h1>
        <div class="underline" aria-hidden="true"></div>
      </div>

      <p class="recommendation-text" in:fly={{ y: 20, duration: d(800), delay: d(150), easing: quadOut }}>
        {$t.lead.recommendation}
      </p>

      <div class="input-group" in:fly={{ y: 20, duration: d(800), delay: d(300), easing: quadOut }}>
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

      <div class="submit-wrapper" in:fly={{ y: 10, duration: d(800), delay: d(450), easing: quadOut }}>
        <SubmitButton callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}/>
      </div>
    {/if}

  </div>
</Centered>

<style lang="scss">
  /* One question per screen: display title, one quiet line, the field, the action. */
  .lead-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    width: 100%;
    max-width: var(--container-sm);
    margin: 0 auto;
    padding: var(--space-4) var(--gutter);
  }

  .header-group {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-5);
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

  .underline {
    width: 3rem;
    height: 2px;
    background: var(--text-1);
    border-radius: var(--radius-full);
  }

  .recommendation-text {
    margin: 0;
    font-size: var(--fs-lg);
    line-height: var(--lh-snug);
    color: var(--text-2);
    text-align: center;
    text-wrap: pretty;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
    margin-top: var(--space-3);
  }

  .question-label {
    margin: 0;
    font-family: var(--font-body);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    letter-spacing: 0;
    color: var(--text-1);
  }

  .submit-wrapper {
    display: flex;
    justify-content: flex-end;
    padding-top: var(--space-5);
    border-top: 1px solid var(--border-1);
  }

  /* Phones: the action sits in the thumb zone. */
  @media (max-width: 40rem) {
    .submit-wrapper {
      position: sticky;
      bottom: 0;
      justify-content: stretch;
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
