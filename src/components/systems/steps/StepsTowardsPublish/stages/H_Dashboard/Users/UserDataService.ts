 // src/services/UserDataService.ts
// --- DATA SERVICE MODULE ---
import { writable, get } from "svelte/store";

// Import Request Functions (adjust paths as necessary)
import store from "../../../../../../store.ts";
import type { NewsletterUser } from "../../../../../../types.ts";
import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint.ts";
import subscribeNewsletterUser from "../../../../../requests/subscribeNewsletterUser.ts";
import getAllSubscribersFromConfigEndpoint from "../../../../../requests/getAllSubscribersFromConfigEndpoint.ts";
import unsubscribeUserToConfigNewsSource from "../../../../../requests/unsubscribeUserToConfigNewsSource.ts";
import getLeadsForConfigurator from "../../../../../requests/getLeadsForConfigurator.ts";
import getUsersFromRawFileOrText from "../../../../../requests/getUsersFromRawFileOrText.ts"; // Reverted to original path

// --- Core State Stores ---
// Holds subscribers keyed by news source ID
export const subscribersByNewsSource = writable<
  Record<string, NewsletterUser[]>
>({});
// Holds lead data, potentially keyed by config ID -> news source ID -> user ID -> lead info
export const allLeadData = writable<
  Record<string, Record<string, Record<string, string>>>
>({});
// Loading state specifically for subscribers
export const loadingSubscribers = writable(true);
// Loading state specifically for leads
export const loadingLeads = writable(true);
// General error state, primarily for loading issues
export const loadingError = writable<string | null>(null);

// --- Helper Function ---
/**
 * Safely retrieves the configuratorEmail (configId) from the central store.
 * @returns {string | null} The configId or null if not found.
 */
function getConfigId(): string | null {
  const configStore = get(store);
  // Add checks for store and config object existence for robustness
  return configStore?.configuratorEmail ?? null;
}

// --- Service Functions ---

/**
 * Loads initial subscriber and lead data for the current configuration ID.
 * Updates the corresponding stores.
 */
export async function loadInitialData(): Promise<void> {
  console.log("[UserDataService] loadInitialData: Starting initial data load.");
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] loadInitialData: Configuration ID (Email) not found in store.");
    loadingError.set("Configuration ID (Email) not found in store.");
    loadingSubscribers.set(false);
    loadingLeads.set(false);
    return;
  }
  console.log(`[UserDataService] loadInitialData: Using configId: ${configId}`);

  // Reset states before fetching
  console.log("[UserDataService] loadInitialData: Resetting loading states and stores.");
  loadingSubscribers.set(true);
  loadingLeads.set(true);
  loadingError.set(null);
  subscribersByNewsSource.set({}); // Clear potentially stale data
  allLeadData.set({}); // Clear potentially stale data

  try {
    console.log("[UserDataService] loadInitialData: Fetching subscribers and leads...");
    // Fetch subscribers and leads concurrently
    const [subsResponse, leadsResponse] = await Promise.all([
      getAllSubscribersFromConfigEndpoint(configId),
      getLeadsForConfigurator(), // Assuming this fetches leads relevant to the user/config context
    ]);
    console.log("[UserDataService] loadInitialData: Fetched subscribers:", subsResponse);
    console.log("[UserDataService] loadInitialData: Fetched leads:", leadsResponse);

    subscribersByNewsSource.set(subsResponse || {});
    console.log("[UserDataService] loadInitialData: Updated subscribersByNewsSource store.");

    // Assuming leadsResponse has a structure like { configId: { /* lead data */ } }
    // Adjust this based on the actual structure of leadsResponse
    allLeadData.set(leadsResponse?.[configId] || {});
    console.log("[UserDataService] loadInitialData: Updated allLeadData store.");
  } catch (err: any) {
    console.error("[UserDataService] loadInitialData: Error fetching user/lead data:", err);
    loadingError.set(err.message || "Failed to load initial user data.");
    // Ensure stores are reset to empty on error to avoid showing stale data
    console.log("[UserDataService] loadInitialData: Resetting stores due to error.");
    subscribersByNewsSource.set({});
    allLeadData.set({});
  } finally {
    // Ensure loading states are always set to false after attempt
    console.log("[UserDataService] loadInitialData: Setting loading states to false.");
    loadingSubscribers.set(false);
    loadingLeads.set(false);
    console.log("[UserDataService] loadInitialData: Finished initial data load.");
  }
}

