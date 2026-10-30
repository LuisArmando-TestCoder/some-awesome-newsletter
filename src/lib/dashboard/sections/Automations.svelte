<!-- WS4. Automations: what runs for you, and presets you can turn on. -->
<script lang="ts">
  import { onMount } from "svelte";
  import SectionHeader from "../ui/SectionHeader.svelte";
  import { HelpCard } from "$lib/tutorial";
  import Card from "../ui/Card.svelte";
  import Icon from "../ui/Icon.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import Button from "../ui/Button.svelte";
  import AutomationCard from "../AutomationCard.svelte";
  import { automations, loadAutomations, RECIPES } from "../data/automations";
  import { goTo } from "../nav";
  import { dt } from "../i18n";
  import store from "../../../components/store";

  $: sources = $store.config?.newsSources ?? [];
  function urlOf(list: { id?: string; url?: string }[], id?: string): string {
    return list.find((s) => s.id === id)?.url ?? "";
  }
  $: present = new Set($automations.items.map((a) => a.recipeId));
  // Presets not yet turned on. When the backend is not live, the ones that do not exist yet show as "Coming soon".
  $: more = RECIPES.filter((r) => r.id !== "daily_issue" && !present.has(r.id));

  onMount(() => {
    if ($automations.status !== "loading") loadAutomations();
  });
</script>

<SectionHeader title={$dt("dash.nav.automations")} description={$dt("dash.automations.desc")} />
<div class="ws4-help"><HelpCard id="help-automations" compact title={$dt("dash.help.automations.title")} what={$dt("dash.help.automations.what")} why={$dt("dash.help.automations.why")} /></div>

{#if $automations.error}
  <div class="mb"><Notice tone="warning">{$automations.error}</Notice></div>
{/if}

<section aria-labelledby="auto-yours" data-tour="automations-list">
  <h2 id="auto-yours" class="h2">{$dt("dash.automations.yours")}</h2>
  {#if $automations.status === "loading" || $automations.status === "idle"}
    <div class="stack"><Card><Skeleton lines={3} /></Card><Card><Skeleton lines={3} /></Card></div>
  {:else if $automations.items.length === 0}
    <EmptyState icon="bolt" title={$dt("dash.automations.empty.title")} body={$dt("dash.automations.empty.body")}>
      <Button variant="primary" onclick={() => goTo("sources")}>{$dt("dash.automations.empty.action")}</Button>
    </EmptyState>
  {:else}
    <div class="stack">
      {#each $automations.items as a (a.id)}
        <AutomationCard automation={a} sourceUrl={urlOf(sources, a.newsSourceIds?.[0])} />
      {/each}
    </div>
  {/if}
</section>

{#if more.length}
  <section aria-labelledby="auto-more" class="more">
    <h2 id="auto-more" class="h2">{$dt("dash.automations.more")}</h2>
    <p class="muted">{$automations.live ? "" : $dt("dash.automations.moreBody")}</p>
    <ul class="presets">
      {#each more as r (r.id)}
        <li class="preset">
          <span class="preset__icon" aria-hidden="true"><Icon name={r.icon} size={20} /></span>
          <div class="preset__text">
            <p class="preset__name">{$dt(`dash.recipe.${r.id}.name`)}</p>
            <p class="preset__sentence">{$dt(`dash.recipe.${r.id}.sentence`)}</p>
          </div>
          <span class="preset__soon">{$dt("dash.automations.comingSoon")}</span>
        </li>
      {/each}
    </ul>
  </section>
{/if}

<style lang="scss">
  .h2 { margin: 0 0 var(--space-3); font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); }
  .stack { display: flex; flex-direction: column; gap: var(--space-4); }
  .mb { margin-bottom: var(--space-4); }
  .more { margin-top: var(--space-8); }
  .muted { margin: 0 0 var(--space-4); color: var(--text-2); font-size: var(--fs-sm); &:empty { display: none; } }
  .presets { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: var(--space-3); }
  .preset { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-4); border: 1px solid var(--border-1); border-radius: var(--radius-lg); background: var(--surface-1); }
  .preset__icon { display: grid; place-items: center; width: 36px; height: 36px; border-radius: var(--radius-md); background: var(--surface-2); color: var(--text-2); flex-shrink: 0; }
  .preset__text { flex: 1; min-width: 0; }
  .preset__name { margin: 0; font-weight: var(--fw-semibold); font-size: var(--fs-sm); color: var(--text-1); }
  .preset__sentence { margin: var(--space-1) 0 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .preset__soon { font-size: var(--fs-xs); color: var(--text-2); background: var(--surface-2); border-radius: var(--radius-full); padding: 2px var(--space-2); white-space: nowrap; }
  .ws4-help { margin: calc(var(--space-4) * -1) 0 var(--space-5); }
</style>
