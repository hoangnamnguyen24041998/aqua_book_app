import { Redirect, Tabs } from 'expo-router';

import { Colors } from '@/constants/theme';
import { TabIcon } from '@/components/swimbook/TabIcon';
import { useSwimBook } from '@/context/SwimBookContext';

export default function TabsLayout() {
  const { isLoggedIn } = useSwimBook();
  if (!isLoggedIn) return <Redirect href="/login" />;
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.light.brand,
        tabBarInactiveTintColor: Colors.light.textSecondary,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          borderTopColor: Colors.light.border,
        },
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
      }}
    >
      <Tabs.Screen name="home" options={{ title: 'Home', tabBarIcon: ({ color, focused }) => <TabIcon name="home" color={color} focused={focused} /> }} />
      <Tabs.Screen name="explore" options={{ title: 'Explore', tabBarIcon: ({ color, focused }) => <TabIcon name="explore" color={color} focused={focused} /> }} />
      <Tabs.Screen name="bookings" options={{ title: 'Bookings', tabBarIcon: ({ color, focused }) => <TabIcon name="bookings" color={color} focused={focused} /> }} />
      <Tabs.Screen name="progress" options={{ title: 'Progress', tabBarIcon: ({ color, focused }) => <TabIcon name="progress" color={color} focused={focused} /> }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile', tabBarIcon: ({ color, focused }) => <TabIcon name="profile" color={color} focused={focused} /> }} />
    </Tabs>
  );
}
