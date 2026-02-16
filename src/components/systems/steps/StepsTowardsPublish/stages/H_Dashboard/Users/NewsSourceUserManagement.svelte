<script lang="ts">
  import { tick } from "svelte";
  import { get, writable } from "svelte/store";
  import type { Writable } from "svelte/store";
  import type { NewsSource, NewsletterUser } from "../../../../../../types";
  import store, { latestMessage } from "../../../../../../store";
  import updateConfiguration from "../../../../../requests/updateConfiguration";
  import getConfiguratorSession from "../../../../../requests/getConfiguratorSession";
  import * as UserDataService from "./UserDataService";
  import { userRemovalRequestStore } from "./userActions";

  import ManualAddUserForm from "./ManualAddUserForm.svelte";
  import BulkAddUserSection from "./BulkAddUserSection.svelte";
  import UserCard from "./UserCard.svelte";

  import Switch from "../../../../../selectors/Switch/Switch.svelte";
  import ToggleCard from "../../../../../buttons/ToggleCard/ToggleCard.svelte";
  import TextTypes from "../../../../../texts/TextTypes/TextTypes.svelte";
  import Pagination from "../../../../../../Pagination/Pagination.svelte";
  import SearchBar from "../../../../../../SearchBar/SearchBar.svelte";
  import TextArea from "../../../../../inputs/TextArea/TextArea.svelte";
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  import SubmitButton from "../../../../../buttons/SubmitButton/SubmitButton.svelte";
  
  import triggerNewsSourceSend from "../../../../../requests/triggerNewsSourceSend.js";
  import sendCustomContent from "../../../../../requests/sendCustomContent";
  import { checkPlanLimit } from "$lib/utils/checkPlanLimits";
  
  // Import translation store
  import { t } from "$lib/i18n/dashboard-translations";

  export let newsSource: NewsSource;
  export let subscribers: NewsletterUser[] = [];
  export let canReveal: boolean = true;
  export let openNewsSourceIdStore: Writable<string | null>;

  let isAddingFormVisible: boolean = false;
  let actionFeedback: { type: "success" | "error"; message: string } | null = null;
  let isPerformingAction: boolean = false;
  let removingUserEmail: string | null = null;
  let isUpdatingActive: boolean = false;
  let isTriggeringSend: boolean = false;
  let customEmailContent: string = "";
  let isSendingCustomContent: boolean = false;
  let searchTerm = "";
  let currentPage = 0;
  const pageSize = 5;

  $: isOpen = $openNewsSourceIdStore === newsSource.id;
  $: sourceName = newsSource.url?.split("//")[1]?.split("/")[0] ?? newsSource.id;
  
  $: limitCheck = checkPlanLimit("users");
  $: isLimitReached = !limitCheck.allowed;

  // Translated Titles
  $: cardTitle = `${$t['labels.subscribersFor']}: ${sourceName}`;
  $: subscriberCount = subscribers.length;

  $: reversedSubscribers = subscribers
    ? [...subscribers]
        .reverse()
        .filter((s) =>
          `${s.name} ${s.email} ${s.bio}`.toLowerCase().includes(searchTerm.toLowerCase()),
        )
    : [];

  $: paginatedSubscribers = reversedSubscribers.slice(
    currentPage * pageSize,
    (currentPage + 1) * pageSize
  );

  function handlePageChange(event: CustomEvent<{ page: number }>) {
    currentPage = event.detail.page;
  }

  function handleSearch(event: CustomEvent<{ value: string }>) {
    searchTerm = event.detail.value;
    currentPage = 0;
  }

  $: if (
    $userRemovalRequestStore &&
    $userRemovalRequestStore.newsSourceId === newsSource.id
  ) {
    const { email } = $userRemovalRequestStore;
    userRemovalRequestStore.set(null);
    handleRemoveUser(email);
  }

  async function handleSendCustomContent() {
    if (!customEmailContent.trim()) {
      setFeedback("error", $t['errors.contentEmpty']);
      return;
    }
    if (isSendingCustomContent) return;

    isSendingCustomContent = true;
    clearFeedback();
    latestMessage.set($t['messages.initiatingCustomSend']);

    try {
      const success = await sendCustomContent(
        get(store).configuratorEmail, 
        newsSource.id, 
        customEmailContent
      );
      if (success) {
        setFeedback("success", $t['messages.customSendSuccess'].replace('{source}', sourceName));
        customEmailContent = "";
      } else {
        setFeedback("error", $t['errors.customSendFailed'].replace('{source}', sourceName));
      }
    } catch (error: any) {
      setFeedback("error", error.message || $t['errors.unexpectedError']);
    } finally {
      isSendingCustomContent = false;
      latestMessage.set("");
    }
  }

  async function handleTriggerSend() {
    if (!newsSource || !newsSource.id) {
      setFeedback("error", $t['errors.missingSourceId']);
      return;
    }
    if (isTriggeringSend) return;

    isTriggeringSend = true;
    clearFeedback();

    try {
      const response = await triggerNewsSourceSend(newsSource.id);
      if (typeof response === "boolean" && response) {
        setFeedback("success", $t['messages.newsletterInitiated'].replace('{source}', sourceName));
      } else {
        setFeedback("error", String(response));
       }
     } catch (error: any) {
       setFeedback("error", error.message || $t['errors.triggerFailed']);
     } finally {
       isTriggeringSend = false;
    }
  }

  async function handleToggleActive(newState: boolean) {
    if (!$store.config || !$store.config.newsSources) {
      setFeedback("error", $t['errors.configMissing']);
      return;
    }

    isUpdatingActive = true;
    clearFeedback();

    const currentNewsSources = JSON.parse(JSON.stringify($store.config.newsSources));
    const sourceIndex = currentNewsSources.findIndex((ns: NewsSource) => ns.id === newsSource.id);

    if (sourceIndex === -1) {
      setFeedback("error", $t['errors.sourceNotFound']);
      isUpdatingActive = false;
      return;
    }

    currentNewsSources[sourceIndex].active = newState;

    try {
      const success = await updateConfiguration({ newsSources: currentNewsSources });
      if (success) {
        const statusKey = newState ? $t['labels.activated'] : $t['labels.deactivated'];
        setFeedback("success", $t['messages.sourceStatusUpdated'].replace('{status}', statusKey));
        await getConfiguratorSession();
      } else {
        setFeedback("error", $t['errors.updateStatusFailed']);
      }
    } catch (error: any) {
      setFeedback("error", error.message || $t['errors.updateStatusFailed']);
      await getConfiguratorSession();
    } finally {
      isUpdatingActive = false;
    }
  }

  function toggleAddFormVisibility() {
    isAddingFormVisible = !isAddingFormVisible;
    actionFeedback = null;
  }

  function clearFeedback() {
    actionFeedback = null;
  }

  function setFeedback(type: "success" | "error", message: string, duration: number = 5000) {
    actionFeedback = { type, message };
    tick().then(() => {
      if (actionFeedback) {
        setTimeout(clearFeedback, duration);
      }
    });
  }

  async function handleManualAdd(formData: Pick<NewsletterUser, "name" | "email" | "bio" | "language">) {
    clearFeedback();
    isPerformingAction = true;

    try {
      await UserDataService.addUserAndSubscribe(formData, newsSource.id);
      setFeedback("success", $t['messages.userAddedSuccess'].replace('{email}', formData.email));
      isAddingFormVisible = false;
    } catch (error: any) {
      setFeedback("error", error.message || $t['errors.addUserFailed']);
    } finally {
      isPerformingAction = false;
    }
  }

  async function handleBulkAdd(file: File | null) {
    if (!file) return;
    clearFeedback();
    isPerformingAction = true;

    try {
      const result = await UserDataService.processBulkUpload(file, newsSource.id);
      let feedbackType: "success" | "error" = result.errorMessage ? "error" : "success";
      let message = result.successMessage + (result.errorMessage ? ` | ${$t['labels.errors']}: ${result.errorMessage}` : "");
      
      setFeedback(feedbackType, message, 7000);
      isAddingFormVisible = false;
    } catch (error: any) {
      setFeedback("error", error.message || $t['errors.bulkUploadFailed']);
    } finally {
      isPerformingAction = false;
    }
  }

  async function handleRemoveUser(email: string) {
    const confirmMessage = ($t['messages.confirmUnsubscribe'] || 'Unsubscribe {email}?')
      .replace('{email}', email)
      .replace('{source}', sourceName);

    if (!confirm(confirmMessage)) {
      return;
    }

    clearFeedback();
    removingUserEmail = email;

    try {
      await UserDataService.unsubscribeUserFromSource(email, newsSource.id);
      setFeedback("success", $t['messages.unsubscribeSuccess'].replace('{email}', email).replace('{source}', sourceName));
    } catch (error: any) {
      setFeedback("error", error.message || $t['errors.unsubscribeFailed']);
    } finally {
      removingUserEmail = null;
    }
  }
