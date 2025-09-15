<script>
  import GlobalData from "../../components/GlobalData/GlobalData.svelte";
  import SocketClient from "../../components/SocketClient.svelte";
  import { onDestroy } from "svelte";
  import { browser } from "$app/environment";
  import { isScrollingDown, saveToStore } from "../../components/store"; 
  import MainSteps from "../../components/systems/steps/StepsTowardsPublish/MainSteps.svelte";

  let lastScrollY = 0;

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
