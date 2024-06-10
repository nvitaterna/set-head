import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageAdapter } from '@/storage/storage-adapter';
import { mockProfiles } from '@/test-utils/mock-profile';
import { MockStorageAdapter } from '@/test-utils/mock-storage-adapter';

import { ProfileRepository } from './profile-repository';

describe('ProfileRepository', () => {
  let storage: StorageAdapter;

  beforeEach(() => {
    storage = vi.mocked(new MockStorageAdapter());
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should get all profiles', async () => {
    const mockedProfiles = mockProfiles(3);

    const profileRepository = new ProfileRepository(storage);

    vi.mocked(storage.get).mockResolvedValue(mockedProfiles);

    const profiles = await profileRepository.getAllProfiles();

    expect(profiles).toEqual(mockedProfiles);
  });

  it('should get active profiles', async () => {
    const mockedProfiles = mockProfiles(3, { active: false });
    const mockedActiveProfiles = mockProfiles(3, { active: true });
    mockedProfiles.push(...mockedActiveProfiles);

    const profileRepository = new ProfileRepository(storage);

    vi.mocked(storage.get).mockResolvedValue(mockedProfiles);

    const profiles = await profileRepository.getActiveProfiles();

    expect(profiles).toEqual(mockedActiveProfiles);
  });
});
