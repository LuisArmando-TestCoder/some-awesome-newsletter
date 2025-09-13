<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--In order for clients to go from the newsletter to your website--</MarkdownText>

  <MarkdownText {canReveal}>
    ### Put your personal or organizational website
  </MarkdownText>
  <Link
    placeholder="The link to your website"
    value={$store.lead}
    onChange={(lead) =>
      saveToStore({
        lead,
      })}
    onEnter={(isValid) => {
      if (isValid)
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
    }}
  />
</Centered>
