<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--In order for clients to go from the newsletter to your website--</MarkdownText>

  <MarkdownText {canReveal}>
    This is highly recommended. It helps our AI to better understand the context of your newsletter and generate more relevant articles.
  </MarkdownText>
  <MarkdownText {canReveal}>
    ### Do you have a website? (optional)
  </MarkdownText>
  <Link
    placeholder="The link to your website"
    value={$store.lead}
    onChange={(lead) =>
      saveToStore({
        lead,
      })}
    onEnter={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}
  />
  <br>
  <div class="submit">
    <SubmitButton callback={() => saveToStore({ stepsIndex: $store.stepsIndex + 1 })}/>
  </div>
</Centered>
<style>
  .submit {
    display: flex;
    justify-content: end;
  }
</style>
