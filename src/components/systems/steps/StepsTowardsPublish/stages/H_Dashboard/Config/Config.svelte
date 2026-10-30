<!-- WS4. Legacy entry for the profile step. Renders the new Brand and Sending email
     settings (tabs replaced the old auto collapse accordions). -->
<script lang="ts">
  import BrandTab from "$lib/dashboard/settings/BrandTab.svelte";
  import SendingTab from "$lib/dashboard/settings/SendingTab.svelte";
  import Tabs from "$lib/dashboard/ui/Tabs.svelte";
  import { dt } from "$lib/dashboard/i18n";

  export let canReveal = true;
  $: canReveal;

  let active = "brand";
  $: tabs = [
    { id: "brand", label: $dt("dash.settings.tab.brand") },
    { id: "sending", label: $dt("dash.settings.tab.sending") },
  ];
</script>

<div class="legacy-config">
  <Tabs {tabs} bind:active label={$dt("dash.nav.settings")}>
    {#if active === "brand"}<BrandTab />{:else}<SendingTab />{/if}
  </Tabs>
</div>

<style lang="scss">
  .legacy-config { padding: var(--space-4); }
</style>
