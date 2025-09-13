<script lang="ts">
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import store, { saveToStore } from "../../../../store";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <MarkdownText {canReveal}>--You will use this email to sign in into our automatic newsletter configuration dashboard--</MarkdownText>
  
  <MarkdownText {canReveal}
    >### Your account's email</MarkdownText
  >
  <Email
    placeholder="The email you will be using to log-in here from now on"
    value={$store.configuratorEmail}
    onChange={(value) => {
      saveToStore({
        configuratorEmail: value,
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
