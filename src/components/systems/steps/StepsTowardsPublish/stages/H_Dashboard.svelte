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
  import TextTypes from "../../../texts/TextTypes/TextTypes.svelte";

  export let canReveal = true;
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
  <div class="pad grid scenario">
    <CardComponent collapsed={true} {canReveal} svg="user-gear-solid" label="**Brand Configuration**">
      <div class="horizontal">
        <div class="pad-right">
          <TextTypes
            type="sub-italic"
          >Auto collapse is</TextTypes>
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
      <div class="group">
        <ToggleCard
          {canReveal}
          cardTitle="Current brand color"
          isOpen={!!$store.toggles?.brandColor}
          onChange={(isOpen) => updateToggle("brandColor", isOpen)}
        >
          <MarkdownText canReveal={canReveal}>
            --This is the color your newsletters will present in their highlighted words--
          </MarkdownText>
          <ColorPicker
            canReveal={canReveal}
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
          cardTitle="Newsletter Subject"
          isOpen={!!$store.toggles?.newsletterSubject}
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
          <MarkdownText canReveal={canReveal}>
            --Keep it concise, clear, and curiosity-driven—use power words, or cliffhangers to make the reader eager to open the email--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Newsletter Title"
          isOpen={!!$store.toggles?.newsletterTitle}
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
          <MarkdownText canReveal={canReveal}>
            --Make it feel personal, like a message from a friend, not a brand--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Sender Name"
          isOpen={!!$store.toggles?.senderName}
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
          <MarkdownText canReveal={canReveal}>
            --Indicating who the email is from helps establish trust and encourage engagement--
          </MarkdownText>
        </ToggleCard>
        <ToggleCard
          {canReveal}
          cardTitle="Email Signature"
          isOpen={!!$store.toggles?.emailSignature}
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
          <MarkdownText canReveal={canReveal}>
            --Email signatures instil brand trust--
          </MarkdownText>
        </ToggleCard>
      </div>
    </CardComponent>
    <CardComponent collapsed={false} {canReveal} svg="idea" label="News Sources"></CardComponent>
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

  .scenario {
    height: 100vh;
  }

  .highlight {
    color: var(--color-foreground);
  }

  .pad-right {
    margin-right: 25px;
  }
  .dashboard {
    height: 100vh;
    overflow: auto;
  }
  .grid {
    display: flex;
    gap: 25px;
    justify-content: center;
    @media (max-width: 720px) {
      flex-direction: column;
      place-items: center;
    }
  }
  .pad {
    padding: 100px 0;
    box-sizing: border-box;
    
    @media (min-width: 720px) {
      padding: 100px 25px;
    }
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
    user-select: none;
  }
</style>
