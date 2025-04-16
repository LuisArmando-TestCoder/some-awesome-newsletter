<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.js";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Enter your OpenAI API Key"
    value={$store.config.openAPIKey}
    onChange={(value) => {
      saveToConfig({ openAPIKey: value });
    }}
  />
  <MarkdownText {canReveal}>
    --*(Optional)* Your OpenAI API key allows for AI-powered content generation.--
  </MarkdownText>
</div>
