<div class="skeleton-card">
  <div class="skeleton-image"></div>
  <div class="skeleton-text">
    <div class="skeleton-line title"></div>
    <div class="skeleton-line"></div>
    <div class="skeleton-line short"></div>
  </div>
</div>

<style lang="scss">
  @keyframes pulse {
    0% {
      background-color: #e0e0e0;
    }
    50% {
      background-color: #f0f0f0;
    }
    100% {
      background-color: #e0e0e0;
    }
  }

  .skeleton-card {
    border-radius: 12px;
    overflow: hidden;
    background-color: #fff;
    border: 1px solid #eee;
  }

  .skeleton-image {
    width: 100%;
    aspect-ratio: 16 / 9;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .skeleton-text {
    padding: 1rem;
  }

  .skeleton-line {
    height: 1rem;
    margin-bottom: 0.75rem;
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;

    &.title {
      height: 1.5rem;
      width: 70%;
    }

    &.short {
      width: 50%;
    }
  }
</style>
