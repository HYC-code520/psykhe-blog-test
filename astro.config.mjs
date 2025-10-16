// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
	site: "https://www.psykhe.com",
	trailingSlash: "always",
	integrations: [mdx()],
	vite: {
		plugins: [tailwindcss()],
		define: {
			"process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
		},
		server: {
			fs: {
				allow: [".."],
			},
		},
	},
});
