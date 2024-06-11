import { ActionIcon, Menu } from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { FC } from 'react';

interface CreateButtonProps {
  onClick: () => void;
}

export const CreateButton: FC<CreateButtonProps> = ({ onClick }) => {
  return (
    <Menu trigger="hover" width={120} position="left-start">
      <Menu.Target>
        <ActionIcon size="md" onClick={onClick} aria-label="Create">
          <IconPlus />
        </ActionIcon>
      </Menu.Target>
      {/* <Menu.Dropdown>
        <Menu.Item p="0.25rem" onClick={onClick}>
          Header
        </Menu.Item>
      </Menu.Dropdown> */}
    </Menu>
  );
};
