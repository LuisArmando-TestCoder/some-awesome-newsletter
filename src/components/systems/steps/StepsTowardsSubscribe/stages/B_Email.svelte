<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
    import Email from "../../../inputs/Email/Email.svelte";

  export let canReveal = false;

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### Where should we **send** your **AI insights**?
  </MarkdownText>
  <Email
    placeholder="Your email"
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
  .right-align {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
