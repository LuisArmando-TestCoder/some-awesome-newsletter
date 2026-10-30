<script lang="ts">
  /**
   * AIBAN platform admin shell: access gate, sidebar (bottom bar on phones),
   * top bar with the signed-in admin, refresh and sign out.
   */
  import { onMount, type Snippet } from "svelte";
  import { page } from "$app/stores";
  import { dev, browser } from "$app/environment";
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

  // Environment cue: staff must always see whether a change hits real customers.
  const host = browser ? window.location.hostname : "";
  const env: { id: "prod" | "staging" | "local"; label: string } =
    dev || host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")
      ? { id: "local", label: "Local" }
      : /staging|preview|stage|dev\./.test(host)
        ? { id: "staging", label: "Staging" }
        : { id: "prod", label: "Production" };

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
  <a class="skip" href="#admin-main">Skip to content</a>
  <div class="shell" data-env={env.id}>
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
          <span class="env" data-env={env.id} title="Changes here apply to the {env.label.toLowerCase()} environment">
            <span class="env__dot" aria-hidden="true"></span>{env.label}
          </span>
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

      <main class="content" id="admin-main" tabindex="-1">
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
  /* Back office in the same Mono language as the owner dashboard, denser and keyboard first. */
  .gate {
    min-height: 100dvh;
    display: grid;
    place-content: center;
    gap: var(--space-4);
    padding: var(--space-6) var(--gutter);
    background: var(--surface-0);
  }
  .skip {
    position: absolute;
    left: var(--space-3);
    top: var(--space-3);
    z-index: var(--z-toast);
    display: inline-flex;
    align-items: center;
    min-height: var(--control-h);
    padding: 0 var(--space-4);
    border-radius: var(--radius-full);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    transform: translateY(-200%);
    transition: transform var(--dur-base) var(--ease-out);
  }
  .skip:focus {
    transform: none;
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .shell {
    min-height: 100dvh;
    display: grid;
    grid-template-columns: 15rem minmax(0, 1fr);
    background: var(--surface-0);
    color: var(--text-1);
  }
  /* Production gets a thin danger rule along the top edge so it is never mistaken for a test copy. */
  .shell[data-env="prod"] .topbar,
  .shell[data-env="prod"] .sidebar {
    box-shadow: inset 0 3px 0 var(--danger);
  }
  .sidebar {
    position: sticky;
    top: 0;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    gap: var(--space-5);
    padding: var(--space-5) var(--space-3) var(--space-4);
    border-right: 1px solid var(--border-1);
    background: var(--surface-1);
  }
  .brand {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    border-radius: var(--radius-sm);
    color: var(--text-1);
    text-decoration: none;
    font-family: var(--font-display);
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
    letter-spacing: var(--tracking-tight);
  }
  .brand__mark {
    display: grid;
    place-items: center;
    width: 1.75rem;
    height: 1.75rem;
    border-radius: var(--radius-sm);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    font-size: var(--fs-sm);
    font-weight: var(--fw-bold);
  }
  .brand__tag {
    display: inline-flex;
    align-items: center;
    margin-left: var(--space-1);
    padding: 0 var(--space-2);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-full);
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0;
    color: var(--text-2);
  }
  .nav {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 2px;
  }
  .nav__link {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: var(--control-h-sm);
    padding: 0 var(--space-3);
    border-radius: var(--radius-md);
    color: var(--text-2);
    text-decoration: none;
    font-size: var(--fs-sm);
    font-weight: var(--fw-regular);
    transition:
      background-color var(--t-out) var(--ease-out),
      color var(--t-out) var(--ease-out);
  }
  .nav__link::after {
    content: "";
    width: 6px;
    height: 6px;
    margin-left: auto;
    border-radius: var(--radius-full);
    background: currentColor;
    opacity: 0;
  }
  @media (hover: hover) and (pointer: fine) {
    .nav__link:hover {
      background: var(--surface-2);
      color: var(--text-1);
      transition-duration: var(--t-in);
    }
  }
  .nav__link:active {
    background: var(--surface-3);
    transition-duration: 60ms;
  }
  .nav__link.is-active {
    background: var(--surface-2);
    color: var(--text-1);
    font-weight: var(--fw-semibold);
  }
  .nav__link.is-active::after {
    opacity: 1;
  }
  .nav__link:focus-visible,
  .bottombar__link:focus-visible,
  .brand:focus-visible {
    outline: none;
    box-shadow: var(--focus-ring);
  }
  .sidebar__foot {
    margin-top: auto;
    padding-top: var(--space-3);
    border-top: 1px solid var(--border-1);
  }
  .nav__link--muted {
    color: var(--text-3);
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
    gap: var(--space-3);
    min-height: var(--header-h-condensed);
    padding: var(--space-2) var(--space-6);
    border-bottom: 1px solid var(--border-1);
    background: var(--surface-glass);
    -webkit-backdrop-filter: saturate(1.8) blur(16px);
    backdrop-filter: saturate(1.8) blur(16px);
  }
  .topbar__status {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .topbar__actions {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    min-width: 0;
  }
  .topbar__me {
    font-size: var(--fs-xs);
    color: var(--text-2);
    max-width: 22ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .env {
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    min-height: 1.5rem;
    padding: 0 var(--space-3);
    border-radius: var(--radius-full);
    border: 1px solid var(--border-2);
    font-size: var(--fs-xs);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
    white-space: nowrap;
  }
  .env__dot {
    width: 8px;
    height: 8px;
    border-radius: var(--radius-full);
    background: var(--text-3);
  }
  .env[data-env="prod"] {
    border-color: var(--danger);
    background: var(--danger-soft);
  }
  .env[data-env="prod"] .env__dot {
    background: var(--danger);
  }
  .env[data-env="staging"] {
    background: var(--warning-soft);
  }
  .env[data-env="staging"] .env__dot {
    background: var(--warning);
  }
  .pill {
    display: inline-flex;
    align-items: center;
    min-height: 1.5rem;
    padding: 0 var(--space-3);
    border-radius: var(--radius-full);
    background: var(--warning-soft);
    color: var(--text-1);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    border: 1px solid var(--border-1);
    white-space: nowrap;
  }
  .content {
    width: 100%;
    max-width: var(--container-xl);
    margin: 0 auto;
    padding: var(--space-6) var(--space-6) var(--space-9);
    container-type: inline-size;
    container-name: admin;
  }
  .content:focus {
    outline: none;
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
      padding-inline: var(--gutter);
    }
    .topbar__me {
      display: none;
    }
    .content {
      padding: var(--space-5) var(--gutter) calc(var(--space-9) + env(safe-area-inset-bottom));
    }
    .bottombar {
      position: fixed;
      inset: auto 0 0 0;
      z-index: 10;
      display: grid;
      grid-template-columns: repeat(5, minmax(0, 1fr));
      border-top: 1px solid var(--border-1);
      background: var(--surface-glass);
      -webkit-backdrop-filter: saturate(1.8) blur(16px);
      backdrop-filter: saturate(1.8) blur(16px);
      padding: var(--space-1) var(--space-1) calc(var(--space-1) + env(safe-area-inset-bottom));
    }
    .bottombar__link {
      position: relative;
      display: grid;
      justify-items: center;
      align-content: center;
      gap: 2px;
      min-height: 3.5rem;
      padding: var(--space-2) 0 var(--space-1);
      border-radius: var(--radius-md);
      color: var(--text-3);
      text-decoration: none;
      font-size: var(--fs-xs);
      font-weight: var(--fw-medium);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .bottombar__link::before {
      content: "";
      position: absolute;
      top: 3px;
      left: 50%;
      width: 4px;
      height: 4px;
      margin-left: -2px;
      border-radius: var(--radius-full);
      background: currentColor;
      opacity: 0;
    }
    .bottombar__link.is-active {
      color: var(--text-1);
      font-weight: var(--fw-semibold);
    }
    .bottombar__link.is-active::before {
      opacity: 1;
    }
  }
  @media (max-width: 480px) {
    .topbar {
      flex-wrap: wrap;
      row-gap: var(--space-1);
    }
    .topbar__actions {
      margin-left: auto;
    }
  }
  @media (forced-colors: active) {
    .nav__link.is-active,
    .bottombar__link.is-active {
      forced-color-adjust: none;
      background: Highlight;
      color: HighlightText;
    }
    .env {
      border-color: CanvasText;
    }
  }
</style>
