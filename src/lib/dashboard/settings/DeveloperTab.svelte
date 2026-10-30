<!-- WS4. Settings > Developer: per-source subscribe link, link pattern, API example,
     and a JSON export of your sources. One source at a time, picked from a list (no accordions). -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Field from "../ui/Field.svelte";
  import Button from "../ui/Button.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import CopyUrlWithQR from "../../../components/common/CopyUrlWithQR.svelte";
  import PostExplanation from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/NewsSource/PostExplanation.svelte";
  import regenerateSelectors from "../../../components/systems/requests/regenerateSelectors";
  import store from "../../../components/store";
  import type { NewsSource } from "../../../components/types";
  import { toast } from "$lib/ui/components/toast";
  import { goTo } from "../nav";
  import { dt as dtx } from "../i18n";

  let selectedId = "";
  let detecting = false;
  let detectError = "";

  $: sources = ($store.config?.newsSources ?? []) as NewsSource[];
  $: loading = $store.config?.newsSources === undefined;
  $: if (sources.length && !sources.some((s) => s.id === selectedId)) selectedId = sources[sources.length - 1].id;
  $: source = sources.find((s) => s.id === selectedId);

  $: exportData = sources.map((ns) => ({ id: ns.id, lead: ns.lead, url: ns.url }));
  $: jsonString = JSON.stringify(exportData, null, 2);

  function host(url: string | undefined) {
    if (!url) return "";
    try { return new URL(url).hostname.replace(/^www\./, "") + new URL(url).pathname.replace(/\/$/, ""); } catch { return url; }
  }

  async function detect() {
    if (!source || detecting) return;
    detecting = true;
    detectError = "";
    const result = await regenerateSelectors($store.configuratorEmail, source.id, source.url);
    detecting = false;
    if (result) toast.success($dtx("dash.dev.detectDone"));
    else detectError = $dtx("dash.dev.detectError");
  }

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

<div class="dev">
  {#if loading}
    <Card><Skeleton lines={4} label={$dtx("dash.dev.loading")} /></Card>
  {:else if !sources.length}
    <Card>
      <EmptyState icon="code" title={$dtx("dash.dev.emptyTitle")} body={$dtx("dash.dev.emptyBody")}>
        <Button variant="primary" icon="plus" onclick={() => goTo("sources")}>{$dtx("dash.dev.emptyAction")}</Button>
      </EmptyState>
    </Card>
  {:else}
    <Card title={$dtx("dash.dev.sourceTitle")} subtitle={$dtx("dash.dev.sourceSub")}>
      <div class="stack">
        <Field id="dev-source" label={$dtx("dash.dev.pickLabel")}>
          <select id="dev-source" bind:value={selectedId}>
            {#each sources as ns (ns.id)}
              <option value={ns.id}>{host(ns.url)}</option>
            {/each}
          </select>
        </Field>

        {#if source}
          <dl class="ids">
            <div><dt>{$dtx("dash.dev.sourceId")}</dt><dd><code>{source.id}</code></dd></div>
            <div><dt>{$dtx("dash.dev.accountId")}</dt><dd><code>{$store.configuratorEmail}</code></dd></div>
          </dl>

          <section class="block" aria-labelledby="dev-link-title">
            <h3 class="block__title" id="dev-link-title">{$dtx("dash.dev.linkTitle")}</h3>
            <p class="block__text">{$dtx("dash.dev.linkText")}</p>
            {#key source.id}
              <CopyUrlWithQR configuratorEmail={$store.configuratorEmail} newsSourceId={source.id} lead={source.lead} label={$dtx("dash.dev.linkLabel")} />
            {/key}
          </section>

          <section class="block" aria-labelledby="dev-pattern-title">
            <h3 class="block__title" id="dev-pattern-title">{$dtx("dash.dev.patternTitle")}</h3>
            <p class="block__text">{$dtx("dash.dev.patternText")}</p>
            <div class="pattern">
              <Field id="dev-pattern" label={$dtx("dash.dev.patternLabel")} hint={$dtx("dash.dev.patternHint")}>
                <input id="dev-pattern" type="text" readonly value={source.linkSelector || ""} placeholder={$dtx("dash.dev.patternEmpty")} aria-describedby="dev-pattern-hint" />
              </Field>
              <div class="pattern__action">
                <Button variant="secondary" icon="refresh" loading={detecting} onclick={detect}>{$dtx("dash.dev.detect")}</Button>
              </div>
            </div>
            <div aria-live="polite">
              {#if detecting}<p class="block__text">{$dtx("dash.dev.detecting")}</p>{/if}
              {#if detectError}<Notice tone="danger">{detectError}</Notice>{/if}
            </div>
          </section>

          <section class="block" aria-labelledby="dev-api-title">
            <h3 class="block__title" id="dev-api-title">{$dtx("dash.dev.apiTitle")}</h3>
            <p class="block__text">{$dtx("dash.dev.apiText")}</p>
            {#key source.id}
              <PostExplanation newsSource={source} />
            {/key}
          </section>
        {/if}
      </div>
    </Card>

    <Card title={$dtx("dash.dev.exportTitle")} subtitle={$dtx("dash.dev.exportSub")}>
      <svelte:fragment slot="actions">
        <Button variant="secondary" icon="download" onclick={downloadJson}>{$dtx("dash.dev.exportButton")}</Button>
      </svelte:fragment>
      <p class="block__text">{$dtx("dash.dev.exportText")}</p>
      <!-- Scrollable region: keyboard users need focus to scroll it (WCAG 2.1.1, axe scrollable-region-focusable). -->
      <!-- svelte-ignore a11y_no_noninteractive_tabindex -->
      <pre class="code" role="region" tabindex="0" aria-label={$dtx("dash.dev.exportPreview")}><code>{jsonString}</code></pre>
    </Card>
  {/if}
</div>

<style lang="scss">
  .dev { display: flex; flex-direction: column; gap: var(--space-4); }
  .stack { display: flex; flex-direction: column; gap: var(--space-5); }
  .ids {
    margin: 0;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
    gap: var(--space-3);
    div { min-width: 0; }
    dt { font-size: var(--fs-xs); color: var(--text-3); margin-bottom: var(--space-1); }
    dd { margin: 0; overflow-wrap: anywhere; }
    code { font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--text-1); }
  }
  .block { display: flex; flex-direction: column; gap: var(--space-3); padding-top: var(--space-4); border-top: 1px solid var(--border-1); min-width: 0; }
  .block__title { margin: 0; font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); }
  .block__text { margin: 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); max-width: var(--measure); }
  .pattern { display: flex; gap: var(--space-3); align-items: flex-start; flex-wrap: wrap; }
  .pattern > :global(:first-child) { flex: 1 1 16rem; }
  .pattern :global(input[readonly]) { font-family: var(--font-mono); background: var(--surface-2); }
  .pattern__action { padding-top: calc(var(--fs-sm) * 1.5 + var(--space-2)); }
  .code {
    margin: var(--space-3) 0 0;
    max-height: 18rem;
    overflow: auto;
    padding: var(--space-3) var(--space-4);
    border-radius: var(--radius-md);
    background: var(--surface-2);
    border: 1px solid var(--border-1);
    font-family: var(--font-mono);
    font-size: var(--fs-xs);
    line-height: var(--lh-normal);
    color: var(--text-1);
    &:focus-visible { outline: none; box-shadow: var(--focus-ring); }
  }
  @media (max-width: 560px) { .pattern__action { padding-top: 0; } }
</style>
