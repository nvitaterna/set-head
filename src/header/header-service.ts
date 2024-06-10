import { getProfilePrefix } from '@/profile/profile-storage';
import { StorageAdapter } from '@/storage/storage-adapter';

import { HeaderRepository } from './header-repository';
import { HEADER_STORAGE_KEY } from './header-storage';

export class HeaderService {
  constructor(
    private headerRepository: HeaderRepository,
    private storage: StorageAdapter,
  ) {}

  async getActiveHeadersForProfile(profileId: string) {
    const headers =
      (await this.headerRepository.getHeadersForProfile(profileId)) || [];

    return headers.filter((header) => header.active && header.name);
  }

  async onProfileHeadersChanged(profileId: string, callback: () => void) {
    this.storage.watch(
      `${getProfilePrefix(profileId)}${HEADER_STORAGE_KEY}`,
      callback,
    );
  }

  async offProfileHeadersChanged(profileId: string, callback: () => void) {
    this.storage.unwatch(
      `${getProfilePrefix(profileId)}${HEADER_STORAGE_KEY}`,
      callback,
    );
  }
}
