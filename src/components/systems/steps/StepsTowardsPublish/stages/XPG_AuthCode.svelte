<script lang="ts">
  import store, { saveToStore } from "../../../../store";
  import Code from "../../../inputs/Code/Code.svelte";
  import askIsAuthCodeValid from "../../../requests/askIsAuthCodeValid";
  import askForNewAuthCode from "../../../requests/askForNewAuthCode";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import type { Writable } from "svelte/store";

  export let canReveal = false;

  let externalAuthCode: Writable<string>;
</script>

<Centered>
  <div class="center">
    <MarkdownText canReveal={$store.hasNewEmailCodeBeenSent}>
      ## **We** sent **an** auth code **to your** email
    </MarkdownText>
  </div>

  <Code
    bind:authCode={externalAuthCode}
    onChange={(authCode) => {
      saveToStore({
        authCode,
      });

      if (authCode) {
        saveToStore({
          hasNewEmailCodeBeenSent: true,
          isAuthCodeValid: true,
        });
        askIsAuthCodeValid(() => {
          externalAuthCode.set("");
        });
      }
    }}
  />
  {#if !$store.isAuthCodeValid && $store.authCode && $store.hasNewEmailCodeBeenSent}
    <div class="error center">Invalid auth code provided</div>
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
