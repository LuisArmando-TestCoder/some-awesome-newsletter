<!-- WS4. Reports: overview numbers and daily clicks, top links and readers, languages. -->
<script lang="ts">
  import SectionHeader from "../ui/SectionHeader.svelte";
  import Tabs from "../ui/Tabs.svelte";
  import Card from "../ui/Card.svelte";
  import StatTile from "../ui/StatTile.svelte";
  import Notice from "../ui/Notice.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import Button from "../ui/Button.svelte";
  import ClicksChart from "../reports/ClicksChart.svelte";
  import BarList from "../reports/BarList.svelte";
  import TopList from "../reports/TopList.svelte";
  import { clickReport } from "../reports/data";
  import { metrics, languageName } from "../data/insights";
  import { goTo, sectionTab, dashboardReady } from "../nav";
  import { dt, formatNumber } from "../i18n";

  const IDS = ["overview", "clicks", "languages"] as const;
  type TabId = (typeof IDS)[number];

  $: active = (IDS as readonly string[]).includes($sectionTab ?? "") ? ($sectionTab as TabId) : "overview";
  $: tabs = [
    { id: "overview", label: $dt("dash.reports.tab.overview") },
    { id: "clicks", label: $dt("dash.reports.tab.clicks") },
    { id: "languages", label: $dt("dash.reports.tab.languages") },
  ];
  $: loading = !$dashboardReady || !$metrics.ready;
  $: report = $clickReport;
  $: knownLanguages = $metrics.languages.filter((l) => l.code !== "?");
  $: langItems = $metrics.languages.map((l) => ({ id: l.code, label: languageName(l.code), count: l.count }));
  $: linkItems = report.topLinks.map((l) => ({ id: l.url, label: l.host, sub: l.path || undefined, count: l.count, title: l.url }));
  $: clickerItems = report.topClickers.map((c) => ({ id: c.email, label: c.email, count: c.count }));

  function change(e: CustomEvent<string>) {
    const focused = typeof document !== "undefined" ? (document.activeElement as HTMLElement | null) : null;
    goTo("reports", e.detail === "overview" ? null : e.detail);
    focused?.focus({ preventScroll: true });
  }
</script>

<SectionHeader title={$dt("dash.nav.reports")} description={$dt("dash.reports.desc")} />

<Tabs {tabs} {active} label={$dt("dash.nav.reports")} on:change={change}>
  {#if !loading && $metrics.sources.length === 0}
    <EmptyState icon="chart" title={$dt("dash.reports.noSources.title")} body={$dt("dash.reports.noSources.body")}>
      <Button variant="primary" onclick={() => goTo("sources")}>{$dt("dash.subs.noSources.action")}</Button>
    </EmptyState>
  {:else if active === "overview"}
    <div class="stack">
      <div class="stats">
        <StatTile icon="people" label={$dt("dash.reports.stat.subscribers")} value={formatNumber($metrics.subscribers)} {loading} />
        <StatTile icon="arrow" label={$dt("dash.reports.stat.clicks7")} value={formatNumber($metrics.clicks7d)} {loading} />
        <StatTile icon="arrow" label={$dt("dash.reports.stat.clicks30")} value={formatNumber($metrics.clicks30d)} {loading} />
        <StatTile icon="globe" label={$dt("dash.reports.stat.languages")} value={formatNumber(knownLanguages.length)} {loading} />
      </div>

      <Card title={$dt("dash.reports.chart.title")} subtitle={$dt("dash.reports.chart.subtitle")}>
        {#if report.days.every((d) => d.count === 0)}
          <EmptyState compact icon="chart" title={$dt("dash.reports.chart.emptyTitle")} body={$dt("dash.reports.chart.emptyBody")} />
        {:else}
          <ClicksChart days={report.days} />
        {/if}
      </Card>

      <Notice tone="info" title={$dt("dash.reports.notes.title")}>
        <p class="note">{$dt("dash.reports.notes.opens")}</p>
        <p class="note">{$dt("dash.reports.notes.issues")}</p>
      </Notice>
    </div>
  {:else if active === "clicks"}
    {#if report.total === 0}
      <EmptyState icon="arrow" title={$dt("dash.reports.clicks.emptyTitle")} body={$dt("dash.reports.clicks.emptyBody")} />
    {:else}
      <div class="two">
        <Card title={$dt("dash.reports.clicks.linksTitle")} subtitle={$dt("dash.reports.clicks.linksSubtitle", { total: formatNumber(report.total) })}>
          <TopList items={linkItems} pagerLabel={$dt("dash.reports.clicks.linksPager")} />
        </Card>
        <Card title={$dt("dash.reports.clicks.readersTitle")} subtitle={$dt("dash.reports.clicks.readersSubtitle")}>
          <TopList items={clickerItems} pagerLabel={$dt("dash.reports.clicks.readersPager")} />
        </Card>
      </div>
    {/if}
  {:else}
    <Card title={$dt("dash.reports.languages.title")} subtitle={$dt("dash.reports.languages.subtitle")}>
      {#if langItems.length === 0}
        <EmptyState compact icon="globe" title={$dt("dash.reports.languages.emptyTitle")} body={$dt("dash.reports.languages.emptyBody")}>
          <Button variant="secondary" onclick={() => goTo("subscribers", "add")}>{$dt("dash.subs.empty.add")}</Button>
        </EmptyState>
      {:else}
        <BarList items={langItems} showShare total={$metrics.subscribers} />
      {/if}
    </Card>
  {/if}
</Tabs>

<style lang="scss">
  .stack { display: flex; flex-direction: column; gap: var(--space-5); }
  .stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: var(--space-4); }
  .two { display: grid; grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr)); gap: var(--space-5); }
  .note { margin: 0; }
  .note + .note { margin-top: var(--space-2); }
  @media (max-width: 40rem) {
    .two { grid-template-columns: 1fr; }
  }
</style>
