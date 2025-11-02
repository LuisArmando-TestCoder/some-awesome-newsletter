<script lang="ts">
  import { onMount } from "svelte";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import EmailInput from "../../../inputs/Email/Email.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";

  export let canReveal = false;
  let localEmail = "";

  onMount(() => {
    localEmail = $store.widgetEmail || "";
  });

  function handleChange(value: string) {
    localEmail = value;
    saveToStore({ widgetEmail: value });
  }

  function isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your email?
  </MarkdownText>
  <EmailInput
    placeholder="Your email"
    onChange={handleChange}
  />
  <div class="right-align">
    {#if isValidEmail(localEmail)}
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
