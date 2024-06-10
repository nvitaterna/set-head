import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageAdapter } from '@/storage/storage-adapter';
import { mockHeaders } from '@/test-utils/mock-header';
import { mockProfile } from '@/test-utils/mock-profile';
import { MockStorageAdapter } from '@/test-utils/mock-storage-adapter';

import { HeaderRepository } from './header-repository';

describe('HeaderRepository', () => {
  let storage: StorageAdapter;

  beforeEach(() => {
    storage = vi.mocked(new MockStorageAdapter());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });
  ``;
  it('should get headers for the given profile', async () => {
    const { id: mockedProfileId } = mockProfile();
    const mockedHeaders = mockHeaders(3);

    const headerRepository = new HeaderRepository(storage);

    vi.mocked(storage.get).mockResolvedValue(mockedHeaders);

    const headers =
      await headerRepository.getHeadersForProfile(mockedProfileId);

    expect(headers).toEqual(mockedHeaders);
    expect(storage.get).toHaveBeenCalledWith(`${mockedProfileId}_headers`);
  });
});
