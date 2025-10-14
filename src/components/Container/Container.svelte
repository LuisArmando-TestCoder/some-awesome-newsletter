<script lang="ts">
    import { isMobileMenuOpen } from '$lib/stores/mobile-menu.store';
</script>

<div class="container-content" class:collapsed={$isMobileMenuOpen}>
    <slot></slot>
</div>

<style>
    .container-content {
        position: relative;
        background: white;
        padding: 40px 20px 20px 20px;
        border-radius: 8px;
        width: 100%;
        height: 80vh;
        overflow-y: auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        transition: transform 0.3s ease;
    }

    .collapsed {
        transform: translateX(100%);
    }
</style>
