<script lang="ts">
    import { onMount, tick } from "svelte";
    import { scale } from "svelte/transition";
    import { language } from "$lib/stores/language.store";
    import { globalLanguage, saveToStore } from "../../../components/store";

    // Only the code list comes from here. Each translation namespace loads its own
    // locale file when the language store changes (src/lib/i18n/lazy.ts), so this
    // component no longer bundles every language of every namespace.
    import { locales as availableCodes, t as t2 } from "$lib/i18n/translations";
    import { htmlLang } from "$lib/i18n/lazy";
    import { detectLanguage, rememberChoice } from "$lib/i18n/detect";
    import languagesData from "../../../components/systems/inputs/Language/languages";
    import { isRtl } from "../../../components/systems/widgets/Subscribe/subscribe";
    import { dashboardMode } from "$lib/dashboard/nav";

    const availableLanguages = languagesData.filter((l) =>
        availableCodes.includes(l.code),
    );

    let isOpen = false;
    let root: HTMLElement;
    let trigger: HTMLButtonElement;
    const MENU_ID = "lang-picker-menu";
    /** True while a footer link or button sits under the floating button: it steps aside. */
    let tucked = false;
    let raf = 0;
    let menuDuration = 160;

    function prefersReducedMotion() {
        if (typeof window === "undefined") return false;
        return (
            window.matchMedia?.("(prefers-reduced-motion: reduce)").matches ||
            document.documentElement.dataset.motion === "reduced"
        );
    }

    function options() {
        return Array.from(root?.querySelectorAll<HTMLButtonElement>(".lang-picker__option") ?? []);
    }

    function closeMenu(focusTrigger = false) {
        isOpen = false;
        if (focusTrigger) trigger?.focus();
        scheduleOverlapCheck();
    }

    function onKeydown(event: KeyboardEvent) {
        if (!isOpen) return;
        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu(true);
            return;
        }
        // Tab leaves the menu: close it and let focus move on as usual.
        if (event.key === "Tab") {
            closeMenu(false);
            return;
        }
        const list = options();
        if (!list.length) return;
        const idx = list.indexOf(document.activeElement as HTMLButtonElement);
        let next = -1;
        if (event.key === "ArrowDown") next = (idx + 1) % list.length;
        else if (event.key === "ArrowUp") next = (idx - 1 + list.length) % list.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = list.length - 1;
        if (next < 0) return;
        event.preventDefault();
        list[next].focus();
    }

    function onWindowClick(event: MouseEvent) {
        if (isOpen && root && !root.contains(event.target as Node)) closeMenu();
    }

    async function toggleMenu() {
        menuDuration = prefersReducedMotion() ? 0 : 160;
        isOpen = !isOpen;
        tucked = false;
        if (isOpen) {
            await tick();
            const active =
                root?.querySelector<HTMLButtonElement>(".lang-picker__option--active") ??
                root?.querySelector<HTMLButtonElement>(".lang-picker__option");
            active?.focus();
            active?.scrollIntoView({ block: "nearest" });
        }
    }

    /* Never cover the footer: when a footer link or button passes under the button
       (the closing "Start free" on phones, the legal row), the button steps aside until it has passed. */
    function scheduleOverlapCheck() {
        if (typeof window === "undefined" || raf) return;
        raf = requestAnimationFrame(checkOverlap);
    }

    function checkOverlap() {
        raf = 0;
        if (!root || isOpen || document.activeElement === trigger) {
            tucked = false;
            return;
        }
        const box = root.getBoundingClientRect();
        const pad = 8;
        const targets = document.querySelectorAll<HTMLElement>("footer a[href], footer button");
        let hit = false;
        for (const el of targets) {
            const r = el.getBoundingClientRect();
            if (r.width === 0 && r.height === 0) continue;
            if (
                r.bottom > box.top - pad &&
                r.top < box.bottom + pad &&
                r.right > box.left - pad &&
                r.left < box.right + pad
            ) {
                hit = true;
                break;
            }
        }
        tucked = hit;
    }

    function setLanguage(code: string, chosen = false) {
        // 1. Update the standalone store
        language.set(code);
        
        // 2. Update the simple globalLanguage store
        globalLanguage.set(code);

        // 3. Update the complex main store and trigger persistence
        // This ensures components reading from the 'store' object see the change
        saveToStore({ 
            globalLanguage: code,
            appLanguage: code,
            dashboardLanguage: code
        });

        // 4. The translation stores follow `language` and load the locale file on demand
        // (src/lib/i18n/lazy.ts). English stays loaded, so missing keys fall back to it.

        // 5. Page language and direction, for screen readers and right-to-left scripts
        if (typeof document !== "undefined") {
            document.documentElement.lang = htmlLang(code); // "jp" is the app's code; the HTML lang tag is "ja"
            document.documentElement.dir = isRtl(code) ? "rtl" : "ltr";
        }

        // 5. Persistence: only an explicit pick in this menu is saved. Detection is not,
        // so it follows the browser language next time (src/lib/i18n/detect.ts).
        if (chosen) rememberChoice(code);

        closeMenu(isOpen);
    }

    onMount(() => {
        // Saved pick first, then the browser's preferred languages in order, then English.
        setLanguage(detectLanguage(availableCodes).code);
        scheduleOverlapCheck();
        return () => {
            if (raf) cancelAnimationFrame(raf);
        };
    });

    $: currentLang = availableLanguages.find((l) => l.code === $language) || availableLanguages[0];
