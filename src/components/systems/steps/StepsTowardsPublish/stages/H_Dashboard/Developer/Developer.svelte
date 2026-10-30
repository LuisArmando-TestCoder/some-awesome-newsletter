<!-- WS4. Legacy entry for the developer step. Renders the new Integrations and Developer settings. -->
<script lang="ts">
  import IntegrationsTab from "$lib/dashboard/settings/IntegrationsTab.svelte";
  import DeveloperTab from "$lib/dashboard/settings/DeveloperTab.svelte";

  // Passed by the step host; this view is always shown.
  export const canReveal: boolean = true;
</script>

<div class="legacy-dev">
  <IntegrationsTab />
  <DeveloperTab />
</div>

<style lang="scss">
  .legacy-dev { display: flex; flex-direction: column; gap: var(--space-5); padding: var(--space-4); }
</style>
