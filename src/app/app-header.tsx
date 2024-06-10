import { Flex, useMantineTheme } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

import { SetheadLogo } from '@/sethead-logo/sethead-logo';

export const AppHeader: FC<PropsWithChildren> = ({ children }) => {
  const theme = useMantineTheme();
  return (
    <Flex
      role="toolbar"
      direction="row"
      h={60}
      justify="flex-start"
      align="center"
      w="100%"
      gap="md"
      p="xs"
      style={{
        borderBottom: `1px solid ${theme.colors.dark[4]}`,
      }}>
      <SetheadLogo fit="contain" mah="100%" />
      {children}
    </Flex>
  );
};
