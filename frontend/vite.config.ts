import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Все запросы, начинающиеся с /api, будут перенаправляться
      '/api': {
        target: 'http://localhost:3000', // Адрес вашего бэкенда
        changeOrigin: true,
        // ХАК: Отрезаем /api из URL перед отправкой на бэкенд
        rewrite: (path) => path.replace(/^\/api/, '') 
      }
    }
  }
});