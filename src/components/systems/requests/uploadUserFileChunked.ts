import { importContacts } from "$lib/api/imports";

/**
 * Legacy wrapper over importContacts (src/lib/api/imports.ts). Same signature
 * and result shape as before. Bind to `importProgress` for live progress.
 */
export async function uploadUserFileChunked({
  file,
  newsSourceId,
  onProgress,
  onUserAdded,
}: {
  file: File;
  newsSourceId: string;
  onProgress?: (processed: number, total: number) => void;
  onUserAdded?: (email: string) => void;
}): Promise<{ successMessage: string; errorMessage: string | null }> {
  const r = await importContacts({ file, newsSourceId, onProgress, onUserAdded });
  return {
    successMessage: `${r.added} contacts added.`,
    errorMessage: r.errors.length ? r.errors.join(" ") : null,
  };
}
