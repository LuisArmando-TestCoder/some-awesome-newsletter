<script lang="ts">
  import Sidebar from "$lib/ui/organisms/Sidebar.svelte";
  import { collapsed } from "$lib/stores/sidebar.store";
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
  import Notification from '../../components/Notification/Notification.svelte';
  import { refreshSubscribers } from "../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService";

  onMount(async () => {
    const params = new URLSearchParams($page.url.search);

    const tokenId = params.get("x-auth-token-id");
    const clientId = params.get("x-auth-client-id");
    const authCode = params.get("x-auth-code") ?? getAuthHeaders()["x-auth-code"];
    const configuratorEmail = params.get("x-auth-email") ?? getAuthHeaders()["x-auth-email"];
    const picture = params.get("picture") ?? getAuthHeaders()["picture"];
    const given_name = params.get("given_name") ?? getAuthHeaders()["given_name"];

    if (params.size > 0) {
      const cleanUrl = $page.url.origin + $page.url.pathname;
      window.history.replaceState({}, "", cleanUrl);
    }

    logout(false);

    saveToStore({
      configuratorEmail,
      authCode,
      tokenId,
      clientId,
      picture,
      given_name
    });

    askIsAuthCodeValid(
      async () => {
        let response = await getConfigFetchResponse(getAuthHeaders());

        if (!response.ok) {
          await createInitialConfiguratorConfig(getAuthHeaders());
          response = await getConfigFetchResponse(getAuthHeaders());
        }

        const json = await response.json();

        saveToStore({ config: json });

        const [_subsRefreshResult, leadsResponse] = await Promise.all([
          refreshSubscribers(),
          getLeadsForConfigurator(),
        ]);

        if (leadsResponse) saveToStore({ leads: leadsResponse[configuratorEmail] });

        const fisrtNS = $store.config.newsSources?.[0];

        if (fisrtNS) {
          const { url, lead } = fisrtNS;
          saveToStore({
            newsSource: url,
            lead,
            stepsIndex: stepsMapping["News Sources"],
          });
          return;
        }

        setInitialNonInteractiveSlidesAutomaticSlideTime();
      },
      () => {
        window.location.href = "/login?message-from-developer=now+you+need+to+login+again+to+access+the+dashboard";
      },
    );
  });

  const goNext = (currentIndex: number) => () => {
    if (!$store.hasInteracted && $store.stepsIndex < currentIndex && $store.stepsIndex + 1 === currentIndex) {
      saveToStore({ stepsIndex: Math.min($store.stepsIndex + 1) });
    }
  };

  function setInitialNonInteractiveSlidesAutomaticSlideTime() {
    const timings = [2.5e3, 2e3, 2e3];
    let timing = 0;
    timings.forEach((waitDuration, index) => {
      if (index < $store.stepsIndex) return;
      timing += waitDuration;
      setTimeout(goNext(index + 1), timing);
    });
  }
</script>

<div
  class="dashboard-layout"
  class:collapsed={$collapsed}
  class:no-header={!($store.isAuthCodeValid && $store.config.newsSources?.length > 0)}
>
  <Sidebar />
  <main class="dashboard-layout__content" tabindex="-1">
    <slot />
  </main>
</div>

<Notification />
<MenuHalf />
<MenuHalfTrigger />

<style lang="scss">
  /* Styles remain unchanged */
  .dashboard-layout {
    background: url(https://images.pexels.com/photos/4464918/pexels-photo-4464918.jpeg);
    background-attachment: fixed;
    background-size: cover;
    background-position: center;
    --sidebar-expanded-w: 280px;
    --sidebar-collapsed-w: 80px;
    --header-h: 72px;
    display: flex;
    max-height: calc(100dvh - var(--header-h));
    &.no-header { --header-h: 0px; }
  }
  
  @media (min-width: 1025px) {
    .dashboard-layout :global(.sidebar) { flex-shrink: 0; width: var(--sidebar-expanded-w); }
    .dashboard-layout.collapsed :global(.sidebar) { width: var(--sidebar-collapsed-w); }
  }

  .dashboard-layout__content {
    flex-grow: 1;
    max-height: calc(100dvh - var(--header-h));
    overflow: hidden;
  }

  :global(body.sidebar-open) .dashboard-layout__content { pointer-events: none; }

  @media (max-width: 1024px) {
    .dashboard-layout.collapsed .dashboard-layout__content { padding-left: 0; }
  }
</style>