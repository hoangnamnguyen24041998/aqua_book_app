export interface Pool {
  id: string;
  name: string;
  rating: number;
  distance: string;
  lanesCount: number;
  type: 'Indoor' | 'Outdoor';
  openingHours: string;
  waterTemp: string;
  description: string;
  image: string;
}

export interface Lane {
  id: string;
  number: number;
  status: 'available' | 'booked' | 'maintenance' | 'selected';
}

export interface ClassItem {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  coach: string;
  schedule: string;
  capacity: number;
  enrolled: number;
  price: number;
  durationWeeks: number;
  requirements: string;
  learnPoints: string[];
}

export interface Booking {
  id: string;
  type: 'lane' | 'class';
  title: string;
  subtitle: string;
  date: string;
  time: string;
  detail: string;
  status: 'CONFIRMED' | 'PAST' | 'CANCELLED';
  price: number;
  qrCode: string;
  checkedIn: boolean;
}

export interface SwimLog {
  id: string;
  date: string;
  pool: string;
  distance: number; // in km
  laps: number;
  duration: number; // in min
  notes: string;
}

export interface Notification {
  id: string;
  title: string;
  category: 'Booking' | 'Weather' | 'Classes' | 'Achievements';
  time: string;
  unread: boolean;
  message: string;
}
