<!-- WS4. Home: next issue, numbers, getting started, nudges with one-click fixes, activity. -->
<script lang="ts">
  import { onMount } from "svelte";
  import SectionHeader from "../ui/SectionHeader.svelte";
  import Card from "../ui/Card.svelte";
  import StatTile from "../ui/StatTile.svelte";
  import Notice from "../ui/Notice.svelte";
  import Button from "../ui/Button.svelte";
  import EmptyState from "../ui/EmptyState.svelte";
  import Skeleton from "../ui/Skeleton.svelte";
  import Icon from "../ui/Icon.svelte";
  import { GettingStartedChecklist, checklist } from "$lib/tutorial";
  import { CHECKLIST_TARGETS } from "../tour";
  import { confirmAction } from "../ui/confirm";
  import { metrics, nudges, languageName } from "../data/insights";
  import { automations, runAutomationNow, legacyFromConfig } from "../data/automations";
  import { loadActivity, activityIcon, type ActivityItem } from "../data/activity";
  import { formatDateTime, relativeTime } from "../data/schedule";
  import { goTo, type SectionId } from "../nav";
  import { dt, plural, formatNumber } from "../i18n";
  import store from "../../../components/store";

  let activity: ActivityItem[] = [];
  let activityState: "loading" | "ready" | "error" = "loading";
  let sending = false;
  let sendMsg: { tone: "success" | "danger"; text: string } | null = null;

  $: name = $store.given_name || $store.config?.senderName || "";
  $: autoOn = $automations.items.filter((a) => a.enabled).length;
  $: autoTotal = $automations.items.length || $metrics.sources.length;
  $: topNudges = $nudges.slice(0, 3);
  $: nextHost = host($metrics.nextSendSource?.url ?? "");
  $: maxLang = Math.max(1, ...$metrics.languages.map((l) => l.count));

  // Clicks in the 7 days before the last 7, read from the same leads the metrics use. Display only.
  const DAY = 86400000;
  $: clicksPrev7d = countClicksBetween($store.leads, 14 * DAY, 7 * DAY);
  $: clicksDelta = $metrics.clicks7d - clicksPrev7d;
  $: showClicksDelta = $metrics.ready && $metrics.clicksTotal > 0;

  function countClicksBetween(leads: unknown, fromAgo: number, toAgo: number): number {
    const now = Date.now();
    let n = 0;
    if (!leads || typeof leads !== "object") return 0;
    for (const byEmail of Object.values(leads as Record<string, Record<string, Record<string, string>>>)) {
      if (!byEmail || typeof byEmail !== "object") continue;
      for (const byTs of Object.values(byEmail)) {
        if (!byTs || typeof byTs !== "object") continue;
        for (const ts of Object.keys(byTs)) {
          const t = Date.parse(ts);
          if (!isNaN(t) && now - t <= fromAgo && now - t > toAgo) n++;
        }
      }
    }
    return n;
  }

  // One sentence that answers "am I OK, what next", built only from real data.
  $: narrative = $metrics.ready
    ? [
        $metrics.realSubscribers > 0 ? plural($dt, "dash.home.narrative.readers", $metrics.realSubscribers) : $dt("dash.home.narrative.noReaders"),
        $metrics.nextSend ? $dt("dash.home.narrative.next", { relative: relativeTime($metrics.nextSend) }) : $dt("dash.home.narrative.noNext"),
        topNudges.length ? plural($dt, "dash.home.narrative.attention", topNudges.length) : "",
      ].filter(Boolean).join(" ")
    : "";

  function host(url: string) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  }

  async function refreshActivity() {
    activityState = "loading";
    try {
      const res = await loadActivity(8);
      activity = res.items;
      activityState = "ready";
    } catch {
      activityState = "error";
    }
  }

  async function sendNow() {
    const ns = $metrics.nextSendSource;
    if (!ns) return;
    const ok = await confirmAction({
      title: $dt("dash.home.next.sendNow"),
      body: $dt("dash.home.next.sendConfirm", { source: host(ns.url) }),
      confirmLabel: $dt("dash.home.next.sendNow"),
      cancelLabel: $dt("dash.common.cancel"),
    });
    if (!ok) return;
    sending = true;
    sendMsg = null;
    try {
      const a = $automations.items.find((x) => x.newsSourceIds?.includes(ns.id)) ?? legacyFromConfig().find((x) => x.newsSourceIds?.includes(ns.id));
      if (!a) throw new Error($dt("dash.state.errorBody"));
      await runAutomationNow(a);
      sendMsg = { tone: "success", text: $dt("dash.home.next.sent") };
    } catch (e) {
      sendMsg = { tone: "danger", text: $dt("dash.automations.runFailed", { reason: e instanceof Error ? e.message : String(e) }) };
    } finally {
      sending = false;
    }
  }

  onMount(refreshActivity);
