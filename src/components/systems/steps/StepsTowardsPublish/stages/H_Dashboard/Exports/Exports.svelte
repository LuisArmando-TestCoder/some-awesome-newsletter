<script lang="ts">
  import type { NewsSource } from "../../../../../../types";
  import store from "../../../../../../store";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import CodeFormatter from "../../../../../../common/CodeFormatter.svelte";
  import { onMount } from "svelte";
    import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import { t } from "$lib/i18n/dashboard-translations";

  let tooltipElement: HTMLElement;
  let infoIconElement: HTMLElement;
  let tooltipPosition: "top" | "bottom" = "bottom";

  $: newsSources = $store.config?.newsSources || [];

  $: exportedData = newsSources.map((ns: NewsSource) => ({
    id: ns.id,
    lead: ns.lead,
    url: ns.url
  }));

  $: jsonString = JSON.stringify(exportedData, null, 2);

  function downloadJson() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(jsonString);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "news_sources_export.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
</script>

<Page>
  <ToggleCard  onChange={() => {}} isOpen={false} cardTitle={$t['labels.apiNewsSources']}>
    <div class="exports-page">
      <div class="title-container">
        <TextTypes type="title">{$t['labels.exportNewsSources']}</TextTypes>
        <div class="info-icon" bind:this={infoIconElement}>
          <span class="info-icon-span">&#8505;</span>
          <div class="tooltip {tooltipPosition}" bind:this={tooltipElement}>
            <p class="tooltip-paragraph">
              {$t['markdown.exportNewsSources']}
            </p>
            <p class="tooltip-paragraph">
              {$t['markdown.exportNewsSourcesExample']}
            </p>
          </div>
        </div>
      </div>
  
      <div class="code-formatter-container">
        <div class="download-button">
          <SubmitButton label={$t['labels.downloadJson']} callback={downloadJson} />
        </div>
        
        <CodeFormatter code={`
  ${
          jsonString
  }
  `} lang="json" />
      </div>
    </div>
  </ToggleCard>
</Page>

<style lang="scss">
  @use "./Exports.scss";
</style>
