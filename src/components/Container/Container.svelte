<script lang="ts">
    import { isMobileMenuOpen } from '$lib/stores/mobile-menu.store';

    // When false the container is hidden (kept in the DOM so its content keeps state).
    export let show: boolean = true;
</script>

<div class="container-content" class:collapsed={$isMobileMenuOpen} hidden={!show}>
    <slot></slot>
</div>

<style>
    .container-content {
        position: relative;
        width: 100%;
        height: 80vh;
        overflow-y: auto;
        padding: var(--space-6) var(--space-5) var(--space-5);
        background: var(--surface-1);
        color: var(--text-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-lg);
        box-shadow: var(--shadow-2);
        transition: transform var(--dur-slow) var(--ease-out);
    }

    .container-content[hidden] {
        display: none;
    }

    .collapsed {
        transform: translateX(100%);
    }
</style>
