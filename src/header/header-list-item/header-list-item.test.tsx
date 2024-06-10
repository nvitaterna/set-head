import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockHeader } from '@/test-utils/mock-header';
import { renderWithHeaderContext } from '@/test-utils/render-with-header-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { HeaderListItem } from './header-list-item';

describe('HeaderListItem', () => {
  it('renders header name and value', async () => {
    const header = mockHeader();

    renderWithHeaderContext(<HeaderListItem header={header} />, '1');

    await waitFor(() => {
      expect(screen.getByDisplayValue(header.name)).toBeInTheDocument();
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
    });
  });

  it('updates header name', async () => {
    const user = userEvent.setup();
    const header = mockHeader();
    const updateHeaderRenderValue = vi.fn();

    renderWithHeaderContext(<HeaderListItem header={header} />, '1', {
      updateHeaderRenderValue,
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue(header.name)).toBeInTheDocument();
    });

    const newName = faker.lorem.word();

    await user.type(screen.getByDisplayValue(header.name), newName);

    await waitFor(() => {
      expect(updateHeaderRenderValue).toHaveBeenCalled();
    });
  });

  it('updates header render value', async () => {
    const user = userEvent.setup();
    const header = mockHeader();
    const updateHeaderRenderValue = vi.fn();

    renderWithHeaderContext(<HeaderListItem header={header} />, '1', {
      updateHeaderRenderValue,
    });

    await waitFor(() => {
      expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
    });

    const newValue = faker.lorem.word();

    await user.type(screen.getByDisplayValue(header.value), newValue);

    await waitFor(() => {
      expect(updateHeaderRenderValue).toHaveBeenCalled();
    });
  });

  it('updates incoming/outgoing header', async () => {
    const user = userEvent.setup();
    const header = mockHeader();
    const updateHeaderStoreValue = vi.fn();

    renderWithHeaderContext(<HeaderListItem header={header} />, '1', {
      updateHeaderStoreValue,
    });

    const toggle = screen.getByRole('button', {
      name: 'Outgoing toggle',
    });

    await user.click(toggle);

    await waitFor(() => {
      expect(updateHeaderStoreValue).toHaveBeenCalled();
    });
  });

  it('deletes header', async () => {
    const user = userEvent.setup();
    const header = mockHeader();
    const deleteHeader = vi.fn();

    renderWithHeaderContext(<HeaderListItem header={header} />, '1', {
      deleteHeader,
    });

    const deleteButton = screen.getByRole('button', {
      name: 'Delete header',
    });

    await user.click(deleteButton);

    await waitFor(() => {
      expect(deleteHeader).toHaveBeenCalled();
    });
  });
});
