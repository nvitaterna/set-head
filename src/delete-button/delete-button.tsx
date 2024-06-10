import { ActionIcon } from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { FC } from 'react';

export interface DeleteButtonProps {
  onClick: () => void;
}

export const DeleteButton: FC<DeleteButtonProps> = ({ onClick }) => {
  return (
    <ActionIcon
      aria-label="Delete"
      variant="subtle"
      color="red"
      onClick={onClick}>
      <IconX />
    </ActionIcon>
  );
};
