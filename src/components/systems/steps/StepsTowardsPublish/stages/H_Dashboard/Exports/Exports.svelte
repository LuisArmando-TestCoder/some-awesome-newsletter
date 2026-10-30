<!-- WS4. Legacy export step: download your sources as JSON. The explanation is plain
     visible text (the old hover-only tooltip was not reachable by keyboard or touch). -->
<script lang="ts">
  import type { NewsSource } from "../../../../../../types";
  import store from "../../../../../../store";
  import Card from "$lib/dashboard/ui/Card.svelte";
  import Button from "$lib/dashboard/ui/Button.svelte";
  import { dt } from "$lib/dashboard/i18n";

  export let canReveal = true;
  $: canReveal;

  $: newsSources = ($store.config?.newsSources || []) as NewsSource[];
  $: jsonString = JSON.stringify(newsSources.map((ns) => ({ id: ns.id, lead: ns.lead, url: ns.url })), null, 2);

  function downloadJson() {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "aiban-sources.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }
</script>

<div class="exports">
  <Card title={$dt("dash.dev.exportTitle")} subtitle={$dt("dash.dev.exportSub")}>
    <svelte:fragment slot="actions">
      <Button variant="secondary" icon="download" onclick={downloadJson}>{$dt("dash.dev.exportButton")}</Button>
    </svelte:fragment>
    <p class="exports__text">{$dt("dash.dev.exportText")}</p>
    <pre class="exports__code" tabindex="0" aria-label={$dt("dash.dev.exportPreview")}><code>{jsonString}</code></pre>
  </Card>
</div>

<style lang="scss">
  .exports { padding: var(--space-4); }
  .exports__text { margin: 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); max-width: var(--measure); }
  .exports__code {
    margin: var(--space-3) 0 0;
    max-height: 18rem;
    overflow: auto;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    background: var(--surface-2);
    border: 1px solid var(--border-1);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    color: var(--text-1);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
</style>
