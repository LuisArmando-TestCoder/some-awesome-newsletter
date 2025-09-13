<script lang="ts">
  import { collapsed } from "$lib/stores/sidebar.store";
  import { user } from "$lib/stores/user";
  import store, { saveToStore, stepsMapping } from "../../../components/store";
  import logout from "../../../components/systems/requests/logout";
  import SideLink from "./SideLink.svelte";
  import type { SideLinkType, StepsKey } from "../../../components/types";

  function step(stepName: StepsKey) {
    return () =>
      saveToStore({
        stepsIndex: stepsMapping[stepName],
      });
  }

  function getLink(name: StepsKey): SideLinkType {
    return { name, callback: step(name) };
  }

  export let links: SideLinkType[] = [
    {
      name: "Dashboard",
      children: [
        getLink("News Sources"),
        getLink("Users"),
      ],
    },
    getLink("Reports"),
    {
      name: "Settings",
      children: [
        getLink("Profile"),
        getLink("Billing"),
      ],
    },
  ];
</script>

<aside class="sidebar" class:collapsed={$collapsed}>
  <button
    class="sidebar__toggle"
    on:click={() => collapsed.update((n) => !n)}
    aria-expanded={!$collapsed}
    aria-controls="sidebar-nav"
  >
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      data-rtl-flip=""
      class="icon max-md:hidden"
      ><path
        d="M6.83496 3.99992C6.38353 4.00411 6.01421 4.0122 5.69824 4.03801C5.31232 4.06954 5.03904 4.12266 4.82227 4.20012L4.62207 4.28606C4.18264 4.50996 3.81498 4.85035 3.55859 5.26848L3.45605 5.45207C3.33013 5.69922 3.25006 6.01354 3.20801 6.52824C3.16533 7.05065 3.16504 7.71885 3.16504 8.66301V11.3271C3.16504 12.2712 3.16533 12.9394 3.20801 13.4618C3.25006 13.9766 3.33013 14.2909 3.45605 14.538L3.55859 14.7216C3.81498 15.1397 4.18266 15.4801 4.62207 15.704L4.82227 15.79C5.03904 15.8674 5.31234 15.9205 5.69824 15.9521C6.01398 15.9779 6.383 15.986 6.83398 15.9902L6.83496 3.99992ZM18.165 11.3271C18.165 12.2493 18.1653 12.9811 18.1172 13.5702C18.0745 14.0924 17.9916 14.5472 17.8125 14.9648L17.7295 15.1415C17.394 15.8 16.8834 16.3511 16.2568 16.7353L15.9814 16.8896C15.5157 17.1268 15.0069 17.2285 14.4102 17.2773C13.821 17.3254 13.0893 17.3251 12.167 17.3251H7.83301C6.91071 17.3251 6.17898 17.3254 5.58984 17.2773C5.06757 17.2346 4.61294 17.1508 4.19531 16.9716L4.01855 16.8896C3.36014 16.5541 2.80898 16.0434 2.4248 15.4169L2.27051 15.1415C2.03328 14.6758 1.93158 14.167 1.88281 13.5702C1.83468 12.9811 1.83496 12.2493 1.83496 11.3271V8.66301C1.83496 7.74072 1.83468 7.00898 1.88281 6.41985C1.93157 5.82309 2.03329 5.31432 2.27051 4.84856L2.4248 4.57317C2.80898 3.94666 3.36012 3.436 4.01855 3.10051L4.19531 3.0175C4.61285 2.83843 5.06771 2.75548 5.58984 2.71281C6.17898 2.66468 6.91071 2.66496 7.83301 2.66496H12.167C13.0893 2.66496 13.821 2.66468 14.4102 2.71281C15.0069 2.76157 15.5157 2.86329 15.9814 3.10051L16.2568 3.25481C16.8833 3.63898 17.394 4.19012 17.7295 4.84856L17.8125 5.02531C17.9916 5.44285 18.0745 5.89771 18.1172 6.41985C18.1653 7.00898 18.165 7.74072 18.165 8.66301V11.3271ZM8.16406 15.995H12.167C13.1112 15.995 13.7794 15.9947 14.3018 15.9521C14.8164 15.91 15.1308 15.8299 15.3779 15.704L15.5615 15.6015C15.9797 15.3451 16.32 14.9774 16.5439 14.538L16.6299 14.3378C16.7074 14.121 16.7605 13.8478 16.792 13.4618C16.8347 12.9394 16.835 12.2712 16.835 11.3271V8.66301C16.835 7.71885 16.8347 7.05065 16.792 6.52824C16.7605 6.14232 16.7073 5.86904 16.6299 5.65227L16.5439 5.45207C16.32 5.01264 15.9796 4.64498 15.5615 4.3886L15.3779 4.28606C15.1308 4.16013 14.8165 4.08006 14.3018 4.03801C13.7794 3.99533 13.1112 3.99504 12.167 3.99504H8.16406C8.16407 3.99667 8.16504 3.99829 8.16504 3.99992L8.16406 15.995Z"
      ></path></svg
    >
  </button>
  <nav id="sidebar-nav" class="sidebar__nav">
    <ul class="sidebar__nav-list">
      {#each links as link}
        <SideLink
          {link}
        />
      {/each}
    </ul>
  </nav>

  {#if $store.isAuthCodeValid}
    <div class="sidebar__profile">
      <img
        src={$user?.picture || "/icons/user.png"}
        alt="User avatar"
        class="sidebar__profile-avatar"
      />
      <div class="sidebar__profile-info">
        <p class="sidebar__profile-name">{$store?.config.senderName}</p>
        <a
          on:click={() => {
            logout();
          }}
          class="sidebar__profile-logout">Log Out</a
        >
      </div>
    </div>
  {/if}
</aside>

<style lang="scss">
  @use "../../../styles/global.scss";

  .sidebar {
    background: var(--c-bg-alt);
    padding: var(--space-md);
    border-right: 1px solid var(--c-border);
    transition: width 0.3s ease;
    width: 250px;
    display: flex;
    flex-direction: column;
    height: calc(100vh - 83px);
    position: sticky;
    top: 0;

    &__toggle {
      background: transparent;
      border: 0;
      display: grid;
      place-items: center;
      display: block;
      justify-content: center;
      margin: 0 0 0 auto;
      border-radius: 5px;
      padding: var(--space-sm) var(--space-sm) calc(var(--space-sm) / 2);

      &:hover {
        background: #0001;
        cursor: pointer;
        position: relative;

        &::after {
          content: "Close Sidebar";
          display: block;
          background: #000;
          color: #fff;
          border-radius: 5px;
          position: absolute;
          --w: 85px;
          width: var(--w);
          font-size: 12px;
          flex-wrap: nowrap;
          padding: 5px var(--space-sm);
          margin: auto;
          bottom: calc(var(--space-lg) * -1);
          left: calc(var(--w) * -0.4);
          right: 0;
        }
      }
    }

    .sidebar__nav-link,
    .sidebar__profile-name,
    .sidebar__profile-logout {
      text-wrap: no-wrap;
      text-overflow: ellipsis;
      transition: 0.5s opacity 0.15s;
    }

    &.collapsed {
      overflow: hidden;
      width: var(--collapsed-width);

      .sidebar__toggle {
      }

      .sidebar__nav-link,
      .sidebar__profile-name,
      .sidebar__profile-logout {
        transition: 0s opacity 0s;
        width: 0;
        opacity: 0;
      }
    }
  }

  .sidebar__nav-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar__nav-item {
    /* margin-bottom: var(--space-md); */
  }

  .sidebar__nav-link {
    color: var(--c-text);
    text-decoration: none;
    font-weight: 600;

    &:hover {
      color: var(--c-primary);
    }
  }

  .sidebar__profile {
    margin-top: auto;
    padding: var(--space-lg) 0;
    border-top: 1px solid var(--c-border);
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .sidebar__profile-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .sidebar__profile-name {
    font-weight: 600;
    width: 100%;
    text-overflow: ellipsis;
    max-width: 130px;
    overflow: hidden;
  }

  .sidebar__profile-logout {
    font-size: 0.9rem;
    color: var(--c-text-light);
    cursor: pointer;
    color: var(--color-background-inversion);
    padding: 5px 40px;
    border-radius: 5px;
    transform: scale(1);
    display: inline-block;
    transition:
      1s color,
      0.75s box-shadow,
      0.5s transform;
    transition-timing-function: cubic-bezier(0.5, -0.5, 0.5, 1);
    box-shadow: inset 0 0 0 200px var(--color-background);

    &:hover {
      transition:
        0.5s color,
        1s box-shadow,
        0.75s transform;
      transform: scale(1.1);
      box-shadow: inset 0 0 0 2px var(--color-background);
      color: var(--color-background);
    }
  }
</style>
