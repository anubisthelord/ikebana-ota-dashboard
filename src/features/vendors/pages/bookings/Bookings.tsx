
import React, { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Search,
  CalendarDays,
  Users,
  IndianRupee,
  Eye,
  ChevronDown,
  Download,
  SlidersHorizontal,
} from 'lucide-react';

type BookingStatus =
  | 'CONFIRMED'
  | 'PENDING'
  | 'CHECKED_IN'
  | 'CHECKED_OUT'
  | 'CANCELLED';

interface Booking {
  id: string;
  guestName: string;
  guestEmail: string;
  hotel: string;
  roomType: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  amount: number;
  status: BookingStatus;
}

const bookings: Booking[] = [
  {
    id: 'BK-2026-001',
    guestName: 'Aarav Sharma',
    guestEmail: 'aarav@example.com',
    hotel: 'The Grand Heritage',
    roomType: 'Deluxe King Room',
    checkIn: '2026-11-14',
    checkOut: '2026-11-17',
    guests: 2,
    amount: 13500,
    status: 'CONFIRMED',
  },
  {
    id: 'BK-2026-002',
    guestName: 'Emily Johnson',
    guestEmail: 'emily@example.com',
    hotel: 'Mountain View Resort',
    roomType: 'Standard Mountain View',
    checkIn: '2026-11-13',
    checkOut: '2026-11-16',
    guests: 2,
    amount: 9600,
    status: 'PENDING',
  },
  {
    id: 'BK-2026-003',
    guestName: 'Rohan Mehta',
    guestEmail: 'rohan@example.com',
    hotel: 'The Grand Heritage',
    roomType: 'Executive Suite',
    checkIn: '2026-11-12',
    checkOut: '2026-11-15',
    guests: 3,
    amount: 25500,
    status: 'CHECKED_IN',
  },
  {
    id: 'BK-2026-004',
    guestName: 'Sophia Williams',
    guestEmail: 'sophia@example.com',
    hotel: 'The Urban Suites',
    roomType: 'City Comfort Room',
    checkIn: '2026-11-08',
    checkOut: '2026-11-10',
    guests: 1,
    amount: 5600,
    status: 'CHECKED_OUT',
  },
  {
    id: 'BK-2026-005',
    guestName: 'Kabir Malhotra',
    guestEmail: 'kabir@example.com',
    hotel: 'Coastal Breeze Hotel',
    roomType: 'Premium Ocean Room',
    checkIn: '2026-11-18',
    checkOut: '2026-11-21',
    guests: 2,
    amount: 18000,
    status: 'CONFIRMED',
  },
  {
    id: 'BK-2026-006',
    guestName: 'Olivia Brown',
    guestEmail: 'olivia@example.com',
    hotel: 'Mountain View Resort',
    roomType: 'Premium Family Suite',
    checkIn: '2026-11-05',
    checkOut: '2026-11-07',
    guests: 4,
    amount: 14400,
    status: 'CANCELLED',
  },
  {
    id: 'BK-2026-007',
    guestName: 'Vihaan Kapoor',
    guestEmail: 'vihaan@example.com',
    hotel: 'The Grand Heritage',
    roomType: 'Deluxe King Room',
    checkIn: '2026-11-20',
    checkOut: '2026-11-23',
    guests: 2,
    amount: 13500,
    status: 'PENDING',
  },
];

const statusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-green-50 text-green-700',
  PENDING: 'bg-amber-50 text-amber-700',
  CHECKED_IN: 'bg-blue-50 text-blue-700',
  CHECKED_OUT: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-50 text-red-700',
};

const formatDate = (date: string) =>
  new Date(`${date}T00:00:00`).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const formatPrice = (amount: number) =>
  `₹${amount.toLocaleString('en-IN')}`;

