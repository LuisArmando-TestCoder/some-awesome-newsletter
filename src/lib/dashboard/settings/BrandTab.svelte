<!-- WS4. Settings > Brand: logo, newsletter name, subject line and brand color,
     with a live preview of the top of an issue. -->
<script lang="ts">
  import { onMount } from "svelte";
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Notice from "../ui/Notice.svelte";
  import SaveBar from "./SaveBar.svelte";
  import LogoUpload from "./LogoUpload.svelte";
  import EmailFrame from "../../../components/systems/steps/StepsTowardsPublish/stages/NewFlow/EmailFrame.svelte";
  import { toast } from "$lib/ui/components/toast";
  import store, { saveToConfig } from "../../../components/store";
  import { dt } from "../i18n";
  import { escapeHtml, safeImageSrc, normalizeHex, onColor, DEFAULT_BRAND_COLOR } from "./emailHtml";

  type Draft = { logo: string; title: string; subject: string; color: string };

  let draft: Draft = { logo: "", title: "", subject: "", color: "" };
  let saved: Draft = { ...draft };
  let saving = false;
  let error = "";
  let colorError = "";
  let lastConfig: unknown = null;

  function fromConfig(cfg: any): Draft {
    return {
      logo: cfg?.logo || "",
      title: cfg?.newsletterTitle || cfg?.email?.newsletterTitle || "",
      subject: cfg?.newsletterSubject || cfg?.email?.newsletterSubject || "",
      color: normalizeHex(cfg?.brandColor) || "",
    };
  }
  function load() {
    saved = fromConfig($store.config);
    draft = { ...saved };
    lastConfig = $store.config;
  }
  onMount(load);
  // Pick up changes made elsewhere while nothing is being edited here.
  $: if ($store.config && $store.config !== lastConfig && !dirty && !saving) load();

  $: dirty = JSON.stringify(draft) !== JSON.stringify(saved);
  $: color = normalizeHex(draft.color) || DEFAULT_BRAND_COLOR;
  $: senderName = $store.config?.senderName || $store.config?.email?.senderName || "";
  $: shownTitle = draft.title.trim() || senderName || $dt("dash.settings.brand.previewTitleFallback");

  $: logoSrc = safeImageSrc(draft.logo);
  $: previewHtml = `
    <div style="max-width:560px;margin:0 auto;font-family:Arial,Helvetica,sans-serif;color:#1a1a17">
      <div style="text-align:center;padding:16px 0 12px">
        ${logoSrc
          ? `<img src="${logoSrc}" alt="${escapeHtml(shownTitle)}" height="44" style="height:44px;width:auto;max-width:220px;display:inline-block;border:0">`
          : `<p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:22px;font-weight:700">${escapeHtml(shownTitle)}</p>`}
      </div>
      <div style="height:4px;background:${color};border-radius:2px"></div>
      <h2 style="font-family:Georgia,'Times New Roman',serif;font-size:20px;line-height:1.3;margin:20px 0 8px">${escapeHtml($dt("dash.settings.brand.previewHeading"))}</h2>
      <p style="font-size:15px;line-height:1.6;margin:0 0 16px;color:#4a4943">${escapeHtml($dt("dash.settings.brand.previewBody"))}</p>
      <span style="display:inline-block;background:${color};color:${onColor(color)};padding:10px 18px;border-radius:6px;font-size:14px;font-weight:700">${escapeHtml($dt("dash.settings.brand.previewButton"))}</span>
    </div>`;

  function onColorText(v: string) {
    draft.color = v;
    colorError = "";
  }

  async function save() {
    error = "";
    colorError = "";
    if (draft.color.trim() && !normalizeHex(draft.color)) {
      colorError = $dt("dash.settings.brand.colorError");
      return;
    }
    saving = true;
    const title = draft.title.trim();
    const subject = draft.subject.trim();
    const patch: Record<string, unknown> = {
      logo: draft.logo,
      newsletterTitle: title,
      newsletterSubject: subject,
      brandColor: normalizeHex(draft.color),
      // The sending service reads email.* first, so keep both copies in step.
      email: { ...($store.config?.email ?? {}), newsletterTitle: title, newsletterSubject: subject },
    };
    try {
      const result = await saveToConfig(patch);
      if (!result) throw new Error("save failed");
      saved = { ...draft, title, subject, color: normalizeHex(draft.color) };
      draft = { ...saved };
      lastConfig = $store.config;
      toast.success($dt("dash.settings.brand.saved"));
    } catch {
      error = $dt("dash.settings.save.error");
    } finally {
      saving = false;
    }
  }
</script>

<div class="tab">
  <div class="tab__form">
    <Card title={$dt("dash.settings.brand.logoTitle")} subtitle={$dt("dash.settings.brand.logoSub")}>
      <LogoUpload bind:value={draft.logo} />
    </Card>

    <Card title={$dt("dash.settings.brand.nameTitle")}>
      <div class="stack">
        <Field id="set-title" label={$dt("dash.settings.brand.titleLabel")} hint={$dt("dash.settings.brand.titleHint")} optional optionalLabel={$dt("dash.settings.optional")}>
          <input id="set-title" type="text" maxlength="80" autocomplete="organization" bind:value={draft.title} placeholder={$dt("dash.settings.brand.titlePlaceholder")} aria-describedby="set-title-hint" />
        </Field>
        <Field id="set-subject" label={$dt("dash.settings.brand.subjectLabel")} hint={$dt("dash.settings.brand.subjectHint")} optional optionalLabel={$dt("dash.settings.optional")}>
          <input id="set-subject" type="text" maxlength="120" bind:value={draft.subject} placeholder={$dt("dash.settings.brand.subjectPlaceholder")} aria-describedby="set-subject-hint" />
        </Field>
      </div>
    </Card>

    <Card title={$dt("dash.settings.brand.colorTitle")}>
      <Field id="set-color" label={$dt("dash.settings.brand.colorLabel")} hint={$dt("dash.settings.brand.colorHint")} error={colorError || null} optional optionalLabel={$dt("dash.settings.optional")}>
        <div class="color">
          <input
            class="color__swatch"
            type="color"
            value={color}
            aria-label={$dt("dash.settings.brand.colorPicker")}
            on:input={(e) => onColorText(e.currentTarget.value)}
          />
          <input
            id="set-color"
            type="text"
            inputmode="text"
            spellcheck="false"
            maxlength="7"
            value={draft.color}
            placeholder={DEFAULT_BRAND_COLOR}
            aria-describedby="set-color-hint"
            on:input={(e) => onColorText(e.currentTarget.value)}
          />
        </div>
      </Field>
    </Card>
  </div>

  <aside class="tab__preview" aria-label={$dt("dash.settings.brand.previewLabel")}>
    <p class="tab__preview-title">{$dt("dash.settings.brand.previewLabel")}</p>
    <EmailFrame
      from={senderName || $dt("dash.settings.sending.previewFromFallback")}
      subject={draft.subject.trim() || $dt("dash.settings.brand.previewSubjectFallback")}
      html={previewHtml}
      minHeight="20rem"
      title={$dt("dash.settings.brand.previewLabel")}
      labels={{ from: $dt("dash.settings.preview.from"), to: $dt("dash.settings.preview.to"), subject: $dt("dash.settings.preview.subject") }}
    />
    <p class="tab__preview-note">{$dt("dash.settings.brand.previewNote")}</p>
  </aside>
</div>

{#if error}
  <div class="tab__error"><Notice tone="danger">{error}</Notice></div>
{/if}
<SaveBar {dirty} {saving} onSave={save} onDiscard={load} />

<style lang="scss">
  @use "./settings.scss";
  .color { display: flex; gap: var(--space-2); align-items: stretch; }
  .color__swatch {
    flex: 0 0 auto;
    width: var(--control-h, 44px);
    height: var(--control-h, 44px);
    padding: var(--space-1);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-1);
    cursor: pointer;
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
</style>
