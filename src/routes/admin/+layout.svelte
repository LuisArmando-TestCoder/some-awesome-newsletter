<script lang="ts">
  /**
   * AIBAN platform admin shell: access gate, sidebar (bottom bar on phones),
   * top bar with the signed-in admin, refresh and sign out.
   */
  import { onMount, type Snippet } from "svelte";
  import { page } from "$app/stores";
  import Icon from "$lib/dashboard/ui/Icon.svelte";
  import { Button, EmptyState, Skeleton, SettingsMenu } from "$lib/ui/components";
  import { access, checkAccess, refreshAll, tenantsLoading } from "$lib/admin/state";
  import { features } from "$lib/config/features";
  import logout from "../../components/systems/requests/logout";

  let { children }: { children: Snippet } = $props();

  const NAV = [
    { href: "/admin", label: "Overview", icon: "home", exact: true },
    { href: "/admin/customers", label: "Customers", icon: "people" },
    { href: "/admin/newsletters", label: "Newsletters", icon: "mail" },
    { href: "/admin/admins", label: "Admins", icon: "gear" },
    { href: "/admin/activity", label: "Change log", icon: "clock" },
  ];

  const isActive = (item: (typeof NAV)[number], path: string) =>
    item.exact ? path === item.href || path === `${item.href}/` : path === item.href || path.startsWith(`${item.href}/`);

  async function retry() {
    await checkAccess();
    if ($access.phase === "ok") refreshAll();
  }

  onMount(async () => {
    await checkAccess();
    if ($access.phase === "ok") refreshAll();
  });
</script>

<svelte:head>
  <meta name="robots" content="noindex, nofollow" />
</svelte:head>

