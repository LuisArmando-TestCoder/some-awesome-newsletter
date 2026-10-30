<script lang="ts">
  /** Change log: every change made from the admin area, newest first, with paging. */
  import { onMount } from "svelte";
  import { Button, Card, EmptyState, Select, Skeleton } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import { tenants } from "$lib/admin/state";
  import { describeAudit, fmtDateTime, fromNow, hostOf } from "$lib/admin/format";
  import { listAudit, type AdminAuditEntry } from "$lib/api/admin";
  import { toUserMessage } from "$lib/api/errors";

  let items = $state<AdminAuditEntry[]>([]);
  let cursor = $state<string | null>(null);
  let loading = $state(true);
  let more = $state(false);
  let loadError = $state("");
  let kind = $state("");

  const kindOptions = [
    { value: "", label: "All changes" },
    { value: "customer", label: "Customers and newsletters" },
    { value: "admin", label: "Admin access" },
  ];
  const shown = $derived(
    items.filter((e) => (kind === "admin" ? e.action.startsWith("admin.") : kind === "customer" ? !e.action.startsWith("admin.") : true))
  );
  const sourceName = (tenantId: string, nsId: string) => {
    const ns = $tenants.find((t) => t.id === tenantId)?.newsSources.find((s) => s.id === nsId);
    return ns ? ns.newsletterTitle || hostOf(ns.url) : undefined;
  };

  async function load(next = false) {
    if (next) more = true;
    else loading = true;
    loadError = "";
    try {
      const page = await listAudit({ limit: 50, cursor: next ? cursor ?? undefined : undefined });
      items = next ? [...items, ...page.items] : page.items;
      cursor = page.nextCursor;
    } catch (e) {
      loadError = toUserMessage(e);
    } finally {
      loading = false;
      more = false;
    }
  }

  onMount(() => load());
</script>

<svelte:head><title>Change log · AIBAN admin</title></svelte:head>

<PageHeader title="Change log" description="Every change made from the admin area: plans, notes, newsletter switches and admin access." />

<div class="filters">
  <Select label="Show" options={kindOptions} bind:value={kind} />
  {#if kind}
    <p class="filters__state" aria-live="polite">
      <span class="chip">{kindOptions.find((o) => o.value === kind)?.label}</span>
      <Button variant="tertiary" size="sm" onclick={() => (kind = "")}>Show all changes</Button>
    </p>
  {/if}
</div>

{#if loading}
  <Card padding="none">
    <ol class="log" aria-busy="true" aria-label="Loading the change log">
      {#each [0, 1, 2, 3, 4, 5] as i (i)}
        <li aria-hidden="true">
          <span class="log__when"><Skeleton width="4rem" height="0.75rem" /></span>
          <div class="log__main"><Skeleton width={`${80 - i * 7}%`} height="0.875rem" /><Skeleton width="12rem" height="0.75rem" /></div>
        </li>
      {/each}
    </ol>
  </Card>
{:else if loadError && items.length === 0}
  <EmptyState title="We could not load the change log" description={loadError}>
    {#snippet actions()}<Button onclick={() => load()}>Try again</Button>{/snippet}
  </EmptyState>
{:else if shown.length === 0}
  <EmptyState compact title="No changes yet" description="When an admin changes a plan, a newsletter or admin access, it shows here." />
{:else}
  <Card padding="none">
    <ol class="log">
      {#each shown as e (e.id)}
        <li data-kind={e.action.startsWith("admin.") ? "admin" : "customer"}>
          <time class="log__when" datetime={e.at} title={fmtDateTime(e.at)}>{fromNow(e.at)}</time>
          <div class="log__main">
            <span class="log__what">{describeAudit(e, sourceName)}</span>
            <span class="log__meta">
              <span class="log__kind">{e.action.startsWith("admin.") ? "Admin access" : "Customer"}</span>
              <span>by {e.actor}</span>
              {#if e.tenantId}
                <a href={`/admin/customers/${encodeURIComponent(e.tenantId)}`}>{e.tenantId}</a>
              {/if}
            </span>
          </div>
        </li>
      {/each}
    </ol>
  </Card>
  {#if cursor}
    <div class="more"><Button variant="secondary" loading={more} loadingLabel="Loading" onclick={() => load(true)}>Load older changes</Button></div>
  {/if}
{/if}

<style>
  .filters {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-end;
    gap: var(--space-3) var(--space-4);
    margin-bottom: var(--space-4);
  }
  .filters > :global(:first-child) {
    flex: 0 1 20rem;
  }
  .filters__state {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    margin: 0;
    min-height: var(--control-h);
  }
  .chip {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0 var(--space-2);
    border: 1px solid var(--text-1);
    border-radius: var(--radius-full);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }
  /* A readable log: time in a fixed tabular column, then what happened, then who and where. */
  .log {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .log li {
    display: grid;
    grid-template-columns: 7rem minmax(0, 1fr);
    gap: var(--space-4);
    align-items: baseline;
    padding: var(--row-pad-y) var(--space-4);
    border-bottom: 1px solid var(--border-1);
    font-size: var(--fs-sm);
    transition: background-color var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .log li:hover {
      background: var(--surface-2);
      transition-duration: var(--t-in);
    }
  }
  .log li:focus-within {
    background: var(--surface-2);
  }
  .log li:last-child {
    border-bottom: 0;
  }
  .log__when {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .log__main {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
  }
  .log__what {
    color: var(--text-1);
    line-height: var(--lh-snug);
    max-width: var(--measure);
  }
  .log__meta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: var(--space-1) var(--space-3);
    color: var(--text-3);
    font-size: var(--fs-xs);
  }
  .log__kind {
    padding: 0 var(--space-2);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-full);
    color: var(--text-2);
    font-weight: var(--fw-medium);
  }
  li[data-kind="admin"] .log__kind {
    border-color: var(--text-2);
    color: var(--text-1);
  }
  .log__meta a {
    color: var(--text-2);
    overflow-wrap: anywhere;
    border-radius: var(--radius-sm);
  }
  .log__meta a:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  @media (max-width: 600px) {
    .log li {
      grid-template-columns: minmax(0, 1fr);
      gap: var(--space-1);
    }
  }
  .more {
    display: flex;
    justify-content: center;
    margin-top: var(--space-4);
  }
</style>
