import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { CreateButton } from './create-button';

describe('CreateButton', () => {
  it('should call onClick when button is clicked', () => {
    const onClick = vi.fn();
    render(<CreateButton onClick={onClick} />);
    screen.getByRole('button').click();
    expect(onClick).toBeCalled();
  });
});
