<script lang="ts">
  import { writable } from "svelte/store";
  import type { NewsSource } from "../../../../../../types";
  import PlainText from "../../../../../inputs/PlainText/PlainText.svelte";
  import ScheduleTime from "../../../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import updateNewsSource from "../../../../../requests/updateNewsSource";
  import { processNewsSourceAction } from "./newsSourceActions";
  import Link from "../../../../../inputs/Link/Link.svelte";
  import store from "../../../../../../store";
  import Personality from "../../../../../inputs/Personality/Personality.svelte";
  import { onMount } from "svelte";
  import { browser } from "$app/environment";
  import { ping } from "../../../../../../Notification/notificationStore";
  
  // Translation store import
  import { t } from "$lib/i18n/dashboard-translations";
  import { dt } from "$lib/dashboard/i18n";
  import { goTo } from "$lib/dashboard/nav";
  import { sourceUsage } from "$lib/dashboard/sources/sourceUtils";

  export let newsSource: NewsSource;
  export let errorMessage: string;
  export let canReveal: boolean = true;

  type UpdateFieldsType = {
    community: string;
    lead: string;
    personality: string;
    scheduleTime: string;
    linkSelector: string;
    url: string;
    id: string;
    includeImages: boolean;
    isPublic: boolean;
    /** Which webhook group this source publishes to. Empty string = System Default (groups[0]) */
    webhookGroupId: string;
  };

  let updateFields: UpdateFieldsType;
  $: if (newsSource) {
    updateFields = {
      community: newsSource.community || "",
      lead: newsSource.lead || "",
      personality: newsSource.personality || "",
      scheduleTime: newsSource.scheduleTime,
      linkSelector: newsSource.linkSelector || "",
      url: newsSource.url || "",
      id: newsSource.id,
      includeImages: !!newsSource.includeImages,
      isPublic: newsSource.isPublic === undefined ? true : newsSource.isPublic,
      webhookGroupId: newsSource.webhookGroupId || "",
    };
  }

  /* Webhook groups from the shared store, SSR-safe, defaults to [] */
  $: webhookGroups = ($store.config.webhookGroups || []) as import("../../../../../../types").WebhookGroup[];

  /* Session change tracking: read in onMount (browser only) */
  let sessionChangedIds = new Set<string>();
  const SESSION_KEY = "aiban_wh_session";

  export const updatedNewsSource = writable<NewsSource | null>(null);

  // Reactive plan usage. Only show the warning when the owner is OVER the limit (1 of 1 is fine).
  $: usage = sourceUsage($store.config, $store.subscribers);
  $: isOverLimit = usage.overLimit;
  const wgId = `wg-${Math.random().toString(36).slice(2, 8)}`;
  let isSaving = false;

  let isMounted = false;
  onMount(() => {
    isMounted = true;
    // SSR-safe: read session-changed webhook group IDs from localStorage
    if (browser) {
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) sessionChangedIds = new Set(JSON.parse(raw));
      } catch {
        // Storage blocked or corrupt marker list: start with an empty set.
      }
    }
  });


  async function handleUpdate() {
    // In-flight guard: one PUT at a time (the button and the form used to both fire).
    if (isSaving) return;
    // If limits reached, we might restrict *activating* a source if it was inactive,
    // but typically update form handles existing sources.
    // However, if the user downgraded, we might want to disable enabling.
    // For now, let's just warn or disable the whole form if they are over limit and trying to activate?
    // Actually, backend trigger check handles usage. Frontend form is for settings.
    // We should probably allow editing settings even if over limit, but maybe not activating.
    // But this form is Update settings, not just toggle active (Toggle is in NewsSourceUserManagement usually or ToggleCard header).
    // Let's keep it editable but maybe show a warning.
    
    if (!updateFields?.id || !updateFields.scheduleTime) {
        errorMessage = $t['newsSource.errorInit'];
        return;
    }
    const payload = {
      community: updateFields.community,
      lead: updateFields.lead,
      personality: updateFields.personality || "",
      scheduleTime: updateFields.scheduleTime,
      linkSelector: updateFields.linkSelector,
      url: updateFields.url,
      id: updateFields.id,
      includeImages: updateFields.includeImages,
      isPublic: updateFields.isPublic,
      // Persist the selected publish destination (empty string = System Default)
      webhookGroupId: updateFields.webhookGroupId || null,
    };

    isSaving = true;
    try {
    await processNewsSourceAction(
      payload,
      (f) => f,
      updateNewsSource,
      (msg) => (errorMessage = msg),
      $t['newsSource.errorUpdateFail'],
      (updated) => {
        if (updated.linkSelector) {
          updateFields = { ...updateFields, linkSelector: updated.linkSelector };
        }
        updatedNewsSource.set(updated);
        ping($t['newsSource.updateSuccessTitle'], $t['newsSource.updateSuccessMsg']);
      }
    );
    } finally {
      isSaving = false;
    }
  }
</script>

