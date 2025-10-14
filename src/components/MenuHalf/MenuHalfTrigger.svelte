<script lang="ts">
  import { isMobileMenuOpen } from "$lib/stores/mobile-menu.store";
  import X from "../X/X.svelte";

  function toggleMenu() {
    isMobileMenuOpen.update(n => !n);
  }
</script>

<div class="menu-half-trigger" class:open={$isMobileMenuOpen} on:click={toggleMenu}>
  <X isChecked={$isMobileMenuOpen} trigger={() => {}} />
</div>

<style lang="scss">
  .menu-half-trigger {
    position: fixed;
    top: 1.25rem;
    right: 1rem;
    z-index: 3;
    display: none;
  }

  @media (max-width: 1023px) {
    .menu-half-trigger {
      display: block;
    }
  }
</style>
