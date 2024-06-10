import { Card, Text } from '@mantine/core';
import { FC } from 'react';

import { CreateButton } from '@/create-button/create-button';
import { HeaderContext } from '@/header/header-context/header-context';
import { HeaderList } from '@/header/header-list/header-list';
import { useHeaderStorage } from '@/header/use-header-storage';

import { useProfileContext } from '../profile-context/profile-context';

interface ProfilePageProps {
  selectedProfileId: string;
}

export const ProfilePage: FC<ProfilePageProps> = ({ selectedProfileId }) => {
  const { profiles } = useProfileContext();

  const profile = profiles.find((p) => p.id === selectedProfileId);

  if (!profile) {
    throw new Error(`Profile with id ${selectedProfileId} not found`);
  }

  const {
    headers,
    createHeader,
    updateHeaderRenderValue,
    updateHeaderStoreValue,
    setStoreValue,
    deleteHeader,
    isLoading,
  } = useHeaderStorage(profile.id);

  return (
    <HeaderContext.Provider
      value={{
        headers,
        createHeader,
        updateHeaderRenderValue,
        updateHeaderStoreValue,
        setStoreValue,
        deleteHeader,
        isLoading,
      }}>
      {headers?.length ? (
        <HeaderList />
      ) : (
        <Card styles={{}} shadow="xs" p="md" h="100">
          <Text>
            You can modify requests and responses by clicking on the plus button
            in the bottom right corner.
          </Text>
        </Card>
      )}
      <CreateButton onClick={createHeader} />
    </HeaderContext.Provider>
  );
};
