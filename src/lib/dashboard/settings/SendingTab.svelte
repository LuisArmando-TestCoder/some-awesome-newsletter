<!-- WS4. Settings > Sending email: sender name, mailing address, email signature with a realistic
     preview. Issues always go out from AIBAN's address with the owner's sender name, and replies go
     to the owner's account email. Owner email app passwords were removed for security (Luis,
     2026-10-30): this tab never asks for, stores or shows email login details. -->
<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Notice from "../ui/Notice.svelte";
  import ToggleSwitch from "../ui/ToggleSwitch.svelte";
  import SaveBar from "./SaveBar.svelte";
  import EmailFrame from "../../../components/systems/steps/StepsTowardsPublish/stages/NewFlow/EmailFrame.svelte";
  import { toast } from "$lib/ui/components/toast";
  import store, { saveToConfig } from "../../../components/store";
  import { dt } from "../i18n";
  import { escapeHtml, buildSignature, normalizeHex, EMPTY_SIGNATURE, type SignatureFields } from "./emailHtml";

  type Draft = {
    senderName: string;
    postalAddress: string;
    showSignature: boolean;
    sig: SignatureFields;
  };

  let draft: Draft = blank();
  let saved: Draft = blank();
  let legacySignature = "";
  let saving = false;
  let error = "";
  let lastConfig: unknown = null;

  function blank(): Draft {
    return { senderName: "", postalAddress: "", showSignature: false, sig: { ...EMPTY_SIGNATURE } };
  }

  function fromConfig(cfg: any): Draft {
    const fields = cfg?.emailSignatureFields;
    return {
      senderName: cfg?.senderName || cfg?.email?.senderName || "",
      postalAddress: cfg?.postalAddress || "",
      showSignature: cfg?.showEmailSignature === true,
      sig: { ...EMPTY_SIGNATURE, ...(fields && typeof fields === "object" ? fields : {}) },
    };
  }

  function load() {
    const cfg = $store.config as any;
    saved = fromConfig(cfg);
    draft = structuredClone(saved);
    legacySignature = cfg?.emailSignature && !cfg?.emailSignatureFields ? String(cfg.emailSignature) : "";
    error = "";
    lastConfig = $store.config;
  }
  onMount(load);
  $: if ($store.config && $store.config !== lastConfig && !dirty && !saving) load();

  $: dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  $: brandColor = normalizeHex(($store.config as any)?.brandColor);
  $: sigFilled = Object.values(draft.sig).some((v) => String(v).trim());
  $: signatureHtml = sigFilled ? buildSignature(draft.sig, brandColor || undefined) : legacySignature;
  $: replyTo = String($store.configuratorEmail || "").trim();

  $: fromName = draft.senderName.trim() || $dt("dash.settings.sending.previewFromFallback");
  $: fromAddress = $dt("dash.settings.sending.previewAibanAddress");
  $: previewHtml = `
    <div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1a1a17">
      <p style="font-size:15px;line-height:1.6;margin:0 0 12px">${escapeHtml($dt("dash.settings.sending.previewGreeting"))}</p>
      <p style="font-size:15px;line-height:1.6;margin:0 0 12px">${escapeHtml($dt("dash.settings.sending.previewBody"))}</p>
      ${draft.showSignature && signatureHtml ? `<div style="margin-top:24px">${signatureHtml}</div>` : ""}
      <div style="margin-top:28px;padding-top:16px;border-top:1px solid #e5e3dc;text-align:center;color:#6b6a63;font-size:12px;line-height:1.5">
        ${draft.postalAddress.trim() ? `<p style="margin:0 0 6px">${escapeHtml(draft.postalAddress.trim()).replace(/\n/g, "<br>")}</p>` : ""}
        <p style="margin:0"><span style="text-decoration:underline">${escapeHtml($dt("dash.settings.sending.previewUnsubscribe"))}</span></p>
      </div>
    </div>`;

  async function save() {
    error = "";
    saving = true;
    const senderName = draft.senderName.trim();
    const sig = Object.fromEntries(Object.entries(draft.sig).map(([k, v]) => [k, String(v).trim()])) as SignatureFields;
    const patch: Record<string, unknown> = {
      senderName,
      email: { ...(($store.config as any)?.email ?? {}), senderName },
      postalAddress: draft.postalAddress.trim(),
      showEmailSignature: draft.showSignature,
    };
    if (sigFilled) {
      patch.emailSignatureFields = sig;
      patch.emailSignature = buildSignature(sig, brandColor || undefined);
    } else if (saved.sig && Object.values(saved.sig).some((v) => String(v).trim())) {
      // The fields were cleared on purpose: remove the signature.
      patch.emailSignatureFields = { ...EMPTY_SIGNATURE };
      patch.emailSignature = "";
    }
    // Never send email login fields (appPassword, emailMaskSender, email.auth). The spread of
    // config.email above keeps senderName and other display fields only.
    if (patch.email && typeof patch.email === "object") delete (patch.email as Record<string, unknown>).auth;
    try {
      const result = await saveToConfig(patch);
      if (!result) throw new Error("save failed");
      load();
      toast.success($dt("dash.settings.sending.saved"));
    } catch {
      error = $dt("dash.settings.save.error");
    } finally {
      saving = false;
    }
  }
</script>

