<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { browser } from '$app/environment';
    import { get } from 'svelte/store';
    import { onDestroy } from 'svelte';

    export let showModal: Writable<boolean>;
    export let onChange: (value: boolean) => void = () => {};

    let visible: boolean;
    let unsubscribe: () => void | undefined;

    if (browser) {
        let first = true;
        unsubscribe = showModal.subscribe((value) => {
            visible = value;
            if (first) {
                first = false;
                return;
            }
            onChange(value);
        });
        onDestroy(() => {
            if (unsubscribe) unsubscribe();
        });
    } else {
        visible = get(showModal);
    }

    function close() {
        showModal.set(false);
    }
</script>

{#if visible}
    <div class="modal-backdrop" on:click={close}>
        <div class="modal-content" on:click|stopPropagation>
            <button class="close-button" on:click={close}>×</button>
            <slot></slot>
        </div>
    </div>
{/if}

<style>
    .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        position: relative;
        background: white;
        padding: 40px 20px 20px 20px;
        border-radius: 8px;
        max-width: 80vw;
        overflow-y: auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        border: none;
        background: transparent;
        font-size: 1.5rem;
        cursor: pointer;
        color: #333;
        z-index: 1001;
    }

    .close-button:hover {
        color: #000;
    }
</style>