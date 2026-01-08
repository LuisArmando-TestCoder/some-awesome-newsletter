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

  // ... (fetch and logic functions remain the same) ...

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    // You could trigger a notification here using $t['notification.copiedToClipboard']
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
            <button class="copy-btn" on:click={() => copyToClipboard(newSharedSecret)}>{$t['secrets.copy']}</button>
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
          <button class="copy-btn" on:click={() => copyToClipboard(newApiKey)}>{$t['secrets.copy']}</button>
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