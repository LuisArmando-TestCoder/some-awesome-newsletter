<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import store, { saveToConfig } from "../../../store";
  import getAuthHeaders from "../../requests/getAuthHeaders";
  import PlainText from "../PlainText/PlainText.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";
  // The webhook / publish-to-website section lives in the main locale tree
  import { t as locale } from "$lib/i18n/translations";

  /* ─── Publish to website ─────────────────────────────────── */
  let webhookUrl: string = "";
  let webhookUsername: string = "";
  let webhookPassword: string = "";
  let webhookPostStatus: "draft" | "publish" = "draft";
  let webhookAuthorName: string = "";
  let webhookCategoryHint: string = "";
  let webhookTagsHint: string = "";
  let showPasswordGuide = false;
  let publishSaveSuccess = false;

  /* ─── Security signature ─────────────────────────────────── */
  let newSharedSecret: string | null = null;

  /* ─── API keys ───────────────────────────────────────────── */
  let apiKeys: { hash: string; createdAt: string }[] = [];
  let newApiKey: string | null = null;
  let confirmingDeleteHash: string | null = null;

  /* ──────────────────────────────────────────────────────────
   * REACTIVITY FIX
   * Mirror the same pattern as UpdateNewsSourceForm:
   *   $: if (source) { fields = { ...source } }
   * Whenever $store.config changes (e.g. after saveToConfig),
   * the webhook fields stay in sync without a page reload.
   * ────────────────────────────────────────────────────────── */
  $: if ($store.config) {
    const cfg = $store.config as Record<string, any>;
    // Only overwrite if the store actually carries the value
    if (cfg.webhookUrl         !== undefined) webhookUrl         = cfg.webhookUrl         || "";
    if (cfg.webhookUsername    !== undefined) webhookUsername    = cfg.webhookUsername    || cfg.emailMaskSender || cfg.configuratorId || "";
    if (cfg.webhookPassword    !== undefined) webhookPassword    = cfg.webhookPassword    || "";
    if (cfg.webhookPostStatus  !== undefined) webhookPostStatus  = cfg.webhookPostStatus  || "draft";
    if (cfg.webhookAuthorName  !== undefined) webhookAuthorName  = cfg.webhookAuthorName  || cfg.senderName     || "";
    if (cfg.webhookCategoryHint !== undefined) webhookCategoryHint = cfg.webhookCategoryHint || cfg.newsletterTitle || "";
    if (cfg.webhookTagsHint    !== undefined) webhookTagsHint    = cfg.webhookTagsHint    || "";
  }

  /* ── helpers ─────────────────────────────────────────────── */
  function deriveTagsHint(senderName = "", newsletterTitle = ""): string {
    const stopWords = new Set([
      "the","a","an","and","or","but","in","on","at","to",
      "for","of","with","is","your","our","my","by","that","this",
    ]);
    const raw: string[] = [];
    if (senderName) raw.push(senderName.trim());
    (newsletterTitle || "")
      .toLowerCase()
      .split(/\s+/)
      .forEach(w => {
        const clean = w.replace(/[^a-z0-9]/g, "");
        if (clean.length > 3 && !stopWords.has(clean)) raw.push(clean);
      });
    return [...new Set(raw)].slice(0, 6).join(", ");
  }

  async function fetchConfigData() {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${get(store).apiURL()}/config`, { headers: authHeaders });
    const data = await response.json();

    // Pre-fill from API — only when store doesn't already have values
    const cfg = (get(store).config as Record<string, any>) || {};
    webhookUrl          = cfg.webhookUrl         || data.webhookUrl         || "";
    webhookUsername     = cfg.webhookUsername    || data.webhookUsername     || data.emailMaskSender || data.configuratorId || "";
    webhookPassword     = cfg.webhookPassword    || data.webhookPassword     || "";
    webhookPostStatus   = cfg.webhookPostStatus  || data.webhookPostStatus   || "draft";
    webhookAuthorName   = cfg.webhookAuthorName  || data.webhookAuthorName   || data.senderName     || "";
    webhookCategoryHint = cfg.webhookCategoryHint || data.webhookCategoryHint || data.newsletterTitle || "";
    webhookTagsHint     = cfg.webhookTagsHint    || data.webhookTagsHint     || deriveTagsHint(data.senderName, data.newsletterTitle);

    apiKeys = data.apiKeys || [];
  }

  async function savePublishSettings() {
    await saveToConfig({
      webhookUrl,
      webhookUsername,
      webhookPassword,
      webhookPostStatus,
      webhookAuthorName,
      webhookCategoryHint,
      webhookTagsHint,
    });
    publishSaveSuccess = true;
    setTimeout(() => (publishSaveSuccess = false), 3000);
  }

  async function createSharedSecret() {
    newSharedSecret = null;
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const response = await fetch(`${get(store).apiURL()}/configurations/${configId}/secret`, {
      method: "POST",
      headers: authHeaders,
    });
    const data = await response.json();
    newSharedSecret = data.sharedSecret;
  }

  async function fetchApiKeys() {
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const response = await fetch(`${get(store).apiURL()}/apikeys/${configId}`, { headers: authHeaders });
    const data = await response.json();
    apiKeys = data.apiKeys;
  }

  async function createApiKey() {
    newApiKey = null;
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const response = await fetch(`${get(store).apiURL()}/apikeys/${configId}`, {
      method: "POST",
      headers: authHeaders,
    });
    const data = await response.json();
    newApiKey = data.apiKey;
    await fetchApiKeys();
  }

  async function deleteApiKey(apiKeyHash: string) {
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    await fetch(
      `${get(store).apiURL()}/apikeys/${configId}/${encodeURIComponent(apiKeyHash)}`,
      { method: "DELETE", headers: authHeaders }
    );
    await fetchApiKeys();
    confirmingDeleteHash = null;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  onMount(fetchConfigData);
</script>

<div class="secrets-root">

  <!-- ═══════════════════════════════════════════════════════
       SECTION 1 — Publish to Your Website
  ═══════════════════════════════════════════════════════ -->
  <section class="panel panel--publish">
    <div class="panel__header">
      <div class="panel__title-row">
        <span class="panel__icon">🌐</span>
        <h2 class="panel__title">{$locale.publishToWebsite.title}</h2>
        <span class="chip chip--green">{$locale.publishToWebsite.newBadge}</span>
      </div>
      <p class="panel__desc">{$locale.publishToWebsite.description}</p>
    </div>

    <!-- WHERE ──────────────────────────────────────── -->
    <div class="config-group">
      <h3 class="group-label">
        <span class="group-number">01</span>
        {$locale.publishToWebsite.whereToPublish.title}
      </h3>
      <div class="field-stack">
        <PlainText
          bind:value={webhookUrl}
          type="url"
          label={$locale.publishToWebsite.whereToPublish.urlLabel}
          placeholder={$locale.publishToWebsite.whereToPublish.urlPlaceholder}
        />
        <p class="field-hint">{$locale.publishToWebsite.whereToPublish.urlHint}</p>
      </div>
    </div>

    <!-- WHO ────────────────────────────────────────── -->
    <div class="config-group">
      <h3 class="group-label">
        <span class="group-number">02</span>
        {$locale.publishToWebsite.whosPublishing.title}
      </h3>
      <div class="two-col">
        <div class="field-stack">
          <PlainText
            bind:value={webhookUsername}
            label={$locale.publishToWebsite.whosPublishing.usernameLabel}
            placeholder={$locale.publishToWebsite.whosPublishing.usernamePlaceholder}
          />
          <p class="field-hint">{$locale.publishToWebsite.whosPublishing.usernameHint}</p>
        </div>
        <div class="field-stack">
          <PlainText
            bind:value={webhookPassword}
            type="password"
            label={$locale.publishToWebsite.whosPublishing.passwordLabel}
            placeholder={$locale.publishToWebsite.whosPublishing.passwordPlaceholder}
          />
          <p class="field-hint">{$locale.publishToWebsite.whosPublishing.passwordHint}</p>
          <button
            class="guide-toggle"
            on:click={() => (showPasswordGuide = !showPasswordGuide)}
          >
            {showPasswordGuide
              ? $locale.publishToWebsite.whosPublishing.passwordGuideHide
              : $locale.publishToWebsite.whosPublishing.howToGetPassword} ↕
          </button>
          {#if showPasswordGuide}
            <ol class="guide-steps">
              <li>{$locale.publishToWebsite.whosPublishing.step1}</li>
              <li>{$locale.publishToWebsite.whosPublishing.step2}</li>
              <li>{$locale.publishToWebsite.whosPublishing.step3}</li>
            </ol>
          {/if}
        </div>
      </div>
      <div class="callout callout--amber">
        <span class="callout__icon">💡</span>
        <p>{$locale.publishToWebsite.whosPublishing.authNote}</p>
      </div>
    </div>

    <!-- HOW ────────────────────────────────────────── -->
    <div class="config-group">
      <h3 class="group-label">
        <span class="group-number">03</span>
        {$locale.publishToWebsite.howToPublish.title}
      </h3>

      <div class="field-stack">
        <label class="modern-label">{$locale.publishToWebsite.howToPublish.statusLabel}</label>
        <div class="radio-pills">
          <label class="radio-pill" class:active={webhookPostStatus === "draft"}>
            <input type="radio" bind:group={webhookPostStatus} value="draft" />
            <span>✏️ {$locale.publishToWebsite.howToPublish.statusDraft}</span>
          </label>
          <label class="radio-pill" class:active={webhookPostStatus === "publish"}>
            <input type="radio" bind:group={webhookPostStatus} value="publish" />
            <span>🚀 {$locale.publishToWebsite.howToPublish.statusPublish}</span>
          </label>
        </div>
      </div>

      <div class="two-col">
        <div class="field-stack">
          <PlainText
            bind:value={webhookAuthorName}
            label={$locale.publishToWebsite.howToPublish.authorLabel}
            placeholder={$locale.publishToWebsite.howToPublish.authorPlaceholder || webhookAuthorName || "Your name"}
          />
          <p class="field-hint">{$locale.publishToWebsite.howToPublish.authorHint}</p>
        </div>
        <div class="field-stack">
          <PlainText
            bind:value={webhookCategoryHint}
            label={$locale.publishToWebsite.howToPublish.categoryLabel}
            placeholder={$locale.publishToWebsite.howToPublish.categoryPlaceholder || webhookCategoryHint}
          />
          <p class="field-hint">{$locale.publishToWebsite.howToPublish.categoryHint}</p>
        </div>
      </div>

      <div class="field-stack">
        <PlainText
          bind:value={webhookTagsHint}
          label={$locale.publishToWebsite.howToPublish.tagsLabel}
          placeholder={$locale.publishToWebsite.howToPublish.tagsPlaceholder}
        />
        <p class="field-hint">{$locale.publishToWebsite.howToPublish.tagsHint}</p>
      </div>
    </div>

    <div class="panel__footer">
      <SubmitButton label={$locale.publishToWebsite.saveSettings} callback={savePublishSettings} />
      {#if publishSaveSuccess}
        <span class="success-toast">✅ {$locale.publishToWebsite.savedSuccess}</span>
      {/if}
    </div>
  </section>

  <!-- ═══════════════════════════════════════════════════════
       SECTION 2 — Security Signature (HMAC)
  ═══════════════════════════════════════════════════════ -->
  <section class="panel panel--security">
    <div class="panel__header">
      <div class="panel__title-row">
        <span class="panel__icon">🔐</span>
        <h2 class="panel__title">{$t['secrets.signatureTitle']}</h2>
        <span class="chip chip--indigo">{$t['secrets.developerRequired']}</span>
      </div>
      <p class="panel__desc">{$t['secrets.signatureDesc']}</p>
    </div>

    {#if newSharedSecret}
      <div class="reveal-card reveal-card--warning">
        <div class="reveal-card__banner">
          <span>⚠️</span>
          <strong>{$t['secrets.copyNow']}</strong>
          <span>{$t['secrets.wontShowAgain']}</span>
        </div>
        <div class="mono-row">
          <code class="mono-text">{newSharedSecret}</code>
          <button class="copy-btn" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>
            <span>📋</span> {$t['secrets.copy']}
          </button>
        </div>
      </div>
    {:else}
      <button class="action-btn action-btn--outline" on:click={createSharedSecret}>
        🔑 {$t['secrets.generateSignature']}
      </button>
    {/if}
  </section>

  <!-- ═══════════════════════════════════════════════════════
       SECTION 3 — API Keys
  ═══════════════════════════════════════════════════════ -->
  <section class="panel panel--api">
    <div class="panel__header">
      <div class="panel__title-row">
        <span class="panel__icon">⚡</span>
        <h2 class="panel__title">{$t['secrets.apiTitle']}</h2>
      </div>
      <p class="panel__desc">{$t['secrets.apiDesc']}</p>
    </div>

    {#if newApiKey}
      <div class="reveal-card reveal-card--success">
        <div class="reveal-card__banner">
          <span>✅</span>
          <strong>{$t['secrets.keyGenerated']}</strong>
        </div>
        <div class="mono-row">
          <code class="mono-text">{newApiKey}</code>
          <button class="copy-btn" on:click={() => newApiKey && copyToClipboard(newApiKey)}>
            <span>📋</span> {$t['secrets.copy']}
          </button>
        </div>
        <p class="small-hint">🔒 {$t['secrets.storeSecurely']}</p>
      </div>
    {/if}

    <button class="action-btn action-btn--primary" on:click={createApiKey}>
      ＋ {$t['secrets.createNewKey']}
    </button>

    <div class="keys-table-wrapper">
      <h3 class="table-heading">{$t['secrets.activeConnections']}</h3>
      <div class="keys-table">
        <div class="keys-table__head">
          <span>{$t['secrets.keySnapshot']}</span>
          <span>{$t['articleModal.created']}</span>
          <span>{$t['newsSource.actions']}</span>
        </div>
        {#each apiKeys as key}
          <div class="keys-table__row">
            <span><code class="hash-badge">{key.hash.substring(0, 12)}…</code></span>
            <span class="date-cell">{new Date(key.createdAt).toLocaleDateString()}</span>
            <span>
              {#if confirmingDeleteHash === key.hash}
                <div class="confirm-row">
                  <button class="micro-btn micro-btn--danger" on:click={() => deleteApiKey(key.hash)}>
                    {$t['labels.confirm']}
                  </button>
                  <button class="micro-btn micro-btn--ghost" on:click={() => (confirmingDeleteHash = null)}>
                    {$t['labels.cancel']}
                  </button>
                </div>
              {:else}
                <button class="micro-btn micro-btn--danger-ghost" on:click={() => (confirmingDeleteHash = key.hash)}>
                  {$t['secrets.revokeAccess']}
                </button>
              {/if}
            </span>
          </div>
        {/each}
        {#if apiKeys.length === 0}
          <div class="keys-table__empty">{$t['labels.noData']}</div>
        {/if}
      </div>
    </div>
  </section>

</div>

<style lang="scss">
  /* ── Design tokens ────────────────────────────────────────── */
  :root {
    --s-radius: 16px;
    --s-radius-sm: 10px;
    --s-shadow: 0 2px 12px rgba(0,0,0,.06), 0 1px 3px rgba(0,0,0,.04);
    --s-shadow-md: 0 8px 32px rgba(0,0,0,.10);
    --s-border: 1px solid rgba(0,0,0,.07);
    --s-green: #16a34a;
    --s-green-bg: #f0fdf4;
    --s-green-border: #bbf7d0;
    --s-indigo: #4f46e5;
    --s-indigo-bg: #eef2ff;
    --s-indigo-border: #c7d2fe;
    --s-amber: #92400e;
    --s-amber-bg: #fffbeb;
    --s-amber-border: #fde68a;
    --s-red: #dc2626;
    --s-mono-bg: #0f172a;
    --s-mono-fg: #e2e8f0;
  }

  .secrets-root {
    max-width: 860px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 28px;
    padding: 8px 0 40px;
  }

  /* ── Panels ───────────────────────────────────────────────── */
  .panel {
    background: #fff;
    border: var(--s-border);
    border-radius: var(--s-radius);
    box-shadow: var(--s-shadow);
    overflow: hidden;
    transition: box-shadow .2s ease;
    &:hover { box-shadow: var(--s-shadow-md); }
  }

  .panel__header {
    padding: 28px 32px 20px;
    border-bottom: var(--s-border);
    background: linear-gradient(135deg, #fafafa 0%, #f5f5f5 100%);
  }

  .panel--publish .panel__header { background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%); }
  .panel--security .panel__header { background: linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%); }
  .panel--api .panel__header { background: linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%); }

  .panel__title-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 8px;
  }

  .panel__icon {
    font-size: 1.4rem;
    line-height: 1;
  }

  .panel__title {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 700;
    color: #0f172a;
    letter-spacing: -.02em;
  }

  .panel__desc {
    margin: 0;
    font-size: 0.875rem;
    color: #64748b;
    line-height: 1.6;
    max-width: 620px;
  }

  /* config groups inside a panel */
  .config-group {
    padding: 24px 32px;
    border-bottom: var(--s-border);
    &:last-of-type { border-bottom: none; }
  }

  .group-label {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 0 0 18px;
    font-size: 0.9rem;
    font-weight: 700;
    color: #334155;
    text-transform: uppercase;
    letter-spacing: .08em;
  }

  .group-number {
    display: inline-flex;
    width: 24px;
    height: 24px;
    align-items: center;
    justify-content: center;
    background: #0f172a;
    color: #fff;
    border-radius: 50%;
    font-size: 0.7rem;
    font-weight: 800;
    letter-spacing: 0;
  }

  /* ── Form helpers ─────────────────────────────────────────── */
  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 640px) { grid-template-columns: 1fr; }
  }

  .field-stack {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .field-hint {
    margin: 0;
    font-size: 0.78rem;
    color: #94a3b8;
    line-height: 1.5;
  }

  .modern-label {
    font-size: 0.82rem;
    font-weight: 600;
    color: #475569;
    letter-spacing: .02em;
  }

  /* ── Radio pills ──────────────────────────────────────────── */
  .radio-pills {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 4px;
  }

  .radio-pill {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    border: 1.5px solid #e2e8f0;
    border-radius: 100px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #64748b;
    cursor: pointer;
    transition: all .18s ease;
    user-select: none;

    input[type="radio"] { display: none; }

    &:hover {
      border-color: #94a3b8;
      color: #334155;
    }

    &.active {
      border-color: #0f172a;
      background: #0f172a;
      color: #fff;
    }
  }

  /* ── Guide ────────────────────────────────────────────────── */
  .guide-toggle {
    background: none;
    border: none;
    color: var(--s-indigo);
    font-size: 0.8rem;
    font-weight: 500;
    cursor: pointer;
    padding: 0;
    text-decoration: none;
    width: fit-content;
    transition: opacity .15s;
    &:hover { opacity: .7; }
  }

  .guide-steps {
    background: var(--s-indigo-bg);
    border: 1px solid var(--s-indigo-border);
    border-radius: var(--s-radius-sm);
    padding: 14px 20px;
    font-size: 0.84rem;
    color: #1e1b4b;
    margin: 4px 0 0;
    li { margin-bottom: 6px; line-height: 1.5; }
    li:last-child { margin-bottom: 0; }
  }

  /* ── Callout ──────────────────────────────────────────────── */
  .callout {
    display: flex;
    gap: 10px;
    padding: 12px 16px;
    border-radius: var(--s-radius-sm);
    font-size: 0.82rem;
    line-height: 1.5;
    margin-top: 12px;

    &--amber {
      background: var(--s-amber-bg);
      border: 1px solid var(--s-amber-border);
      color: var(--s-amber);
    }

    p { margin: 0; }
  }

  .callout__icon { font-size: 1rem; flex-shrink: 0; margin-top: 1px; }

  /* ── Chips / badges ───────────────────────────────────────── */
  .chip {
    padding: 3px 10px;
    border-radius: 100px;
    font-size: 0.68rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    flex-shrink: 0;

    &--green  { background: var(--s-green-bg);  color: var(--s-green);  border: 1px solid var(--s-green-border); }
    &--indigo { background: var(--s-indigo-bg); color: var(--s-indigo); border: 1px solid var(--s-indigo-border); }
  }

  /* ── Panel footer ─────────────────────────────────────────── */
  .panel__footer {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 20px 32px;
    background: #fafafa;
    border-top: var(--s-border);
  }

  .success-toast {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--s-green);
    animation: fadeIn .3s ease;
  }

  @keyframes fadeIn { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }

  /* ── Security / API panels inner padding ─────────────────── */
  .panel--security,
  .panel--api {
    padding: 0;
    .panel__header { margin-bottom: 0; }
  }

  .panel--security > *:not(.panel__header),
  .panel--api > *:not(.panel__header) {
    padding-left: 32px;
    padding-right: 32px;
  }

  .panel--security > button,
  .panel--api > button { margin: 24px 32px; }

  /* ── Reveal card ─────────────────────────────────────────── */
  .reveal-card {
    margin: 24px 32px 0;
    border-radius: var(--s-radius-sm);
    overflow: hidden;

    &--warning {
      border: 1px solid var(--s-amber-border);
      .reveal-card__banner { background: var(--s-amber-bg); color: var(--s-amber); }
    }
    &--success {
      border: 1px solid var(--s-green-border);
      .reveal-card__banner { background: var(--s-green-bg); color: var(--s-green); }
    }
  }

  .reveal-card__banner {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 16px;
    font-size: 0.82rem;
    border-bottom: inherit;
  }

  .mono-row {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 16px;
    background: var(--s-mono-bg);
  }

  .mono-text {
    flex: 1;
    color: var(--s-mono-fg);
    font-family: 'Fira Mono', 'Courier New', monospace;
    font-size: 0.88rem;
    overflow-x: auto;
    white-space: nowrap;
  }

  .copy-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    background: rgba(255,255,255,.12);
    color: #fff;
    border: 1px solid rgba(255,255,255,.2);
    padding: 6px 14px;
    border-radius: 6px;
    font-size: 0.8rem;
    font-weight: 600;
    cursor: pointer;
    flex-shrink: 0;
    transition: background .15s;
    &:hover { background: rgba(255,255,255,.22); }
  }

  .small-hint {
    padding: 8px 16px 14px;
    margin: 0;
    font-size: 0.78rem;
    color: #64748b;
    background: #fff;
  }

  /* ── Action buttons ───────────────────────────────────────── */
  .action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 22px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .18s ease;
    border: none;

    &--primary {
      background: #0f172a;
      color: #fff;
      &:hover { background: #1e293b; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(15,23,42,.2); }
    }
    &--outline {
      background: transparent;
      color: #0f172a;
      border: 1.5px solid #cbd5e1;
      &:hover { border-color: #0f172a; background: #f8fafc; }
    }
  }

  /* ── API keys table ───────────────────────────────────────── */
  .keys-table-wrapper {
    padding: 0 32px 32px;
  }

  .table-heading {
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .07em;
    color: #94a3b8;
    margin: 0 0 12px;
  }

  .keys-table {
    border: var(--s-border);
    border-radius: var(--s-radius-sm);
    overflow: hidden;
  }

  .keys-table__head {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    padding: 10px 16px;
    background: #f8fafc;
    border-bottom: var(--s-border);
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: .06em;
    color: #94a3b8;
  }

  .keys-table__row {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    padding: 12px 16px;
    border-bottom: var(--s-border);
    font-size: 0.88rem;
    &:last-child { border-bottom: none; }
    &:hover { background: #f8fafc; }
  }

  .hash-badge {
    background: #f1f5f9;
    color: #1e293b;
    padding: 3px 8px;
    border-radius: 5px;
    font-family: 'Fira Mono', 'Courier New', monospace;
    font-size: 0.8rem;
  }

  .date-cell { color: #64748b; font-size: 0.82rem; }

  .keys-table__empty {
    padding: 40px;
    text-align: center;
    color: #94a3b8;
    font-size: 0.88rem;
  }

  /* ── Micro buttons ────────────────────────────────────────── */
  .confirm-row { display: flex; gap: 8px; align-items: center; }

  .micro-btn {
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.78rem;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
    border: none;

    &--danger       { background: var(--s-red); color: #fff; &:hover { background: #b91c1c; } }
    &--ghost        { background: #f1f5f9; color: #475569; border: 1px solid #e2e8f0; &:hover { background: #e2e8f0; } }
    &--danger-ghost { background: none; color: var(--s-red); border: 1px solid #fecaca; &:hover { background: #fef2f2; } }
  }
</style>
