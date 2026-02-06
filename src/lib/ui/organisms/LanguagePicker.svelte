<script lang="ts">
    import { onMount } from "svelte";
    import { slide, fade } from "svelte/transition";
    import { language } from "$lib/stores/language.store";
    import store, { globalLanguage, saveToStore } from "../../../components/store";

    import { t } from "$lib/i18n/dashboard-translations";
    import { t as t2 } from "$lib/i18n/translations";
    import { t as t3 } from "$lib/i18n/newflow-translations";
    import { t as tSubscribe } from "$lib/i18n/subscribe-translations";
    import { t as tBillingForm } from "$lib/i18n/billing-form-translations";
    import translations from "$lib/i18n/locales-dashboard/translations";
    import translations2 from "$lib/i18n/translations";
    import translations3 from "$lib/i18n/locales-newflow/translations";
    import translationsSubscribe from "$lib/i18n/locales-subscribe/translations";
    import translationsBillingForm from "$lib/i18n/locales-billing-form/translations";
    import languagesData from "../../../components/systems/inputs/Language/languages";

    const availableCodes = Object.keys(translations);
    const availableLanguages = languagesData.filter((l) =>
        availableCodes.includes(l.code),
    );

    let isOpen = false;


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

        // 4. Update the translation content stores immediately
        const dashboardTranslations = translations[code as keyof typeof translations] || translations.en;
        const appTranslations = translations2[code as keyof typeof translations2] || translations2.en;
        const newFlowTranslations = translations3[code as keyof typeof translations3] || translations3.en;
        const subscribeTranslations = translationsSubscribe[code as keyof typeof translationsSubscribe] || translationsSubscribe.en;
        const billingTranslations = translationsBillingForm[code as keyof typeof translationsBillingForm] || translationsBillingForm.en;

        t.set({
            ...translations.en,
            ...dashboardTranslations,
        });

        t2.set({
            ...translations2.en,
            ...appTranslations,
        });

        t3.set({
            ...translations3.en,
            ...newFlowTranslations,
        });

        tSubscribe.set({
            ...translationsSubscribe.en,
            ...subscribeTranslations,
        });

        tBillingForm.set({
            ...translationsBillingForm.en,
            ...billingTranslations,
        });

        // 5. Persistence
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem('lang', code);
        }

        isOpen = false;
    }

    onMount(() => {
        const saved = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
        const detected = saved || (typeof navigator !== "undefined"
                ? Object.keys(translations).find((O) => navigator.language.includes(O))
                : "en") || "en";
        setLanguage(detected);
    });

    $: currentLang = availableLanguages.find((l) => l.code === $language) || availableLanguages[0];
</script>

<div class="lang-picker">
    {#if isOpen}
        <div
            class="lang-picker__menu"
            transition:slide={{ axis: "y", duration: 200 }}
        >
            <div class="lang-picker__scroll-area">
                {#each availableLanguages as lang}
                    <button
                        class="lang-picker__option"
                        class:lang-picker__option--active={$language === lang.code}
                        on:click={() => setLanguage(lang.code)}
                    >
                        <span class="lang-picker__flag">{lang.flag || "🌐"}</span>
                        <span class="lang-picker__name">{lang.name}</span>
                    </button>
                {/each}
            </div>
        </div>
    {/if}

    <button
        class="lang-picker__trigger"
        on:click={() => (isOpen = !isOpen)}
        aria-label="Select Language"
    >
        <span class="lang-picker__current-flag">{currentLang?.flag || "🌐"}</span>
        <span class="lang-picker__current-code">{currentLang?.code.toUpperCase()}</span>
    </button>
</div>

<style lang="scss">
    .lang-picker {
        position: fixed;
        bottom: 24px;
        right: 24px;
        z-index: 9999;
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 8px;
        font-family: sans-serif;

        &__trigger {
            width: 56px;
            height: 56px;
            border-radius: 28px;
            background: #ffffff;
            border: none;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            cursor: pointer;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            transition: transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275);

            &:hover {
                transform: scale(1.1);
            }
        }

        &__current-flag {
            font-size: 20px;
            line-height: 1;
        }

        &__current-code {
            font-size: 10px;
            font-weight: 700;
            color: #666;
        }

        &__menu {
            background: white;
            border-radius: 16px;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            margin-bottom: 8px;
            min-width: 180px;
            /* Prevents the menu from hitting the top of the screen */
            max-height: 70vh; 
            display: flex;
            flex-direction: column;
            overflow: hidden;
        }

        &__scroll-area {
            overflow-y: auto;
            padding: 8px;
            
            /* Custom Scrollbar Styling */
            &::-webkit-scrollbar {
                width: 6px;
            }
            &::-webkit-scrollbar-track {
                background: transparent;
            }
            &::-webkit-scrollbar-thumb {
                background: #e2e8f0;
                border-radius: 10px;
            }
            &::-webkit-scrollbar-thumb:hover {
                background: #cbd5e1;
            }
        }

        &__option {
            width: 100%;
            padding: 10px 14px;
            border: none;
            background: transparent;
            display: flex;
            align-items: center;
            gap: 12px;
            cursor: pointer;
            border-radius: 8px;
            margin-bottom: 2px;
            transition: all 0.2s;

            &:hover {
                background: #f1f5f9;
            }

            &--active {
                background: #eff6ff;
                color: #2563eb;
                font-weight: 600;
            }
        }

        &__flag {
            font-size: 18px;
        }

        &__name {
            font-size: 14px;
            white-space: nowrap;
        }
    }
</style>