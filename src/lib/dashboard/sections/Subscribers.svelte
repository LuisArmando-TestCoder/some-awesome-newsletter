<!-- WS4. Subscribers: list, add or import, signup form, send now. Tabs follow ?tab= through nav.ts. -->
<script lang="ts">
  import SectionHeader from "../ui/SectionHeader.svelte";
  import { HelpCard } from "$lib/tutorial";
  import Tabs from "../ui/Tabs.svelte";
  import SubscriberList from "../subscribers/SubscriberList.svelte";
  import AddImport from "../subscribers/AddImport.svelte";
  import SignupForms from "../subscribers/SignupForms.svelte";
  import SendPanel from "../subscribers/SendPanel.svelte";
  import { subscriberData } from "../subscribers/data";
  import { goTo, sectionTab } from "../nav";
  import { dt, formatNumber } from "../i18n";

  const IDS = ["list", "add", "form", "send"] as const;
  type TabId = (typeof IDS)[number];

  $: active = (IDS as readonly string[]).includes($sectionTab ?? "") ? ($sectionTab as TabId) : "list";
  $: count = $subscriberData.rows.length;
  $: tabs = [
    { id: "list", label: $dt("dash.subs.tab.list"), badge: count ? formatNumber(count) : null },
    { id: "add", label: $dt("dash.subs.tab.add") },
    { id: "form", label: $dt("dash.subs.tab.form") },
    { id: "send", label: $dt("dash.subs.tab.send") },
  ];

  function change(e: CustomEvent<string>) {
    // goTo moves focus to the main region; keep it on the tab the user is on.
    const focused = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
    goTo("subscribers", e.detail === "list" ? null : e.detail);
    focused?.focus({ preventScroll: true });
  }
</script>

<SectionHeader title={$dt("dash.nav.subscribers")} description={$dt("dash.subscribers.desc")} />
<div class="ws4-help"><HelpCard id="help-subscribers" compact title={$dt("dash.help.subscribers.title")} what={$dt("dash.help.subscribers.what")} why={$dt("dash.help.subscribers.why")} /></div>

<Tabs {tabs} {active} label={$dt("dash.nav.subscribers")} on:change={change}>
  {#if active === "list"}
    <SubscriberList />
  {:else if active === "add"}
    <AddImport />
  {:else if active === "form"}
    <SignupForms />
  {:else}
    <SendPanel />
  {/if}
</Tabs>

<style>
  .ws4-help { margin: calc(var(--space-4) * -1) 0 var(--space-5); }
</style>
