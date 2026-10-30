<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import TextTypes from "../TextTypes/TextTypes.svelte";
  import { reveal } from "../reveal";

  /** When true, the whole block fades in once as it enters the viewport. */
  export let canReveal = false;

  /**
   * Supported markup (one block per blank-line separated chunk):
   *   ## Title         -> TextTypes "title"
   *   ### Subtitle     -> TextTypes "subtitle"
   *   **strong**       -> bold
   *   ==highlight==    -> semibold, primary text colour
   *   *emphasis*       -> semibold emphasis (not italic)
   * Double hyphens (--x--) are literal text.
   */
  type InlineKind = "text" | "strong" | "highlight" | "emphasis";
  type Segment = { kind: InlineKind; text: string };
  type MdBlock = { kind: "title" | "subtitle" | "paragraph"; segments: Segment[] };

  const MARKER_KIND: Record<string, InlineKind> = {
    "**": "strong",
    "==": "highlight",
    "*": "emphasis",
  };

  let blocks: MdBlock[] = [];
  let slotContainer: HTMLDivElement;
  let observer: MutationObserver | undefined;
  let lastSource: string | null = null;

  function parseInline(text: string): Segment[] {
    const segments: Segment[] = [];
    const regex = /(\*\*|==|\*)(.+?)\1/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ kind: "text", text: text.slice(lastIndex, match.index) });
      }
      segments.push({ kind: MARKER_KIND[match[1]] ?? "text", text: match[2] });
      lastIndex = regex.lastIndex;
    }
    if (lastIndex < text.length) {
      segments.push({ kind: "text", text: text.slice(lastIndex) });
    }
    return segments;
  }

  function parseMarkdown(md: string): MdBlock[] {
    return md
      .split(/\n\s*\n/)
      .map((raw) => raw.trim().replace(/\s*\n\s*/g, " "))
      .filter((chunk) => chunk.length > 0)
      .map((chunk): MdBlock => {
        if (chunk.startsWith("### ")) {
          return { kind: "subtitle", segments: parseInline(chunk.slice(4).trim()) };
        }
        if (chunk.startsWith("## ")) {
          return { kind: "title", segments: parseInline(chunk.slice(3).trim()) };
        }
        return { kind: "paragraph", segments: parseInline(chunk) };
      });
  }

  function processSlot() {
    if (!slotContainer) return;
    const source = slotContainer.textContent?.trim() ?? "";
    if (source === lastSource) return;
    lastSource = source;
    blocks = parseMarkdown(source);
  }

  onMount(() => {
    processSlot();
    if (typeof MutationObserver !== "undefined") {
      // Re-parse when the slotted text changes (e.g. language switch).
      observer = new MutationObserver(processSlot);
      observer.observe(slotContainer, {
        characterData: true,
        childList: true,
        subtree: true,
      });
    }
  });

  onDestroy(() => {
    observer?.disconnect();
    observer = undefined;
  });
</script>

<!-- Source text from the slot. Hidden; it is parsed and rendered below. -->
<div bind:this={slotContainer} class="markdown-source" hidden>
  <slot />
</div>

<div class="markdown-text" use:reveal={canReveal}>
  {#each blocks as block}
    {#if block.kind === "title" || block.kind === "subtitle"}
      <div class="md-heading md-heading--{block.kind}">
        <TextTypes type={block.kind}>
          {#each block.segments as seg}
            {#if seg.kind === "text"}{seg.text}{:else if seg.kind === "emphasis"}<em
                class="md-inline md-inline--{seg.kind}">{seg.text}</em
              >{:else}<strong class="md-inline md-inline--{seg.kind}">{seg.text}</strong
              >{/if}
          {/each}
        </TextTypes>
      </div>
    {:else}
      <p class="md-paragraph">
        {#each block.segments as seg}
          {#if seg.kind === "text"}{seg.text}{:else if seg.kind === "emphasis"}<em
              class="md-inline md-inline--{seg.kind}">{seg.text}</em
            >{:else}<strong class="md-inline md-inline--{seg.kind}">{seg.text}</strong
            >{/if}
        {/each}
      </p>
    {/if}
  {/each}
</div>

<style lang="scss">
  .markdown-source {
    display: none;
  }

  .markdown-text {
    display: block;
    transition:
      opacity var(--dur-slow) var(--ease-out),
      transform var(--dur-slow) var(--ease-out);

    &:global(.is-reveal-pending) {
      opacity: 0;
      transform: translateY(var(--space-2));
    }

    > * + * {
      margin-top: var(--space-3);
    }

    > .md-heading + .md-paragraph {
      margin-top: var(--space-2);
    }
  }

  .md-heading {
    display: block;
    margin: 0;
  }

  .md-paragraph {
    margin: 0;
    max-width: var(--measure);
    font-family: var(--font-body);
    font-size: var(--fs-md);
    font-weight: var(--fw-regular);
    line-height: var(--lh-normal);
    color: var(--text-2);
    text-wrap: pretty;
  }

  .md-inline {
    font-style: normal;
    color: var(--text-1);

    &--strong {
      font-weight: var(--fw-bold);
    }

    &--highlight,
    &--emphasis {
      font-weight: var(--fw-semibold);
    }
  }

  // Inside headings the base weight is already semibold; step up to bold.
  .md-heading .md-inline {
    color: inherit;
    font-weight: var(--fw-bold);
  }
</style>
