/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import '@/global.css';

import { Platform } from 'react-native';

export const Colors = {
  light: {
    text: '#0A2E36', // Deep Pool
    background: '#F3FAF9', // Pool Mist
    backgroundElement: '#E5F2F0', // Light pool element
    backgroundSelected: '#D2ECE7', // Selected light teal
    textSecondary: '#4A6D74', // Muted Deep Pool
    brand: '#147D7D', // Water Teal
    accent: '#5FD1C6', // Sunlit Aqua
    alert: '#FF6B4A', // Buoy Coral
    white: '#FFFFFF',
    border: '#D0E3E0',
  },
  dark: {
    text: '#F3FAF9', // Pool Mist
    background: '#0A2E36', // Deep Pool
    backgroundElement: '#103F49', // Dark aquatic element
    backgroundSelected: '#16505D', // Selected dark teal
    textSecondary: '#8CAFB6', // Lighter teal-gray
    brand: '#147D7D', // Water Teal
    accent: '#5FD1C6', // Sunlit Aqua
    alert: '#FF6B4A', // Buoy Coral
    white: '#FFFFFF',
    border: '#1E505B',
  },
} as const;

export type ThemeColor = keyof typeof Colors.light & keyof typeof Colors.dark;

export const Fonts = Platform.select({
  ios: {
    sans: 'Inter',
    display: 'Space Grotesk',
    rounded: 'SF Pro Rounded',
    mono: 'JetBrains Mono',
  },
  android: {
    sans: 'sans-serif',
    display: 'sans-serif-medium',
    rounded: 'sans-serif',
    mono: 'monospace',
  },
  web: {
    sans: 'var(--font-sans)',
    display: 'var(--font-display)',
    rounded: 'var(--font-rounded)',
    mono: 'var(--font-mono)',
  },
  default: {
    sans: 'normal',
    display: 'normal',
    rounded: 'normal',
    mono: 'monospace',
  },
});

export const Spacing = {
  half: 2,
  one: 4,
  two: 8,
  three: 16,
  four: 24,
  five: 32,
  six: 64,
} as const;

export const BottomTabInset = Platform.select({ ios: 50, android: 80 }) ?? 0;
export const MaxContentWidth = 800;
