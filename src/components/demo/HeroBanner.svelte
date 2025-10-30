<script lang="ts">
  import VideoBanner from "./VideoBanner.svelte";
  import CTAButton from "./CTAButton.svelte";
  import LetterByLetter from "./LetterByLetter.svelte";
  import { content } from '../../lib/content';

  export let videoUrl: string = "https://www.youtube.com/embed/zPOFU2QY_HA";
  export let imageUrl: string = "https://i.ytimg.com/vi/zPOFU2QY_HA/maxresdefault.jpg";
</script>
<div class="hero-banner">
  <VideoBanner
    videoUrl={videoUrl}
    videoPoster={imageUrl}
    videoAlt={$content.hero.secondaryCta}
  >
    <div slot="video">
      <iframe
        height="600px"
        width="100%"
        src={videoUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="banner-content">
      <h6 class="banner-subtitle">
        <LetterByLetter text={$content.hero.hook} initialOffset={0} />
      </h6>
      <h1 class="banner-title">
        <LetterByLetter text={$content.hero.subHook} initialOffset={47.9 / 100} />
      </h1>
      <div class="button-row">
        <a href="/login">
          <CTAButton label={$content.hero.primaryCta} href="/login" variant="primary" />
        </a>
      </div>
    </div>
  </VideoBanner>
</div>
<style lang="scss">
.hero-banner {
  background: var(--color-background-inversion);
  padding: 3rem 0;
  margin-bottom: 4rem;
}

.banner-content {
  max-width: 700px;
  width: 100%;
  margin: 5rem auto;
  border-radius: 1.5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
}

.banner-subtitle,
.banner-title,
.banner-services-title {
  text-align: inherit;
}

.banner-subtitle {
  font-size: 1.1rem;
  font-weight: 500;
  color: #2a4d7a;
  margin-bottom: 1.2rem;
  letter-spacing: 0.03em;
}

.banner-title {
  font-size: 2.4rem;
  font-weight: 800;
  color: #1a2a3a;
  margin-bottom: 1.5rem;
  line-height: 1.2;
  letter-spacing: -0.01em;
}

.banner-services-title {
  font-size: 1.2rem;
  font-weight: 600;
  color: #3a5a8a;
  margin-bottom: 1rem;
}

.banner-services-list {
  list-style: none;
  padding: 0;
  margin: 0 0 2rem 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  justify-content: flex-start;
}

.banner-service {
  background: #e6f0fa;
  color: #1a2a3a;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.7rem 1.4rem;
  border-radius: 2rem;
  box-shadow: 0 2px 8px 0 rgba(60, 80, 120, 0.07);
  transition: background 0.2s, color 0.2s;
  white-space: nowrap;
  text-align: center;
}

.banner-service:hover,
.banner-service:focus-visible {
  background: #d0e4fa;
  color: #17406a;
}

.button-row {
  display: flex;
  gap: 1.2rem;
  margin-top: 1.2rem;
  justify-content: flex-start;
  width: 100%;
}

@media (max-width: 1024px) {
  .banner-content {
    align-items: center;
    text-align: center;
    padding: 1.5rem 0.5rem;
  }
  .banner-title {
    font-size: 2rem;
  }
  .banner-services-list {
    justify-content: center;
  }
  .button-row {
    justify-content: center;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}

@media (max-width: 600px) {
  .banner-content {
    padding: 1rem 0.2rem;
    border-radius: 1rem;
  }
  .banner-title {
    font-size: 1.3rem;
  }
  .banner-services-list {
    gap: 0.5rem;
  }
  .banner-service {
    font-size: 0.95rem;
    padding: 0.5rem 1rem;
  }
}
</style>
