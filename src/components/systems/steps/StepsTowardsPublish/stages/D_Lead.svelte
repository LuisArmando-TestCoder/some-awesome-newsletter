<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store.ts";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--Let's start with your lead--</MarkdownText>

  <MarkdownText {canReveal}>
    ### Where do you want to **lead** your clients?
  </MarkdownText>
  <Link
    placeholder="Your website's URL"
    value={$store.lead}
    onChange={(lead) =>
      saveToStore({
        lead,
      })}
  />
</Centered>
