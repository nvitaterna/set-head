import { StorageAdapter } from '@/storage/storage-adapter';

import { PROFILE_STORAGE_KEY, ProfileData } from './profile-storage';

export class ProfileRepository {
  constructor(private storage: StorageAdapter) {}

  async getAllProfiles() {
    return (await this.storage.get<ProfileData[]>(PROFILE_STORAGE_KEY)) || [];
  }

  async getActiveProfiles() {
    const profiles = await this.getAllProfiles();

    return profiles.filter((profile) => profile.active);
  }
}
