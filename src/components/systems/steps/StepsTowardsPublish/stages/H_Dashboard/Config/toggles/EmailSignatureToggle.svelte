<script lang="ts">
  import store, { saveToConfig } from "../../../../../../../store.ts";
  import MarkdownText from "../../../../../../texts/MarkdownText/MarkdownText.svelte";
  import TextArea from "../../../../../../inputs/TextArea/TextArea.svelte";

  export let canReveal = true;

  $: canReveal;
</script>

<div>
  <TextArea
    placeholder="Change your email signature HTML here"
    value={$store.config.emailSignature}
    onChange={(value) => {
      saveToConfig({ emailSignature: value });
    }}
  />
  <MarkdownText {canReveal}>--Email signatures instil brand trust--</MarkdownText>
  {@html $store.config.emailSignature ? $store.config.emailSignature : "No email signature set"}
</div>
