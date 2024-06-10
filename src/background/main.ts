import { HeaderRepository } from '@/header/header-repository';
import { HeaderService } from '@/header/header-service';
import { ProfileRepository } from '@/profile/profile-repository';
import { ProfileService } from '@/profile/profile-service';
import { BrowserStorage } from '@/storage/browser-storage';

import { Background } from './background';

export const main = async () => {
  const browserStorage = new BrowserStorage('local');
  const profileRepository = new ProfileRepository(browserStorage);
  const profileService = new ProfileService(profileRepository, browserStorage);

  const headerRepository = new HeaderRepository(browserStorage);
  const headerService = new HeaderService(headerRepository, browserStorage);

  const background = new Background(profileService, headerService);

  await background.init();
};
