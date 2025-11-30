import { faker } from '@faker-js/faker';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';

import { render, screen, waitFor, within } from '@/test-utils/testing-library';

import { PopupColorPicker } from './popup-color-picker';

describe('PopupColorPicker', () => {
  it('should render the color picker button with the correct color', () => {
    const value = faker.color.rgb();
    const onChange = vi.fn();
    render(<PopupColorPicker value={value} onChange={onChange} />);

    const actionIcon = screen.getByLabelText('Choose Profile Color');

    expect(actionIcon).toHaveStyle({ '--ai-bg': value });
  });

  it('should open the color picker when the action icon is clicked', async () => {
    const user = userEvent.setup();
    const value = faker.color.rgb();
    const onChange = vi.fn();
    render(<PopupColorPicker value={value} onChange={onChange} />);

    const actionIcon = screen.getByLabelText('Choose Profile Color');

    await user.click(actionIcon);

    const colorPickerLabel = await screen.findByText('Choose a Colour');

    expect(colorPickerLabel).toBeInTheDocument();
  });

  it('should call the onChange callback when a color is selected', async () => {
    const user = userEvent.setup();

    const value = faker.color.rgb();
    const onChange = vi.fn();
    render(<PopupColorPicker value={value} onChange={onChange} />);

    const actionIcon = screen.getByLabelText('Choose Profile Color');

    await user.click(actionIcon);

    const colorPicker = await screen.findByTestId('color-picker');

    const color = within(colorPicker).getAllByRole('button', {
      // TODO - why is this hidden?
      hidden: true,
    })[0];

    await user.click(color);

    expect(onChange).toHaveBeenCalledWith(color.ariaLabel);
  });

  it('should close the color picker when a color is selected', async () => {
    const user = userEvent.setup();

    const value = faker.color.rgb();
    const onChange = vi.fn();
    render(<PopupColorPicker value={value} onChange={onChange} />);

    const actionIcon = screen.getByLabelText('Choose Profile Color');

    await user.click(actionIcon);

    const colorPicker = await screen.findByTestId('color-picker');

    const color = within(colorPicker).getAllByRole('button', {
      // TODO - why is this hidden?
      hidden: true,
    })[0];

    await user.click(color);

    const colorPickerLabel = screen.queryByText('Choose a Colour');

    await waitFor(() => {
      expect(colorPickerLabel).not.toBeInTheDocument();
    });
  });

  it('should close the color picker when the action icon is clicked', async () => {
    const user = userEvent.setup();

    const value = faker.color.rgb();
    const onChange = vi.fn();
    render(<PopupColorPicker value={value} onChange={onChange} />);

    const actionIcon = screen.getByLabelText('Choose Profile Color');

    await user.click(actionIcon);

    const colorPickerLabel = await screen.findByText('Choose a Colour');

    expect(colorPickerLabel).toBeInTheDocument();

    await user.click(actionIcon);

    await waitFor(() => {
      expect(colorPickerLabel).not.toBeInTheDocument();
    });
  });
});
