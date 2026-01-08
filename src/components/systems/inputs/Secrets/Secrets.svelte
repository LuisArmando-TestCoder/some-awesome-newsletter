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
    const configId = authHeaders["x-auth-email"];
    const response = await fetch(`${get(store).apiURL()}/configurations/${configId}`, {
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