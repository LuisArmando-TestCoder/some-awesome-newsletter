<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserCard.svelte -->
<script lang="ts">
  // REMOVED: import { createEventDispatcher } from "svelte";
  import { userRemovalRequestStore } from "./userActions"; // Adjust path: Up 5 levels
  import type { NewsletterUser } from "../../../../../../types"; // Adjust path
  import { t } from "$lib/i18n/dashboard-translations";

  // Import UI Components (Adjust paths as needed)
  import IconButton from "../../../../../buttons/IconButton/IconButton.svelte";
  // Removed Svg import as IconButton likely handles it

  // --- Props ---
  /** The user data object to display */
  export let user: NewsletterUser;
  /** The news source context for actions */
  export let newsSourceId: string;
  /** Disables actions, e.g., while this user is being removed */
  export let disabled: boolean = false;

  // REMOVED: const dispatch = createEventDispatcher<{ removeUser: { email: string; newsSourceId: string } }>();

  // --- Functions ---
  function handleRemoveClick() {
    if (disabled) return;
    // Set the value of the shared store to signal the removal request
    userRemovalRequestStore.set({
      email: user.email,
      newsSourceId: newsSourceId,
    });
    // The parent component will subscribe to userRemovalRequestStore
    // and perform the actual removal logic.
  }
</script>

<div class="user-card" class:disabled>
  <div class="user-card-details">
    {#if user.name}
      <div class="user-card-name">{user.name}</div>
    {/if}
    {#if user.email}
      <div class="user-card-email">{user.email}</div>
    {/if}
    <div class="user-card-meta">
      {#if user.language}<span>{$t['labels.language']}: {user.language.toUpperCase()}</span>{/if}
      {#if !user.language}<span>{$t['labels.noMetadata']}</span>{/if}
    </div>
    {#if user.bio}
      <div class="user-card-bio">{user.bio}</div>
    {/if}
  </div>

  <div class="user-card-actions">
    <IconButton
      src="./icons/trash.svg"
      label={$t['labels.unsubscribe']}
      callback={handleRemoveClick}
      {disabled}
    />
  </div>
</div>

<style lang="scss">
  @use "./Users.scss";
  @include Users.user-card;
  .user-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; // Align items to the top
    padding: 0.8rem 1rem;
    background-color: var(--surface-1);
    border: 1px solid var(--border-1);
    border-radius: var(--radius-md);
    transition: box-shadow 0.2s ease-in-out;
    gap: 1rem; // Space between details and actions

    &:hover {
      box-shadow: var(--shadow-1);
    }

    &.disabled {
      opacity: 0.6;
      background-color: var(--surface-2);
      pointer-events: none; // Prevent interactions on the whole card if disabled (optional)
    }
  }

  .user-card-details {
    flex-grow: 1; // Allow details to take up available space
    display: flex;
    flex-direction: column;
    gap: 0.2rem; // Small gap between detail lines
    overflow: hidden; // Prevent long text from breaking layout
    word-break: break-word; // Break long emails/names nicely
  }

  .user-card-name {
    font-weight: 600;
    color: var(--text-1);
    font-size: 1rem;
  }

  .user-card-email {
    font-size: 0.9rem;
    color: var(--text-2);
  }

  .user-card-meta {
    font-size: 0.8rem;
    color: var(--text-3);
    margin-top: 0.2rem;
  }

  .user-card-bio {
    font-size: 0.85rem;
    color: var(--text-2);
    margin-top: 0.4rem;
    max-width: 100%; // Ensure bio doesn't overflow card horizontally
    white-space: pre-wrap; // Respect line breaks if any in bio
  }

  .user-card-actions {
    flex-shrink: 0; // Prevent actions button from shrinking
    padding-top: 0.1rem; // Minor adjustment to align visually with top text line
  }

</style>
