
import React from 'react';
import {
  Building2,
  Hotel,
  CalendarCheck,
  IndianRupee,
  ArrowUpRight,
  ArrowDownRight,
  Clock3,
  CheckCircle2,
  AlertCircle,
  Users,
  Activity,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Vendors',
    value: '248',
    change: '+12.8%',
    positive: true,
    description: 'Compared with last month',
    icon: Building2,
    iconStyle: 'bg-[#F0EDFF] text-[#8065C9]',
  },
  {
    label: 'Active Hotels',
    value: '684',
    change: '+8.4%',
    positive: true,
    description: 'Across all vendors',
    icon: Hotel,
    iconStyle: 'bg-[#EAF4FF] text-[#5485C9]',
  },
  {
    label: 'Total Bookings',
    value: '12,486',
    change: '+16.2%',
    positive: true,
    description: 'Platform-wide bookings',
    icon: CalendarCheck,
    iconStyle: 'bg-[#EAF8F1] text-[#26966B]',
  },
  {
    label: 'Platform Revenue',
    value: '₹48.6L',
    change: '+5.7%',
    positive: true,
    description: 'Current month',
    icon: IndianRupee,
    iconStyle: 'bg-[#FFF5EB] text-[#C58A4C]',
  },
];

const monthlyBookings = [
  { month: 'May', bookings: 420 },
  { month: 'Jun', bookings: 560 },
  { month: 'Jul', bookings: 490 },
  { month: 'Aug', bookings: 680 },
  { month: 'Sep', bookings: 610 },
  { month: 'Oct', bookings: 790 },
  { month: 'Nov', bookings: 920 },
];

const vendorApplications = [
  {
    id: 'VN-1024',
    name: 'Royal Orchid Hospitality',
    owner: 'Amit Sharma',
    email: 'amit@royalorchid.example',
    date: '12 Nov 2026',
    status: 'PENDING',
  },
  {
    id: 'VN-1023',
    name: 'Mountain Escape Resorts',
    owner: 'Neha Kapoor',
    email: 'neha@mountainescape.example',
    date: '11 Nov 2026',
    status: 'PENDING',
  },
  {
    id: 'VN-1022',
    name: 'Coastal Stay Group',
    owner: 'Rahul Mehta',
    email: 'rahul@coastalstay.example',
    date: '10 Nov 2026',
    status: 'PENDING',
  },
  {
    id: 'VN-1021',
    name: 'Urban Living Hotels',
    owner: 'Priya Verma',
    email: 'priya@urbanliving.example',
    date: '09 Nov 2026',
    status: 'PENDING',
  },
];

const recentActivity = [
  {
    title: 'New vendor application received',
    description: 'Royal Orchid Hospitality submitted an application.',
    time: '10 minutes ago',
    icon: Building2,
    color: 'text-[#8065C9] bg-[#F0EDFF]',
  },
  {
    title: 'Vendor account approved',
    description: 'A vendor account was approved by an administrator.',
    time: '1 hour ago',
    icon: CheckCircle2,
    color: 'text-[#26966B] bg-[#EAF8F1]',
  },
  {
    title: 'New hotel listing submitted',
    description: 'A property was submitted for platform review.',
    time: '3 hours ago',
    icon: Hotel,
    color: 'text-[#5485C9] bg-[#EAF4FF]',
  },
  {
    title: 'Platform activity update',
    description: 'New bookings were recorded on the platform.',
    time: '5 hours ago',
    icon: Activity,
    color: 'text-[#C58A4C] bg-[#FFF5EB]',
  },
];

