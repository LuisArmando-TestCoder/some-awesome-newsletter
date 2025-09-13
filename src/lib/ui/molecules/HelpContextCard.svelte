<script lang="ts">
  export let plan: any;
  export let usage: any;
</script>

<div class="help-context-card">
  <h3 class="help-context-card__title">Current Plan</h3>
  <p class="help-context-card__text">{plan.name} ({plan.interval})</p>

  <h3 class="help-context-card__title">Usage</h3>
  <div class="help-context-card__usage">
    <p>API Calls: {usage.apiCallsPerDay.used} / {usage.apiCallsPerDay.limit}</p>
    <p>Projects: {usage.projects.used} / {usage.projects.limit}</p>
  </div>
</div>

<style lang="scss">
  @use '../../../styles/global.scss';

  .help-context-card {
    border: 1px solid var(--c-border);
    border-radius: var(--radius-lg);
    padding: var(--space-lg);
    margin-bottom: var(--space-lg);
  }

  .help-context-card__title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: var(--space-sm);
  }

  .help-context-card__text {
    margin-bottom: var(--space-md);
  }

  .help-context-card__usage {
    display: grid;
    gap: var(--space-sm);
  }
</style>
