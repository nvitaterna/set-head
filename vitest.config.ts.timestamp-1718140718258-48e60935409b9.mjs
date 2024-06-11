// vitest.config.ts
import path from 'node:path';
import { defineConfig } from 'file:///home/nico/dev/set-head/node_modules/.pnpm/vitest@1.6.0_@types+node@20.14.2_jsdom@24.1.0_sass@1.77.4_sugarss@4.0.1_postcss@8.4.38_/node_modules/vitest/dist/config.js';
import { WxtVitest } from 'file:///home/nico/dev/set-head/node_modules/.pnpm/wxt@0.18.4_@types+node@20.14.2_rollup@4.18.0_sass@1.77.4_sugarss@4.0.1_postcss@8.4.38_/node_modules/wxt/dist/testing.js';

var __vite_injected_original_dirname = '/home/nico/dev/set-head';
var vitest_config_default = defineConfig({
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
      '@': path.resolve(__vite_injected_original_dirname, './src'),
    },
  },
});
export { vitest_config_default as default };
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZXN0LmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL25pY28vZGV2L3NldC1oZWFkXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9uaWNvL2Rldi9zZXQtaGVhZC92aXRlc3QuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL25pY28vZGV2L3NldC1oZWFkL3ZpdGVzdC5jb25maWcudHNcIjtpbXBvcnQgcGF0aCBmcm9tICdub2RlOnBhdGgnO1xuaW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZXN0L2NvbmZpZyc7XG5pbXBvcnQgeyBXeHRWaXRlc3QgfSBmcm9tICd3eHQvdGVzdGluZyc7XG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHRlc3Q6IHtcbiAgICBtb2NrUmVzZXQ6IHRydWUsXG4gICAgcmVzdG9yZU1vY2tzOiB0cnVlLFxuICAgIHNldHVwRmlsZXM6IFsnLi9zcmMvdGVzdC11dGlscy92aXRlc3Qtc2V0dXAudHMnXSxcbiAgICBjb3ZlcmFnZToge1xuICAgICAgcHJvdmlkZXI6ICd2OCcsXG4gICAgICByZXBvcnRPbkZhaWx1cmU6IHRydWUsXG4gICAgICBpbmNsdWRlOiBbJyoqL3NyYy8qKiddLFxuICAgICAgZXhjbHVkZTogWycqKi9ub2RlX21vZHVsZXMvKionLCAnKiovdGVzdC11dGlscy8qKiddLFxuICAgIH0sXG4gICAgZ2xvYmFsczogdHJ1ZSxcbiAgICBlbnZpcm9ubWVudDogJ2pzZG9tJyxcbiAgfSxcbiAgcGx1Z2luczogW1d4dFZpdGVzdCgpXSxcbiAgcmVzb2x2ZToge1xuICAgIGFsaWFzOiB7XG4gICAgICAnQCc6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICcuL3NyYycpLFxuICAgIH0sXG4gIH0sXG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlAsT0FBTyxVQUFVO0FBQzVRLFNBQVMsb0JBQW9CO0FBQzdCLFNBQVMsaUJBQWlCO0FBRjFCLElBQU0sbUNBQW1DO0FBSXpDLElBQU8sd0JBQVEsYUFBYTtBQUFBLEVBQzFCLE1BQU07QUFBQSxJQUNKLFdBQVc7QUFBQSxJQUNYLGNBQWM7QUFBQSxJQUNkLFlBQVksQ0FBQyxrQ0FBa0M7QUFBQSxJQUMvQyxVQUFVO0FBQUEsTUFDUixVQUFVO0FBQUEsTUFDVixpQkFBaUI7QUFBQSxNQUNqQixTQUFTLENBQUMsV0FBVztBQUFBLE1BQ3JCLFNBQVMsQ0FBQyxzQkFBc0Isa0JBQWtCO0FBQUEsSUFDcEQ7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNULGFBQWE7QUFBQSxFQUNmO0FBQUEsRUFDQSxTQUFTLENBQUMsVUFBVSxDQUFDO0FBQUEsRUFDckIsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxLQUFLLFFBQVEsa0NBQVcsT0FBTztBQUFBLElBQ3RDO0FBQUEsRUFDRjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
