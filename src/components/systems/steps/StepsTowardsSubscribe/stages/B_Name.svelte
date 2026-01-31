<script lang="ts">
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/subscribe-translations';

  export let canReveal = false;

  $: $t;

  function isValidName(name: string): boolean {
    return name?.trim().length > 0;
  }
</script>

<Centered>
  <h3>{$t.name.title}</h3>
  <PlainText
    placeholder={$t.name.placeholder}
    value={$store.subscriberName}
    onChange={(value) => {
      saveToStore({
        subscriberName: value,
      });
    }}
  />
  <div class="right-align">
    {#if isValidName($store.subscriberName)}
      <SubmitButton
        callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}
      />
    {/if}
  </div>
</Centered>

<style>
  h3 {
    font-family: var(--font-title);
    font-size: 22px;
    color: var(--color-background);
    line-height: 1.5;
    margin: 0.5em 0;
  }

  .right-align {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
