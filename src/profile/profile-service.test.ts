import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { StorageAdapter } from '@/storage/storage-adapter';
import { mockProfiles } from '@/test-utils/mock-profile';
import { MockStorageAdapter } from '@/test-utils/mock-storage-adapter';

import { ProfileRepository } from './profile-repository';
import { ProfileService } from './profile-service';

describe('ProfileService', () => {
  let storage: StorageAdapter;
  let profileRepository: ProfileRepository;

  beforeEach(() => {
    storage = vi.mocked(new MockStorageAdapter());
    profileRepository = new ProfileRepository(storage);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should get all profiles', async () => {
    const mockedProfiles = mockProfiles(3);

    const profileService = new ProfileService(profileRepository, storage);

    vi.spyOn(profileRepository, 'getAllProfiles').mockResolvedValue(
      mockedProfiles,
    );

    const profiles = await profileService.getAllProfiles();

    expect(profiles).toEqual(mockedProfiles);
  });

  it('should get active profiles', async () => {
    const mockedProfiles = mockProfiles(1, { active: true });
    const profileService = new ProfileService(profileRepository, storage);

    vi.spyOn(profileRepository, 'getActiveProfiles').mockResolvedValue(
      mockedProfiles,
    );

    const profiles = await profileService.getActiveProfiles();

    expect(profiles).toEqual(mockedProfiles);
  });

  it('should watch for any profile changes', async () => {
    const callback = vi.fn();

    const profileRepository = new ProfileRepository(storage);
    const profileService = new ProfileService(profileRepository, storage);

    profileService.onAnyProfileChanged(callback);

    expect(storage.watch).toHaveBeenCalledWith('profiles', callback);
  });

  it('should unwatch for any profile changes', async () => {
    const callback = vi.fn();

    const profileRepository = new ProfileRepository(storage);
    const profileService = new ProfileService(profileRepository, storage);
    profileService.offAnyProfileChanged(callback);

    expect(storage.unwatch).toHaveBeenCalledWith('profiles', callback);
  });
});
