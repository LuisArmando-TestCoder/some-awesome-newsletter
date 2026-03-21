<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import store, { saveToConfig } from "../../../store";
  import getAuthHeaders from "../../requests/getAuthHeaders";
  import PlainText from "../PlainText/PlainText.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

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

  /* ── helpers ─────────────────────────────────────────────── */

  /**
   * Derive simple comma-separated tag suggestions from the brand/newsletter
   * data already stored in the config. If the user has stored webhookTagsHint
   * already we use that instead, so edits are preserved.
   */
  function deriveTagsHint(senderName = "", newsletterTitle = ""): string {
    const stopWords = new Set([
      "the", "a", "an", "and", "or", "but", "in", "on", "at", "to",
      "for", "of", "with", "is", "your", "our", "my", "by", "that", "this",
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

    // Publish-to-website — pre-fill from existing config data where not set
    webhookUrl         = data.webhookUrl         || "";
    webhookUsername    = data.webhookUsername     || data.emailMaskSender || data.configuratorId || "";
    webhookPassword    = data.webhookPassword     || "";
    webhookPostStatus  = data.webhookPostStatus   || "draft";
    webhookAuthorName  = data.webhookAuthorName   || data.senderName     || "";
    webhookCategoryHint = data.webhookCategoryHint || data.newsletterTitle || "";
    webhookTagsHint    = data.webhookTagsHint     || deriveTagsHint(data.senderName, data.newsletterTitle);

    // API keys
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

<div class="secrets-container">

  <!-- ─── SECTION 1: Publish to Your Website ─────────────────── -->
  <div class="card-section">
    <div class="header-with-badge">
      <h3 class="secrets-title">{$t['webhook.sectionTitle']}</h3>
      <span class="badge new-feature">{$t['webhook.sectionBadge']}</span>
    </div>
    <p class="section-desc">{$t['webhook.sectionDesc']}</p>

    <!-- WHERE: website URL -->
    <div class="sub-section">
      <h4 class="sub-title">{$t['webhook.whereTitle']}</h4>
      <PlainText
        bind:value={webhookUrl}
        type="url"
        label={$t['webhook.baseUrl']}
        placeholder={$t['webhook.baseUrlPlaceholder']}
      />
      <p class="field-hint">{$t['webhook.baseUrlHint']}</p>
    </div>

    <!-- WHO: credentials -->
    <div class="sub-section">
      <h4 class="sub-title">{$t['webhook.whoTitle']}</h4>
      <div class="two-col">
        <div>
          <PlainText
            bind:value={webhookUsername}
            label={$t['webhook.username']}
            placeholder={$t['webhook.usernamePlaceholder']}
          />
          <p class="field-hint">{$t['webhook.usernameHint']}</p>
        </div>
        <div>
          <PlainText
            bind:value={webhookPassword}
            type="password"
            label={$t['webhook.appPassword']}
            placeholder={$t['webhook.appPasswordPlaceholder']}
          />
          <p class="field-hint">{$t['webhook.appPasswordHint']}</p>
          <button
            class="guide-toggle"
            on:click={() => (showPasswordGuide = !showPasswordGuide)}
          >
            {showPasswordGuide ? $t['webhook.appPasswordGuideHide'] : $t['webhook.appPasswordGuide']} ↕
          </button>
          {#if showPasswordGuide}
            <ol class="guide-steps">
              <li>{$t['webhook.appPasswordStep1']}</li>
              <li>{$t['webhook.appPasswordStep2']}</li>
              <li>{$t['webhook.appPasswordStep3']}</li>
            </ol>
          {/if}
        </div>
      </div>
      <p class="info-callout">{$t['webhook.hmacAlternative']}</p>
    </div>

    <!-- HOW: publishing preferences (pre-filled from config) -->
    <div class="sub-section">
      <h4 class="sub-title">{$t['webhook.howTitle']}</h4>

      <!-- Post status -->
      <div class="field-group">
        <label class="input-label">{$t['webhook.postStatus']}</label>
        <select class="status-select" bind:value={webhookPostStatus}>
          <option value="draft">{$t['webhook.postStatusDraft']}</option>
          <option value="publish">{$t['webhook.postStatusPublish']}</option>
        </select>
      </div>

      <!-- Author name — pre-filled from senderName -->
      <PlainText
        bind:value={webhookAuthorName}
        label={$t['webhook.authorName']}
        placeholder={webhookAuthorName || "Your name"}
      />
      <p class="field-hint">{$t['webhook.authorNameHint']}</p>

      <!-- Category hint — pre-filled from newsletterTitle -->
      <PlainText
        bind:value={webhookCategoryHint}
        label={$t['webhook.categoryHint']}
        placeholder={webhookCategoryHint || "e.g. International Relocation"}
      />
      <p class="field-hint">{$t['webhook.categoryHintDesc']}</p>

      <!-- Tags hint — auto-derived from personality/senderName/newsletterTitle -->
      <PlainText
        bind:value={webhookTagsHint}
        label={$t['webhook.tagsHint']}
        placeholder="relocation, expat, real estate, ..."
      />
      <p class="field-hint">{$t['webhook.tagsHintDesc']}</p>
    </div>

    <div class="btn-wrapper">
      <SubmitButton label={$t['webhook.saveSettings']} callback={savePublishSettings} />
    </div>
    {#if publishSaveSuccess}
      <p class="success-msg">✅ {$t['webhook.savedSuccess']}</p>
    {/if}
  </div>

  <hr class="divider" />

  <!-- ─── SECTION 2: Security Signature (HMAC) ──────────────── -->
  <div class="card-section">
    <div class="header-with-badge">
      <h3 class="secrets-title">{$t['secrets.signatureTitle']}</h3>
      <span class="badge dev-only">{$t['secrets.developerRequired']}</span>
    </div>
    <p class="section-desc">{$t['secrets.signatureDesc']}</p>

    {#if newSharedSecret}
      <div class="secret-reveal-box">
        <p class="warning-text">⚠️ <strong>{$t['secrets.copyNow']}</strong> {$t['secrets.wontShowAgain']}</p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newSharedSecret}</code>
          <button class="copy-btn" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>
            {$t['secrets.copy']}
          </button>
        </div>
      </div>
    {:else}
      <button class="secondary-btn" on:click={createSharedSecret}>
        {$t['secrets.generateSignature']}
      </button>
    {/if}
  </div>

  <hr class="divider" />

  <!-- ─── SECTION 3: API Keys ───────────────────────────────── -->
  <div class="card-section">
    <h3 class="secrets-title">{$t['secrets.apiTitle']}</h3>
    <p class="section-desc">{$t['secrets.apiDesc']}</p>

    {#if newApiKey}
      <div class="secret-reveal-box success">
        <p class="warning-text">✅ <strong>{$t['secrets.keyGenerated']}</strong></p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newApiKey}</code>
          <button class="copy-btn" on:click={() => newApiKey && copyToClipboard(newApiKey)}>
            {$t['secrets.copy']}
          </button>
        </div>
        <p class="small-hint">{$t['secrets.storeSecurely']}</p>
      </div>
    {/if}

    <button class="primary-btn" on:click={createApiKey}>{$t['secrets.createNewKey']}</button>

    <div class="table-container">
      <h4 class="sub-title">{$t['secrets.activeConnections']}</h4>
      <table class="api-key-table">
        <thead>
          <tr>
            <th>{$t['secrets.keySnapshot']}</th>
            <th>{$t['articleModal.created']}</th>
            <th>{$t['newsSource.actions']}</th>
          </tr>
        </thead>
        <tbody>
          {#each apiKeys as key}
            <tr>
              <td><code class="hash-preview">{key.hash.substring(0, 12)}…</code></td>
              <td>{new Date(key.createdAt).toLocaleDateString()}</td>
              <td class="api-key-actions">
                {#if confirmingDeleteHash === key.hash}
                  <div class="confirmation-container">
                    <button class="confirm-btn" on:click={() => deleteApiKey(key.hash)}>{$t['labels.confirm']}</button>
                    <button class="cancel-btn" on:click={() => (confirmingDeleteHash = null)}>{$t['labels.cancel']}</button>
                  </div>
                {:else}
                  <button class="delete-btn" on:click={() => (confirmingDeleteHash = key.hash)}>{$t['secrets.revokeAccess']}</button>
                {/if}
              </td>
            </tr>
          {/each}
          {#if apiKeys.length === 0}
            <tr><td colspan="3" class="empty-state">{$t['labels.noData']}</td></tr>
          {/if}
        </tbody>
      </table>
    </div>
  </div>

</div>

<style lang="scss">
  .secrets-container {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 40px;
    padding: 20px;
  }

  .card-section {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  .header-with-badge {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .badge {
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    &.dev-only {
      background: #eef2ff;
      color: #4f46e5;
      border: 1px solid #c7d2fe;
    }
    &.new-feature {
      background: #ecfdf5;
      color: #059669;
      border: 1px solid #a7f3d0;
    }
  }

  .secrets-title {
    font-size: 1.25rem;
    font-weight: 700;
    margin: 0;
    color: #111;
  }

  .sub-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 8px 0 4px;
    color: #333;
  }

  .sub-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
    background: #fafafa;
    border: 1px solid #eaeaea;
    border-radius: 12px;
    padding: 20px;
  }

  .two-col {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
    @media (max-width: 640px) { grid-template-columns: 1fr; }
  }

  .section-desc, .field-hint {
    font-size: 0.88rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  .field-hint { color: #888; font-size: 0.82rem; }

  .field-group {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }

  .input-label {
    font-size: 0.85rem;
    font-weight: 600;
    color: #444;
  }

  .status-select {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 0.9rem;
    background: #fff;
    cursor: pointer;
    width: 100%;
    &:focus { outline: none; border-color: #000; }
  }

  .guide-toggle {
    background: none;
    border: none;
    color: #4f46e5;
    font-size: 0.82rem;
    cursor: pointer;
    padding: 0;
    text-decoration: underline;
    width: fit-content;
  }

  .guide-steps {
    background: #f8f8ff;
    border: 1px solid #c7d2fe;
    border-radius: 8px;
    padding: 12px 20px;
    font-size: 0.85rem;
    color: #333;
    margin: 4px 0 0;
    li { margin-bottom: 4px; }
  }

  .info-callout {
    background: #fffbeb;
    border: 1px solid #fde68a;
    border-radius: 8px;
    padding: 10px 14px;
    font-size: 0.83rem;
    color: #92400e;
    margin: 0;
  }

  .btn-wrapper { margin-top: 8px; width: fit-content; }

  .success-msg {
    font-size: 0.88rem;
    color: #059669;
    margin: 0;
    font-weight: 500;
  }

  .secret-reveal-box {
    background: #fffbeb;
    border: 1px solid #fde68a;
    padding: 20px;
    border-radius: 12px;
    &.success { background: #f0fdf4; border-color: #bbf7d0; }
  }

  .warning-text {
    font-size: 0.85rem;
    color: #92400e;
    margin-bottom: 12px;
  }

  .new-api-key-wrapper {
    display: flex;
    gap: 8px;
    background: #000;
    padding: 8px 12px;
    border-radius: 8px;
    align-items: center;
    .new-api-key-code {
      color: #fff;
      font-family: 'Courier New', monospace;
      font-size: 0.9rem;
      flex: 1;
      overflow-x: auto;
    }
    .copy-btn {
      background: #333;
      color: white;
      border: none;
      padding: 6px 12px;
      border-radius: 6px;
      cursor: pointer;
      font-size: 0.8rem;
      &:hover { background: #444; }
    }
  }

  .small-hint { font-size: 0.8rem; color: #666; margin-top: 8px; }

  .primary-btn {
    background: #000;
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    width: fit-content;
  }

  .secondary-btn {
    background: white;
    border: 1px solid #ddd;
    padding: 10px 20px;
    border-radius: 8px;
    cursor: pointer;
    font-weight: 500;
    width: fit-content;
  }

  .table-container { margin-top: 24px; }

  .api-key-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
    font-size: 0.9rem;
    th {
      text-align: left;
      padding: 12px;
      border-bottom: 2px solid #eee;
      color: #666;
    }
    td { padding: 16px 12px; border-bottom: 1px solid #eee; }
  }

  .hash-preview { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; }
  .delete-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-weight: 500; }
  .confirm-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-weight: 600; margin-right: 8px; }
  .cancel-btn  { color: #666;    background: none; border: none; cursor: pointer; }
  .confirmation-container { display: flex; align-items: center; }

  .divider { border: 0; border-top: 1px solid #eee; margin: 10px 0; }
  .empty-state { text-align: center; color: #999; padding: 40px; }
</style>
