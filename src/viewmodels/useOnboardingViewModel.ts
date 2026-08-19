import { useState } from 'react';
import { useSwimBook } from '../context/SwimBookContext';

export interface OnboardingScreenData {
  title: string;
  subtitle: string;
  illustrationType: 'pool' | 'stats' | 'weather';
}

export const useOnboardingViewModel = () => {
  const { onboardingStep, setOnboardingStep, navigateTo } = useSwimBook();

  const screens: OnboardingScreenData[] = [
    {
      title: 'Your lane. Your pace.',
      subtitle: 'Discover top-tier aquatic centers and book direct-entry horizontal lanes in advance.',
      illustrationType: 'pool',
    },
    {
      title: 'Train with purpose.',
      subtitle: 'Monitor stopwatch-level swim metrics, track lap metrics, and view real-time distance visualizers.',
      illustrationType: 'stats',
    },
    {
      title: 'Swim smarter.',
      subtitle: 'Receive real-time UV indexes, water temperatures, and weather warning advisories before taking a dive.',
      illustrationType: 'weather',
    },
  ];

  const handleNext = () => {
    if (onboardingStep < screens.length - 1) {
      setOnboardingStep(onboardingStep + 1);
    } else {
      navigateTo('register');
    }
  };

  const handleSkip = () => {
    navigateTo('login');
  };

  const handleDotPress = (index: number) => {
    setOnboardingStep(index);
  };

  return {
    currentStep: onboardingStep,
    currentScreen: screens[onboardingStep],
    isLastStep: onboardingStep === screens.length - 1,
    screens,
    handleNext,
    handleSkip,
    handleDotPress,
  };
};
