<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { browser } from "$app/environment"; // Import browser check
  import MenuHalf from "../MenuHalf/MenuHalf.svelte";
  import store, { saveToStore } from "../store.ts";
  import SVG from "../SVG/SVG.svelte";
  import ThemeChanger from "../ThemeChanger/ThemeChanger.svelte";

  let menuOpen = false;
  let lastScrollY = 0;
  let scrollingDown = false;
  let headerVisible = true; // Start visible

  function handleScroll() {
    const currentScrollY = window.scrollY;
    // Add a threshold to prevent hiding on small scrolls or bounces
    if (Math.abs(currentScrollY - lastScrollY) > 10) {
      // Only hide after scrolling down a bit and if authenticated
      scrollingDown = currentScrollY > lastScrollY && currentScrollY > 50 && $store.isAuthCodeValid;
    }
    // Always reset scrollingDown if scrolling up or near the top
    if (currentScrollY < lastScrollY || currentScrollY <= 50) {
       scrollingDown = false;
    }
    lastScrollY = currentScrollY;
  }

  onMount(() => {
    if (browser) { // Only run in browser
      lastScrollY = window.scrollY; // Initialize lastScrollY
      window.addEventListener("scroll", handleScroll, { passive: true });
    }
  });

  onDestroy(() => {
    if (browser) { // Only run in browser
      window.removeEventListener("scroll", handleScroll);
    }
  });

  // Logic: Show if not authenticated OR if not scrolling down
  $: headerVisible = !$store.isAuthCodeValid || !scrollingDown;

</script>

<header class="nav-header" class:hidden={!headerVisible}>
  <nav>
    <div class="menu {menuOpen ? 'open' : ''}">
      <section class="menu-section left">
        <a
          class="menu-item hide-on-mobile"
          onclick={() => {
            saveToStore({ stepsIndex: 7 });
          }}>Config</a
        >
        <a
          class="menu-item hide-on-mobile"
          onclick={() => {
            saveToStore({ stepsIndex: 8 });
          }}>News Sources</a
        >
        <a
          class="menu-item hide-on-mobile"
          onclick={() => {
            saveToStore({ stepsIndex: 9 });
          }}>Users</a
        >
        <section class="menu-x hide-on-desktop interactive">
          <ThemeChanger visible={true} />
        </section>
      </section>
      <section class="menu-section center">
        <a
          onclick={() => {
            saveToStore({ stepsIndex: 0, directionsThatShouldDisappear: [] });
          }}
        >
          <SVG src="./icons/AIBA.svg" />
        </a>
      </section>
      <section class="menu-section right">
        <div class="menu-x hide-on-desktop interactive">
          <MenuHalf />
        </div>
        <section class="menu-x hide-on-mobile interactive">
          <ThemeChanger visible={true} />
        </section>
      </section>
    </div>
  </nav>
</header>

<style lang="scss">
  @use "Header.scss";
</style>
