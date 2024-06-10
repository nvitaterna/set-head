import short from 'short-uuid';

import { getProfilePrefix } from '@/profile/profile-storage';
import { BrowserStorage } from '@/storage/browser-storage';
import { useStorage } from '@/storage/use-storage';

import { HEADER_STORAGE_KEY, HeaderData } from './header-storage';

const storage = new BrowserStorage('local');

export const useHeaderStorage = (profileId: string) => {
  const [rawHeaders, , { setRenderValue, setStoreValue, isLoading }] =
    useStorage<HeaderData[]>({
      instance: storage,
      key: `${getProfilePrefix(profileId)}${HEADER_STORAGE_KEY}`,
    });

  const headers = rawHeaders || [];

  const createHeader = async () => {
    const id = short.generate();
    const header: HeaderData = {
      id,
      name: '',
      value: '',
      active: true,
      outgoing: true,
    };
    await setStoreValue([...(headers || []), header]);
  };

  const deleteHeader = async (headerId: string) => {
    await setStoreValue([...(headers || [])].filter((h) => h.id !== headerId));
  };

  const updateHeaderRenderValue = (header: HeaderData) => {
    const index = (headers || [])?.findIndex((h) => h.id === header.id);
    const next = [...(headers || [])];
    if (index !== -1) {
      next[index] = header;
    } else {
      next.push(header);
    }

    setRenderValue(next);
  };

  const updateHeaderStoreValue = (header: HeaderData) => {
    const index = (headers || [])?.findIndex((h) => h.id === header.id);
    const next = [...(headers || [])];
    if (index !== -1) {
      next[index] = header;
    } else {
      next.push(header);
    }

    setStoreValue(next);
  };

  return {
    headers,
    updateHeaderRenderValue,
    updateHeaderStoreValue,
    setStoreValue,
    createHeader,
    deleteHeader,
    isLoading,
  };
};
