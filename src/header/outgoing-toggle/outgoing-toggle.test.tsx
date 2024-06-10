import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen } from '@/test-utils/testing-library';

import { OutgoingToggle } from './outgoing-toggle';

describe('OutgoingToggle', () => {
  it('should render', () => {
    render(<OutgoingToggle value={false} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Outgoing toggle')).toBeInTheDocument();
  });

  it('should render with correct color when false', () => {
    render(<OutgoingToggle value={false} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Outgoing toggle')).toHaveStyle({
      '--ai-bg': 'var(--mantine-color-violet-filled)',
    });
  });

  it('should render with correct color when true', () => {
    render(<OutgoingToggle value={true} onChange={vi.fn()} />);
    expect(screen.getByLabelText('Outgoing toggle')).toHaveStyle({
      '--ai-bg': 'var(--mantine-color-cyan-filled)',
    });
  });

  it('should call onChange when clicked', async () => {
    const onChange = vi.fn();
    render(<OutgoingToggle value={false} onChange={onChange} />);
    await userEvent.click(screen.getByLabelText('Outgoing toggle'));
    expect(onChange).toHaveBeenCalledTimes(1);
  });
});
