<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";

  export let canReveal = false;

  function isValidName(name: string): boolean {
    return name?.trim().length > 0;
  }
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your **name**?
  </MarkdownText>
  <PlainText
    placeholder="Your name"
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
  .right-align {
    display: flex;
    justify-content: flex-end;
    width: 100%;
  }
</style>
