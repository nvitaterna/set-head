import { Card, Flex, Switch, TextInput, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

import { CreateButton } from '@/create-button/create-button';
import { DeleteConfirmButton } from '@/delete-confirm-button/delete-confirm-button';
import { useHeaderContext } from '@/header/header-context/header-context';
import { PopupColorPicker } from '@/popup-color-picker/popup-color-picker';

import { useProfileContext } from '../profile-context/profile-context';

interface ProfileTitleProps {
  selectedProfileId: string;
  setSelectedProfileId: (id: string | null) => void;
}

export const ProfileTitle: FC<ProfileTitleProps> = ({
  selectedProfileId,
  setSelectedProfileId,
}) => {
  const theme = useMantineTheme();
  const { profiles, updateProfile, deleteProfile } = useProfileContext();
  const { createHeader } = useHeaderContext();

  const profile = profiles.find((p) => p.id === selectedProfileId);

  if (!profile) {
    return null;
  }

  const onClickDelete = async () => {
    const firstProfile = profiles.find((p) => p.id !== profile.id);
    setSelectedProfileId(firstProfile?.id || null);
    await deleteProfile(profile.id);
  };

  return (
    <Card p="xs" color={'red'} radius={0}>
      <Flex
        style={{
          flexGrow: 1,
        }}
        h="100%"
        direction="row"
        align="center"
        gap="xs">
        <CreateButton onClick={() => createHeader()} />

        <Switch
          color={theme.colors.green[6]}
          checked={profile.active}
          onChange={(event) => {
            updateProfile({
              ...profile,
              active: event.currentTarget.checked,
            });
          }}
        />

        <TextInput
          variant="underline"
          style={{ flexGrow: 1 }}
          value={profile.name || ''}
          onChange={(event) => {
            updateProfile({
              ...profile,
              name: event.currentTarget.value,
            });
          }}
        />

        <PopupColorPicker
          value={profile.color || ''}
          onChange={(value) => {
            updateProfile({
              ...profile,
              color: value,
            });
          }}
        />
        <DeleteConfirmButton
          confirmMessage={`Are you sure you want to delete "${profile.name}"?`}
          onClick={onClickDelete}
        />
      </Flex>
    </Card>
  );
};
