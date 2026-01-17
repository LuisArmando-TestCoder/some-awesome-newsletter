<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { writable } from "svelte/store";
    import plansStore, {
        loadPlansContent,
        computeFeatures,
        setInterval,
        type Plan,
        type PlansState,
    } from "$lib/config/plans.config";
    import store, { globalLanguage } from "../../../../../../store";
    import Switch from "$lib/ui/components/Switch.svelte";
    import { t } from "$lib/i18n/translations";

    // --- STATE MANAGEMENT ---
    let state: PlansState;
    const unsubPlans = plansStore.subscribe((v) => (state = v));
    const currentPlan = writable<Plan | undefined>(undefined);
    let isProcessing = false;
    let feedbackMessage = { type: "", text: "" }; // 🆕 For Success/Error messages

    // --- BILLING FORM STATE ---
    let billingInfo = {
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

    // Pre-fill logic
    $: if ($store.user || $store.config) {
        if (!billingInfo.email) billingInfo.email = $store.user?.email || "";
        if (!billingInfo.firstName) {
             const name = $store.user?.name || $store.config?.senderName || "";
             const parts = name.split(" ");
             if (parts.length > 0) billingInfo.firstName = parts[0];
             if (parts.length > 1) billingInfo.lastName = parts.slice(1).join(" ");
        }
    }

    // Validation
    $: isFormValid =
        billingInfo.firstName &&
        billingInfo.lastName &&
        billingInfo.email &&
        billingInfo.phone &&
        billingInfo.address &&
        billingInfo.city &&
        billingInfo.country;

    const PLANS_CONFIG = [
        { id: "starter", mo: 17 },
        { id: "growth", mo: 35 },
        { id: "pro", mo: 80 },
        { id: "master", mo: 150 },
    ];

    $: if ($globalLanguage) {
        loadPlansContent();
    }

    function calculatePrice(monthlyPrice: number, interval: string) {
        if (interval === "monthly") return monthlyPrice;
        const ANNUAL_DISCOUNT = 0.35;
        return Math.floor(monthlyPrice * 12 * (1 - ANNUAL_DISCOUNT));
    }

    // 🆕 CHECK URL FOR PAYMENT STATUS ON LOAD
    onMount(async () => {
        await loadPlansContent();
        
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get("payment_success") === "true") {
            feedbackMessage = { type: "success", text: "Subscription activated successfully! Welcome aboard." };
            // Optional: Clean URL
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (urlParams.get("payment_cancelled") === "true") {
            feedbackMessage = { type: "error", text: "Payment process was cancelled." };
        }
    });

    onDestroy(() => unsubPlans());

    // --- ACTIONS ---

    async function handleSubscribe(planData: any, price: number) {
        if (isProcessing) return;
        
        // 🆕 Prevent double subscription: 
        // If user already has a PAID plan (not free), warn them or handle upgrade logic.
        // For MVP, we ask them to cancel first to avoid double billing in Tilopay.
        if ($store.config?.pricingPlan !== "free" && $store.config?.pricingPlan !== "vipfree") {
            const confirmSwitch = confirm("You already have an active plan. To switch plans, please cancel your current subscription first to avoid double billing. Do you want to proceed anyway?");
            if (!confirmSwitch) return;
        }

        if (!isFormValid) {
            alert("Please fill in all billing details above first.");
            document.querySelector('.billing-form')?.scrollIntoView({ behavior: 'smooth' });
            return;
        }

        isProcessing = true;
        feedbackMessage = { type: "", text: "" };

        try {
            const response = await fetch($store.apiURL() + "/api/subscribe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-email": $store.user?.email || billingInfo.email,
                },
                body: JSON.stringify({
                    planId: planData.id,
                    interval: state.interval, 
                    user_id: $store.user?.id || "guest",
                    currency: "USD",
                    ...billingInfo // Spread form data
                }),
            });

            const result = await response.json();

            if (result.success && result.url) {
                window.location.href = result.url;
            } else {
                feedbackMessage = { type: "error", text: "Payment init failed: " + (result.details?.message || result.error) };
            }
        } catch (error) {
            console.error("Error:", error);
            feedbackMessage = { type: "error", text: "Server error. Please try again." };
        } finally {
            isProcessing = false;
        }
    }

    // 🆕 HANDLE CANCELLATION
    async function handleCancel() {
        if (!confirm("Are you sure you want to cancel your subscription? You will be downgraded to the Free plan immediately.")) return;

        isProcessing = true;
        try {
            const response = await fetch($store.apiURL() + "/api/cancel-subscription", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-auth-email": $store.user?.email || "",
                }
            });

            const result = await response.json();
            
            if (result.success) {
                alert("Subscription cancelled successfully.");
                window.location.reload(); // Reload to reflect "Free" state
            } else {
                alert("Error cancelling: " + result.error);
            }
        } catch (error) {
            alert("Network error could not cancel.");
        } finally {
            isProcessing = false;
        }
    }