{#if $access.phase === "checking"}
  <div class="gate" aria-busy="true">
    <Skeleton width="12rem" height="2rem" />
    <Skeleton lines={4} />
  </div>
{:else if $access.phase === "signed_out"}
  <div class="gate">
    <EmptyState title="Sign in to continue" description="The admin area is for the AIBAN team. Sign in with an admin email address.">
      {#snippet actions()}
        <Button href="/login">Sign in</Button>
      {/snippet}
    </EmptyState>
  </div>
{:else if $access.phase === "not_admin"}
  <div class="gate">
    <EmptyState
      title="This area is for the AIBAN team"
      description={$access.email
        ? `${$access.email} is not an admin. Another admin can give you access from the Admins page.`
        : "Your account is not an admin. Another admin can give you access from the Admins page."}
    >
      {#snippet actions()}
        <Button variant="secondary" href="/dashboard">Go to your dashboard</Button>
      {/snippet}
    </EmptyState>
  </div>
{:else if $access.phase === "error"}
  <div class="gate">
    <EmptyState title="We could not open the admin area" description={$access.message}>
      {#snippet actions()}
        <Button onclick={retry}>Try again</Button>
      {/snippet}
    </EmptyState>
  </div>
{:else}
  <div class="shell">
    <aside class="sidebar" aria-label="Admin">
      <a class="brand" href="/admin">
        <span class="brand__mark" aria-hidden="true">A</span>
        <span class="brand__text">AIBAN <span class="brand__tag">Admin</span></span>
      </a>
      <nav aria-label="Admin sections">
        <ul class="nav">
          {#each NAV as item (item.href)}
            {@const active = isActive(item, $page.url.pathname)}
            <li>
              <a class="nav__link" class:is-active={active} href={item.href} aria-current={active ? "page" : undefined}>
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </a>
            </li>
          {/each}
        </ul>
      </nav>
      <div class="sidebar__foot">
        <a class="nav__link nav__link--muted" href="/dashboard">
          <Icon name="arrow" size={18} />
          <span>Your dashboard</span>
        </a>
      </div>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="topbar__status">
          {#if !features.payments}
            <span class="pill" title="No payment provider is connected. Paid flags are stored but nobody is charged.">Payments off</span>
          {/if}
        </div>
        <div class="topbar__actions">
          <Button variant="ghost" size="sm" loading={$tenantsLoading} loadingLabel="Refreshing" onclick={() => refreshAll(true)}>Refresh data</Button>
          <SettingsMenu compact />
          <span class="topbar__me" title="Signed in as">{$access.me.email}</span>
          <Button variant="tertiary" size="sm" onclick={() => logout(true)}>Sign out</Button>
        </div>
      </header>

      <main class="content" id="admin-main">
        {@render children()}
      </main>
    </div>

    <nav class="bottombar" aria-label="Admin sections">
      {#each NAV as item (item.href)}
        {@const active = isActive(item, $page.url.pathname)}
        <a class="bottombar__link" class:is-active={active} href={item.href} aria-current={active ? "page" : undefined}>
          <Icon name={item.icon} size={20} />
          <span>{item.label}</span>
        </a>
      {/each}
    </nav>
  </div>
{/if}

<style>
  .gate {
    min-height: 100dvh;
    display: grid;
    place-content: center;
    gap: var(--space-4, 16px);
    padding: var(--space-6, 24px);
    background: var(--surface-0, transparent);
  }
  .shell {
    min-height: 100dvh;
    display: grid;
    grid-template-columns: var(--sidebar-w, 240px) minmax(0, 1fr);
    background: var(--surface-0, transparent);
    color: var(--text-1, inherit);
  }
  .sidebar {
    position: sticky;
    top: 0;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    gap: var(--space-5, 24px);
    padding: var(--space-5, 24px) var(--space-3, 12px);
    border-right: 1px solid var(--border-1, currentColor);
    background: var(--surface-1, transparent);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-3, 12px);
    padding: 0 var(--space-3, 12px);
    color: var(--text-1, inherit);
    text-decoration: none;
    font-family: var(--font-display, inherit);
    font-size: var(--fs-lg, 1.125rem);
    font-weight: var(--fw-bold, 700);
  }
  .brand__mark {
    display: grid;
    place-items: center;
    width: 32px;
    height: 32px;
    border-radius: var(--radius-md, 8px);
    background: var(--accent, currentColor);
    color: var(--accent-contrast, white);
    font-size: var(--fs-md, 1rem);
  }
  .brand__tag {
    font-family: var(--font-body, inherit);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-medium, 500);
    color: var(--text-2, inherit);
    margin-left: var(--space-1, 4px);
  }
  .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: var(--space-1, 4px);
  }
  .nav__link {
    display: flex;
    align-items: center;
    gap: var(--space-3, 12px);
    padding: var(--space-2, 8px) var(--space-3, 12px);
    border-radius: var(--radius-md, 8px);
    color: var(--text-2, inherit);
    text-decoration: none;
    font-size: var(--fs-sm, 0.875rem);
    font-weight: var(--fw-medium, 500);
    transition: background var(--dur-fast, 120ms) var(--ease-out, ease), color var(--dur-fast, 120ms) var(--ease-out, ease);
  }
  .nav__link:hover {
    background: var(--surface-2, transparent);
    color: var(--text-1, inherit);
  }
  .nav__link.is-active {
    background: var(--accent-soft, transparent);
    color: var(--text-1, inherit);
    font-weight: var(--fw-semibold, 600);
  }
  .nav__link:focus-visible,
  .bottombar__link:focus-visible,
  .brand:focus-visible {
    outline: 2px solid var(--focus-ring, currentColor);
    outline-offset: 2px;
  }
  .sidebar__foot {
    margin-top: auto;
  }
  .main {
    min-width: 0;
    display: flex;
    flex-direction: column;
  }
  .topbar {
    position: sticky;
    top: 0;
    z-index: 5;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--space-3, 12px);
    min-height: var(--header-h, 60px);
    padding: var(--space-2, 8px) var(--space-6, 24px);
    border-bottom: 1px solid var(--border-1, currentColor);
    background: var(--surface-0, transparent);
  }
  .topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-2, 8px);
    min-width: 0;
  }
  .topbar__me {
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, inherit);
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .pill {
    display: inline-flex;
    align-items: center;
    padding: 2px var(--space-3, 12px);
    border-radius: var(--radius-full, 999px);
    background: var(--warning-soft, transparent);
    color: var(--text-1, inherit);
    font-size: var(--fs-xs, 0.75rem);
    font-weight: var(--fw-medium, 500);
    border: 1px solid var(--border-1, currentColor);
  }
  .content {
    width: 100%;
    max-width: var(--container-lg, 1200px);
    margin: 0 auto;
    padding: var(--space-6, 24px) var(--space-6, 24px) var(--space-9, 96px);
  }
  .bottombar {
    display: none;
  }
  @media (max-width: 900px) {
    .shell {
      grid-template-columns: minmax(0, 1fr);
    }
    .sidebar {
      display: none;
    }
    .topbar {
      padding-inline: var(--space-4, 16px);
    }
    .topbar__me {
      display: none;
    }
    .content {
      padding: var(--space-5, 24px) var(--space-4, 16px) calc(var(--space-9, 96px) + 24px);
    }
    .bottombar {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 10;
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      border-top: 1px solid var(--border-1, currentColor);
      background: var(--surface-1, transparent);
      padding-bottom: env(safe-area-inset-bottom);
    }
    .bottombar__link {
      display: grid;
      justify-items: center;
      gap: 2px;
      padding: var(--space-2, 8px) 0;
      color: var(--text-2, inherit);
      text-decoration: none;
      font-size: var(--fs-xs, 0.75rem);
    }
    .bottombar__link.is-active {
      color: var(--text-1, inherit);
      font-weight: var(--fw-semibold, 600);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .nav__link {
      transition: none;
    }
  }
</style>
