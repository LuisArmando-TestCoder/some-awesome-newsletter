<script lang="ts">
  import SubmitButton from "../../../buttons/SubmitButton/SubmitButton.svelte";
  import PlainText from "../../../inputs/PlainText/PlainText.svelte";
  import ColorPicker from "../../../inputs/ColorPicker/ColorPicker.svelte";
  import Switch from "../../../selectors/Switch/Switch.svelte";
  import CardComponent from "../../../selectors/Card/Card.svelte";
  import logout from "../../../requests/logout.ts";
  import store, { saveToConfig, saveToStore } from "../../../../store.ts";
  import MarkdownText from "../../../texts/MarkdownText/MarkdownText.svelte";
  import ToggleCard from "../../../buttons/ToggleCard/ToggleCard.svelte";
  import Text from "../../../texts/Text/Text.svelte";

  export let canReveal = false;
  function updateToggle(key: string, newState: boolean) {
    const currentStore = $store;
    const autoCollapse = currentStore.autoCollapse;
    const currentToggles = currentStore.toggles || {};

    let newToggles = { ...currentToggles };

    if (autoCollapse && newState) {
      Object.keys(newToggles).forEach((k) => {
        newToggles[k] = k === key;
      });
    } else {
      newToggles[key] = newState;
    }
    saveToStore({ toggles: newToggles });
  }
</script>

<div class="dashboard">
  <div class="pad grid">
    <CardComponent {canReveal} label="Global Configuration">
      <div class="group">
        <ToggleCard
          {canReveal}
          cardTitle="Current **brand color**"
          isOpen={$store.toggles?.brandColor || false}
          onChange={(isOpen) => updateToggle("brandColor", isOpen)}
        >
          <MarkdownText canReveal={canReveal && $store.toggles?.brandColor}>
            --This is the color your newsletters will present in their highlighted words--
          </MarkdownText>
          <ColorPicker
            canReveal={canReveal && $store.toggles?.brandColor}
            selectedColor={$store.config.brandColor}
            onChange={(value) => {
              saveToConfig({
                brandColor: value,
              });
            }}
          />
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Newsletter **Subject**"
          isOpen={$store.toggles?.newsletterSubject || false}
          onChange={(isOpen) => updateToggle("newsletterSubject", isOpen)}
        >
          <PlainText
            placeholder="Change your newsletter subject"
            value={$store.config.newsletterSubject}
            onChange={(value) => {
              saveToConfig({
                newsletterSubject: value,
              });
            }}
          />
          <MarkdownText canReveal={canReveal && $store.toggles?.newsletterSubject}>
            --Keep it concise, clear, and curiosity-driven—use power words, or cliffhangers to make the reader eager to open the email--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Newsletter **Title**"
          isOpen={$store.toggles?.newsletterTitle || false}
          onChange={(isOpen) => updateToggle("newsletterTitle", isOpen)}
        >
          <PlainText
            placeholder="Change your newsletter title"
            value={$store.config.newsletterTitle}
            onChange={(value) => {
              saveToConfig({
                newsletterTitle: value,
              });
            }}
          />
          <MarkdownText canReveal={canReveal && $store.toggles?.newsletterTitle}>
            --Make it feel personal, like a message from a friend, not a brand--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Sender **Name**"
          isOpen={$store.toggles?.senderName || false}
          onChange={(isOpen) => updateToggle("senderName", isOpen)}
        >
          <PlainText
            placeholder="Change your email sender name"
            value={$store.config.senderName}
            onChange={(value) => {
              saveToConfig({
                senderName: value,
              });
            }}
          />
          <MarkdownText canReveal={canReveal && $store.toggles?.senderName}>
            --Indicating who the email is from helps establish trust and encourage engagement--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Email **Signature**"
          isOpen={$store.toggles?.emailSignature || false}
          onChange={(isOpen) => updateToggle("emailSignature", isOpen)}
        >
          <PlainText
            placeholder="Change your email signature"
            value={$store.config.emailSignature}
            onChange={(value) => {
              saveToConfig({
                emailSignature: value,
              });
            }}
          />
          <MarkdownText canReveal={canReveal && $store.toggles?.emailSignature}>
            --Email signatures instil brand trust--
          </MarkdownText>
        </ToggleCard>
      </div>
      <div class="horizontal">
        <div class="pad-right">
          <Text
            text="Auto collapse is"
            type="sub-italic"
            {canReveal}
          />
          <span class="text-space" class:highlight={$store.autoCollapse}>
            {#key $store.autoCollapse}
              {$store.autoCollapse ? "on" : "off"}
            {/key}
          </span>
        </div>
        <Switch
          toggled={$store.autoCollapse}
          onChange={(autoCollapse) => {
            saveToStore({
              autoCollapse,
            });
          }}
        />
      </div>
    </CardComponent>
  </div>
  <div class="pad center">
    <SubmitButton callback={logout} label="sign out" />
  </div>
</div>

<style lang="scss">
  .text-space {
    display: inline-block;
    width: 18px;
    color: var(--color-background);
    font-style: italic;
  }

  .highlight {
    color: var(--color-foreground);
  }

  .pad-right {
    margin-right: 25px;
  }
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
  .horizontal {
    display: flex;
    place-content: center;
    justify-content: end;
  }
</style>
