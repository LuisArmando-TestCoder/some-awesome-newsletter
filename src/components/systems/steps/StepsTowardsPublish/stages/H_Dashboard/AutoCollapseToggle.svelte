<script lang="ts">
  import TextTypes from "../../../../texts/TextTypes/TextTypes.svelte";
  import Switch from "../../../../selectors/Switch/Switch.svelte";
  import ToggleCard from "../../../../buttons/ToggleCard/ToggleCard.svelte";
  import camelCaseToCapitalized from "../../../../helpers/camelCaseToCapitalized";

  export let autoCollapse = true;
  export let toggles: { [index: string]: [any, boolean?] };
  export let canReveal = true;

  function updateToggle(key: string, newState: boolean) {
    const currentToggles = toggles || {};

    let newToggles = { ...currentToggles };

    if (autoCollapse && newState) {
      Object.entries(newToggles).forEach(([k]) => {
        newToggles[k][1] = k === key;
      });
    } else {
      newToggles[key][1] = newState;
    }

    toggles = newToggles;
  }

  $: canReveal;
</script>

<div class="horizontal">
  <div class="pad-right">
    <TextTypes type="sub-italic">Auto collapse is</TextTypes>
    <span class="text-space" class:highlight={autoCollapse}>
      {#key autoCollapse}
        {autoCollapse ? "on" : "off"}
      {/key}
    </span>
  </div>
  <Switch
    toggled={autoCollapse}
    onChange={(value) => {
      autoCollapse = value;
    }}
  />
</div>
<div class="group">
  {#each Object.entries(toggles) as [title, [Component]]}
    {#key title}
      <ToggleCard
        expanded={true}
        {canReveal}
        cardTitle={camelCaseToCapitalized(title)}
        isOpen={toggles?.[title][1]}
        onChange={(isOpen) => updateToggle(title, isOpen)}
      >
        <svelte:component this={Component} {canReveal} />
      </ToggleCard>
    {/key}
  {/each}
</div>

<style lang="scss">
  @use "./Dashboard.scss";
</style>