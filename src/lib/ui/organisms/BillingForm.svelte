<script lang="ts">
    import { t } from "$lib/i18n/billing-form-translations";
    import store from "../../../components/store";
    import { onMount } from "svelte";
    import { browser } from "$app/environment";

    // standard import for svelte-i18n, adjust path if using a different library

    // --- PROPS ---
    export let formData = {
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        state: "", 
        country: "CR", 
        zip: "",
    };
    
    export let isValid = false;

    // --- LOCAL STORAGE PERSISTENCE ---
    const STORAGE_KEY = "billing_form_persistence";

    onMount(() => {
        if (browser) {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                try {
                    const parsed = JSON.parse(stored);
                    formData = { ...formData, ...parsed };
                } catch (e) {
                    console.error("Failed to parse stored billing data", e);
                }
            }
        }
    });

    $: if (browser && formData) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
    }

    // --- PRE-FILL LOGIC ---
    $: if ($store.user || $store.config) {
        const user = $store.user || {};
        const config = $store.config || {};

        if (!formData.email) formData.email = user.email || "";

        if (!formData.firstName) {
             const name = user.name || config.senderName || "";
             const parts = name.split(" ");
             if (parts.length > 0) formData.firstName = parts[0];
             if (parts.length > 1) formData.lastName = parts.slice(1).join(" ");
        }

        if (!formData.phone) formData.phone = user.phone || user.phoneNumber || config.phone || "";
        if (!formData.address) formData.address = user.address || user.street || config.address || "";
        if (!formData.city) formData.city = user.city || config.city || "";
        if (!formData.state) formData.state = user.state || user.province || config.state || "";
        if (!formData.zip) formData.zip = user.zip || user.zipCode || config.zip || "";

        if ((user.country || config.country) && formData.country === "CR") {
            formData.country = user.country || config.country || "CR";
        }
    }

    // --- VALIDATION ---
    $: isValid = !!(
        formData.firstName &&
        formData.lastName &&
        formData.email &&
        formData.phone &&
        formData.address &&
        formData.city &&
        formData.country
    );
</script>

<div class="billing-card">
    <div class="billing-header">
        <h3 class="billing-header__title">{$t.billing.header.title}</h3>
        <p class="billing-header__subtitle">{$t.billing.header.subtitle}</p>
    </div>
    
    <div class="billing-grid">
        <div class="form-group">
            <label for="fname">{$t.billing.fields.firstName.label}</label>
            <div class="input-wrapper">
                <input 
                    id="fname" 
                    type="text" 
                    bind:value={formData.firstName} 
                    placeholder={$t.billing.fields.firstName.placeholder} 
                    autocomplete="given-name" 
                />
            </div>
        </div>

        <div class="form-group">
            <label for="lname">{$t.billing.fields.lastName.label}</label>
            <div class="input-wrapper">
                <input 
                    id="lname" 
                    type="text" 
                    bind:value={formData.lastName} 
                    placeholder={$t.billing.fields.lastName.placeholder} 
                    autocomplete="family-name" 
                />
            </div>
        </div>

        <div class="form-group full-width">
            <label for="email">{$t.billing.fields.email.label}</label>
            <div class="input-wrapper">
                <input 
                    id="email" 
                    type="email" 
                    bind:value={formData.email} 
                    placeholder={$t.billing.fields.email.placeholder} 
                    autocomplete="email" 
                />
            </div>
        </div>

        <div class="form-group">
            <label for="phone">{$t.billing.fields.phone.label}</label>
            <div class="input-wrapper">
                <input 
                    id="phone" 
                    type="tel" 
                    bind:value={formData.phone} 
                    placeholder={$t.billing.fields.phone.placeholder} 
                    autocomplete="tel" 
                />
            </div>
        </div>

        <div class="form-group">
            <label for="country">{$t.billing.fields.country.label}</label>
            <div class="input-wrapper">
                <input 
                    id="country" 
                    class="code-input"
                    type="text" 
                    bind:value={formData.country} 
                    placeholder={$t.billing.fields.country.placeholder} 
                    maxlength="2" 
                    autocomplete="country"
                />
            </div>
        </div>

        <div class="form-group full-width">
            <label for="address">{$t.billing.fields.address.label}</label>
            <div class="input-wrapper">
                <input 
                    id="address" 
                    type="text" 
                    bind:value={formData.address} 
                    placeholder={$t.billing.fields.address.placeholder} 
                    autocomplete="street-address" 
                />
            </div>
        </div>

        <div class="form-group">
            <label for="city">{$t.billing.fields.city.label}</label>
            <div class="input-wrapper">
                <input 
                    id="city" 
                    type="text" 
                    bind:value={formData.city} 
                    placeholder={$t.billing.fields.city.placeholder} 
                    autocomplete="address-level2" 
                />
            </div>
        </div>

        <div class="form-group">
            <label for="zip">{$t.billing.fields.zip.label}</label>
            <div class="input-wrapper">
                <input 
                    id="zip" 
                    type="text" 
                    bind:value={formData.zip} 
                    placeholder={$t.billing.fields.zip.placeholder} 
                    autocomplete="postal-code" 
                />
            </div>
        </div>
    </div>
