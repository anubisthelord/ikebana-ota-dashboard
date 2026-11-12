
import React, { useMemo, useState } from 'react';
import {
  Search,
  CalendarCheck,
  CheckCircle2,
  Clock3,
  Eye,
  X,
  UserRound,
  Hotel,
  CreditCard,
  CalendarDays,
  MapPin,
  Users,
} from 'lucide-react';

type BookingStatus = 'CONFIRMED' | 'PENDING' | 'CANCELLED' | 'COMPLETED';
type PaymentStatus = 'PAID' | 'PENDING' | 'REFUNDED';

interface PlatformBooking {
  id: string;
  guest: string;
  email: string;
  hotel: string;
  vendor: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  rooms: number;
  amount: number;
  bookingStatus: BookingStatus;
  paymentStatus: PaymentStatus;
  bookedAt: string;
}

const initialBookings: PlatformBooking[] = [
  {
    id: 'BK-5001',
    guest: 'Rahul Sharma',
    email: 'rahul@example.com',
    hotel: 'The Grand Heritage Palace',
    vendor: 'The Grand Heritage',
    location: 'Jaipur, Rajasthan',
    checkIn: '18 Nov 2026',
    checkOut: '21 Nov 2026',
    guests: 2,
    rooms: 1,
    amount: 18500,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    bookedAt: '02 Nov 2026',
  },
  {
    id: 'BK-5002',
    guest: 'Priya Mehta',
    email: 'priya@example.com',
    hotel: 'Mountain View Retreat',
    vendor: 'Mountain View Resorts',
    location: 'Manali, Himachal Pradesh',
    checkIn: '20 Nov 2026',
    checkOut: '24 Nov 2026',
    guests: 4,
    rooms: 2,
    amount: 32000,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    bookedAt: '03 Nov 2026',
  },
  {
    id: 'BK-5003',
    guest: 'Amit Verma',
    email: 'amit@example.com',
    hotel: 'Royal Orchid Suites',
    vendor: 'Royal Orchid Hospitality',
    location: 'New Delhi',
    checkIn: '22 Nov 2026',
    checkOut: '23 Nov 2026',
    guests: 1,
    rooms: 1,
    amount: 7200,
    bookingStatus: 'PENDING',
    paymentStatus: 'PENDING',
    bookedAt: '04 Nov 2026',
  },
  {
    id: 'BK-5004',
    guest: 'Neha Kapoor',
    email: 'neha@example.com',
    hotel: 'Coastal Bay Resort',
    vendor: 'Coastal Stay Group',
    location: 'North Goa',
    checkIn: '25 Nov 2026',
    checkOut: '29 Nov 2026',
    guests: 2,
    rooms: 1,
    amount: 24500,
    bookingStatus: 'CONFIRMED',
    paymentStatus: 'PAID',
    bookedAt: '05 Nov 2026',
  },
  {
    id: 'BK-5005',
    guest: 'Karan Malhotra',
    email: 'karan@example.com',
    hotel: 'Urban Living Central',
    vendor: 'Urban Living Hotels',
    location: 'Mumbai, Maharashtra',
    checkIn: '12 Nov 2026',
    checkOut: '14 Nov 2026',
    guests: 2,
    rooms: 1,
    amount: 9800,
    bookingStatus: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    bookedAt: '01 Nov 2026',
  },
  {
    id: 'BK-5006',
    guest: 'Meera Singh',
    email: 'meera@example.com',
    hotel: 'City Comfort Chandigarh',
    vendor: 'City Comfort Properties',
    location: 'Chandigarh',
    checkIn: '08 Nov 2026',
    checkOut: '10 Nov 2026',
    guests: 2,
    rooms: 1,
    amount: 6800,
    bookingStatus: 'COMPLETED',
    paymentStatus: 'PAID',
    bookedAt: '28 Oct 2026',
  },
  {
    id: 'BK-5007',
    guest: 'Rohan Verma',
    email: 'rohan@example.com',
    hotel: 'Pine Valley Mountain Lodge',
    vendor: 'Pine Valley Retreats',
    location: 'Shimla, Himachal Pradesh',
    checkIn: '28 Nov 2026',
    checkOut: '30 Nov 2026',
    guests: 3,
    rooms: 1,
    amount: 11200,
    bookingStatus: 'PENDING',
    paymentStatus: 'PENDING',
    bookedAt: '06 Nov 2026',
  },
  {
    id: 'BK-5008',
    guest: 'Simran Kaur',
    email: 'simran@example.com',
    hotel: 'Heritage Garden Resort',
    vendor: 'The Grand Heritage',
    location: 'Udaipur, Rajasthan',
    checkIn: '15 Nov 2026',
    checkOut: '17 Nov 2026',
    guests: 2,
    rooms: 1,
    amount: 14500,
    bookingStatus: 'COMPLETED',
    paymentStatus: 'PAID',
    bookedAt: '25 Oct 2026',
  },
];

const bookingStatusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  CANCELLED: 'bg-rose-50 text-rose-700',
  COMPLETED: 'bg-blue-50 text-blue-700',
};

