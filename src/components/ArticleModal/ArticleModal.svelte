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
                <button class="close-button" type="button" aria-label="Close" on:click={handleClose}><svg viewBox="0 0 16 16" aria-hidden="true"><path d="M4 4l8 8M12 4l-8 8" /></svg></button>
                <div class="modal-content-inner">
                    <h2>{getTitle(article.content)}</h2>
                    <p class="modal-meta"><small>{$t['articleModal.created']}: {article.creation} | {$t['articleModal.language']}: {article.language}</small></p>
                    <!-- eslint-disable-next-line svelte/no-at-html-tags -- content passes through sanitizeHtml -->
                    {@html sanitizeHtml(article.content)}
                </div>
            </div>
        </div>
    {/if}
</Modal>

<style>
    /* Reading sheet: floats, so it gets the large shadow. Enters with @starting-style. */
    .modal-overlay {
        position: fixed;
        inset: 0;
        background: var(--surface-overlay);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: var(--z-modal);
        padding: var(--space-4);
        transition: opacity var(--dur-base) var(--ease-out);
    }

    .modal-content {
        position: relative;
        background: var(--surface-0);
        color: var(--text-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-2xl);
        box-shadow: var(--shadow-3);
        width: min(100%, 52rem);
        max-height: 88vh;
        overflow: hidden;
        transition:
            opacity var(--dur-slow) var(--ease-out),
            transform var(--dur-slow) var(--ease-out);
    }

    @starting-style {
        .modal-overlay {
            opacity: 0;
        }
        .modal-content {
            opacity: 0;
            transform: translateY(12px) scale(0.98);
        }
    }

    .modal-content:focus {
        outline: none;
    }

    .modal-content-inner {
        padding: var(--space-8) var(--space-7) var(--space-7);
        max-height: 88vh;
        overflow-y: auto;
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
        font-size: var(--fs-lg);
        line-height: 1.65;
    }

    .modal-content-inner > :global(*) {
        max-width: 68ch;
    }

    .modal-content-inner :global(img) {
        display: block;
        max-width: 100%;
        height: auto;
        border-radius: var(--radius-lg);
    }

    .modal-content-inner :global(a) {
        color: var(--text-link);
    }

    .modal-meta {
        margin: 0 0 var(--space-6);
        padding-bottom: var(--space-4);
        border-bottom: 1px solid var(--border-1);
        color: var(--text-3);
        font-size: var(--fs-sm);
        font-variant-numeric: tabular-nums;
    }

    .modal-meta small {
        font-size: inherit;
    }

    .close-button {
        position: absolute;
        top: var(--space-4);
        right: var(--space-4);
        width: var(--control-h);
        height: var(--control-h);
        display: grid;
        place-items: center;
        padding: 0;
        background: var(--surface-glass);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-full);
        cursor: pointer;
        color: var(--text-1);
        z-index: 1;
        transition:
            background-color var(--t-out) var(--ease-out),
            transform var(--dur-base) var(--ease-out);
    }

    .close-button svg {
        width: 1rem;
        height: 1rem;
        fill: none;
        stroke: currentColor;
        stroke-width: 1.75;
        stroke-linecap: round;
    }

    @media (hover: hover) and (pointer: fine) {
        .close-button:hover {
            background: var(--surface-2);
            transition-duration: var(--t-in);
        }
    }

    .close-button:active {
        transform: scale(0.95);
        transition-duration: 60ms;
    }

    .close-button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
    }

    h2 {
        margin: 0 var(--space-8) var(--space-3) 0;
        font-family: var(--font-display);
        font-size: var(--fs-3xl);
        font-weight: var(--fw-semibold);
        line-height: var(--lh-tight);
        letter-spacing: var(--tracking-display);
        text-wrap: balance;
    }

    @media (max-width: 30rem) {
        .modal-overlay {
            align-items: flex-end;
            padding: 0;
        }

        .modal-content {
            border-radius: var(--radius-xl) var(--radius-xl) 0 0;
            max-height: 92vh;
        }

        .modal-content-inner {
            max-height: 92vh;
            padding: var(--space-7) var(--space-4) calc(var(--space-6) + env(safe-area-inset-bottom));
            font-size: var(--fs-md);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .close-button:active {
            transform: none;
        }
    }
</style>
