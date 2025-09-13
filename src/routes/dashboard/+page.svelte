<script>
  import GlobalData from "../../components/GlobalData/GlobalData.svelte";
  import Header from "../../components/Header/Header.svelte";
  import ChosenShader from "../../components/ShaderToy/ChosenShader/ChosenShader.svelte";
  import SocketClient from "../../components/SocketClient.svelte";
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { isScrollingDown, saveToStore } from "../../components/store"; 
  import MainSteps from "../../components/systems/steps/StepsTowardsPublish/MainSteps.svelte";
  import { user as userStore } from "$lib/stores/user.js";
    import getAuthHeaders from "../../components/systems/requests/getAuthHeaders";

  let lastScrollY = 0;

  // Poll for browser availability and log user until onMount
  /** @type {number | undefined} */
  let pollInterval;
  let polled = false;
  if (typeof window === "undefined") {
    // SSR: do nothing
  } else {
    // In browser context (hydrated), but before onMount
    pollInterval = setInterval(() => {
      if (typeof window !== "undefined" && typeof document !== "undefined") {
        userStore.subscribe((user) => {
          if (!polled) {
            console.log("User from cookie (poll):", user);
            polled = true;
          }
        })();
        clearInterval(pollInterval);
      }
    }, 100);
  }

  function handleScroll() {
    const currentScrollY = window.scrollY;
    let scrollingDownValue = false;
    // Add a threshold to prevent hiding on small scrolls or bounces
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      // Only set scrollingDown to true after scrolling down a bit
      scrollingDownValue = currentScrollY > lastScrollY && currentScrollY > 50;
    }
    // Always reset scrollingDown if scrolling up or near the top
    if (currentScrollY < lastScrollY || currentScrollY <= 50) {
       scrollingDownValue = false;
    }
    isScrollingDown.set(scrollingDownValue); // Update the store
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (browser) { // Only run in browser
      lastScrollY = window.scrollY; // Initialize lastScrollY
      window.addEventListener("scroll", handleScroll, { passive: true });

      // Log user info from store (continuous)
      const unsubscribe = userStore.subscribe((user) => {
        console.log("User from cookie:", user);
        
        saveToStore({
          authCode: getAuthHeaders()["x-auth-code"],
          configurationEmail: getAuthHeaders()["x-auth-email"],
        });
      });
      // Clean up
      if (pollInterval) clearInterval(pollInterval);
      return () => {
        window.removeEventListener("scroll", handleScroll);
        unsubscribe();
        if (pollInterval) clearInterval(pollInterval);
      };
    }
  });

  onDestroy(() => {
    if (browser) { // Only run in browser
      window.removeEventListener("scroll", handleScroll);
    }
  });
</script>

<GlobalData />
<SocketClient />
<!-- <ChosenShader /> -->
<MainSteps />

<style lang="scss">
  @use "../styles/everything.scss";
</style>
