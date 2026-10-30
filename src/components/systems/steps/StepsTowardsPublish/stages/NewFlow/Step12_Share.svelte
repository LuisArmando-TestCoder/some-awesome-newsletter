<script lang="ts">
  // Onboarding slot 5: signup link and embeddable form for the new newsletter.
  import store from "../../../../../store";
  import OnboardingShell from "./OnboardingShell.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";

  export let canReveal = false;
  const INDEX = 5;

  let copied: "" | "link" | "embed" = "";
  let timer: ReturnType<typeof setTimeout> | undefined;

  $: origin = typeof window !== "undefined" ? window.location.origin : "https://aibanewsletter.club";
  $: configuratorId = $store.configuratorEmail || "";
  $: newsSourceId = $onboarding.newsSourceId || $store.createdNewsSourceId || "";
  $: lead = $store.config?.lead || ($onboarding.noWebsite ? "" : $onboarding.url) || "";
  $: params = new URLSearchParams({ configuratorId, newsSourceId, ...(lead ? { lead } : {}) }).toString();
  $: shareLink = `${origin}/subscribe?${params}`;
  $: embedCode = `<div data-aiban-subscribe data-configurator-id="${configuratorId}" data-news-source-id="${newsSourceId}"></div>\n<script async src="${origin}/subscribe-widget/embed.js"></` + `script>`;

  async function copy(text: string, which: "link" | "embed") {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // Clipboard can be blocked; select the text so the owner can copy it by hand.
      const el = document.getElementById(which === "link" ? "ob-share-link" : "ob-share-embed") as HTMLInputElement | HTMLTextAreaElement | null;
      el?.select();
    }
    copied = which;
    updateOnboarding({ shareCopied: true });
    clearTimeout(timer);
    timer = setTimeout(() => (copied = ""), 2500);
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.share.title}
  why={$ob.share.why}
  skipNote={$ob.share.skipNote}
  onPrimary={nextStep}
>
  <div class="ob-field">
    <label class="ob-label" for="ob-share-link">{$ob.share.linkLabel}</label>
    <div class="copyrow">
      <input id="ob-share-link" class="ob-input mono" type="text" readonly value={shareLink} on:focus={(e) => e.currentTarget.select()} />
      <button type="button" class="ob-btn ob-btn--secondary" on:click={() => copy(shareLink, "link")}>
        {copied === "link" ? $ob.share.copied : $ob.share.copy}
      </button>
    </div>
    <p class="ob-hint">{$ob.share.linkHint}</p>
    <a class="open" href={shareLink} target="_blank" rel="noopener">{$ob.share.open}</a>
  </div>

  <div class="ob-field">
    <label class="ob-label" for="ob-share-embed">{$ob.share.embedLabel}</label>
    <textarea id="ob-share-embed" class="ob-textarea mono" rows="3" readonly value={embedCode} on:focus={(e) => e.currentTarget.select()}></textarea>
    <div class="copyrow end">
      <button type="button" class="ob-btn ob-btn--secondary" on:click={() => copy(embedCode, "embed")}>
        {copied === "embed" ? $ob.share.copied : $ob.share.copy}
      </button>
    </div>
    <p class="ob-hint">{$ob.share.embedHint}</p>
  </div>
  <span class="sr-only" aria-live="polite">{copied ? $ob.share.copied : ""}</span>
</OnboardingShell>

<style lang="scss">
  .copyrow { display: flex; gap: var(--space-2, 8px); align-items: stretch; &.end { justify-content: flex-end; } }
  .mono { font-family: var(--font-mono, monospace); font-size: var(--fs-sm, 0.875rem) !important; }
  .open { color: var(--text-link, #3b5bdb); font-size: var(--fs-sm, 0.875rem); align-self: flex-start; }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
</style>
