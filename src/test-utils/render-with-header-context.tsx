import {
  HeaderContext,
  HeaderContextType,
} from '@/header/header-context/header-context';
import { useHeaderStorage } from '@/header/use-header-storage';
import { render, renderHook } from '@/test-utils/testing-library';

export const renderWithHeaderContext = (
  ui: React.ReactNode,
  profileId: string,
  headerContextValue?: Partial<HeaderContextType>,
) => {
  const { result } = renderHook(() => useHeaderStorage(profileId));

  return render(
    <HeaderContext.Provider
      value={{
        ...result.current,
        ...headerContextValue,
      }}>
      {ui}
    </HeaderContext.Provider>,
  );
};
