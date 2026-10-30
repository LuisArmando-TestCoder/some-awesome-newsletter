<div class="skeleton-card" aria-hidden="true">
  <div class="skeleton-image shimmer"></div>
  <div class="skeleton-text">
    <div class="skeleton-line shimmer title"></div>
    <div class="skeleton-line shimmer"></div>
    <div class="skeleton-line shimmer short"></div>
  </div>
</div>

<style lang="scss">
  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.45;
    }
  }

  .skeleton-card {
    height: 100%;
    border-radius: var(--radius-lg, 16px);
    overflow: hidden;
    background: var(--surface-1, #fff);
    border: 1px solid var(--border-1, #e5e5e5);
  }

  .shimmer {
    background: var(--surface-2, #f0f0f0);
    animation: pulse 1.5s var(--ease-in-out, ease-in-out) infinite;
  }

  .skeleton-image {
    width: 100%;
    aspect-ratio: 16 / 9;
  }

  .skeleton-text {
    padding: var(--space-5, 24px);
  }

  .skeleton-line {
    height: 0.875rem;
    margin-bottom: var(--space-3, 12px);
    border-radius: var(--radius-sm, 4px);

    &.title {
      height: 1.25rem;
      width: 70%;
    }

    &.short {
      width: 50%;
      margin-bottom: 0;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .shimmer {
      animation: none;
    }
  }
</style>
