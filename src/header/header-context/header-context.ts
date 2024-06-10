import { createContext, useContext } from 'react';

import { useHeaderStorage } from '../use-header-storage';

export type HeaderContextType = ReturnType<typeof useHeaderStorage>;

export const HeaderContext = createContext<HeaderContextType | null>(null);

export const useHeaderContext = () => {
  const headerContext = useContext(HeaderContext);

  if (!headerContext) {
    throw new Error('useHeaderContext must be used within a HeaderProvider');
  }

  return headerContext;
};
