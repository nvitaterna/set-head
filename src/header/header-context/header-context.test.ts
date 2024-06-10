import { describe, expect, it } from 'vitest';

import { suppressConsoleError } from '@/test-utils/suppress-console-error';
import { renderHook } from '@/test-utils/testing-library';

import { useHeaderContext } from './header-context';

describe('HeaderContext', () => {
  it('should throw an error if no value is provided', () => {
    suppressConsoleError(() => {
      expect(() => renderHook(() => useHeaderContext())).toThrowError();
    });
  });
});
