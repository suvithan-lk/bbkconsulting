import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: [
      'react-router-dom',
      'framer-motion',
      'recharts',
      'date-fns',
      '@headlessui/react',
    ],
    force: true,
  },
  server: {
    port: 5173,
    host: true,
  },
});
