import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";

const precacheManifest: Plugin = {
  name: "precache-manifest",
  generateBundle(_options, bundle) {
    const files = Object.values(bundle)
      .filter(
        (output) =>
          output.type === "chunk" && output.fileName.startsWith("assets/"),
      )
      .map((output) => output.fileName);

    this.emitFile({
      type: "asset",
      fileName: "precache-manifest.json",
      source: JSON.stringify(files),
    });
  },
};

export default defineConfig({
  plugins: [react(), precacheManifest],
  test: {
    environment: "jsdom",
    globals: true,
  },
});
