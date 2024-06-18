import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `
          @import "./src/styles/_variables.scss";
        `,
            },
        },
    },
    server: {
        proxy: {
            '/api': 'http://127.0.0.1:8000',
        },
    },
});
