<script>
  import Sidebar from "$lib/ui/organisms/Sidebar.svelte";
  import { collapsed } from "$lib/stores/sidebar.store";
</script>

<div class="dashboard-layout" class:collapsed={$collapsed}>
  <Sidebar />
  <main class="dashboard-layout__content">
    <slot />
  </main>
</div>

<style lang="scss">
  .dashboard-layout {
    display: grid;
    grid-template-columns: calc(250px + var(--space-md) * 2) 1fr;
    transition: grid-template-columns 0.3s ease;

    &__content {
      padding: var(--space-md) var(--space-lg);
    }

    &.collapsed {
      grid-template-columns: var(--collapsed-width, calc(40px + var(--space-md) * 2)) 1fr;
    }
  }
</style>
