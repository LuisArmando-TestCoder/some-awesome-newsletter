<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { browser } from "$app/environment";
  import store, { saveToConfig } from "../../../store";
  import type { WebhookGroup } from "../../../types";
  import getAuthHeaders from "../../requests/getAuthHeaders";
  import PlainText from "../PlainText/PlainText.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  /* ─── Session change tracking (SSR-safe – populated in onMount) ─── */
  let sessionChangedIds = new Set<string>();
  /* key stored in localStorage for the current browser tab session */
  const SESSION_KEY = "aiban_wh_session";

  function markSessionChange(id: string) {
    if (!browser) return;
    sessionChangedIds = new Set([...sessionChangedIds, id]);
    localStorage.setItem(SESSION_KEY, JSON.stringify([...sessionChangedIds]));
  }

  /* ─── Webhook Groups (reactive from store) ──────────────────────── */
  // Reactive: re-evaluates whenever the store changes
  $: webhookGroups = ($store.config.webhookGroups || []) as WebhookGroup[];

  let editingGroupId: string | null = null;  // ID of the group currently in edit mode
  let confirmDeleteId: string | null = null; // ID awaiting delete confirmation
  let showPasswordGuideForId: string | null = null;
  let groupSaveSuccess: string | null = null; // last saved group ID for brief success flash

  /* Draft state when editing — separate object so we don't mutate the list */
  let draft: WebhookGroup | null = null;

  function startEdit(group: WebhookGroup) {
    draft = { ...group }; // shallow clone — all primitives in WebhookGroup
    editingGroupId = group.id;
    confirmDeleteId = null;
  }

  function cancelEdit() {
    draft = null;
    editingGroupId = null;
  }

  function addGroup() {
    if (!browser) return;
    const id = crypto.randomUUID();
    // Pre-fill from existing global single-group fields or from senderName/newsletterTitle
    const cfg = get(store).config;
    const newGroup: WebhookGroup = {
      id,
      name: "",
      url: cfg.webhookUrl || "",
      username: cfg.webhookUsername || cfg.emailMaskSender || cfg.configuratorId || "",
      password: "",
      postStatus: cfg.webhookPostStatus || "draft",
      authorName: cfg.webhookAuthorName || cfg.senderName || "",
      categoryHint: cfg.webhookCategoryHint || cfg.newsletterTitle || "",
      tagsHint: cfg.webhookTagsHint || deriveTagsHint(cfg.senderName, cfg.newsletterTitle),
    };
    draft = newGroup;
    editingGroupId = id;
    // Add to list immediately so the card renders in edit mode
    const updated = [...webhookGroups, newGroup];
    saveToConfig({ webhookGroups: updated });
  }

  async function saveGroup() {
    if (!draft) return;
    const updated = webhookGroups.map(g => g.id === draft!.id ? { ...draft! } : g);
    await saveToConfig({ webhookGroups: updated });
    markSessionChange(draft.id);
    groupSaveSuccess = draft.id;
    setTimeout(() => { groupSaveSuccess = null; }, 3000);
    cancelEdit();
  }

  async function deleteGroup(id: string) {
    const updated = webhookGroups.filter(g => g.id !== id);
    await saveToConfig({ webhookGroups: updated });
    confirmDeleteId = null;
    if (editingGroupId === id) cancelEdit();
    // Clean up session marker
    if (browser) {
      sessionChangedIds.delete(id);
      sessionChangedIds = new Set(sessionChangedIds);
      localStorage.setItem(SESSION_KEY, JSON.stringify([...sessionChangedIds]));
    }
  }

  /* ─── Helpers ───────────────────────────────────────────────────── */
  function deriveTagsHint(senderName = "", newsletterTitle = ""): string {
    const stop = new Set(["the","a","an","and","or","but","in","on","at","to","for","of","with","is","your","our","my","by","that","this"]);
    const raw: string[] = [];
    if (senderName) raw.push(senderName.trim());
    (newsletterTitle || "").toLowerCase().split(/\s+/).forEach(w => {
      const c = w.replace(/[^a-z0-9]/g, "");
      if (c.length > 3 && !stop.has(c)) raw.push(c);
    });
    return [...new Set(raw)].slice(0, 6).join(", ");
  }

  function domainLabel(url: string): string {
    try {
      return new URL(url).hostname;
    } catch {
      return url || "—";
    }
  }

  /* ─── Security signature ─────────────────────────────────────────── */
  let newSharedSecret: string | null = null;

  async function createSharedSecret() {
    newSharedSecret = null;
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const response = await fetch(`${get(store).apiURL()}/configurations/${configId}/secret`, {
      method: "POST", headers: authHeaders,
    });
    newSharedSecret = (await response.json()).sharedSecret;
  }

  /* ─── API keys ───────────────────────────────────────────────────── */
  let apiKeys: { hash: string; createdAt: string }[] = [];
  let newApiKey: string | null = null;
  let confirmingDeleteHash: string | null = null;

  async function fetchApiKeys() {
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const r = await fetch(`${get(store).apiURL()}/apikeys/${configId}`, { headers: authHeaders });
    apiKeys = (await r.json()).apiKeys || [];
  }

  async function createApiKey() {
    newApiKey = null;
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    const r = await fetch(`${get(store).apiURL()}/apikeys/${configId}`, { method: "POST", headers: authHeaders });
    newApiKey = (await r.json()).apiKey;
    await fetchApiKeys();
  }

  async function deleteApiKey(hash: string) {
    const authHeaders = await getAuthHeaders();
    const configId = authHeaders["x-auth-email"];
    await fetch(`${get(store).apiURL()}/apikeys/${configId}/${encodeURIComponent(hash)}`, { method: "DELETE", headers: authHeaders });
    await fetchApiKeys();
    confirmingDeleteHash = null;
  }

  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
  }

  /* ─── onMount (SSR-safe browser-only init) ───────────────────────── */
  onMount(async () => {
    // 1. Read session change markers from localStorage
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try { sessionChangedIds = new Set(JSON.parse(raw)); } catch {}
    }
    // 2. Fetch API keys (network call — client only)
    await fetchApiKeys();
  });
