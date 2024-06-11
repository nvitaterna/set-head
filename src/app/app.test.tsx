import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { useProfileStorage } from '@/profile/use-profile-storage';
import { mockProfiles } from '@/test-utils/mock-profile';
import { render, screen, waitFor } from '@/test-utils/testing-library';

import { App } from './app';

vi.mock('@/profile/use-profile-storage');

describe('App', () => {
  beforeEach(() => {
    vi.mocked(useProfileStorage).mockReturnValue({
      profiles: [],
      isLoading: false,
      createProfile: () => Promise.resolve(),
      updateProfile: () => Promise.resolve(),
      deleteProfile: () => Promise.resolve(),
      updateProfiles: () => Promise.resolve(),
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('header', () => {
    it('should render the app header', async () => {
      render(<App />);

      expect(screen.getByRole('toolbar')).toBeInTheDocument();
    });
  });
  describe('navbar', () => {
    it('should render the profile nav', async () => {
      render(<App />);

      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });
  });
  describe('main', () => {
    it('should render the welcome page', async () => {
      render(<App />);

      expect(screen.getByText('Welcome to Sethead!')).toBeInTheDocument();
    });

    it('should render the profile page', async () => {
      const profiles = mockProfiles(2);

      vi.mocked(useProfileStorage).mockReturnValue({
        profiles,
        isLoading: false,
        createProfile: () => Promise.resolve(),
        updateProfile: () => Promise.resolve(),
        deleteProfile: () => Promise.resolve(),
        updateProfiles: () => Promise.resolve(),
      });

      render(<App />);

      await waitFor(() => {
        expect(
          screen.getByText(
            'You can modify requests and responses by clicking on the plus button in the top left corner.',
          ),
        ).toBeInTheDocument();
      });
    });
  });
});
