import { describe, expect, it } from 'vitest';

import { mockHeaders } from '@/test-utils/mock-header';
import { renderWithHeaderContext } from '@/test-utils/render-with-header-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { HeaderList } from './header-list';

describe('HeaderList', () => {
  it('renders list of headers', async () => {
    const headers = mockHeaders(3);

    renderWithHeaderContext(<HeaderList />, '1', { headers });

    await waitFor(() => {
      headers.forEach((header) => {
        expect(screen.getByDisplayValue(header.name)).toBeInTheDocument();
        expect(screen.getByDisplayValue(header.value)).toBeInTheDocument();
      });
    });
  });
});