/**
 * Adds a newsletter user globally and then subscribes them to a specific news source.
 * Refreshes the subscriber list for all sources on success.
 * Throws an error if validation fails or API calls fail.
 *
 * @param userData - The basic data for the new user (name, email, lang, country, bio).
 * @param newsSourceId - The ID of the news source to subscribe the user to.
 */
export async function addUserAndSubscribe(
  userData: Pick<
    NewsletterUser,
    "name" | "email" | "bio" | "language" | "countryOfResidence"
  >,
  newsSourceId: string
): Promise<void> {
  console.log(`[UserDataService] addUserAndSubscribe: Starting for user ${userData.email} and newsSourceId ${newsSourceId}.`);
  // Returns void on success, throws on error
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] addUserAndSubscribe: Configuration ID missing.");
    throw new Error("Action failed: Configuration ID missing.");
  }
  console.log(`[UserDataService] addUserAndSubscribe: Using configId: ${configId}`);

  // --- Input Validation ---
  console.log("[UserDataService] addUserAndSubscribe: Validating input data:", userData);
  if (
    !userData.email ||
    !userData.name ||
    !userData.language ||
    !userData.countryOfResidence
  ) {
    console.error("[UserDataService] addUserAndSubscribe: Validation failed - missing required fields.");
    throw new Error("Name, Email, Language, and Country are required.");
  }
  // Potentially add email format validation here if needed
  console.log("[UserDataService] addUserAndSubscribe: Input validation passed.");

  // Construct the full user object expected by addNewsletterUser
  // The NewsletterUser type doesn't include id, created_at, updated_at. Backend handles these.
  const newUserForApi: NewsletterUser = {
    ...userData, // Contains name, email, bio, language, countryOfResidence
    newsSourcesConfigTuples: [], // Start with empty; backend likely manages this relationship
  };
  console.log("[UserDataService] addUserAndSubscribe: Prepared user object for API:", newUserForApi);

  try {
    // 1. Add the user (backend should handle if user already exists)
    console.log(`[UserDataService] addUserAndSubscribe: Calling addNewsletterUser for ${userData.email}...`);
    await addNewsletterUser(newUserForApi, configId, newsSourceId);
    console.log(`[UserDataService] addUserAndSubscribe: addNewsletterUser successful for ${userData.email}.`);

    // 2. Subscribe the user to the specific news source
    // console.log(`[UserDataService] addUserAndSubscribe: Calling subscribeNewsletterUser for ${userData.email}...`);
    // await subscribeNewsletterUser(configId, newsSourceId, userData.email);
    // console.log(`[UserDataService] addUserAndSubscribe: subscribeNewsletterUser successful for ${userData.email}.`);

    // 3. Refresh the subscriber list to ensure UI consistency
    console.log("[UserDataService] addUserAndSubscribe: Refreshing subscriber list...");
    // This is the simplest way to guarantee the store reflects the backend state.
    const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
    console.log("[UserDataService] addUserAndSubscribe: Fetched updated subscribers:", subsResponse);
    subscribersByNewsSource.set(subsResponse || {});
    console.log("[UserDataService] addUserAndSubscribe: Updated subscribersByNewsSource store.");
    console.log(`[UserDataService] addUserAndSubscribe: Finished successfully for user ${userData.email}.`);
  } catch (err: any) {
    console.error(
      `[UserDataService] addUserAndSubscribe: Error adding/subscribing user ${userData.email} to ${newsSourceId}:`,
      err
    );
    // Re-throw the error with a potentially more user-friendly message
    // The calling component should catch this and display it appropriately.
    throw new Error(
      err.message || `Failed to add or subscribe user ${userData.email}.`
    );
  }
}

