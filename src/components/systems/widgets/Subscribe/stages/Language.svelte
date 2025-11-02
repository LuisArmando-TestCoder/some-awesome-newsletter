<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import LanguageInput from "../../../inputs/Language/Language.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your preferred language?
  </MarkdownText>

  <LanguageInput
    defaultLanguageCode={$store.widgetLanguage || 'en'}
    onSelect={(language) => {
      if (language) saveToStore({ widgetLanguage: language });
    }}
  />
  <div class="right-align">
    {#if $store.widgetLanguage}
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
