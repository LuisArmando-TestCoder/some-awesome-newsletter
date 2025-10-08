<script lang="ts">
    import type { Writable } from 'svelte/store';
    import { browser } from '$app/environment';
    import { get } from 'svelte/store';
    import { onDestroy } from 'svelte';

    export let showModal: Writable<boolean>;
    export let onChange: (value: boolean) => void = () => {};

    let visible: boolean;
    let closing = false;
    let unsubscribe: () => void | undefined;

    if (browser) {
        let first = true;
        unsubscribe = showModal.subscribe((value) => {
            visible = value;
            if (first) {
                first = false
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
        closing = true;
        setTimeout(() => {
            showModal.set(false);
            closing = false;
        }, 500);
    }
</script>

{#if visible}
    <div class="modal-backdrop" on:click={close}>
        <div class="modal-content" class:closing on:click|stopPropagation>
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
        background: linear-gradient(90deg, rgba(0, 20, 18, 0.5) 0%, rgba(3, 9, 27, 0.5) 50%, rgba(22, 16, 69, 0.5) 100%);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
        backdrop-filter: blur(5px);
    }

    @keyframes open-modal {
        from {
            opacity: 0;
            clip-path: inset(50% 50% 50% 50%);
        }
        to {
            opacity: 1;
            clip-path: inset(0% 0% 0% 0%);
        }
    }

    @keyframes close-modal {
        from {
            opacity: 1;
            clip-path: inset(0% 0% 0% 0%);
        }
        to {
            opacity: 0;
            clip-path: inset(50% 50% 50% 50%);
        }
    }

    .modal-content {
        position: relative;
        background: white;
        padding: 40px 20px 20px 20px;
        border-radius: 8px;
        max-width: 80vw;
        height: 80vh;
        overflow-y: auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        animation: open-modal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
    }

    .modal-content.closing {
        animation: close-modal 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
        user-select: none;
        pointer-events: none;
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
