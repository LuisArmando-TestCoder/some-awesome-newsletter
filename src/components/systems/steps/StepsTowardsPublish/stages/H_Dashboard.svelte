<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard.svelte -->
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
  import ScheduleTime from "../../../inputs/ScheduleTime/ScheduleTime.svelte";
  import createNewsSource from "../../../requests/createNewsSource.ts";
  import { get } from "svelte/store";
  import Link from "../../../inputs/Link/Link.svelte";

  export let canReveal = true;

  // Función para actualizar toggles (para mantener la lógica de auto collapse)
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

  // Variables para la sección de Brand Configuration (ya existentes)
  // (Se mantienen las secciones actuales para la configuración de marca)

  // Variables locales para el formulario de News Sources
  let newsSourceUrl = "";
  let newsSourceLead = "";
  let newsSourcePersonality = "";
  let newsSourceSchedule = "";

  let isAdding = false;
  let errorMessage = "";

  async function handleAddNewsSource() {
    // Validar que se hayan ingresado todos los campos
    if (
      !newsSourceUrl ||
      !newsSourceLead ||
      !newsSourceSchedule ||
      !newsSourcePersonality
    ) {
      errorMessage = "Please fill in all the fields.";
      return;
    }
    isAdding = true;
    errorMessage = "";

    const newSource = {
      type: "website", // Fijo en "website"; puedes extenderlo si lo necesitas.
      url: newsSourceUrl,
      country: "US", // Fijo; se puede modificar para incluir un selector de país.
      community: "Expats from US", // Fijo
      lead: newsSourceLead,
      scheduleTime: newsSourceSchedule,
      personality: newsSourcePersonality,
    };

    const created = await createNewsSource(newSource);
    if (created) {
      // Actualizamos la configuración en el store agregando la nueva fuente.
      const currentConfig = $store.config;
      if (currentConfig && Array.isArray(currentConfig.newsSources)) {
        currentConfig.newsSources.push(created);
        saveToStore({ config: currentConfig });
      }
      // Limpiamos el formulario
      newsSourceUrl = "";
      newsSourceLead = "";
      newsSourcePersonality = "";
      newsSourceSchedule = "";
    } else {
      errorMessage = "Failed to add news source. Please try again.";
    }
    isAdding = false;
  }
</script>

<div class="dashboard">
  <div class="pad grid scenario">
    <!-- Sección de Brand Configuration -->
    <CardComponent
      collapsed={true}
      {canReveal}
      svg="user-gear-solid"
      label="**Brand Configuration**"
    >
      <div class="horizontal">
        <div class="pad-right">
          <TextTypes type="sub-italic">Auto collapse is</TextTypes>
          <span class="text-space" class:highlight={$store.autoCollapse}>
            {#key $store.autoCollapse}
              {$store.autoCollapse ? "on" : "off"}
            {/key}
          </span>
        </div>
        <Switch
          toggled={$store.autoCollapse}
          onChange={(autoCollapse) => {
            saveToStore({ autoCollapse });
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
          <MarkdownText {canReveal}>
            --This is the color your newsletters will present in their
            highlighted words--
          </MarkdownText>
          <ColorPicker
            {canReveal}
            selectedColor={$store.config.brandColor}
            onChange={(value) => {
              saveToConfig({ brandColor: value });
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
              saveToConfig({ newsletterSubject: value });
            }}
          />
          <MarkdownText {canReveal}>
            --Keep it concise, clear, and curiosity-driven--
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
              saveToConfig({ newsletterTitle: value });
            }}
          />
          <MarkdownText {canReveal}>
            --Make it feel personal, like a message from a friend--
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
              saveToConfig({ senderName: value });
            }}
          />
          <MarkdownText {canReveal}>
            --Indicating who the email is from helps establish trust--
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
              saveToConfig({ emailSignature: value });
            }}
          />
          <MarkdownText {canReveal}>
            --Email signatures instil brand trust--
          </MarkdownText>
        </ToggleCard>
      </div>
    </CardComponent>

    <!-- Sección de News Sources -->
    <CardComponent
      collapsed={false}
      {canReveal}
      svg="idea"
      label="News Sources"
    >
      <!-- Formulario para agregar una nueva news source -->
      <form
        class="news-source-form"
        on:submit|preventDefault={handleAddNewsSource}
      >
        <Link
          placeholder="News Source URL"
          value={$store.newsSource}
          onChange={(val) => (newsSourceUrl = val)}
        />
        <Link
          placeholder="Lead (destination URL or identifier)"
          value={$store.lead}
          onChange={(val) => (newsSourceLead = val)}
        />
        <PlainText
          placeholder="Personality (describe the news source tone)"
          value={newsSourcePersonality}
          onChange={(val) => (newsSourcePersonality = val)}
        />
        <ScheduleTime
          placeholder="e.g., 'every Monday at 9 AM'"
          value={newsSourceSchedule}
          onChange={(schedule, cron) => (newsSourceSchedule = cron)}
        />
        <SubmitButton
          label={isAdding ? "Adding..." : "Add News Source"}
          callback={handleAddNewsSource}
        />
        {#if errorMessage}
          <MarkdownText>{errorMessage}</MarkdownText>
        {/if}
      </form>
      <!-- Lista de news sources actuales -->
      <div class="news-sources-list">
        {#if $store.config && $store.config.newsSources && $store.config.newsSources.length}
          <ul>
            {#each $store.config.newsSources as ns (ns.id)}
              <li>
                <strong>{ns.url}</strong> – {ns.lead}
              </li>
            {/each}
          </ul>
        {:else}
          <p>No news sources added yet.</p>
        {/if}
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
  .horizontal {
    display: flex;
    place-content: center;
    justify-content: end;
    user-select: none;
  }
  /* Estilos para el formulario de News Sources */
  .news-source-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }
  .news-sources-list ul {
    list-style: none;
    padding: 0;
  }
  .news-sources-list li {
    margin-bottom: 0.5rem;
  }
</style>
