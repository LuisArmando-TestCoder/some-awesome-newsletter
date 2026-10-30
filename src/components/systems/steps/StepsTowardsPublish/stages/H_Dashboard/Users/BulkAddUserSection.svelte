<!-- Import many subscribers from a file or pasted text, with live progress.
     Public API kept for older callers: props `disabled`, `newsSourceId`, `onUpload(file)`, `addedUsers`, method `reset()`. -->
<script lang="ts">
  import Field from "$lib/dashboard/ui/Field.svelte";
  import Button from "$lib/dashboard/ui/Button.svelte";
  import Notice from "$lib/dashboard/ui/Notice.svelte";
  import { dt, formatNumber } from "$lib/dashboard/i18n";
  import { importProgress, cancelImport, resetImport } from "$lib/api/imports";

  export let disabled: boolean = false;
  export let newsSourceId: string;
  export let onUpload: (file: File | null) => void | Promise<void> = () => {};
  export let addedUsers: string[] = [];

  const MAX_MB = 20;
  const ACCEPT = ".csv,.tsv,.txt,.xlsx";
  const uid = Math.random().toString(36).slice(2, 8);

  let mode: "file" | "paste" = "file";
  let file: File | null = null;
  let pasted = "";
  let fileInput: HTMLInputElement;
  let isSubmitting = false;
  let error: string | null = null;

  $: p = $importProgress;
  $: busy = isSubmitting || p.status === "reading" || p.status === "uploading";

  function onPick(e: Event) {
    const f = (e.currentTarget as HTMLInputElement).files?.[0] ?? null;
    error = null;
    if (!f) { file = null; return; }
    if (!/\.(csv|tsv|txt|xlsx)$/i.test(f.name)) {
      error = $dt("dash.subs.import.badType");
      file = null;
      return;
    }
    if (f.size > MAX_MB * 1024 * 1024) {
      error = $dt("dash.subs.import.tooBig", { max: MAX_MB });
      file = null;
      return;
    }
    file = f;
  }

  async function handleSubmit() {
    if (disabled || busy) return;
    error = null;
    let toSend: File | null = null;
    if (mode === "file") {
      if (!file) { error = $dt("dash.subs.import.pickFile"); return; }
      toSend = file;
    } else {
      if (!pasted.trim()) { error = $dt("dash.subs.import.pasteEmpty"); return; }
      toSend = new File([pasted], "pasted-contacts.txt", { type: "text/plain" });
    }
    isSubmitting = true;
    try {
      await onUpload(toSend);
    } catch (e) {
      error = e instanceof Error && e.message ? e.message : $dt("dash.subs.import.failed");
    } finally {
      isSubmitting = false;
    }
  }

  export function reset() {
    file = null;
    pasted = "";
    error = null;
    isSubmitting = false;
    if (fileInput) fileInput.value = "";
    if (!busy) resetImport();
  }
</script>

