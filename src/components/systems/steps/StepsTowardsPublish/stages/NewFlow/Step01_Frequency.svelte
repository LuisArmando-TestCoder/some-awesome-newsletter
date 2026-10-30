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
  // Plain summary in the visitor's words: "Every Monday at 9:00 AM, your time (America/Costa_Rica)."
  $: human = (() => {
    const time = hourNames[hour] ?? "";
    const zone = localTimeZone();
    const tpl = frequency === "daily" ? $ob.schedule.summaryDaily : frequency === "monthly" ? $ob.schedule.summaryMonthly : $ob.schedule.summaryWeekly;
    return tpl ? tpl.replace("{time}", time).replace("{zone}", zone).replace("{day}", dayNames[day] ?? "") : safeHuman(schedule);
  })();
  const locale = typeof navigator !== "undefined" ? navigator.language : "en";
  const dayNames = [0, 1, 2, 3, 4, 5, 6].map((d) => new Date(Date.UTC(2024, 0, 7 + d, 12)).toLocaleDateString(locale, { weekday: "long", timeZone: "UTC" }));
  const hourNames = Array.from({ length: 24 }, (_, h) => new Date(2024, 0, 1, h, 0).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" }));
  function safeHuman(c: string) {
    try {
      return cronToNaturalLanguage(c);
    } catch {
      return "";
    }
  }

  // "example.com/blog/" and "https://www.example.com/blog" are the same website.
  const siteKey = (u: string | undefined) =>
    String(u ?? "").trim().toLowerCase().replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/+$/, "");

  /** A source for this website that already exists (a save that finished after a reload, a double click). */
  function existingSourceId(): string {
    const list = ($store.config?.newsSources ?? []) as Array<{ id?: string; url?: string }>;
    return list.find((ns) => ns?.id && siteKey(ns.url) === siteKey($onboarding.url))?.id ?? "";
  }

  async function save() {
    error = "";
    saving = true;
    try {
      let id = $onboarding.newsSourceId || existingSourceId();
      if (id && !$onboarding.newsSourceId) {
        updateOnboarding({ newsSourceId: id });
        saveToStore({ createdNewsSourceId: id });
        updateStepStore({ createdNewsSourceId: id });
      }
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
      {#each [["daily", $ob.schedule.daily], ["weekly", $ob.schedule.weekly], ["monthly", $ob.schedule.monthly]] as [value, label], itemIndex (itemIndex)}
        <label class="chip" class:on={frequency === value}>
          <input type="radio" name="ob-frequency" {value} bind:group={frequency} />
          <span class="chip__mark" aria-hidden="true">
            <svg viewBox="0 0 16 16"><path d="M3.5 8.5l3 3 6-7" /></svg>
          </span>
          <span class="chip__label">{label}</span>
        </label>
      {/each}
    </div>
  </fieldset>

  <div class="when">
    {#if frequency === "weekly"}
      <div class="ob-field">
        <label class="ob-label" for="ob-day">{$ob.schedule.dayLabel}</label>
        <select id="ob-day" class="ob-select" bind:value={day}>
          {#each dayNames as name, d (d)}<option value={d}>{name}</option>{/each}
        </select>
      </div>
    {/if}
    <div class="ob-field">
      <label class="ob-label" for="ob-hour">{$ob.schedule.timeLabel}</label>
      <select id="ob-hour" class="ob-select" bind:value={hour} aria-describedby="ob-hour-hint">
        {#each hourNames as name, h (h)}<option value={h}>{name}</option>{/each}
      </select>
    </div>
  </div>
  <p class="ob-hint" id="ob-hour-hint">{human || $ob.schedule.timeHint}</p>

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

  {#if error}<p class="ob-error shake" role="alert">{error}</p>{/if}
</OnboardingShell>

<style lang="scss">
  .freq {
    border: 0;
    padding: 0;
    margin: 0;
  }

  /* Choices as large selectable cards: checked = ink border + filled check, not color alone. */
  .chips {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 10rem), 1fr));
    gap: var(--space-3);
  }
  .chip {
    position: relative;
    display: flex;
    align-items: center;
    gap: var(--space-3);
    min-height: 4rem;
    padding: var(--space-4) var(--space-5);
    border: 1px solid var(--border-2);
    border-radius: var(--radius-lg);
    background: var(--surface-0);
    color: var(--text-1);
    font-size: var(--fs-lg);
    font-weight: var(--fw-medium);
    cursor: pointer;
    transition:
      border-color var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out),
      transform var(--dur-base) var(--ease-out);

    input {
      position: absolute;
      opacity: 0;
      inset: 0;
      margin: 0;
      cursor: pointer;
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover:not(.on) {
        border-color: var(--text-2);
        background: var(--surface-1);
        transition-duration: var(--t-in);
      }
    }

    &:active {
      transform: scale(0.98);
      transition-duration: 60ms;
    }

    &.on {
      border-color: var(--text-1);
      box-shadow: inset 0 0 0 1px var(--text-1);
      font-weight: var(--fw-semibold);
    }

    &:has(input:focus-visible) {
      outline: 2px solid var(--focus-color);
      outline-offset: 2px;
    }
  }
  .chip__mark {
    flex: none;
    display: grid;
    place-items: center;
    width: 1.5rem;
    height: 1.5rem;
    border: 1.5px solid var(--border-2);
    border-radius: var(--radius-full);
    color: var(--accent-contrast);
    transition:
      background-color var(--t-state) var(--ease-out),
      border-color var(--t-state) var(--ease-out);

    svg {
      width: 0.875rem;
      height: 0.875rem;
      fill: none;
      stroke: currentColor;
      stroke-width: 2;
      stroke-linecap: round;
      stroke-linejoin: round;
      opacity: 0;
      transform: scale(0.6);
      transition:
        opacity var(--t-state) var(--ease-out),
        transform var(--dur-base) var(--ease-spring);
    }
  }
  .chip.on .chip__mark {
    background: var(--text-1);
    border-color: var(--text-1);
    color: var(--surface-0);

    svg {
      opacity: 1;
      transform: none;
    }
  }

  .when {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 12rem), 1fr));
    gap: var(--space-4);
  }

  /* Automation card: on = ink edge, off = quiet edge; the switch and the state line say it in words too. */
  .recipe {
    display: flex;
    gap: var(--space-5);
    align-items: flex-start;
    justify-content: space-between;
    padding: var(--space-5);
    border: 1px solid var(--text-1);
    border-radius: var(--radius-lg);
    background: var(--surface-0);
    transition: border-color var(--t-state) var(--ease-out);

    &.off {
      border-color: var(--border-1);
      background: var(--surface-1);
    }
  }
  .recipe__text {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }
  .recipe__state {
    margin: var(--space-1) 0 0;
    font-size: var(--fs-sm);
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }

  .switch {
    position: relative;
    flex: none;
    width: 52px;
    height: 32px;
    border-radius: var(--radius-full);
    border: 1px solid var(--border-2);
    padding: 3px;
    cursor: pointer;
    background: var(--surface-3);
    box-shadow: none;
    transition:
      background-color var(--t-state) var(--ease-out),
      border-color var(--t-state) var(--ease-out);

    /* 44px hit area. */
    &::after {
      content: "";
      position: absolute;
      inset: -6px;
    }

    &[aria-checked="true"] {
      background: var(--accent);
      border-color: var(--accent);
    }

    @media (hover: hover) and (pointer: fine) {
      &:hover {
        box-shadow: none;
      }
    }

    &:focus-visible {
      outline: none;
      box-shadow: var(--focus-ring);
    }
  }
  .switch__knob {
    display: block;
    width: 24px;
    height: 24px;
    border-radius: var(--radius-full);
    background: var(--surface-0);
    box-shadow: var(--shadow-1);
    transition: transform var(--dur-base) var(--ease-out);
  }
  .switch[aria-checked="true"] .switch__knob {
    transform: translateX(20px);
    background: var(--accent-contrast);
  }
  .switch:active .switch__knob {
    width: 28px;
  }

  @media (forced-colors: active) {
    .chip.on {
      outline: 2px solid Highlight;
    }
    .switch[aria-checked="true"] {
      background: Highlight;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .chip,
    .switch,
    .switch__knob,
    .chip__mark svg {
      transition: none;
    }
    .chip:active {
      transform: none;
    }
  }
</style>
