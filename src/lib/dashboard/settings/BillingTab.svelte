<!-- WS4. Settings > Plan: current plan, usage against limits, then a read-only plan list.
     No checkout (billing providers are off, Luis 2026-10-30). Plan changes go through support. -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Notice from "../ui/Notice.svelte";
  import Button from "../ui/Button.svelte";
  import UsageMeter from "./UsageMeter.svelte";
  import Billing from "../../../components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Billing/Billing.svelte";
  import plansStore, { planChangeMailto } from "$lib/config/plans.config";
  import { computeUsage } from "$lib/api/usage";
  import store from "../../../components/store";
  import { dt } from "../i18n";

  $: usage = computeUsage($store.config, $store.subscribers);
  $: planName = $plansStore.content?.plans?.find((p) => p.id === usage.plan)?.name || usage.plan.charAt(0).toUpperCase() + usage.plan.slice(1);
  $: isPaid = !["free", "vipfree"].includes(usage.plan);
  $: meters = [usage.newsSources, usage.subscribers];
  $: anyOver = meters.some((m) => !m.unlimited && m.used > m.limit);
  $: anyAt = !anyOver && meters.some((m) => !m.unlimited && m.used === m.limit);
  $: anyNear = !anyOver && !anyAt && meters.some((m) => m.nearLimit);
  $: mailto = planChangeMailto($store.configuratorEmail);
</script>

<div class="billing-tab">
  <Card title={$dt("dash.billing.currentTitle")}>
    <div class="current">
      <div>
        <p class="current__plan">{planName}</p>
        <p class="current__meta">
          {#if usage.plan === "vipfree"}{$dt("dash.billing.vip")}
          {:else if isPaid}{$dt("dash.billing.paidMeta")}
          {:else}{$dt("dash.billing.freeMeta")}{/if}
        </p>
      </div>
      {#if usage.plan !== "vipfree"}
        <Button variant={anyOver || anyAt || anyNear ? "primary" : "secondary"} icon="mail" href={mailto}>{$dt("dash.billing.askAction")}</Button>
      {/if}
    </div>
    <div class="meters">
      <UsageMeter label={$dt("dash.billing.meter.sources")} meter={usage.newsSources} />
      <UsageMeter label={$dt("dash.billing.meter.subscribers")} meter={usage.subscribers} />
    </div>
    {#if anyOver}
      <div class="gap"><Notice tone="danger" title={$dt("dash.billing.overTitle")}>{$dt("dash.billing.overBody")}</Notice></div>
    {:else if anyAt}
      <div class="gap"><Notice tone="warning" title={$dt("dash.billing.atTitle")}>{$dt("dash.billing.atBody")}</Notice></div>
    {:else if anyNear}
      <div class="gap"><Notice tone="warning">{$dt("dash.billing.nearBody")}</Notice></div>
    {/if}
  </Card>

  <section class="plans" aria-label={$dt("dash.billing.plansTitle")}>
    <Billing />
  </section>
</div>

<style lang="scss">
  .billing-tab { display: flex; flex-direction: column; gap: var(--space-5); }
  .current { display: flex; justify-content: space-between; align-items: center; gap: var(--space-3); flex-wrap: wrap; margin-bottom: var(--space-4); }
  .current__plan { margin: 0; font-family: var(--font-display); font-size: var(--fs-xl); font-weight: var(--fw-semibold); color: var(--text-1); }
  .current__meta { margin: var(--space-1) 0 0; font-size: var(--fs-sm); color: var(--text-2); }
  .meters { display: grid; grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr)); gap: var(--space-5); }
  .gap { margin-top: var(--space-4); }
</style>
