<script lang="ts">
  type Meter = { used: number; limit: number };

  export let plan: { name: string; interval: string };
  export let usage: { apiCallsPerDay: Meter; projects: Meter };
</script>

<div class="help-context-card">
  <h3 class="help-context-card__title">Current plan</h3>
  <p class="help-context-card__text">{plan.name} ({plan.interval})</p>

  <h3 class="help-context-card__title">Usage</h3>
  <div class="help-context-card__usage">
    <p>API calls: {usage.apiCallsPerDay.used} / {usage.apiCallsPerDay.limit}</p>
    <p>Projects: {usage.projects.used} / {usage.projects.limit}</p>
  </div>
</div>

<style lang="scss">
  .help-context-card {
    display: grid;
    gap: var(--space-2);
    margin-bottom: var(--space-5);
    padding: var(--card-pad);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-lg);
    background: var(--surface-0);
    color: var(--text-1);
    font-family: var(--font-body);
  }

  .help-context-card__title {
    margin: 0;
    color: var(--text-3);
    font-family: var(--font-body);
    font-size: var(--fs-xs);
    font-weight: var(--fw-medium);
    letter-spacing: 0;
  }

  .help-context-card__title:not(:first-child) {
    margin-top: var(--space-3);
  }

  .help-context-card__text {
    margin: 0;
    font-size: var(--fs-md);
    font-weight: var(--fw-semibold);
  }

  .help-context-card__usage {
    display: grid;
    gap: var(--space-1);
    font-size: var(--fs-sm);
    color: var(--text-2);
    font-variant-numeric: tabular-nums;

    p {
      margin: 0;
    }
  }
</style>
