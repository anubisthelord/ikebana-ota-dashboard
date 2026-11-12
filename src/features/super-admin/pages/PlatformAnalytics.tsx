
import React, { useMemo, useState } from 'react';
import {
  CalendarDays,
  Building2,
  Hotel,
  CreditCard,
  Users,
  ArrowUpRight,
  Download,
} from 'lucide-react';

type Period = '7D' | '30D' | '90D' | '12M';

const analyticsData: Record<
  Period,
  {
    revenue: number;
    bookings: number;
    vendors: number;
    hotels: number;
    revenueChange: number;
    bookingChange: number;
    chart: { label: string; revenue: number; bookings: number }[];
  }
> = {
  '7D': {
    revenue: 285000,
    bookings: 186,
    vendors: 248,
    hotels: 684,
    revenueChange: 8.4,
    bookingChange: 5.2,
    chart: [
      { label: 'Mon', revenue: 32, bookings: 24 },
      { label: 'Tue', revenue: 42, bookings: 31 },
      { label: 'Wed', revenue: 36, bookings: 27 },
      { label: 'Thu', revenue: 54, bookings: 39 },
      { label: 'Fri', revenue: 48, bookings: 34 },
      { label: 'Sat', revenue: 72, bookings: 48 },
      { label: 'Sun', revenue: 65, bookings: 43 },
    ],
  },
  '30D': {
    revenue: 1240000,
    bookings: 842,
    vendors: 248,
    hotels: 684,
    revenueChange: 12.6,
    bookingChange: 9.8,
    chart: [
      { label: 'Week 1', revenue: 35, bookings: 24 },
      { label: 'Week 2', revenue: 48, bookings: 32 },
      { label: 'Week 3', revenue: 42, bookings: 29 },
      { label: 'Week 4', revenue: 68, bookings: 46 },
    ],
  },
  '90D': {
    revenue: 3680000,
    bookings: 2486,
    vendors: 248,
    hotels: 684,
    revenueChange: 16.2,
    bookingChange: 13.5,
    chart: [
      { label: 'Aug', revenue: 38, bookings: 25 },
      { label: 'Sep', revenue: 52, bookings: 35 },
      { label: 'Oct', revenue: 45, bookings: 31 },
      { label: 'Nov', revenue: 72, bookings: 49 },
    ],
  },
  '12M': {
    revenue: 14800000,
    bookings: 12486,
    vendors: 248,
    hotels: 684,
    revenueChange: 21.8,
    bookingChange: 18.4,
    chart: [
      { label: 'Dec', revenue: 28, bookings: 19 },
      { label: 'Jan', revenue: 34, bookings: 23 },
      { label: 'Feb', revenue: 39, bookings: 26 },
      { label: 'Mar', revenue: 45, bookings: 31 },
      { label: 'Apr', revenue: 42, bookings: 29 },
      { label: 'May', revenue: 55, bookings: 38 },
      { label: 'Jun', revenue: 49, bookings: 34 },
      { label: 'Jul', revenue: 61, bookings: 42 },
      { label: 'Aug', revenue: 58, bookings: 40 },
      { label: 'Sep', revenue: 67, bookings: 46 },
      { label: 'Oct', revenue: 73, bookings: 51 },
      { label: 'Nov', revenue: 82, bookings: 57 },
    ],
  },
};

const topVendors = [
  { name: 'The Grand Heritage', bookings: 1248, revenue: 485000 },
  { name: 'Mountain View Resorts', bookings: 986, revenue: 392000 },
  { name: 'City Comfort Properties', bookings: 842, revenue: 318000 },
  { name: 'Coastal Stay Group', bookings: 724, revenue: 286000 },
  { name: 'Urban Living Hotels', bookings: 612, revenue: 245000 },
];

const formatCurrency = (amount: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);

