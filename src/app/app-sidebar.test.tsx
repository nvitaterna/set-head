import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { AppSidebar } from './app-sidebar';

describe('AppSidebar', () => {
  it('renders children', () => {
    const text = faker.lorem.words();
    render(<AppSidebar>{text}</AppSidebar>);
    expect(screen.getByText(text)).toBeInTheDocument();
  });

  // TODO: scrollbar testing?
});
