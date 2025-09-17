<script>
  import Email from "../../components/systems/inputs/Email/Email.svelte";
  import Link from "../../components/systems/inputs/Link/Link.svelte";
  import Number from "../../components/systems/inputs/Number/Number.svelte";
  import PlainText from "../../components/systems/inputs/PlainText/PlainText.svelte";
    import cronToSentence from "../../components/systems/inputs/ScheduleTime/cronToNatural";
  import ScheduleTime from "../../components/systems/inputs/ScheduleTime/ScheduleTime.svelte";
  import { writable } from "svelte/store";

  const hourlyValue = writable("0 * * * *");
  const dailyValue = writable("0 0 * * *");
  const weeklyValue = writable("0 0 * * 0");
  const monthlyValue = writable("0 0 1 * *");
  const yearlyValue = writable("0 0 1 1 *");

  const excludeMinuteValue = writable("0 0 * * *");
  const excludeHourValue = writable("0 * * * *");
  const excludeDayOfMonthValue = writable("0 0 * * *");
  const excludeMonthValue = writable("0 0 1 * *");
  const excludeDayOfWeekValue = writable("0 0 * * *");
  const excludeMinuteAndHourValue = writable("* * * * *");
  const yearlyExcludeMinuteAndHourValue = writable("0 0 1 1 *");
  const weeklyExcludeDayOfMonthValue = writable("0 0 * * 0");
  const yearlyExcludeMinuteHourDayOfMonthValue = writable("0 0 * 1 0");
  const yearlyExcludeMinuteHourDayOfMonthValue2 = writable("0 0 * 1 0");
</script>

<div class="container">
  <h1>Component Style Test</h1>

  <div class="component-test">
    <h2>Email Input</h2>
    <Email />
  </div>

  <div class="component-test">
    <h2>Link Input</h2>
    <Link />
  </div>

  <div class="component-test">
    <h2>Number Input</h2>
    <Number />
  </div>

  <div class="component-test">
    <h2>PlainText Input</h2>
    <PlainText />
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Hourly)</h2>
    <ScheduleTime store={hourlyValue} />
    <p>Value: <code>{$hourlyValue}</code> <code>{cronToSentence($hourlyValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Daily)</h2>
    <ScheduleTime store={dailyValue} />
    <p>Value: <code>{$dailyValue}</code> <code>{cronToSentence($dailyValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Weekly)</h2>
    <ScheduleTime store={weeklyValue} />
    <p>Value: <code>{$weeklyValue}</code> <code>{cronToSentence($weeklyValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Monthly)</h2>
    <ScheduleTime store={monthlyValue} />
    <p>Value: <code>{$monthlyValue}</code> <code>{cronToSentence($monthlyValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Yearly)</h2>
    <ScheduleTime store={yearlyValue} />
    <p>Value: <code>{$yearlyValue}</code> <code>{cronToSentence($yearlyValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Daily, Exclude Minute)</h2>
    <ScheduleTime exclude={["minute"]} store={excludeMinuteValue} />
    <p>Value: <code>{$excludeMinuteValue}</code> <code>{cronToSentence($excludeMinuteValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Weekly, Exclude Hour)</h2>
    <ScheduleTime exclude={["hour"]} store={excludeHourValue} />
    <p>Value: <code>{$excludeHourValue}</code> <code>{cronToSentence($excludeHourValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Monthly, Exclude Day of Month)</h2>
    <ScheduleTime exclude={["dayOfMonth"]} store={excludeDayOfMonthValue} />
    <p>Value: <code>{$excludeDayOfMonthValue}</code> <code>{cronToSentence($excludeDayOfMonthValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Yearly, Exclude Month)</h2>
    <ScheduleTime exclude={["month"]} store={excludeMonthValue} />
    <p>Value: <code>{$excludeMonthValue}</code> <code>{cronToSentence($excludeMonthValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Weekly, Exclude Day of Week)</h2>
    <ScheduleTime exclude={["dayOfWeek"]} store={excludeDayOfWeekValue} />
    <p>Value: <code>{$excludeDayOfWeekValue}</code> <code>{cronToSentence($excludeDayOfWeekValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Daily, Weekly, Monthly, Exclude Minute and Hour)</h2>
    <ScheduleTime exclude={["minute", "hour"]} store={excludeMinuteAndHourValue} />
    <p>Value: <code>{$excludeMinuteAndHourValue}</code> <code>{cronToSentence($excludeMinuteAndHourValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Yearly, Exclude Minute and Hour)</h2>
    <ScheduleTime exclude={["minute", "hour"]} store={yearlyExcludeMinuteAndHourValue} />
    <p>Value: <code>{$yearlyExcludeMinuteAndHourValue}</code> <code>{cronToSentence($yearlyExcludeMinuteAndHourValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Weekly, Exclude Day of Month)</h2>
    <ScheduleTime exclude={["dayOfMonth"]} store={weeklyExcludeDayOfMonthValue} />
    <p>Value: <code>{$weeklyExcludeDayOfMonthValue}</code> <code>{cronToSentence($weeklyExcludeDayOfMonthValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Yearly, Exclude Minute, Hour, and Day of Month)</h2>
    <ScheduleTime exclude={["minute", "hour", "dayOfMonth"]} store={yearlyExcludeMinuteHourDayOfMonthValue} />
    <p>Value: <code>{$yearlyExcludeMinuteHourDayOfMonthValue}</code> <code>{cronToSentence($yearlyExcludeMinuteHourDayOfMonthValue)}</code></p>
  </div>

  <div class="component-test">
    <h2>ScheduleTime Input (Yearly, Exclude Minute, Hour, and Day of Month)</h2>
    <ScheduleTime exclude={["minute", "hour", "dayOfMonth"]} store={yearlyExcludeMinuteHourDayOfMonthValue2} />
    <p>Value: <code>{$yearlyExcludeMinuteHourDayOfMonthValue2}</code> <code>{cronToSentence($yearlyExcludeMinuteHourDayOfMonthValue2)}</code></p>
  </div>
</div>

<style>
  .container {
    padding: 2rem;
  }

  .component-test {
    margin-bottom: 2rem;
  }
</style>
