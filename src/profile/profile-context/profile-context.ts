import { createContext, useContext } from 'react';

import { useProfileStorage } from '../use-profile-storage';

export type ProfileContextType = ReturnType<typeof useProfileStorage>;

export const ProfileContext = createContext<ProfileContextType | null>(null);

export const useProfileContext = () => {
  const profileContext = useContext(ProfileContext);

  if (!profileContext) {
    throw new Error('useProfileContext must be used within a ProfileProvider');
  }

  return profileContext;
};
