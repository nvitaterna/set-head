import { faker } from '@faker-js/faker';

import { ProfileData } from '@/profile/profile-storage';

export const mockProfileId = (): string => {
  return faker.string.alphanumeric(10);
};

export const mockProfile = (data?: Partial<ProfileData>): ProfileData => {
  return {
    id: faker.string.uuid(),
    name: faker.word.words(1),
    active: faker.datatype.boolean(),
    color: faker.color.rgb({ prefix: '' }),
    ...data,
  };
};

export const mockProfiles = (
  count: number,
  data?: Partial<ProfileData>,
): ProfileData[] => {
  return Array.from({ length: count }, () => mockProfile(data));
};
