<script lang="ts">
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import { t } from '$lib/i18n/subscribe-translations';

  export let canReveal = false;

  $: $t;

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<Centered>
  <h3>{$t.email.title}</h3>
  <Email
    placeholder={$t.email.placeholder}
    onChange={(value) => {
      saveToStore({
        subscriberEmail: value,
      });
    }}
  />
  <div class="right-align">
    {#if isValidEmail($store.subscriberEmail)}
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
