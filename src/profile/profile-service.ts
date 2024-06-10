import { StorageAdapter } from '@/storage/storage-adapter';

import { ProfileRepository } from './profile-repository';
import { PROFILE_STORAGE_KEY, ProfileData } from './profile-storage';

export interface ProfilesChange {
  oldValue: ProfileData[] | null;
  newValue: ProfileData[] | null;
}

export class ProfileService {
  constructor(
    private profileRepository: ProfileRepository,
    private storage: StorageAdapter,
  ) {}

  async getAllProfiles() {
    return await this.profileRepository.getAllProfiles();
  }

  async getActiveProfiles() {
    return await this.profileRepository.getActiveProfiles();
  }

  onAnyProfileChanged(callback: (profilesChange: ProfilesChange) => void) {
    this.storage.watch(PROFILE_STORAGE_KEY, callback);
  }

  offAnyProfileChanged(callback: (profilesChange: ProfilesChange) => void) {
    this.storage.unwatch(PROFILE_STORAGE_KEY, callback);
  }
}
