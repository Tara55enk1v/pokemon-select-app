import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { devDependencies } from "./package.json";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
})