</script>

<div class="secrets-container">

  <!-- ─── SECTION 1: Publish Destinations ─────────────────────────── -->
  <div class="card-section">
    <div class="header-with-badge">
      <h3 class="secrets-title">{$t['webhook.sectionTitle']}</h3>
      <span class="badge new-feature">{$t['webhook.sectionBadge']}</span>
    </div>
    <p class="section-desc">{$t['webhook.sectionDesc']}</p>

    <!-- Group list -->
    {#each webhookGroups as group, idx (group.id)}
      <div class="group-card {editingGroupId === group.id ? 'editing' : ''}">

        <!-- ── Collapsed row ── -->
        {#if editingGroupId !== group.id}
          <div class="group-row">
            <div class="group-info">
              <span class="group-name">
                {#if idx === 0}<span class="badge-default" title="System Default">★</span>{/if}
                {group.name || domainLabel(group.url)}
              </span>
              <span class="group-url">{domainLabel(group.url)}</span>
              <span class="group-status pill">{group.postStatus === 'publish' ? '→ Publish' : '→ Draft'}</span>
              {#if sessionChangedIds.has(group.id)}
                <span class="badge-session">Updated this session</span>
              {/if}
            </div>
            <div class="group-actions">
              <button class="btn-text" on:click={() => startEdit(group)}>{$t['labels.edit']}</button>
              {#if confirmDeleteId === group.id}
                <button class="btn-confirm" on:click={() => deleteGroup(group.id)}>{$t['labels.confirm']}</button>
                <button class="btn-cancel" on:click={() => (confirmDeleteId = null)}>{$t['labels.cancel']}</button>
              {:else}
                <button class="btn-delete" on:click={() => (confirmDeleteId = group.id)}>✕</button>
              {/if}
            </div>
          </div>

        <!-- ── Expanded edit form ── -->
        {:else if draft}
          <div class="group-edit">
            <h4 class="edit-title">
              {idx === 0 ? `★ ${$t['webhook.whereTitle']} (System Default)` : $t['webhook.whereTitle']}
            </h4>

            <PlainText
              bind:value={draft.name}
              label="Destination name"
              placeholder='e.g. "Main Blog", "Client Site A"'
            />

            <!-- WHERE -->
            <div class="sub-group">
              <PlainText bind:value={draft.url}  type="url"
                label={$t['webhook.baseUrl']} placeholder={$t['webhook.baseUrlPlaceholder']} />
              <p class="field-hint">{$t['webhook.baseUrlHint']}</p>
            </div>

            <!-- WHO -->
            <div class="sub-group two-col">
              <div>
                <PlainText bind:value={draft.username}
                  label={$t['webhook.username']} placeholder={$t['webhook.usernamePlaceholder']} />
                <p class="field-hint">{$t['webhook.usernameHint']}</p>
              </div>
              <div>
                <PlainText bind:value={draft.password} type="password"
                  label={$t['webhook.appPassword']} placeholder={$t['webhook.appPasswordPlaceholder']} />
                <p class="field-hint">{$t['webhook.appPasswordHint']}</p>
                <button class="guide-toggle"
                  on:click={() => showPasswordGuideForId = showPasswordGuideForId === group.id ? null : group.id}>
                  {showPasswordGuideForId === group.id ? $t['webhook.appPasswordGuideHide'] : $t['webhook.appPasswordGuide']} ↕
                </button>
                {#if showPasswordGuideForId === group.id}
                  <ol class="guide-steps">
                    <li>{$t['webhook.appPasswordStep1']}</li>
                    <li>{$t['webhook.appPasswordStep2']}</li>
                    <li>{$t['webhook.appPasswordStep3']}</li>
                  </ol>
                {/if}
              </div>
            </div>

            <!-- HOW -->
            <div class="sub-group">
              <div class="field-group">
                <label class="input-label">{$t['webhook.postStatus']}</label>
                <select class="status-select" bind:value={draft.postStatus}>
                  <option value="draft">{$t['webhook.postStatusDraft']}</option>
                  <option value="publish">{$t['webhook.postStatusPublish']}</option>
                </select>
              </div>
              <PlainText bind:value={draft.authorName}
                label={$t['webhook.authorName']} placeholder={draft.authorName || "Your name"} />
              <PlainText bind:value={draft.categoryHint}
                label={$t['webhook.categoryHint']} placeholder={draft.categoryHint || "e.g. International Relocation"} />
              <PlainText bind:value={draft.tagsHint}
                label={$t['webhook.tagsHint']} placeholder="relocation, expat, ..." />
            </div>

            <div class="edit-footer">
              <SubmitButton label={$t['webhook.saveSettings']} callback={saveGroup} />
              <button class="btn-cancel-edit" on:click={cancelEdit}>{$t['labels.cancel']}</button>
              {#if groupSaveSuccess === group.id}
                <span class="success-msg">✅ {$t['webhook.savedSuccess']}</span>
              {/if}
            </div>
          </div>
        {/if}

      </div>
    {/each}

    <!-- Add new group -->
    <button class="add-group-btn" on:click={addGroup}>
      + Add Publish Destination
    </button>

    {#if webhookGroups.length === 0}
      <p class="empty-hint">No destinations yet. Click "+ Add Publish Destination" to set one up.</p>
    {/if}

    <p class="info-callout">{$t['webhook.hmacAlternative']}</p>
  </div>

  <hr class="divider" />

  <!-- ─── SECTION 2: Security Signature (HMAC) ──────────────────────── -->
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
          <button class="copy-btn" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>{$t['secrets.copy']}</button>
        </div>
      </div>
    {:else}
      <button class="secondary-btn" on:click={createSharedSecret}>{$t['secrets.generateSignature']}</button>
    {/if}
  </div>

  <hr class="divider" />

  <!-- ─── SECTION 3: API Keys ───────────────────────────────────────── -->
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
              <td><code class="hash-preview">{key.hash.substring(0, 12)}…</code></td>
              <td>{new Date(key.createdAt).toLocaleDateString()}</td>
              <td>
                {#if confirmingDeleteHash === key.hash}
                  <button class="confirm-btn" on:click={() => deleteApiKey(key.hash)}>{$t['labels.confirm']}</button>
                  <button class="btn-cancel" on:click={() => (confirmingDeleteHash = null)}>{$t['labels.cancel']}</button>
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
  .card-section { display: flex; flex-direction: column; gap: 14px; }
  .header-with-badge { display: flex; align-items: center; gap: 12px; }
  .secrets-title { font-size: 1.25rem; font-weight: 700; margin: 0; color: #111; }
  .sub-title { font-size: 1rem; font-weight: 600; margin: 4px 0; }
  .section-desc, .field-hint { font-size: 0.88rem; color: #666; margin: 0; line-height: 1.5; }
  .field-hint { color: #888; font-size: 0.82rem; }
  .empty-hint { font-size: 0.85rem; color: #aaa; }

  .badge {
    padding: 4px 8px; border-radius: 4px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase;
    &.dev-only { background: #eef2ff; color: #4f46e5; border: 1px solid #c7d2fe; }
    &.new-feature { background: #ecfdf5; color: #059669; border: 1px solid #a7f3d0; }
  }
  .badge-default { color: #f59e0b; margin-right: 4px; }
  .badge-session {
    display: inline-block;
    background: #fef3c7; color: #92400e; border: 1px solid #fde68a;
    font-size: 0.7rem; font-weight: 600; padding: 2px 6px; border-radius: 999px;
  }

  /* ── Group cards ── */
  .group-card {
    border: 1px solid #e5e7eb;
    border-radius: 10px;
    overflow: hidden;
    background: #fff;
    transition: box-shadow 0.2s;
    &.editing { border-color: #6366f1; box-shadow: 0 0 0 3px rgba(99,102,241,0.1); }
  }
  .group-row {
    display: flex; align-items: center; justify-content: space-between;
    padding: 14px 16px; gap: 12px;
  }
  .group-info {
    display: flex; align-items: center; flex-wrap: wrap; gap: 8px; flex: 1;
  }
  .group-name { font-weight: 600; font-size: 0.95rem; }
  .group-url { font-size: 0.82rem; color: #999; font-family: monospace; }
  .pill {
    font-size: 0.75rem; padding: 2px 8px;
    background: #f3f4f6; border-radius: 999px; color: #444;
  }
  .group-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

  .group-edit {
    display: flex; flex-direction: column; gap: 14px;
    padding: 20px;
    background: #fafafa;
  }
  .edit-title { font-size: 0.95rem; font-weight: 600; margin: 0; }
  .sub-group {
    display: flex; flex-direction: column; gap: 8px;
    background: #fff; border: 1px solid #eaeaea; border-radius: 8px; padding: 16px;
  }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: 16px;
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }
  .field-group { display: flex; flex-direction: column; gap: 4px; }
  .input-label { font-size: 0.82rem; font-weight: 600; color: #444; }
  .status-select {
    border: 1px solid #ddd; border-radius: 8px; padding: 9px 12px;
    font-size: 0.88rem; background: #fff; cursor: pointer; width: 100%;
    &:focus { outline: none; border-color: #6366f1; }
  }
  .guide-toggle {
    background: none; border: none; color: #4f46e5; font-size: 0.8rem;
    cursor: pointer; padding: 0; text-decoration: underline; width: fit-content;
  }
  .guide-steps {
    background: #f8f8ff; border: 1px solid #c7d2fe; border-radius: 8px;
    padding: 10px 18px; font-size: 0.83rem; color: #333;
    li { margin-bottom: 4px; }
  }
  .edit-footer { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; }
  .success-msg { font-size: 0.85rem; color: #059669; font-weight: 500; }

  .add-group-btn {
    display: flex; align-items: center; justify-content: center; gap: 8px;
    padding: 12px; border: 2px dashed #d1d5db; border-radius: 10px;
    background: none; cursor: pointer; font-size: 0.9rem; color: #6b7280;
    width: 100%;
    &:hover { border-color: #6366f1; color: #4f46e5; background: #f8f8ff; }
  }
  .info-callout {
    background: #fffbeb; border: 1px solid #fde68a; border-radius: 8px;
    padding: 10px 14px; font-size: 0.82rem; color: #92400e; margin: 0;
  }

  /* ── Buttons ── */
  .btn-text { background: none; border: none; color: #4f46e5; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
  .btn-delete { background: none; border: none; color: #9ca3af; font-size: 1rem; cursor: pointer; &:hover { color: #dc2626; } }
  .btn-cancel { background: none; border: none; color: #6b7280; font-size: 0.85rem; cursor: pointer; }
  .btn-cancel-edit { background: none; border: 1px solid #ddd; padding: 8px 16px; border-radius: 8px; cursor: pointer; font-size: 0.85rem; }
  .btn-confirm { background: none; border: none; color: #dc2626; font-size: 0.85rem; font-weight: 600; cursor: pointer; }
  .confirm-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-weight: 600; margin-right: 6px; }
  .delete-btn { color: #dc2626; background: none; border: none; cursor: pointer; font-weight: 500; }
  .primary-btn { background: #000; color: #fff; padding: 11px 22px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; width: fit-content; }
  .secondary-btn { background: #fff; border: 1px solid #ddd; padding: 10px 18px; border-radius: 8px; cursor: pointer; font-weight: 500; width: fit-content; }

  /* ── Secret reveal ── */
  .secret-reveal-box { background: #fffbeb; border: 1px solid #fde68a; padding: 18px; border-radius: 10px;
    &.success { background: #f0fdf4; border-color: #bbf7d0; }
  }
  .warning-text { font-size: 0.85rem; color: #92400e; margin-bottom: 10px; }
  .new-api-key-wrapper { display: flex; gap: 8px; background: #000; padding: 8px 12px; border-radius: 8px; align-items: center;
    .new-api-key-code { color: #fff; font-family: 'Courier New', monospace; font-size: 0.88rem; flex: 1; overflow-x: auto; }
    .copy-btn { background: #333; color: #fff; border: none; padding: 5px 10px; border-radius: 6px; cursor: pointer; font-size: 0.78rem;
      &:hover { background: #444; }
    }
  }
  .small-hint { font-size: 0.78rem; color: #666; margin-top: 6px; }

  /* ── API key table ── */
  .table-container { margin-top: 18px; }
  .api-key-table { width: 100%; border-collapse: collapse; font-size: 0.88rem;
    th { text-align: left; padding: 10px 12px; border-bottom: 2px solid #eee; color: #666; }
    td { padding: 14px 12px; border-bottom: 1px solid #eee; }
  }
  .hash-preview { background: #f1f5f9; padding: 3px 7px; border-radius: 4px; }
  .divider { border: 0; border-top: 1px solid #eee; margin: 8px 0; }
  .empty-state { text-align: center; color: #999; padding: 36px; }
</style>