const PlatformAnalytics: React.FC = () => {
  const [period, setPeriod] = useState<Period>('30D');

  const data = analyticsData[period];

  const maxRevenue = useMemo(
    () => Math.max(...data.chart.map((item) => item.revenue)),
    [data]
  );

  const stats = [
    {
      label: 'Total Revenue',
      value: formatCurrency(data.revenue),
      change: data.revenueChange,
      icon: CreditCard,
      description: 'Platform revenue',
    },
    {
      label: 'Total Bookings',
      value: data.bookings.toLocaleString('en-IN'),
      change: data.bookingChange,
      icon: CalendarDays,
      description: 'Bookings in selected period',
    },
    {
      label: 'Registered Vendors',
      value: data.vendors.toLocaleString('en-IN'),
      change: 6.8,
      icon: Building2,
      description: 'Across the platform',
    },
    {
      label: 'Active Hotels',
      value: data.hotels.toLocaleString('en-IN'),
      change: 4.2,
      icon: Hotel,
      description: 'Available platform inventory',
    },
  ];

  const handleExport = () => {
    const rows = [
      ['Vendor', 'Bookings', 'Revenue'],
      ...topVendors.map((vendor) => [
        vendor.name,
        String(vendor.bookings),
        String(vendor.revenue),
      ]),
    ];

    const csv = rows
      .map((row) =>
        row.map((value) => `"${value.replace(/"/g, '""')}"`).join(',')
      )
      .join('\n');

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = 'ikebana-platform-analytics.csv';
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
            Platform Analytics
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Understand platform performance, revenue, and growth.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 bg-white p-1">
            {(['7D', '30D', '90D', '12M'] as Period[]).map((item) => (
              <button
                key={item}
                onClick={() => setPeriod(item)}
                className={`rounded-md px-3 py-1.5 text-xs font-medium transition ${
                  period === item
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            onClick={handleExport}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
          >
            <Download size={16} />
            Export
          </button>
        </div>
      </div>

      {/* KPI cards */}
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
                <div className="rounded-lg bg-gray-100 p-2">
                  <Icon size={18} className="text-gray-600" />
                </div>
              </div>

              <p className="mt-3 text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>

              <div className="mt-2 flex items-center gap-1.5">
                <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600">
                  <ArrowUpRight size={14} />
                  {stat.change}%
                </span>
                <span className="text-xs text-gray-400">
                  vs previous period
                </span>
              </div>

              <p className="mt-2 text-xs text-gray-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Revenue chart */}
      <section className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="font-semibold text-gray-900">Revenue Overview</h2>
            <p className="mt-1 text-sm text-gray-500">
              Revenue trend for the selected period
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span className="h-2.5 w-2.5 rounded-sm bg-violet-500" />
            Revenue (₹ thousands)
          </div>
        </div>

        <div className="mt-8 flex h-64 items-end gap-2 border-b border-gray-100 pb-2 sm:gap-4">
          {data.chart.map((item) => (
            <div
              key={item.label}
              className="flex h-full min-w-0 flex-1 flex-col items-center justify-end gap-2"
            >
              <div className="flex h-full w-full items-end justify-center">
                <div
                  title={`₹${item.revenue}k`}
                  className="w-full max-w-12 rounded-t-md bg-violet-500 transition-all hover:bg-violet-600"
                  style={{
                    height: `${(item.revenue / maxRevenue) * 100}%`,
                    minHeight: '5px',
                  }}
                />
              </div>
              <span className="whitespace-nowrap text-[10px] text-gray-500 sm:text-xs">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Booking and vendor analytics */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        {/* Booking status */}
        <section className="rounded-xl border border-gray-200 bg-white p-5">
          <div>
            <h2 className="font-semibold text-gray-900">Booking Performance</h2>
            <p className="mt-1 text-sm text-gray-500">
              Booking status distribution
            </p>
          </div>

          <div className="mt-6 space-y-5">
            {[
              { label: 'Confirmed', value: 64, count: 534, color: 'bg-emerald-500' },
              { label: 'Completed', value: 23, count: 194, color: 'bg-violet-500' },
              { label: 'Pending', value: 9, count: 76, color: 'bg-amber-400' },
              { label: 'Cancelled', value: 4, count: 38, color: 'bg-rose-400' },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-2 flex items-center justify-between">
                  <span className="text-sm text-gray-700">{item.label}</span>
                  <span className="text-sm font-medium text-gray-900">
                    {item.value}%
                  </span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-gray-100">
                  <div
                    className={`h-full rounded-full ${item.color}`}
                    style={{ width: `${item.value}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  {item.count.toLocaleString('en-IN')} bookings
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Vendor performance */}
        <section className="overflow-hidden rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-100 p-5">
            <h2 className="font-semibold text-gray-900">Top Performing Vendors</h2>
            <p className="mt-1 text-sm text-gray-500">
              Ranked by booking revenue
            </p>
          </div>

          <div className="divide-y divide-gray-100">
            {topVendors.map((vendor, index) => (
              <div
                key={vendor.name}
                className="flex items-center justify-between gap-3 px-5 py-4"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-semibold text-gray-600">
                    {index + 1}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium text-gray-900">
                      {vendor.name}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {vendor.bookings.toLocaleString('en-IN')} bookings
                    </p>
                  </div>
                </div>

                <p className="shrink-0 text-sm font-semibold text-gray-900">
                  {formatCurrency(vendor.revenue)}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Platform growth */}
      <section className="rounded-xl border border-gray-200 bg-white p-5">
        <div>
          <h2 className="font-semibold text-gray-900">Platform Growth</h2>
          <p className="mt-1 text-sm text-gray-500">
            Current platform account and inventory overview
          </p>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-violet-50 p-3">
              <Building2 size={20} className="text-violet-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">248</p>
              <p className="text-xs text-gray-500">Registered Vendors</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-emerald-50 p-3">
              <Hotel size={20} className="text-emerald-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">684</p>
              <p className="text-xs text-gray-500">Registered Hotels</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-amber-50 p-3">
              <Users size={20} className="text-amber-600" />
            </div>
            <div>
              <p className="text-xl font-semibold text-gray-900">8,942</p>
              <p className="text-xs text-gray-500">Registered Users</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PlatformAnalytics;
