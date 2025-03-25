<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.ts";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Change your newsletter subject"
    value={$store.config.newsletterSubject}
    onChange={(value) => {
      saveToConfig({ newsletterSubject: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Keep it concise, clear, and curiosity-driven--
  </MarkdownText>
</div>
