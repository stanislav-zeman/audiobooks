import { defineConfig } from "astro/config";
import adapter from "@astrojs/vercel/edge";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
import solidJs from "@astrojs/solid-js";

// https://astro.build/config
import image from "@astrojs/image";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), solidJs(), image()],
  output: "server",
  vite: {
    ssr: {
      external: ["grpc-ts"],
    },
  },
  adapter: adapter({
    // mode: "standalone",
  }),
});
