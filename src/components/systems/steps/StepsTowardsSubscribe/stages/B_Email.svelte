<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import store, { saveToStore } from "../../../../store.ts";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>
    ### Where should we **send** your **AI insights**?
  </MarkdownText>
  <Email
    placeholder="Your email"
    value={$store.subscriberEmail}
    onChange={(value) => {
      saveToStore({
        subscriberEmail: value,
      });
    }}
    onEnter={(isValid) => {
      if (isValid)
        saveToStore({
          stepsIndex: $store.stepsIndex + 1,
        });
    }}
  />
</Centered>
