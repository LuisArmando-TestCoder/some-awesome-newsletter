<script lang="ts">
  /** Who can open the admin area. Stored in the database (platform/admins) plus ADMIN_EMAILS on the server. */
  import { onMount } from "svelte";
  import { Badge, Button, Card, EmptyState, Skeleton, TextField, toast } from "$lib/ui/components";
  import PageHeader from "$lib/admin/PageHeader.svelte";
  import ConfirmDialog from "$lib/admin/ConfirmDialog.svelte";
  import { access } from "$lib/admin/state";
  import { fmtDate } from "$lib/admin/format";
  import { addAdmin, listAdmins, removeAdmin, type AdminEntry } from "$lib/api/admin";
  import { toUserMessage } from "$lib/api/errors";

  let admins = $state<AdminEntry[]>([]);
  let loading = $state(true);
  let loadError = $state("");
  let email = $state("");
  let emailError = $state("");
  let adding = $state(false);
  let toRemove = $state<AdminEntry | null>(null);
  let removeOpen = $state(false);
  let removing = $state(false);

  const me = $derived($access.phase === "ok" ? $access.me.email.toLowerCase() : "");
  const EMAIL_RE = /^[^\s@]{1,64}@[^\s@]{1,255}\.[^\s@]{2,}$/;

  async function load() {
    loading = true;
    loadError = "";
    try {
      admins = await listAdmins();
    } catch (e) {
      loadError = toUserMessage(e);
    } finally {
      loading = false;
    }
  }

  async function add(e: SubmitEvent) {
    e.preventDefault();
    const value = email.trim().toLowerCase();
    if (!EMAIL_RE.test(value)) {
      emailError = "Enter a valid email address, like name@example.com.";
      return;
    }
    emailError = "";
    adding = true;
    try {
      admins = await addAdmin(value);
      email = "";
      toast.success(`${value} can now open the admin area. They sign in with that email as usual.`);
    } catch (err) {
      emailError = toUserMessage(err);
    } finally {
      adding = false;
    }
  }

  async function confirmRemove() {
    if (!toRemove) return;
    removing = true;
    try {
      admins = await removeAdmin(toRemove.email);
      toast.success(`${toRemove.email} no longer has admin access.`);
      removeOpen = false;
      toRemove = null;
    } catch (err) {
      toast.error(toUserMessage(err));
    } finally {
      removing = false;
    }
  }

  onMount(load);
</script>

<svelte:head><title>Admins · AIBAN admin</title></svelte:head>

<PageHeader title="Admins" description="People who can open this admin area and change customers. Admin access does not change their own AIBAN account." />

<div class="grid">
  <Card title="Give admin access" headingLevel={2}>
    <form class="add" onsubmit={add} novalidate>
      <TextField label="Email address" type="email" autocomplete="off" placeholder="name@aiban.news" bind:value={email} error={emailError} hint="They get access the next time they sign in with this email." />
      <div class="add__actions"><Button type="submit" loading={adding} loadingLabel="Adding">Add admin</Button></div>
    </form>
  </Card>

  <Card title="How access works" headingLevel={2}>
    <ul class="help">
      <li>Admins listed here are saved in the database and can be removed by any other admin.</li>
      <li>Admins marked "Server setting" come from ADMIN_EMAILS on the backend. They always keep access, so the team cannot be locked out. Change that setting on the server to remove them.</li>
      <li>You cannot remove yourself. Ask another admin.</li>
    </ul>
  </Card>
</div>

<Card title="Current admins" headingLevel={2} padding="none">
  {#if loading}
    <ul class="admins" aria-busy="true" aria-label="Loading admins">
      {#each [0, 1, 2] as i (i)}
        <li aria-hidden="true"><div class="who"><Skeleton width="16rem" height="0.875rem" /><Skeleton width="10rem" height="0.75rem" /></div><Skeleton width="6rem" height="1.75rem" radius="full" /></li>
      {/each}
    </ul>
  {:else if loadError}
    <div class="pad">
      <EmptyState compact title="We could not load the admin list" description={loadError}>
        {#snippet actions()}<Button onclick={load}>Try again</Button>{/snippet}
      </EmptyState>
    </div>
  {:else}
    <ul class="admins">
      {#each admins as a (a.email)}
        <li>
          <div class="who">
            <span class="who__email">{a.email}{#if a.email === me}<span class="you"> (you)</span>{/if}</span>
            <span class="who__meta">
              {#if a.source === "env"}Set on the server{:else}Added {fmtDate(a.addedAt)}{a.addedBy ? ` by ${a.addedBy}` : ""}{/if}
            </span>
          </div>
          <div class="row-actions">
            {#if a.source === "env"}
              <Badge tone="info">Server setting</Badge>
            {:else if a.email !== me}
              <Button variant="ghost" size="sm" class="remove" aria-label={`Remove admin access for ${a.email}`} onclick={() => { toRemove = a; removeOpen = true; }}>Remove access</Button>
            {/if}
          </div>
        </li>
      {/each}
    </ul>
  {/if}
</Card>

<ConfirmDialog
  bind:open={removeOpen}
  title="Remove admin access?"
  description={toRemove ? `${toRemove.email} will no longer be able to open the admin area. Their own AIBAN account is not affected.` : ""}
  confirmLabel="Remove access"
  danger
  busy={removing}
  onconfirm={confirmRemove}
/>

<style>
  .grid {
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 22rem), 1fr));
    margin-bottom: var(--space-4);
  }
  .add {
    display: grid;
    gap: var(--space-3);
  }
  .add__actions {
    display: flex;
    justify-content: flex-end;
  }
  .help {
    margin: 0;
    padding-left: var(--space-5);
    display: grid;
    gap: var(--space-2);
    color: var(--text-2);
    font-size: var(--fs-sm);
    line-height: var(--lh-normal);
    max-width: var(--measure);
  }
  .pad {
    padding: var(--space-4);
  }
  .admins {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .admins li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-h);
    padding: var(--row-pad-y) var(--space-4);
    border-bottom: 1px solid var(--border-1);
    transition: background-color var(--t-out) var(--ease-out);
  }
  @media (hover: hover) and (pointer: fine) {
    .admins li:hover {
      background: var(--surface-2);
      transition-duration: var(--t-in);
    }
  }
  .admins li:focus-within {
    background: var(--surface-2);
  }
  .admins li:last-child {
    border-bottom: 0;
  }
  .who {
    display: grid;
    gap: var(--space-1);
    min-width: 0;
  }
  .who__email {
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    color: var(--text-1);
    overflow-wrap: anywhere;
  }
  .you,
  .who__meta {
    color: var(--text-3);
    font-size: var(--fs-xs);
    font-weight: var(--fw-regular);
  }
  .row-actions {
    flex-shrink: 0;
  }
  /* Destructive action reads as such in words and color, and only acts after the confirm dialog. */
  .row-actions :global(.remove) {
    color: var(--danger);
  }
</style>
