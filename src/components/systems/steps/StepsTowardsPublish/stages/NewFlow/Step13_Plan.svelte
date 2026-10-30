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
  .summary {
    margin: 0;
    padding-left: var(--space-5, 24px);
    display: flex;
    flex-direction: column;
    gap: var(--space-1, 4px);
    color: var(--text-2, #4a5058);
    overflow-wrap: anywhere;
  }
  .plan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--space-3, 12px);
    font-size: var(--fs-sm, 0.875rem);
    color: var(--text-2, #4a5058);
    a { text-decoration: none; }
  }
</style>
