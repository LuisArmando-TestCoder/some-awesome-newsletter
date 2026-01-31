import readXlsxFile from 'read-excel-file';
import { get } from 'svelte/store';
import store from '../../store';
import getAuthHeaders from './getAuthHeaders';

export async function uploadUserFileChunked({
  file,
  newsSourceId,
  onProgress,
  onUserAdded
}: {
  file: File;
  newsSourceId: string;
  onProgress?: (processed: number, total: number) => void;
  onUserAdded?: (email: string) => void;
}): Promise<{ successMessage: string; errorMessage: string | null }> {
  const CHUNK_SIZE = 500; // Rows per chunk
  let chunks: string[] = [];
  let totalItems = 0;

  console.log(`[uploadUserFileChunked] Starting upload for ${file.name}, size: ${file.size}`);

  try {
    // 1. Parse File & Chunk
    if (file.name.endsWith('.xlsx')) {
      console.log(`[uploadUserFileChunked] Parsing Excel file...`);
      const rows = await readXlsxFile(file);
      // rows is Row[] = Cell[]. Cell = string | number | boolean | Date | null
      
      if (rows.length === 0) {
          return { successMessage: 'Empty file', errorMessage: null };
      }
      
      // Simple CSV conversion
      const header = rows[0].map(cell => String(cell ?? '')).join(',');
      const dataRows = rows.slice(1);
      totalItems = dataRows.length;

      for (let i = 0; i < dataRows.length; i += CHUNK_SIZE) {
        const chunkRows = dataRows.slice(i, i + CHUNK_SIZE);
        const chunkString = [
            header, 
            ...chunkRows.map(row => row.map(cell => String(cell ?? '')).join(','))
        ].join('\n');
        chunks.push(chunkString);
      }
      console.log(`[uploadUserFileChunked] Excel parsed. Created ${chunks.length} chunks.`);

    } else {
      // Text/CSV
      console.log(`[uploadUserFileChunked] Reading text file...`);
      const text = await file.text();
      const lines = text.split('\n').filter(line => line.trim() !== ''); // Filter empty lines
      totalItems = lines.length;
      
      if (lines.length === 0) {
          return { successMessage: 'Empty file', errorMessage: null };
      }

      const header = lines[0]; // Assume first line is header
      const dataLines = lines.slice(1);
      
      if (dataLines.length === 0) {
          chunks.push(header); // Just header? or handle single line
      } else {
          for (let i = 0; i < dataLines.length; i += CHUNK_SIZE) {
            const chunkLines = dataLines.slice(i, i + CHUNK_SIZE);
            chunks.push([header, ...chunkLines].join('\n'));
          }
      }
      console.log(`[uploadUserFileChunked] Text read. Created ${chunks.length} chunks.`);
    }

    // 2. Send Chunks
    const apiURL = get(store).apiURL();
    const endpoint = `${apiURL}/news-source/any-user-data-base-file-to-standard-format/${get(store).configuratorEmail}`;
    let totalAdded = 0;
    let errors: string[] = [];

    for (let i = 0; i < chunks.length; i++) {
      const chunk = chunks[i];
      console.log(`[uploadUserFileChunked] Sending chunk ${i + 1}/${chunks.length}...`);
      
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: getAuthHeaders(),
          body: JSON.stringify({
            text: chunk,
            newsSourceId: newsSourceId
          })
        });

        if (!response.ok) {
          const errText = await response.text();
          const errorMsg = `Chunk ${i + 1} failed: ${response.status} ${response.statusText} - ${errText}`;
          console.error(errorMsg);
          errors.push(errorMsg);
          continue;
        }

        if (!response.body) {
           const errorMsg = `Chunk ${i + 1} failed: No response body`;
           console.error(errorMsg);
           errors.push(errorMsg);
           continue;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let chunkAddedCount = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split('\n');
          buffer = lines.pop() || ''; // Keep incomplete line in buffer

          for (const line of lines) {
            if (!line.trim()) continue;
            try {
                const data = JSON.parse(line);
                if (data.type === 'user') {
                    if (onUserAdded) onUserAdded(data.email);
                } else if (data.type === 'summary') {
                    chunkAddedCount = data.addedCount || 0;
                } else if (data.type === 'error') {
                    console.error(`[uploadUserFileChunked] Stream error: ${data.message}`);
                    errors.push(`Chunk ${i + 1} stream error: ${data.message}`);
                }
            } catch (e) {
                console.error('[uploadUserFileChunked] Error parsing stream line:', line, e);
            }
          }
        }
        
        // Process any remaining buffer
        if (buffer.trim()) {
             try {
                const data = JSON.parse(buffer);
                if (data.type === 'user') {
                    if (onUserAdded) onUserAdded(data.email);
                } else if (data.type === 'summary') {
                    chunkAddedCount = data.addedCount || 0;
                }
             } catch (e) {
                 // ignore incomplete json at very end
             }
        }

        totalAdded += chunkAddedCount;
        console.log(`[uploadUserFileChunked] Chunk ${i + 1} success. Added ${chunkAddedCount} users.`);
        
        if (onProgress) {
          const processedItems = Math.min((i + 1) * CHUNK_SIZE, totalItems);
          onProgress(processedItems, totalItems);
        }

      } catch (e: any) {
        const errorMsg = `Chunk ${i + 1} network/parse error: ${e.message}`;
        console.error(errorMsg);
        errors.push(errorMsg);
      }
    }

    const successMessage = `Processed ${chunks.length} chunks. Successfully added ${totalAdded} users.`;
    const errorMessage = errors.length > 0 ? `Errors: ${errors.join('; ')}` : null;

    return { successMessage, errorMessage };

  } catch (err: any) {
    console.error(`[uploadUserFileChunked] Fatal error:`, err);
    return { successMessage: '', errorMessage: `Processing failed: ${err.message}` };
  }
}
