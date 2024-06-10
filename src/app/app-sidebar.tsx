import { ScrollArea, useMantineTheme } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const AppSidebar: FC<PropsWithChildren> = ({ children }) => {
  const theme = useMantineTheme();
  return (
    <ScrollArea
      role="navigation"
      scrollbarSize="0.5rem"
      style={{
        height: '100%',
        borderRight: `1px solid ${theme.colors.dark[4]}`,
        minWidth: 60,
      }}>
      {children}
    </ScrollArea>
  );
};
