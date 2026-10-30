<script lang="ts">
  // Legacy mount point for ping() notifications. It renders the shared Toaster,
  // which guards itself so a second Toaster elsewhere never shows toasts twice.
  import Toaster from '$lib/ui/components/Toaster.svelte';

  interface Props {
    closeLabel?: string;
    regionLabel?: string;
  }

  let { closeLabel = 'Close', regionLabel = 'Notifications' }: Props = $props();
</script>

<Toaster {closeLabel} {regionLabel} />
