<script lang="ts">
  // Onboarding slot 6: how the newsletter appears in the inbox (sender name).
  // Replaces the Gmail app password step: onboarding never asks for email credentials.
  // Issues go out from the AIBAN sending address with this name.
  import store, { saveToConfig, saveToStore } from "../../../../../store";
  import OnboardingShell from "./OnboardingShell.svelte";
  import EmailFrame from "./EmailFrame.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { escapeHtml, siteNameFromUrl } from "./infer";

  export let canReveal = false;
  const INDEX = 6;

  let name = "";
  let error = "";
  let saving = false;
  let seeded = false;

  $: if (canReveal && !seeded) {
    seeded = true;
    name = $store.config?.senderName || $store.config?.newsletterTitle || ($onboarding.noWebsite ? "" : siteNameFromUrl($onboarding.url)) || $store.given_name || "";
  }

  $: shown = name.trim() || "AIBAN";

  async function save() {
    error = "";
    const v = name.trim();
    if (v.length < 2) {
      error = $ob.senderName.errors.empty;
      return;
    }
    if (v.length > 60) {
      error = $ob.senderName.errors.long;
      return;
    }
    saving = true;
    try {
      const saved = await saveToConfig({ senderName: v });
      if (!saved) saveToStore({ config: { ...$store.config, senderName: v } });
      updateOnboarding({ senderSkipped: false });
      nextStep();
    } catch (e) {
      console.error("[onboarding/sender-name]", e);
      error = $ob.senderName.errors.save;
    } finally {
      saving = false;
    }
  }

  function skip() {
    updateOnboarding({ senderSkipped: true });
    nextStep();
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.senderName.title}
  why={$ob.senderName.why}
  skipNote={$ob.senderName.skipNote}
  primaryLabel={$ob.senderName.save}
  onPrimary={save}
  loading={saving}
  optional
  onSkip={skip}
>
  <div class="ob-field">
    <label class="ob-label" for="ob-sender-name">{$ob.senderName.label}</label>
    <input
      id="ob-sender-name"
      class="ob-input"
      type="text"
      maxlength="60"
      autocomplete="organization"
      placeholder={$ob.senderName.placeholder}
      bind:value={name}
      aria-invalid={error ? "true" : undefined}
      aria-describedby="ob-sender-name-hint"
    />
    <p class="ob-hint" id="ob-sender-name-hint">{$ob.senderName.hint}</p>
  </div>

  <div class="ob-field">
    <span class="ob-label">{$ob.senderName.previewLabel}</span>
    <EmailFrame
      from={shown}
      to={$store.configuratorEmail || ""}
      subject={$onboarding.previewSubject || $ob.preview.defaultSubject}
      html={`<p style="font-size:15px;line-height:1.6;color:#555">${escapeHtml($ob.senderName.previewBody)}</p>`}
      minHeight="7rem"
      labels={{ from: $ob.preview.inboxFrom, to: $ob.preview.inboxTo, subject: $ob.preview.inboxSubject }}
    />
  </div>

  {#if error}<p class="ob-error" role="alert">{error}</p>{/if}
</OnboardingShell>
