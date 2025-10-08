<script lang="ts">
  import { onMount } from 'svelte';

  export let messages: string[] = [];

  let currentMessageIndex = 0;

  onMount(() => {
    if (messages.length > 0) {
      const interval = setInterval(() => {
        currentMessageIndex = (currentMessageIndex + 1) % messages.length;
      }, 2000);

      return () => clearInterval(interval);
    }
  });
</script>

<div class="loading-screen">
    <div class="wrapper">
        <div class="box-wrap">
            <div class="box one"></div>
            <div class="box two"></div>
            <div class="box three"></div>
            <div class="box four"></div>
            <div class="box five"></div>
            <div class="box six"></div>
        </div>
    </div>
  {#if messages.length > 0}
    <div class="loading-text">
      {#each messages as message, i}
        <span class:visible={i === currentMessageIndex}>{message}</span>
      {/each}
    </div>
  {/if}
</div>

<style>
  .loading-screen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    color: white;
  }

  .wrapper {
    width: 200px;
    height: 200px;
    background-color: transparent;
    border: none;
    -webkit-user-select: none;
  }

  .box-wrap {
    width: 70%;
    height: 70%;
    margin: 15% 15%;
    position: relative;
    transform: rotate(-45deg);
  }

  .box-wrap .box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: linear-gradient(to right, #141562, #486FBC, #EAB5A1, #8DD6FF, #4973C9, #D07CA7, #F4915E, #F5919E, #B46F89, #141562, #486FBC);
    background-position: 0% 50%;
    background-size: 1000% 1000%;
    visibility: hidden;
  }

  .box-wrap .box.one {
    animation: moveGradient 15s infinite, oneMove 3.5s infinite;
  }

  .box-wrap .box.two {
    animation: moveGradient 15s infinite, twoMove 3.5s 0.15s infinite;
  }

  .box-wrap .box.three {
    animation: moveGradient 15s infinite, threeMove 3.5s 0.3s infinite;
  }

  .box-wrap .box.four {
    animation: moveGradient 15s infinite, fourMove 3.5s 0.575s infinite;
  }

  .box-wrap .box.five {
    animation: moveGradient 15s infinite, fiveMove 3.5s 0.725s infinite;
  }

  .box-wrap .box.six {
    animation: moveGradient 15s infinite, sixMove 3.5s 0.875s infinite;
  }

  @keyframes moveGradient {
    to {
      background-position: 100% 50%;
    }
  }

  @keyframes oneMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  @keyframes twoMove {
    0% {
      visibility: visible;
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  @keyframes threeMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(0% 70% 70% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(0% 35% 70% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 70% 35% 0% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  @keyframes fourMove {
    0% {
      visibility: visible;
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  @keyframes fiveMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  @keyframes sixMove {
    0% {
      visibility: visible;
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    14.2857% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    28.5714% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    42.8571% {
      clip-path: inset(70% 0% 0% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    57.1428% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    71.4285% {
      clip-path: inset(35% 0% 35% 70% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    85.7142% {
      clip-path: inset(35% 35% 35% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
    100% {
      clip-path: inset(70% 35% 0% 35% round 5%);
      animation-timing-function: cubic-bezier(0.86, 0, 0.07, 1);
    }
  }

  .loading-text {
    margin-top: 20px;
    font-size: 1.2em;
    height: 2em;
    display: grid;
    place-items: center;
  }

  .loading-text span {
    grid-column: 1;
    grid-row: 1;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.42, 0, 0.58, 1);
  }

  .loading-text span.visible {
    opacity: 1;
  }
</style>
