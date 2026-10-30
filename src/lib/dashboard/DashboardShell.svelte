<!-- WS4. Dashboard shell: renders the active section. Each section is its own
     page (no accordions), so nothing above it moves when you work inside it. -->
<script lang="ts">
  import { onMount } from "svelte";
  import { activeSection, startNav } from "./nav";
  import { loadAutomations } from "./data/automations";
  import { maybeOfferTour } from "./tour";
  import { dt } from "./i18n";
  import store from "../../components/store";
  import Home from "./sections/Home.svelte";
  import Automations from "./sections/Automations.svelte";
  import Sources from "./sections/Sources.svelte";
  import Subscribers from "./sections/Subscribers.svelte";
  import Reports from "./sections/Reports.svelte";
  import Blog from "./sections/Blog.svelte";
  import Settings from "./sections/Settings.svelte";

  const views = { home: Home, automations: Automations, sources: Sources, subscribers: Subscribers, reports: Reports, blog: Blog, settings: Settings };

  onMount(() => {
    const stop = startNav();
    loadAutomations();
    const t = setTimeout(() => maybeOfferTour($dt, $store.configuratorEmail), 800);
    return () => {
      clearTimeout(t);
      stop();
    };
  });
</script>

<div class="shell" data-section={$activeSection}>
  {#key $activeSection}
    <svelte:component this={views[$activeSection] ?? Home} />
  {/key}
</div>

<style lang="scss">
  .shell {
    width: 100%;
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding: var(--space-6) var(--space-6) var(--space-9);
    box-sizing: border-box;
  }
  @media (max-width: 767px) {
    .shell { padding: var(--space-5) var(--space-4) calc(var(--space-9) + 56px); }
  }
</style>
