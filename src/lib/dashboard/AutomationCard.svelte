<!-- WS4. One automation as a sentence: "When X, AIBAN does Y", with a switch,
     last and next run, Run now, schedule editor and recent runs. -->
<script lang="ts">
  import Card from "./ui/Card.svelte";
  import Icon from "./ui/Icon.svelte";
  import Button from "./ui/Button.svelte";
  import ToggleSwitch from "./ui/ToggleSwitch.svelte";
  import StatusPill from "./ui/StatusPill.svelte";
  import Skeleton from "./ui/Skeleton.svelte";
  import ScheduleEditor from "./ScheduleEditor.svelte";
  import { confirmAction } from "./ui/confirm";
  import { toast } from "$lib/ui/components/toast";
  import { setAutomationEnabled, runAutomationNow, loadRuns, saveLegacySchedule, canRunNow, RECIPES, type Automation, type RunRecord } from "./data/automations";
  import { formatDateTime, relativeTime, nextRun, parseCron } from "./data/schedule";
  import { dt as dtx } from "./i18n";

  export let automation: Automation;
  export let sourceUrl: string = "";

  let busy = false;
  let running = false;
  let editing = false;
  let savingSchedule = false;
  let showRuns = false;
  let runsState: "idle" | "loading" | "ready" = "idle";
  let runs: RunRecord[] = [];

  $: recipe = RECIPES.find((r) => r.id === automation.recipeId);
  $: icon = recipe?.icon ?? "bolt";
  $: host = hostOf(sourceUrl || automation.name);
  $: cron = (automation.trigger?.params?.cron as string) || "";
  $: tz = (automation.trigger?.params?.tz as string) || "UTC";
  $: next = automation.nextRunAt ? new Date(automation.nextRunAt) : automation.enabled ? nextRun(cron, new Date(), tz) : null;
  $: whenText = automation.recipeId === "daily_issue" || !automation.recipeId ? scheduleText(cron, tz) : $dtx(`dash.recipe.${automation.recipeId}.when`);
  // One full-sentence key per recipe, so translators get the whole sentence (WS9).
  $: sentence = $dtx(`dash.recipe.${automation.recipeId ?? "daily_issue"}.sentence`, { schedule: whenText, source: host });
  // Recipe automations (built in or stored from a recipe) use the translated recipe name, not the engine summary.
  $: title = automation.source === "legacy"
    ? `${$dtx("dash.recipe.daily_issue.name")}: ${host}`
    : automation.source === "recipe" && automation.recipeId && automation.recipeId !== "daily_issue"
      ? $dtx(`dash.recipe.${automation.recipeId}.name`)
      : automation.name;
  $: runnable = canRunNow(automation);

  function hostOf(url: string) {
    try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
  }
  // Schedule in words, in the owner's time zone (the cron is stored in UTC).
  function scheduleText(c: string, zone: string) {
    const p = parseCron(c);
    const n = nextRun(c, new Date(), zone);
    if (!p || !n) return c ? $dtx("dash.common.unknown") : $dtx("dash.common.unknown");
    const time = formatDateTime(n, { hour: "2-digit", minute: "2-digit" });
    if (!p.domStar) return $dtx("dash.automations.sched.monthly", { day: n.getDate(), time });
    if (p.dowStar) return $dtx("dash.automations.sched.daily", { time });
    if (p.dow.size === 1) return $dtx("dash.automations.sched.weekly", { day: formatDateTime(n, { weekday: "long" }), time });
    if (p.dow.size === 5) return $dtx("dash.automations.sched.weekdays", { time });
    return $dtx("dash.automations.sched.custom", { next: formatDateTime(n, { weekday: "long", hour: "2-digit", minute: "2-digit" }) });
  }

  async function toggle(v: boolean) {
    busy = true;
    try {
      await setAutomationEnabled(automation, v);
      const n = v ? nextRun(cron, new Date(), tz) : null;
      toast.success(v ? (n ? $dtx("dash.automations.turnedOn", { when: relativeTime(n) }) : $dtx("dash.automations.turnedOnNoTime")) : (automation.newsSourceIds?.length ? $dtx("dash.automations.turnedOff", { source: host }) : $dtx("dash.automations.turnedOffPlain")));
    } catch {
      toast.error($dtx("dash.automations.toggleFailed"));
    } finally {
      busy = false;
    }
  }

  async function runNow() {
    const ok = await confirmAction({
      title: $dtx("dash.automations.runNow"),
      body: $dtx("dash.automations.runConfirm", { source: host }),
      confirmLabel: $dtx("dash.automations.runNow"),
      cancelLabel: $dtx("dash.common.cancel"),
    });
    if (!ok) return;
    running = true;
    try {
      await runAutomationNow(automation);
      toast.success($dtx("dash.automations.runStarted"));
    } catch (e) {
      toast.error($dtx("dash.automations.runFailed", { reason: e instanceof Error ? e.message : String(e) }));
    } finally {
      running = false;
    }
  }

  async function saveSchedule(newCron: string, newTz: string) {
    const nsId = automation.newsSourceIds?.[0];
    if (!nsId) return;
    savingSchedule = true;
    try {
      await saveLegacySchedule(nsId, newCron, newTz);
      const n = nextRun(newCron, new Date(), newTz);
      toast.success(n ? $dtx("dash.automations.scheduleSaved", { when: formatDateTime(n) }) : $dtx("dash.automations.scheduleSavedNoTime"));
      editing = false;
    } catch {
      toast.error($dtx("dash.state.saveFailed"));
    } finally {
      savingSchedule = false;
    }
  }

  async function toggleRuns() {
    showRuns = !showRuns;
    if (showRuns && runsState === "idle") {
      runsState = "loading";
      try { runs = (await loadRuns(automation, 10)).runs; } catch { runs = []; }
      runsState = "ready";
    }
  }
