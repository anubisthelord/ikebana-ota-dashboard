
export interface DashboardStat {
    id: string;
    label: string;
    value: string;
    change: number;
    changeLabel: string;
    trend: 'up' | 'down' | 'neutral';
  }
  
  export interface BookingTrend {
    month: string;
    bookings: number;
    revenue: number;
  }
  
  export type BookingStatus =
    | 'CONFIRMED'
    | 'PENDING'
    | 'CANCELLED'
    | 'COMPLETED';
  
  export interface RecentBooking {
    id: string;
    bookingReference: string;
    guestName: string;
    guestEmail: string;
    hotelName: string;
    roomName: string;
    checkIn: string;
    checkOut: string;
    amount: number;
    status: BookingStatus;
  }
  
  export interface HotelPerformance {
    id: string;
    name: string;
    location: string;
    image?: string;
    totalBookings: number;
    occupancyRate: number;
    revenue: number;
    status: 'ACTIVE' | 'INACTIVE' | 'PENDING';
  }
  
  export interface QuickAction {
    id: string;
    label: string;
    description: string;
    action: string;
  }
  
  export interface VendorDashboardData {
    stats: DashboardStat[];
    bookingTrends: BookingTrend[];
    recentBookings: RecentBooking[];
    hotelPerformance: HotelPerformance[];
    quickActions: QuickAction[];
  }
  