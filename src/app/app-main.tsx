import { Box } from '@mantine/core';
import { FC, PropsWithChildren } from 'react';

export const AppMain: FC<PropsWithChildren> = ({ children }) => {
  return <Box w="100%">{children}</Box>;
};