<form class="news-source-update-form" novalidate on:submit|preventDefault={handleUpdate}>
  {#if isOverLimit}
    <div class="limit-warning" role="status">
      <p>{$dt("dash.sources.limit.usage", { used: usage.used, limit: usage.limit })}. {$dt("dash.sources.limit.over")} <a href="/dashboard?section=settings&tab=billing" on:click|preventDefault={() => goTo("settings", "billing")}>{$dt("dash.sources.limit.action")}</a></p>
    </div>
  {/if}

  {#if updateFields}
    <!-- ── Publish Destination (reactive from shared store) ── -->
    {#if webhookGroups.length > 0}
      <div class="webhook-group-selector">
        <label class="wg-label" for={wgId}>{$dt("dash.sources.legacy.destination")}</label>
        <select id={wgId} class="wg-select" aria-describedby="{wgId}-hint" bind:value={updateFields.webhookGroupId}
          on:change={() => { if (isMounted) handleUpdate(); }}>
          <option value="">{$dt("dash.sources.legacy.destinationDefault", { name: webhookGroups[0]?.name || webhookGroups[0]?.url || "" })}</option>
          {#each webhookGroups.slice(1) as group (group.id)}
            <option value={group.id}>
              {group.name || group.url}
              {sessionChangedIds.has(group.id) ? ' · Updated this session' : ''}
            </option>
          {/each}
        </select>
        <p class="wg-hint" id="{wgId}-hint">{$dt("dash.sources.legacy.destinationHint")}</p>
      </div>
    {/if}

    <ToggleCard {canReveal} cardTitle={$t['newsSource.basicSettings']} isOpen={false} onChange={() => {}}>
      <div class="selectors-group">
        <PlainText
          label={$t['newsSource.typeOfClient']}
          placeholder={$t['newsSource.clientPlaceholder']}
          bind:value={updateFields.community}
        />

        <Link
          label={$t['newsSource.urlLabel']}
          placeholder={$t['newsSource.urlPlaceholder']}
          bind:value={updateFields.url}
        />
        <Link
          label={$t['newsSource.leadLabel']}
          placeholder={$t['newsSource.leadPlaceholder']}
          bind:value={updateFields.lead}
        />
        <p class="info-message">
          {$dt("dash.sources.field.leadHint")}
        </p>
      </div>
    </ToggleCard>

    <ToggleCard {canReveal} cardTitle={$t['newsSource.advancedSettings']} isOpen={false} onChange={() => {}}>
      <div class="selectors-group">
        <ScheduleTime
          label={$t['newsSource.scheduleLabel']}
          value={updateFields.scheduleTime}
          exclude={["minute", "dayOfMonth"]}
          onChange={(newValue) => {
            updateFields.scheduleTime = newValue;
            if (isMounted) handleUpdate();
          }}
        />

        <Personality
          personality={updateFields.personality ?? ''}
          newsSourceId={updateFields.id}
          onError={(msg) => (errorMessage = msg)}
          onChange={(newValue) => { 
            updateFields.personality = newValue; 
          }}
          onSubmit={() => { if (isMounted) handleUpdate(); }}
        />

        <!-- hidden until we have a proper use case for it -->

        <!-- <div class="switch-container">
          <label for="include-images-switch">{$t['newsSource.includeImages']}</label>
          <Switch
            bind:toggled={updateFields.includeImages}
            on:change={() => { if (isMounted) handleUpdate(); }}
          />
        </div>
        <MarkdownText {canReveal}>
          {$t['newsSource.includeImagesDesc']}
        </MarkdownText> -->

        <!-- hidden until we have a proper use case for it -->

        <!-- <div class="switch-container">
          <label for="is-public-switch">{$t['newsSource.publicVisible']}</label>
          <Switch
            bind:toggled={updateFields.isPublic}
            on:change={() => { if (isMounted) handleUpdate(); }}
          />
        </div>
        <MarkdownText {canReveal}>
          {$t['newsSource.publicVisibleDesc']}
        </MarkdownText> -->

        <!-- Per-source sender address and email app password removed for security (2026-10-30).
             Issues go out from AIBAN's address with the owner's sender name. -->
      </div>
    </ToggleCard>
    
    <SubmitButton label={$t['newsSource.updateButton']} type="submit" loading={isSaving} disabled={isSaving} />

    {#if errorMessage}
      <div class="error-message" role="alert">{errorMessage}</div>
    {/if}
  {/if}
</form>

<style lang="scss">
  .news-source-update-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .limit-warning {
    background-color: var(--color-warning-light, #fff3cd);
    border: 1px solid var(--color-warning, #ffc107);
    color: var(--color-warning-dark, #856404);
    padding: 0.75rem;
    border-radius: 4px;
    font-size: 0.9rem;
    text-align: center;
    
    a {
      color: inherit;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .selectors-group {
    margin: 1rem 0;
    display: grid;
    gap: 25px;
  }
  .error-message {
    color: red;
    font-size: 0.9rem;
    text-align: center;
  }
  .error-message { /* Ensure error message style is present */
    color: red;
    font-size: 0.875rem;
    margin-top: -0.5rem; /* Adjust spacing if needed */
  }

  /* ── Publish Destination selector ── */
  .webhook-group-selector {
    display: flex;
    flex-direction: column;
    gap: 6px;
    background: #f8f8ff;
    border: 1px solid #c7d2fe;
    border-radius: 10px;
    padding: 14px 16px;
  }
  .wg-label {
    font-size: 0.82rem;
    font-weight: 700;
    color: #4f46e5;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }
  .wg-select {
    border: 1px solid #c7d2fe;
    border-radius: 8px;
    padding: 9px 12px;
    font-size: 0.9rem;
    background: #fff;
    cursor: pointer;
    width: 100%;
    color: #1e1b4b;
    &:focus { outline: none; border-color: #4f46e5; }
  }
  .wg-hint {
    font-size: 0.78rem;
    color: #6366f1;
    margin: 0;
  }
</style>