/**
 * Processes a file containing users, adds/updates them, and subscribes them to a specific news source.
 * Refreshes the subscriber list upon completion.
 *
 * @param file - The file object (.csv, .txt, .xlsx) containing user data.
 * @param newsSourceId - The ID of the news source to subscribe users to.
 * @returns {Promise<{ successMessage: string; errorMessage: string | null }>} - An object containing summary messages.
 * @throws {Error} - Throws an error for major issues like missing config ID or file processing failure.
 */
export async function processBulkUpload(
  file: File,
  newsSourceId: string
): Promise<{ successMessage: string; errorMessage: string | null }> {
  console.log(`[UserDataService] processBulkUpload: Starting for file ${file.name} and newsSourceId ${newsSourceId}.`);
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] processBulkUpload: Configuration ID missing.");
    throw new Error("Bulk upload failed: Configuration ID missing.");
  }
  console.log(`[UserDataService] processBulkUpload: Using configId: ${configId}`);

  let addedCount = 0;
  let subscribedCount = 0;
  const errors: string[] = [];
  let totalInFile = 0;

  try {
    // 1. Parse the file using the backend endpoint
    console.log(`[UserDataService] processBulkUpload: Calling getUsersFromRawFileOrText for file ${file.name}...`);
    const usersFromFile = await getUsersFromRawFileOrText({ file });
    console.log(`[UserDataService] processBulkUpload: Received ${usersFromFile?.length ?? 0} users from file.`);

    if (!usersFromFile || !Array.isArray(usersFromFile)) {
      // Handle cases where the backend might return null or non-array
      console.error("[UserDataService] processBulkUpload: Backend did not return a valid user list from the file.", usersFromFile);
      throw new Error(
        "Backend did not return a valid user list from the file."
      );
    }
    totalInFile = usersFromFile.length;
    console.log(`[UserDataService] processBulkUpload: Total users found in file: ${totalInFile}`);

    // 2. Process each user from the file
    console.log("[UserDataService] processBulkUpload: Starting processing for each user...");
    // Using Promise.allSettled allows all operations to attempt even if some fail.
    const results = await Promise.allSettled(
      usersFromFile.map(async (userFromFile, index) => {
        console.log(`[UserDataService] processBulkUpload: Processing user ${index + 1}/${totalInFile}:`, userFromFile);
        if (!userFromFile.email) {
          console.warn(`[UserDataService] processBulkUpload: Skipping user at index ${index} due to missing email.`);
          throw new Error(
            `Skipped user with missing email: ${
              userFromFile.name || "Unknown Name"
            }`
          );
        }

        // console.log("usersFromFile", usersFromFile); // This logs the whole array repeatedly, maybe log just userFromFile?
        console.log(`[UserDataService] processBulkUpload: User data from file for ${userFromFile.email}:`, userFromFile);

        // Prepare user data, using defaults from file or general defaults
        // Explicitly map properties to match NewsletterUser type and avoid spreading unknown fields
        const userToAdd: NewsletterUser = {
          email: userFromFile.email, // Required, validated above
          name: userFromFile.name || "Unknown Name",
          bio: userFromFile.bio || "",
          language: userFromFile.language || "en", // Default language
          countryOfResidence: userFromFile.countryOfResidence || "US", // Default country
          // Assuming newsSourcesConfigTuples isn't typically in the upload file, default to empty
          newsSourcesConfigTuples: userFromFile.newsSourcesConfigTuples || [],
        };
        console.log(`[UserDataService] processBulkUpload: Prepared user object for API for ${userFromFile.email}:`, userToAdd);

        let userAdded = false;
        let userSubscribed = false;

        // Attempt to add/update the user
        console.log(`[UserDataService] processBulkUpload: Attempting addNewsletterUser for ${userFromFile.email}...`);
        try {
          await addNewsletterUser(userToAdd, configId, newsSourceId);
          console.log(`[UserDataService] processBulkUpload: addNewsletterUser successful (or user existed) for ${userFromFile.email}.`);
          userAdded = true; // Count success
        } catch (addError: any) {
          console.warn(`[UserDataService] processBulkUpload: addNewsletterUser error for ${userFromFile.email}:`, addError);
          // If error is "already exists", we still proceed to subscribe attempt.
          if (!addError?.message?.includes("already exists")) {
            throw new Error(
              `Error adding ${userFromFile.email}: ${addError.message}`
            ); // Propagate other add errors
          }
          // User exists, mark as 'added' for counting purposes (added/updated)
          console.log(`[UserDataService] processBulkUpload: User ${userFromFile.email} already exists, proceeding to subscribe.`);
          userAdded = true;
        }

        // Attempt to subscribe the user
        console.log(`[UserDataService] processBulkUpload: Attempting subscribeNewsletterUser for ${userFromFile.email}...`);
        try {
          await subscribeNewsletterUser(
            configId,
            newsSourceId,
            userFromFile.email
          );
          console.log(`[UserDataService] processBulkUpload: subscribeNewsletterUser successful (or already subscribed) for ${userFromFile.email}.`);
          userSubscribed = true; // Count success
        } catch (subscribeError: any) {
          console.warn(`[UserDataService] processBulkUpload: subscribeNewsletterUser error for ${userFromFile.email}:`, subscribeError);
          // If error is "already subscribed", it's still a success for this operation's goal.
          if (subscribeError?.message?.includes("already subscribed")) {
            console.log(`[UserDataService] processBulkUpload: User ${userFromFile.email} already subscribed.`);
            userSubscribed = true; // Count if already subscribed
          } else {
            // If add succeeded but subscribe failed for other reasons
            throw new Error(
              `Error subscribing ${userFromFile.email}: ${subscribeError.message}`
            );
          }
        }
        console.log(`[UserDataService] processBulkUpload: Finished processing for ${userFromFile.email}. Added: ${userAdded}, Subscribed: ${userSubscribed}`);
        return { added: userAdded, subscribed: userSubscribed };
      }) // End map
    ); // End Promise.allSettled
    console.log("[UserDataService] processBulkUpload: Finished processing all users. Results:", results);

    // 3. Tally results and collect errors
    console.log("[UserDataService] processBulkUpload: Tallying results...");
    results.forEach((result, index) => {
      const userEmail = usersFromFile[index]?.email || `User at index ${index}`;
      if (result.status === "fulfilled") {
        if (result.value.added) addedCount++;
        if (result.value.subscribed) subscribedCount++;
      } else {
        // Log and collect errors from rejected promises
        const errorMessage = result.reason?.message || "Unknown processing error";
        errors.push(`${userEmail}: ${errorMessage}`);
        console.error(`[UserDataService] processBulkUpload: Bulk processing error for ${userEmail}:`, result.reason);
      }
    });
    console.log(`[UserDataService] processBulkUpload: Tally complete. Added: ${addedCount}, Subscribed: ${subscribedCount}, Errors: ${errors.length}`);

    // 4. Refresh the subscriber list *after* all processing is done
    console.log("[UserDataService] processBulkUpload: Refreshing subscriber list...");
    const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
    console.log("[UserDataService] processBulkUpload: Fetched updated subscribers:", subsResponse);
    subscribersByNewsSource.set(subsResponse || {});
    console.log("[UserDataService] processBulkUpload: Updated subscribersByNewsSource store.");

    // 5. Compile summary messages
    const successMessage = `Processed ${totalInFile} users from file. Added/Updated: ${addedCount}. Subscribed to this source: ${subscribedCount}.`;
    let errorMessage = null;
    if (errors.length > 0) {
      errorMessage = `Encountered ${
        errors.length
      } errors during processing: ${errors.slice(0, 3).join("; ")}${
        errors.length > 3 ? "..." : ""
      }. Check console for details.`;
      console.warn("[UserDataService] processBulkUpload: Full bulk upload errors:", errors);
    }
    console.log(`[UserDataService] processBulkUpload: Finished. Success: "${successMessage}", Error: "${errorMessage}"`);
    return { successMessage, errorMessage };
  } catch (err: any) {
    // Catch errors from getUsersFromRawFileOrText or other major issues
    console.error("[UserDataService] processBulkUpload: Major error during bulk add process:", err);
    throw new Error(err.message || "Failed to process bulk upload file.");
  }
}

