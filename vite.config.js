import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const port = Number(process.env.PORT) || 5000;

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: { host: "0.0.0.0", port, strictPort: true, allowedHosts: true },
  preview: { host: "0.0.0.0", port, strictPort: true, allowedHosts: true },
});
