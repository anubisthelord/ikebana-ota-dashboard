
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  User,
  Mail,
  Phone,
  Hotel,
  BedDouble,
  Users,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  Printer,
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
  email: string;
  phone: string;
  hotel: string;
  hotelLocation: string;
  room: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  adults: number;
  children: number;
  nights: number;
  amount: number;
  status: BookingStatus;
  paymentStatus: string;
  paymentMethod: string;
  bookedOn: string;
  specialRequests: string;
}

const bookings: Booking[] = [
  {
    id: 'BK-2026-001',
    guestName: 'Aarav Sharma',
    email: 'aarav.sharma@example.com',
    phone: '+91 98765 43210',
    hotel: 'The Grand Heritage',
    hotelLocation: 'Jaipur, Rajasthan',
    room: 'Deluxe King Room',
    checkIn: 'Nov 14, 2026',
    checkOut: 'Nov 17, 2026',
    guests: 2,
    adults: 2,
    children: 0,
    nights: 3,
    amount: 13500,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'Credit Card',
    bookedOn: 'Nov 10, 2026',
    specialRequests: 'Late check-in requested.',
  },
  {
    id: 'BK-2026-002',
    guestName: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    phone: '+1 415 555 0198',
    hotel: 'Mountain View Resort',
    hotelLocation: 'Manali, Himachal Pradesh',
    room: 'Standard Mountain View',
    checkIn: 'Nov 13, 2026',
    checkOut: 'Nov 16, 2026',
    guests: 2,
    adults: 2,
    children: 0,
    nights: 3,
    amount: 9600,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentMethod: 'UPI',
    bookedOn: 'Nov 11, 2026',
    specialRequests: 'A room with a mountain view, if available.',
  },
  {
    id: 'BK-2026-003',
    guestName: 'Rohan Mehta',
    email: 'rohan.mehta@example.com',
    phone: '+91 98111 22334',
    hotel: 'The Grand Heritage',
    hotelLocation: 'Jaipur, Rajasthan',
    room: 'Executive Suite',
    checkIn: 'Nov 12, 2026',
    checkOut: 'Nov 15, 2026',
    guests: 3,
    adults: 2,
    children: 1,
    nights: 3,
    amount: 25500,
    status: 'CHECKED_IN',
    paymentStatus: 'PAID',
    paymentMethod: 'Credit Card',
    bookedOn: 'Nov 5, 2026',
    specialRequests: 'Extra pillow requested.',
  },
  {
    id: 'BK-2026-004',
    guestName: 'Sophia Williams',
    email: 'sophia.williams@example.com',
    phone: '+44 7700 900123',
    hotel: 'The Urban Suites',
    hotelLocation: 'New Delhi, India',
    room: 'City Comfort Room',
    checkIn: 'Nov 8, 2026',
    checkOut: 'Nov 10, 2026',
    guests: 1,
    adults: 1,
    children: 0,
    nights: 2,
    amount: 5600,
    status: 'CHECKED_OUT',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    bookedOn: 'Nov 2, 2026',
    specialRequests: 'No special requests.',
  },
  {
    id: 'BK-2026-005',
    guestName: 'Kabir Malhotra',
    email: 'kabir.malhotra@example.com',
    phone: '+91 98989 12345',
    hotel: 'Coastal Breeze Hotel',
    hotelLocation: 'Goa, India',
    room: 'Premium Ocean Room',
    checkIn: 'Nov 18, 2026',
    checkOut: 'Nov 21, 2026',
    guests: 2,
    adults: 2,
    children: 0,
    nights: 3,
    amount: 18000,
    status: 'CONFIRMED',
    paymentStatus: 'PAID',
    paymentMethod: 'UPI',
    bookedOn: 'Nov 9, 2026',
    specialRequests: 'Prefer a higher-floor room.',
  },
  {
    id: 'BK-2026-006',
    guestName: 'Olivia Brown',
    email: 'olivia.brown@example.com',
    phone: '+1 212 555 0177',
    hotel: 'Mountain View Resort',
    hotelLocation: 'Manali, Himachal Pradesh',
    room: 'Premium Family Suite',
    checkIn: 'Nov 5, 2026',
    checkOut: 'Nov 7, 2026',
    guests: 4,
    adults: 2,
    children: 2,
    nights: 2,
    amount: 14400,
    status: 'CANCELLED',
    paymentStatus: 'REFUNDED',
    paymentMethod: 'Credit Card',
    bookedOn: 'Oct 28, 2026',
    specialRequests: 'Family room requested.',
  },
  {
    id: 'BK-2026-007',
    guestName: 'Vihaan Kapoor',
    email: 'vihaan.kapoor@example.com',
    phone: '+91 98770 11223',
    hotel: 'The Grand Heritage',
    hotelLocation: 'Jaipur, Rajasthan',
    room: 'Deluxe King Room',
    checkIn: 'Nov 20, 2026',
    checkOut: 'Nov 23, 2026',
    guests: 2,
    adults: 2,
    children: 0,
    nights: 3,
    amount: 13500,
    status: 'PENDING',
    paymentStatus: 'PENDING',
    paymentMethod: 'UPI',
    bookedOn: 'Nov 11, 2026',
    specialRequests: 'No special requests.',
  },
];

