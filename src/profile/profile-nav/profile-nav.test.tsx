import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockProfiles } from '@/test-utils/mock-profile';
import { renderWithProfileContext } from '@/test-utils/render-with-profile-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { ProfileNav } from './profile-nav';

describe('ProfileNav', () => {
  it('should render profile icons', async () => {
    const profiles = mockProfiles(3);
    const selectedProfileId = profiles[0].id;

    renderWithProfileContext(
      <ProfileNav
        selectedProfileId={selectedProfileId}
        onClickProfile={vi.fn()}
      />,
      { profiles },
    );

    await waitFor(() => {
      const profileIcons = screen.getAllByRole('button');

      expect(profileIcons).toHaveLength(3);
    });
  });

  it('should call onClickProfile when clicking on profile icon', async () => {
    const user = userEvent.setup();
    const profiles = mockProfiles(3);
    const selectedProfileId = profiles[0].id;
    const onClickProfile = vi.fn();

    renderWithProfileContext(
      <ProfileNav
        selectedProfileId={selectedProfileId}
        onClickProfile={onClickProfile}
      />,
      { profiles },
    );

    const profileIcons = screen.getAllByRole('button');

    await user.click(profileIcons[1]);

    await waitFor(() => {
      expect(onClickProfile).toHaveBeenCalledWith(profiles[1].id);
    });
  });
});
