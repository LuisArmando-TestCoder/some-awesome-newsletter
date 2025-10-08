<script lang="ts">
    import type { Writable } from 'svelte/store';

    export let show: Writable<boolean>;
</script>

<div class="container-content">
    <button class="close-button" on:click={() => show.set(false)}>→</button>
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
    }

    .close-button {
        position: absolute;
        bottom: 10px;
        left: 10px;
        border: none;
        background: transparent;
        font-size: 2rem;
        cursor: pointer;
        color: #333;
        z-index: 1001;
        transform: scaleX(1.5);
        line-height: 1;
        width: fit-content;
    }

    .close-button:hover {
        color: #000;
    }
</style>
