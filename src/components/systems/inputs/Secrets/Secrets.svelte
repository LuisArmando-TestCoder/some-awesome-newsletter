<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import store from "../../../store";
  import getAuthHeaders from "../../requests/getAuthHeaders";

  let apiKeys: { hash: string; createdAt: string }[] = [];
  let newApiKey: string | null = null;
  let confirmingDeleteHash: string | null = null;

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

  onMount(fetchApiKeys);
</script>

<style lang="scss">
  @use "./Secrets.scss";
</style>

<div class="secrets-container">
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
