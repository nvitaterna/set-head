import { ActionIcon, Flex } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';

import { ProfileContext } from '@/profile/profile-context/profile-context';
import { ProfileNav } from '@/profile/profile-nav/profile-nav';
import { ProfilePage } from '@/profile/profile-page/profile-page';
import { ProfileTitle } from '@/profile/profile-title/profile-title';
import { useProfileStorage } from '@/profile/use-profile-storage';

import { AppFooter } from './app-footer';
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
    setSelectedProfileId,
    selectedProfileId,
  } = useProfileStorage();

  return (
    <ProfileContext.Provider
      value={{
        profiles,
        isLoading,
        createProfile,
        updateProfile,
        deleteProfile,
        updateProfiles,
        setSelectedProfileId,
        selectedProfileId,
      }}>
      <Flex
        direction="column"
        style={{
          width: 720,
          height: 480,
        }}>
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

        <AppFooter>
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
        </AppFooter>
      </Flex>
    </ProfileContext.Provider>
  );
};
