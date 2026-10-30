<script lang="ts">
    import { onMount, tick } from "svelte";
    import { slide } from "svelte/transition";
    import { language } from "$lib/stores/language.store";
    import store, { globalLanguage, saveToStore } from "../../../components/store";

    // Only the code list comes from here. Each translation namespace loads its own
    // locale file when the language store changes (src/lib/i18n/lazy.ts), so this
    // component no longer bundles every language of every namespace.
    import { locales as availableCodes, t as t2 } from "$lib/i18n/translations";
    import { htmlLang, normalizeCode } from "$lib/i18n/lazy";
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

    function closeMenu(focusTrigger = false) {
        isOpen = false;
        if (focusTrigger) trigger?.focus();
    }

    function onKeydown(event: KeyboardEvent) {
        if (!isOpen) return;
        if (event.key === "Escape") {
            event.preventDefault();
            closeMenu(true);
            return;
        }
        if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            const options = Array.from(
                root?.querySelectorAll<HTMLButtonElement>(".lang-picker__option") ?? [],
            );
            if (!options.length) return;
            event.preventDefault();
            const idx = options.indexOf(document.activeElement as HTMLButtonElement);
            const next =
                event.key === "ArrowDown"
                    ? (idx + 1) % options.length
                    : (idx - 1 + options.length) % options.length;
            options[next].focus();
        }
    }

    function onWindowClick(event: MouseEvent) {
        if (isOpen && root && !root.contains(event.target as Node)) closeMenu();
    }

    async function toggleMenu() {
        isOpen = !isOpen;
        if (isOpen) {
            await tick();
            const active =
                root?.querySelector<HTMLButtonElement>(".lang-picker__option--active") ??
                root?.querySelector<HTMLButtonElement>(".lang-picker__option");
            active?.focus();
        }
    }


    function setLanguage(code: string) {
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

        // 5. Persistence
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('lang', code);
        }

        closeMenu(isOpen);
    }

    onMount(() => {
        let saved: string | null = null;
        try {
            saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
        } catch {
            saved = null;
        }
        // Browser language: match the base code ("pt-BR" is "pt", "ja" is the app's "jp").
        const browser = typeof navigator !== "undefined" ? normalizeCode(navigator.language) : "";
        const detected =
            (saved && availableCodes.includes(saved) ? saved : "") ||
            (availableCodes.includes(browser) ? browser : "") ||
            "en";
        setLanguage(detected);
    });

    $: currentLang = availableLanguages.find((l) => l.code === $language) || availableLanguages[0];
</script>

<svelte:window on:click={onWindowClick} />

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="lang-picker" class:lang-picker--above-nav={$dashboardMode} bind:this={root} on:keydown={onKeydown}>
    {#if isOpen}
        <div
            id={MENU_ID}
            class="lang-picker__menu"
            role="group"
            aria-label={($t2 as any)?.nav?.chooseLanguage ?? "Choose a language"}
            transition:slide={{ axis: "y", duration: 160 }}
        >
            <div class="lang-picker__scroll-area">
                {#each availableLanguages as lang (lang.code)}
                    <button
                        type="button"
                        class="lang-picker__option"
                        class:lang-picker__option--active={$language === lang.code}
                        aria-pressed={$language === lang.code}
                        lang={lang.code}
                        on:click={() => setLanguage(lang.code)}
                    >
                        <span class="lang-picker__name">{lang.name}</span>
                        <span class="lang-picker__code">{lang.code.toUpperCase()}</span>
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
        aria-expanded={isOpen}
        aria-controls={isOpen ? MENU_ID : undefined}
        aria-label={(($t2 as any)?.nav?.currentLanguage ?? "Language: {name}").replace("{name}", currentLang?.name ?? "English")}
    >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10" /><path d="M2 12h20M12 2a15 15 0 0 1 0 20M12 2a15 15 0 0 0 0 20" /></svg>
        <span class="lang-picker__current-code">{currentLang?.code.toUpperCase() ?? "EN"}</span>
    </button>
</div>

<style lang="scss">
    .lang-picker {
        position: fixed;
        bottom: calc(var(--space-4, 16px) + env(safe-area-inset-bottom, 0px));
        right: var(--space-4, 16px);
        z-index: 900;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: var(--space-2, 8px);
        font-family: var(--font-body, inherit);

        &__trigger {
            display: inline-flex;
            align-items: center;
            gap: var(--space-2, 8px);
            min-height: 40px;
            padding: var(--space-2, 8px) var(--space-3, 12px);
            border-radius: var(--radius-full, 999px);
            background: var(--surface-1, #fff);
            color: var(--text-1, #0f172a);
            border: 1px solid var(--border-1, #e5e7eb);
            box-shadow: var(--shadow-2, 0 4px 12px rgba(0, 0, 0, 0.12));
            cursor: pointer;
            font-size: var(--fs-xs, 0.75rem);
            font-weight: var(--fw-semibold, 600);
            transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);

            &:hover { background: var(--surface-2, #f1f5f9); }
        }

        &__menu {
            background: var(--surface-1, #fff);
            border: 1px solid var(--border-1, #e5e7eb);
            border-radius: var(--radius-lg, 14px);
            box-shadow: var(--shadow-3, 0 10px 25px rgba(0, 0, 0, 0.18));
            min-width: 200px;
            max-height: min(60vh, 420px);
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        &__scroll-area {
            overflow-y: auto;
            padding: var(--space-2, 8px);
            overscroll-behavior: contain;
        }

        &__option {
            width: 100%;
            min-height: 40px;
            padding: var(--space-2, 8px) var(--space-3, 12px);
            border: none;
            background: transparent;
            color: var(--text-1, #0f172a);
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: var(--space-3, 12px);
            cursor: pointer;
            border-radius: var(--radius-sm, 6px);
            font-size: var(--fs-sm, 0.875rem);
            text-align: left;

            &:hover { background: var(--surface-2, #f1f5f9); }

            &--active {
                background: var(--accent-soft, #eef2ff);
                font-weight: var(--fw-semibold, 600);
            }
        }

        &__name { white-space: nowrap; }

        &__code {
            color: var(--text-3, #64748b);
            font-size: var(--fs-xs, 0.75rem);
        }

        button:focus-visible {
            outline: 2px solid var(--focus-color, #6366f1);
            outline-offset: 2px;
        }
    }

    @media (max-width: 640px) {
        .lang-picker {
            right: var(--space-3, 12px);
            bottom: calc(var(--space-3, 12px) + env(safe-area-inset-bottom, 0px));

            &__trigger {
                min-height: 36px;
                padding: var(--space-1, 4px) var(--space-3, 12px);
            }
        }
    }

    /* WS10: on phones the dashboard has a bottom bar (MobileNav, 56px tall). Sit above it and
       below its "More" sheet so the picker never covers a navigation item. */
    @media (max-width: 767px) {
        .lang-picker--above-nav {
            bottom: calc(56px + var(--space-3, 12px) + env(safe-area-inset-bottom, 0px));
            z-index: calc(var(--z-drawer, 40) - 1);
        }
    }

    @media (prefers-reduced-motion: reduce) {
        .lang-picker__trigger { transition: none; }
    }
</style>
