import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { AppHeader } from './app-header';

describe('AppHeader', () => {
  it('renders children', () => {
    const text = faker.lorem.words();
    render(<AppHeader>{text}</AppHeader>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it('renders the Sethead logo', () => {
    render(<AppHeader />);
    expect(screen.getByAltText('Sethead')).toBeInTheDocument();
  });
});
