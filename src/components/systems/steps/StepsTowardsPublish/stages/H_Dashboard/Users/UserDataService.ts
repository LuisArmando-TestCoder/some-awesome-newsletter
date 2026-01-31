// src/services/UserDataService.ts
// --- DATA SERVICE MODULE ---
import { get } from "svelte/store";

// Import Request Functions
import store, { saveToStore } from "../../../../../../store";
import type { NewsletterUser } from "../../../../../../types";
import { addNewsletterUser } from "../../../../../requests/addNewsletterUserEndpoint";
import subscribeNewsletterUser from "../../../../../requests/subscribeNewsletterUser";
import getNewsletterUsersByNewsSource from "../../../../../requests/getNewsletterUsersByNewsSource";
import unsubscribeUserToConfigNewsSource from "../../../../../requests/unsubscribeUserToConfigNewsSource";
import getLeadsForConfigurator from "../../../../../requests/getLeadsForConfigurator";
import getUsersFromRawFileOrText from "../../../../../requests/getUsersFromRawFileOrText";
import { uploadUserFileChunked } from "../../../../../requests/uploadUserFileChunked";

// --- Helper Function ---
function getConfigId(): string | null {
  const configStore = get(store);
  return configStore?.configuratorEmail ?? null;
}

// --- Centralized Refresh Function ---
export async function refreshSubscribers(): Promise<void> {
  try {
    const configId = getConfigId();
    if (!configId) throw new Error("Config ID missing");

    const currentStore = get(store);
    const newsSources = currentStore.config?.newsSources || [];
    const subscribersToSave: { [key: string]: NewsletterUser[] } = {};

    console.log(`[UserDataService] refreshSubscribers: Fetching subscribers for ${newsSources.length} sources.`);

    await Promise.all(newsSources.map(async (source: any) => {
        if (source.id) {
            const users = await getNewsletterUsersByNewsSource(configId, source.id);
            subscribersToSave[source.id] = users;
        }
    }));

    console.log("[UserDataService] refreshSubscribers: Fetched all subscribers. Updating store.");
    saveToStore({ subscribers: subscribersToSave });
    console.log("[UserDataService] refreshSubscribers: Updated central store with subscribers.");

  } catch (err: any) {
    console.error("[UserDataService] refreshSubscribers: Error fetching/processing subscribers:", err);
    throw new Error(err.message || "Failed to refresh subscriber list.");
  }
}

// --- Service Functions ---
export async function loadInitialData(): Promise<void> {
  console.log("[UserDataService] loadInitialData: Starting initial data load.");
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] loadInitialData: Configuration ID (Email) not found in store.");
    return;
  }
  console.log(`[UserDataService] loadInitialData: Using configId: ${configId}`);

  saveToStore({ subscribers: {}, leads: {} });

  try {
    console.log("[UserDataService] loadInitialData: Fetching leads and refreshing subscribers concurrently...");
    const [_subsRefreshResult, leadsResponse] = await Promise.all([
      refreshSubscribers(),
      getLeadsForConfigurator(),
    ]);
    console.log("[UserDataService] loadInitialData: Fetched leads:", leadsResponse);

    const updateData: { leads?: any } = {};
    if (leadsResponse && leadsResponse[configId]) {
       updateData.leads = leadsResponse[configId];
    } else {
       updateData.leads = {};
    }
    saveToStore(updateData);
    console.log("[UserDataService] loadInitialData: Updated central store with leads.");

    const finalStoreState = get(store);
    const currentNewsSources = finalStoreState.config?.newsSources || [];
    const currentSubscribers = finalStoreState.subscribers || {};
    const configuratorEmail = finalStoreState.configuratorEmail;
    let didSubscribeConfigurator = false;

    if (configuratorEmail && currentNewsSources.length > 0) {
      for (const newsSource of currentNewsSources) {
        const sourceId = newsSource.id;
        if (sourceId && currentSubscribers.hasOwnProperty(sourceId) && currentSubscribers[sourceId]?.length === 0) {
          console.log(`[UserDataService] loadInitialData: News source ${sourceId} has no subscribers. Attempting to add/subscribe configurator ${configuratorEmail}...`);
          try {
             await addNewsletterUser(
               {
                 email: configuratorEmail,
                 name: configuratorEmail,
                 bio: "Newsletter Configurator",
                 language: "en",
                 countryOfResidence: "US",
                 newsSourcesConfigTuples: [],
               },
               configuratorEmail,
               sourceId
             );
             await subscribeNewsletterUser(
               configuratorEmail,
               sourceId,
               configuratorEmail
             );
             console.log(`[UserDataService] loadInitialData: Successfully added/subscribed configurator to empty source ${sourceId}.`);
             didSubscribeConfigurator = true;
          } catch (subError) {
             console.error(`[UserDataService] loadInitialData: Error adding/subscribing configurator to empty source ${sourceId}:`, subError);
          }
        }
      }
    }

    if (didSubscribeConfigurator) {
      console.log("[UserDataService] loadInitialData: Re-refreshing subscribers after adding configurator to empty sources...");
      await refreshSubscribers();
    }

  } catch (err: any) {
    console.error("[UserDataService] loadInitialData: Error during initial data load or post-check:", err);
    saveToStore({ subscribers: {}, leads: {} });
  } finally {
    console.log("[UserDataService] loadInitialData: Finished initial data load attempt.");
  }
}

