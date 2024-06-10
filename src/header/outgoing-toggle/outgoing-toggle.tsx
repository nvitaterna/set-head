import { IconWorldDownload, IconWorldUpload } from '@tabler/icons-react';
import { FC } from 'react';

import { IconToggle } from '@/icon-toggle/icon-toggle';

interface OutgoingToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
}
export const OutgoingToggle: FC<OutgoingToggleProps> = ({
  value,
  onChange,
}) => {
  return (
    <IconToggle
      ariaLabel="Outgoing toggle"
      value={value}
      onChange={onChange}
      icon={value ? <IconWorldUpload /> : <IconWorldDownload />}
      tooltipLabel={value ? 'Is set on request' : 'Is set on response'}
      color={value ? 'cyan' : 'violet'}
    />
  );
};