const statusStyles: Record<BookingStatus, string> = {
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  CHECKED_IN: 'bg-blue-50 text-blue-700',
  CHECKED_OUT: 'bg-gray-100 text-gray-600',
  CANCELLED: 'bg-red-50 text-red-700',
};

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const DetailItem = ({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) => (
  <div>
    <p className="text-xs text-gray-400 mb-1">{label}</p>
    <div className="text-sm font-medium text-gray-800">{value}</div>
  </div>
);

const SectionCard = ({
  title,
  subtitle,
  icon,
  children,
}: {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) => (
  <section className="bg-white border border-gray-100 rounded-xl">
    <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
      <div className="h-9 w-9 rounded-lg bg-gray-50 flex items-center justify-center text-gray-600">
        {icon}
      </div>
      <div>
        <h2 className="text-sm font-semibold text-gray-900">{title}</h2>
        {subtitle && (
          <p className="text-xs text-gray-400 mt-0.5">{subtitle}</p>
        )}
      </div>
    </div>
    <div className="p-5">{children}</div>
  </section>
);

const BookingDetails: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId, bookingId } = useParams<{
    vendorId: string;
    bookingId: string;
  }>();

  const booking = bookings.find((item) => item.id === bookingId);

  const handleBack = () => {
    navigate(`/vendor/${vendorId}/bookings`);
  };

  if (!booking) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <CalendarDays className="h-6 w-6 text-gray-400" />
        </div>
        <h2 className="text-lg font-semibold text-gray-900">
          Booking not found
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          This booking may have been removed or the ID is invalid.
        </p>
        <button
          onClick={handleBack}
          className="mt-5 px-4 py-2 rounded-lg bg-gray-900 text-white text-sm"
        >
          Back to bookings
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-8">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 mb-3"
          >
            <ArrowLeft size={16} />
            Back to bookings
          </button>

          <h1 className="text-2xl font-semibold text-gray-900">
            Booking Details
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Reservation information and guest details.
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Printer size={16} />
          Print booking
        </button>
      </div>

      {/* Booking summary */}
      <div className="bg-white border border-gray-100 rounded-xl p-5">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wide">
              Booking reference
            </p>
            <h2 className="text-xl font-semibold text-gray-900 mt-1">
              {booking.id}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Booked on {booking.bookedOn}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[booking.status]}`}
            >
              {booking.status.replace('_', ' ')}
            </span>
            <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
              Payment: {booking.paymentStatus}
            </span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Main content */}
        <div className="xl:col-span-2 space-y-6">
          <SectionCard
            title="Stay information"
            subtitle="Property and reservation details"
            icon={<Hotel size={18} />}
          >
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-semibold text-gray-900">
                  {booking.hotel}
                </h3>
                <p className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                  <MapPin size={14} />
                  {booking.hotelLocation}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <DetailItem
                  label="Room type"
                  value={
                    <span className="flex items-center gap-2">
                      <BedDouble size={15} className="text-gray-400" />
                      {booking.room}
                    </span>
                  }
                />
                <DetailItem
                  label="Total guests"
                  value={
                    <span className="flex items-center gap-2">
                      <Users size={15} className="text-gray-400" />
                      {booking.guests} guests
                    </span>
                  }
                />
                <DetailItem
                  label="Check-in"
                  value={booking.checkIn}
                />
                <DetailItem
                  label="Check-out"
                  value={booking.checkOut}
                />
                <DetailItem
                  label="Length of stay"
                  value={`${booking.nights} nights`}
                />
                <DetailItem
                  label="Guest breakdown"
                  value={`${booking.adults} adults, ${booking.children} children`}
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Guest information"
            subtitle="Primary guest and contact details"
            icon={<User size={18} />}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <DetailItem label="Guest name" value={booking.guestName} />
              <DetailItem
                label="Email address"
                value={
                  <span className="flex items-center gap-2 break-all">
                    <Mail size={14} className="text-gray-400 shrink-0" />
                    {booking.email}
                  </span>
                }
              />
              <DetailItem
                label="Phone number"
                value={
                  <span className="flex items-center gap-2">
                    <Phone size={14} className="text-gray-400" />
                    {booking.phone}
                  </span>
                }
              />
              <DetailItem
                label="Total guests"
                value={`${booking.guests} people`}
              />
            </div>
          </SectionCard>

          <SectionCard
            title="Special requests"
            subtitle="Additional information provided by the guest"
            icon={<Clock size={18} />}
          >
            <p className="text-sm text-gray-600 leading-6">
              {booking.specialRequests}
            </p>
          </SectionCard>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <SectionCard
            title="Payment summary"
            subtitle="Booking charges and payment method"
            icon={<CreditCard size={18} />}
          >
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Room charges</span>
                <span className="font-medium text-gray-800">
                  {formatCurrency(booking.amount)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Number of nights</span>
                <span className="font-medium text-gray-800">
                  {booking.nights}
                </span>
              </div>

              <div className="border-t border-dashed border-gray-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-semibold text-gray-900">
                    Total amount
                  </span>
                  <span className="text-xl font-bold text-gray-900">
                    {formatCurrency(booking.amount)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-3 space-y-2">
                <DetailItem
                  label="Payment method"
                  value={booking.paymentMethod}
                />
                <DetailItem
                  label="Payment status"
                  value={
                    <span
                      className={`inline-flex items-center gap-1.5 ${
                        booking.paymentStatus === 'PAID'
                          ? 'text-emerald-700'
                          : booking.paymentStatus === 'REFUNDED'
                            ? 'text-gray-600'
                            : 'text-amber-700'
                      }`}
                    >
                      {booking.paymentStatus === 'PAID' ||
                      booking.paymentStatus === 'REFUNDED' ? (
                        <CheckCircle2 size={14} />
                      ) : (
                        <Clock size={14} />
                      )}
                      {booking.paymentStatus}
                    </span>
                  }
                />
              </div>
            </div>
          </SectionCard>

          <SectionCard
            title="Booking status"
            subtitle="Current reservation status"
            icon={
              booking.status === 'CANCELLED' ? (
                <XCircle size={18} />
              ) : (
                <CheckCircle2 size={18} />
              )
            }
          >
            <div className="space-y-3">
              <span
                className={`inline-flex px-3 py-1.5 rounded-full text-xs font-semibold ${statusStyles[booking.status]}`}
              >
                {booking.status.replace('_', ' ')}
              </span>

              <p className="text-sm text-gray-500 leading-6">
                {booking.status === 'CONFIRMED' &&
                  'This reservation is confirmed. The guest is expected to arrive on the scheduled check-in date.'}
                {booking.status === 'PENDING' &&
                  'This reservation is awaiting confirmation or payment.'}
                {booking.status === 'CHECKED_IN' &&
                  'The guest has checked in and is currently staying at the property.'}
                {booking.status === 'CHECKED_OUT' &&
                  'The guest has completed the stay and checked out.'}
                {booking.status === 'CANCELLED' &&
                  'This reservation has been cancelled.'}
              </p>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
