<script lang="ts">
  import store, { saveToStore } from "../../../../store.ts";
  import Code from "../../../inputs/Code/Code.svelte";
  import askIsAuthCodeValid from "../../../requests/askIsAuthCodeValid.ts";
  import askForNewAuthCode from "../../../requests/askForNewAuthCode.ts";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";

  export let canReveal = false;
</script>

<Centered>
  <div class="center">
    <MarkdownText {canReveal}>
      ## **We** sent **an** auth code **to your** email
    </MarkdownText>
  </div>
  <Code
    onChange={(authCode) => {
      saveToStore({
        authCode,
      });

      console.log("some", authCode);

      if (authCode) {
        askIsAuthCodeValid();
      }
    }}
  />
  {#if $store.isAuthCodeValid === false && $store.authCode.length === 6}
    <div class="error center">
      Invalid auth code provided
    </div>
  {:else}
    <div class="center">
      <MarkdownText {canReveal}
        >Now you can **login** at **any time**</MarkdownText
      >
    </div>
  {/if}

  <button
    aria-label="Request a new code"
    class="resend"
    onclick={() => {
      askForNewAuthCode();
    }}
  >
    <MarkdownText {canReveal}>
      -- - If you didn't receive the email, you can regenerate the code here--
    </MarkdownText>
  </button>
</Centered>

<style lang="scss">
  .error {
    color: red;
  }

  .center {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .resend {
    padding: 0;
    margin: 0;
    border: 0;
    background: none;
    cursor: pointer;
    display: flex;
    justify-content: end;
    width: 100%;

    &:hover {
      & :global(div span) {
        text-decoration: underline;
      }
    }
  }
</style>
