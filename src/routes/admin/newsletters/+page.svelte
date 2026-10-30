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
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") u.searchParams.delete(k);
      else u.searchParams.set(k, v);
    }
    if (!("page" in patch)) u.searchParams.delete("page");
    goto(`${u.pathname}${u.search}`, { replaceState: true, keepFocus: true, noScroll: true });
  }
  let timer: ReturnType<typeof setTimeout> | undefined;
  const onSearch = () => {
    clearTimeout(timer);
    timer = setTimeout(() => setParams({ q: search.trim() || null }), 250);
  };

  // Cells whose switch is saving, keyed "tenant/source/field", so the cell can show it is busy.
  let pending = $state<Record<string, boolean>>({});
  const pkey = (r: Row, field: string) => `${r.tenantId}/${r.id}/${field}`;

  async function setFlag(r: Row, field: "isPaidNewsletter" | "active" | "isPublic", next: boolean) {
    const key = pkey(r, field);
    pending = { ...pending, [key]: true };
    try {
      upsertTenant(await updateTenantSource(r.tenantId, r.id, { [field]: next }));
      if (field === "active" && !next) toast.info(`${r.name} is paused. Scheduled issues stop.`);
    } catch (e) {
      rev++; // put the switch back
      toast.error(toUserMessage(e));
    } finally {
      const { [key]: _done, ...rest } = pending;
      pending = rest;
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
    exported = true;
    exportNote = `Exported ${plural(filtered.length, "newsletter", "newsletters")} as CSV.`;
    clearTimeout(exportTimer);
    exportTimer = setTimeout(() => (exported = false), 1800);
  }
  let exported = $state(false);
  let exportNote = $state("");
  let exportTimer: ReturnType<typeof setTimeout> | undefined;

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
    <Button variant="secondary" size="sm" onclick={exportCsv} disabled={filtered.length === 0} disabledReason="No newsletters match the filters">
      {exported ? "Exported" : "Export CSV"}
    </Button>
  {/snippet}
</PageHeader>
<p class="sr-only" role="status">{exportNote}</p>

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
  <div class="count">
    <p class="count__text" aria-live="polite"><strong>{plural(filtered.length, "newsletter", "newsletters")}</strong>{filtered.length !== rows.length ? ` of ${num(rows.length)}` : ""}</p>
    {#if filter}<span class="chip">{filterOptions.find((f) => f.value === filter)?.label ?? filter}</span>{/if}
    {#if ($page.url.searchParams.get("q") ?? "").trim()}<span class="chip">Search: {($page.url.searchParams.get("q") ?? "").trim()}</span>{/if}
    {#if filter || ($page.url.searchParams.get("q") ?? "").trim()}
      <Button variant="tertiary" size="sm" href="/admin/newsletters" onclick={() => (search = "")}>Clear filters</Button>
    {/if}
  </div>
  {#if filtered.length === 0}
    <EmptyState compact title="No newsletters match" description="Clear the search or pick another filter.">
      {#snippet actions()}<Button variant="secondary" size="sm" href="/admin/newsletters" onclick={() => (search = "")}>Clear filters</Button>{/snippet}
    </EmptyState>
  {:else}
    <Card padding="none">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Newsletter</th>
              <th scope="col">Customer</th>
              <th scope="col" class="c-switch">Paid</th>
              <th scope="col" class="c-switch">Active</th>
              <th scope="col" class="c-switch">Public</th>
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
                  <td class="c-switch" aria-busy={pending[pkey(r, "isPaidNewsletter")] || undefined}><Switch ariaLabel={`Paid: ${r.name}`} toggled={r.isPaidNewsletter} onChange={(v: boolean) => setFlag(r, "isPaidNewsletter", v)} /></td>
                  <td class="c-switch" aria-busy={pending[pkey(r, "active")] || undefined}><Switch ariaLabel={`Active: ${r.name}`} toggled={r.active} onChange={(v: boolean) => setFlag(r, "active", v)} /></td>
                  <td class="c-switch" aria-busy={pending[pkey(r, "isPublic")] || undefined}><Switch ariaLabel={`Public: ${r.name}`} toggled={r.isPublic} onChange={(v: boolean) => setFlag(r, "isPublic", v)} /></td>
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
        <span aria-current="page">Page {Math.min(pageNo, pages)} of {pages}</span>
        <Button variant="secondary" size="sm" disabled={pageNo >= pages} onclick={() => setParams({ page: String(pageNo + 1) })}>Next</Button>
      </nav>
    {/if}
  {/if}
{/if}

<style lang="scss">
  @use "../../../lib/admin/table.scss" as t;
  @include t.core;
  .count__text {
    margin: 0;
  }
  .name {
    display: block;
    max-width: 32ch;
    font-weight: var(--fw-medium);
    color: var(--text-1);
    overflow-wrap: anywhere;
  }
  td a.url,
  td a.cust {
    color: var(--text-2);
    text-decoration: underline;
    text-decoration-thickness: 1px;
    text-underline-offset: 0.2em;
  }
  .url {
    font-size: var(--fs-xs);
  }
  .cust {
    display: block;
    margin-bottom: 2px;
  }
  .c-switch {
    width: 1%;
    text-align: center;
    white-space: nowrap;
  }
  /* A switch that is saving: the cell dims and the cursor says it is working. */
  td[aria-busy="true"] {
    cursor: progress;
  }
  td[aria-busy="true"] > :global(*) {
    opacity: 0.55;
    transition: opacity var(--t-state) var(--ease-out);
  }
</style>
