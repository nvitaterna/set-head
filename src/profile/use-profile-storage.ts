import { DEFAULT_THEME } from '@mantine/core';
import short from 'short-uuid';

import { BrowserStorage } from '@/storage/browser-storage';
import { useStorage } from '@/storage/use-storage';

import {
  getProfilePrefix,
  PROFILE_STORAGE_KEY,
  ProfileData,
} from './profile-storage';

const storage = new BrowserStorage('local');

export const useProfileStorage = () => {
  const [rawProfiles, setProfiles, { isLoading }] = useStorage<ProfileData[]>({
    key: PROFILE_STORAGE_KEY,
    instance: storage,
  });

  const profiles = rawProfiles ? rawProfiles : [];

  const updateProfile = async (profile: ProfileData) => {
    await setProfiles(
      [...profiles].map((p) => {
        if (p.id === profile.id) {
          return profile;
        }
        return p;
      }),
    );
  };

  const createProfile = async () => {
    const id = short.generate();
    const color = DEFAULT_THEME.colors.blue[6];
    const profile = {
      id,
      name: 'New Profile',
      active: true,
      color,
    };
    await setProfiles([...profiles, { ...profile, id, color }]);
  };

  const deleteProfile = async (profileId: string) => {
    try {
      // delete all storage keys associated with this profile
      const allStorage = await storage.getAll();
      const allStorageKeys = Object.keys(allStorage);

      const keysToDelete = allStorageKeys.filter((key) =>
        key.startsWith(getProfilePrefix(profileId)),
      );

      for (const key of keysToDelete) {
        await storage.remove(key);
      }
      await setProfiles([...profiles].filter((p) => p.id !== profileId));
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  };

  return {
    profiles,
    updateProfile,
    createProfile,
    deleteProfile,
    updateProfiles: setProfiles,
    isLoading,
  };
};
