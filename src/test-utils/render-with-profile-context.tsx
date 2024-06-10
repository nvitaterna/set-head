import {
  ProfileContext,
  ProfileContextType,
} from '@/profile/profile-context/profile-context';
import { useProfileStorage } from '@/profile/use-profile-storage';
import { render, renderHook } from '@/test-utils/testing-library';

export const renderWithProfileContext = (
  ui: React.ReactNode,
  profileContextValue?: Partial<ProfileContextType>,
) => {
  const { result } = renderHook(() => useProfileStorage());

  return render(
    <ProfileContext.Provider
      value={{
        ...result.current,
        ...profileContextValue,
      }}>
      {ui}
    </ProfileContext.Provider>,
  );
};
