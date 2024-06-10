import { Flex } from '@mantine/core';
import { FC } from 'react';

import { useHeaderContext } from '../header-context/header-context';
import { HeaderListItem } from '../header-list-item/header-list-item';

export const HeaderList: FC = () => {
  const { headers } = useHeaderContext();

  return (
    <Flex gap="xs" direction="column" role="list">
      {headers.map((header) => (
        <HeaderListItem key={header.id} header={header} />
      ))}
    </Flex>
  );
};
