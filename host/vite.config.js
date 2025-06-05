import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// const isDev = process.env.NODE_ENV === "development";
const isDev = false;

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "host",
      remotes: {
        remote: isDev
          ? "http://localhost:4173/frontend/remote/assets/remoteEntry.js"
          : "https://autogestion2.atlantida.edu.ar/frontend/remote/assets/remoteEntry.js",
        noticias: isDev
          ? "http://localhost:4173/frontend/noticias/assets/remoteEntry.js"
          : "https://autogestion2.atlantida.edu.ar/frontend/noticias/assets/remoteEntry.js",
      },
      shared: ["vue", "vue-router", "pinia"],
    }),
  ],
  css: {
    postcss: {
      plugins: [
        tailwindcss,
        autoprefixer,
      ],
    },
  },
  server: {
    port: 5000,
    cors: true,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        minifyInternalExports: false,
      },
    },
  },
});
