<script lang="ts">
  /**
   * Mount once in a layout. Keeps the live connection in sync with the
   * signed-in owner and publishes backend log lines on `latestMessage`.
   * All logic lives in $lib/api/socket.ts.
   */
  import { onMount } from "svelte";
  import store, { latestMessage, socket } from "./store";
  import { connectSocket, disconnectSocket, getSocket, on } from "$lib/api/socket";

  onMount(() => {
    const offLog = on("log", (msg: string) => latestMessage.set(msg));

    const unsubscribe = store.subscribe((value) => {
      const { isAuthCodeValid, configuratorEmail, authCode } = value;
      if (isAuthCodeValid && configuratorEmail && authCode) {
        connectSocket(configuratorEmail, authCode).then(() => socket.set(getSocket() as any));
      }
    });

    return () => {
      unsubscribe();
      offLog();
      disconnectSocket();
      socket.set(null);
    };
  });
</script>
