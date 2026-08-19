import { initialBookings, initialClasses, initialLanesData, initialNotifications, initialPools, initialSwimLogs } from '@/context/mockData';
import type { ClassItem, Pool, ScreenName, UserRole } from '@/context/SwimBookContext';

type TempBooking = { pool: Pool; laneNum: number; date: string; time: string; price: number } | null;

/** Shared useS state. Keys are stable app-wide identifiers; native persistence is deliberately disabled. */
export const appStore = {
  role: { key: 'aquabook.role', value: 'member' as UserRole },
  currentScreen: { key: 'aquabook.current-screen', value: 'onboarding' as ScreenName },
  screenHistory: { key: 'aquabook.screen-history', value: [] as ScreenName[] },
  onboardingStep: { key: 'aquabook.onboarding-step', value: 0 as number },
  isLoggedIn: { key: 'aquabook.is-logged-in', value: false as boolean },
  userLevel: { key: 'aquabook.user-level', value: 'Intermediate' as 'Beginner' | 'Intermediate' | 'Advanced' },
  userName: { key: 'aquabook.user-name', value: 'Alex Nguyen' as string },
  selectedPool: { key: 'aquabook.selected-pool', value: initialPools[0] as Pool | null },
  selectedDate: { key: 'aquabook.selected-date', value: 'Mon 18' as string },
  selectedTimeSlot: { key: 'aquabook.selected-time-slot', value: '07:00 — 08:00' as string },
  selectedLaneId: { key: 'aquabook.selected-lane-id', value: 'p1-4' as string | null },
  selectedClass: { key: 'aquabook.selected-class', value: null as ClassItem | null },
  weather: { key: 'aquabook.weather', value: 'perfect' as 'perfect' | 'poor' },
  offline: { key: 'aquabook.offline', value: false as boolean },
  paymentFailure: { key: 'aquabook.payment-failure', value: false as boolean },
  tempBooking: { key: 'aquabook.temp-booking', value: null as TempBooking },
  activeTab: { key: 'aquabook.active-tab', value: 'Home' as 'Home' | 'Explore' | 'Bookings' | 'Progress' | 'Profile' },
  lanesData: { key: 'aquabook.lanes-data', value: initialLanesData },
  classes: { key: 'aquabook.classes', value: initialClasses },
  bookings: { key: 'aquabook.bookings', value: initialBookings },
  swimLogs: { key: 'aquabook.swim-logs', value: initialSwimLogs },
  notifications: { key: 'aquabook.notifications', value: initialNotifications },
} as const;