/**
 * Unsubscribes a user from a specific news source.
 * Updates the local subscriber store on success.
 * Throws an error if the API call fails unexpectedly.
 *
 * @param userEmail - The email of the user to unsubscribe.
 * @param newsSourceId - The ID of the news source to unsubscribe from.
 * @returns {Promise<boolean>} - True if successfully unsubscribed (or already not subscribed), false if API indicates failure.
 * @throws {Error} - For unexpected errors during the API call.
 */
export async function unsubscribeUserFromSource(
  userEmail: string,
  newsSourceId: string
): Promise<boolean> {
  console.log(`[UserDataService] unsubscribeUserFromSource: Starting for user ${userEmail} from newsSourceId ${newsSourceId}.`);
  const configId = getConfigId();
  if (!configId) {
    // Log error but maybe don't throw, let UI handle disabled state?
    console.error("[UserDataService] unsubscribeUserFromSource: Config ID not found.");
    // Or throw: throw new Error("Action failed: Configuration ID missing.");
    return false; // Indicate failure due to missing config
  }
  console.log(`[UserDataService] unsubscribeUserFromSource: Using configId: ${configId}`);

  try {
    console.log(`[UserDataService] unsubscribeUserFromSource: Calling unsubscribeUserToConfigNewsSource for ${userEmail}...`);
    const success = await unsubscribeUserToConfigNewsSource(
      userEmail,
      configId,
      newsSourceId
    );
    console.log(`[UserDataService] unsubscribeUserFromSource: API call returned: ${success}`);

    if (success) {
      // Update the store locally for immediate UI feedback
      console.log(`[UserDataService] unsubscribeUserFromSource: Updating local store for ${userEmail}...`);
      subscribersByNewsSource.update((current) => {
        const list = current[newsSourceId] || [];
        const updatedList = list.filter((u) => u.email !== userEmail);
        // Only update if the list actually changed
        if (updatedList.length !== list.length) {
          console.log(`[UserDataService] unsubscribeUserFromSource: Removing ${userEmail} from local store for ${newsSourceId}.`);
          const newState = { ...current }; // Create new object for reactivity
          newState[newsSourceId] = updatedList;
          return newState;
        }
        console.log(`[UserDataService] unsubscribeUserFromSource: User ${userEmail} not found in local store for ${newsSourceId}, no update needed.`);
        return current; // Return same object if no change
      });
      console.log(
        `[UserDataService] unsubscribeUserFromSource: ${userEmail} unsubscribed successfully from ${newsSourceId}.`
      );
      return true;
    } else {
      // API call completed but indicated failure (e.g., user not found, already unsubscribed)
      // In this case, we can treat it as 'job done' from the user's perspective.
      // We might want to refresh the store here to ensure consistency if the local state was wrong.
      console.warn(
        `[UserDataService] unsubscribeUserFromSource: API indicated no action needed for unsubscribing ${userEmail} from ${newsSourceId}. Refreshing list to ensure consistency.`
      );
      const subsResponse = await getAllSubscribersFromConfigEndpoint(configId);
      console.log("[UserDataService] unsubscribeUserFromSource: Fetched updated subscribers after no-action API response:", subsResponse);
      subscribersByNewsSource.set(subsResponse || {});
      console.log("[UserDataService] unsubscribeUserFromSource: Updated subscribersByNewsSource store.");
      return true; // Still return true as the desired state (unsubscribed) is achieved or already existed.
    }
  } catch (err: any) {
    console.error(
      `[UserDataService] unsubscribeUserFromSource: Error removing user ${userEmail} from ${newsSourceId}:`,
      err
    );
    // Re-throw unexpected errors for the UI to handle
    throw new Error(err.message || `Failed to unsubscribe ${userEmail}.`);
  }
}
