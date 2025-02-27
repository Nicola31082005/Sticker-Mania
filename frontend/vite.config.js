import { defineConfig } from "vite";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  root: path.resolve(__dirname, "."),
  server: {
    port: 3000,
  },

  plugins: [tailwindcss()],
});
