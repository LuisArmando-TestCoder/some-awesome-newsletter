import store from "../../store.ts";
import { get } from "svelte/store";

/**
 * Fetches the user's language based on their IP address from the backend.
 * @returns {Promise<string | null>} A promise that resolves with the language code (e.g., "en") or null if fetching fails.
 */
export default async function getGeoIpLanguage(): Promise<string | null> {
  try {
    const apiUrl = get(store).apiURL(); // Get API URL from store
    const response = await fetch(`${apiUrl}/geo`);



    if (response.ok) {
      const data = await response.json();
      return data.language || null; // Return language or null if not present
    } else {
      console.error("Failed to fetch geoip data:", response.statusText);
      return null;
    }
  } catch (error) {
    console.error("Error fetching geoip data:", error);
    return null;
  }
}
