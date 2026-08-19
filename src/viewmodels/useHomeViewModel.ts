import { useSwimBook } from '../context/SwimBookContext';

export const useHomeViewModel = () => {
  const {
    userName,
    bookings,
    classes,
    weatherState,
    toggleWeather,
    navigateTo,
    setActiveTab,
  } = useSwimBook();

  // Find the closest upcoming booking
  const todaySession = bookings.find(
    (b) => b.status === 'CONFIRMED' && b.type === 'lane'
  );

  // Find the closest class booking or intermediate / advanced classes
  const upcomingClass = bookings.find(
    (b) => b.status === 'CONFIRMED' && b.type === 'class'
  ) || {
    title: 'Freestyle Fundamentals',
    subtitle: 'Intermediate · Tomorrow · 6:30 PM',
    detail: 'Coach Minh',
  };

  const progressSnapshot = {
    distance: '3.8 km',
    laps: '84 laps',
    duration: '2h 12m',
  };

  const handleQuickAction = (action: 'lane' | 'class' | 'explore') => {
    if (action === 'lane') {
      setActiveTab('Explore');
    } else if (action === 'class') {
      navigateTo('classList');
    } else {
      setActiveTab('Explore');
    }
  };

  return {
    userName,
    todaySession,
    weatherState,
    toggleWeather,
    upcomingClass,
    progressSnapshot,
    handleQuickAction,
    navigateTo,
  };
};
