<!-- WS4. Send now: write an issue about a link or text, or send the next scheduled issue early. -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import { confirmAction } from "../ui/confirm";
  import { toast } from "$lib/ui/components/toast";
  import sendCustomContent from "../../../components/systems/requests/sendCustomContent";
  import triggerNewsSourceSend from "../../../components/systems/requests/triggerNewsSourceSend";
  import { subscriberData } from "./data";
  import { goTo } from "../nav";
  import { dt, plural } from "../i18n";
  import store from "../../../components/store";

  const MAX_CHARS = 20000;

  let sourceId = "";
  let content = "";
  let contentError: string | null = null;
  let writing = false;
  let sendingNext = false;
  let writeMsg: { tone: "success" | "danger"; text: string } | null = null;
  let nextMsg: { tone: "success" | "danger"; text: string } | null = null;

  $: sources = $subscriberData.sources;
  $: if (sources.length && !sources.some((s) => s.id === sourceId)) sourceId = sources[0].id;
  $: source = sources.find((s) => s.id === sourceId);
  $: recipients = $subscriberData.countBySource[sourceId] ?? 0;
  $: isLink = /^https?:\/\/\S+$/i.test(content.trim());

  function recipientsText() {
    return plural($dt, "dash.subs.send.recipients", recipients, { source: source?.host ?? "" });
  }

  async function write() {
    writeMsg = null;
    contentError = null;
    if (!content.trim()) {
      contentError = $dt("dash.subs.send.contentRequired");
      return;
    }
    if (recipients === 0) {
      writeMsg = { tone: "danger", text: $dt("dash.subs.send.noRecipients") };
      return;
    }
    const ok = await confirmAction({
      title: $dt("dash.subs.send.writeConfirmTitle"),
      body: recipientsText(),
      confirmLabel: $dt("dash.subs.send.writeConfirm"),
      cancelLabel: $dt("dash.common.cancel"),
    });
    if (!ok) return;
    writing = true;
    try {
      const configId = $store.configuratorEmail;
      const sent = await sendCustomContent(configId, sourceId, content.trim());
      if (!sent) throw new Error($dt("dash.subs.send.writeFailed"));
      writeMsg = { tone: "success", text: $dt("dash.subs.send.writeDone") };
      toast.success(writeMsg.text);
      content = "";
    } catch (e) {
      writeMsg = { tone: "danger", text: e instanceof Error ? e.message : $dt("dash.subs.send.writeFailed") };
      toast.error(writeMsg.text);
    } finally {
      writing = false;
    }
  }

  async function sendNext() {
    nextMsg = null;
    if (recipients === 0) {
      nextMsg = { tone: "danger", text: $dt("dash.subs.send.noRecipients") };
      return;
    }
    const ok = await confirmAction({
      title: $dt("dash.subs.send.nextConfirmTitle"),
      body: `${recipientsText()} ${$dt("dash.subs.send.nextConfirmBody")}`,
      confirmLabel: $dt("dash.subs.send.nextConfirm"),
      cancelLabel: $dt("dash.common.cancel"),
    });
    if (!ok) return;
    sendingNext = true;
    try {
      const r = await triggerNewsSourceSend(sourceId);
      if (r !== true) throw new Error(typeof r === "string" ? r : $dt("dash.subs.send.nextFailed"));
      nextMsg = { tone: "success", text: $dt("dash.subs.send.nextDone") };
      toast.success(nextMsg.text);
    } catch (e) {
      nextMsg = { tone: "danger", text: e instanceof Error ? e.message : $dt("dash.subs.send.nextFailed") };
      toast.error(nextMsg.text);
    } finally {
      sendingNext = false;
    }
  }
</script>

{#if sources.length === 0}
  <EmptyState icon="source" title={$dt("dash.subs.noSources.title")} body={$dt("dash.subs.noSources.body")}>
    <Button variant="primary" onclick={() => goTo("sources")}>{$dt("dash.subs.noSources.action")}</Button>
  </EmptyState>
{:else}
  <div class="stack">
    {#if sources.length > 1}
      <Card>
        <Field id="send-source" label={$dt("dash.subs.send.sourceLabel")} hint={recipientsText()}>
          <select id="send-source" bind:value={sourceId} aria-describedby="send-source-hint">
            {#each sources as s (s.id)}<option value={s.id}>{s.host}</option>{/each}
          </select>
        </Field>
      </Card>
    {/if}

    <Card title={$dt("dash.subs.send.writeTitle")} subtitle={$dt("dash.subs.send.writeSubtitle")}>
      <form class="form" on:submit|preventDefault={write} novalidate>
        <Field id="send-content" label={$dt("dash.subs.send.contentLabel")} hint={$dt("dash.subs.send.contentHint")} error={contentError}>
          <textarea
            id="send-content"
            rows="6"
            maxlength={MAX_CHARS}
            bind:value={content}
            on:input={() => (contentError = null)}
            disabled={writing}
            aria-invalid={!!contentError}
            aria-describedby="send-content-hint"
            placeholder="https://"
          ></textarea>
        </Field>
        {#if content.trim()}
          <p class="detect">{isLink ? $dt("dash.subs.send.detectLink") : $dt("dash.subs.send.detectText")}</p>
        {/if}
        <div aria-live="polite">
          {#if writeMsg}<Notice tone={writeMsg.tone}>{writeMsg.text}</Notice>{/if}
        </div>
        <div class="row">
          <span class="meta">{recipientsText()}</span>
          <Button type="submit" variant="primary" icon="send" loading={writing}>{$dt("dash.subs.send.writeButton")}</Button>
        </div>
      </form>
    </Card>

    <Card title={$dt("dash.subs.send.nextTitle")} subtitle={$dt("dash.subs.send.nextSubtitle")}>
      <div aria-live="polite">
        {#if nextMsg}<div class="mb"><Notice tone={nextMsg.tone}>{nextMsg.text}</Notice></div>{/if}
      </div>
      <div class="row">
        <Button variant="tertiary" onclick={() => goTo("automations")}>{$dt("dash.subs.send.editSchedule")}</Button>
        <Button variant="secondary" icon="play" loading={sendingNext} onclick={sendNext}>{$dt("dash.subs.send.nextButton")}</Button>
      </div>
    </Card>
  </div>
{/if}

<style lang="scss">
  .stack { display: flex; flex-direction: column; gap: var(--space-5); }
  .form { display: flex; flex-direction: column; gap: var(--space-3); }
  .detect { margin: 0; font-size: var(--fs-sm); color: var(--text-2); }
  .row { display: flex; align-items: center; justify-content: flex-end; gap: var(--space-3); flex-wrap: wrap; }
  .meta { margin-right: auto; font-size: var(--fs-sm); color: var(--text-2); }
  .mb { margin-bottom: var(--space-3); }
  @media (max-width: 40rem) {
    .row { flex-direction: column-reverse; align-items: stretch; }
    .row :global(button) { width: 100%; min-height: 44px; }
    .meta { margin-right: 0; }
  }
</style>