</div>

<style lang="scss">
    // --- DESIGN TOKENS ---
    $color-bg: #ffffff;
    $color-bg-secondary: #f8fafc;
    $color-text-main: #0f172a;
    $color-text-muted: #64748b;
    $color-primary: #4f46e5; // Indigo 600
    $color-primary-light: #eef2ff; // Indigo 50
    $color-border: #e2e8f0;
    $color-border-hover: #cbd5e1;
    $shadow-card: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
    $shadow-focus: 0 0 0 4px rgba(79, 70, 229, 0.15);
    $radius-lg: 16px;
    $radius-sm: 8px;
    $ease-spring: cubic-bezier(0.25, 1, 0.5, 1);

    .billing-card {
        background: $color-bg;
        border: 1px solid $color-border;
        border-radius: $radius-lg;
        padding: 40px;
        max-width: 720px;
        margin: 20px auto 60px;
        box-shadow: $shadow-card;
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
        
        // Subtle entrance animation
        animation: slideUp 0.6s $ease-spring forwards;
        opacity: 0;
        transform: translateY(20px);
    }

    @keyframes slideUp {
        to { opacity: 1; transform: translateY(0); }
    }

    .billing-header {
        text-align: center;
        margin-bottom: 32px;
        border-bottom: 1px solid $color-bg-secondary;
        padding-bottom: 20px;

        &__title {
            font-size: 1.5rem;
            font-weight: 800;
            color: $color-text-main;
            letter-spacing: -0.025em;
            margin: 0 0 8px 0;
        }

        &__subtitle {
            font-size: 0.925rem;
            color: $color-text-muted;
            margin: 0;
            line-height: 1.5;
        }
    }

    .billing-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        column-gap: 24px;
        row-gap: 24px;

        @media (max-width: 640px) {
            grid-template-columns: 1fr;
            gap: 20px;
        }
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 8px;

        &.full-width {
            grid-column: 1 / -1;
        }

        label {
            font-size: 0.75rem;
            font-weight: 700;
            color: $color-text-muted;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            margin-left: 2px;
        }
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;

        input {
            width: 100%;
            background-color: $color-bg-secondary;
            border: 1px solid $color-border;
            border-radius: $radius-sm;
            padding: 12px 16px;
            font-size: 0.95rem;
            color: $color-text-main;
            transition: all 0.2s $ease-spring;
            
            // Remove browser default styling
            appearance: none;
            outline: none;

            &::placeholder {
                color: #94a3b8;
                opacity: 0.8;
            }

            &:hover {
                border-color: $color-border-hover;
                background-color: #fff;
            }

            &:focus {
                background-color: #fff;
                border-color: $color-primary;
                box-shadow: $shadow-focus;
                transform: translateY(-1px);
            }
            
            // Specialized styling for the ISO code
            &.code-input {
                text-transform: uppercase;
                letter-spacing: 0.1em;
                font-feature-settings: "tnum"; // Tabular numbers if font supports it
            }
            
            // Error state handling (optional hook)
            &:not(:placeholder-shown):invalid {
                border-color: #ef4444;
                box-shadow: 0 0 0 4px rgba(239, 68, 68, 0.1);
            }
        }
    }
</style>