import { ActionIcon, Tooltip } from '@mantine/core';
import { FC } from 'react';

interface IconToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  icon: React.ReactNode;
  tooltipLabel: string;
  color: string;
  ariaLabel: string;
}

export const IconToggle: FC<IconToggleProps> = ({
  value,
  onChange,
  icon,
  tooltipLabel,
  color,
  ariaLabel,
}) => {
  return (
    <Tooltip color="dark.6" label={tooltipLabel}>
      <ActionIcon
        aria-label={ariaLabel}
        onClick={() => onChange(!value)}
        color={color}>
        {icon}
      </ActionIcon>
    </Tooltip>
  );
};
