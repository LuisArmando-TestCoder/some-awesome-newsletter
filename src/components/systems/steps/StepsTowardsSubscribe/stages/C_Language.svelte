<script lang="ts">
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import LanguageInput from "../../../inputs/Language/Language.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/subscribe-translations';

  export let canReveal = false;

  $: $t;
</script>

<Centered>
  <h3>{$t.language.title}</h3>

  <LanguageInput
    defaultLanguageCode={$store.subscriberLanguage || null}
    onSelect={(language) => {
      if (language) saveToStore({ subscriberLanguage: language });
    }}
  />
  <div class="right-align">
    {#if $store.subscriberLanguage}
      <SubmitButton
        callback={async () => {
          const response = await fetch("/subscribe-widget/subscribe", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: $store.subscriberEmail,
              configuratorId: $store.subscriberConfiguratorId,
              newsSourceId: $store.subscriberNewsSourceId,
            }),
          });
          const data = await response.json();

          if (data.paymentUrl) {
            window.location.href = data.paymentUrl;
            return;
          }

          saveToStore({ stepsIndex: $store.stepsIndex + 1 });
        }}
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
