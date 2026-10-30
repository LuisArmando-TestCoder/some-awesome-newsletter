<!-- WS4. Add one person or import a list into the chosen source. -->
<script lang="ts">
  import { get } from "svelte/store";
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import { toast } from "$lib/ui/components/toast";
  import { importProgress } from "$lib/api/imports";
  import ManualAddUserForm from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/ManualAddUserForm.svelte";
  import BulkAddUserSection from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/BulkAddUserSection.svelte";
  import { addUserAndSubscribe, processBulkUpload } from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService";
  import { subscriberData } from "./data";
  import { goTo } from "../nav";
  import { dt, formatNumber } from "../i18n";

  let sourceId = "";
  let manualForm: ManualAddUserForm;
  let addedUsers: string[] = [];

  $: sources = $subscriberData.sources;
  $: if (sources.length && !sources.some((s) => s.id === sourceId)) sourceId = sources[0].id;
  $: sourceHost = sources.find((s) => s.id === sourceId)?.host ?? "";

  async function addOne(formData: { name: string; email: string; bio: string; language: string }) {
    const result = await addUserAndSubscribe(formData, sourceId);
    // Say what really happened: people added by hand confirm by email before issues start.
    const key = result?.alreadySubscribed
      ? "dash.subs.add.already"
      : result?.status === "pending"
        ? result.confirmationEmailSent === false
          ? "dash.subs.add.pendingNoEmail"
          : "dash.subs.add.pending"
        : "dash.subs.add.done";
    toast.success($dt(key, { email: formData.email, source: sourceHost }));
    manualForm?.reset();
  }

  async function importFile(file: File | null) {
    if (!file) return;
    addedUsers = [];
    const result = await processBulkUpload(file, sourceId, (email) => {
      addedUsers = [...addedUsers, email];
    });
    const p = get(importProgress);
    if (p.status === "failed") throw new Error(p.message || $dt("dash.subs.import.failed"));
    if (p.status === "cancelled") return;
    if (result.errorMessage) toast.error($dt("dash.subs.import.doneErrors", { count: formatNumber(p.errors.length || 1) }));
    else toast.success($dt("dash.subs.import.doneTitle", { count: formatNumber(p.added) }));
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
        <Field id="add-source" label={$dt("dash.subs.add.sourceLabel")} hint={$dt("dash.subs.add.sourceHint")}>
          <select id="add-source" bind:value={sourceId} aria-describedby="add-source-hint">
            {#each sources as s (s.id)}<option value={s.id}>{s.host}</option>{/each}
          </select>
        </Field>
      </Card>
    {/if}

    <Card title={$dt("dash.subs.add.title")} subtitle={$dt("dash.subs.add.subtitle", { source: sourceHost })}>
      <ManualAddUserForm bind:this={manualForm} onSubmit={addOne} />
    </Card>

    <Card title={$dt("dash.subs.import.title")} subtitle={$dt("dash.subs.import.subtitle", { source: sourceHost })}>
      <ul class="explain">
        <li>{$dt("dash.subs.import.explainFormats")}</li>
        <li>{$dt("dash.subs.import.explainClean")}</li>
        <li>{$dt("dash.subs.import.explainLanguage")}</li>
      </ul>
      {#key sourceId}
        <BulkAddUserSection newsSourceId={sourceId} onUpload={importFile} {addedUsers} />
      {/key}
    </Card>
  </div>
{/if}

<style lang="scss">
  .stack { display: flex; flex-direction: column; gap: var(--space-5); }
  .explain {
    margin: 0 0 var(--space-4);
    padding-left: var(--space-5);
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-2);
    line-height: var(--lh-normal);
  }
</style>