</script>

<Card as="article">
  <div class="ac">
    <span class="ac__icon" class:off={!automation.enabled} aria-hidden="true"><Icon name={icon} size={22} /></span>
    <div class="ac__body">
      <div class="ac__top">
        <h3 class="ac__title">{title}</h3>
        <ToggleSwitch checked={automation.enabled} label={automation.enabled ? $dtx("dash.common.on") : $dtx("dash.common.off")} {busy} onchange={toggle} />
      </div>
      <p class="ac__sentence">{sentence}</p>
      <dl class="ac__meta">
        <div>
          <dt>{$dtx("dash.automations.lastRun")}</dt>
          <dd>
            {#if automation.lastRunAt}
              <StatusPill status={automation.lastRunStatus ?? "none"} label={$dtx(`dash.automations.status.${automation.lastRunStatus ?? "ok"}`)} />
              <time datetime={automation.lastRunAt} title={formatDateTime(automation.lastRunAt, { dateStyle: "medium", timeStyle: "short" })}>{relativeTime(automation.lastRunAt)}</time>
            {:else}{$dtx("dash.common.notYet")}{/if}
          </dd>
        </div>
        <div>
          <dt>{$dtx("dash.automations.nextRun")}</dt>
          <dd>
            {#if !automation.enabled}<StatusPill status="off" label={$dtx("dash.automations.status.off")} />
            {:else if next}<time datetime={next.toISOString()} title={formatDateTime(next, { dateStyle: "medium", timeStyle: "short" })}>{relativeTime(next)}</time>
            {:else}{$dtx("dash.common.unknown")}{/if}
          </dd>
        </div>
        {#if automation.stats}
          <div><dt>{$dtx("dash.automations.runsCount")}</dt><dd>{automation.stats.runs}</dd></div>
        {/if}
      </dl>
      <div class="ac__actions">
        {#if runnable}
          <Button size="sm" variant="secondary" icon="play" loading={running} onclick={runNow}>{$dtx("dash.automations.runNow")}</Button>
        {/if}
        {#if automation.trigger?.type === "schedule" && automation.newsSourceIds?.length}
          <Button size="sm" variant="tertiary" icon="clock" onclick={() => (editing = !editing)}>{$dtx("dash.automations.schedule")}</Button>
        {/if}
        <Button size="sm" variant="tertiary" onclick={toggleRuns}>{$dtx("dash.automations.history")}</Button>
      </div>
      {#if editing}
        <div class="ac__panel">
          <ScheduleEditor {cron} timezone={(automation.trigger?.params?.tz as string) || null} saving={savingSchedule} onsave={saveSchedule} oncancel={() => (editing = false)} />
        </div>
      {/if}
      {#if showRuns}
        <div class="ac__panel" aria-live="polite">
          {#if runsState === "loading"}
            <Skeleton lines={3} />
          {:else if runs.length === 0}
            <p class="muted">{$dtx("dash.automations.historyEmpty")}</p>
          {:else}
            <ul class="runs">
              {#each runs as r (r.id)}
                <li>
                  <StatusPill status={r.status} label={$dtx(`dash.automations.status.${r.status}`)} />
                  <span class="runs__what">{r.items?.[0]?.title ?? (r.skipReason ? $dtx(`dash.automations.skip.${r.skipReason}`) : r.status === "failed" ? $dtx("dash.automations.skip.failed") : "")}</span>
                  {#if r.counts}<span class="runs__n">{$dtx("dash.automations.sentTo", { count: r.counts.sent })}</span>{/if}
                  <time datetime={r.startedAt}>{relativeTime(r.startedAt)}</time>
                </li>
              {/each}
            </ul>
          {/if}
        </div>
      {/if}
    </div>
  </div>
</Card>

<style lang="scss">
  .ac { display: flex; gap: var(--space-4); align-items: flex-start; }
  .ac__icon { display: grid; place-items: center; width: 44px; height: 44px; border-radius: var(--radius-md); background: var(--accent-soft); color: var(--accent); flex-shrink: 0;
    &.off { background: var(--surface-2); color: var(--text-3); } }
  .ac__body { flex: 1; min-width: 0; display: flex; flex-direction: column; gap: var(--space-3); }
  .ac__top { display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap; }
  .ac__title { margin: 0; font-size: var(--fs-md); font-weight: var(--fw-semibold); color: var(--text-1); overflow-wrap: anywhere; }
  .ac__sentence { margin: 0; color: var(--text-2); font-size: var(--fs-sm); line-height: var(--lh-normal); max-width: 70ch; }
  .ac__meta { display: flex; gap: var(--space-5); flex-wrap: wrap; margin: 0;
    div { display: flex; flex-direction: column; gap: var(--space-1); }
    dt { font-size: var(--fs-xs); color: var(--text-3); font-weight: var(--fw-medium); }
    dd { margin: 0; display: flex; gap: var(--space-2); align-items: center; font-size: var(--fs-sm); color: var(--text-1); } }
  .ac__actions { display: flex; gap: var(--space-2); flex-wrap: wrap; align-items: center; }
  .ac__panel { border-top: 1px solid var(--border-1); padding-top: var(--space-4); }
  .muted { margin: 0; color: var(--text-2); font-size: var(--fs-sm); }
  .runs { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: var(--space-2);
    li { display: flex; gap: var(--space-3); align-items: center; font-size: var(--fs-sm); flex-wrap: wrap; }
    time { color: var(--text-3); font-size: var(--fs-xs); margin-left: auto; } }
  .runs__what { color: var(--text-1); min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; flex: 1 1 160px; }
  .runs__n { color: var(--text-2); }
  @media (max-width: 480px) { .ac { flex-direction: column; } }
</style>
