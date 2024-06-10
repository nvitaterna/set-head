import { defineBackground } from 'wxt/sandbox';

import { main } from '@/background/main';

export default defineBackground({
  type: 'module',
  main: () => {
    main();
  },
});
