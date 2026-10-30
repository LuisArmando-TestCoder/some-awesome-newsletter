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
    border-radius: var(--radius-xl);
    background: var(--surface-0);
    color: var(--text-1);
    box-shadow: var(--shadow-3);
    padding: var(--space-6);
    width: min(calc(100vw - 2 * var(--space-4)), 440px);
    max-height: min(90vh, 90dvh);
    overflow-y: auto;
    overscroll-behavior: contain;
    scrollbar-gutter: stable;

    &[open] {
      opacity: 1;
      transform: none;
      transition:
        opacity var(--dur-base) var(--ease-out),
        transform var(--dur-slow) var(--ease-out);
    }

    &::backdrop {
      background: var(--surface-overlay);
      backdrop-filter: blur(8px) saturate(1.2);
      -webkit-backdrop-filter: blur(8px) saturate(1.2);
      opacity: 1;
      transition: opacity var(--dur-base) var(--ease-out);
    }
  }

  /* Enter: fades up and settles; the backdrop fades in under it. */
  @starting-style {
    .cdlg[open] {
      opacity: 0;
      transform: translateY(0.5rem) scale(0.97);
    }
    .cdlg[open]::backdrop {
      opacity: 0;
    }
  }

  h2 {
    margin: 0 0 var(--space-2);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
    line-height: var(--lh-tight);
  }
  p { margin: 0; color: var(--text-2); font-size: var(--fs-md); line-height: var(--lh-normal); }
  .cdlg__actions { display: flex; justify-content: flex-end; gap: var(--space-2); margin-top: var(--space-6); flex-wrap: wrap; }

  @media (prefers-reduced-motion: reduce) {
    .cdlg[open],
    .cdlg::backdrop {
      transition: none;
    }
  }

  @media (forced-colors: active) {
    .cdlg { border-color: CanvasText; }
  }
</style>
