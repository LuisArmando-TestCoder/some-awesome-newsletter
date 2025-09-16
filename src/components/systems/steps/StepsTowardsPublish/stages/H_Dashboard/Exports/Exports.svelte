<script lang="ts">
  import type { NewsSource } from "../../../../../../types";
  import store from "../../../../../../store";
  import Page from "../../../../../wrappers/Page/Page.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import CodeFormatter from "../../../../../../common/CodeFormatter.svelte";

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
  <div class="exports-page">
    <div class="download-button">
      <SubmitButton label="Download JSON" callback={downloadJson} />
    </div>

    <TextTypes type="title">Export News Sources</TextTypes>
    
    <CodeFormatter code={`
${
      jsonString
}
`} lang="json" />
  </div>
</Page>

<style lang="scss">
  @use "./Exports.scss";
</style>
