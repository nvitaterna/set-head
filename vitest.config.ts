import path from 'node:path';
import { defineConfig } from 'vitest/config';
import { WxtVitest } from 'wxt/testing';

export default defineConfig({
  test: {
    mockReset: true,
    restoreMocks: true,
    setupFiles: ['./src/test-utils/vitest-setup.ts'],
    coverage: {
      provider: 'v8',
      reportOnFailure: true,
      include: ['**/src/**'],
      exclude: ['**/node_modules/**', '**/test-utils/**'],
    },
    globals: true,
    environment: 'jsdom',
  },
  plugins: [WxtVitest()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
