<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import store, { saveToConfig } from "../../../store";
  import getAuthHeaders from "../../requests/getAuthHeaders";
  import Link from "../Link/Link.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  /* Import the translation store */
  import { t } from "$lib/i18n/dashboard-translations";

  let apiKeys: { hash: string; createdAt: string }[] = [];
  let newApiKey: string | null = null;
  let confirmingDeleteHash: string | null = null;
  let webhookUrl: string = "";
  let newSharedSecret: string | null = null;

  async function fetchConfigData() {
    const authHeaders = await getAuthHeaders();
    const response = await fetch(`${get(store).apiURL()}/config`, {
      headers: authHeaders,
    });
    const data = await response.json();
    apiKeys = data.apiKeys || [];
    webhookUrl = data.webhookUrl || "";
  }

  async function saveWebhookUrl() {
    await saveToConfig({ webhookUrl });
    // Feedback logic could be added here
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
    const response = await fetch(`${get(store).apiURL()}/apikeys/${configId}`, {
      headers: authHeaders,
    });
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
    const encodedApiKeyHash = encodeURIComponent(apiKeyHash);
    await fetch(`${get(store).apiURL()}/apikeys/${configId}/${encodedApiKeyHash}`, {
      method: "DELETE",
      headers: authHeaders,
    });
    await fetchApiKeys();
    confirmingDeleteHash = null;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  onMount(fetchConfigData);
</script>

<div class="secrets-container">
  <div class="card-section">
    <div class="header-with-badge">
      <h3 class="secrets-title">{$t['secrets.webhookTitle']}</h3>
      <span class="badge dev-only">{$t['secrets.developerRequired']}</span>
    </div>
    <p class="section-desc">
      {$t['secrets.webhookDesc']}
    </p>
    
    <div class="webhook-url-container">
      <Link 
        bind:value={webhookUrl} 
        label={$t['secrets.destinationUrl']} 
        placeholder="https://your-website.com/api/aiban-receiver" 
      />
      <div class="btn-wrapper">
        <SubmitButton label={$t['secrets.saveConnection']} callback={saveWebhookUrl} />
      </div>
    </div>

    <div class="secret-management">
      <h4 class="sub-title">{$t['secrets.signatureTitle']}</h4>
      <p class="section-desc">{$t['secrets.signatureDesc']}</p>
      
      {#if newSharedSecret}
        <div class="secret-reveal-box">
          <p class="warning-text">⚠️ <strong>{$t['secrets.copyNow']}</strong> {$t['secrets.wontShowAgain']}</p>
          <div class="new-api-key-wrapper">
            <code class="new-api-key-code">{newSharedSecret}</code>
            <button class="copy-btn" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>{$t['secrets.copy']}</button>
          </div>
        </div>
      {:else}
        <button class="secondary-btn" on:click={createSharedSecret}>{$t['secrets.generateSignature']}</button>
      {/if}
    </div>
  </div>

  <hr class="divider" />

  <div class="card-section">
    <h3 class="secrets-title">{$t['secrets.apiTitle']}</h3>
    <p class="section-desc">{$t['secrets.apiDesc']}</p>

    {#if newApiKey}
      <div class="secret-reveal-box success">
        <p class="warning-text">✅ <strong>{$t['secrets.keyGenerated']}</strong></p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newApiKey}</code>
          <button class="copy-btn" on:click={() => newApiKey && copyToClipboard(newApiKey)}>{$t['secrets.copy']}</button>
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
              <td><code class="hash-preview">{key.hash.substring(0, 12)}...</code></td>
              <td>{new Date(key.createdAt).toLocaleDateString()}</td>
              <td class="api-key-actions">
                {#if confirmingDeleteHash === key.hash}
                  <div class="confirmation-container">
                    <button class="confirm-btn" on:click={() => deleteApiKey(key.hash)}>{$t['labels.confirm']}</button>
                    <button class="cancel-btn" on:click={() => confirmingDeleteHash = null}>{$t['labels.cancel']}</button>
                  </div>
                {:else}
                  <button class="delete-btn" on:click={() => confirmingDeleteHash = key.hash}>{$t['secrets.revokeAccess']}</button>
                {/if}
              </td>
            </tr>
          {/each}
          {#if apiKeys.length === 0}
            <tr>
              <td colspan="3" class="empty-state">{$t['labels.noData']}</td>
            </tr>
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
    margin: 20px 0 8px 0;
  }

  .section-desc {
    font-size: 0.9rem;
    color: #666;
    margin: 0;
    line-height: 1.5;
  }

  .webhook-url-container {
    display: grid;
    background: #fafafa;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #eaeaea;

    .btn-wrapper { margin-bottom: 4px; }
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

    th { text-align: left; padding: 12px; border-bottom: 2px solid #eee; color: #666; }
    td { padding: 16px 12px; border-bottom: 1px solid #eee; }
  }

  .hash-preview { background: #f1f5f9; padding: 4px 8px; border-radius: 4px; }

  .delete-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-weight: 500; }

  .divider { border: 0; border-top: 1px solid #eee; margin: 20px 0; }

  .empty-state { text-align: center; color: #999; padding: 40px; }
</style>