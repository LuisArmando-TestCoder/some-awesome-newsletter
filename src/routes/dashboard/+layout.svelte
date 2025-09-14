<script>
  import Sidebar from "$lib/ui/organisms/Sidebar.svelte";
  import { collapsed } from "$lib/stores/sidebar.store";
</script>

<div class="dashboard-layout" class:collapsed={$collapsed}>
  <Sidebar />
  <main class="dashboard-layout__content" tabindex="-1">
    <slot />
  </main>
</div>

<style lang="scss">
  .dashboard-layout {
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
    padding: var(--space-md) var(--space-lg);
    max-height: inherit;
    overflow-y: auto;
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
    :global(body.sidebar-open) .dashboard-layout__content { pointer-events: none; }
  }
</style>
