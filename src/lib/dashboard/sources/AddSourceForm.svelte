<!-- WS4. Add a source. One POST per submit (in-flight guard), validation only on submit, plan usage in plain words. -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import Notice from "../ui/Notice.svelte";
  import { dt } from "../i18n";
  import { goTo } from "../nav";
  import { toast } from "$lib/ui/components/toast";
  import { toUserMessage } from "$lib/api/errors";
  import store from "../../../components/store";
  import createNewsSource from "../../../components/systems/requests/createNewsSource";
  import { browserTimeZone } from "../data/schedule";
  import { hostOf, normalizeUrl, type SourceUsage } from "./sourceUtils";
  import type { NewsSource } from "../../../components/types";

  export let usage: SourceUsage;
  /** First source the owner added. New sources start with its voice and ideal reader. */
  export let main: NewsSource | null = null;
  export let onadded: (created: NewsSource | null) => void = () => {};
  export let oncancel: (() => void) | null = null;

  const uid = Math.random().toString(36).slice(2, 8);
  let url = "";
  let lead = "";
  let urlError: string | null = null;
  let leadError: string | null = null;
  let formError: string | null = null;
  let adding = false;

  $: isFirst = !main;
  $: blocked = usage.atLimit && !usage.unlimited;

  async function submit() {
    if (adding || blocked) return; // one request per click, even on double submit
    formError = null;
    const cleanUrl = normalizeUrl(url);
    urlError = cleanUrl ? null : url.trim() ? $dt("dash.sources.add.urlInvalid") : $dt("dash.sources.add.urlRequired");
    let cleanLead: string | null = null;
    if (lead.trim()) {
      cleanLead = normalizeUrl(lead);
      leadError = cleanLead ? null : $dt("dash.sources.add.urlInvalid");
    } else leadError = null;
    if (urlError || leadError || !cleanUrl) {
      const el = document.getElementById(urlError ? `add-url-${uid}` : `add-lead-${uid}`);
      el?.focus();
      return;
    }
    adding = true;
    try {
      const body: Parameters<typeof createNewsSource>[0] = { type: "website", url: cleanUrl, lead: cleanLead ?? "", scheduleTimezone: browserTimeZone() };
      const personality = main?.personality || $store.personality;
      if (personality) body.personality = personality;
      if (main?.community) body.community = main.community;
      const created = await createNewsSource(body);
      toast.success($dt("dash.sources.add.success", { host: hostOf(cleanUrl) }));
      url = "";
      lead = "";
      onadded(created ?? null);
    } catch (e) {
      formError = toUserMessage(e, $dt("dash.sources.add.failed"));
    } finally {
      adding = false;
    }
  }
</script>

<Card title={isFirst ? $dt("dash.sources.add.titleFirst") : $dt("dash.sources.add.title")} subtitle={isFirst ? $dt("dash.sources.add.subtitleFirst") : $dt("dash.sources.add.subtitle")}>
  {#if !usage.unlimited}
    {#if usage.atLimit}
      <div class="block">
        <Notice tone="warning" title={$dt("dash.sources.limit.usage", { used: usage.used, limit: usage.limit })}>
          <p>{usage.overLimit ? $dt("dash.sources.limit.over") : $dt("dash.sources.limit.at")}</p>
          <svelte:fragment slot="actions">
            <Button size="sm" variant="primary" onclick={() => goTo("settings", "billing")}>{$dt("dash.sources.limit.action")}</Button>
          </svelte:fragment>
        </Notice>
      </div>
    {:else}
      <p class="usage">{$dt("dash.sources.limit.usage", { used: usage.used, limit: usage.limit })}</p>
    {/if}
  {/if}

  {#if !blocked}
    <form class="form" novalidate on:submit|preventDefault={submit} aria-busy={adding}>
      <Field id="add-url-{uid}" label={isFirst ? $dt("dash.sources.add.urlLabelFirst") : $dt("dash.sources.add.urlLabel")} hint={$dt("dash.sources.add.urlHint")} error={urlError}>
        <input
          id="add-url-{uid}"
          type="text"
          inputmode="url"
          autocomplete="url"
          spellcheck="false"
          placeholder="https://yourcompany.com/blog"
          bind:value={url}
          disabled={adding}
          aria-describedby="add-url-{uid}-hint{urlError ? ` add-url-${uid}-error` : ''}"
          aria-invalid={urlError ? "true" : undefined}
        />
      </Field>
      <Field id="add-lead-{uid}" label={$dt("dash.sources.field.lead")} hint={$dt("dash.sources.field.leadHint")} error={leadError} optional optionalLabel={$dt("dash.common.optional")}>
        <input
          id="add-lead-{uid}"
          type="text"
          inputmode="url"
          spellcheck="false"
          placeholder="https://yourcompany.com/contact"
          bind:value={lead}
          disabled={adding}
          aria-describedby="add-lead-{uid}-hint{leadError ? ` add-lead-${uid}-error` : ''}"
          aria-invalid={leadError ? "true" : undefined}
        />
      </Field>
      {#if !isFirst}<p class="note">{$dt("dash.sources.add.inherits")}</p>{/if}

      <p class="status" role="status" aria-live="polite">{adding ? $dt("dash.sources.add.working") : ""}</p>
      {#if formError}<Notice tone="danger">{formError}</Notice>{/if}

      <div class="actions">
        {#if oncancel}<Button variant="tertiary" disabled={adding} onclick={() => oncancel?.()}>{$dt("dash.common.cancel")}</Button>{/if}
        <Button variant="primary" type="submit" icon="plus" loading={adding} disabled={adding}>
          {adding ? $dt("dash.sources.add.adding") : isFirst ? $dt("dash.sources.add.submitFirst") : $dt("dash.sources.add.submit")}
        </Button>
      </div>
    </form>
  {/if}
</Card>

<style lang="scss">
  .form { display: flex; flex-direction: column; gap: var(--space-4); max-width: 35rem; }
  .block { margin-bottom: var(--space-2); }
  .usage { margin: 0 0 var(--space-4); font-size: var(--fs-sm); color: var(--text-2); }
  .note { margin: 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .status { margin: 0; min-height: 1.4em; font-size: var(--fs-sm); color: var(--text-2); }
  .actions { display: flex; gap: var(--space-2); justify-content: flex-end; flex-wrap: wrap; }
</style>
