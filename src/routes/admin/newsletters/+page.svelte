<script lang="ts">
  /** Every newsletter of every customer, with the paid, active and public switches inline. */
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Badge, Button, Card, EmptyState, Select, Skeleton, Switch, TextField, toast } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import { tenants, tenantsError, tenantsLoading, refreshAll, upsertTenant } from "$lib/admin/state";
  import { downloadText, hostOf, num, plural, toCsv } from "$lib/admin/format";
  import { updateTenantSource } from "$lib/api/admin";
  import { toUserMessage } from "$lib/api/errors";
  import { features } from "$lib/config/features";

  const PAGE_SIZE = 30;
  let search = $state($page.url.searchParams.get("q") ?? "");
  const filter = $derived($page.url.searchParams.get("filter") ?? "");
  const pageNo = $derived(Math.max(1, Number($page.url.searchParams.get("page")) || 1));
  let rev = $state(0);

  type Row = { tenantId: string; plan: string; id: string; name: string; url: string; active: boolean; isPublic: boolean; isPaidNewsletter: boolean; scheduleTime?: string };

  const rows = $derived.by<Row[]>(() =>
    $tenants.flatMap((t) =>
      t.newsSources.map((s) => ({
        tenantId: t.id,
        plan: t.plan.name,
        id: s.id,
        name: s.newsletterTitle || hostOf(s.url) || s.id,
        url: s.url,
        active: s.active,
        isPublic: s.isPublic,
        isPaidNewsletter: s.isPaidNewsletter,
        scheduleTime: s.scheduleTime,
      }))
    )
  );

  const filtered = $derived.by(() => {
    const q = ($page.url.searchParams.get("q") ?? "").trim().toLowerCase();
    return rows
      .filter((r) => {
        if (filter === "paid" && !r.isPaidNewsletter) return false;
        if (filter === "free" && r.isPaidNewsletter) return false;
        if (filter === "active" && !r.active) return false;
        if (filter === "paused" && r.active) return false;
        if (filter === "private" && r.isPublic) return false;
        if (!q) return true;
        return r.name.toLowerCase().includes(q) || r.url.toLowerCase().includes(q) || r.tenantId.toLowerCase().includes(q);
      })
      .sort((a, b) => a.tenantId.localeCompare(b.tenantId) || a.name.localeCompare(b.name));
  });
  const pages = $derived(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
  const visible = $derived(filtered.slice((Math.min(pageNo, pages) - 1) * PAGE_SIZE, Math.min(pageNo, pages) * PAGE_SIZE));

  function setParams(patch: Record<string, string | null>) {
    const u = new URL($page.url);
    for (const [k, v] of Object.entries(patch)) (v === null || v === "" ? u.searchParams.delete(k) : u.searchParams.set(k, v));
    if (!("page" in patch)) u.searchParams.delete("page");
    goto(`${u.pathname}${u.search}`, { replaceState: true, keepFocus: true, noScroll: true });
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onSearch = () => {
    clearTimeout(timer);
    timer = setTimeout(() => setParams({ q: search.trim() || null }), 250);
  };

  async function setFlag(r: Row, field: "isPaidNewsletter" | "active" | "isPublic", next: boolean) {
    try {
      upsertTenant(await updateTenantSource(r.tenantId, r.id, { [field]: next }));
      if (field === "active" && !next) toast.info(`${r.name} is paused. Scheduled issues stop.`);
    } catch (e) {
      rev++; // put the switch back
      toast.error(toUserMessage(e));
    }
  }

  function exportCsv() {
    downloadText(
      `aiban-newsletters-${new Date().toISOString().slice(0, 10)}.csv`,
      toCsv(
        ["customer", "plan", "newsletter_id", "title", "url", "active", "public", "paid", "schedule_utc"],
        filtered.map((r) => [r.tenantId, r.plan, r.id, r.name, r.url, r.active, r.isPublic, r.isPaidNewsletter, r.scheduleTime ?? ""])
      )
    );
  }

  const filterOptions = [
    { value: "", label: "All newsletters" },
    { value: "paid", label: "Paid" },
    { value: "free", label: "Free" },
    { value: "active", label: "Active" },
    { value: "paused", label: "Paused" },
    { value: "private", label: "Private" },
  ];
</script>

<svelte:head><title>Newsletters · AIBAN admin</title></svelte:head>

<PageHeader
  title="Newsletters"
  description={features.payments
    ? "Every newsletter across customers. Paid newsletters charge readers to subscribe."
    : "Every newsletter across customers. The paid switch is saved in the database; nobody is charged until payments are back."}
>
  {#snippet actions()}
    <Button variant="secondary" size="sm" onclick={exportCsv} disabled={filtered.length === 0}>Export CSV</Button>
  {/snippet}
</PageHeader>

<section class="filters" aria-label="Filter newsletters">
  <TextField label="Search" placeholder="Title, website or customer email" bind:value={search} oninput={onSearch} />
  <Select label="Show" options={filterOptions} value={filter} onchange={(e: Event) => setParams({ filter: (e.currentTarget as HTMLSelectElement).value })} />
</section>

{#if $tenantsError && $tenants.length === 0}
  <EmptyState title="We could not load newsletters" description={$tenantsError}>
    {#snippet actions()}<Button onclick={() => refreshAll(true)}>Try again</Button>{/snippet}
  </EmptyState>
{:else if $tenantsLoading && $tenants.length === 0}
  <div aria-busy="true"><Skeleton lines={10} /></div>
{:else}
  <p class="count" aria-live="polite">{plural(filtered.length, "newsletter", "newsletters")}{filtered.length !== rows.length ? ` of ${num(rows.length)}` : ""}</p>
  {#if filtered.length === 0}
    <EmptyState compact title="No newsletters match" description="Clear the search or pick another filter." />
  {:else}
    <Card padding="none">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Newsletter</th>
              <th scope="col">Customer</th>
              <th scope="col">Paid</th>
              <th scope="col">Active</th>
              <th scope="col">Public</th>
            </tr>
          </thead>
          <tbody>
            {#each visible as r (r.tenantId + "/" + r.id)}
              <tr>
                <td>
                  <span class="name">{r.name}</span>
                  {#if r.url}<a class="url" href={r.url} target="_blank" rel="noopener noreferrer">{hostOf(r.url)}</a>{/if}
                </td>
                <td>
                  <a class="cust" href={`/admin/customers/${encodeURIComponent(r.tenantId)}`}>{r.tenantId}</a>
                  <Badge tone="neutral">{r.plan}</Badge>
                </td>
                {#key rev}
                  <td><Switch ariaLabel={`Paid: ${r.name}`} toggled={r.isPaidNewsletter} onChange={(v: boolean) => setFlag(r, "isPaidNewsletter", v)} /></td>
                  <td><Switch ariaLabel={`Active: ${r.name}`} toggled={r.active} onChange={(v: boolean) => setFlag(r, "active", v)} /></td>
                  <td><Switch ariaLabel={`Public: ${r.name}`} toggled={r.isPublic} onChange={(v: boolean) => setFlag(r, "isPublic", v)} /></td>
                {/key}
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </Card>
    {#if pages > 1}
      <nav class="pager" aria-label="Pages">
        <Button variant="secondary" size="sm" disabled={pageNo <= 1} onclick={() => setParams({ page: String(pageNo - 1) })}>Previous</Button>
        <span>Page {Math.min(pageNo, pages)} of {pages}</span>
        <Button variant="secondary" size="sm" disabled={pageNo >= pages} onclick={() => setParams({ page: String(pageNo + 1) })}>Next</Button>
      </nav>
    {/if}
  {/if}
{/if}

<style>
  .filters {
    display: grid;
    gap: var(--space-4, 16px);
    grid-template-columns: minmax(220px, 2fr) minmax(160px, 1fr);
    align-items: end;
    margin-bottom: var(--space-4, 16px);
  }
  @media (max-width: 720px) {
    .filters {
      grid-template-columns: 1fr;
    }
  }
  .count {
    margin: 0 0 var(--space-3, 12px);
    color: var(--text-2, inherit);
    font-size: var(--fs-sm, 0.875rem);
  }
  .table-wrap {
    overflow-x: auto;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    font-size: var(--fs-sm, 0.875rem);
  }
  th,
  td {
    text-align: left;
    padding: var(--space-3, 12px) var(--space-4, 16px);
    border-bottom: 1px solid var(--border-1, currentColor);
    vertical-align: middle;
  }
  th {
    color: var(--text-2, inherit);
    font-weight: var(--fw-semibold, 600);
    white-space: nowrap;
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  tbody tr:hover td {
    background: var(--surface-2, transparent);
  }
  .name {
    display: block;
    font-weight: var(--fw-medium, 500);
    color: var(--text-1, inherit);
    overflow-wrap: anywhere;
  }
  .url,
  .cust {
    color: var(--text-link, inherit);
    overflow-wrap: anywhere;
  }
  .url {
    font-size: var(--fs-xs, 0.75rem);
  }
  .cust {
    display: block;
    margin-bottom: 2px;
  }
  .pager {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--space-3, 12px);
    margin-top: var(--space-4, 16px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, inherit);
  }
</style>
