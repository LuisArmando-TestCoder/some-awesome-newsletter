// src/services/UserDataService.ts
// --- DATA SERVICE MODULE ---
import { get } from "svelte/store"; // Removed writable

// Import Request Functions (adjust paths as necessary)
import store, { saveToStore } from "../../../../../../store"; // Added saveToStore
import type { NewsletterUser } from "../../../../../../types";
import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint";
import subscribeNewsletterUser from "../../../../../requests/subscribeNewsletterUser";
// import getAllSubscribersFromConfigEndpoint from "../../../../../requests/getAllSubscribersFromConfigEndpoint"; // Deprecated
import getNewsletterUsersByNewsSource from "../../../../../requests/getNewsletterUsersByNewsSource"; // New request function
import unsubscribeUserToConfigNewsSource from "../../../../../requests/unsubscribeUserToConfigNewsSource";
import getLeadsForConfigurator from "../../../../../requests/getLeadsForConfigurator";
import getUsersFromRawFileOrText from "../../../../../requests/getUsersFromRawFileOrText";

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

// --- Centralized Refresh Function ---

/**
 * Fetches the latest subscriber list for the current config ID and updates the central store.
 * Now iterates through all news sources to fetch subscribers for each.
 * @returns {Promise<void>}
 * @throws {Error} If config ID is missing or fetch fails.
 */
export async function refreshSubscribers(): Promise<void> {
  try {
    const configId = getConfigId();
    if (!configId) throw new Error("Config ID missing");

    const currentStore = get(store);
    const newsSources = currentStore.config?.newsSources || [];
    const subscribersToSave: { [key: string]: NewsletterUser[] } = {};

    console.log(`[UserDataService] refreshSubscribers: Fetching subscribers for ${newsSources.length} sources.`);

    // Fetch subscribers for each news source in parallel
    await Promise.all(newsSources.map(async (source: any) => {
        if (source.id) {
            const users = await getNewsletterUsersByNewsSource(configId, source.id);
            subscribersToSave[source.id] = users;
        }
    }));

    console.log("[UserDataService] refreshSubscribers: Fetched all subscribers. Updating store.");

    // Ensure we save an empty object if subsResponse is null/undefined
    saveToStore({ subscribers: subscribersToSave });
    console.log("[UserDataService] refreshSubscribers: Updated central store with subscribers.");

    // Log the store state immediately after saving for verification
    const currentStoreState = get(store);
    // console.log("[UserDataService] refreshSubscribers: Store state after save:", JSON.stringify(currentStoreState.subscribers));

  } catch (err: any) {
    console.error("[UserDataService] refreshSubscribers: Error fetching/processing subscribers:", err);
    // Optionally clear subscribers on error to prevent showing stale data
    // saveToStore({ subscribers: {} });
    throw new Error(err.message || "Failed to refresh subscriber list.");
  }
}


// --- Service Functions ---

/**
 * Loads initial subscriber and lead data for the current configuration ID.
 * Saves the data to the central store. Uses the centralized refresh function.
 */
