import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { SwimBookProvider } from '@/context/SwimBookProvider';

export default function TabLayout() {
  useEffect(() => {
    SplashScreen.hideAsync().catch(() => {
      // If the native splash is already hidden, ignore the error.
    });
  }, []);

  return (
    <SwimBookProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="onboarding" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
      </Stack>
    </SwimBookProvider>
  );
}
