import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Em dev, /api/* vai para o uvicorn local: `uvicorn api.index:app --port 8000`
export default defineConfig({
  plugins: [react()],
  server: { fs: { allow: [".."] }, proxy: { "/api": "http://127.0.0.1:8000" } },
});
