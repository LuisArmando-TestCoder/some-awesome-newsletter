<!-- WS4. One signup form card per source (share link, embed code, preview) from WS5's EmbedCode widget. -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Button from "../ui/Button.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import EmbedCode from "../../../components/systems/widgets/EmbedCode/EmbedCode.svelte";
  import { subscriberData } from "./data";
  import { goTo } from "../nav";
  import { dt } from "../i18n";
  import store from "../../../components/store";

  $: sources = $subscriberData.sources;
  $: configuratorId = ($store.config?.configuratorId as string) || $store.configuratorEmail || null;
  $: brandColor = ($store.config?.brandColor as string) || null;
</script>

{#if sources.length === 0}
  <EmptyState icon="source" title={$dt("dash.subs.noSources.title")} body={$dt("dash.subs.noSources.body")}>
    <Button variant="primary" onclick={() => goTo("sources")}>{$dt("dash.subs.noSources.action")}</Button>
  </EmptyState>
{:else}
  <p class="intro">{$dt("dash.subs.form.intro")}</p>
  <div class="stack">
    {#each sources as s (s.id)}
      <Card title={$dt("dash.subs.form.title")} subtitle={sources.length > 1 ? $dt("dash.subs.form.subtitle", { source: s.host }) : null}>
        <EmbedCode {configuratorId} newsSourceId={s.id} {brandColor} />
      </Card>
    {/each}
  </div>
{/if}

<style lang="scss">
  .intro { margin: 0 0 var(--space-4); color: var(--text-2); font-size: var(--fs-sm); max-width: var(--measure); line-height: var(--lh-normal); }
  .stack { display: flex; flex-direction: column; gap: var(--space-5); }
</style>
