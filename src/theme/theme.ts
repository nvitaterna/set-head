import { createTheme, TextInput } from '@mantine/core';

import classes from './input.module.scss';

export const theme = createTheme({
  components: {
    TextInput: TextInput.extend({
      classNames: classes,
    }),
  },
});
