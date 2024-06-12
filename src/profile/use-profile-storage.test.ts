import { act } from 'react';
import { beforeEach, describe, expect, it } from 'vitest';

import { renderHook, waitFor } from '@/test-utils/testing-library';

import { useProfileStorage } from './use-profile-storage';

describe('useProfileStorage', () => {
  beforeEach(async () => {
    await browser.storage.local.clear();
  });
  it('should return profiles', async () => {
    const { result } = renderHook(() => useProfileStorage());

    await waitFor(() => {
      expect(result.current.profiles).toEqual([]);
    });
  });

  it('should create a new profile', async () => {
    const { result } = renderHook(() => useProfileStorage());

    await waitFor(() => {
      expect(result.current.profiles).toEqual([]);
    });

    await act(() => result.current.createProfile());

    expect(result.current.profiles).toHaveLength(1);
  });

  it('should update a profile', async () => {
    const { result } = renderHook(() => useProfileStorage());

    await waitFor(() => {
      expect(result.current.profiles).toEqual([]);
    });

    await act(() => result.current.createProfile());

    expect(result.current.profiles).toHaveLength(1);

    const profile = result.current.profiles[0];
    profile.name = 'Updated Profile';

    await act(() => result.current.updateProfile(profile));

    expect(result.current.profiles[0].name).toEqual('Updated Profile');
  });

  it('should delete a profile', async () => {
    const { result } = renderHook(() => useProfileStorage());

    await waitFor(() => {
      expect(result.current.profiles).toEqual([]);
    });

    await act(() => result.current.createProfile());

    expect(result.current.profiles).toHaveLength(1);

    const profile = result.current.profiles[0];

    await act(() => result.current.deleteProfile(profile.id));

    expect(result.current.profiles).toEqual([]);
  });

  it('should set the selected profile', async () => {
    const { result } = renderHook(() => useProfileStorage());

    await waitFor(() => {
      expect(result.current.profiles).toEqual([]);
    });

    await act(() => result.current.createProfile());

    expect(result.current.profiles).toHaveLength(1);

    const profile = result.current.profiles[0];

    await act(() => result.current.setSelectedProfileId(profile.id));

    expect(result.current.profiles[0].selected).toEqual(true);
  });
});
