<!-- WS4. Settings for one source on their own page (no accordion). Basic settings first; Advanced holds only the link selector and the raw schedule. -->
<script lang="ts">
  import { tick, onMount } from "svelte";
  import { get } from "svelte/store";
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import Notice from "../ui/Notice.svelte";
  import Icon from "../ui/Icon.svelte";
  import StatusPill from "../ui/StatusPill.svelte";
  import ToggleSwitch from "../ui/ToggleSwitch.svelte";
  import ScheduleEditor from "../ScheduleEditor.svelte";
  import { dt, plural } from "../i18n";
  import { goTo } from "../nav";
  import { nextRun, formatDateTime, parseCron, runsPerDay } from "../data/schedule";
  import { toast } from "$lib/ui/components/toast";
  import { toUserMessage } from "$lib/api/errors";
  import store, { saveToConfig } from "../../../components/store";
  import { updateNewsSourceOrThrow } from "../../../components/systems/requests/updateNewsSource";
  import regenerateSelectors from "../../../components/systems/requests/regenerateSelectors";
  import { hostOf, normalizeUrl, scheduleWords } from "./sourceUtils";
  import type { NewsSource } from "../../../components/types";

  export let source: NewsSource;
  export let isMain = false;
  export let subscriberCount = 0;
  export let onback: () => void;

  const uid = Math.random().toString(36).slice(2, 8);
  let heading: HTMLHeadingElement;

  // Basic settings: local copy so a failed save keeps what the owner typed.
  let personality = source.personality ?? "";
  let community = source.community ?? "";
  let lead = source.lead && source.lead !== source.url ? source.lead : "";
  let leadError: string | null = null;
  let savingBasic = false;
  let basicError: string | null = null;

  // Schedule
  let editingSchedule = false;
  let savingSchedule = false;
  let scheduleError: string | null = null;

  // Advanced
  let linkSelector = source.linkSelector ?? "";
  let rawCron = source.scheduleTime ?? "";
  let cronError: string | null = null;
  let savingAdvanced = false;
  let advancedError: string | null = null;
  let regenerating = false;

  // Active
  let togglingActive = false;

  $: host = hostOf(source.url) || $dt("dash.common.unknown");
  $: on = source.active !== false;
  $: next = on ? nextRun(source.scheduleTime, new Date(), source.scheduleTimezone) : null;
  $: basicDirty =
    personality !== (source.personality ?? "") ||
    community !== (source.community ?? "") ||
    lead !== (source.lead && source.lead !== source.url ? source.lead : "");
  $: advancedDirty = linkSelector !== (source.linkSelector ?? "") || rawCron !== (source.scheduleTime ?? "");

  onMount(async () => {
    await tick();
    heading?.focus();
  });

  async function saveBasic() {
    if (savingBasic) return;
    basicError = null;
    let cleanLead = "";
    if (lead.trim()) {
      const n = normalizeUrl(lead);
      if (!n) {
        leadError = $dt("dash.sources.add.urlInvalid");
        document.getElementById(`lead-${uid}`)?.focus();
        return;
      }
      cleanLead = n;
    }
    leadError = null;
    savingBasic = true;
    try {
      const updated = await updateNewsSourceOrThrow(
        { personality: personality.trim(), community: community.trim(), lead: cleanLead || source.url },
        source.id
      );
      if (updated) source = { ...source, ...updated };
      lead = cleanLead;
      toast.success($dt("dash.sources.detail.saved", { host }));
    } catch (e) {
      basicError = toUserMessage(e, $dt("dash.state.saveFailed"));
    } finally {
      savingBasic = false;
    }
  }

  async function saveSchedule(cron: string, timezone: string) {
    if (savingSchedule) return;
    savingSchedule = true;
    scheduleError = null;
    try {
      const updated = await updateNewsSourceOrThrow({ scheduleTime: cron, scheduleTimezone: timezone }, source.id);
      source = { ...source, ...(updated ?? {}), scheduleTime: updated?.scheduleTime ?? cron, scheduleTimezone: updated?.scheduleTimezone ?? timezone };
      rawCron = source.scheduleTime;
      editingSchedule = false;
      const n = nextRun(source.scheduleTime, new Date(), source.scheduleTimezone);
      toast.success(n ? $dt("dash.sources.detail.scheduleSavedNext", { when: formatDateTime(n) }) : $dt("dash.sources.detail.scheduleSaved"));
    } catch (e) {
      scheduleError = toUserMessage(e, $dt("dash.state.saveFailed"));
    } finally {
      savingSchedule = false;
    }
  }

  async function saveAdvanced() {
    if (savingAdvanced) return;
    advancedError = null;
    const cron = rawCron.trim().replace(/\s+/g, " ");
    if (!parseCron(cron) || cron.split(" ").length !== 5) {
      cronError = $dt("dash.sources.advanced.cronInvalid");
      document.getElementById(`cron-${uid}`)?.focus();
      return;
    }
    if (runsPerDay(cron) > 1) {
      cronError = $dt("dash.sources.advanced.cronTooOften");
      document.getElementById(`cron-${uid}`)?.focus();
      return;
    }
    cronError = null;
    savingAdvanced = true;
    try {
      const updated = await updateNewsSourceOrThrow({ linkSelector: linkSelector.trim(), scheduleTime: cron }, source.id);
      source = { ...source, ...(updated ?? {}) };
      linkSelector = source.linkSelector ?? linkSelector;
      rawCron = source.scheduleTime ?? cron;
      toast.success($dt("dash.sources.detail.saved", { host }));
    } catch (e) {
      advancedError = toUserMessage(e, $dt("dash.state.saveFailed"));
    } finally {
      savingAdvanced = false;
    }
  }

  async function regenerate() {
    if (regenerating) return;
    regenerating = true;
    advancedError = null;
    try {
      const updated = await regenerateSelectors(get(store).configuratorEmail, source.id);
      if (!updated) throw new Error($dt("dash.sources.advanced.regenFailed"));
      source = { ...source, ...updated };
      linkSelector = source.linkSelector ?? "";
      toast.success($dt("dash.sources.advanced.regenDone"));
    } catch (e) {
      advancedError = toUserMessage(e, $dt("dash.sources.advanced.regenFailed"));
    } finally {
      regenerating = false;
    }
  }

  let togglingImages = false;
  async function setImages(value: boolean) {
    if (togglingImages) return;
    togglingImages = true;
    const prev = source.includeImages;
    source = { ...source, includeImages: value };
    try {
      const list = (get(store).config?.newsSources ?? []).map((ns: NewsSource) => (ns.id === source.id ? { ...ns, includeImages: value } : ns));
      const saved = await saveToConfig({ newsSources: list });
      if (!saved) throw new Error("save failed");
      toast.success(value ? $dt("dash.sources.images.on") : $dt("dash.sources.images.off"));
    } catch (e) {
      source = { ...source, includeImages: prev };
      toast.error(toUserMessage(e, $dt("dash.state.saveFailed")));
    } finally {
      togglingImages = false;
    }
  }

  async function setActive(value: boolean) {
    if (togglingActive) return;
    togglingActive = true;
    const prev = source.active;
    source = { ...source, active: value };
    try {
      const list = (get(store).config?.newsSources ?? []).map((ns: NewsSource) => (ns.id === source.id ? { ...ns, active: value } : ns));
      const saved = await saveToConfig({ newsSources: list });
      if (!saved) throw new Error("save failed");
      toast.success(value ? $dt("dash.sources.detail.turnedOn", { host }) : $dt("dash.sources.detail.turnedOff", { host }));
    } catch (e) {
      source = { ...source, active: prev };
      toast.error(toUserMessage(e, $dt("dash.state.saveFailed")));
    } finally {
      togglingActive = false;
    }
  }