<div class="bulk" data-source={newsSourceId}>
  <fieldset class="modes">
    <legend class="sr-only">{$dt("dash.subs.import.modeLegend")}</legend>
    <label class="mode" class:active={mode === "file"}>
      <input type="radio" name="mode-{uid}" value="file" bind:group={mode} disabled={busy} />
      {$dt("dash.subs.import.modeFile")}
    </label>
    <label class="mode" class:active={mode === "paste"}>
      <input type="radio" name="mode-{uid}" value="paste" bind:group={mode} disabled={busy} />
      {$dt("dash.subs.import.modePaste")}
    </label>
  </fieldset>

  {#if mode === "file"}
    <Field id="bulk-file-{uid}" label={$dt("labels.chooseFile")} hint={$dt("dash.subs.import.fileHint", { max: MAX_MB })}>
      <input
        bind:this={fileInput}
        id="bulk-file-{uid}"
        type="file"
        accept={ACCEPT}
        on:change={onPick}
        disabled={disabled || busy}
        aria-describedby="bulk-file-{uid}-hint"
      />
    </Field>
    {#if file}
      <p class="picked">{$dt("dash.subs.import.picked", { name: file.name })}</p>
    {/if}
  {:else}
    <Field id="bulk-paste-{uid}" label={$dt("dash.subs.import.pasteLabel")} hint={$dt("dash.subs.import.pasteHint")}>
      <textarea id="bulk-paste-{uid}" rows="6" bind:value={pasted} disabled={disabled || busy} aria-describedby="bulk-paste-{uid}-hint" placeholder="ana@example.com, Ana, es"></textarea>
    </Field>
  {/if}

  {#if error}<Notice tone="danger">{error}</Notice>{/if}

  <div class="progress-area" aria-live="polite">
    {#if p.status === "reading" || p.status === "uploading"}
      <div class="progress">
        <div class="progress__label">
          <span>{p.status === "reading" ? $dt("dash.subs.import.reading") : $dt("dash.subs.import.uploading", { done: formatNumber(p.processedRows), total: formatNumber(p.totalRows) })}</span>
          <span>{p.percent}%</span>
        </div>
        <div class="progress__track" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={p.percent} aria-label={$dt("dash.subs.import.progressLabel")}>
          <div class="progress__bar" style="width: {p.percent}%"></div>
        </div>
        <Button size="sm" variant="tertiary" onclick={cancelImport}>{$dt("dash.subs.import.cancel")}</Button>
      </div>
    {:else if p.status === "done" && p.fileName !== undefined}
      <Notice tone={p.errors.length ? "warning" : "success"} title={$dt("dash.subs.import.doneTitle", { count: formatNumber(p.added) })}>
        {#if p.errors.length}{$dt("dash.subs.import.doneErrors", { count: formatNumber(p.errors.length) })}{:else}{p.message ?? $dt("dash.subs.import.doneBody")}{/if}
      </Notice>
    {:else if p.status === "failed"}
      <Notice tone="danger">{p.message ?? $dt("dash.subs.import.failed")}</Notice>
    {:else if p.status === "cancelled"}
      <Notice tone="info">{$dt("dash.subs.import.cancelled", { count: formatNumber(p.added) })}</Notice>
    {/if}
  </div>

  {#if addedUsers.length > 0}
    <details class="added">
      <summary>{$dt("dash.subs.import.addedList", { count: formatNumber(addedUsers.length) })}</summary>
      <ul>
        {#each addedUsers.slice(0, 200) as email (email)}<li>{email}</li>{/each}
      </ul>
    </details>
  {/if}

  <div class="row">
    <Button variant="primary" icon="upload" loading={busy} {disabled} onclick={handleSubmit}>{$dt("dash.subs.import.submit")}</Button>
  </div>
</div>

<style lang="scss">
  .bulk { display: flex; flex-direction: column; gap: var(--space-4); }
  .modes { display: inline-flex; gap: var(--space-1); padding: var(--space-1); margin: 0; border: 1px solid var(--border-1); border-radius: var(--radius-full); background: var(--surface-2); align-self: flex-start; }
  .mode {
    display: inline-flex;
    align-items: center;
    min-height: var(--control-h-sm, 36px);
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    cursor: pointer;
    transition: background var(--dur-fast) var(--ease-out);
    input { position: absolute; opacity: 0; pointer-events: none; }
    &.active { background: var(--surface-1); color: var(--text-1); box-shadow: var(--shadow-1); }
    &:has(input:focus-visible) { box-shadow: var(--focus-ring); }
  }
  input[type="file"] { padding: var(--space-2); cursor: pointer; }
  .picked { margin: 0; font-size: var(--fs-sm); color: var(--text-2); }
  .progress { display: flex; flex-direction: column; gap: var(--space-2); align-items: flex-start; }
  .progress__label { display: flex; justify-content: space-between; width: 100%; font-size: var(--fs-sm); color: var(--text-2); font-variant-numeric: tabular-nums; }
  .progress__track { width: 100%; height: var(--space-2); background: var(--surface-3); border-radius: var(--radius-full); overflow: hidden; }
  .progress__bar { height: 100%; background: var(--accent); border-radius: var(--radius-full); transition: width var(--dur-base) var(--ease-out); }
  .added summary { cursor: pointer; font-size: var(--fs-sm); color: var(--text-link); min-height: 44px; display: flex; align-items: center; }
  .added ul { margin: var(--space-2) 0 0; padding-left: var(--space-5); max-height: 12rem; overflow: auto; font-size: var(--fs-sm); color: var(--text-2); }
  .row { display: flex; justify-content: flex-end; }
  @media (max-width: 40rem) {
    .modes { align-self: stretch; }
    .mode { flex: 1; justify-content: center; min-height: 44px; }
    .row :global(button) { width: 100%; min-height: 44px; }
  }
</style>
