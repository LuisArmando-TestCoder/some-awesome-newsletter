<!-- WS4. Automations: what runs for you, and presets you can turn on. -->
<script lang="ts">
  import { onMount } from "svelte";
  import SectionHeader from "../ui/SectionHeader.svelte";
  import { HelpCard } from "$lib/tutorial";
  import Card from "../ui/Card.svelte";
  import Icon from "../ui/Icon.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
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
    <div class="stack" aria-busy="true">
      {#each [0, 1] as i (i)}
        <Card>
          <div class="auto-skel" aria-hidden="true">
            <span class="sk sk--icon"></span>
            <div class="auto-skel__body"><span class="sk sk--title"></span><span class="sk sk--line"></span><span class="sk sk--line short"></span></div>
            <span class="sk sk--switch"></span>
          </div>
        </Card>
      {/each}
      <span class="sr-only" role="status">{$dt("dash.state.loading")}</span>
    </div>
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
  .muted { margin: 0 0 var(--space-4); color: var(--text-2); font-size: var(--fs-sm); max-width: var(--measure); &:empty { display: none; } }
  .presets { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 17.5rem), 1fr)); gap: var(--space-3); }
  /* Presets are not actionable yet: dashed edge and a text label, never a hover lift. */
  .preset { display: flex; gap: var(--space-3); align-items: flex-start; padding: var(--space-4); border: 1px dashed var(--border-1); border-radius: var(--radius-lg); background: transparent; }
  .preset__icon { display: grid; place-items: center; width: 2.25rem; height: 2.25rem; border-radius: var(--radius-md); background: var(--surface-2); color: var(--text-2); flex-shrink: 0; }
  .preset__text { flex: 1; min-width: 0; }
  .preset__name { margin: 0; font-weight: var(--fw-semibold); font-size: var(--fs-sm); color: var(--text-1); }
  .preset__sentence { margin: var(--space-1) 0 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .preset__soon { font-size: var(--fs-xs); font-weight: var(--fw-medium); color: var(--text-2); border: 1px solid var(--border-1); border-radius: var(--radius-full); padding: 2px var(--space-2); white-space: nowrap; }
  .ws4-help { margin: calc(var(--space-4) * -1) 0 var(--space-5); }
  .auto-skel { display: flex; gap: var(--space-4); align-items: flex-start; }
  .auto-skel__body { flex: 1; display: flex; flex-direction: column; gap: var(--space-2); }
  .sk { display: block; border-radius: var(--radius-sm); background: var(--surface-2); animation: auto-pulse 1.4s var(--ease-in-out) infinite; }
  .sk--icon { width: 2.75rem; height: 2.75rem; border-radius: var(--radius-md); flex-shrink: 0; }
  .sk--title { height: 1.125rem; width: 45%; }
  .sk--line { height: 0.875rem; width: 85%; &.short { width: 55%; } }
  .sk--switch { width: 2.75rem; height: 1.5rem; border-radius: var(--radius-full); flex-shrink: 0; }
  @keyframes auto-pulse { 50% { opacity: 0.55; } }
  @media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
</style>
