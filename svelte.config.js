import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";
import adapter from "@sveltejs/adapter-netlify";

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
      // if true, will split your app into multiple functions
      // instead of creating a single one for the entire app
      split: false,
    }),
    alias: {
      $data: "src/data",
      $components: "src/components",
    },
  },

  preprocess: [vitePreprocess({})],
};

export default config;
