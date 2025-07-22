<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserAnalytics.svelte -->
<script lang="ts">
    import { get } from 'svelte/store'; // Only needed if accessing stores directly, prefer props
    import type { NewsletterUser, NewsSource } from '../../../../../../types.ts'; // Adjust path
    import type { Writable } from 'svelte/store'; // If passing stores as props
  
    // Import UI Components (Adjust paths as needed)
    import TextTypes from '../../../../../texts/TextTypes/TextTypes.svelte';
    import Stat from '../../../../../stats/Stat.svelte'; // Ensure this path is correct
  
    // --- Props ---
  
    /** Raw subscriber data keyed by news source ID */
    export let subscribersByNewsSource: Record<string, NewsletterUser[]> = {};
  
    // Refined structure based on original component's usage
    export let allLeadData: Record<string, Record<string, Record<string, string>>> = {};
  
    /** Array of configured news sources */
    export let newsSources: NewsSource[] = [];
  
    /** Primary color for charts */
    // export let brandColor: string | undefined = '#2196f3'; // Default fallback
  
    /** Secondary color for charts */
    export let complementaryColor: string | undefined = '#ff9800'; // Default fallback
  
    /** Indicates if relevant data is still loading */
    export let isLoading: boolean = false;
  
    /** Contains loading error message, if any */
    export let loadingError: string | null = null;

    // --- Data Transformation Functions (kept within component for encapsulation) ---
  
    /**
     * Calculates subscriber counts per news source based on props.
     * Passed as a callback to the Stat component.
     */
    function getSubscriberCounts() {
      // Ensure newsSources is an array before mapping
      if (!Array.isArray(newsSources)) return [];
  
      return newsSources
        .map((ns) => {
          if (!ns || !ns.id) return null; // Skip invalid sources
          return {
            id: ns.id,
            name: ns.url?.split("//")[1]?.split("/")[0] ?? ns.id, // Use domain or ID as name
            total: subscribersByNewsSource[ns.id]?.length || 0, // Get count from the prop data
          };
        })
        .filter((item): item is { id: string; name: string; total: number } => !!item); // Filter out nulls and type guard
    }
  
  
    /**
     * Calculates lead click counts per news source based on props.
     * Passed as a callback to the Stat component.
     */
    function getLeadClickCounts() {
       // Ensure newsSources is an array before mapping
      if (!Array.isArray(newsSources)) return [];

      console.log(newsSources, "newsSources")
  
      // We directly use the allLeadData prop here.
      // The structure was assumed to be { configId: { nsId: { userId: {...} } } }
      // But in the original component it was used as `leadData[ns.id]` which implies
      // the structure passed down should already be filtered for the specific configId,
      // i.e., { nsId: { userId: { ... } } }
      const leadDataForCurrentConfig = allLeadData || {};

      console.log(allLeadData, "allLeadData")
  
      return newsSources
        .map((ns) => {
          if (!ns || !ns.id) return null; // Skip invalid sources
  
          const nsLeadData = leadDataForCurrentConfig[ns.id];
          let clickCount = 0;

          console.log(nsLeadData, "nsLeadData")
  
          // Calculate clicks: Sum of keys (users) for this news source
          if (nsLeadData && typeof nsLeadData === 'object') {
              // The original logic counted the length of the *innermost* object's keys per user.
              // Let's stick to that original logic.
              clickCount = Object.values(nsLeadData).reduce((sum, userLeads) => {
                  return sum + (userLeads && typeof userLeads === 'object' ? Object.keys(userLeads).length : 0);
              }, 0);
              // Alternative: If you just want the count of users who clicked *anything* for this source:
              // clickCount = Object.keys(nsLeadData).length;
          }
  
          return {
            id: ns.id,
            name: ns.url?.split("//")[1]?.split("/")[0] ?? ns.id, // Use domain or ID as name
            total: clickCount,
          };
        })
        .filter((item): item is { id: string; name: string; total: number } => !!item); // Filter out nulls and type guard
    }
  
    // Reactive computed values if needed, though passing callbacks to Stat is fine
    // $: subscriberChartData = getSubscriberCounts();
    // $: leadChartData = getLeadClickCounts();
    $: allLeadData;

</script>

<div class="analytics-section">
  <TextTypes type="title">Analytics</TextTypes>

  {#if isLoading}
    <p class="loading-message">
      <TextTypes type="sub-italic">Loading analytics data...</TextTypes>
    </p>
  {:else if loadingError}
    <p class="error-message">
      Error loading analytics data: {loadingError}
    </p>
  {:else}
    <!-- Only show charts container if not loading and no error -->
    <div class="stats-container">
      {#if newsSources && newsSources.length > 0}
        <!-- Subscriber Stats -->
        <div class="stat-wrapper">
          <TextTypes type="subtitle">Subscribers per Source</TextTypes>
          <Stat
            dataCallback={getSubscriberCounts}
            xText="News Source"
            yText="Subscribers"
          />
          <!-- Or pass pre-computed data: -->
          <!-- <Stat data={subscriberChartData} HEXColor={brandColor} ... /> -->
        </div>

        <!-- Lead Click Stats -->
        <div class="stat-wrapper">
          <TextTypes type="subtitle">Lead Clicks per Source</TextTypes>
          <Stat
            dataCallback={getLeadClickCounts}
            HEXColor={complementaryColor}
            xText="News Source"
            yText="Clicks"
          />
          <!-- Or pass pre-computed data: -->
          <!-- <Stat data={leadChartData} HEXColor={complementaryColor} ... /> -->
        </div>
      {:else}
        <!-- Message when no news sources are configured -->
        <p class="no-data-message">
          <TextTypes type="sub-italic">
            No news sources configured. Analytics require configured news
            sources.
          </TextTypes>
        </p>
      {/if}
    </div>
  {/if}
</div>

<!-- Use scoped styles or rely on global styles/parent styles -->
<style lang="scss">
  .charts-column {
    // Assuming this class is defined globally or in parent
    /* Styles for the analytics column layout */
  }
  .stats-container {
    display: flex;
    flex-direction: column;
    gap: 2rem; // Space between charts
    margin-top: 1rem;
  }
  .stat-wrapper {
    padding: 1rem;
    background-color: var(--color-background-opaque-inversion);
    border-radius: var(--radius-l);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  }
  .error-message {
    color: var(--color-error, #f44336);
    padding: 1rem;
    background-color: var(--color-error-light, #ffebee);
    border: 1px solid var(--color-error, #f44336);
    border-radius: var(--radius-m);
  }
  .loading-message,
  .no-data-message {
    padding: 1rem;
    font-style: italic;
    color: var(--color-text-secondary, #666);
  }
</style>
