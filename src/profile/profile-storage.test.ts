import { describe, expect, it } from 'vitest';

import { mockProfileId } from '@/test-utils/mock-profile';

import { getProfilePrefix, getProfileStorageKeys } from './profile-storage';

describe('profile-storage', () => {
  describe('getProfilePrefix', () => {
    it('should return the correct prefix', () => {
      const profileId = mockProfileId();

      const prefix = getProfilePrefix(profileId);

      expect(prefix).toBe(`${profileId}_`);
    });
  });

  describe('getProfileStorageKeys', () => {
    it('should return the correct keys', () => {
      const profileId = mockProfileId();

      const keys = getProfileStorageKeys(profileId);

      expect(keys).toEqual([`${getProfilePrefix(profileId)}headers`]);
    });
  });
});
