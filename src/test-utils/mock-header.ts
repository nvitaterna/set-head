import { faker } from '@faker-js/faker';

import { HeaderData } from '@/header/header-storage';

export const mockHeader = (data?: Partial<HeaderData>): HeaderData => {
  return {
    id: faker.string.uuid(),
    name: faker.word.words(1),
    value: faker.word.words(1),
    active: faker.datatype.boolean(),
    outgoing: faker.datatype.boolean(),
    ...data,
  };
};

export const mockHeaders = (
  count: number,
  data?: Partial<HeaderData>,
): HeaderData[] => {
  const arr: HeaderData[] = [];

  for (let i = 0; i < count; i++) {
    arr.push(mockHeader(data));
  }

  return arr;
};
