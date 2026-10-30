<script lang="ts">
  // WS4. Onboarding (WS3's MainSteps) until the owner has a source and has
  // finished the steps, then the dashboard shell.
  import GlobalData from "../../components/GlobalData/GlobalData.svelte";
  import SocketClient from "../../components/SocketClient.svelte";
  import MainSteps from "../../components/systems/steps/StepsTowardsPublish/MainSteps.svelte";
  import DashboardShell from "$lib/dashboard/DashboardShell.svelte";
  import { dashboardMode } from "$lib/dashboard/nav";
</script>

<svelte:head>
  <title>AIBAN dashboard</title>
</svelte:head>

<GlobalData />
<SocketClient />
{#if $dashboardMode}
  <DashboardShell />
{:else}
  <MainSteps />
{/if}

<style lang="scss">
  @use "../styles/everything.scss";
</style>
