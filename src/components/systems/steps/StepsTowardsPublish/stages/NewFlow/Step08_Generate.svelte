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
    <p class="ob-error" role="alert">{error}</p>
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
      <button type="button" class="ob-btn ob-btn--secondary" on:click={sendTest} disabled={testing || !owner}>
        {testing ? $ob.preview.sendingTest : $ob.preview.sendTest}
      </button>
      <button type="button" class="ob-btn ob-btn--tertiary" on:click={generate}>{$ob.preview.regenerate}</button>
    </div>
    {#if testMsg}<p class="ob-success" role="status">{testMsg}</p>{/if}
    {#if testErr}<p class="ob-error" role="alert">{testErr}</p>{/if}
  {/if}

  {#if !generating}
    <details class="how">
      <summary>{$ob.preview.howTitle}</summary>
      <p class="ob-hint">{$ob.preview.howBody}</p>
      <div class="ob-field">
        <label class="ob-label" for="ob-rule">{$ob.preview.ruleLabel}</label>
        <input id="ob-rule" class="ob-input mono" type="text" readonly value={$onboarding.linkSelector} />
      </div>
      <button type="button" class="ob-btn ob-btn--secondary" on:click={findRuleAgain} disabled={ruleBusy}>
        {ruleBusy ? $ob.working : $ob.preview.findAgain}
      </button>
    </details>
  {/if}
</OnboardingShell>

<style lang="scss">
  .row { display: flex; gap: var(--space-3, 12px); flex-wrap: wrap; align-items: center; }
  .generating {
    display: flex;
    gap: var(--space-3, 12px);
    align-items: flex-start;
    padding: var(--space-4, 16px);
    border-radius: var(--radius-md, 8px);
    background: var(--info-soft, #eef3ff);
  }
  .generating__text { margin: 0; color: var(--text-1, #14171a); }
  .pulse {
    flex: none;
    width: 12px;
    height: 12px;
    margin-top: 6px;
    border-radius: 50%;
    background: var(--accent, #3b5bdb);
    animation: pulse 1.4s var(--ease-in-out, ease-in-out) infinite;
  }
  @keyframes pulse { 50% { opacity: 0.3; } }
  .skeleton {
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    padding: var(--space-4, 16px);
    border: 1px solid var(--border-1, #e3e6ea);
    border-radius: var(--radius-md, 8px);
    span { display: block; height: 14px; border-radius: var(--radius-sm, 4px); background: var(--surface-2, #eceef1); }
    .short { width: 60%; }
  }
  @media (prefers-reduced-motion: reduce) { .pulse { animation: none; } }
  .how {
    border-top: 1px solid var(--border-1, #e3e6ea);
    padding-top: var(--space-3, 12px);
    display: flex;
    flex-direction: column;
    gap: var(--space-3, 12px);
    summary {
      cursor: pointer;
      font-weight: var(--fw-semibold, 600);
      color: var(--text-1, #14171a);
      font-size: var(--fs-sm, 0.875rem);
    }
    &[open] summary { margin-bottom: var(--space-3, 12px); }
    > * + * { margin-top: var(--space-3, 12px); }
  }
  .mono { font-family: var(--font-mono, monospace); font-size: var(--fs-sm, 0.875rem) !important; }
</style>
