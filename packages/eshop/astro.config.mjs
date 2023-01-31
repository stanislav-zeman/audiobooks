import { defineConfig } from "astro/config";
import adapter from "@astrojs/vercel/serverless";

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
    optimizeDeps: {
      include: ["grpc-ts"],
    },
    build: {
      commonjsOptions: {
        exclude: ["grpc-ts"],
        include: [],
      },
      rollupOptions: {
        output: {
          entryFileNames: "entry.[hash].js",
          chunkFileNames: "chunks/chunk.[hash].js",
        },
      },
    },
  },
  adapter: adapter({
    // mode: "standalone",
  }),
});
