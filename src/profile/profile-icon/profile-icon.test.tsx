import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { mockProfile } from '@/test-utils/mock-profile';
import { render, screen } from '@/test-utils/testing-library';
import { theme } from '@/theme/theme';

import { ProfileIcon } from './profile-icon';

describe('ProfileIcon', () => {
  describe('ActionIcon', () => {
    it('should render profile name first letter', () => {
      const profile = mockProfile();

      render(
        <ProfileIcon profile={profile} onClick={vi.fn()} selected={false} />,
      );

      expect(screen.getByText(profile.name[0])).toBeInTheDocument();
    });

    it('should call onClick on icon click', async () => {
      const user = userEvent.setup();
      const profile = mockProfile();
      const onClick = vi.fn();

      render(
        <ProfileIcon profile={profile} onClick={onClick} selected={false} />,
      );

      await user.click(screen.getByText(profile.name[0]));

      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it('should render filled variant for selected profile', () => {
      const profile = mockProfile();
      render(
        <ProfileIcon profile={profile} onClick={vi.fn()} selected={true} />,
      );

      const icon = screen.getByRole('button');

      expect(icon).toHaveAttribute('data-variant', 'filled');
    });

    it('should render light variant for unselected profile', () => {
      const profile = mockProfile();
      render(
        <ProfileIcon profile={profile} onClick={vi.fn()} selected={false} />,
      );
      const icon = screen.getByRole('button');

      expect(icon).toHaveAttribute('data-variant', 'light');
    });
  });
  describe('Indicator', () => {
    it('should render green indicator for active profile', () => {
      const profile = mockProfile({ active: true });
      const red = theme?.colors?.red?.[6];

      render(
        <ProfileIcon profile={profile} onClick={vi.fn()} selected={false} />,
      );

      const indicator = screen.getByTestId('profile-indicator');

      expect(indicator).toHaveStyle({ '--indicator-color': red });
    });

    it('should render red indicator for inactive profile', () => {
      const profile = mockProfile({ active: false });
      const green = theme?.colors?.green?.[6];

      render(
        <ProfileIcon profile={profile} onClick={vi.fn()} selected={false} />,
      );

      const indicator = screen.getByTestId('profile-indicator');
      expect(indicator).toHaveStyle({ '--indicator-color': green });
    });
  });
});
