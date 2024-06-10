import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { SetheadLogo } from './sethead-logo';

describe('SetheadLogo', () => {
  it('should render the Sethead logo', () => {
    render(<SetheadLogo />);

    const logo = screen.getByAltText('Sethead');

    expect(logo).toBeInTheDocument();
  });
});