const paymentStatusStyles: Record<PaymentStatus, string> = {
  PAID: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  REFUNDED: 'bg-slate-100 text-slate-700',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const SuperAdminBookings: React.FC = () => {
  const [bookings] = useState(initialBookings);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [paymentFilter, setPaymentFilter] = useState('ALL');
  const [selectedBooking, setSelectedBooking] =
    useState<PlatformBooking | null>(null);

  const stats = useMemo(() => ({
    total: bookings.length,
    confirmed: bookings.filter((item) => item.bookingStatus === 'CONFIRMED').length,
    pending: bookings.filter((item) => item.bookingStatus === 'PENDING').length,
    revenue: bookings
      .filter((item) => item.paymentStatus === 'PAID')
      .reduce((sum, item) => sum + item.amount, 0),
  }), [bookings]);

  const filteredBookings = useMemo(() => {
    const term = search.toLowerCase().trim();

    return bookings.filter((booking) => {
      const matchesSearch =
        !term ||
        booking.id.toLowerCase().includes(term) ||
        booking.guest.toLowerCase().includes(term) ||
        booking.email.toLowerCase().includes(term) ||
        booking.hotel.toLowerCase().includes(term) ||
        booking.vendor.toLowerCase().includes(term);

      const matchesStatus =
        statusFilter === 'ALL' || booking.bookingStatus === statusFilter;

      const matchesPayment =
        paymentFilter === 'ALL' || booking.paymentStatus === paymentFilter;

      return matchesSearch && matchesStatus && matchesPayment;
    });
  }, [bookings, search, statusFilter, paymentFilter]);

  return (
    <div className="space-y-6">
      {/* Page heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
          Booking Management
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor bookings and payments across all platform vendors.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: 'Total Bookings',
            value: stats.total.toLocaleString('en-IN'),
            icon: CalendarCheck,
            color: 'text-gray-600',
            bg: 'bg-gray-100',
          },
          {
            label: 'Confirmed',
            value: stats.confirmed.toLocaleString('en-IN'),
            icon: CheckCircle2,
            color: 'text-emerald-600',
            bg: 'bg-emerald-50',
          },
          {
            label: 'Pending',
            value: stats.pending.toLocaleString('en-IN'),
            icon: Clock3,
            color: 'text-amber-600',
            bg: 'bg-amber-50',
          },
          {
            label: 'Collected Payments',
            value: formatCurrency(stats.revenue),
            icon: CreditCard,
            color: 'text-violet-600',
            bg: 'bg-violet-50',
          },
        ].map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <div className={`rounded-lg p-2 ${stat.bg}`}>
                  <Icon size={18} className={stat.color} />
                </div>
              </div>
              <p className="mt-3 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Bookings table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-gray-100 p-5 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="font-semibold text-gray-900">All Bookings</h2>
            <p className="mt-1 text-sm text-gray-500">
              Platform-wide reservation records.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative">
              <Search
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search booking, guest, hotel..."
                className="h-10 w-full rounded-lg border border-gray-200 pl-9 pr-3 text-sm outline-none focus:border-gray-400 sm:w-64"
              />
            </div>

            <select
              value={statusFilter}
              onChange={(event) => setStatusFilter(event.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">All booking statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CANCELLED">Cancelled</option>
              <option value="COMPLETED">Completed</option>
            </select>

            <select
              value={paymentFilter}
              onChange={(event) => setPaymentFilter(event.target.value)}
              className="h-10 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-700 outline-none focus:border-gray-400"
            >
              <option value="ALL">All payments</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="REFUNDED">Refunded</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-4">Booking</th>
                <th className="px-5 py-4">Guest</th>
                <th className="px-5 py-4">Hotel / Vendor</th>
                <th className="px-5 py-4">Stay Dates</th>
                <th className="px-5 py-4">Amount</th>
                <th className="px-5 py-4">Booking Status</th>
                <th className="px-5 py-4">Payment</th>
                <th className="px-5 py-4 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr key={booking.id} className="transition hover:bg-gray-50/70">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.id}
                    </p>
                    <p className="mt-1 text-xs text-gray-400">
                      {booking.bookedAt}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.guest}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.email}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {booking.hotel}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.vendor}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-700">{booking.checkIn}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      to {booking.checkOut}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {formatCurrency(booking.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${bookingStatusStyles[booking.bookingStatus]}`}>
                      {booking.bookingStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatusStyles[booking.paymentStatus]}`}>
                      {booking.paymentStatus}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      onClick={() => setSelectedBooking(booking)}
                      title="View booking"
                      className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 hover:text-gray-900"
                    >
                      <Eye size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-14 text-center">
                    <CalendarCheck className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-3 text-sm font-medium text-gray-700">
                      No bookings found
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Try changing your search or filters.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 px-5 py-4">
          <p className="text-xs text-gray-500">
            Showing {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>
      </section>

      {/* Booking details modal */}
      {selectedBooking && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setSelectedBooking(null)}
        >
          <div
            className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Booking Details
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {selectedBooking.id}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${bookingStatusStyles[selectedBooking.bookingStatus]}`}>
                {selectedBooking.bookingStatus}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${paymentStatusStyles[selectedBooking.paymentStatus]}`}>
                {selectedBooking.paymentStatus}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-5 border-t border-gray-100 pt-5 sm:grid-cols-2">
              <div className="flex items-start gap-3">
                <UserRound size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Guest</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedBooking.guest}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedBooking.email}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Hotel size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Hotel</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">
                    {selectedBooking.hotel}
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    {selectedBooking.vendor}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Location</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {selectedBooking.location}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CalendarDays size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Stay Dates</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {selectedBooking.checkIn} – {selectedBooking.checkOut}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Users size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Guests & Rooms</p>
                  <p className="mt-1 text-sm text-gray-800">
                    {selectedBooking.guests} guests · {selectedBooking.rooms} rooms
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <CreditCard size={17} className="mt-0.5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-400">Booking Amount</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {formatCurrency(selectedBooking.amount)}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between border-t border-gray-100 pt-5">
              <div>
                <p className="text-xs text-gray-400">Booked On</p>
                <p className="mt-1 text-sm text-gray-700">
                  {selectedBooking.bookedAt}
                </p>
              </div>
              <button
                onClick={() => setSelectedBooking(null)}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuperAdminBookings;
