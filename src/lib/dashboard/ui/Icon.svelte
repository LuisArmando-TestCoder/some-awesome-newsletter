<!-- WS4. Line icons (24px grid, stroke uses currentColor). Decorative by default. -->
<script lang="ts" context="module">
  export const ICONS: Record<string, string> = {
    home: "M3 10.5 12 3l9 7.5M5 9v11h5v-6h4v6h5V9",
    bolt: "M13 2 4 14h7l-1 8 9-12h-7l1-8z",
    source: "M4 4h16v6H4zM4 14h7v6H4zM15 14h5v6h-5z",
    people: "M16 19v-1a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v1M9 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6M22 19v-1a4 4 0 0 0-3-3.9M16 4.1a3 3 0 0 1 0 5.8",
    chart: "M4 20V10M10 20V4M16 20v-7M22 20H2",
    blog: "M4 4h12l4 4v12H4zM8 10h8M8 14h8M8 18h5",
    gear: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1a1.7 1.7 0 0 0-1.1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1a1.7 1.7 0 0 0 1.5-1.1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z",
    check: "M5 12.5 10 17 19 7",
    circle: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z",
    alert: "M12 9v4M12 17h.01M10.3 3.9 1.8 18a2 2 0 0 0 1.7 3h17a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0z",
    info: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 16v-4M12 8h.01",
    arrow: "M5 12h14M13 6l6 6-6 6",
    send: "M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z",
    clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
    play: "M7 4v16l13-8z",
    mail: "M3 5h18v14H3zM3 6l9 7 9-7",
    upload: "M12 16V4M6 10l6-6 6 6M4 20h16",
    download: "M12 4v12M6 10l6 6 6-6M4 20h16",
    search: "M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM21 21l-5-5",
    menu: "M4 6h16M4 12h16M4 18h16",
    close: "M6 6l12 12M18 6 6 18",
    sun: "M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zM12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4",
    sliders: "M4 21v-7M4 10V3M12 21v-9M12 8V3M20 21v-5M20 12V3M1 14h6M9 8h6M17 16h6",
    globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18",
    plus: "M12 5v14M5 12h14",
    logout: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9",
    code: "M16 18l6-6-6-6M8 6l-6 6 6 6",
    card: "M2 5h20v14H2zM2 10h20",
    refresh: "M21 12a9 9 0 1 1-3-6.7L21 8M21 3v5h-5",
    sparkle: "M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6",
    external: "M14 3h7v7M10 14 21 3M19 14v6H4V5h6",
  };
</script>

<script lang="ts">
  export let name: string;
  export let size: number | string = 20;
  export let label: string | null = null;
  export let strokeWidth = 1.8;
</script>

<svg
  class="dash-icon"
  width={size}
  height={size}
  viewBox="0 0 24 24"
  fill="none"
  stroke="currentColor"
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  role={label ? "img" : undefined}
  aria-label={label ?? undefined}
  aria-hidden={label ? undefined : "true"}
  focusable="false"
>
  <path d={ICONS[name] ?? ICONS.circle} />
</svg>

<style>
  .dash-icon { flex-shrink: 0; display: block; }
</style>
