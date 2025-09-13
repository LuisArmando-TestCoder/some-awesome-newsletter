<script lang="ts">
    import Modal from "../data/Modal/Modal.svelte"; // adjust path if needed

    /** Controls the modal’s visibility (two-way bound from parent). */
    export let show = false;

    /** The article to render inside the modal. */
    export let article: {
        id: string;
        content: string;
        creation: string;
        language: string;
    } | null = null;

    function handleClose() {
        console.log('ArticleModal: handleClose called, setting show to false');
        show = false;
    }

    function getTitle(content: string) {
        const div = document.createElement("div");
        div.innerHTML = content;
        const h1 = div.querySelector("h1")?.innerText;
        const h2 = div.querySelector("h2")?.innerText;
        return h1 ? (h1.length >= (h2?.length || 0) ? h1 : h2) : h2 || "Article";
    }

    $: if (show) {
        console.log(`ArticleModal: show prop changed to true, article present: ${!!article}`);
    } else {
        console.log('ArticleModal: show prop changed to false');
    }

    $: console.log(`ArticleModal: article prop updated, id: ${article?.id || 'none'}`);
</script>

<Modal {show}>
    {#if article && show}
        <div class="modal-overlay" on:click={handleClose}>
            <div class="modal-content" on:click|stopPropagation>
                <button class="close-button" on:click={handleClose}>×</button>
                <div class="modal-content-inner">
                    <h2>{getTitle(article.content)}</h2>
                    <p><small>Created: {article.creation} | Language: {article.language}</small></p>
                    {@html article.content}
                </div>
            </div>
        </div>
    {/if}
</Modal>

<style>
    .modal-overlay {
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
        border-radius: 8px;
        max-width: 80vw;
        max-height: 80vh;
        overflow: hidden;
    }

    .modal-content-inner {
        color: black;
        padding: 40px 20px 20px 20px;
        max-height: calc(80vh - 40px);
        overflow-y: auto;
    }

    .close-button {
        position: absolute;
        top: 10px;
        right: 10px;
        background: none;
        border: none;
        font-size: 24px;
        cursor: pointer;
        color: #333;
        z-index: 1001;
    }

    .close-button:hover {
        color: #000;
    }

    h2 {
        margin-top: 0;
    }
</style>