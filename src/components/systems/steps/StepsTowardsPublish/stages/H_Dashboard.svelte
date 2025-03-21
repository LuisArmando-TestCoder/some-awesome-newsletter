<script lang="ts">
  import type { Store, Country, Language, Card } from "../../../../types.ts"; // Only import what you use

  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import Email from "../../../inputs/Email/Email.svelte";
  import Code from "../../../inputs/Code/Code.svelte";
  import ColorPicker from "../../../inputs/ColorPicker/ColorPicker.svelte";
  import ScheduleTime from "../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import LinkInput from "../../../inputs/Link/Link.svelte";
  import Checkbox from "../../../selectors/Checkbox/Checkbox.svelte";
  import Radio from "../../../selectors/Radio/Radio.svelte";
  import Switch from "../../../selectors/Switch/Switch.svelte";
  import CountrySelector from "../../../selectors/Country/Country.svelte";
  import CardComponent from "../../../selectors/Card/Card.svelte";
  import Centered from "../../../wrappers/Centered/Centered.svelte";
  import logout from "../../../requests/logout.ts";
  import store from "../../../../store.ts";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import ToggleCard from "../../../buttons/ToggleCard/ToggleCard.svelte";

  export let canReveal = false;
</script>

<div class="dashboard">
  {#key $store?.config}
    <div class="pad grid">
      <CardComponent {canReveal} label="Global Configuration">
        {JSON.stringify($store.config)}
        {#key $store.config}
          <div class="group">
            <ToggleCard {canReveal} cardTitle="Current **brand color**">
              <MarkdownText {canReveal}>
                --This is the color your newsletters will present in their highlighted words--</MarkdownText
              >
              <ColorPicker />
            </ToggleCard>
            <ToggleCard {canReveal} cardTitle="Newsletter Subject">
              <PlainText
                placeholder="Change your newsletter subject"
                value={$store.config.newsletterSubject}
              />
              <MarkdownText {canReveal}
                >--Keep it concise, clear, and curiosity-driven—use power words, or cliffhangers to make the reader eager to open the email--</MarkdownText
              >
            </ToggleCard>
            <ToggleCard {canReveal} cardTitle="Newsletter Title">
              <MarkdownText {canReveal}></MarkdownText>
              <PlainText
                placeholder="Change your newsletter title"
                value={$store.config.newsletterTitle}
              />
              <MarkdownText {canReveal}
                >--Make it feel personal, like a message from a friend, not a brand--</MarkdownText
              >
            </ToggleCard>
            <ToggleCard {canReveal} cardTitle="Sender Name">
              <PlainText
                placeholder="Change your email sender name"
                value={$store.config.senderName}
              />
              <MarkdownText {canReveal}
                >--Indicating who the email is from helps establish trust and encourage engagement--</MarkdownText
              >
            </ToggleCard>
            <ToggleCard {canReveal} cardTitle="Email Signature">
              <PlainText
                placeholder="Change your email signature"
                value={$store.config.emailSignature}
              />
              <MarkdownText {canReveal}
                >--Email signatures instil brand trust--</MarkdownText
              >
            </ToggleCard>
          </div>
        {/key}
      </CardComponent>
    </div>
    <div class="pad center">
      <SubmitButton callback={logout} label="sign out" />
    </div>
  {/key}
</div>

<style lang="scss">
  .dashboard {
    padding: 50px 0;
    max-height: 100vh;
    overflow: auto;
  }

  .grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 25px;

    @media (max-width: 720px) {
      grid-template-columns: 1fr;
    }
  }

  .pad {
    padding: 25px;
    margin: 25px;
  }

  .center {
    display: flex;
    justify-content: center;
  }

  .right {
    display: flex;
    justify-content: right;
  }
</style>
