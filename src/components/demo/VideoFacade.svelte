<script lang="ts">
  /**
   * Click-to-play YouTube embed. Shows the poster until the visitor presses
   * play, so no third-party player loads on page view.
   */
  export let videoId: string;
  export let title: string;
  export let playLabel = 'Play video';

  let playing = false;

  $: poster = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  $: src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
</script>

<div class="video">
  {#if playing}
    <iframe
      {src}
      {title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
      referrerpolicy="strict-origin-when-cross-origin"
    ></iframe>
  {:else}
    <button type="button" class="video__poster" on:click={() => (playing = true)} aria-label={playLabel}>
      <img src={poster} alt="" loading="lazy" decoding="async" width="480" height="360" />
      <span class="video__play" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z" /></svg>
      </span>
    </button>
  {/if}
</div>

<style lang="scss">
  .video {
    position: relative;
    width: 100%;
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-lg, 14px);
    overflow: hidden;
    background: var(--surface-inverse, #0f172a);
    box-shadow: var(--shadow-2, 0 6px 20px rgba(0, 0, 0, 0.12));

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
    width: 100%;
    height: 100%;
    padding: 0;
    border: 0;
    cursor: pointer;
    background: none;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }

    &:focus-visible {
      outline: 3px solid var(--focus-color, #6366f1);
      outline-offset: -3px;
    }

    &:hover .video__play { background: var(--accent-hover, #4338ca); }
  }

  .video__play {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 72px;
    height: 72px;
    margin: -36px 0 0 -36px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--radius-full, 999px);
    background: var(--accent, #4f46e5);
    color: var(--accent-contrast, #fff);
    box-shadow: var(--shadow-3, 0 10px 25px rgba(0, 0, 0, 0.2));
    transition: background-color var(--dur-fast, 120ms) var(--ease-out, ease-out);
  }

  @media (prefers-reduced-motion: reduce) {
    .video__play { transition: none; }
  }
</style>
