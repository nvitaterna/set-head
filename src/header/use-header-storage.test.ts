import { act } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { mockProfileId } from '@/test-utils/mock-profile';
import { renderHook, waitFor } from '@/test-utils/testing-library';

import { useHeaderStorage } from './use-header-storage';

describe('useHeaderStorage', () => {
  beforeEach(async () => {
    await browser.storage.local.clear();
  });
  it('should return headers', async () => {
    const profileId = mockProfileId();
    const { result } = renderHook(() => useHeaderStorage(profileId));

    await waitFor(() => {
      expect(result.current.headers).toEqual([]);
    });
  });

  it('should create a new header', async () => {
    const profileId = mockProfileId();
    const { result } = renderHook(() => useHeaderStorage(profileId));

    await waitFor(() => {
      expect(result.current.headers).toEqual([]);
    });

    await act(() => result.current.createHeader());

    expect(result.current.headers).toHaveLength(1);
  });

  // todo update header tests

  it('should delete a header', async () => {
    const profileId = mockProfileId();
    const { result } = renderHook(() => useHeaderStorage(profileId));

    await waitFor(() => {
      expect(result.current.headers).toEqual([]);
    });

    await act(() => result.current.createHeader());

    expect(result.current.headers).toHaveLength(1);

    const header = result.current.headers[0];

    await act(() => result.current.deleteHeader(header.id));

    expect(result.current.headers).toEqual([]);
  });
});
