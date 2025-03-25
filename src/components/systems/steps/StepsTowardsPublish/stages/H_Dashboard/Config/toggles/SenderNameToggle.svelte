<script lang="ts">
  import PlainText from "../../../../../../inputs/PlainText/PlainText.svelte";
  import store, { saveToConfig } from "../../../../../../../store.ts";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <PlainText
    placeholder="Change your email sender name"
    value={$store.config.senderName}
    onChange={(value) => {
      saveToConfig({ senderName: value });
    }}
  />
  <MarkdownText {canReveal}>
    --Indicating who the email is from helps establish trust--
  </MarkdownText>
</div>
