import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { DeleteButton } from './delete-button';

describe('DeleteButton', () => {
  it('calls onClick when button is clicked', () => {
    const onClick = vi.fn();
    render(<DeleteButton onClick={onClick} />);
    screen.getByRole('button').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
