<script lang="ts">
  /** Every customer: search, filters, sorting, paging and CSV export. Filters live in the URL. */
  import { page } from "$app/stores";
  import { goto } from "$app/navigation";
  import { Badge, Button, Card, EmptyState, Select, Skeleton, TextField } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import { tenants, tenantsError, tenantsLoading, refreshAll } from "$lib/admin/state";
  import { downloadText, fmtDate, num, plural, toCsv } from "$lib/admin/format";
  import { PLAN_OPTIONS, type AdminTenant } from "$lib/api/admin";

  const PAGE_SIZE = 25;
  type SortKey = "email" | "plan" | "sources" | "created" | "updated";

  const params = $derived($page.url.searchParams);
  let search = $state($page.url.searchParams.get("q") ?? "");
  const plan = $derived(params.get("plan") ?? "");
  const filter = $derived(params.get("filter") ?? "");
  const sort = $derived((params.get("sort") as SortKey) || "created");
  const dir = $derived(params.get("dir") === "asc" ? "asc" : "desc");
  const pageNo = $derived(Math.max(1, Number(params.get("page")) || 1));

  const planRank: Record<string, number> = Object.fromEntries(PLAN_OPTIONS.map((p, i) => [p.value, i]));

  function setParams(patch: Record<string, string | null>) {
    const u = new URL($page.url);
    for (const [k, v] of Object.entries(patch)) {
      if (v === null || v === "") u.searchParams.delete(k);
      else u.searchParams.set(k, v);
    }
    if (!("page" in patch)) u.searchParams.delete("page");
    goto(`${u.pathname}${u.search}`, { replaceState: true, keepFocus: true, noScroll: true });
  }

  let searchTimer: ReturnType<typeof setTimeout> | undefined;
  function onSearch() {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => setParams({ q: search.trim() || null }), 250);
  }

  const filtered = $derived.by(() => {
    const q = (params.get("q") ?? "").trim().toLowerCase();
    let list = $tenants.filter((t) => {
      if (plan && t.plan.id !== plan) return false;
      if (filter === "paid" && t.paidSourceCount === 0) return false;
      if (filter === "vip" && !t.vip) return false;
      if (filter === "no_source" && t.sourceCount > 0) return false;
      if (filter === "paused" && !(t.sourceCount > 0 && t.activeSourceCount === 0)) return false;
      if (filter === "own_sender" && !t.hasOwnSender) return false;
      if (!q) return true;
      return (
        t.id.toLowerCase().includes(q) ||
        t.senderName.toLowerCase().includes(q) ||
        t.newsletterTitle.toLowerCase().includes(q) ||
        t.newsSources.some((s) => s.url.toLowerCase().includes(q) || (s.newsletterTitle ?? "").toLowerCase().includes(q))
      );
    });
    const k = sort;
    const val = (t: AdminTenant): string | number =>
      k === "email" ? t.id : k === "plan" ? planRank[t.plan.id] ?? 0 : k === "sources" ? t.sourceCount : k === "updated" ? String(t.updatedAt ?? "") : String(t.createdAt ?? "");
    list = [...list].sort((a, b) => {
      const x = val(a);
      const y = val(b);
      const c = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return dir === "asc" ? c : -c;
    });
    return list;
  });

  const pages = $derived(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)));
  const visible = $derived(filtered.slice((Math.min(pageNo, pages) - 1) * PAGE_SIZE, Math.min(pageNo, pages) * PAGE_SIZE));

  function sortBy(k: SortKey) {
    setParams({ sort: k, dir: sort === k && dir === "desc" ? "asc" : "desc" });
  }
  const ariaSort = (k: SortKey) => (sort === k ? (dir === "asc" ? "ascending" : "descending") : "none");

  function exportCsv() {
    const csv = toCsv(
      ["email", "newsletter_title", "sender_name", "plan", "vip", "newsletters", "active_newsletters", "paid_newsletters", "own_sender", "created", "updated", "note"],
      filtered.map((t) => [t.id, t.newsletterTitle, t.senderName, t.plan.id, t.vip, t.sourceCount, t.activeSourceCount, t.paidSourceCount, t.hasOwnSender, t.createdAt ?? "", t.updatedAt ?? "", t.adminNote ?? ""])
    );
    downloadText(`aiban-customers-${new Date().toISOString().slice(0, 10)}.csv`, csv);
  }

  const planOptions = [{ value: "", label: "All plans" }, ...PLAN_OPTIONS];
  const filterOptions = [
    { value: "", label: "All customers" },
    { value: "paid", label: "Has a paid newsletter" },
    { value: "vip", label: "VIP" },
    { value: "own_sender", label: "Sends from their own address" },
    { value: "no_source", label: "No newsletter yet" },
    { value: "paused", label: "Every newsletter paused" },
  ];
</script>

<svelte:head><title>Customers · AIBAN admin</title></svelte:head>

