const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {}
	},

	plugins: [
		require("daisyui")
	],
	daisyui: {
    themes: ["light", "dark", "cupcake", "bumblebee", "emerald", "corporate", "synthwave", "retro", "cyberpunk", "valentine", "halloween",  "forest", "aqua",  "pastel", "fantasy", "wireframe", "black", "luxury", "dracula", "cmyk",  "business", "acid", "lemonade", "night", "coffee", "winter"],
  },
		
};

module.exports = config;
