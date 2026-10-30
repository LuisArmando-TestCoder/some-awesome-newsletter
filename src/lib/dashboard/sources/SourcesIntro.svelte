<!-- WS4. Explains what a source is, why add more, and how it changes the newsletter (diagnostic q). -->
<script lang="ts">
  import Card from "../ui/Card.svelte";
  import Icon from "../ui/Icon.svelte";
  import { dt } from "../i18n";
  export let compact = false;
</script>

<Card title={$dt("dash.sources.intro.title")}>
  <p class="lead">{$dt("dash.sources.intro.what")}</p>
  {#if !compact}
    <ul class="points">
      <li>
        <span class="points__icon" aria-hidden="true"><Icon name="plus" size={16} /></span>
        <div>
          <h3 class="points__title">{$dt("dash.sources.intro.whyTitle")}</h3>
          <p>{$dt("dash.sources.intro.why")}</p>
        </div>
      </li>
      <li>
        <span class="points__icon" aria-hidden="true"><Icon name="sliders" size={16} /></span>
        <div>
          <h3 class="points__title">{$dt("dash.sources.intro.ownTitle")}</h3>
          <p>{$dt("dash.sources.intro.own")}</p>
        </div>
      </li>
      <li>
        <span class="points__icon" aria-hidden="true"><Icon name="mail" size={16} /></span>
        <div>
          <h3 class="points__title">{$dt("dash.sources.intro.changeTitle")}</h3>
          <p>{$dt("dash.sources.intro.change")}</p>
        </div>
      </li>
    </ul>
  {/if}
</Card>

<style lang="scss">
  .lead { margin: 0; color: var(--text-1); font-size: var(--fs-md); line-height: var(--lh-normal); max-width: 68ch; }
  .points { list-style: none; margin: var(--space-4) 0 0; padding: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: var(--space-4); }
  .points li { display: flex; gap: var(--space-3); align-items: flex-start; }
  .points__icon { display: grid; place-items: center; width: 2rem; height: 2rem; border-radius: var(--radius-full); background: var(--surface-2); color: var(--text-1); flex-shrink: 0; }
  .points__title { margin: 0 0 var(--space-1); font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-1); }
  .points p { margin: 0; font-size: var(--fs-sm); color: var(--text-2); line-height: var(--lh-normal); }
</style>
