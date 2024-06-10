import { vi } from 'vitest';

import { StorageAdapter } from '@/storage/storage-adapter';

export class MockStorageAdapter extends StorageAdapter {
  get = vi.fn().mockResolvedValue(null);
  set = vi.fn().mockResolvedValue(null);
  getAll = vi.fn().mockResolvedValue({});
  remove = vi.fn().mockResolvedValue(null);
  watch = vi.fn();
  unwatch = vi.fn();
}
