import { browser } from 'wxt/browser';

import { HeaderService } from '@/header/header-service';
import { HeaderData } from '@/header/header-storage';
import { getHeaderRule } from '@/lib/get-header-rule';
import { ProfilesChange, ProfileService } from '@/profile/profile-service';

export class Background {
  constructor(
    private profileService: ProfileService,
    private headerService: HeaderService,
  ) {}

  async init() {
    this.profileService.onAnyProfileChanged(async (profilesChange) => {
      await this.handleProfileChange(profilesChange);
    });

    const profiles = await this.profileService.getAllProfiles();

    profiles?.forEach((profile) => {
      this.headerService.onProfileHeadersChanged(profile.id, async () => {
        await this.updateHeaders();
      });
    });
  }

  async updateHeaders() {
    const profiles = await this.profileService.getActiveProfiles();

    const headers = await Promise.all(
      profiles.map(async (profile) => {
        return await this.headerService.getActiveHeadersForProfile(profile.id);
      }),
    );

    await this.updateHeaderRules(headers);
  }

  async updateHeaderRules(activeHeaderGroups: HeaderData[][]) {
    const rules = activeHeaderGroups
      .filter((headers) => headers.length > 0)
      .map((headers, index) => {
        return getHeaderRule(headers, index + 1);
      });

    const existingRuelIds = await browser.declarativeNetRequest
      .getDynamicRules()
      .then((rules) => rules.map((r) => r.id));

    await browser.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: existingRuelIds,
      addRules: rules,
    });
  }

  async handleProfileChange(profilesChange: ProfilesChange) {
    const profilesChanged =
      profilesChange.oldValue?.length !== profilesChange.newValue?.length;

    if (profilesChanged) {
      // watch new profiles and unwatch deleted profiles
      const createdProfiles =
        profilesChange.newValue?.filter(
          (profile) =>
            !profilesChange.oldValue?.find((p) => p.id === profile.id),
        ) || [];

      const deletedProfiles =
        profilesChange.oldValue?.filter(
          (profile) =>
            !profilesChange.newValue?.find((p) => p.id === profile.id),
        ) || [];

      // start listening for header changes for new profiles
      createdProfiles.forEach((profile) => {
        this.headerService.onProfileHeadersChanged(profile.id, async () => {
          await this.updateHeaders();
        });
      });

      // stop listening for header changes for deleted profiles
      deletedProfiles.forEach((profile) => {
        this.headerService.offProfileHeadersChanged(profile.id, async () => {
          await this.updateHeaders();
        });
      });
    }

    const hasActiveChanged =
      (profilesChange.newValue || []).filter((profile) => {
        const oldProfile = profilesChange.oldValue?.find(
          (p) => p.id === profile.id,
        );
        return !oldProfile || oldProfile.active !== profile.active;
      }).length > 0;

    if (hasActiveChanged || profilesChanged) {
      await this.updateHeaders();
    }
  }
}
