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
  onDestroy(() => {
    settingsDirty.set(false);
    if (typeof window !== "undefined") window.removeEventListener("beforeunload", beforeUnload);
  });
</script>

<div class="savebar">
  <p class="savebar__status" aria-live="polite">
    {#if saving}{$dt("dash.settings.save.saving")}{:else if dirty}{$dt("dash.settings.save.unsaved")}{:else}{$dt("dash.settings.save.clean")}{/if}
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
  .savebar {
    position: sticky;
    bottom: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3);
    flex-wrap: wrap;
    padding: var(--space-3) var(--space-4);
    margin-top: var(--space-5);
    background: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-2);
  }
  .savebar__status { margin: 0; font-size: var(--fs-sm); color: var(--text-2); min-height: 1.5em; }
  .savebar__actions { display: flex; gap: var(--space-2); align-items: center; margin-left: auto; }
</style>
