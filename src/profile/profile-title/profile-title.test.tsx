import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockProfiles } from '@/test-utils/mock-profile';
import { renderWithProfileContext } from '@/test-utils/render-with-profile-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { ProfileTitle } from './profile-title';

describe.skip('ProfileTitle', () => {
  it('should not render anything if there is no profile', async () => {
    renderWithProfileContext(
      <ProfileTitle selectedProfileId={''} setSelectedProfileId={vi.fn()} />,
    );
    await waitFor(() => {
      expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
    });
  });

  it('should render profile name', async () => {
    const profiles = mockProfiles(1, { active: true });
    const selectedProfileId = profiles[0].id;

    renderWithProfileContext(
      <ProfileTitle
        selectedProfileId={selectedProfileId}
        setSelectedProfileId={vi.fn()}
      />,
      { profiles },
    );

    await waitFor(() => {
      expect(screen.getByRole('textbox')).toHaveValue(profiles[0].name);
    });
  });

  it('should render active toggle', async () => {
    const profiles = mockProfiles(1, { active: true });
    const selectedProfileId = profiles[0].id;

    renderWithProfileContext(
      <ProfileTitle
        selectedProfileId={selectedProfileId}
        setSelectedProfileId={vi.fn()}
      />,
      { profiles },
    );

    await waitFor(() => {
      expect(screen.getByRole('switch')).toBeChecked();
    });
  });

  it('should call updateProfile with new name', async () => {
    const user = userEvent.setup();

    const profiles = mockProfiles(1, { active: true });
    const selectedProfileId = profiles[0].id;

    const updateProfile = vi.fn();

    renderWithProfileContext(
      <ProfileTitle
        selectedProfileId={selectedProfileId}
        setSelectedProfileId={vi.fn()}
      />,
      { profiles, updateProfile },
    );

    await user.type(screen.getByRole('textbox'), 'New name');

    await waitFor(() => {
      expect(updateProfile).toHaveBeenCalled();
    });
  });

  it('should delete profile', async () => {
    const user = userEvent.setup();

    const profiles = mockProfiles(2, { active: true });
    const selectedProfileId = profiles[0].id;

    const deleteProfile = vi.fn();

    renderWithProfileContext(
      <ProfileTitle
        selectedProfileId={selectedProfileId}
        setSelectedProfileId={vi.fn()}
      />,
      { profiles, deleteProfile },
    );

    await user.click(screen.getByRole('button', { name: 'Delete' }));

    await waitFor(async () => {
      await user.click(screen.getByRole('button', { name: 'Confirm delete' }));

      expect(deleteProfile).toHaveBeenCalled();
    });
  });
});
