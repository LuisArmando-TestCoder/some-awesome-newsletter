<script lang="ts">
  import { saveToStore } from '../store.ts';
  import X from '../X/X.svelte';

  let isChecked: boolean;
</script>

<div class="menu-half {isChecked ? 'open' : 'closed'}">
  <nav>
    <ul class="menu-half--list">
      <li class="menu-half--list-item home">
        <a class="menu-half--sub-anchor menu-half--anchor" onclick={() => {
          saveToStore({ stepsIndex: 0, directionsThatShouldDisappear: [] });
        }}>Home</a>
      </li>
      <li class="menu-half--list-item home">
        <a class="menu-half--sub-anchor menu-half--anchor"  onclick={() => {
          saveToStore({ stepsIndex: 7 });
        }}>Config</a>
      </li>
      <li class="menu-half--list-item home">
        <a class="menu-half--sub-anchor menu-half--anchor"  onclick={() => {
          saveToStore({ stepsIndex: 8 });
        }}>News Sources</a>
      </li>
      <li class="menu-half--list-item home">
        <a class="menu-half--sub-anchor menu-half--anchor"  onclick={() => {
          saveToStore({ stepsIndex: 9 });
        }}>Users</a>
      </li>
    </ul>
  </nav>
</div>

<div class="menu-half-x">
  <X trigger={(ic) => (isChecked = !ic)} />
</div>

<style lang="scss">
  @use './MenuHalf.scss';
</style>