const SuperAdminOverview: React.FC = () => {
  const maxBookings = Math.max(...monthlyBookings.map((item) => item.bookings));

  return (
    <div className="mx-auto w-full max-w-[1500px] space-y-6 pb-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-[#292735]">
            Platform Overview
          </h1>
          <p className="mt-1 text-sm text-[#858391]">
            Monitor platform performance, vendors and hotel operations.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-[#777583]">
          <Activity size={16} />
          <span>Platform activity</span>
          <span className="h-2 w-2 rounded-full bg-[#26966B]" />
          <span className="text-[#26966B]">Live preview</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const ChangeIcon = stat.positive ? ArrowUpRight : ArrowDownRight;

          return (
            <div
              key={stat.label}
              className="rounded-xl border border-[#EAE9EF] bg-white p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-[#858391]">{stat.label}</p>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#292735]">
                    {stat.value}
                  </h2>
                </div>

                <div className={`rounded-xl p-3 ${stat.iconStyle}`}>
                  <Icon size={20} />
                </div>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-[#26966B]">
                  <ChangeIcon size={14} />
                  {stat.change}
                </span>
                <span className="text-xs text-[#9694A0]">
                  {stat.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="flex items-center justify-between rounded-xl border border-[#EAE9EF] bg-white p-4">
          <div>
            <p className="text-sm text-[#858391]">Pending Applications</p>
            <p className="mt-1 text-xl font-semibold text-[#292735]">18</p>
          </div>
          <div className="rounded-lg bg-[#FFF5EB] p-2.5 text-[#C58A4C]">
            <Clock3 size={19} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#EAE9EF] bg-white p-4">
          <div>
            <p className="text-sm text-[#858391]">Approved Vendors</p>
            <p className="mt-1 text-xl font-semibold text-[#292735]">212</p>
          </div>
          <div className="rounded-lg bg-[#EAF8F1] p-2.5 text-[#26966B]">
            <CheckCircle2 size={19} />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-xl border border-[#EAE9EF] bg-white p-4">
          <div>
            <p className="text-sm text-[#858391]">Registered Users</p>
            <p className="mt-1 text-xl font-semibold text-[#292735]">8,942</p>
          </div>
          <div className="rounded-lg bg-[#EEF5FF] p-2.5 text-[#5485C9]">
            <Users size={19} />
          </div>
        </div>
      </div>

      {/* Chart and Application Summary */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">
        {/* Booking Chart */}
        <section className="rounded-xl border border-[#EAE9EF] bg-white p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold text-[#292735]">
                Booking Activity
              </h2>
              <p className="mt-1 text-xs text-[#858391]">
                Monthly bookings across the platform
              </p>
            </div>

            <span className="rounded-lg border border-[#EAE9EF] px-3 py-2 text-xs text-[#686675]">
              Last 7 months
            </span>
          </div>

          <div className="mt-8 flex h-56 items-end gap-3 sm:gap-5">
            {monthlyBookings.map((item) => (
              <div
                key={item.month}
                className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
              >
                <span className="text-[11px] font-medium text-[#777583]">
                  {item.bookings}
                </span>

                <div className="flex h-full w-full items-end">
                  <div
                    className="w-full rounded-t-md bg-[#A78BFA] transition-all hover:bg-[#8965D5]"
                    style={{
                      height: `${(item.bookings / maxBookings) * 100}%`,
                      minHeight: '8px',
                    }}
                  />
                </div>

                <span className="text-xs text-[#858391]">
                  {item.month}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor Application Status */}
        <section className="rounded-xl border border-[#EAE9EF] bg-white p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-[#292735]">
                Vendor Applications
              </h2>
              <p className="mt-1 text-xs text-[#858391]">
                Current application status
              </p>
            </div>
            <AlertCircle size={19} className="text-[#C58A4C]" />
          </div>

          <div className="mt-6 space-y-5">
            {[
              { label: 'Approved', count: 212, percentage: 85, color: 'bg-[#26966B]' },
              { label: 'Pending', count: 18, percentage: 7, color: 'bg-[#D6A15F]' },
              { label: 'Rejected', count: 12, percentage: 5, color: 'bg-[#D97777]' },
              { label: 'Suspended', count: 6, percentage: 3, color: 'bg-[#92909D]' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-[#555362]">
                    {item.label}
                  </span>
                  <span className="text-sm font-medium text-[#393746]">
                    {item.count}
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-[#F0EFF3]">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Recent Applications */}
      <section className="overflow-hidden rounded-xl border border-[#EAE9EF] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#F0EFF3] px-5 py-4">
          <div>
            <h2 className="font-semibold text-[#292735]">
              Recent Vendor Applications
            </h2>
            <p className="mt-1 text-xs text-[#858391]">
              Vendors waiting for platform review
            </p>
          </div>

          <span className="text-sm font-medium text-[#8065C9]">
            {vendorApplications.length} recent applications
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[750px] text-left">
            <thead>
              <tr className="border-b border-[#F0EFF3] bg-[#FBFAFD]">
                {['Vendor', 'Owner', 'Application ID', 'Submitted', 'Status'].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="px-5 py-3 text-xs font-medium text-[#858391]"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-[#F0EFF3]">
              {vendorApplications.map((vendor) => (
                <tr key={vendor.id} className="transition hover:bg-[#FBFAFD]">
                  <td className="px-5 py-4">
                    <p className="text-sm font-medium text-[#393746]">
                      {vendor.name}
                    </p>
                    <p className="mt-1 text-xs text-[#9694A0]">
                      {vendor.email}
                    </p>
                  </td>

                  <td className="px-5 py-4 text-sm text-[#686675]">
                    {vendor.owner}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#686675]">
                    {vendor.id}
                  </td>

                  <td className="px-5 py-4 text-sm text-[#686675]">
                    {vendor.date}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-md bg-[#FFF5EB] px-2.5 py-1 text-xs font-medium text-[#B47A38]">
                      Pending
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="rounded-xl border border-[#EAE9EF] bg-white p-5">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="font-semibold text-[#292735]">
              Recent Platform Activity
            </h2>
            <p className="mt-1 text-xs text-[#858391]">
              Latest updates across IKEBANA OTA
            </p>
          </div>
        </div>

        <div className="space-y-5">
          {recentActivity.map((activity, index) => {
            const Icon = activity.icon;

            return (
              <div key={index} className="flex items-start gap-3">
                <div className={`rounded-lg p-2 ${activity.color}`}>
                  <Icon size={17} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[#393746]">
                    {activity.title}
                  </p>
                  <p className="mt-1 text-xs text-[#858391]">
                    {activity.description}
                  </p>
                </div>

                <span className="shrink-0 text-xs text-[#9694A0]">
                  {activity.time}
                </span>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default SuperAdminOverview;
