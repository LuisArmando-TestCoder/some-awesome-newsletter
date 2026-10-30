<script lang="ts">
  // Onboarding slot 1: live preview of the first issue. Generated when the step opens.
  // Nothing is saved or sent to subscribers here. The owner can send a test to themselves.
  import store, { latestMessage, saveToStore } from "../../../../../store";
  import { updateStepStore } from "./stepsStore";
  import OnboardingShell from "./OnboardingShell.svelte";
  import EmailFrame from "./EmailFrame.svelte";
  import { ob, fmt } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding, trackOnboardingEvent } from "$lib/tutorial/onboardingState";
  import { browserLanguage } from "./infer";
  import { nextStep } from "./nav";
  import { generatePreview, sendHtml, findArticleRule } from "./onboardingApi";

  export let canReveal = false;
  const INDEX = 1;

  let generating = false;
  let error = "";
  let progress = "";
  let testing = false;
  let testMsg = "";
  let testErr = "";
  let ruleBusy = false;
  let requestedFor = "";

  $: html = $onboarding.previewHtml;
  $: subject = $onboarding.previewSubject || $store.config?.newsletterSubject || $ob.preview.defaultSubject;
  $: owner = $store.configuratorEmail || "";
  $: senderLine = $store.config?.senderName || $store.config?.newsletterTitle || "AIBAN";

  // Show backend progress messages while writing (socket log stream).
  $: if (generating && $latestMessage) progress = $latestMessage;

  // Generate once per website when the step becomes visible.
  $: if (canReveal && !html && !generating && $onboarding.url && requestedFor !== $onboarding.url) {
    requestedFor = $onboarding.url;
    // eslint-disable-next-line svelte/infinite-reactive-loop -- guarded by requestedFor: one request per website
    generate();
  }

  async function generate() {
    error = "";
    progress = "";
    generating = true;
    try {
      const res = await generatePreview({
        url: $onboarding.url,
        lead: $store.config?.lead || $onboarding.url,
        personality: $store.personality || "",
        linkSelector: $onboarding.linkSelector,
        language: $onboarding.language || browserLanguage() || "en",
        config: { ...($store.config ?? {}), community: $onboarding.reader },
      });
      updateOnboarding({ previewHtml: res.html, previewSubject: res.subject || "" });
      updateStepStore({ generatedHtml: res.html });
      trackOnboardingEvent("preview_shown");
    } catch (e) {
      console.error("[onboarding/preview]", e);
      error = $ob.preview.errors.generate;
    } finally {
      // eslint-disable-next-line svelte/infinite-reactive-loop -- guarded by requestedFor in the caller
      generating = false;
    }
  }

  async function sendTest() {
    testMsg = "";
    testErr = "";
    testing = true;
    try {
      await sendHtml(html, subject, $store.config ?? {}, [owner]);
      updateOnboarding({ testSentTo: owner });
      testMsg = fmt($ob.preview.testSent, { email: owner });
      trackOnboardingEvent("test_sent");
    } catch (e) {
      console.error("[onboarding/test]", e);
      testErr = $ob.preview.errors.test;
    } finally {
      testing = false;
    }
  }

  async function findRuleAgain() {
    ruleBusy = true;
    const rule = await findArticleRule($onboarding.url, $onboarding.scheduleTime);
    ruleBusy = false;
    if (rule) {
      updateOnboarding({ linkSelector: rule, previewHtml: "" });
      saveToStore({ linkSelector: rule });
      requestedFor = "";
    }
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.preview.title}
  why={$ob.preview.why}
  primaryLabel={$ob.preview.looksGood}
  onPrimary={nextStep}
  primaryDisabled={!html || generating}
