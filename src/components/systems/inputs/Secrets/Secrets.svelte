<script lang="ts">
  import { onMount } from "svelte";
  import { get } from "svelte/store";
  import { browser } from "$app/environment";
  import store, { saveToConfig } from "../../../store";
  import type { WebhookGroup } from "../../../types";
  import { request, seg } from "$lib/api/client";
  import { toUserMessage } from "$lib/api/errors";
  import PlainText from "../PlainText/PlainText.svelte";
  import SubmitButton from "../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  /* ─── Session change tracking (SSR-safe – populated in onMount) ─── */
  // eslint-disable-next-line svelte/prefer-svelte-reactivity -- legacy component: updates reassign a new Set, which Svelte tracks
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
      username: cfg.webhookUsername || cfg.configuratorId || "",
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
      return url || $t['labels.notApplicable'];
    }
  }

  /* ─── Security signature ─────────────────────────────────────────── */
  let newSharedSecret: string | null = null;
  let secretBusy = false;
  let secretError = "";

  const account = () => get(store).configuratorEmail || "";

  async function createSharedSecret() {
    if (secretBusy) return;
    newSharedSecret = null; secretError = ""; secretBusy = true;
    try {
      const res = await request<{ sharedSecret?: string }>(`/configurations/${seg(account())}/secret`, { method: "POST", retries: 0 });
      newSharedSecret = res?.sharedSecret ?? null;
      if (!newSharedSecret) secretError = $t['secrets.createError'];
    } catch (e) {
      secretError = toUserMessage(e, $t['secrets.createError']);
    } finally {
      secretBusy = false;
    }
  }

  /* ─── API keys ───────────────────────────────────────────────────── */
  let apiKeys: { hash: string; createdAt: string }[] = [];
  let newApiKey: string | null = null;
  let confirmingDeleteHash: string | null = null;
  let keyBusy = false;
  let keyError = "";
  let copiedValue: string | null = null;

  async function fetchApiKeys() {
    try {
      const res = await request<{ apiKeys?: { hash: string; createdAt: string }[] }>(`/apikeys/${seg(account())}`);
      apiKeys = res?.apiKeys ?? [];
    } catch (e) {
      keyError = toUserMessage(e, $t['secrets.loadError']);
    }
  }

  async function createApiKey() {
    if (keyBusy) return;
    newApiKey = null; keyError = ""; keyBusy = true;
    try {
      const res = await request<{ apiKey?: string }>(`/apikeys/${seg(account())}`, { method: "POST", retries: 0 });
      newApiKey = res?.apiKey ?? null;
      if (!newApiKey) keyError = $t['secrets.createError'];
      await fetchApiKeys();
    } catch (e) {
      keyError = toUserMessage(e, $t['secrets.createError']);
    } finally {
      keyBusy = false;
    }
  }

  async function deleteApiKey(hash: string) {
    keyError = "";
    try {
      await request(`/apikeys/${seg(account())}/${seg(hash)}`, { method: "DELETE", retries: 0 });
      await fetchApiKeys();
    } catch (e) {
      keyError = toUserMessage(e, $t['secrets.deleteError']);
    } finally {
      confirmingDeleteHash = null;
    }
  }

  async function copyToClipboard(text: string) {
    try {
      await navigator.clipboard.writeText(text);
      copiedValue = text;
      setTimeout(() => { if (copiedValue === text) copiedValue = null; }, 2000);
    } catch {
      // Clipboard blocked (permissions or insecure context): the value stays visible to copy by hand.
      copiedValue = null;
    }
  }

  /* ─── onMount (SSR-safe browser-only init) ───────────────────────── */
  onMount(async () => {
    // 1. Read session change markers from localStorage
    const raw = localStorage.getItem(SESSION_KEY);
    if (raw) {
      try { sessionChangedIds = new Set(JSON.parse(raw)); } catch {
        // Corrupt marker list: start with an empty set.
      }
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
                {#if idx === 0}<span class="badge-default" title={$t['webhook.defaultBadge']} aria-label={$t['webhook.defaultBadge']} role="img">★</span>{/if}
                {group.name || domainLabel(group.url)}
              </span>
              <span class="group-url">{domainLabel(group.url)}</span>
              <span class="group-status pill">{group.postStatus === 'publish' ? $t['webhook.statusPublish'] : $t['webhook.statusDraft']}</span>
              {#if sessionChangedIds.has(group.id)}
                <span class="badge-session">{$t['webhook.updatedThisSession']}</span>
              {/if}
            </div>
            <div class="group-actions">
              <button type="button" class="btn-text" on:click={() => startEdit(group)}>{$t['labels.edit']}</button>
              {#if confirmDeleteId === group.id}
                <button type="button" class="btn-confirm" on:click={() => deleteGroup(group.id)}>{$t['labels.confirm']}</button>
                <button type="button" class="btn-cancel" on:click={() => (confirmDeleteId = null)}>{$t['labels.cancel']}</button>
              {:else}
                <button type="button" class="btn-delete" aria-label={$t['webhook.deleteDestination']} title={$t['webhook.deleteDestination']} on:click={() => (confirmDeleteId = group.id)}><svg class="icon-x" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg></button>
              {/if}
            </div>
          </div>

        <!-- ── Expanded edit form ── -->
        {:else if draft}
          <div class="group-edit">
            <h4 class="edit-title">
              {idx === 0 ? `★ ${$t['webhook.whereTitle']} ${$t['webhook.defaultSuffix']}` : $t['webhook.whereTitle']}
            </h4>

            <PlainText
              bind:value={draft.name}
              label={$t['webhook.destinationName']}
              placeholder={$t['webhook.destinationNamePlaceholder']}
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
                <button type="button" class="guide-toggle"
                  aria-expanded={showPasswordGuideForId === group.id}
                  on:click={() => showPasswordGuideForId = showPasswordGuideForId === group.id ? null : group.id}>
                  <span>{showPasswordGuideForId === group.id ? $t['webhook.appPasswordGuideHide'] : $t['webhook.appPasswordGuide']}</span>
                  <svg class="chevron" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M4 6.25 8 10.25l4-4" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" /></svg>
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
                <label class="input-label" for={`post-status-${group.id}`}>{$t['webhook.postStatus']}</label>
                <select id={`post-status-${group.id}`} class="status-select" bind:value={draft.postStatus}>
                  <option value="draft">{$t['webhook.postStatusDraft']}</option>
                  <option value="publish">{$t['webhook.postStatusPublish']}</option>
                </select>
              </div>
              <PlainText bind:value={draft.authorName}
                label={$t['webhook.authorName']} placeholder={draft.authorName || $t['webhook.authorNamePlaceholder']} />
              <PlainText bind:value={draft.categoryHint}
                label={$t['webhook.categoryHint']} placeholder={draft.categoryHint || $t['webhook.categoryPlaceholder']} />
              <PlainText bind:value={draft.tagsHint}
                label={$t['webhook.tagsHint']} placeholder={$t['webhook.tagsPlaceholder']} />
            </div>

            <div class="edit-footer">
              <SubmitButton label={$t['webhook.saveSettings']} callback={saveGroup} />
              <button type="button" class="btn-cancel-edit" on:click={cancelEdit}>{$t['labels.cancel']}</button>
              <span class="success-region" role="status">
                {#if groupSaveSuccess === group.id}
                  <span class="success-msg">
                    <svg class="icon-check" viewBox="0 0 16 16" aria-hidden="true" focusable="false"><path d="M3.5 8.5 6.5 11.5 12.5 4.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    {$t['webhook.savedSuccess']}
                  </span>
                {/if}
              </span>
            </div>
          </div>
        {/if}

      </div>
    {/each}

    <!-- Add new group -->
    <button type="button" class="add-group-btn" on:click={addGroup}>
      <svg class="icon-plus" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" /></svg>
      {$t['webhook.addDestination']}
    </button>

    {#if webhookGroups.length === 0}
      <p class="empty-hint">{$t['webhook.emptyHint']}</p>
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
        <p class="warning-text"><strong>{$t['secrets.copyNow']}</strong> {$t['secrets.wontShowAgain']}</p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newSharedSecret}</code>
          <button type="button" class="copy-btn" on:click={() => newSharedSecret && copyToClipboard(newSharedSecret)}>{copiedValue && copiedValue === newSharedSecret ? $t['secrets.copied'] : $t['secrets.copy']}</button>
        </div>
      </div>
    {:else}
      <button type="button" class="secondary-btn" on:click={createSharedSecret} disabled={secretBusy} aria-busy={secretBusy}>{secretBusy ? $t['secrets.working'] : $t['secrets.generateSignature']}</button>
      {#if secretError}<p class="inline-error" role="alert">{secretError}</p>{/if}
    {/if}
  </div>

  <hr class="divider" />

  <!-- ─── SECTION 3: API Keys ───────────────────────────────────────── -->
  <div class="card-section">
    <h3 class="secrets-title">{$t['secrets.apiTitle']}</h3>
    <p class="section-desc">{$t['secrets.apiDesc']}</p>
    {#if newApiKey}
      <div class="secret-reveal-box success">
        <p class="warning-text"><strong>{$t['secrets.keyGenerated']}</strong></p>
        <div class="new-api-key-wrapper">
          <code class="new-api-key-code">{newApiKey}</code>
          <button type="button" class="copy-btn" on:click={() => newApiKey && copyToClipboard(newApiKey)}>{copiedValue && copiedValue === newApiKey ? $t['secrets.copied'] : $t['secrets.copy']}</button>
        </div>
        <p class="small-hint">{$t['secrets.storeSecurely']}</p>
      </div>
    {/if}
    <button type="button" class="primary-btn" on:click={createApiKey} disabled={keyBusy} aria-busy={keyBusy}>{keyBusy ? $t['secrets.working'] : $t['secrets.createNewKey']}</button>
    {#if keyError}<p class="inline-error" role="alert">{keyError}</p>{/if}
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
          {#each apiKeys as key (key.hash)}
            <tr>
              <td><code class="hash-preview">{key.hash.substring(0, 12)}…</code></td>
              <td>{new Date(key.createdAt).toLocaleDateString()}</td>
              <td>
                {#if confirmingDeleteHash === key.hash}
                  <button type="button" class="confirm-btn" on:click={() => deleteApiKey(key.hash)}>{$t['labels.confirm']}</button>
                  <button type="button" class="btn-cancel" on:click={() => (confirmingDeleteHash = null)}>{$t['labels.cancel']}</button>
                {:else}
                  <button type="button" class="delete-btn" on:click={() => (confirmingDeleteHash = key.hash)}>{$t['secrets.revokeAccess']}</button>
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
    gap: var(--space-7);
    padding: var(--space-5) 0;
    font-family: var(--font-body);
    color: var(--text-1);
  }
  .card-section { display: flex; flex-direction: column; gap: var(--space-3); min-width: 0; }
  .header-with-badge { display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-3); }
  .secrets-title {
    margin: 0;
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
  }
  .sub-title { font-size: var(--fs-md); font-weight: var(--fw-semibold); margin: var(--space-1) 0; }
  .section-desc, .field-hint { font-size: var(--fs-sm); color: var(--text-2); margin: 0; line-height: var(--lh-normal); max-width: var(--measure); }
  .field-hint { color: var(--text-3); font-size: var(--fs-xs); }
  .empty-hint { font-size: var(--fs-sm); color: var(--text-3); margin: 0; }

  /* Badges: the word carries the meaning; surface and edge only support it. */
  .badge {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0 var(--space-2);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    border: 1px solid var(--border-1);
    &.dev-only { background: var(--surface-2); color: var(--text-1); }
    &.new-feature { background: var(--surface-0); color: var(--text-1); border-color: var(--text-1); }
  }
  .badge-default { color: var(--text-1); margin-right: var(--space-1); }
  .badge-session {
    display: inline-flex;
    align-items: center;
    min-height: 1.375rem;
    background: var(--warning-soft); color: var(--text-1); border: 1px solid var(--warning);
    font-size: var(--fs-xs); font-weight: var(--fw-medium); padding: 0 var(--space-2); border-radius: var(--radius-full);
  }

  /* ── Group cards ── */
  .group-card {
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--surface-0);
    transition: border-color var(--t-out) var(--ease-out), box-shadow var(--t-out) var(--ease-out);
    @media (hover: hover) and (pointer: fine) {
      &:not(.editing):hover { border-color: var(--border-2); }
    }
    /* Editing: ink edge plus a ring, never color alone (the edit form itself is the main cue). */
    &.editing { border-color: var(--text-1); box-shadow: 0 0 0 3px var(--surface-2); }
  }
  .group-row {
    display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap;
    padding: var(--space-3) var(--space-4); gap: var(--space-3);
  }
  .group-info {
    display: flex; align-items: center; flex-wrap: wrap; gap: var(--space-2); flex: 1; min-width: 0;
  }
  .group-name { font-weight: var(--fw-semibold); font-size: var(--fs-md); }
  .group-url { font-size: var(--fs-xs); color: var(--text-3); font-family: var(--font-mono); overflow-wrap: anywhere; }
  .pill {
    font-size: var(--fs-xs); padding: 0 var(--space-2); min-height: 1.375rem; display: inline-flex; align-items: center;
    background: var(--surface-2); border-radius: var(--radius-full); color: var(--text-2);
  }
  .group-actions { display: flex; align-items: center; gap: var(--space-1); flex-shrink: 0; }

  .group-edit {
    display: flex; flex-direction: column; gap: var(--space-4);
    padding: var(--space-5);
    background: var(--surface-1);
  }
  .edit-title { font-size: var(--fs-md); font-weight: var(--fw-semibold); margin: 0; }
  .sub-group {
    display: flex; flex-direction: column; gap: var(--space-2);
    background: var(--surface-0); border: 1px solid var(--border-1); border-radius: var(--radius-md); padding: var(--space-4);
  }
  .two-col { display: grid; grid-template-columns: 1fr 1fr; gap: var(--space-4);
    @media (max-width: 600px) { grid-template-columns: 1fr; }
  }
  .field-group { display: flex; flex-direction: column; gap: var(--space-1); }
  .input-label { font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-1); }

  .status-select {
    width: 100%;
    min-height: var(--control-h);
    padding: 0 var(--control-pad-x);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-md);
    background: var(--surface-0);
    color: var(--text-1);
    font: inherit;
    font-size: var(--fs-md);
    cursor: pointer;
    transition: border-color var(--t-out) var(--ease-out), box-shadow var(--t-out) var(--ease-out);
    @media (hover: hover) and (pointer: fine) {
      &:hover:not(:focus) { border-color: var(--text-2); }
    }
    &:focus-visible { outline: none; border-color: var(--text-1); box-shadow: var(--focus-ring); }
  }

  .guide-toggle {
    display: inline-flex; align-items: center; gap: var(--space-1);
    min-height: 2rem;
    background: none; border: none; color: var(--text-link); font: inherit; font-size: var(--fs-sm);
    cursor: pointer; padding: 0 var(--space-1); width: fit-content; border-radius: var(--radius-sm);
    text-decoration: underline; text-decoration-thickness: 1px; text-underline-offset: 0.2em;
    @media (hover: hover) and (pointer: fine) {
      &:hover { text-decoration-thickness: 2px; }
    }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .chevron { width: 0.875rem; height: 0.875rem; transition: transform var(--dur-slow) var(--ease-out); }
  .guide-toggle[aria-expanded='true'] .chevron { transform: rotate(180deg); }
  .guide-steps {
    margin: 0;
    background: var(--surface-1); border: 1px solid var(--border-1); border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-5); font-size: var(--fs-sm); color: var(--text-1); line-height: var(--lh-normal);
    li { margin-bottom: var(--space-1); }
  }
  .edit-footer { display: flex; align-items: center; gap: var(--space-3); flex-wrap: wrap; }

  /* Success: check plus past-tense text, announced by the status region. */
  .success-region:empty { display: none; }
  .success-msg {
    display: inline-flex; align-items: center; gap: var(--space-1);
    font-size: var(--fs-sm); color: var(--success); font-weight: var(--fw-medium);
  }
  .icon-check { width: 1rem; height: 1rem; flex: none; }

  .add-group-btn {
    display: flex; align-items: center; justify-content: center; gap: var(--space-2);
    min-height: var(--control-h);
    padding: var(--space-3); border: 1px dashed var(--border-2); border-radius: var(--radius-lg);
    background: none; cursor: pointer; font: inherit; font-size: var(--fs-sm); font-weight: var(--fw-medium); color: var(--text-2);
    width: 100%;
    -webkit-tap-highlight-color: transparent;
    transition: border-color var(--t-out) var(--ease-out), color var(--t-out) var(--ease-out), background-color var(--t-out) var(--ease-out), box-shadow var(--t-out) var(--ease-out), transform var(--dur-base) var(--ease-out);
    @media (hover: hover) and (pointer: fine) {
      &:hover { border-style: solid; border-color: var(--text-1); color: var(--text-1); background: var(--surface-1); }
      &:hover .icon-plus { transform: rotate(90deg); }
    }
    &:active { transform: scale(0.99); background: var(--surface-2); transition-duration: 60ms; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .icon-plus { width: 1rem; height: 1rem; flex: none; transition: transform var(--dur-base) var(--ease-out); }

  .info-callout {
    background: var(--surface-1); border: 1px solid var(--border-1); border-radius: var(--radius-md);
    padding: var(--space-3) var(--space-4); font-size: var(--fs-sm); color: var(--text-2); margin: 0; line-height: var(--lh-normal);
  }

  /* ── Buttons: pills with the full state set ── */
  .btn-text, .btn-delete, .btn-cancel, .btn-confirm, .confirm-btn, .delete-btn, .btn-cancel-edit, .primary-btn, .secondary-btn, .copy-btn {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: var(--space-1);
    min-height: 2.25rem;
    padding: 0 var(--space-3);
    border: 1px solid transparent;
    border-radius: var(--radius-full);
    background: transparent;
    font: inherit;
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    white-space: nowrap;
    cursor: pointer;
    -webkit-tap-highlight-color: transparent;
    transition:
      background-color var(--t-out) var(--ease-out),
      border-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out),
      box-shadow var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);
    &:active { transform: scale(0.97); transition-duration: 60ms; }
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  .btn-text, .btn-cancel { color: var(--text-1); }
  .btn-cancel { color: var(--text-2); }
  .btn-delete { width: 2.25rem; padding: 0; color: var(--text-3); }
  .icon-x { width: 1rem; height: 1rem; }
  .btn-confirm, .confirm-btn, .delete-btn { color: var(--danger); }
  .btn-confirm, .confirm-btn { font-weight: var(--fw-semibold); border-color: var(--danger); }
  .btn-cancel-edit, .secondary-btn { min-height: var(--control-h); padding: 0 var(--space-5); border-color: var(--border-2); background: var(--surface-0); color: var(--text-1); width: fit-content; }
  .primary-btn { min-height: var(--control-h); padding: 0 var(--space-5); background: var(--text-1); color: var(--surface-0); width: fit-content; }
  @media (hover: hover) and (pointer: fine) {
    .btn-text:hover, .btn-cancel:hover { background: var(--surface-2); color: var(--text-1); }
    .btn-delete:hover, .delete-btn:hover, .btn-confirm:hover, .confirm-btn:hover { background: var(--danger-soft); color: var(--danger); }
    .btn-cancel-edit:hover, .secondary-btn:hover { border-color: var(--text-2); background: var(--surface-1); }
    .primary-btn:hover { box-shadow: 0 0 0 2px color-mix(in srgb, var(--text-1) 16%, transparent); }
  }

  /* ── Secret reveal ── */
  .secret-reveal-box {
    display: flex; flex-direction: column; gap: var(--space-2);
    background: var(--warning-soft); border: 1px solid var(--warning); padding: var(--space-4); border-radius: var(--radius-lg);
    &.success { background: var(--success-soft); border-color: var(--success); }
  }
  .warning-text { font-size: var(--fs-sm); color: var(--text-1); margin: 0; }
  .new-api-key-wrapper {
    display: flex; flex-wrap: wrap; gap: var(--space-2); align-items: center;
    background: var(--surface-inverse); padding: var(--space-2) var(--space-2) var(--space-2) var(--space-3); border-radius: var(--radius-md);
    .new-api-key-code { color: var(--text-inverse); font-family: var(--font-mono); font-size: var(--fs-sm); flex: 1 1 12rem; min-width: 0; overflow-x: auto; overflow-wrap: anywhere; }
    .copy-btn {
      color: var(--text-inverse);
      border-color: color-mix(in srgb, var(--text-inverse) 40%, transparent);
      @media (hover: hover) and (pointer: fine) {
        &:hover { background: color-mix(in srgb, var(--text-inverse) 12%, transparent); }
      }
    }
  }
  .small-hint { font-size: var(--fs-xs); color: var(--text-2); margin: 0; }

  /* ── API key table ── */
  .table-container { margin-top: var(--space-4); overflow-x: auto; }
  .api-key-table { width: 100%; border-collapse: collapse; font-size: var(--fs-sm); font-variant-numeric: tabular-nums;
    th { position: sticky; top: 0; text-align: left; padding: var(--space-2) var(--space-3); border-bottom: 1px solid var(--border-2); color: var(--text-2); font-size: var(--fs-xs); font-weight: var(--fw-medium); background: var(--surface-0); }
    td { padding: var(--space-3); border-bottom: 1px solid var(--border-1); }
  }
  .hash-preview { background: var(--surface-2); padding: var(--space-1) var(--space-2); border-radius: var(--radius-sm); font-family: var(--font-mono); }
  .divider { border: 0; border-top: 1px solid var(--border-1); margin: 0; }
  .empty-state { text-align: center; color: var(--text-3); padding: var(--space-7); }

  @media (forced-colors: active) {
    .group-card.editing { border: 2px solid Highlight; }
    .btn-text, .btn-delete, .btn-cancel, .btn-confirm, .confirm-btn, .delete-btn, .btn-cancel-edit, .primary-btn, .secondary-btn, .copy-btn, .add-group-btn, .guide-toggle, .status-select {
      &:focus-visible { outline: 2px solid CanvasText; outline-offset: 2px; }
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .btn-text, .btn-delete, .btn-cancel, .btn-confirm, .confirm-btn, .delete-btn, .btn-cancel-edit, .primary-btn, .secondary-btn, .copy-btn, .add-group-btn { &:active { transform: none; } }
    .add-group-btn:hover .icon-plus { transform: none; }
  }
  .inline-error {
    margin: var(--space-2, 0.5rem) 0 0;
    font-size: var(--fs-sm, 0.875rem);
    color: var(--danger-text, var(--danger, #c4281c));
  }
</style>
