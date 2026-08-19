import React, { createContext, useContext, useState } from 'react';

export type UserRole = 'member' | 'admin';
export type ScreenName =
  | 'onboarding' | 'login' | 'register' | 'memberHome' | 'explore' | 'poolDetail'
  | 'laneBooking' | 'classList' | 'classDetail' | 'checkout' | 'confirmation'
  | 'bookings' | 'progress' | 'addSwimLog' | 'profile' | 'notifications'
  | 'adminDashboard' | 'adminLanes' | 'adminClasses' | 'adminCheckIn';

export interface Pool {
  id: string; name: string; rating: number; distance: string; lanesCount: number;
  type: 'Indoor' | 'Outdoor'; openingHours: string; waterTemp: string; description: string; image: string;
}
export interface Lane {
  id: string; number: number; status: 'available' | 'booked' | 'maintenance' | 'selected';
}
export interface ClassItem {
  id: string; name: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; coach: string;
  schedule: string; capacity: number; enrolled: number; price: number; durationWeeks: number;
  requirements: string; learnPoints: string[];
}
export interface Booking {
  id: string; type: 'lane' | 'class'; title: string; subtitle: string; date: string;
  time: string; detail: string; status: 'CONFIRMED' | 'PAST' | 'CANCELLED'; price: number; qrCode: string; checkedIn: boolean;
}
export interface SwimLog {
  id: string; date: string; pool: string; distance: number; laps: number; duration: number; notes: string;
}
export interface Notification {
  id: string; title: string; category: 'Booking' | 'Weather' | 'Classes' | 'Achievements'; time: string; unread: boolean; message: string;
}

interface SwimBookContextType {
  role: UserRole; currentScreen: ScreenName; onboardingStep: number; isLoggedIn: boolean;
  userLevel: 'Beginner' | 'Intermediate' | 'Advanced'; userName: string; pools: Pool[];
  selectedPool: Pool | null; selectedDate: string; selectedTimeSlot: string; selectedLaneId: string | null;
  selectedClass: ClassItem | null; bookings: Booking[]; swimLogs: SwimLog[]; notifications: Notification[];
  weatherState: 'perfect' | 'poor'; offlineState: boolean; paymentFailureSim: boolean;
  tempBooking: { pool: Pool; laneNum: number; date: string; time: string; price: number } | null;
  activeTab: 'Home' | 'Explore' | 'Bookings' | 'Progress' | 'Profile';
  lanesData: Record<string, Lane[]>; classes: ClassItem[];
  setRole: (role: UserRole) => void; navigateTo: (screen: ScreenName) => void; goBack: () => void;
  setOnboardingStep: (step: number) => void; login: (email: string) => void;
  register: (name: string, email: string, level: 'Beginner' | 'Intermediate' | 'Advanced') => void; logout: () => void;
  setSelectedPool: (pool: Pool | null) => void; setSelectedDate: (date: string) => void;
  setSelectedTimeSlot: (slot: string) => void; setSelectedLaneId: (laneId: string | null) => void;
  setSelectedClass: (cls: ClassItem | null) => void; initiateBooking: (pool: Pool, laneNum: number, date: string, time: string, price: number) => void;
  completePayment: () => boolean; enrollInClass: (cls: ClassItem) => { success: boolean; error?: string };
  cancelBooking: (id: string) => void; addSwimLog: (log: Omit<SwimLog, 'id'>) => void;
  toggleWeather: () => void; toggleOffline: () => void; togglePaymentFailureSim: () => void;
  markNotificationRead: (id: string) => void; clearAllNotifications: () => void;
  setActiveTab: (tab: 'Home' | 'Explore' | 'Bookings' | 'Progress' | 'Profile') => void;
  checkInBooking: (id: string) => boolean; updateLaneStatus: (laneId: string, status: Lane['status']) => void;
}

export const SwimBookContext = createContext<SwimBookContextType | undefined>(undefined);
export const useSwimBook = () => {
  const context = useContext(SwimBookContext);
  if (!context) throw new Error('useSwimBook error');
  return context;
};