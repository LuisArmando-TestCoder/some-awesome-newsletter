<script lang="ts">
  export let items: string[];
  export let activeItem: string;
</script>

<div class="tabs-wrapper">
  <div class="tabs">
    {#each items as item}
      <button class="tab" class:active={activeItem === item} on:click={() => (activeItem = item)}>
        <slot name="item" {item} />
      </button>
    {/each}
  </div>
</div>

<style lang="scss">
  .tabs-wrapper {
    width: 100%;
    border-bottom: 1px solid #ccc;
  }
  .tabs {
    display: flex;
    width: 100%;
  }

  .tab {
    flex: 1;
    padding: 10px 0;
    cursor: pointer;
    border: 1px solid #ccc;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
    background: #e0e0e0;
    text-align: center;
    font-size: 16px;
    letter-spacing: 0.5px;
    margin: 0 -1px -1px 0;
    position: relative;
    transition:
      flex 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
      font-size 0.3s cubic-bezier(0.25, 0.8, 0.25, 1),
      letter-spacing 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

    &:hover {
      flex: 1.5;
      font-size: 17px;
      letter-spacing: 0.8px;
      background: #f0f0f0;
      z-index: 1;
    }

    &.active {
      background: #fff;
      border-bottom: 1px solid #fff;
      z-index: 2;
    }
  }
</style>
