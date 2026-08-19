import { Redirect, useRootNavigationState } from 'expo-router';

import { useSwimBook } from '@/context/SwimBookContext';

export default function IndexRoute() {
  const { isLoggedIn } = useSwimBook();
  const rootNavigationState = useRootNavigationState();

  if (!rootNavigationState?.key) return null;

  return <Redirect href={isLoggedIn ? '/(tabs)/home' : '/onboarding'} />;
}
