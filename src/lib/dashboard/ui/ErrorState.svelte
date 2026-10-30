<!-- WS4. Error state with a retry action. -->
<script lang="ts">
  import Notice from "./Notice.svelte";
  import Button from "./Button.svelte";
  import { dt } from "../i18n";
  export let title: string | null = null;
  export let message: string | null = null;
  export let onRetry: (() => void) | null = null;
</script>

<Notice tone="danger" title={title ?? $dt("dash.state.errorTitle")}>
  <p>{message ?? $dt("dash.state.errorBody")}</p>
  <svelte:fragment slot="actions">
    {#if onRetry}<Button size="sm" icon="refresh" onclick={() => onRetry?.()}>{$dt("dash.state.retry")}</Button>{/if}
  </svelte:fragment>
</Notice>