</script>

<section class="pricing">
    <div class="pricing__container">
        
        <header class="pricing__header">
            <span class="pricing__eyebrow">{$t.billing.title}</span>
            <h1 class="pricing__title">{$t.billing.currentPlanTitle}</h1>
            
            {#if feedbackMessage.text}
                <div class="feedback-message {feedbackMessage.type}">
                    {feedbackMessage.text}
                </div>
            {/if}
        </header>

        <div class="billing-form">
            <h3 class="billing-form__title">Billing Information</h3>
            <p class="billing-form__subtitle">Required for secure payment processing.</p>
            
            <div class="billing-form__grid">
                <div class="form-group">
                    <label for="fname">First Name</label>
                    <input id="fname" type="text" bind:value={billingInfo.firstName} placeholder="John" />
                </div>
                <div class="form-group">
                    <label for="lname">Last Name</label>
                    <input id="lname" type="text" bind:value={billingInfo.lastName} placeholder="Doe" />
                </div>
                <div class="form-group full-width">
                    <label for="email">Email Address</label>
                    <input id="email" type="email" bind:value={billingInfo.email} placeholder="john@example.com" />
                </div>
                <div class="form-group">
                    <label for="phone">Phone Number</label>
                    <input id="phone" type="tel" bind:value={billingInfo.phone} placeholder="8888-8888" />
                </div>
                 <div class="form-group">
                    <label for="country">Country (ISO Code)</label>
                    <input id="country" type="text" bind:value={billingInfo.country} placeholder="CR" maxlength="2" style="text-transform: uppercase;" />
                </div>
                <div class="form-group full-width">
                    <label for="address">Address</label>
                    <input id="address" type="text" bind:value={billingInfo.address} placeholder="Street address..." />
                </div>
                <div class="form-group">
                    <label for="city">City</label>
                    <input id="city" type="text" bind:value={billingInfo.city} placeholder="San Jose" />
                </div>
                <div class="form-group">
                    <label for="zip">ZIP Code</label>
                    <input id="zip" type="text" bind:value={billingInfo.zip} placeholder="10101" />
                </div>
            </div>
        </div>

        <div class="pricing__toggle-wrapper">
            <div class="pricing__toggle-container">
                <span class="pricing__toggle-text" class:pricing__toggle-text--active={state.interval === "monthly"}>
                    {$t.pricing.monthly}
                </span>
                <div class="pricing__switch">
                    <Switch toggled={state.interval === "yearly"} onChange={(toggled) => setInterval(toggled ? "yearly" : "monthly")} />
                </div>
                <span class="pricing__toggle-text" class:pricing__toggle-text--active={state.interval === "yearly"}>
                    {$t.pricing.yearly} <span class="pricing__discount-badge">-35%</span>
                </span>
            </div>
        </div>

        <div class="pricing__grid" class:pricing__grid--loading={isProcessing}>
            {#if state?.content?.plans}
                {#each state.content.plans.filter((p) => p.id === "free") as plan}
                    <article class="pricing__card pricing__card--free" class:pricing__card--active={$store.config.pricingPlan === plan.id}>
                        <h2 class="pricing__card-name">{plan.name}</h2>
                        <div class="pricing__price-block">
                            <span class="pricing__currency">$</span><span class="pricing__amount">0</span>
                        </div>
                        <ul class="pricing__features">
                            {#each computeFeatures(state.content, plan.id) as feature}
                                <li class="pricing__feature-item">{feature}</li>
                            {/each}
                        </ul>
                        <button class="pricing__button pricing__button--outline" disabled>
                            {$store.config.pricingPlan === plan.id ? "Current Plan" : "Free Forever"}
                        </button>
                    </article>
                {/each}

                {#each PLANS_CONFIG as tier}
                    {@const planData = state.content.plans.find((p) => p.id === tier.id)}
                    {@const price = calculatePrice(tier.mo, state.interval)}
                    {@const isCurrent = $store.config.pricingPlan === tier.id}
                    
                    {#if planData}
                        <article class="pricing__card" class:pricing__card--featured={tier.id === "growth"} class:pricing__card--active={isCurrent}>
                            {#if isCurrent}
                                <div class="pricing__card-badge">Active</div>
                            {/if}

                            <h2 class="pricing__card-name">{planData.name}</h2>
                            <div class="pricing__price-block">
                                <span class="pricing__currency">$</span>
                                <span class="pricing__amount">{price}</span>
                                <span class="pricing__period">/{state.interval === "monthly" ? "mo" : "yr"}</span>
                            </div>
                            <ul class="pricing__features">
                                {#each computeFeatures(state.content, tier.id) as feature}
                                    <li class="pricing__feature-item">{feature}</li>
                                {/each}
                            </ul>

                            {#if isCurrent}
                                <button
                                    class="pricing__button pricing__button--danger"
                                    disabled={isProcessing}
                                    on:click={handleCancel}
                                >
                                    {isProcessing ? "Processing..." : "Cancel Subscription"}
                                </button>
                            {:else}
                                <button
                                    class="pricing__button"
                                    class:pricing__button--primary={tier.id === "growth"}
                                    disabled={isProcessing}
                                    on:click={() => handleSubscribe(planData, price)}
                                >
                                    {isProcessing ? "Processing..." : $t.pricing.upgradeTo.replace("{planName}", planData.name)}
                                </button>
                            {/if}
                        </article>
                    {/if}
                {/each}
            {/if}
        </div>
    </div>
</section>

<style lang="scss">
    /* 🆕 Added Feedback Styles */
    .feedback-message {
        padding: 12px;
        border-radius: 8px;
        text-align: center;
        margin: 20px auto;
        max-width: 600px;
        font-weight: 500;
        
        &.success { background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        &.error { background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
    }

    /* 🆕 Added Danger Button for Cancellation */
    .pricing__button--danger {
        background: #fff;
        border: 2px solid #ef4444;
        color: #ef4444;
        &:hover {
            background: #ef4444;
            color: white;
        }
    }

    /* --- Existing Styles Preserved Below --- */
    .billing-form {
        max-width: 700px;
        margin: 0 auto 60px auto;
        padding: 32px;
        background: #f9fafb;
        border: 1px solid #e5e7eb;
        border-radius: 24px;
        
        &__title {
            font-size: 1.25rem;
            font-weight: 700;
            color: #111827;
            margin: 0 0 4px 0;
            text-align: center;
        }
        &__subtitle {
            text-align: center;
            color: #6b7280;
            margin-bottom: 24px;
            font-size: 0.9rem;
        }
        &__grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 16px;
            @media (max-width: 600px) { grid-template-columns: 1fr; }
        }
    }

    .form-group {
        display: flex;
        flex-direction: column;
        gap: 6px;
        &.full-width { grid-column: 1 / -1; }
        label {
            font-size: 0.8rem;
            font-weight: 600;
            color: #374151;
            text-transform: uppercase;
            letter-spacing: 0.05em;
        }
        input {
            padding: 10px 12px;
            border: 1px solid #d1d5db;
            border-radius: 8px;
            font-size: 0.95rem;
            transition: border-color 0.2s;
            outline: none;
            &:focus {
                border-color: #3b82f6;
                box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
            }
        }
    }

    .pricing {
        padding: 40px 20px;
        background-color: #ffffff;
        min-height: 100vh;
        font-family: "Inter", sans-serif;
        &__container { max-width: 1200px; margin: 0 auto; }
        &__header { text-align: center; margin-bottom: 48px; }
        &__eyebrow { color: #3b82f6; font-weight: 600; text-transform: uppercase; letter-spacing: 0.1em; font-size: 0.875rem; }
        &__title { font-size: 2.5rem; font-weight: 800; color: #111827; margin: 12px 0; }
        &__toggle-wrapper { display: flex; justify-content: center; margin-bottom: 60px; }
        &__toggle-container { display: flex; align-items: center; gap: 16px; padding: 8px 16px; background: #f3f4f6; border-radius: 99px; }
        &__toggle-text {
            font-size: 0.875rem; font-weight: 500; color: #6b7280; transition: color 0.2s;
            &--active { color: #111827; font-weight: 700; }
        }
        &__discount-badge { background: #dcfce7; color: #166534; padding: 2px 8px; border-radius: 12px; font-size: 0.75rem; margin-left: 4px; }
        &__grid {
            display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; align-items: stretch;
            &--loading { opacity: 0.6; pointer-events: none; }
        }
        &__card {
            position: relative; padding: 40px 32px; background: #ffffff; border: 1px solid #e5e7eb; border-radius: 24px; display: flex; flex-direction: column; transition: transform 0.3s ease, box-shadow 0.3s ease;
            &:hover { transform: translateY(-8px); box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1); }
            &--featured { border: 2px solid #3b82f6; box-shadow: 0 10px 15px -3px rgba(59, 130, 246, 0.2); }
            &--free { background: #fafafa; }
            &--active { border-style: dashed; background: #f9fafb; }
        }
        &__card-badge { position: absolute; top: 0; left: 50%; transform: translate(-50%, -50%); background: #3b82f6; color: white; padding: 6px 16px; border-radius: 99px; font-size: 0.75rem; font-weight: 700; text-transform: uppercase; }
        &__card-name { font-size: 1.25rem; font-weight: 700; color: #111827; margin-bottom: 4px; }
        &__price-block { display: flex; align-items: baseline; margin-bottom: 32px; }
        &__currency { font-size: 1.5rem; font-weight: 600; color: #111827; }
        &__amount { font-size: 3.5rem; font-weight: 800; color: #111827; letter-spacing: -0.02em; }
        &__period { font-size: 1rem; color: #6b7280; margin-left: 4px; }
        &__features { list-style: none; padding: 0; margin: 0 0 40px 0; flex-grow: 1; }
        &__feature-item {
            font-size: 0.95rem; color: #4b5563; padding: 10px 0; display: flex; align-items: center; border-bottom: 1px solid #f3f4f6;
            &:last-child { border-bottom: none; }
            &::before { content: "✓"; color: #22c55e; margin-right: 12px; font-weight: 900; }
        }
        &__button {
            width: 100%; display: block; text-align: center; padding: 16px; border-radius: 12px; font-weight: 700; text-decoration: none; border: none; cursor: pointer; transition: all 0.2s;
            &--primary { background: #3b82f6; color: white; &:hover { background: #2563eb; } }
            &--outline { border: 2px solid #e5e7eb; color: #374151; background: white; &:hover { background: #f9fafb; } }
            &:disabled { background: #f3f4f6; color: #9ca3af; cursor: not-allowed; border: none; }
        }
    }
</style>