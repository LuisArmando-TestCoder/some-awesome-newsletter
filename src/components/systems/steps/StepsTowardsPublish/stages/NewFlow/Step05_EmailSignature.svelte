<script lang="ts">
  // Onboarding slot 7: "Email signature" (optional), shown inside a realistic email.
  // Replaces the Quill/HTML editor of Step05_Signature in onboarding. Advanced editing
  // stays in the dashboard settings.
  import store, { saveToConfig, saveToStore } from "../../../../../store";
  import OnboardingShell from "./OnboardingShell.svelte";
  import EmailFrame from "./EmailFrame.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { escapeHtml, normalizeUrl } from "./infer";

  export let canReveal = false;
  const INDEX = 7;

  let name = "";
  let role = "";
  let link = "";
  let saving = false;
  let error = "";
  let seeded = false;

  $: if (canReveal && !seeded) {
    seeded = true;
    name = $store.given_name || $store.config?.senderName || "";
    link = $onboarding.noWebsite ? "" : $onboarding.url;
  }

  function buildSignature(n: string, r: string, l: string): string {
    const url = l.trim() ? normalizeUrl(l) : "";
    const shown = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
    const parts = [
      n.trim() ? `<strong style="font-size:15px;color:#1a1a1a">${escapeHtml(n.trim())}</strong>` : "",
      r.trim() ? `<span style="color:#555555">${escapeHtml(r.trim())}</span>` : "",
      url ? `<a href="${escapeHtml(url)}" style="color:#2f4ac0;text-decoration:none">${escapeHtml(shown)}</a>` : "",
    ].filter(Boolean);
    if (!parts.length) return "";
    return `<table role="presentation" cellpadding="0" cellspacing="0" style="font-family:Arial,Helvetica,sans-serif;font-size:14px;line-height:1.5;border-top:1px solid #e5e5e5;padding-top:12px;margin-top:16px"><tr><td>${parts.join("<br>")}</td></tr></table>`;
  }

  $: signature = buildSignature(name, role, link);
  $: previewHtml = `<p style="font-size:15px;line-height:1.6">${escapeHtml($ob.signature.previewBody)}</p>${signature}`;
  $: hasExisting = !!$store.config?.emailSignature && !$onboarding.signatureSaved;

  async function save() {
    error = "";
    if (!signature) {
      nextStep();
      return;
    }
    saving = true;
    try {
      const saved = await saveToConfig({ emailSignature: signature });
      if (!saved) saveToStore({ config: { ...$store.config, emailSignature: signature } });
      updateOnboarding({ signatureSaved: true });
      nextStep();
    } catch (e) {
      console.error("[onboarding/signature]", e);
      error = $ob.schedule.errors.create;
    } finally {
      saving = false;
    }
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.signature.title}
  why={$ob.signature.why}
  skipNote={$ob.signature.skipNote}
  primaryLabel={$ob.signature.save}
  onPrimary={save}
  loading={saving}
  optional
  onSkip={nextStep}
>
  <div class="grid">
    <div class="ob-field">
      <label class="ob-label" for="ob-sig-name">{$ob.signature.nameLabel}</label>
      <input id="ob-sig-name" class="ob-input" type="text" autocomplete="name" placeholder={$ob.signature.namePlaceholder} bind:value={name} />
    </div>
    <div class="ob-field">
      <label class="ob-label" for="ob-sig-role">{$ob.signature.roleLabel}</label>
      <input id="ob-sig-role" class="ob-input" type="text" autocomplete="organization-title" placeholder={$ob.signature.rolePlaceholder} bind:value={role} />
    </div>
  </div>
  <div class="ob-field">
    <label class="ob-label" for="ob-sig-link">{$ob.signature.linkLabel}</label>
    <input id="ob-sig-link" class="ob-input" type="text" inputmode="url" autocomplete="url" placeholder={$ob.signature.linkPlaceholder} bind:value={link} aria-describedby="ob-sig-link-hint" />
    <p class="ob-hint" id="ob-sig-link-hint">{$ob.signature.linkHint}</p>
  </div>

  <div class="ob-field">
    <span class="ob-label">{$ob.signature.previewLabel}</span>
    <EmailFrame
      from={$store.config?.senderName || "AIBAN"}
      to={$store.configuratorEmail || ""}
      subject={$onboarding.previewSubject || $ob.preview.defaultSubject}
      html={previewHtml}
      minHeight="12rem"
      labels={{ from: $ob.preview.inboxFrom, to: $ob.preview.inboxTo, subject: $ob.preview.inboxSubject }}
    />
  </div>
  {#if hasExisting}<p class="ob-hint">{$ob.signature.existingNote}</p>{/if}
  {#if error}<p class="ob-error" role="alert">{error}</p>{/if}
</OnboardingShell>

<style lang="scss">
  .grid { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4, 16px); }
  @media (max-width: 560px) { .grid { grid-template-columns: 1fr; } }
</style>
