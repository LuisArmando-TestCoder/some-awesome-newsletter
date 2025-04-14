<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import store, { saveToStore } from "../../../../store.ts";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import Language from "../../../inputs/Language/Language.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### What's your **preferred language** for the newsletter?
  </MarkdownText>
  <Language
    label="Preferred Language"
    onSelect={(subscriberLanguage) => {
      saveToStore({
        subscriberLanguage,
        stepsIndex: $store.stepsIndex + 1,
      })
    }}
  />
</Centered>
