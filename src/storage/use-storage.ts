import { useCallback, useEffect, useState } from 'react';

import { BrowserStorage } from './browser-storage';

interface UseStorageArgs {
  key: string;
  instance: BrowserStorage;
}

type UseStorageReturn<T = unknown> = [
  T | null,
  (newValue: T) => Promise<void>,
  {
    setRenderValue: (newValue: T) => void;
    setStoreValue: (newValue?: T) => Promise<void>;
    isLoading: boolean;
  },
];

export const useStorage = <T = unknown>({
  key,
  instance,
}: UseStorageArgs): UseStorageReturn<T> => {
  const [isLoading, setIsLoading] = useState(true);

  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    instance.get<T>(key).then((data) => {
      setValue(data);
      setIsLoading(false);
    });
  }, [key, instance]);

  const set = useCallback(
    async (newValue: T) => {
      setValue(newValue);
      await instance.set(key, newValue);
    },
    [key, instance],
  );

  const setRenderValue = (newValue: T) => {
    setValue(newValue);
  };

  const setStoreValue = async (newValue?: T) => {
    if (newValue) {
      setValue(newValue);
      instance.set(key, newValue);
    } else {
      instance.set(key, value);
    }
  };

  return [value, set, { setRenderValue, setStoreValue, isLoading }];
};
