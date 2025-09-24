<script lang="ts">
  import LoadingWheel from "../LoadingWheel/LoadingWheel.svelte";

  export let imageSrc: string;
  export let imageAlt: string;
  export let title: string;
  export let excerpt: string;
  export let link: string;
  export let readMoreText: string = "READ MORE";
  export let loading: boolean = false;

  const hasImage = imageSrc && imageSrc !== 'placeholder.jpg';
</script>

{#if loading}
  <div class="loading-container">
    <LoadingWheel />
  </div>
{:else}
  <a href={link}>
      <article class="news-item" class:no-image={!hasImage}>
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
  </a>
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
    background: #eaf1f7;
    border-radius: 18px;
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
    border-radius: 18px;
    box-shadow: 0 2px 16px rgba(30,144,255,0.08);
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
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(30,144,255,0.10);
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
      box-shadow: 0 8px 32px rgba(30,144,255,0.16);
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
  font-size: 1.18rem;
  font-weight: 800;
  color: var(--color-highlight-1);
  margin-bottom: 0.3rem;
  line-height: 1.25;
  max-height: 2.7em;
  overflow: hidden;
  text-align: left;
  transform: scale(0.95);
  transition: transform 0.3s cubic-bezier(.22,.61,.36,1);
}

.news-item-desc {
  font-size: 1.01rem;
  color: #7a7a7a;
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
  color: var(--color-highlight-1);
  font-weight: 700;
  text-decoration: none;
  font-size: 0.93rem;
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
</style>
