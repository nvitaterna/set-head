import { HEADER_STORAGE_KEY } from '@/header/header-storage';

export const PROFILE_STORAGE_KEY = 'profiles';

export interface ProfileData {
  id: string;
  name: string;
  active: boolean;
  color: string;
}

export const getProfilePrefix = (profileId: string) => `${profileId}_`;

export const getProfileStorageKeys = (profileId: string) => {
  return [`${getProfilePrefix(profileId)}${HEADER_STORAGE_KEY}`];
};
