import {
  ActionIcon,
  ColorPicker,
  Popover,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconColorPicker } from '@tabler/icons-react';
import { FC, useMemo } from 'react';

interface PopupColorPickerProps {
  value: string;
  onChange: (value: string) => void;
}

export const PopupColorPicker: FC<PopupColorPickerProps> = ({
  value,
  onChange,
}) => {
  const theme = useMantineTheme();

  const swatches = useMemo(() => {
    return Object.values(theme.colors)
      .splice(2)
      .map((color) => [color[2], color[4], color[6]])
      .flat();
  }, [theme]);

  const [opened, { close, toggle }] = useDisclosure(false);

  const onClickColor = (color: string) => {
    onChange(color);
    close();
  };

  return (
    <Popover opened={opened} trapFocus position="bottom">
      <Popover.Target>
        <ActionIcon
          onClick={toggle}
          aria-label="Choose Profile Color"
          color={value}
          autoContrast>
          <IconColorPicker />
        </ActionIcon>
      </Popover.Target>

      <Popover.Dropdown data-testid="color-picker">
        <Text>Choose a Colour</Text>
        <ColorPicker
          value={value}
          size="sm"
          format="hex"
          withPicker={false}
          swatches={swatches}
          onChange={onClickColor}
        />
      </Popover.Dropdown>
    </Popover>
  );
};
