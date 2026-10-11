import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base './' + HashRouter => the built site works on GitHub Pages, Netlify or any static host
export default defineConfig({
  base: './',
  plugins: [react()],
  build: { chunkSizeWarningLimit: 900 },
});
