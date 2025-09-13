<!-- Example: Parent Component (e.g., Users.svelte) -->
<script lang="ts">
  import UserCard from "./UserCard.svelte";
  import { userRemovalRequestStore, type UserRemovalPayload } from './userActions.ts'; // Adjust path
  import type { NewsletterUser } from "../../../../../../types";
  import { onDestroy } from 'svelte'; // Or use $: reactive statement

  export let users: NewsletterUser[];
  export let newsSourceId: string;
  // ... other state like loading states ...
  let removingUserEmail: string | null = null;

  // --- Store Subscription ---
  // Option 1: Using reactive statement (often simpler)
  $: if ($userRemovalRequestStore) {
    handleUserRemovalRequest($userRemovalRequestStore);
    // Reset the store immediately *after reading* to prevent re-triggering on component updates
    // Place this reset carefully depending on whether handleUserRemovalRequest is async
    // If async, you might reset it *before* calling the async function or *after* it completes.
    // Resetting immediately after reading is common for triggering once per click.
    userRemovalRequestStore.set(null);
  }

  // Option 2: Manual subscription (more control, explicit cleanup)
  /*
  const unsubscribe = userRemovalRequestStore.subscribe(request => {
    if (request) {
      handleUserRemovalRequest(request);
      // Reset the store after processing the request
      userRemovalRequestStore.set(null);
    }
  });

  onDestroy(unsubscribe); // Important: Unsubscribe when component is destroyed
  */

  // --- Logic ---
  async function handleUserRemovalRequest(payload: UserRemovalPayload) {
    if (removingUserEmail) return; // Prevent concurrent removals if needed

    console.log("Parent handling removal for:", payload.email, "from source:", payload.newsSourceId);
    removingUserEmail = payload.email; // Set loading state for the specific user

    try {
      // --- Replace with your actual API call/removal logic ---
      await fakeApiRemoveUser(payload.email, payload.newsSourceId);
      // Remove user from local list on success
      users = users.filter(u => u.email !== payload.email);
      console.log("User removed successfully");
      // --- End of removal logic ---
    } catch (error) {
      console.error("Failed to remove user:", error);
      // Handle error display
    } finally {
      removingUserEmail = null; // Reset loading state
    }
  }

  // Dummy function for example
  async function fakeApiRemoveUser(email: string, sourceId: string) {
    console.log(`Simulating API call to remove ${email} from ${sourceId}`);
    await new Promise(resolve => setTimeout(resolve, 500)); // Simulate network delay
     // if (Math.random() > 0.8) throw new Error("Fake API Error"); // Simulate failure
  }

</script>

{#each users as user (user.email)}
  <UserCard
    {user}
    {newsSourceId}
    disabled={removingUserEmail === user.email}
  />
{/each}

<!-- Add loading indicators or error messages as needed -->