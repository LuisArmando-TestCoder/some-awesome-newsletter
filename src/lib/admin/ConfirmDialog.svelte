<script lang="ts">
  /** Confirmation for actions that change access or customers. Primary button only after reading. */
  import { Button, Dialog } from "$lib/ui/components";

  let {
    open = $bindable(false),
    title,
    description = "",
    confirmLabel,
    danger = false,
    busy = false,
    onconfirm,
  }: {
    open?: boolean;
    title: string;
    description?: string;
    confirmLabel: string;
    danger?: boolean;
    busy?: boolean;
    onconfirm: () => void | Promise<void>;
  } = $props();
</script>

<Dialog bind:open {title} {description} size="sm">
  {#snippet footer()}
    <div class="row">
      <Button variant="tertiary" onclick={() => (open = false)} disabled={busy}>Cancel</Button>
      <Button variant={danger ? "danger" : "primary"} loading={busy} loadingLabel="Working" onclick={onconfirm}>{confirmLabel}</Button>
    </div>
  {/snippet}
</Dialog>

<style>
  .row {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2, 8px);
  }
</style>
