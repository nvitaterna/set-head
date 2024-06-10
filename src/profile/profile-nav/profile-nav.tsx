import { Flex } from '@mantine/core';
import { FC } from 'react';

import { useProfileContext } from '../profile-context/profile-context';
import { ProfileIcon } from '../profile-icon/profile-icon';

export interface ProfileNavProps {
  selectedProfileId: string;
  onClickProfile: (profileId: string) => void;
}

export const ProfileNav: FC<ProfileNavProps> = ({
  selectedProfileId,
  onClickProfile,
}) => {
  const { profiles } = useProfileContext();
  return (
    <Flex
      p="sm"
      justify="flex-start"
      direction="column"
      align="center"
      gap="sm">
      {profiles.map((profile) => {
        return (
          <ProfileIcon
            key={profile.id}
            profile={profile}
            onClick={() => onClickProfile(profile.id)}
            selected={profile.id === selectedProfileId}
          />
        );
      })}
    </Flex>
  );
};
