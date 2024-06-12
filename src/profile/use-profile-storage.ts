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

  const selectedProfileId = profiles.find((p) => p.selected)?.id || null;

  if (
    !selectedProfileId &&
    !profiles.find((p) => p.id === selectedProfileId) &&
    profiles.length > 0
  ) {
    profiles[0].selected = true;
  }

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
      selected: true,
    };

    // set selected to false for all other profiles
    const existingProfiles = [...profiles].map((p) => {
      return { ...p, selected: false };
    });

    await setProfiles([...existingProfiles, { ...profile, id, color }]);
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

      const existingProfiles = [...profiles].filter((p) => p.id !== profileId);

      const selectedProfile = existingProfiles.find((p) => p.selected);

      if (!selectedProfile && existingProfiles.length > 0) {
        existingProfiles[0].selected = true;
      }

      await setProfiles(existingProfiles);
    } catch (error) {
      console.error('Error deleting profile', error);
    }
  };

  const setSelectedProfileId = async (profileId: string | null) => {
    await setProfiles(
      [...profiles].map((p) => {
        if (p.id === profileId) {
          return { ...p, selected: true };
        }
        return { ...p, selected: false };
      }),
    );
  };

  return {
    profiles,
    updateProfile,
    createProfile,
    deleteProfile,
    updateProfiles: setProfiles,
    setSelectedProfileId,
    selectedProfileId,
    isLoading,
  };
};
