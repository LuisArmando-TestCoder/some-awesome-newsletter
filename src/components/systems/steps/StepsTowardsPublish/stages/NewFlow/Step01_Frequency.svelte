<script lang="ts">
  // Onboarding slot 3: schedule plus the default recipe switch. This is the first
  // step that saves a news source, so nothing runs before the owner has seen a preview.
  import store, { saveToStore } from "../../../../../store";
  import createNewsSource from "../../../../requests/createNewsSource";
  import updateNewsSource from "../../../../requests/updateNewsSource";
  import { cronToNaturalLanguage } from "../../../../../cronToNaturalLanguage";
  import { updateStepStore } from "./stepsStore";
  import OnboardingShell from "./OnboardingShell.svelte";
  import { ob } from "$lib/tutorial/copy";
  import { onboarding, updateOnboarding } from "$lib/tutorial/onboardingState";
  import { nextStep } from "./nav";
  import { isApiError } from "$lib/api/errors";
  import { buildCron, parseCron, localTimeZone, type Frequency } from "./schedule";

  export let canReveal = false;
  const INDEX = 3;

  let schedule = "0 9 * * 1";
  let frequency: Frequency = "weekly";
  let day = 1;
  let hour = 9;
  let automationOn = true;
  let saving = false;
  let error = "";
  let seeded = false;

  $: if (canReveal && !seeded) {
    seeded = true;
    schedule = $onboarding.scheduleTime || $store.config?.scheduleTime || "0 9 * * 1";
    ({ frequency, day, hour } = parseCron(schedule));
    automationOn = $onboarding.automationOn;
  }

  $: schedule = buildCron(frequency, day, hour);
  $: human = safeHuman(schedule);
  $: locale = typeof navigator !== "undefined" ? navigator.language : "en";
  $: dayNames = [0, 1, 2, 3, 4, 5, 6].map((d) => new Date(Date.UTC(2024, 0, 7 + d, 12)).toLocaleDateString(locale, { weekday: "long", timeZone: "UTC" }));
  $: hourNames = Array.from({ length: 24 }, (_, h) => new Date(2024, 0, 1, h, 0).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" }));
  function safeHuman(c: string) {
    try {
      return cronToNaturalLanguage(c);
    } catch {
      return "";
    }
  }

  async function save() {
    error = "";
    saving = true;
    try {
      let id = $onboarding.newsSourceId;
      if (!id) {
        const created = await createNewsSource({
          type: "website",
          url: $onboarding.url,
          lead: $store.config?.lead || $onboarding.url,
          community: $onboarding.reader,
          personality: $store.personality || "",
          linkSelector: $onboarding.linkSelector,
          scheduleTime: schedule,
          scheduleTimezone: localTimeZone(),
        });
        id = created?.id ?? "";
        if (!id) throw new Error("no id");
        updateOnboarding({ newsSourceId: id });
        saveToStore({ createdNewsSourceId: id });
        updateStepStore({ createdNewsSourceId: id });
      } else {
        await updateNewsSource({ scheduleTime: schedule, scheduleTimezone: localTimeZone(), active: automationOn }, id);
      }
      if (!automationOn) await updateNewsSource({ active: false }, id);
      updateOnboarding({ scheduleTime: schedule, automationOn });
      saveToStore({ config: { ...$store.config, scheduleTime: schedule } });
      nextStep();
    } catch (e) {
      console.error("[onboarding/schedule]", e);
      const limit = isApiError(e) ? e.code === "plan_limit" : /limit/i.test((e as Error)?.message ?? "");
      error = limit ? $ob.schedule.errors.limit : $ob.schedule.errors.create;
    } finally {
      saving = false;
    }
  }
</script>

<OnboardingShell
  {canReveal}
  index={INDEX}
  title={$ob.schedule.title}
  why={$ob.schedule.why}
  skipNote={$ob.schedule.skipNote}
  primaryLabel={$ob.schedule.save}
  onPrimary={save}
  loading={saving}
  loadingLabel={$ob.schedule.saving}
>
  <fieldset class="ob-field freq">
    <legend class="ob-label">{$ob.schedule.frequencyLabel}</legend>
    <div class="chips">
      {#each [["daily", $ob.schedule.daily], ["weekly", $ob.schedule.weekly], ["monthly", $ob.schedule.monthly]] as [value, label]}
        <label class="chip" class:on={frequency === value}>
          <input type="radio" name="ob-frequency" {value} bind:group={frequency} />
          <span>{label}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <div class="when">
    {#if frequency === "weekly"}
      <div class="ob-field">
        <label class="ob-label" for="ob-day">{$ob.schedule.dayLabel}</label>
        <select id="ob-day" class="ob-select" bind:value={day}>
          {#each dayNames as name, d}<option value={d}>{name}</option>{/each}
        </select>
      </div>
    {/if}
    <div class="ob-field">
      <label class="ob-label" for="ob-hour">{$ob.schedule.timeLabel}</label>
      <select id="ob-hour" class="ob-select" bind:value={hour} aria-describedby="ob-hour-hint">
        {#each hourNames as name, h}<option value={h}>{name}</option>{/each}
      </select>
    </div>
  </div>
  <p class="ob-hint" id="ob-hour-hint">{$ob.schedule.timeHint}{human ? " " + human : ""}</p>

  <div class="recipe" class:off={!automationOn}>
    <div class="recipe__text">
      <span class="ob-label" id="ob-recipe-label">{$ob.schedule.recipeTitle}</span>
      <p class="ob-hint" id="ob-recipe-desc">{$ob.schedule.recipeBody}</p>
      <p class="recipe__state">{automationOn ? $ob.schedule.recipeOn : $ob.schedule.recipeOff}</p>
    </div>
    <button
      type="button"
      class="switch"
      role="switch"
      aria-checked={automationOn}
      aria-labelledby="ob-recipe-label"
      aria-describedby="ob-recipe-desc"
      on:click={() => (automationOn = !automationOn)}
    >
      <span class="switch__knob" aria-hidden="true"></span>
    </button>
  </div>

  {#if error}<p class="ob-error" role="alert">{error}</p>{/if}
</OnboardingShell>

<style lang="scss">
  .freq { border: 0; padding: 0; margin: 0; }
  .chips { display: flex; flex-wrap: wrap; gap: var(--space-2, 8px); }
  .chip {
    position: relative;
    display: inline-flex;
    align-items: center;
    min-height: 44px;
    padding: var(--space-2, 8px) var(--space-4, 16px);
    border: 1px solid var(--border-2, #c9ced6);
    border-radius: var(--radius-full, 999px);
    background: var(--surface-1, #fff);
    color: var(--text-1, #14171a);
    font-size: var(--fs-md, 1rem);
    cursor: pointer;
    input { position: absolute; opacity: 0; inset: 0; margin: 0; cursor: pointer; }
    &.on { border-color: var(--accent, #3b5bdb); background: var(--accent-soft, #eef2ff); font-weight: var(--fw-semibold, 600); }
    &:focus-within { outline: 2px solid var(--focus-ring, #7b93ff); outline-offset: 2px; }
  }
  .when { display: grid; grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr)); gap: var(--space-4, 16px); }
  .recipe {
    display: flex;
    gap: var(--space-4, 16px);
    align-items: flex-start;
    justify-content: space-between;
    padding: var(--space-4, 16px);
    border: 1px solid var(--accent, #3b5bdb);
    border-radius: var(--radius-md, 8px);
    background: var(--accent-soft, #eef2ff);
    &.off { border-color: var(--border-2, #c9ced6); background: var(--surface-1, #fff); }
  }
  .recipe__text { display: flex; flex-direction: column; gap: var(--space-1, 4px); }
  .recipe__state { margin: 0; font-size: var(--fs-sm, 0.875rem); font-weight: var(--fw-semibold, 600); color: var(--text-1, #14171a); }
  .switch {
    flex: none;
    width: 52px;
    height: 30px;
    border-radius: var(--radius-full, 999px);
    border: 0;
    padding: 3px;
    cursor: pointer;
    background: var(--border-2, #c9ced6);
    transition: background var(--dur-fast, 120ms);
    &[aria-checked="true"] { background: var(--accent, #3b5bdb); }
    &:focus-visible { outline: 2px solid var(--focus-ring, #7b93ff); outline-offset: 2px; }
  }
  .switch__knob {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: var(--surface-0, #fff);
    box-shadow: var(--shadow-1, 0 1px 2px rgba(0, 0, 0, 0.2));
    transition: transform var(--dur-base, 200ms) var(--ease-out, ease-out);
  }
  .switch[aria-checked="true"] .switch__knob { transform: translateX(22px); }
  @media (prefers-reduced-motion: reduce) { .switch, .switch__knob { transition: none; } }
</style>
