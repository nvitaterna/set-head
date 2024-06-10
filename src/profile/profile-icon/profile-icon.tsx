import { ActionIcon, Indicator, useMantineTheme } from '@mantine/core';
import { FC } from 'react';

import { ProfileData } from '../profile-storage';

interface ProfileIconProps {
  profile: ProfileData;
  onClick: () => void;
  selected: boolean;
}

export const ProfileIcon: FC<ProfileIconProps> = ({
  profile,
  onClick,
  selected,
}) => {
  const variant = selected ? 'filled' : 'light';
  const theme = useMantineTheme();

  return (
    <Indicator
      data-testid="profile-indicator"
      color={profile.active ? theme.colors.green[6] : theme.colors.red[6]}
      position="top-end"
      withBorder
      size={12}>
      <ActionIcon
        aria-label={`Switch to ${profile.name}`}
        autoContrast
        variant={variant}
        size="lg"
        onClick={onClick}
        color={profile.color}>
        {profile.name[0]}
      </ActionIcon>
    </Indicator>
  );
};
