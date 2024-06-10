import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { AppMain } from './app-main';

describe('AppMain', () => {
  it('renders children', () => {
    const text = faker.lorem.words();
    render(<AppMain>{text}</AppMain>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // TODO: scrollbar testing?
});
