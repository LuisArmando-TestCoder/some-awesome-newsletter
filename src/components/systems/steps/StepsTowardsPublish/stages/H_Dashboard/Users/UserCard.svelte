<!-- src/components/systems/steps/StepsTowardsPublish/stages/H_Dashboard/Users/UserCard.svelte -->
<script lang="ts">
  // REMOVED: import { createEventDispatcher } from "svelte";
  import { userRemovalRequestStore } from "./userActions.ts"; // Adjust path: Up 5 levels
  import type { NewsletterUser } from "../../../../../../types.ts"; // Adjust path

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
      {#if user.language}<span>Lang: {user.language.toUpperCase()}</span>{/if}
      {#if !user.language}<span>No metadata</span>{/if}
    </div>
    {#if user.bio}
      <div class="user-card-bio">{user.bio}</div>
    {/if}
  </div>

  <div class="user-card-actions">
    <IconButton
      src="./icons/trash.svg"
      label="Unsubscribe"
      callback={handleRemoveClick}
      {disabled}
    />
  </div>
</div>

<style lang="scss">
  @use "./Users.scss";
  @use "../Dashboard.scss";
  .user-card {
    display: flex;
    justify-content: space-between;
    align-items: flex-start; // Align items to the top
    padding: 0.8rem 1rem;
    background-color: var(--color-background-opaque-inversion);
    border: 1px solid var(--color-border-light, #e0e0e0);
    border-radius: var(--radius-m);
    transition: box-shadow 0.2s ease-in-out;
    gap: 1rem; // Space between details and actions

    &:hover {
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    }

    &.disabled {
      opacity: 0.6;
      background-color: var(--color-background-disabled, #f5f5f5);
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
    color: var(--color-foreground);
    font-size: 1rem;
  }

  .user-card-email {
    font-size: 0.9rem;
    color: var(--color-text-secondary, #555);
  }

  .user-card-meta {
    font-size: 0.8rem;
    color: var(--color-text-tertiary, #777);
    margin-top: 0.2rem;
    span {
      // Style individual meta parts if needed
      // e.g., display: inline-block; margin-right: 0.5em;
    }
  }

  .user-card-bio {
    font-size: 0.85rem;
    color: var(--color-text-secondary, #666);
    margin-top: 0.4rem;
    font-style: italic;
    max-width: 100%; // Ensure bio doesn't overflow card horizontally
    white-space: pre-wrap; // Respect line breaks if any in bio
  }

  .user-card-actions {
    flex-shrink: 0; // Prevent actions button from shrinking
    padding-top: 0.1rem; // Minor adjustment to align visually with top text line
  }

  :global(.icon-button) {
    // Styles for IconButton if needed
  }
</style>
