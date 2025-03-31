<script lang="ts">
  import MenuHalf from "../MenuHalf/MenuHalf.svelte";
  import store, { saveToStore } from "../store.ts";
  import SVG from "../SVG/SVG.svelte";
  import ThemeChanger from "../ThemeChanger/ThemeChanger.svelte";

  let menuOpen = false;
</script>

<header class="nav-header">
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
