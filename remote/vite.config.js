import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import federation from "@originjs/vite-plugin-federation";
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

export default defineConfig({
  plugins: [
    vue(),
    federation({
      name: "remote",
      filename: "remoteEntry.js",
      exposes: {
        "./Home": "./src/views/Home.vue",
        "./Admin": "./src/views/Admin.vue",
        "./About": "./src/views/About.vue",
        "./store": "./src/stores/sharedStore.js",
        "./eventBus": "./src/utils/eventBus.js",
        "./NotificationListener": "./src/components/NotificationListener.vue"
      },
      shared: ["vue", "vue-router", "pinia", "mitt"],
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
  base: "/frontend/remote/",
});