export async function addUserAndSubscribe(
  userData: Pick<
    NewsletterUser,
    "name" | "email" | "bio" | "language"
  >,
  newsSourceId: string
): Promise<void> {
  console.log(`[UserDataService] addUserAndSubscribe: Starting for user ${userData.email} and newsSourceId ${newsSourceId}.`);
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] addUserAndSubscribe: Configuration ID missing.");
    throw new Error("Action failed: Configuration ID missing.");
  }
  console.log(`[UserDataService] addUserAndSubscribe: Using configId: ${configId}`);

  console.log("[UserDataService] addUserAndSubscribe: Validating input data:", userData);
  if (!userData.email || !userData.name || !userData.language) {
    console.error("[UserDataService] addUserAndSubscribe: Validation failed - missing required fields.");
    throw new Error("Name, Email, and Language are required.");
  }
  console.log("[UserDataService] addUserAndSubscribe: Input validation passed.");

  const newUserForApi: NewsletterUser = {
    ...userData,
    newsSourcesConfigTuples: [],
  };
  console.log("[UserDataService] addUserAndSubscribe: Prepared user object for API:", newUserForApi);

  try {
    console.log(`[UserDataService] addUserAndSubscribe: Calling addNewsletterUser for ${userData.email}...`);
    await addNewsletterUser(newUserForApi, configId, newsSourceId);
    console.log(`[UserDataService] addUserAndSubscribe: addNewsletterUser successful for ${userData.email}.`);

    console.log("[UserDataService] addUserAndSubscribe: Updating local store...");
    const currentStore = get(store);
    const currentSubscribers = JSON.parse(JSON.stringify(currentStore.subscribers || {}));

    if (!currentSubscribers[newsSourceId]) {
      currentSubscribers[newsSourceId] = [];
    }

    const userExists = currentSubscribers[newsSourceId].some(
      (sub: NewsletterUser) => sub.email === userData.email
    );

    if (!userExists) {
      const userForStore: NewsletterUser = {
        email: userData.email,
        name: userData.name,
        bio: userData.bio || '',
        language: userData.language,
        newsSourcesConfigTuples: [],
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
    throw new Error(
      err.message || `Failed to add or subscribe user ${userData.email}.`
    );
  }
}

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

  try {
    const result = await uploadUserFileChunked({
        file,
        newsSourceId,
        onProgress: (processed: number, total: number) => {
            console.log(`[UserDataService] Upload progress: ${processed}/${total}`);
        }
    });

    console.log(`[UserDataService] processBulkUpload: Finished. Result:`, result);

    await refreshSubscribers();

    return result;

  } catch (err: any) {
    console.error("[UserDataService] processBulkUpload: Error during bulk add process:", err);
    throw new Error(err.message || "Failed to process bulk upload file.");
  }
}

export async function unsubscribeUserFromSource(
  userEmail: string,
  newsSourceId: string
): Promise<boolean> {
  console.log(`[UserDataService] unsubscribeUserFromSource: Starting for user ${userEmail} from newsSourceId ${newsSourceId}.`);
  const configId = getConfigId();
  if (!configId) {
    console.error("[UserDataService] unsubscribeUserFromSource: Config ID not found.");
    return false;
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
    throw new Error(err.message || `Failed to unsubscribe ${userEmail}.`);
  }
}
