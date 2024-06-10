import { Button, Group, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { FC } from 'react';

import {
  DeleteButton,
  DeleteButtonProps,
} from '../delete-button/delete-button';

interface DeleteConfirmButton extends DeleteButtonProps {
  confirmMessage: string;
}

export const DeleteConfirmButton: FC<DeleteConfirmButton> = ({
  confirmMessage,
  onClick,
}) => {
  const [opened, { open, close }] = useDisclosure(false);

  const onClickDeleteButton = () => {
    close();
    onClick();
  };

  return (
    <>
      <Modal
        aria-label="Delete confirmation"
        opened={opened}
        onClose={close}
        withCloseButton={false}
        centered
        size="xs">
        <Text>{confirmMessage}</Text>
        <Group wrap="nowrap" mt="md">
          <Button
            aria-label="Cancel delete"
            onClick={close}
            color="gray"
            flex={'1 1 auto'}>
            Cancel
          </Button>
          <Button
            aria-label="Confirm delete"
            onClick={onClickDeleteButton}
            color="red">
            Delete
          </Button>
        </Group>
      </Modal>
      <DeleteButton onClick={open} />
    </>
  );
};
