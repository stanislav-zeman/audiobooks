import { defineConfig } from "astro/config";
import node from "@astrojs/node";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs()],
  output: "server",
  vite: {
    ssr: {
      external: ["grpc-ts"],
    },
  },
  adapter: node({
    mode: "standalone",
  }),
});
