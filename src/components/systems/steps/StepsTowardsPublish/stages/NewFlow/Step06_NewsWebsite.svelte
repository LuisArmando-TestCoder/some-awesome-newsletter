<script lang="ts">
  import type { TagTreeNode } from "../../../../selectors/Tags/types";
  // Onboarding slot 0: "What is your website?"
  // Validates only on submit (UX diagnostic item d). Nothing is created in the backend here.
  import { writable } from "svelte/store";
  import store, { saveToStore, topic as topicStore } from "../../../../../store";
  import { isValidURL } from "../../../../inputs/Link/isValidLink";
  import generateSelector from "../../../../requests/generateSelector";
  import CollapsibleTags from "../../../../selectors/Tags/CollapsibleTags.svelte";
  import categoriesTree from "../../../../inputs/Country/newssourcesthemetree";
  import { updateStepStore } from "./stepsStore";
  import OnboardingShell from "./OnboardingShell.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding, trackOnboardingEvent, takePrefillUrl } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { guessReaderFromUrl, normalizeUrl } from "./infer";

  export let canReveal = false;
  const INDEX = 0;

  let value = "";
  let error = "";
  let loading = false;
  let noWebsite = false;
  let seeded = false;

  // Pre-fill once from saved progress (resume) or the old global store.
  $: if (canReveal && !seeded) {
    seeded = true;
    trackOnboardingEvent("onboarding_started");
    noWebsite = $onboarding.noWebsite;
    value = ($onboarding.noWebsite ? "" : $onboarding.url) || takePrefillUrl() || ($store.newsSource ?? "");
  }

  // Topic picker for owners without a website.
  const selectedTags = writable<string[]>([]);
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- lookup tables filled once while building the tag tree, never rendered
  const tagUrlMap = new Map<string, string[]>();
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- lookup tables filled once while building the tag tree, never rendered
  const tagPathMap = new Map<string, string>();
  function buildTags(obj: Record<string, unknown>, parentPath = ""): TagTreeNode[] {
    return Object.keys(obj).map((key) => {
      const path = parentPath ? `${parentPath} / ${key}` : key;
      const v = obj[key];
      if (Array.isArray(v)) {
        tagUrlMap.set(key, v as string[]);
        tagPathMap.set(key, path);
        return { name: key };
      }
      return { name: key, children: buildTags(v as Record<string, unknown>, path) };
    });
  }
  const tagsData = buildTags(categoriesTree() as Record<string, unknown>);
  let pickedTopic = "";
  let pickedUrl = "";
  selectedTags.subscribe((tags) => {
    for (let i = tags.length - 1; i >= 0; i--) {
      const urls = tagUrlMap.get(tags[i]);
      if (urls?.length) {
        pickedUrl = urls[0];
        const path = tagPathMap.get(tags[i]) ?? tags[i];
        pickedTopic = path.split(" / ").slice(1).join(" / ") || path;
        error = "";
        return;
      }
    }
  });

  async function submit() {
    error = "";
    let url: string;
    let topicText = "";
    if (noWebsite) {
      if (!pickedUrl) {
        error = $ob.website.errors.empty;
        return;
      }
      url = pickedUrl;
      topicText = pickedTopic;
    } else {
      if (!value.trim()) {
        error = $ob.website.errors.empty;
        return;
      }
      url = normalizeUrl(value);
      if (!isValidURL(url)) {
        error = $ob.website.errors.invalid;
        return;
      }
      value = url;
    }

    loading = true;
    try {
      const reader = $onboarding.reader || (topicText ? topicText : guessReaderFromUrl(url));
      const selector = await generateSelector($store.configuratorEmail, {
        url,
        lead: url,
        personality: $store.personality || "",
        scheduleTime: $onboarding.scheduleTime,
      });
      // A missing rule is not fatal: the preview step lets the owner retry.
      const linkSelector = selector || "";
      updateOnboarding({ url, noWebsite, topic: topicText, reader, linkSelector, previewHtml: "" });
      updateStepStore({ url, linkSelector, topic: topicText, lead: url });
      if (topicText) topicStore.set(topicText);
      saveToStore({ newsSource: url, linkSelector, lead: url });
      nextStep();
    } catch (e) {
      console.error("[onboarding/website]", e);
      error = $ob.website.errors.network;
    } finally {
      loading = false;
    }
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.website.title}
  why={$ob.website.why}
  skipNote={noWebsite ? "" : $ob.website.skipNote}
  primaryLabel={$ob.website.submit}
  onPrimary={submit}
  {loading}
  loadingLabel={$ob.website.checking}
>
  {#if !noWebsite}
    <div class="ob-field">
      <label class="ob-label" for="ob-website">{$ob.website.label}</label>
      <input
        id="ob-website"
        class="ob-input"
        type="text"
        inputmode="url"
        autocomplete="url"
        autocapitalize="off"
        spellcheck="false"
        placeholder={$ob.website.placeholder}
        bind:value
        aria-invalid={error ? "true" : undefined}
        aria-describedby="ob-website-hint{error ? ' ob-website-error' : ''}"
      />
      <p class="ob-hint" id="ob-website-hint">{$ob.website.hint}</p>
    </div>
  {:else}
    <div class="ob-field">
      <span class="ob-label">{$ob.website.topicTitle}</span>
      <p class="ob-hint">{$ob.website.topicHint}</p>
      <div class="topics">
        <CollapsibleTags tags={tagsData} {selectedTags} />
      </div>
    </div>
  {/if}

  {#if error}
    <p class="ob-error shake" id="ob-website-error" role="alert">{error}</p>
  {/if}

  <button
    type="button"
    class="ob-btn ob-btn--tertiary switch"
    on:click={() => {
      noWebsite = !noWebsite;
      error = "";
    }}
  >
    {noWebsite ? $ob.website.haveWebsite : $ob.website.noWebsite}
  </button>
</OnboardingShell>

<style lang="scss">
  .topics {
    max-height: 22rem;
    overflow: auto;
    overscroll-behavior: contain;
    padding: var(--space-3) 0;
    border-top: 1px solid var(--border-1);
    border-bottom: 1px solid var(--border-1);
  }
  .switch {
    align-self: flex-start;
    min-height: var(--control-h);
  }
</style>
