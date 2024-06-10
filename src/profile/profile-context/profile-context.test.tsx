import { describe, expect, it } from 'vitest';

import { suppressConsoleError } from '@/test-utils/suppress-console-error';
import { renderHook } from '@/test-utils/testing-library';

import { useProfileContext } from './profile-context';

describe('ProfileContext', () => {
  it('should throw an error if no value is provided', () => {
    suppressConsoleError(() => {
      expect(() => renderHook(() => useProfileContext())).toThrowError();
    });
  });
});