export async function loadInitialData(): Promise<void> {
  console.log("[UserDataService] loadInitialData: Starting initial data load.");
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] loadInitialData: Configuration ID (Email) not found in store.");
    return;
  }
  console.log(`[UserDataService] loadInitialData: Using configId: ${configId}`);

  // Clear potentially stale data before fetching
  console.log("[UserDataService] loadInitialData: Clearing previous subscribers and leads in central store.");
  saveToStore({ subscribers: {}, leads: {} });

  try {
    console.log("[UserDataService] loadInitialData: Fetching leads and refreshing subscribers concurrently...");
    // Fetch leads and refresh subscribers in parallel
    const [_subsRefreshResult, leadsResponse] = await Promise.all([
      refreshSubscribers(), // Use the centralized refresh function
      getLeadsForConfigurator(),
    ]);
    console.log("[UserDataService] loadInitialData: Fetched leads:", leadsResponse);

    // Save fetched leads data
    const updateData: { leads?: any } = {};
    if (leadsResponse && leadsResponse[configId]) {
       updateData.leads = leadsResponse[configId];
    } else {
       updateData.leads = {}; // Ensure leads is at least an empty object
    }
    saveToStore(updateData); // Save only leads here, subscribers handled by refreshSubscribers
    console.log("[UserDataService] loadInitialData: Updated central store with leads.");

    // --- Post-load check: Ensure configurator is subscribed to empty sources ---
    console.log("[UserDataService] loadInitialData: Checking if configurator needs subscribing to existing empty sources...");
    const finalStoreState = get(store);
    const currentNewsSources = finalStoreState.config?.newsSources || [];
    const currentSubscribers = finalStoreState.subscribers || {};
    const configuratorEmail = finalStoreState.configuratorEmail;
    let didSubscribeConfigurator = false;

    if (configuratorEmail && currentNewsSources.length > 0) {
      for (const newsSource of currentNewsSources) {
        const sourceId = newsSource.id;
        // Check if this source exists in the subscriber map and has an empty list
        // Note: With the new logic, currentSubscribers[sourceId] might be undefined if fetch failed, but we initialized it.
        // If the source ID key exists and length is 0, it means we fetched successfully but found no users.
        if (sourceId && currentSubscribers.hasOwnProperty(sourceId) && currentSubscribers[sourceId]?.length === 0) {
          console.log(`[UserDataService] loadInitialData: News source ${sourceId} has no subscribers. Attempting to add/subscribe configurator ${configuratorEmail}...`);
          try {
            // 1. Ensure user exists (backend handles duplicates)
             await addNewsletterUser(
               { // Basic user data
                 email: configuratorEmail,
                 name: configuratorEmail,
                 bio: "Newsletter Configurator",
                 language: "en",
                 countryOfResidence: "US",
                 newsSourcesConfigTuples: [],
               },
               configuratorEmail, // configId
               sourceId
             );
             // 2. Subscribe user
             await subscribeNewsletterUser(
               configuratorEmail, // configId
               sourceId,
               configuratorEmail // userEmail
             );
             console.log(`[UserDataService] loadInitialData: Successfully added/subscribed configurator to empty source ${sourceId}.`);
             didSubscribeConfigurator = true; // Mark that we made a change
          } catch (subError) {
             console.error(`[UserDataService] loadInitialData: Error adding/subscribing configurator to empty source ${sourceId}:`, subError);
             // Continue to check other sources even if one fails
          }
        }
      }
    }

    // If we potentially added the configurator to any source, refresh subscribers again
    if (didSubscribeConfigurator) {
      console.log("[UserDataService] loadInitialData: Re-refreshing subscribers after adding configurator to empty sources...");
      await refreshSubscribers();
    }
    // --- End post-load check ---

  } catch (err: any) {
    console.error("[UserDataService] loadInitialData: Error during initial data load or post-check:", err);
    // Reset stores on error
    console.log("[UserDataService] loadInitialData: Resetting subscribers/leads in central store due to error.");
    saveToStore({ subscribers: {}, leads: {} });
  } finally {
    console.log("[UserDataService] loadInitialData: Finished initial data load attempt.");
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
    "name" | "email" | "bio" | "language"
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
    !userData.language
  ) {
    console.error("[UserDataService] addUserAndSubscribe: Validation failed - missing required fields.");
    throw new Error("Name, Email, and Language are required.");
  }
  // Potentially add email format validation here if needed
  console.log("[UserDataService] addUserAndSubscribe: Input validation passed.");

  // Construct the full user object expected by addNewsletterUser
  // The NewsletterUser type doesn't include id, created_at, updated_at. Backend handles these.
  const newUserForApi: NewsletterUser = {
    ...userData, // Contains name, email, bio, language
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

    // 3. Update the store locally instead of refreshing
    console.log("[UserDataService] addUserAndSubscribe: Updating local store...");
    const currentStore = get(store);
    // Deep copy to avoid mutation issues
    const currentSubscribers = JSON.parse(JSON.stringify(currentStore.subscribers || {}));

    if (!currentSubscribers[newsSourceId]) {
      currentSubscribers[newsSourceId] = [];
    }

    // Check if user already exists in local store for this source
    const userExists = currentSubscribers[newsSourceId].some(
      (sub: NewsletterUser) => sub.email === userData.email
    );

    if (!userExists) {
      // Construct a user object for the store. It doesn't have to be complete.
      const userForStore: NewsletterUser = {
        email: userData.email,
        name: userData.name,
        bio: userData.bio || '',
        language: userData.language,
        newsSourcesConfigTuples: [], // default value
      };
      currentSubscribers[newsSourceId].push(userForStore);
      saveToStore({ subscribers: currentSubscribers });
      console.log(`[UserDataService] addUserAndSubscribe: Added ${userData.email} to local store for ${newsSourceId}.`);
    } else {
      console.log(`[UserDataService] addUserAndSubscribe: User ${userData.email} already in local store for ${newsSourceId}.`);
    }
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

    // 4. Update the store locally instead of refreshing
    console.log("[UserDataService] processBulkUpload: Updating local store...");
    const currentStore = get(store);
    const currentSubscribers = JSON.parse(JSON.stringify(currentStore.subscribers || {}));

    if (!currentSubscribers[newsSourceId]) {
      currentSubscribers[newsSourceId] = [];
    }

    const existingEmails = new Set(currentSubscribers[newsSourceId].map((u: NewsletterUser) => u.email));

    usersFromFile.forEach((userFromFile: any) => {
      if (userFromFile.email && !existingEmails.has(userFromFile.email)) {
        const userForStore: NewsletterUser = {
          email: userFromFile.email,
          name: userFromFile.name || "Unknown Name",
          bio: userFromFile.bio || "",
          language: userFromFile.language || "en",
          countryOfResidence: userFromFile.countryOfResidence || "US",
          newsSourcesConfigTuples: [],
        };
        currentSubscribers[newsSourceId].push(userForStore);
      }
    });

    saveToStore({ subscribers: currentSubscribers });
    console.log("[UserDataService] processBulkUpload: Updated local store with new users.");

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

    // Update the central store for UI feedback regardless of what the API returns, as long as it doesn't throw.
    // This handles cases where the user might already be unsubscribed.
    const currentStore = get(store);
    const currentSubscribers = currentStore.subscribers || {};
    const list = currentSubscribers[newsSourceId] || [];
    const updatedList = list.filter((u: NewsletterUser) => u.email !== userEmail);

    if (updatedList.length !== list.length) {
      const newSubscribersState = { ...currentSubscribers };
      newSubscribersState[newsSourceId] = updatedList;
      saveToStore({ subscribers: newSubscribersState });
      console.log(`[UserDataService] unsubscribeUserFromSource: Removed ${userEmail} from central store for ${newsSourceId}.`);
    } else {
      console.log(`[UserDataService] unsubscribeUserFromSource: User ${userEmail} not found in central store for ${newsSourceId}, no update needed.`);
    }
    return true;
  } catch (err: any) {
    console.error(
      `[UserDataService] unsubscribeUserFromSource: Error removing user ${userEmail} from ${newsSourceId}:`,
      err
    );
    // Re-throw unexpected errors for the UI to handle
    throw new Error(err.message || `Failed to unsubscribe ${userEmail}.`);
  }
}
