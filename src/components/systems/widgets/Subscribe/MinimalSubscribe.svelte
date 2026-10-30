<!-- Kept for existing imports. Renders the compact embedded signup form. Owner: WS5. -->
<script lang="ts">
  import SubscribeForm from './SubscribeForm.svelte';

  export let configuratorId: string;
  export let newsSourceId: string;
  export let accent: string | null = null;
  export let lead: string | null = null;
</script>

<SubscribeForm {configuratorId} {newsSourceId} {accent} {lead} layout="compact" embedded headingLevel={2} />
