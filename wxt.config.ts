import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'wxt';

// See https://wxt.dev/api/config.html
export default defineConfig({
  vite: () => ({
    plugins: [react()],
  }),
  srcDir: 'src',
  manifest: {
    name: 'SetHead',
    host_permissions: ['https://*/*'],
    permissions: ['declarativeNetRequest', 'storage'],
  },
});
