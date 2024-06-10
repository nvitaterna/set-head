import { describe, expect, it, vi } from 'vitest';

import { Background } from './background';
import { main } from './main';

vi.mock('./background');

describe('main', () => {
  it('runs without error', async () => {
    await main();
  });

  it('should run background.init', async () => {
    vi.spyOn(Background.prototype, 'init');

    await main();

    expect(Background.prototype.init).toHaveBeenCalled();
  });
});
