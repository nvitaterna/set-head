import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useHeaderStorage } from '@/header/use-header-storage';
import { mockHeaders } from '@/test-utils/mock-header';
import { mockProfiles } from '@/test-utils/mock-profile';
import { renderWithProfileContext } from '@/test-utils/render-with-profile-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { ProfilePage } from './profile-page';

vi.mock('@/header/use-header-storage');

describe('ProfilePage', () => {
  beforeEach(() => {
    vi.mocked(useHeaderStorage).mockReturnValue({
      headers: [],
      createHeader: () => Promise.resolve(),
      updateHeaderRenderValue: () => Promise.resolve(),
      updateHeaderStoreValue: () => {},
      setStoreValue: () => Promise.resolve(),
      deleteHeader: () => Promise.resolve(),
      isLoading: false,
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('should render the instructions card if there are no headers', async () => {
    const profiles = mockProfiles(2);
    const selectedProfileId = faker.helpers.arrayElement(profiles).id;

    renderWithProfileContext(
      <ProfilePage selectedProfileId={selectedProfileId} />,
      { profiles },
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          'You can modify requests and responses by clicking on the plus button in the bottom right corner.',
        ),
      ).toBeInTheDocument();
    });
  });

  it('should render the headers list if there are headers', async () => {
    const profiles = mockProfiles(2);
    const headers = mockHeaders(3);
    const selectedProfileId = faker.helpers.arrayElement(profiles).id;

    vi.mocked(useHeaderStorage).mockReturnValue({
      headers,
      createHeader: () => Promise.resolve(),
      updateHeaderRenderValue: () => Promise.resolve(),
      updateHeaderStoreValue: () => {},
      setStoreValue: () => Promise.resolve(),
      deleteHeader: () => Promise.resolve(),
      isLoading: false,
    });

    renderWithProfileContext(
      <ProfilePage selectedProfileId={selectedProfileId} />,
      { profiles },
    );

    await waitFor(() => {
      expect(screen.getAllByRole('listitem')).toHaveLength(headers.length);
    });
  });

  it('should create a header when clicking on the create button', async () => {
    const user = userEvent.setup();
    const profiles = mockProfiles(2);
    const selectedProfileId = faker.helpers.arrayElement(profiles).id;

    const createHeader = vi.fn().mockResolvedValue(undefined);

    vi.mocked(useHeaderStorage).mockReturnValue({
      headers: [],
      createHeader: createHeader,
      updateHeaderRenderValue: () => Promise.resolve(),
      updateHeaderStoreValue: () => {},
      setStoreValue: () => Promise.resolve(),
      deleteHeader: () => Promise.resolve(),
      isLoading: false,
    });

    renderWithProfileContext(
      <ProfilePage selectedProfileId={selectedProfileId} />,
      { profiles },
    );

    const createButton = screen.getByRole('button', { name: 'Create' });

    await user.click(createButton);

    await waitFor(() => {
      expect(createHeader).toHaveBeenCalled();
    });
  });
});
