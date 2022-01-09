import preprocess from "svelte-preprocess";
import adapter from '@sveltejs/adapter-netlify';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter({
			// if true, will split your app into multiple functions
			// instead of creating a single one for the entire app
			split: false
		}),

    // hydrate the <div id="svelte"> element in src/app.html
    target: "#svelte",
  },

  preprocess: [preprocess({})],
};

export default config;
