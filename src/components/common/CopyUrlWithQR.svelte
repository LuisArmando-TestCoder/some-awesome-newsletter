<script lang="ts">
    import { onMount } from "svelte";
    import QRCode from "qrcode";
    import { t } from "$lib/i18n/dashboard-translations";

    export let configuratorEmail: string = "";
    export let newsSourceId: string = "";
    export let lead: string | undefined | null = ""; // Handle potential undefined/null
    export let fullUrl: string = "";
    export let label: string = "";
    let qrCodeDataUrl = "";
    let copyButtonText = $t['copyUrlWithQR.copyUrl'];
    let downloadButtonText = $t['copyUrlWithQR.downloadQr'];

    // Reactive statement to update URL and QR code when props change
    $: {
        const leadParam = lead ? `&lead=${encodeURIComponent(lead)}` : "";
        fullUrl = fullUrl || `https://aiban.news/subscribe?configuratorId=${encodeURIComponent(configuratorEmail)}&newsSourceId=${encodeURIComponent(newsSourceId)}${leadParam}`;
        generateQrCode(fullUrl);
    }

    async function generateQrCode(url: string) {
        if (!url) return;
        try {
            qrCodeDataUrl = await QRCode.toDataURL(url, {
                errorCorrectionLevel: "H", // High error correction
                type: "image/png",
                margin: 2, // Smaller margin
                scale: 4, // Adjust scale for size if needed
            });
        } catch (err) {
            console.error("Failed to generate QR code:", err);
            qrCodeDataUrl = ""; // Reset on error
        }
    }

    let copyState: "idle" | "success" | "error" = "idle";

    async function copyUrl() {
        if (!navigator.clipboard) {
            alert("Your browser blocked copying. Select the link and copy it by hand."); // Basic fallback
            return;
        }
        try {
            await navigator.clipboard.writeText(fullUrl);
            copyButtonText = $t['copyUrlWithQR.copied'];
            copyState = "success";
            setTimeout(() => {
                copyButtonText = $t['copyUrlWithQR.copyUrl'];
                copyState = "idle";
            }, 1500); // Reset text after 1.5 seconds
        } catch (err) {
            console.error("Failed to copy URL:", err);
            copyButtonText = $t['copyUrlWithQR.failed'];
            copyState = "error";
            setTimeout(() => {
                copyButtonText = $t['copyUrlWithQR.copyUrl'];
                copyState = "idle";
            }, 1500);
        }
    }

    function downloadQr() {
        if (!qrCodeDataUrl) return;
        try {
            const link = document.createElement("a");
            link.href = qrCodeDataUrl;
            link.download = `qrcode-${newsSourceId || "subscription"}.png`; // Filename
            document.body.appendChild(link); // Required for Firefox
            link.click();
            document.body.removeChild(link);
            downloadButtonText = $t['copyUrlWithQR.downloaded'];
            setTimeout(() => {
                downloadButtonText = $t['copyUrlWithQR.downloadQr'];
            }, 1500);
        } catch (err) {
            console.error("Failed to download QR code:", err);
            downloadButtonText = $t['copyUrlWithQR.failed'];
            setTimeout(() => {
                downloadButtonText = $t['copyUrlWithQR.downloadQr'];
            }, 1500);
        }
    }

    // Generate QR on mount in case props are immediately available
    onMount(() => {
        if (fullUrl) {
            generateQrCode(fullUrl);
        }
    });
</script>

<div class="copy-url-container">
    <div class="controls">
        {#if qrCodeDataUrl}
            <div class="qr-section">
                <img
                    src={qrCodeDataUrl}
                    alt="QR code for your signup link"
                    class="qr-image"
                />
                <div class="actions">
                    <button type="button" on:click={copyUrl} class="copy-button" data-state={copyState}
                        ><span class="mark" aria-hidden="true"></span>{copyButtonText}</button
                    >
                    <button type="button" on:click={downloadQr} class="download-button"
                        >{downloadButtonText}</button
                    >
                </div>
                <a on:click={copyUrl} href={fullUrl} target="_blank" rel="noopener">
                    {label}
                </a>
                <span class="sr-only" role="status">{copyState === "idle" ? "" : copyButtonText}</span>
            </div>
        {:else}
            <p>{$t['copyUrlWithQR.generating']}</p>
        {/if}
    </div>
</div>

<style lang="scss">
    a {
        color: var(--text-link);
        font-weight: var(--fw-medium);
        overflow-wrap: anywhere;
    }

    .copy-url-container {
        max-width: 100%;
        padding: var(--space-4);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-lg);
        background: var(--surface-1);
        font-family: var(--font-body);
        font-size: var(--fs-sm);
    }

    .controls {
        display: flex;
        flex-direction: column;
        gap: var(--space-4);
        align-items: flex-start;
    }

    .qr-section {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: var(--space-3) var(--space-4);
    }

    .qr-image {
        display: block;
        width: 3.5rem;
        height: auto;
        padding: var(--space-1);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-sm);
        background: #ffffff; /* QR codes need a white quiet zone in both themes */
    }

    .actions {
        display: flex;
        flex-wrap: wrap;
        gap: var(--space-2);
    }

    /* Secondary buttons with every state: hover layer, focus ring, press, success and error. */
    button {
        position: relative;
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        min-height: var(--control-h-sm);
        padding: 0 var(--space-4);
        border: 1px solid var(--border-2);
        border-radius: var(--radius-full);
        background: var(--surface-0);
        color: var(--text-1);
        font-size: var(--fs-sm);
        font-weight: var(--fw-medium);
        cursor: pointer;
        transition:
            background-color var(--t-out) var(--ease-out),
            border-color var(--t-out) var(--ease-out),
            transform var(--t-out) var(--ease-out);
    }
    @media (hover: hover) and (pointer: fine) {
        button:hover {
            background: var(--surface-2);
            transition-duration: var(--t-in);
        }
    }
    button:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring);
    }
    button:active {
        transform: scale(0.97);
        background: var(--surface-3);
        transition-duration: 0ms;
    }
    .mark {
        display: none;
    }
    button[data-state="success"] {
        border-color: var(--success);
        color: var(--success);
    }
    button[data-state="success"] .mark {
        display: inline-block;
        width: 0.7em;
        height: 0.4em;
        border-left: 2px solid currentColor;
        border-bottom: 2px solid currentColor;
        transform: translateY(-0.1em) rotate(-45deg);
    }
    button[data-state="error"] {
        border-color: var(--danger);
        color: var(--danger);
    }
    button[data-state="error"] .mark {
        display: inline-block;
        font-weight: var(--fw-bold);
    }
    button[data-state="error"] .mark::before {
        content: "!";
    }
    @media (prefers-reduced-motion: reduce) {
        button:active {
            transform: none;
        }
    }
</style>
