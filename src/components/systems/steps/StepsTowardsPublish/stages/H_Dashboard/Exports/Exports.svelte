<script lang="ts">
  import type { NewsSource } from "../../../../../../types";
  import store from "../../../../../../store";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import CodeFormatter from "../../../../../../common/CodeFormatter.svelte";
  import { onMount } from "svelte";
    import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";

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
  <ToggleCard  onChange={() => {}} isOpen={false} cardTitle="API News Sources">
    <div class="exports-page">
      <div class="title-container">
        <TextTypes type="title">Export Your News Sources</TextTypes>
        <div class="info-icon" bind:this={infoIconElement}>
          <span class="info-icon-span">&#8505;</span>
          <div class="tooltip {tooltipPosition}" bind:this={tooltipElement}>
            <p class="tooltip-paragraph">
              Here you can download a JSON file containing essential information about your news sources. This file includes the <strong>ID, lead, and URL</strong> for each source, allowing you to easily integrate them into other systems or scripts.
            </p>
            <p class="tooltip-paragraph">
              For example, you could use this data to programmatically manage your news sources, such as adding new subscribers to a specific newsletter, just like in our interactive API playground. The <code class="tooltip-code"><strong>id</strong></code> in the exported file corresponds to the <code class="tooltip-code"><strong>newsSourceId</strong></code>, which is used to identify the news source in API calls.
            </p>
          </div>
        </div>
      </div>
  
      <div class="code-formatter-container">
        <div class="download-button">
          <SubmitButton label="Download JSON" callback={downloadJson} />
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