</script>

<svelte:window on:click={onWindowClick} on:scroll={scheduleOverlapCheck} on:resize={scheduleOverlapCheck} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
    class="lang-picker"
    class:lang-picker--above-nav={$dashboardMode}
    class:lang-picker--tucked={tucked}
    bind:this={root}
    on:keydown={onKeydown}
>
    {#if isOpen}
        <div
            id={MENU_ID}
            class="lang-picker__menu"
            role="menu"
            aria-label={$t2?.nav?.chooseLanguage ?? "Choose a language"}
            transition:scale={{ start: 0.96, opacity: 0, duration: menuDuration }}
        >
            <div class="lang-picker__scroll-area">
                {#each availableLanguages as lang (lang.code)}
                    {@const selected = $language === lang.code}
                    <button
                        type="button"
                        role="menuitemradio"
                        class="lang-picker__option"
                        class:lang-picker__option--active={selected}
                        aria-checked={selected}
                        tabindex={selected ? 0 : -1}
                        lang={lang.code}
                        on:click={() => setLanguage(lang.code, true)}
                    >
                        <span class="lang-picker__check" aria-hidden="true">
                            {#if selected}
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12l5 5L20 7" /></svg>
                            {/if}
                        </span>
                        <span class="lang-picker__name">{lang.name}</span>
                        <span class="lang-picker__code" aria-hidden="true">{lang.code.toUpperCase()}</span>
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <button
        bind:this={trigger}
        type="button"
        class="lang-picker__trigger"
        on:click|stopPropagation={toggleMenu}
        on:blur={scheduleOverlapCheck}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={isOpen ? MENU_ID : undefined}
        aria-label={($t2?.nav?.currentLanguage ?? "Language: {name}").replace("{name}", currentLang?.name ?? "English")}
    >
        <svg class="lang-picker__globe" aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
        <span class="lang-picker__current-code">{currentLang?.code.toUpperCase() ?? "EN"}</span>
        <svg class="lang-picker__chevron chevron" aria-hidden="true" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M6 15l6-6 6 6" /></svg>
    </button>
</div>

<style lang="scss">
    .lang-picker {
        --lp-edge: var(--space-4);
        position: fixed;
        right: calc(var(--lp-edge) + env(safe-area-inset-right, 0px));
        bottom: calc(var(--lp-edge) + env(safe-area-inset-bottom, 0px));
        z-index: 900; /* above page content, below the header (1000) and its full-screen menu */
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-2);
        font-family: var(--font-body);
    }

    /* ---------- Trigger: a small floating glass pill ---------- */
    .lang-picker__trigger {
        display: inline-flex;
        align-items: center;
        gap: var(--space-2);
        min-height: 2.75rem;
        padding: 0 var(--space-3) 0 var(--space-4);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-full);
        background: var(--surface-glass);
        -webkit-backdrop-filter: blur(16px) saturate(1.4);
        backdrop-filter: blur(16px) saturate(1.4);
        color: var(--text-1);
        box-shadow: var(--shadow-2);
        font-size: var(--fs-xs);
        font-weight: var(--fw-semibold);
        letter-spacing: 0.02em;
        font-variant-numeric: tabular-nums;
        cursor: pointer;
        -webkit-tap-highlight-color: transparent;
        transition:
            background-color var(--t-out) var(--ease-out),
            border-color var(--t-out) var(--ease-out),
            opacity var(--dur-base) var(--ease-out),
            transform var(--dur-base) var(--ease-out),
            visibility 0s linear 0s;
    }
    .lang-picker__current-code {
        min-width: 2ch;
        text-align: center;
    }
    .lang-picker__chevron {
        color: var(--text-2);
        transition: transform var(--dur-slow) var(--ease-out);
    }

    .lang-picker__trigger[aria-expanded='true'] {
        border-color: var(--text-1);
        background: var(--surface-0);

        .lang-picker__chevron {
            transform: rotate(180deg);
            color: var(--text-1);
        }
    }

    @media (hover: hover) and (pointer: fine) {
        .lang-picker__trigger:hover {
            background: color-mix(in srgb, var(--text-1) var(--state-hover), var(--surface-0));
            border-color: var(--border-2);
            transition-duration: var(--t-in);
        }
        .lang-picker__trigger:hover .lang-picker__globe {
            transform: rotate(-12deg);
        }
    }
    .lang-picker__globe {
        transition: transform var(--dur-base) var(--ease-out);
    }
    .lang-picker__trigger:active {
        background: color-mix(in srgb, var(--text-1) var(--state-press), var(--surface-0));
        transform: scale(0.97);
        transition-duration: 60ms;
    }
    .lang-picker__trigger:focus-visible {
        outline: none;
        box-shadow: var(--focus-ring), var(--shadow-2);
    }

    /* While a footer link passes under it, the button fades back and lets taps through to the
       link. It stays in the tab order and comes back to full strength on keyboard focus. */
    .lang-picker--tucked .lang-picker__trigger {
        opacity: 0.2;
        pointer-events: none;
        transition: opacity var(--dur-base) var(--ease-out);
    }
    .lang-picker--tucked .lang-picker__trigger:focus-visible {
        opacity: 1;
        pointer-events: auto;
    }

    /* ---------- Menu ---------- */
    .lang-picker__menu {
        display: flex;
        flex-direction: column;
        min-width: 14rem;
        max-width: calc(100vw - 2 * var(--lp-edge));
        max-height: min(60svh, 26rem);
        border: 1px solid var(--border-1);
        border-radius: var(--radius-lg);
        background: var(--surface-0);
        box-shadow: var(--shadow-3);
        overflow: hidden;
        transform-origin: 100% 100%;
    }

    .lang-picker__scroll-area {
        overflow-y: auto;
        padding: var(--space-2);
        overscroll-behavior: contain;
        scrollbar-gutter: stable;
    }

    .lang-picker__option {
        display: grid;
        grid-template-columns: 1.25rem minmax(0, 1fr) auto;
        align-items: center;
        gap: var(--space-3);
        width: 100%;
        min-height: 2.75rem;
        padding: 0 var(--space-3);
        border: 0;
        border-radius: var(--radius-sm);
        background: transparent;
        color: var(--text-1);
        font-size: var(--fs-sm);
        text-align: left;
        cursor: pointer;
        transition: background-color var(--t-out) var(--ease-out);

        &:focus-visible {
            outline: 2px solid var(--focus-color);
            outline-offset: -2px;
        }
        &:active {
            background: color-mix(in srgb, currentColor var(--state-press), transparent);
            transition-duration: 0ms;
        }
    }
    @media (hover: hover) and (pointer: fine) {
        .lang-picker__option:hover {
            background: color-mix(in srgb, currentColor var(--state-hover), transparent);
            transition-duration: var(--t-in);
        }
    }

    /* Selected: check mark and weight, plus a quiet fill. */
    .lang-picker__option--active {
        background: color-mix(in srgb, currentColor var(--state-selected), transparent);
        font-weight: var(--fw-semibold);
    }

    .lang-picker__check {
        display: grid;
        place-items: center;
        color: var(--text-1);
    }

    .lang-picker__name {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .lang-picker__code {
        color: var(--text-3);
        font-size: var(--fs-xs);
        font-weight: var(--fw-medium);
        font-variant-numeric: tabular-nums;
    }

    @media (max-width: 40rem) {
        .lang-picker {
            --lp-edge: var(--space-3);
        }
    }

    /* WS10: on phones the dashboard has a bottom bar (MobileNav, 56px tall). Sit above it and
       below its "More" sheet so the picker never covers a navigation item. */
    @media (max-width: 767px) {
        .lang-picker--above-nav {
            bottom: calc(56px + var(--space-3) + env(safe-area-inset-bottom, 0px));
            z-index: calc(var(--z-drawer, 40) - 1);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .lang-picker__trigger:active {
            transform: none;
        }
        .lang-picker--tucked .lang-picker__trigger {
            transform: none;
        }
    }
    :global(:root[data-motion='reduced']) .lang-picker__trigger:active,
    :global(:root[data-motion='reduced']) .lang-picker--tucked .lang-picker__trigger {
        transform: none;
    }

    @media (forced-colors: active) {
        .lang-picker__trigger {
            border-color: ButtonText;
        }
        .lang-picker__option--active {
            forced-color-adjust: none;
            background: Highlight;
            color: HighlightText;
        }
    }

    @media print {
        .lang-picker {
            display: none;
        }
    }
</style>
