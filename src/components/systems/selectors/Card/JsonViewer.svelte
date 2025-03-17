<script lang="ts">
  export let data: any;

  import JsonViewer from "./JsonViewer.svelte";

  function isDate(val: any): boolean {
    return val instanceof Date;
  }
</script>

<div class="json-viewer">
  {#if typeof data === "object" && data !== null}
    {#if Array.isArray(data)}
      <ul class="json-array">
        {#each data as item, index}
          <li>
            <span class="json-index">{index}:</span>
            <!-- Recursively render each array item using svelte:component -->
            <svelte:component this={JsonViewer} data={item} />
          </li>
        {/each}
      </ul>
    {:else}
      <div class="json-object">
        {#each Object.entries(data) as [key, value]}
          <div class="json-property">
            <span class="json-key">{key}:</span>
            <!-- Recursively render each property value using svelte:component -->
            <svelte:component this={JsonViewer} data={value} />
          </div>
        {/each}
      </div>
    {/if}
  {:else if typeof data === "number"}
    <span class="json-number">{data}</span>
  {:else if typeof data === "string"}
    <span class="json-string">"{data}"</span>
  {:else if typeof data === "boolean"}
    <span class="json-boolean">{data ? "true" : "false"}</span>
  {:else if isDate(data)}
    <span class="json-date">{data.toLocaleString()}</span>
  {:else if data === null}
    <span class="json-null">null</span>
  {:else}
    <span class="json-unknown">{String(data)}</span>
  {/if}
</div>

<style lang="scss">
  .json-viewer {
    font-family: monospace;
    color: var(--color-foreground);
  }
  .json-object {
    margin-left: 1rem;
    border-left: 2px solid var(--color-background);
    padding-left: 0.5rem;
  }
  .json-array {
    margin-left: 1rem;
    list-style: none;
    padding-left: 0;
  }
  .json-property {
    margin-bottom: 0.25rem;
  }
  .json-key {
    font-weight: bold;
    color: var(--color-foreground);
  }
  .json-number {
    color: #4caf50;
  }
  .json-string {
    color: #f44336;
  }
  .json-boolean {
    color: #2196f3;
  }
  .json-date {
    color: #ff9800;
  }
  .json-null {
    color: #9e9e9e;
    font-style: italic;
  }
  .json-unknown {
    color: #e91e63;
  }
</style>
