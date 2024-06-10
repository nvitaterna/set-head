import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '@/test-utils/testing-library';

import { DeleteConfirmButton } from './delete-confirm-button';

describe('DeleteButton', () => {
  it('opens confirmation dialog on click', async () => {
    const user = userEvent.setup();
    const confirmMessage = faker.lorem.sentence();
    const onClick = vi.fn();

    render(
      <DeleteConfirmButton onClick={onClick} confirmMessage={confirmMessage} />,
    );

    await user.click(screen.getByRole('button'));

    await waitFor(() => {
      expect(screen.getByText(confirmMessage)).toBeInTheDocument();
    });
  });

  it('calls onClick when the delete button is clicked', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<DeleteConfirmButton onClick={onClick} confirmMessage="" />);

    await user.click(screen.getByRole('button'));

    const deleteButton = await waitFor(() => {
      return screen.getByText('Delete');
    });

    await user.click(deleteButton);

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should close the confirmation dialog when delete button is clicked', async () => {
    const user = userEvent.setup();
    const confirmMessage = faker.lorem.sentence();
    const onClick = vi.fn();

    render(
      <DeleteConfirmButton onClick={onClick} confirmMessage={confirmMessage} />,
    );

    await user.click(screen.getByRole('button'));

    const deleteButton = await waitFor(() => {
      return screen.getByText('Delete');
    });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(screen.queryByText(confirmMessage)).not.toBeInTheDocument();
    });
  });

  it('should close the confirmation dialog when cancel button is clicked', async () => {
    const user = userEvent.setup();
    const confirmMessage = faker.lorem.sentence();
    const onClick = vi.fn();

    render(
      <DeleteConfirmButton onClick={onClick} confirmMessage={confirmMessage} />,
    );

    await user.click(screen.getByRole('button'));

    const cancelButton = await waitFor(() => {
      return screen.getByText('Cancel');
    });

    await user.click(cancelButton);

    await waitFor(() => {
      expect(screen.queryByText(confirmMessage)).not.toBeInTheDocument();
    });
  });
});
