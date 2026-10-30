<!-- WS4. Accessible confirm dialog (native <dialog>: focus trap, Esc closes). -->
<script lang="ts">
  import { tick } from "svelte";
  import Button from "./Button.svelte";
  import { confirmRequest } from "./confirm";
  let dialog: HTMLDialogElement;

  $: if ($confirmRequest && dialog && !dialog.open) open();

  async function open() {
    await tick();
    dialog.showModal();
  }
  function finish(ok: boolean) {
    const req = $confirmRequest;
    confirmRequest.set(null);
    if (dialog?.open) dialog.close();
    req?.resolve(ok);
  }
</script>

<dialog bind:this={dialog} class="cdlg" aria-labelledby="cdlg-title" on:cancel|preventDefault={() => finish(false)}>
  {#if $confirmRequest}
    <h2 id="cdlg-title">{$confirmRequest.title}</h2>
    {#if $confirmRequest.body}<p>{$confirmRequest.body}</p>{/if}
    <div class="cdlg__actions">
      <Button variant="secondary" onclick={() => finish(false)}>{$confirmRequest.cancelLabel}</Button>
      <Button variant={$confirmRequest.tone === "danger" ? "danger" : "primary"} onclick={() => finish(true)}>{$confirmRequest.confirmLabel}</Button>
    </div>
  {/if}
</dialog>

<style lang="scss">
  .cdlg {
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-1);
    color: var(--text-1);
    box-shadow: var(--shadow-3);
    padding: var(--space-6);
    width: min(92vw, 440px);
    &::backdrop { background: var(--surface-overlay, rgba(0, 0, 0, 0.45)); }
  }
  h2 { margin: 0 0 var(--space-2); font-size: var(--fs-lg); font-weight: var(--fw-semibold); }
  p { margin: 0; color: var(--text-2); font-size: var(--fs-sm); line-height: var(--lh-normal); }
  .cdlg__actions { display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-5); flex-wrap: wrap; }
</style>
