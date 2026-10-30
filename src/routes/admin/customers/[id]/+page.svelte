<script lang="ts">
  /** One customer: usage against plan, plan and notes, newsletters with their switches, and change history. */
  import { page } from "$app/stores";
  import { Badge, Button, Card, EmptyState, Progress, Select, Skeleton, StatTile, Switch, Textarea, toast } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import ConfirmDialog from "$lib/admin/ConfirmDialog.svelte";
  import { upsertTenant } from "$lib/admin/state";
  import { describeAudit, fmtDate, fromNow, hostOf, limitText, num, plural } from "$lib/admin/format";
  import {
    getTenant,
    listAudit,
    PLAN_OPTIONS,
    updateTenant,
    updateTenantSource,
    type AdminAuditEntry,
    type AdminTenantDetail,
    type PlanId,
  } from "$lib/api/admin";
  import { toUserMessage } from "$lib/api/errors";
  import { features } from "$lib/config/features";

  const id = $derived(decodeURIComponent($page.params.id ?? ""));

  let detail = $state<AdminTenantDetail | null>(null);
  let loadError = $state("");
  let audit = $state<AdminAuditEntry[]>([]);
  let draftPlan = $state("");
  let draftNote = $state("");
  let saving = $state(false);
  let confirmPlanOpen = $state(false);
  let pause: { nsId: string; name: string } | null = $state(null);
  let pauseOpen = $state(false);
  let pausing = $state(false);
  // Remounts the Active switches when a pause is cancelled, so they show "on" again.
  let switchRev = $state(0);
  $effect(() => {
    if (!pauseOpen && pause) {
      pause = null;
      switchRev++;
    }
  });

  const dirty = $derived(!!detail && (draftPlan !== detail.plan.id || (draftNote ?? "") !== (detail.adminNote ?? "")));
  const planLabel = (p: string) => PLAN_OPTIONS.find((o) => o.value === p)?.label ?? p;

  async function load(target: string) {
    detail = null;
    loadError = "";
    try {
      const [d, a] = await Promise.all([getTenant(target), listAudit({ tenantId: target, limit: 20 }).catch(() => ({ items: [] as AdminAuditEntry[] }))]);
      if (target !== id) return;
      detail = d;
      audit = a.items;
      draftPlan = d.plan.id;
      draftNote = d.adminNote ?? "";
    } catch (e) {
      loadError = toUserMessage(e);
    }
  }

  $effect(() => {
    if (id) load(id);
  });

  async function refreshAudit() {
    audit = (await listAudit({ tenantId: id, limit: 20 }).catch(() => ({ items: audit }))).items;
  }

  function requestSave() {
    if (!detail) return;
    if (draftPlan !== detail.plan.id) confirmPlanOpen = true;
    else save();
  }

  async function save() {
    if (!detail) return;
    const patch: { pricingPlan?: PlanId; adminNote?: string } = {};
    if (draftPlan !== detail.plan.id) patch.pricingPlan = draftPlan as PlanId;
    if ((draftNote ?? "") !== (detail.adminNote ?? "")) patch.adminNote = draftNote;
    if (!Object.keys(patch).length) return;
    saving = true;
    try {
      const updated = await updateTenant(detail.id, patch);
      upsertTenant(updated);
      detail = await getTenant(detail.id);
      draftPlan = detail.plan.id;
      draftNote = detail.adminNote ?? "";
      toast.success(patch.pricingPlan ? `Plan changed to ${planLabel(patch.pricingPlan)}.` : "Notes saved.");
      refreshAudit();
    } catch (e) {
      toast.error(toUserMessage(e));
    } finally {
      saving = false;
      confirmPlanOpen = false;
    }
  }

  async function setVip(next: boolean) {
    if (!detail) return;
    const before = detail.vip;
    detail = { ...detail, vip: next };
    try {
      upsertTenant(await updateTenant(detail.id, { vip: next }));
      refreshAudit();
    } catch (e) {
      if (detail) detail = { ...detail, vip: before };
      toast.error(toUserMessage(e));
    }
  }

  type Flag = "isPaidNewsletter" | "active" | "isPublic";
  async function setFlag(nsId: string, field: Flag, next: boolean) {
    if (!detail) return;
    const apply = (v: boolean) => {
      if (detail) detail = { ...detail, newsSources: detail.newsSources.map((s) => (s.id === nsId ? { ...s, [field]: v } : s)) };
    };
    apply(next);
    try {
      upsertTenant(await updateTenantSource(detail.id, nsId, { [field]: next }));
      refreshAudit();
      return true;
    } catch (e) {
      apply(!next);
      switchRev++;
      toast.error(toUserMessage(e));
      return false;
    }
  }

  function onActiveChange(nsId: string, name: string, next: boolean) {
    if (next) return setFlag(nsId, "active", true);
    // Pausing stops sends for this customer: confirm first.
    pause = { nsId, name };
    pauseOpen = true;
  }

  async function confirmPause() {
    if (!pause) return;
    const target = pause;
    pausing = true;
    const ok = await setFlag(target.nsId, "active", false);
    pausing = false;
    pause = null;
    pauseOpen = false;
    if (ok) toast.success(`${target.name} is paused. Scheduled issues stop until you turn it back on.`);
  }

  const sourceName = (tenantId: string, nsId: string) => {
    const ns = detail?.newsSources.find((s) => s.id === nsId);
    return ns ? ns.newsletterTitle || hostOf(ns.url) : undefined;
  };

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(id);
      toast.success("Email copied.");
    } catch {
      toast.error("Your browser blocked copying. Select the email and copy it by hand.");
    }
  }

  const pct = (used: number, limit: number | null) => (limit === null || limit <= 0 ? 0 : Math.min(100, Math.round((used / limit) * 100)));
  const tone = (p: number) => (p >= 100 ? "danger" : p >= 80 ? "warning" : "accent");
