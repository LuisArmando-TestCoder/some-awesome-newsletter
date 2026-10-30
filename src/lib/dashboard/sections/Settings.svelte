<!-- WS4. Settings: five tabs, no accordions (diagnostic j, k, l; STRATEGY section 4).
     Each tab has its own Save button. -->
<script lang="ts">
  import SectionHeader from "../ui/SectionHeader.svelte";
  import { HelpCard } from "$lib/tutorial";
  import Tabs from "../ui/Tabs.svelte";
  import BrandTab from "../settings/BrandTab.svelte";
  import SendingTab from "../settings/SendingTab.svelte";
  import BillingTab from "../settings/BillingTab.svelte";
  import IntegrationsTab from "../settings/IntegrationsTab.svelte";
  import DeveloperTab from "../settings/DeveloperTab.svelte";
  import { settingsTab, goTo, type SettingsTab } from "../nav";
  import { dt } from "../i18n";
  import { get } from "svelte/store";
  import { settingsDirty } from "../settings/dirty";
  import { confirmAction } from "../ui/confirm";

  $: tabs = [
    { id: "brand", label: $dt("dash.settings.tab.brand") },
    { id: "sending", label: $dt("dash.settings.tab.sending") },
    { id: "billing", label: $dt("dash.settings.tab.billing") },
    { id: "integrations", label: $dt("dash.settings.tab.integrations") },
    { id: "developer", label: $dt("dash.settings.tab.developer") },
  ];
  // Tabs keep their own drafts, so ask before leaving one with unsaved changes.
  let activeTab: string = $settingsTab;
  $: activeTab = $settingsTab;
  async function change(e: CustomEvent<string>) {
    const next = e.detail as SettingsTab;
    if (get(settingsDirty)) {
      const leave = await confirmAction({
        title: $dt("dash.settings.leaveTitle"),
        body: $dt("dash.settings.leaveBody"),
        confirmLabel: $dt("dash.settings.leaveConfirm"),
        cancelLabel: $dt("dash.settings.leaveCancel"),
        tone: "danger",
      });
      if (!leave) {
        activeTab = $settingsTab; // Tabs already moved its highlight; put it back.
        return;
      }
    }
    goTo("settings", next);
  }
</script>

<SectionHeader title={$dt("dash.nav.settings")} description={$dt("dash.settings.desc")} />
<div class="ws4-help"><HelpCard id="help-settings" compact title={$dt("dash.help.settings.title")} what={$dt("dash.help.settings.what")} why={$dt("dash.help.settings.why")} /></div>
<Tabs {tabs} bind:active={activeTab} label={$dt("dash.nav.settings")} on:change={change}>
  {#if $settingsTab === "brand"}
    <BrandTab />
  {:else if $settingsTab === "sending"}
    <SendingTab />
  {:else if $settingsTab === "billing"}
    <BillingTab />
  {:else if $settingsTab === "integrations"}
    <IntegrationsTab />
  {:else}
    <DeveloperTab />
  {/if}
</Tabs>

<style>
  .ws4-help { margin: calc(var(--space-4) * -1) 0 var(--space-5); }
</style>
