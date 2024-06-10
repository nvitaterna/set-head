import { getProfilePrefix } from '@/profile/profile-storage';
import { StorageAdapter } from '@/storage/storage-adapter';

import { HEADER_STORAGE_KEY, HeaderData } from './header-storage';

export class HeaderRepository {
  constructor(private storage: StorageAdapter) {}

  async getHeadersForProfile(profileId: string) {
    const headers = await this.storage.get<HeaderData[]>(
      `${getProfilePrefix(profileId)}${HEADER_STORAGE_KEY}`,
    );

    return headers;
  }
}
