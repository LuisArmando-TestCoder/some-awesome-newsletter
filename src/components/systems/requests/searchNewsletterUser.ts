import { request } from "$lib/api/client";
import { getCredentials } from "$lib/api/credentials";
import type { NewsletterUser } from "../../types";

/** Search the owner's subscribers by email (contains @) or name. Returns [] on failure. */
export default async function searchNewsletterUser(searchTerm: string): Promise<NewsletterUser[]> {
  if (!getCredentials().email || !searchTerm?.trim()) return [];
  const isEmail = searchTerm.includes("@");
  try {
    const data = await request<NewsletterUser[]>("/newsletter/search", {
      query: isEmail ? { email: searchTerm.trim() } : { name: searchTerm.trim() },
    });
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}
