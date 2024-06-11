import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockProfiles } from '@/test-utils/mock-profile';
import { renderWithProfileContext } from '@/test-utils/render-with-profile-context';
import { screen, waitFor } from '@/test-utils/testing-library';

import { AppFooter } from './app-footer';

describe('AppFooter', () => {
  it('renders the Sethead logo', async () => {
    renderWithProfileContext(<AppFooter />);
    await waitFor(() => {
      expect(screen.getByAltText('Sethead')).toBeInTheDocument();
    });
  });

  it('should create a new profile when the create profile button is clicked', async () => {
    const user = userEvent.setup();
    const createProfile = vi.fn();
    renderWithProfileContext(<AppFooter />, { createProfile });

    await user.click(screen.getByText('Create Profile'));

    await waitFor(() => {
      expect(createProfile).toHaveBeenCalled();
    });
  });

  it('should enable all profiles when the enable all profiles button is clicked', async () => {
    const user = userEvent.setup();
    const updateProfiles = vi.fn();
    const profiles = mockProfiles(3);

    renderWithProfileContext(<AppFooter />, { updateProfiles, profiles });

    await user.click(screen.getByText('Enable All Profiles'));

    await waitFor(() => {
      expect(updateProfiles).toHaveBeenCalledWith(
        profiles.map((profile) => ({ ...profile, active: true })),
      );
    });
  });

  it('should disable all profiles when the disable all profiles button is clicked', async () => {
    const user = userEvent.setup();
    const updateProfiles = vi.fn();
    const profiles = mockProfiles(3);

    renderWithProfileContext(<AppFooter />, { updateProfiles, profiles });

    await user.click(screen.getByText('Disable All Profiles'));

    await waitFor(() => {
      expect(updateProfiles).toHaveBeenCalledWith(
        profiles.map((profile) => ({ ...profile, active: false })),
      );
    });
  });
});
