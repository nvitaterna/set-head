import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageAdapter } from '@/storage/storage-adapter';
import { mockHeaders } from '@/test-utils/mock-header';
import { mockProfileId } from '@/test-utils/mock-profile';
import { MockStorageAdapter } from '@/test-utils/mock-storage-adapter';

import { HeaderRepository } from './header-repository';
import { HeaderService } from './header-service';

describe('HeaderService', () => {
  let storage: StorageAdapter;
  let headerRepository: HeaderRepository;

  beforeEach(() => {
    storage = vi.mocked(new MockStorageAdapter());
    headerRepository = new HeaderRepository(storage);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should get active headers for the given profile', async () => {
    const profileId = mockProfileId();
    const mockedHeaders = mockHeaders(3, { active: true });

    const headerService = new HeaderService(headerRepository, storage);

    vi.spyOn(headerRepository, 'getHeadersForProfile').mockResolvedValue(
      mockedHeaders,
    );

    const headers = await headerService.getActiveHeadersForProfile(profileId);

    expect(headers).toEqual(mockedHeaders);
    expect(headerRepository.getHeadersForProfile).toHaveBeenCalledWith(
      profileId,
    );
  });

  it('should watch for profile headers changes', async () => {
    const profileId = mockProfileId();

    const callback = vi.fn();

    const headerService = new HeaderService(headerRepository, storage);

    headerService.onProfileHeadersChanged(profileId, callback);

    expect(storage.watch).toHaveBeenCalledWith(
      `${profileId}_headers`,
      callback,
    );
  });

  it('should unwatch for profile headers changes', async () => {
    const profileId = mockProfileId();

    const callback = vi.fn();

    const headerService = new HeaderService(headerRepository, storage);

    headerService.offProfileHeadersChanged(profileId, callback);

    expect(storage.unwatch).toHaveBeenCalledWith(
      `${profileId}_headers`,
      callback,
    );
  });
});
