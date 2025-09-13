<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Change your newsletter title"
    value={$store.config.newsletterTitle}
    onChange={(value) => {
      saveToConfig({ newsletterTitle: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Make it feel personal, like a message from a friend--
  </MarkdownText>
</div>
