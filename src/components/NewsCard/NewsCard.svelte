<script lang="ts">
  import LoadingWheel from "../LoadingWheel/LoadingWheel.svelte";

  export let imageSrc: string;
  export let imageAlt: string;
  export let title: string;
  export let excerpt: string;
  export let link: string | undefined = undefined;
  export let readMoreText: string = "Read more";
  export let loading: boolean = false;

  const hasImage = imageSrc && imageSrc !== 'placeholder.jpg';
</script>

{#if loading}
  <div class="loading-container">
    <LoadingWheel />
  </div>
{:else}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
  <article class="news-item" class:no-image={!hasImage} on:click>
        <div class="news-item-image-wrapper">
          <img class="news-item-image" src={imageSrc} alt={imageAlt} />
        </div>
        <div class="news-item-card">
          <span class="news-item-link">
            <div class="news-item-texts">
              <h5 class="news-item-title">{title}</h5>
              <p class="news-item-desc">{excerpt}</p>
              <span class="more-link">{readMoreText}</span>
            </div>
          </span>
        </div>
      </article>
{/if}

<style lang="scss">
.loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
// Main section styling for card only (no section or grid styles)
.news-item {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background: transparent;
  box-shadow: none;
  border-radius: 0;
  padding: 0;
  min-width: 0;
  max-width: 100%;
  position: relative;
  height: 100%;
  justify-content: flex-end;

  .news-item-image-wrapper {
    position: relative;
    width: 100%;
    min-height: 220px;
    height: 220px;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    z-index: 1;
    background: var(--surface-2, #eaf1f7);
    border-radius: var(--radius-lg, 16px);
    overflow: visible;
    transition: height 1.1s cubic-bezier(.22,.61,.36,1), min-height 1.1s cubic-bezier(.22,.61,.36,1);
  }

  .news-item-image {
    position: absolute;
    left: 50%;
    top: 0;
    width: 92%;
    height: 220px;
    transform: translate(-50%, -50%) scale(0.95);
    object-fit: cover;
    object-position: 50% 50%;
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-1, none);
    z-index: 1;
    transition:
      height 1.1s cubic-bezier(.22,.61,.36,1),
      transform 1.4s cubic-bezier(.22,.61,.36,1),
      object-position 1.7s cubic-bezier(.22,.61,.36,1);
    will-change: height, transform, object-position;
  }

  .news-item-card {
    position: absolute;
    left: 50%;
    top: calc(60% + 3rem);
    transform: translate(-50%, -50%) scale(0.95);
    width: 78%;
    min-width: 0;
    background: var(--surface-1, #fff);
    border-radius: var(--radius-lg, 16px);
    box-shadow: var(--shadow-2, none);
    padding: 1.3rem 1.1rem 1.1rem 1.1rem;
    min-height: 170px;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
    z-index: 2;
    transition:
      box-shadow 2s cubic-bezier(.22,.61,.36,1),
      transform 2.3s cubic-bezier(.22,.61,.36,1),
      top 2.6s cubic-bezier(.22,.61,.36,1);
    will-change: transform, box-shadow, top;
  }

  &:focus-within {
    outline: 2px solid var(--focus-color, #2563eb);
    outline-offset: 4px;
    border-radius: var(--radius-lg, 16px);
  }

  &:hover {
    .news-item-image-wrapper {
      min-height: 340px;
      height: 340px;
    }
    .news-item-image {
      height: 340px;
      transform: translateX(-50%) scale(1);
      object-position: 50% 40%;
    }
    .news-item-card {
      top: calc(50% + 3rem);
      transform: translate(-50%, -50%) scale(1);
      box-shadow: var(--shadow-3, none);
    }
  }

  &.no-image {
    justify-content: flex-start;

    .news-item-image-wrapper {
      display: none;
    }

    .news-item-card {
      position: relative;
      left: auto;
      top: auto;
      transform: none;
      width: 100%;
      min-height: 0;
    }

    &:hover .news-item-card {
      transform: scale(1);
      top: auto;
    }
  }
}

.news-item-link {
  display: block;
  width: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.news-item-texts {
  display: flex;
  flex-direction: column;
  gap: 0.3em;
  width: 100%;
  align-items: flex-start;
  justify-content: flex-end;
  min-height: 120px;
}

.news-item-title {
  font-size: var(--fs-lg, 1.125rem);
  font-weight: var(--fw-bold, 700);
  color: var(--text-1, #111);
  margin-bottom: 0.3rem;
  line-height: 1.25;
  max-height: 2.7em;
  overflow: hidden;
  text-align: left;
  transform: scale(0.95);
  transition: transform 0.3s cubic-bezier(.22,.61,.36,1);
}

.news-item-desc {
  font-size: var(--fs-sm, 0.875rem);
  color: var(--text-2, #555);
  margin-bottom: 0.4rem;
  line-height: 1.5;
  max-height: 6.2em;
  overflow: hidden;
  text-align: left;
  opacity: 0.92;
  transform: scale(0.95);
  transition: transform 0.45s cubic-bezier(.22,.61,.36,1);
}

.more-link {
  color: var(--text-link, #2563eb);
  font-weight: 700;
  text-decoration: none;
  font-size: var(--fs-sm, 0.875rem);
  letter-spacing: 0.04em;
  margin-top: 0.2em;
  display: inline-block;
  align-self: flex-start;
  text-align: left;
  opacity: 0.88;
  cursor: pointer;
  transform: scale(0.95);
  transition: transform 0.6s cubic-bezier(.22,.61,.36,1);
}

.news-item:hover {
  .news-item-title,
  .news-item-desc,
  .more-link {
    transform: scale(1);
  }
}
@media (prefers-reduced-motion: reduce) {
  .news-item,
  .news-item * {
    transition: none !important;
  }
}
</style>
