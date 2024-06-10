import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { browser } from 'wxt/browser';

import { HeaderRepository } from '@/header/header-repository';
import { getHeaderRule } from '@/lib/get-header-rule';
import { ProfileRepository } from '@/profile/profile-repository';
import { mockHeaders } from '@/test-utils/mock-header';
import { mockProfile, mockProfiles } from '@/test-utils/mock-profile';
import { MockStorageAdapter } from '@/test-utils/mock-storage-adapter';

import { HeaderService } from '../header/header-service';
import { ProfileService } from '../profile/profile-service';
import { Background } from './background';

vi.mock('wxt/browser');

describe('Background', () => {
  let profileService: ProfileService;
  let headerService: HeaderService;

  const storage = new MockStorageAdapter();

  const profileRepository = vi.mocked<ProfileRepository>(
    new ProfileRepository(storage),
    true,
  );
  const headerRepository = vi.mocked<HeaderRepository>(
    new HeaderRepository(storage),
    true,
  );

  beforeEach(() => {
    profileService = new ProfileService(profileRepository, storage);
    headerService = new HeaderService(headerRepository, storage);
    vi.mocked(
      browser.declarativeNetRequest.updateDynamicRules,
    ).mockResolvedValue();
    vi.mocked(browser.declarativeNetRequest.getDynamicRules).mockResolvedValue(
      [],
    );
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe('init', () => {
    it('should watch for profile changes', async () => {
      const background = new Background(profileService, headerService);

      const onAnyProfileChanged = vi.spyOn(
        profileService,
        'onAnyProfileChanged',
      );

      await background.init();

      expect(onAnyProfileChanged).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should watch for header changes for each profile', async () => {
      const mockedProfile = mockProfile();

      const background = new Background(profileService, headerService);

      const getAllProfiles = vi
        .spyOn(profileService, 'getAllProfiles')
        .mockResolvedValue([mockedProfile]);

      const onProfileHeadersChanged = vi.spyOn(
        headerService,
        'onProfileHeadersChanged',
      );

      await background.init();

      expect(getAllProfiles).toHaveBeenCalled();

      expect(onProfileHeadersChanged).toHaveBeenCalledWith(
        mockedProfile.id,
        expect.any(Function),
      );
    });
  });

  describe('updateHeaders', () => {
    it('should update headers', async () => {
      const mockedProfiles = mockProfiles(1, { active: true });
      const mockedHeaders = mockHeaders(3, { active: true });

      const background = new Background(profileService, headerService);

      const getActiveProfiles = vi
        .spyOn(profileService, 'getActiveProfiles')
        .mockResolvedValue(mockedProfiles);

      const getActiveHeadersForProfile = vi
        .spyOn(headerService, 'getActiveHeadersForProfile')
        .mockResolvedValue(mockedHeaders);

      const updateHeaderRules = vi.spyOn(background, 'updateHeaderRules');

      await background.updateHeaders();

      expect(getActiveProfiles).toHaveBeenCalled();

      mockedProfiles.forEach((profile) => {
        expect(getActiveHeadersForProfile).toHaveBeenCalledWith(profile.id);
      });

      expect(updateHeaderRules).toHaveBeenCalledWith([mockedHeaders]);
    });
  });

  describe('updateHeaderRules', () => {
    it('should update header rules', async () => {
      const mockedProfiles = mockProfiles(1, { active: true });

      const mockedHeaders = mockHeaders(3, { active: true });

      vi.spyOn(profileService, 'getActiveProfiles').mockResolvedValue(
        mockedProfiles,
      );

      vi.spyOn(headerService, 'getActiveHeadersForProfile').mockResolvedValue(
        mockedHeaders,
      );

      const background = new Background(profileService, headerService);

      const updateDynamicRulesSpy = vi
        .spyOn(browser.declarativeNetRequest, 'updateDynamicRules')
        .mockResolvedValue();

      await background.updateHeaderRules([mockedHeaders]);

      const rules = [mockedHeaders].map((headers, index) => {
        return getHeaderRule(headers, index + 1);
      });

      expect(updateDynamicRulesSpy).toHaveBeenCalledWith({
        removeRuleIds: [],
        addRules: rules,
      });
    });
  });

  describe('handleProfileChange', () => {
    it('should watch for header changes for new profiles', async () => {
      const mockedProfiles = mockProfiles(3);

      const background = new Background(profileService, headerService);

      vi.spyOn(background, 'updateHeaders').mockResolvedValue();

      const onProfileHeadersChanged = vi
        .spyOn(headerService, 'onProfileHeadersChanged')
        .mockResolvedValue();

      const profilesChange = {
        oldValue: [],
        newValue: mockedProfiles,
      };

      await background.handleProfileChange(profilesChange);

      mockedProfiles.forEach((profile) => {
        expect(onProfileHeadersChanged).toHaveBeenCalledWith(
          profile.id,
          expect.any(Function),
        );
      });
    });

    it('should unwatch for header changes for deleted profiles', async () => {
      const mockedProfiles = mockProfiles(3);

      const background = new Background(profileService, headerService);

      vi.spyOn(background, 'updateHeaders').mockResolvedValue();

      const offProfileHeadersChanged = vi
        .spyOn(headerService, 'offProfileHeadersChanged')
        .mockResolvedValue();

      const profilesChange = {
        oldValue: mockedProfiles,
        newValue: [],
      };

      await background.handleProfileChange(profilesChange);

      mockedProfiles.forEach((profile) => {
        expect(offProfileHeadersChanged).toHaveBeenCalledWith(
          profile.id,
          expect.any(Function),
        );
      });
    });

    it('should update headers when profiles change', async () => {
      const mockedProfiles = mockProfiles(3);

      const background = new Background(profileService, headerService);

      const updateHeaders = vi
        .spyOn(background, 'updateHeaders')
        .mockResolvedValue();

      const profilesChange = {
        oldValue: [],
        newValue: mockedProfiles,
      };

      await background.handleProfileChange(profilesChange);

      expect(updateHeaders).toHaveBeenCalled();
    });

    it('should update headers when active profiles change', async () => {
      const mockedProfiles = mockProfiles(3, { active: false });
      const changedProfiles = mockedProfiles.map((profile, index) => {
        return {
          ...profile,
          active: index % 2 === 0,
        };
      });

      const background = new Background(profileService, headerService);

      const updateHeaders = vi
        .spyOn(background, 'updateHeaders')
        .mockResolvedValue();

      const profilesChange = {
        oldValue: mockedProfiles,
        newValue: changedProfiles,
      };

      await background.handleProfileChange(profilesChange);

      expect(updateHeaders).toHaveBeenCalled();
    });

    it('should not update headers when profile metadata changes', async () => {
      const mockedProfiles = mockProfiles(3, { active: true });
      const changedProfiles = mockedProfiles.map((profile) => {
        const { color, name } = mockProfile();
        return {
          ...profile,
          color,
          name,
        };
      });

      const background = new Background(profileService, headerService);

      const updateHeaders = vi
        .spyOn(background, 'updateHeaders')
        .mockResolvedValue();

      const profilesChange = {
        oldValue: mockedProfiles,
        newValue: changedProfiles,
      };

      await background.handleProfileChange(profilesChange);

      expect(updateHeaders).not.toHaveBeenCalled();
    });
  });
});
