<script lang="ts">
  import Sidebar from "$lib/ui/organisms/Sidebar.svelte";
  import { collapsed } from "$lib/stores/sidebar.store";
  import { page } from "$app/stores";
  import { onMount } from "svelte";
  import logout from "../../components/systems/requests/logout";
  import store, { saveToStore, stepsMapping } from "../../components/store";
  import askIsAuthCodeValid from "../../components/systems/requests/askIsAuthCodeValid";
  import { getConfigFetchResponse } from "../../components/systems/requests/getConfiguratorSession";
  import createInitialConfiguratorConfig from "../../components/systems/requests/createInitialConfiguratorConfig";
  import getAuthHeaders from "../../components/systems/requests/getAuthHeaders";
  import { refreshSubscribers } from "../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserDataService";
  import getLeadsForConfigurator from "../../components/systems/requests/getLeadsForConfigurator";

  onMount(() => {
    console.log("hi")
    const params = new URLSearchParams($page.url.search);

    const tokenId =
      params.get("x-auth-token-id");
    const clientId =
      params.get("x-auth-client-id");
    const authCode =
      params.get("x-auth-code") ?? getAuthHeaders()["x-auth-code"];
    const configuratorEmail =
      params.get("x-auth-email") ?? getAuthHeaders()["x-auth-email"];
    const picture =
      params.get("picture") ?? getAuthHeaders()["picture"];
    const given_name =
      params.get("given_name") ?? getAuthHeaders()["given_name"];

    if (params.size > 0) {
      // 👉 Erase query params from the URL without reloading
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
        console.log("Valid")
        let response = await getConfigFetchResponse(getAuthHeaders());

        if (!response.ok) {
          await createInitialConfiguratorConfig(getAuthHeaders());
          response = await getConfigFetchResponse(getAuthHeaders());
        }

        const json = await response.json();

        saveToStore({
          config: json,
        });

        const [_subsRefreshResult, leadsResponse] = await Promise.all([
          refreshSubscribers(), // Use the centralized refresh function
          getLeadsForConfigurator(),
        ]);

        if (leadsResponse) saveToStore({ leads: leadsResponse[configuratorEmail] });

        const fisrtNS = $store.config.newsSources?.[0];
        console.log("$store.config", $store.config);

        if (fisrtNS) {
          const { url, lead } = fisrtNS;

          saveToStore({
            newsSource: url,
            lead,
            stepsIndex: stepsMapping["News Sources"],
          });

          return;
        }

        // HERE make el burumbum
        setInitialNonInteractiveSlidesAutomaticSlideTime();
      },
      () => {
        // console.log("JSON store", JSON.stringify($store, null, 2))
        window.location.href =
          "/login?message-from-developer=Im+watching+you+bro";
      },
    );
  });

  const goNext = (currentIndex: number) => () => {
    if (
      !$store.hasInteracted &&
      $store.stepsIndex < currentIndex &&
      $store.stepsIndex + 1 === currentIndex
    ) {
      saveToStore({
        stepsIndex: Math.min($store.stepsIndex + 1),
      });
    }
  };

  function setInitialNonInteractiveSlidesAutomaticSlideTime() {
    const timings = [2.5e3, 2e3, 2e3];
    let timing = 0;

    timings.forEach((waitDuration, index) => {
      if (index < $store.stepsIndex) return;

      timing += waitDuration;

      const wait = timing;

      setTimeout(goNext(index + 1), wait);
    });
  }
</script>

<div class="dashboard-layout" class:collapsed={$collapsed}>
  <Sidebar />
  <main class="dashboard-layout__content" tabindex="-1">
    <slot />
  </main>
</div>

<style lang="scss">
  .dashboard-layout {
    background: url(https://images.pexels.com/photos/925743/pexels-photo-925743.jpeg);
    background-attachment: fixed;
    background-size: cover;
    /* Single source of truth for widths; Sidebar also reads these */
    --sidebar-expanded-w: 280px;
    --sidebar-collapsed-w: 80px;
    --header-h: 83px;

    display: flex;

    /* Height: fallback first, then modern */
    max-height: calc(100vh - var(--header-h));
    max-height: calc(100dvh - var(--header-h));

    /* Desktop-only layout width rules */
    @media (min-width: 1025px) {
      :global(.sidebar) {
        flex-shrink: 0;
        width: var(--sidebar-expanded-w);
      }
      &.collapsed :global(.sidebar) {
        width: var(--sidebar-collapsed-w);
      }
    }
  }

  .dashboard-layout__content {
    flex-grow: 1;
    max-height: calc(100vh - 83px);
    overflow: hidden;
  }

  /* Optional: block clicks/scroll behind the mobile overlay */
  :global(body.sidebar-open) .dashboard-layout__content {
    pointer-events: none;
  }

  @media (max-width: 1024px) {
    .dashboard-layout.collapsed .dashboard-layout__content {
      padding-left: var(--sidebar-collapsed-w, 80px);
    }
    /* When expanded, we lock and dim the backdrop anyway */
    :global(body.sidebar-open) .dashboard-layout__content {
      pointer-events: none;
    }
  }
</style>
