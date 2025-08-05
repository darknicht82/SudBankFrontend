import { defineConfig } from 'vite';

export default defineConfig({
  optimizeDeps: {
    include: ['rxjs'],
    exclude: ['rxjs/dist/cjs']
  },
  resolve: {
    alias: {
      'rxjs': 'rxjs/dist/esm/index.js'
    }
  },
  ssr: {
    noExternal: ['rxjs']
  },
  server: {
    port: 4200,
    proxy: {
      '/api': {
        target: 'http://localhost:8085',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
