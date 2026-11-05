import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { viteSingleFile } from "vite-plugin-singlefile";

// `npm run build`        -> build padrão (dist/) para hospedagem (Vercel, Netlify, Hostinger...)
// `npm run build:single` -> um único index.html com tudo embutido (útil para preview/envio ao cliente)
export default defineConfig(({ mode }) => ({
  plugins: [react(), ...(mode === "single" ? [viteSingleFile()] : [])],
  build: { outDir: mode === "single" ? "dist-single" : "dist" },
}));
