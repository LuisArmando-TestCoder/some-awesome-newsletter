<!-- WS4. One save row per settings tab: Save (disabled until something changes),
     Discard, a live status line, and a warning before closing the page with unsaved changes. -->
<script lang="ts">
  import { onDestroy } from "svelte";
  import Button from "../ui/Button.svelte";
  import { dt } from "../i18n";
  import { settingsDirty } from "./dirty";

  export let dirty = false;
  export let saving = false;
  export let onSave: () => void;
  export let onDiscard: (() => void) | null = null;
  export let saveLabel: string | null = null;

  function beforeUnload(e: BeforeUnloadEvent) {
    if (!dirty) return;
    e.preventDefault();
    e.returnValue = "";
  }
  $: settingsDirty.set(dirty);
  $: if (typeof window !== "undefined") {
    window.removeEventListener("beforeunload", beforeUnload);
    if (dirty) window.addEventListener("beforeunload", beforeUnload);
  }
  // Result of the last save, derived from the saving flag: when it drops and nothing is dirty,
  // the save worked ("Saved" for a moment); when edits are still pending, it did not.
  let phase: "idle" | "saved" | "failed" = "idle";
  let wasSaving = false;
  let phaseTimer: ReturnType<typeof setTimeout> | undefined;
  $: track(saving, dirty);
  function track(isSaving: boolean, isDirty: boolean) {
    if (isSaving) {
      wasSaving = true;
      clearTimeout(phaseTimer);
      phase = "idle";
      return;
    }
    if (wasSaving) {
      wasSaving = false;
      phase = isDirty ? "failed" : "saved";
      clearTimeout(phaseTimer);
      if (phase === "saved") phaseTimer = setTimeout(() => (phase = "idle"), 2400);
      return;
    }
    // Editing again after a failure or success clears the result.
    if (phase === "saved" && isDirty) phase = "idle";
  }
  $: barState = saving ? "saving" : phase === "failed" && dirty ? "failed" : phase === "saved" ? "saved" : dirty ? "dirty" : "clean";

  onDestroy(() => {
    clearTimeout(phaseTimer);
    settingsDirty.set(false);
    if (typeof window !== "undefined") window.removeEventListener("beforeunload", beforeUnload);
  });
</script>

<div class="savebar" data-state={barState}>
  <p class="savebar__status" role="status">
    <span class="savebar__mark" aria-hidden="true">
      {#if barState === "saved"}
        <svg viewBox="0 0 16 16" width="16" height="16"><path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" /></svg>
      {:else if barState === "failed"}
        <svg viewBox="0 0 16 16" width="16" height="16"><circle cx="8" cy="8" r="6.5" fill="none" stroke="currentColor" stroke-width="1.5" /><path d="M8 4.5v4M8 11v.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" /></svg>
      {:else if barState === "dirty"}
        <span class="savebar__dot"></span>
      {/if}
    </span>
    <span>
      {#if barState === "saving"}{$dt("dash.settings.save.saving")}
      {:else if barState === "saved"}{$dt("dash.state.saved")}
      {:else if barState === "failed"}{$dt("dash.settings.save.failedShort")}
      {:else if barState === "dirty"}{$dt("dash.settings.save.unsaved")}
      {:else}{$dt("dash.settings.save.clean")}{/if}
    </span>
  </p>
  <div class="savebar__actions">
    {#if onDiscard && dirty && !saving}
      <Button variant="tertiary" onclick={() => onDiscard?.()}>{$dt("dash.settings.save.discard")}</Button>
    {/if}
    <Button variant="primary" disabled={!dirty || saving} loading={saving} onclick={() => onSave()}>
      {saveLabel ?? $dt("dash.settings.save.button")}
    </Button>
  </div>
</div>

<style lang="scss">
  /* Floats over the form only while there is something to save; otherwise it sits flat. */
  .savebar {
    position: sticky;
    bottom: var(--space-3);
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding: var(--space-2) var(--space-2) var(--space-2) var(--space-4);
    margin-top: var(--space-5);
    /* Leave room for the floating language button at the bottom right of the viewport. */
    margin-inline-end: 5.5rem;
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    transition: box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out);
  }
  .savebar[data-state="dirty"],
  .savebar[data-state="saving"],
  .savebar[data-state="failed"] {
    background: var(--surface-glass);
    -webkit-backdrop-filter: saturate(1.8) blur(16px);
    backdrop-filter: saturate(1.8) blur(16px);
    border-color: var(--border-2);
    box-shadow: var(--shadow-2);
  }
  .savebar[data-state="failed"] { border-color: var(--danger); }
  .savebar__status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    min-height: 1.5em;
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
  .savebar__mark { display: inline-grid; place-items: center; width: 1rem; height: 1rem; flex-shrink: 0; }
  .savebar__mark:empty { display: none; }
  .savebar__dot { width: 8px; height: 8px; border-radius: var(--radius-full); background: var(--warning); }
  [data-state="dirty"] .savebar__status { color: var(--text-1); font-weight: var(--fw-medium); }
  [data-state="saved"] .savebar__status { color: var(--text-1); font-weight: var(--fw-medium); }
  [data-state="saved"] .savebar__mark { color: var(--success); animation: savebar-pop var(--dur-slow) var(--ease-spring); }
  [data-state="failed"] .savebar__status { color: var(--danger); font-weight: var(--fw-medium); }
  .savebar__actions { display: flex; gap: var(--space-2); align-items: center; margin-left: auto; }
  @keyframes savebar-pop { from { transform: scale(0.4); opacity: 0; } }
  @media (max-width: 40rem) {
    .savebar { border-radius: var(--radius-lg); padding: var(--space-3); bottom: calc(4.5rem + env(safe-area-inset-bottom)); }
    .savebar__actions { width: 100%; justify-content: flex-end; }
  }
  @media (forced-colors: active) {
    .savebar { border-color: CanvasText; }
  }
  @media (prefers-reduced-motion: reduce) {
    [data-state="saved"] .savebar__mark { animation: none; }
  }
</style>
