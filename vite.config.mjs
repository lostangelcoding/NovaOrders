import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      proxy: {
        '/api/send': {
          target: env.VITE_EMAIL_API_URL, 
          changeOrigin: true,            
          secure: false,
          rewrite: (path) => '',         
        },
      },
    },

    build: {
      rollupOptions: {
        input: {
          main: resolve(__dirname, 'index.html'),
          services: resolve(__dirname, 'services.html'),
          service: resolve(__dirname, 'service.html'),
          faq: resolve(__dirname, 'faq.html'),
          contact: resolve(__dirname, 'contact.html'),
          privacy: resolve(__dirname, 'privacy.html'),
          terms: resolve(__dirname, 'terms.html'),
        },
      },
    },
  };
});
