import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        journal: resolve(__dirname, "journal/index.html"),
        professions: resolve(__dirname, "professions/index.html"),
        journey: resolve(__dirname, "journey/index.html"),
      },
    },
  },
});