>
  {#if generating}
    <div class="generating" role="status" aria-live="polite">
      <span class="pulse" aria-hidden="true"></span>
      <div>
        <p class="generating__text">{$ob.preview.generating}</p>
        {#if progress}<p class="ob-hint">{progress}</p>{/if}
      </div>
    </div>
    <div class="skeleton" aria-hidden="true">
      <span></span><span></span><span class="short"></span><span></span>
    </div>
  {:else if error}
    <p class="ob-error shake" role="alert">{error}</p>
    <div class="row">
      <button type="button" class="ob-btn ob-btn--secondary" on:click={generate}>{$ob.tryAgain}</button>
      <button type="button" class="ob-btn ob-btn--tertiary" on:click={nextStep}>{$ob.preview.skipPreview}</button>
    </div>
  {:else if html}
    <EmailFrame
      from={senderLine}
      to={owner}
      {subject}
      {html}
      labels={{ from: $ob.preview.inboxFrom, to: $ob.preview.inboxTo, subject: $ob.preview.inboxSubject }}
    />
    <div class="row">
      <button
        type="button"
        class="ob-btn ob-btn--secondary"
        on:click={() => {
          if (testing || !owner) return;
          sendTest();
        }}
        aria-disabled={testing || !owner ? "true" : undefined}
        aria-busy={testing}
      >
        {#if testing}<span class="mini-spin" aria-hidden="true"></span>{/if}
        {testing ? $ob.preview.sendingTest : $ob.preview.sendTest}
      </button>
      <button type="button" class="ob-btn ob-btn--tertiary" on:click={generate}>{$ob.preview.regenerate}</button>
    </div>
    {#if testMsg}<p class="ob-success" role="status">{testMsg}</p>{/if}
    {#if testErr}<p class="ob-error" role="alert">{testErr}</p>{/if}
  {/if}

  {#if !generating}
    <details class="how">
      <summary>{$ob.preview.howTitle}<svg class="how__chev" viewBox="0 0 16 16" aria-hidden="true"><path d="M4 6l4 4 4-4" /></svg></summary>
      <p class="ob-hint">{$ob.preview.howBody}</p>
      <div class="ob-field">
        <label class="ob-label" for="ob-rule">{$ob.preview.ruleLabel}</label>
        <input id="ob-rule" class="ob-input mono" type="text" readonly value={$onboarding.linkSelector} />
      </div>
      <button
        type="button"
        class="ob-btn ob-btn--secondary"
        on:click={() => {
          if (ruleBusy) return;
          findRuleAgain();
        }}
        aria-disabled={ruleBusy ? "true" : undefined}
        aria-busy={ruleBusy}
      >
        {#if ruleBusy}<span class="mini-spin" aria-hidden="true"></span>{/if}
        {ruleBusy ? $ob.working : $ob.preview.findAgain}
      </button>
    </details>
  {/if}
</OnboardingShell>

<style lang="scss">
  .row {
    display: flex;
    gap: var(--space-3);
    flex-wrap: wrap;
    align-items: center;
  }

  /* Working state: a calm line of text with a breathing dot, then a skeleton shaped like the email. */
  .generating {
    display: flex;
    gap: var(--space-3);
    align-items: flex-start;
  }
  .generating__text {
    margin: 0;
    color: var(--text-1);
    font-size: var(--fs-lg);
    font-weight: var(--fw-medium);
  }
  .pulse {
    flex: none;
    width: 10px;
    height: 10px;
    margin-top: 0.55em;
    border-radius: var(--radius-full);
    background: var(--text-1);
    animation: pulse 1.4s var(--ease-in-out) infinite;
  }
  @keyframes pulse {
    50% {
      opacity: 0.25;
      transform: scale(0.8);
    }
  }
  .skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--space-3);
    padding: var(--space-6) var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-0);

    span {
      display: block;
      height: 14px;
      border-radius: var(--radius-sm);
      background: var(--surface-2);
      animation: sk 1.4s var(--ease-in-out) infinite;
    }
    span:first-child {
      height: 22px;
      width: 70%;
      margin-bottom: var(--space-2);
    }
    .short {
      width: 60%;
    }
  }
  @keyframes sk {
    50% {
      opacity: 0.5;
    }
  }

  .mini-spin {
    width: 1em;
    height: 1em;
    border: 2px solid currentColor;
    border-right-color: transparent;
    border-radius: var(--radius-full);
    animation: mini-spin 0.8s linear infinite;
  }
  @keyframes mini-spin {
    to {
      transform: rotate(360deg);
    }
  }

  /* Disclosure: a chevron that turns over when open. */
  .how {
    border-top: 1px solid var(--border-1);
    padding-top: var(--space-3);
    display: flex;
    flex-direction: column;
    gap: var(--space-3);

    summary {
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: var(--space-2);
      min-height: var(--control-h);
      list-style: none;
      cursor: pointer;
      font-weight: var(--fw-medium);
      color: var(--text-1);
      font-size: var(--fs-sm);
      border-radius: var(--radius-sm);
      box-shadow: none;

      &::-webkit-details-marker {
        display: none;
      }

      @media (hover: hover) and (pointer: fine) {
        &:hover {
          box-shadow: none;
          text-decoration: underline;
          text-underline-offset: 0.2em;
        }
      }

      &:focus-visible {
        box-shadow: none;
        outline: 2px solid var(--focus-color);
        outline-offset: 2px;
      }
    }
    &[open] summary {
      margin-bottom: var(--space-3);
    }
    > * + * {
      margin-top: var(--space-3);
    }
  }
  .how__chev {
    flex: none;
    width: 1rem;
    height: 1rem;
    fill: none;
    stroke: currentColor;
    stroke-width: 1.6;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: transform var(--dur-slow) var(--ease-out);
  }
  .how[open] .how__chev {
    transform: rotate(180deg);
  }

  .mono {
    font-family: var(--font-mono);
    font-size: var(--fs-sm) !important;
  }

  @media (prefers-reduced-motion: reduce) {
    .pulse,
    .skeleton span,
    .mini-spin {
      animation: none;
    }
    .how__chev {
      transition: none;
    }
  }
</style>
