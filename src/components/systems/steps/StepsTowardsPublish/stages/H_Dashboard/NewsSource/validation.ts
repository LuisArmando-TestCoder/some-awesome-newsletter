// src/lib/validation.ts

/**
 * Validate required fields for adding/updating a News Source.
 * Returns an empty string if valid, or the error message if invalid.
 */
export function validateFields(fields: { url: string; lead: string }): string {
    if (!fields.url || !fields.lead) {
        console.table(fields);
      return "Please fill in all the fields.";
    }
    return "";
  }
  