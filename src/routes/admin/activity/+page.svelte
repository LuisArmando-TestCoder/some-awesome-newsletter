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

<div class="filters"><Select label="Show" options={kindOptions} bind:value={kind} /></div>

{#if loading}
  <div aria-busy="true"><Skeleton lines={10} /></div>
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
        <li>
          <div class="log__main">
            <span>{describeAudit(e, sourceName)}</span>
            {#if e.tenantId}
              <a href={`/admin/customers/${encodeURIComponent(e.tenantId)}`}>{e.tenantId}</a>
            {/if}
          </div>
          <div class="log__meta">
            <span>{e.actor}</span>
            <time datetime={e.at} title={fmtDateTime(e.at)}>{fromNow(e.at)}</time>
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
    max-width: 320px;
    margin-bottom: var(--space-4, 16px);
  }
  .log {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .log li {
    display: flex;
    justify-content: space-between;
    gap: var(--space-4, 16px);
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-bottom: 1px solid var(--border-1, currentColor);
    font-size: var(--fs-sm, 0.875rem);
  }
  .log li:last-child {
    border-bottom: 0;
  }
  .log__main {
    display: grid;
    gap: 2px;
    min-width: 0;
  }
  .log__main a {
    color: var(--text-link, inherit);
    font-size: var(--fs-xs, 0.75rem);
    overflow-wrap: anywhere;
  }
  .log__meta {
    display: grid;
    justify-items: end;
    gap: 2px;
    color: var(--text-3, inherit);
    font-size: var(--fs-xs, 0.75rem);
    text-align: right;
    flex-shrink: 0;
  }
  @media (max-width: 600px) {
    .log li {
      flex-direction: column;
    }
    .log__meta {
      justify-items: start;
      text-align: left;
    }
  }
  .more {
    display: flex;
    justify-content: center;
    margin-top: var(--space-4, 16px);
  }
</style>
