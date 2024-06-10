import { Card, Text, Title } from '@mantine/core';
import { FC } from 'react';

interface WelcomePageProps {}

export const WelcomePage: FC<WelcomePageProps> = () => {
  return (
    <Card shadow="xs" p="md" h="100">
      <Title order={2}>Welcome to Sethead!</Title>
      <Text>
        You can create a new profile by clicking on the plus icon in the title
        bar.
      </Text>
    </Card>
  );
};
