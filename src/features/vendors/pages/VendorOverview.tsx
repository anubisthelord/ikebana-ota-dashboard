
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowDownRight,
  ArrowUpRight,
  Building2,
  CalendarDays,
  Clock,
  Hotel,
  Plus,
  Users,
  Wallet,
} from 'lucide-react';

import { vendorDashboardMock } from '../mocks/vendor-dashboard.mock';

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });

const statusStyles: Record<string, string> = {
  CONFIRMED: 'bg-emerald-50 text-emerald-700',
  PENDING: 'bg-amber-50 text-amber-700',
  CANCELLED: 'bg-red-50 text-red-600',
  COMPLETED: 'bg-slate-100 text-slate-600',
  ACTIVE: 'bg-emerald-50 text-emerald-700',
  INACTIVE: 'bg-slate-100 text-slate-600',
};

const VendorOverview: React.FC = () => {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();

  const { stats, bookingTrends, recentBookings, hotelPerformance, quickActions } =
    vendorDashboardMock;

  const maxBookings = Math.max(...bookingTrends.map((item) => item.bookings));

  const statIcons = [Hotel, CalendarDays, Clock, Wallet];

  const handleQuickAction = (action: string) => {
    if (!vendorId) return;

    const routes: Record<string, string> = {
      ADD_HOTEL: `/vendor/${vendorId}/hotels/new`,
      MANAGE_BOOKINGS: `/vendor/${vendorId}/bookings`,
      MANAGE_TEAM: `/vendor/${vendorId}/team`,
    };

    const route = routes[action];

    if (route) navigate(route);
  };

  return (
    <div className="space-y-7">
      {/* Page heading */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-slate-500">Vendor Portal / Overview</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">
            Dashboard Overview
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Here's what's happening with your properties.
          </p>
        </div>

        <button
          type="button"
          onClick={() => handleQuickAction('ADD_HOTEL')}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#6C4CE3] px-4 py-2.5 text-sm font-medium text-white transition hover:bg-[#5B3ACD]"
        >
          <Plus size={17} />
          Add New Hotel
        </button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = statIcons[index] ?? Building2;
          const isPositive = stat.trend === 'up';

          return (
            <div
              key={stat.id}
              className="rounded-xl border border-slate-200 bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-slate-500">{stat.label}</p>
                  <h2 className="mt-2 text-2xl font-semibold text-slate-900">
                    {stat.value}
                  </h2>
                </div>

                <div className="rounded-lg bg-[#F1EDFF] p-2.5 text-[#6C4CE3]">
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 text-xs">
                <span
                  className={`inline-flex items-center gap-1 font-medium ${
                    stat.trend === 'neutral'
                      ? 'text-slate-500'
                      : isPositive
                        ? 'text-emerald-600'
                        : 'text-red-500'
                  }`}
                >
                  {isPositive ? (
                    <ArrowUpRight size={14} />
                  ) : stat.trend === 'down' ? (
                    <ArrowDownRight size={14} />
                  ) : null}
                  {Math.abs(stat.change)}%
                </span>
                <span className="text-slate-400">{stat.changeLabel}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Booking trends and quick actions */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <section className="rounded-xl border border-slate-200 bg-white p-5 xl:col-span-2">
          <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-slate-900">
                Booking Performance
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Monthly booking activity
              </p>
            </div>

            <span className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs text-slate-600">
              January – December
            </span>
          </div>

          <div className="mt-7 flex h-56 items-end gap-2 sm:gap-3">
            {bookingTrends.map((item) => (
              <div
                key={item.month}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
                title={`${item.month}: ${item.bookings} bookings`}
              >
                <div className="flex h-full w-full items-end justify-center">
                  <div
                    className="w-full max-w-9 rounded-t-md bg-[#A895F5] transition hover:bg-[#6C4CE3]"
                    style={{
                      height: `${(item.bookings / maxBookings) * 100}%`,
                      minHeight: '4px',
                    }}
                  />
                </div>
                <span className="text-[10px] text-slate-400 sm:text-xs">
                  {item.month}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-2 border-t border-slate-100 pt-4">
            <span className="h-2.5 w-2.5 rounded-sm bg-[#A895F5]" />
            <span className="text-xs text-slate-500">Total bookings</span>
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5">
          <h2 className="font-semibold text-slate-900">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500">
            Common tasks for your business
          </p>

          <div className="mt-5 space-y-3">
            {quickActions.map((action) => {
              const Icon =
                action.action === 'ADD_HOTEL'
                  ? Plus
                  : action.action === 'MANAGE_BOOKINGS'
                    ? CalendarDays
                    : Users;

              return (
                <button
                  key={action.id}
                  type="button"
                  onClick={() => handleQuickAction(action.action)}
                  className="flex w-full items-center gap-3 rounded-lg border border-slate-100 p-3 text-left transition hover:border-[#D8CEFF] hover:bg-[#FAF9FF]"
                >
                  <span className="rounded-lg bg-[#F1EDFF] p-2 text-[#6C4CE3]">
                    <Icon size={18} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-medium text-slate-800">
                      {action.label}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {action.description}
                    </span>
                  </span>

                  <span className="text-slate-400">→</span>
                </button>
              );
            })}
          </div>
        </section>
      </div>

      {/* Recent bookings */}
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col justify-between gap-3 p-5 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">Recent Bookings</h2>
            <p className="mt-1 text-sm text-slate-500">
              Latest reservations across your properties
            </p>
          </div>

          <button
            type="button"
            onClick={() => handleQuickAction('MANAGE_BOOKINGS')}
            className="text-sm font-medium text-[#6C4CE3] hover:text-[#5235C1]"
          >
            View all bookings →
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[850px] text-left">
            <thead className="border-y border-slate-100 bg-slate-50/70">
              <tr className="text-xs font-medium uppercase tracking-wide text-slate-500">
                <th className="px-5 py-3">Booking</th>
                <th className="px-5 py-3">Guest</th>
                <th className="px-5 py-3">Property</th>
                <th className="px-5 py-3">Stay</th>
                <th className="px-5 py-3">Amount</th>
                <th className="px-5 py-3">Status</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {recentBookings.map((booking) => (
                <tr key={booking.id} className="text-sm hover:bg-slate-50/60">
                  <td className="px-5 py-4 font-medium text-slate-800">
                    {booking.bookingReference}
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-800">
                      {booking.guestName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {booking.guestEmail}
                    </p>
                  </td>

                  <td className="px-5 py-4">
                    <p className="font-medium text-slate-700">
                      {booking.hotelName}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">
                      {booking.roomName}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-xs text-slate-600">
                    {formatDate(booking.checkIn)}
                    <span className="mx-1 text-slate-300">→</span>
                    {formatDate(booking.checkOut)}
                  </td>

                  <td className="px-5 py-4 font-medium text-slate-800">
                    {formatCurrency(booking.amount)}
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[booking.status]
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Hotel performance */}
      <section className="rounded-xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-slate-900">Hotel Performance</h2>
            <p className="mt-1 text-sm text-slate-500">
              Performance overview of your properties
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(`/vendor/${vendorId}/hotels`)}
            className="text-sm font-medium text-[#6C4CE3] hover:text-[#5235C1]"
          >
            Manage hotels →
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2">
          {hotelPerformance.map((hotel) => (
            <div
              key={hotel.id}
              className="rounded-lg border border-slate-100 p-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="rounded-lg bg-[#F1EDFF] p-2.5 text-[#6C4CE3]">
                    <Building2 size={19} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-medium text-slate-800">
                      {hotel.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">
                      {hotel.location}
                    </p>
                  </div>
                </div>

                <span
                  className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${
                    statusStyles[hotel.status] ??
                    'bg-amber-50 text-amber-700'
                  }`}
                >
                  {hotel.status}
                </span>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs text-slate-400">Bookings</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {hotel.totalBookings}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Occupancy</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {hotel.occupancyRate}%
                  </p>
                </div>

                <div>
                  <p className="text-xs text-slate-400">Revenue</p>
                  <p className="mt-1 text-sm font-semibold text-slate-800">
                    {formatCurrency(hotel.revenue)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default VendorOverview;
