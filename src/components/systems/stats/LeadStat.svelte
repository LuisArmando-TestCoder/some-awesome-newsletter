<!-- src/components/systems/stats/LeadStat.svelte -->
<script lang="ts">
  import RenamedTextTypes from '../texts/TextTypes/TextTypes.svelte';

  export let leadData: Record<string, Record<string, string>> = {};

  $: totalLeads = Object.keys(leadData || {}).length;
  $: totalClicks = Object.values(leadData || {}).reduce((sum, userData) => {
    return sum + Object.keys(userData).length;
  }, 0);
</script>

<div class="lead-stats">
  <div class="stat-item">
    <RenamedTextTypes type="subtitle">Total Leads</RenamedTextTypes>
    <RenamedTextTypes type="title">{totalLeads}</RenamedTextTypes>
  </div>
  <div class="stat-item">
    <RenamedTextTypes type="subtitle">Total Clicks</RenamedTextTypes>
    <RenamedTextTypes type="title">{totalClicks}</RenamedTextTypes>
  </div>
</div>

<style>
  .lead-stats {
    display: flex;
    gap: 2rem;
    justify-content: center;
    padding: 1rem 0;
  }
  .stat-item {
    padding: 1rem;
    background-color: var(--color-background-opaque-inversion);
    border-radius: var(--radius-l);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    text-align: center;
    min-width: 120px;
  }
</style>
