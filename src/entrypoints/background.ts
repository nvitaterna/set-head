import { defineBackground } from '#imports';

import { main } from '@/background/main';

export default defineBackground({
  type: 'module',
  main: () => {
    main();
  },
});
