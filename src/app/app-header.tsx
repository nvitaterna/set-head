import { Button, Flex, useMantineTheme } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { FC, PropsWithChildren } from 'react';

import { useProfileContext } from '@/profile/profile-context/profile-context';
import { SetheadLogo } from '@/sethead-logo/sethead-logo';

export const AppHeader: FC<PropsWithChildren> = () => {
  const theme = useMantineTheme();
  const { profiles, updateProfiles, createProfile } = useProfileContext();

  const onClickToggleAll = async (active: boolean) => {
    await updateProfiles(profiles.map((profile) => ({ ...profile, active })));
  };

  return (
    <Flex
      role="toolbar"
      direction="row"
      justify="flex-start"
      align="center"
      w="100%"
      gap="md"
      p="xs"
      style={{
        borderBottom: `1px solid ${theme.colors.dark[4]}`,
      }}>
      <SetheadLogo fit="contain" h={26} />
      <Button
        style={{
          flexGrow: 1,
        }}
        size="compact-sm"
        onClick={createProfile}
        rightSection={<IconPlus />}>
        Create Profile
      </Button>
      <Button
        style={{
          flexGrow: 1,
        }}
        size="compact-sm"
        onClick={() => onClickToggleAll(true)}
        variant="light"
        color="green"
        disabled={profiles.length === 0}>
        Enable All Profiles
      </Button>
      <Button
        style={{
          flexGrow: 1,
        }}
        size="compact-sm"
        onClick={() => onClickToggleAll(false)}
        variant="light"
        color="red"
        disabled={profiles.length === 0}>
        Disable All Profiles
      </Button>
    </Flex>
  );
};
