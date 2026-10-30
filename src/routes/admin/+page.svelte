<script lang="ts">
  /** Admin overview: totals, plans, newest customers, recent admin changes, things to look at. */
  import { onMount } from "svelte";
  import { Badge, Button, Card, EmptyState, Skeleton, StatTile } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import PlanBars from "$lib/admin/PlanBars.svelte";
  import { overview, tenants, tenantsError, tenantsLoading, refreshAll } from "$lib/admin/state";
  import { describeAudit, fromNow, num, plural } from "$lib/admin/format";
  import { listAudit, type AdminAuditEntry } from "$lib/api/admin";
  import { features } from "$lib/config/features";

  let audit = $state<AdminAuditEntry[]>([]);
  let auditLoading = $state(true);

  const newest = $derived(
    [...$tenants].sort((a, b) => String(b.createdAt ?? "").localeCompare(String(a.createdAt ?? ""))).slice(0, 6)
  );
  const noSource = $derived($tenants.filter((t) => t.sourceCount === 0));
  const allPaused = $derived($tenants.filter((t) => t.sourceCount > 0 && t.activeSourceCount === 0));
  const paidCustomers = $derived(
    $overview ? Object.entries($overview.byPlan).filter(([p]) => p !== "free").reduce((n, [, c]) => n + c, 0) : 0
  );
  const sourceName = (tenantId: string, nsId: string) => {
    const ns = $tenants.find((t) => t.id === tenantId)?.newsSources.find((s) => s.id === nsId);
    return ns ? ns.newsletterTitle || ns.url : undefined;
  };

  onMount(async () => {
    try {
      audit = (await listAudit({ limit: 8 })).items;
    } catch {
      audit = [];
    } finally {
      auditLoading = false;
    }
  });
</script>

<svelte:head><title>Overview · AIBAN admin</title></svelte:head>

<PageHeader title="Overview" description="How AIBAN customers are doing, and what needs a look." />

{#if $tenantsError && !$overview}
  <EmptyState title="We could not load the numbers" description={$tenantsError}>
    {#snippet actions()}<Button onclick={() => refreshAll(true)}>Try again</Button>{/snippet}
  </EmptyState>
{:else}
  <section class="stats" aria-label="Totals" aria-busy={!$overview}>
    {#if !$overview}
      {#each [0, 1, 2, 3] as i (i)}<Skeleton height="104px" />{/each}
    {:else}
      <StatTile label="Customers" value={num($overview.tenants)} hint={plural($overview.withOwnSender, "sends from their own address", "send from their own address")} href="/admin/customers" />
      <StatTile label="Newsletters" value={num($overview.sources)} hint={`${num($overview.activeSources)} active`} href="/admin/newsletters" />
      <StatTile label="Customers on a paid plan" value={num(paidCustomers)} hint={`${num($overview.byPlan.free ?? 0)} on Free`} href="/admin/customers?plan=starter" />
      <StatTile
        label="Paid newsletters"
        value={num($overview.paidSources)}
        hint={features.payments ? "Readers pay to subscribe" : "Marked as paid. Nobody is charged yet"}
        href="/admin/newsletters?filter=paid"
      />
    {/if}
  </section>

  <div class="grid">
    <Card title="Customers by plan" headingLevel={2}>
      {#if $overview}
        <PlanBars byPlan={$overview.byPlan} />
      {:else}
        <Skeleton lines={4} />
      {/if}
    </Card>

    <Card title="Needs a look" headingLevel={2}>
      {#if $tenantsLoading && $tenants.length === 0}
        <Skeleton lines={3} />
      {:else if noSource.length === 0 && allPaused.length === 0}
        <p class="muted">Every customer has at least one active newsletter.</p>
      {:else}
        <ul class="list">
          {#if noSource.length}
            <li>
              <a href="/admin/customers?filter=no_source">{plural(noSource.length, "customer has", "customers have")} not added a newsletter yet</a>
              <span class="muted">They signed up but stopped before the first source.</span>
            </li>
          {/if}
          {#if allPaused.length}
            <li>
              <a href="/admin/customers?filter=paused">{plural(allPaused.length, "customer has", "customers have")} every newsletter paused</a>
              <span class="muted">Nothing is being sent for them.</span>
            </li>
          {/if}
        </ul>
      {/if}
    </Card>

    <Card title="Newest customers" headingLevel={2}>
      {#if $tenantsLoading && $tenants.length === 0}
        <Skeleton lines={5} />
      {:else if newest.length === 0}
        <p class="muted">No customers yet.</p>
      {:else}
        <ul class="list">
          {#each newest as t (t.id)}
            <li class="row">
              <a href={`/admin/customers/${encodeURIComponent(t.id)}`}>{t.id}</a>
              <span class="row__meta">
                <Badge tone={t.plan.id === "free" ? "neutral" : "accent"}>{t.plan.name}</Badge>
                <span class="muted">{t.createdAt ? fromNow(t.createdAt) : "Date not recorded"}</span>
              </span>
            </li>
          {/each}
        </ul>
        <div class="more"><Button variant="tertiary" size="sm" href="/admin/customers">See all customers</Button></div>
      {/if}
    </Card>

    <Card title="Recent admin changes" headingLevel={2}>
      {#if auditLoading}
        <Skeleton lines={5} />
      {:else if audit.length === 0}
        <p class="muted">Changes made from this admin area will show here.</p>
      {:else}
        <ul class="list">
          {#each audit as e (e.id)}
            <li>
              <span>{describeAudit(e, sourceName)}</span>
              <span class="muted">
                {e.actor}, {fromNow(e.at)}
                {#if e.tenantId}· <a href={`/admin/customers/${encodeURIComponent(e.tenantId)}`}>{e.tenantId}</a>{/if}
              </span>
            </li>
          {/each}
        </ul>
        <div class="more"><Button variant="tertiary" size="sm" href="/admin/activity">See the change log</Button></div>
      {/if}
    </Card>
  </div>
{/if}

<style>
  .stats {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    margin-bottom: var(--space-6, 24px);
  }
  .grid {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 420px), 1fr));
  }
  .list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-3, 12px);
  }
  .list li {
    display: grid;
    gap: 2px;
    font-size: var(--fs-sm, 0.875rem);
    min-width: 0;
  }
  .list a {
    color: var(--text-link, inherit);
    overflow-wrap: anywhere;
  }
  .row {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
  .row__meta {
    display: flex;
    gap: var(--space-2, 8px);
    align-items: center;
  }
  .muted {
    color: var(--text-3, inherit);
    font-size: var(--fs-xs, 0.75rem);
    margin: 0;
  }
  .more {
    margin-top: var(--space-3, 12px);
  }
</style>
