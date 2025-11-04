<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Link from "../../../inputs/Link/Link.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import { t } from '$lib/i18n/translations';

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--{$t.lead.title}--</MarkdownText>

  <MarkdownText {canReveal}>
    {$t.lead.recommendation}
  </MarkdownText>
  <MarkdownText {canReveal}>
    ### {$t.lead.question}
  </MarkdownText>
  <Link
    placeholder={$t.lead.placeholder}
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
