<!-- WS4. Adapter over WS1's Button primitive ($lib/ui/components/Button.svelte)
     so dashboard code keeps one small API (icon names instead of snippets). -->
<script lang="ts">
  import UIButton from "$lib/ui/components/Button.svelte";
  import Icon from "./Icon.svelte";
  export let variant: "primary" | "secondary" | "tertiary" | "danger" | "ghost" = "secondary";
  export let size: "md" | "sm" = "md";
  export let type: "button" | "submit" = "button";
  export let href: string | null = null;
  export let icon: string | null = null;
  export let iconAfter: string | null = null;
  export let disabled = false;
  export let loading = false;
  export let full = false;
  export let target: string | null = null;
  export let ariaLabel: string | null = null;
  export let onclick: ((e: MouseEvent) => void) | null = null;
</script>

<UIButton
  {variant}
  {size}
  {type}
  href={href ?? undefined}
  {disabled}
  {loading}
  fullWidth={full}
  target={target ?? undefined}
  rel={target === "_blank" ? "noopener noreferrer" : undefined}
  aria-label={ariaLabel ?? undefined}
  onclick={(e) => onclick?.(e)}
>
  {#snippet iconStart()}{#if icon}<Icon name={icon} size={18} />{/if}{/snippet}
  {#snippet iconEnd()}{#if iconAfter}<Icon name={iconAfter} size={16} />{/if}{/snippet}
  <slot />
</UIButton>
