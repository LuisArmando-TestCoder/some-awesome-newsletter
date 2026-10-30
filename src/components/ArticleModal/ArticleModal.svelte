<script lang="ts">
  import { sanitizeHtml } from '$lib/utils/sanitizeHtml';
    import Modal from "../Modal/Modal.svelte"; // adjust path if needed
    import { t } from "$lib/i18n/dashboard-translations";
    import { writable } from "svelte/store";

    /** Controls the modal's visibility (two-way bound from parent). */
    export let show = false;
    const showModal = writable(show);
    $: showModal.set(show);

    /** The article to render inside the modal. */
    export let article: {
        id: string;
        content: string;
        creation: string;
        language: string;
    } | null = null;

    function handleClose() {
        show = false;
    }

    function getTitle(content: string) {
        const div = document.createElement("div");
        div.innerHTML = content;
        const h1 = div.querySelector("h1")?.innerText;
        const h2 = div.querySelector("h2")?.innerText;
        return h1 ? (h1.length >= (h2?.length || 0) ? h1 : h2) : h2 || $t['articleModal.article'];
    }
</script>

<Modal {showModal}>
    {#if article && show}
        <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
        <div class="modal-overlay" on:click={handleClose}>
            <!-- svelte-ignore a11y_click_events_have_key_events -->
            <div class="modal-content" role="dialog" aria-modal="true" tabindex="-1" on:click|stopPropagation>
                <button class="close-button" type="button" aria-label="Close" on:click={handleClose}><span aria-hidden="true">×</span></button>
                <div class="modal-content-inner">
                    <h2>{getTitle(article.content)}</h2>
                    <p><small>{$t['articleModal.created']}: {article.creation} | {$t['articleModal.language']}: {article.language}</small></p>
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
                    {@html sanitizeHtml(article.content)}
                </div>
            </div>
        </div>
    {/if}
</Modal>

<style>
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: var(--surface-overlay, rgba(0, 0, 0, 0.5));
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: var(--z-modal, 1000);
        padding: var(--space-4, 16px);
    }

    .modal-content {
        position: relative;
        background: var(--surface-1, #fff);
        color: var(--text-1, #111);
        border-radius: var(--radius-lg, 16px);
        box-shadow: var(--shadow-3, none);
        width: min(100%, 52rem);
        max-height: 85vh;
        overflow: hidden;
    }

    .modal-content-inner {
        padding: var(--space-7, 48px) var(--space-6, 32px) var(--space-6, 32px);
        max-height: 85vh;
        overflow-y: auto;
        line-height: 1.7;
    }

    .modal-content-inner :global(img) {
        max-width: 100%;
        height: auto;
        border-radius: var(--radius-md, 8px);
    }

    .close-button {
        position: absolute;
        top: var(--space-3, 12px);
        right: var(--space-3, 12px);
        width: 2.5rem;
        height: 2.5rem;
        display: grid;
        place-items: center;
        background: var(--surface-1, #fff);
        border: 1px solid var(--border-1, #e5e5e5);
        border-radius: var(--radius-full, 999px);
        font-size: var(--fs-xl, 1.5rem);
        line-height: 1;
        cursor: pointer;
        color: var(--text-2, #444);
        z-index: 1;
    }

    .close-button:hover {
        color: var(--text-1, #111);
        background: var(--surface-2, #f3f3f3);
    }

    .close-button:focus-visible {
        outline: 2px solid var(--focus-color, #2563eb);
        outline-offset: 2px;
    }

    h2 {
        margin-top: 0;
        font-family: var(--font-display, inherit);
        font-size: var(--fs-2xl, 1.75rem);
        line-height: var(--lh-tight, 1.2);
    }
</style>
