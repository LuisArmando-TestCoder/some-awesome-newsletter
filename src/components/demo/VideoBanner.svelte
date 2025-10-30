<script lang="ts">
  import { onMount } from "svelte";

  export let videoUrl: string;
  export let videoPoster: string;
  export let videoAlt: string = "";

  let imgWrap: HTMLElement;
  let img: HTMLImageElement;
  let isOpen = false;

  function setVideoHeight() {
    const iframe = imgWrap?.querySelector('iframe');
    if (iframe) {
      iframe.style.height = `${img.clientHeight}px`;
      iframe.style.width = '100%';
    }
  }

  function frame() {
    setVideoHeight();
    requestAnimationFrame(frame);
  }

  function onclick() {
    isOpen = !isOpen;
  }

  onMount(() => {
    frame();
  });
</script>

<div class="re-wrap">
  <div class="video" class:show={true}>
    <slot name="video" />
  </div>
  <div class="wrapper">
    <div class="img-wrap" class:show={true} on:click={onclick} bind:this={imgWrap}>
      <img class="img" bind:this={img} src={videoPoster} alt={videoAlt}>
    </div>
    <div class:show={true} class="slot-wrap">
      <slot />
    </div>
  </div>
</div>

<style lang="scss">
  .slot-wrap {
    overflow: hidden;
    transition: opacity 1s ease-in-out, transform 0.5s ease-in-out;
    opacity: 1;
    transform: translateX(0px);
  }

  .re-wrap {
    position: relative;
    @media (max-width: 1024px) {
      padding: 0 1rem;
    }
  }

  .video {
    width: 100%;
    object-fit: cover;
    position: absolute;
    opacity: 0;
    z-index: 1;
    transition: opacity 0.5s ease-in-out .5s;
    pointer-events: none;
    border-radius: 15px;
    padding: 25px;
    
    &.show {
      opacity: 1;
      pointer-events: all;
    }
  }
  
  .img-wrap {
    display: flex;
    place-content: center;
    cursor: pointer;
    position: relative;
    transition-delay: 1s opacity;

    &::before, &::after {
      pointer-events: none;
    }

    &::before {
      transition: .5s width, .5s height, .5s top, .5s left, 1s box-shadow, opacity .5s;
      box-shadow: 0 0 5px -2.5px var(--color-background-inversion);
      content: "";
      --size: 75px;
      border-radius: 50%;
      width: var(--size);
      height: var(--size);
      background: var(--color-background-inversion);
      position: absolute;
      top: calc(50% - var(--size) / 2);
      left: calc(50% - var(--size) / 2);
      z-index: 1;
    }

    &::after {
      transition: .75s width, .75s height, .75s top, .75s left, transform .75s, opacity .35s;
      content: "";
      --size: 25px;
      transform: rotate(0deg);
      width: var(--size);
      height: var(--size);
      background: var(--color-background);
      position: absolute;
      top: calc(50% - var(--size) / 2);
      left: calc(50% - var(--size) / 2);
      z-index: 1;
      clip-path: polygon(100% 50%, 10% 0, 10% 100%);
    }

    &.show {
      opacity: 0;
      transition-delay: 0s;
    }
  }
  
  .img {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 0 5px -.5px var(--color-background-inversion);
  }

  .wrapper {
    padding: 25px;
    grid-gap: 25px;
    display: grid;
    grid-template-columns: 1fr;
    place-items: center;
  }
</style>
