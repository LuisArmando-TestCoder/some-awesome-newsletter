<script lang="ts">
  /**
   * Click-to-play YouTube embed. Shows the poster until the visitor presses
   * play, so no third-party player loads on page view.
   * States: rest, hover (poster lifts, button grows), focus-visible (ring on the
   * button), pressed (scale .97), busy (player loading: spinner after 350 ms,
   * aria-busy), then the player takes over and keyboard focus moves into it.
   */
  import { tick } from 'svelte';

  export let videoId: string;
  export let title: string;
  export let playLabel = 'Play video';

  let playing = false;
  let loaded = false;
  let hadFocus = false;
  let button: HTMLButtonElement;
  let frame: HTMLIFrameElement;

  $: poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  $: src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  function play() {
    if (playing) return; // no double start while the player loads
    hadFocus = typeof document !== 'undefined' && document.activeElement === button;
    playing = true;
  }

  async function onFrameLoad() {
    loaded = true;
    await tick();
    // Keep keyboard users where they were: the control they pressed became the player.
    if (hadFocus) frame?.focus();
  }
</script>

<div class="video" class:is-playing={playing}>
  {#if playing}
    <iframe
      bind:this={frame}
      on:load={onFrameLoad}
      {src}
      {title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  {/if}

  {#if !loaded}
    <button
      bind:this={button}
      type="button"
      class="video__poster"
      on:click={play}
      aria-label={playLabel}
      aria-busy={playing ? 'true' : undefined}
    >
      <img src={poster} alt="" loading="eager" fetchpriority="high" decoding="async" width="480" height="360" />
      <span class="video__scrim" aria-hidden="true"></span>
      <span class="video__play" aria-hidden="true">
        <svg class="video__icon" width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5.5v13a.5.5 0 0 0 .77.42l10.2-6.5a.5.5 0 0 0 0-.84L8.77 5.08A.5.5 0 0 0 8 5.5z" /></svg>
        <span class="video__spinner"></span>
      </span>
    </button>
  {/if}
</div>

<style lang="scss">
  .video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-2xl);
    overflow: hidden;
    background: var(--surface-2);
    /* It floats above the page, so it is the one thing here with a shadow. */
    box-shadow: var(--shadow-3);
    isolation: isolate;

    iframe {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      border: 0;
    }
  }

  .video__poster {
    position: absolute;
    inset: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    border-radius: inherit;
    background: var(--surface-2);
    cursor: pointer;
    overflow: hidden;
    -webkit-tap-highlight-color: transparent;

    img {
      display: block;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform var(--dur-slow) var(--ease-out);
    }
  }

  .video__scrim {
    position: absolute;
    inset: 0;
    background: var(--surface-overlay);
    opacity: 0.35;
    transition: opacity var(--t-out) var(--ease-out);
  }

  .video__play {
    position: absolute;
    top: 50%;
    left: 50%;
    display: grid;
    place-items: center;
    width: clamp(4rem, 3rem + 4vw, 6rem);
    aspect-ratio: 1;
    border-radius: var(--radius-full);
    background: var(--surface-glass);
    -webkit-backdrop-filter: blur(16px) saturate(1.4);
    backdrop-filter: blur(16px) saturate(1.4);
    color: var(--text-1);
    box-shadow: var(--shadow-2);
    transform: translate(-50%, -50%);
    transition:
      transform var(--t-out) var(--ease-out),
      background-color var(--t-out) var(--ease-out);
  }
  .video__icon {
    grid-area: 1 / 1;
    width: 36%;
    height: auto;
    margin-left: 6%;
    transition: opacity var(--dur-fast) var(--ease-out);
  }

  /* Busy: a ring replaces the triangle once loading takes longer than 350 ms. */
  .video__spinner {
    grid-area: 1 / 1;
    width: 40%;
    aspect-ratio: 1;
    border-radius: var(--radius-full);
    border: 2px solid color-mix(in srgb, currentColor 20%, transparent);
    border-top-color: currentColor;
    opacity: 0;
  }
  .video__poster[aria-busy='true'] {
    cursor: progress;
    .video__icon {
      animation: video-hide 1ms linear 350ms both;
    }
    .video__spinner {
      animation:
        video-show 1ms linear 350ms both,
        video-spin 800ms linear infinite;
    }
  }

  @media (hover: hover) and (pointer: fine) {
    .video__poster:hover:not([aria-busy='true']) {
      img {
        transform: scale(1.02);
      }
      .video__scrim {
        opacity: 0.15;
        transition-duration: var(--t-in);
      }
      .video__play {
        transform: translate(-50%, -50%) scale(1.06);
        background: var(--surface-0);
        transition-duration: var(--t-in);
      }
    }
  }

  .video__poster:active:not([aria-busy='true']) .video__play {
    transform: translate(-50%, -50%) scale(0.97);
    transition-duration: 60ms;
  }

  .video__poster:focus-visible {
    outline: none;
    .video__play {
      box-shadow: var(--focus-ring), var(--shadow-2);
    }
    .video__scrim {
      opacity: 0.15;
    }
  }

  @keyframes video-spin {
    to {
      transform: rotate(1turn);
    }
  }
  @keyframes video-show {
    to {
      opacity: 1;
    }
  }
  @keyframes video-hide {
    to {
      opacity: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .video__poster:hover img,
    .video__poster:active .video__play {
      transform: none;
    }
    .video__poster:hover .video__play,
    .video__poster:active .video__play {
      transform: translate(-50%, -50%);
    }
  }

  @media (forced-colors: active) {
    .video__play {
      border: 2px solid ButtonText;
    }
    .video__poster:focus-visible .video__play {
      outline: 2px solid Highlight;
      outline-offset: 2px;
    }
  }
</style>