const Bookings: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [hotelFilter, setHotelFilter] = useState('ALL');

  const hotels = useMemo(
    () => [...new Set(bookings.map((booking) => booking.hotel))],
    [],
  );

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        booking.id.toLowerCase().includes(searchValue) ||
        booking.guestName.toLowerCase().includes(searchValue) ||
        booking.guestEmail.toLowerCase().includes(searchValue) ||
        booking.hotel.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === 'ALL' || booking.status === statusFilter;

      const matchesHotel =
        hotelFilter === 'ALL' || booking.hotel === hotelFilter;

      return matchesSearch && matchesStatus && matchesHotel;
    });
  }, [search, statusFilter, hotelFilter]);

  const totalRevenue = bookings
    .filter((booking) => booking.status !== 'CANCELLED')
    .reduce((total, booking) => total + booking.amount, 0);

  const stats = [
    {
      label: 'Total Bookings',
      value: bookings.length.toString(),
      icon: CalendarDays,
    },
    {
      label: 'Confirmed',
      value: bookings
        .filter((booking) => booking.status === 'CONFIRMED').length
        .toString(),
      icon: CalendarDays,
    },
    {
      label: 'Currently Checked In',
      value: bookings
        .filter((booking) => booking.status === 'CHECKED_IN').length
        .toString(),
      icon: Users,
    },
    {
      label: 'Booking Value',
      value: formatPrice(totalRevenue),
      icon: IndianRupee,
    },
  ];

  const handleViewBooking = (bookingId: string) => {
    if (!vendorId) return;

    navigate(`/vendor/${vendorId}/bookings/${bookingId}`);
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Bookings
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage reservations and track guest stays across your properties.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            // Export functionality can be connected later.
          }}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
        >
          <Download size={16} />
          Export
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-gray-200 bg-white p-5"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-500">{stat.label}</p>
                <Icon size={18} className="text-gray-400" />
              </div>

              <p className="mt-3 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <section className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative min-w-0 flex-1">
            <Search
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search booking ID, guest or hotel..."
              className="w-full rounded-lg border border-gray-200 py-2.5 pl-10 pr-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-gray-400"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={15}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-9 pr-9 text-sm text-gray-700 outline-none focus:border-gray-400 lg:w-48"
            >
              <option value="ALL">All statuses</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="PENDING">Pending</option>
              <option value="CHECKED_IN">Checked In</option>
              <option value="CHECKED_OUT">Checked Out</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <div className="relative">
            <select
              value={hotelFilter}
              onChange={(e) => setHotelFilter(e.target.value)}
              className="w-full appearance-none rounded-lg border border-gray-200 bg-white py-2.5 pl-3 pr-9 text-sm text-gray-700 outline-none focus:border-gray-400 lg:w-52"
            >
              <option value="ALL">All properties</option>
              {hotels.map((hotel) => (
                <option key={hotel} value={hotel}>
                  {hotel}
                </option>
              ))}
            </select>
            <ChevronDown
              size={15}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
        </div>
      </section>

      {/* Booking table */}
      <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
          <div>
            <h2 className="font-semibold text-gray-900">
              All Reservations
            </h2>
            <p className="mt-1 text-xs text-gray-500">
              Showing {filteredBookings.length} of {bookings.length} bookings
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead className="bg-gray-50">
              <tr className="text-xs font-medium uppercase tracking-wide text-gray-500">
                <th className="px-5 py-3">Booking</th>
                <th className="px-5 py-3">Guest</th>
                <th className="px-5 py-3">Property / Room</th>
                <th className="px-5 py-3">Stay</th>
                <th className="px-5 py-3">Guests</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition hover:bg-gray-50/70"
                >
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.id}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {booking.guestName}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.guestEmail}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-gray-800">
                      {booking.hotel}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {booking.roomType}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="text-sm text-gray-800">
                      {formatDate(booking.checkIn)}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      to {formatDate(booking.checkOut)}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-gray-700">
                    {booking.guests}
                  </td>

                  <td className="px-5 py-4 text-sm font-medium text-gray-900">
                    {formatPrice(booking.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusStyles[booking.status]}`}
                    >
                      {booking.status.replace('_', ' ')}
                    </span>
                  </td>

                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleViewBooking(booking.id)}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-100"
                    >
                      <Eye size={14} />
                      View
                    </button>
                  </td>
                </tr>
              ))}

              {filteredBookings.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-5 py-14 text-center">
                    <CalendarDays
                      size={28}
                      className="mx-auto mb-3 text-gray-300"
                    />
                    <p className="text-sm font-medium text-gray-800">
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
      </section>
    </div>
  );
};

export default Bookings;
