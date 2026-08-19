import React from 'react';
import { useS } from 'use-s-react';
import { SwimBookContext, Pool, Lane, ClassItem, Booking, SwimLog, Notification, UserRole, ScreenName } from './SwimBookContext';
import { initialPools } from './mockData';
import { appStore } from '@/state/store';

export const SwimBookProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRoleState] = useS(appStore.role); const [currentScreen, setCurrentScreen] = useS(appStore.currentScreen); const [screenHistory, setScreenHistory] = useS(appStore.screenHistory); const [onboardingStep, setOnboardingStep] = useS(appStore.onboardingStep); const [isLoggedIn, setIsLoggedIn] = useS(appStore.isLoggedIn); const [userLevel, setUserLevel] = useS(appStore.userLevel); const [userName, setUserName] = useS(appStore.userName); const [selectedPool, setSelectedPool] = useS(appStore.selectedPool); const [selectedDate, setSelectedDate] = useS(appStore.selectedDate); const [selectedTimeSlot, setSelectedTimeSlot] = useS(appStore.selectedTimeSlot); const [selectedLaneId, setSelectedLaneId] = useS(appStore.selectedLaneId); const [selectedClass, setSelectedClass] = useS(appStore.selectedClass); const [weatherState, setWeatherState] = useS(appStore.weather); const [offlineState, setOfflineState] = useS(appStore.offline); const [paymentFailureSim, setPaymentFailureSim] = useS(appStore.paymentFailure); const [tempBooking, setTempBooking] = useS(appStore.tempBooking); const [activeTab, setActiveTabState] = useS(appStore.activeTab); const [lanesData, setLanesData] = useS(appStore.lanesData); const [classes, setClasses] = useS(appStore.classes); const [bookings, setBookings] = useS(appStore.bookings); const [swimLogs, setSwimLogs] = useS(appStore.swimLogs); const [notifications, setNotifications] = useS(appStore.notifications);

  const setRole = (r: UserRole) => {
    setRoleState(r); setScreenHistory([]);
    setCurrentScreen(r === 'admin' ? 'adminDashboard' : 'memberHome');
    if (r === 'member') setActiveTabState('Home');
  };

  const navigateTo = (s: ScreenName) => {
    setScreenHistory((p) => [...p, currentScreen]); setCurrentScreen(s);
    if (s === 'memberHome') setActiveTabState('Home');
    else if (s === 'explore') setActiveTabState('Explore');
    else if (s === 'bookings') setActiveTabState('Bookings');
    else if (s === 'progress') setActiveTabState('Progress');
    else if (s === 'profile') setActiveTabState('Profile');
  };

  const goBack = () => {
    if (screenHistory.length > 0) {
      const prev = screenHistory[screenHistory.length - 1];
      setScreenHistory((ph) => ph.slice(0, -1)); setCurrentScreen(prev);
    } else navigateTo(role === 'admin' ? 'adminDashboard' : 'memberHome');
  };

  const setActiveTab = (tab: 'Home' | 'Explore' | 'Bookings' | 'Progress' | 'Profile') => {
    setActiveTabState(tab); setScreenHistory([]);
    if (tab === 'Home') setCurrentScreen('memberHome');
    else if (tab === 'Explore') setCurrentScreen('explore');
    else if (tab === 'Bookings') setCurrentScreen('bookings');
    else if (tab === 'Progress') setCurrentScreen('progress');
    else if (tab === 'Profile') setCurrentScreen('profile');
  };

  const login = (e: string) => { setIsLoggedIn(true); setUserName(e.split('@')[0] || 'Alex'); navigateTo('memberHome'); };
  const register = (n: string, e: string, lvl: 'Beginner' | 'Intermediate' | 'Advanced') => { setIsLoggedIn(true); setUserName(n); setUserLevel(lvl); navigateTo('memberHome'); };
  const logout = () => { setIsLoggedIn(false); setScreenHistory([]); setCurrentScreen('login'); };
  const initiateBooking = (pool: Pool, laneNum: number, date: string, time: string, price: number) => { setTempBooking({ pool, laneNum, date, time, price }); navigateTo('checkout'); };

  const completePayment = (): boolean => {
    if (paymentFailureSim) return false;
    if (tempBooking) {
      const newB: Booking = { id: `bl-${Date.now()}`, type: 'lane', title: tempBooking.pool.name, subtitle: `Lane ${tempBooking.laneNum} — 60 min`, date: tempBooking.date, time: tempBooking.time, detail: `Water ${tempBooking.pool.waterTemp} · ${tempBooking.pool.type}`, status: 'CONFIRMED', price: tempBooking.price, qrCode: `SB-LN${tempBooking.laneNum}-${Date.now().toString().slice(-4)}`, checkedIn: false };
      setBookings((prev) => [newB, ...prev]);
      setNotifications((prev) => [{ id: `notif-${Date.now()}`, title: 'Booking Confirmed!', category: 'Booking', time: 'Just now', unread: true, message: `Your booking for Lane ${tempBooking.laneNum} at ${tempBooking.pool.name} on ${tempBooking.date} is confirmed!` }, ...prev]);
      setLanesData((prev) => {
        const u = (prev[tempBooking.pool.id] || []).map((l) => l.number === tempBooking.laneNum ? { ...l, status: 'booked' as const } : l);
        return { ...prev, [tempBooking.pool.id]: u };
      });
      setTempBooking(null); navigateTo('confirmation'); return true;
    }
    return false;
  };

  const enrollInClass = (cls: ClassItem): { success: boolean; error?: string } => {
    if (cls.level === 'Advanced' && userLevel === 'Beginner') return { success: false, error: 'Requires Intermediate level or higher.' };
    if (cls.level === 'Intermediate' && userLevel === 'Beginner') return { success: false, error: 'Requires Intermediate level completion.' };
    if (cls.enrolled >= cls.capacity) return { success: false, error: 'This class is currently fully booked.' };
    const newB: Booking = { id: `bc-${Date.now()}`, type: 'class', title: cls.name, subtitle: `${cls.level} Class · Coach ${cls.coach}`, date: 'Starts Tomorrow', time: cls.schedule, detail: `${cls.durationWeeks} weeks course`, status: 'CONFIRMED', price: cls.price, qrCode: `SB-CLS-${cls.id.toUpperCase()}-${Date.now().toString().slice(-4)}`, checkedIn: false };
    setBookings((prev) => [newB, ...prev]);
    setClasses((prev) => prev.map((c) => c.id === cls.id ? { ...c, enrolled: c.enrolled + 1 } : c));
    setNotifications((prev) => [{ id: `notif-${Date.now()}`, title: `Enrolled in ${cls.name}!`, category: 'Classes', time: 'Just now', unread: true, message: `Successfully registered for ${cls.name}.` }, ...prev]);
    setTempBooking({ pool: initialPools[0], laneNum: 0, date: 'Tomorrow', time: cls.schedule, price: cls.price });
    navigateTo('confirmation'); return { success: true };
  };

  const cancelBooking = (id: string) => setBookings((prev) => prev.map((b) => b.id === id ? { ...b, status: 'CANCELLED' as const } : b));
  const addSwimLog = (log: Omit<SwimLog, 'id'>) => setSwimLogs((prev) => [{ id: `log-${Date.now()}`, ...log }, ...prev]);

  const toggleWeather = () => {
    setWeatherState((prev) => {
      const next = prev === 'perfect' ? 'poor' : 'perfect';
      if (next === 'poor') {
        setNotifications((p) => [{ id: `notif-weather-${Date.now()}`, title: 'Alert: Poor Conditions', category: 'Weather', time: 'Just now', unread: true, message: 'Water temp dropped and lightning alerts detected.' }, ...p]);
      }
      return next;
    });
  };

  const toggleOffline = () => setOfflineState((p) => !p);
  const togglePaymentFailureSim = () => setPaymentFailureSim((p) => !p);
  const markNotificationRead = (id: string) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, unread: false } : n));
  const clearAllNotifications = () => setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  const checkInBooking = (id: string) => {
    let s = false;
    setBookings((prev) => prev.map((b) => { if (b.id === id) { s = true; return { ...b, checkedIn: true }; } return b; }));
    return s;
  };

  const updateLaneStatus = (laneId: string, status: Lane['status']) => {
    setLanesData((prev) => {
      const updated = { ...prev };
      Object.keys(updated).forEach((k) => { updated[k] = updated[k].map((l) => l.id === laneId ? { ...l, status } : l); });
      return updated;
    });
  };

  return (
    <SwimBookContext.Provider
      value={{
        role, currentScreen, onboardingStep, isLoggedIn, userLevel, userName, pools: initialPools, selectedPool,
        selectedDate, selectedTimeSlot, selectedLaneId, selectedClass, bookings, swimLogs, notifications,
        weatherState, offlineState, paymentFailureSim, tempBooking, activeTab, lanesData, classes,
        setRole, navigateTo, goBack, setOnboardingStep, login,
        register, logout, setSelectedPool, setSelectedDate, setSelectedTimeSlot,
        setSelectedLaneId, setSelectedClass, initiateBooking, completePayment,
        enrollInClass, cancelBooking, addSwimLog, toggleWeather,
        toggleOffline, togglePaymentFailureSim, markNotificationRead, clearAllNotifications,
        setActiveTab, checkInBooking, updateLaneStatus
      }}
    >
      {children}
    </SwimBookContext.Provider>
  );
};
