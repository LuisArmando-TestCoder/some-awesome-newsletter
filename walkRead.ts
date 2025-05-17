import { walk, WalkEntry } from "https://deno.land/std@0.192.0/fs/walk.ts";

async function main() {
  const baseFolder = Deno.args[0] || ".";
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const safeBaseName = baseFolder.replace(/[:/\\]/g, "_");
  const outputFilename = `.output${timestamp}_${safeBaseName}.txt`;
  
  // File extensions whitelist - only process .ts and .svelte files
  const allowedExtensions = [".ts", ".svelte"];
  
  let ignorePatterns: string[] = [];
  try {
    const gitignoreContent = await Deno.readTextFile(
      `${baseFolder}/.gitignore`
    );
    const lines = gitignoreContent
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line !== "" && !line.startsWith("#"));

    ignorePatterns = lines;

    console.log("Loaded patterns from .gitignore:");
    console.log(lines);
  } catch (error) {
    console.warn(
      "No .gitignore found or unable to read it. Proceeding without ignore patterns."
    );
  }

  function shouldSkip(entry: WalkEntry): boolean {
    // Skip if not a whitelisted file extension
    if (entry.isFile) {
      const hasAllowedExtension = allowedExtensions.some(ext => 
        entry.name.toLowerCase().endsWith(ext)
      );
      
      if (!hasAllowedExtension) {
        return true;
      }
    }
    
    // Skip if it's a hidden file or directory
    if (entry.name.startsWith(".") || entry.path.startsWith(".")) {
      return true;
    }

    // Skip if it matches gitignore patterns
    for (const pattern of ignorePatterns) {
      if (entry.name.includes(pattern) || entry.path.includes(pattern)) {
        return true;
      }
    }

    return false;
  }

  // Extract script content from Svelte files
  function extractScriptFromSvelte(content: string): string {
    const scriptRegex = /<script([^>]*)>(([\s\S]*?)<\/script>)/g;
    let scriptContent = "";
    let match;
    
    while ((match = scriptRegex.exec(content)) !== null) {
      // Get the script content (group 3)
      const script = match[3];
      scriptContent += script + "\n";
    }
    
    return scriptContent.trim();
  }

  console.log(`Scanning folder (relative): ${baseFolder}`);
  console.log(`Only processing files with extensions: ${allowedExtensions.join(", ")}`);
  console.log("For Svelte files, only extracting script content");

  let combinedOutput = "";
  let fileCount = 0;

  for await (const entry of walk(baseFolder)) {
    if (!entry.isFile || shouldSkip(entry)) {
      continue;
    }

    try {
      const fileContent = await Deno.readTextFile(entry.path);
      
      // Process content based on file type
      if (entry.name.endsWith(".svelte")) {
        const scriptContent = extractScriptFromSvelte(fileContent);
        if (scriptContent) {
          combinedOutput += `// ${entry.path} (script content)\n${scriptContent}\n\n`;
          console.log(`Processed script from: ${entry.path}`);
          fileCount++;
        }
      } else {
        // For non-Svelte files (TypeScript), include the entire content
        combinedOutput += `// ${entry.path}\n${fileContent}\n\n`;
        console.log(`Processed: ${entry.path}`);
        fileCount++;
      }
    } catch (error) {
      console.error(`Error reading file ${entry.path}: ${error}`);
    }
  }

  if (fileCount === 0) {
    console.warn(
      "No valid files were found or processed. Please check your folder or .gitignore patterns."
    );
  } else {
    console.log(`Total files processed: ${fileCount}`);
  }

  await Deno.writeTextFile(outputFilename, combinedOutput, { append: false });
  console.log(`Output saved to: ${outputFilename}`);
}

main();
