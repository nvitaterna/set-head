import { vi } from 'vitest';

export const suppressConsoleError = (cb: () => void) => {
  vi.spyOn(console, 'error');
  vi.mocked(console.error).mockImplementation(() => {});
  cb();
  vi.mocked(console.error).mockRestore();
};
