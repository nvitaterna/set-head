import { ActionIcon, Affix, Menu } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { FC } from 'react';

interface CreateButtonProps {
  onClick: () => void;
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <Menu trigger="hover" width={120} position="left-end">
      <Affix bottom={18} right={20}>
        <Menu.Target>
          <ActionIcon size="lg" onClick={onClick} aria-label="Create">
            <IconPlus />
          </ActionIcon>
        </Menu.Target>
      </Affix>
      {/* <Menu.Dropdown>
        <Menu.Item onClick={createHeader}>Header</Menu.Item>
      </Menu.Dropdown> */}
    </Menu>
  );
};
