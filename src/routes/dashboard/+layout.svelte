<script lang="ts">
  // WS4. Dashboard layout: loads the owner's data once, then shows either the
  // onboarding flow (WS3, inside +page) or the dashboard shell with its navigation.
  import Sidebar from "$lib/ui/organisms/Sidebar.svelte";
  import MobileNav from "$lib/dashboard/MobileNav.svelte";
  import ConfirmHost from "$lib/dashboard/ui/ConfirmHost.svelte";
  import Toaster from "$lib/ui/components/Toaster.svelte";
  import { GuidedTour, getResumeIndex } from "$lib/tutorial";
  import ErrorState from "$lib/dashboard/ui/ErrorState.svelte";
  import { dashboardReady, dashboardMode } from "$lib/dashboard/nav";
  import { dt } from "$lib/dashboard/i18n";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import logout from "../../components/systems/requests/logout";
  import store, { saveToStore, stepsMapping } from "../../components/store";
  import askIsAuthCodeValid from "../../components/systems/requests/askIsAuthCodeValid";
  import MenuHalf from "../../components/MenuHalf/MenuHalf.svelte";
  import MenuHalfTrigger from "../../components/MenuHalf/MenuHalfTrigger.svelte";
  import { getConfigFetchResponse } from "../../components/systems/requests/getConfiguratorSession";
  import createInitialConfiguratorConfig from "../../components/systems/requests/createInitialConfiguratorConfig";
  import getAuthHeaders from "../../components/systems/requests/getAuthHeaders";
  import getLeadsForConfigurator from "../../components/systems/requests/getLeadsForConfigurator";
  import Notification from "../../components/Notification/Notification.svelte";
  import { refreshSubscribers } from "../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService";
  import LoadingScreen from "../../components/systems/loading/LoadingScreen.svelte";
  import { writable } from "svelte/store";

  let load = writable(true);
  let bootError = false;

  // Dashboard mode: signed in, at least one source, and past the onboarding steps.
  $: inDashboard = !!$store.isAuthCodeValid && ($store.config?.newsSources?.length ?? 0) > 0 && ($store.stepsIndex ?? 0) >= stepsMapping["Profile"];
  $: dashboardMode.set(inDashboard && $dashboardReady);
  $: if (typeof document !== "undefined") document.body.classList.toggle("aiban-dashboard", inDashboard && $dashboardReady);

  async function bootstrap(configuratorEmail: string) {
    try {
      let response = await getConfigFetchResponse(getAuthHeaders());
      if (!response.ok) {
        await createInitialConfiguratorConfig(getAuthHeaders());
        response = await getConfigFetchResponse(getAuthHeaders());
      }
      if (!response.ok) throw new Error(`config ${response.status}`);
      const json = await response.json();
      saveToStore({ config: json });

      // Subscribers and clicks are not needed to draw the page; failures here
      // show as empty states with a retry inside each section, not a blocked dashboard.
      const [, leadsResponse] = await Promise.allSettled([refreshSubscribers(), getLeadsForConfigurator()]);
      if (leadsResponse.status === "fulfilled" && leadsResponse.value) saveToStore({ leads: leadsResponse.value[configuratorEmail] });

      if (json?.newsSources?.[0]) {
        const { url, lead } = json.newsSources[0];
        // An owner who reloads in the middle of onboarding goes back to that step (WS3), not to the dashboard.
        let resume: number | null = null;
        try { resume = getResumeIndex(configuratorEmail); } catch { resume = null; }
        const stepsIndex = resume !== null ? resume : Math.max($store.stepsIndex ?? 0, stepsMapping["Profile"]);
        saveToStore({ newsSource: url, lead, stepsIndex });
      }
      bootError = false;
      dashboardReady.set(true);
    } catch (e) {
      console.error("[dashboard] could not load the owner's data", e);
      bootError = true;
    } finally {
      load.set(false);
    }
  }

  function retry() {
    bootError = false;
    load.set(true);
    bootstrap($store.configuratorEmail);
  }

  onMount(() => {
    // Auth values may arrive in the query (old /oauth redirect) or in the fragment (new, keeps them out of server logs).
    // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary used to read and rewrite the URL once on mount
    const params = new URLSearchParams($page.url.search);
    const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    for (const [k, v] of hashParams) if (!params.has(k)) params.set(k, v);
    const tokenId = params.get("x-auth-token-id");
    const clientId = params.get("x-auth-client-id");
    const authCode = params.get("x-auth-code") ?? getAuthHeaders()["x-auth-code"];
    const configuratorEmail = params.get("x-auth-email") ?? getAuthHeaders()["x-auth-email"];
    const picture = params.get("picture") ?? $store.picture;
    const given_name = params.get("given_name") ?? $store.given_name;

    // Drop auth params from the address bar but keep ?section= and ?tab=.
    if (params.has("x-auth-code") || params.has("x-auth-email") || params.has("x-auth-token-id") || hashParams.size > 0) {
      // eslint-disable-next-line svelte/prefer-svelte-reactivity -- local temporary used to read and rewrite the URL once on mount
      const keep = new URLSearchParams();
      for (const k of ["section", "tab"]) if (params.get(k)) keep.set(k, params.get(k)!);
      const q = keep.toString();
      window.history.replaceState({}, "", $page.url.origin + $page.url.pathname + (q ? `?${q}` : ""));
    }

    logout(false);
    saveToStore({ configuratorEmail, authCode, tokenId, clientId, picture, given_name });

    askIsAuthCodeValid(
      () => bootstrap(configuratorEmail),
      () => {
        window.location.href = "/login?message-from-developer=now+you+need+to+login+again+to+access+the+dashboard";
      },
    );

    return () => {
      dashboardReady.set(false);
      dashboardMode.set(false);
      document.body.classList.remove("aiban-dashboard");
    };
  });
