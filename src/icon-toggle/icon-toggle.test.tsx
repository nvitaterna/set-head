import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor } from '@/test-utils/testing-library';

import { IconToggle } from './icon-toggle';

describe('IconToggle', () => {
  it('should render icon', () => {
    const tooltipLabel = faker.lorem.sentence();
    const iconText = faker.word.words(1);
    const onChange = vi.fn();

    render(
      <IconToggle
        value={false}
        onChange={onChange}
        icon={<span>{iconText}</span>}
        tooltipLabel={tooltipLabel}
        color="red"
      />,
    );

    expect(screen.getByText(iconText)).toBeInTheDocument();
  });

  it('should call onChange with opposite value on icon click', async () => {
    const user = userEvent.setup();

    const tooltipLabel = faker.lorem.sentence();
    const iconText = faker.word.words(1);
    const onChange = vi.fn();

    render(
      <IconToggle
        value={false}
        onChange={onChange}
        icon={<span>{iconText}</span>}
        tooltipLabel={tooltipLabel}
        color="red"
      />,
    );

    await user.click(screen.getByText(iconText));

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it('should render tooltip with label', async () => {
    const user = userEvent.setup();
    const tooltipLabel = faker.lorem.sentence();
    const iconText = faker.word.words(1);
    const onChange = vi.fn();

    render(
      <IconToggle
        value={false}
        onChange={onChange}
        icon={<span>{iconText}</span>}
        tooltipLabel={tooltipLabel}
        color="red"
      />,
    );

    await user.hover(screen.getByText(iconText));

    await waitFor(() => {
      expect(screen.getByText(tooltipLabel)).toBeInTheDocument();
    });
  });
});
