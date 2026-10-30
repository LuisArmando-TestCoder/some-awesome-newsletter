<script lang="ts">
  // Onboarding slot 8: summary, what is left (checklist), plan, then the dashboard.
  import store, { saveToStore, stepsMapping } from "../../../../../store";
  import { cronToNaturalLanguage } from "../../../../../cronToNaturalLanguage";
  import OnboardingShell from "./OnboardingShell.svelte";
  import GettingStartedChecklist from "$lib/tutorial/GettingStartedChecklist.svelte";
  import { ob, fmt } from "$lib/tutorial/copy";
  import { onboarding, markOnboardingComplete } from "$lib/tutorial/onboardingState";
  import { planChangeMailto } from "$lib/config/plans.config";
  import { dt } from "$lib/dashboard/i18n";

  export let canReveal = false;
  const INDEX = 8;

  $: plan = String($store.config?.pricingPlan || "free");
  $: schedule = safeHuman($onboarding.scheduleTime);
  function safeHuman(c: string) {
    try {
      return cronToNaturalLanguage(c) || c;
    } catch {
      return c;
    }
  }

  function finish() {
    markOnboardingComplete();
    saveToStore({ stepsIndex: stepsMapping["Profile"], hasInteracted: true });
  }

  // No plan purchase here (billing providers are off, Luis 2026-10-30). New accounts are on Free;
  // the team changes plans by hand when an owner writes to support.
  $: planName = plan.charAt(0).toUpperCase() + plan.slice(1);
  $: mailto = planChangeMailto($store.configuratorEmail);
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.done.title}
  why={$ob.done.why}
  primaryLabel={$ob.done.toDashboard}
  onPrimary={finish}
>
  <ul class="summary">
    {#if $onboarding.url}<li>{fmt($ob.done.summarySource, { url: $onboarding.url })}</li>{/if}
    <li>{fmt($ob.done.summarySchedule, { schedule })}</li>
    <li>{fmt($ob.done.summaryAutomation, { state: $onboarding.automationOn ? $ob.done.on : $ob.done.off })}</li>
  </ul>

  <GettingStartedChecklist dismissible={false} showActions={false} headingLevel={2} />

  <div class="plan">
    <span>{plan === "free" ? $dt("dash.onboarding.planFree") : $dt("dash.onboarding.planOther", { plan: planName })}</span>
    <a class="ob-btn ob-btn--tertiary" href={mailto}>{$dt("dash.billing.askAction")}</a>
  </div>
</OnboardingShell>

<style lang="scss">
  /* What you set up: a quiet checklist of facts, each with a check mark. */
  .summary {
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-direction: column;
    border-top: 1px solid var(--border-1);
    color: var(--text-1);
    overflow-wrap: anywhere;

    li {
      position: relative;
      padding: var(--space-3) 0 var(--space-3) var(--space-6);
      border-bottom: 1px solid var(--border-1);

      &::before {
        content: "";
        position: absolute;
        left: 0.15rem;
        top: calc(var(--space-3) + 0.45em);
        width: 0.7rem;
        height: 0.4rem;
        border-left: 2px solid var(--success);
        border-bottom: 2px solid var(--success);
        transform: rotate(-45deg);
      }
    }
  }
  .plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3);
    padding: var(--space-4) var(--space-5);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    font-size: var(--fs-sm);
    color: var(--text-2);
  }
</style>
