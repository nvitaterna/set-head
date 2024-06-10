import { ScrollArea } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const AppMain: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ScrollArea scrollbarSize="0.5rem" p="sm" h="100%" w="100%">
      {children}
    </ScrollArea>
  );
};
