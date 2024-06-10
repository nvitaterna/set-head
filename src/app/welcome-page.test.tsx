import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { WelcomePage } from './welcome-page';

describe('Welcome Page', () => {
  it('should render welcome message', () => {
    render(<WelcomePage />);
    expect(screen.getByText('Welcome to Sethead!')).toBeInTheDocument();
  });

  it('should render instructions', () => {
    render(<WelcomePage />);
    expect(
      screen.getByText(
        'You can create a new profile by clicking on the plus icon in the title bar.',
      ),
    ).toBeInTheDocument();
  });
});
