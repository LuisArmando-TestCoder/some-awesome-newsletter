<script lang="ts">
  import DateField from "../../buttons/Date/Date.svelte";
  import camelCaseToCapitalized from "../../helpers/camelCaseToCapitalized";
  import NumberField from "../../inputs/Number/Number.svelte";
  import PlainText from "../../inputs/PlainText/PlainText.svelte";
  import MarkdownText from "../../texts/MarkdownText/MarkdownText.svelte";
  import Switch from "../Switch/Switch.svelte";

  export let data: unknown;

  import JsonViewer from "./JsonViewer.svelte";

  export let canReveal = false;

  // The imported components no longer shadow the global Date, so this check works.
  function isDate(val: unknown): val is Date {
    return val instanceof Date;
  }
</script>

<div class="json-viewer">
  {#if typeof data === "object" && data !== null}
    {#if Array.isArray(data)}
      <ul class="json-array">
        {#each data as item, index (index)}
          <li>
            <span class="json-index">
              <MarkdownText {canReveal}>
                **{index}**
              </MarkdownText>
            </span>
            <!-- Recursively render each array item using svelte:component -->
            <svelte:component this={JsonViewer} data={item} />
          </li>
        {/each}
      </ul>
    {:else}
      <div class="json-object">
        {#each Object.entries(data) as [key, value] (key)}
          <div class="json-property">
            <span class="json-key">
              <MarkdownText {canReveal}>
                {camelCaseToCapitalized(key)}
              </MarkdownText>
            </span>
            <!-- Recursively render each property value using svelte:component -->
            <svelte:component this={JsonViewer} data={value} />
          </div>
        {/each}
      </div>
    {/if}
  {:else if typeof data === "number"}
    <span class="json-number">
      <NumberField value={String(data)} />
    </span>
  {:else if typeof data === "string"}
    <span class="json-string">
      <PlainText value={data} />
    </span>
  {:else if typeof data === "boolean"}
    <span class="json-boolean">
      <Switch toggled={data} />
    </span>
  {:else if isDate(data)}
    <DateField value={data.toLocaleString()} />
  {:else if data === null}
    <span class="json-null">null</span>
  {:else}
    <span class="json-unknown">{String(data)}</span>
  {/if}
</div>

<style lang="scss">
  .json-viewer {
    font-family: var(--font-mono);
    font-size: var(--fs-sm);
    color: var(--text-1);
    margin-bottom: var(--space-6);
  }
  .json-object {
    margin-left: 0;
    border-left: 1px solid var(--border-1);
    padding-left: var(--space-4);
  }
  .json-array {
    margin-left: var(--space-4);
    list-style: none;
    padding-left: 0;
  }
  .json-property {
    margin-bottom: var(--space-1);
    display: grid;
    gap: var(--space-4);
    grid-template-columns: repeat(auto-fit, minmax(min(200px, 100%), 1fr));
  }
  /* Types read from the value itself; weight and style, not color, tell keys and nulls apart. */
  .json-key {
    font-weight: var(--fw-semibold);
    color: var(--text-1);
  }
  .json-number,
  .json-string,
  .json-boolean {
    color: var(--text-1);
    font-variant-numeric: tabular-nums;
  }
  .json-null {
    color: var(--text-3);
    font-style: italic;
  }
  .json-unknown {
    color: var(--text-2);
  }
</style>
