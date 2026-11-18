import { defineConfig } from 'vite';
import { resolve } from 'node:path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'index.html'),
        services: resolve(__dirname, 'services.html'),
        process: resolve(__dirname, 'process.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
});
