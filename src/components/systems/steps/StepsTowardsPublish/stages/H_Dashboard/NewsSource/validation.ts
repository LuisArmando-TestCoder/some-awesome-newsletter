// src/lib/validation.ts

/**
 * Validate required fields for adding/updating a News Source.
 * Returns an empty string if valid, or the error message if invalid.
 */
export function validateFields(fields: { url: string; lead: string }): string {
    if (!fields.url) {
      return "Please fill the News Source field.";
    }
    try {
      new URL(fields.url);

      if (fields.lead) {
        new URL(fields.lead);
      }
    } catch (_) {
      return "Invalid URL format.";
    }
    return "";
  }
