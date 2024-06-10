import { ColorSchemeScript, MantineProvider } from '@mantine/core';
import type { FC, PropsWithChildren } from 'react';

import { theme } from '@/theme/theme';

export const Providers: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ColorSchemeScript defaultColorScheme="auto" />
      <MantineProvider theme={theme} defaultColorScheme="auto">
        {children}
      </MantineProvider>
    </>
  );
};