</script>

<SectionHeader title={name ? $dt("dash.home.greeting", { name }) : $dt("dash.home.greetingNoName")} description={$dt("dash.home.desc")}>
  <span data-tour="write-about-this"><Button variant="secondary" icon="send" onclick={() => goTo("subscribers", "send")}>{$dt("dash.home.writeAbout")}</Button></span>
</SectionHeader>

{#if narrative}
  <p class="narrative">{narrative}</p>
{/if}

<section class="kpis" aria-label={$dt("dash.home.stats.label")} aria-busy={!$metrics.ready}>
  <StatTile icon="people" label={$dt("dash.home.stats.subscribers")} value={formatNumber($metrics.subscribers)} hint={$dt("dash.home.stats.subscribersHint")} loading={!$metrics.ready} />
  <StatTile icon="globe" label={$dt("dash.home.stats.languages")} value={$metrics.languages.filter((l) => l.code !== "?").length} hint={$dt("dash.home.stats.languagesHint")} loading={!$metrics.ready} />
  <StatTile icon="arrow" label={$dt("dash.home.stats.clicks")} value={formatNumber($metrics.clicks7d)} hint={$dt("dash.home.stats.clicksHint", { count: formatNumber($metrics.clicks30d) })} loading={!$metrics.ready}>
    {#if showClicksDelta}
      <p class="delta" data-dir={clicksDelta > 0 ? "up" : clicksDelta < 0 ? "down" : "flat"}>
        <span class="delta__arrow" aria-hidden="true">{clicksDelta > 0 ? "\u2191" : clicksDelta < 0 ? "\u2193" : "\u2192"}</span>
        <span>{clicksDelta > 0
          ? $dt("dash.home.stats.deltaUp", { count: formatNumber(clicksDelta) })
          : clicksDelta < 0
            ? $dt("dash.home.stats.deltaDown", { count: formatNumber(-clicksDelta) })
            : $dt("dash.home.stats.deltaSame")}</span>
      </p>
    {/if}
  </StatTile>
  <StatTile icon="bolt" label={$dt("dash.home.stats.automations")} value={autoOn} hint={$dt("dash.home.stats.automationsHint", { count: autoTotal })} loading={$automations.status === "loading"} />
</section>

<div class="grid">
  <div class="col-main">
    <Card title={$dt("dash.home.next.title")} tone={$metrics.nextSend ? "default" : "warning"}>
      {#if !$metrics.ready}
        <div class="next-skel" aria-hidden="true"><span class="sk sk--title"></span><span class="sk sk--line"></span><span class="sk sk--pill"></span></div>
      {:else if $metrics.nextSend}
        <p class="next__when"><Icon name="clock" size={22} /> {formatDateTime($metrics.nextSend, { weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit" })}</p>
        <p class="next__rel">{$dt("dash.home.next.relative", { relative: relativeTime($metrics.nextSend), source: nextHost })}</p>
        <div class="row">
          <Button variant="primary" icon="send" loading={sending} onclick={sendNow}>{$dt("dash.home.next.sendNow")}</Button>
          <Button variant="tertiary" onclick={() => goTo("automations")}>{$dt("dash.home.next.editSchedule")}</Button>
        </div>
        {#if sendMsg}<div class="mt"><Notice tone={sendMsg.tone}>{sendMsg.text}</Notice></div>{/if}
      {:else}
        <p class="next__none">{$dt("dash.home.next.none")}</p>
        <p class="muted">{$dt("dash.home.next.noneBody")}</p>
        <div class="row"><Button variant="primary" onclick={() => goTo("automations")}>{$dt("dash.home.next.noneAction")}</Button></div>
      {/if}
    </Card>

    <Card title={$dt("dash.home.activity.title")}>
      {#if activityState === "loading"}
        <ul class="feed feed--skeleton" aria-hidden="true">
          {#each [0, 1, 2, 3] as i (i)}
            <li><span class="sk sk--dot"></span><span class="sk sk--line" style="width: {78 - i * 9}%"></span><span class="sk sk--time"></span></li>
          {/each}
        </ul>
        <span class="sr-only" role="status">{$dt("dash.state.loading")}</span>
      {:else if activityState === "error"}
        <Notice tone="danger">{$dt("dash.state.errorBody")}</Notice>
        <div class="row"><Button variant="secondary" size="sm" icon="refresh" onclick={refreshActivity}>{$dt("dash.state.retry")}</Button></div>
      {:else if activity.length === 0}
        <EmptyState compact icon="clock" title={$dt("dash.common.notYet")} body={$dt("dash.home.activity.empty")} />
      {:else}
        <ul class="feed">
          {#each activity as item (item.id)}
            <li>
              <span class="feed__icon" aria-hidden="true"><Icon name={activityIcon(item)} size={16} /></span>
              <p class="feed__text">{item.text ?? $dt(item.textKey, item.vars)}</p>
              <time class="feed__time" datetime={item.at} title={formatDateTime(item.at, { dateStyle: "medium", timeStyle: "short" })}>{relativeTime(item.at)}</time>
            </li>
          {/each}
        </ul>
      {/if}
    </Card>
  </div>

  <div class="col-side">
    {#if topNudges.length}
      <section class="nudges" aria-labelledby="nudges-h">
        <h2 id="nudges-h" class="h2">{$dt("dash.home.nudges.title")} <span class="count">{topNudges.length}</span></h2>
        {#each topNudges as n (n.id)}
          <Notice tone={n.tone} title={$dt(n.titleKey, n.vars)}>
            <p>{$dt(n.bodyKey, n.vars)}</p>
            <svelte:fragment slot="actions">
              <Button size="sm" variant={n.tone === "info" ? "secondary" : "primary"} onclick={() => goTo(n.action.section as SectionId, n.action.tab)}>{$dt(n.actionKey)}</Button>
            </svelte:fragment>
          </Notice>
        {/each}
      </section>
    {/if}

    {#if !$checklist.complete}
      <div data-tour="checklist">
        <GettingStartedChecklist onOpen={(item) => { const t = CHECKLIST_TARGETS[item.id]; if (t) goTo(t.section, t.tab); }} />
      </div>
    {/if}

    <Card title={$dt("dash.home.languages.title")}>
      {#if !$metrics.ready}
        <div class="langs-skel" aria-hidden="true">{#each [0, 1, 2] as i (i)}<span class="sk sk--line" style="width: {90 - i * 20}%"></span>{/each}</div>
      {:else if $metrics.languages.length === 0}
        <p class="muted">{$dt("dash.home.languages.empty")}</p>
        <div class="row"><Button variant="secondary" size="sm" icon="plus" onclick={() => goTo("subscribers", "add")}>{$dt("dash.home.languages.emptyAction")}</Button></div>
      {:else}
        <ul class="langs">
          {#each $metrics.languages.slice(0, 6) as l (l.code)}
            <li>
              <span class="langs__name">{l.code === "?" ? $dt("dash.common.unknown") : languageName(l.code)}</span>
              <span class="langs__bar" aria-hidden="true"><span style="width: {(l.count / maxLang) * 100}%"></span></span>
              <span class="langs__n">{formatNumber(l.count)}</span>
            </li>
          {/each}
        </ul>
      {/if}
    </Card>
  </div>
</div>

<style lang="scss">
  /* "Am I OK, what next": sentence, numbers, then the main list next to the actions. */
  .narrative {
    max-width: var(--measure);
    margin: calc(var(--space-2) * -1) 0 var(--space-6);
    font-family: var(--font-display);
    font-size: var(--fs-xl);
    line-height: var(--lh-snug);
    letter-spacing: var(--tracking-tight);
    color: var(--text-1);
    text-wrap: pretty;
  }
  .kpis {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: var(--space-3);
    margin-bottom: var(--space-5);
  }
  @container dash (min-width: 760px) {
    .kpis { grid-template-columns: repeat(4, minmax(0, 1fr)); }
  }
  @container dash (max-width: 299px) {
    .kpis { grid-template-columns: minmax(0, 1fr); }
  }
  .delta {
    display: flex;
    align-items: baseline;
    gap: var(--space-1);
    margin: var(--space-1) 0 0;
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    color: var(--text-2);
    font-variant-numeric: tabular-nums;
  }
  .delta__arrow { font-weight: var(--fw-semibold); }
  .delta[data-dir="up"] .delta__arrow { color: var(--success); }
  .delta[data-dir="down"] .delta__arrow { color: var(--danger); }

  .grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: var(--space-5); align-items: start; }
  @container dash (min-width: 900px) {
    .grid { grid-template-columns: minmax(0, 2fr) minmax(0, 1fr); }
  }
  .col-main, .col-side { display: flex; flex-direction: column; gap: var(--space-5); min-width: 0; }

  .next__when {
    display: flex; align-items: center; gap: var(--space-2); margin: 0;
    font-family: var(--font-display); font-size: var(--fs-2xl); line-height: var(--lh-tight); letter-spacing: var(--tracking-tight);
    color: var(--text-1); font-weight: var(--fw-semibold); font-variant-numeric: tabular-nums;
    :global(.dash-icon) { flex-shrink: 0; color: var(--text-3); }
  }
  .next__rel { margin: var(--space-2) 0 0; color: var(--text-2); font-size: var(--fs-sm); }
  .next__none { margin: 0; font-size: var(--fs-lg); font-weight: var(--fw-semibold); color: var(--text-1); }
  .muted { margin: var(--space-1) 0 0; color: var(--text-2); font-size: var(--fs-sm); line-height: var(--lh-normal); max-width: var(--measure); }
  .row { display: flex; gap: var(--space-2); flex-wrap: wrap; margin-top: var(--space-4); align-items: center; }
  .mt { margin-top: var(--space-3); }
  .h2 { display: flex; align-items: center; gap: var(--space-2); margin: 0 0 var(--space-1); font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); }
  .count {
    display: inline-grid; place-items: center; min-width: 1.5rem; height: 1.5rem; padding: 0 var(--space-2);
    border-radius: var(--radius-full); border: 1px solid var(--border-1); background: var(--surface-2);
    font-size: var(--fs-xs); font-weight: var(--fw-semibold); color: var(--text-1); font-variant-numeric: tabular-nums;
  }
  .nudges { display: flex; flex-direction: column; gap: var(--space-3); }

  .feed { list-style: none; margin: 0; padding: 0; }
  .feed li { display: flex; align-items: flex-start; gap: var(--space-3); padding: var(--space-3) 0; border-top: 1px solid var(--border-1); &:first-child { border-top: 0; padding-top: 0; } }
  .feed__icon { display: grid; place-items: center; width: 1.75rem; height: 1.75rem; border-radius: var(--radius-full); background: var(--surface-2); color: var(--text-2); flex-shrink: 0; }
  .feed__text { flex: 1; margin: 0; font-size: var(--fs-sm); color: var(--text-1); line-height: var(--lh-normal); overflow-wrap: anywhere; }
  .feed__time { font-size: var(--fs-xs); color: var(--text-3); white-space: nowrap; font-variant-numeric: tabular-nums; padding-top: 2px; }
  .feed--skeleton li { align-items: center; }

  .langs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-3); }
  .langs li { display: grid; grid-template-columns: minmax(5rem, 1fr) 2fr minmax(2.5rem, auto); gap: var(--space-3); align-items: center; font-size: var(--fs-sm); }
  .langs__name { color: var(--text-1); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
  .langs__bar { height: 6px; border-radius: var(--radius-full); background: var(--surface-2); overflow: hidden;
    span { display: block; height: 100%; background: var(--text-2); border-radius: inherit; } }
  .langs__n { color: var(--text-1); font-weight: var(--fw-medium); text-align: right; font-variant-numeric: tabular-nums; }

  /* Skeletons shaped like the content they stand in for. */
  .sk { display: block; border-radius: var(--radius-sm); background: var(--surface-2); animation: home-pulse 1.4s var(--ease-in-out) infinite; }
  .sk--title { height: 1.75rem; width: 70%; }
  .sk--line { height: 0.875rem; flex: 1; max-width: 100%; }
  .sk--pill { height: var(--control-h); width: 8rem; border-radius: var(--radius-full); }
  .sk--dot { width: 1.75rem; height: 1.75rem; border-radius: var(--radius-full); flex-shrink: 0; }
  .sk--time { width: 3rem; height: 0.75rem; }
  .next-skel { display: flex; flex-direction: column; gap: var(--space-3); }
  .langs-skel { display: flex; flex-direction: column; gap: var(--space-3); .sk--line { flex: none; } }
  @keyframes home-pulse { 50% { opacity: 0.55; } }
  @media (prefers-reduced-motion: reduce) { .sk { animation: none; } }
</style>
