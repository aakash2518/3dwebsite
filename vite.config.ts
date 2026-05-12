import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";

export default defineConfig({
  plugins: [
    tanstackStart(),
    tailwindcss(),
    tsconfigPaths(),
  ],
  tanstackStart: {
    server: { entry: "src/server.ts" },
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
