import { Pool, Lane, ClassItem, Booking, SwimLog, Notification } from './SwimBookContext';

export const initialPools: Pool[] = [
  { id: 'p1', name: 'District 1 Aquatic Center', rating: 4.8, distance: '1.2 km', lanesCount: 8, type: 'Indoor', openingHours: '05:30 — 21:00', waterTemp: '28°C', image: 'district-aquatic', description: 'Olympic-standard lanes in the city center, with a quiet early-morning window.' },
  { id: 'p2', name: 'Sunrise Marina Club', rating: 4.6, distance: '3.5 km', lanesCount: 6, type: 'Outdoor', openingHours: '06:00 — 20:00', waterTemp: '27°C', image: 'sunrise-marina', description: 'Heated outdoor lanes, lounge decks, and a relaxed marina-facing pace.' },
  { id: 'p3', name: 'Thao Dien Swim Lab', rating: 4.9, distance: '5.1 km', lanesCount: 4, type: 'Indoor', openingHours: '06:00 — 22:00', waterTemp: '29°C', image: 'thao-dien-lab', description: 'Technique-focused sessions with a compact, premium training pool.' }
];

export const initialLanesData: Record<string, Lane[]> = {
  'p1': [
    { id: 'p1-1', number: 1, status: 'available' }, { id: 'p1-2', number: 2, status: 'booked' },
    { id: 'p1-3', number: 3, status: 'available' }, { id: 'p1-4', number: 4, status: 'selected' },
    { id: 'p1-5', number: 5, status: 'available' }, { id: 'p1-6', number: 6, status: 'maintenance' },
    { id: 'p1-7', number: 7, status: 'booked' }, { id: 'p1-8', number: 8, status: 'available' }
  ],
  'p2': [
    { id: 'p2-1', number: 1, status: 'booked' }, { id: 'p2-2', number: 2, status: 'available' },
    { id: 'p2-3', number: 3, status: 'maintenance' }, { id: 'p2-4', number: 4, status: 'available' },
    { id: 'p2-5', number: 5, status: 'available' }, { id: 'p2-6', number: 6, status: 'booked' }
  ],
  'p3': [
    { id: 'p3-1', number: 1, status: 'available' }, { id: 'p3-2', number: 2, status: 'available' },
    { id: 'p3-3', number: 3, status: 'booked' }, { id: 'p3-4', number: 4, status: 'available' }
  ]
};

export const initialClasses: ClassItem[] = [
  { id: 'c1', name: 'Freestyle Fundamentals', level: 'Beginner', coach: 'Coach Minh', schedule: '6:30 PM · Tue / Thu', capacity: 10, enrolled: 8, price: 350000, durationWeeks: 6, requirements: 'No experience required', learnPoints: ['Body rotation', 'Bilateral breathing', 'Flutter kicks'] },
  { id: 'c2', name: 'Advanced Freestyle', level: 'Advanced', coach: 'Coach Minh Nguyen', schedule: '6:30 PM · Tue / Thu', capacity: 8, enrolled: 5, price: 500000, durationWeeks: 8, requirements: 'Intermediate level completed', learnPoints: ['High-elbow catch', 'Flip turns', 'Streamlining'] },
  { id: 'c4', name: 'Toddler Water Safety', level: 'Beginner', coach: 'Coach Linh Hoang', schedule: '4:00 PM · Wed', capacity: 10, enrolled: 10, price: 250000, durationWeeks: 4, requirements: 'Parent participation', learnPoints: ['Water comfort', 'Back float survival'] },
  { id: 'c5', name: 'Endurance Set Lab', level: 'Intermediate', coach: 'Coach Thanh', schedule: '7:00 AM · Sat', capacity: 12, enrolled: 7, price: 420000, durationWeeks: 5, requirements: 'Comfortable swimming 800m', learnPoints: ['CSS pacing', 'Efficient turns', 'Aerobic capacity'] }
];

export const initialBookings: Booking[] = [
  { id: 'b1', type: 'lane', title: 'District 1 Aquatic Center', subtitle: 'Lane 4 — 60 min session', date: 'Wed, Aug 20', time: '07:00 — 08:00', detail: 'Outdoor 27°C · UV 4', status: 'CONFIRMED', price: 120000, qrCode: 'SB-LN4-D1-0820', checkedIn: false },
  { id: 'b2', type: 'lane', title: 'Sunrise Marina Club', subtitle: 'Lane 2 — 60 min session', date: 'Aug 16, 2026', time: '08:00 — 09:00', detail: 'Outdoor pool 26°C', status: 'PAST', price: 100000, qrCode: 'SB-LN2-SM-0816', checkedIn: true }
];

export const initialSwimLogs: SwimLog[] = [
  { id: 'l1', date: 'Today', pool: 'District 1 Aquatic Center', distance: 1.2, laps: 32, duration: 48, notes: 'Felt highly energetic. Maintained a 2:00 pace.' },
  { id: 'l2', date: 'Aug 16', pool: 'Sunrise Marina Club', distance: 1.0, laps: 28, duration: 42, notes: 'Gentle aerobic breathing.' }
];

export const initialNotifications: Notification[] = [
  { id: 'n1', title: 'Your Lane 4 session starts in 1 hour.', category: 'Booking', time: '1h ago', unread: true, message: 'Your lane booking starts at 07:00 AM. Please present your check-in QR code.' },
  { id: 'n2', title: 'Outdoor pool conditions may be poor today.', category: 'Weather', time: '3h ago', unread: true, message: 'Gusty winds and potential showers are forecasted near Sunrise Marina.' },
  { id: 'n3', title: 'Advanced Freestyle has 2 spots remaining.', category: 'Classes', time: '1d ago', unread: true, message: 'Register for Coach Minh Nguyens class before slots sell out.' }
];
