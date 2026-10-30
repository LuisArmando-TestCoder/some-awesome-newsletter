<script lang="ts">
  // Onboarding slot 2: "Who reads your newsletter?" (language + ideal reader).
  // Merges the old Step02 (language) and Step04 (topic). Both are pre-filled.
  import Language from "../../../../inputs/Language/Language.svelte";
  import store, { globalLanguage, saveToStore, topic as topicStore } from "../../../../../store";
  import getGeoIpLanguage from "../../../../requests/getGeoIpLanguage";
  import { updateStepStore } from "./stepsStore";
  import OnboardingShell from "./OnboardingShell.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { browserLanguage } from "./infer";

  export let canReveal = false;
  const INDEX = 2;

  let language = "";
  let reader = "";
  let error = "";
  let seeded = false;
  let languageKey = 0;

  $: if (canReveal && !seeded) {
    seeded = true;
    reader = $onboarding.reader || $store.config?.community || "";
    language = $onboarding.language || $store.config?.dashboardLanguage || browserLanguage() || $globalLanguage || "en";
    if (!$onboarding.language) {
      // Geo lookup only refines the guess; failures are ignored.
      getGeoIpLanguage()
        .then((geo) => {
          if (geo && !$onboarding.language && !browserLanguage()) {
            language = geo;
            languageKey++;
          }
        })
        .catch(() => {});
    }
  }

  function submit() {
    error = "";
    const r = reader.trim();
    if (r.length < 3) {
      error = $ob.readers.errors.reader;
      return;
    }
    updateOnboarding({ language, reader: r });
    updateStepStore({ language, topic: r });
    topicStore.set(r);
    saveToStore({ config: { ...$store.config, dashboardLanguage: language, community: r } });
    nextStep();
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.readers.title}
  why={$ob.readers.why}
  skipNote={$ob.readers.skipNote}
  onPrimary={submit}
>
  <div class="ob-field">
    <span class="ob-label" id="ob-lang-label">{$ob.readers.languageLabel}</span>
    {#key languageKey}
      <Language
        label=""
        defaultLanguageCode={language}
        onSelect={(code) => {
          if (code) language = code;
        }}
      />
    {/key}
    <p class="ob-hint">{$ob.readers.languageHint}</p>
  </div>

  <div class="ob-field">
    <label class="ob-label" for="ob-reader">{$ob.readers.readerLabel}</label>
    <textarea
      id="ob-reader"
      class="ob-textarea"
      rows="2"
      placeholder={$ob.readers.readerPlaceholder}
      bind:value={reader}
      aria-invalid={error ? "true" : undefined}
      aria-describedby="ob-reader-hint"
    ></textarea>
    <p class="ob-hint" id="ob-reader-hint">{$ob.readers.readerHint}</p>
  </div>

  {#if error}
    <p class="ob-error" role="alert">{error}</p>
  {/if}
</OnboardingShell>