<div class="tab">
  <div class="tab__form">
    <Card title={$dt("dash.settings.sending.fromTitle")} subtitle={$dt("dash.settings.sending.fromSub")}>
      <div class="stack">
        <Field id="set-sender-name" label={$dt("dash.settings.sending.nameLabel")} hint={$dt("dash.settings.sending.nameHint")} optional optionalLabel={$dt("dash.settings.optional")}>
          <input id="set-sender-name" type="text" maxlength="80" autocomplete="name" bind:value={draft.senderName} placeholder={$dt("dash.settings.sending.namePlaceholder")} aria-describedby="set-sender-name-hint" />
        </Field>

        <div class="own">
          <p class="own__explain" id="set-own-default">{$dt("dash.settings.sending.defaultExplain")}</p>
          {#if replyTo}
            <p class="own__reply">{$dt("dash.settings.sending.replyTo")} <strong>{replyTo}</strong></p>
          {/if}
        </div>
      </div>
    </Card>

    <Card title={$dt("dash.settings.sending.footerTitle")}>
      <Field id="set-postal" label={$dt("dash.settings.sending.postalLabel")} hint={$dt("dash.settings.sending.postalHint")} optional optionalLabel={$dt("dash.settings.optional")}>
        <textarea id="set-postal" rows="3" maxlength="300" autocomplete="street-address" bind:value={draft.postalAddress} placeholder={$dt("dash.settings.sending.postalPlaceholder")} aria-describedby="set-postal-hint"></textarea>
      </Field>
    </Card>

    <Card title={$dt("dash.settings.sending.sigTitle")} subtitle={$dt("dash.settings.sending.sigSub")}>
      <div class="stack">
        <ToggleSwitch bind:checked={draft.showSignature} label={$dt("dash.settings.sending.showSignature")} />
        {#if legacySignature && !sigFilled}
          <Notice tone="info">{$dt("dash.settings.sending.sigLegacy")}</Notice>
        {/if}
        <div class="row">
          <Field id="set-sig-name" label={$dt("dash.settings.sending.sigName")} optional optionalLabel={$dt("dash.settings.optional")}>
            <input id="set-sig-name" type="text" maxlength="80" autocomplete="name" bind:value={draft.sig.name} placeholder={$dt("dash.settings.sending.sigNamePlaceholder")} />
          </Field>
          <Field id="set-sig-role" label={$dt("dash.settings.sending.sigRole")} optional optionalLabel={$dt("dash.settings.optional")}>
            <input id="set-sig-role" type="text" maxlength="80" autocomplete="organization-title" bind:value={draft.sig.role} placeholder={$dt("dash.settings.sending.sigRolePlaceholder")} />
          </Field>
          <Field id="set-sig-company" label={$dt("dash.settings.sending.sigCompany")} optional optionalLabel={$dt("dash.settings.optional")}>
            <input id="set-sig-company" type="text" maxlength="80" autocomplete="organization" bind:value={draft.sig.company} placeholder={$dt("dash.settings.sending.sigCompanyPlaceholder")} />
          </Field>
          <Field id="set-sig-phone" label={$dt("dash.settings.sending.sigPhone")} optional optionalLabel={$dt("dash.settings.optional")}>
            <input id="set-sig-phone" type="tel" maxlength="40" autocomplete="tel" bind:value={draft.sig.phone} placeholder={$dt("dash.settings.sending.sigPhonePlaceholder")} />
          </Field>
        </div>
        <Field id="set-sig-web" label={$dt("dash.settings.sending.sigWebsite")} hint={$dt("dash.settings.sending.sigWebsiteHint")} optional optionalLabel={$dt("dash.settings.optional")}>
          <input id="set-sig-web" type="text" inputmode="url" autocomplete="url" maxlength="200" bind:value={draft.sig.website} placeholder={$dt("dash.settings.sending.sigWebsitePlaceholder")} aria-describedby="set-sig-web-hint" />
        </Field>
        <p class="hint">{$dt("dash.settings.sending.sigSkip")}</p>
      </div>
    </Card>
  </div>

  <aside class="tab__preview" aria-label={$dt("dash.settings.sending.previewLabel")}>
    <p class="tab__preview-title">{$dt("dash.settings.sending.previewLabel")}</p>
    <EmailFrame
      from={`${fromName} <${fromAddress}>`}
      subject={($store.config?.newsletterSubject || "").trim() || $dt("dash.settings.brand.previewSubjectFallback")}
      html={previewHtml}
      minHeight="22rem"
      title={$dt("dash.settings.sending.previewLabel")}
      labels={{ from: $dt("dash.settings.preview.from"), to: $dt("dash.settings.preview.to"), subject: $dt("dash.settings.preview.subject") }}
    />
    <p class="tab__preview-note">{$dt("dash.settings.sending.previewNoteDefault")}</p>
  </aside>
</div>

{#if error}
  <div class="tab__error"><Notice tone="danger">{error}</Notice></div>
{/if}
<SaveBar {dirty} {saving} onSave={save} onDiscard={load} />

<style lang="scss">
  @use "./settings.scss";
  .own { display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-2); border-top: 1px solid var(--border-1); }
  .own__explain { margin: 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .own__reply { margin: 0; font-size: var(--fs-sm); color: var(--text-2); overflow-wrap: anywhere; strong { color: var(--text-1); font-weight: var(--fw-semibold); } }
  .hint { margin: 0; font-size: var(--fs-xs); color: var(--text-3); line-height: var(--lh-normal); }
</style>
