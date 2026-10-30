<!-- WS4. Settings > Integrations: where AIBAN can publish each issue (WordPress sites).
     The site list itself is the shared Secrets component (webhookGroups). -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Secrets from "../../../components/systems/inputs/Secrets/Secrets.svelte";
  import { dt } from "../i18n";
</script>

<Card title={$dt("dash.settings.integrations.title")} subtitle={$dt("dash.settings.integrations.sub")}>
  <p class="skip">{$dt("dash.settings.integrations.skip")}</p>
  <Secrets />
</Card>

<style lang="scss">
  .skip { margin: 0 0 var(--space-4); font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); max-width: var(--measure); }
</style>
