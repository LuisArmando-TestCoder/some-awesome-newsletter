<script lang="ts">
  /**
   * Legacy wrapper kept for compatibility. It used to split text into one
   * animated span per word and render it with {@html}. It now renders the
   * text as plain, escaped, selectable text.
   */
  export let HTMLText: string;
  export const transitionSpeed: number = 0.5;
</script>

{HTMLText ?? ""}
