import {
  ActionIcon,
  Flex,
  Switch,
  Text,
  TextInput,
  ThemeIcon,
  Tooltip,
  useMantineTheme,
} from '@mantine/core';
import { IconExclamationCircle, IconX } from '@tabler/icons-react';
import { FC } from 'react';

import { useHeaderContext } from '../header-context/header-context';
import { headerSchema } from '../header-schema';
import { HeaderData } from '../header-storage';
import { OutgoingToggle } from '../outgoing-toggle/outgoing-toggle';

interface HeaderListItemProps {
  header: HeaderData;
}

export const HeaderListItem: FC<HeaderListItemProps> = ({ header }) => {
  const {
    updateHeaderRenderValue,
    updateHeaderStoreValue,
    setStoreValue,
    deleteHeader,
  } = useHeaderContext();

  const theme = useMantineTheme();

  const validateHeader = headerSchema.safeParse(header);

  let errors = null;
  if (validateHeader.error) {
    errors = validateHeader.error.errors;
  }

  const saveHeader = () => {
    const validateHeader = headerSchema.safeParse(header);

    if (validateHeader.success) {
      setStoreValue();
    }
  };

  const hasError = (path: string) => {
    return !!errors?.find((e) => e.path.includes(path));
  };

  const getErrorMessage = (path: string) => {
    const error = errors?.find((e) => e.path.includes(path));
    return error ? error.message : '';
  };

  return (
    <Flex py="xs" direction="row" align="center" gap="xs" role="listitem">
      <Switch
        color={theme.colors.green[6]}
        checked={header.active}
        onChange={(event) => {
          updateHeaderStoreValue({
            ...header,
            active: event.currentTarget.checked,
          });
        }}
      />
      <Flex
        direction="row"
        align="center"
        gap="xs"
        style={{ flexGrow: 1, flexBasis: '50%' }}>
        {hasError('name') ? (
          <Tooltip label={getErrorMessage('name')}>
            <ThemeIcon color="yellow" variant="transparent">
              <IconExclamationCircle />
            </ThemeIcon>
          </Tooltip>
        ) : null}
        <TextInput
          size="xs"
          aria-label="Header name"
          style={{ flexGrow: 1 }}
          value={header.name}
          onChange={(event) =>
            updateHeaderRenderValue({
              ...header,
              name: event.currentTarget.value,
            })
          }
          onBlur={() => saveHeader()}
        />
      </Flex>
      <Text>:</Text>
      <TextInput
        size="xs"
        aria-label="Header value"
        style={{ flexGrow: 1, flexBasis: '50%' }}
        value={header.value}
        onChange={(event) =>
          updateHeaderRenderValue({
            ...header,
            value: event.currentTarget.value,
          })
        }
        onBlur={() => saveHeader()}
      />
      <OutgoingToggle
        value={header.outgoing}
        onChange={(value) => {
          updateHeaderStoreValue({
            ...header,
            outgoing: value,
          });
        }}
      />
      <ActionIcon
        aria-label="Delete header"
        variant="subtle"
        color="red"
        onClick={() => deleteHeader(header.id)}>
        <IconX />
      </ActionIcon>
    </Flex>
  );
};