</script>

<svelte:head><title>{id} · AIBAN admin</title></svelte:head>

<nav class="crumbs" aria-label="Breadcrumb"><a href="/admin/customers">Customers</a> <span aria-hidden="true">/</span> <span>{id}</span></nav>

{#if loadError}
  <EmptyState title="We could not load this customer" description={loadError}>
    {#snippet actions()}
      <Button onclick={() => load(id)}>Try again</Button>
      <Button variant="secondary" href="/admin/customers">Back to customers</Button>
    {/snippet}
  </EmptyState>
{:else if !detail}
  <div aria-busy="true" class="stack">
    <Skeleton width="20rem" height="2rem" />
    <Skeleton height="104px" />
    <Skeleton lines={8} />
  </div>
{:else}
  <PageHeader title={detail.id} description={detail.newsletterTitle || detail.senderName || "No newsletter title yet"}>
    {#snippet actions()}
      <Button variant="secondary" size="sm" onclick={copyEmail}>Copy email</Button>
      <Button variant="secondary" size="sm" href={`mailto:${detail?.id}`}>Write to them</Button>
    {/snippet}
  </PageHeader>

  <div class="badges">
    <Badge tone={detail.plan.id === "free" ? "neutral" : "accent"}>{detail.plan.name}</Badge>
    {#if detail.vip}<Badge tone="info">VIP</Badge>{/if}
    <Badge tone="neutral">{detail.hasOwnSender ? "Sends from their own address" : "Sends from the AIBAN address"}</Badge>
    <span class="muted">Joined {fmtDate(detail.createdAt)}. Last change {fmtDate(detail.updatedAt)}.</span>
  </div>

  <section class="stats" aria-label="Usage">
    <StatTile label="Subscribers" value={num(detail.totalSubscribers)} hint={`Plan limit: ${limitText(detail.limits.subscribers)}`} />
    <StatTile label="Newsletters" value={num(detail.sourceCount)} hint={`${detail.activeSourceCount} active. Plan limit: ${limitText(detail.limits.newsSources)}`} />
    <StatTile label="Emails this month" value={num(detail.thisMonth.emailsSent)} hint={plural(detail.thisMonth.aiRuns, "AI run", "AI runs")} />
  </section>

  {#if detail.limits.subscribers !== null || detail.limits.newsSources !== null}
    <Card title="Plan usage" headingLevel={2}>
      <div class="meters">
        {#if detail.limits.subscribers !== null}
          {@const p = pct(detail.totalSubscribers, detail.limits.subscribers)}
          <Progress label="Subscribers" value={p} tone={tone(p)} showValue valueText={`${num(detail.totalSubscribers)} of ${num(detail.limits.subscribers)}`} />
        {/if}
        {#if detail.limits.newsSources !== null}
          {@const p = pct(detail.sourceCount, detail.limits.newsSources)}
          <Progress label="Newsletters" value={p} tone={tone(p)} showValue valueText={`${num(detail.sourceCount)} of ${num(detail.limits.newsSources)}`} />
        {/if}
      </div>
    </Card>
  {/if}

  <div class="grid">
    <Card title="Plan and notes" headingLevel={2}>
      <div class="form">
        <Select label="Plan" options={PLAN_OPTIONS} bind:value={draftPlan} hint={features.payments ? "Changes the limits right away." : "Changes the limits right away. Nobody is charged while payments are off."} />
        <Switch label="VIP" description="A customer you look after personally." toggled={detail.vip} onChange={(v: boolean) => setVip(v)} />
        <Textarea label="Notes for the team" bind:value={draftNote} rows={4} hint="Optional. Only admins see this." />
        <div class="form__actions">
          {#if dirty}<Button variant="tertiary" onclick={() => { draftPlan = detail?.plan.id ?? ""; draftNote = detail?.adminNote ?? ""; }}>Discard changes</Button>{/if}
          <Button disabled={!dirty} loading={saving} loadingLabel="Saving" onclick={requestSave}>Save changes</Button>
        </div>
      </div>
    </Card>

    <Card title="Change history" headingLevel={2} description="Changes made by admins to this customer.">
      {#if audit.length === 0}
        <p class="muted">No admin changes yet.</p>
      {:else}
        <ol class="timeline">
          {#each audit as e (e.id)}
            <li>
              <span>{describeAudit(e, sourceName)}</span>
              <span class="muted">{e.actor}, {fromNow(e.at)}</span>
            </li>
          {/each}
        </ol>
      {/if}
    </Card>
  </div>

  <section class="sources" aria-labelledby="ns-h">
    <h2 id="ns-h">Newsletters</h2>
    {#if detail.newsSources.length === 0}
      <EmptyState compact title="No newsletter yet" description="This customer signed up but has not added a source. You could write to them and offer help." />
    {:else}
      <div class="source-grid">
        {#each detail.newsSources as ns (ns.id)}
          {@const name = ns.newsletterTitle || hostOf(ns.url) || ns.id}
          {@const subs = detail.subscribersBySource[ns.id]}
          <Card>
            <div class="source">
              <div class="source__head">
                <h3>{name}</h3>
                <span class="badges">
                  <Badge tone={ns.active ? "success" : "warning"} dot>{ns.active ? "Active" : "Paused"}</Badge>
                  {#if ns.isPaidNewsletter}<Badge tone="accent">Paid</Badge>{/if}
                  {#if !ns.isPublic}<Badge tone="neutral">Private</Badge>{/if}
                </span>
              </div>
              {#if ns.url}<a class="source__url" href={ns.url} target="_blank" rel="noopener noreferrer">{ns.url}</a>{/if}
              <p class="muted">
                {subs === null || subs === undefined ? "Subscriber count unavailable" : plural(subs, "subscriber", "subscribers")}
                {#if ns.scheduleTime}· Schedule <code>{ns.scheduleTime}</code> (UTC){/if}
              </p>
              <div class="switches">
                <Switch
                  label="Paid newsletter"
                  description={features.payments ? "Readers pay to subscribe." : "Saved for when payments are back. Nobody is charged now."}
                  toggled={ns.isPaidNewsletter}
                  onChange={(v: boolean) => setFlag(ns.id, "isPaidNewsletter", v)}
                />
                {#key switchRev}
                  <Switch label="Active" description="When off, scheduled issues stop." toggled={ns.active} onChange={(v: boolean) => onActiveChange(ns.id, name, v)} />
                {/key}
                <Switch label="Public" description="Shown on the signup page and the blog." toggled={ns.isPublic} onChange={(v: boolean) => setFlag(ns.id, "isPublic", v)} />
              </div>
              <div class="source__links">
                <Button variant="tertiary" size="sm" href={`/blog/${encodeURIComponent(detail.id)}?ns=${encodeURIComponent(ns.id)}`} target="_blank">Open their blog</Button>
                <Button variant="tertiary" size="sm" href={`/subscribe?configuratorId=${encodeURIComponent(detail.id)}&newsSourceId=${encodeURIComponent(ns.id)}`} target="_blank">Open signup page</Button>
              </div>
            </div>
          </Card>
        {/each}
      </div>
    {/if}
  </section>

  <ConfirmDialog
    bind:open={confirmPlanOpen}
    title="Change the plan?"
    description={`${detail.id} moves from ${detail.plan.name} to ${planLabel(draftPlan)}. Their limits change right away.`}
    confirmLabel="Change plan"
    busy={saving}
    onconfirm={save}
  />
  <ConfirmDialog
    bind:open={pauseOpen}
    title="Pause this newsletter?"
    description={pause ? `${pause.name} stops sending scheduled issues until someone turns it back on. Subscribers are kept.` : ""}
    confirmLabel="Pause newsletter"
    danger
    busy={pausing}
    onconfirm={confirmPause}
  />
{/if}

<style>
  .crumbs {
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, inherit);
    margin-bottom: var(--space-3, 12px);
    overflow-wrap: anywhere;
  }
  .crumbs a {
    color: var(--text-link, inherit);
  }
  .stack {
    display: grid;
    gap: var(--space-4, 16px);
  }
  .badges {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-2, 8px);
  }
  .badges:first-of-type {
    margin: calc(var(--space-3, 12px) * -1) 0 var(--space-5, 24px);
  }
  .muted {
    color: var(--text-3, inherit);
    font-size: var(--fs-sm, 0.875rem);
    margin: 0;
  }
  .stats {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-bottom: var(--space-4, 16px);
  }
  .meters {
    display: grid;
    gap: var(--space-4, 16px);
  }
  .grid {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 380px), 1fr));
    margin-block: var(--space-4, 16px);
  }
  .form {
    display: grid;
    gap: var(--space-4, 16px);
  }
  .form__actions {
    display: flex;
    justify-content: flex-end;
    gap: var(--space-2, 8px);
  }
  .timeline {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-3, 12px);
    font-size: var(--fs-sm, 0.875rem);
  }
  .timeline li {
    display: grid;
    gap: 2px;
    padding-left: var(--space-4, 16px);
    border-left: 2px solid var(--border-2, currentColor);
  }
  .sources h2 {
    font-size: var(--fs-xl, 1.25rem);
    margin: var(--space-6, 24px) 0 var(--space-4, 16px);
  }
  .source-grid {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fill, minmax(min(100%, 340px), 1fr));
  }
  .source {
    display: grid;
    gap: var(--space-3, 12px);
    min-width: 0;
  }
  .source__head {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: var(--space-2, 8px);
  }
  .source__head h3 {
    margin: 0;
    font-size: var(--fs-md, 1rem);
    overflow-wrap: anywhere;
  }
  .source__url {
    color: var(--text-link, inherit);
    font-size: var(--fs-sm, 0.875rem);
    overflow-wrap: anywhere;
  }
  .switches {
    display: grid;
    gap: var(--space-2, 8px);
    padding-top: var(--space-2, 8px);
    border-top: 1px solid var(--border-1, currentColor);
  }
  .source__links {
    display: flex;
    flex-wrap: wrap;
    gap: var(--space-2, 8px);
  }
  code {
    font-family: var(--font-mono, monospace);
    font-size: var(--fs-xs, 0.75rem);
  }
</style>
