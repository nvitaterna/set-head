import { ActionIcon, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { useEffect, useState } from 'react';

import { ProfileContext } from '@/profile/profile-context/profile-context';
import { ProfileNav } from '@/profile/profile-nav/profile-nav';
import { ProfilePage } from '@/profile/profile-page/profile-page';
import { ProfileTitle } from '@/profile/profile-title/profile-title';
import { useProfileStorage } from '@/profile/use-profile-storage';

import { AppHeader } from './app-header';
import { AppMain } from './app-main';
import { AppSidebar } from './app-sidebar';
import { WelcomePage } from './welcome-page';

export const App = () => {
  const {
    profiles,
    isLoading,
    createProfile,
    updateProfile,
    deleteProfile,
    updateProfiles,
  } = useProfileStorage();

  const [selectedProfileId, setSelectedProfileId] = useState<string | null>(
    profiles?.[0]?.id || null,
  );

  useEffect(() => {
    if (
      profiles?.length &&
      (!selectedProfileId || !profiles.find((p) => p.id === selectedProfileId))
    ) {
      setSelectedProfileId(profiles[0].id);
    } else if (!profiles.length) {
      setSelectedProfileId(null);
    }
  }, [profiles]);

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        isLoading,
        createProfile,
        updateProfile,
        deleteProfile,
        updateProfiles,
      }}>
      <Flex
        direction="column"
        style={{
          width: 720,
          height: 480,
        }}>
        <AppHeader>
          <ActionIcon
            variant="subtle"
            onClick={createProfile}
            aria-label="Add profile"
            size="lg">
            <IconPlus />
          </ActionIcon>
          {selectedProfileId ? (
            <ProfileTitle
              selectedProfileId={selectedProfileId}
              setSelectedProfileId={setSelectedProfileId}
            />
          ) : null}
        </AppHeader>
        <Flex direction="row" h="100%" style={{ overflow: 'hidden' }}>
          <AppSidebar>
            {profiles?.length && selectedProfileId ? (
              <ProfileNav
                selectedProfileId={selectedProfileId}
                onClickProfile={setSelectedProfileId}
              />
            ) : null}
          </AppSidebar>
          <AppMain>
            {isLoading ? null : selectedProfileId ? (
              <ProfilePage
                selectedProfileId={selectedProfileId}
                setSelectedProfileId={setSelectedProfileId}
              />
            ) : (
              <WelcomePage />
            )}
          </AppMain>
        </Flex>
      </Flex>
    </ProfileContext.Provider>
  );
};