</script>

<a class="skip" href="#dashboard-main">{$dt("dash.nav.skip")}</a>
<div class="dashboard-layout" class:with-nav={inDashboard && $dashboardReady}>
  {#if inDashboard && $dashboardReady}
    <Sidebar />
  {/if}
  <main id="dashboard-main" class="dashboard-layout__content" tabindex="-1">
    {#if bootError}
      <div class="boot-error">
        <ErrorState onRetry={retry} />
      </div>
    {:else}
      <slot />
    {/if}
  </main>
</div>
{#if inDashboard && $dashboardReady}
  <MobileNav />
{:else}
  <MenuHalf />
  <MenuHalfTrigger />
{/if}
<Notification />
<ConfirmHost />
{#if inDashboard && $dashboardReady}<GuidedTour />{/if}
<Toaster />
{#if $load}
  <LoadingScreen />
{/if}

<style lang="scss">
  .dashboard-layout {
    display: flex;
    min-height: calc(100dvh - var(--header-h, 0px));
    background: var(--surface-0);
    color: var(--text-1);
  }
  .dashboard-layout__content {
    flex: 1 1 auto;
    min-width: 0;
    /* Programmatic focus target for the skip link; the skip link itself shows focus. */
    &:focus { outline: none; }
    &:focus-visible { outline: none; }
  }
  .boot-error { max-width: var(--container-sm); margin: var(--space-8) auto; padding: 0 var(--gutter); }
  .skip {
    position: absolute;
    left: var(--space-3);
    top: var(--space-3);
    z-index: var(--z-toast);
    min-height: var(--control-h);
    display: inline-flex;
    align-items: center;
    padding: 0 var(--space-4);
    background: var(--surface-inverse);
    color: var(--text-inverse);
    font-size: var(--fs-sm);
    font-weight: var(--fw-medium);
    text-decoration: none;
    border-radius: var(--radius-full);
    transform: translateY(-200%);
    transition: transform var(--dur-base) var(--ease-out);
    &:focus { transform: none; outline: none; box-shadow: var(--focus-ring); }
  }
</style>
