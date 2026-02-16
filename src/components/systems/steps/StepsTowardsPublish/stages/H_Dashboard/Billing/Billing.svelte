<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import plansStore, {
        loadPlansContent,
        computeFeatures,
        setInterval,
        type PlansState,
    } from "$lib/config/plans.config";
    import store, { globalLanguage } from "../../../../../../store";
    import Switch from "$lib/ui/components/Switch.svelte";
    
    // 🆕 Import your new BillingForm component here
    // Make sure this path matches where you saved the component
    import BillingForm from "$lib/ui/organisms/BillingForm.svelte"; 
    
    import { t } from "$lib/i18n/translations";
    import { checkPlanLimit } from "$lib/utils/checkPlanLimits";

    // --- STATE MANAGEMENT ---
    let state: PlansState;
    const unsubPlans = plansStore.subscribe((v) => (state = v));
    let isProcessing = false;
    let feedbackMessage = { type: "", text: "" };

    // --- BILLING FORM STATE ---
    // We initialize the object here. 
    // The BillingForm component will handle pre-filling it with store data automatically.
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
    
    // This tracks if the child component considers the form valid
    let isFormValid = false;

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
            // Optional: Clean URL to preventing re-triggering on refresh
            window.history.replaceState({}, document.title, window.location.pathname);
        } else if (urlParams.get("payment_cancelled") === "true") {
            feedbackMessage = { type: "error", text: "Payment process was cancelled." };
        }
    });

    $: newsSourcesCheck = checkPlanLimit("newsSources");
    $: usersCheck = checkPlanLimit("users");
    
    $: if (!newsSourcesCheck.allowed || !usersCheck.allowed) {
        if (!feedbackMessage.text) { // Don't overwrite existing success/error
             feedbackMessage = { 
                 type: "error", 
                 text: "You have exceeded your plan limits. Some features are disabled until you upgrade." 
             };
        }
    }

    onDestroy(() => unsubPlans());

    // --- ACTIONS ---

    async function handleSubscribe(planData: any, price: number) {
        if (isProcessing) return;
        
        // 🆕 Prevent double subscription logic
        if ($store.config?.pricingPlan !== "free" && $store.config?.pricingPlan !== "vipfree") {
            const confirmSwitch = confirm("You already have an active plan. To switch plans, please cancel your current subscription first to avoid double billing. Do you want to proceed anyway?");
            if (!confirmSwitch) return;
        }

        if (!isFormValid) {
            alert("Please fill in all billing details above first.");
            // Scroll to the form if invalid
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
                    ...billingInfo // Spreads the bound data from the BillingForm component
                }),
            });

            const result = await response.json();

            if (result.success && result.url) {
                // Redirect to payment gateway
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

        <BillingForm 
            bind:formData={billingInfo} 
            bind:isValid={isFormValid} 
        />

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
                            {#each computeFeatures(state.content, plan.id as any) as feature}
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
                                {#each computeFeatures(state.content, tier.id as any) as feature}
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
    /* 🆕 Feedback Message Styles */
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

    /* 🆕 Danger Button for Cancellation */
    .pricing__button--danger {
        background: #fff;
        border: 2px solid #ef4444;
        color: #ef4444;
        &:hover {
            background: #ef4444;
            color: white;
        }
    }

    /* --- Page Layout Styles --- */
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