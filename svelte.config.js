// svelte.config.js
import adapter from "@sveltejs/adapter-static";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import sveltePreprocess from "svelte-preprocess";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Combine the existing vitePreprocess with additional options for SCSS and TS
  preprocess: [
    vitePreprocess(),
    sveltePreprocess({
      scss: {
        includePaths: ["src"],
      },
      typescript: true,
    }),
  ],
  kit: {
    adapter: adapter(),
  },
};

export default config;
