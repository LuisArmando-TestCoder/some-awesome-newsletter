<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import store, { saveToConfig } from "../../../store";
  import getAuthHeaders from "../../requests/getAuthHeaders";
  import Link from "../Link/Link.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";

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
    // Optionally, add some user feedback like a notification
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
    newApiKey = null; // Clear previous key
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

<style lang="scss">
  @use "./Secrets.scss";
</style>

<div class="secrets-container">

  <div class="webhook-container">
    <h3 class="secrets-title">Webhook Configuration</h3>
    <p>Configure the secure URL where your server can be reached to retrieve your API key.</p>
    <div class="webhook-url-container">
      <Link bind:value={webhookUrl} label="Key Retrieval URL:" placeholder="https://your-server.com/api/get-key" />
      <SubmitButton label="Save URL" callback={saveWebhookUrl} />
    </div>

    <h3 class="secrets-title">Generate Shared Secret</h3>
    {#if newSharedSecret}
      <div class="new-api-key-container">
        <p class="new-api-key-label">New Shared Secret:</p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newSharedSecret}</code>
          <button class="copy-new-api-key-button" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>Copy</button>
        </div>
        <p class="new-api-key-warning">Please save this secret. You will not be able to see it again.</p>
      </div>
    {/if}
    <button class="create-api-key-button" on:click={createSharedSecret}>Generate New Shared Secret</button>
  </div>
  <h3 class="secrets-title">Create New API Key</h3>
  {#if newApiKey}
    <div class="new-api-key-container">
      <p class="new-api-key-label">New API Key:</p>
      <div class="new-api-key-wrapper">
        <code class="new-api-key-code">{newApiKey}</code>
        <button class="copy-new-api-key-button" on:click={() => newApiKey && copyToClipboard(newApiKey)}>Copy</button>
      </div>
      <p class="new-api-key-warning">Please save this key somewhere safe. You will not be able to see it again.</p>
    </div>
  {/if}
  <button class="create-api-key-button" on:click={createApiKey}>Create New API Key</button>

  <h3 class="secrets-title">API Keys</h3>
  <table class="api-key-table">
    <thead>
      <tr>
        <th>API Key Hash</th>
        <th>Created At</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {#each apiKeys as key}
        <tr>
          <td>{key.hash.substring(0, 10)}...</td>
          <td>{new Date(key.createdAt).toLocaleString()}</td>
          <td class="api-key-actions">
            {#if confirmingDeleteHash === key.hash}
              <div class="confirmation-container">
                <span class="confirmation-message">Are you sure?</span>
                <button class="confirm-delete-button" on:click={() => deleteApiKey(key.hash)}>Yes</button>
                <button class="cancel-delete-button" on:click={() => confirmingDeleteHash = null}>No</button>
              </div>
            {:else}
              <button class="delete-api-key-button" on:click={() => confirmingDeleteHash = key.hash}>Delete</button>
            {/if}
          </td>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
