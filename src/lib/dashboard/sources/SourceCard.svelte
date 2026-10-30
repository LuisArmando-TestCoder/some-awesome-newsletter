<!-- WS4. One source in the list: what it is, whether it sends, when, and to how many people. -->
<script lang="ts">
  import Button from "../ui/Button.svelte";
  import Icon from "../ui/Icon.svelte";
  import StatusPill from "../ui/StatusPill.svelte";
  import { dt, plural } from "../i18n";
  import { hostOf, scheduleWords } from "./sourceUtils";
  import type { NewsSource } from "../../../components/types";

  export let source: NewsSource;
  export let isMain = false;
  export let subscriberCount = 0;
  export let onedit: (id: string) => void;

  $: host = hostOf(source.url) || $dt("dash.common.unknown");
  $: on = source.active !== false;
  $: leadHost = source.lead && source.lead !== source.url ? hostOf(source.lead) : "";
  const titleId = `src-${Math.random().toString(36).slice(2, 8)}`;
</script>

<article class="src" aria-labelledby={titleId}>
  <div class="src__top">
    <span class="src__kind">{isMain ? $dt("dash.sources.card.main") : $dt("dash.sources.card.other")}</span>
    <StatusPill status={on ? "on" : "off"} label={on ? $dt("dash.sources.card.on") : $dt("dash.sources.card.off")} />
  </div>
  <h3 class="src__host" id={titleId}>{host}</h3>
  <ul class="src__facts">
    <li><Icon name="clock" size={16} /><span>{on ? scheduleWords(source.scheduleTime, $dt, source.scheduleTimezone) : $dt("dash.sources.card.paused")}</span></li>
    <li><Icon name="people" size={16} /><span>{plural($dt, "dash.sources.card.subscribers", subscriberCount)}</span></li>
    {#if leadHost}
      <li><Icon name="arrow" size={16} /><span>{$dt("dash.sources.card.lead", { host: leadHost })}</span></li>
    {/if}
  </ul>
  <div class="src__actions">
    <Button variant="secondary" icon="sliders" ariaLabel={$dt("dash.sources.card.editAria", { host })} onclick={() => onedit(source.id)}>
      {$dt("dash.sources.card.edit")}
    </Button>
    {#if source.url}
      <Button variant="ghost" iconAfter="external" href={source.url} target="_blank" ariaLabel={$dt("dash.sources.card.visitAria", { host })}>
        {$dt("dash.sources.card.visit")}
      </Button>
    {/if}
  </div>
</article>

<style lang="scss">
  .src { display: flex; flex-direction: column; gap: var(--space-3); padding: var(--space-5); border: 1px solid var(--border-1); border-radius: var(--radius-lg); background: var(--surface-1); min-width: 0; }
  .src__top { display: flex; justify-content: space-between; align-items: center; gap: var(--space-2); }
  .src__kind { font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--text-3); }
  .src__host { margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--text-1); overflow-wrap: anywhere; }
  .src__facts { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-2); }
  .src__facts li { display: flex; gap: var(--space-2); align-items: flex-start; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
  .src__facts li :global(svg) { flex-shrink: 0; margin-top: 2px; color: var(--text-3); }
  .src__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-top: auto; padding-top: var(--space-2); }
</style>