<PageHeader title="Customers" description="Everyone who has an AIBAN account. Open a customer to change their plan or their newsletters.">
  {#snippet actions()}
    <Button variant="secondary" size="sm" onclick={exportCsv} disabled={filtered.length === 0}>Export CSV</Button>
  {/snippet}
</PageHeader>

<section class="filters" aria-label="Filter customers">
  <TextField label="Search" placeholder="Email, title or website" bind:value={search} oninput={onSearch} />
  <Select label="Plan" options={planOptions} value={plan} onchange={(e: Event) => setParams({ plan: (e.currentTarget as HTMLSelectElement).value })} />
  <Select label="Show" options={filterOptions} value={filter} onchange={(e: Event) => setParams({ filter: (e.currentTarget as HTMLSelectElement).value })} />
</section>

{#if $tenantsError && $tenants.length === 0}
  <EmptyState title="We could not load customers" description={$tenantsError}>
    {#snippet actions()}<Button onclick={() => refreshAll(true)}>Try again</Button>{/snippet}
  </EmptyState>
{:else if $tenantsLoading && $tenants.length === 0}
  <div aria-busy="true"><Skeleton lines={10} /></div>
{:else}
  <p class="count" aria-live="polite">
    {plural(filtered.length, "customer", "customers")}{filtered.length !== $tenants.length ? ` of ${num($tenants.length)}` : ""}
  </p>

  {#if filtered.length === 0}
    <EmptyState compact title="No customers match" description="Clear the search or change the filters.">
      {#snippet actions()}<Button variant="secondary" size="sm" href="/admin/customers" onclick={() => (search = "")}>Clear filters</Button>{/snippet}
    </EmptyState>
  {:else}
    <Card padding="none">
      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col" aria-sort={ariaSort("email")}><button type="button" onclick={() => sortBy("email")}>Customer</button></th>
              <th scope="col" aria-sort={ariaSort("plan")}><button type="button" onclick={() => sortBy("plan")}>Plan</button></th>
              <th scope="col" aria-sort={ariaSort("sources")}><button type="button" onclick={() => sortBy("sources")}>Newsletters</button></th>
              <th scope="col">Sending</th>
              <th scope="col" aria-sort={ariaSort("created")}><button type="button" onclick={() => sortBy("created")}>Joined</button></th>
              <th scope="col" aria-sort={ariaSort("updated")}><button type="button" onclick={() => sortBy("updated")}>Last change</button></th>
            </tr>
          </thead>
          <tbody>
            {#each visible as t (t.id)}
              <tr>
                <td>
                  <a class="cust" href={`/admin/customers/${encodeURIComponent(t.id)}`}>
                    <span class="cust__email">{t.id}</span>
                    <span class="cust__sub">{t.newsletterTitle || t.senderName || "No title yet"}</span>
                  </a>
                </td>
                <td>
                  <span class="badges">
                    <Badge tone={t.plan.id === "free" ? "neutral" : "accent"}>{t.plan.name}</Badge>
                    {#if t.vip}<Badge tone="info">VIP</Badge>{/if}
                  </span>
                </td>
                <td>
                  {#if t.sourceCount === 0}
                    <span class="muted">None yet</span>
                  {:else}
                    {t.activeSourceCount} of {t.sourceCount} active
                    {#if t.paidSourceCount}<span class="muted">, {t.paidSourceCount} paid</span>{/if}
                  {/if}
                </td>
                <td>{t.hasOwnSender ? "Own address" : "AIBAN address"}</td>
                <td>{fmtDate(t.createdAt)}</td>
                <td>{fmtDate(t.updatedAt)}</td>
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
    grid-template-columns: minmax(220px, 2fr) repeat(2, minmax(160px, 1fr));
    align-items: end;
    margin-bottom: var(--space-4, 16px);
  }
  @media (max-width: 720px) {
    .filters {
      grid-template-columns: 1fr;
    }
  }
  .count,
  .muted {
    color: var(--text-2, inherit);
    font-size: var(--fs-sm, 0.875rem);
  }
  .count {
    margin: 0 0 var(--space-3, 12px);
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
  th button {
    all: unset;
    cursor: pointer;
  }
  th[aria-sort="ascending"] button::after {
    content: " ↑";
  }
  th[aria-sort="descending"] button::after {
    content: " ↓";
  }
  th button:focus-visible,
  .cust:focus-visible {
    outline: 2px solid var(--focus-ring, currentColor);
    outline-offset: 2px;
  }
  tbody tr:last-child td {
    border-bottom: 0;
  }
  tbody tr:hover td {
    background: var(--surface-2, transparent);
  }
  .cust {
    display: grid;
    gap: 2px;
    text-decoration: none;
    min-width: 0;
  }
  .cust__email {
    color: var(--text-1, inherit);
    font-weight: var(--fw-medium, 500);
    overflow-wrap: anywhere;
  }
  .cust__sub {
    color: var(--text-3, inherit);
  }
  .badges {
    display: inline-flex;
    gap: var(--space-1, 4px);
    flex-wrap: wrap;
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