</script>

<div class="detail">
  <div class="detail__nav">
    <Button variant="ghost" icon="arrow" onclick={onback}>{$dt("dash.sources.detail.back")}</Button>
  </div>

  <header class="detail__head">
    <div class="detail__title">
      <span class="detail__kind">{isMain ? $dt("dash.sources.card.main") : $dt("dash.sources.card.other")}</span>
      <h2 tabindex="-1" bind:this={heading}>{host}</h2>
      <p class="detail__meta">
        <StatusPill status={on ? "on" : "off"} label={on ? $dt("dash.sources.card.on") : $dt("dash.sources.card.off")} />
        <span>{plural($dt, "dash.sources.card.subscribers", subscriberCount)}</span>
        {#if source.url}<a href={source.url} target="_blank" rel="noopener noreferrer" class="detail__link">{$dt("dash.sources.card.visit")} <Icon name="external" size={14} /></a>{/if}
      </p>
    </div>
    <ToggleSwitch checked={on} busy={togglingActive} label={$dt("dash.sources.detail.activeLabel")} onchange={setActive} />
  </header>

  <Notice tone="info">{$dt("dash.sources.detail.ownSettings", { host })}</Notice>

  <Card title={$dt("dash.sources.detail.basicTitle")} subtitle={$dt("dash.sources.detail.basicSubtitle")}>
    <form class="form" novalidate on:submit|preventDefault={saveBasic} aria-busy={savingBasic}>
      <Field id="voice-{uid}" label={$dt("dash.sources.field.voice")} hint={$dt("dash.sources.field.voiceHint")} optional optionalLabel={$dt("dash.common.optional")}>
        <textarea id="voice-{uid}" rows="5" bind:value={personality} placeholder={$dt("dash.sources.field.voicePlaceholder")} aria-describedby="voice-{uid}-hint" disabled={savingBasic}></textarea>
      </Field>
      <Field id="reader-{uid}" label={$dt("dash.sources.field.reader")} hint={$dt("dash.sources.field.readerHint")} optional optionalLabel={$dt("dash.common.optional")}>
        <textarea id="reader-{uid}" rows="3" bind:value={community} placeholder={$dt("dash.sources.field.readerPlaceholder")} aria-describedby="reader-{uid}-hint" disabled={savingBasic}></textarea>
      </Field>
      <Field id="lead-{uid}" label={$dt("dash.sources.field.lead")} hint={$dt("dash.sources.field.leadHint")} error={leadError} optional optionalLabel={$dt("dash.common.optional")}>
        <input
          id="lead-{uid}"
          type="text"
          inputmode="url"
          spellcheck="false"
          bind:value={lead}
          placeholder={source.url || "https://yourcompany.com/contact"}
          aria-describedby="lead-{uid}-hint{leadError ? ` lead-${uid}-error` : ''}"
          aria-invalid={leadError ? "true" : undefined}
          disabled={savingBasic}
        />
      </Field>
      {#if basicError}<Notice tone="danger">{basicError}</Notice>{/if}
      <div class="actions">
        <Button variant="primary" type="submit" loading={savingBasic} disabled={savingBasic || !basicDirty}>
          {savingBasic ? $dt("dash.state.saving") : $dt("dash.common.save")}
        </Button>
      </div>
    </form>
  </Card>

  <Card title={$dt("dash.sources.images.title")} subtitle={$dt("dash.sources.images.subtitle")}>
    <ToggleSwitch checked={!!source.includeImages} busy={togglingImages} label={$dt("dash.sources.images.label")} onchange={setImages} />
  </Card>

  <Card title={$dt("dash.sources.detail.scheduleTitle")} subtitle={$dt("dash.sources.detail.scheduleSubtitle")}>
    {#if editingSchedule}
      <ScheduleEditor cron={source.scheduleTime || "0 9 * * 1"} timezone={source.scheduleTimezone} saving={savingSchedule} onsave={saveSchedule} oncancel={() => { editingSchedule = false; scheduleError = null; }} />
    {:else}
      <p class="sched__words"><Icon name="clock" size={18} /> {scheduleWords(source.scheduleTime, $dt)}</p>
      <p class="sched__next">
        {#if !on}{$dt("dash.sources.card.paused")}{:else if next}{$dt("dash.sources.detail.nextIssue", { when: formatDateTime(next, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" }) })}{/if}
      </p>
      <div class="actions actions--start">
        <Button variant="secondary" onclick={() => (editingSchedule = true)}>{$dt("dash.sources.detail.changeSchedule")}</Button>
        <Button variant="tertiary" onclick={() => goTo("automations")}>{$dt("dash.sources.detail.seeAutomations")}</Button>
      </div>
    {/if}
    {#if scheduleError}<div class="mt"><Notice tone="danger">{scheduleError}</Notice></div>{/if}
  </Card>

  <Card title={$dt("dash.sources.advanced.title")} subtitle={$dt("dash.sources.advanced.subtitle")}>
    <form class="form" novalidate on:submit|preventDefault={saveAdvanced} aria-busy={savingAdvanced || regenerating}>
      <Field id="sel-{uid}" label={$dt("dash.sources.advanced.selector")} hint={$dt("dash.sources.advanced.selectorHint")} optional optionalLabel={$dt("dash.common.optional")}>
        <input id="sel-{uid}" type="text" spellcheck="false" autocomplete="off" class="mono" bind:value={linkSelector} aria-describedby="sel-{uid}-hint" disabled={savingAdvanced || regenerating} />
      </Field>
      <div class="actions actions--start">
        <Button variant="secondary" size="sm" icon="refresh" loading={regenerating} disabled={regenerating || savingAdvanced} onclick={regenerate}>
          {regenerating ? $dt("dash.sources.advanced.regenerating") : $dt("dash.sources.advanced.regenerate")}
        </Button>
      </div>
      <Field id="cron-{uid}" label={$dt("dash.sources.advanced.cron")} hint={$dt("dash.sources.advanced.cronHint", { tz: source.scheduleTimezone || "UTC" })} error={cronError}>
        <input
          id="cron-{uid}"
          type="text"
          spellcheck="false"
          autocomplete="off"
          class="mono"
          bind:value={rawCron}
          aria-describedby="cron-{uid}-hint{cronError ? ` cron-${uid}-error` : ''}"
          aria-invalid={cronError ? "true" : undefined}
          disabled={savingAdvanced}
        />
      </Field>
      <p class="status" role="status" aria-live="polite">{regenerating ? $dt("dash.sources.advanced.regenWorking") : ""}</p>
      {#if advancedError}<Notice tone="danger">{advancedError}</Notice>{/if}
      <div class="actions">
        <Button variant="primary" type="submit" loading={savingAdvanced} disabled={savingAdvanced || regenerating || !advancedDirty}>
          {savingAdvanced ? $dt("dash.state.saving") : $dt("dash.common.save")}
        </Button>
      </div>
    </form>
  </Card>
</div>

<style lang="scss">
  .detail { display: flex; flex-direction: column; gap: var(--space-5); min-width: 0; }
  .detail__nav :global(svg) { transform: rotate(180deg); }
  .detail__head { display: flex; justify-content: space-between; align-items: flex-start; gap: var(--space-4); flex-wrap: wrap; }
  .detail__title { min-width: 0; }
  .detail__title h2 { margin: var(--space-1) 0 var(--space-2); font-size: var(--fs-2xl); font-family: var(--font-display); letter-spacing: var(--tracking-tight); line-height: var(--lh-tight); color: var(--text-1); overflow-wrap: anywhere; outline: none; }
  .detail__kind { font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--text-3); }
  .detail__meta { margin: 0; display: flex; gap: var(--space-3); align-items: center; flex-wrap: wrap; font-size: var(--fs-sm); color: var(--text-2); }
  .detail__link { display: inline-flex; align-items: center; gap: var(--space-1); color: var(--text-link); min-height: var(--control-h); text-decoration: underline; text-underline-offset: 0.2em; &:focus-visible { outline: none; box-shadow: var(--focus-ring); border-radius: var(--radius-sm); } }
  @media (hover: hover) and (pointer: fine) { .detail__link:hover { text-decoration-thickness: 2px; } }
  .form { display: flex; flex-direction: column; gap: var(--space-4); max-width: var(--container-sm); }
  .actions { display: flex; gap: var(--space-2); justify-content: flex-end; flex-wrap: wrap; }
  .actions--start { justify-content: flex-start; }
  .sched__words { display: flex; align-items: center; gap: var(--space-2); margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--text-1); }
  .sched__next { margin: var(--space-2) 0 var(--space-4); min-height: 1.4em; font-size: var(--fs-sm); color: var(--text-2); }
  .status { margin: 0; min-height: 1.4em; font-size: var(--fs-sm); color: var(--text-2); }
  .mt { margin-top: var(--space-3); }
  .mono { font-family: var(--font-mono); }
</style>
