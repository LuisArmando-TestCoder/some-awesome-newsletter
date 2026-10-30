<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserAnalytics.svelte -->
<script lang="ts">
    import type { NewsletterUser, NewsSource } from '../../../../../../types.js'; // Adjust path
  
    // Define a type for the expected data item structure, matching Stat.svelte
    type StatDataItem = {
      name?: string;
      id?: string;
      total: number;
      [key: string]: unknown;
    };

    // Import UI Components (Adjust paths as needed)
    import TextTypes from '../../../../../texts/TextTypes/TextTypes.svelte';
    import Stat from '../../../../../stats/Stat.svelte'; // Ensure this path is correct
    import SubmitButton from '../../../../../buttons/SubmitButton/SubmitButton.svelte';
    import { t } from '$lib/i18n/dashboard-translations';
  
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
    function getSubscriberCounts(): StatDataItem[] {
      // Ensure newsSources is an array before mapping
      if (!Array.isArray(newsSources)) return [];
  
      return newsSources
        .map((ns): StatDataItem | null => {
          if (!ns || !ns.id) return null; // Skip invalid sources
          return {
            id: ns.id,
            name: ns.url?.split("//")[1]?.split("/")[0] ?? ns.id, // Use domain or ID as name
            total: subscribersByNewsSource[ns.id]?.length || 0, // Get count from the prop data
          };
        })
        .filter(Boolean) as StatDataItem[];
    }
  
  
    /**
     * Calculates lead click counts per news source based on props.
     * Passed as a callback to the Stat component.
     */
    function getLeadClickCounts(): StatDataItem[] {
      if (!allLeadData || typeof allLeadData !== 'object' || Object.keys(allLeadData).length === 0 || !Array.isArray(newsSources)) {
          return [];
      }

      return Object.entries(allLeadData).map(([newsSourceId, leadData]) => {
        const newsSource = newsSources.find(ns => ns.id === newsSourceId);
        let name = newsSourceId;
        try { if (newsSource?.url) name = new URL(newsSource.url).hostname; } catch { /* keep id */ }

        let totalClicks = 0;
        for (const user in leadData) {
          totalClicks += Object.keys(leadData[user]).length;
        }

        return {
          id: newsSourceId,
          name: name,
          total: totalClicks,
        };
      }).filter(item => item.total > 0);
    }
  
    // Reactive computed values if needed, though passing callbacks to Stat is fine
    // $: subscriberChartData = getSubscriberCounts();
    // $: leadChartData = getLeadClickCounts();

    function downloadAnalytics() {
      const data = {
        subscribersByNewsSource,
        allLeadData,
      };
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'user-analytics.json';
      a.click();
      URL.revokeObjectURL(url);
    }

</script>

<div class="analytics-section">
  <div class="title-wrapper">
    <TextTypes type="title">{$t['analytics.title']}</TextTypes>
    <SubmitButton label={$t['labels.downloadJson']} callback={downloadAnalytics} />
  </div>

  {#if isLoading}
    <p class="loading-message">
      <TextTypes type="sub-italic">{$t['loading.analytics']}</TextTypes>
    </p>
  {:else if loadingError}
    <p class="error-message">
      {$t['errors.loadingAnalytics']} {loadingError}
    </p>
  {:else}
    <!-- Only show charts container if not loading and no error -->
    <div class="stats-container">
      {#if newsSources && newsSources.length > 0}
        <!-- Subscriber Stats -->
        <div class="stat-wrapper">
          <TextTypes type="subtitle">{$t['analytics.subscribersPerSource']}</TextTypes>
          <Stat
            dataCallback={getSubscriberCounts}
            xText={$t['analytics.newsSource']}
            yText={$t['analytics.subscribers']}
          />
          <!-- Or pass pre-computed data: -->
          <!-- <Stat data={subscriberChartData} HEXColor={brandColor} ... /> -->
        </div>

        <!-- Lead Click Stats -->
        <div class="stat-wrapper">
          {#key newsSources}
            <TextTypes type="subtitle">{$t['analytics.leadClicksPerNewsSource']}</TextTypes>
            <Stat
              dataCallback={getLeadClickCounts}
              HEXColor={complementaryColor}
              xText={$t['analytics.newsSource']}
              yText={$t['analytics.clicks']}
            />
          {/key}
          <!-- Or pass pre-computed data: -->
          <!-- <Stat data={leadChartData} HEXColor={complementaryColor} ... /> -->
        </div>
      {:else}
        <!-- Message when no news sources are configured -->
        <p class="no-data-message">
          <TextTypes type="sub-italic">
            {$t['errors.noNewsSourcesConfigured']}
          </TextTypes>
        </p>
      {/if}
    </div>
  {/if}
</div>

<!-- Use scoped styles or rely on global styles/parent styles -->
<style lang="scss">
  .title-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    margin-bottom: var(--space-4);
  }
  .stats-container {
    display: flex;
    flex-direction: column;
    gap: var(--space-6);
    margin-top: var(--space-4);
  }
  .stat-wrapper {
    padding: var(--card-pad);
    background-color: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
  }
  .error-message {
    color: var(--danger);
    padding: var(--space-4);
    background-color: var(--danger-soft);
    border: 1px solid var(--danger);
    border-radius: var(--radius-md);
  }
  .loading-message,
  .no-data-message {
    padding: var(--space-4);
    color: var(--text-2);
  }
</style>
