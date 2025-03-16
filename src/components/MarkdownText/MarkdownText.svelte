<script lang="ts">
  import { onMount } from "svelte";
  import Text from "../Text/Text.svelte";
  import type { Block, TextNode } from "../types.ts";

  // Array of blocks parsed from the markdown text.
  let blocks: Block[] = [];

  // Reference to the DOM element holding the slotted content.
  let slotContainer: HTMLDivElement;

  export let canReveal = false;

  // Parses inline formatting tokens inside a paragraph.
  function parseInline(text: string) {
    const segments = [];
    const regex = /(\*\*|==|--|\*)(.+?)\1/g;
    let lastIndex = 0;
    let match;
    while ((match = regex.exec(text)) !== null) {
      // Text before the match is plain paragraph text.
      if (match.index > lastIndex) {
        segments.push({
          type: "paragraph",
          text: text.slice(lastIndex, match.index),
        });
      }
      const marker = match[1];
      const content = match[2];
      let segType;
      if (marker === "**" || marker === "==") {
        segType = "highlight";
      } else if (marker === "*") {
        segType = "sub-italic";
      } else if (marker === "--") {
        segType = "sub-highlight-italic";
      }
      segments.push({ type: segType, text: content });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      segments.push({ type: "paragraph", text: text.slice(lastIndex) });
    }
    return segments;
  }

  // Parses the full markdown text into blocks.
  function parseMarkdown(md: string) {
    // Split blocks by one or more double newlines.
    const rawBlocks = md.split(/\n\s*\n/);
    (blocks as any) = rawBlocks.map((block) => {
      const trimmed = block.trim();
      if (trimmed.startsWith("## ")) {
        // Level 2 header (title)
        return { header: true, type: "title", text: trimmed.slice(3).trim() };
      }
      if (trimmed.startsWith("### ")) {
        // Level 3 header (subtitle)
        return {
          header: true,
          type: "subtitle",
          text: trimmed.slice(4).trim(),
        };
      }
      // Otherwise treat as a paragraph block with inline formatting.
      return { header: false, segments: parseInline(trimmed) };
    });
  }

  // Processes the slotted text content.
  function processSlot() {
    if (slotContainer) {
      const slotText = slotContainer?.textContent?.trim();
      parseMarkdown(slotText || "");
    }
  }

  onMount(() => {
    processSlot();
  });
</script>

<!-- Hidden container to capture the slotted text content -->
<div bind:this={slotContainer} style="display: none;">
  <slot />
</div>

<!-- Render the parsed blocks -->
<div class="markdown-text">
  {#each blocks as block}
    {#if block.header}
      <!-- Headers always get their own line -->
      <Text text={block.text} type={block.type} block={true} {canReveal} />
    {:else}
      <!-- Paragraph block: render inline segments together -->
      {#each block.segments as TextNode[] as seg}
        <Text text={seg.text} type={seg.type} {canReveal} />
      {/each}
    {/if}
    <br />
  {/each}
</div>

<style lang="scss">
  .markdown-text {
    user-select: none;
  }
</style>