</script>

<ToggleCard
  {canReveal}
  cardTitle="{cardTitle} {!isOpen ? `(${subscriberCount})` : ''}"
  {isOpen}
  onChange={(newIsOpenState) => openNewsSourceIdStore.set(newIsOpenState ? newsSource.id : null)}
>
  <div class="switch-container" class:disabled={isUpdatingActive}>
    <span class="status-label">
      {newsSource.active ?? false ? $t['labels.active'] : $t['labels.inactive']}:
    </span>
    <Switch
      toggled={newsSource.active ?? false}
      onChange={handleToggleActive}
    />
  </div>

  <div class="add-user-section" class:section-disabled={isLimitReached}>
    {#if isLimitReached}
      <div class="limit-warning">
        <p><strong>Plan Limit Reached:</strong> You have {limitCheck.current} subscribers (Limit: {limitCheck.limit}). <a href="/plans">Upgrade</a> to add more.</p>
      </div>
    {/if}

    <IconButton
      src="/icons/plus.svg"
      label={isAddingFormVisible ? $t['labels.cancelAdding'] : $t['labels.addNewSubscriber']}
      callback={toggleAddFormVisibility}
      disabled={isPerformingAction || isLimitReached}
    />

    {#if actionFeedback}
      <div class="feedback-message {actionFeedback.type}">
        {actionFeedback.message}
        <button class="close-feedback" on:click={clearFeedback} aria-label={$t['labels.dismiss']}>×</button>
      </div>
    {/if}

    {#if isPerformingAction}
      <div class="loading-indicator">
        <p>{$t['messages.addingUserWait']}</p>
      </div>
    {/if}

    {#if isAddingFormVisible}
      <div class="add-forms-container" id={`add-forms-${newsSource.id}`}>
        <ManualAddUserForm onSubmit={handleManualAdd} disabled={isPerformingAction} />
        <hr class="section-separator" />
        <BulkAddUserSection newsSourceId={newsSource.id} onUpload={handleBulkAdd} disabled={isPerformingAction} />
      </div>
    {/if}
  </div>

  <div class="subscriber-list-section">
    <TextTypes type="subtitle">
      {$t['labels.currentSubscribers']} ({subscriberCount})
    </TextTypes>

    <SearchBar
      placeholder={$t['placeholders.searchSubscribers']}
      on:search={handleSearch}
    />

    {#if subscriberCount > 0}
      <div class="subscriber-cards-container">
        {#each paginatedSubscribers as user (user.email)}
          <UserCard {user} newsSourceId={newsSource.id} disabled={removingUserEmail === user.email} />
        {/each}
      </div>
      <Pagination {currentPage} totalItems={reversedSubscribers.length} {pageSize} on:pageChange={handlePageChange} />
    {:else}
      <p style="margin-top: 0.5rem;">
        <TextTypes type="sub-italic">{$t['messages.noSubscribers']}</TextTypes>
      </p>
    {/if}
  </div>

  <div class="trigger-send-container">
    <SubmitButton
      label={$t['labels.sendNewsletterNow']}
      callback={() => handleTriggerSend()}
      loading={isTriggeringSend}
      disabled={isUpdatingActive || isPerformingAction || isSendingCustomContent}
    />
  </div>

  <div class="custom-content-send-section">
    <TextTypes type="subtitle">
      {$t['labels.sendCustomMessageTo'].replace('{source}', sourceName)}
    </TextTypes>
    <TextArea
      bind:value={customEmailContent}
      label={$t['labels.customMessageContent']}
      placeholder={$t['placeholders.typeDirectMessage']}
      rows={8}
      disabled={isSendingCustomContent || isTriggeringSend}
    />
    <div class="custom-send-button-container">
      <SubmitButton
        label={$t['labels.sendCustomMessage']}
        callback={handleSendCustomContent}
        loading={isSendingCustomContent}
        disabled={!customEmailContent.trim() || isTriggeringSend || isUpdatingActive || isPerformingAction}
      />
    </div>
  </div>
</ToggleCard>

<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";

  .status-label {
    font-size: 0.8em; 
    color: var(--color-text-secondary); 
    margin-right: 0.5rem;
  }

  .trigger-send-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 1rem;
  }

  .custom-content-send-section {
    margin-top: 1.5rem;
    padding-top: 1rem;
    border-top: 1px solid var(--color-border-light, #eee);
  }
  
  .custom-send-button-container {
    display: flex;
    justify-content: flex-end;
    margin-top: 0.75rem;
  }

  .switch-container {
    display: flex;
    justify-content: end;
    align-items: center;
    margin-left: 1rem;
    transition: opacity 0.3s ease;

    &.disabled {
      opacity: 0.5;
      pointer-events: none;
    }
  }

  .add-user-section {
    margin-bottom: 1rem;
  }

  .section-disabled {
    opacity: 0.7;
    /* We don't disable pointer events globally so the upgrade link works */
  }

  .limit-warning {
    background-color: var(--color-warning-light, #fff3cd);
    border: 1px solid var(--color-warning, #ffc107);
    color: var(--color-warning-dark, #856404);
    padding: 0.75rem;
    border-radius: var(--radius-s);
    margin-bottom: 1rem;
    font-size: 0.9rem;
    
    a {
      color: inherit;
      text-decoration: underline;
      font-weight: bold;
    }
  }

  .add-forms-container {
    margin-top: 1rem;
    padding: 1rem;
    border: 1px dashed var(--color-border-light, #ccc);
    border-radius: var(--radius-m);
    background-color: var(--color-background-inversion);
  }

  .section-separator {
    border: none;
    border-top: 1px solid var(--color-border-light, #eee);
    margin: 1.5rem 0;
  }

  .subscriber-list-section {
    margin-top: 1rem;
  }

  .subscriber-cards-container {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    margin-top: 0.5rem;
  }

  .feedback-message {
    position: relative;
    padding: 0.75rem 2rem 0.75rem 1rem;
    margin: 1rem 0 0.5rem 0;
    border-radius: var(--radius-s);
    font-size: 0.9rem;
    border: 1px solid transparent;

    &.success {
      background-color: var(--color-success-light, #e8f5e9);
      border-color: var(--color-success, #4caf50);
      color: var(--color-success-dark, #1b5e20);
    }

    &.error {
      background-color: var(--color-error-light, #ffebee);
      border-color: var(--color-error, #f44336);
      color: var(--color-error-dark, #c62828);
    }

    .close-feedback {
      position: absolute;
      top: 50%;
      right: 0.5rem;
      transform: translateY(-50%);
      background: none;
      border: none;
      cursor: pointer;
      font-size: 1.4em;
      line-height: 1;
      padding: 0.2rem;
      color: inherit;
      opacity: 0.7;
      &:hover {
        opacity: 1;
      }
    }
  }

  .loading-indicator {
    margin-top: 1rem;
    padding: 1rem;
    background-color: var(--color-background-secondary);
    border-radius: var(--radius-m);
    text-align: center;
    color: var(--color-text-secondary);
  }

  .loading-indicator p::after {
    content: '.';
    animation: ellipsis 1.5s infinite;
    display: inline-block;
    width: 1em;
    text-align: left;
  }

  @keyframes ellipsis {
    0% { content: '.'; }
    33% { content: '..'; }
    66% { content: '...'; }
    100% { content: '.'; }
  }
</style>