<div class="skeleton-card" aria-hidden="true">
  <div class="skeleton-image shimmer"></div>
  <div class="skeleton-text">
    <div class="skeleton-line shimmer title"></div>
    <div class="skeleton-line shimmer"></div>
    <div class="skeleton-line shimmer short"></div>
  </div>
</div>

<style lang="scss">
  /* Same shape as BlogArticleCard: 3:2 image, title, two lines, meta. */
  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }

  .skeleton-card {
    height: 100%;
    border-radius: var(--radius-xl);
    overflow: hidden;
    background: var(--surface-0);
    border: 1px solid var(--border-1);
  }

  .shimmer {
    background: var(--surface-2);
    animation: pulse 1.4s var(--ease-in-out) infinite;
  }

  .skeleton-image {
    width: 100%;
    aspect-ratio: 3 / 2;
  }

  .skeleton-text {
    padding: var(--space-5);
  }

  .skeleton-line {
    height: 0.875rem;
    margin-bottom: var(--space-3);
    border-radius: var(--radius-sm);

    &.title {
      height: 1.5rem;
      width: 80%;
      margin-bottom: var(--space-4);
    }

    &.short {
      width: 45%;
      margin-bottom: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shimmer {
      animation: none;
    }
  }
</style>
